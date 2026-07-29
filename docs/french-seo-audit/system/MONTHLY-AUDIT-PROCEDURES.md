# Monthly Audit Procedures — Paraíso de Aves FR

**Version:** 1.0  
**Date:** 2026-07-29  
**Schedule:** Run on the first Monday of each month  
**Time required:** ~3 hours total (automated: 30 min, manual: 2.5 hours)  
**Output:** `/docs/reports/monthly-audit-[YYYY-MM].md`

---

## AUDIT CALENDAR

| Audit | Monthly | Quarterly | Tool |
|-------|---------|-----------|------|
| Technical SEO | ✅ | Full crawl | Automated script |
| Schema health | ✅ | Full re-validation | Automated + Rich Results |
| Content quality | ✅ | Full depth review | Automated + manual |
| Internal linking | ✅ | Full graph analysis | Automated |
| Performance (CWV) | ✅ | | PageSpeed Insights |
| Conversion | ✅ | | Manual + GA4 |
| Entity coverage | Monthly | | Dashboard |
| Topical authority | Monthly | | Dashboard |

---

## AUDIT 1 — TECHNICAL SEO

**Time:** ~30 minutes automated

### Run
```bash
node scripts/seo-dashboard.js --audit=technical > docs/reports/technical-[YYYY-MM].html
```

### Manual checks (15 min)
1. **Sitemap integrity**
   - Open /sitemap_index.xml — verify all split sitemaps listed
   - Open each split sitemap — verify lastmod dates updated for recently changed pages
   - Check URL count matches expected page count (±2)
   ```bash
   grep -c "<loc>" fr-sitemap.xml
   find fr/ -name "index.html" | wc -l
   ```

2. **_redirects audit**
   - Verify catch-all `/* → /404.html` is LAST rule
   - Count redirect rules vs expected count
   - Check for any double-redirect chains (A→B→C)
   ```bash
   tail -5 _redirects   # catch-all must be last
   grep -c "^/fr/" _redirects
   ```

3. **Canonical correctness sample**
   Spot-check 10 random FR pages:
   ```bash
   for url in $(shuf -n 10 < docs/fr-urls.txt); do
     grep -o 'rel="canonical"[^>]*' "fr${url}index.html"
   done
   ```
   Flag: any canonical pointing to a different URL than the page URL.

4. **hreflang consistency**
   For 5 random pages, verify:
   - hreflang="fr" points to correct FR URL
   - If ES/PT/EN equivalents exist, they are all cross-referenced symmetrically

5. **HTTPS + mixed content**
   ```bash
   grep -r "http://" fr/ --include="*.html" | grep -v "schema.org\|//fr\|<!--" | wc -l
   ```
   Target: 0 http:// references (excluding schema.org)

### Output format
```markdown
## Technical SEO Audit — [Month YYYY]

### Sitemap
- FR URLs in sitemap: [X]
- HTML files in /fr/: [X]
- Discrepancy: [none / +X in sitemap / -X missing]
- Action: [none / add X URLs / remove X stale URLs]

### _redirects
- Total rules: [X]
- Catch-all position: [last ✅ / NOT LAST 🔴]
- Action: [none / reorder]

### Canonicals (10 sampled)
- Correct: [X/10]
- Issues: [list any problems]

### hreflang (5 sampled)
- Correct: [X/5]
- Issues: [list any problems]

### HTTP references: [X]  Target: 0
```

---

## AUDIT 2 — SCHEMA HEALTH

**Time:** ~45 minutes

### Automated check
```bash
node scripts/schema-audit.js fr/ > docs/reports/schema-[YYYY-MM].json
```

The script:
- Extracts all JSON-LD from all FR HTML files
- Counts pages without any JSON-LD
- Counts pages missing each mandatory schema type by page type
- Identifies duplicate schema blocks on same page
- Identifies schema blocks with no @id (weaker entity signal)

### Manual Rich Results Test (10 pages)
Each month, test 10 FR pages across different page types in Rich Results Test:
- 2 commercial pages (price pages)
- 2 species pages (Tier 1)
- 2 cluster pages (talking or buyer)
- 2 city pages
- 1 blog post
- 1 knowledge page

