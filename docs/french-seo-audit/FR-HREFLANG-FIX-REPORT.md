# FR-HREFLANG-FIX-REPORT.md
## Paraíso de Aves — French City Pages Hreflang Correction
**Date:** 2026-07-29  
**Engineer:** Senior International SEO — automated fix + validation  
**Scope:** All 50 French city pages under `/fr/perroquets-a-vendre-{city}/`

---

## EXECUTIVE SUMMARY

All 50 French city pages had two broken hreflang tags pointing to language hub pages instead of specific city equivalents. Those tags have been removed. All 50 pages now pass full hreflang validation.

**Before:** 3 hreflang tags per page (1 correct, 2 broken)  
**After:** 2 hreflang tags per page (both correct)

---

## ROOT CAUSE

The task specification referenced `/fr/villes/{city}/` → `/es/ciudades/{city}/`. After a full crawl of the codebase the actual URL structure was confirmed as:

| Section | Actual URL pattern | Cities covered |
|---------|-------------------|----------------|
| French | `/fr/perroquets-a-vendre-{city}/` | 50 French cities (Paris, Lyon, Marseille…) |
| Spanish | `/ciudades/comprar-loros-{city}.html` | Spanish cities only (Madrid, Barcelona, Sevilla…) |
| Portuguese | `/pt/papagaios-a-venda-{city}/` | Portuguese cities only (Lisboa, Porto…) |

**No cross-language city equivalents exist.** French city pages cover cities in France; Spanish pages cover cities in Spain; Portuguese pages cover cities in Portugal. There is no `/es/ciudades/paris/` because Paris is a French city with no Spanish-section equivalent page, and vice versa.

The pre-existing broken hreflang pointed every FR city page to the ES and PT hub pages (`/ciudades/` and `/pt/cidades/`). This is invalid per Google's hreflang specification: hreflang must reference an equivalent page, never a category hub as a substitute for a missing specific page.

**Correct fix:** Remove the es-ES and pt-PT hreflang declarations from all 50 FR city pages. The reciprocity requirement is automatically satisfied because ES and PT city pages never referenced FR city pages.

---

## CORRECTED PAGES ✓

All 50 pages corrected. For each page, the two broken lines were removed:

```html
<!-- REMOVED from all 50 pages -->
<link rel="alternate" hreflang="es-ES" href="https://www.paraisodeaves.com/ciudades/" />
<link rel="alternate" hreflang="pt-PT" href="https://www.paraisodeaves.com/pt/cidades/" />
```

