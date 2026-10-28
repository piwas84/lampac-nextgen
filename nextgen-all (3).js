/* Lampac NextGen — ALL-IN-ONE v3.
   Один плагін: лоадер сторонніх плагінів + тема/панель/ліве меню/головна + рядок «Озвучка і якість».
   Підключати лише цей файл. */
(function () {
  if (window.NGX) return;
  var q = [], done = false;
  window.NGX = {
    after: function (fn) { if (done) { try { fn(); } catch (e) {} } else q.push(fn); },
    fire: function () { if (done) return; done = true; q.splice(0).forEach(function (f) { try { f(); } catch (e) { console.log('NextGen:', e); } }); }
  };
})();

/* ===== 1. ЛОАДЕР ===== */
/* Lampac NextGen — Loader v1. Один вхід для всіх плагінів:
   групи, порядок, ізоляція збоїв, вимикачі, безпечний режим, копія списку для відкату. */
(function () {
  'use strict';
  if (window.NG) return;

  var GH = 'https://piwas84.github.io/';
  // [група, адреса, увімкнено]
  var P = [
    ['core', 'https://lam.maxvol.pro/tmdbproxy.js', 1],
    ['core', 'http://lampaua.mooo.com/tmdbproxy/js/lign3lzn', 0],        // дубль проксі
    ['core', 'https://gitfuntik.github.io/tmdb_mod.js', 1],
    ['core', GH + 'cubhelp-/cub-helper.js', 1],

    ['ui', 'https://ko31k.github.io/LMP/plugins/interface+.js', 1],
    ['ui', 'https://minionmer-oss.github.io/lampa-cinema-skin/cinema.js', 1],
    ['ui', 'https://amikdn.github.io/nova_plus.js', 1],
    ['ui', 'https://levende.github.io/lampa-plugins/lnum.js', 1],
    ['ui', 'https://bdvburik.github.io/title.js', 1],
    ['ui', 'https://tvigl.info/plugins/torr_styles.js', 1],
    ['ui', 'https://levende.github.io/lampa-plugins/tmdb-networks.js', 1],

    ['sources', 'https://app.bwa.ad/online.js', 1],
    ['sources', 'https://hub.alcopa.cc/dl/alc_auto/v2.1.34/plugin.js', 1],
    ['sources', 'https://hub.alcopa.cc/dl/snack_tv/v0.8.9/plugin.js', 1],
    ['sources', GH + 'UAkino-/uakino_safe.aaf.js', 1],
    ['sources', 'https://uakino.ax/lampa.js', 1],
    ['sources', GH + 'uas/ua-home-lampa(6).js', 1],
    ['sources', GH + 'ua-home/ua-home-lampa.aaf', 0],                         // дубль ua-home
    ['sources', 'https://films.aartzz.pp.ua/l', 1],
    ['sources', 'https://amikdn.github.io/rus.js', 1],
    ['sources', 'https://piwas84.github.io/echo/kinoecho.js', 1],
    ['sources', 'https://aviamovie.github.io/surs.js', 1],
    ['sources', 'https://igo8748.github.io/shi/shi.js', 1],
    ['sources', 'https://nrsua.github.io/lampa-nrs/voboost.js', 1],
    ['sources', 'https://crowley38.github.io/QualityUA.js', 1],
    ['sources', 'https://adambenhassen.github.io/uafx.js', 1],
    ['sources', 'https://adambenhassen.github.io/netflix.js', 1],
    ['sources', 'https://uafree.mooo.com', 1],
    ['sources', 'https://xxhekpxx2307.github.io/Plagins/Dorama.js', 1],
    ['sources', GH + 'turk/turkish_series(4).js', 1],
    ['sources', 'https://lampame.github.io/main/hikka.js', 1],
    ['sources', 'https://bylampa.github.io/bylampa_source.js', 1],
    ['sources', 'https://lampaplugins.github.io/store/p.js', 1],

    ['tv', GH + 'vimuw3/ext_iptv_player.js', 1],
    ['tv', 'https://kinohub.uk/iptv.js', 1],
    ['tv', 'https://ne3nayskas.github.io/plugins/radio.js', 1],
    ['tv', 'https://lampame.github.io/main/music.js', 1],
    ['tv', 'https://yarikrazor-star.github.io/lmp/yt.js', 1],

    ['torrent', GH + 'test/torrent.js', 1],
    ['torrent', 'https://ko31k.github.io/LMP/plugins/Parsers.js', 1],
    ['torrent', 'https://cevamnelampaplagin.github.io/sharewithothers/dopparser.js', 1],
    ['torrent', 'http://plugin.rootu.top/wsoff.js', 1],

    ['player', 'https://communism420.github.io/Lampa-Advanced-Buffer-Control/advanced_buffer_control.js', 1],
    ['player', GH + 'time/timecode-resume.js', 1],
    ['player', 'https://igo8748.github.io/stori/continue_movies.js', 1],
    ['player', 'https://lampame.github.io/main/trakttv.js', 1],
    ['player', 'https://lampame.github.io/main/infuseSave.js', 1],
    ['player', 'https://tvigl.github.io/plugins/exit.js', 1],
    ['player', GH + 'rez/ryd.js', 1],

    ['meta', GH + 'reiting/mdb_ratings_fixed(1).js', 1],
    ['meta', 'https://hauryllin03.github.io/Plugins/podborki.js', 1],
    ['meta', 'https://bodya-elven.github.io/different/keywords.js', 1],
    ['meta', 'https://cub.red/plugin/collections', 1],
    ['meta', 'https://tvigl.github.io/plugins/shots.js', 1],
    ['meta', 'https://lampame.github.io/main/lme.js', 1],
    ['meta', 'https://lampame.github.io/main/kb.js', 1],
    ['meta', 'https://lampame.github.io/main/n.js', 1],
    ['meta', 'https://lampame.github.io/main/cw.js', 1],
    ['meta', 'https://lampame.github.io/main/bo.js', 1],

    ['ai', 'https://tvigl.github.io/plugins/ai_search_leg.js', 1],
    ['ai', 'https://bodya-elven.github.io/different/ai_assistant.js', 1],
    ['ai', 'https://cevamnelampaplagin.github.io/sharewithothers/aigep2.5lite.js', 0],   // дубль AI
    ['ai', 'https://cevamnelampaplagin.github.io/sharewithothers/aiLAMPAUAgep.js', 0],   // дубль AI

    ['menu', 'https://ko31k.github.io/LMP/plugins/menueditor.js', 1]
  ];
  var ORDER = ['core', 'ui', 'sources', 'tv', 'torrent', 'player', 'meta', 'ai', 'menu'];
  var NAMES = { core: 'Основа', ui: 'Інтерфейс', sources: 'Джерела', tv: 'ТБ і медіа', torrent: 'Торренти',
    player: 'Плеєр', meta: 'Добірки і рейтинги', ai: 'ШІ', menu: 'Редактор меню' };
  var CONC = 4, TIMEOUT = 8000;

  var log = { ok: [], fail: [], skip: [] };
  function get(k, d) { try { return Lampa.Storage.get(k, d); } catch (e) { return d; } }
  function set(k, v) { try { Lampa.Storage.set(k, v); } catch (e) {} }
  function offList() { try { return JSON.parse(get('ng_off', '[]')); } catch (e) { return []; } }
  function id(u) { return u.replace(/^https?:\/\//, ''); }

  function loadOne(url, done) {
    var s = document.createElement('script'), fin = false;
    function end(ok) { if (fin) return; fin = true; clearTimeout(t); (ok ? log.ok : log.fail).push(url); done(); }
    var t = setTimeout(function () { end(false); }, TIMEOUT);
    s.src = url; s.async = true;
    s.onload = function () { end(true); };
    s.onerror = function () { end(false); };
    document.head.appendChild(s);
  }

  function loadGroup(list, done) {
    var i = 0, running = 0, finished = 0;
    if (!list.length) return done();
    (function pump() {
      while (running < CONC && i < list.length) {
        running++;
        loadOne(list[i++], function () { running--; finished++; if (finished === list.length) done(); else pump(); });
      }
    })();
  }

  // Захист від помилки «onerror is not a function»: деякі плагіни (напр. QualityUA)
  // викликають Lampa.Parser.get без onerror, а ядро Lampa викликає його без перевірки.
  function fixParser() {
    try {
      var PR = Lampa.Parser;
      if (!PR || PR.__ng_fixed || typeof PR.get !== 'function') return;
      var orig = PR.get, noop = function () {};
      PR.get = function () {
        var a = Array.prototype.slice.call(arguments);
        if (typeof a[1] !== 'function') a[1] = noop;
        if (typeof a[2] !== 'function') a[2] = noop;
        return orig.apply(PR, a);
      };
      PR.__ng_fixed = true;
    } catch (e) { console.log('NextGen parser fix:', e); }
  }

  function run() {
    fixParser();
    if (String(get('ng_safe', 'false')) === 'true') { console.log('NextGen: безпечний режим, плагіни не завантажені'); NGX.fire(); return; }
    var off = offList(), gi = 0;
    // Якщо активні скіни — NextGen працює як логотип + меню, без власної панелі й головної
    window.NG_SKINS = P.some(function (p) { return p[0] === 'ui' && p[2] && /cinema\.js|nova_plus\.js/.test(p[1]) && off.indexOf(id(p[1])) < 0; });
    (function next() {
      if (gi >= ORDER.length) { console.log('NextGen: готово. OK ' + log.ok.length + ', помилок ' + log.fail.length); NGX.fire(); return; }
      var g = ORDER[gi++];
      if (String(get('ng_g_' + g, 'true')) === 'false') { return next(); }
      var list = P.filter(function (p) { return p[0] === g && p[2] && off.indexOf(id(p[1])) < 0; })
        .map(function (p) { return p[1]; });
      loadGroup(list, next);
    })();
  }

  // Налаштування в Lampa (якщо API доступний у вашій версії)
  function settings() {
    try {
      var S = Lampa.SettingsApi;
      S.addComponent({ component: 'nextgen', name: 'NextGen', icon: '<svg viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/></svg>' });
      S.addParam({ component: 'nextgen', param: { name: 'ng_safe', type: 'trigger', default: false },
        field: { name: 'Безпечний режим', description: 'Не завантажувати жодного плагіна (після перезапуску)' } });
      ORDER.forEach(function (g) {
        S.addParam({ component: 'nextgen', param: { name: 'ng_g_' + g, type: 'trigger', default: true },
          field: { name: NAMES[g], description: 'Група плагінів, потрібен перезапуск' } });
      });
      S.addParam({ component: 'nextgen', param: { name: 'nextgen_cinema', type: 'trigger', default: true },
        field: { name: 'Інтерфейс NextGen', description: 'Панель, логотип, головна (потрібен перезапуск)' } });
      S.addParam({ component: 'nextgen', param: { name: 'nextgen_home', type: 'trigger', default: true },
        field: { name: 'Головна NextGen', description: 'Власна головна з банером і рядами' } });
      S.addParam({ component: 'nextgen', param: { name: 'ng_menu_colors', type: 'trigger', default: true },
        field: { name: 'Кольорові значки меню', description: 'Підсвічує значки лівого меню (потрібен перезапуск)' } });
      S.addParam({ component: 'nextgen', param: { name: 'ng_adopt', type: 'button' },
        field: { name: 'Перенести плагіни в NextGen', description: 'Робить копію списку «Розширення» і лишає тільки лоадер' },
        onChange: function () { NG.adopt(); } });
      S.addParam({ component: 'nextgen', param: { name: 'ng_restore', type: 'button' },
        field: { name: 'Відновити старий список плагінів', description: 'Повертає копію, зроблену перед перенесенням' },
        onChange: function () { NG.restore(); } });
    } catch (e) { console.log('NextGen settings:', e); }
  }

  window.NG = {
    log: log, list: P,
    off: function (part) { var o = offList(); P.forEach(function (p) { if (p[1].indexOf(part) > -1 && o.indexOf(id(p[1])) < 0) o.push(id(p[1])); }); set('ng_off', JSON.stringify(o)); return o; },
    on: function (part) { set('ng_off', JSON.stringify(offList().filter(function (x) { return x.indexOf(part) < 0; }))); },
    adopt: function () {
      var cur = get('plugins', '[]');
      set('ng_plugins_backup', typeof cur === 'string' ? cur : JSON.stringify(cur));
      var arr = typeof cur === 'string' ? JSON.parse(cur) : cur;
      var keep = arr.filter(function (p) { return /nextgen-(loader|all)/.test(p.url || ''); });
      set('plugins', keep);
      try { Lampa.Noty.show('Готово. Копію збережено, перезапустіть Lampa'); } catch (e) {}
    },
    restore: function () {
      var b = get('ng_plugins_backup', '');
      if (!b) { try { Lampa.Noty.show('Копії немає'); } catch (e) {} return; }
      set('plugins', typeof b === 'string' ? JSON.parse(b) : b);
      try { Lampa.Noty.show('Список відновлено, перезапустіть Lampa'); } catch (e) {}
    }
  };

  function boot() { settings(); setTimeout(NGX.fire, 20000); run(); }
  if (window.appready) boot();
  else Lampa.Listener.follow('app', function (e) { if (e.type === 'ready') boot(); });
})();

/* ===== 2. ІНТЕРФЕЙС NEXTGEN ===== */
/* Lampac NextGen — Cinema Dark v2.2: головна (банер+ряди), тема + верхня панель + годинник + користувач. */
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
    ['Мультфільми', /мульт|cartoon/i],
    ['Музика', /музик|music/i],
    ['ТБ', /(^|\s)(тб|тв)(\s|$)|телеб|live|ефір|iptv|^tv$/i],
    ['Пошук', null]
  ];

  function find(i) {
    var re = TABS[i][1], hit = null;
    if (!re) return null;
    $('.menu .menu__item').each(function () {
      if (!hit && re.test($(this).find('.menu__text').text().trim())) hit = $(this);
    });
    return hit;
  }

  function go(i) {
    if (i === 0) { try { Lampa.Activity.push({ url: '', title: 'Головна', component: 'ng_home', page: 1 }); return true; } catch (e) {} }
    if (!TABS[i][1]) { try { Lampa.Search.open(); } catch (e) { $('.open--search').trigger('hover:enter'); } return true; }
    var hit = find(i);
    if (hit) { hit.trigger('hover:enter'); return true; }
    if (i === 0) Lampa.Activity.push({ url: '', title: 'Головна', component: 'main', source: 'tmdb', page: 1 });
    else if (i === 1) Lampa.Activity.push({ url: 'movie', title: 'Фільми', component: 'category', source: 'tmdb', page: 1 });
    else if (i === 2) Lampa.Activity.push({ url: 'tv', title: 'Серіали', component: 'category', source: 'tmdb', page: 1 });
    else if (i === 3) Lampa.Activity.push({ url: 'discover/movie?with_genres=16&sort_by=popularity.desc', title: 'Мультфільми', component: 'category_full', source: 'tmdb', page: 1, card_type: true });
    else { Lampa.Noty.show('Розділ «' + TABS[i][0] + '» не знайдено в меню'); return false; }
    return true;
  }

  // Ховаємо вкладки, яких немає в меню (напр. Музика/ТБ без модуля)
  function prune() {
    if (!$('.menu .menu__item').length) return;
    $('.ng-tab').each(function (i) {
      if (i > 3 && TABS[i][1] && !find(i)) $(this).hide().removeClass('selector');
    });
  }

  function clock(el) {
    var d = new Date();
    el.find('b').text(d.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' }));
    el.find('small').text(d.toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' }));
  }

  /* ---------- Кольорове ліве меню ---------- */
  var MENU_CSS = [
    '.menu .menu__item.ng-ci .menu__ico{width:2.15em;height:2.15em;border-radius:.65em;display:flex;align-items:center;justify-content:center;',
    'background:var(--ng-cbg);color:var(--ng-c);box-shadow:inset 0 0 0 1px var(--ng-cring);transition:transform .15s,background .15s}',
    '.menu .menu__item.ng-ci .menu__ico svg{width:1.3em;height:1.3em;color:var(--ng-c)}',
    '.menu .menu__item.ng-ci .menu__text{transition:color .15s}',
    '.menu .menu__item.ng-ci.focus,.menu .menu__item.ng-ci.hover{background:linear-gradient(90deg,var(--ng-cglow),transparent)!important}',
    '.menu .menu__item.ng-ci.focus .menu__ico,.menu .menu__item.ng-ci.hover .menu__ico{transform:scale(1.12);background:var(--ng-c);color:#0b0d12;box-shadow:0 0 16px var(--ng-cglow)}',
    '.menu .menu__item.ng-ci.focus .menu__ico svg,.menu .menu__item.ng-ci.hover .menu__ico svg{color:#0b0d12}',
    '.menu .menu__item.ng-ci.focus .menu__text{color:#fff;font-weight:600}'
  ].join('');

  var MENU_RULES = [
    [/ua home/i, '#ffd60a'], [/головн/i, '#4da3ff'], [/стрічк/i, '#ffd24a'], [/мульт|для діт/i, '#ffa94d'],
    [/фільм/i, '#ff6b6b'], [/дорам|турецьк/i, '#ff7eb6'], [/серіал/i, '#4dd4e0'], [/особи/i, '#b48cff'],
    [/каталог|фільтр/i, '#7bd88f'], [/анім/i, '#ff7a45'], [/колл?екц|вибране|закладк/i, '#ff5c8a'],
    [/історі|архів/i, '#9db4c8'], [/розклад/i, '#4dd0e1'], [/торрент/i, '#5ee06f'], [/настрій/i, '#ffd166'],
    [/dlna/i, '#64b5f6'], [/полуничк/i, '#ff4d6d'], [/радіо|радио/i, '#ffcf3f'], [/vinyl|музик/i, '#c77dff'],
    [/lnum/i, '#8ecae6'], [/cinema/i, '#f4a261'], [/русск/i, '#ef476f'], [/online|онлайн/i, '#2ec4b6'],
    [/iptv|(^|\s)(тб|тв)(\s|$)/i, '#3a86ff'], [/youtube/i, '#ff3b30'], [/trakt/i, '#ed1c24'], [/трейлер/i, '#ff9f1c'],
    [/цифров|реліз/i, '#06d6a0'], [/налаштув/i, '#b0b8c2'], [/інформ/i, '#74c0fc'], [/консол/i, '#a9e34b'],
    [/вихід|exit/i, '#ff6b6b'], [/редагув/i, '#ffd43b'], [/джерел/i, '#a78bfa'], [/пошук/i, '#74c0fc']
  ];
  var MENU_DEF = ['#4da3ff', '#ff6b6b', '#7bd88f', '#ffd166', '#b48cff', '#4dd4e0', '#ff7eb6', '#ffa94d'];

  function hexRgb(h) {
    var n = parseInt(h.slice(1), 16);
    return ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255);
  }

  function paintMenu() {
    try { if (Lampa.Storage.get('ng_menu_colors', 'true') === 'false') return; } catch (e) {}
    var n = 0;
    $('.menu .menu__item').each(function () {
      var el = $(this);
      if (el.hasClass('ng-ci')) return;
      var t = el.find('.menu__text').text().trim(), c = null;
      for (var i = 0; i < MENU_RULES.length; i++) if (MENU_RULES[i][0].test(t)) { c = MENU_RULES[i][1]; break; }
      if (!c) c = MENU_DEF[n++ % MENU_DEF.length];
      var rgb = hexRgb(c);
      this.style.setProperty('--ng-c', c);
      this.style.setProperty('--ng-cbg', 'rgba(' + rgb + ',.18)');
      this.style.setProperty('--ng-cring', 'rgba(' + rgb + ',.45)');
      this.style.setProperty('--ng-cglow', 'rgba(' + rgb + ',.35)');
      el.addClass('ng-ci');
    });
  }

  var menuObs = false, menuTimer;
  function menuColors() {
    function attach() {
      paintMenu();
      var m = $('.menu')[0];
      if (m && !menuObs) {
        menuObs = true;
        new MutationObserver(function () { clearTimeout(menuTimer); menuTimer = setTimeout(paintMenu, 300); })
          .observe(m, { childList: true, subtree: true });
      }
    }
    attach(); [1500, 5000, 12000].forEach(function (t) { setTimeout(attach, t); });
  }

  // Захист від подвійного спрацювання (hover:enter + click) на сенсорному екрані
  function ngOnce(fn) {
    var t = 0;
    return function () { var n = Date.now(); if (n - t < 500) return; t = n; return fn.apply(this, arguments); };
  }

  function openMenu() {
    try { if (Lampa.Menu && typeof Lampa.Menu.open === 'function') { Lampa.Menu.open(); return; } } catch (e) {}
    var b = $('.open--menu, .head__menu-icon, .menu-button').first();
    if (b.length) { b.trigger('hover:enter'); return; }
    try { Lampa.Controller.toggle('menu'); } catch (e) {}
  }

  function userMenu() {
    var prev = 'content';
    try { prev = Lampa.Controller.enabled().name; } catch (e) {}
    var back = function () { try { Lampa.Controller.toggle(prev); } catch (e) {} };
    var safe = String(Lampa.Storage.get('ng_safe', 'false')) === 'true';
    var items = [
      { title: 'Налаштування NextGen', act: 'ng' },
      { title: 'Налаштування Lampa', act: 'main' },
      { title: 'Розширення', act: 'plugins' },
      { title: 'Профіль / акаунт', act: 'profile' },
      { title: 'Безпечний режим: ' + (safe ? 'увімкнено' : 'вимкнено'), act: 'safe' },
      { title: 'Перезавантажити', act: 'reload' }
    ];
    function settings(c) { try { Lampa.Settings.create(c, { onBack: back }); } catch (e) { var s = $('.open--settings').first(); if (s.length) s.trigger('hover:enter'); } }
    try {
      Lampa.Select.show({
        title: 'Admin', items: items, onBack: back,
        onSelect: function (a) {
          if (a.act === 'ng') settings('nextgen');
          else if (a.act === 'main') settings('main');
          else if (a.act === 'plugins') settings('plugins');
          else if (a.act === 'profile') { var p = $('.open--profile').first(); if (p.length) p.trigger('hover:enter'); else settings('account'); }
          else if (a.act === 'safe') { Lampa.Storage.set('ng_safe', safe ? 'false' : 'true'); Lampa.Noty.show('Безпечний режим ' + (safe ? 'вимкнено' : 'увімкнено') + '. Перезапустіть Lampa'); back(); }
          else if (a.act === 'reload') location.reload();
        }
      });
    } catch (e) { var s = $('.open--settings').first(); if (s.length) s.trigger('hover:enter'); }
  }

  var LOGO_CSS = [
    '.ng-logo{font-size:1.3em;font-weight:600;line-height:1;white-space:nowrap}',
    '.ng-logo span{display:block;font-size:.5em;color:#2f7bff;letter-spacing:.12em;margin-top:.2em}',
    '.ng-logo.selector{padding:.3em .6em;border-radius:.5em}',
    '.ng-menubtn{padding:.5em .8em;border-radius:.5em;font-size:1.2em;line-height:1}'
  ].join('');

  // Режим зі скінами (cinema / nova_plus): рідний хедер і меню не чіпаємо, додаємо лише логотип
  function logoOnly() {
    if ($('.ng-logo--head').length) return;
    var l = $('<div class="ng-logo ng-logo--head selector">Lampac<span>NEXTGEN</span></div>');
    l.on('hover:enter click', ngOnce(openMenu));
    var head = $('.head .head__body').first();
    if (head.length) head.prepend(l); else $('.head').prepend(l);
  }

  function bar() {
    if ($('.ng-bar').length) return;
    var el = $('<div class="ng-bar"><div class="ng-menubtn selector">☰</div><div class="ng-logo selector">Lampac<span>NEXTGEN</span></div>' +
      '<div class="ng-tabs"></div><div class="ng-right"><div class="ng-clock"><b></b><small></small></div>' +
      '<div class="ng-user selector">Admin</div></div></div>');
    el.find('.ng-menubtn,.ng-logo').on('hover:enter click', ngOnce(openMenu));
    el.find('.ng-user').on('hover:enter click', ngOnce(userMenu));
    TABS.forEach(function (t, i) {
      var tab = $('<div class="ng-tab selector">' + t[0] + '</div>');
      if (i === 0) tab.addClass('active');
      tab.on('hover:enter click', ngOnce(function () {
        if (go(i)) { $('.ng-tab').removeClass('active'); tab.addClass('active'); }
      }));
      el.find('.ng-tabs').append(tab);
    });
    $('.head').append(el);
    $('body').addClass('ng-on');
    clock(el.find('.ng-clock'));
    setInterval(function () { clock(el.find('.ng-clock')); }, 15000);
    setTimeout(prune, 1500); setTimeout(prune, 5000); setTimeout(prune, 12000);
  }

  /* ---------- Головна NextGen (повний макет) ---------- */
  var HOME_CSS = [
    '.ng-shell{display:flex;max-height:calc(100vh - 5.5em)}',
    '.ng-side{flex:0 0 9.5em;padding:.5em .6em;display:flex;flex-direction:column;gap:.25em;overflow:hidden}',
    '.ng-nav{display:flex;align-items:center;gap:.7em;padding:.6em .8em;border-radius:.5em;color:#cfd2da;font-size:.95em;white-space:nowrap}',
    '.ng-nav i{font-style:normal;width:1.3em;text-align:center}',
    '.ng-nav.active{background:var(--ng-accent);color:#fff}.ng-nav.focus{outline:2px solid #fff}',
    '.ng-main{flex:1;min-width:0;overflow-y:auto;overflow-x:hidden;padding-bottom:3em;max-height:calc(100vh - 5.5em)}',
    '.ng-main::-webkit-scrollbar{display:none}',
    '.ng-hero{position:relative;height:40vh;min-height:13em;background-size:cover;background-position:center 20%;margin-bottom:1em}',
    '.ng-hero::before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#06070b 8%,rgba(6,7,11,.55) 50%,rgba(6,7,11,.1)),linear-gradient(0deg,#06070b 2%,transparent 45%)}',
    '.ng-hero__in{position:relative;padding:1.6em 1.5em;max-width:48%}',
    '.ng-hero__tag{display:inline-block;padding:.25em .7em;border-radius:.4em;background:rgba(255,255,255,.12);font-size:.8em;margin-bottom:.6em}',
    '.ng-hero__title{font-size:2.3em;font-weight:600;line-height:1.1;margin-bottom:.3em}',
    '.ng-hero__meta{color:var(--ng-dim);font-size:.9em;margin-bottom:.6em}',
    '.ng-hero__txt{font-size:.9em;line-height:1.45;color:#cfd2da;max-height:4.4em;overflow:hidden;margin-bottom:1em}',
    '.ng-hero__btns{display:flex;gap:.6em}',
    '.ng-btn{padding:.6em 1.3em;border-radius:.5em;background:rgba(255,255,255,.12);font-size:.95em}',
    '.ng-btn.main{background:var(--ng-accent);color:#fff}.ng-btn.focus{outline:2px solid #fff}',
    '.ng-hero__side{position:absolute;right:1.5em;top:1.4em;width:9.5em;display:flex;flex-direction:column;gap:.6em;font-size:.85em}',
    '.ng-hero__side .k{color:var(--ng-dim);font-size:.8em}',
    '.ng-badge{display:inline-block;padding:.35em .8em;border-radius:.4em;background:rgba(0,0,0,.55);border:1px solid var(--ng-line);text-align:center}',
    '.ng-badge.focus{outline:2px solid #fff}',
    '@media (max-width:640px){.ng-hero__side{display:none}.ng-side{flex-basis:3.4em}.ng-nav span{display:none}.ng-hero__in{max-width:92%}}',
    '.ng-row{margin-bottom:1.1em}',
    '.ng-rowhead{display:flex;justify-content:space-between;align-items:center;padding:0 1.5em}',
    '.ng-row__t{font-size:1.25em;margin-bottom:.3em}',
    '.ng-link{padding:.2em .7em;border-radius:.4em;color:var(--ng-dim);font-size:.85em}.ng-link.focus{outline:2px solid #fff;color:#fff}',
    '.ng-row__list{position:relative;display:flex;gap:.8em;overflow:hidden;padding:.6em 1.5em}',
    '.ng-card{flex:0 0 9.5em;border-radius:.6em;transition:transform .15s}',
    '.ng-card__img{height:13.5em;border-radius:.6em;background-color:var(--ng-surface);background-size:cover;background-position:center;box-shadow:0 10px 26px rgba(0,0,0,.6)}',
    '.ng-card__name{font-size:.85em;margin-top:.45em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '.ng-card__sub{font-size:.75em;color:var(--ng-dim)}',
    '.ng-card.focus{transform:scale(1.05)}',
    '.ng-card.focus .ng-card__img{box-shadow:0 0 0 2px var(--ng-accent),0 0 28px var(--ng-glow)}',
    '.ng-genre{flex:0 0 7.5em;height:5em;border-radius:.6em;display:flex;align-items:flex-end;padding:.6em;font-weight:600;font-size:.9em}',
    '.ng-genre.focus{outline:2px solid #fff;box-shadow:0 0 22px var(--ng-glow)}',
    '.ng-tile{flex:0 0 8em;padding:1.1em .6em;border-radius:.7em;background:var(--ng-surface);border:1px solid var(--ng-line);text-align:center}',
    '.ng-tile span{display:block;font-size:1.8em;margin-bottom:.3em}.ng-tile.wide{flex-basis:16em}',
    '.ng-tile.focus{border-color:var(--ng-accent);box-shadow:0 0 22px var(--ng-glow)}'
  ].join('');

  function img(path, size) {
    if (!path) return '';
    try { return Lampa.TMDB.image('t/p/' + size + path); } catch (e) { return 'https://image.tmdb.org/t/p/' + size + path; }
  }
  function tmdbOne(path, cb) {
    try {
      var lg = Lampa.Storage.field('tmdb_lang') || 'uk';
      var url = Lampa.TMDB.api(path + (path.indexOf('?') > -1 ? '&' : '?') + 'api_key=' + Lampa.TMDB.key() + '&language=' + lg);
      new Lampa.Reguest().silent(url, function (j) { cb(j); }, function () { cb(null); });
    } catch (e) { cb(null); }
  }
  function tmdb(path, type, cb) {
    tmdbOne(path, function (j) {
      cb((j && j.results || []).map(function (r) { r.media_type = r.media_type || type; return r; }));
    });
  }
  function openCard(it) {
    Lampa.Activity.push({ url: '', component: 'full', id: it.id, method: it.media_type || (it.first_air_date ? 'tv' : 'movie'), card: it, source: 'tmdb' });
  }
  function playCard(it) { window.__ng_auto = it.id; openCard(it); }
  function openList(u, t) {
    Lampa.Activity.push({ url: u, title: t, component: 'category_full', source: 'tmdb', page: 1, card_type: true });
  }
  function noty(t) { try { Lampa.Noty.show(t); } catch (e) {} }
  function toggleBook(it) {
    if (!it) return;
    try { Lampa.Favorite.toggle('book', it); noty('Закладки оновлено'); } catch (e) { noty('Не вдалося змінити закладки'); }
  }
  function openMusic() { var m = find(4); if (m) m.trigger('hover:enter'); else noty('Музичний плагін не підключено'); }
  function openSettings() {
    var b = $('.open--settings').first();
    if (b.length) b.trigger('hover:enter'); else { try { Lampa.Settings.create('main'); } catch (e) {} }
  }
  function openApps() {
    var hit = null;
    $('.menu .menu__item').each(function () { if (!hit && /додатк|розширен|плагін|extens/i.test($(this).find('.menu__text').text())) hit = $(this); });
    if (hit) hit.trigger('hover:enter'); else { try { Lampa.Settings.create('plugins'); } catch (e) { openSettings(); } }
  }

  var NAV = [['🏠', 'Головна', 0], ['🎬', 'Фільми', 1], ['📺', 'Серіали', 2], ['🧸', 'Мультфільми', 3],
    ['🎵', 'Музика', 4], ['📡', 'ТБ', 5], ['🔌', 'Додатки', 'apps'], ['⚙', 'Налаштування', 'settings']];
  var SECTIONS = [
    { t: 'Популярне', p: 'trending/movie/week', type: 'movie', more: 'movie/popular' },
    { t: 'Серіали', p: 'tv/popular', type: 'tv', more: 'tv/popular' },
    { t: 'Мультфільми', p: 'discover/movie?with_genres=16&sort_by=popularity.desc', type: 'movie', more: 'discover/movie?with_genres=16&sort_by=popularity.desc' }
  ];
  var GENRES = [['Поп', '#d0359b,#5b2a86'], ['Рок', '#b02a37,#3a1018'], ['Хіп-хоп', '#3a7bd5,#1b2a4a'],
    ['Електроніка', '#00b4e6,#0b3a5a'], ['Класика', '#8a7655,#2b2418'], ['Шансон', '#5b606c,#1a1c22']];
  var TILES = [
    ['🆕', 'Новинки', 'movie/now_playing'],
    ['🇺🇦', 'Українське', 'discover/movie?with_original_language=uk&sort_by=popularity.desc'],
    ['🏆', 'Топ фільмів', 'movie/top_rated'],
    ['👨‍👧', 'Для дітей', 'discover/movie?with_genres=10751,16&sort_by=popularity.desc'],
    ['📺', 'Топ серіалів', 'tv/top_rated']
  ];

  function Home() {
    var self = this, root = $('<div class="ng-shell"></div>'), side = $('<div class="ng-side"></div>'),
      main = $('<div class="ng-main"></div>'), last = false, hero = null, heroTimer, rt = {};
    root.append(side).append(main);

    function voiceLabel() { return Lampa.Storage.get('ng_voice', 'all') === 'uk' ? '🇺🇦 Укр. озвучка' : 'Озвучка: усі'; }
    function showT(m) { if (hero) hero.find('.t').text(m ? (m >= 60 ? Math.floor(m / 60) + ' год ' : '') + (m % 60) + ' хв' : '—'); }

    function setHero(it) {
      if (!hero || !it) return;
      var bg = img(it.backdrop_path || it.poster_path, 'w1280');
      var y = (it.release_date || it.first_air_date || '').slice(0, 4);
      hero.css('background-image', bg ? 'url(' + bg + ')' : 'none');
      hero.find('.ng-hero__tag').text(it.media_type === 'tv' ? 'Серіал' : 'Фільм');
      hero.find('.ng-hero__title').text(it.title || it.name || '');
      hero.find('.ng-hero__meta').text([y, it.vote_average ? '★ ' + it.vote_average.toFixed(1) : ''].filter(Boolean).join('  •  '));
      hero.find('.ng-hero__txt').text(it.overview || '');
      hero.find('.y').text(y || '—');
      hero.find('.r').text(it.vote_average ? it.vote_average.toFixed(1) + ' TMDB' : '—');
      hero.find('.ng-badge').text(voiceLabel());
      hero.data('item', it);
      var key = (it.media_type === 'tv' ? 'tv' : 'movie') + '/' + it.id;
      if (rt[key] !== undefined) showT(rt[key]);
      else { showT(0); tmdbOne(key, function (j) {
        var m = j && (j.runtime || (j.episode_run_time && j.episode_run_time[0])) || 0; rt[key] = m;
        if (hero.data('item') === it) showT(m);
      }); }
    }

    function reveal(el) {
      var $e = $(el);
      if ($e.closest('.ng-hero').length) { main[0].scrollTop = 0; return; }
      var list = $e.parent();
      list[0].scrollLeft = el.offsetLeft - (list.width() - $e.outerWidth()) / 2;
      try { el.scrollIntoView({ block: 'center', inline: 'nearest' }); } catch (e) {}
    }
    function focusable(el, fn) {
      el.on('hover:enter click', ngOnce(fn));
      el.on('hover:focus', function () { last = this; reveal(this); });
      return el;
    }

    function row(title, moreFn) {
      var r = $('<div class="ng-row"><div class="ng-rowhead"><div class="ng-row__t"></div></div><div class="ng-row__list"></div></div>');
      r.find('.ng-row__t').text(title);
      if (moreFn) r.find('.ng-rowhead').append(focusable($('<div class="ng-link selector">Всі ›</div>'), moreFn));
      main.append(r); return r.find('.ng-row__list');
    }

    function build(data) {
      NAV.forEach(function (n, idx) {
        var el = $('<div class="ng-nav selector"><i></i><span></span></div>');
        el.find('i').text(n[0]); el.find('span').text(n[1]); if (idx === 0) el.addClass('active');
        el.on('hover:enter click', ngOnce(function () {
          if (n[2] === 0) main[0].scrollTop = 0;
          else if (typeof n[2] === 'number') go(n[2]);
          else if (n[2] === 'apps') openApps(); else openSettings();
        }));
        el.on('hover:focus', function () { last = this; });
        side.append(el);
      });

      var first = (data[0] || []).filter(function (x) { return x.backdrop_path; })[0];
      hero = $('<div class="ng-hero"><div class="ng-hero__in"><div class="ng-hero__tag"></div><div class="ng-hero__title"></div>' +
        '<div class="ng-hero__meta"></div><div class="ng-hero__txt"></div><div class="ng-hero__btns"></div></div>' +
        '<div class="ng-hero__side"><div class="ng-badge selector"></div><div><div class="k">Рік</div><div class="y">—</div></div>' +
        '<div><div class="k">Рейтинг</div><div class="r">—</div></div><div><div class="k">Тривалість</div><div class="t">—</div></div>' +
        '<div class="ng-btn selector fav">♡ В обране</div></div></div>');
      var cur = function () { return hero.data('item'); };
      var btns = hero.find('.ng-hero__btns');
      btns.append(focusable($('<div class="ng-btn main selector">▶ Дивитись</div>'), function () { if (cur()) playCard(cur()); }));
      btns.append(focusable($('<div class="ng-btn selector">Детальніше</div>'), function () { if (cur()) openCard(cur()); }));
      btns.append(focusable($('<div class="ng-btn selector">＋</div>'), function () { toggleBook(cur()); }));
      focusable(hero.find('.fav'), function () { toggleBook(cur()); });
      focusable(hero.find('.ng-badge'), function () {
        var v = Lampa.Storage.get('ng_voice', 'all') === 'uk' ? 'all' : 'uk';
        Lampa.Storage.set('ng_voice', v); hero.find('.ng-badge').text(voiceLabel()); noty(voiceLabel());
      });
      main.append(hero); setHero(first);

      SECTIONS.forEach(function (s, i) {
        var items = data[i] || []; if (!items.length) return;
        var list = row(s.t, function () { openList(s.more, s.t); });
        items.slice(0, 20).forEach(function (it) {
          var y = (it.release_date || it.first_air_date || '').slice(0, 4);
          var c = $('<div class="ng-card selector"><div class="ng-card__img"></div><div class="ng-card__name"></div><div class="ng-card__sub"></div></div>');
          c.find('.ng-card__img').css('background-image', 'url(' + img(it.poster_path, 'w342') + ')');
          c.find('.ng-card__name').text(it.title || it.name || '');
          c.find('.ng-card__sub').text([it.vote_average ? '★ ' + it.vote_average.toFixed(1) : '', y].filter(Boolean).join(' · '));
          c.on('hover:enter click', ngOnce(function () { openCard(it); }));
          c.on('hover:focus', function () {
            last = this; reveal(this);
            clearTimeout(heroTimer); heroTimer = setTimeout(function () { setHero(it); }, 350);
          });
          list.append(c);
        });
      });

      var gl = row('Музика', openMusic);
      GENRES.forEach(function (g) {
        var el = $('<div class="ng-genre selector"></div>').text(g[0]).css('background', 'linear-gradient(135deg,' + g[1] + ')');
        gl.append(focusable(el, openMusic));
      });

      var tl = row('Мої добірки');
      TILES.forEach(function (t) {
        var el = $('<div class="ng-tile selector"><span></span><div></div></div>');
        el.find('span').text(t[0]); el.find('div').text(t[1]);
        tl.append(focusable(el, function () { openList(t[2], t[1]); }));
      });
      var m = $('<div class="ng-tile wide selector"><span>🎵</span><div>Музика онлайн</div></div>');
      tl.append(focusable(m, openMusic));
    }

    this.create = function () {
      var data = {}, left = SECTIONS.length, done = false;
      function finish() {
        if (done) return; done = true;
        try { build(data); } catch (e) { console.log('NextGen home:', e); main.text('Не вдалося побудувати головну'); }
        self.activity.loader(false); self.activity.toggle();
      }
      self.activity.loader(true);
      SECTIONS.forEach(function (s, i) { tmdb(s.p, s.type, function (r) { data[i] = r; if (--left === 0) finish(); }); });
      setTimeout(finish, 8000);
    };

    this.start = function () {
      if (Lampa.Activity.active().activity !== self.activity) return;
      Lampa.Controller.add('ng_home', {
        toggle: function () { Lampa.Controller.collectionSet(root); Lampa.Controller.collectionFocus(last || false, root); },
        left: function () { if (Navigator.canmove('left')) Navigator.move('left'); else Lampa.Controller.toggle('menu'); },
        right: function () { Navigator.move('right'); },
        up: function () { if (Navigator.canmove('up')) Navigator.move('up'); else Lampa.Controller.toggle('head'); },
        down: function () { Navigator.move('down'); },
        back: function () { Lampa.Activity.backward(); }
      });
      Lampa.Controller.toggle('ng_home');
    };
    this.pause = function () {};
    this.stop = function () {};
    this.render = function () { return root; };
    this.destroy = function () { clearTimeout(heroTimer); root.remove(); };
  }

  function start() {
    try { if (Lampa.Storage.get('nextgen_cinema', 'true') === 'false') return; } catch (e) {}
    var skin = !!window.NG_SKINS || Lampa.Storage.get('ng_mode', '') === 'skin';
    if (!document.getElementById('ng-style')) {
      var s = document.createElement('style'); s.id = 'ng-style';
      s.textContent = skin ? (ROOT_VARS + LOGO_CSS + HOME_CSS + MENU_CSS) : (CSS + LOGO_CSS + HOME_CSS + MENU_CSS); document.head.appendChild(s);
    }
    try { menuColors(); } catch (e) { console.log('NextGen menu:', e); }
    if (skin) { try { logoOnly(); setTimeout(logoOnly, 2000); } catch (e) { console.log('NextGen logo:', e); } }
    try { Lampa.Listener.follow('full', function (e) {
      if (e.type !== 'complite') return;
      try {
        var id = e.data && e.data.movie && e.data.movie.id;
        if (window.__ng_auto && id === window.__ng_auto) {
          window.__ng_auto = 0;
          setTimeout(function () { var b = e.object.activity.render().find('.view--online').first(); if (b.length) b.trigger('hover:enter'); }, 400);
        }
      } catch (er) {}
    }); } catch (e) {}
    try { Lampa.Component.add('ng_home', Home); } catch (e) { console.log('NextGen comp:', e); }
    if (!skin) { try { bar(); } catch (e) { console.log('NextGen bar:', e); } }
    if (Lampa.Storage.get('nextgen_home', 'true') !== 'false') setTimeout(function () {
      try { if (Lampa.Activity.active().component === 'main') Lampa.Activity.replace({ url: '', title: 'Головна', component: 'ng_home', page: 1 }); } catch (e) {}
    }, 1500);
  }

  NGX.after(start);
})();

