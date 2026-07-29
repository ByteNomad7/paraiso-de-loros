# Entity Schema Audit — Paraíso de Aves French Section

**Date:** 2026-07-29  
**Standard:** Schema.org + Google Rich Results requirements  
**Policy:** Never fabricate AggregateRating, Review, or Person data

---

## LEGEND

- ✅ Present and correct
- ⚠️ Present but incomplete or suboptimal
- ❌ Missing
- 🚫 Must never be added (fabricated data)

---

## 1. SITE-WIDE / GLOBAL SCHEMAS

| Schema Type | Status | Location | Notes |
|-------------|--------|----------|-------|
| `Organization` | ✅ | /fr/ (homepage) | Has @id, name, url, email, address, areaServed, knowsAbout |
| `WebSite` | ✅ | /fr/ | Has @id, SearchAction via sitelinks |
| `LocalBusiness` | ✅ | /fr/ + /fr/eleveur-perroquets/ | Has @id, areaServed: France |
| `Person` (breeder) | ❌ | /fr/eleveur-perroquets/ | Should add breeder Person with name, jobTitle, knowsAbout |
| `WebSite` sitelinks | ⚠️ | /fr/ | SearchAction present but potentialAction may be incomplete |

**Recommendation:** Add `Person` schema to `/fr/eleveur-perroquets/` for the breeder entity. Include `name`, `jobTitle: "Éleveur de perroquets"`, `knowsAbout: ["Psittacidae", "CITES", ...]`, `worksFor: Organization@id`.

---

## 2. SPECIES PAGE SCHEMAS

### Tier 1 Species Pages (/fr/[species]/)

| Schema Type | Status | Pages | Notes |
|-------------|--------|-------|-------|
| `WebPage` | ✅ | All 10 | Standard implementation |
| `BreadcrumbList` | ✅ | All 10 | 3-level: Home → Species |
| `FAQPage` | ✅ | All 10 | 5–8 Q&As per page |
| `Product` | ⚠️ | Partial | Present on price pages, absent from species pages themselves |
| `Taxon` | ❌ | All 10 | Scientific name entities not declared |
| `ImageObject` | ✅ | Most | Multiple images with caption, url, contentUrl |
| `Article` | ⚠️ | Some | Not consistently present |

**Recommendation — Tier 1 Species:**
```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "about": {
    "@type": "Species",
    "name": "Gris du Gabon",
    "alternateName": "Perroquet Gris",
    "scientificName": "Psittacus erithacus",
    "taxonRank": "Species",
    "parentTaxon": "Psittacidae"
  }
}
```
Note: `Species` extends `Taxon` in Schema.org — use `@type: ["WebPage", "AboutPage"]` with `about` pointing to a Taxon entity.

### Tier 2 Species Pages (/fr/especies/[species]/)

| Schema Type | Status | Pages | Notes |
|-------------|--------|-------|-------|
| `WebPage` | ✅ | All 26 | Standard |
| `BreadcrumbList` | ✅ | All 26 | 3-level |
| `FAQPage` | ✅ | All 26 | ≥8 Q&As per brief |
| `Article` | ✅ | All 26 | Required by brief |
| `Taxon` (about) | ❌ | All 26 | Missing scientific entity declaration |

---

## 3. COMMERCIAL PAGE SCHEMAS

### Price Pages

| Page | Schema Types | Status | Issues |
|------|-------------|--------|--------|
| /fr/prix-perroquet-gris-du-gabon/ | WebPage + Product + FAQPage | ✅ | Product has offers with priceRange, no fabricated price |
| /fr/prix-ara-hyacinthe/ | WebPage + Product + FAQPage | ✅ | Similar to above |
| /fr/prix-cacatoes/ | WebPage + Product + FAQPage | ✅ | Similar to above |

**Missing price pages** (no schema, no page): Amazone, Éclectus, Pionus, Ara Bleu et Jaune, Ara Macao, Sénégal, Perruche à Collier — 7 species have zero price entity coverage.

### Availability / Listing Pages

