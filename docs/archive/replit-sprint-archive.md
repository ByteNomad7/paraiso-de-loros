# paraisodeaves — Sprint History Archive

> Archived from `replit.md` on 2026-06-30. Active project notes live in `/replit.md`.

---

## Sprint: Abril 2026 — Primeras Expansiones SEO

### GSC baseline (snapshot 27-abr-2026)
- 108 clics / 2.3K impresiones / 4.7% CTR / posición media 14.2

### 28 abril 2026 — SEO push posición 14 → top 10

1. **Cluster "criadero" expandido — 2 nuevos posts pillar-satellite:**
   - `blog/criadero-loros-valencia.html` (1.687 palabras) — geo-targeted CV, schemas Article + Breadcrumb + LocalBusiness + FAQPage
   - `blog/preguntas-criador-loros-antes-comprar.html` (1.769 palabras) — checklist 25 preguntas, schemas Article + Breadcrumb + FAQPage
2. Internal linking pillar `criadero-loros-espana.html` → satellites (2 enlaces contextuales)
3. Internal linking sibling `blog/como-elegir-criador-loros-espana.html` → 2 nuevas cards
4. **Homepage schema enriquecido:** WebSite + SearchAction, Organization + knowsAbout, PetStore con addressLocality: Llíria
5. blog/index.html: contador 51 → 53
6. sitemap.xml: 135 → 137 URLs
7. llms.txt: 3 entradas criadero añadidas
8. Validación: smoke-test 6 URLs (HTTP 200), 10/10 schemas válidos

### Abril 2026 (sesión previa)

1. **10 nuevos posts de blog** (700+ palabras): agapornis-inseparable-mascota, ninfa-carolina-cockatiel-guia, periquito-mascota-guia, cotorra-argentina-mascota, cuanto-vive-un-loro, loro-mordedor-como-educarlo, enfermedades-comunes-loros, banar-loro-guia-completa, loros-y-ninos-seguridad, adoptar-loro-vs-comprar
2. **Expansión SEO Latinoamérica — 21 páginas:**
   - 1 hub: `/la-adopcion-de-loros-en-latinoamerica.html`
   - 20 country pages: `/{country}/adoptar-loros.html` para los 20 países hispanohablantes
   - ~27 KB de contenido único por página: intro local, CITES nacional, especies, FAQ, schemas Article + Breadcrumb + FAQ
   - CTA solo correo; aviso legal "Disponibilidad sujeta a confirmación"
3. Sitemap: 134 URLs totales
4. blog/index.html: contador 40 → 50
5. llms.txt: eliminado WhatsApp + añadidas 21 páginas Latam
6. adopcion-de-loros.html: sección "¿Compras desde fuera de España?" → hub Latam
7. Fix: typo `<keywords>` → `<meta name="keywords">` en blog/cuanto-vive-un-loro.html

### Push GSC CTR (27 abr 2026)

- Title/meta optimizado para 4 páginas con alta impresión + 0 clicks: criadero-loros-espana.html, adopcion-de-loros.html, guacamayo-jacinto-caracteristicas.html, como-alimentar-un-loro-bebe.html
- Nuevo post: `blog/que-comen-los-loros-bebes.html` (1900+ palabras, FAQPage schema)
- Sitemap: 134 → 135 URLs

### Fix GSC 404 (27 abr 2026)

- `_redirects` reescrito de cero
- Causa: 6 URLs inglés en raíz movidas a /blog/ seguían indexadas
- Causa secundaria: 22 URLs limpias sin rewrites 200 explícitos
- 301s añadidos: `/centros-adopcion-aves-espana` → adopcion, `/mejores-especies-loros-adoptar` → loros-especies, `/guacamayo-escarlata` → guacamayos

### Trabajos anteriores (pre-abril 2026)

- 31 blog posts expandidos a 700+ palabras
- 18 imágenes JPG → WebP con `<picture>` + fallback (55% más ligeras)
- Author bio E-E-A-T añadido a 33 posts del blog
- Página `/criadero-de-loros-espana.html` (1.530 palabras, LocalBusiness + FAQ)
- WhatsApp eliminado de todo el sitio — solo email
- Formulario contacto Netlify (Nombre, Email, País, Producto, Mensaje)
- tienda.html: primera ficha real (Shinda y Daphne, pareja de Yacos)

