# LINK-EQUITY-MAP.md
## Paraíso de Aves — French Section Internal PageRank Flow
**Date:** 2026-07-29 | Task 4: Link Equity Analysis

> No pages modified. Planning document only.

---

## METHODOLOGY

PageRank flow is estimated from: (1) inbound link count per page from other FR pages, (2) position in navigation, (3) presence/absence in footer, (4) species guide body links audit. All analysis is based on HTML inspection of the live codebase.

---

## CURRENT LINK EQUITY STRUCTURE

### Tier 0 — Highest equity received (linked from all pages via nav/footer)

These pages receive a link from **every page on the FR section** via the shared navigation or footer:

| Page | Link source | Equity level | Is it the right page to concentrate equity? |
|------|------------|-------------|---------------------------------------------|
| `/fr/` (homepage) | Shared nav — "Accueil" | 🔴 Very High | ✅ Yes |
| `/fr/perroquets-disponibles/` | Shared nav — "Adoption" | 🔴 Very High | ✅ Yes — this is the transaction endpoint |
| `/fr/blog/` | Shared nav | 🟠 High | 🟡 Partial — blog receives equity but doesn't convert |
| `/fr/contact/` | Shared nav | 🟠 High | ✅ Yes — conversion endpoint |
| `/fr/nourriture-pour-perroquets/` | Shared nav (Soins) | 🟠 High | ❌ No — care page receiving sitewide equity that should go to buying pages |
| `/fr/jouets-naturels-pour-perroquets/` | Shared nav (Soins) | 🟠 High | ❌ No — same problem |
| `/fr/garantie-sante/` | Shared nav (Soins) | 🟡 Medium-High | ✅ Yes — trust page |
| `/fr/processus-adoption/` | Shared nav (Soins) | 🟡 Medium-High | ✅ Yes — trust page |
| `/fr/cages-pour-perroquets/` | Shared nav (Soins) | 🟡 Medium | ❌ **NOINDEX** — receiving sitewide equity, passing none |
| `/fr/caisses-de-transport/` | Shared nav (Soins) | 🟡 Medium | ❌ **NOINDEX** — equity sink |
| `/fr/connaissances/` | Shared footer | 🟡 Medium | ✅ Yes |

### Tier 1 — High equity (linked from species guides + nav)

| Page | Approx. inbound links | Equity level | Issue |
|------|-----------------------|-------------|-------|
| `/fr/adopter-perroquet/` | ~18 species guides + nav | 🔴 Very High | ❌ **Wrong page to concentrate buying equity** — this is the softer-intent page |
| `/fr/eleveur-perroquets/` | ~15 species guides | 🟠 High | ✅ Good — trust page receiving trust traffic |
| `/fr/perroquets-disponibles/` | ~15 species guides + nav | 🔴 Very High | ✅ Correct |
| `/fr/contact/` | ~15 species guides + nav | 🟠 High | ✅ Correct |
| `/fr/acheter-perroquet/` | ~5 species guides | 🟡 Medium | ❌ Should be the highest-equity buying page — currently under-linked |

### Tier 2 — Medium equity (linked from some pages)

| Page | Approx. inbound links | Issue |
|------|-----------------------|-------|
| `/fr/acheter-perroquet/` | ~5 | 🔴 Under-linked for the master commercial hub |
| `/fr/acheter-gris-du-gabon/` | ~0 from species guides | 🔴 Zero links from species guide — isolated |
| `/fr/acheter-ara/` | ~0 from species guides | 🔴 Isolated |
| `/fr/perroquets/` | ~2 | 🟡 Underlinked |
| `/fr/vente-oiseaux/` | ~0 from content | 🔴 Essentially isolated |
| `/fr/prix-ara-hyacinthe/` | ~1 | 🔴 Price page isolated |
| `/fr/prix-cacatoes/` | ~1 | 🔴 Price page isolated |

### Tier 3 — Low equity (linked from few or no pages)

| Page | Issue |
|------|-------|
| `/fr/adopter-perroquet/` | Incorrectly HIGH equity — should be medium |
| `/fr/eleveur-perroquets/` | Not linked from buying pages (should be) |
| `/fr/nos-installations/` | Mostly isolated |
| `/fr/a-propos/` | Footer only; sends no equity into funnel |
| `/fr/faq/` | Footer only; dead end |
| All 50 city pages | Each isolated — they receive very few internal links |

---

## CURRENT STRUCTURE (visualised)

