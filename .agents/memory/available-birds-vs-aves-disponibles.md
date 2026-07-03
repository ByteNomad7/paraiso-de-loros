---
name: available-birds/ vs aves-disponibles/ duplicate hub
description: Two parallel Spanish "available birds" hub pages exist; aves-disponibles/ is canonical, available-birds/ is a legacy duplicate hub (but its species subpages are real and unique).
---

# Two parallel ES hub directories

`/aves-disponibles/` and `/available-birds/` are BOTH real, indexed pages with the same purpose (bird availability hub). `aves-disponibles/` is the one actually linked from hundreds of ES/PT/FR pages (nav, blog, footers) and is treated as canonical.

`/available-birds/index.html` canonicalizes to `/aves-disponibles/` (fixed during GSC audit, 2026-07-03).

**Trap:** `/available-birds/*.html` SPECIES DETAIL pages (cacatua.html, guacamayo-jacinto.html, loro-gris-africano.html, etc.) are NOT duplicates — they are real unique content and stay live at their `/available-birds/` paths. Only the `index.html` hub was consolidated. Don't assume the whole directory is legacy.

**Why:** PT/FR species pages (arara-jacinto, cacatoes-huppe-jaune, etc.) reciprocal hreflang must point to these specific `/available-birds/<species>.html` detail pages, not to the generic root-level money pages (`/guacamayos.html`, `/cacatua.html`) which cover a different, broader topic.
