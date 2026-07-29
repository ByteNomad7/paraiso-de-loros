# Entity Gaps Analysis — Paraíso de Aves French Section

**Date:** 2026-07-29  
**Classification:** Missing · Weak · Duplicate · Under-linked · Schema-less

---

## 1. MISSING ENTITIES

### 1.1 Species Price Pages (HIGH IMPACT — Commercial Intent)

Seven species have no price entity page despite being actively sold:

| Species | Search demand | Action |
|---------|--------------|--------|
| Amazone à Front Bleu | High | Create /fr/prix-amazone/ |
| Ara Bleu et Jaune | High | Create /fr/prix-ara-bleu-jaune/ |
| Ara Macao | Medium | Create /fr/prix-ara-macao/ |
| Éclectus | Medium | Create /fr/prix-eclectus/ |
| Pionus | Low | Create /fr/prix-pionus/ |
| Perroquet du Sénégal | Medium | Create /fr/prix-perroquet-senegal/ |
| Perruche à Collier | Medium | Create /fr/prix-perruche-a-collier/ |

Without price pages, Google has no entity to serve for "[species] prix france" queries, and competitors fill that gap.

### 1.2 Genus-Level Collection Pages (MEDIUM IMPACT)

The site has individual species pages but no genus-level aggregation:

| Missing Entity | Description | Queries captured |
|---------------|-------------|-----------------|
| /fr/aras/ | All ara species collection | "ara perroquet", "types d'ara" |
| /fr/amazones/ | All amazone species | "amazone perroquet", "types amazone" |
| /fr/cacatoes/ | All cacatoès species | "cacatoès espèces", "types cacatoès" |
| /fr/conures/ | All conure species | "conure perroquet", "types de conures" |
| /fr/caiques/ | All caïque species | "caïque perroquet" |

These pages would use `CollectionPage` + `ItemList` schema and serve as semantic hubs connecting species to the genus entity.

### 1.3 Individual Bird Profile Pages (HIGH IMPACT — Commercial Intent)

Currently zero individual bird pages exist. Every available bird is listed only on `/fr/perroquets-disponibles/` with no unique URL, no `Product` schema, and no indexable entity.

Each available bird should have:
- Unique URL: `/fr/perroquets-disponibles/[species]-[sex]-[ref]/`
- `Product` schema with `Offer`
- Species back-link
- Gallery images with `ImageObject`

This creates **low-competition, high-conversion** landing pages for individual bird searches.

### 1.4 DNA Sex / Colour Entity Pages (MEDIUM IMPACT)

Buyers frequently search by sex and colour:
- "perroquet gris du gabon femelle"
- "amazone vert achetez"
- "perroquet sexé ADN"

Missing entities:
- /fr/perroquets-males-femelles/ — gender sexing explanation
- /fr/perroquet-sexe-adn/ — DNA sexing as service/trust page
- No colour-based faceting exists anywhere

### 1.5 Behaviour / Care Cluster (MEDIUM IMPACT)

`/fr/connaissances/comportement/` exists but has no supporting cluster. Competitors ranking for high-volume care queries:

| Missing entity | Query target |
|---------------|-------------|
| /fr/mordre-perroquet/ | "mon perroquet mord" |
| /fr/perroquet-arracher-plumes/ | "perroquet se gratte plumes" |
| /fr/perroquet-stresse/ | "perroquet stressé comportement" |
| /fr/jeux-enrichissement-perroquet/ | "enrichissement mental perroquet" |
| /fr/duree-vie-perroquet/ | "combien vit un perroquet" — partially in blog |

### 1.6 Buying Guide Hub (LOW IMPACT — already partial)

A single hub page `/fr/quel-perroquet-choisir/` or `/fr/guide-achat-perroquet/` collecting all buyer-profile guides in one `CollectionPage` with `ItemList` — currently missing.

### 1.7 Region-Level Geographic Pages (MEDIUM IMPACT)