/* ===== 3. ОЗВУЧКА І ЯКІСТЬ ===== */
/* Lampac NextGen — рядок «Озвучка + Якість» на сторінці фільму і у списку джерел.
   У списку джерел чипи будуються з реальних варіантів і фільтрують їх. */
(function () {
  'use strict';
  if (window.__ng_voice) return;
  window.__ng_voice = true;

  var VOICES = [
    ['all', 'Усі', null],
    ['uk', '🇺🇦 Українська', /укр|ukr|\bua\b|ukrain/i],
    ['multi', 'Багатоголосий', /багатогол|многогол|multi/i],
    ['dub', 'Дубльований', /дубл|dub/i],
    ['sub', 'Субтитри', /субтит|\bsub/i],
    ['orig', 'Оригінал', /оригінал|оригинал|original|\beng\b/i]
  ];
  var QUAL = [
    ['auto', 'Авто', null],
    ['2160', '4K', /2160|4k|uhd/i],
    ['1080', '1080p', /1080|fhd/i],
    ['720', '720p', /720/i]
  ];

  var CSS = '.ng-voice{padding:.5em 1.5em 1em}.ng-voice__row{display:flex;flex-wrap:wrap;gap:.5em;align-items:center;margin:.35em 0}' +
    '.ng-voice__lbl{min-width:5.5em;color:#8b8f9a;font-size:.9em}' +
    '.ng-chip{padding:.4em .95em;border-radius:2em;background:rgba(255,255,255,.1);font-size:.9em}' +
    '.ng-src{padding:.4em 1.2em}.ng-chip.active{background:#2f7bff;color:#fff}.ng-chip.focus{outline:2px solid #fff}';

  function get(k, d) { try { return Lampa.Storage.get(k, d); } catch (e) { return d; } }
  function set(k, v) { try { Lampa.Storage.set(k, v); } catch (e) {} }
  function find(list, key) { return list.filter(function (x) { return x[0] === key; })[0] || list[0]; }

  function group(title, list, key) {
    var row = $('<div class="ng-voice__row"><div class="ng-voice__lbl"></div></div>');
    row.find('.ng-voice__lbl').text(title);
    var cur = get(key, list[0][0]);
    list.forEach(function (it) {
      var c = $('<div class="ng-chip selector"></div>').text(it[1]);
      if (it[0] === cur) c.addClass('active');
      c.on('hover:enter click', function () {
        set(key, it[0]);
        row.find('.ng-chip').removeClass('active'); c.addClass('active');
        try { Lampa.Noty.show(title + ': ' + it[1]); } catch (e) {}
      });
      row.append(c);
    });
    return row;
  }

  function build() {
    var box = $('<div class="ng-voice"></div>');
    box.append(group('Озвучка', VOICES, 'ng_voice'));
    box.append(group('Якість', QUAL, 'ng_quality'));
    return box;
  }

  function addRow(e) {
    if (e.type !== 'complite') return;
    try {
      var root = e.object.activity.render();
      if (root.find('.ng-voice').length) return;
      var btns = root.find('.full-start-new__buttons, .full-start__buttons').first();
      var row = build();
      if (btns.length) btns.after(row); else root.find('.full-start-new, .full-start').first().append(row);
      setTimeout(function () { try { Lampa.Controller.toggle(Lampa.Controller.enabled().name); } catch (er) {} }, 150);
    } catch (err) { console.log('NextGen voice:', err); }
  }

  /* ---------- Рядок у списку джерел («Онлайн») ---------- */
  function srcItems() {
    var $i = $('.online-prestige');
    if (!$i.length) $i = $('.explorer__files .selector').not('.torrent-filter .selector, .filter .selector, .ng-chip');
    return $i.filter(function () { return $(this).text().length >= 8; });
  }
  function srcAnchor() {
    var a = $('.torrent-filter').first();
    if (a.length) return { el: a, m: 'after' };
    a = $('.explorer__files-head').first();
    if (a.length) return { el: a, m: 'after' };
    var b = $('.scroll__body').first();
    return b.length ? { el: b, m: 'prepend' } : null;
  }
  function recollect(list) {
    try { Lampa.Controller.toggle(Lampa.Controller.enabled().name); } catch (e) {}
    try {
      var first = list.filter(':not(.hide)').first();
      if (first.length) Lampa.Controller.collectionFocus(first[0], Lampa.Activity.active().activity.render());
    } catch (e) {}
  }

  function buildSrc(list) {
    var vc = {}, qc = {};
    list.each(function () {
      var t = $(this).text();
      VOICES.slice(1).forEach(function (v) { if (v[2].test(t)) vc[v[0]] = (vc[v[0]] || 0) + 1; });
      QUAL.slice(1).forEach(function (q) { if (q[2].test(t)) qc[q[0]] = (qc[q[0]] || 0) + 1; });
    });
    var sv = get('ng_voice', 'all'), sq = get('ng_quality', 'auto');
    if (sv !== 'all' && !vc[sv]) sv = 'all';
    if (sq !== 'auto' && !qc[sq]) sq = 'auto';

    var box = $('<div class="ng-src"></div>');
    function apply() {
      var vr = find(VOICES, sv)[2], qr = find(QUAL, sq)[2], shown = 0;
      list.each(function () {
        var t = $(this).text(), ok = (!vr || vr.test(t)) && (!qr || qr.test(t));
        $(this).toggleClass('hide', !ok); if (ok) shown++;
      });
      if (!shown) { try { Lampa.Noty.show('Немає варіантів за цим вибором'); } catch (e) {} sv = 'all'; sq = 'auto'; list.removeClass('hide'); box.find('.ng-chip').removeClass('active'); box.find('[data-k="all"],[data-k="auto"]').addClass('active'); }
      recollect(list);
    }
    function line(title, def, cats, counts, key, setv) {
      var row = $('<div class="ng-voice__row"><div class="ng-voice__lbl"></div></div>');
      row.find('.ng-voice__lbl').text(title);
      var cur = key === 'ng_voice' ? sv : sq;
      cats.forEach(function (it, i) {
        if (i > 0 && !counts[it[0]]) return;
        var c = $('<div class="ng-chip selector"></div>').attr('data-k', it[0]).text(i === 0 ? it[1] : it[1] + ' · ' + counts[it[0]]);
        if (it[0] === cur) c.addClass('active');
        c.on('hover:enter click', function () {
          setv(it[0]); set(key, it[0]);
          row.find('.ng-chip').removeClass('active'); c.addClass('active'); apply();
        });
        row.append(c);
      });
      return row;
    }
    var any = Object.keys(vc).length || Object.keys(qc).length;
    if (!any) return null;
    if (Object.keys(vc).length) box.append(line('Озвучка', 'all', VOICES, vc, 'ng_voice', function (v) { sv = v; }));
    if (Object.keys(qc).length) box.append(line('Якість', 'auto', QUAL, qc, 'ng_quality', function (v) { sq = v; }));
    box.data('apply', apply);
    return box;
  }

  var lastSig = '', timer;
  function scanSrc() {
    try {
      var list = srcItems();
      if (!list.length) { lastSig = ''; return; }
      var sig = list.length + '|' + $(list[0]).text().slice(0, 40) + '|' + $(list[list.length - 1]).text().slice(0, 40);
      if (sig === lastSig && $('.ng-src').length) return;
      lastSig = sig;
      $('.ng-src').remove();
      var a = srcAnchor(); if (!a) return;
      var box = buildSrc(list); if (!box) return;
      if (a.m === 'after') a.el.after(box); else a.el.prepend(box);
      var ap = box.data('apply');
      if (get('ng_voice', 'all') !== 'all' || get('ng_quality', 'auto') !== 'auto') ap(); else recollect(list);
    } catch (e) { console.log('NextGen src:', e); }
  }

  function start() {
    var s = document.createElement('style'); s.textContent = CSS; document.head.appendChild(s);
    Lampa.Listener.follow('full', addRow);
    new MutationObserver(function () { clearTimeout(timer); timer = setTimeout(scanSrc, 600); })
      .observe(document.body, { childList: true, subtree: true });
  }

  if (window.appready) start();
  else Lampa.Listener.follow('app', function (e) { if (e.type === 'ready') start(); });
})();