Record results in audit report. Any FAIL = immediate action.

### Schema health metrics
| Metric | This month | Last month | Trend |
|--------|-----------|-----------|-------|
| Pages with JSON-LD | X% | X% | ↑/↓/→ |
| Pages with FAQPage | X% | X% | |
| Pages with valid Article | X% | X% | |
| Schema errors (RRT) | X | X | |
| Missing ItemList (disponibles) | Yes/No | | |
| Missing Service (cities) | X/50 | | |

---

## AUDIT 3 — CONTENT QUALITY

**Time:** ~30 min automated + 30 min manual

### Automated
```bash
node scripts/content-audit.js fr/ > docs/reports/content-[YYYY-MM].json
```

Checks:
- Word count per page vs floor for its type
- Pages without author attribution
- Pages without date stamp
- Pages with placeholder text (`[` pattern)
- Pages without FAQ section (mandatory types)

### Manual spot-check (5 pages each month — rotate page types)
For each page, score 1–5 on:
- **Depth:** Does it cover the topic completely?
- **Accuracy:** Is all factual information correct?
- **E-E-A-T signals:** Does it demonstrate genuine expertise?
- **Commercial alignment:** Does it support the buying funnel?
- **Freshness:** Does anything need updating?

### Content decay check
Pages published > 12 months ago: check if any facts are stale:
- Price ranges mentioned (update annually)
- CITES status (rare but can change)
- Species availability statements
- Delivery timelines

### Output
```markdown
## Content Quality — [Month YYYY]

### Automated results
- Pages below word count floor: [X] (target: 0)
- Pages without author: [X] (target: 0)
- Pages without date: [X] (target: 0)
- Pages with placeholders: [X] (target: 0)
- Pages without FAQ: [X mandatory type pages] (target: 0)

### Manual spot-check (5 pages)
[Table of scores]

### Decay review
- Pages reviewed: [X] (published > 12 months)
- Updates required: [list]
```

---

## AUDIT 4 — INTERNAL LINKING

**Time:** ~20 min automated

### Automated
```bash
node scripts/link-audit.js fr/ > docs/reports/links-[YYYY-MM].json
```

Reports:
- Orphan pages (< 3 inbound) — list with inbound count
- Pages missing link to /fr/contact/
- Pages missing link to /fr/perroquets-disponibles/
- Broken internal links (404)
- Redirect chains in internal links (links to a URL that 301s elsewhere)

### Manual hub-to-silo check (monthly rotation)
Each month, pick 2 topical silos and verify the complete link chain:
- Pillar hub → all cluster pages ✅
- All cluster pages → pillar hub ✅
- All cluster pages → commercial CTA ✅
- All cluster pages → relevant species page ✅

### Output
```markdown
## Internal Links — [Month YYYY]

### Orphan pages ([X] total)
| URL | Inbound count | Action |
|-----|--------------|--------|
| /fr/[slug]/ | 1 | Add link from [URL] and [URL] |

### Broken links: [X]
### Missing /contact/ links: [X pages]
### Missing /disponibles/ links: [X pages]

### Silo audit this month: [Silo name]
- Hub → clusters: [X/Y complete]
- Clusters → hub: [X/Y complete]
- Clusters → CTA: [X/Y complete]
- Actions: [list gaps]
```

---

## AUDIT 5 — PERFORMANCE (CORE WEB VITALS)

**Time:** ~20 min

### Tools
- PageSpeed Insights: `pagespeed.web.dev`
- Google Search Console → Core Web Vitals report (field data)

### Pages to test monthly (rotate)
- /fr/ (homepage)
- /fr/perroquet-gris-du-gabon/ (flagship species)
- /fr/perroquets-disponibles/ (highest conversion)
- /fr/contact/ (conversion end)
- 1 new page from this month's sprint
- 1 city page (most-traffic city)