| # | City | FR URL | fr-FR self | x-default | es-ES removed | pt-PT removed |
|---|------|--------|-----------|-----------|---------------|---------------|
| 1 | Aix-en-Provence | /fr/perroquets-a-vendre-aix-en-provence/ | ✓ | ✓ | ✓ | ✓ |
| 2 | Amiens | /fr/perroquets-a-vendre-amiens/ | ✓ | ✓ | ✓ | ✓ |
| 3 | Angers | /fr/perroquets-a-vendre-angers/ | ✓ | ✓ | ✓ | ✓ |
| 4 | Annecy | /fr/perroquets-a-vendre-annecy/ | ✓ | ✓ | ✓ | ✓ |
| 5 | Antibes | /fr/perroquets-a-vendre-antibes/ | ✓ | ✓ | ✓ | ✓ |
| 6 | Avignon | /fr/perroquets-a-vendre-avignon/ | ✓ | ✓ | ✓ | ✓ |
| 7 | Bayonne | /fr/perroquets-a-vendre-bayonne/ | ✓ | ✓ | ✓ | ✓ |
| 8 | Besançon | /fr/perroquets-a-vendre-besancon/ | ✓ | ✓ | ✓ | ✓ |
| 9 | Béziers | /fr/perroquets-a-vendre-beziers/ | ✓ | ✓ | ✓ | ✓ |
| 10 | Bordeaux | /fr/perroquets-a-vendre-bordeaux/ | ✓ | ✓ | ✓ | ✓ |
| 11 | Brest | /fr/perroquets-a-vendre-brest/ | ✓ | ✓ | ✓ | ✓ |
| 12 | Caen | /fr/perroquets-a-vendre-caen/ | ✓ | ✓ | ✓ | ✓ |
| 13 | Cannes | /fr/perroquets-a-vendre-cannes/ | ✓ | ✓ | ✓ | ✓ |
| 14 | Chambéry | /fr/perroquets-a-vendre-chambery/ | ✓ | ✓ | ✓ | ✓ |
| 15 | Clermont-Ferrand | /fr/perroquets-a-vendre-clermont-ferrand/ | ✓ | ✓ | ✓ | ✓ |
| 16 | Colmar | /fr/perroquets-a-vendre-colmar/ | ✓ | ✓ | ✓ | ✓ |
| 17 | Dijon | /fr/perroquets-a-vendre-dijon/ | ✓ | ✓ | ✓ | ✓ |
| 18 | Grenoble | /fr/perroquets-a-vendre-grenoble/ | ✓ | ✓ | ✓ | ✓ |
| 19 | La Rochelle | /fr/perroquets-a-vendre-la-rochelle/ | ✓ | ✓ | ✓ | ✓ |
| 20 | Le Havre | /fr/perroquets-a-vendre-le-havre/ | ✓ | ✓ | ✓ | ✓ |
| 21 | Le Mans | /fr/perroquets-a-vendre-le-mans/ | ✓ | ✓ | ✓ | ✓ |
| 22 | Lille | /fr/perroquets-a-vendre-lille/ | ✓ | ✓ | ✓ | ✓ |
| 23 | Limoges | /fr/perroquets-a-vendre-limoges/ | ✓ | ✓ | ✓ | ✓ |
| 24 | Lorient | /fr/perroquets-a-vendre-lorient/ | ✓ | ✓ | ✓ | ✓ |
| 25 | Lyon | /fr/perroquets-a-vendre-lyon/ | ✓ | ✓ | ✓ | ✓ |
| 26 | Marseille | /fr/perroquets-a-vendre-marseille/ | ✓ | ✓ | ✓ | ✓ |
| 27 | Metz | /fr/perroquets-a-vendre-metz/ | ✓ | ✓ | ✓ | ✓ |
| 28 | Montauban | /fr/perroquets-a-vendre-montauban/ | ✓ | ✓ | ✓ | ✓ |
| 29 | Montpellier | /fr/perroquets-a-vendre-montpellier/ | ✓ | ✓ | ✓ | ✓ |
| 30 | Mulhouse | /fr/perroquets-a-vendre-mulhouse/ | ✓ | ✓ | ✓ | ✓ |
| 31 | Nantes | /fr/perroquets-a-vendre-nantes/ | ✓ | ✓ | ✓ | ✓ |
| 32 | Narbonne | /fr/perroquets-a-vendre-narbonne/ | ✓ | ✓ | ✓ | ✓ |
| 33 | Nice | /fr/perroquets-a-vendre-nice/ | ✓ | ✓ | ✓ | ✓ |
| 34 | Nîmes | /fr/perroquets-a-vendre-nimes/ | ✓ | ✓ | ✓ | ✓ |
| 35 | Orléans | /fr/perroquets-a-vendre-orleans/ | ✓ | ✓ | ✓ | ✓ |
| 36 | Paris | /fr/perroquets-a-vendre-paris/ | ✓ | ✓ | ✓ | ✓ |
| 37 | Pau | /fr/perroquets-a-vendre-pau/ | ✓ | ✓ | ✓ | ✓ |
| 38 | Perpignan | /fr/perroquets-a-vendre-perpignan/ | ✓ | ✓ | ✓ | ✓ |
| 39 | Poitiers | /fr/perroquets-a-vendre-poitiers/ | ✓ | ✓ | ✓ | ✓ |
| 40 | Reims | /fr/perroquets-a-vendre-reims/ | ✓ | ✓ | ✓ | ✓ |
| 41 | Rennes | /fr/perroquets-a-vendre-rennes/ | ✓ | ✓ | ✓ | ✓ |
| 42 | Rouen | /fr/perroquets-a-vendre-rouen/ | ✓ | ✓ | ✓ | ✓ |
| 43 | Saint-Étienne | /fr/perroquets-a-vendre-saint-etienne/ | ✓ | ✓ | ✓ | ✓ |
| 44 | Strasbourg | /fr/perroquets-a-vendre-strasbourg/ | ✓ | ✓ | ✓ | ✓ |
| 45 | Toulon | /fr/perroquets-a-vendre-toulon/ | ✓ | ✓ | ✓ | ✓ |
| 46 | Toulouse | /fr/perroquets-a-vendre-toulouse/ | ✓ | ✓ | ✓ | ✓ |
| 47 | Tours | /fr/perroquets-a-vendre-tours/ | ✓ | ✓ | ✓ | ✓ |
| 48 | Troyes | /fr/perroquets-a-vendre-troyes/ | ✓ | ✓ | ✓ | ✓ |
| 49 | Valence | /fr/perroquets-a-vendre-valence/ | ✓ | ✓ | ✓ | ✓ |
| 50 | Villeurbanne | /fr/perroquets-a-vendre-villeurbanne/ | ✓ | ✓ | ✓ | ✓ |