---

## Sprint: Junio 2026 — Phase 2 SEO (16-jun-2026)

### T1 — Expansión páginas thin (~2100 palabras c/u)
- `cuanto-cuesta-mantener-un-loro.html` — desglose mensual/anual, tabla comparativa
- `cuidados-basicos-de-un-loro.html` — jaula, alimentación, socialización, vet, checklist
- `documentos-legales-para-adoptar-un-loro.html` — CITES, anilla, tabla por especie
- `errores-comunes-al-adoptar-un-loro.html` — 10 errores, red flags, checklist
- Todas con schemas WebPage + BreadcrumbList + FAQPage, canonical clean URL

### T2 — Mejora páginas con muchas impresiones y 0 clics
- adopcion-de-loros.html: reescrito completo, proceso 7 pasos, grid especies
- comprar-loros-espana.html: sección "Guías nuevos propietarios", footer premium
- blog/comprar-cacatua-espana.html: schemas BreadcrumbList + FAQPage, related grid
- blog/que-comen-los-loros-bebes.html: footer 4→5 cols, sección T1 links
- blog/como-incubar-huevos-de-loro.html: footer premium 4 cols

### T3 — Auditoría enlazado interno
- 8/8 páginas clave con ≥3 refs a páginas T1
- criadero-loros-espana.html: 0 → 4 T1 refs
- nosotros.html: 2 → 4 T1 refs (sección "Tenencia Responsable")

### T4 — Footer Authority Network
- Footer CSS index.html + nosotros.html: 4 cols → 5 cols (columna "Comprar por Región")
- 7 páginas con footer regional verificado

### T5 — E-E-A-T nosotros.html
- Topbar: links ingleses → URLs españolas limpias
- Historia: "Más de 25 Años Criando Loros"
- Nueva sección "Transparencia Legal y Bienestar Animal": CITES, Ley 42/2007, CE 338/97
- Nueva sección "Tenencia Responsable": 4 links T1

### T6 — Verificación sitemap
- 220 URLs verificadas: 0 archivos faltantes, 0 noindex inesperado
- 5 URLs T1 actualizadas a clean URLs en sitemap

---

## Sprint: Junio 2026 — SEO Audit Fixes (16-jun-2026)

- **C1:** 9 URLs ciudades sin rewrite → reglas 200 + 301 añadidas para: cacatua-valencia, comprar-loros-gijon, comprar-loros-oviedo, comprar-loros-pamplona, comprar-loros-salamanca, guacamayo-malaga, guacamayo-sevilla, loro-gris-africano-malaga, loro-gris-africano-murcia
- **C2 — Canibalización criadero:** criadero-de-loros-espana.html → noindex, canonical → /criadero-loros-espana, 301 en _redirects, eliminado del sitemap
- **H1:** 28 blog posts fuera del sitemap → añadidos, lastmod 2026-06-16, priority 0.75
- **H2 — 17 páginas huérfanas:** blog/index.html +6 cards (contador 64→70); ciudades/index.html +4 cities + sección "Por Especie y Ciudad"; compra-venta-loros + parejas-reproductoras-loros enlazados
- **H3:** WebPage + BreadcrumbList añadidos a 4 páginas sin schema: compra-venta-loros.html, loro-hablador.html, loros-especies.html, parejas-reproductoras-loros.html

---

## Sprint: Junio 2026 — 6 Páginas Regionales de Compra (16-jun-2026)

1. comprar-loros-espana.html (mejorado): schemas + sección regional
2. comprar-loros-madrid.html (NUEVO): Comunidad de Madrid, normativa CAM, envío 3,5–4h
3. comprar-loros-andalucia.html (NUEVO): 8 provincias, guía calor verano
4. comprar-loros-cataluna.html (NUEVO): Decret 146/2013, Llei 7/2023, tabla rutas
5. comprar-loros-valencia.html (NUEVO): entrega 24h, recogida en Llíria
6. comprar-loros-canarias.html (NUEVO): envío aéreo IATA, 7 islas, documentación sanitaria
- _redirects: +10 reglas; sitemap: 215 → 220 URLs; index.html: sección "Comprar por Región"

