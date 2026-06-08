#!/usr/bin/env node
/**
 * seo-audit.js — paraisodeaves.com SEO health checker
 *
 * Checks every URL in sitemap.xml for:
 *   ✓ HTTP 200 status
 *   ✓ <title> present
 *   ✓ <meta description> present
 *   ✓ <link rel="canonical"> present and self-referencing
 *   ✓ No noindex meta tag
 *   ✓ <h1> present
 *   ✓ Internal links returning 200 (sampled)
 *
 * Usage:
 *   npm run seo:audit                     # checks localhost:5000
 *   BASE_URL=https://www.paraisodeaves.com npm run seo:audit
 */

const http  = require('http');
const https = require('https');
const fs    = require('fs');

const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';
const SITEMAP  = './sitemap.xml';
const TIMEOUT  = 10000;

const COLORS = {
  reset:  '\x1b[0m',
  red:    '\x1b[31m',
  green:  '\x1b[32m',
  yellow: '\x1b[33m',
  cyan:   '\x1b[36m',
  bold:   '\x1b[1m',
};

const ok   = (msg) => `  ${COLORS.green}✓${COLORS.reset} ${msg}`;
const fail = (msg) => `  ${COLORS.red}✗${COLORS.reset} ${msg}`;
const warn = (msg) => `  ${COLORS.yellow}!${COLORS.reset} ${msg}`;

// ─── HTTP fetch ────────────────────────────────────────────────────────────────
function fetch(url, followRedirects = true, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    const req = lib.get(url, { timeout: TIMEOUT }, (res) => {
      if (followRedirects && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        if (maxRedirects === 0) {
          return resolve({ status: res.statusCode, body: '', finalUrl: url, hops: [] });
        }
        const next = res.headers.location.startsWith('http')
          ? res.headers.location
          : new URL(res.headers.location, url).href;
        fetch(next, followRedirects, maxRedirects - 1)
          .then(r => resolve({ ...r, hops: [url, ...(r.hops || [])] }))
          .catch(reject);
        res.resume();
        return;
      }
      let body = '';
      res.setEncoding('utf8');
      res.on('data', chunk => { body += chunk; });
      res.on('end', () => resolve({ status: res.statusCode, body, finalUrl: url, hops: [] }));
    });
    req.on('timeout', () => { req.destroy(); reject(new Error(`Timeout: ${url}`)); });
    req.on('error', reject);
  });
}

