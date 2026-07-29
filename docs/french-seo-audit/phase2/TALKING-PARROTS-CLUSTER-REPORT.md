# Talking Parrots Cluster — Build Report

**Date:** 2026-07-29  
**Phase:** French SEO Programme — Phase 2, Topical Cluster 1  
**Status:** ✅ COMPLETE — All pages built, sitemap updated, pillar page activated

---

## Pages Created

| # | Slug | Title | Bytes |
|---|------|-------|-------|
| 1 | `/fr/comment-apprendre-a-un-perroquet-a-parler/` | Comment Apprendre à un Perroquet à Parler | 38,712 |
| 2 | `/fr/pourquoi-mon-perroquet-ne-parle-pas/` | Pourquoi Mon Perroquet Ne Parle Pas | 35,500 |
| 3 | `/fr/les-perroquets-les-plus-intelligents/` | Les Perroquets les Plus Intelligents | 37,121 |
| 4 | `/fr/perroquet-qui-parle-le-mieux/` | Perroquet Qui Parle le Mieux : Top 5 | 36,238 |
| 5 | `/fr/perroquet-pour-debutant/` | Perroquet pour Débutant | 37,476 |
| 6 | `/fr/perroquet-pour-famille/` | Perroquet pour Famille | 74,419 |
| 7 | `/fr/perroquet-appartement/` | Perroquet en Appartement | 73,236 |
| 8 | `/fr/perroquets-calmes/` | Perroquets Calmes | 77,591 |
| 9 | `/fr/petits-perroquets/` | Petits Perroquets | 80,078 |
| 10 | `/fr/perroquets-bebes/` | Perroquets Bébés | 74,983 |

**Pillar page:** `/fr/perroquet-qui-parle/` — previously built, now updated

---

## Pillar Page Updates

- All 6 placeholder `<span data-future-url="...">` elements replaced with live `<a href="...">` tags
- 4 additional cluster pages added to the related-cards grid (pourquoi-ne-parle-pas, plus-intelligents, parle-le-mieux, pour-debutant)
- Related-cards grid now shows all 10 cluster pages as live links (was 4 live + 6 placeholder)

---

## Schema Coverage

Every cluster page includes:
- `BreadcrumbList` — proper hierarchy back to pillar or homepage
- `WebPage` — canonical URL, title, description, publisher
- `FAQPage` — minimum 8 Q&A pairs per page (range: 8–10)

---

## Internal Link Architecture

### Hub → Cluster (10 links)
Pillar page `/fr/perroquet-qui-parle/` links to all 10 cluster pages via the related-cards grid.

### Cluster → Hub (10 back-links)
Every cluster page links prominently to `/fr/perroquet-qui-parle/` in:
- Body intro paragraph (always first or second paragraph)
- Sidebar "Sur ce sujet" card

### Cluster → Cluster (cross-links)
| Page | Cross-links to |
|------|----------------|
| apprendre-à-parler | ne-parle-pas, parle-le-mieux |
| ne-parle-pas | apprendre-à-parler, parle-le-mieux, bebes |
| plus-intelligents | parle-le-mieux, apprendre-à-parler, pour-debutant |
| parle-le-mieux | plus-intelligents, apprendre-à-parler, ne-parle-pas |
| pour-debutant | bebes, pour-famille, appartement, petits |
| pour-famille | pour-debutant, petits |
| appartement | perroquets-calmes, petits, pour-debutant |
| perroquets-calmes | appartement, petits, pour-debutant |
| petits-perroquets | perroquets-calmes, appartement, pour-debutant |
| perroquets-bebes | pour-debutant, apprendre-à-parler |

### Cluster → Species Pages (confirmed links per page)
All 10 pages link to at least 3 of: `/fr/perroquet-gris-du-gabon/`, `/fr/amazone-front-bleu/`, `/fr/ara-bleu-et-jaune/`, `/fr/eclectus/`, `/fr/cacatoes-huppe-jaune/`, `/fr/pionus/`, `/fr/especies/perroquet-du-senegal/`, `/fr/especies/perruche-a-collier/`, `/fr/especies/conure-soleil/`

### Cluster → Commercial Pages (confirmed links per page)
All 10 pages link to `/fr/perroquets-disponibles/` and at minimum 2 of: `/fr/acheter-perroquet/`, `/fr/livraison/`, `/fr/garantie-sante/`, `/fr/contact/`, `/fr/processus-adoption/`

---

## Keyword Coverage

| Primary keyword | Target page | Search intent |
|-----------------|-------------|---------------|
| comment apprendre à un perroquet à parler | apprendre-à-parler | Informational + How-to |
| pourquoi mon perroquet ne parle pas | ne-parle-pas | Informational (problem) |
| perroquets les plus intelligents | plus-intelligents | Informational |
| quel perroquet parle le mieux | parle-le-mieux | Informational + Commercial |
| perroquet pour débutant | pour-debutant | Commercial Investigation |
| perroquet pour famille | pour-famille | Commercial Investigation |
| perroquet appartement | appartement | Commercial Investigation |
| perroquets calmes | perroquets-calmes | Commercial Investigation |
| petits perroquets | petits-perroquets | Commercial Investigation |
| bébé perroquet / perroquet juvénile | perroquets-bebes | Commercial Investigation |

---

## Sitemap Updates

10 new URLs added to `sitemap.xml` (appended before `</urlset>`):
- All dated `2026-07-29`, `changefreq: monthly`, `priority: 0.75`

---

## _redirects Updates

10 new clean-URL rules added (after `/fr/perroquet-qui-parle` entry):
- All map `/fr/[slug]` → `/fr/[slug]/index.html` with status 200

---

## Topical Authority Assessment

**Cluster depth:** 10 supporting pages + 1 pillar = 11-page cluster  
**Intent coverage:** Informational (4 pages) + Commercial Investigation (6 pages) + How-to (1 page)  
**Entity coverage:** 9 species named and linked across the cluster; training methodology, intelligence research, buyer guidance, lifestyle matching — all covered  
**Missing gaps (future work):**
- `/fr/perroquet-intelligent-pas-parleur/` — the split between intelligence and speech ability (edge case)
- `/fr/dresser-un-perroquet/` — broader training beyond speech (high search volume)
- `/fr/quel-perroquet-choisir/` — mega-guide decision tree (captures undecided buyers)
- `/fr/prix-perroquet/` — price hub across all species (commercial, high intent)

---

## Validation Checklist

- [x] All 10 pages created and confirmed non-zero on disk
- [x] All 10 pages have 3 JSON-LD schema blocks (BreadcrumbList + WebPage + FAQPage)
- [x] All 10 pages link back to pillar `/fr/perroquet-qui-parle/` prominently
- [x] All 10 pages have canonical, hreflang fr-FR + x-default, 5 OG tags, 4 Twitter Card tags
- [x] All 10 pages have Netlify-compatible CSS (inline `<style>` + `/brand-system.css`)
- [x] All 10 pages have GA4 tag `G-4007YHH4H9`
- [x] All 10 pages have desktop dropdown nav + mobile hamburger nav + `lang-switcher.js`
- [x] All 10 pages have sidebar: delivery badge + disponibles CTA + topic links + contact CTA
- [x] `sitemap.xml` updated with all 10 new URLs
- [x] `_redirects` updated with all 10 clean-URL rules
- [x] Pillar page `/fr/perroquet-qui-parle/` updated: all placeholders → live links, 4 new cluster links added
- [x] `sitemap.xml` and `_redirects` NOT modified inside subagents — updated centrally by main agent
