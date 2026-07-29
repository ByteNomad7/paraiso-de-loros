# QA Checklists — Paraíso de Aves FR

**Version:** 1.0  
**Date:** 2026-07-29  
**Rule:** EVERY item marked [BLOCK] must pass before publication. [WARN] items log a warning but do not block.

---

## HOW TO USE

Before publishing any page:
1. Identify the page type
2. Run the corresponding checklist
3. All [BLOCK] items must be ✅
4. [WARN] items should be addressed within 7 days of publication
5. Sign off with date and reviewer initials

---

## CHECKLIST 0 — UNIVERSAL (all page types)

Run this before every page type checklist.

### Technical

| # | Check | Gate | Method |
|---|-------|------|--------|
| U-T01 | `<title>` present, 50–60 characters | BLOCK | Count chars |
| U-T02 | `<meta name="description">` present, 145–160 characters | BLOCK | Count chars |
| U-T03 | `<link rel="canonical">` self-referencing | BLOCK | Inspect HTML |
| U-T04 | `<link rel="alternate" hreflang="fr">` present | BLOCK | Inspect HTML |
| U-T05 | H1 present — exactly one H1 per page | BLOCK | Inspect HTML |
| U-T06 | No heading levels skipped (h1→h2→h3 only) | BLOCK | Inspect HTML |
| U-T07 | Page loads over HTTPS with no mixed content | BLOCK | Browser |
| U-T08 | No broken internal links (all hrefs return 200) | BLOCK | Link checker |
| U-T09 | Page renders correctly at 375px, 768px, 1200px | BLOCK | DevTools |
| U-T10 | `lang="fr"` on `<html>` element | BLOCK | Inspect HTML |

### Schema

| # | Check | Gate | Method |
|---|-------|------|--------|
| U-S01 | JSON-LD present in `<head>` | BLOCK | Inspect HTML |
| U-S02 | Schema validates in Rich Results Test | BLOCK | search.google.com/test/rich-results |
| U-S03 | BreadcrumbList present with ≥ 3 levels | BLOCK | Rich Results Test |
| U-S04 | No duplicate schema types (no two identical @type blocks) | BLOCK | Inspect JSON-LD |
| U-S05 | @id references resolve to real URLs | WARN | Inspect JSON-LD |

### Content

| # | Check | Gate | Method |
|---|-------|------|--------|
| U-C01 | Title tag unique across all FR pages | BLOCK | Sitemap diff |
| U-C02 | Meta description unique across all FR pages | BLOCK | Sitemap diff |
| U-C03 | Primary keyword present in H1 | BLOCK | Read |
| U-C04 | Primary keyword present in first paragraph | WARN | Read |
| U-C05 | No Lorem Ipsum or placeholder text | BLOCK | Read |
| U-C06 | All `[placeholder]` tokens replaced | BLOCK | grep `\[` in HTML |
| U-C07 | Author attribution present | BLOCK | Read |
| U-C08 | Publication date present (`<time datetime="">`) | BLOCK | Inspect HTML |

### Images

| # | Check | Gate | Method |
|---|-------|------|--------|
| U-I01 | All non-decorative images have non-empty alt text | BLOCK | Inspect HTML |
| U-I02 | Hero image has `loading="eager"` + `fetchpriority="high"` | BLOCK | Inspect HTML |
| U-I03 | All below-fold images have `loading="lazy"` | WARN | Inspect HTML |
| U-I04 | All `<img>` have explicit `width` and `height` | BLOCK | Inspect HTML |
| U-I05 | WebP source present in `<picture>` for hero | BLOCK | Inspect HTML |

### Trust & Legal

| # | Check | Gate | Method |
|---|-------|------|--------|
| U-L01 | Footer contains Mentions Légales link | BLOCK | Inspect footer |
| U-L02 | Footer contains CGV link | BLOCK | Inspect footer |
| U-L03 | Footer contains Confidentialité link | BLOCK | Inspect footer |
| U-L04 | No Gmail address displayed | BLOCK | grep `gmail` |
| U-L05 | GDPR cookie consent present | BLOCK | Browser |
| U-L06 | Contact email uses professional domain | BLOCK | Read |