50 city pages exist but no region-level pages:
- /fr/perroquets-ile-de-france/
- /fr/perroquets-bretagne/
- /fr/perroquets-occitanie/
- /fr/perroquets-paca/

Region pages would cluster city pages and capture "perroquets à vendre [région]" queries.

---

## 2. WEAK ENTITIES

### 2.1 /fr/connaissances/comportement/ — Isolated

**Problem:** This section covers parrot behaviour but has no internal links to the talking cluster (11 pages) or the training guide. It references behaviour in isolation without connecting to the commercial funnel.

**Fix:** Add prominent links to `/fr/perroquet-qui-parle/`, `/fr/comment-apprendre-a-un-perroquet-a-parler/`, and the buyer profile guides.

### 2.2 /fr/toucans/ — Orphan Entity

**Problem:** The toucan page has no supporting content, no cluster, and no species sub-pages. It receives almost no internal links from the rest of the site.

**Decision required:** Either build out the toucan entity (3–5 supporting pages) or add a canonical redirect to a species hub and deprioritise the entity.

### 2.3 /fr/faq/ — Standalone with no entity linkage

**Problem:** The main FAQ page exists but isn't formally connected to the FAQPage schemas on individual species pages via `sameAs` or `mentions`. FAQ items here overlap with FAQ items on species pages, creating duplicate entity coverage.

**Fix:** Make /fr/faq/ a `CollectionPage` pointing to domain-specific FAQ entities on each relevant page.

### 2.4 /fr/cages-pour-perroquets/ + /fr/jouets-naturels-pour-perroquets/ + /fr/nourriture-pour-perroquets/

**Problem:** These three accessory pages exist but have no `Product` schema, no `ItemList`, and no links from the buyer funnel pages. They are near-orphans receiving links only from the nav.

**Fix:** Add `Product` or `ItemList` schema; build content clusters around each (e.g., /fr/quelle-cage-pour-quel-perroquet/ → /fr/cages-pour-perroquets/).

### 2.5 Blog → Species bidirectional linking

**Problem:** 12 blog posts exist. Most link TO species pages but species pages rarely link BACK to relevant blog posts. This weakens the authority signal flow from the deep content to the commercial pages.

**Fix:** Each tier 1 species page should have a "Sur le blog" section linking to its relevant articles.

### 2.6 City Pages — No Cross-Region Linking

**Problem:** 50 city pages are complete islands. They do not link to each other, to a regional hub, or to each other by proximity. This limits their collective authority.

**Fix:** Add "Villes proches" section on each city page linking to 3–4 nearby cities + a regional hub page (when created).

---

## 3. DUPLICATE ENTITIES

### 3.1 Blog vs Guide Page Overlap

| Blog page | Overlapping guide | Recommendation |
|-----------|------------------|----------------|
| /fr/blog/meilleurs-perroquets-debutants/ | /fr/perroquet-pour-debutant/ | 301 blog → guide (guide is more complete) |
| /fr/blog/prix-perroquet-france/ | /fr/prix-perroquet-gris-du-gabon/ etc | Repurpose blog as price hub linking to species price pages |
| /fr/blog/quel-perroquet-choisir/ | /fr/perroquet-pour-debutant/ + /fr/perroquet-pour-famille/ | Repurpose as buyer quiz or decision tree |

### 3.2 Tier 1 vs Tier 2 Species Duplication

Each of the 10 flagship species has BOTH a `/fr/[species]/` page AND a `/fr/especies/[species]/` page. This creates two entities covering the same species.

**Current state:** Both are indexed, likely cannibalising each other for species-name queries.

**Recommendation:**
- Tier 1 = commercial focus (buy, price, availability, FAQ)
- Tier 2 = taxonomic/informational focus (morphology, habitat, behaviour, care)
- Add explicit `sameAs` linking both pages to the same Wikidata/Wikipedia entity
- Ensure canonicals point to the correct page per intent

