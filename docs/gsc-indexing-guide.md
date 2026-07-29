# Google Search Console — Indexing Guide
**paraisodeaves.com · Updated 2026-07-29**

This guide covers every manual step needed to get all PT, FR, EN, and species pages submitted to Google for indexing.

---

## 1. Ping Bing with All Sitemaps (automated)

Run once from the project root:

```bash
node ping-sitemaps.js
```

This pings Bing's active sitemap endpoint for every sitemap file and prints the Google manual-submission links.

---

## 2. Submit Sitemaps in GSC — Main Property

**Property:** `sc-domain:paraisodeaves.com` (domain-level property)

1. Go to [GSC → Sitemaps](https://search.google.com/search-console/sitemaps?resource_id=sc-domain%3Aparaisodeaves.com)
2. Submit each of the following (one at a time, paste the filename and click **Submit**):

| File | Contents |
|------|----------|
| `sitemap_index.xml` | Index of all split sitemaps (submit this first) |
| `sitemap_main.xml` | ES core pages (~115 URLs) |
| `sitemap_blog.xml` | ES blog posts (~226 URLs) |
| `sitemap_cities.xml` | ES city pages (~60 URLs) |
| `sitemap_species.xml` | Species pages ES/PT/FR (~36 URLs) |
| `sitemap_es_especies.xml` | ES /es/especies/ category pages (~25 URLs) |
| `sitemap_fr.xml` | FR pages (~147 URLs) |
| `sitemap_pt.xml` | PT pages (~118 URLs) |
| `sitemap_accessories.xml` | Accessory pages (~22 URLs) |
| `sitemap_en.xml` | EN pages (~149 URLs) |

> If a sitemap was previously submitted, click it → **Resubmit** to refresh.

---

## 3. Set Up the Portugal URL-Prefix Property

Google uses separate properties to surface country-specific data in GSC.

1. In GSC, click **+ Add property** (top-left dropdown)
2. Choose **URL prefix**
3. Enter: `https://www.paraisodeaves.com/pt/`
4. Verify with the **HTML tag method**:
   - Copy the meta tag GSC provides (e.g. `<meta name="google-site-verification" content="XXXX">`)
   - Add it to `pt/index.html` inside `<head>` (alongside the existing verification tag)
   - Click **Verify** in GSC
5. Once verified, go to **Sitemaps** inside the `/pt/` property and submit:
   - `https://www.paraisodeaves.com/sitemap_pt.xml`

---

## 4. Set Up the English URL-Prefix Property (if /en/ is live)

1. Add property: `https://www.paraisodeaves.com/en/`
2. Verify via HTML tag → add to `en/index.html`
3. Submit: `https://www.paraisodeaves.com/sitemap_en.xml`

---

## 5. Request Indexing for Priority URLs

Use **URL Inspection** (`i` shortcut in GSC) to manually request indexing for the highest-value new pages. Do these first — they take 1–2 days vs. weeks for crawl discovery:

### Priority 1 — Money pages (submit immediately)
```
https://www.paraisodeaves.com/en/
https://www.paraisodeaves.com/en/available-birds/
https://www.paraisodeaves.com/en/delivery/
https://www.paraisodeaves.com/pt/
https://www.paraisodeaves.com/pt/aves-disponiveis/
https://www.paraisodeaves.com/fr/
https://www.paraisodeaves.com/fr/oiseaux-disponibles/
```

### Priority 2 — Species pages (PT + FR)
```
https://www.paraisodeaves.com/pt/especies/guacamayo-jacinto/
https://www.paraisodeaves.com/pt/especies/loro-gris-africano/
https://www.paraisodeaves.com/pt/especies/cacatua/
https://www.paraisodeaves.com/fr/especies/ara-hyacinthe/
https://www.paraisodeaves.com/fr/especies/perroquet-gris/
https://www.paraisodeaves.com/fr/especies/cacatoes/
```

### Priority 3 — EN species + knowledge hub
```
https://www.paraisodeaves.com/en/species/hyacinth-macaw/
https://www.paraisodeaves.com/en/species/african-grey/
https://www.paraisodeaves.com/en/knowledge/
https://www.paraisodeaves.com/en/knowledge/buying-a-parrot-in-the-uk/
```

### Priority 4 — ES especies category pages
```
https://www.paraisodeaves.com/es/especies/
https://www.paraisodeaves.com/es/especies/guacamayo-jacinto/
https://www.paraisodeaves.com/es/especies/loro-gris-africano/
```

> GSC allows ~10 manual "Request Indexing" clicks per day per property. Spread across 2–3 days.

---

## 6. Existing GSC Tags

Both verification tags are already in all page `<head>` sections:

```
8Du7IU5_y0w0vZeaz0bjDdLNdbzb35CubsG1YKISK8c
rEssv_QHGO0TDZMwuv94A5v-LQM4OkXtuffGFAbcRq4
```

No changes needed for the main domain property.

---

## 7. Baseline & Tracking

| Metric | Value (Apr 2026 baseline) |
|--------|--------------------------|
| Clicks | 108 |
| Impressions | 2,300 |
| CTR | 4.7% |
| Position | 14.2 |

After submitting sitemaps, check back in GSC in 2–4 weeks:
- **Coverage** report → confirm new URLs move from "Discovered – currently not indexed" → "Indexed"
- **Performance** report → filter by country (Portugal, France, UK, Ireland) to track new language sections

---

## 8. Repeat Schedule

| Trigger | Action |
|---------|--------|
| New batch of pages generated | Run `node ping-sitemaps.js`, then resubmit `sitemap_index.xml` in GSC |
| Major content update | Bump `<lastmod>` in relevant sitemap file, resubmit that file |
| Monthly | Check Coverage report for "Excluded" URLs and request indexing for any stuck pages |