```
SITEWIDE NAV/FOOTER → [perroquets-disponibles] ← ★★★★★ HIGH EQUITY
                    → [contact]                ← ★★★★  
                    → [nourriture]             ← ★★★  ← WRONG — care page, not commercial
                    → [jouets]                 ← ★★★  ← WRONG — care page, not commercial
                    → [cages]  (NOINDEX)        ← ★★   ← EQUITY SINK
                    → [caisses](NOINDEX)        ← ★★   ← EQUITY SINK

SPECIES GUIDES (26) → [adopter-perroquet]      ← ★★★★ HIGH — WRONG PAGE
                    → [eleveur-perroquets]      ← ★★★
                    → [perroquets-disponibles]  ← ★★★
                    → [contact]                 ← ★★★
                    → [acheter-perroquet]       ← ★★   ← SHOULD BE ★★★★★

CITY PAGES (50)    → [connaissances/cites]      ← ★★★  ← Odd — legal knowledge, not buying
                    → [acheter-perroquet]       ← ★★

HOMEPAGE           → [6 species]               ← ★★★ (only 6 of 26 receive HP equity)
                    → [perroquets-disponibles]  ← ★★★★
```

### Key equity mis-allocation

1. **`/fr/adopter-perroquet/` is the most-linked buying page** despite being the softer-intent page. `/fr/acheter-perroquet/` (the master hub) has fewer species-guide inbound links. This is backwards.

2. **`/fr/nourriture-pour-perroquets/` and `/fr/jouets-naturels-pour-perroquets/`** appear in the shared nav (Soins dropdown) and therefore receive sitewide equity — equal to the contact and available-birds pages. These are care/accessory pages, not commercial pages.