**Keyword targets:**
- Madrid: "comprar loros Madrid", "loro gris africano Madrid", "criador loros Comunidad Madrid"
- Andalucía: "comprar loros Andalucía", "loros Sevilla CITES"
- Cataluña: "comprar loros Cataluña", "loro Barcelona CITES"
- Valencia: "comprar loros Valencia", "criador loros Llíria"
- Canarias: "comprar loros Canarias", "loros Gran Canaria"

---

## Sprint: Junio 2026 — Expansión Portugal / Fase 4

- Sección `/pt/` completa: 50 páginas generadas con `generate-pt.js`
- **Homepage:** pt/index.html — hero, species grid, trust badges, FAQ, footer 5 cols
- **7 Money Pages:** papagaios-a-venda-portugal, papagaio-cinzento, arara-a-venda, cacatua-a-venda, papagaio-eclectus, amazona-a-venda, ovos-fertilizados
- **13 City Pages + index:** Lisboa, Porto, Braga, Coimbra, Faro, Setúbal, Aveiro, Leiria, Évora, Viseu, Guimarães, Funchal, Ponta Delgada
- **27 Blog Posts + index:** cuidados, alimentación, CITES, especies, comportamiento
- Hreflang: es-ES ↔ pt-PT, x-default → homepage ES
- _redirects SECTION 15: 50 reglas 200 rewrite clean URLs /pt/
- sitemap: +50 URLs, prioridades 0.75–0.95

---

## Sprint: Junio 2026 — PHASE 2E: Nav + Footer Multilingüe Unificado

- **Nav unificado** (mega-menú + acordeón móvil + switcher ES|PT|FR + hreflang) aplicado a todas las páginas PT/FR vía `apply-unified-nav.js`
- **Footer canónico único** (`apply-unified-footer.js`): marca + 4 columnas, URLs ABSOLUTAS, ES/PT/FR sincronizados. Aplicado a 381 páginas. **Regla crítica:** usar URLs absolutas — los relativos `../../` en /pt/ y /fr/ resuelven a la raíz → 404.
- **4 placeholders comerciales noindex** (PT/FR jaulas + transportines): intro localizada 400–600 palabras
- **Homepages ES/PT/FR reordenadas** a orden canónico: Hero → Confianza → Aves → Comercial → Proceso → Instalaciones → Blog preview → FAQ → Contacto CTA
- lang-switcher.js: eliminada fila duplicada /nosotros → /fr/nos-installations
- Decisión: "Adopción" = enlace directo nav en los 3 idiomas (no dropdown), por consistencia con 253 páginas ES

---

## Sprint: Junio 2026 — Phase 7B: 15 Nuevas Especies (30-jun-2026)

48 páginas generadas por `generate-phase7b-species.js`:
- 15 especies × 3 idiomas + 3 páginas índice
- Ubicación: `/especies/`, `/pt/especies/`, `/fr/especies/`
- Schemas: WebPage + BreadcrumbList + FAQPage (5 preguntas en ES)
- Hreflang: ES ↔ PT ↔ FR + x-default → ES
- _redirects: secciones 23-25 añadidas (45 rutas + 3 índices)
- sitemap: 522 → 570 URLs

**15 especies:** Senegal · Conuro del Sol · Conuro Mejilla Verde · Conuro Jenday · Periquito Collar Indio · Periquito Alejandrino · Lorikeet Arcoíris · Cacatúa Galah · Cacatúa Blanca · Cacatúa Goffin · Amazona Nuca Amarilla · Amazona Ala Naranja · Caique · Pionus · Cotorra Monje

---

## Sprint: Junio 2026 — Phase 5C: 75 Posts de Blog (30-jun-2026)

75 artículos de blog en español:
- **Batch A (25):** Guías prácticas de compra y cuidado — como-elegir-tu-primer-loro, mejores-loros-principiantes, mejores-loros-familias, loros-para-piso, loros-silenciosos, loros-mas-habladores, y 19 más
- **Batch B (25):** Salud, comportamiento y guías de especie — visitas-veterinario-loros, senales-estres-loro, guia-loro-gris-africano, guia-guacamayo-azul-amarillo, y 21 más
- **Batch C (25):** Páginas comparativas — loro-gris-africano-vs-guacamayo, amazona-vs-cacatua, cockatiel-vs-periquito, y 22 más
- blog/index.html: contador → 146 artículos
- sitemap: +75 URLs (priority 0.75)
- _redirects: 75 clean URL rewrites añadidos
