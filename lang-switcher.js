(function () {
  'use strict';

  /* ─── URL MAPPING TABLE ─────────────────────────────────────────────
     Each entry: [ es_canonical, pt_canonical, fr_canonical ]
     Trailing slashes stripped for matching. Empty/'/xx/' = no exact
     equivalent, switcher falls back to that language's homepage.
  ─────────────────────────────────────────────────────────────────── */
  var MAP = [
    // Root
    ['/', '/pt/', '/fr/'],

    // Species pages
    ['/loro-gris-africano', '/pt/papagaio-cinzento', '/fr/perroquet-gris-du-gabon'],
    ['/loro-gris-africano.html', '/pt/papagaio-cinzento', '/fr/perroquet-gris-du-gabon'],
    ['/guacamayos', '/pt/arara-a-venda', '/fr/ara-bleu-et-jaune'],
    ['/guacamayos.html', '/pt/arara-a-venda', '/fr/ara-bleu-et-jaune'],
    ['/cacatua', '/pt/cacatua-a-venda', '/fr/cacatoes-huppe-jaune'],
    ['/cacatua.html', '/pt/cacatua-a-venda', '/fr/cacatoes-huppe-jaune'],
    ['/loro-amazonico', '/pt/papagaio-amazona', '/fr/amazone-front-bleu'],
    ['/loro-amazonico.html', '/pt/papagaio-amazona', '/fr/amazone-front-bleu'],
    ['/eclectus', '/pt/papagaio-eclectus', '/fr/eclectus'],
    ['/eclectus.html', '/pt/papagaio-eclectus', '/fr/eclectus'],
    ['/conuro', '/pt/conuro', '/fr/'],
    ['/conuro.html', '/pt/conuro', '/fr/'],

    // Macaw species (PT + FR equivalents)
    ['/available-birds/guacamayo-azul-amarillo.html', '/pt/arara-azul-e-amarela', '/fr/ara-bleu-et-jaune'],
    ['/available-birds/guacamayo-escarlata.html', '/pt/arara-escarlate', '/fr/ara-macao'],
    ['/available-birds/guacamayo-jacinto.html', '/pt/arara-jacinto', '/fr/ara-hyacinthe'],
    ['/available-birds/cacatua.html', '/pt/cacatua-de-crista-amarela', '/fr/cacatoes-huppe-jaune'],

    // Adoption / disponibles
    ['/adopcion-de-loros', '/pt/papagaios-a-venda-portugal', '/fr/perroquets-disponibles'],
    ['/adopcion-de-loros.html', '/pt/papagaios-a-venda-portugal', '/fr/perroquets-disponibles'],
    ['/available-birds/', '/pt/papagaios-disponiveis', '/fr/perroquets-disponibles'],
    ['/tienda', '/pt/papagaios-disponiveis', '/fr/perroquets-disponibles'],
    ['/tienda.html', '/pt/papagaios-disponiveis', '/fr/perroquets-disponibles'],

    // Commercial category pages
    ['/comida-para-loros', '/pt/comida-para-papagaios', '/fr/nourriture-pour-perroquets'],
    ['/comida-para-loros.html', '/pt/comida-para-papagaios', '/fr/nourriture-pour-perroquets'],
    ['/jaulas-para-loros', '/pt/gaiolas-para-papagaios', '/fr/cages-pour-perroquets'],
    ['/jaulas-para-loros.html', '/pt/gaiolas-para-papagaios', '/fr/cages-pour-perroquets'],
    ['/juguetes-naturales-para-loros', '/pt/brinquedos-naturais-para-papagaios', '/fr/jouets-naturels-pour-perroquets'],
    ['/juguetes-naturales-para-loros.html', '/pt/brinquedos-naturais-para-papagaios', '/fr/jouets-naturels-pour-perroquets'],
    ['/transportines-para-loros', '/pt/transportadoras-para-papagaios', '/fr/caisses-de-transport'],
    ['/transportines-para-loros.html', '/pt/transportadoras-para-papagaios', '/fr/caisses-de-transport'],

    // Info / care pages
    ['/nosotros', '/pt/as-nossas-instalacoes', '/fr/a-propos'],
    ['/nosotros.html', '/pt/as-nossas-instalacoes', '/fr/a-propos'],
    ['/faq', '/pt/', '/fr/faq'],
    ['/faq.html', '/pt/', '/fr/faq'],
    ['/cuidados-basicos-de-un-loro', '/pt/', '/fr/'],
    ['/cuanto-cuesta-mantener-un-loro', '/pt/blog/quanto-custa-um-papagaio-em-portugal', '/fr/'],
    ['/documentos-legales-para-adoptar-un-loro', '/pt/blog/documentacao-cites-portugal', '/fr/'],
    ['/errores-comunes-al-adoptar-un-loro', '/pt/', '/fr/'],

    // Blog index
    ['/blog/', '/pt/blog/', '/fr/blog/'],

    // Cities index
    ['/ciudades/', '/pt/cidades/', '/fr/'],

    // Contact
    ['/#contacto', '/pt/contacto', '/fr/contact'],

    // ── Extra equivalents (aligned [es, pt, fr]) ──────────────────
    ['/available-birds/huevos-fertiles.html', '/pt/ovos-fertilizados', '/fr/'],
    ['/loros-especies', '/pt/papagaios-disponiveis', '/fr/perroquets'],
    ['/entrega.html', '/pt/', '/fr/livraison'],
    ['/nosotros', '/pt/as-nossas-instalacoes', '/fr/nos-installations']
  ];

  /* ─── LANGUAGE DETECTION ──────────────────────────────────────── */
  function getLang() {
    var p = window.location.pathname;
    if (p.startsWith('/fr/')) return 'fr';
    if (p.startsWith('/pt/')) return 'pt';
    return 'es';
  }

  /* ─── URL RESOLVER ────────────────────────────────────────────── */
  function resolveURL(targetLang) {
    var currentLang = getLang();
    if (currentLang === targetLang) return null;

    var path = window.location.pathname;
    // Normalize: strip trailing slash (except root), strip .html
    var norm = path.replace(/\/$/, '').replace(/\.html$/, '') || '/';

    var IDX = { es: 0, pt: 1, fr: 2 };
    var srcIdx = IDX[currentLang];
    var dstIdx = IDX[targetLang];

    for (var i = 0; i < MAP.length; i++) {
      var row = MAP[i];
      var src = (row[srcIdx] || '').replace(/\/$/, '').replace(/\.html$/, '') || '/';
      if (norm === src || path === row[srcIdx]) {
        return row[dstIdx] || (targetLang === 'pt' ? '/pt/' : targetLang === 'fr' ? '/fr/' : '/');
      }
    }

    // Prefix fallback: /pt/blog/xxx → /blog/xxx (if going es↔pt blog)
    if (currentLang === 'pt' && targetLang === 'es' && path.startsWith('/pt/blog/')) {
      var slug = path.replace('/pt/blog/', '').replace(/\/$/, '');
      return slug ? '/blog/' + slug + '.html' : '/blog/';
    }
    if (currentLang === 'es' && targetLang === 'pt' && path.startsWith('/blog/')) {
      var slug2 = path.replace('/blog/', '').replace(/\.html$/, '').replace(/\/$/, '');
      return slug2 ? '/pt/blog/' + slug2 : '/pt/blog/';
    }

    // Language homepage fallback
    if (targetLang === 'pt') return '/pt/';
    if (targetLang === 'fr') return '/fr/';
    return '/';
  }

  /* ─── CSS INJECTION ──────────────────────────────────────────── */
  var CSS = [
    '.lang-sw{display:flex;align-items:center;gap:5px;margin-left:10px;flex-shrink:0}',
    '.lang-sw .ls{color:rgba(255,255,255,.55);font-size:.78rem;font-weight:800;letter-spacing:.06em;text-decoration:none;padding:3px 5px;border-radius:4px;transition:color .18s,background .18s;line-height:1;font-family:"Poppins",Arial,sans-serif}',
    '.lang-sw .ls:hover{color:#D4A94F;text-decoration:none}',
    '.lang-sw .ls.ls-on{color:#D4A94F;border-bottom:2px solid #D4A94F;padding-bottom:1px}',
    '.lang-sw .ls-div{color:rgba(255,255,255,.25);font-size:.7rem;user-select:none}',
    /* Mobile */
    '.ls-mob{display:flex;align-items:center;gap:8px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,.15);margin-bottom:6px}',
    '.ls-mob .lsm{font-size:.95rem;font-weight:800;letter-spacing:.06em;text-decoration:none;padding:7px 14px;border-radius:8px;font-family:"Poppins",Arial,sans-serif;transition:background .18s,color .18s;border:1px solid transparent}',
    '.ls-mob .lsm:hover{text-decoration:none}',
    '.ls-mob .lsm.ls-on{background:rgba(212,169,79,.2);color:#D4A94F;border-color:rgba(212,169,79,.5)}',
    '.ls-mob .lsm:not(.ls-on){color:rgba(255,255,255,.6);border-color:rgba(255,255,255,.15)}',
    '.ls-mob .lsm:not(.ls-on):hover{color:#fff;border-color:rgba(255,255,255,.4)}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('ls-styles')) return;
    var s = document.createElement('style');
    s.id = 'ls-styles';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  /* ─── RENDER ──────────────────────────────────────────────────── */
  function buildSwitcher() {
    var lang = getLang();
    var langs = [
      { code: 'es', label: 'ES', url: resolveURL('es') },
      { code: 'pt', label: 'PT', url: resolveURL('pt') },
      { code: 'fr', label: 'FR', url: resolveURL('fr') }
    ];

    /* ── Desktop ── matches ES mega-nav (.nav) and PT simple nav (.topnav) */
    var nav = document.querySelector('nav.nav, .nav[aria-label], nav.topnav');
    if (nav && !nav.querySelector('.lang-sw')) {
      var sw = document.createElement('div');
      sw.className = 'lang-sw';
      sw.setAttribute('aria-label', 'Selector de idioma');
      langs.forEach(function (l, i) {
        if (i > 0) {
          var div = document.createElement('span');
          div.className = 'ls-div';
          div.textContent = '|';
          sw.appendChild(div);
        }
        var a = document.createElement('a');
        a.className = 'ls' + (l.code === lang ? ' ls-on' : '');
        a.textContent = l.label;
        a.setAttribute('lang', l.code === 'es' ? 'es' : l.code === 'pt' ? 'pt' : 'fr');
        if (l.code === lang) {
          a.href = '#';
          a.setAttribute('aria-current', 'true');
          a.addEventListener('click', function (e) { e.preventDefault(); });
        } else {
          a.href = l.url;
          a.addEventListener('click', function () {
            try { localStorage.setItem('ls_lang', l.code); } catch (e) {}
          });
        }
        sw.appendChild(a);
      });
      nav.appendChild(sw);
    }

    /* ── Mobile ── */
    var mobileList = document.querySelector('.nav-mobile-list');
    if (mobileList && !mobileList.querySelector('.ls-mob')) {
      var mob = document.createElement('div');
      mob.className = 'ls-mob';
      mob.setAttribute('aria-label', 'Selector de idioma móvil');
      langs.forEach(function (l) {
        var a = document.createElement('a');
        a.className = 'lsm' + (l.code === lang ? ' ls-on' : '');
        a.textContent = l.label;
        a.setAttribute('lang', l.code === 'es' ? 'es' : l.code === 'pt' ? 'pt' : 'fr');
        if (l.code === lang) {
          a.href = '#';
          a.setAttribute('aria-current', 'true');
          a.addEventListener('click', function (e) { e.preventDefault(); });
        } else {
          a.href = l.url;
          a.addEventListener('click', function () {
            try { localStorage.setItem('ls_lang', l.code); } catch (e) {}
          });
        }
        mob.appendChild(a);
      });
      mobileList.insertBefore(mob, mobileList.firstChild);
    }

    /* ── hreflang injection (supplement static tags) ── */
    injectHreflang(lang);
  }

  function injectHreflang(lang) {
    var base = 'https://www.paraisodeaves.com';
    var cur  = window.location.pathname;
    var esURL = lang === 'es' ? cur : (resolveURL('es') || cur);
    var ptURL = lang === 'pt' ? cur : (resolveURL('pt') || '/pt/');
    var frURL = lang === 'fr' ? cur : (resolveURL('fr') || '/fr/');

    var tags = [
      { hl: 'es-ES', href: base + esURL },
      { hl: 'pt-PT', href: base + ptURL },
      { hl: 'fr-FR', href: base + frURL },
      { hl: 'x-default', href: base + '/' }
    ];

    // Upsert: correct stale static alternates (many FR pages point es/pt to
    // homepages) and add any that are missing.
    tags.forEach(function (t) {
      var link = document.querySelector('link[rel="alternate"][hreflang="' + t.hl + '"]');
      if (!link) {
        link = document.createElement('link');
        link.rel = 'alternate';
        link.setAttribute('hreflang', t.hl);
        document.head.appendChild(link);
      }
      link.href = t.href;
    });
  }

  /* ─── INIT ──────────────────────────────────────────────────── */
  function init() {
    injectCSS();
    buildSwitcher();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
