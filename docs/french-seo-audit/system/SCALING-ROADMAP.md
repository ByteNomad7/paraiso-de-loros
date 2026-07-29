# Scaling Roadmap — Paraíso de Aves FR

**Version:** 1.0  
**Date:** 2026-07-29  
**Goal:** Scale the French section from 157 pages to 1,000+ pages at enterprise quality, without sacrificing quality or creating technical debt.

---

## SCALING PRINCIPLES

**1. Systems before volume**  
Every generator script, checklist, and template must be in place before a page batch is produced. Never generate pages that don't have a QA gate.

**2. Silo completeness before new silos**  
Complete 80%+ of a silo before starting the next. Incomplete silos send weak topical authority signals. A complete behaviour cluster of 20 pages outperforms 5 pages each in 4 silos.

**3. Quality floor is non-negotiable**  
A page that fails the QA checklist does not go live. Better to publish 10 quality pages than 100 thin ones. Google's helpful content systems detect site-wide quality signals — one batch of low-quality pages degrades the entire domain.

**4. Infrastructure scales with content**  
Every 50 new pages requires:
- A new split sitemap file (sitemap_fr_[phase].xml)
- Updated sitemap_index.xml
- Updated _redirects rules
- Dashboard refresh to track new page types

**5. Entity completeness is the goal**  
The target is not 1,000 pages. The target is: every question a French parrot buyer can ask is answered by this site. Pages are the means; entity completeness is the measure.

---

## SCALING PHASES

### PHASE 1 — Foundation (Months 1–2) · Target: 192 pages (+35)

**Priority:** Commercial completeness + trust architecture  
**Principle:** Fix the revenue-blocking gaps before expanding topical coverage

| Batch | Pages | Type | Effort |
|-------|-------|------|--------|
| Legal pages | 3 | Trust/Legal | Low |
| Professional trust updates | 0 new pages (site-wide edits) | Trust | Low |
| Missing price pages | 7 | Commercial | Medium |
| Price hub | 1 | Commercial hub | Low |
| Buyer guide hub | 1 | Commercial hub | Low |
| Buyer profiles (3 new) | 3 | Commercial | Medium |
| Confirmation page (/merci/) | 1 | Conversion | Low |
| Support page | 1 | Trust/Service | Low |
| DNA testing page | 1 | Trust | Low |
| Anti-scam trust page | 1 | Trust | Low |

**Infrastructure actions:**
- Update sitemap_fr.xml (+19 URLs)
- Update _redirects (+19 clean-URL rules)
- Update footer on all 157 pages (legal links + professional email)
- Update Organisation schema email on all pages

**Phase 1 KPI:** All commercial intent queries for all 10 flagship species served.

---

### PHASE 2 — Species Authority (Months 2–3) · Target: 215 pages (+23)

**Priority:** Complete the species entity graph  
**Principle:** Own every species-level query before expanding to care/health clusters

| Batch | Pages | Type | Effort |
|-------|-------|------|--------|
| Genus hub pages | 5 | Species hub | Medium |
| Species comparison pages | 5 | Species | Medium |
| Species attribute pages | 5 | Species | Medium |
| Taxon schema (36 species pages) | 0 new (schema updates) | Technical | Medium |
| Service schema (50 city pages) | 0 new (schema updates) | Technical | Medium |
| ItemList schema (disponibles) | 0 new (schema update) | Technical | Low |

**Phase 2 KPI:** All genus-level and species comparison queries served. Schema entity graph complete for all 36 species.

---

### PHASE 3 — Behaviour Cluster (Months 3–5) · Target: 240 pages (+25)

**Priority:** Highest-volume uncovered topical domain  
**Principle:** 20-page behaviour cluster is the single largest authority gain available

| Batch | Pages | Type | Effort |
|-------|-------|------|--------|
| Behaviour pillar page | 1 | Pillar | Medium |
| High-volume behaviour articles (5) | 5 | Cluster | High |
| Mid-volume behaviour articles (8) | 8 | Cluster | High |
| Supporting behaviour articles (6) | 6 | Cluster | Medium |
| Connect /fr/connaissances/comportement/ to cluster | 0 new (link updates) | Internal linking | Low |

