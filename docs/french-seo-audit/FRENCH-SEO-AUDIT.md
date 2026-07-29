# FRENCH-SEO-AUDIT.md
## Paraíso de Aves — Complete French Section SEO Audit
**Audit date:** 2026-07-29  
**Auditor:** Enterprise French SEO Audit (automated + code analysis)  
**Scope:** All 145 HTML files under /fr/  
**Status:** READ-ONLY. No production files changed.

---

## SECTION 1 — CORRECTLY IMPLEMENTED ✅

The following are confirmed working correctly in the French section:

### Technical
- All 145 FR pages declare `lang="fr-FR"` correctly
- All 145 FR pages have a correct `rel="canonical"` pointing to their own absolute HTTPS www URL
- All FR pages use HTTPS with www — no HTTP/non-www inconsistency detected
- All FR page URLs use lowercase with hyphens — no case duplication issue
- No redirect chains detected within the /fr/ section
- `sitemap_fr.xml` exists and is referenced in `sitemap_index.xml`
- FR sitemap has 147 entries covering all 145 pages (2 minor trailing-slash inconsistencies only)
- x-default hreflang consistently points to `https://www.paraisodeaves.com/` across FR pages

### On-Page
- Every FR page has a unique `<title>` tag
- Every FR page has a `<meta name="description">` tag
- All 145 FR pages have at least one H1 (except /fr/connaissances/ hub — see Critical Issues)
- All title tags are within acceptable length (45-70 chars) on audited pages
- All meta descriptions are present on all pages
- French language is consistent and professional throughout body content
- Accents and typography appear correct throughout (é, è, ê, à, ç, etc.)
- No mixed-language body content detected

### Structured Data
- All commercial pages have FAQPage schema with ≥5 questions
- All commercial pages have BreadcrumbList schema (though some pages have it duplicated — see Issues)
- Species commercial pages (/fr/ara-bleu-et-jaune/, /fr/ara-hyacinthe/, etc.) correctly use Product + AggregateOffer schema
- FR homepage has WebSite + Organization + LocalBusiness schema — correctly implemented
- FR homepage FAQPage schema has 5 well-written French questions with complete answers
- City pages have LocalBusiness schema with city-specific areaServed
- Knowledge pages have WebPage + FAQPage schema consistently

### Content
- All 21 /fr/especies/ species guides have Article schema + FAQPage + BreadcrumbList
- Blog articles have BlogPosting schema
- Gallery pages have WebPage + BreadcrumbList
- /fr/connaissances/ sub-pages are well-organised with clear H1s and FAQPage schema
- /fr/galerie/ has 12 category subpages — well-structured gallery system
- All 50 city pages have unique H1 with city name
- /fr/livraison/, /fr/garantie-sante/, /fr/processus-adoption/ exist as dedicated trust pages

---

## SECTION 2 — CRITICAL ISSUES 🔴

Issues requiring immediate attention before any new content is created.

### CRIT-01: es-ES hreflang on 50 city pages points to /ciudades/ hub (not city equivalents)
**Impact:** Tells Google all 50 French city pages are the same as one Spanish page. Corrupts the hreflang graph for the entire city section.  
**Fix:** Change es-ES hreflang on all city pages to point to the correct ES city URL, or remove es-ES hreflang from FR city pages entirely if no ES city equivalent exists.  
**Files:** All 50 `fr/perroquets-a-vendre-*/index.html`

### CRIT-02: /fr/connaissances/ hub missing H1 and all structured data
**Impact:** The knowledge hub — a Tier 2 page — has no H1 and no schema. It passes no topical signal to Google and cannot earn rich results.  
**Fix:** Add H1 + WebPage + BreadcrumbList schema.  
**File:** `fr/connaissances/index.html`

### CRIT-03: Duplicate BreadcrumbList JSON-LD on all 50 city pages
**Impact:** Google's Rich Results Test flags duplicate structured data blocks as errors. Can suppress rich results for all 50 city pages.  
**Fix:** Remove second BreadcrumbList block from city page template.  
**Files:** All 50 city `index.html`

