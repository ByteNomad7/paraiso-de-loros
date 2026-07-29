# FRENCH-DOMINANCE-ROADMAP.md
## Paraíso de Aves — French Dominance Roadmap
**Audit date:** 2026-07-29  
**Status:** READ-ONLY. Implementation requires explicit approval per phase.

---

## STRATEGIC OBJECTIVE

Make the French section the site's strongest organic market by:
1. Fixing all technical issues that limit indexation and ranking signals
2. Closing the commercial page gap with targeted money-page creation
3. Expanding species authority beyond what Spanish currently covers
4. Building a 37+ page French FAQ cluster to capture featured snippets
5. Creating a 50+ article blog that surpasses Spanish in informational coverage
6. Restructuring internal links so link equity flows to commercial pages

---

## PHASE 1 — CRITICAL TECHNICAL & INDEXATION FIXES
**Goal:** Remove all barriers to correct indexation and hreflang signals  
**Complexity:** Low–Medium (no new pages; file edits only)  
**Dependencies:** None  
**Risk:** Low — only changes metadata and schema; no content deletion  
**Completion criteria:** No hreflang errors; no duplicate schema; all pages have H1; sitemap clean

### Tasks

| # | Task | Affected Files | SEO Purpose | Effort |
|---|------|---------------|-------------|--------|
| 1.1 | Fix es-ES hreflang on all 50 city pages (change `/ciudades/` → specific city or remove) | 50 city index.html | Fix broken hreflang graph | Medium |
| 1.2 | Add missing pt-PT hreflang to /fr/ara-catalina/ | fr/ara-catalina/index.html | Complete hreflang graph | Low |
| 1.3 | Add missing pt-PT hreflang to /fr/toucans/ | fr/toucans/index.html | Complete hreflang graph | Low |
| 1.4 | Fix 6 /fr/especies/ hreflang tags pointing to category hubs | 6 species index.html | Correct language targeting | Medium |
| 1.5 | Fix /fr/a-propos/ and /fr/processus-adoption/ hreflang (point to nearest ES/PT equiv) | 2 index.html | Correct hreflang | Low |
| 1.6 | Add H1 to /fr/connaissances/ hub | fr/connaissances/index.html | On-page signal | Low |
| 1.7 | Add WebPage + BreadcrumbList schema to /fr/a-propos/ and /fr/processus-adoption/ | 2 index.html | Schema completeness | Low |
| 1.8 | Remove duplicate BreadcrumbList schema from all 50 city pages | 50 city index.html | Fix structured data error | Medium |
| 1.9 | Add keyword H1 to /fr/toucans/ | fr/toucans/index.html | On-page signal | Low |
| 1.10 | Fix trailing slash in sitemap_fr.xml for cages and caisses URLs | sitemap_fr.xml | Sitemap consistency | Low |
| 1.11 | Differentiate /fr/connaissances/especes/ vs /fr/especies/ to prevent cannibalisation | fr/connaissances/especes/index.html | Stop cannibalisation | Low |
| 1.12 | Differentiate /fr/connaissances/livraison/ vs /fr/livraison/ | 1 index.html | Stop cannibalisation | Low |

**Expected SEO impact:** Correct hreflang graph helps Google assign each page to the correct language market. Schema fixes qualify pages for rich results. H1 fixes strengthen topical signals.

---

## PHASE 2 — FRENCH COMMERCIAL MONEY PAGES
**Goal:** Create the highest-value missing buyer-intent pages  
**Complexity:** Medium (new pages with schema, FAQ, internal links)  
**Dependencies:** Phase 1 complete (clean hreflang before adding new pages)  
**Risk:** Low — adding pages does not affect existing rankings  
**Completion criteria:** Each new page has correct canonical, hreflang, FAQPage schema, CTA, and is added to sitemap_fr.xml

### New Pages to Create

