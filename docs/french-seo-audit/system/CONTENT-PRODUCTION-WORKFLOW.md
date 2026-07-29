# Content Production Workflow — Paraíso de Aves FR

**Version:** 1.0  
**Date:** 2026-07-29  
**Purpose:** Every French page passes through the same 11-stage pipeline. No page skips a stage.

---

## THE PIPELINE

```
STAGE 1 — IDEA / REQUEST
         ↓
STAGE 2 — KEYWORD VALIDATION
         ↓
STAGE 3 — ARCHITECTURE APPROVAL
         ↓
STAGE 4 — BRIEF
         ↓
STAGE 5 — WRITING / GENERATION
         ↓
STAGE 6 — SEO REVIEW
         ↓
STAGE 7 — SCHEMA BUILD + VALIDATION
         ↓
STAGE 8 — INTERNAL LINK AUDIT
         ↓
STAGE 9 — QA CHECKLIST
         ↓
STAGE 10 — PUBLICATION
         ↓
STAGE 11 — INDEX MONITORING + PERFORMANCE REVIEW
```

---

## STAGE 1 — IDEA / REQUEST

### Trigger types
- **Roadmap pull:** Item from AUTHORITY-GROWTH-ROADMAP.md moved to "In Progress"
- **Cluster gap:** TOPICAL-AUTHORITY-SCORES.md identifies a missing cluster page
- **Competitor gap:** New query identified that a competitor is ranking for
- **Data signal:** Search Console shows impression volume for an unserved query

### Inputs required before moving to Stage 2
- Proposed URL (slug)
- Page type (commercial / species / city / blog / knowledge)
- Originating topical silo (buying / species / behaviour / health / etc.)
- Requestor + date

### Output: `page-request-[slug].md` filed in `/docs/pipeline/requests/`

---

## STAGE 2 — KEYWORD VALIDATION

### Process
1. **Head term check:** Confirm the primary keyword has measurable search volume (Google Keyword Planner, Ahrefs, or Search Console data)
2. **Intent check:** Confirm intent matches page type (informational → knowledge/blog; commercial investigation → price page; transactional → commercial page)
3. **Cannibalisation check:** Confirm no existing FR page already targets this exact keyword
4. **SERP analysis:** Check what currently ranks for the primary keyword — understand what depth and format is needed to compete

### Cannibalisation check procedure
```bash
grep -r "[primary keyword]" fr/ --include="*.html" -l
```
If 2+ pages contain the keyword prominently → consolidation decision required before proceeding.

### Keyword validation output

Fill into page-request file:
```
Primary keyword:     [keyword]
Monthly volume:      [est.]
Current ranking:     [none / position X on page Y]
SERP format:         [standard / FAQs / HowTo / featured snippet]
Cannibalisation:     [none / consolidation required: [urls]]
Approved:            [YES / NO + reason]
```

### Gate: Do not proceed to Stage 3 if cannibalisation unresolved or volume < 100/mo for new page.

---

## STAGE 3 — ARCHITECTURE APPROVAL

### Process
1. Confirm the URL fits the site URL structure convention
2. Confirm the page's position in the silo hierarchy
3. Confirm parent page exists (or is being built in the same sprint)
4. Define ≥ 5 internal pages that will link TO this new page
5. Define ≥ 5 internal pages this new page will link TO
6. Confirm schema types required
7. Confirm CTA destinations

### URL convention check
```
/fr/[silo-category]/[specific-slug]/   ← knowledge/cluster
/fr/prix-[species]/                    ← price pages
/fr/perroquets-a-vendre-[ville]/       ← city pages
/fr/perroquets-disponibles/[ref]/      ← bird profiles
/fr/blog/[article-slug]/               ← blog
/fr/[commercial-slug]/                 ← commercial (top-level)
```

### Architecture output (added to page-request file):
```
URL:                 /fr/[slug]/
Parent hub:          /fr/[hub-slug]/
Silo:                [silo name]
Schema types:        [WebPage, Article, FAQPage, ...]
Pages that will link HERE: [5+ URLs]
Pages this will link TO:   [5+ URLs]
CTA destinations:    [/fr/perroquets-disponibles/, /fr/contact/]
Approved:            [YES / NO + reason]
```

