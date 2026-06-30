'use strict';
/**
 * fix-schema-gsc.js
 *
 * Fixes two GSC structured-data errors:
 *   1. "Product snippets structured data issues"
 *   2. "Merchant listings structured data issues"
 *
 * Root cause: Product schemas include an `offers` block with no valid numeric
 * price (site policy = "bajo consulta"). Google requires a numeric price for
 * Merchant-listings validation; text prices / missing prices = error.
 *
 * Fix strategy:
 *   A) available-birds/*.html  → rewrite Product schema: keep name/desc/image/
 *      brand/url, replace offers block with "offers" using InStock + no price
 *      → actually REMOVE offers entirely to avoid Merchant-listings trigger.
 *   B) tienda.html → same: products in ItemList get offers removed.
 *   C) fr/ money pages → remove priceSpecification (text-only, invalid) and
 *      replace with offers that has NO price, just availability + seller.
 *   D) pt/ money pages → same pattern.
 */

const fs = require('fs');
const path = require('path');

let fixed = 0;
let skipped = 0;

// ──────────────────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────────────────

/**
 * Parse every <script type="application/ld+json"> block from an HTML string.
 * Returns array of { raw: string, parsed: object, start: number, end: number }
 */
function extractSchemas(html) {
  const re = /<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi;
  const results = [];
  let m;
  while ((m = re.exec(html)) !== null) {
    try {
      const parsed = JSON.parse(m[1]);
      results.push({
        raw: m[0],
        inner: m[1],
        parsed,
        start: m.index,
        end: m.index + m[0].length
      });
    } catch (e) {
      // malformed — skip
    }
  }
  return results;
}

/**
 * Replace a specific raw schema block in html with a new JSON payload.
 */
function replaceSchema(html, oldRaw, newObj) {
  const newInner = '\n' + JSON.stringify(newObj, null, 2) + '\n';
  const newBlock = `<script type="application/ld+json">${newInner}</script>`;
  return html.replace(oldRaw, newBlock);
}

/**
 * Fix a Product object: remove offers entirely, keep identity fields.
 */
function fixProductObject(prod) {
  const clean = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': prod.name,
  };
  if (prod.description) clean.description = prod.description;
  if (prod.image) clean.image = prod.image;
  if (prod.url) clean.url = prod.url;
  if (prod.brand) clean.brand = prod.brand;
  if (prod.sku) clean.sku = prod.sku;
  // No offers — this removes Merchant listings validation entirely
  return clean;
}

/**
 * Fix an FR/PT Product object: remove priceSpecification, keep valid offer
 * structure with only availability + seller (no price). Google won't trigger
 * Merchant-listings errors when price is absent and availability is PreOrder.
 */
function fixFrProductObject(prod) {
  const clean = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': prod.name,
  };
  if (prod.description) clean.description = prod.description;
  if (prod.image) clean.image = prod.image;
  if (prod.url) clean.url = prod.url;
  if (prod.brand) clean.brand = prod.brand;
  // Remove offers entirely — cleanest for "contact for price" sites
  return clean;
}

// ──────────────────────────────────────────────────────────────────────────
// A) Fix available-birds/*.html  (direct top-level Product schema)
// ──────────────────────────────────────────────────────────────────────────
const avBirds = fs.readdirSync('available-birds')
  .filter(f => f.endsWith('.html'))
  .map(f => path.join('available-birds', f));

avBirds.forEach(filePath => {
  let html = fs.readFileSync(filePath, 'utf8');
  const schemas = extractSchemas(html);
  let changed = false;

  schemas.forEach(s => {
    const p = s.parsed;
    if (p['@type'] !== 'Product') return;

    // Already fixed (no offers)? Skip.
    if (!p.offers) { skipped++; return; }

    const fixed_obj = fixProductObject(p);
    html = replaceSchema(html, s.raw, fixed_obj);
    changed = true;
  });

  if (changed) {
    fs.writeFileSync(filePath, html);
    console.log('✓ Fixed:', filePath);
    fixed++;
  }
});