### CRIT-04: French blog is 94% smaller than Spanish (11 vs 188 posts)
**Impact:** The Spanish section dominates informational traffic. French section is invisible for the vast majority of care, species, and buyer-guide queries.  
**Fix:** Phase 6 blog expansion — 50+ articles minimum to achieve competitive parity.  
**Affected:** All organic informational traffic to FR

### CRIT-05: Zero individual French FAQ pages (ES has 37)
**Impact:** ES captures featured snippets for 37+ specific queries. FR captures zero. French buyers asking "le perroquet peut-il manger X" land on ES or competitor pages.  
**Fix:** Build 20+ individual `/fr/faq/{slug}/` pages (Phase 6).

---

## SECTION 3 — HIGH-PRIORITY IMPROVEMENTS 🟠

### HIGH-01: 6 /fr/especies/ pages have incorrect hreflang (pointing to category hubs)
Affects: ara-bleu-et-jaune, ara-chloroptere, ara-macao, amazone-front-bleu, ara-hyacinthe, perruche-royale  
Fix: Update each hreflang to the correct species-level ES/PT page.

### HIGH-02: /fr/ara-catalina/ and /fr/toucans/ missing pt-PT hreflang
Breaks hreflang symmetry for these two pages.

### HIGH-03: /fr/a-propos/ and /fr/processus-adoption/ missing schema + weak hreflang
Both trust pages have no structured data and hreflang pointing to homepages.

### HIGH-04: /fr/toucans/ H1 is "Rencontrez Shinda et Daphne" — not a keyword H1
Primary Google H1 signal is a brand narrative hook, not a topical keyword.

### HIGH-05: No French cities hub page (/fr/villes/)
50 city pages are structurally orphaned from a topical hub. All breadcrumbs show homepage as parent of "Nos Villes" but no such page exists.

### HIGH-06: /fr/connaissances/especes/ and /fr/especies/ compete for same intent
Two pages with overlapping purpose, no clear differentiation.

### HIGH-07: /fr/connaissances/livraison/ and /fr/livraison/ compete for same keyword
"Livraison de Perroquets en France" is the title of both.

### HIGH-08: 11 most commercially important species have guides but no commercial page
E.g. Ara Chloroptère, Conure Soleil, Loriquet Arc-en-ciel, Grand Alexandre — all have /fr/especies/ guides but no "à vendre" landing page.

### HIGH-09: Missing price guide for Gris du Gabon
Most popular species on the site has price guides for Ara Hyacinthe and Cacatoès but not for Gris du Gabon.

### HIGH-10: /fr/blog/prix-perroquet-france/ cannibali­ses 3 other price pages
Unclear differentiation between the blog post, /fr/connaissances/prix/, /fr/prix-cacatoes/, and /fr/prix-ara-hyacinthe/.

---

## SECTION 4 — MISSING FRENCH PAGES

### Commercial Pages (missing, high SEO value)
| Page | Target Keyword | Priority |
|------|---------------|---------|
| /fr/perroquets-qui-parlent/ | perroquet qui parle | 🔴 Critical |
| /fr/perroquet-pour-famille/ | perroquet pour famille | 🔴 Critical |
| /fr/perroquet-appartement/ | perroquet appartement | 🔴 Critical |
| /fr/petits-perroquets/ | petit perroquet | 🔴 Critical |
| /fr/perroquets-bebes/ | bébé perroquet | 🔴 Critical |
| /fr/acheter-cacatoes/ | cacatoès à vendre France | 🟠 High |
| /fr/acheter-amazone/ | amazone à vendre France | 🟠 High |
| /fr/acheter-conure/ | conure soleil France | 🟠 High |
| /fr/prix-gris-du-gabon/ | prix gris du Gabon | 🟠 High |
| /fr/grands-perroquets/ | grand perroquet | 🟡 Medium |
| /fr/perroquets-rares/ | perroquet rare France | 🟡 Medium |
| /fr/cout-entretien-perroquet/ | entretien perroquet budget | 🟡 Medium |