**Phase 3 KPI:** "comportement perroquet" + "mon perroquet mord" + "picage perroquet" in top 30. Behaviour silo coverage: 90%.

---

### PHASE 4 — Health Cluster (Months 4–6) · Target: 262 pages (+22)

**Priority:** YMYL-adjacent E-E-A-T gain + high search volume  
**Note:** All health pages require vet disclaimer and external citation. No exceptions.

| Batch | Pages | Type | Effort |
|-------|-------|------|--------|
| Health pillar page | 1 | Pillar | Medium |
| Core health articles (7) | 7 | Cluster | High |
| Supporting health articles (11) | 11 | Cluster | High |
| Expand garantie-sante | 0 new (expand existing) | Content depth | Medium |

**Phase 4 KPI:** "maladies perroquet" + "perroquet malade symptômes" indexed. E-E-A-T score +15 points.

---

### PHASE 5 — Nutrition Cluster (Months 5–7) · Target: 280 pages (+18)

| Batch | Pages | Type | Effort |
|-------|-------|------|--------|
| Nutrition pillar page | 1 | Pillar | Medium |
| Core nutrition articles (5) | 5 | Cluster | Medium |
| Species-specific nutrition articles (4) | 4 | Cluster | Medium |
| Supporting nutrition articles (6) | 6 | Cluster | Medium |

**Phase 5 KPI:** "alimentation perroquet" + "aliments interdits perroquet" in top 20.

---

### PHASE 6 — Training Cluster (Months 6–7) · Target: 290 pages (+10)

| Batch | Pages | Type | Effort |
|-------|-------|------|--------|
| Training pillar page | 1 | Pillar | Medium |
| Core training articles (4) | 4 | Cluster | Medium |
| Connect talking cluster to training pillar | 0 new (link updates) | Internal linking | Low |
| Clicker + reinforcement articles (3) | 3 | Cluster | Medium |

**Phase 6 KPI:** "dresser perroquet" + "apprivoiser perroquet" in top 20. Training cluster: 15 pages total.

---

### PHASE 7 — CITES Cluster (Months 7–8) · Target: 305 pages (+15)

| Batch | Pages | Type | Effort |
|-------|-------|------|--------|
| CITES pillar (expand existing) | 0 new (expand) | Pillar | Medium |
| CITES cluster articles (10) | 10 | Cluster | Medium |
| CITES legal integration on all pages | 0 new (schema updates) | Technical | Low |

**Phase 7 KPI:** "cites perroquet france" + "perroquet sans papiers risque" ranking. Zero-competition authority established.

---

### PHASE 8 — Housing Cluster (Months 8–9) · Target: 325 pages (+20)

| Batch | Pages | Type | Effort |
|-------|-------|------|--------|
| Housing pillar page | 1 | Pillar | Medium |
| Core housing articles (7) | 7 | Cluster | Medium |
| Supporting housing articles (5) | 5 | Cluster | Medium |

---

### PHASE 9 — Geographic Expansion (Months 8–10) · Target: 340 pages (+15)

| Batch | Pages | Type | Effort |
|-------|-------|------|--------|
| Regional hub pages (4) | 4 | Geographic hub | Medium |
| Cross-city linking (50 pages) | 0 new (link updates) | Internal linking | Medium |

**Phase 9 KPI:** "perroquets [région]" queries served. City pages no longer isolated.

---

### PHASE 10 — Individual Bird Pages (Months 9–12) · Target: 370+ pages

| Batch | Pages | Type | Effort |
|-------|-------|------|--------|
| Bird profile generator script | 0 pages (infrastructure) | Technical | High |
| Individual bird pages (initial 30) | 30+ | Bird profile | High |
| Ongoing (as birds become available) | Rolling | Bird profile | Low (automated) |

**This phase requires a content management decision:**
- Option A: Static generator updates profiles when availability changes
- Option B: A simple Node.js admin script that generates/updates individual bird files with status changes

**Phase 10 KPI:** Every available bird is a searchable, linkable entity with Product schema. Highest-conversion pages on the site.

---

### PHASE 11 — Delivery + Breeding Clusters (Months 10–12) · Target: 395 pages

| Batch | Pages | Type |
|-------|-------|------|
| Delivery cluster (8 pages) | 8 | Cluster |
| Breeding education cluster (10 pages) | 10 | Cluster |