### Gate: Architecture must be approved before writing begins.

---

## STAGE 4 — BRIEF

### Brief template (file: `/docs/pipeline/briefs/brief-[slug].md`)

```markdown
# Brief: [Page Title]

## Target URL
/fr/[slug]/

## Page Type
[commercial / species / city / blog / knowledge]

## Primary Keyword
[keyword] · est. [X] searches/month

## Secondary Keywords (2–4)
- [keyword 2]
- [keyword 3]

## Search Intent
[Describe what the user wants to know/do]

## Buyer Journey Stage
[Awareness / Consideration / Decision]

## Minimum Word Count
[Per SEO-PRODUCTION-STANDARDS.md for this page type]

## Required Sections (H2s)
1. [H2 title]
2. [H2 title]
...

## Required Schema
- WebPage
- BreadcrumbList
- FAQPage (min [X] Q&As)
- [Additional types]

## FAQ Topics (min [X] questions to address)
- Q: [Question]
- Q: [Question]
...

## Internal Links OUT (mandatory)
- /fr/perroquets-disponibles/ (anchor: [anchor text])
- /fr/contact/
- [other required outbound links]

## Internal Links IN (pages to update after publication)
- /fr/[page-to-update]/ → add link with anchor: [anchor text]

## CTAs
- Hero CTA: [button text] → [destination]
- Mid-article CTA: [button text] → [destination]
- Bottom CTA: [button text] → [destination]

## Trust Elements Required
- [ ] CITES documentation block
- [ ] Trust block (CITES + vet + delivery)
- [ ] "L'avis de l'éleveur" box
- [ ] External citation: [source]

## Images Required
- Hero: [description] | Alt: [alt text]
- [Additional images]

## E-E-A-T Notes
[Any specific experience signals, citations, or expertise demonstrations needed]
```

### Gate: Brief must be complete before writing begins.

---

## STAGE 5 — WRITING / GENERATION

### For AI-generated content (generator scripts)
- Script reads the brief and produces the HTML
- Script must follow PAGE-TEMPLATES.md structure exactly
- Script must fill all `[placeholder]` tokens before output
- Script validates word count before writing file

### For manually written content
- Writer follows brief exactly
- Writer uses PAGE-TEMPLATES.md as HTML scaffold
- Writer does not add schema — that happens in Stage 7

### Output: `/fr/[slug]/index.html` — draft status

---

## STAGE 6 — SEO REVIEW

### Checklist
- [ ] H1 contains primary keyword
- [ ] Primary keyword in first 100 words
- [ ] Title tag 50–60 chars, contains keyword + brand
- [ ] Meta description 145–160 chars, contains CTA word + keyword
- [ ] Keyword density natural (not forced) — target 1–2%
- [ ] All required H2 sections present (from brief)
- [ ] Minimum word count met
- [ ] No keyword cannibalisation (recheck)
- [ ] Internal links OUT as specified in brief
- [ ] Content tone: professional, first-person where specified, no generic AI tell
- [ ] FAQ answers are ≥ 50 words each (for schema value)

### Output: SEO notes added to brief file. Revision requested if needed.

### Gate: SEO review approval required before Stage 7.

---

## STAGE 7 — SCHEMA BUILD + VALIDATION

### Process
1. Identify required schema types from brief
2. Write JSON-LD blocks following PAGE-TEMPLATES.md schema patterns
3. Add to `<head>` of draft HTML
4. Test in Google's Rich Results Test: `search.google.com/test/rich-results`
5. Test in Schema.org Validator: `validator.schema.org`
6. Fix any errors

### Schema validation requirements
- Zero errors (warnings acceptable)
- BreadcrumbList validated ✅
- FAQPage validated ✅ (Q&As appear in preview)
- Product/Offer validated ✅ (price pages)
- Article/BlogPosting validated ✅ (blog/knowledge)

### Gate: Zero schema errors before Stage 8.

---

## STAGE 8 — INTERNAL LINK AUDIT

### Process
1. Add all internal links OUT as specified in brief
2. Update all pages listed in brief's "Internal Links IN" section
3. Run orphan check: confirm new page will receive ≥ 3 inbound links
4. Run `node scripts/qa-check.js fr/[slug]/index.html` — link checks only

