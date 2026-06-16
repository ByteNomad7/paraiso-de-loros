# paraisodeaves — Criadero de Loros y Aves Exóticas

Sitio web estático completamente en español para paraisodeaves — criadero legal de loros y aves exóticas en Llíria, Valencia (España). Envíos a toda España y Europa, con guías SEO específicas para los 20 países hispanohablantes de Latinoamérica.

## Estado Actual del SEO (Abril 2026)

- **GSC:** 108 clics / 2.3K impresiones / 4.7% CTR / posición media 14.2 (3 meses, snapshot 27-abr-2026)
- **Objetivo:** Mover de página 2 a página 1 para las queries principales de compra de loros en España + captar tráfico hispano de Latinoamérica
- **137 URLs en sitemap** (134 → 135 con post "que comen los loros bebés" → 137 con cluster "criadero")

## Últimas Actualizaciones Realizadas

### 28 abril 2026 — SEO push para subir de posición 14 → top 10

1. **Cluster "criadero" expandido — 2 nuevos posts pillar-satellite:**
   - `blog/criadero-loros-valencia.html` (1.687 palabras) — geo-targeted Comunitat Valenciana, 4 schemas (Article + Breadcrumb + LocalBusiness + FAQPage)
   - `blog/preguntas-criador-loros-antes-comprar.html` (1.769 palabras) — checklist de 25 preguntas concretas con respuestas modelo, 3 schemas (Article + Breadcrumb + FAQPage)
2. **Internal linking del pillar `criadero-loros-espana.html`** → satellites: 2 enlaces contextuales en cuerpo (intro + sección "criadero registrado")
3. **Internal linking sibling — `blog/como-elegir-criador-loros-espana.html`**: añadidas 2 cards a "Artículos relacionados" apuntando a los nuevos posts
4. **Homepage schema enriquecido** — añadidos 2 nuevos JSON-LD blocks junto al PetStore existente:
   - `WebSite` con `SearchAction` (desbloquea sitelinks search box en SERPs)
   - `Organization` con `knowsAbout` (señal para knowledge panel)
   - PetStore actualizado con `addressLocality: Llíria` + `addressRegion: Valencia` (antes solo país)
5. **blog/index.html** — contador 51 → 53, insertadas 2 article-cards nuevas (posición 6-7)
6. **sitemap.xml** — 135 → 137 URLs, lastmod 28-04-2026 en los 2 nuevos posts, priority 0.9
7. **llms.txt** — añadidas 3 entradas en "Main pages": pillar criadero + 2 satellites con descripciones para AI search engines
8. **Validación:** smoke-test 6 URLs (HTTP 200), parser JSON 10/10 schemas válidos

### Abril 2026 (sesión previa)

1. **10 nuevos posts de blog** (700+ palabras cada uno) con Article schema, OG, canonical y enlaces internos:
   agapornis-inseparable-mascota, ninfa-carolina-cockatiel-guia, periquito-mascota-guia, cotorra-argentina-mascota,
   cuanto-vive-un-loro, loro-mordedor-como-educarlo, enfermedades-comunes-loros, banar-loro-guia-completa,
   loros-y-ninos-seguridad, adoptar-loro-vs-comprar
2. **Expansión SEO Latinoamérica — 21 páginas nuevas:**
   - 1 hub: `/la-adopcion-de-loros-en-latinoamerica.html`
   - 20 country pages: `/{country}/adoptar-loros.html` para mexico, argentina, colombia, chile, peru, ecuador, bolivia, paraguay, uruguay, venezuela, guatemala, honduras, el-salvador, nicaragua, costa-rica, panama, republica-dominicana, cuba, puerto-rico, guinea-ecuatorial
   - Cada página ~27 KB con contenido único: intro local, autoridad CITES nacional, especies nativas, especies populares, FAQ específica, schema Article + Breadcrumb + FAQ
   - Internal linking: cada país enlaza al hub, al resto de países, a `/adopcion-de-loros.html` y al criadero
   - CTA solo por correo (sin WhatsApp); incluye aviso legal "Disponibilidad sujeta a confirmación / Documentación según normativa local / El comprador debe verificar requisitos de su país"
