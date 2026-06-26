---
name: lang-switcher & hreflang (paraisodeaves)
description: Durable decisions/traps for the ES/PT/FR language switcher MAP and hreflang injection.
---

# Language switcher MAP + hreflang injection

`lang-switcher.js` drives the ES (`/`) ⇄ PT (`/pt/`) ⇄ FR (`/fr/`) switcher and supplements hreflang. Single shared static file on every page.

## MAP schema is symmetric `[es, pt, fr]` — never add reverse rows
Each row is `['<es path>','<pt path>','<fr path>']`; the resolver reads column 0 only for ES sources. A single forward row already resolves every direction.
**Trap:** putting a `/pt/...` or `/fr/...` path in column 0 ("reverse row") is column-misaligned, never matches, and silently falls back to the homepage. Add a properly aligned `[es,pt,fr]` row instead (homepage filler is OK when no equivalent exists).

## Path gotchas to verify before adding MAP rows
- **ES has no contact page** — ES contact is a homepage anchor; use `/#contacto`, never `/contacto(.html)` (404).
- **PT blog posts live under `/pt/blog/<slug>`**, not `/pt/<slug>`.

## FR static hreflang is stale → must JS-upsert
Most `fr/**/index.html` ship static `es-ES`/`pt-PT` alternates pointing at the homepages. `injectHreflang()` must **upsert** (override existing href via `resolveURL`), not short-circuit when an `fr-FR` tag exists — otherwise stale FR alternates are never corrected.
**Why:** FR SEO correctness depends on the JS upsert since static tags are wrong at source. Cleaner long-term fix: rewrite static FR hreflang in the HTML directly (larger per-file change).
