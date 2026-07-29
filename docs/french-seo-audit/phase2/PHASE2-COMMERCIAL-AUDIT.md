# PHASE2-COMMERCIAL-AUDIT.md
## Paraíso de Aves — French Section Commercial Audit
**Date:** 2026-07-29 | **Role:** Enterprise French SEO Strategist  
**Scope:** All 33+ commercial pages under `/fr/`

---

## EXECUTIVE SUMMARY

The French section contains a structurally sound foundation (50 city pages, 26 species guides, 9 knowledge sub-pages, 11 blog posts) but its commercial architecture has five critical weaknesses: **duplicate intent across 4 buying pages**, **zero schema on all direct-purchase pages**, **no buying pages for 9 of 14 species**, **no price pages for the 3 highest-search species**, and **an internal link structure that is identical on every page regardless of context**. The French section currently captures city-level and species-information traffic but consistently fails to convert it — there is no funnel from awareness to purchase for most entry points.

---

## PART 1 — COMMERCIAL PAGE INVENTORY

### 1A. Buying Intent Pages

| URL | Title / H1 | Target Keyword | Schema | CTA | Conversion Strength | Issues |
|-----|-----------|----------------|--------|-----|--------------------|----|
| `/fr/acheter-perroquet/` | Acheter un Perroquet | acheter perroquet | ❌ None | "Demander un devis" | 🟡 Medium | Duplicate intent with /adopter/ /vente-oiseaux/ /perroquets/ |
| `/fr/acheter-ara/` | Acheter un Ara | acheter ara | ❌ None | "Demander un devis" | 🟡 Medium | No species differentiation within page |
| `/fr/acheter-gris-du-gabon/` | Acheter un Gris du Gabon | acheter gris du gabon | ❌ None | "Demander un devis" | 🟡 Medium | Overlaps with /perroquet-gris-du-gabon/ species page |
| `/fr/adopter-perroquet/` | Adopter un Perroquet | adopter perroquet | ❌ None | "Demander un devis" | 🟡 Medium | Near-duplicate of /acheter-perroquet/ — same template |
| `/fr/perroquets/` | Perroquets | perroquets | ❌ None | Unknown | 🔴 Weak | Vague title, unclear positioning, overlaps main hub |
| `/fr/vente-oiseaux/` | Vente d'Oiseaux | vente oiseaux | ❌ None | Unknown | 🔴 Weak | Broad + cannibalises /acheter-perroquet/ |
| `/fr/perroquets-disponibles/` | Perroquets Disponibles | oiseaux disponibles | Present | "Voir les disponibles" | 🟢 Strong | Only active-inventory page — needs more frequent updates |

### 1B. Trust & Process Pages

| URL | Title / H1 | Schema | Issues |
|-----|-----------|--------|--------|
| `/fr/eleveur-perroquets/` | Éleveur de Perroquets | ❌ None | No schema; template identical to buying pages |
| `/fr/perroquets-eleves-a-la-main/` | Perroquets Élevés à la Main | ❌ None | Strong differentiator with no schema or structured proof |
| `/fr/garantie-sante/` | Garantie Santé | Unknown | Key trust page — needs Service schema |
| `/fr/processus-adoption/` | Processus d'Adoption | Unknown | Journey page missing FAQ schema |
| `/fr/livraison/` | Livraison | Unknown | Delivery page — needs FAQPage + DeliveryTimeSettings |
| `/fr/nos-installations/` | Nos Installations | WebPage | Gallery-like trust page — needs ImageGallery schema |
| `/fr/a-propos/` | À Propos de Paraíso de Aves | ❌ None | Meta description = title (duplicate). No CTA. No schema. |

### 1C. Price Pages

