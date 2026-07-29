# UX Improvement Plan — Paraíso de Aves FR

**Date:** 2026-07-29  
**Role:** UX Director + CRO Specialist  
**Scope:** Every design and interaction layer of the French section

---

## DESIGN SYSTEM ASSESSMENT

### Current tokens (from brand-system.css)

```css
/* Colours */
--pa-green: #1B3D2F    /* Forest Green — primary */
--pa-gold:  #C9A24B    /* Gold — accent */
--pa-cream: #FAF7F0    /* Background */
--pa-text:  #1A2A1E    /* Body text */

/* Typography */
Display:  Playfair Display (serif)
Body:     system-ui (variable — platform-dependent)

/* Radius */
--pa-radius-md: 8px
--pa-radius-lg: 16px
```

**Assessment:** The colour palette is excellent — Forest Green is distinctive, warm, and signals expertise (botanical/natural authority). Gold as accent is premium without being garish. The cream background is better than white for readability and warmth.

**The problem:** `system-ui` for body text means different fonts on macOS (San Francisco), Windows (Segoe UI), Android (Roboto), iOS (San Francisco). The site looks different on every platform. For a premium brand, this is unacceptable.

**Fix:** Set body font explicitly: `font-family: 'Open Sans', 'Lato', sans-serif;` — load via Google Fonts (same CDN already used for Playfair Display).

---

## 1. TYPOGRAPHY

### Current state
- Headings: Playfair Display — ✅ correct premium choice
- Body: system-ui — ❌ platform-variable
- No defined type scale (font-size hierarchy inconsistent across pages)
- Line height inconsistent between pages built in different phases

### Recommended type scale

```css
/* Display / Hero */
h1: Playfair Display, 2.8rem–3.6rem, line-height: 1.15

/* Section headings */
h2: Playfair Display, 2rem–2.4rem, line-height: 1.2

/* Card/sub headings */
h3: Playfair Display, 1.4rem–1.6rem, line-height: 1.3

/* Body */
p: Open Sans, 1rem–1.1rem, line-height: 1.7, color: #1A2A1E

/* Small / meta */
small: Open Sans, 0.875rem, color: #4A6355
```

**UX impact:** Consistent type scale makes the site feel like one designed product rather than a collection of pages built at different times.

---

## 2. SPACING

### Current state
- Section padding varies from ~40px to ~120px depending on page/phase
- Card grid gaps are inconsistent
- Some pages (cluster, city pages) feel cramped; others feel over-padded

### Recommended spacing system

```css
/* Section spacing */
.section-sm: padding: 40px 0
.section-md: padding: 72px 0
.section-lg: padding: 104px 0

/* Content max-width */
.container:  max-width: 1200px, padding: 0 24px
.container-narrow: max-width: 860px (for reading-focused pages)

/* Grid gaps */
.grid-sm: gap: 16px
.grid-md: gap: 24px
.grid-lg: gap: 32px
```

Apply consistently across all page types. Most cluster and city pages need their horizontal content padding increased — content currently feels too close to viewport edges on mid-size screens.

---

## 3. CARDS

### Current state
Cards appear in 4+ different styles across the site:
1. Species cards (Phase 6 style) — image + text + button
2. Blog post cards — different layout
3. Available bird cards — yet another style
4. Knowledge/cluster cards — simplified

This inconsistency is the most visible sign of phased development. A premium brand has one card style, not four.

### Recommended card system

**Standard content card:**
```
┌──────────────────────────────┐
│  [Image — 16:9, full width]  │
├──────────────────────────────┤
│  Category label (small caps) │
│  Card title (Playfair)       │
│  Body text (2 lines max)     │
│  CTA link →                  │
└──────────────────────────────┘
```
Border: 1px solid rgba(27,61,47,0.1)  
Shadow: 0 2px 12px rgba(0,0,0,0.06)  
Hover: translateY(-3px), shadow deepens  
Border-radius: 12px

**Product/species card:**
```
┌──────────────────────────────┐
│  [Image — 4:3, full width]   │
│  [Status badge top-right]    │
├──────────────────────────────┤
│  Species name (Playfair)     │
│  Scientific name (italic)    │
│  Key attributes (icons)      │
│  [Gold CTA button]           │
└──────────────────────────────┘
```

