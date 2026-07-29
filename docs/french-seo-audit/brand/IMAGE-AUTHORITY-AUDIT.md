# Image Authority Audit — Paraíso de Aves FR

**Date:** 2026-07-29  
**Role:** Technical SEO Architect + Brand Strategist  
**Scope:** All imagery across the French section

---

## EXECUTIVE SUMMARY

Photography is the most powerful trust signal on a premium animal breeder website. A buyer spending €3,000–€20,000 on a living animal cannot touch or see the bird before purchasing. The photos ARE the product until delivery.

The site currently has meaningful gallery content across 12 gallery categories. The critical issue is not volume — it is consistency, individual-bird specificity, and the absence of images that answer the buyer's specific question: "What does my bird look like right now?"

---

## 1. IMAGE FORMAT AUDIT

### WebP / AVIF status

The site has been built with multi-format awareness (referenced in memory: images in images/catalina-macaw/ have WebP + AVIF versions). For the full FR section:

**Expected pattern (from codebase architecture):**
- `.jpg` primary + `.webp` optimised + potentially `.avif` for newest additions
- `<picture>` elements with `<source type="image/avif">`, `<source type="image/webp">`, `<img>` fallback

**Action required:** Verify all image directories maintain the jpg/webp/avif triad. Pages built in early phases may have jpg-only images.

**Impact:** WebP averages 25–35% smaller than equivalent JPEG at same quality. AVIF averages 45–55% smaller. Core Web Vitals (LCP) directly impacted by image format and size.

### Recommended image specifications

| Use case | Format | Max size | Dimensions |
|----------|--------|---------|-----------|
| Hero background | WebP + AVIF | 150KB | 1440×900 |
| Species card | WebP + AVIF | 60KB | 800×600 |
| Gallery thumbnail | WebP + AVIF | 30KB | 600×450 |
| Gallery full | WebP + AVIF | 200KB | 1600×1200 |
| Individual bird card | WebP + AVIF | 80KB | 800×800 (square) |
| Blog header | WebP + AVIF | 80KB | 1200×630 |

---

## 2. ALT TEXT AUDIT

### Current patterns (assessed from code structure)

Pages built in earlier phases tend to use:
- Alt text that matches the filename ("gris-du-gabon-1.jpg" → alt="gris du gabon 1") ❌
- Generic species name only ("alt='Gris du Gabon'") ⚠️
- No alt text on decorative/icon images (acceptable with `alt=""`) ✅

Pages built in Phase 7+ (EN) and recent FR phases tend to use:
- Descriptive alt text with context ✅

### Ideal alt text pattern

```html
<!-- Bad -->
<img src="gris-du-gabon-3.webp" alt="perroquet">

<!-- Acceptable -->
<img src="gris-du-gabon-3.webp" alt="Gris du Gabon">

<!-- Good (SEO + accessibility) -->
<img src="gris-du-gabon-3.webp" alt="Gris du Gabon élevé à la main — Paraíso de Aves">

<!-- Best (contextual) -->
<img src="gris-du-gabon-disponible-2024.webp" 
     alt="Perroquet Gris du Gabon mâle, élevé à la main, disponible à l'adoption — Paraíso de Aves, Llíria">
```

### Alt text standards for each image type

| Image type | Alt text formula |
|-----------|-----------------|
| Species hero | "[Common name] — élevé à la main par Paraíso de Aves" |
| Species card | "[Common name] ([Scientific name]) disponible" |
| Available bird | "[Species] [sex], [year], élevé à la main — [status]" |
| Gallery bird | "[Species] dans notre élevage à Llíria, Valence" |
| Facility photo | "Élevage Paraíso de Aves — installations certifiées CITES" |
| Process photo | "Élevage à la main — perroquet [species] [age]" |
| Logo | "Paraíso de Aves — Éleveur de perroquets CITES" |

---

## 3. IMAGE QUALITY & SPECIES ACCURACY

### Gallery categories (12 existing)
Based on the codebase: galerie/ includes: aras, amazones, cacatoes, conures, disponibles, eclectus, gris, installations, jeunes, toucans + others

### Quality issues to verify

**IA-Q01 — Species accuracy**  
Every image on a species page must show that exact species. A common error is using a related species photo (e.g., Ara Chloroptère instead of Ara Macao). Google's Vision AI can detect species — mislabelled images undermine entity authority.

**IA-Q02 — Photography style consistency**  
Premium breeders use a consistent photographic style: natural light, neutral or natural backgrounds, bird as the clear subject. Review all gallery images for:
- Cluttered backgrounds
- Poor white balance (orange or green casts)
- Out-of-focus main subject
- Mismatched aspect ratios in the same gallery

**IA-Q03 — Thumbnail crop quality**  
Gallery thumbnail crops should show the bird's face/head prominently. Thumbnails that show mostly background, partial wing, or the wrong end of the bird reduce engagement.

---

## 4. MISSING PHOTOGRAPHY (HIGH IMPACT)

### Individual bird photos (CRITICAL GAP)

The available birds page shows bird cards but without individual photos of specific available birds. This is the most significant photography gap on the site.

**What's needed:**
- Per-bird photos showing: face, full body (side profile), and one behaviour/personality shot
- Consistent naming: gris-du-gabon-male-2024-ref001.webp
- Minimum 3 photos per available bird

