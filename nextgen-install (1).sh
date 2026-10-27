#!/usr/bin/env bash
# Lampac NextGen — один скрипт: бекап → встановлення плагіна → відкат.
# Використання:  ./nextgen-install.sh [install|rollback|uninstall|status]
# init.conf, пароль, AdminPanel, module/, БД НЕ змінюються.
set -euo pipefail
BASE=${BASE:-/home/ubuntu/lampac-docker}
BK=${BK:-/home/ubuntu/lampac-backups}
CMD=${1:-install}
cd "$BASE"

find_www() {
  local id src
  for id in $(docker compose ps -q); do
    src=$(docker inspect -f '{{range .Mounts}}{{.Source}}|{{.Destination}}{{"\n"}}{{end}}' "$id" \
          | awk -F'|' '$2 ~ /wwwroot$/ {print $1; exit}')
    [ -n "$src" ] && { echo "$src"; return; }
  done
  find "$BASE" -maxdepth 3 -type d -name wwwroot 2>/dev/null | head -1
}

backup() {
  local stamp dest i=0 img
  stamp=$(date +%Y%m%d-%H%M%S); dest="$BK/$stamp"; mkdir -p "$dest"
  docker compose config > "$dest/compose.resolved.yml" 2>/dev/null || true
  docker compose images > "$dest/images.txt" || true
  docker compose ps -q | while read -r id; do docker inspect "$id" > "$dest/inspect-$id.json"; done
  for img in $(docker compose images -q | sort -u); do
    docker tag "$img" "lampac-nextgen-backup:$stamp-$i"; i=$((i+1))
  done
  docker compose stop
  sudo tar -czpf "$dest/project.tar.gz" -C "$(dirname "$BASE")" "$(basename "$BASE")"
  docker compose start
  echo "$dest" > "$BK/LAST"; echo "Бекап: $dest"
}

case "$CMD" in
status)
  docker compose ps; echo "wwwroot: $(find_www || true)"; echo "Останній бекап: $(cat "$BK/LAST" 2>/dev/null || echo немає)"
  ;;
install)
  mkdir -p "$BK"; backup
  tmp=$(mktemp); sed '1,/^#__PLUGIN__$/d' "$0" > "$tmp"
  www=$(find_www || true)
  if [ -n "$www" ]; then
    sudo mkdir -p "$www/plugins"; sudo cp "$tmp" "$www/plugins/nextgen.js"; echo "Встановлено: $www/plugins/nextgen.js"
  else
    c=$(docker compose ps -q | head -1)
    d=$(docker exec "$c" sh -c 'for p in /home/wwwroot /app/wwwroot /wwwroot; do [ -d $p ] && echo $p && break; done' || true)
    [ -n "$d" ] || { echo "wwwroot не знайдено. Запусти: $0 status та надішли вивід docker inspect монтувань."; exit 1; }
    docker exec "$c" mkdir -p "$d/plugins"; docker cp "$tmp" "$c:$d/plugins/nextgen.js"
    echo "УВАГА: wwwroot не змонтовано з хоста — плагін зникне після перестворення контейнера."
    echo "Додай volume ./nextgen-plugins:$d/plugins у docker-compose для сталості."
  fi
  rm -f "$tmp"
  echo "Код відповіді: $(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:9118/plugins/nextgen.js || echo -)"
  echo "У Lampa: Налаштування → Розширення → http://<ваш-хост>:9118/plugins/nextgen.js"
  ;;
uninstall)
  www=$(find_www || true); [ -n "$www" ] && sudo rm -f "$www/plugins/nextgen.js" && echo "Плагін видалено."
  ;;
rollback)
  src=${2:-$(cat "$BK/LAST")}
  [ -f "$src/project.tar.gz" ] || { echo "Немає $src/project.tar.gz"; exit 1; }
  docker compose down
  mv "$BASE" "$BASE.failed-$(date +%Y%m%d-%H%M%S)"
  sudo tar -xzpf "$src/project.tar.gz" -C "$(dirname "$BASE")"
  cd "$BASE" && docker compose up -d; echo "Відкат із $src виконано."
  ;;
