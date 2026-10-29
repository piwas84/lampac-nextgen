/* Lampac NextGen — Cinema Dark UA v3.6
   Music fix + плавні переходи + рівні картки + відступи
*/
(function () {
  'use strict';
  if (window.__nextgen) return;
  window.__nextgen = true;


  var CSS = [
    ':root{',
    '--ng-bg:#06070b;',
    '--ng-surface:#0c0f17;',
    '--ng-line:rgba(255,255,255,.08);',
    '--ng-text:#eceae4;',
    '--ng-dim:#8b8f9a;',
    '--ng-accent:#0057B7;',
    '--ng-gold:#FFD700;',
    '--ng-glow:rgba(0,87,183,.38)',
    '}',
    'body{background:var(--ng-bg)!important;color:var(--ng-text)}',
    'body::after{content:"";position:fixed;inset:0;pointer-events:none;z-index:1;',
    'background:radial-gradient(ellipse at center,transparent 55%,rgba(0,0,0,.55) 100%)}',

    /* Меню Lampa — без змін, повністю оригінальне */

    '.settings-folder.focus,.settings-param.focus,.selector.focus{',
    'background:linear-gradient(90deg,var(--ng-glow),transparent)!important;color:#fff!important}',
    '.card.focus .card__view::after,.card.hover .card__view::after{border-color:var(--ng-accent)!important;',
    'box-shadow:0 0 28px var(--ng-glow)}',
    '.card__view{border-radius:.6em;box-shadow:0 10px 30px rgba(0,0,0,.65)}',
    '.items-line__title,.full-start-new__title,.full-start__title{letter-spacing:.03em;font-weight:400}',
    '.full-start-new__tagline,.card__age,.card__type{color:var(--ng-dim)}',
    '.full-start__button.focus,.full-start-new__button.focus,.simple-button.focus{',
    'background:var(--ng-accent)!important;color:#fff!important}',
    '.settings,.settings__content{background:var(--ng-surface)!important;border-color:var(--ng-line)!important}',

    'body.ng-on .head__body{display:none!important}',
    '.ng-bar{display:flex;align-items:center;gap:.9em;padding:.55em 1.1em;width:100%;',
    'background:linear-gradient(180deg,rgba(6,7,11,.97),rgba(6,7,11,0));position:relative;z-index:20}',
    
    'body.ng-search-open .ng-bar{display:none!important}',
    'body.ng-search-open .head__body{display:flex!important}',

    '.ng-menu-btn{',
    '  width:2em;height:2em;display:flex;align-items:center;justify-content:center;',
    '  border-radius:.5em;font-size:1.15em;color:var(--ng-text);',
    '  background:rgba(255,255,255,.07);border:1px solid var(--ng-line);',
    '  transition:all .18s ease;flex-shrink:0}',
    '.ng-menu-btn.focus,.ng-menu-btn.hover{',
    '  background:var(--ng-accent)!important;color:#fff;',
    '  box-shadow:0 0 16px var(--ng-glow);border-color:transparent}',
    
    '.ng-logo{font-size:1.45em;font-weight:700;line-height:1;letter-spacing:.02em}',
    '.ng-logo .ng-lampac{color:var(--ng-accent)}',
    '.ng-logo .ng-nextgen{display:block;font-size:.52em;color:var(--ng-gold);letter-spacing:.14em;margin-top:.12em;font-weight:600}',

    '.ng-tabs{display:flex;gap:.2em;flex:1;justify-content:center}',
    '.ng-tab{padding:.48em .95em;border-radius:.5em;color:var(--ng-dim);font-size:.95em;font-weight:500}',
    '.ng-tab.active{background:var(--ng-accent);color:#fff}',
    '.ng-tab.focus{outline:2px solid var(--ng-gold);outline-offset:1px}',

    '.ng-right{display:flex;align-items:center;gap:1em}',
    '.ng-clock{text-align:right;line-height:1.1}.ng-clock b{font-size:1.2em;font-weight:500}',
    '.ng-clock small{display:block;color:var(--ng-dim);font-size:.55em}',
    '.ng-user{',
    '  padding:.35em .8em;border:1px solid var(--ng-line);border-radius:2em;font-size:.78em;',
    '  transition:all .18s ease}',
    '.ng-user.focus,.ng-user.hover{',
    '  background:var(--ng-accent)!important;color:#fff;border-color:transparent;',
    '  box-shadow:0 0 14px var(--ng-glow)}'
  ].join('');

  var TABS = [
    ['Головна', /головн|^main$|home/i],
    ['Фільми', /фільм|фильм|movie/i],
    ['Серіали', /серіал|сериал|series|tv ?show/i],
    ['Мультфільми', /мульт|cartoon/i],
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
    if (i === 0) {
      try {
        Lampa.Activity.push({ url: '', title: 'Головна', component: 'ng_home', page: 1 });
        return true;
      } catch (e) {}
    }
    if (i === 5 || !TABS[i][1]) {
      openSearch();
      return true;
    }

    var hit = find(i);
    if (hit) { hit.trigger('hover:enter'); return true; }

    if (i === 1) Lampa.Activity.push({ url: 'movie', title: 'Фільми', component: 'category', source: 'tmdb', page: 1 });
    else if (i === 2) Lampa.Activity.push({ url: 'tv', title: 'Серіали', component: 'category', source: 'tmdb', page: 1 });
    else if (i === 3) Lampa.Activity.push({ url: 'discover/movie?with_genres=16&sort_by=popularity.desc', title: 'Мультфільми', component: 'category_full', source: 'tmdb', page: 1, card_type: true });
    else if (i === 4) {
      var tvHit = find(4);
      if (tvHit) tvHit.trigger('hover:enter');
      else Lampa.Noty.show('Розділ ТБ не знайдено в меню');
    }
    else {
      Lampa.Noty.show('Розділ «' + TABS[i][0] + '» не знайдено');
      return false;
    }
    return true;
  }

  function openSearch() {
    $('body').addClass('ng-search-open');
    try {
      if (Lampa.Search && typeof Lampa.Search.open === 'function') Lampa.Search.open();
      else {
        var btn = $('.open--search, .head__action-search').first();
        if (btn.length) btn.trigger('hover:enter');
        else Lampa.Noty.show('Пошук недоступний');
      }
    } catch (e) {
      Lampa.Noty.show('Пошук недоступний');
    }
    setTimeout(watchSearchClose, 500);
  }

  function watchSearchClose() {
    var check = setInterval(function () {
      var isSearch = false;
      try {
        var act = Lampa.Activity.active();
        if (act && (act.component === 'search' || (act.title && String(act.title).toLowerCase().indexOf('пошук') > -1))) isSearch = true;
      } catch (e) {}
      if ($('.search, .search-input, .search__input').filter(':visible').length) isSearch = true;

      if (!isSearch) {
        $('body').removeClass('ng-search-open');
        clearInterval(check);
      }
    }, 700);
    setTimeout(function () {
      clearInterval(check);
      $('body').removeClass('ng-search-open');
    }, 30000);
  }


  function prune() {
    // Не ховаємо основні вкладки (Головна, Фільми, Серіали, Мультфільми, ТБ, Пошук)
    // prune більше нічого не ховає — щоб ТБ завжди був видимий
  }

  function clock(el) {
    var d = new Date();
    el.find('b').text(d.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' }));
    el.find('small').text(d.toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' }));
  }

  function openSettings() {
    try {
      if (Lampa.Settings && Lampa.Settings.open) Lampa.Settings.open();
      else if (Lampa.Controller) Lampa.Controller.toggle('settings');
      else {
        var found = false;
        $('.menu .menu__item').each(function () {
          var txt = $(this).find('.menu__text').text().toLowerCase();
          if (!found && (txt.indexOf('налашт') > -1 || txt.indexOf('setting') > -1)) {
            $(this).trigger('hover:enter');
            found = true;
          }
        });
        if (!found) Lampa.Noty.show('Налаштування не знайдено');
      }
    } catch (e) {
      Lampa.Noty.show('Не вдалося відкрити налаштування');
    }
  }

  function bar() {
    if ($('.ng-bar').length) return;

    var el = $('<div class="ng-bar"></div>');

    var menuBtn = $('<div class="ng-menu-btn selector" title="Меню">☰</div>');
    menuBtn.on('hover:enter click', function () {
      try {
        Lampa.Controller.toggle('menu');
      } catch (e1) {
        try {
          if (Lampa.Menu && Lampa.Menu.toggle) Lampa.Menu.toggle();
          else $('.menu').trigger('hover:enter');
        } catch (e2) {}
      }
    });
    el.append(menuBtn);

    el.append('<div class="ng-logo"><span class="ng-lampac">Lampac</span><span class="ng-nextgen">NEXTGEN</span></div>');

    var tabs = $('<div class="ng-tabs"></div>');
    TABS.forEach(function (t, i) {
      var tab = $('<div class="ng-tab selector">' + t[0] + '</div>');
      if (i === 0) tab.addClass('active');
      tab.on('hover:enter click', function () {
        if (go(i)) {
          $('.ng-tab').removeClass('active');
          tab.addClass('active');
        }
      });
      tabs.append(tab);
    });
    el.append(tabs);

    var right = $('<div class="ng-right"></div>');
    var clockEl = $('<div class="ng-clock"><b></b><small></small></div>');
    right.append(clockEl);

    var userBtn = $('<div class="ng-user selector">Admin</div>');
    userBtn.on('hover:enter click', openSettings);
    right.append(userBtn);

    el.append(right);
    $('.head').append(el);
    $('body').addClass('ng-on');
    clock(clockEl);
    setInterval(function () { clock(clockEl); }, 15000);
    setTimeout(prune, 1500);
    setTimeout(prune, 6000);
  }

  var HOME_CSS = [
    '.ng-home{max-height:calc(100vh - 5.2em);overflow-y:auto;overflow-x:hidden;padding-bottom:2.8em}',
    '.ng-home::-webkit-scrollbar{display:none}',

    '.ng-hero{position:relative;height:38vh;min-height:12.5em;background-size:cover;background-position:center 20%;margin-bottom:1.1em;',
    'transition:background-image .55s ease}',
    '.ng-hero::before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#06070b 8%,rgba(6,7,11,.55) 50%,rgba(6,7,11,.1)),linear-gradient(0deg,#06070b 2%,transparent 45%)}',
    '.ng-hero__in{position:relative;padding:1.4em 1.3em;max-width:52%}',
    '.ng-hero__tag{display:inline-block;padding:.2em .6em;border-radius:.35em;background:rgba(255,255,255,.12);font-size:.78em;margin-bottom:.45em}',
    '.ng-hero__title{font-size:2.1em;font-weight:600;line-height:1.1;margin-bottom:.22em}',
    '.ng-hero__meta{color:var(--ng-dim);font-size:.85em;margin-bottom:.45em}',
    '.ng-hero__txt{font-size:.85em;line-height:1.4;color:#cfd2da;max-height:3.6em;overflow:hidden;margin-bottom:.8em}',
    '.ng-hero__btns{display:flex;gap:.45em;align-items:center;flex-wrap:wrap}',
    '.ng-btn{padding:.5em 1.15em;border-radius:.45em;background:rgba(255,255,255,.12);font-size:.9em;transition:all .18s ease}',
    '.ng-btn.main{background:var(--ng-accent);color:#fff}',
    '.ng-btn.focus{outline:2px solid var(--ng-gold);outline-offset:1px}',

    '.ng-hero-nav{display:flex;gap:.3em;margin-left:.7em}',
    '.ng-hero-dot{width:.48em;height:.48em;border-radius:50%;background:rgba(255,255,255,.28);transition:all .22s ease}',
    '.ng-hero-dot.active{background:var(--ng-gold);transform:scale(1.35)}',
    '.ng-hero-dot.focus{outline:2px solid #fff;outline-offset:2px}',

    /* Ряди */
    '.ng-row{margin-bottom:1.35em}',
    '.ng-row__t{',
    '  font-size:1.28em;padding:0 1.35em;margin-bottom:.55em;',
    '  font-weight:600;color:#fff;letter-spacing:.02em;',
    '  border-left:3px solid var(--ng-gold);padding-left:.75em}',

    /* Картки — рівні + відступи */
    '.ng-row__list{',
    '  display:flex;gap:1.25em;overflow-x:auto;overflow-y:hidden;',
    '  padding:.7em 1.35em 1.1em;scroll-behavior:smooth;',
    '  -webkit-overflow-scrolling:touch;',
    '  align-items:flex-start}',
    '.ng-row__list::-webkit-scrollbar{display:none}',

    '.ng-card{',
    '  flex:0 0 10.4em;',
    '  width:10.4em;',
    '  border-radius:.65em;',
    '  transition:transform .2s ease, box-shadow .2s ease}',
    '.ng-card__img{',
    '  width:100%;height:14.8em;',
    '  border-radius:.6em;',
    '  background-color:var(--ng-surface);',
    '  background-size:cover;background-position:center;',
    '  box-shadow:0 8px 24px rgba(0,0,0,.55);',
    '  transition:box-shadow .2s ease}',
    '.ng-card__name{',
    '  font-size:.84em;margin-top:.5em;',
    '  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;',
    '  font-weight:500;line-height:1.25}',
    '.ng-card__sub{font-size:.74em;color:var(--ng-dim);margin-top:.15em}',
    '.ng-card.focus{transform:scale(1.08)}',
    '.ng-card.focus .ng-card__img{box-shadow:0 0 0 2.5px var(--ng-accent),0 0 28px var(--ng-glow)}',

    /* Плитки */
    '.ng-tile{',
    '  flex:0 0 8.4em;width:8.4em;',
    '  padding:1.1em .55em;border-radius:.75em;',
    '  background:var(--ng-surface);border:1px solid var(--ng-line);',
    '  text-align:center;transition:all .2s ease}',
    '.ng-tile span{display:block;font-size:1.8em;margin-bottom:.3em}',
    '.ng-tile.focus{border-color:var(--ng-accent);box-shadow:0 0 22px var(--ng-glow);transform:scale(1.05)}',
  ].join('');

  function img(path, size) {
    if (!path) return '';
    try { return Lampa.TMDB.image('t/p/' + size + path); }
    catch (e) { return 'https://image.tmdb.org/t/p/' + size + path; }
  }

  function normalizeItem(item) {
    if (!item) return item;
    var type = item.media_type;
    if (type !== 'movie' && type !== 'tv') {
      if (item.first_air_date || item.name || item.original_name) type = 'tv';
      else type = 'movie';
    }
    item.media_type = type;
    return item;
  }

  function tmdb(path, cb) {
    try {
      if (Lampa.Api && Lampa.Api.list) {
        Lampa.Api.list({ url: path, page: 1 }, function (result) {
          var list = (result && result.results) ? result.results : (Array.isArray(result) ? result : []);
          cb(list.map(normalizeItem));
        }, function () { rawTmdb(path, cb); });
        return;
      }
    } catch (e) {}
    rawTmdb(path, cb);
  }

  function rawTmdb(path, cb) {
    try {
      var lg = Lampa.Storage.field('tmdb_lang') || 'uk';
      var key = '';
      try { key = (Lampa.TMDB && Lampa.TMDB.key) ? Lampa.TMDB.key() : ''; } catch (e) {}

      var sep = path.indexOf('?') > -1 ? '&' : '?';
      var fullPath = path + sep + 'language=' + lg;
      if (key) fullPath += '&api_key=' + key;

      var url = (Lampa.TMDB && Lampa.TMDB.api) ? Lampa.TMDB.api(fullPath) : ('https://api.themoviedb.org/3/' + fullPath);

      new Lampa.Reguest().silent(url, function (json) {
        var list = (json && Array.isArray(json.results)) ? json.results : [];
        cb(list.map(normalizeItem));
      }, function () { cb([]); });
    } catch (e) { cb([]); }
  }

  function openCard(it) {
    if (!it || !it.id) return;
    it = normalizeItem(it);
    var method = it.media_type === 'tv' ? 'tv' : 'movie';
    Lampa.Activity.push({
      url: '',
      component: 'full',
      id: it.id,
      method: method,
      card: it,
      source: 'tmdb'
    });
  }

  function openList(u, t) {
    Lampa.Activity.push({
      url: u,
      title: t,
      component: 'category_full',
      source: 'tmdb',
      page: 1,
      card_type: true
    });
  }

  var SECTIONS = [
    { t: 'Популярне',     p: 'trending/all/week' },
    { t: 'Зараз у кіно',  p: 'movie/now_playing' },
    { t: 'Серіали',       p: 'tv/popular' },
    { t: 'Топ фільмів',   p: 'movie/top_rated' },
    { t: 'Мультфільми',   p: 'discover/movie?with_genres=16&sort_by=popularity.desc' },
    { t: 'Українське',    p: 'discover/movie?with_original_language=uk&sort_by=popularity.desc' },
    { t: 'Топ серіалів',  p: 'tv/top_rated' }
  ];

  var TILES = [
    ['🆕', 'Новинки', 'movie/now_playing'],
    ['🇺🇦', 'Українське', 'discover/movie?with_original_language=uk&sort_by=popularity.desc'],
    ['🏆', 'Топ фільмів', 'movie/top_rated'],
    ['👨‍👧', 'Для дітей', 'discover/movie?with_genres=10751,16&sort_by=popularity.desc'],
    ['📺', 'Топ серіалів', 'tv/top_rated']
  ];

  function Home() {
    var self = this,
        root = $('<div class="ng-home"></div>'),
        last = false,
        hero = null,
        heroItems = [],
        heroIndex = 0,
        autoTimer = null,
        heroTimer = null;

    function setHero(it, idx) {
      if (!hero || !it) return;
      it = normalizeItem(it);
      var bg = img(it.backdrop_path || it.poster_path, 'w1280');
      var y = (it.release_date || it.first_air_date || '').slice(0, 4);
      var vote = it.vote_average ? '★ ' + Number(it.vote_average).toFixed(1) : '';

      hero.css('background-image', bg ? 'url(' + bg + ')' : 'none');
      hero.find('.ng-hero__tag').text(it.media_type === 'tv' ? 'Серіал' : 'Фільм');
      hero.find('.ng-hero__title').text(it.title || it.name || '');
      hero.find('.ng-hero__meta').text([y, vote].filter(Boolean).join('  •  '));
      hero.find('.ng-hero__txt').text(it.overview || '');
      hero.data('item', it);

      hero.find('.ng-hero-dot').removeClass('active');
      if (typeof idx === 'number') {
        hero.find('.ng-hero-dot').eq(idx).addClass('active');
        heroIndex = idx;
      }
    }

    function nextHero() {
      if (heroItems.length < 2) return;
      heroIndex = (heroIndex + 1) % Math.min(heroItems.length, 7);
      setHero(heroItems[heroIndex], heroIndex);
    }

    function startAuto() {
      stopAuto();
      autoTimer = setInterval(nextHero, 7000);
    }

    function stopAuto() {
      if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
    }

    function scrollToCard(cardEl) {
      if (!cardEl) return;
      var $list = $(cardEl).closest('.ng-row__list');
      if (!$list.length) return;
      var list = $list[0];
      var target = cardEl.offsetLeft - (list.clientWidth - cardEl.offsetWidth) / 2;
      list.scrollLeft = Math.max(0, target);
    }

    function reveal(el) {
      if (!el) return;
      if ($(el).closest('.ng-hero').length) {
        root[0].scrollTop = 0;
        return;
      }
      scrollToCard(el);
      try { el.scrollIntoView({ block: 'nearest', inline: 'nearest' }); } catch (e) {}
    }

    function row(title) {
      var r = $('<div class="ng-row"><div class="ng-row__t"></div><div class="ng-row__list"></div></div>');
      r.find('.ng-row__t').text(title);
      root.append(r);
      return r.find('.ng-row__list');
    }

    function build(data) {
      heroItems = [];
      (data[0] || []).forEach(function (it) {
        if (it.backdrop_path) heroItems.push(normalizeItem(it));
      });
      if (!heroItems.length && data[0]) heroItems = (data[0] || []).slice(0, 6).map(normalizeItem);

      hero = $('<div class="ng-hero"><div class="ng-hero__in">' +
        '<div class="ng-hero__tag"></div>' +
        '<div class="ng-hero__title"></div>' +
        '<div class="ng-hero__meta"></div>' +
        '<div class="ng-hero__txt"></div>' +
        '<div class="ng-hero__btns"></div></div></div>');

      var btns = hero.find('.ng-hero__btns');

      ['▶ Дивитись', 'Детальніше'].forEach(function (t, idx) {
        var b = $('<div class="ng-btn selector' + (idx === 0 ? ' main' : '') + '"></div>').text(t);
        b.on('hover:enter click', function () {
          var it = hero.data('item');
          if (it) openCard(it);
        });
        b.on('hover:focus', function () { last = this; reveal(this); stopAuto(); });
        btns.append(b);
      });

      if (heroItems.length > 1) {
        var nav = $('<div class="ng-hero-nav"></div>');
        var max = Math.min(heroItems.length, 7);
        for (var d = 0; d < max; d++) {
          (function (index) {
            var dot = $('<div class="ng-hero-dot selector"></div>');
            if (index === 0) dot.addClass('active');
            dot.on('hover:enter click', function () {
              setHero(heroItems[index], index);
              stopAuto();
              startAuto();
            });
            nav.append(dot);
          })(d);
        }
        btns.append(nav);
      }

      root.append(hero);
      if (heroItems[0]) setHero(heroItems[0], 0);
      startAuto();

      SECTIONS.forEach(function (s, idx) {
        var items = data[idx] || [];
        if (!items.length) return;

        var list = row(s.t);
        items.slice(0, 14).forEach(function (it) {
          it = normalizeItem(it);
          var y = (it.release_date || it.first_air_date || '').slice(0, 4);
          var vote = it.vote_average ? '★ ' + Number(it.vote_average).toFixed(1) : '';

          var c = $('<div class="ng-card selector"><div class="ng-card__img"></div><div class="ng-card__name"></div><div class="ng-card__sub"></div></div>');
          c.find('.ng-card__img').css('background-image', 'url(' + img(it.poster_path, 'w342') + ')');
          c.find('.ng-card__name').text(it.title || it.name || '');
          c.find('.ng-card__sub').text([vote, y].filter(Boolean).join(' · '));

          c.on('hover:enter click', function () { openCard(it); });
          c.on('hover:focus', function () {
            last = this;
            reveal(this);
            clearTimeout(heroTimer);
            heroTimer = setTimeout(function () {
              setHero(it);
              stopAuto();
            }, 300);
          });
          list.append(c);
        });
      });

      // Мої добірки + Music
      var tl = row('Мої добірки');
      TILES.forEach(function (t) {
        var el = $('<div class="ng-tile selector"><span></span><div></div></div>');
        el.find('span').text(t[0]);
        el.find('div').text(t[1]);
        el.on('hover:enter click', function () { openList(t[2], t[1]); });
        el.on('hover:focus', function () { last = this; reveal(this); });
        tl.append(el);
      });


    }

    this.create = function () {
      var data = {};
      var left = SECTIONS.length;
      var done = false;

      function finish() {
        if (done) return;
        done = true;
        try { build(data); }
        catch (e) {
          console.log('NextGen build error:', e);
          root.html('<div style="padding:2em;text-align:center;color:var(--ng-dim)">Помилка побудови головної</div>');
        }
        self.activity.loader(false);
        self.activity.toggle();
      }

      self.activity.loader(true);

      SECTIONS.forEach(function (s, i) {
        tmdb(s.p, function (r) {
          data[i] = r;
          if (--left === 0) finish();
        });
      });

      setTimeout(finish, 14000);
    };

    this.start = function () {
      if (Lampa.Activity.active().activity !== self.activity) return;

      Lampa.Controller.add('ng_home', {
        toggle: function () {
          Lampa.Controller.collectionSet(root);
          Lampa.Controller.collectionFocus(last || false, root);
        },
        left: function () {
          if (Navigator.canmove('left')) {
            Navigator.move('left');
          } else {
            Lampa.Controller.toggle('menu');
          }
        },
        right: function () {
          if (Navigator.canmove('right')) Navigator.move('right');
        },
        up: function () {
          if (Navigator.canmove('up')) Navigator.move('up');
          else Lampa.Controller.toggle('head');
        },
        down: function () {
          if (Navigator.canmove('down')) Navigator.move('down');
        },
        back: function () {
          Lampa.Activity.backward();
        }
      });
      Lampa.Controller.toggle('ng_home');
    };

    this.pause = function () { stopAuto(); };
    this.stop = function () { stopAuto(); };
    this.render = function () { return root; };
    this.destroy = function () {
      stopAuto();
      clearTimeout(heroTimer);
      root.remove();
    };
  }

  function start() {
    try {
      if (Lampa.Storage.get('nextgen_cinema', 'true') === 'false') return;
    } catch (e) {}

    if (!document.getElementById('ng-style')) {
      var s = document.createElement('style');
      s.id = 'ng-style';
      s.textContent = CSS + HOME_CSS;
      document.head.appendChild(s);
    }

    try { Lampa.Component.add('ng_home', Home); } catch (e) {}
    try { bar(); } catch (e) {}

    try {
      Lampa.Listener.follow('activity', function (e) {
        if (e.type === 'start' || e.type === 'push') {
          var comp = (e.object && e.object.component) || '';
          if (comp === 'search' || (e.object && e.object.title && String(e.object.title).toLowerCase().indexOf('пошук') > -1)) {
            $('body').addClass('ng-search-open');
          } else {
            $('body').removeClass('ng-search-open');
          }
        }
      });
    } catch (e) {}

    if (Lampa.Storage.get('nextgen_home', 'true') !== 'false') {
      setTimeout(function () {
        try {
          var act = Lampa.Activity.active();
          if (act && (act.component === 'main' || act.component === 'category')) {
            Lampa.Activity.replace({
              url: '',
              title: 'Головна',
              component: 'ng_home',
              page: 1
            });
          }
        } catch (e) {}
      }, 1800);
    }
  }

  if (window.appready) start();
  else Lampa.Listener.follow('app', function (e) {
    if (e.type === 'ready') start();
  });
})();
