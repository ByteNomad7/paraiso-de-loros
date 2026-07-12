---
name: Phase 10 Brand Identity
description: New Paraíso de Aves logo, favicon set, colors, and typography applied across all 873 HTML files.
---

## What changed

**Logo file:** `images/logo/paraiso-de-aves-logo.webp` (transparent PNG + AVIF also present)
- Derived from uploaded PNG via ImageMagick white-background removal
- Circular emblem extracted → favicon set (16, 32, 180, 192, 512px)

**Favicon files at root:** favicon.ico, favicon-32.png, favicon-16.png, apple-touch-icon.png, android-chrome-192.png, android-chrome-512.png, site.webmanifest

**Logo replacement patterns (bulk script, 837 pages):**
- Pattern A: `class="brand-logo"` span children → img (152 pages)
- Pattern B: `class="logo"` anchor text → img (181 pages)
- Pattern C: `class="brand"` anchor text → img (300 pages)
- Pattern D: `class="topnav__brand"` anchor text → img (52 pages)
- Pattern E: footer-brand-name span / footer div → img (861 instances)

**Colors (global.css variables + bulk HTML inline replace):**
- #1F3D2B → #1B3D2F (Forest Green)
- #D4A94F → #C9A24B (Premium Gold)
- #E0B75F → #D4A94F (Gold Rich)
- #F8F5F0 → #F8F5ED (Ivory)
- #1A1A1A → #2B2B2B (Dark Charcoal)

**Typography:** Playfair Display added via @import in global.css + CSS rule for h1-h5; all font-family:'Poppins' inline instances replaced with Playfair Display.

**Why:** User uploaded approved horizontal brand logo (African Grey + Blue/Yellow Macaw emblem + wordmark).

**How to apply on new pages:**
- Header img: `<img src="/images/logo/paraiso-de-aves-logo.webp" alt="Paraíso de Aves" width="136" height="68" loading="eager" fetchpriority="high" style="height:68px;width:auto;display:block">`
- Footer img: same src, height:55px
- Schema logo: `https://www.paraisodeaves.com/images/logo/paraiso-de-aves-logo.webp`