**Available bird card:**
```
┌──────────────────────────────┐
│  [Bird photo]                │
│  [Status pill: Disponible]   │
├──────────────────────────────┤
│  Species name                │
│  Sex + Age/Year              │
│  [Gold: Demander infos →]    │
└──────────────────────────────┘
```

---

## 4. BUTTONS

### Current state
- Gold primary button exists (`ph6-sc-btn`, `--pa-gold`) — ✅ good
- Outline button exists — ✅ good
- Button text varies: "Voir la fiche →", "Nous Contacter", "Demander des informations"
- No consistent loading/hover states across all buttons
- Some CTAs are anchor-styled links, not visually buttons

### Recommended button system

```css
/* Primary CTA */
.btn-primary {
  background: #C9A24B;
  color: #1B3D2F;
  padding: 14px 28px;
  border-radius: 6px;
  font-family: Open Sans;
  font-weight: 600;
  font-size: 1rem;
  letter-spacing: 0.02em;
  transition: background 0.2s, transform 0.15s;
}
.btn-primary:hover { background: #b08934; transform: translateY(-1px); }

/* Secondary / outline */
.btn-secondary {
  border: 2px solid #1B3D2F;
  color: #1B3D2F;
  padding: 12px 26px;
  border-radius: 6px;
  background: transparent;
}
.btn-secondary:hover { background: rgba(27,61,47,0.06); }

/* Ghost / text CTA */
.btn-text {
  color: #C9A24B;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
}
```

**Button copy standard:**
- Primary CTA: action-oriented ("Demander des informations", "Voir les disponibilités")
- Secondary: context-oriented ("En savoir plus", "Voir la fiche")
- Never: "Cliquez ici", "En savoir plus →" (too generic for premium brand)

---

## 5. NAVIGATION

### Current state
Nav: Birds (dropdown) | Care | Shop | Blog | Contact  
Logo: Present  
Mobile: Hamburger menu (assumed)

### Issues
- "Shop" in nav sounds like a generic e-commerce store — at odds with premium breeder positioning
- "Care" is ambiguous — could mean care products or adoption care
- No "Available Birds" as a primary nav item — the most important conversion page is buried
- Nav order doesn't reflect buyer journey

### Recommended nav restructure

```
[Logo]  Oiseaux ▾  |  Connaissances ▾  |  Élevage  |  Disponibles  |  Contact
```

Where:
- **Oiseaux ▾** → dropdown: flagship species + "/fr/especies/ — Toutes les espèces"
- **Connaissances ▾** → dropdown: blog, knowledge hub, soins, alimentation (as built)
- **Élevage** → direct link to /fr/eleveur-perroquets/ (builds brand trust via nav)
- **Disponibles** → direct, always-visible link to /fr/perroquets-disponibles/
- **Contact** → always visible (conversion)

**Mobile nav:** "Disponibles" and "Contact" must be the two most accessible items on mobile — sticky footer bar on mobile showing these two only.

---

## 6. HEADER

### Current state
- Sticky header with logo + nav
- No phone number (consistent with email-only model — correct)
- No trust badge in header (CITES, etc.)

### Recommended improvements

**UX-HE01 — Trust micro-bar above header (desktop)**  
3px height, dark green background, cream text:  
`"Éleveur CITES agréé · Bilan vétérinaire inclus · Livraison France entière · ✉ paraisodeloros@paraisodeaves.com"`

This micro-bar is used by every premium e-commerce site for a reason — it answers 3 trust questions before the user has even scrolled.

**UX-HE02 — Sticky header with CTA**  
After scrolling past hero, the sticky header should show a gold "Nous Contacter" or "Voir les disponibilités" button on the right side. Currently the header is purely navigational.

---

## 7. FOOTER

### Current state
Footer contains: logo, tagline, links for Nos Oiseaux / Accessoires / Villes / Informations + contact email.

### Issues
- 50 city links in footer are overwhelming — not necessary at footer level
- No trust badges in footer (CITES, vet, 25 years)
- No legal page links (Mentions Légales, CGV, Confidentialité) — legally required
- No "Noyau Zoologique Officiel" badge
- Email is Gmail

