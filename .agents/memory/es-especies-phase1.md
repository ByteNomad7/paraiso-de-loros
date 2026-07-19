---
name: ES Especies Phase 1
description: "Explora Nuestras Especies" section on ES homepage + 16 /es/especies/ category pages
---

## What was built

### Homepage section (index.html)
- Inserted `<!-- ░░ EXPLORA NUESTRAS ESPECIES ░░ -->` block immediately after hero `</section>`, before `<section class="about">`.
- Dark Forest Green background (#1B3D2F), gold accents, Playfair Display headings.
- 4-col desktop / 3-col tablet / 2-col mobile grid via CSS `grid-template-columns`.
- Each card: full-height image with dark gradient overlay, species name (Playfair), subtitle, "Ver aves disponibles" badge, gold "Ver especie →" pill.
- Hover: `translateY(-6px) scale(1.015)` card lift + `scale(1.1)` image zoom, 0.3/0.5s transitions.
- Search: `<input id="es-search">` + vanilla JS filtering on `data-name`.
- Filters: 7 filter buttons with `data-filter="size:pequeño"` etc. — mutually exclusive, single active at a time.
- JS injected before `</body>`, idempotent (keyed on comment markers).
- Section anchor: `id="explora-especies"`.

### Species pages (/es/especies/{slug}/)
- Generator: `generate-es-especies.js`
- 16 pages created: yacos, guacamayos, cacatuas, amazonas, eclectus, conuros, agapornis, loris, ninfas, pionus, cotorras-quaker, rosellas, periquitos, tucanes, buhos, halcones
- Each page: SEO title/desc, canonical, OG, CollectionPage schema, BreadcrumbList schema, FAQPage schema (8 FAQs)
- Layout: sidebar (Ficha rápida + guides + adoption links) + main (intro + Phase 2 placeholder + FAQs + related species)
- Phase 2 placeholder section ready for live bird listings
- Logo: `/images/logo/paraiso-de-aves-logo-light.webp`

### Sitemap
- `sitemap_es_especies.xml` created (17 URLs: hub + 16 species)
- Added to `sitemap_index.xml`

### Commercial categories (NOT included in species taxonomy per brief)
- Brief calls for /es/huevos-fertiles, /es/incubadoras, /es/jaulas-para-aves — NOT built in Phase 1

**Why:** Brief explicitly said "Do not place bird eggs, incubators or cages inside the species taxonomy. Create separate Spanish commercial categories for those items" — deferred to a future phase.

## Filter data per species
| Species | Size | Habla | Familia | Principiante | Apartamento |
|---|---|---|---|---|---|
| yacos | grande | muy-hablador | si | no | no |
| guacamayos | grande | muy-hablador | si | no | no |
| cacatuas | grande | moderado | si | no | no |
| amazonas | mediano | muy-hablador | si | si | si |
| eclectus | mediano | moderado | si | si | si |
| conuros | pequeño | moderado | si | si | si |
| agapornis | pequeño | poco | si | si | si |
| loris | pequeño | poco | si | no | si |
| ninfas | pequeño | moderado | si | si | si |
| pionus | mediano | moderado | si | si | si |
| cotorras-quaker | pequeño | moderado | si | si | no |
| rosellas | pequeño | poco | si | si | si |
| periquitos | pequeño | poco | si | si | si |
| tucanes | mediano | poco | si | no | no |
| buhos | mediano | poco | si | no | no |
| halcones | mediano | poco | no | no | no |

## Injection scripts
- `generate-es-especies.js` — regenerates all 16 pages (idempotent)
- `inject-explora-especies.js` — re-injects section into index.html (idempotent via comment markers)
