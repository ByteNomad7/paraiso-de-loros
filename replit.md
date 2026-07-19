# paraisodeaves — Criadero de Loros y Aves Exóticas

Sitio web estático multilingüe (ES + PT + FR) para paraisodeaves — criadero legal de loros y aves exóticas en Llíria, Valencia (España). Envíos a toda España, Portugal y Europa.

> 📁 Historial de sprints anteriores: [docs/archive/replit-sprint-archive.md](docs/archive/replit-sprint-archive.md)

---

## Estado Actual (Junio 2026)

| Métrica | Valor |
|---|---|
| URLs en sitemap | **571** (actualizado 2026-06-30) |
| Posts de blog (ES) | **188** archivos · contador 146 en blog/index.html |
| Idiomas | ES · PT · FR |
| Secciones de _redirects | 25 secciones activas |
| GSC baseline (abr-2026) | 108 clics · 2.3K imp · 4.7% CTR · posición 14.2 |

---

## Información Técnica

| Campo | Valor |
|---|---|
| Dominio canonical | `https://www.paraisodeaves.com` (www) |
| Email | `paraisodeloros@gmail.com` (sin WhatsApp ni teléfono) |
| GA4 | `G-4007YHH4H9` |
| GSC tags | `8Du7IU5_y0w0vZeaz0bjDdLNdbzb35CubsG1YKISK8c` · `rEssv_QHGO0TDZMwuv94A5v-LQM4OkXtuffGFAbcRq4` |
| Servidor dev | `node server.js` (puerto 5000) — **no usar python3** |
| Deploy | Netlify estático · `publicDir: "."` |
| Formulario | Netlify `data-netlify="true"` → `/gracias.html` |

---

## Diseño / Paleta

| Token | Valor |
|---|---|
| Primario | `#1F3D2B` (verde oscuro) |
| Secundario | `#2B533C` |
| Dorado | `#D4A94F` / `#E0B75F` (footer) |
| Fondo | `#F8F5F0` (crema) |
| Texto | `#1A1A1A` · Muted `#5C5C5C` · Borde `#E7E0D2` |
| Fuentes | Poppins (títulos) + Open Sans (cuerpo) · Google Fonts |

---

## Estructura del Sitio

### Idiomas
- **ES** — raíz `/` · 253+ páginas
- **PT** — `/pt/` · 82 páginas · hreflang `pt-PT`
- **FR** — `/fr/` · 46 páginas · hreflang `fr-FR`

### Secciones principales (ES)
| Sección | Ruta | Notas |
|---|---|---|
| Homepage | `index.html` | hreflang ES+PT+FR+x-default |
| Aves disponibles | `available-birds/` | 9 fichas de especie |
| Guías de especie | `especies/` | 15 nuevas especies + índice (Phase 7B) |
| Blog | `blog/` | 188 artículos · 5 clusters |
| Ciudades | `ciudades/` | 54 fichas locales |
| Páginas regionales | `comprar-loros-*.html` | Madrid, Andalucía, Cataluña, Valencia, Canarias |
| Latinoamérica | `{country}/adoptar-loros.html` | 20 country pages + hub |
| Centro Conocimiento | `conocimiento/` | 13 páginas |
| Preguntas | `preguntas/` | 37 páginas |

### Rutas PT/FR
- `/pt/especies/` — 15 especies en portugués
- `/fr/especies/` — 15 especies en francés
- `/pt/cidades/` — 13 ciudades portuguesas
- `/pt/blog/` — 27 posts PT · `/fr/blog/` — posts FR

---

## Reglas Críticas de Desarrollo

1. **URLs absolutas en componentes compartidos** — los relativos `../../` en `/pt/` y `/fr/` resuelven a la raíz → 404. Usar siempre `https://www.paraisodeaves.com/…`
2. **Sin precios numéricos** — todas las aves: "bajo consulta". Accesorios y multas regulatorias sí se mantienen.
3. **Solo email** — `paraisodeloros@gmail.com`. Nunca añadir WhatsApp ni teléfono.
4. **Sin `npm run build`** — sitio estático puro, sin compilador. El servidor es `node server.js`.
5. **Scripts de generación** en raíz: `generate-*.js` y `apply-*.js`. Usar Node.js, nunca Python3.

---

## Estado _redirects (25 secciones)

| Sección | Contenido |
|---|---|
| 1–13 | Páginas ES principales, blog, ciudades, regionales |
| 14 | T1 clean URLs (cuanto-cuesta, cuidados-basicos, documentos-legales, errores-comunes) |
| 15 | PT clean URLs (50 reglas) |
| 16–19 | FR páginas y blog |
| 20 | Phase 6 ciudades + accesorios + galerías |
| 21–22 | Conocimiento + Preguntas |
| 23 | Especies ES (15 rutas + índice) |
| 24 | Especies PT |
| 25 | Especies FR |
| + | Phase 5C: 75 rewrites blog (integrados en secciones anteriores) |
| Final | Catch-all `/* → /404.html 404` |

---

## Sitemap

**571 URLs** (lastmod 2026-06-30). Estructura:
- ES: páginas principales, blog (188), ciudades (54), regionales, Latam (20), conocimiento, preguntas
- PT: 82 URLs (money pages, cidades, blog, especies)
- FR: 46 URLs (money pages, blog, especies)
- Especies: 48 URLs (15 × 3 idiomas + 3 índices)

---

## Pendiente (Prioridad Alta)

1. **GSC: Request Indexing** — URLs nuevas (PT + FR + especies + 75 posts 5C). Manual en GSC → Inspección de URL.
2. **Backlinks** — factor limitante principal. Objetivos: guest post en `mascotahogar.com` o `expertoanimal.com`, alta en `centralvet.es`.
3. **GSC Portugal** — añadir `paraisodeaves.com/pt/` como propiedad de prefijo de URL en GSC.
4. **Phase 8.1** — Optimización enlazado interno (ver documento de tarea adjunto).
5. **Imágenes de especies** — subir fotos reales para las 15 nuevas páginas de `/especies/` (filenames ya preparados en cada página).

---

## User Preferences

- Respond in English
- Scripts de generación en Node.js (nunca Python)
- Sin emojis en código salvo los ya presentes en el diseño (🦜)
- Mantener diseño premium existente — no cambiar paleta ni tipografía