3. **Sitemap actualizado** — 134 URLs totales, `lastmod 2026-04-27` para homepage, /blog/, /available-birds/, los 10 blog posts nuevos y las 21 páginas Latam
4. **blog/index.html** — contador "40 → 50 Artículos", insertadas 10 article-cards nuevas
5. **llms.txt** — eliminado WhatsApp residual + añadidas 21 páginas Latam + tienda
6. **adopcion-de-loros.html** — añadida sección "¿Compras desde fuera de España?" enlazando al nuevo hub Latam
7. **Fix:** typo `<keywords name="keywords">` → `<meta name="keywords">` en blog/cuanto-vive-un-loro.html
9. **Push GSC ranking — optimización CTR + nuevo contenido (27 abr 2026)** — basado en GSC: 108 clicks, 2.3K impresiones, posición media 14.2 (3 meses).
   - **Title/meta optimizado para 4 páginas con alta impresión + 0 clicks** (`✓` + emoji + power words + año):
     - `criadero-loros-espana.html` (60 imp, 0 clicks → "criadero de loros")
     - `adopcion-de-loros.html` (23 imp, 0 clicks → "adopcion loros")
     - `blog/guacamayo-jacinto-caracteristicas.html` (50 imp, 0 clicks → "guacamayo jacinto")
     - `blog/como-alimentar-un-loro-bebe.html` (24 imp, 0 clicks → "como alimentar un loro bebe")
   - **Nuevo blog post:** `blog/que-comen-los-loros-bebes.html` — 1900+ palabras, dedicado a "qué comen los loros bebés" (37 imp, 0 clicks). Enfoque en alimentos (papilla, marcas, frutas, verduras, prohibidos) por edad y especie. Schema Article + Breadcrumb + FAQ.
   - **Sitemap:** 134 → 135 URLs; lastmod 27-04-2026 en post nuevo + post hermano.
   - **Internal linking:** card en `blog/index.html` (51 artículos), cross-link desde `blog/como-alimentar-un-loro-bebe.html`.
10. **Fix GSC "Not found (404)" alert (27 abr 2026)** — `_redirects` reescrito de cero:
   - **Causa probable:** 6 URLs en inglés que vivían en la raíz se movieron a `/blog/` en versiones anteriores y seguían indexadas (p. ej. `/parrot-care-guide.html`, `/macaw-vs-cockatoo.html`, `/best-parrots-for-beginners.html`, `/how-to-buy-a-parrot-in-spain.html`, `/african-grey-parrot-price-europe.html`, `/where-to-buy-exotic-birds-europe.html`).
   - **Causa secundaria:** 22 URLs limpias del sitemap (canonical sin `.html`) dependían de "Pretty URLs" de Netlify; ahora tienen rewrites 200 explícitos.
   - El usuario debe abrir GSC → Indexación → Páginas → "Not found (404)" y comprobar que las URLs específicas listadas estén ahora cubiertas; si aparece alguna URL fuera de estos patrones, añadirla manualmente al `_redirects`.
   - **URLs específicas confirmadas por GSC (27 abr 2026)** y mapeo 301 aplicado:
     - `/centros-adopcion-aves-espana` → `/adopcion-de-loros.html`
     - `/mejores-especies-loros-adoptar` → `/loros-especies.html`
     - `/guacamayo-escarlata` → `/guacamayos.html`

### Anterior

1. **31 blog posts expandidos** a 700+ palabras (0 posts thin)
2. **18 imágenes JPG → WebP** con `<picture>` + fallback JPG (55% más ligeras)
3. **Author bio E-E-A-T** añadido a 33 posts del blog
4. **Página `/criadero-de-loros-espana.html`** (1.530 palabras, schema LocalBusiness + FAQ)
5. **WhatsApp eliminado** de todo el sitio — solo email `info@paraisodeaves.com`
6. **Formulario contacto Netlify** con campos: Nombre, Email, País, Producto, Mensaje
7. **tienda.html** primera ficha real (Shinda y Daphne, pareja de Yacos)

## Información Técnica Clave

- **Dominio canonical:** `https://www.paraisodeaves.com` (www)
- **Email:** `info@paraisodeaves.com` (sin WhatsApp ni teléfono en ninguna página)
- **GA4:** `G-4007YHH4H9`
- **GSC tags:** `8Du7IU5_y0w0vZeaz0bjDdLNdbzb35CubsG1YKISK8c` + `rEssv_QHGO0TDZMwuv94A5v-LQM4OkXtuffGFAbcRq4`
- **Formulario Netlify** → `/gracias.html`
- **`_redirects`** activo (Abril 2026): rewrites 200 para 22 URLs limpias del sitemap (canonical sin `.html`), 301 desde 6 URLs antiguas en raíz que ahora viven en `/blog/`, 301 para `.html` → URL canónica limpia, 301 para patrones SEO heredados (sitemap_index.xml, /feed, /rss), y catch-all `/* → /404.html (404)`.
- **`llms.txt`** en la raíz, sin WhatsApp, con 21 entradas Latam

