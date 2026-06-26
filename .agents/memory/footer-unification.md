---
name: footer (and nav) unification for paraisodeaves multilingual site
description: Why shared cross-language components must use absolute URLs, and the single-source-of-truth footer setup.
---

# Multilingual shared components: use ABSOLUTE URLs

The site has ES (`/`), PT (`/pt/`), FR (`/fr/`) sections served by `node server.js` (Netlify-style: tries `.html` then `dir/index.html`).

**Trap (cost real 404s):** a shared footer/nav using **relative** `../../foo/` links breaks because page depth varies. A `/pt/<dir>/index.html` placeholder is only ONE level under `/pt/`, so `../../foo/` resolves to site root `/foo/` (not `/pt/foo/`) → ~20 dead links per page. Always use absolute (`/pt/...`, `/fr/...`, `/...`) hrefs in any component shared across pages of differing depth.

## Canonical footer = single source of truth
`apply-unified-footer.js` exports `{FOOTER_CSS, ES_FOOTER, PT_FOOTER, FR_FOOTER}` and, run directly, rolls the canonical footer onto every `.html` (ES/PT/FR) — replacing the **last** `<footer>` per page (so blog `article-footer` blocks are left intact) and injecting CSS guarded by marker `unified-footer-v2`.
- Structure is identical across languages: brand block + 4 columns (Birds, Accessories, Cities, Info), localized labels only.
- `make-placeholders.js` imports the footer consts from here — do NOT reintroduce a second footer definition anywhere, or footers drift again.
**How to apply:** for any future footer/nav change, edit `apply-unified-footer.js` and re-run it; then crawl every footer href + curl for non-200 before declaring done.
