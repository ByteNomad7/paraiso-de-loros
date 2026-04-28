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

## Pendiente (Prioridad Alta)

1. **Backlinks** — factor limitante principal. 2 objetivos: guest article en `mascotahogar.com` o `expertoanimal.com`, alta en directorio `centralvet.es`.
2. **GSC: Request Indexing** — para las 3 URLs nuevas de Abril 2026 (criadero-loros-madrid, criadero-loros-barcelona, diferencia-criador-tienda-mascotas) y 137 anteriores. Manual por el propietario.
3. **Hreflang opcional** — si se decide segmentar los países anglo equivalentes en el futuro.

## Sitemap

140 URLs totales (Abril 2026). Lastmod 2026-04-28 para los 3 nuevos posts del cluster Criadero.
