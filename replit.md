# paraisodeaves — Criadero de Loros y Aves Exóticas

Sitio web estático completamente en español para paraisodeaves — criadero legal de loros y aves exóticas en Llíria, Valencia (España). Envíos a toda España y Europa.

## Estado Actual del SEO (Abril 2026)

- **GSC:** 48 clics / 700 impresiones / 6.9% CTR / posición media 15.8
- **Objetivo:** Mover de página 2 a página 1 para las queries principales de compra de loros en España
- **80 páginas HTML totales:** 72 indexables (en sitemap), 8 noindex (gracias.html + stubs antiguos)

## Últimas Actualizaciones Realizadas

1. **31 blog posts expandidos** a 700+ palabras (0 posts thin restantes)
2. **18 imágenes JPG → WebP** con `<picture>` element y fallback JPG (55% más ligeras)
3. **Author bio E-E-A-T** añadido a los 33 posts del blog
4. **Nueva página** `/criadero-de-loros-espana.html` (1.530 palabras, schema LocalBusiness + FAQ)
5. **Sitemap actualizado** — 72 URLs, lastmod 2026-04-09 en 42 páginas recién modificadas
6. **Meta robots=index,follow** en todas las páginas indexables
7. **WhatsApp eliminado** de todo el sitio — solo email `info@paraisodeaves.com`
8. **Formulario de contacto mejorado** — campos: Nombre, Email, País, Producto, Mensaje
9. **tienda.html — primera listado real:** Shinda y Daphne (pareja de Yacos, 8 meses) con 4 fotos WebP, galería lightbox + miniaturas en tarjeta, badge "Pareja disponible"

## Información Técnica Clave

- **Dominio canonical:** `https://www.paraisodeaves.com` (www)
- **Email:** `info@paraisodeaves.com` (sin WhatsApp ni teléfono en ninguna página)
- **GA4:** `G-4007YHH4H9`
- **GSC tags:** `8Du7IU5_y0w0vZeaz0bjDdLNdbzb35CubsG1YKISK8c` + `rEssv_QHGO0TDZMwuv94A5v-LQM4OkXtuffGFAbcRq4`
- **Formulario Netlify** → `/gracias.html`
- **`_redirects`** vacío (sin redirects activos)
- **`llms.txt`** en la raíz

## Diseño / Paleta de Colores

- **Primario:** `#1F3D2B` (verde oscuro)
- **Secundario:** `#2B533C`
- **Dorado:** `#D4A94F` / `#E0B75F` (footer)
- **Fondo:** `#F8F5F0` (crema)
- **Texto:** `#1A1A1A`
- **Muted:** `#5C5C5C`
- **Borde:** `#E7E0D2`
- **Fuentes:** Poppins (títulos) + Open Sans (cuerpo) vía Google Fonts

## Estructura del Sitio

### Páginas Principales
- `index.html` — Homepage
- `nosotros.html` — Sobre el criadero
- `faq.html` — Preguntas frecuentes (FAQPage schema)
- `adopcion-de-loros.html` — Adoptar loros en España
- `criadero-de-loros-espana.html` — Criadero (keyword gap page, NUEVA)
- `gracias.html` — Página de confirmación del formulario (noindex)

### Aves Disponibles (`available-birds/`)
- `loro-gris-africano.html`, `guacamayo-azul-amarillo.html`, `guacamayo-escarlata.html`
- `guacamayo-jacinto.html`, `cacatua.html`, `loro-amazonico.html`
- `eclectus.html`, `conuro.html`, `huevos-fertiles.html`

### Blog (`blog/`) — 40 artículos en 5 clusters
- **Compra:** comprar-un-loro-en-espana, comprar-loro-legal-espana, comprar-cacatua-espana, comprar-guacamayo-espana, donde-comprar-loro-gris-africano, donde-comprar-aves-exoticas-europa, comprar-loro-europa-envio
- **Precios:** precio-de-un-loro-en-espana, precio-cacatua-espana, precio-guacamayo-espana, precio-loro-gris-africano-europa, precio-loro-amazonico, precio-huevos-fertiles-loro, coste-mantener-loro-mes, presupuesto-primer-loro
- **Cuidados:** guia-cuidados-loro, cuidados-cacatua-guia, cuidados-guacamayo-guia, cuidado-loro-gris-africano, jaula-ideal-loro-tamano, estimulacion-mental-loros, socializar-loro-recien-adoptado, alimentacion-loro-adulto, como-alimentar-un-loro-bebe, plumafagia-loros-causas, como-ensenar-a-hablar-un-loro, veterinario-aves-exoticas-espana
- **Especies:** tipos-guacamayos-espana, guacamayo-jacinto-caracteristicas, guacamayo-vs-cacatua, loro-gris-africano-vs-amazonico, eclectus-loro-guia, conuro-loro-familia, mejores-loros-para-principiantes
- **Legalidad:** documentacion-loro-espana, registrar-loro-espana, cites-loros-espana, detectar-venta-ilegal-loros, importar-loro-europa-requisitos, como-elegir-criador-loros-espana

### Imágenes (`images/`)
- 18 archivos JPG (originales, fallback) + 18 WebP (optimizados, cargados por defecto)
- Implementación `<picture>` con `<source type="image/webp">` + `<img>` fallback JPG

## Tecnología

- HTML/CSS estático puro (sin framework, sin compilador)
- `global.css` compartido en la raíz
- Formulario de contacto Netlify (`data-netlify="true"`)
- Schema markup: LocalBusiness, BreadcrumbList, Article, FAQPage, Product
- Servidor de desarrollo: `python3 -m http.server 5000 --bind 0.0.0.0`
- Desplegado en Netlify (estático, `publicDir: "."`)

## Pendiente (Prioridad Alta)

1. **Backlinks** — El factor limitante principal para pasar de página 2 a página 1
2. **GSC: Request Indexing** — Para las 42 páginas con lastmod 2026-04-09 (manual por el propietario)
3. **Keyword gap pages** — "comprar loro legal españa" como landing separada ya existe; evaluar más gaps en GSC
