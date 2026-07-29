# Authority Growth Roadmap — Paraíso de Aves FR

**Date:** 2026-07-29  
**Goal:** Topical Authority Score 10/10 across all 11 domains  
**Prioritised by:** Revenue impact · Traffic volume · Trust/E-E-A-T · Internal link value  
**Constraint:** Do not create content yet — this is the blueprint only

---

## ROADMAP PHILOSOPHY

Authority is not built by publishing more pages. It is built by systematically eliminating every gap that prevents Google from treating this site as the complete answer to a domain. The order of operations matters as much as the content itself:

1. **Fix commercial intent first** — highest revenue per page built
2. **Fix trust signals** — unlocks all future ranking potential via E-E-A-T
3. **Fill high-volume informational gaps** — signals topical completeness
4. **Build semantic depth** — connects entities to Knowledge Graph
5. **Build authority signals** — backlinks, citations, GBP, media

---

## PHASE 1 — COMMERCIAL FOUNDATION (Weeks 1–4)
*Priority: Revenue. Highest ROI per page.*

### 1.1 Build 7 missing price pages
**Impact score:** 10/10  
**Revenue impact:** Direct — these pages capture "prix [species] france" queries from buyers ready to purchase.

| Page | Template | Effort |
|------|---------|--------|
| /fr/prix-amazone/ | Copy /fr/prix-perroquet-gris-du-gabon/ structure | 3h |
| /fr/prix-ara-bleu-jaune/ | Same template | 3h |
| /fr/prix-ara-macao/ | Same template | 3h |
| /fr/prix-eclectus/ | Same template | 3h |
| /fr/prix-perroquet-senegal/ | Same template | 3h |
| /fr/prix-perruche-a-collier/ | Same template | 2h |
| /fr/prix-pionus/ | Same template | 2h |

**Schema required:** WebPage (nested Product + Offer) + BreadcrumbList + FAQPage  
**Internal links:** Each price page → Tier 1 species page + /fr/guide-prix-perroquets/ (to build) + /fr/acheter-perroquet/ + /fr/perroquets-disponibles/

### 1.2 Build price hub page
**Page:** /fr/guide-prix-perroquets/  
**Impact:** Aggregates all 10 price pages under one hub that captures "combien coûte un perroquet" (2,400/mo)

### 1.3 Add `ItemList` schema to /fr/perroquets-disponibles/
**Impact:** Enables product listing rich results — highest schema ROI on the site  
**Effort:** 30 minutes

### 1.4 Build /fr/choisir-son-perroquet/ buyer hub
**Impact:** Aggregates the 6-page buyer profile cluster under one hub  
**Captures:** "choisir son perroquet" (1,800/mo)

---

## PHASE 2 — TRUST & E-E-A-T (Weeks 3–6)
*Priority: Trust. Unlocks all subsequent ranking potential.*

### 2.1 Legal pages (REQUIRED — French law)
Build immediately — French e-commerce law requires these:
- /fr/mentions-legales/
- /fr/politique-de-confidentialite/
- /fr/conditions-generales-de-vente/

### 2.2 Named breeder page with biography
**Page:** Expand /fr/eleveur-perroquets/ with named individual, photo, founding date, key credentials  
**E-E-A-T impact:** Converts anonymous brand → named expert. Google Quality Guidelines specifically reward this.

### 2.3 Author attribution across all pages
**Action:** Add "Rédigé par [Nom], éleveur depuis [année]" + date-stamp to all 157 pages  
**Effort:** CSS/template change — add author meta to page footer pattern

### 2.4 External citations on species pages
**Action:** Add 2–3 external links per species Tier 1 page to: CITES.org species database, Wikipedia FR species page (sameAs), one ornithological reference  
**E-E-A-T impact:** Signals that content connects to external knowledge graph

### 2.5 Google Business Profile
**Action:** Create and verify GBP listing — "Paraíso de Aves — Éleveur de perroquets" — service area: France  
**Impact:** Creates a Knowledge Graph entity anchor for the business

### 2.6 /fr/arnaques-vente-perroquet/ trust page
**Impact:** Captures "arnaque perroquet" queries; positions site as the trustworthy alternative to illegal sellers

---

## PHASE 3 — SPECIES AUTHORITY COMPLETION (Weeks 4–8)
*Priority: Entity completeness. Signals species knowledge graph ownership.*

