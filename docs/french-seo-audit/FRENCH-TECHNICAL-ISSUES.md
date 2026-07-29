# FRENCH-TECHNICAL-ISSUES.md
## Paraíso de Aves — French Section Technical SEO Audit
**Audit date:** 2026-07-29  
**Scope:** All 145 HTML files under /fr/  
**Status:** READ-ONLY. No production files changed.

---

## SEVERITY LEGEND
- 🔴 **CRITICAL** — direct negative ranking or indexation impact
- 🟠 **HIGH** — significant SEO loss, fix within 2 weeks
- 🟡 **MEDIUM** — cumulative drag, fix within 1 month
- 🟢 **LOW** — improvement opportunity, fix when convenient

---

## 1. HREFLANG ISSUES

### 1.1 🔴 All 50 FR city pages — es-ES hreflang points to /ciudades/ hub
**Affected URLs:** All `/fr/perroquets-a-vendre-{city}/` (50 pages)  
**Affected file:** All `/fr/perroquets-a-vendre-*/index.html`  
**Severity:** HIGH  
**Reason:** Every French city page has `hreflang="es-ES"` pointing to `https://www.paraisodeaves.com/ciudades/` (the ES cities hub), not a specific ES city equivalent. Google treats this as a valid hreflang pair but it signals that all 50 French city pages are "equivalent" to the same single ES page, which is incorrect and confuses the language graph.  
**Fix:** Either (a) add individual ES city pages and update each FR hreflang to point to the equivalent ES city, or (b) remove the es-ES hreflang from FR city pages entirely (use only fr-FR + x-default). Option (b) is the safer short-term fix.

### 1.2 🟠 /fr/ara-catalina/ — Missing pt-PT hreflang
**Affected URL:** `/fr/ara-catalina/`  
**Affected file:** `fr/ara-catalina/index.html`  
**Severity:** HIGH  
**Reason:** Only 3 hreflang tags (fr-FR, es-ES, x-default). No pt-PT counterpart declared. Breaks the symmetric hreflang graph for this page.  
**Fix:** Add `<link rel="alternate" hreflang="pt-PT" href="https://www.paraisodeaves.com/pt/arara-catalina/" />` if a PT equivalent exists, or omit pt-PT consistently if no PT page exists for Ara Catalina.

### 1.3 🟠 /fr/toucans/ — Missing pt-PT hreflang
**Affected URL:** `/fr/toucans/`  
**Affected file:** `fr/toucans/index.html`  
**Severity:** HIGH  
**Reason:** Only 3 hreflang tags. No pt-PT. Same asymmetry issue.  
**Fix:** Add pt-PT if `/pt/tucanos/` exists; otherwise remove from hreflang graph.

### 1.4 🟠 Multiple /fr/especies/ pages — hreflang points to category pages, not species pages
**Affected URLs:**
- `/fr/especies/ara-bleu-et-jaune/` — es-ES → `/guacamayos` (category hub)
- `/fr/especies/ara-chloroptere/` — es-ES → `/guacamayos` (no ES equivalent page exists)
- `/fr/especies/ara-macao/` — es-ES → `/guacamayos` (category)
- `/fr/especies/amazone-front-bleu/` — es-ES → `/loro-amazonico` (generic Amazon page, not species guide)
- `/fr/especies/ara-hyacinthe/` — es-ES → `/guia-guacamayo-jacinto` (a blog post, not a species page)
- `/fr/especies/perruche-royale/` — es-ES → `/especies/` (index), pt-PT → `/pt/especies/` (index)

**Severity:** HIGH  
**Reason:** Hreflang should point to the most equivalent page. Pointing to category hubs misrepresents page equivalency and weakens topical signals.  
**Fix:** Update each hreflang to the correct ES/PT equivalent species page URL where it exists. Where no equivalent ES species page exists, either create one or remove the es-ES hreflang tag for that species.

### 1.5 🟡 /fr/a-propos/ and /fr/processus-adoption/ — es-ES/pt-PT hreflang points to homepages
**Affected URLs:** `/fr/a-propos/`, `/fr/processus-adoption/`  
**Severity:** MEDIUM  
**Reason:** `hreflang="es-ES"` → `/` and `hreflang="pt-PT"` → `/pt/`. These pages have ES/PT equivalents (`/nosotros/`, `/pt/sobre-nos/` if they exist). Pointing to homepages dilutes page-level signals.  
**Fix:** Point to the closest ES/PT equivalent page, or if none exists remove those hreflang declarations.

---

## 2. STRUCTURED DATA ISSUES

### 2.1 🟠 /fr/connaissances/ hub — Missing H1 and no structured data
**Affected URL:** `/fr/connaissances/`  
**Affected file:** `fr/connaissances/index.html`  
**Severity:** HIGH  
**Reason:** The knowledge hub has no visible H1 tag and no schema markup. Every other hub page on the site has at minimum WebPage + BreadcrumbList schema. Missing H1 means no primary on-page signal for the page's topic.  
**Fix:** Add H1 (e.g. "Centre de Connaissances sur les Perroquets") and add WebPage + BreadcrumbList schema.