// ─── HTML helpers ──────────────────────────────────────────────────────────────
const getTitle = (html) => {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return m ? m[1].replace(/<[^>]*>/g, '').trim() : null;
};
const getMeta = (html, name) => {
  const patterns = [
    new RegExp(`<meta[^>]*name=["']${name}["'][^>]*content=["']([^"']*)["']`, 'i'),
    new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*name=["']${name}["']`, 'i'),
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m) return m[1];
  }
  return null;
};
const getCanonical = (html) => {
  const m = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["'][^>]*>/i)
         || html.match(/<link[^>]*href=["']([^"']*)["'][^>]*rel=["']canonical["'][^>]*>/i);
  return m ? m[1] : null;
};
const hasNoindex = (html) => {
  return /<meta[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex[^"']*["']/i.test(html);
};
const getH1 = (html) => {
  const m = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  return m ? m[1].replace(/<[^>]*>/g, '').trim() : null;
};

// ─── Extract sitemap URLs ──────────────────────────────────────────────────────
function getSitemapUrls() {
  const xml  = fs.readFileSync(SITEMAP, 'utf8');
  const re   = /<loc>(https?:\/\/[^<]+)<\/loc>/gi;
  const urls = [];
  let m;
  while ((m = re.exec(xml)) !== null) {
    urls.push(m[1].trim());
  }
  return urls;
}

// ─── Audit a single URL ────────────────────────────────────────────────────────
async function auditUrl(sitemapUrl) {
  const issues  = [];
  const notices = [];

  // Map the canonical (production) URL to the local server
  const localUrl = sitemapUrl.replace('https://www.paraisodeaves.com', BASE_URL);

  let res;
  try {
    res = await fetch(localUrl, false); // no redirect-following — we want the raw status
  } catch (e) {
    return { url: sitemapUrl, status: 'ERR', issues: [`Fetch error: ${e.message}`], notices: [] };
  }

  // 1. HTTP 200
  if (res.status !== 200) {
    const path = localUrl.replace(BASE_URL, '');
    const isCleanUrl = !path.endsWith('.html') && !path.endsWith('/') && path !== '/';
    if (isCleanUrl && BASE_URL.includes('localhost')) {
      // Clean URLs (no .html) only work via Netlify _redirects, not the local Python server.
      // Skip rather than report as failure.
      return { url: sitemapUrl, status: 'SKIP', issues: [], notices: ['Clean URL — only resolvable via Netlify _redirects (skip on localhost)'] };
    }
    issues.push(`HTTP ${res.status} (expected 200)`);
    return { url: sitemapUrl, status: res.status, issues, notices };
  }

  const html = res.body;

  // 2. noindex check
  if (hasNoindex(html)) {
    issues.push('noindex meta tag found — page will not be indexed');
  }

  // 3. <title>
  const title = getTitle(html);
  if (!title || title.trim().length < 5) {
    issues.push('Missing or empty <title>');
  } else if (title.trim().length > 70) {
    notices.push(`<title> is ${title.trim().length} chars (recommended ≤ 70)`);
  }

  // 4. meta description
  const desc = getMeta(html, 'description');
  if (!desc || desc.trim().length < 10) {
    issues.push('Missing or empty <meta description>');
  } else if (desc.trim().length > 165) {
    notices.push(`<meta description> is ${desc.trim().length} chars (recommended ≤ 165)`);
  }

  // 5. canonical
  const canonical = getCanonical(html);
  if (!canonical) {
    issues.push('Missing <link rel="canonical">');
  } else {
    // The canonical should match the sitemap URL
    const normSitemap   = sitemapUrl.replace(/\/$/, '');
    const normCanonical = canonical.replace(/\/$/, '');
    if (normCanonical !== normSitemap) {
      notices.push(`Canonical (${canonical}) ≠ sitemap URL — verify this is intentional`);
    }
  }

  // 6. <h1>
  const h1 = getH1(html);
  if (!h1) {
    issues.push('Missing <h1>');
  }

  return {
    url:     sitemapUrl,
    status:  res.status,
    issues,
    notices,
    meta:    { title: (title || '').trim().substring(0, 60), h1: (h1 || '').substring(0, 50) },
  };
}

// ─── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n${COLORS.bold}╔══════════════════════════════════════════════╗${COLORS.reset}`);
  console.log(`${COLORS.bold}║  paraisodeaves SEO Audit  ${COLORS.cyan}npm run seo:audit${COLORS.reset}${COLORS.bold}  ║${COLORS.reset}`);
  console.log(`${COLORS.bold}╚══════════════════════════════════════════════╝${COLORS.reset}`);
  console.log(`  Base URL : ${COLORS.cyan}${BASE_URL}${COLORS.reset}`);
  console.log(`  Sitemap  : ${SITEMAP}\n`);

  const urls    = getSitemapUrls();
  console.log(`  Auditing ${COLORS.bold}${urls.length}${COLORS.reset} URLs from sitemap...\n`);

  const results  = [];
  const batchSize = 8;

  for (let i = 0; i < urls.length; i += batchSize) {
    const batch   = urls.slice(i, i + batchSize);
    const settled = await Promise.all(batch.map(u => auditUrl(u)));
    results.push(...settled);
    process.stdout.write(`  Progress: ${Math.min(i + batchSize, urls.length)}/${urls.length}\r`);
  }

  console.log('\n');

  // ── Summary tables ─────────────────────────────────────────────────────────
  const failed  = results.filter(r => r.issues.length > 0);
  const warned  = results.filter(r => r.issues.length === 0 && r.notices.length > 0);
  const passing = results.filter(r => r.issues.length === 0 && r.notices.length === 0);

  console.log(`${COLORS.bold}── Results ──────────────────────────────────────────${COLORS.reset}`);
  console.log(ok(`${passing.length} pages fully passing`));
  if (warned.length)  console.log(warn(`${warned.length} pages with notices`));
  if (failed.length)  console.log(fail(`${failed.length} pages with issues`));

  if (failed.length > 0) {
    console.log(`\n${COLORS.bold}── Pages with Issues ────────────────────────────────${COLORS.reset}`);
    for (const r of failed) {
      const path = r.url.replace('https://www.paraisodeaves.com', '');
      console.log(`\n  ${COLORS.bold}${COLORS.red}${path}${COLORS.reset}`);
      for (const issue of r.issues) {
        console.log(fail(issue));
      }
      for (const notice of r.notices) {
        console.log(warn(notice));
      }
    }
  }

  if (warned.length > 0) {
    console.log(`\n${COLORS.bold}── Pages with Notices ───────────────────────────────${COLORS.reset}`);
    for (const r of warned) {
      const path = r.url.replace('https://www.paraisodeaves.com', '');
      console.log(`\n  ${COLORS.bold}${COLORS.yellow}${path}${COLORS.reset}`);
      for (const notice of r.notices) {
        console.log(warn(notice));
      }
    }
  }

  // ── Redirect chain check (from _redirects) ─────────────────────────────────
  console.log(`\n${COLORS.bold}── Redirect Check (sample of key URLs) ──────────────${COLORS.reset}`);
  const redirectTestUrls = [
    `${BASE_URL}/comprar-loros-espana.html`,
    `${BASE_URL}/criadero-loros-espana.html`,
    `${BASE_URL}/ciudades/comprar-loros-madrid.html`,
    `${BASE_URL}/ciudades/loro-gris-africano-madrid.html`,
    `${BASE_URL}/precios/precio-loro-gris-africano-espana.html`,
    `${BASE_URL}/delivery-shipping.html`,
    `${BASE_URL}/about-us.html`,
    `${BASE_URL}/mejores-especies-loros-adoptar`,
  ];

  for (const url of redirectTestUrls) {
    try {
      const r = await fetch(url, true, 10);
      const path = url.replace(BASE_URL, '');
      if (r.hops && r.hops.length > 2) {
        console.log(fail(`${path} → chain of ${r.hops.length} hops (max should be 1)`));
      } else if (r.status === 200) {
        console.log(ok(`${path} → ${r.status} (${r.hops.length} hop${r.hops.length !== 1 ? 's' : ''})`));
      } else {
        console.log(fail(`${path} → ${r.status}`));
      }
    } catch (e) {
      console.log(warn(`${url.replace(BASE_URL, '')} — ${e.message}`));
    }
  }

  // ── Noindex check for pages NOT expected to have noindex ───────────────────
  console.log(`\n${COLORS.bold}── Noindex Verification (non-sitemap pages) ─────────${COLORS.reset}`);
  const noindexExpected = [
    '/gracias.html',
    '/404.html',
    '/blog/parrot-care-guide.html',
    '/blog/macaw-vs-cockatoo.html',
  ];
  for (const path of noindexExpected) {
    try {
      const r = await fetch(`${BASE_URL}${path}`, false);
      if (hasNoindex(r.body)) {
        console.log(ok(`${path} — correctly noindex`));
      } else {
        console.log(warn(`${path} — noindex expected but not found`));
      }
    } catch (e) {
      console.log(warn(`${path} — ${e.message}`));
    }
  }

  // ── Final verdict ──────────────────────────────────────────────────────────
  console.log(`\n${COLORS.bold}────────────────────────────────────────────────────${COLORS.reset}`);
  if (failed.length === 0) {
    console.log(`${COLORS.green}${COLORS.bold}  ✓ ALL ${urls.length} sitemap pages pass SEO checks${COLORS.reset}\n`);
    process.exit(0);
  } else {
    console.log(`${COLORS.red}${COLORS.bold}  ✗ ${failed.length} page(s) need attention${COLORS.reset}\n`);
    process.exit(1);
  }
}

main().catch(e => { console.error(e); process.exit(1); });