### 3.3 /fr/acheter-perroquet/ vs /fr/adopter-perroquet/ vs /fr/vente-oiseaux/

Three pages cover the same acquisition intent with slightly different language. Risk of keyword cannibalisation on "acheter perroquet france".

**Recommendation:** Make one canonical hub (/fr/acheter-perroquet/) and convert the others to redirects, OR differentiate by intent:
- /fr/acheter-perroquet/ = buyer guide (informational)
- /fr/perroquets-disponibles/ = listings (transactional)
- /fr/adopter-perroquet/ + /fr/vente-oiseaux/ = 301 → /fr/acheter-perroquet/

---

## 4. ENTITIES WITH INSUFFICIENT INTERNAL LINKS

| Entity | Inbound links count (est.) | Target minimum | Action |
|--------|--------------------------|----------------|--------|
| /fr/pionus/ | ~3 | 8 | Add to buyer profile pages, connaissances, and new Pionus prix page |
| /fr/cacatoes-rosalbin/ | ~4 | 8 | Add to family/beginner guides |
| /fr/toucans/ | ~2 | 6 | Build toucan cluster or deprioritise |
| /fr/caisses-de-transport/ | ~3 | 6 | Link from livraison, garantie-sante, processus-adoption |
| /fr/nos-installations/ | ~4 | 8 | Link from eleveur-perroquets, a-propos, galerie |
| /fr/eleveur-perroquets/ | ~5 | 10 | Link from all city pages, acheter-perroquet, a-propos |
| Cluster pages (new) | ~5 avg | 10+ | Blog posts should link to cluster pages |

---

## 5. ENTITIES WITHOUT SCHEMA

| Entity / Page | Missing Schema | Impact |
|---------------|---------------|--------|
| /fr/livraison/ | Service | No delivery-service rich result possible |
| /fr/garantie-sante/ | Service + WarrantyPromise | No trust signal in SERP |
| /fr/processus-adoption/ | Service + HowTo | No How-To rich result |
| /fr/eleveur-perroquets/ | Person | E-E-A-T gap — Google can't identify the expert |
| All 50 city pages | Service with areaServed | No local SEO signal |
| /fr/perroquets-disponibles/ | CollectionPage + ItemList | No rich listing result |
| All 10 cluster pages | Article | Content type ambiguity |
| /fr/connaissances/adoption/ | HowTo | Missed How-To SERP feature |
| /fr/blog/guide-cites-france/ | HowTo | Missed How-To SERP feature |
| All tier 1+2 species pages | Taxon (about entity) | Species entity not declared to Knowledge Graph |

---

## 6. PRIORITY GAP MATRIX

| Gap | SEO Impact | Effort | Score |
|-----|-----------|--------|-------|
| 7 missing price pages | ⬆⬆⬆ High | Medium | **P1** |
| ItemList on perroquets-disponibles | ⬆⬆⬆ High | Low | **P1** |
| Service schema on 50 city pages | ⬆⬆⬆ High | Medium | **P1** |
| Individual bird pages | ⬆⬆⬆ High | High | **P1** |
| Taxon/Species schema on all species | ⬆⬆ Medium | Medium | **P2** |
| Genus collection pages (5) | ⬆⬆ Medium | Medium | **P2** |
| HowTo schema on process pages | ⬆⬆ Medium | Low | **P2** |
| Person schema for breeder | ⬆⬆ Medium | Low | **P2** |
| Behaviour cluster (5 pages) | ⬆⬆ Medium | High | **P3** |
| Blog duplicate consolidation | ⬆ Low-Med | Low | **P3** |
| Region hub pages (4) | ⬆⬆ Medium | Medium | **P3** |
| Blog ↔ Species bidirectional links | ⬆ Low | Low | **P4** |
| City cross-linking | ⬆ Low | Medium | **P4** |
| Toucan entity decision | Neutral | Low | **P5** |
