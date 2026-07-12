#!/usr/bin/env node
/**
 * audit-hreflang.js
 * ─────────────────
 * Audits hreflang symmetry and correctness across all HTML pages.
 *
 * Checks performed:
 *   1. TARGET_MISSING  – every hreflang href must resolve to a real file in the repo
 *   2. SELF_MISMATCH   – each page with hreflang must declare its own language pointing to itself
 *   3. XDEFAULT_NON_ES – x-default must not point to /pt/ or /fr/ URLs
 *   4. PAIR_BROKEN     – if page A declares "my X-lang equiv is B", then B must declare
 *                        "my A-lang equiv is A"  (Google's symmetric hreflang requirement)
 *                        Only checked when B also carries a hreflang tag for A's language.
 *
 * URL canonicalization applied before every comparison:
 *   • Strip BASE prefix  (https://www.paraisodeaves.com)
 *   • Strip fragment     (#section → removed)
 *   • Strip .html suffix
 *   • Strip trailing slash  (except bare root "/")
 *
 * Exit codes: 0 = clean, 1 = errors found.
 * Usage:  node audit-hreflang.js [--verbose]
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const BASE    = 'https://www.paraisodeaves.com';
const VERBOSE = process.argv.includes('--verbose');

/* ═══════════════════════════════════════════════════════════════════════
   § 1  FILE INVENTORY
   ═══════════════════════════════════════════════════════════════════════ */

/**
 * Canonical path for a file on disk:
 *   index.html                     → /
 *   foo/bar/index.html             → /foo/bar
 *   foo/bar.html                   → /foo/bar
 */
function canonicalForFile(filePath) {
  const fp = filePath.replace(/\\/g, '/').replace(/^\.\//, '');
  if (fp === 'index.html') return '/';
  if (fp.endsWith('/index.html')) return '/' + fp.slice(0, -'/index.html'.length);
  if (fp.endsWith('.html')) return '/' + fp.slice(0, -5);
  return '/' + fp;
}

/**
 * Canonicalize an href or URL path for comparison:
 *   strip BASE, strip #fragment, strip trailing slash, strip .html
 */
function canonical(href) {
  let p = href || '';
  if (p.startsWith(BASE)) p = p.slice(BASE.length);
  const hash = p.indexOf('#');
  if (hash !== -1) p = p.slice(0, hash);
  if (p.endsWith('/') && p !== '/') p = p.slice(0, -1);
  if (p.endsWith('.html')) p = p.slice(0, -5);
  return p || '/';
}

/** Walk the repo for HTML files (skip hidden dirs and node_modules). */
function collectHtmlFiles(root) {
  const out = [];
  function walk(dir) {
    let entries;
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); }
    catch { return; }
    for (const e of entries) {
      if (e.name.startsWith('.') || e.name === 'node_modules') continue;
      const full = path.join(dir, e.name);
      if (e.isDirectory()) walk(full);
      else if (e.name.endsWith('.html')) out.push(full);
    }
  }
  walk(root);
  return out;
}

const allFiles = collectHtmlFiles('.');

