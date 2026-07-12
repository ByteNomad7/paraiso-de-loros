---
name: FR species pages pattern
description: Structure and constraints for fr/especies/ species guide pages and the upgrade script.
---

## Pattern

- Template source: `fr/especies/conure-soleil/index.html` — all new pages copy CSS verbatim.
- 4 required schemas per page: WebPage, BreadcrumbList (3 levels: Accueil → Espèces → [Name]), Article, FAQPage.
- Minimum 8 FAQ entries in both FAQPage schema AND HTML `<details><summary class="faq-q">` elements.
- Word target: 2,000–3,000+ words per page.
- hreflang: fr-FR self, es-ES equivalent, x-default = ES URL. PT only if mapping confirmed.
- Standalone pages at `/fr/[species]/` (e.g. `/fr/ara-hyacinthe/`) are kept live and in the sitemap — they are separate from `/fr/especies/[slug]/`. Do NOT redirect or remove them.

## 20 target species (all in fr/especies/ as of 2026-07-12)

perroquet-gris-du-gabon, ara-bleu-et-jaune, ara-hyacinthe, ara-macao, ara-chloroptere,
cacatoes-rosalbin, cacatoes-huppe-jaune, amazone-front-bleu, amazone-nuque-jaune, eclectus,
conure-soleil, conure-jenday, caique, caique-ventre-blanc, perroquet-pionus,
perroquet-du-senegal, perruche-alexandre, loriquet-arc-en-ciel, perruche-royale, grand-alexandre

## Upgrade script

`upgrade-fr-especies.js` — adds Article schema + extra FAQ entries + refreshes otras-aves for existing pages.
Run with `node upgrade-fr-especies.js`.

## Sitemap

All 20 target species + index at priority 0.82–0.90 in `sitemap_fr.xml`.
fr/especies/index.html now shows 26 cards (20 target + 6 legacy).

**Why:** Standalone pages retain their inbound links and rankings; fr/especies/ pages target the `/fr/especies/[slug]/` URL pattern used by the ES and PT versions for consistent cross-language linking.