---

### PHASE 12 — 500+ Page Expansion (Year 2)

By Year 2, the system has been validated at 400 pages. Scale to 500+ with:

| Expansion | Pages | Notes |
|-----------|-------|-------|
| Blog to 30 posts | +18 | 2 posts/month for 9 months |
| Glossary (/fr/glossaire/) | +50 | Term pages for parrot vocabulary — low effort, long-tail value |
| FAQ mega-hub | +30 | Structured FAQ pages per topic |
| Expanded city pages (75 total) | +25 | Tier-2 cities in France |
| Subspecies pages | +20 | Named subspecies not yet covered |

---

## INFRASTRUCTURE SCALING REQUIREMENTS

### Sitemap management

| Page count | Sitemaps needed |
|-----------|----------------|
| 157 (now) | sitemap_fr.xml + existing splits |
| 300 | Add sitemap_fr_phase3.xml |
| 500 | Add sitemap_fr_phase5.xml |
| 700 | Add sitemap_fr_phase7.xml |
| 1,000+ | 8–10 split sitemaps of ~130 URLs each |

Rule: No single sitemap exceeds 500 URLs (Google's efficiency preference, not limit).

### Generator scripts required

| Phase | Script needed | Status |
|-------|-------------|--------|
| 1 | generate-price-pages.js (7 species) | To build |
| 2 | generate-genus-hubs.js | To build |
| 2 | inject-taxon-schema.js (36 species) | To build |
| 2 | inject-service-schema.js (50 cities) | To build |
| 3 | generate-behaviour-cluster.js | To build |
| 4 | generate-health-cluster.js | To build |
| 5 | generate-nutrition-cluster.js | To build |
| 9 | generate-region-hubs.js | To build |
| 10 | generate-bird-profiles.js | To build |

Each generator must:
1. Accept a data config file (JSON with page-specific data)
2. Follow PAGE-TEMPLATES.md structure
3. Output valid HTML to correct path
4. Update sitemap automatically
5. Update _redirects automatically
6. Run QA check on output and abort if any BLOCK check fails

### QA script evolution

| Scale | QA approach |
|-------|------------|
| 1–200 pages | `node scripts/qa-check.js [path]` — manual trigger per page |
| 200–500 pages | `node scripts/qa-check.js --all` — run on all pages, report exceptions |
| 500–1,000 | Git pre-commit hook — qa-check runs automatically on any HTML change |
| 1,000+ | Scheduled CI job — nightly qa-check on all pages, alert on failures |

---

## SCALING METRICS

Track monthly:

| Metric | Month 1 | Month 6 | Month 12 | Year 2 |
|--------|---------|---------|---------|--------|
| Total FR pages | 157 | 280 | 395 | 600+ |
| Topical silos ≥ 80% complete | 3/11 | 7/11 | 10/11 | 11/11 |
| Technical SEO score | 74 | 88 | 95 | 97 |
| E-E-A-T score | 52 | 75 | 88 | 92 |
| Conversion score | 40 | 70 | 85 | 90 |
| Organic sessions/month | Baseline | +60% | +150% | +400% |
| Pages in top 10 | Baseline | +80% | +200% | +500% |

---

## ANTI-PATTERNS TO AVOID AT SCALE

| Anti-pattern | Risk | Prevention |
|-------------|------|-----------|
| Batch publishing without QA | Low-quality pages degrade domain | QA gate is non-negotiable |
| Thin city pages (< 700 words) | Helpful content classifier flags site | Word count floor enforced in generator |
| Duplicate content across city pages | Cannibalisation + quality penalty | Each city page must have unique intro paragraph |
| Schema without content depth | Google ignores schema on thin pages | Word count check precedes schema addition |
| Publishing orphan pages | Zero traffic; wastes crawl budget | Inbound link audit mandatory in Stage 8 |
| Growing blog without cluster integration | Blog posts don't support commercial pages | Every blog post maps to a silo and links to cluster |
| Missing sitemap entries | Pages not crawled efficiently | Sitemap auto-update in generator scripts |
| Stale redirects (chains) | Crawl waste + user confusion | Quarterly redirect chain audit |
