# FRENCH-INTERNAL-LINKING-PLAN.md
## Paraíso de Aves — French Internal Linking Architecture
**Audit date:** 2026-07-29  
**Status:** READ-ONLY. No production files changed.

---

## CURRENT STATE DIAGNOSIS

### Orphan Pages (no hub linking to them)
- All 50 city pages lack a `/fr/villes/` hub — breadcrumbs point directly to `/fr/` homepage
- `/fr/toucans/` is not linked from the FR species hub or homepage nav
- `/fr/caisses-de-transport/` and `/fr/cages-pour-perroquets/` are not linked from `/fr/connaissances/`
- Individual blog posts have no "related articles" cross-links

### Dead-end Pages (no outbound internal links to commercial pages)
- `/fr/a-propos/` — about page has outbound links but none to key commercial pages
- `/fr/garantie-sante/` — trust page but no link to `/fr/perroquets-disponibles/`
- Gallery subpages have no links to species commercial pages

### Pages Too Far from FR Homepage (>3 clicks)
- All 50 city pages are accessible in 2 clicks (homepage → city). Fine.
- `/fr/connaissances/faq/` and `/fr/faq/` — 2 clicks. Fine.
- Individual blog posts accessible via blog hub in 2 clicks. Fine.
- **Problem:** No `/fr/villes/` hub means the 50 city pages share only one entry point (homepage footer/nav). A cities hub would let Google discover and consolidate city page authority.

### Links Pointing to Spanish Pages (confirmed issues)
- All 50 city pages hreflang points to `/ciudades/` (confirmed — see Technical Issues)
- Several `/fr/especies/` hreflang attributes point to ES generic/category pages

### Important Pages with Too Few Inbound Links
- `/fr/perroquets-disponibles/` — the most commercially important page, yet not prominently featured in the connaissances hub or species pages
- `/fr/eleveur-perroquets/` — trust page critical for conversions; not linked from enough internal pages
- `/fr/garantie-sante/` — same issue
- `/fr/prix-ara-hyacinthe/` and `/fr/prix-cacatoes/` — price pages only accessible from navigation; not linked contextually from species guide pages

---

## PROPOSED FRENCH INTERNAL-LINK ARCHITECTURE

### Tier 1: FR Homepage (`/fr/`)
**Must link to:**
- `/fr/perroquets-disponibles/` — prominent CTA
- `/fr/acheter-perroquet/` — main commercial
- `/fr/eleveur-perroquets/` — trust anchor
- `/fr/especies/` — species hub
- `/fr/connaissances/` — knowledge hub
- `/fr/livraison/` — delivery
- `/fr/blog/` — blog hub
- `/fr/galerie/` — gallery
- `/fr/contact/` — contact

---

### Tier 2: Commercial Hub Pages

#### `/fr/perroquets/` (All Species Commercial)
**Must link to:**
- Every species commercial page (`/fr/ara-bleu-et-jaune/`, `/fr/ara-hyacinthe/`, etc.)
- `/fr/perroquets-disponibles/` — CTA
- `/fr/acheter-perroquet/`
- `/fr/especies/` — deeper species reading

#### `/fr/perroquets-disponibles/` (Available Birds)
**Must link to:**
- `/fr/acheter-perroquet/`
- `/fr/processus-adoption/`
- `/fr/livraison/`
- `/fr/garantie-sante/`
- `/fr/contact/`
- Each individual species commercial page when relevant

#### `/fr/acheter-perroquet/` (Main Commercial)
**Must link to:**
- `/fr/perroquets-disponibles/`
- `/fr/processus-adoption/`
- `/fr/eleveur-perroquets/`
- `/fr/livraison/`
- `/fr/garantie-sante/`
- `/fr/connaissances/cites/`

---

### Tier 3: Species Pages

#### Each `/fr/especies/{species}/` guide page **must link to:**
- Corresponding species commercial page (e.g. `/fr/ara-bleu-et-jaune/` from `/fr/especies/ara-bleu-et-jaune/`)
- `/fr/perroquets-disponibles/` — CTA
- `/fr/connaissances/alimentation/` — "learn about feeding"
- `/fr/connaissances/sante/` — "health & care"
- `/fr/blog/` articles about the species where they exist
- Related species (e.g. Ara Bleu et Jaune → Ara Macao, Ara Hyacinthe)

#### Each species commercial page (`/fr/ara-bleu-et-jaune/`, etc.) **must link to:**
- Corresponding `/fr/especies/` guide — "read full guide"
- `/fr/perroquets-disponibles/` — "see all available birds"
- `/fr/prix-*` page where one exists
- `/fr/livraison/`
- `/fr/connaissances/cites/`

---

### Tier 4: City Pages

**Problem:** 50 city pages currently link to homepage only via breadcrumb. No `/fr/villes/` hub exists.

**Recommended Structure:**

```
/fr/
  └── /fr/villes/  [CREATE THIS HUB]
        ├── /fr/perroquets-a-vendre-paris/
        ├── /fr/perroquets-a-vendre-lyon/
        ├── /fr/perroquets-a-vendre-marseille/
        └── [...47 more cities]
```

**Each city page must link to:**
- `/fr/villes/` — breadcrumb parent (once created)
- `/fr/perroquets-disponibles/` — CTA
- `/fr/livraison/` — "livraison depuis l'Espagne vers {city}"
- `/fr/acheter-perroquet/` — main commercial anchor
- `/fr/connaissances/cites/` — legal reassurance

**New `/fr/villes/` hub must link to:**
- All 50 city pages
- `/fr/livraison/`
- `/fr/perroquets-disponibles/`

---

### Tier 5: Knowledge Hub