### 3.1 Build 5 genus hub pages
Order: Aras → Amazones → Cacatoès → Conures → Caïques  
Each page: `CollectionPage` + `ItemList` schema linking all genus species

### 3.2 Add `Taxon` entity to all 36 species pages
**Action:** Add `"about": {"@type": "Thing", "sameAs": ["wikipedia FR URL", "wikidata URL"]}` to WebPage schema on every species page  
**Impact:** Anchors species entities to Google's Knowledge Graph — enables entity-based ranking

### 3.3 Build 5 species comparison pages
Order: Gris vs Amazone → Ara vs Cacatoès → Conure vs Perruche → Quel Ara choisir → Sénégal vs Caïque  
**These capture high-intent buyer decision queries with almost no competition**

### 3.4 Add `sameAs` cross-links between Tier 1 and Tier 2 species pages
**Action:** Each Tier 1 page prominently links to its Tier 2 deep guide and vice versa  
**Message to Google:** These are two facets of the same entity (commercial + informational)

---

## PHASE 4 — BEHAVIOUR CLUSTER (Weeks 6–10)
*Priority: Volume + authority. Behaviour is the highest-volume uncovered domain.*

### 4.1 Build /fr/comportement-perroquet/ pillar
**Pillar page:** hub for all 20 behaviour articles  
**Captures:** "comportement perroquet" (2,400/mo)

### 4.2 Build the 5 highest-volume behaviour articles first
1. /fr/perroquet-qui-mord/ — 1,800/mo
2. /fr/picage-perroquet/ — 1,200/mo
3. /fr/perroquet-qui-crie/ — 1,400/mo
4. /fr/langage-corporel-perroquet/ — 900/mo
5. /fr/perroquet-agressif/ — 900/mo

### 4.3 Build remaining 15 behaviour articles
Completing the cluster to 20 articles ensures Google treats this as authoritative on the full behaviour domain.

### 4.4 Connect /fr/connaissances/comportement/ to the new cluster
**Action:** Add 5 prominent outbound links from the existing knowledge-base behaviour page to the new cluster hub and top 4 articles.

---

## PHASE 5 — HEALTH CLUSTER (Weeks 8–12)
*Priority: Trust + E-E-A-T. Health content is YMYL-adjacent — high scrutiny, high reward.*

### 5.1 Build /fr/sante-perroquet/ pillar
**Captures:** "santé perroquet" (broad, high volume)

### 5.2 Build highest-urgency health articles first
1. /fr/perroquet-malade-symptomes/ — problem query, high volume
2. /fr/psittacose-perroquet/ — public health relevance — E-E-A-T gold
3. /fr/urgence-perroquet/ — emergency queries, high trust value
4. /fr/veterinaire-nac-trouver/ — commercial (vet referral = trust signal)
5. /fr/maladies-courantes-perroquet/ — overview page

