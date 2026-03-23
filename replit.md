# ParaisoDeAves — Exotic Parrot Breeder Website

A bilingual (Spanish + English) static HTML website for ParaisoDeAves — an exotic parrot breeder in Spain serving buyers across Europe.

## Project Structure

### Homepage
- `index.html` — Homepage (bilingual SEO: English title/meta, Spanish content preserved)

### English SEO Landing Pages
- `parrots-for-sale-spain.html` — "Parrots for sale Spain" (primary keyword page)
- `buy-parrots-europe.html` — "Buy parrots Europe" (EU market page)
- `african-grey-parrot-for-sale.html` — African Grey species page
- `macaw-parrots-for-sale.html` — Macaw species page
- `cockatoo-parrots-for-sale.html` — Cockatoo species page

### Trust & Authority Pages (English)
- `about-us.html` — Organization schema, trust signals
- `delivery-shipping.html` — Transport methods and process
- `parrot-care-health.html` — Comprehensive care guide
- `faq.html` — FAQPage schema, 15+ questions

### English Blog Posts (`blog/`)
- `how-to-buy-a-parrot-in-spain.html`
- `best-parrots-for-beginners.html`
- `african-grey-parrot-price-europe.html`
- `macaw-vs-cockatoo.html`
- `parrot-care-guide.html`
- `where-to-buy-exotic-birds-europe.html`

### Spanish Content (Existing, Preserved)
- `adopcion-de-loros.html`, `tipos-de-loros-domesticos.html`, etc.
- `available-birds/` — Individual bird pages in Spanish
- `blog/como-alimentar-un-loro-bebe.html`

### Other Files
- `sitemap.xml` — Full sitemap covering all 30+ pages with priorities
- `assets/img/` — Gallery images
- `images/` — Bird photos

## Running Locally

Served via Python's built-in HTTP server on port 5000:

```
python3 -m http.server 5000 --bind 0.0.0.0
```

## Deployment

Configured as a **static** deployment with `publicDir: "."`.

## Technologies

- Pure static HTML/CSS (inline styles, no build system)
- Inter font via Google Fonts
- Dark design theme: bg `#0a0a0a`, gradients (red `#ff4757`, blue `#3742fa`, orange `#ff9900`)
- Netlify-compatible contact form (`data-netlify="true"`)
- WhatsApp CTA: `https://wa.me/34632165955`
- Facebook page integration (deferred SDK load)

## SEO Strategy

- Homepage: English title/meta targeting "parrots for sale Spain / Europe"
- 5 English landing pages targeting high-intent commercial keywords
- 6 English blog posts targeting informational keywords (buying guides, price guides, care guides)
- 4 trust/authority pages (About, FAQ with FAQPage schema, Delivery, Care)
- Schema markup: Organization, Product, FAQPage, Article
- Gallery image alt texts updated with bilingual descriptive text
- Sitemap covers all 30+ URLs with correct priorities and changefreq

## Key Information

- Domain: `https://www.paraisodeloros.com`
- Email: `info@paraisodeloros.com`
- Phone/WhatsApp: `+34 632 16 59 55`
- Facebook: `https://www.facebook.com/profile.php?id=100089916354629`
- Google Site Verification: `8Du7IU5_y0w0vZeaz0bjDdLNdbzb35CubsG1YKISK8c`
