(function () {
  'use strict';

  /* ─── URL MAPPING TABLE ─────────────────────────────────────────────
     Each entry: [ es_canonical, pt_canonical, fr_canonical ]
     Trailing slashes stripped for matching; /fr/ pages don't exist yet.
  ─────────────────────────────────────────────────────────────────── */
  var MAP = [
    // Root
    ['/', '/pt/', '/fr/'],

    // Species pages
    ['/loro-gris-africano', '/pt/papagaio-cinzento', '/fr/'],
    ['/loro-gris-africano.html', '/pt/papagaio-cinzento', '/fr/'],
    ['/guacamayos', '/pt/arara-a-venda', '/fr/'],
    ['/guacamayos.html', '/pt/arara-a-venda', '/fr/'],
    ['/cacatua', '/pt/cacatua-a-venda', '/fr/'],
    ['/cacatua.html', '/pt/cacatua-a-venda', '/fr/'],
    ['/loro-amazonico', '/pt/papagaio-amazona', '/fr/'],
    ['/loro-amazonico.html', '/pt/papagaio-amazona', '/fr/'],
    ['/eclectus', '/pt/papagaio-eclectus', '/fr/'],
    ['/eclectus.html', '/pt/papagaio-eclectus', '/fr/'],
    ['/conuro', '/pt/conuro', '/fr/'],
    ['/conuro.html', '/pt/conuro', '/fr/'],

    // Macaw species (PT equivalents)
    ['/available-birds/guacamayo-azul-amarillo.html', '/pt/arara-azul-e-amarela', '/fr/'],
    ['/available-birds/guacamayo-escarlata.html', '/pt/arara-escarlate', '/fr/'],
    ['/available-birds/guacamayo-jacinto.html', '/pt/arara-jacinto', '/fr/'],
    ['/available-birds/cacatua.html', '/pt/cacatua-de-crista-amarela', '/fr/'],

    // Adoption / disponibles
    ['/adopcion-de-loros', '/pt/papagaios-a-venda-portugal', '/fr/'],
    ['/adopcion-de-loros.html', '/pt/papagaios-a-venda-portugal', '/fr/'],
    ['/available-birds/', '/pt/papagaios-disponiveis', '/fr/'],
    ['/tienda', '/pt/papagaios-disponiveis', '/fr/'],
    ['/tienda.html', '/pt/papagaios-disponiveis', '/fr/'],

    // Commercial category pages (no PT/FR equivalents yet)
    ['/comida-para-loros', '/pt/comida-para-papagaios', '/fr/'],
    ['/comida-para-loros.html', '/pt/comida-para-papagaios', '/fr/'],
    ['/jaulas-para-loros', '/pt/', '/fr/'],
    ['/jaulas-para-loros.html', '/pt/', '/fr/'],
    ['/juguetes-naturales-para-loros', '/pt/brinquedos-naturais-para-papagaios', '/fr/'],
    ['/juguetes-naturales-para-loros.html', '/pt/brinquedos-naturais-para-papagaios', '/fr/'],
    ['/transportines-para-loros', '/pt/', '/fr/'],
    ['/transportines-para-loros.html', '/pt/', '/fr/'],

    // Info / care pages
    ['/nosotros', '/pt/as-nossas-instalacoes', '/fr/'],
    ['/nosotros.html', '/pt/as-nossas-instalacoes', '/fr/'],
    ['/faq', '/pt/', '/fr/'],
    ['/faq.html', '/pt/', '/fr/'],
    ['/cuidados-basicos-de-un-loro', '/pt/', '/fr/'],
    ['/cuanto-cuesta-mantener-un-loro', '/pt/quanto-custa-um-papagaio-em-portugal', '/fr/'],
    ['/documentos-legales-para-adoptar-un-loro', '/pt/documentacao-cites-portugal', '/fr/'],
    ['/errores-comunes-al-adoptar-un-loro', '/pt/', '/fr/'],

    // Blog index
    ['/blog/', '/pt/blog/', '/fr/'],

    // Cities index
    ['/ciudades/', '/pt/cidades/', '/fr/'],

    // Contact
    ['/contacto', '/pt/contacto', '/fr/'],
    ['/contacto.html', '/pt/contacto', '/fr/'],

    // ── PT → ES / FR ──────────────────────────────────────────────
    ['/pt/papagaios-a-venda-portugal', '/adopcion-de-loros', '/fr/'],
    ['/pt/papagaio-cinzento', '/loro-gris-africano.html', '/fr/'],
    ['/pt/arara-a-venda', '/guacamayos.html', '/fr/'],
    ['/pt/cacatua-a-venda', '/cacatua.html', '/fr/'],
    ['/pt/papagaio-amazona', '/loro-amazonico.html', '/fr/'],
    ['/pt/papagaio-eclectus', '/eclectus.html', '/fr/'],
    ['/pt/conuro', '/conuro.html', '/fr/'],
    ['/pt/arara-azul-e-amarela', '/available-birds/guacamayo-azul-amarillo.html', '/fr/'],
    ['/pt/arara-escarlate', '/available-birds/guacamayo-escarlata.html', '/fr/'],
    ['/pt/arara-jacinto', '/available-birds/guacamayo-jacinto.html', '/fr/'],
    ['/pt/papagaios-disponiveis', '/available-birds/', '/fr/'],
    ['/pt/comida-para-papagaios', '/comida-para-loros', '/fr/'],
    ['/pt/brinquedos-naturais-para-papagaios', '/juguetes-naturales-para-loros', '/fr/'],
    ['/pt/as-nossas-instalacoes', '/nosotros.html', '/fr/'],
    ['/pt/documentacao-cites-portugal', '/documentos-legales-para-adoptar-un-loro', '/fr/'],
    ['/pt/quanto-custa-um-papagaio-em-portugal', '/cuanto-cuesta-mantener-un-loro', '/fr/'],
    ['/pt/blog/', '/blog/', '/fr/'],
    ['/pt/cidades/', '/ciudades/', '/fr/'],
    ['/pt/contacto', '/contacto.html', '/fr/'],
    ['/pt/ovos-fertilizados', '/available-birds/huevos-fertiles.html', '/fr/']
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
    var esURL  = resolveURL('es')  || window.location.pathname;
    var ptURL  = resolveURL('pt')  || '/pt/';
    var frURL  = '/fr/';
    var cur    = window.location.pathname;

    // Only add if not already present in <head>
    if (document.querySelector('link[hreflang="fr-FR"]')) return;

    var tags = [
      { hl: 'es-ES', href: base + (lang === 'es' ? cur : esURL) },
      { hl: 'pt-PT', href: base + (lang === 'pt' ? cur : ptURL) },
      { hl: 'fr-FR', href: base + frURL },
      { hl: 'x-default', href: base + '/' }
    ];

    tags.forEach(function (t) {
      if (!document.querySelector('link[hreflang="' + t.hl + '"]')) {
        var link = document.createElement('link');
        link.rel = 'alternate';
        link.setAttribute('hreflang', t.hl);
        link.href = t.href;
        document.head.appendChild(link);
      }
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