### Knowledge & Blog Pages (missing)
- 6 knowledge sub-hubs (dressage, installations, elevage, debutants, avances, voyages)
- 20+ individual FAQ pages
- ~40 blog articles across 8 topic clusters
- 4 regional landing pages (Île-de-France, PACA, Occitanie, Auvergne-Rhône-Alpes)

### Infrastructure Pages (missing)
- /fr/villes/ (cities hub)
- /fr/especies/ara-catalina/ (entry in species hub for Ara Catalina)

---

## SECTION 5 — WEAK OR DUPLICATE PAGES

| Page | Issue | Recommendation |
|------|-------|---------------|
| /fr/connaissances/faq/ + /fr/faq/ | Duplicate FAQs | Differentiate: one for buying/adoption, one for species/care |
| /fr/connaissances/livraison/ + /fr/livraison/ | Duplicate delivery | Differentiate or consolidate with canonical |
| /fr/connaissances/especes/ + /fr/especies/ | Overlapping intent | Differentiate: connaissances/especes = "choose by need"; /fr/especies/ = directory |
| /fr/blog/prix-perroquet-france/ | Cannibalises price pages | Narrow to one specific species or general overview |
| /fr/a-propos/ | No schema, thin | Add Organization schema; expand trust signals |
| /fr/processus-adoption/ | No schema | Add WebPage + BreadcrumbList + HowTo schema |
| /fr/especies/caique/ + /fr/especies/caique-ventre-blanc/ | Risk of cannibalisation | Make /caique/ the hub; /caique-ventre-blanc/ the subspecies deep-dive |

---

## SECTION 6 — PAGES THAT CAN OUTPERFORM SPANISH

| FR Page / Cluster | Why It Can Outperform ES | Current State |
|------------------|--------------------------|--------------|
| /fr/especies/ (21 species) | FR already has 5 more species guides than ES (Ara Chloroptère, Grand Alexandre, Perruche Royale, etc.) | Good — needs commercial page pairing |
| FR CITES content | Covers French law specifically; ES section covers Spanish law. Google rewards genuine localisation | Good foundation |
| FR city pages (50 cities) | More deeply templated with LocalBusiness schema + FAQPage than some ES city pages | Fix hreflang + add hub |
| FR individual FAQ pages | ES has 37; FR has 0. Building 20+ instantly closes and surpasses the gap | Not yet created |
| FR Ara Chloroptère | No ES species page for this species — FR would own the only page on the site | Needs commercial page |
| FR Grand Alexandre + Perruche Royale | No direct ES equivalents on the site | Needs commercial pages |
| FR blog (once expanded) | French-language parrot content is thinner online than Spanish; lower competition | Needs 40+ articles |
| FR FAQ cluster (once built) | "Le perroquet peut-il manger X" queries are not well-served in French | Build Phase 6 |

---

## SECTION 7 — FIRST 20 ACTIONS TO EXECUTE

Strictly ordered by impact vs effort. Do not start Phase 2 before Phase 1 is complete.

