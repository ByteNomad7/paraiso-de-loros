# Semantic SEO Implementation Roadmap — Paraíso de Aves FR

**Date:** 2026-07-29  
**Ranked by:** SEO impact × effort efficiency  
**Scope:** French section only | No production modifications — document only

---

## EXECUTIVE SUMMARY

The French section is a well-structured 157-page site with genuine topical depth in two clusters (Talking Parrots, Buyer Profiles). The principal gaps blocking further organic growth are:

1. **7 missing price pages** — highest commercial intent queries returning 0 coverage
2. **No individual bird pages** — conversion-ready pages don't exist at the individual product level
3. **50 city pages lack Service schema** — local SEO potential largely unrealised
4. **ItemList missing on the availability page** — product-level rich results blocked
5. **Species not declared as Taxon entities** — Google cannot fully resolve species as Knowledge Graph nodes
6. **Breeder/E-E-A-T entity incomplete** — no Person schema; E-E-A-T signals not formalised

Addressing these six issues in order would likely produce the largest measurable ranking improvements in the shortest time.

---

## PHASE A — QUICK WINS (0–2 weeks, no new pages)

### A1 — Add `ItemList` schema to /fr/perroquets-disponibles/
**Impact:** HIGH | **Effort:** 1 hour  
Enables product carousel / listing rich results in Google Search. Highest schema ROI on the site.

```json
// Add to <head> of /fr/perroquets-disponibles/index.html
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Perroquets Disponibles à l'Adoption — Paraíso de Aves",
  "url": "https://www.paraisodeaves.com/fr/perroquets-disponibles/",
  "mainEntity": {
    "@type": "ItemList",
    "name": "Perroquets disponibles",
    "numberOfItems": 10,
    "itemListElement": [
      {
        "@type": "ListItem", "position": 1,
        "item": {
          "@type": "Product",
          "name": "Gris du Gabon élevé à la main",
          "category": "Psittacus erithacus",
          "offers": { "@type": "Offer", "availability": "https://schema.org/InStock", "priceCurrency": "EUR", "priceSpecification": { "@type": "PriceSpecification", "description": "Prix sur demande" } }
        }
      }
    ]
  }
}
```

