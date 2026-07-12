#!/usr/bin/env node
/**
 * inject-city-mesh.js
 * Adds a "Disponible en estas ciudades" section to each /especies/<slug>/index.html
 * pointing back to the relevant city pages in /ciudades/.
 */
const fs = require('fs');
const path = require('path');

// ── Species display names ─────────────────────────────────────────────────
const SPECIES_NAMES = {
  'cacatua-blanca':          'Cacatúa Blanca',
  'cacatua-galah':           'Cacatúa Galah',
  'cacatua-goffin':          'Cacatúa Goffin',
  'amazona-ala-naranja':     'Amazona Ala Naranja',
  'amazona-nuca-amarilla':   'Amazona Nuca Amarilla',
  'conuro-del-sol':          'Conuro del Sol',
  'conuro-jenday':           'Conuro Jenday',
  'conuro-mejilla-verde':    'Conuro de Mejilla Verde',
  'caique':                  'Caique',
  'cotorra-monje':           'Cotorra Monje',
  'lorikeet-arcoiris':       'Lorikeet Arcoíris',
  'loro-pionus':             'Loro Pionus',
  'loro-senegal':            'Loro Senegal',
  'periquito-alejandrino':   'Periquito Alejandrino',
  'periquito-collar-indio':  'Periquito Collar Indio',
};

// ── City page slugs + display names per species group ────────────────────
// Keys are species slugs; values are arrays of { slug, city }
// where the full city-page URL is /ciudades/<slug>
const CACATUA_CITIES = [
  { slug: 'cacatua-madrid',    city: 'Madrid'    },
  { slug: 'cacatua-barcelona', city: 'Barcelona' },
  { slug: 'cacatua-sevilla',   city: 'Sevilla'   },
  { slug: 'cacatua-bilbao',    city: 'Bilbao'    },
  { slug: 'cacatua-malaga',    city: 'Málaga'    },
  { slug: 'cacatua-valencia',  city: 'Valencia'  },
  { slug: 'cacatua-zaragoza',  city: 'Zaragoza'  },
];

const AMAZONA_CITIES = [
  { slug: 'amazona-madrid',    city: 'Madrid'    },
  { slug: 'amazona-barcelona', city: 'Barcelona' },
  { slug: 'amazona-sevilla',   city: 'Sevilla'   },
];

const CONURO_CITIES = [
  { slug: 'conuro-madrid',     city: 'Madrid'    },
];

const SPECIES_CITIES = {
  'cacatua-blanca':         CACATUA_CITIES,
  'cacatua-galah':          CACATUA_CITIES,
  'cacatua-goffin':         CACATUA_CITIES,
  'amazona-ala-naranja':    AMAZONA_CITIES,
  'amazona-nuca-amarilla':  AMAZONA_CITIES,
  'conuro-del-sol':         CONURO_CITIES,
  'conuro-jenday':          CONURO_CITIES,
  'conuro-mejilla-verde':   CONURO_CITIES,
  // species below have no dedicated city pages → section links only to aves-disponibles
  'caique':                 [],
  'cotorra-monje':          [],
  'lorikeet-arcoiris':      [],
  'loro-pionus':            [],
  'loro-senegal':           [],
  'periquito-alejandrino':  [],
  'periquito-collar-indio': [],
};

// ── CSS to add (once per page, appended before </style>) ──────────────────
const CITY_MESH_CSS = `
   /* ── City mesh section ── */
   .city-mesh-section{margin-top:24px;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:24px}
   .city-mesh-section h2{font-size:1.05rem;font-weight:800;color:var(--primary);margin-bottom:14px}
   .city-mesh-list{list-style:none;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:8px;margin-bottom:16px}
   .city-mesh-list a{display:block;padding:10px 14px;background:var(--bg);border:1px solid var(--border);border-radius:10px;color:var(--primary);font-size:.9rem;font-weight:600;text-decoration:none;transition:background .2s,transform .2s}
   .city-mesh-list a:hover{background:var(--primary);color:#fff;transform:translateY(-1px)}
   .city-mesh-cta{font-size:.9rem;color:var(--text-muted,#666);margin:0}
   .city-mesh-cta a{color:var(--primary);font-weight:600;text-decoration:underline}`;

// ── Build HTML section ────────────────────────────────────────────────────
function buildCitySection(speciesSlug) {
  const speciesName = SPECIES_NAMES[speciesSlug];
  const cities = SPECIES_CITIES[speciesSlug] || [];

  let cityLinks = '';
  if (cities.length) {
    cityLinks = '<ul class="city-mesh-list">\n' +
      cities.map(({ slug, city }) =>
        `        <li><a href="/ciudades/${slug}">${speciesName} en ${city}</a></li>`
      ).join('\n') +
      '\n      </ul>\n      ';
  }

  return `
    <!-- CITY MESH -->
    <section class="city-mesh-section">
      <h2>🗺️ Disponible en estas ciudades</h2>
      ${cityLinks}<p class="city-mesh-cta">Ver todas las aves disponibles: <a href="/aves-disponibles/">aves disponibles en España</a></p>
    </section>
`;
}

// ── Process each species page ─────────────────────────────────────────────
let updated = 0;
let skipped = 0;

for (const slug of Object.keys(SPECIES_NAMES)) {
  const filePath = path.join('especies', slug, 'index.html');

  if (!fs.existsSync(filePath)) {
    console.warn(`  ⚠️  Not found: ${filePath}`);
    skipped++;
    continue;
  }

  let html = fs.readFileSync(filePath, 'utf8');

  // Skip if already injected
  if (html.includes('city-mesh-section')) {
    console.log(`  ✓  Already done: ${slug}`);
    skipped++;
    continue;
  }

  // 1. Inject CSS before </style>
  if (!html.includes(CITY_MESH_CSS.trim())) {
    html = html.replace('</style>', CITY_MESH_CSS + '\n  </style>');
  }

  // 2. Inject HTML section before <!-- FINAL CTA -->
  const marker = '<!-- FINAL CTA -->';
  if (!html.includes(marker)) {
    console.warn(`  ⚠️  Marker "<!-- FINAL CTA -->" not found in ${filePath} — skipping`);
    skipped++;
    continue;
  }

  html = html.replace(marker, buildCitySection(slug) + '    ' + marker);

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`  ✅ Injected city mesh into: ${slug} (${(SPECIES_CITIES[slug] || []).length} cities)`);
  updated++;
}

console.log(`\nDone. Updated: ${updated}, Skipped/warned: ${skipped}`);