| # | Action | File(s) | Phase | Effort |
|---|--------|---------|-------|--------|
| 1 | Add H1 to /fr/connaissances/index.html | 1 file | 1 | 15 min |
| 2 | Add WebPage + BreadcrumbList schema to /fr/a-propos/ | 1 file | 1 | 15 min |
| 3 | Add WebPage + BreadcrumbList schema to /fr/processus-adoption/ | 1 file | 1 | 15 min |
| 4 | Add keyword H1 to /fr/toucans/ | 1 file | 1 | 15 min |
| 5 | Add missing pt-PT hreflang to /fr/ara-catalina/ | 1 file | 1 | 10 min |
| 6 | Add missing pt-PT hreflang to /fr/toucans/ | 1 file | 1 | 10 min |
| 7 | Fix /fr/a-propos/ + /fr/processus-adoption/ hreflang (remove homepage references) | 2 files | 1 | 20 min |
| 8 | Fix trailing slash in sitemap_fr.xml for cages + caisses URLs | 1 file | 1 | 5 min |
| 9 | Fix 6 /fr/especies/ pages with hreflang pointing to category hubs | 6 files | 1 | 45 min |
| 10 | Remove duplicate BreadcrumbList from all 50 city pages (script) | 50 files | 1 | 1 hour |
| 11 | Fix es-ES hreflang on all 50 city pages (remove or point to /ciudades/) | 50 files | 1 | 1 hour |
| 12 | Add unique content differentiation to /fr/connaissances/especes/ vs /fr/especies/ | 1 file | 1 | 30 min |
| 13 | Add unique content differentiation to /fr/connaissances/livraison/ vs /fr/livraison/ | 1 file | 1 | 30 min |
| 14 | Create /fr/villes/ cities hub page with links to all 50 cities | 1 new file + 50 breadcrumb updates | 2 | 3 hours |
| 15 | Create /fr/perroquets-qui-parlent/ | 1 new file | 2 | 2 hours |
| 16 | Create /fr/perroquet-pour-famille/ | 1 new file | 2 | 2 hours |
| 17 | Create /fr/perroquet-appartement/ | 1 new file | 2 | 2 hours |
| 18 | Create /fr/petits-perroquets/ | 1 new file | 2 | 2 hours |
| 19 | Create /fr/perroquets-bebes/ | 1 new file | 2 | 2 hours |
| 20 | Update sitemap_fr.xml with all Phase 1-2 changes + new URLs | 1 file | 2 | 30 min |

---

## SECTION 8 — RECOMMENDED ORDER OF IMPLEMENTATION

```
WEEK 1-2:   Phase 1 — All technical fixes (Actions 1-13)
WEEK 3-4:   Phase 2A — Cities hub + top 5 commercial pages (Actions 14-19)
WEEK 5-6:   Phase 2B — Remaining 7 commercial pages
WEEK 7-8:   Phase 3 — Species commercial pages for guide-only species
WEEK 9-12:  Phase 5 — City upgrades + regional pages
WEEK 9-12:  Phase 6A — 20 individual FAQ pages (parallel with Phase 5)
MONTH 4:    Phase 4 — Individual bird profiles (requires bird data)
MONTH 4-5:  Phase 6B — Blog expansion (10 articles/month target)
MONTH 5:    Phase 7 — Internal linking overhaul
MONTH 6:    Phase 8 — Trust & conversion improvements
MONTH 6:    Phase 9 — Schema QA pass
MONTH 6:    Phase 10 — GSC indexing submission
```

---

## COMPETITIVE READINESS ASSESSMENT

| Dimension | Status | Notes |
|-----------|--------|-------|
| Commercial depth | 🟡 Competitive | Good species commercial pages; missing 12 buyer-type pages |
| Topical depth (blog) | 🔴 Critically Weak | 11 vs 188 ES posts; well below any French competitor |
| Species coverage | 🟢 Ahead | 21 /fr/especies/ guides — more than any other language on the site |
| Trust pages | 🟡 Competitive | Delivery, health guarantee, CITES guide all exist |
| Content quality | 🟡 Competitive | French is professionally written; no machine-translation red flags |
| Usability | 🟡 Competitive | Clean nav; email CTA present; mobile works |
| Inventory presentation | 🔴 Critically Weak | No individual bird profiles; /fr/perroquets-disponibles/ has no real listings |
| Local relevance | 🟡 Competitive | 50 city pages; lacks regional pages and cities hub |
| Technical quality | 🟠 Behind | Hreflang errors, duplicate schema, missing schemas on trust pages |
| Brand authority | 🟡 Competitive | Consistent branding; good trust content |

---

*This audit was produced by analysis of the live codebase. No production files were modified.*  
*All recommendations are based on observed code — no facts have been invented.*  
*Await approval before beginning Phase 1 implementation.*