### A2 — Add `Person` schema to /fr/eleveur-perroquets/
**Impact:** HIGH (E-E-A-T) | **Effort:** 30 min  
Formalises the breeder as an expert entity — directly supports Google's E-E-A-T assessment.

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Paraíso de Aves — Éleveur",
  "jobTitle": "Éleveur de perroquets exotiques",
  "worksFor": { "@id": "https://www.paraisodeaves.com/#org" },
  "knowsAbout": ["Psittacidae", "CITES", "élevage à la main", "Gris du Gabon", "Ara", "Cacatoès"],
  "hasCredential": "Éleveur enregistré CITES — 25 ans d'expérience"
}
```

### A3 — Add `Service` + `areaServed` schema to all 50 city pages
**Impact:** HIGH (local SEO) | **Effort:** 1 generator script (~2h)  
Each city page needs a `Service` block with `areaServed: City`. Run via a Node.js script to inject into all 50 files simultaneously.

### A4 — Add `HowTo` schema to /fr/comment-apprendre-a-un-perroquet-a-parler/
**Impact:** HIGH (featured snippet) | **Effort:** 30 min  
How-to queries are one of the highest-click SERP features. This page is perfectly positioned.

### A5 — Add `HowTo` schema to /fr/processus-adoption/ and /fr/connaissances/adoption/
**Impact:** MEDIUM | **Effort:** 30 min each  
Both pages describe a step-by-step process — `HowTo` schema is the correct type.

### A6 — Add `Service` schema to /fr/livraison/ and /fr/garantie-sante/
**Impact:** MEDIUM | **Effort:** 30 min each  
Formalises delivery and guarantee as services, supporting trust signals in SERP.

### A7 — Link /fr/connaissances/comportement/ → talking cluster (3 edits)
**Impact:** MEDIUM | **Effort:** 20 min  
Three HTML edits to add links from the behaviour knowledge section to the 11-page talking cluster. This stitches together two otherwise disconnected content areas.

### A8 — Add `Article` schema to all 10 talking cluster pages
**Impact:** MEDIUM | **Effort:** 2h (10 page edits)  
Cluster pages are currently `WebPage` + `FAQPage`. Adding `Article` clarifies content type for Google's content classification.

---

## PHASE B — COMMERCIAL PAGES (2–6 weeks, new pages)

### B1 — Build 7 missing species price pages ⭐ HIGHEST PRIORITY
**Impact:** VERY HIGH | **Effort:** 7 pages (~1 week)  
Using the `/fr/prix-perroquet-gris-du-gabon/` template.

| Target URL | Target species | Search intent |
|-----------|---------------|--------------|
| /fr/prix-amazone/ | Amazone à Front Bleu | "prix amazone perroquet france" |
| /fr/prix-ara-bleu-jaune/ | Ara Bleu et Jaune | "prix ara bleu jaune" |
| /fr/prix-ara-macao/ | Ara Macao | "prix ara macao" |
| /fr/prix-eclectus/ | Éclectus | "prix éclectus perroquet" |
| /fr/prix-perroquet-senegal/ | Sénégal | "prix perroquet sénégal france" |
| /fr/prix-perruche-a-collier/ | Perruche à Collier | "prix perruche à collier" |
| /fr/prix-pionus/ | Pionus | "prix pionus perroquet" |

Each page: BreadcrumbList + WebPage (nested Product+Offer) + FAQPage (8+ Q&As) — same pattern as existing price pages.

### B2 — Build 5 genus-level collection pages
**Impact:** HIGH | **Effort:** 5 pages (~3 days)  

| Target URL | Schema | Queries |
|-----------|--------|--------|
| /fr/aras/ | CollectionPage + ItemList | "ara perroquet", "espèces d'ara" |
| /fr/amazones/ | CollectionPage + ItemList | "amazone perroquet", "types amazone" |
| /fr/cacatoes/ | CollectionPage + ItemList | "cacatoès espèces" |
| /fr/conures/ | CollectionPage + ItemList | "conure perroquet", "types conures" |
| /fr/caiques/ | CollectionPage + ItemList | "caïque oiseau" |

Each page: list all species in that genus with image, link to species page, brief description. `ItemList` schema with `ListItem` → `Product` for each species.

### B3 — Build buyer guide hub page
**Impact:** MEDIUM-HIGH | **Effort:** 1 page (half day)  

| Target URL | Schema | Purpose |
|-----------|--------|--------|
| /fr/choisir-son-perroquet/ | CollectionPage + ItemList | Aggregates all 6 buyer profile guides + species selector |

This page becomes the semantic parent of the buyer profile cluster, receiving links from all 6 guides and passing authority to the species + commercial pages.

---

## PHASE C — ENTITY ENRICHMENT (4–8 weeks)

### C1 — Add `Taxon` entity to all 36 species pages
**Impact:** HIGH (Knowledge Graph) | **Effort:** Generator script (~1 day)  
Declaring species with `scientificName`, `parentTaxon: Psittacidae`, `sameAs: [Wikipedia URL, Wikidata URL]` tells Google's Knowledge Graph exactly what entity each page is about. This is the single most important signal for species entity disambiguation.

```json
// In "about" field of WebPage schema on each species page
"about": {
  "@type": "Thing",
  "name": "Gris du Gabon",
  "alternateName": ["Perroquet Gris", "Psittacus erithacus"],
  "sameAs": [
    "https://fr.wikipedia.org/wiki/Perroquet_gris",
    "https://www.wikidata.org/wiki/Q43018"
  ]
}
```

### C2 — Consolidate 3 duplicate blog/guide pairs
**Impact:** MEDIUM | **Effort:** 2h + 3 redirects  
- /fr/blog/meilleurs-perroquets-debutants/ → 301 → /fr/perroquet-pour-debutant/
- /fr/blog/prix-perroquet-france/ → repurpose as price hub pointing to all /fr/prix-*/
- /fr/blog/quel-perroquet-choisir/ → repurpose as buyer decision guide hub

### C3 — Add species back-links from blog posts
**Impact:** MEDIUM | **Effort:** 2h (12 post edits)  
Each blog post should link back to the relevant species Tier 1 page and at least one cluster page. Currently mostly one-directional.

### C4 — Build `sameAs` cross-links between Tier 1 and Tier 2 species pages
**Impact:** MEDIUM | **Effort:** 1 day  
Add visible cross-links between /fr/[species]/ (commercial) and /fr/especies/[species]/ (informational) with clear intent differentiation. Also add `sameAs` in schema to link both to the same external entity (Wikidata).

---

## PHASE D — LOCAL SEO EXPANSION (6–10 weeks)

### D1 — Build 4 regional hub pages
**Impact:** HIGH (aggregation authority) | **Effort:** 4 pages (~1 day)  

| Target URL | Cities covered | Schema |
|-----------|---------------|--------|
| /fr/perroquets-ile-de-france/ | Paris, Versailles + nearby | WebPage + Service + ItemList of cities |
| /fr/perroquets-occitanie/ | Toulouse, Montpellier, Narbonne, Béziers, Nîmes, Perpignan, Montauban | Same |
| /fr/perroquets-paca/ | Marseille, Nice, Toulon, Cannes, Aix-en-Provence, Avignon | Same |
| /fr/perroquets-bretagne/ | Brest, Rennes, Lorient | Same |

### D2 — Add cross-city linking to all city pages
**Impact:** MEDIUM | **Effort:** Generator script (~1 day)  
Each city page gets a "Villes proches" section linking to 3 geographically nearby cities + its regional hub. This transforms 50 isolated islands into a connected geographic network.

---

## PHASE E — INDIVIDUAL BIRD ENTITY PAGES (8–12 weeks)

### E1 — Individual bird profile pages
**Impact:** VERY HIGH (long-term) | **Effort:** HIGH — requires CMS or generator + manual data  
Each available bird gets a unique URL:
`/fr/perroquets-disponibles/gris-du-gabon-male-2024-[ref]/`

Schema: `Product` with `Offer` (InStock/PreOrder), `name` = species + sex + birth year, `image` = individual photo, `additionalProperty` = CITES ref, DNA sex, hand-raised = true.

This creates the lowest-competition, highest-conversion pages on the entire site — individual bird searches ("gris du gabon male 2024 à vendre") have near-zero competition and maximum buyer intent.

---

## PHASE F — BEHAVIOUR CLUSTER (8–14 weeks)

### F1 — Build behaviour/care content cluster
**Impact:** MEDIUM-HIGH (topical breadth) | **Effort:** 5–8 pages  

Anchored at `/fr/connaissances/comportement/` (existing hub), the cluster would cover:

| Target URL | Primary query |
|-----------|--------------|
| /fr/perroquet-qui-mord/ | "mon perroquet mord" |
| /fr/perroquet-arrache-plumes/ | "perroquet plumage picage" |
| /fr/perroquet-crie-beaucoup/ | "réduire cris perroquet" |
| /fr/enrichissement-mental-perroquet/ | "stimuler intelligence perroquet" |
| /fr/socialiser-perroquet/ | "apprivoiser perroquet adulte" |

Each page: WebPage + Article + FAQPage + back-links to species pages where relevant.

---

## PHASE G — SCHEMA COMPLETION (ongoing)

### G1 — Add `sameAs` Wikidata/Wikipedia to all 36 species pages
### G2 — Add `Blog` type to /fr/blog/ index
### G3 — Add `Article` to all remaining cluster + guide pages
### G4 — Add `HowTo` to /fr/connaissances/adoption/ and CITES guide

---

## IMPACT SUMMARY TABLE

| Phase | Action | Pages affected | Impact | Effort | Priority |
|-------|--------|---------------|--------|--------|----------|
| A1 | ItemList on disponibles | 1 | ⬆⬆⬆⬆ | Low | **P1** |
| A2 | Person schema (E-E-A-T) | 1 | ⬆⬆⬆ | Low | **P1** |
| A3 | Service schema city pages | 50 | ⬆⬆⬆⬆ | Medium | **P1** |
| A4 | HowTo on training page | 1 | ⬆⬆⬆ | Low | **P1** |
| B1 | 7 price pages | 7 new | ⬆⬆⬆⬆⬆ | Medium | **P1** |
| B2 | 5 genus hub pages | 5 new | ⬆⬆⬆ | Medium | **P2** |
| B3 | Buyer guide hub | 1 new | ⬆⬆ | Low | **P2** |
| C1 | Taxon schema (36 pages) | 36 | ⬆⬆⬆ | Medium | **P2** |
| D1 | 4 region hub pages | 4 new | ⬆⬆⬆ | Medium | **P2** |
| D2 | Cross-city linking | 50 | ⬆⬆ | Medium | **P3** |
| C2 | Blog deduplication | 3 | ⬆⬆ | Low | **P3** |
| A5-A8 | Remaining quick-win schemas | 15 | ⬆⬆ | Low | **P3** |
| E1 | Individual bird pages | 10–30 new | ⬆⬆⬆⬆⬆ | Very High | **P1 (long)** |
| F1 | Behaviour cluster | 5–8 new | ⬆⬆⬆ | High | **P4** |

---

## ESTIMATED ORGANIC GROWTH PROJECTIONS

| Phase | Completion | Expected organic gain |
|-------|-----------|----------------------|
| A (quick wins) | Week 2 | +10–15% impressions (schema features) |
| B1 (price pages) | Week 4 | +20–30% commercial clicks |
| B2–B3 (hubs) | Week 6 | +8–12% topical authority |
| C+D (entity enrichment) | Week 10 | +15–25% entity-driven traffic |
| E (individual birds) | Week 14 | +30–50% high-conversion long-tail |

*Projections are estimates based on current site scale and identified gap volume. Actual results depend on crawl frequency, indexing speed, and competitive environment.*

---

## CONSTRAINTS & GUARDRAILS

- **Never fabricate** `AggregateRating`, `Review`, or pricing data
- **All prices** must use `priceSpecification` with "prix sur demande" — never a specific EUR figure unless verifiable
- **Person schema** for breeder: use a role/title, not a personal name, unless the breeder explicitly consents to name publication
- **Wikidata sameAs** links: verify scientific name before linking — an incorrect Wikidata entity is worse than no entity
- **Blog 301 redirects** for consolidation: use `<meta http-equiv="refresh">` redirect in the HTML until Netlify `_redirects` can be updated centrally