**SEO note:** Individual bird photos with proper alt text and filename also contribute to Google Image search, which can drive additional pre-purchase discovery.

### Process photography (HIGH E-E-A-T value)

**IA-M01 — Hand-raising process:**
- Feeding baby parrots (spoon/syringe feeding)
- Weaning stages (first solid foods)
- Socialisation (birds on human hands, shoulder)
- First flights / first words (video would be ideal)

**IA-M02 — Veterinary care:**
- Bird being examined by vet (even a carefully framed single image)
- Health certificate being issued
- CITES documentation process

**IA-M03 — Transport preparation:**
- IATA crate being prepared
- Bird inside crate (for reassurance — shows size, comfort)
- Transport packaging (documentation, food, comfort items)

### Facility photography

**IA-M04 — Aviaries and living spaces:**  
Photos of the breeding environment — clean, spacious, enriched — are among the most powerful trust signals for premium buyers.

**IA-M05 — Breeder photo:**  
A photo of the named breeder with birds is essential for the E-E-A-T audit (see EEAT-IMPROVEMENT-PLAN.md). This is also the single most-shared image type on parrot communities.

---

## 5. FILE NAMING CONVENTION

### Current pattern (partial assessment)
Files appear to follow species-name-number.jpg convention in some directories and less organised conventions in others.

### Recommended standard

```
/images/[species-slug]/[species-slug]-[descriptor]-[number].[ext]

Examples:
gris-du-gabon/gris-du-gabon-male-disponible-001.webp
gris-du-gabon/gris-du-gabon-male-disponible-001.jpg
ara-bleu-jaune/ara-bleu-jaune-jeune-elevage-001.webp
installations/elevage-paraisodeaves-salle-001.webp
eleveur/eleveur-paraisodeaves-gris-gabon-001.webp
```

**Why this matters:**
- Google crawls filenames as signals for image content and entity context
- Consistent naming makes `ImageObject` schema more credible
- Alt text and filename alignment strengthens entity signals

---

## 6. RESPONSIVE LOADING

### Required implementation per image

```html
<picture>
  <source type="image/avif" 
    srcset="image-480w.avif 480w, image-800w.avif 800w, image-1200w.avif 1200w"
    sizes="(max-width: 600px) 480px, (max-width: 1000px) 800px, 1200px">
  <source type="image/webp" 
    srcset="image-480w.webp 480w, image-800w.webp 800w, image-1200w.webp 1200w"
    sizes="(max-width: 600px) 480px, (max-width: 1000px) 800px, 1200px">
  <img src="image-800w.jpg" 
    alt="[descriptive alt text]"
    width="800" height="600"
    loading="lazy">
</picture>
```

**Key requirements:**
- Always specify `width` and `height` attributes — prevents CLS (Cumulative Layout Shift)
- `loading="lazy"` on all below-fold images
- `loading="eager"` on hero/LCP image only
- `fetchpriority="high"` on the LCP image

### LCP optimisation

The hero image on each page is the Largest Contentful Paint element. Current risk: if the hero uses a CSS `background-image`, it is not preloadable and delays LCP.

**Fix:** Convert hero backgrounds from CSS `background-image` to `<img>` or `<picture>` elements where possible, OR add `<link rel="preload" as="image">` in `<head>` for the above-fold hero image.

---

## 7. IMAGE AUTHORITY BY PAGE TYPE

| Page type | Current image quality | Gap | Priority |
|-----------|----------------------|-----|---------|
| Homepage hero | ✅ Good | — | Maintain |
| Tier 1 species | ✅ Good | Individual bird photos | Medium |
| Available birds | ❌ Generic cards | Individual bird photos | **P1** |
| Health guarantee | ❌ No images | Vet examination photo | **P1** |
| Breeder/eleveur | ⚠️ Species cards | Breeder portrait | **P1** |
| Processus adoption | ❌ No images | Process photos | P2 |
| Livraison | ❌ No images | Transport/crate photo | P2 |
| City pages | ❌ No images | Delivery-themed visual | P3 |
| Blog posts | ⚠️ Mixed | Species-accurate headers | P2 |
| Cluster pages | ⚠️ Mixed | Species-specific images | P3 |
| Gallery | ✅ Good | Add individual bird gallery | P2 |

---

## 8. IMAGE SEO IMPROVEMENTS

### ImageObject schema
All significant images should have `ImageObject` schema:

```json
{
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "url": "https://www.paraisodeaves.com/images/gris-du-gabon/gris-du-gabon-disponible-001.webp",
  "contentUrl": "https://www.paraisodeaves.com/images/gris-du-gabon/gris-du-gabon-disponible-001.webp",
  "name": "Gris du Gabon élevé à la main — disponible",
  "description": "Perroquet Gris du Gabon mâle, élevé à la main dans notre élevage CITES à Llíria, Valence.",
  "author": { "@id": "https://www.paraisodeaves.com/#org" },
  "copyrightHolder": { "@id": "https://www.paraisodeaves.com/#org" }
}
```

### Image sitemap
An `image_sitemap.xml` would allow Google to discover all gallery and species images via crawl, not just via page load. This is especially valuable for the 12 gallery categories.
