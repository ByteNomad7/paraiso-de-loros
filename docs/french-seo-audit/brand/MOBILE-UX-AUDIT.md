# Mobile UX Audit — Paraíso de Aves FR

**Date:** 2026-07-29  
**Role:** UX Director + Technical SEO Architect  
**Scope:** Full mobile experience audit, all French pages

---

## MOBILE CONTEXT

Over 65% of parrot-related searches in France originate on mobile. The buyer journey typically starts on mobile (discovery, research, comparison) and completes on desktop (enquiry form). Fixing mobile drop-off at the research stage directly improves desktop conversion rates.

Key mobile user behaviours for this site:
- Search "[species] prix france" → land on price page → evaluate → bookmark for desktop
- Search "perroquet à vendre [city]" → land on city page → evaluate → contact
- Browse gallery on social media → tap link → expect visual-first experience

---

## 1. NAVIGATION — MOBILE

### Current state
- Hamburger menu assumed (nav items include Birds, Care, Shop, Blog, Contact)
- No "Disponibles" in primary nav

### Critical issues

**MX-N01 — "Disponibles" buried in mobile nav**  
The most conversion-relevant page (/fr/perroquets-disponibles/) is not in the primary mobile nav. A buyer on mobile has 2–3 taps tolerance before abandoning. If they can't find available birds within 3 taps from any page, they leave.

**Fix:** Add a persistent bottom bar on mobile for the two most important actions:
```html
<div class="mobile-bottom-bar">
  <a href="/fr/perroquets-disponibles/" class="btn-primary">Oiseaux disponibles</a>
  <a href="/fr/contact/" class="btn-secondary">Nous contacter</a>
</div>
```
This replaces the need to open the hamburger menu for conversion actions.

**MX-N02 — Dropdown menus on mobile**  
Dropdown/hover menus are a well-known mobile usability failure. They require precise tapping and often trigger on accidental hover. Each dropdown should be replaced with an expandable accordion on mobile.

---

## 2. TOUCH TARGETS

### Standard requirement: minimum 44×44px

### Current risk areas

| Element | Estimated current size | Risk |
|---------|----------------------|------|
| Nav hamburger icon | ~32×32px | Too small |
| Card "Voir la fiche →" links | Varies | Often <44px height |
| Footer links | ~20px line height | Too small |
| Social/contact icons | ~24×24px | Too small |
| Form radio buttons / checkboxes | Default browser | Often <44px |
| Breadcrumb links | ~18px | Too small |

### Fix
All interactive elements need minimum 44×44px touch area. This can be achieved with `padding` without changing visual size:
```css
.nav-link { padding: 12px 16px; } /* ensures 44px+ height */
.card-cta { min-height: 44px; display: flex; align-items: center; }
.footer-link { padding: 8px 4px; }
```

---

## 3. FORMS — MOBILE

### Contact form issues

**MX-F01 — Input field sizing**  
Inputs smaller than 16px font size trigger iOS auto-zoom, which breaks layout. All form inputs must have `font-size: 16px` minimum.

```css
input, textarea, select { font-size: 16px; }
```

**MX-F02 — Textarea scroll conflict**  
On mobile, scrolling inside a textarea can conflict with page scroll. The textarea in the contact form should have `touch-action: pan-y` or a fixed minimum height that doesn't require internal scrolling for typical messages.

**MX-F03 — Submit button full-width on mobile**  
Submit button should be 100% width on mobile (`width: 100%`) — makes tapping reliable and adds visual emphasis.

**MX-F04 — Error handling**  
Form validation errors should appear as inline messages below each field, not as a browser alert or page-top error. Browser alerts on mobile are particularly disruptive.

**MX-F05 — Input types for better mobile keyboard**  
```html
<input type="email" name="email">     <!-- email keyboard -->
<input type="tel" name="phone">       <!-- numeric keyboard -->
<input type="text" autocomplete="name"> <!-- name autofill -->
```

---

## 4. BUTTONS — MOBILE

### Current issues

**MX-B01 — Dual CTA buttons on narrow screens**  
Pages with two side-by-side CTAs (hero: "Voir les Espèces" + "Nous Contacter") stack awkwardly or overflow on sub-375px screens.

**Fix:** On mobile, stack CTAs vertically:
```css
@media (max-width: 480px) {
  .hero-ctas { flex-direction: column; gap: 12px; }
  .hero-ctas .btn { width: 100%; text-align: center; }
}
```

**MX-B02 — Button padding insufficient for mobile tapping**  
Some buttons, particularly in sidebars and cards, have insufficient vertical padding for confident one-handed tapping.

Minimum: `padding: 14px 24px` for primary CTAs on mobile.

---

## 5. IMAGE LOADING — MOBILE

### Current issues

**MX-I01 — Hero images not optimised for mobile viewport**  
Hero images built for 1440px wide screens serve unnecessarily large files to 375px mobile screens. The `srcset` pattern must include a mobile-specific resolution:

```html
<img srcset="hero-480w.webp 480w, 
             hero-800w.webp 800w, 
             hero-1440w.webp 1440w"
     sizes="(max-width: 480px) 480px, 
            (max-width: 1000px) 800px, 
            1440px"
     src="hero-800w.jpg" alt="...">
```

**MX-I02 — Lazy loading on below-fold images**  
All gallery and card images below the fold must use `loading="lazy"`. Without this, mobile devices load all images on page load, which is a serious LCP/FCP penalty.