| URL | Target Keyword | Schema | Gap |
|-----|---------------|--------|-----|
| `/fr/prix-ara-hyacinthe/` | prix ara hyacinthe | Unknown | Exists but isolated — not in main nav |
| `/fr/prix-cacatoes/` | prix cacatoès | Unknown | Exists — missing for all other species |
| **MISSING** | prix gris du gabon | — | **Highest-search price query in FR section** |
| **MISSING** | prix ara | — | Generic ara price cluster |
| **MISSING** | prix amazone | — | Medium-volume cluster |
| **MISSING** | prix conure | — | Medium-volume cluster |
| **MISSING** | prix éclectus | — | Medium-volume cluster |

### 1D. Species Commercial Pages (Root-Level Duplicates)

These root-level species pages (`/fr/{species}/`) co-exist with comprehensive guides at `/fr/especies/{species}/`. This creates **duplicate content risk**:

| Root URL | /especies/ equivalent | Risk |
|----------|----------------------|------|
| `/fr/perroquet-gris-du-gabon/` | `/fr/especies/perroquet-gris-du-gabon/` | 🔴 High — both indexed |
| `/fr/ara-hyacinthe/` | `/fr/especies/ara-hyacinthe/` | 🔴 High |
| `/fr/ara-bleu-et-jaune/` | `/fr/especies/ara-bleu-et-jaune/` | 🔴 High |
| `/fr/ara-macao/` | `/fr/especies/ara-macao/` | 🟠 Medium |
| `/fr/cacatoes-huppe-jaune/` | `/fr/especies/cacatoes-huppe-jaune/` | 🟠 Medium |
| `/fr/cacatoes-rosalbin/` | `/fr/especies/cacatoes-rosalbin/` | 🟠 Medium |
| `/fr/amazone-front-bleu/` | `/fr/especies/amazone-front-bleu/` | 🟠 Medium |
| `/fr/eclectus/` | `/fr/especies/eclectus/` | 🟠 Medium |

**Recommended resolution:** Convert root-level species pages to commercial buying pages (e.g., `/fr/acheter-ara-hyacinthe/` pattern) or differentiate them clearly as "buying" vs "guide" content. Do not simply redirect — the root-level pages have existing link equity.

### 1E. Accessory / Care Pages

| URL | Robots | Commercial Value | Issue |
|-----|--------|-----------------|-------|
| `/fr/cages-pour-perroquets/` | **noindex** | 🟡 Medium | Noindex is wasteful — these pages build trust and cross-sell |
| `/fr/nourriture-pour-perroquets/` | index | 🟡 Medium | Good supporting content; weak schema |
| `/fr/jouets-naturels-pour-perroquets/` | index | 🟡 Low | Care guide, not commercial — needs CTA upgrade |
| `/fr/caisses-de-transport/` | **noindex** | 🟡 Low | Delivery trust signal — should be indexed |

---

## PART 2 — KEY FINDINGS

### 🔴 CRITICAL: Keyword Cannibalisation — 4 Pages, Same Intent

The following four pages all target the same primary user intent ("I want to buy a parrot in France from a reputable breeder"):

- `/fr/acheter-perroquet/` — "Acheter un Perroquet"
- `/fr/adopter-perroquet/` — "Adopter un Perroquet"
- `/fr/perroquets/` — "Perroquets"
- `/fr/vente-oiseaux/` — "Vente d'Oiseaux"

All four use near-identical templates with the same 7-link footer species grid and the same "Demander un devis" CTA. Google cannot determine which page should rank for "acheter perroquet France". **These pages are actively suppressing each other.**

**Recommended action:** Differentiate by angle. Keep `/fr/acheter-perroquet/` as the master commercial hub. Convert `/fr/adopter-perroquet/` to a softer intent page (rescue/responsible ownership). Clarify `/fr/vente-oiseaux/` as a species-by-species index. Redirect or repurpose `/fr/perroquets/`.

---

### 🔴 CRITICAL: Zero Schema on All Direct-Purchase Pages