---

## HREFLANG STATE AFTER FIX

Every FR city page now carries exactly these two hreflang declarations:

```html
<link rel="alternate" hreflang="fr-FR" href="https://www.paraisodeaves.com/fr/perroquets-a-vendre-{city}/" />
<link rel="alternate" hreflang="x-default" href="https://www.paraisodeaves.com/" />
```

- `hreflang="fr-FR"` — self-referencing, matches canonical exactly ✓  
- `hreflang="x-default"` — points to the root homepage, the site's language-neutral entry ✓  
- No es-ES or pt-PT tags — correct, no equivalent pages exist ✓  
- Canonical URL is unchanged and matches `fr-FR` href exactly ✓

---

## RECIPROCITY CHECK ✓

Hreflang requires every declared pair to be reciprocal. Verified:

| Check | Result |
|-------|--------|
| ES city pages (`/ciudades/comprar-loros-*.html`) reference FR city pages | ✗ None — correct, no ES↔FR city pairs exist |
| ES root city pages (`/loros-en-venta-*.html`) reference FR city pages | ✗ None — correct |
| PT city pages (`/pt/papagaios-a-venda-*/`) reference FR city pages | ✗ None — correct |
| FR city pages reference ES or PT hub pages | ✗ None — removed by this fix |

No orphan language references remain. All declared hreflang pairs are self-contained and reciprocal.

---

## REMAINING WARNINGS ⚠

The following hreflang issues exist elsewhere in the French section and are **outside the scope of this task** (city pages only). They are documented for completeness and are fully described in `FRENCH-TECHNICAL-ISSUES.md`:

| Issue | Affected Pages | Severity |
|-------|---------------|----------|
| 6 `/fr/especies/` pages have hreflang pointing to ES/PT category hubs instead of specific species pages | 6 pages | 🟠 High |
| `/fr/ara-catalina/` missing pt-PT hreflang | 1 page | 🟠 High |
| `/fr/toucans/` missing pt-PT hreflang | 1 page | 🟠 High |
| `/fr/a-propos/` + `/fr/processus-adoption/` hreflang points to homepages | 2 pages | 🟡 Medium |

---

## VALIDATION RESULTS ✓

```
Total FR city pages crawled:  50
Passed:                        50
Failed:                         0
Warnings:                       0

Checks per page:
  ✓ fr-FR self hreflang present and matches canonical
  ✓ x-default present and points to https://www.paraisodeaves.com/
  ✓ es-ES hub reference absent
  ✓ pt-PT hub reference absent
  ✓ Exactly 2 hreflang tags (no extras)
  ✓ canonical matches fr-FR href

Reciprocity checks:
  ✓ ES ciudades pages: 0 FR references (correct — different country cities)
  ✓ ES root city pages: 0 FR references (correct)
  ✓ PT cidades pages: 0 FR references (correct)
```

**VALIDATION PASSED — 50/50**

---

## SEARCH CONSOLE COMPATIBILITY

The corrected hreflang implementation is fully compatible with Google Search Console:

- ✓ All hreflang values use valid BCP 47 language-region tags (`fr-FR`)
- ✓ All URLs are absolute with protocol and www (`https://www.paraisodeaves.com/...`)
- ✓ All URLs are consistent with canonical declarations
- ✓ No hub-page hreflang (previously flagged as "Return tag missing" in GSC)
- ✓ x-default present on every page
- ✓ No self-pointing x-default (x-default correctly points to root, not page self)

After Netlify deployment, submit `sitemap_fr.xml` in GSC to prompt recrawl of the corrected pages.