### Mobile

| # | Check | Gate | Method |
|---|-------|------|--------|
| U-M01 | Primary CTA visible without scrolling at 375px | BLOCK | DevTools mobile |
| U-M02 | Mobile bottom bar present (Disponibles + Contact) | BLOCK | DevTools mobile |
| U-M03 | All form inputs have `font-size: 16px` minimum | BLOCK | CSS inspect |
| U-M04 | No horizontal scroll at 375px | BLOCK | DevTools mobile |
| U-M05 | Sidebar collapses below content (not beside) at < 900px | BLOCK | DevTools |

### Internal Links

| # | Check | Gate | Method |
|---|-------|------|--------|
| U-IL01 | Page links to /fr/perroquets-disponibles/ | BLOCK | Inspect HTML |
| U-IL02 | Page links to /fr/contact/ | BLOCK | Inspect HTML |
| U-IL03 | Page is not an orphan (≥ 3 other pages link here) | WARN | Link graph |
| U-IL04 | No link to a 404 page | BLOCK | Link checker |

---

## CHECKLIST 1 — COMMERCIAL PAGE

Run after Universal checklist.

| # | Check | Gate |
|---|-------|------|
| C-01 | Word count ≥ 1,800 | BLOCK |
| C-02 | FAQPage schema with ≥ 6 Q&As | BLOCK |
| C-03 | Product + Offer schema present (price pages) | BLOCK (price pages only) |
| C-04 | Trust block (CITES + vet + delivery) present | BLOCK |
| C-05 | "Pourquoi nous choisir?" section present | BLOCK |
| C-06 | Availability statement present | BLOCK |
| C-07 | Payment/deposit policy present (processus-adoption) | BLOCK (process pages) |
| C-08 | Link to /fr/garantie-sante/ | BLOCK |
| C-09 | Link to /fr/livraison/ | WARN |
| C-10 | Mid-article CTA present | BLOCK |
| C-11 | "Réponse sous 24h" stated | WARN |

---

## CHECKLIST 2 — SPECIES PAGE (TIER 1)

| # | Check | Gate |
|---|-------|------|
| SP1-01 | Word count ≥ 2,500 | BLOCK |
| SP1-02 | Scientific name in body + schema | BLOCK |
| SP1-03 | `about.sameAs` Wikidata URL in WebPage schema | BLOCK |
| SP1-04 | Article schema with author + dates | BLOCK |
| SP1-05 | FAQPage ≥ 8 Q&As | BLOCK |
| SP1-06 | "L'avis de l'éleveur" box present | BLOCK |
| SP1-07 | Entity trust grid (6 links: disponibles, prix, garantie, livraison, guide, contact) | BLOCK |
| SP1-08 | Link to /fr/especies/[species]/ | BLOCK |
| SP1-09 | Link to /fr/prix-[species]/ (if price page exists) | BLOCK |
| SP1-10 | All 7 required H2 sections present | BLOCK |
| SP1-11 | Tier 1 species image is species-accurate (not related species) | BLOCK |

---

## CHECKLIST 3 — SPECIES PAGE (TIER 2 — /fr/especies/)

| # | Check | Gate |
|---|-------|------|
| SP2-01 | Word count ≥ 2,000 | BLOCK |
| SP2-02 | Scientific classification table present | BLOCK |
| SP2-03 | `sameAs` Wikidata URL | BLOCK |
| SP2-04 | Article schema with author + dates | BLOCK |
| SP2-05 | FAQPage ≥ 8 Q&As | BLOCK |
| SP2-06 | Link back to Tier 1 commercial counterpart | BLOCK |
| SP2-07 | Link to /fr/especies/ hub | BLOCK |
| SP2-08 | CITES status stated accurately (Annexe I or II) | BLOCK |

---

## CHECKLIST 4 — BIRD PROFILE PAGE