*) echo "Невідома команда: $CMD"; exit 1 ;;
esac
exit 0
#__PLUGIN__
/* Lampac NextGen — Cinema Dark v1: тема + верхня панель + годинник + користувач. */
(function () {
  'use strict';
  if (window.__nextgen) return;
  window.__nextgen = true;

  var CSS = [
    ':root{--ng-bg:#06070b;--ng-surface:#0c0f17;--ng-line:rgba(255,255,255,.07);',
    '--ng-text:#eceae4;--ng-dim:#8b8f9a;--ng-accent:#2f7bff;--ng-glow:rgba(47,123,255,.35)}',
    'body{background:var(--ng-bg)!important;color:var(--ng-text)}',
    'body::after{content:"";position:fixed;inset:0;pointer-events:none;z-index:1;',
    'background:radial-gradient(ellipse at center,transparent 55%,rgba(0,0,0,.55) 100%)}',
    '.menu__item.focus,.menu__item.hover,.settings-folder.focus,.settings-param.focus,.selector.focus{',
    'background:linear-gradient(90deg,var(--ng-glow),transparent)!important;color:#fff!important}',
    '.card.focus .card__view::after,.card.hover .card__view::after{border-color:var(--ng-accent)!important;',
    'box-shadow:0 0 28px var(--ng-glow)}',
    '.card__view{border-radius:.6em;box-shadow:0 10px 30px rgba(0,0,0,.65)}',
    '.items-line__title,.full-start-new__title,.full-start__title{letter-spacing:.03em;font-weight:400}',
    '.full-start-new__tagline,.card__age,.card__type{color:var(--ng-dim)}',
    '.full-start__button.focus,.full-start-new__button.focus,.simple-button.focus{',
    'background:var(--ng-accent)!important;color:#fff!important}',
    '.menu,.settings,.settings__content{background:var(--ng-surface)!important;border-color:var(--ng-line)!important}',
    /* верхня панель */
    'body.ng-on .head__body{display:none!important}',
    '.ng-bar{display:flex;align-items:center;gap:1.6em;padding:.7em 1.5em;width:100%;',
    'background:linear-gradient(180deg,rgba(6,7,11,.95),rgba(6,7,11,0))}',
    '.ng-logo{font-size:1.3em;font-weight:600;line-height:1}',
    '.ng-logo span{display:block;font-size:.5em;color:var(--ng-accent);letter-spacing:.12em;margin-top:.2em}',
    '.ng-tabs{display:flex;gap:.3em;flex:1;justify-content:center}',
    '.ng-tab{padding:.55em 1.1em;border-radius:.5em;color:var(--ng-dim);font-size:.95em}',
    '.ng-tab.active{background:var(--ng-accent);color:#fff}',
    '.ng-right{display:flex;align-items:center;gap:1.2em}',
    '.ng-clock{text-align:right;line-height:1.1}.ng-clock b{font-size:1.3em;font-weight:500}',
    '.ng-clock small{display:block;color:var(--ng-dim);font-size:.6em}',
    '.ng-user{padding:.4em .9em;border:1px solid var(--ng-line);border-radius:2em;font-size:.8em}'
  ].join('');

  var TABS = [
    ['Головна', /головн|^main$|home/i],
    ['Фільми', /фільм|фильм|movie/i],
    ['Серіали', /серіал|сериал|series|tv ?show/i],
    ['Мультфільми', /мульт|cartoon|anime|аніме/i],
    ['Музика', /музик|music/i],
    ['ТБ', /(^|\s)(тб|тв)(\s|$)|телеб|live|ефір|^tv$/i],
    ['Пошук', null]
  ];

  function go(i) {
    var re = TABS[i][1];
    if (!re) { try { Lampa.Search.open(); return; } catch (e) { $('.open--search').trigger('hover:enter'); return; } }
    var hit = null;
    $('.menu .menu__item').each(function () {
      if (!hit && re.test($(this).find('.menu__text').text().trim())) hit = $(this);
    });
    if (hit) hit.trigger('hover:enter');
    else if (i === 0) Lampa.Activity.push({ url: '', title: 'Головна', component: 'main', source: 'tmdb', page: 1 });
    else if (i === 1) Lampa.Activity.push({ url: 'movie', title: 'Фільми', component: 'category', source: 'tmdb', page: 1 });
    else if (i === 2) Lampa.Activity.push({ url: 'tv', title: 'Серіали', component: 'category', source: 'tmdb', page: 1 });
    else Lampa.Noty.show('Розділ «' + TABS[i][0] + '» не знайдено в меню');
  }

  function clock(el) {
    var d = new Date();
    el.find('b').text(d.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' }));
    el.find('small').text(d.toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' }));
  }

  function bar() {
    if ($('.ng-bar').length) return;
    var el = $('<div class="ng-bar"><div class="ng-logo">Lampac<span>NEXTGEN</span></div>' +
      '<div class="ng-tabs"></div><div class="ng-right"><div class="ng-clock"><b></b><small></small></div>' +
      '<div class="ng-user">Admin</div></div></div>');
    TABS.forEach(function (t, i) {
      var tab = $('<div class="ng-tab selector">' + t[0] + '</div>');
      if (i === 0) tab.addClass('active');
      tab.on('hover:enter click', function () {
        $('.ng-tab').removeClass('active'); tab.addClass('active'); go(i);
      });
      el.find('.ng-tabs').append(tab);
    });
    $('.head').append(el);
    $('body').addClass('ng-on');
    clock(el.find('.ng-clock'));
    setInterval(function () { clock(el.find('.ng-clock')); }, 15000);
  }

  function start() {
    try { if (Lampa.Storage.get('nextgen_cinema', 'true') === 'false') return; } catch (e) {}
    if (!document.getElementById('ng-style')) {
      var s = document.createElement('style'); s.id = 'ng-style'; s.textContent = CSS; document.head.appendChild(s);
    }
    try { bar(); } catch (e) { console.log('NextGen bar:', e); }
  }

  if (window.appready) start();
  else Lampa.Listener.follow('app', function (e) { if (e.type === 'ready') start(); });
})();