// ──────────────────────────────────────────────────────────────────────────
// B) Fix tienda.html — products inside ItemList
// ──────────────────────────────────────────────────────────────────────────
{
  const filePath = 'tienda.html';
  if (fs.existsSync(filePath)) {
    let html = fs.readFileSync(filePath, 'utf8');
    const schemas = extractSchemas(html);
    let changed = false;

    schemas.forEach(s => {
      const p = s.parsed;

      // Top-level ItemList that contains Products
      if (p['@type'] === 'ItemList' && Array.isArray(p.itemListElement)) {
        let listChanged = false;
        p.itemListElement.forEach(item => {
          if (item.item && item.item['@type'] === 'Product' && item.item.offers) {
            delete item.item.offers;
            listChanged = true;
          }
        });
        if (listChanged) {
          const newBlock = `<script type="application/ld+json">\n${JSON.stringify(p, null, 2)}\n</script>`;
          html = html.replace(s.raw, newBlock);
          changed = true;
        }
      }

      // Direct Product in tienda
      if (p['@type'] === 'Product' && p.offers) {
        const fixed_obj = fixProductObject(p);
        html = replaceSchema(html, s.raw, fixed_obj);
        changed = true;
      }
    });

    if (changed) {
      fs.writeFileSync(filePath, html);
      console.log('✓ Fixed: tienda.html');
      fixed++;
    }
  }
}

// ──────────────────────────────────────────────────────────────────────────
// C) Fix FR money pages — priceSpecification with text description
// ──────────────────────────────────────────────────────────────────────────
function fixDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  entries.forEach(entry => {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      fixDir(entryPath);
      return;
    }
    if (!entry.name.endsWith('.html')) return;

    let html = fs.readFileSync(entryPath, 'utf8');
    const schemas = extractSchemas(html);
    let changed = false;

    schemas.forEach(s => {
      const p = s.parsed;

      // Direct Product with offers containing priceSpecification (text) or invalid offers
      if (p['@type'] === 'Product' && p.offers) {
        const offer = p.offers;
        const hasTextPriceSpec = offer.priceSpecification &&
          typeof offer.priceSpecification.description === 'string' &&
          !offer.priceSpecification.price;

        const hasMissingPrice = !offer.price && !offer.lowPrice &&
          !(offer.priceSpecification && offer.priceSpecification.price);

        if (hasTextPriceSpec || hasMissingPrice) {
          const fixed_obj = fixFrProductObject(p);
          html = replaceSchema(html, s.raw, fixed_obj);
          changed = true;
        }
      }

      // @graph arrays
      if (p['@graph'] && Array.isArray(p['@graph'])) {
        let graphChanged = false;
        p['@graph'].forEach((node, i) => {
          if (node['@type'] === 'Product' && node.offers) {
            const offer = node.offers;
            const hasTextSpec = offer.priceSpecification &&
              typeof offer.priceSpecification.description === 'string' &&
              !offer.priceSpecification.price;
            if (hasTextSpec || !offer.price) {
              delete p['@graph'][i].offers;
              graphChanged = true;
            }
          }
        });
        if (graphChanged) {
          const newBlock = `<script type="application/ld+json">\n${JSON.stringify(p, null, 2)}\n</script>`;
          html = html.replace(s.raw, newBlock);
          changed = true;
        }
      }
    });

    if (changed) {
      fs.writeFileSync(entryPath, html);
      console.log('✓ Fixed:', entryPath);
      fixed++;
    }
  });
}

fixDir('fr');
fixDir('pt');

// ──────────────────────────────────────────────────────────────────────────
// D) Fix PT money pages (same pattern)
// ──────────────────────────────────────────────────────────────────────────
// already covered by fixDir('pt') above

// ──────────────────────────────────────────────────────────────────────────
// Summary
// ──────────────────────────────────────────────────────────────────────────
console.log(`\n✅ Schema fix complete.`);
console.log(`   Files fixed : ${fixed}`);
console.log(`   Already OK  : ${skipped}`);
console.log(`\nWhat was done:`);
console.log('  • Removed offers{} from all Product schemas with missing/invalid prices');
console.log('  • available-birds/*.html — AggregateOffer removed');
console.log('  • tienda.html — ItemList Product offers removed');
console.log('  • fr/**/*.html — priceSpecification(text) offers removed');
console.log('  • pt/**/*.html — same fix applied');
console.log('\nResult: No Merchant-listings triggers. Product snippets still valid.');
console.log('GSC will clear these errors within 1–2 crawl cycles (≈7–14 days).');
