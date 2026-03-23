# paraisodeaves — Criador de Loros y Aves Exóticas

Sitio web estático completamente en español para paraisodeaves — criador de loros y aves exóticas en España con envíos a toda Europa.

## Blog SEO — 40 Artículos en 5 Clusters

El blog cuenta con **40 artículos en español** organizados en 5 clusters de autoridad temática:

| Cluster | Artículos | Objetivo |
|---|---|---|
| **Compra** | 7 | Capturar intención de compra alta |
| **Precios** | 7 | Capturar búsquedas de precio/comparativa |
| **Cuidados** | 11 | Autoridad educativa y retención |
| **Especies** | 7 | Tráfico informacional de especie |
| **Legalidad** | 6 | Diferenciación y confianza |

Todos los artículos: 800-1200 palabras, H1/H2/H3, keywords naturales, links internos a product pages, CTA hacia WhatsApp, JSON-LD Article schema, `global.css` aplicado, meta title + description.

## Información Clave

- **Dominio:** `https://paraisodeaves.com`
- **Email:** `info@paraisodeaves.com`
- **WhatsApp:** `+34 632 16 59 55`
- **Facebook:** `https://www.facebook.com/profile.php?id=100089916354629`
- **Google Site Verification:** `8Du7IU5_y0w0vZeaz0bjDdLNdbzb35CubsG1YKISK8c`

## Diseño / Estilo

- Fuentes: **Poppins** (títulos) + **Open Sans** (cuerpo) vía Google Fonts
- Paleta tropical: verde `#2e7d32` / `#1b5e20`, amarillo `#f9a825`, rojo `#e53935`
- Fondo claro: `#f7fdf5` (casi blanco con toque verde)
- Hero con gradiente verde tropical
- Footer verde oscuro `#1b5e20`
- Tarjetas blancas con sombra sutil y bordes verdes

## Estructura del Proyecto

### Página Principal
- `index.html` — Homepage (diseño original, branding paraisodeaves)

### Páginas de Aterrizaje (Español)
- `parrots-for-sale-spain.html` — Loros en Venta en España
- `buy-parrots-europe.html` — Comprar Loros en Europa
- `african-grey-parrot-for-sale.html` — Loro Gris Africano (Yaco) en Venta
- `macaw-parrots-for-sale.html` — Guacamayos en Venta
- `cockatoo-parrots-for-sale.html` — Cacatúas en Venta

### Páginas Informativas
- `about-us.html` — Sobre Nosotros (schema Organization)
- `delivery-shipping.html` — Envíos y Entrega
- `parrot-care-health.html` — Cuidados y Salud del Loro
- `faq.html` — Preguntas Frecuentes (schema FAQPage)

### Blog (`blog/`)
- `how-to-buy-a-parrot-in-spain.html` — Cómo comprar un loro en España
- `best-parrots-for-beginners.html` — Mejores loros para principiantes
- `african-grey-parrot-price-europe.html` — Precio del Yaco en Europa
- `macaw-vs-cockatoo.html` — Guacamayo vs Cacatúa
- `parrot-care-guide.html` — Guía de cuidados del loro
- `where-to-buy-exotic-birds-europe.html` — Dónde comprar aves exóticas en Europa
- `como-alimentar-un-loro-bebe.html` — (original en español)

### Páginas de Aves Disponibles (`available-birds/`)
- `index.html`, `loro-gris-africano.html`, `guacamayo-azul-amarillo.html`, `guacamayo-escarlata.html`, `guacamayo-jacinto.html`, `cacatua.html`, `loro-amazonico.html`, `eclectus.html`, `conuro.html`, `huevos-fertiles.html`

### Páginas Informativas Españolas (Originales)
- `adopcion-de-loros.html`, `tipos-de-loros-domesticos.html`, `cuidados-basicos-de-un-loro.html`, `cuanto-cuesta-mantener-un-loro.html`, `errores-comunes-al-adoptar-un-loro.html`, `documentos-legales-para-adoptar-un-loro.html`

### Otros
- `sitemap.xml` — Sitemap completo (30+ URLs, dominio paraisodeaves.com)
- `assets/img/galeria/` — Imágenes de galería
- `images/` — Fotos de aves

## Tecnología

- HTML/CSS estático puro (sin sistema de compilación)
- CSS inline por página + Google Fonts
- Formulario de contacto compatible con Netlify (`data-netlify="true"`)
- WhatsApp CTA: `https://wa.me/34632165955`
- Integración Facebook SDK (carga diferida)

## Ejecutar en Local

```
python3 -m http.server 5000 --bind 0.0.0.0
```

## Despliegue

Configurado como despliegue **estático** con `publicDir: "."`.

## Estrategia SEO

- Todo el contenido en **español**
- Schema markup: Organization, Product, FAQPage, Article
- Sitemap cubre 30+ URLs con prioridades y changefreq correctos
- Alt texts descriptivos y bilingües en imágenes de galería
- Breadcrumbs en todas las páginas
- Canonical URLs apuntando a `paraisodeaves.com`
