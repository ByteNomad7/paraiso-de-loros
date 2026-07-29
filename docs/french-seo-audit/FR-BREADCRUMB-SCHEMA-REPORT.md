# FR-BREADCRUMB-SCHEMA-REPORT.md
## Paraíso de Aves — French City Pages Duplicate BreadcrumbList Fix
**Date:** 2026-07-29  
**Scope:** All 50 French city pages under `/fr/perroquets-a-vendre-{city}/`  
**Status:** Complete — no production content modified

---

## EXECUTIVE SUMMARY

All 50 French city pages carried a duplicate BreadcrumbList: one embedded as the `breadcrumb` property inside the `WebPage` JSON-LD block, and one as a separate standalone `BreadcrumbList` JSON-LD block. The embedded copy has been removed from the `WebPage` block. The standalone block is preserved intact. All other schema types are untouched.

| Metric | Value |
|--------|-------|
| Pages audited | 50 |
| Pages with duplicate BreadcrumbList | 50 |
| Pages fixed | 50 |
| Pages errored | 0 |
| Pages skipped | 0 |

---

## ROOT CAUSE

Every city page was generated with this `WebPage` block:

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Perroquets à Vendre à {City}",
  "url": "https://www.paraisodeaves.com/fr/perroquets-a-vendre-{city}/",
  "inLanguage": "fr-FR",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.paraisodeaves.com/fr/" },
      { "@type": "ListItem", "position": 2, "name": "Villes",  "item": "https://www.paraisodeaves.com/fr/" },
      { "@type": "ListItem", "position": 3, "name": "Perroquets à {City}", "item": "https://www.paraisodeaves.com/fr/perroquets-a-vendre-{city}/" }
    ]
  }
}
```

And also with a separate standalone block immediately after `LocalBusiness`:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Accueil",     "item": "https://www.paraisodeaves.com/fr/" },
    { "@type": "ListItem", "position": 2, "name": "Nos Villes",  "item": "https://www.paraisodeaves.com/fr/" },
    { "@type": "ListItem", "position": 3, "name": "Perroquets à {City}", "item": "https://www.paraisodeaves.com/fr/perroquets-a-vendre-{city}/" }
  ]
}
```

Two BreadcrumbList declarations on the same page cause Google's Rich Results Test to report a structured-data conflict and can suppress breadcrumb rich results.

**Additional inconsistency detected:** The embedded copy used `"name": "Villes"` at position 2; the standalone used `"name": "Nos Villes"`. Google would receive two different breadcrumb trails for the same page.

---

## SCHEMA BEFORE (every page)

```
Block 1 — WebPage
  ├── name, description, url, inLanguage
  └── breadcrumb → { @type: BreadcrumbList, itemListElement: [...] }  ← DUPLICATE

Block 2 — LocalBusiness
  └── name, description, areaServed (City + AdministrativeArea), address, openingHours …

Block 3 — BreadcrumbList  (standalone)
  └── itemListElement: [Accueil, Nos Villes, Perroquets à {City}]

Block 4 — FAQPage
  └── 10 Questions with Answers
```

---

## SCHEMA AFTER (every page)

```
Block 1 — WebPage
  └── name, description, url, inLanguage  (breadcrumb property removed)

Block 2 — LocalBusiness
  └── name, description, areaServed (City + AdministrativeArea), address, openingHours …

Block 3 — BreadcrumbList  ← ONE, authoritative, unchanged
  └── itemListElement: [Accueil, Nos Villes, Perroquets à {City}]

Block 4 — FAQPage
  └── 10 Questions with Answers
```

No content, HTML, headings, or visible text was modified.

---

## PAGES FIXED ✓