#### `/fr/connaissances/` hub **must link to:**
- All 9 sub-pages (currently implied, verify it does)
- `/fr/perroquets-disponibles/` — CTA at bottom
- `/fr/blog/` — "more articles"

#### Each `/fr/connaissances/{topic}/` **must link to:**
- Related species pages
- `/fr/perroquets-disponibles/` — CTA
- Relevant blog articles
- Adjacent connaissances pages

**Specific missing contextual links identified:**
- `/fr/connaissances/cites/` should link to → `/fr/processus-adoption/`, `/fr/livraison/`, `/fr/garantie-sante/`
- `/fr/connaissances/alimentation/` should link to → `/fr/nourriture-pour-perroquets/` (product page)
- `/fr/connaissances/sante/` should link to → `/fr/garantie-sante/`
- `/fr/connaissances/livraison/` should link to → `/fr/livraison/` (commercial page) + consolidate or differentiate

---

### Tier 6: Blog

**Current problem:** 11 blog posts are nearly isolated. They link out but have no "related articles" cross-links and are not linked from species pages.

**Required additions:**
- Every blog article must have 2-3 "related articles" links to other blog posts
- Every blog article targeting a species must link to the species commercial page
- `/fr/blog/prix-perroquet-france/` must link to `/fr/prix-cacatoes/` and `/fr/prix-ara-hyacinthe/`
- `/fr/blog/guide-cites-france/` must link to `/fr/connaissances/cites/`
- `/fr/blog/choisir-eleveur-serieux/` must link to `/fr/eleveur-perroquets/`
- `/fr/blog/meilleurs-perroquets-debutants/` must link to `/fr/petits-perroquets/` (once created) and `/fr/perroquet-pour-famille/` (once created)

---

### Tier 7: Price Pages

**`/fr/prix-ara-hyacinthe/` must link to:**
- `/fr/ara-hyacinthe/` — commercial page
- `/fr/especies/ara-hyacinthe/` — full guide
- `/fr/perroquets-disponibles/`
- `/fr/connaissances/prix/`

**`/fr/prix-cacatoes/` must link to:**
- `/fr/cacatoes-rosalbin/`, `/fr/cacatoes-huppe-jaune/` — commercial pages
- `/fr/especies/cacatoes-rosalbin/`, `/fr/especies/cacatoes-huppe-jaune/`
- `/fr/perroquets-disponibles/`
- `/fr/connaissances/prix/`

---

## ANCHOR TEXT GUIDELINES

| Linking Page Type | Anchor Text Pattern | Bad Example | Good Example |
|------------------|--------------------|-|--|
| Species guide → commercial | Descriptive, keyword-rich | "cliquez ici" | "acheter un Ara Bleu et Jaune en France" |
| Any page → available birds | Commercial CTA | "voir plus" | "voir nos perroquets disponibles" |
| Blog → species | Natural, editorial | "cette espèce" | "le Gris du Gabon" |
| City page → delivery | Geographic + service | "livraison" | "livraison de perroquets à Paris" |
| Any page → knowledge hub | Informational | "en savoir plus" | "guide complet d'alimentation" |

---

## LINK EQUITY FLOW MAP (PROPOSED)

```
Homepage /fr/
│
├── /fr/perroquets-disponibles/ [PRIORITY COMMERCIAL — 3+ links from homepage]
├── /fr/acheter-perroquet/
├── /fr/perroquets/ (species hub)
│     ├── /fr/ara-bleu-et-jaune/ ──→ /fr/especies/ara-bleu-et-jaune/ ──→ /fr/blog/ articles
│     ├── /fr/ara-hyacinthe/ ──→ /fr/prix-ara-hyacinthe/
│     ├── /fr/perroquet-gris-du-gabon/ ──→ /fr/acheter-gris-du-gabon/
│     └── [...all species commercial pages]
│
├── /fr/connaissances/ (knowledge hub)
│     ├── /fr/connaissances/alimentation/ ──→ /fr/nourriture-pour-perroquets/
│     ├── /fr/connaissances/cites/ ──→ /fr/livraison/, /fr/garantie-sante/
│     └── [...all connaissances pages]
│
├── /fr/blog/
│     └── [...11 articles — need cross-links between them]
│
├── /fr/villes/ [CREATE HUB]
│     └── /fr/perroquets-a-vendre-{city}/ (50 pages) → /fr/livraison/
│
├── /fr/especies/ (species guide hub)
│     └── [...21 species guides] ──→ species commercial pages
│
└── /fr/galerie/ ──→ /fr/perroquets-disponibles/
```

---

## PAGES IDENTIFIED AS NEEDING MORE INBOUND LINKS

Ranked by commercial importance vs current inbound link deficit:

| Page | Commercial Importance | Current Inbound Links (est.) | Required Sources |
|------|-----------------------|------------------------------|-----------------|
| /fr/perroquets-disponibles/ | 🔴 Critical | ~3-4 (nav + homepage) | All species pages, knowledge hub, gallery |
| /fr/eleveur-perroquets/ | 🔴 Critical | ~2 (nav) | Homepage, connaissances, blog articles |
| /fr/garantie-sante/ | 🟠 High | ~2 (nav) | All commercial pages, connaissances/sante |
| /fr/livraison/ | 🟠 High | ~2 (nav) | City pages, species commercial pages |
| /fr/prix-ara-hyacinthe/ | 🟠 High | ~1-2 | /fr/ara-hyacinthe/, blog posts about prices |
| /fr/prix-cacatoes/ | 🟠 High | ~1-2 | Cacatoès species pages, connaissances/prix |
| /fr/processus-adoption/ | 🟡 Medium | ~2 | /fr/adopter-perroquet/, connaissances/adoption |
| /fr/toucans/ | 🟡 Medium | ~1 (nav only) | Homepage, nos-installations, galerie/toucans |