**All health pages must include:**
- "Cet article ne remplace pas un avis vétérinaire" disclaimer
- Link to SNVEL (Syndicat National des Vétérinaires d'Exercice Libéral)
- Named authorship attribution

### 5.3 Build remaining 13 health articles
### 5.4 Cross-link health cluster ↔ species pages
Each species page should link to its relevant health article (e.g., Gris du Gabon → /fr/picage-perroquet/ — feather plucking is common in this species)

---

## PHASE 6 — NUTRITION CLUSTER (Weeks 10–14)

### 6.1 Build /fr/alimentation-perroquet/ pillar (or expand /fr/nourriture-pour-perroquets/)
**Captures:** "alimentation perroquet" (3,600/mo)

### 6.2 Highest-volume nutrition articles first
1. /fr/aliments-interdits-perroquet/ — 2,400/mo, safety query
2. /fr/fruits-legumes-perroquet/ — 1,800/mo
3. /fr/granules-perroquet-guide/ — commercial intent
4. /fr/alimentation-gris-du-gabon/ — species-specific
5. /fr/graines-perroquet-avantages-risques/ — debate query

### 6.3 Build remaining 10 nutrition articles
### 6.4 Cross-link nutrition → product page
All nutrition articles link to /fr/nourriture-pour-perroquets/ product page.

---

## PHASE 7 — TRAINING CLUSTER (Weeks 12–16)

### 7.1 Build /fr/dresser-perroquet/ pillar
**Captures:** "dresser un perroquet" (2,400/mo) + "apprivoiser un perroquet" (3,600/mo)

### 7.2 Build 4 new training articles
1. /fr/apprivoiser-perroquet/
2. /fr/perroquet-monter-doigt/
3. /fr/clicker-training-perroquet/
4. /fr/renforcement-positif-perroquet/

### 7.3 Connect existing talking cluster to training pillar
**Action:** Add prominent cross-links from all 11 talking cluster pages to /fr/dresser-perroquet/  
This makes the talking cluster a sub-cluster of the broader training authority.

---

## PHASE 8 — CITES CLUSTER (Weeks 12–16)

### 8.1 Expand /fr/connaissances/cites/ into a full pillar
**Strategic note:** Zero strong FR competitors cover CITES in depth. First-mover advantage available.

### 8.2 Build 10 CITES articles
**Highest impact first:**
1. /fr/acheter-perroquet-sans-cites-risques/ — anti-illegal-trade, trust builder
2. /fr/bague-perroquet-obligatoire/ — legal compliance query
3. /fr/cites-annexe-i-vs-ii/ — educational; differentiates species
4. /fr/importer-perroquet-france/ — commercial query from abroad
5. /fr/documents-voyage-perroquet/ — lifestyle utility

---

## PHASE 9 — HOUSING CLUSTER (Weeks 16–20)

### 9.1 Build /fr/logement-perroquet/ pillar
**Captures:** "cage perroquet" (4,800/mo — highest housing query)

### 9.2 Build 12 housing articles
**Priority:** Cage sizing + cage selection articles first (highest product bridge value)

---

## PHASE 10 — GEOGRAPHIC EXPANSION (Weeks 16–22)

### 10.1 Build 4 regional hub pages
Île-de-France, Occitanie, PACA, Bretagne  
Each aggregates its city pages and passes authority down

### 10.2 Add cross-city linking to all 50 city pages
Connect each city to 3 nearby cities + regional hub

### 10.3 Individual bird pages
Most complex — requires coordination between availability system and page generation  
But highest conversion rate pages possible once live

---

## PHASE 11 — DELIVERY & BREEDING CLUSTERS (Weeks 20–26)

### 11.1 Delivery cluster (8 articles)
Build supporting articles around /fr/livraison/

### 11.2 Breeding education cluster (10 articles)
Build supporting articles around /fr/eleveur-perroquets/

---

## PHASE 12 — AUTHORITY BUILDING (Ongoing)

### 12.1 Backlink acquisition
**Priority targets:**
- French NAC veterinary associations
- Ornithological societies (SOF — Société Ornithologique de France)
- French bird forums (perruches-et-perroquets.fr, etc.)
- Wamiz.com editorial mention
- Wikipedia FR species articles (external link citations)

### 12.2 Video content
- Facility tour video (E-E-A-T signal)
- Hand-raising process video (expertise signal)
- Species introduction video (engagement signal)

### 12.3 Blog editorial calendar
**Target:** 2 blog posts per month, each supporting an active cluster  
All blog posts must be bidirectionally linked to cluster pages

---

## TIMELINE SUMMARY

| Phase | Weeks | Focus | New pages | Authority gain |
|-------|-------|-------|-----------|---------------|
| 1 | 1–4 | Commercial foundation | 9 | Revenue ⬆⬆⬆⬆⬆ |
| 2 | 3–6 | Trust + E-E-A-T | 4 | Trust ⬆⬆⬆⬆⬆ |
| 3 | 4–8 | Species completion | 12 | Entity ⬆⬆⬆⬆ |
| 4 | 6–10 | Behaviour cluster | 21 | Volume ⬆⬆⬆⬆ |
| 5 | 8–12 | Health cluster | 18 | Trust ⬆⬆⬆⬆ |
| 6 | 10–14 | Nutrition cluster | 15 | Volume ⬆⬆⬆ |
| 7 | 12–16 | Training completion | 5 | Volume ⬆⬆⬆ |
| 8 | 12–16 | CITES cluster | 10 | Trust ⬆⬆⬆⬆ |
| 9 | 16–20 | Housing cluster | 12 | Volume ⬆⬆ |
| 10 | 16–22 | Geographic expansion | 4+linking | Local ⬆⬆⬆⬆ |
| 11 | 20–26 | Delivery + Breeding | 18 | Depth ⬆⬆ |
| 12 | Ongoing | Authority building | 0 | Authority ⬆⬆⬆⬆⬆ |
| **TOTAL** | **26 wks** | | **~128 new pages** | |
