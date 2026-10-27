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