| Page | Current Schema | Recommended Schema | Gap |
|------|---------------|-------------------|-----|
| /fr/perroquets-disponibles/ | WebPage | `CollectionPage` + `ItemList` | ❌ ItemList missing |
| /fr/acheter-perroquet/ | WebPage | WebPage + FAQPage + Service | ⚠️ No Service schema |
| /fr/acheter-ara/ | WebPage | WebPage + Service | ⚠️ No Service schema |
| /fr/acheter-gris-du-gabon/ | WebPage | WebPage + Service | ⚠️ No Service schema |
| /fr/adopter-perroquet/ | WebPage | WebPage + Service | ⚠️ No Service schema |
| /fr/vente-oiseaux/ | WebPage | WebPage + ItemList | ❌ ItemList missing |

### Recommended `ItemList` for /fr/perroquets-disponibles/
```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Perroquets Disponibles — Paraíso de Aves",
  "mainEntity": {
    "@type": "ItemList",
    "name": "Perroquets disponibles à l'adoption",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Product",
          "name": "Gris du Gabon élevé à la main",
          "category": "Perroquets",
          "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "priceCurrency": "EUR",
            "priceSpecification": {
              "@type": "PriceSpecification",
              "description": "Prix sur demande"
            }
          }
        }
      }
    ]
  }
}
```

---

## 4. SERVICE PAGE SCHEMAS

| Page | Current | Recommended | Priority |
|------|---------|-------------|----------|
| /fr/livraison/ | WebPage + FAQPage | + `Service` schema | High |
| /fr/garantie-sante/ | WebPage + FAQPage | + `Service` + `WarrantyPromise` | High |
| /fr/processus-adoption/ | WebPage | + `Service` + HowTo | Medium |
| /fr/caisses-de-transport/ | Unknown | `Product` + `Service` | Medium |

### Recommended `Service` schema for /fr/livraison/
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Livraison de perroquets en France",
  "provider": { "@id": "https://www.paraisodeaves.com/#org" },
  "serviceType": "Transport d'animaux vivants",
  "areaServed": { "@type": "Country", "name": "France" },
  "description": "Livraison de perroquets exotiques dans toute la France en 2 à 4 jours ouvrés via transporteur spécialisé IATA.",
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock"
  }
}
```

---

## 5. KNOWLEDGE BASE SCHEMAS

| Page | Current | Recommended |
|------|---------|-------------|
| /fr/connaissances/ | WebPage | + `CollectionPage` + `ItemList` |
| /fr/connaissances/adoption/ | WebPage | + `HowTo` |
| /fr/connaissances/alimentation/ | WebPage + FAQPage | ✅ Add Article |
| /fr/connaissances/cites/ | WebPage | + `Article` + `LegalService` mention |
| /fr/connaissances/comportement/ | WebPage + FAQPage | ✅ |
| /fr/connaissances/especes/ | WebPage | + `CollectionPage` |
| /fr/connaissances/faq/ | FAQPage | ✅ |
| /fr/connaissances/livraison/ | WebPage | + `Service` reference |
| /fr/connaissances/prix/ | WebPage | + `Article` |
| /fr/connaissances/sante/ | WebPage + FAQPage | ✅ |

---

## 6. BLOG / ARTICLE SCHEMAS

| Page | Current | Status | Notes |
|------|---------|--------|-------|
| /fr/blog/ | WebPage | ⚠️ | Should be `Blog` type |
| /fr/blog/perroquet-gris-du-gabon-guide/ | Article + BreadcrumbList + FAQPage | ✅ | |
| /fr/blog/alimentation-perroquets/ | Article | ⚠️ | Verify FAQPage present |
| /fr/blog/ara-hyacinthe-guide/ | Article | ⚠️ | Verify complete |
| /fr/blog/choisir-eleveur-serieux/ | Article | ⚠️ | Add HowTo schema |
| /fr/blog/combien-vit-perroquet/ | Article | ⚠️ | Add FAQPage |
| /fr/blog/guide-cites-france/ | Article | ⚠️ | Add HowTo for CITES process |
| /fr/blog/meilleurs-perroquets-debutants/ | Article | ⚠️ | Redundant with /fr/perroquet-pour-debutant/ — consolidation candidate |
| /fr/blog/preparer-maison-perroquet/ | Article | ⚠️ | Add HowTo |
| /fr/blog/prix-perroquet-france/ | Article | ⚠️ | Redundant with price pages — consolidation candidate |
| /fr/blog/quel-perroquet-choisir/ | Article | ⚠️ | Weak entity — needs expansion or consolidation |
| /fr/blog/eclectus-guide/ | Article | ⚠️ | Cross-link to /fr/eclectus/ bidirectionally |

---

## 7. GALLERY SCHEMAS

| Page | Current | Recommended |
|------|---------|-------------|
| /fr/galerie/ | ImageGallery | ✅ Keep + add ItemList |
| /fr/galerie/aras/ | ImageGallery | + `CollectionPage` |
| /fr/galerie/perroquets-disponibles/ | ImageGallery | + `ItemList` with `Product` |
| /fr/galerie/[categories] | ImageGallery | Standard — OK |

---

## 8. GEOGRAPHIC / LOCAL SEO SCHEMAS

| Page Type | Current | Recommended | Priority |
|-----------|---------|-------------|----------|
| /fr/perroquets-a-vendre-paris/ | WebPage + BreadcrumbList + LocalBusiness ref | + `Service` with `areaServed: Paris` | High |
| All 50 city pages | Same pattern | + `LocalBusiness` + `areaServed: [city]` | High |

### Recommended addition to all city pages:
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Vente de perroquets à [Ville]",
  "provider": { "@id": "https://www.paraisodeaves.com/#org" },
  "areaServed": {
    "@type": "City",
    "name": "[Ville]",
    "addressCountry": "FR"
  },
  "serviceType": "Vente de perroquets exotiques",
  "availableChannel": {
    "@type": "ServiceChannel",
    "serviceUrl": "https://www.paraisodeaves.com/fr/contact/"
  }
}
```