// canonical path → normalised file path (no leading ./)
const canonToFile = new Map();
for (const f of allFiles) {
  const fp  = f.replace(/\\/g, '/').replace(/^\.\//, '');
  canonToFile.set(canonicalForFile(fp), fp);
}

/* ═══════════════════════════════════════════════════════════════════════
   § 2  HREFLANG EXTRACTION
   ═══════════════════════════════════════════════════════════════════════ */

const HREFLANG_RE = /<link[^>]+rel=["']alternate["'][^>]*>/gi;
const HL_RE       = /hreflang=["']([^"']+)["']/i;
const HREF_RE     = /href=["']([^"']+)["']/i;

function parseHreflang(html) {
  const out = [];
  let m;
  HREFLANG_RE.lastIndex = 0;
  while ((m = HREFLANG_RE.exec(html)) !== null) {
    const hl = HL_RE.exec(m[0]);
    const hr = HREF_RE.exec(m[0]);
    if (hl && hr) out.push({ hreflang: hl[1], href: hr[1] });
  }
  return out;
}

/** Detect the language of a page from its canonical path. */
function langOf(canon) {
  if (canon === '/pt' || canon.startsWith('/pt/')) return 'pt';
  if (canon === '/fr' || canon.startsWith('/fr/')) return 'fr';
  return 'es';
}

// hreflang code for each language
const HL_CODE = { es: 'es-ES', pt: 'pt-PT', fr: 'fr-FR' };

// file path → Map<hreflang-code, canonical-path>
const pageHreflang = new Map();

for (const f of allFiles) {
  const fp   = f.replace(/\\/g, '/').replace(/^\.\//, '');
  const html = fs.readFileSync(f, 'utf8');
  const tags = parseHreflang(html);
  if (!tags.length) continue;
  const map = new Map();
  for (const { hreflang, href } of tags) map.set(hreflang, canonical(href));
  pageHreflang.set(fp, map);
}

/* ═══════════════════════════════════════════════════════════════════════
   § 3  CHECKS
   ═══════════════════════════════════════════════════════════════════════ */

const errors = [];

function err(file, check, detail) { errors.push({ file, check, detail }); }

for (const [filePath, hlMap] of pageHreflang.entries()) {
  const selfCanon = canonicalForFile(filePath);
  const pageLang  = langOf(selfCanon);
  const pageHlCode = HL_CODE[pageLang];

  /* ── 1. TARGET_MISSING ── */
  for (const [hlCode, targetCanon] of hlMap.entries()) {
    if (!canonToFile.has(targetCanon)) {
      err(filePath, 'TARGET_MISSING',
        `hreflang="${hlCode}" href="${BASE}${targetCanon}" — file not found in repo`);
    }
  }

  /* ── 2. SELF_MISMATCH ── */
  if (pageHlCode && hlMap.has(pageHlCode)) {
    const declared = hlMap.get(pageHlCode);
    if (declared !== selfCanon) {
      err(filePath, 'SELF_MISMATCH',
        `hreflang="${pageHlCode}" → "${BASE}${declared}" but this page is "${BASE}${selfCanon}"`);
    }
  } else if (VERBOSE && pageHlCode) {
    // Only log in verbose mode — some pages intentionally omit self-declaration
    console.warn(`[WARN] ${filePath}: no hreflang="${pageHlCode}" self-declaration`);
  }

  /* ── 3. XDEFAULT_NON_ES ── */
  if (hlMap.has('x-default')) {
    const xd = hlMap.get('x-default');
    if (/^\/(pt|fr)(\/|$)/.test(xd)) {
      err(filePath, 'XDEFAULT_NON_ES',
        `x-default="${BASE}${xd}" must point to an ES URL`);
    }
  }

  /* ── 4. PAIR_BROKEN ── */
  // For every alternate this page declares (A → B), check B also declares A back.
  // B must have a hreflang entry for A's language code pointing to A's canonical URL.
  // We only flag when B *does* carry A's lang hreflang (i.e., B makes a choice that
  // contradicts ours). If B is simply silent on that language, that's a coverage gap,
  // not a symmetry error (handled separately by CLUSTER_INCOMPLETE in --verbose mode).
  for (const [hlCode, targetCanon] of hlMap.entries()) {
    if (hlCode === 'x-default') continue;

    const targetFile = canonToFile.get(targetCanon);
    if (!targetFile) continue; // already caught by TARGET_MISSING

    const targetHl = pageHreflang.get(targetFile);
    if (!targetHl) continue; // target has no hreflang at all → coverage gap

    // Does target carry a hreflang entry for THIS page's language?
    if (!targetHl.has(pageHlCode)) continue; // target silent on our lang → coverage gap

    // Target speaks about our language — does it point back to us?
    const backRef = targetHl.get(pageHlCode);
    if (backRef !== selfCanon) {
      err(filePath, 'PAIR_BROKEN',
        `hreflang="${hlCode}" → "${BASE}${targetCanon}", ` +
        `but "${BASE}${targetCanon}" declares ${pageHlCode}="${BASE}${backRef}" (not "${BASE}${selfCanon}")`);
    }
  }
}

/* Optional: CLUSTER_INCOMPLETE in verbose mode ── */
if (VERBOSE) {
  // A page with full trilingual hreflang pointing to a target without full trilingual
  for (const [filePath, hlMap] of pageHreflang.entries()) {
    if (!hlMap.has('es-ES') || !hlMap.has('pt-PT') || !hlMap.has('fr-FR')) continue;
    for (const [hlCode, targetCanon] of hlMap.entries()) {
      if (hlCode === 'x-default') continue;
      const targetFile = canonToFile.get(targetCanon);
      if (!targetFile) continue;
      const targetHl = pageHreflang.get(targetFile);
      if (!targetHl || !targetHl.has('es-ES') || !targetHl.has('pt-PT') || !targetHl.has('fr-FR')) {
        const codes = targetHl ? [...targetHl.keys()].join(', ') : '(none)';
        console.warn(`[VERBOSE] ${filePath}: hreflang="${hlCode}"→"${BASE}${targetCanon}" has incomplete hreflang [${codes}]`);
      }
    }
  }
}

/* ═══════════════════════════════════════════════════════════════════════
   § 4  REPORT
   ═══════════════════════════════════════════════════════════════════════ */

console.log(`\naudit-hreflang  —  ${new Date().toISOString().slice(0, 10)}`);
console.log(`Scanned ${allFiles.length} HTML files; ${pageHreflang.size} have hreflang tags.\n`);

if (errors.length === 0) {
  console.log('✅  No hreflang errors found.\n');
} else {
  const byCheck = new Map();
  for (const e of errors) {
    if (!byCheck.has(e.check)) byCheck.set(e.check, []);
    byCheck.get(e.check).push(e);
  }
  for (const [check, list] of byCheck.entries()) {
    const bar = '─'.repeat(Math.max(0, 54 - check.length));
    console.log(`── ${check} (${list.length}) ${bar}`);
    for (const e of list) {
      console.log(`  FILE: ${e.file}`);
      console.log(`        ${e.detail}`);
    }
    console.log('');
  }
}

console.log('── Summary ─────────────────────────────────────────────────');
const counts = {};
for (const e of errors) counts[e.check] = (counts[e.check] || 0) + 1;
for (const c of ['TARGET_MISSING', 'SELF_MISMATCH', 'XDEFAULT_NON_ES', 'PAIR_BROKEN'])
  console.log(`  ${c.padEnd(22)}: ${counts[c] || 0}`);
console.log(`  ${'TOTAL'.padEnd(22)}: ${errors.length}`);
console.log('');

process.exit(errors.length > 0 ? 1 : 0);