The 4 primary buying pages (`/fr/acheter-perroquet/`, `/fr/acheter-ara/`, `/fr/acheter-gris-du-gabon/`, `/fr/adopter-perroquet/`) and trust pages (`/fr/eleveur-perroquets/`, `/fr/perroquets-eleves-a-la-main/`) all return `schemas: [null]` — meaning the JSON-LD block exists but either fails to parse or uses an unsupported type.

These pages have no structured data eligible for rich results. Competitors with `Product`, `Service`, or `FAQPage` schema on identical keywords have a significant SERP real estate advantage.

---

### 🔴 CRITICAL: Missing Buying Pages for 9 of 14 Species

Buying intent pages exist only for: Ara (generic), Gris du Gabon.  
**No buying pages exist for:** Cacatoès, Amazone, Éclectus, Conure, Pionus, Ara Macao, Ara Bleu et Jaune, Ara Catalina, Perruche.

---

### 🟠 HIGH: Identical Internal Link Template on Every Page

Every commercial page links to the same 7 species pages regardless of topic. A visitor on `/fr/perroquets-eleves-a-la-main/` should be linked to `/fr/bebe-perroquet-a-vendre/` (when built) and `/fr/processus-adoption/`, not to a generic species list. The current template creates no topical signals for Google and fails the user journey.

---

### 🟠 HIGH: No Buyer-Journey Segmentation Pages

French buyers segment by **lifestyle need**, not species. Current pages address species (what) but not buyer situations (who). High-volume French queries with no matching page:
- "perroquet pour débutant"
- "perroquet appartement"
- "perroquet enfants"
- "perroquet parleur"
- "perroquet silencieux"
- "perroquet pas cher"
- "bébé perroquet à vendre"

---

### 🟠 HIGH: /fr/a-propos/ and /fr/faq/ are Skeleton Pages

- `/fr/a-propos/`: meta description is literally the page title. No schema. No CTA. No proof elements.
- `/fr/faq/`: meta description is literally the page title. No schema. No FAQPage markup.

Both are linked from the footer of every page — they are receiving PageRank and sending no topical signals.

---

### 🟡 MEDIUM: Two Noindex Pages Receiving Internal Links

`/fr/cages-pour-perroquets/` and `/fr/caisses-de-transport/` are set to `noindex` but are linked from multiple pages, wasting crawl budget and preventing them from building topic authority. Either index them or remove the links.

---

### 🟡 MEDIUM: Price Pages Exist but are Isolated

`/fr/prix-ara-hyacinthe/` and `/fr/prix-cacatoes/` exist but are not in the main navigation. A French buyer searching "prix ara hyacinthe" can find these pages, but cannot continue the journey to an inquiry CTA without bouncing.

---

## PART 3 — OPPORTUNITY MATRIX

| Opportunity | Difficulty | Commercial Impact | Priority |
|------------|-----------|------------------|----------|
| Create buyer-segment pages (parleur, débutant, appartement, famille) | 🟡 Medium | 🔴 Very High | **CRITICAL** |
| Fix schema on all 7 buying/trust pages | 🟢 Low | 🔴 High | **CRITICAL** |
| Create species buying pages (cacatoès, amazone, conure, éclectus) | 🟡 Medium | 🔴 High | **CRITICAL** |
| Create price pages (gris du gabon, ara, amazone) | 🟢 Low | 🟠 High | **HIGH** |
| Differentiate cannibalising buying pages | 🟡 Medium | 🟠 High | **HIGH** |
| Create bébé perroquet / jeune oiseau page | 🟡 Medium | 🔴 High | **HIGH** |
| Fix /fr/a-propos/ and /fr/faq/ | 🟢 Low | 🟡 Medium | **MEDIUM** |
| Index /fr/cages-pour-perroquets/ | 🟢 Low | 🟡 Medium | **MEDIUM** |
| Topical internal linking (per-page) | 🟡 Medium | 🟠 High | **HIGH** |
| Add isPartOf / hasPart schema chain | 🟢 Low | 🟡 Low | **LOW** |