| Priority | URL | Target Keyword | Schema | Notes |
|----------|-----|---------------|--------|-------|
| 🔴 1 | /fr/perroquets-qui-parlent/ | perroquet qui parle | WebPage + FAQPage + Product | Highest-volume FR buyer query |
| 🔴 2 | /fr/perroquet-pour-famille/ | perroquet pour famille | WebPage + FAQPage | Decision-making; high CTR |
| 🔴 3 | /fr/perroquet-appartement/ | perroquet appartement | WebPage + FAQPage | Urban France buyers |
| 🔴 4 | /fr/petits-perroquets/ | petit perroquet | CollectionPage + FAQPage | Entry-level buyers |
| 🔴 5 | /fr/perroquets-bebes/ | bébé perroquet | WebPage + FAQPage | Purchase intent; hand-raised angle |
| 🟠 6 | /fr/acheter-cacatoes/ | cacatoès à vendre France | WebPage + Product + FAQPage | Species commercial gap |
| 🟠 7 | /fr/acheter-amazone/ | amazone à vendre France | WebPage + Product + FAQPage | Species commercial gap |
| 🟠 8 | /fr/acheter-conure/ | conure soleil France | WebPage + Product + FAQPage | Species commercial gap |
| 🟠 9 | /fr/prix-gris-du-gabon/ | prix gris du Gabon | Article + FAQPage | Price guide for top species |
| 🟡 10 | /fr/grands-perroquets/ | grand perroquet | CollectionPage + FAQPage | Complement to /fr/petits-perroquets/ |
| 🟡 11 | /fr/perroquets-rares/ | perroquet rare France | WebPage + FAQPage | Premium segment |
| 🟡 12 | /fr/cout-entretien-perroquet/ | entretien perroquet budget | Article + FAQPage | ES equivalent: /cuanto-cuesta-mantener-un-loro/ |

**Cities hub (required for Phase 1 fix):**
| URL | Purpose |
|-----|---------|
| /fr/villes/ | Hub for all 50 city pages; fixes orphan breadcrumb issue |

---

## PHASE 3 — SPECIES LANDING PAGES & COMMERCIAL UPGRADES
**Goal:** Ensure every important species has both a guide page and a commercial landing page  
**Complexity:** Medium  
**Dependencies:** Phase 2 (commercial page patterns established)  
**Risk:** Low  
**Completion criteria:** Every species in the audit's target list has a /fr/especies/ guide + a standalone commercial page

### Species Requiring Standalone Commercial Pages (currently guide-only)

| Species | Current Status | Page to Create | Template Reference |
|---------|---------------|----------------|--------------------|
| Ara Chloroptère | /fr/especies/ara-chloroptere/ only | /fr/ara-chloroptere/ | /fr/ara-macao/ |
| Cacatoès Blanc | /fr/especies/cacatoes-blanc/ only | /fr/acheter-cacatoes/ covers category | Covered by Phase 2 |
| Amazone à Nuque Jaune | /fr/especies/amazone-nuque-jaune/ only | Covered by /fr/acheter-amazone/ | Covered by Phase 2 |
| Conure Soleil | /fr/especies/conure-soleil/ only | Covered by /fr/acheter-conure/ | Covered by Phase 2 |
| Loriquet Arc-en-ciel | /fr/especies/loriquet-arc-en-ciel/ only | /fr/loriquet-arc-en-ciel/ | /fr/eclectus/ |
| Perroquet du Sénégal | /fr/especies/perroquet-du-senegal/ only | /fr/perroquet-du-senegal/ | /fr/pionus/ |
| Grand Alexandre | /fr/especies/grand-alexandre/ only | /fr/grand-alexandre/ | /fr/eclectus/ |

### Species Guides to Upgrade
- Add /fr/especies/ara-catalina/ entry (currently only standalone /fr/ara-catalina/ exists)
- Increase image count to 4-6 per /fr/especies/ page (currently 2 per page)
- Add Product schema to species commercial pages missing it (ara-catalina uses Article not Product)

---

## PHASE 4 — INDIVIDUAL AVAILABLE-BIRD PROFILES
**Goal:** Build dedicated profile pages for each available bird  
**Complexity:** High (content per bird, requires real bird data)  
**Dependencies:** Phase 2-3 (species commercial pages must exist first)  
**Risk:** Medium — requires accurate bird data; do not fabricate  
**Completion criteria:** Each available bird has a dedicated URL, 3+ photos, Product schema, enquiry CTA

### Required Architecture
```
/fr/perroquets-disponibles/
  └── /fr/perroquets-disponibles/{bird-name-id}/
        - Dedicated URL per bird
        - 3+ photos in gallery
        - Species, sex, age, hatch date
        - DNA status
        - Hand-raised status
        - Health info
        - CITES info
        - Personality notes
        - Price on request
        - Enquiry CTA (email)
        - Related birds
        - Product schema with offers
        - OpenGraph metadata
```

### Schema Required Per Profile
```json
{
  "@type": "Product",
  "name": "Ara Bleu et Jaune — Pablo",
  "offers": { "@type": "Offer", "availability": "InStock", "priceSpecification": { "price": "Sur demande" } },
  "image": ["...3+ images..."]
}
```

---

## PHASE 5 — FRANCE CITY PAGES UPGRADE
**Goal:** Upgrade city page quality and create missing regional pages  
**Complexity:** Medium  
**Dependencies:** Phase 1 (hreflang fixes), Phase 2 (cities hub created)  
**Risk:** Low  
**Completion criteria:** Cities hub exists; top 10 city pages have ≥400 words unique content; 4 regional pages created