### 2.2 🟠 /fr/a-propos/ and /fr/processus-adoption/ — No structured data
**Affected URLs:** `/fr/a-propos/`, `/fr/processus-adoption/`  
**Affected files:** `fr/a-propos/index.html`, `fr/processus-adoption/index.html`  
**Severity:** MEDIUM  
**Reason:** Both pages serve as trust signals (About Us, Adoption Process) but have zero structured data. At minimum WebPage + BreadcrumbList should be present.  
**Fix:** Add `{"@type":"WebPage"}` + `{"@type":"BreadcrumbList"}` to each page.

### 2.3 🟡 All 50 FR city pages — Duplicate BreadcrumbList schema
**Affected URLs:** All `/fr/perroquets-a-vendre-{city}/`  
**Affected files:** All city `/index.html` files  
**Severity:** MEDIUM  
**Reason:** Each city page emits two separate `BreadcrumbList` JSON-LD blocks with the same itemListElement content. Duplicate structured data blocks are flagged as errors in Google's Rich Results Test and can cause unpredictable rendering.  
**Fix:** Remove the second (duplicate) BreadcrumbList block from each city page template.

### 2.4 🟡 /fr/toucans/ — Missing H1 at page level
**Affected URL:** `/fr/toucans/`  
**Severity:** MEDIUM  
**Reason:** The `<title>` is correct but the first visible H1 inside the main content reads "Rencontrez Shinda et Daphne" — a brand story hook, not a topical keyword H1. There is no "Toucans" or "Nos Toucans" H1 before it. Googlebot's first H1 signal is the brand narrative, not the topic.  
**Fix:** Add a primary H1 (e.g. "Nos Toucans : Shinda et Daphne") before the introductory content, or change the first H1 to include the word "Toucans."

### 2.5 🟡 /fr/connaissances/faq/ and /fr/faq/ — Potential duplicate FAQ hubs
**Affected URLs:** `/fr/connaissances/faq/`, `/fr/faq/`  
**Severity:** MEDIUM  
**Reason:** Two separate FAQ hub pages exist at different URLs. Without differentiated content, these pages may cannibalise each other for "FAQ perroquets France" queries.  
**Fix:** Differentiate clearly — one should be a general FAQ (buying/adoption focus), the other species-specific — and add cross-links between them.

### 2.6 🟡 /fr/connaissances/livraison/ and /fr/livraison/ — Potential duplicate delivery pages
**Affected URLs:** `/fr/connaissances/livraison/`, `/fr/livraison/`  
**Severity:** MEDIUM  
**Reason:** Two delivery pages exist. Title and H1 are near-identical ("Livraison de Perroquets en France | Service Sécurisé" / "Livraison en France"). Risk of cannibalisation for "livraison perroquets France" queries.  
**Fix:** Designate one as canonical commercial page, the other as a knowledge/process guide. Differentiate titles, H1, and content focus.

---

## 3. SITEMAP ISSUES

### 3.1 🟡 /fr/cages-pour-perroquets and /fr/caisses-de-transport — Missing trailing slash in sitemap
**Affected file:** `sitemap_fr.xml`  
**Severity:** LOW  
**Reason:** The sitemap_fr.xml lists these two URLs without trailing slashes (`/fr/cages-pour-perroquets` and `/fr/caisses-de-transport`) while all other FR URLs use trailing slashes. This creates a canonical inconsistency if the server serves both versions.  
**Fix:** Add trailing slashes to these two sitemap entries to match the canonical URL pattern.

### 3.2 🟢 Sitemap count (147) slightly exceeds actual HTML files (145)
**Affected file:** `sitemap_fr.xml`  
**Severity:** LOW  
**Reason:** Two extra sitemap entries (likely the two URLs above without trailing slashes being counted separately). Verify no orphaned sitemap URLs exist.  
**Fix:** Audit the full sitemap_fr.xml against the actual HTML file tree and align.

---

## 4. ON-PAGE SEO ISSUES

### 4.1 🟠 /fr/connaissances/especes/ — Cannibalisation risk with /fr/especies/
**Affected URLs:** `/fr/connaissances/especes/`, `/fr/especies/`  
**Severity:** HIGH  
**Reason:** Two knowledge pages compete for "fiches espèces perroquets" intent. The connaissances/especes page appears to be a curated list while /fr/especies/ is the actual hub. Unless clearly differentiated, Google will pick one and demote the other.  
**Fix:** Make `/fr/connaissances/especes/` an explicitly editorial "choose your species" guide with unique angle (e.g. "how to choose by temperament"), and `/fr/especies/` the pure directory. Add canonical cross-links.