---

## 9. TALKING CLUSTER SCHEMAS

| Page | Current | Status |
|------|---------|--------|
| /fr/perroquet-qui-parle/ | WebPage + CollectionPage + FAQPage | ✅ |
| /fr/comment-apprendre-a-un-perroquet-a-parler/ | WebPage + FAQPage | ⚠️ Add HowTo |
| /fr/pourquoi-mon-perroquet-ne-parle-pas/ | WebPage + FAQPage | ⚠️ Add Article |
| /fr/les-perroquets-les-plus-intelligents/ | WebPage + FAQPage | ⚠️ Add Article |
| /fr/perroquet-qui-parle-le-mieux/ | WebPage + FAQPage | ⚠️ Add Article or CollectionPage |
| All other cluster pages | WebPage + FAQPage | ⚠️ Add Article |

**Recommended addition to /fr/comment-apprendre-a-un-perroquet-a-parler/:**
```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Comment apprendre à un perroquet à parler",
  "estimatedCost": { "@type": "MonetaryAmount", "value": "0", "currency": "EUR" },
  "totalTime": "P3M",
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "Choisir les bons mots", "text": "Commencer par des salutations contextuelles répétées quotidiennement." },
    { "@type": "HowToStep", "position": 2, "name": "Sessions courtes et régulières", "text": "5 à 10 minutes, 2 à 3 fois par jour, avec contact visuel direct." },
    { "@type": "HowToStep", "position": 3, "name": "Renforcement positif", "text": "Répondre avec enthousiasme sincère quand le perroquet prononce un mot." }
  ]
}
```

---

## 10. PRIORITY SCHEMA GAPS RANKED

| Priority | Gap | Affected Pages | SEO Impact |
|----------|-----|---------------|------------|
| P1 | `Service` schema on city pages (50 pages) | /fr/perroquets-a-vendre-*/ | Local SEO — HIGH |
| P1 | `ItemList` on /fr/perroquets-disponibles/ | 1 page | Rich results — HIGH |
| P2 | `HowTo` on training and process pages | 4 pages | Featured snippet — HIGH |
| P2 | `Taxon/Species` on all species pages | 36 pages | Entity disambiguation — HIGH |
| P3 | `Service` on service pages | 4 pages | Trust signals — MEDIUM |
| P3 | `Person` for breeder | 1 page | E-E-A-T — MEDIUM |
| P4 | `Article` on cluster pages | 9 pages | Content classification — MEDIUM |
| P4 | Missing price pages for 7 species | 7 pages | Commercial intent — MEDIUM |
| P5 | `Blog` type on /fr/blog/ | 1 page | Content structure — LOW |
| P5 | Consolidate duplicate blog/guide pairs | 3 pairs | Duplicate entity — LOW |
