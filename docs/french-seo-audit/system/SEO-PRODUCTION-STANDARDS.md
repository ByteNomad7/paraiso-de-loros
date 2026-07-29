# SEO Production Standards — Paraíso de Aves FR

**Version:** 1.0  
**Date:** 2026-07-29  
**Authority:** SEO Director  
**Scope:** All French-section pages — existing and future  
**Rule:** No page is published that does not meet every mandatory standard for its page type.

---

## HOW TO USE THIS DOCUMENT

Each page type has a standards table. Every cell is either:
- **MANDATORY** — page is blocked from publication without this
- **RECOMMENDED** — page can publish without it but is flagged for follow-up
- **N/A** — not applicable to this page type

The QA-CHECKLISTS.md document operationalises these standards as pass/fail gates.

---

## PAGE TYPE 1 — COMMERCIAL PAGES

*Includes: /fr/acheter-[species]/, /fr/prix-[species]/, /fr/perroquets-disponibles/, /fr/adopter-perroquet/, /fr/vente-oiseaux/*

### Content Standards

| Requirement | Standard | Level |
|-------------|---------|-------|
| Word count | ≥ 1,800 words | MANDATORY |
| H1 | Contains primary commercial keyword (e.g. "acheter [species] france") | MANDATORY |
| H2 count | 4–8 H2s structuring the page logically | MANDATORY |
| H3 count | ≥ 2 H3s per major H2 section | RECOMMENDED |
| FAQ section | ≥ 6 Q&As directly addressing buyer objections | MANDATORY |
| Price/cost transparency | Explicit statement on pricing model (even "prix sur demande") | MANDATORY |
| Buyer journey clarity | Process explained in 3–6 steps | MANDATORY |
| Unique value proposition | "Pourquoi nous choisir?" block present | MANDATORY |

### Metadata Standards

| Element | Requirement | Level |
|---------|------------|-------|
| `<title>` | 50–60 characters · Contains primary keyword · Contains brand "Paraíso de Aves" | MANDATORY |
| `<meta description>` | 145–160 characters · Commercial CTA word · Primary keyword | MANDATORY |
| Canonical | Self-referencing canonical present | MANDATORY |
| hreflang | es/pt/fr/en equivalents where they exist | MANDATORY |
| OG tags | og:title, og:description, og:image, og:type=website | RECOMMENDED |

### Schema Requirements

| Schema type | Standard | Level |
|------------|---------|-------|
| `WebPage` or `ItemPage` | @type, name, url, description, inLanguage: fr | MANDATORY |
| `BreadcrumbList` | Min 3 levels: Home → Category → Page | MANDATORY |
| `FAQPage` | Min 6 Q&As with acceptedAnswer | MANDATORY |
| `Product` + `Offer` | For price pages: name, offers.priceCurrency: EUR, priceSpecification | MANDATORY |
| `ItemList` | For listing pages (/fr/perroquets-disponibles/) | MANDATORY |
| `Organization` | @id reference to #org | RECOMMENDED |

### Image Requirements

| Requirement | Standard | Level |
|-------------|---------|-------|
| Hero image | Present, species-accurate, WebP + AVIF + JPG fallback | MANDATORY |
| Alt text | Descriptive formula: "[Species] [context] — Paraíso de Aves" | MANDATORY |
| width/height attributes | Both present on all `<img>` elements | MANDATORY |
| loading attribute | `eager` on hero, `lazy` on all others | MANDATORY |
| Min images per page | ≥ 3 | RECOMMENDED |

### Internal Link Requirements

| Requirement | Standard | Level |
|-------------|---------|-------|
| Links to /fr/perroquets-disponibles/ | ≥ 1 contextual | MANDATORY |
| Links to /fr/contact/ | ≥ 1 | MANDATORY |
| Links to relevant species Tier 1 page | ≥ 1 | MANDATORY |
| Links to /fr/garantie-sante/ | ≥ 1 | MANDATORY |
| Inbound links | ≥ 5 other FR pages link here | MANDATORY |
| Orphan check | Page is not an orphan | MANDATORY |

### CTA Requirements

| Requirement | Standard | Level |
|-------------|---------|-------|
| Primary CTA above fold | Gold button: "Demander des informations" or "Voir les disponibilités" | MANDATORY |
| Primary CTA in body | ≥ 1 CTA mid-page | MANDATORY |
| Primary CTA at bottom | Before footer | MANDATORY |
| Mobile CTA | Visible without scrolling on 375px viewport | MANDATORY |

### E-E-A-T Requirements

| Requirement | Standard | Level |
|-------------|---------|-------|
| Author attribution | "Rédigé par [éleveur], Paraíso de Aves" | MANDATORY |
| Last updated date | `<time datetime="">` visible on page | MANDATORY |
| Trust signals | CITES badge + vet check + 25 years — min 2 visible | MANDATORY |
| Legal page links | Mentions Légales + CGV accessible from footer | MANDATORY |
| External citations | ≥ 1 external authoritative link (CITES.org, etc.) | RECOMMENDED |

### Accessibility Requirements

| Requirement | Standard | Level |
|-------------|---------|-------|
| All images have alt text | Non-empty alt on all non-decorative images | MANDATORY |
| Form labels explicit | All inputs have `<label>` — not placeholder-only | MANDATORY |
| Heading hierarchy | No skipped heading levels (h1→h2→h3 only) | MANDATORY |
| Colour contrast | All text ≥ 4.5:1 WCAG AA | MANDATORY |
| Focus indicators | `:focus-visible` styles present | RECOMMENDED |

---

## PAGE TYPE 2 — SPECIES PAGES (TIER 1)

*Includes: /fr/perroquet-gris-du-gabon/, /fr/ara-bleu-et-jaune/, and all /fr/[flagship-species]/*

### Content Standards

| Requirement | Standard | Level |
|-------------|---------|-------|
| Word count | ≥ 2,500 words | MANDATORY |
| H1 | Species common name + "perroquet" | MANDATORY |
| Scientific name | Present in body text and schema | MANDATORY |
| Sections required | Description · Caractéristiques · Alimentation · Comportement · Prix · Disponibilité · FAQ | MANDATORY |
| FAQ section | ≥ 8 Q&As | MANDATORY |
| "L'avis de l'éleveur" box | Breeder's first-hand observation | MANDATORY |
| Blog cross-link | Link to relevant blog post | RECOMMENDED |
| Comparison link | Link to species comparison page (if exists) | RECOMMENDED |

### Schema Requirements

| Schema type | Standard | Level |
|------------|---------|-------|
| `WebPage` | With `about` containing `Thing` (scientificName, sameAs Wikidata/Wikipedia) | MANDATORY |
| `BreadcrumbList` | Home → Espèces → [Species] | MANDATORY |
| `FAQPage` | ≥ 8 Q&As | MANDATORY |
| `Article` | With datePublished, dateModified, author | MANDATORY |
| `ImageObject` | For hero image | RECOMMENDED |

### Internal Link Requirements

| Requirement | Standard | Level |
|-------------|---------|-------|
| → /fr/perroquets-disponibles/ | ≥ 1 species-specific anchor | MANDATORY |
| → /fr/prix-[species]/ | ≥ 1 (where price page exists) | MANDATORY |
| → /fr/especies/[species]/ (deep guide) | ≥ 1 cross-link | MANDATORY |
| → /fr/contact/ | ≥ 1 | MANDATORY |
| → /fr/garantie-sante/ | ≥ 1 | MANDATORY |
| → /fr/livraison/ | ≥ 1 | RECOMMENDED |
| Inbound links | ≥ 8 | MANDATORY |

---

## PAGE TYPE 3 — SPECIES PAGES (TIER 2 — /fr/especies/)

### Content Standards

| Requirement | Standard | Level |
|-------------|---------|-------|
| Word count | ≥ 2,000 words | MANDATORY |
| H1 | "[Species] — Guide Complet" or equivalent | MANDATORY |
| Sections required | Taxonomie · Morphologie · Habitat naturel · Comportement · Alimentation · Soins en captivité · FAQ | MANDATORY |
| FAQ section | ≥ 8 Q&As | MANDATORY |
| Scientific classification table | Present | MANDATORY |

### Schema Requirements

| Schema type | Standard | Level |
|------------|---------|-------|
| `WebPage` | With `about.sameAs` Wikidata URL | MANDATORY |
| `BreadcrumbList` | Home → Espèces → [Species] | MANDATORY |
| `FAQPage` | ≥ 8 Q&As | MANDATORY |
| `Article` | datePublished, dateModified, author | MANDATORY |

### Internal Link Requirements

| Requirement | Standard | Level |
|-------------|---------|-------|
| → /fr/[tier1-species]/ | ≥ 1 (commercial counterpart) | MANDATORY |
| → /fr/perroquets-disponibles/ | ≥ 1 | MANDATORY |
| → /fr/especies/ (hub) | ≥ 1 | MANDATORY |
| Inbound links | ≥ 5 | MANDATORY |

---

## PAGE TYPE 4 — BIRD PROFILE PAGES

*Includes: /fr/perroquets-disponibles/[species]-[sex]-[ref]/ (when built)*

### Content Standards

| Requirement | Standard | Level |
|-------------|---------|-------|
| Species name + common name | H1 | MANDATORY |
| Sex (DNA-confirmed) | Present | MANDATORY |
| Approximate birth year | Present | MANDATORY |
| Status | "Disponible" / "Réservé" / "Bientôt disponible" | MANDATORY |
| Hand-raised statement | Explicit | MANDATORY |
| CITES status | Present | MANDATORY |
| Documentation included | Checklist: CITES cert, vet cert, bague, carnet | MANDATORY |
| Individual photos | ≥ 3 (face, full body, personality) | MANDATORY |
| CTA to contact | Pre-populated with this bird's species | MANDATORY |
| Back-link to species page | ≥ 1 | MANDATORY |

### Schema Requirements

| Schema type | Standard | Level |
|------------|---------|-------|
| `Product` | name, description, species, offers (InStock, priceCurrency: EUR) | MANDATORY |
| `Offer` | availability: InStock or PreOrder, seller: #org | MANDATORY |
| `BreadcrumbList` | Home → Disponibles → [Bird] | MANDATORY |
| `ImageObject` | ≥ 3 images in schema | MANDATORY |

---

## PAGE TYPE 5 — CITY LANDING PAGES

*Includes: /fr/perroquets-a-vendre-[ville]/*

### Content Standards

| Requirement | Standard | Level |
|-------------|---------|-------|
| Word count | ≥ 700 words | MANDATORY |
| H1 | "Perroquets à Vendre à [Ville]" | MANDATORY |
| City-specific paragraph | ≥ 1 paragraph mentioning city context | MANDATORY |
| Delivery timeline to city | Stated explicitly | MANDATORY |
| Species grid | ≥ 4 species shown with links | MANDATORY |
| FAQ section | ≥ 4 Q&As including city-specific delivery | MANDATORY |
| Regional context | Region name mentioned + link to region hub (when built) | RECOMMENDED |
| Nearby cities | ≥ 3 links to nearby city pages | RECOMMENDED |

### Schema Requirements

| Schema type | Standard | Level |
|------------|---------|-------|
| `WebPage` | Standard | MANDATORY |
| `BreadcrumbList` | Home → Villes → [Ville] | MANDATORY |
| `Service` | serviceType, areaServed: {City, FR}, provider: #org | MANDATORY |
| `FAQPage` | ≥ 4 Q&As | MANDATORY |

### Internal Link Requirements

| Requirement | Standard | Level |
|-------------|---------|-------|
| → /fr/perroquets-disponibles/ | ≥ 1 | MANDATORY |
| → /fr/livraison/ | ≥ 1 | MANDATORY |
| → /fr/contact/ | ≥ 1 | MANDATORY |
| → /fr/eleveur-perroquets/ | ≥ 1 | MANDATORY |
| → 3 nearby city pages | ≥ 3 | RECOMMENDED |
| Inbound links | ≥ 4 | MANDATORY |

---

## PAGE TYPE 6 — BLOG ARTICLES

### Content Standards

| Requirement | Standard | Level |
|-------------|---------|-------|
| Word count | ≥ 1,500 words | MANDATORY |
| H1 | Contains primary keyword | MANDATORY |
| H2 sections | ≥ 4 | MANDATORY |
| Introduction | States what reader will learn; ≤ 150 words | MANDATORY |
| Conclusion | Summary + CTA | MANDATORY |
| FAQ section | ≥ 4 Q&As | RECOMMENDED |
| "À propos de l'auteur" | Breeder attribution | MANDATORY |
| External citations | ≥ 1 authoritative source cited | MANDATORY |

### Schema Requirements

| Schema type | Standard | Level |
|------------|---------|-------|
| `BlogPosting` or `Article` | headline, datePublished, dateModified, author, image | MANDATORY |
| `BreadcrumbList` | Home → Blog → [Article] | MANDATORY |
| `FAQPage` | Where FAQ section exists | RECOMMENDED |
| `Person` (author) | Name, jobTitle, worksFor: #org | MANDATORY |

### Internal Link Requirements

| Requirement | Standard | Level |
|-------------|---------|-------|
| → Relevant species page | ≥ 1 | MANDATORY |
| → /fr/perroquets-disponibles/ | ≥ 1 | MANDATORY |
| → Relevant cluster page | ≥ 1 | MANDATORY |
| → /fr/blog/ (hub) | ≥ 1 | MANDATORY |
| Inbound links | ≥ 3 | MANDATORY |

---

## PAGE TYPE 7 — KNOWLEDGE PAGES

*Includes: /fr/connaissances/[topic]/ and future pillar + cluster pages*

### Content Standards

| Requirement | Standard | Level |
|-------------|---------|-------|
| Word count | ≥ 1,200 words (hub); ≥ 1,500 (cluster article) | MANDATORY |
| H1 | Topic keyword | MANDATORY |
| Practical depth | Step-by-step, numbered lists, or comparison tables | MANDATORY |
| FAQ section | ≥ 6 Q&As | MANDATORY |
| Safety/vet disclaimer | For health content: "Consultez un vétérinaire NAC" | MANDATORY |
| Cited sources | ≥ 1 external authority link | MANDATORY |
| "L'avis de l'éleveur" | For care/behaviour/health content | RECOMMENDED |

### Schema Requirements

| Schema type | Standard | Level |
|------------|---------|-------|
| `Article` or `WebPage` | datePublished, dateModified, author | MANDATORY |
| `BreadcrumbList` | Home → Connaissances → [Topic] | MANDATORY |
| `FAQPage` | ≥ 6 Q&As | MANDATORY |
| `HowTo` | For step-by-step process pages | MANDATORY |
| `Person` (author) | Attribution | MANDATORY |

### Internal Link Requirements

| Requirement | Standard | Level |
|-------------|---------|-------|
| → Relevant pillar hub | ≥ 1 | MANDATORY |
| → ≥ 2 cluster articles in same silo | ≥ 2 | MANDATORY |
| → Relevant species page | ≥ 1 | MANDATORY |
| → /fr/contact/ or /fr/perroquets-disponibles/ | ≥ 1 | MANDATORY |
| Inbound links | ≥ 5 | MANDATORY |

---

## UNIVERSAL STANDARDS (all page types)

| Standard | Requirement |
|---------|------------|
| Page speed | LCP < 2.5s · CLS < 0.1 · INP < 200ms |
| HTTPS | All URLs HTTPS — no mixed content |
| Mobile | Renders correctly at 375px, 768px, 1200px |
| No broken links | Zero 404s on internal links at publish time |
| No duplicate metadata | title and meta description unique across all FR pages |
| Cookie consent | GDPR banner present (GA4 requires consent) |
| Legal footer links | Mentions Légales · CGV · Confidentialité present in footer |
| Professional email | No Gmail address displayed |
| Canonical | Self-referencing canonical on every page |
| Structured data | Valid JSON-LD (no errors in Rich Results Test) |
