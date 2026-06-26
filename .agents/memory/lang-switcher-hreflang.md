---
name: lang-switcher & hreflang (paraisodeaves)
description: How the ES/PT/FR language switcher MAP and JS hreflang injection work, and the traps to avoid.
---

# Language switcher MAP + hreflang injection

`lang-switcher.js` drives the ES (`/`) ⇄ PT (`/pt/`) ⇄ FR (`/fr/`) language switcher and supplements hreflang. It is a single shared static file included on every page.

## MAP schema is symmetric `[es, pt, fr]`
Each row is `['<es path>', '<pt path>', '<fr path>']`. The resolver indexes by `IDX[currentLang]` for the source column and `IDX[targetLang]` for the destination. Because all three columns are filled, **a single forward row already resolves every direction** (es→pt, fr→es, pt→fr, …).

**Why this matters / the trap:** Do NOT add "reverse rows" that put a `/pt/...` or `/fr/...` path in column 0. They are column-misaligned with the schema, never match as intended (the resolver reads column 0 only for ES sources), and silently break switching — pages fall back to the homepage. If a PT/FR page lacks coverage, add a properly aligned `[es, pt, fr]` row (homepage `/pt/` or `/fr/` is an acceptable filler when no equivalent exists).

## ES has no dedicated contact page
ES contact is a homepage anchor (`index.html` `<section id="contacto">`). The ES contact target in the MAP must be `/#contacto` (or `/`), never `/contacto` / `/contacto.html` — those 404.

## PT blog posts live under `/pt/blog/<slug>`, not `/pt/<slug>`
e.g. `quanto-custa-um-papagaio-em-portugal` and `documentacao-cites-portugal` are `/pt/blog/...`. Verify the actual path before adding MAP rows.

## FR static hreflang is stale → fixed by JS upsert
Most FR pages (`fr/**/index.html`) ship static `es-ES`/`pt-PT` alternates pointing to the **homepages** (`/` and `/pt/`) plus a self `fr-FR`. PT pages, by contrast, have correct specific static es-ES and (usually) no `fr-FR`.

`injectHreflang()` therefore must **upsert** (override existing tags' href via `resolveURL`), not short-circuit when an `fr-FR` tag already exists — otherwise the stale FR alternates are never corrected.

**Why:** real SEO correctness for the FR section depends on this JS upsert since the static tags are wrong at the source. A cleaner long-term fix is to rewrite the static FR hreflang in the HTML files directly (Google prefers static), but that's a larger per-file change.

## Verification approach
Syntax-check with `node --check lang-switcher.js`, then simulate `resolveURL` by extracting the MAP via regex + `eval` in a node one-liner and asserting each direction. Smoke-test live URLs with `node server.js` + curl loop (server tries `.html` then `dir/index.html`, matching Netlify).