## Diseño / Paleta de Colores

- **Primario:** `#1F3D2B` (verde oscuro)  ·  **Secundario:** `#2B533C`
- **Dorado:** `#D4A94F` / `#E0B75F` (footer)
- **Fondo:** `#F8F5F0` (crema)  ·  **Texto:** `#1A1A1A`  ·  **Muted:** `#5C5C5C`  ·  **Borde:** `#E7E0D2`
- **Fuentes:** Poppins (títulos) + Open Sans (cuerpo) vía Google Fonts

## Estructura del Sitio

### Páginas Principales
- `index.html`, `nosotros.html`, `faq.html`
- `adopcion-de-loros.html` — adoptar loros en España
- `criadero-de-loros-espana.html` — keyword gap page
- `tienda.html` — fichas reales de aves disponibles
- `gracias.html` — confirmación formulario (noindex)
- **`la-adopcion-de-loros-en-latinoamerica.html` — NUEVO hub Latam**

### Latinoamérica (NUEVO, Abril 2026)
20 country landing pages:
- `/mexico/adoptar-loros.html`, `/argentina/adoptar-loros.html`, `/colombia/adoptar-loros.html`, `/chile/adoptar-loros.html`
- `/peru/adoptar-loros.html`, `/ecuador/adoptar-loros.html`, `/bolivia/adoptar-loros.html`, `/paraguay/adoptar-loros.html`
- `/uruguay/adoptar-loros.html`, `/venezuela/adoptar-loros.html`, `/guatemala/adoptar-loros.html`, `/honduras/adoptar-loros.html`
- `/el-salvador/adoptar-loros.html`, `/nicaragua/adoptar-loros.html`, `/costa-rica/adoptar-loros.html`, `/panama/adoptar-loros.html`
- `/republica-dominicana/adoptar-loros.html`, `/cuba/adoptar-loros.html`, `/puerto-rico/adoptar-loros.html`, `/guinea-ecuatorial/adoptar-loros.html`

### Aves Disponibles (`available-birds/`)
9 fichas: loro-gris-africano, guacamayo-azul-amarillo, guacamayo-escarlata, guacamayo-jacinto, cacatua, loro-amazonico, eclectus, conuro, huevos-fertiles

### Blog (`blog/`) — 56 artículos en 5 clusters
Compra · Precios · Cuidados · Especies · Legalidad

**Cluster Criadero (Abril 2026, push SEO):**
- `criadero-loros-valencia.html` (núcleo zoológico CV)
- `criadero-loros-madrid.html` (Comunidad de Madrid, areaServed Madrid)
- `criadero-loros-barcelona.html` (Catalunya, Llei 7/2023, Generalitat)
- `diferencia-criador-tienda-mascotas.html` (comparativa 12 puntos)
- `como-elegir-criador-loros-espana.html` (10 claves)
- `preguntas-criador-loros-antes-comprar.html` (25 preguntas)
- Todas enlazan al pillar `/criadero-loros-espana` y entre sí.

**Política de precios (desde Abril 2026):** los precios concretos de aves se sustituyen por "bajo consulta" en todo el blog. Los costes de accesorios (jaulas, alimentación, vet, juguetes) se mantienen porque son contenido de valor para posts de presupuesto. Las multas regulatorias (200.000€) también se mantienen.

### Ciudades (`ciudades/`) — 14 fichas locales (Madrid, Barcelona, Valencia, etc.)

### Imágenes (`images/`)
18 archivos JPG (fallback) + 18 WebP (servidos por defecto vía `<picture>`)

## Tecnología

- HTML/CSS estático puro (sin framework, sin compilador)
- `global.css` compartido en la raíz
- Formulario de contacto Netlify (`data-netlify="true"`)
- Schema markup: LocalBusiness, BreadcrumbList, Article, FAQPage, Product
- Servidor de desarrollo: `python3 -m http.server 5000 --bind 0.0.0.0`
- Desplegado en Netlify (estático, `publicDir: "."`)

## Actualizaciones Junio 2026 — SEO Phase 2 Sprint (16-jun-2026)

