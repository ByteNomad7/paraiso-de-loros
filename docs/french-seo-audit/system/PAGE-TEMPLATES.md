# Page Templates — Paraíso de Aves FR

**Version:** 1.0  
**Date:** 2026-07-29  
**Purpose:** HTML structure templates for every page type. These define the required section order, CSS classes, schema placement, and CTA logic. Generators must follow these templates exactly.

---

## HOW TO USE

Each template shows:
1. `<head>` requirements
2. Section order (mandatory sections marked `[M]`, recommended `[R]`)
3. Schema block placement
4. CTA placement rules
5. Key CSS classes from brand-system.css

All inline `<style>` follows brand tokens:  
`--pa-green: #1B3D2F` · `--pa-gold: #C9A24B` · `--pa-cream: #FAF7F0` · `--pa-text: #1A2A1E`  
Fonts: Playfair Display (headings) · Open Sans (body)

---

## TEMPLATE 1 — COMMERCIAL PAGE

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- [M] Title: 50-60 chars, primary keyword + brand -->
  <title>[Primary keyword] | Paraíso de Aves — Éleveur CITES</title>

  <!-- [M] Meta description: 145-160 chars, CTA word, primary keyword -->
  <meta name="description" content="[Commercial value proposition]. [CTA word] chez Paraíso de Aves — éleveur CITES depuis 1999. [Supporting benefit].">

  <!-- [M] Canonical -->
  <link rel="canonical" href="https://www.paraisodeaves.com/fr/[slug]/">

  <!-- [M] hreflang -->
  <link rel="alternate" hreflang="fr" href="https://www.paraisodeaves.com/fr/[slug]/">
  <link rel="alternate" hreflang="es" href="https://www.paraisodeaves.com/es/[slug-es]/">
  <link rel="alternate" hreflang="x-default" href="https://www.paraisodeaves.com/fr/[slug]/">

  <!-- [M] LCP hero image preload -->
  <link rel="preload" as="image" href="/images/[category]/[slug]-hero.webp" type="image/webp">

  <!-- [M] Schema: WebPage + BreadcrumbList + FAQPage -->
  <script type="application/ld+json">
  [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://www.paraisodeaves.com/fr/[slug]/#webpage",
      "url": "https://www.paraisodeaves.com/fr/[slug]/",
      "name": "[Page Title]",
      "description": "[Meta description]",
      "inLanguage": "fr",
      "isPartOf": { "@id": "https://www.paraisodeaves.com/#website" },
      "about": { "@id": "https://www.paraisodeaves.com/#org" },
      "datePublished": "[YYYY-MM-DD]",
      "dateModified": "[YYYY-MM-DD]",
      "author": { "@id": "https://www.paraisodeaves.com/fr/eleveur-perroquets/#breeder" }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.paraisodeaves.com/fr/" },
        { "@type": "ListItem", "position": 2, "name": "[Category]", "item": "https://www.paraisodeaves.com/fr/[category]/" },
        { "@type": "ListItem", "position": 3, "name": "[Page Title]", "item": "https://www.paraisodeaves.com/fr/[slug]/" }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "[Question 1]", "acceptedAnswer": { "@type": "Answer", "text": "[Answer 1]" } }
        /* ... min 6 Q&As ... */
      ]
    }
    /* ADD Product + Offer block for price pages */
  ]
  </script>

  <link rel="stylesheet" href="/brand-system.css">
  <style>/* Page-specific overrides */</style>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
</head>
<body>

<!-- [M] TRUST MICRO-BAR -->
<div class="trust-bar" role="banner" aria-label="Garanties éleveur">
  <span>✓ Éleveur CITES agréé</span>
  <span>✓ Bilan vétérinaire inclus</span>
  <span>✓ Livraison France entière</span>
  <span>✉ info@paraisodeaves.com</span>
</div>