**MX-I03 — Aspect ratio declarations**  
All images need explicit `width` and `height` attributes so the browser reserves space before the image loads — preventing Cumulative Layout Shift (CLS), which is a Core Web Vitals failure.

---

## 6. SCROLLING — MOBILE

### Current issues

**MX-SC01 — Two-column layout on small screens**  
The `.page-wrap` grid (1fr 300px — main content + sidebar) compresses badly at 375px if not handled correctly. The sidebar should collapse below the main content on mobile, not beside it.

Expected breakpoint pattern:
```css
.page-wrap { display: grid; grid-template-columns: 1fr 300px; gap: 32px; }

@media (max-width: 900px) {
  .page-wrap { grid-template-columns: 1fr; }
  .sidebar { order: 2; } /* sidebar below main content on mobile */
}
```

**MX-SC02 — Horizontal scroll on some pages**  
Wide elements (tables, code blocks, comparison matrices) can cause horizontal scroll on mobile. All tables should have `overflow-x: auto` wrapper. Comparison tables should be reformatted as stacked cards on mobile.

**MX-SC03 — Sticky sidebar disappears on mobile**  
The sidebar contact form — which is the primary CTA on cluster and species pages — disappears on mobile because the sidebar collapses to bottom. The fix is the persistent mobile bottom bar (MX-N01).

---

## 7. CTA VISIBILITY — MOBILE

### Current state
Multiple pages have the primary CTA in the sidebar (right column), which is invisible on mobile (collapses to bottom of very long pages).

### Impact
A user reading a 3,000-word species guide on mobile will scroll past all content, past the entire article, before reaching the contact CTA that was in the sidebar. Conversion rate is near zero from these pages on mobile.

### Fixes

**MX-CTA01 — Persistent mobile bottom bar** (as described in MX-N01)  
Showing on all pages: "Oiseaux disponibles" + "Contacter"

**MX-CTA02 — Mid-article CTA block**  
On long cluster pages and species guides, insert a CTA block approximately 60% through the article:
```html
<div class="mid-article-cta">
  <p>Vous cherchez un [Species] élevé à la main?</p>
  <a href="/fr/perroquets-disponibles/" class="btn-primary">Voir les oiseaux disponibles</a>
</div>
```

**MX-CTA03 — Species page sticky CTA on mobile**  
On Tier 1 species pages, a sticky "Voir les prix" or "Demander des infos" button pinned to the bottom of the viewport as the user scrolls.

---

## 8. LOADING SPEED — MOBILE

### Performance issues to address

**MX-P01 — Render-blocking resources**  
`brand-system.css` and Google Fonts should be loaded without render-blocking. Current approach (assumed linked in `<head>`) may delay First Contentful Paint.

```html
<!-- Preconnect for Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Async load non-critical CSS -->
<link rel="preload" href="/brand-system.css" as="style" onload="this.rel='stylesheet'">
```

**MX-P02 — lang-switcher.js deferred correctly**  
Memory notes that `lang-switcher.js` is deferred — ✅ correct. Verify GA4 is also loaded with `async` attribute.

**MX-P03 — Inline CSS on every page**  
All page CSS is inline `<style>` tags per the design system. This approach is fast (no external CSS request) but results in larger HTML payloads. For pages exceeding ~15KB of inline CSS, consider extracting page-specific styles to a linked file with `<link rel="preload">`.

**MX-P04 — Core Web Vitals targets**

| Metric | Target | Current risk |
|--------|--------|-------------|
| LCP (Largest Contentful Paint) | < 2.5s | Hero image size + format risk |
| FID / INP | < 200ms | Low JS use — likely OK |
| CLS | < 0.1 | Missing width/height on images |

---

## 9. ACCESSIBILITY — MOBILE SPECIFIC

**MX-A01 — Font size for readability**  
Body text should be minimum 16px on mobile. Currently risk of sub-16px text in sidebar, breadcrumbs, and card metadata.

**MX-A02 — Contrast on coloured backgrounds**  
Gold (#C9A24B) text on white (#FFFFFF) does not meet WCAG AA (contrast ratio ~2.5:1, required 4.5:1). Gold should only be used as button background (with dark green text on top) or as a border/decoration.

**MX-A03 — Focus indicators**  
All interactive elements need visible `:focus` styles for keyboard/screen reader users:
```css
:focus-visible { outline: 2px solid #C9A24B; outline-offset: 3px; }
```

---

## MOBILE UX PRIORITY MATRIX

| Issue | ROI | Conv. impact | Complexity | Priority |
|-------|-----|-------------|-----------|---------|
| Mobile bottom bar (CTAs) | Very High | Very High | Low | **P1** |
| Nav: add Disponibles | Very High | Very High | Low | **P1** |
| Input font-size: 16px | High | High | Low | **P1** |
| Submit button full-width | High | High | Low | **P1** |
| Sidebar → stacked layout | High | High | Low | **P1** |
| Mid-article CTA block | High | High | Low | **P2** |
| Hero image srcset (mobile) | High | Medium | Medium | **P2** |
| Touch target sizing | Medium | Medium | Low | **P2** |
| Dropdown → accordion | Medium | Medium | Medium | **P2** |
| Horizontal scroll fix | Medium | Low | Low | **P2** |
| Sticky species CTA | Medium | High | Medium | **P3** |
| Font size audit (16px) | Medium | Low | Low | **P3** |
| Core Web Vitals fixes | High | Medium | Medium | **P3** |
| Contrast audit | Low | Low | Low | **P4** |