### Priority City Pages to Upgrade (thin or templated)
Audit the 10 weakest city pages (those with <200 words unique content) and:
- Add city-specific delivery paragraph
- Add local FAQ (e.g. "Combien de temps pour livrer à {city} ?")
- Add LocalBusiness schema with city in areaServed

### Regional Pages to Create (new)
| URL | Target Keyword | Justification |
|-----|---------------|--------------|
| /fr/perroquets-ile-de-france/ | perroquet Île-de-France | Paris region — France's largest urban market |
| /fr/perroquets-provence-alpes-cote-dazur/ | perroquet PACA | Second largest region + Marseille/Nice already have city pages |
| /fr/perroquets-occitanie/ | perroquet Occitanie | Covers Toulouse, Montpellier, Nîmes — already have city pages |
| /fr/perroquets-auvergne-rhone-alpes/ | perroquet Auvergne Rhône-Alpes | Covers Lyon, Grenoble, Clermont-Ferrand |

---

## PHASE 6 — FRENCH KNOWLEDGE HUB EXPANSION
**Goal:** Build the missing knowledge sub-hubs and 37+ individual FAQ pages  
**Complexity:** High (content volume)  
**Dependencies:** Phase 1-3 complete  
**Risk:** Low  
**Completion criteria:** FR connaissances matches ES conocimiento breadth; 20+ individual FAQ pages published

### Missing Knowledge Sub-Hubs (create)
| URL | Topic | ES Equivalent |
|-----|-------|--------------|
| /fr/connaissances/dressage/ | Dresser et éduquer son perroquet | /conocimiento/adiestramiento/ |
| /fr/connaissances/installations/ | Volières et installations | /conocimiento/instalaciones/ |
| /fr/connaissances/elevage/ | Élevage et reproduction | /conocimiento/cria/ |
| /fr/connaissances/debutants/ | Guide pour débutants | /conocimiento/guias-principiantes/ |
| /fr/connaissances/avances/ | Guides avancés | /conocimiento/guias-avanzadas/ |
| /fr/connaissances/voyages/ | Voyager avec son perroquet | /conocimiento/viajes/ |

### Individual FAQ Pages (priority queue — 20 pages Phase 6A)
Pattern: `/fr/faq/{question-slug}/`

| Slug | Question | Cluster |
|------|---------|---------|
| perroquet-manger-avocat | Le perroquet peut-il manger de l'avocat ? | Alimentation |
| perroquet-manger-chocolat | Le perroquet peut-il manger du chocolat ? | Alimentation |
| perroquet-manger-fraise | Le perroquet peut-il manger des fraises ? | Alimentation |
| perroquet-manger-raisin | Le perroquet peut-il manger des raisins ? | Alimentation |
| perroquet-manger-tomate | Le perroquet peut-il manger des tomates ? | Alimentation |
| perroquet-manger-noix | Le perroquet peut-il manger des noix ? | Alimentation |
| perroquet-manger-riz | Le perroquet peut-il manger du riz ? | Alimentation |
| perroquet-manger-banane | Le perroquet peut-il manger des bananes ? | Alimentation |
| perroquet-manger-oeuf | Le perroquet peut-il manger des œufs ? | Alimentation |
| perroquet-manger-mangue | Le perroquet peut-il manger de la mangue ? | Alimentation |
| perroquet-arrache-plumes | Pourquoi mon perroquet arrache-t-il ses plumes ? | Comportement |
| perroquet-crie-beaucoup | Pourquoi mon perroquet crie-t-il autant ? | Comportement |
| combien-dort-perroquet | Combien de temps dort un perroquet ? | Comportement |
| sortir-perroquet-cage | Combien d'heures sortir son perroquet par jour ? | Comportement |
| perroquet-peut-vivre-seul | Un perroquet peut-il vivre seul ? | Comportement |
| perroquet-mord | Pourquoi mon perroquet me mord-il ? | Comportement |
| longévité-perroquet-gris | Combien de temps vit un Gris du Gabon ? | Espèces |
| longévité-ara | Combien de temps vit un ara ? | Espèces |
| perroquet-parler-apprendre | Comment apprendre à parler à son perroquet ? | Comportement |
| choisir-eleveur-perroquet | Comment choisir un éleveur de perroquets sérieux ? | Achat |

---

## PHASE 7 — INTERNAL-LINKING OVERHAUL
**Goal:** Implement the full internal-link architecture from FRENCH-INTERNAL-LINKING-PLAN.md  
**Complexity:** Medium  
**Dependencies:** Phases 2-6 (all new pages must exist before linking to them)  
**Risk:** Low  
**Completion criteria:** All species pages link to commercial pages; all city pages link through /fr/villes/; all blog posts have related article links