<!-- [M] HEADER + NAV -->
<header class="site-header" role="banner">
  <!-- Logo, nav: Oiseaux | Connaissances | Élevage | Disponibles | Contact -->
</header>

<!-- [M] BREADCRUMB -->
<nav class="breadcrumb" aria-label="Fil d'Ariane">
  <a href="/fr/">Accueil</a> › <a href="/fr/[category]/">[Category]</a> › [Page Title]
</nav>

<!-- [M] HERO -->
<section class="hero" aria-labelledby="hero-title">
  <picture>
    <source type="image/avif" srcset="/images/[cat]/[slug]-hero.avif">
    <source type="image/webp" srcset="/images/[cat]/[slug]-hero.webp">
    <img src="/images/[cat]/[slug]-hero.jpg" 
         alt="[Species/topic] — Paraíso de Aves éleveur CITES"
         width="1440" height="600" loading="eager" fetchpriority="high">
  </picture>
  <div class="hero-content">
    <h1 id="hero-title">[Primary H1 with keyword]</h1>
    <p class="hero-subtitle">[One-line value proposition]</p>
    <!-- [M] Dual CTA above fold -->
    <div class="hero-ctas">
      <a href="/fr/perroquets-disponibles/" class="btn-primary">Voir les oiseaux disponibles</a>
      <a href="/fr/contact/" class="btn-secondary">Nous contacter</a>
    </div>
    <!-- [M] Trust micro-signals in hero -->
    <div class="hero-trust">
      <span>✓ Documentation CITES</span>
      <span>✓ Garantie santé 72h</span>
      <span>✓ 25 ans d'expérience</span>
    </div>
  </div>
</section>

<!-- [M] INTRODUCTION (commercial hook) -->
<section class="section-intro container-narrow">
  <p class="lead">[2–3 sentences: what this page covers, primary commercial benefit]</p>
</section>

<!-- [M] MAIN CONTENT SECTIONS (H2-driven, varies by page) -->
<main id="main-content" class="container page-wrap">
  <article class="page-content">

    <!-- [M] Section 1: Pourquoi acheter chez nous / commercial value -->
    <section aria-labelledby="s1-title">
      <h2 id="s1-title">[Section heading with keyword variation]</h2>
      <!-- Content -->
    </section>

    <!-- [M] MID-ARTICLE CTA (appears ~50% through content) -->
    <aside class="mid-cta" role="complementary">
      <p>Vous cherchez un oiseau disponible maintenant?</p>
      <a href="/fr/perroquets-disponibles/" class="btn-primary">Voir les disponibilités</a>
    </aside>

    <!-- [M] Section 2: Process / How it works -->
    <section aria-labelledby="s2-title">
      <h2 id="s2-title">Comment [action]</h2>
    </section>

    <!-- [M] TRUST BLOCK -->
    <aside class="trust-block" role="complementary" aria-label="Garanties">
      <div class="trust-item"><span class="trust-icon">🏅</span><strong>Documentation CITES incluse</strong><p>Chaque oiseau part avec ses documents officiels.</p></div>
      <div class="trust-item"><span class="trust-icon">🩺</span><strong>Bilan vétérinaire complet</strong><p>Examen par un vétérinaire aviaire avant le départ.</p></div>
      <div class="trust-item"><span class="trust-icon">🚚</span><strong>Livraison sécurisée</strong><p>Transporteur spécialisé animaux vivants.</p></div>
    </aside>

    <!-- [M] FAQ SECTION (≥ 6 Q&As) -->
    <section aria-labelledby="faq-title">
      <h2 id="faq-title">Questions fréquentes</h2>
      <div class="faq-list">
        <details><summary>[Question 1]</summary><p>[Answer]</p></details>
        <!-- ... min 6 ... -->
      </div>
    </section>

    <!-- [M] BOTTOM CTA -->
    <section class="bottom-cta" aria-labelledby="cta-title">
      <h2 id="cta-title">Prêt à adopter votre perroquet?</h2>
      <p>[Supporting sentence]</p>
      <a href="/fr/contact/" class="btn-primary btn-large">Nous contacter</a>
    </section>

  </article>

  <!-- [M] SIDEBAR -->
  <aside class="sidebar" role="complementary" aria-label="Actions rapides">
    <!-- Delivery badge -->
    <!-- Contact form (compact) -->
    <!-- Related links -->
  </aside>