### Commands
```bash
# Check new page is not orphaned:
grep -r "/fr/[slug]/" fr/ --include="*.html" -l | wc -l
# Must return ≥ 3

# Verify all outbound links in new page return 200:
node scripts/link-checker.js fr/[slug]/index.html
```

### Gate: Page must not be an orphan (≥ 3 inbound links). No broken links.

---

## STAGE 9 — QA CHECKLIST

### Process
1. Run automated QA: `node scripts/qa-check.js fr/[slug]/index.html`
2. Run Universal checklist manually (U-T01 through U-M05)
3. Run page-type checklist (Checklist 1–7 from QA-CHECKLISTS.md)
4. All BLOCK items must pass
5. Log result in `/docs/qa-log.csv`

### Required before sign-off
- Automated QA: EXIT 0
- Manual checklist: all BLOCK items ✅
- Reviewer signature + date

### Gate: Full QA pass (exit 0 + all manual blocks clear).

---

## STAGE 10 — PUBLICATION

### Pre-publication actions (in order)
1. Move file from draft to production location (if using draft folder)
2. Add URL to appropriate sitemap (sitemap_fr.xml or sitemap_en.xml)
3. Add URL to _redirects if a clean-URL rule is needed
4. Verify sitemap_index.xml references the correct split sitemap
5. Add page to internal navigation if it is a hub or pillar page

### Sitemap addition
```xml
<url>
  <loc>https://www.paraisodeaves.com/fr/[slug]/</loc>
  <lastmod>[YYYY-MM-DD]</lastmod>
  <changefreq>monthly</changefreq>
  <priority>[0.9 commercial / 0.8 species / 0.75 cluster / 0.6 city / 0.7 blog]</priority>
</url>
```

### Post-publication verification (within 1 hour)
- [ ] Page loads at intended URL
- [ ] Canonical matches intended URL
- [ ] Sitemap updated and accessible
- [ ] Google Search Console: Request Indexing (optional but recommended for high-priority pages)
- [ ] Internal link updates live (spot-check 2 linking pages)

---

## STAGE 11 — INDEX MONITORING + PERFORMANCE REVIEW

### Week 1–4 (indexing phase)
- Monitor Google Search Console → Coverage → check page is indexed within 14 days
- If not indexed at day 14: check for crawl errors, noindex tags, canonicalisation issues

### Month 1–3 (ranking phase)
Review in Search Console:
- Impressions for target keyword
- Average position for target keyword
- CTR (target > 3% for informational, > 5% for commercial)

### Month 3+ (optimisation phase)
If page ranks but CTR is below target:
- A/B test title tag (update in HTML + sitemap)
- Expand FAQ section
- Add more internal links to the page

If page is indexed but not ranking (position > 50):
- Increase inbound links
- Expand word count
- Add missing semantic entities

### Performance log entry (monthly, in `/docs/pipeline/performance/[YYYY-MM].md`)
```
Page: /fr/[slug]/
Published: YYYY-MM-DD
Indexed by: YYYY-MM-DD (X days)
Primary keyword position (month 1): [position or not ranking]
Primary keyword position (month 3): [position]
Impressions (month 3): [X]
CTR (month 3): [X%]
Next action: [none / expand content / build links / update title]
```

---

## SPRINT PLANNING FORMAT

Each build sprint covers a defined cluster or page batch.

```markdown
# Sprint [N]: [Cluster name]
Dates: [Start] → [End]
Owner: [Name]

## Pages in this sprint
| URL | Type | Brief | Writing | SEO | Schema | QA | Published |
|-----|------|-------|---------|-----|--------|-----|-----------|
| /fr/prix-amazone/ | Commercial | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| /fr/prix-ara-bleu-jaune/ | Commercial | ✅ | ✅ | ✅ | ✅ | ⬜ | ⬜ |
...

## Inbound link updates required after publication
- /fr/amazone-front-bleu/ → add link to /fr/prix-amazone/
...

## Sitemap updates
- Add [N] URLs to sitemap_fr.xml

## QA log entries
[Filed in /docs/qa-log.csv]
```