### T1 — Expansión de páginas con contenido delgado (4 páginas, ~2100 palabras cada una)
1. **`cuanto-cuesta-mantener-un-loro.html`** — ~2038 palabras: desglose mensual/anual de gastos, tabla comparativa por especie, FAQ, schemas WebPage+BreadcrumbList+FAQPage, canonical clean URL `/cuanto-cuesta-mantener-un-loro`
2. **`cuidados-basicos-de-un-loro.html`** — ~2148 palabras: jaula, alimentación, socialización, veterinario, checklist, FAQ, schemas WebPage+BreadcrumbList+FAQPage
3. **`documentos-legales-para-adoptar-un-loro.html`** — ~2164 palabras: CITES, anilla, certificados, tabla por especie, FAQ, schemas WebPage+BreadcrumbList+FAQPage
4. **`errores-comunes-al-adoptar-un-loro.html`** — ~2110 palabras: 10 errores con explicación, red flags de vendedor, checklist antes de comprar, FAQ, schemas

### T2 — Mejora de páginas con muchas impresiones y 0 clics
5. **`adopcion-de-loros.html`** — reescrito completamente: proceso de 7 pasos, grid de especies, links a T1 pages, schemas WebPage+BreadcrumbList+FAQPage, canonical clean `/adopcion-de-loros`
6. **`comprar-loros-espana.html`** — nueva sección "Guías para nuevos propietarios" (6 cards T1), footer premium 4 cols, copyright 2025→2026
7. **`blog/comprar-cacatua-espana.html`** — BreadcrumbList+FAQPage schemas añadidos, related grid ampliado con 4 links T1, footer premium
8. **`blog/que-comen-los-loros-bebes.html`** — footer CSS 4→5 cols + columna "Comprar por Región", sección "Guías para nuevos propietarios" con 5 links T1, fix English→Spanish bird links
9. **`blog/como-incubar-huevos-de-loro.html`** — article-footer simple → footer premium 4 cols con columnas Adopción, Comprar por Región, Criadero

### T3 — Auditoría de enlazado interno
- **Resultado final:** 8/8 páginas clave tienen ≥3 refs a páginas T1 (0 fallos)
- `criadero-loros-espana.html`: 0 → 4 T1 refs (nueva sección "Guías esenciales antes de adoptar" + footer upgrade, copyright 2025→2026)
- `nosotros.html`: 2 → 4 T1 refs (sección "Tenencia Responsable" añadida)

### T4 — Footer Authority Network (red de enlaces de autoridad en pie de página)
- **Footer CSS actualizado** en `index.html` y `nosotros.html`: `2fr 1fr 1fr 1fr` → `2fr 1fr 1fr 1fr 1fr` (5ª columna "Comprar por Región")
- 7 páginas con footer regional verificado (≥2 refs a páginas comprar-loros-región)

### T5 — E-E-A-T en nosotros.html
- **Topbar**: links ingleses → URLs españoles limpias (`/comprar-loros-espana`, `/adopcion-de-loros`, `/loro-gris-africano.html`, etc.)
- **Historia**: "Más de 25 Años Criando Loros" añadido en H2 y párrafo
- **Nueva sección "Transparencia Legal y Bienestar Animal"**: núcleo zoológico registrado, CITES, Ley 42/2007, Reglamento CE 338/97
- **Nueva sección "Tenencia Responsable"**: compromiso de asesoramiento previo + 4 links a páginas T1

### T6 — Verificación del sitemap
- 220 URLs verificadas: 0 archivos faltantes, 0 noindex inesperado
- **5 URLs T1 actualizadas** de `.html` a clean URLs en sitemap:
  - `/adopcion-de-loros`, `/cuanto-cuesta-mantener-un-loro`, `/cuidados-basicos-de-un-loro`, `/documentos-legales-para-adoptar-un-loro`, `/errores-comunes-al-adoptar-un-loro`

### Actualizaciones `_redirects`
- **SECTION 14 añadida**: 10 nuevas reglas para T1 clean URLs (5 × 200 rewrite + 5 × 301 .html→clean)

## Actualizaciones Junio 2026 — SEO Audit Fixes (16-jun-2026)

1. **C1 — 9 URLs ciudades sin rewrite** → añadidas reglas 200 rewrite + 301 .html→clean en `_redirects` para: cacatua-valencia, comprar-loros-gijon, comprar-loros-oviedo, comprar-loros-pamplona, comprar-loros-salamanca, guacamayo-malaga, guacamayo-sevilla, loro-gris-africano-malaga, loro-gris-africano-murcia
2. **C2 — Canibalización criadero** → `criadero-de-loros-espana.html` marcado noindex, canonical apuntando a `/criadero-loros-espana`, 301 redirect añadido en `_redirects`, entrada eliminada del sitemap
3. **H1 — 28 blog posts fuera del sitemap** → todos añadidos al sitemap.xml con lastmod 2026-06-16 y priority 0.75
4. **H2 — 17 páginas huérfanas**:
   - blog/index.html: 6 nuevas cards (cuanto-cuesta-mantener-loro-al-ano, guia-veterinaria-loros, lenguaje-corporal-loros, obesidad-en-loros, precio-amazona-frente-azul-espana, problemas-respiratorios-loros) + contador 64→70
   - ciudades/index.html: 4 nuevas city cards (Gijón, Oviedo, Pamplona, Salamanca) + nueva sección "Por Especie y Ciudad" con 5 fichas (cacatua-valencia, guacamayo-malaga, guacamayo-sevilla, loro-gris-africano-malaga, loro-gris-africano-murcia)
   - compra-venta-loros + parejas-reproductoras-loros: enlazados desde ciudades/index.html y blog/index.html footer