### CWV targets
| Metric | Good | Needs improvement | Poor |
|--------|------|------------------|------|
| LCP | < 2.5s | 2.5–4.0s | > 4.0s |
| INP | < 200ms | 200–500ms | > 500ms |
| CLS | < 0.1 | 0.1–0.25 | > 0.25 |

### Output
```markdown
## Performance — [Month YYYY]

| Page | LCP | INP | CLS | Mobile score | Action |
|------|-----|-----|-----|-------------|--------|
| /fr/ | 1.8s 🟢 | 120ms 🟢 | 0.02 🟢 | 91 🟢 | None |
...
```

---

## AUDIT 6 — CONVERSION

**Time:** ~30 min (requires GA4 access)

### GA4 metrics (monthly)

| Metric | Target | Source |
|--------|--------|--------|
| FR organic sessions | +10% MoM | GA4 |
| Contact form submissions | Track + goal | GA4 Events |
| /fr/perroquets-disponibles/ views | Track | GA4 |
| Bounce rate on commercial pages | < 60% | GA4 |
| Avg session duration (commercial) | > 2 min | GA4 |
| Mobile vs desktop conversion | Track split | GA4 |

### Conversion funnel check
Verify funnel completion rates:
```
Landing page sessions
→ Commercial page sessions (%)
→ /fr/perroquets-disponibles/ sessions (%)
→ /fr/contact/ sessions (%)
→ Form submissions (%)
```

### CRO action triggers
| Signal | Threshold | Action |
|--------|-----------|--------|
| Commercial bounce rate | > 70% | Review CTA placement, trust signals |
| Contact page abandonment | > 80% | Review form, post-submit journey |
| disponibles bounce rate | > 75% | Review bird card differentiation |
| Mobile conversion < desktop | > 30% gap | Mobile UX audit |

---

## AUDIT 7 — ENTITY COVERAGE

**Time:** ~15 min (automated dashboard)

### Monthly tracking
Run dashboard and record:
- Topical authority composite score (vs previous month)
- Cluster completion % per silo (vs previous month)
- New entity pages published
- Entity pages with schema vs without schema

### Entity coverage progress table (update monthly)

| Silo | Last month | This month | Pages needed | Progress |
|------|-----------|-----------|-------------|---------|
| Buying | 38% | 42% | 14 | +4% |
| Behaviour | 5% | 5% | 20 | stalled |
...

---

## AUDIT 8 — TOPICAL AUTHORITY

**Time:** ~20 min

### Quarterly SERP position review
Track primary keyword positions (use Search Console or free rank checker):

| Target keyword | Month 1 | Month 3 | Month 6 | Target |
|---------------|---------|---------|---------|--------|
| prix perroquet gris du gabon | [pos] | [pos] | [pos] | Top 5 |
| acheter perroquet france | [pos] | [pos] | [pos] | Top 10 |
| comportement perroquet | [pos] | [pos] | [pos] | Top 20 |
| alimentation perroquet | [pos] | [pos] | [pos] | Top 20 |

### New keywords gained (monthly)
In Search Console: filter by FR section, sort by impressions, identify new queries appearing that weren't present last month. These signal new topical coverage taking hold.

---

## MONTHLY AUDIT REPORT TEMPLATE

File: `/docs/reports/monthly-audit-[YYYY-MM].md`

```markdown
# Monthly SEO Audit — [Month YYYY]
Conducted: [Date] | Reviewer: [Name]

## Headline Metrics
- Technical SEO score: [X/100] → [trend vs last month]
- E-E-A-T score: [X/100] → [trend]
- Conversion score: [X/100] → [trend]
- Topical authority composite: [X/10] → [trend]
- Total FR pages: [X] → [+X this month]

## Immediate Actions Required (🔴)
1. [Issue] — [File/URL] — [Estimated fix time]

## Monitor (🟡)
1. [Issue] — [File/URL] — [Next review date]

## On Track (🟢)
- [Summary of passing areas]

## Sprint recommendation for next month
Priority: [silo name] — [reason] — [page count to build]

## Full audit details
[Link to each sub-audit report file]
```