### Recommended footer structure

```
┌────────────────────────────────────────────────────────┐
│ [Logo + tagline]  │  ESPÈCES    │  SERVICES  │ LÉGAL   │
│                   │  Gris Gabon │  Garantie  │ Mentions│
│ [Trust badges:    │  Aras       │  Livraison │ CGV     │
│  CITES · Vet ·   │  Amazones   │  Adoption  │ Conf.   │
│  25 ans]          │  Cacatoès   │  Contact   │         │
│                   │  [+4 more]  │            │         │
├────────────────────────────────────────────────────────┤
│ © 2026 Paraíso de Aves · Éleveur CITES enregistré     │
│ Noyau Zoologique Officiel · info@paraisodeaves.com     │
│ Mentions Légales · CGV · Politique de confidentialité  │
└────────────────────────────────────────────────────────┘
```

City pages should be accessible from a "Livraison en France" section, not the main footer nav — reduces noise.

---

## 8. HERO SECTIONS

### Current state
Homepage hero: background image + "Voir les Espèces" (Gold) + "Nous Contacter" (Outline) — ✅ good structure.  
Species page heroes: vary by page phase — inconsistent.

### Issues on non-homepage heroes
- Cluster page heroes often have no CTA in hero area
- City page heroes are formulaic and don't differentiate
- Species page heroes don't always surface the price link

### Recommended hero standard

Every hero block should contain:
1. H1 with primary keyword (already present)
2. Subtitle (1 line, plain Open Sans, not Playfair) — provides immediate context
3. **Primary gold CTA** ("Voir les disponibilités" or "Nous contacter")
4. **Secondary outline CTA** ("En savoir plus ↓" for informational pages)
5. One trust micro-element: "✓ CITES · ✓ Garantie santé · ✓ Livraison France"

---

## 9. VISUAL HIERARCHY

### Current issues
- H2s and H3s sometimes have identical visual weight
- Trust badges and icons lack visual consistency (some emoji-based, some SVG)
- The gold accent is underused for hierarchy emphasis — most pages use it only on buttons
- Some pages have no clear visual focus point beyond the hero

### Improvements
- Use gold sparingly as a hierarchical emphasis colour for key stats/numbers ("25 ans", "Documentation CITES")
- Replace emoji-based icons with a consistent SVG icon set (Heroicons or Phosphor Icons — open source)
- Ensure every section has a clear anchor: stat block, visual, or pull-quote before body copy

---

## 10. ACCESSIBILITY

### Current issues (auditable from code patterns)
- Some button text may be too low contrast on gold backgrounds — gold (#C9A24B) on green (#1B3D2F) passes WCAG AA but gold on white fails
- Alt text inconsistency (assessed in IMAGE-AUTHORITY-AUDIT.md)
- No skip-to-content link present
- Form labels: some inputs may rely on placeholder only (no visible label)
- Touch targets: need verification on mobile

### Fixes
- Add `<a href="#main-content" class="skip-link">Aller au contenu</a>` to all page templates
- All form inputs must have explicit `<label>` elements (not placeholder-only)
- Check all gold-on-white instances — use #b08934 (darker gold) for text on white backgrounds
- All images: descriptive alt text (see IMAGE-AUTHORITY-AUDIT.md)
- Touch targets minimum 44×44px on mobile

---

## UX IMPROVEMENT PRIORITY MATRIX

| Improvement | ROI | SEO impact | Conv. impact | Complexity |
|-------------|-----|-----------|-------------|-----------|
| Trust micro-bar in header | High | Medium | High | Low |
| Sticky header CTA | High | Low | High | Low |
| Nav restructure (add Disponibles) | High | Medium | High | Low |
| Footer legal links | High | High | High | Low |
| Body font (Open Sans) | Medium | Low | Medium | Low |
| Button system standardisation | High | Low | High | Medium |
| Card system unification | High | Low | High | High |
| Available bird card differentiation | Very High | Low | Very High | Low |
| Type scale standardisation | Medium | Low | Medium | Medium |
| Hero CTA standardisation | High | Medium | High | Medium |
| Accessibility fixes (skip, labels) | Medium | Medium | Low | Low |