</main>

<!-- [M] FOOTER -->
<footer role="contentinfo">
  <!-- Logo · Species links · Services · Legal: Mentions Légales · CGV · Confidentialité -->
  <!-- © 2026 Paraíso de Aves · Éleveur CITES enregistré · Noyau Zoologique Officiel -->
</footer>

<!-- [M] MOBILE BOTTOM BAR (hidden on desktop) -->
<div class="mobile-bottom-bar" aria-label="Actions principales">
  <a href="/fr/perroquets-disponibles/" class="btn-primary">Oiseaux disponibles</a>
  <a href="/fr/contact/" class="btn-secondary">Contacter</a>
</div>

<script src="/lang-switcher.js" defer></script>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-4007YHH4H9"></script>
</body>
</html>
```

---

## TEMPLATE 2 — SPECIES PAGE (TIER 1)

Key differences from Commercial template:

```html
<!-- [M] Additional schema: Article + Taxon entity -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": ["WebPage", "AboutPage"],
  "about": {
    "@type": "Thing",
    "name": "[Common name FR]",
    "alternateName": ["[Scientific name]", "[Common name EN]"],
    "sameAs": [
      "https://fr.wikipedia.org/wiki/[Species_Wikipedia_FR]",
      "https://www.wikidata.org/wiki/[QID]"
    ]
  }
}
</script>

<!-- [M] BREEDER NOTE BOX (unique to species pages) -->
<aside class="breeder-note" aria-label="Avis de l'éleveur">
  <img src="/images/eleveur/portrait.jpg" 
       alt="[Prénom], éleveur Paraíso de Aves" 
       width="60" height="60">
  <blockquote>
    "[First-person observation about this species]"
    <cite>— [Prénom], éleveur depuis 1999</cite>
  </blockquote>
</aside>

<!-- [M] ENTITY TRUST SECTION (species → commercial bridges) -->
<section class="entity-trust-grid" aria-labelledby="et-title">
  <h2 id="et-title">Tout ce qu'il faut savoir</h2>
  <div class="trust-card-grid">
    <a href="/fr/perroquets-disponibles/" class="trust-card">🐦 Oiseaux disponibles</a>
    <a href="/fr/prix-[species]/" class="trust-card">💶 Prix indicatifs</a>
    <a href="/fr/garantie-sante/" class="trust-card">🩺 Garantie santé</a>
    <a href="/fr/livraison/" class="trust-card">🚚 Livraison</a>
    <a href="/fr/connaissances/[topic]/" class="trust-card">📚 Guide complet</a>
    <a href="/fr/contact/" class="trust-card">✉ Nous contacter</a>
  </div>
</section>
```

Required H2 sections (in order):
1. `[Species] — présentation générale`
2. `Caractéristiques physiques`
3. `Comportement et personnalité`
4. `Alimentation`
5. `Soins et logement`
6. `Prix d'un [Species]` (links to price page)
7. `Pourquoi adopter chez Paraíso de Aves?`
8. `Questions fréquentes (≥ 8)`

---

## TEMPLATE 3 — BIRD PROFILE PAGE