### Key Tasks
1. Implement `/fr/villes/` cities hub page and update all 50 city breadcrumbs
2. Add "voir nos perroquets disponibles" CTA to every species guide page
3. Add "lire le guide complet" link from every species commercial page to its /fr/especies/ equivalent
4. Add 2-3 related article links to each of the 11 blog posts
5. Add contextual links from /fr/connaissances/sante/ → /fr/garantie-sante/
6. Add contextual links from /fr/connaissances/alimentation/ → /fr/nourriture-pour-perroquets/
7. Add /fr/toucans/ link from /fr/ homepage and /fr/galerie/toucans/

---

## PHASE 8 — TRUST AND CONVERSION IMPROVEMENTS
**Goal:** Make French visitors confident enough to enquire  
**Complexity:** Low–Medium  
**Dependencies:** Phase 4 (bird profiles needed for full trust picture)  
**Risk:** Low  
**Completion criteria:** CTA visible above fold on all commercial pages; /fr/garantie-sante/ linked from all species pages; /fr/eleveur-perroquets/ strengthened

### Tasks
1. Add Organization schema to /fr/a-propos/ (currently missing)
2. Add testimonials section to /fr/eleveur-perroquets/ (informational, no fabricated reviews)
3. Ensure email CTA button is visible above the fold on all commercial pages
4. Add a "Comment ça marche" (How it works) section to /fr/perroquets-disponibles/
5. Add DNA testing information to species guide pages that reference it
6. Strengthen /fr/garantie-sante/ with more specific guarantee language
7. Add "Nos engagements" trust block to /fr/acheter-perroquet/ (mirrors ES version)

---

## PHASE 9 — PERFORMANCE, ACCESSIBILITY & SCHEMA QA
**Goal:** Resolve cumulative quality signals  
**Complexity:** Medium  
**Dependencies:** Phases 1-8 complete  
**Risk:** Low

### Tasks
1. Run Google Rich Results Test on all FR schema-bearing pages; fix any errors
2. Audit image alt text on all /fr/especies/ pages — ensure alt text is in French and descriptive
3. Verify all FR pages have `width` and `height` attributes on above-fold images
4. Confirm `loading="lazy"` on below-fold images across all 145 FR pages
5. Audit mobile rendering: ensure CTAs are tappable (≥48px) on all commercial pages
6. Verify no FR page has an HTTP (non-HTTPS) asset reference
7. Verify no `www` vs non-`www` inconsistency in FR internal links

---

## PHASE 10 — FINAL INDEXING & SEARCH CONSOLE READINESS
**Goal:** Ensure all new FR pages are crawled, indexed, and tracked  
**Complexity:** Low  
**Dependencies:** All phases complete  
**Risk:** Low

### Tasks
1. Update sitemap_fr.xml with all new URLs from Phases 2-7
2. Ping/resubmit sitemap_fr.xml through Google Search Console
3. Submit new FR URLs individually via GSC URL Inspection for priority pages
4. Set up GSC property for `paraisodeaves.com/fr/` as a URL-prefix property
5. Verify all new pages are listed as "Indexed" in GSC within 4 weeks
6. Set up GSC performance tracking filters for FR keywords separately from ES

---

## PHASE SUMMARY TABLE

| Phase | Name | New Pages | Files Edited | Complexity | Dependency | Priority |
|-------|------|-----------|-------------|------------|------------|---------|
| 1 | Technical & Indexation Fixes | 0 | ~115 | Low | None | 🔴 Do first |
| 2 | Commercial Money Pages | 12 new | sitemap | Medium | Phase 1 | 🔴 Critical |
| 3 | Species Pages & Upgrades | 7 new | ~8 existing | Medium | Phase 2 | 🟠 High |
| 4 | Bird Profiles | ~5-10 | sitemap | High | Phase 2-3 | 🟠 High |
| 5 | City Upgrades & Regional | 4 new, 10 upgrades | ~60 | Medium | Phase 1-2 | 🟡 Medium |
| 6 | Knowledge Hub + FAQs | ~26 new | sitemap | High | Phase 3 | 🟠 High |
| 7 | Internal Linking Overhaul | 0 | ~145 | Medium | Phase 2-6 | 🟠 High |
| 8 | Trust & Conversion | 0 | ~12 | Low-Medium | Phase 4 | 🟡 Medium |
| 9 | Performance & Schema QA | 0 | ~145 | Medium | Phase 1-8 | 🟡 Medium |
| 10 | Indexing & GSC | 0 | sitemap | Low | All | 🟡 Medium |

**Estimated new pages total:** ~50 new pages (12 commercial + 7 species + 4 regional + 1 hub + 20 FAQs + 6 knowledge sub-hubs)