| # | City | Embedded BC removed | Standalone BC intact | WebPage intact | LocalBusiness intact | FAQPage intact |
|---|------|--------------------|--------------------|----------------|---------------------|----------------|
| 1 | Aix-en-Provence | ✓ | ✓ | ✓ | ✓ | ✓ |
| 2 | Amiens | ✓ | ✓ | ✓ | ✓ | ✓ |
| 3 | Angers | ✓ | ✓ | ✓ | ✓ | ✓ |
| 4 | Annecy | ✓ | ✓ | ✓ | ✓ | ✓ |
| 5 | Antibes | ✓ | ✓ | ✓ | ✓ | ✓ |
| 6 | Avignon | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7 | Bayonne | ✓ | ✓ | ✓ | ✓ | ✓ |
| 8 | Besançon | ✓ | ✓ | ✓ | ✓ | ✓ |
| 9 | Béziers | ✓ | ✓ | ✓ | ✓ | ✓ |
| 10 | Bordeaux | ✓ | ✓ | ✓ | ✓ | ✓ |
| 11 | Brest | ✓ | ✓ | ✓ | ✓ | ✓ |
| 12 | Caen | ✓ | ✓ | ✓ | ✓ | ✓ |
| 13 | Cannes | ✓ | ✓ | ✓ | ✓ | ✓ |
| 14 | Chambéry | ✓ | ✓ | ✓ | ✓ | ✓ |
| 15 | Clermont-Ferrand | ✓ | ✓ | ✓ | ✓ | ✓ |
| 16 | Colmar | ✓ | ✓ | ✓ | ✓ | ✓ |
| 17 | Dijon | ✓ | ✓ | ✓ | ✓ | ✓ |
| 18 | Grenoble | ✓ | ✓ | ✓ | ✓ | ✓ |
| 19 | La Rochelle | ✓ | ✓ | ✓ | ✓ | ✓ |
| 20 | Le Havre | ✓ | ✓ | ✓ | ✓ | ✓ |
| 21 | Le Mans | ✓ | ✓ | ✓ | ✓ | ✓ |
| 22 | Lille | ✓ | ✓ | ✓ | ✓ | ✓ |
| 23 | Limoges | ✓ | ✓ | ✓ | ✓ | ✓ |
| 24 | Lorient | ✓ | ✓ | ✓ | ✓ | ✓ |
| 25 | Lyon | ✓ | ✓ | ✓ | ✓ | ✓ |
| 26 | Marseille | ✓ | ✓ | ✓ | ✓ | ✓ |
| 27 | Metz | ✓ | ✓ | ✓ | ✓ | ✓ |
| 28 | Montauban | ✓ | ✓ | ✓ | ✓ | ✓ |
| 29 | Montpellier | ✓ | ✓ | ✓ | ✓ | ✓ |
| 30 | Mulhouse | ✓ | ✓ | ✓ | ✓ | ✓ |
| 31 | Nantes | ✓ | ✓ | ✓ | ✓ | ✓ |
| 32 | Narbonne | ✓ | ✓ | ✓ | ✓ | ✓ |
| 33 | Nice | ✓ | ✓ | ✓ | ✓ | ✓ |
| 34 | Nîmes | ✓ | ✓ | ✓ | ✓ | ✓ |
| 35 | Orléans | ✓ | ✓ | ✓ | ✓ | ✓ |
| 36 | Paris | ✓ | ✓ | ✓ | ✓ | ✓ |
| 37 | Pau | ✓ | ✓ | ✓ | ✓ | ✓ |
| 38 | Perpignan | ✓ | ✓ | ✓ | ✓ | ✓ |
| 39 | Poitiers | ✓ | ✓ | ✓ | ✓ | ✓ |
| 40 | Reims | ✓ | ✓ | ✓ | ✓ | ✓ |
| 41 | Rennes | ✓ | ✓ | ✓ | ✓ | ✓ |
| 42 | Rouen | ✓ | ✓ | ✓ | ✓ | ✓ |
| 43 | Saint-Étienne | ✓ | ✓ | ✓ | ✓ | ✓ |
| 44 | Strasbourg | ✓ | ✓ | ✓ | ✓ | ✓ |
| 45 | Toulon | ✓ | ✓ | ✓ | ✓ | ✓ |
| 46 | Toulouse | ✓ | ✓ | ✓ | ✓ | ✓ |
| 47 | Tours | ✓ | ✓ | ✓ | ✓ | ✓ |
| 48 | Troyes | ✓ | ✓ | ✓ | ✓ | ✓ |
| 49 | Valence | ✓ | ✓ | ✓ | ✓ | ✓ |
| 50 | Villeurbanne | ✓ | ✓ | ✓ | ✓ | ✓ |

---

## VALIDATION RESULTS

Checks run on every page after edit:

| Check | Result |
|-------|--------|
| `WebPage` block still present | 50 / 50 ✓ |
| `WebPage.breadcrumb` embedded property removed | 50 / 50 ✓ |
| `LocalBusiness` block still present | 50 / 50 ✓ |
| Standalone `BreadcrumbList` block still present | 50 / 50 ✓ |
| Standalone `BreadcrumbList` count = exactly 1 | 50 / 50 ✓ |
| `FAQPage` block still present | 50 / 50 ✓ |
| All JSON-LD blocks parse without error after edit | 50 / 50 ✓ |
| Total schema blocks per page = 4 | 50 / 50 ✓ |

**VALIDATION PASSED — 50 / 50**

---

## REMAINING WARNINGS

None for city pages. The following schema issues exist elsewhere in the French section and are out of scope for this task (documented in `FRENCH-TECHNICAL-ISSUES.md`):

| Issue | Affected Pages |
|-------|---------------|
| `/fr/a-propos/` and `/fr/processus-adoption/` have no schema at all | 2 pages |
| `/fr/connaissances/` hub has no schema | 1 page |
| 6 `/fr/especies/` pages have hreflang pointing to category hubs | 6 pages |

---

## SEARCH CONSOLE COMPATIBILITY

The corrected schema is fully compatible with Google's Rich Results requirements:

- ✓ Exactly one `BreadcrumbList` block per page
- ✓ `BreadcrumbList` is a top-level standalone JSON-LD block (preferred by Google)
- ✓ All `ListItem` entries have `@type`, `position`, `name`, and `item`
- ✓ `WebPage` block retains all properties except the redundant `breadcrumb` property
- ✓ `LocalBusiness`, `FAQPage` blocks are untouched
- ✓ No `Organization` or `Product` schema applicable to city pages (correctly absent)
- ✓ All JSON-LD is valid and parseable

After Netlify deployment, use Google's Rich Results Test on any city page URL to confirm a single clean breadcrumb trail renders without warnings.