```html
<!-- Schema: Product + Offer + ImageObject (3+) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "[Species] [sex], [year] — disponible",
  "description": "[Species] élevé à la main, [sex] (confirmé ADN), né en [year]. Documentation CITES incluse.",
  "image": [
    "https://www.paraisodeaves.com/images/disponibles/[ref]-1.webp",
    "https://www.paraisodeaves.com/images/disponibles/[ref]-2.webp",
    "https://www.paraisodeaves.com/images/disponibles/[ref]-3.webp"
  ],
  "category": "[Species common name]",
  "additionalProperty": [
    { "@type": "PropertyValue", "name": "Sexe", "value": "[Mâle/Femelle]" },
    { "@type": "PropertyValue", "name": "Année de naissance", "value": "[YYYY]" },
    { "@type": "PropertyValue", "name": "Élevage", "value": "À la main" },
    { "@type": "PropertyValue", "name": "CITES", "value": "Annexe [I/II] — documentation incluse" }
  ],
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "EUR",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "description": "Prix sur demande — contactez-nous"
    },
    "seller": { "@id": "https://www.paraisodeaves.com/#org" }
  }
}
</script>

<!-- Bird profile page structure -->
<!-- [M] 3-photo gallery (face · full body · personality) -->
<!-- [M] Status badge: Disponible (green) / Réservé (amber) -->
<!-- [M] Attributes: Species · Sex · Year · Hand-raised · CITES -->
<!-- [M] Documentation checklist -->
<!-- [M] CTA: "Demander des informations sur cet oiseau" (pre-populated) -->
<!-- [M] Back-link to species page + /fr/perroquets-disponibles/ -->
```

---

## TEMPLATE 4 — CITY LANDING PAGE

Key schema difference:
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Vente de perroquets à [Ville]",
  "serviceType": "Vente de perroquets exotiques",
  "provider": { "@id": "https://www.paraisodeaves.com/#org" },
  "areaServed": {
    "@type": "City",
    "name": "[Ville]",
    "addressCountry": "FR"
  },
  "availableChannel": {
    "@type": "ServiceChannel",
    "serviceUrl": "https://www.paraisodeaves.com/fr/contact/"
  }
}
```

Required sections:
1. Hero: "Perroquets à Vendre à [Ville]" + delivery timeline
2. Species grid (≥ 4 species cards)
3. "Livraison à [Ville]" — specific timeline + transport detail
4. Trust block (CITES, vet, guarantee)
5. FAQ (≥ 4 Q&As including city-specific)
6. "Villes proches" (3 nearby city links)
7. CTA → contact + disponibles

---

## TEMPLATE 5 — KNOWLEDGE / CLUSTER PAGE

Key schema additions:
```json
// For process pages (alimentation, soins, CITES):
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "[How to...]",
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "[Step name]", "text": "[Detail]" }
  ]
}
```

Required sections:
1. Hero (H1 = topic keyword)
2. Introduction (what reader will learn)
3. Body sections (H2-driven, 4+ sections)
4. "L'avis de l'éleveur" box (for care/behaviour/health)
5. External sources cited (≥ 1)
6. FAQ (≥ 6 Q&As)
7. CTA → relevant commercial page
8. "Articles liés" — 3 cluster siblings

---

## SHARED COMPONENT LIBRARY

### `trust-bar` — appears top of every page
```html
<div class="trust-bar">
  <div class="trust-bar-inner container">
    <span>✓ Éleveur CITES agréé</span>
    <span>✓ Bilan vétérinaire complet</span>
    <span>✓ 25 ans d'expérience</span>
    <span class="trust-bar-email">✉ <a href="mailto:info@paraisodeaves.com">info@paraisodeaves.com</a></span>
  </div>
</div>
```

### `trust-block` — appears on all commercial + species pages
3-column grid: CITES · Vet · Livraison — each with icon, bold title, 1-line description.

### `cta-band` — bottom-of-page conversion section
Forest Green background, centred H2, subtitle, gold button, "Réponse sous 24h" subtext.

### `mobile-bottom-bar` — visible only on mobile
Fixed bottom bar: "Oiseaux disponibles" (primary, full gold) + "Contacter" (outline).

### `breeder-note` — species + knowledge pages
Avatar + blockquote with first-person observation + citation.

### `faq-list` — all page types
`<details>`/`<summary>` implementation. FAQPage schema always accompanies.
