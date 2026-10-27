/* Lampac NextGen — Cinema Dark v2: головна (банер+ряди), тема + верхня панель + годинник + користувач. */
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
    else { Lampa.Noty.show('Розділ «' + TABS[i][0] + '» не знайдено в меню'); return false; }
    return true;
  }

  // Ховаємо вкладки, яких немає в меню (напр. Музика/ТБ без модуля)
  function prune() {
    if (!$('.menu .menu__item').length) return;
    $('.ng-tab').each(function (i) {
      if (i > 2 && TABS[i][1] && !find(i)) $(this).hide().removeClass('selector');
    });
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
        if (go(i)) { $('.ng-tab').removeClass('active'); tab.addClass('active'); }
      });
      el.find('.ng-tabs').append(tab);
    });
    $('.head').append(el);
    $('body').addClass('ng-on');
    clock(el.find('.ng-clock'));
    setInterval(function () { clock(el.find('.ng-clock')); }, 15000);
    setTimeout(prune, 1500); setTimeout(prune, 5000); setTimeout(prune, 12000);
  }

  /* ---------- Головна NextGen ---------- */
  var HOME_CSS = [
    '.ng-home{max-height:calc(100vh - 5.5em);overflow-y:auto;overflow-x:hidden;padding-bottom:3em}',
    '.ng-home::-webkit-scrollbar{display:none}',
    '.ng-hero{position:relative;height:40vh;min-height:13em;background-size:cover;background-position:center 20%;margin-bottom:1em}',
    '.ng-hero::before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#06070b 8%,rgba(6,7,11,.55) 50%,rgba(6,7,11,.1)),linear-gradient(0deg,#06070b 2%,transparent 45%)}',
    '.ng-hero__in{position:relative;padding:1.6em 1.5em;max-width:46%}',
    '.ng-hero__tag{display:inline-block;padding:.25em .7em;border-radius:.4em;background:rgba(255,255,255,.12);font-size:.8em;margin-bottom:.6em}',
    '.ng-hero__title{font-size:2.4em;font-weight:600;line-height:1.1;margin-bottom:.3em}',
    '.ng-hero__meta{color:var(--ng-dim);font-size:.9em;margin-bottom:.6em}',
    '.ng-hero__txt{font-size:.9em;line-height:1.45;color:#cfd2da;max-height:4.4em;overflow:hidden;margin-bottom:1em}',
    '.ng-hero__btns{display:flex;gap:.6em}',
    '.ng-btn{padding:.6em 1.3em;border-radius:.5em;background:rgba(255,255,255,.12);font-size:.95em}',
    '.ng-btn.main{background:var(--ng-accent);color:#fff}',
    '.ng-btn.focus{outline:2px solid #fff}',
    '.ng-row{margin-bottom:1.1em}',
    '.ng-row__t{font-size:1.25em;padding:0 1.5em;margin-bottom:.5em}',
    '.ng-row__list{position:relative;display:flex;gap:.8em;overflow:hidden;padding:.6em 1.5em}',
    '.ng-card{flex:0 0 9.5em;border-radius:.6em;transition:transform .15s}',
    '.ng-card__img{height:13.5em;border-radius:.6em;background-color:var(--ng-surface);background-size:cover;background-position:center;box-shadow:0 10px 26px rgba(0,0,0,.6)}',
    '.ng-card__name{font-size:.85em;margin-top:.45em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '.ng-card__sub{font-size:.75em;color:var(--ng-dim)}',
    '.ng-card.focus{transform:scale(1.05)}',
    '.ng-card.focus .ng-card__img{box-shadow:0 0 0 2px var(--ng-accent),0 0 28px var(--ng-glow)}',
    '.ng-tile{flex:0 0 8em;padding:1.1em .6em;border-radius:.7em;background:var(--ng-surface);border:1px solid var(--ng-line);text-align:center}',
    '.ng-tile span{display:block;font-size:1.8em;margin-bottom:.3em}',
    '.ng-tile.wide{flex-basis:16em}',
    '.ng-tile.focus{border-color:var(--ng-accent);box-shadow:0 0 22px var(--ng-glow)}'
  ].join('');

  function img(path, size) {
    if (!path) return '';
    try { return Lampa.TMDB.image('t/p/' + size + path); } catch (e) { return 'https://image.tmdb.org/t/p/' + size + path; }
  }
  function tmdb(path, type, cb) {
    try {
      var lg = Lampa.Storage.field('tmdb_lang') || 'uk';
      var url = Lampa.TMDB.api(path + (path.indexOf('?') > -1 ? '&' : '?') + 'api_key=' + Lampa.TMDB.key() + '&language=' + lg);
      new Lampa.Reguest().silent(url, function (j) {
        cb((j && j.results || []).map(function (r) { r.media_type = r.media_type || type; return r; }));
      }, function () { cb([]); });
    } catch (e) { cb([]); }
  }
  function openCard(it) {
    Lampa.Activity.push({ url: '', component: 'full', id: it.id, method: it.media_type || (it.first_air_date ? 'tv' : 'movie'), card: it, source: 'tmdb' });
  }
  function openList(u, t) {
    Lampa.Activity.push({ url: u, title: t, component: 'category_full', source: 'tmdb', page: 1, card_type: true });
  }

  var SECTIONS = [
    { t: 'Популярне', p: 'trending/movie/week', type: 'movie' },
    { t: 'Серіали', p: 'tv/popular', type: 'tv' },
    { t: 'Мультфільми', p: 'discover/movie?with_genres=16&sort_by=popularity.desc', type: 'movie' }
  ];
  var TILES = [
    ['🆕', 'Новинки', 'movie/now_playing'],
    ['🇺🇦', 'Українське', 'discover/movie?with_original_language=uk&sort_by=popularity.desc'],
    ['🏆', 'Топ фільмів', 'movie/top_rated'],
    ['👨‍👧', 'Для дітей', 'discover/movie?with_genres=10751,16&sort_by=popularity.desc'],
    ['📺', 'Топ серіалів', 'tv/top_rated']
  ];

  function Home() {
    var self = this, root = $('<div class="ng-home"></div>'), last = false, hero = null, heroTimer;

    function setHero(it) {
      if (!hero || !it) return;
      var bg = img(it.backdrop_path || it.poster_path, 'w1280');
      var y = (it.release_date || it.first_air_date || '').slice(0, 4);
      hero.css('background-image', bg ? 'url(' + bg + ')' : 'none');
      hero.find('.ng-hero__tag').text(it.media_type === 'tv' ? 'Серіал' : 'Фільм');
      hero.find('.ng-hero__title').text(it.title || it.name || '');
      hero.find('.ng-hero__meta').text([y, it.vote_average ? '★ ' + it.vote_average.toFixed(1) : ''].filter(Boolean).join('  •  '));
      hero.find('.ng-hero__txt').text(it.overview || '');
      hero.data('item', it);
    }

    function reveal(el) {
      var $e = $(el);
      if ($e.closest('.ng-hero').length) { root[0].scrollTop = 0; return; }
      var list = $e.parent();
      list[0].scrollLeft = el.offsetLeft - (list.width() - $e.outerWidth()) / 2;
      try { el.scrollIntoView({ block: 'center', inline: 'nearest' }); } catch (e) {}
    }

    function row(title) {
      var r = $('<div class="ng-row"><div class="ng-row__t"></div><div class="ng-row__list"></div></div>');
      r.find('.ng-row__t').text(title); root.append(r); return r.find('.ng-row__list');
    }

    function build(data) {
      var first = (data[0] || []).filter(function (x) { return x.backdrop_path; })[0];
      hero = $('<div class="ng-hero"><div class="ng-hero__in"><div class="ng-hero__tag"></div><div class="ng-hero__title"></div>' +
        '<div class="ng-hero__meta"></div><div class="ng-hero__txt"></div><div class="ng-hero__btns"></div></div></div>');
      ['▶ Дивитись', 'Детальніше'].forEach(function (t, i) {
        var b = $('<div class="ng-btn selector' + (i === 0 ? ' main' : '') + '"></div>').text(t);
        b.on('hover:enter click', function () { var it = hero.data('item'); if (it) openCard(it); });
        b.on('hover:focus', function () { last = this; reveal(this); });
        hero.find('.ng-hero__btns').append(b);
      });
      root.append(hero); setHero(first);

      SECTIONS.forEach(function (s, i) {
        var items = data[i] || []; if (!items.length) return;
        var list = row(s.t);
        items.slice(0, 20).forEach(function (it) {
          var y = (it.release_date || it.first_air_date || '').slice(0, 4);
          var c = $('<div class="ng-card selector"><div class="ng-card__img"></div><div class="ng-card__name"></div><div class="ng-card__sub"></div></div>');
          c.find('.ng-card__img').css('background-image', 'url(' + img(it.poster_path, 'w342') + ')');
          c.find('.ng-card__name').text(it.title || it.name || '');
          c.find('.ng-card__sub').text([it.vote_average ? '★ ' + it.vote_average.toFixed(1) : '', y].filter(Boolean).join(' · '));
          c.on('hover:enter click', function () { openCard(it); });
          c.on('hover:focus', function () {
            last = this; reveal(this);
            clearTimeout(heroTimer); heroTimer = setTimeout(function () { setHero(it); }, 350);
          });
          list.append(c);
        });
      });

      var tl = row('Мої добірки');
      TILES.forEach(function (t) {
        var el = $('<div class="ng-tile selector"><span></span><div></div></div>');
        el.find('span').text(t[0]); el.find('div').text(t[1]);
        el.on('hover:enter click', function () { openList(t[2], t[1]); });
        el.on('hover:focus', function () { last = this; reveal(this); });
        tl.append(el);
      });
      var music = find(4);
      if (music) {
        var m = $('<div class="ng-tile wide selector"><span>🎵</span><div>Музика онлайн</div></div>');
        m.on('hover:enter click', function () { music.trigger('hover:enter'); });
        m.on('hover:focus', function () { last = this; reveal(this); });
        tl.append(m);
      }
    }

    this.create = function () {
      var data = {}, left = SECTIONS.length, done = false;
      function finish() {
        if (done) return; done = true;
        try { build(data); } catch (e) { console.log('NextGen home:', e); root.text('Не вдалося побудувати головну'); }
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
    if (!document.getElementById('ng-style')) {
      var s = document.createElement('style'); s.id = 'ng-style'; s.textContent = CSS + HOME_CSS; document.head.appendChild(s);
    }
    try { Lampa.Component.add('ng_home', Home); } catch (e) { console.log('NextGen comp:', e); }
    try { bar(); } catch (e) { console.log('NextGen bar:', e); }
    if (Lampa.Storage.get('nextgen_home', 'true') !== 'false') setTimeout(function () {
      try { if (Lampa.Activity.active().component === 'main') Lampa.Activity.replace({ url: '', title: 'Головна', component: 'ng_home', page: 1 }); } catch (e) {}
    }, 1500);
  }

  if (window.appready) start();
  else Lampa.Listener.follow('app', function (e) { if (e.type === 'ready') start(); });
})();