| # | Check | Gate |
|---|-------|------|
| BP-01 | 3 individual photos (face, full body, personality) | BLOCK |
| BP-02 | Status badge: Disponible / Réservé / Bientôt disponible | BLOCK |
| BP-03 | Sex (DNA-confirmed) stated | BLOCK |
| BP-04 | Approximate birth year stated | BLOCK |
| BP-05 | Hand-raised statement present | BLOCK |
| BP-06 | CITES status and documentation list | BLOCK |
| BP-07 | Product + Offer schema with InStock / PreOrder | BLOCK |
| BP-08 | ≥ 3 ImageObject in schema | BLOCK |
| BP-09 | CTA pre-populated with species | BLOCK |
| BP-10 | Back-link to species page + disponibles hub | BLOCK |

---

## CHECKLIST 5 — CITY LANDING PAGE

| # | Check | Gate |
|---|-------|------|
| CL-01 | Word count ≥ 700 | BLOCK |
| CL-02 | H1 = "Perroquets à Vendre à [Ville]" | BLOCK |
| CL-03 | Service schema with areaServed: {City, FR} | BLOCK |
| CL-04 | FAQPage ≥ 4 Q&As | BLOCK |
| CL-05 | Delivery timeline for this city stated | BLOCK |
| CL-06 | Species grid ≥ 4 species | BLOCK |
| CL-07 | City name appears in first paragraph | BLOCK |
| CL-08 | Links to ≥ 3 nearby city pages | WARN |
| CL-09 | Link to regional hub (when built) | WARN |

---

## CHECKLIST 6 — BLOG ARTICLE

| # | Check | Gate |
|---|-------|------|
| BL-01 | Word count ≥ 1,500 | BLOCK |
| BL-02 | BlogPosting / Article schema with all required fields | BLOCK |
| BL-03 | Person schema for author | BLOCK |
| BL-04 | "À propos de l'auteur" section at bottom | BLOCK |
| BL-05 | ≥ 1 external authoritative source cited + linked | BLOCK |
| BL-06 | Link to relevant species Tier 1 page | BLOCK |
| BL-07 | Link to /fr/perroquets-disponibles/ | BLOCK |
| BL-08 | Link to /fr/blog/ hub | BLOCK |
| BL-09 | Hero image with descriptive alt text | BLOCK |
| BL-10 | datePublished + dateModified visible on page | BLOCK |

---

## CHECKLIST 7 — KNOWLEDGE / CLUSTER PAGE

| # | Check | Gate |
|---|-------|------|
| KN-01 | Word count ≥ 1,200 (hub) / ≥ 1,500 (cluster article) | BLOCK |
| KN-02 | HowTo schema on process pages | BLOCK (process pages) |
| KN-03 | FAQPage ≥ 6 Q&As | BLOCK |
| KN-04 | Health disclaimer present (health content) | BLOCK (health pages) |
| KN-05 | ≥ 1 external authoritative source linked | BLOCK |
| KN-06 | Link to pillar hub | BLOCK |
| KN-07 | ≥ 2 links to cluster siblings | BLOCK |
| KN-08 | Link to relevant species page | BLOCK |
| KN-09 | "L'avis de l'éleveur" box (care/behaviour/health) | WARN |
| KN-10 | "Articles liés" section (3 siblings) | BLOCK |

---

## QA LOG FORMAT

Every published page should be logged in `/docs/qa-log.csv`:

```csv
date,slug,page_type,reviewer,universal_pass,type_checklist_pass,warnings,notes
2026-07-29,/fr/prix-amazone/,commercial,JD,PASS,PASS,0,""
2026-07-29,/fr/perroquets-calmes/,cluster,JD,PASS,PASS,1,"BL-08: blog hub link missing — added"
```

---

## AUTOMATED QA SCRIPT

Run `node scripts/qa-check.js [path]` (see QA script spec in SEO-DASHBOARD-SPECIFICATION.md).

Outputs:
- PASS: all [BLOCK] items clear
- FAIL: lists each failed [BLOCK] item with line reference
- WARN: lists each [WARN] item for follow-up

Returns exit code 0 (pass) or 1 (fail) — can be integrated into git pre-commit hook or CI pipeline.