3. **`/fr/cages-pour-perroquets/` and `/fr/caisses-de-transport/`** are noindex pages in the sitewide nav. They receive a link from every page but pass no equity forward (noindex pages don't pass PageRank reliably). Pure equity sink.

4. **Price pages are dead ends** — they receive search traffic for price queries but link nowhere commercial. A buyer landing on `/fr/prix-ara-hyacinthe/` has no link to `/fr/acheter-ara/`.

5. **City pages link to `/fr/connaissances/cites/`** (a legal knowledge sub-page) from their body — this sends city page equity deep into the knowledge hierarchy rather than into the commercial funnel.

---

## IDEAL STRUCTURE

```
SITEWIDE NAV/FOOTER (adjusted)
  → [perroquets-disponibles]     ★★★★★ (keep)
  → [contact]                    ★★★★  (keep)
  → [acheter-perroquet]          ★★★★  (ADD to nav or hero — currently footer-only)
  → [garantie-sante]             ★★★   (keep in Soins)
  → [processus-adoption]         ★★★   (keep in Soins)
  → [nourriture]                 ★★    (move to footer only — not nav)
  → [jouets]                     ★★    (move to footer only — not nav)
  ✗ remove [cages] (noindex) from nav
  ✗ remove [caisses] (noindex) from nav

SPECIES GUIDES (26) — AFTER FIX
  → [matching buying page]        ★★★★★ (add — currently missing on all 26)
  → [perroquets-disponibles]      ★★★★  (keep)
  → [acheter-perroquet]           ★★★   (reclassify — now secondary)
  → [eleveur-perroquets]          ★★★   (keep)
  → [contact]                     ★★★   (keep)
  → [segment page]                ★★    (add: parleur/débutant/appartement per species)
  ✗ reduce [adopter-perroquet] to secondary (not primary buying CTA)

CITY PAGES (50) — AFTER FIX
  → [livraison]                   ★★★   (add — currently ZERO city pages link here)
  → [acheter-perroquet]           ★★★   (keep)
  → [segment page by city type]   ★★    (appartement for Paris/Lyon etc.)
  ✗ remove/deprioritise [connaissances/cites] body link — move to "see also"

PRICE PAGES — AFTER FIX
  → [matching buying page]        ★★★★  (add — currently missing)
  → [contact]                     ★★★   (add — currently missing)
  → [perroquets-disponibles]      ★★    (add)
```

---

## WEAK NODES

A weak node is a page that receives adequate inbound equity but fails to pass it forward productively.

| Page | Problem | Fix |
|------|---------|-----|
| `/fr/adopter-perroquet/` | Receives most species-guide equity but sends it only to contact/disponibles — no species or buying differentiation | Add species-matching links to buying pages |
| `/fr/a-propos/` | Footer-linked from all pages (medium equity) — sends only to homepage | Add links to /eleveur-perroquets/, /nos-installations/, /garantie-sante/ |
| `/fr/faq/` | Footer-linked from all pages — sends nowhere | Add links to 6 most relevant buying pages + knowledge |
| `/fr/cages-pour-perroquets/` | Nav-linked from all pages, receives full equity — **noindex**, passes nothing | Either index + commercialise, or remove from nav |
| `/fr/prix-ara-hyacinthe/` | Receives search traffic via keyword, linked from some pages — ends with no buying path | Add buying CTA → /fr/acheter-ara/ |
| `/fr/blog/*` (11 articles) | Receives search traffic, passes equity to species guides — never reaches buying pages | Add buying-page CTAs to all blog articles |

---

## DEAD ENDS

A dead end is a page that has no forward commercial link — it terminates the user journey.

| Page | Dead end type | Severity |
|------|-------------|----------|
| `/fr/especies/perroquet-gris-du-gabon/` | No buying page link despite being the highest-value guide | 🔴 Critical |
| `/fr/especies/ara-hyacinthe/` | No buying, no price link | 🔴 Critical |
| `/fr/especies/ara-bleu-et-jaune/` | Homepage only | 🔴 Critical |
| `/fr/especies/cacatoes-huppe-jaune/` | Homepage only | 🔴 Critical |
| `/fr/especies/amazone-front-bleu/` | Homepage only | 🔴 Critical |
| `/fr/especies/ara-chloroptere/` | Homepage only | 🔴 Critical |
| `/fr/especies/caique-ventre-blanc/` | Homepage only | 🔴 Critical |
| `/fr/especies/grand-alexandre/` | Homepage only | 🔴 Critical |
| `/fr/especies/perruche-royale/` | Homepage only | 🔴 Critical |
| `/fr/prix-ara-hyacinthe/` | No buying CTA | 🟠 High |
| `/fr/prix-cacatoes/` | No buying CTA | 🟠 High |
| `/fr/a-propos/` | No commercial forward link | 🟠 High |
| `/fr/faq/` | No commercial forward link | 🟠 High |
| All 50 city pages | No link to `/fr/livraison/` | 🟠 High |

---

## COMMERCIAL BOTTLENECKS

A bottleneck is a point in the funnel where equity concentrates but conversion is blocked.

### Bottleneck 1 — The species guide layer (26 pages)

**Problem:** 26 species guides collectively receive significant search traffic and internal equity from the homepage, nav, and city pages. Yet ALL of them fail to convert — none link to a matching buying page. Every species researcher who reads a guide hits a wall at `/fr/perroquets-disponibles/` or `/fr/contact/` with no species-specific bridge.

**Fix:** Add a species-specific buying CTA at the 30% scroll point and at the end of every guide. This is the single highest-leverage link equity fix — one template change affecting 26 pages.

---

### Bottleneck 2 — `/fr/adopter-perroquet/` as the de-facto buying hub

**Problem:** Most species guides link to `/fr/adopter-perroquet/` as their primary commercial CTA. This concentrates transactional equity on a page whose keyword is "adopter" (softer intent) rather than "acheter" (transactional). Users arriving from "buying" keywords at species guides are sent to the responsibility/adoption framing page.

**Fix:** Reclassify the primary buying CTA on species guides from `/fr/adopter-perroquet/` to the matching buying page (e.g. `/fr/acheter-gris-du-gabon/`) or, where no species buying page exists yet, to `/fr/acheter-perroquet/`.

---

### Bottleneck 3 — City pages (50) driving no buying funnel traffic

**Problem:** 50 city pages collectively represent a significant portion of the FR section's indexable URLs and receive both organic and internal link traffic. Yet their body links point primarily to `/fr/connaissances/cites/` (legal knowledge) and generic pages. A Paris buyer arriving at `/fr/perroquets-a-vendre-paris/` is sent to a legal information page rather than to `/fr/acheter-perroquet/` or `/fr/livraison/`.

**Fix:** Add one link to `/fr/livraison/` and one contextual link to the most relevant buyer segment page in every city page body. For Paris, Lyon, Marseille → `/fr/perroquet-pour-appartement/`. For smaller cities → `/fr/acheter-perroquet/`.

---

### Bottleneck 4 — Homepage species grid pointing to root-level pages

**Problem:** The FR homepage species grid links to `/fr/perroquet-gris-du-gabon/`, `/fr/ara-bleu-et-jaune/` etc. (root-level commercial species pages) rather than to the comprehensive guides at `/fr/especies/perroquet-gris-du-gabon/`. The root-level pages are shorter, have weaker schema, and don't link onward to buying pages either. Hompage equity is being sent to the weaker version of each species page.

**Fix (longer term):** Either update homepage grid links to point to `/fr/especies/` guides (which then need their buying CTAs added), or ensure root-level species pages have strong buying CTAs and forward links. The former is architecturally cleaner.