### 4.2 🟡 /fr/blog/prix-perroquet-france/ — Cannibalisation with /fr/connaissances/prix/ and /fr/prix-cacatoes/
**Affected URLs:** `/fr/blog/prix-perroquet-france/`, `/fr/connaissances/prix/`, `/fr/prix-cacatoes/`, `/fr/prix-ara-hyacinthe/`  
**Severity:** MEDIUM  
**Reason:** Four pages all target "prix perroquet France" variations. Without distinct keyword angles, they split authority.  
**Fix:** Assign distinct primary keywords: `/fr/blog/` = general overview/answer content; `/fr/connaissances/prix/` = full buyer guide; `/fr/prix-cacatoes/` = species-specific; `/fr/prix-ara-hyacinthe/` = specific species. Tighten titles and internal links accordingly.

### 4.3 🟡 /fr/especies/caique/ and /fr/especies/caique-ventre-blanc/ — Cannibalisation risk
**Affected URLs:** `/fr/especies/caique/`, `/fr/especies/caique-ventre-blanc/`  
**Severity:** MEDIUM  
**Reason:** Two closely related Caïque pages exist. Caïque à Ventre Blanc is a subspecies; without strongly differentiated content, these pages may split authority.  
**Fix:** Make `/fr/especies/caique/` the hub page with a section on all species/subspecies, and `/fr/especies/caique-ventre-blanc/` a deep-dive sub-species guide linked from the hub. Ensure H1 and intro paragraphs are distinct.

---

## 5. INTERNAL LINKING ISSUES

### 5.1 🟠 All 50 FR city pages — No FR cities hub page
**Severity:** HIGH  
**Reason:** City breadcrumbs link to `/fr/` (homepage) for the "Nos Villes" breadcrumb item. There is no `/fr/villes/` hub page. This means city pages are structurally orphaned from a hub — PageRank flows directly from the homepage rather than through a topical intermediary.  
**Fix:** Create `/fr/villes/` (or `/fr/perroquets-villes-france/`) as a cities hub page. Update breadcrumbs on all 50 city pages to point through it.

### 5.2 🟡 /fr/connaissances/ hub has no breadcrumb
**Severity:** MEDIUM  
**Reason:** The knowledge hub `/fr/connaissances/` has a BreadcrumbList schema but no visible breadcrumb navigation rendered on the page, and the H1 is missing.  
**Fix:** Add visible breadcrumb (`Accueil > Centre de Connaissances`) and add H1.

---

## 6. CONTENT QUALITY FLAGS

### 6.1 🟡 /fr/toucans/ — H1 mismatch
See §4 Technical above. Page H1 is "Rencontrez Shinda et Daphne" rather than a keyword H1. Title says "Toucans" but body H1 says the birds' names.

### 6.2 🟡 /fr/a-propos/ — Minimal content, no schema
Page is thin (~300 lines) with no structured data and hreflang pointing to root. Strengthen with Organization schema.

### 6.3 🟢 Several /fr/especies/ pages have only 2 images
Pages like `/fr/especies/amazone-aile-orange/`, `/fr/especies/perruche-a-collier/` have only 2 `<img>` tags. Equivalent ES species pages tend to be richer visually. Adding 3-5 images would improve engagement signals.

---

## SUMMARY TABLE

| # | Issue | Affected Pages | Severity | Effort |
|---|-------|---------------|----------|--------|
| 1.1 | City pages es-ES hreflang → /ciudades/ | 50 | 🟠 HIGH | Medium |
| 1.2 | /fr/ara-catalina/ missing pt-PT | 1 | 🟠 HIGH | Low |
| 1.3 | /fr/toucans/ missing pt-PT | 1 | 🟠 HIGH | Low |
| 1.4 | /fr/especies/ hreflang → category not species | 6 | 🟠 HIGH | Medium |
| 1.5 | /fr/a-propos/ + /fr/processus-adoption/ hreflang → homepages | 2 | 🟡 MEDIUM | Low |
| 2.1 | /fr/connaissances/ missing H1 + no schema | 1 | 🟠 HIGH | Low |
| 2.2 | /fr/a-propos/ + /fr/processus-adoption/ no schema | 2 | 🟡 MEDIUM | Low |
| 2.3 | Duplicate BreadcrumbList on all city pages | 50 | 🟡 MEDIUM | Medium |
| 2.4 | /fr/toucans/ missing keyword H1 | 1 | 🟡 MEDIUM | Low |
| 2.5 | /fr/faq/ + /fr/connaissances/faq/ duplication | 2 | 🟡 MEDIUM | Low |
| 2.6 | /fr/livraison/ + /fr/connaissances/livraison/ duplication | 2 | 🟡 MEDIUM | Low |
| 3.1 | Two sitemap URLs missing trailing slash | 2 | 🟢 LOW | Low |
| 4.1 | /fr/connaissances/especes/ vs /fr/especies/ cannibalisation | 2 | 🟠 HIGH | Low |
| 4.2 | Prix page cannibalisation (4 pages) | 4 | 🟡 MEDIUM | Low |
| 4.3 | Caïque / Caïque à Ventre Blanc cannibalisation | 2 | 🟡 MEDIUM | Low |
| 5.1 | No FR cities hub page | 50 | 🟠 HIGH | High |
| 5.2 | /fr/connaissances/ no visible breadcrumb | 1 | 🟡 MEDIUM | Low |