5. **H3 — 4 páginas sin schema** → WebPage + BreadcrumbList añadidos a: compra-venta-loros.html (+ FAQPage), loro-hablador.html, loros-especies.html, parejas-reproductoras-loros.html

## Actualizaciones Junio 2026 — 6 Páginas Regionales de Compra (16-jun-2026)

**SEO Authority Expansion: 5 nuevas landing pages regionales + mejora de la nacional**

1. **`comprar-loros-espana.html`** (existente, mejorado): añadidos schemas BreadcrumbList + FAQPage, sección "Comprar por Región" con links a las 6 páginas regionales, copyright 2025 → 2026
2. **`comprar-loros-madrid.html`** (NUEVO): Comunidad de Madrid — clima continental, normativa CAM, envío 3,5–4h desde Llíria, 5 FAQs únicas. Schemas: BreadcrumbList + WebPage + FAQPage
3. **`comprar-loros-andalucia.html`** (NUEVO): Andalucía — 8 provincias, calor extremo (guía específica verano), logística por distancia, 5 FAQs únicas. Schemas: BreadcrumbList + WebPage + FAQPage
4. **`comprar-loros-cataluna.html`** (NUEVO): Cataluña — Decret 146/2013 Generalitat, Llei 7/2023, tabla de rutas por provincia, visita a criadero, 5 FAQs únicas. Schemas: BreadcrumbList + WebPage + FAQPage
5. **`comprar-loros-valencia.html`** (NUEVO): Comunitat Valenciana — SOMOS DE AQUÍ, entrega 24h, recogida en Llíria, clima mediterráneo ideal, 5 FAQs únicas. Schemas: BreadcrumbList + WebPage + FAQPage
6. **`comprar-loros-canarias.html`** (NUEVO): Islas Canarias — envío aéreo IATA, 7 islas cubiertas, documentación sanitaria extra, clima subtropical perfecto, proceso paso a paso, 5 FAQs únicas. Schemas: BreadcrumbList + WebPage + FAQPage
7. **`_redirects`**: +10 reglas (5 × 200 rewrite + 5 × 301 .html→clean) para las 5 páginas nuevas
8. **`sitemap.xml`**: 215 → 220 URLs; 5 nuevas entradas con priority 0.85 y lastmod 2026-06-16
9. **`index.html`**: sección "Comprar Loros por Región de España" añadida antes de `</main>` con links a las 6 páginas regionales
10. **Audit findings**: ningún H1/title/description duplicado; city pages (ciudades/) KEEP sin merges; noindex para 6 stubs en inglés pendiente (thin content)

**Keyword targets por página:**
- Madrid: "comprar loros Madrid", "loro gris africano Madrid", "criador loros Comunidad Madrid"
- Andalucía: "comprar loros Andalucía", "loros Sevilla CITES", "loro Málaga criador"
- Cataluña: "comprar loros Cataluña", "loro Barcelona CITES", "criador loros registrado Cataluña"
- Valencia: "comprar loros Valencia", "criador loros Llíria", "loro Comunitat Valenciana entrega"
- Canarias: "comprar loros Canarias", "loros Gran Canaria", "loro Tenerife CITES"

## Pendiente (Prioridad Alta)

1. **GSC: Request Indexing** — para todas las URLs nuevas (9 ciudades + 28 blog posts) y las páginas actualizadas. Manual por el propietario en GSC → Inspección de URL.
2. **Backlinks** — factor limitante principal. 2 objetivos: guest article en `mascotahogar.com` o `expertoanimal.com`, alta en directorio `centralvet.es`.
3. **Hreflang opcional** — si se decide segmentar los países anglo equivalentes en el futuro.

## Sitemap

215 URLs totales (Junio 2026). Lastmod 2026-06-16 para las 9 ciudades nuevas + 28 blog posts añadidos al sitemap.
