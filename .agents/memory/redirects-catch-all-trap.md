---
name: _redirects catch-all placement (paraisodeaves)
description: Netlify _redirects processes rules in file order (first match wins); a catch-all placed mid-file silently kills every rule after it.
---

# Catch-all must be the last line

`/* /404.html 404` (or any other catch-all) must be the physically last rule in `_redirects`. Netlify evaluates rules top-to-bottom and stops at the first match, so rules appended after the catch-all never fire — they look correct in the file but are dead in production.

**Why:** found during a GSC audit (2026-07) — ~165 rules (species pages ES/PT/FR, broken-link fixes, blog rewrites, cities/accessories) were sitting after the catch-all and had been silently non-functional since they were added.

**How to apply:** whenever adding new `_redirects` rules, always insert them before the catch-all block, or run a quick line-number check that the catch-all's line number is the true max among all rule lines.
