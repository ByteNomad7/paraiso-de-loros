# COMMERCIAL-INTERNAL-LINKING.md
## Paraíso de Aves — French Section Ideal Commercial Link Architecture
**Date:** 2026-07-29 | Planning document — no changes to be made yet

---

## CURRENT STATE: THE PROBLEM

Every commercial page in the French section uses an identical internal link block regardless of topic:

```
Gris du Gabon | Ara Bleu et Jaune | Ara Hyacinthe | Cacatoès à Huppe Jaune |
Amazone à Front Bleu | Éclectus | Perroquets Disponibles
```

This template appears on the page about `cages`, on the page about `jouets`, on the page about `livraison`, and on every buying page — regardless of whether those species are even relevant to the page topic. The consequences are:

- **Google receives no topical clustering signal** — all pages appear equally related to all species
- **User journeys are broken** — a visitor on the delivery page who wants to understand the adoption process cannot find it without using the nav
- **PageRank is diluted equally** — high-equity pages (homepage, available birds) distribute link juice randomly

---

## IDEAL ARCHITECTURE MAP

### TIER 0 — FR Homepage

```
/fr/  (FR Homepage)
│
├── NAV LINKS (present on all pages via topbar)
│   ├── /fr/perroquets-disponibles/
│   ├── /fr/especies/
│   ├── /fr/connaissances/
│   ├── /fr/livraison/
│   └── /fr/contact/
│
├── HERO CTA → /fr/perroquets-disponibles/
├── SECONDARY CTA → /fr/acheter-perroquet/
│
├── SPECIES GRID (6 featured)
│   ├── /fr/especies/perroquet-gris-du-gabon/
│   ├── /fr/especies/ara-hyacinthe/
│   ├── /fr/especies/ara-bleu-et-jaune/
│   ├── /fr/especies/cacatoes-huppe-jaune/
│   ├── /fr/especies/amazone-front-bleu/
│   └── /fr/especies/eclectus/
│
├── BUYER SEGMENT SECTION (NEW — to add in Phase 2)
│   ├── /fr/perroquet-parleur/
│   ├── /fr/perroquet-pour-debutant/
│   ├── /fr/perroquet-pour-appartement/
│   └── /fr/bebe-perroquet-a-vendre/
│
├── TRUST SECTION
│   ├── /fr/eleveur-perroquets/
│   ├── /fr/garantie-sante/
│   └── /fr/perroquet-cites-france/  (NEW)
│
└── FOOTER (all pages)
    ├── /fr/connaissances/ hub + 6 sub-pages
    ├── /fr/adopter-perroquet/ + /fr/processus-adoption/ + /fr/livraison/ + /fr/garantie-sante/ + /fr/faq/
    ├── 6 species pages
    └── /fr/contact/
```

---

### TIER 1 — Commercial Hubs

Each hub receives links from the homepage and sends links downward to segment and species pages.

#### /fr/acheter-perroquet/ — Master Buying Hub

```
RECEIVES links from:
  FR Homepage (hero section)
  All 50 city pages (body text: "acheter un perroquet à [city]")
  /fr/perroquets-disponibles/ (sidebar)
  /fr/eleveur-perroquets/ (CTA block)

SENDS links to:
  /fr/perroquet-parleur/        (for buyers who want a talking bird)
  /fr/perroquet-pour-debutant/  (for first-time buyers)
  /fr/perroquet-pour-appartement/ (for urban buyers)
  /fr/bebe-perroquet-a-vendre/  (for buyers wanting young birds)
  /fr/acheter-ara/              (ara buyers)
  /fr/acheter-cacatoes/         (cockatoo buyers)
  /fr/acheter-gris-du-gabon/    (GdG buyers)
  /fr/perroquets-disponibles/   (CTA)
  /fr/contact/                  (CTA)
```

#### /fr/acheter-ara/ — Ara Hub

```
RECEIVES links from:
  /fr/acheter-perroquet/ (species section)
  /fr/grand-perroquet-a-vendre/ (laterally)
  FR Homepage (species grid card)

SENDS links to:
  /fr/acheter-ara-bleu-et-jaune/   ← NEW
  /fr/acheter-ara-macao/           ← NEW
  /fr/acheter-ara-hyacinthe/       ← NEW
  /fr/prix-ara/                    ← NEW
  /fr/perroquet-rare-a-vendre/     ← NEW
  /fr/contact/
  /fr/perroquets-disponibles/
```

#### /fr/acheter-cacatoes/ — Cockatoo Hub (NEW)

```
RECEIVES links from:
  /fr/acheter-perroquet/ (species section)
  /fr/grand-perroquet-a-vendre/

SENDS links to:
  /fr/especies/cacatoes-huppe-jaune/
  /fr/especies/cacatoes-rosalbin/
  /fr/especies/cacatoes-blanc/
  /fr/especies/cacatoes-goffin/
  /fr/prix-cacatoes/
  /fr/contact/
```

---

### TIER 2 — Buyer Segment Pages

Segment pages occupy a critical middle layer — they receive broad traffic and filter it toward species buying pages.

#### /fr/perroquet-parleur/ (NEW)

```
RECEIVES links from:
  FR Homepage (buyer segment section)
  /fr/acheter-perroquet/ (intent section)
  /fr/perroquet-pour-debutant/ (recommendation)
  /fr/perroquet-intelligent/ (related)
  Blog: "quel perroquet parle le mieux"

SENDS links to:
  /fr/acheter-gris-du-gabon/        (best talker)
  /fr/acheter-amazone/              (great talkers)
  /fr/perroquet-intelligent/        (related concept)
  /fr/perroquet-pour-debutant/      (if first bird)
  /fr/contact/
  /fr/perroquets-disponibles/
```

#### /fr/perroquet-pour-debutant/ (NEW)

```
RECEIVES links from:
  FR Homepage (buyer segment section)
  /fr/acheter-perroquet/
  /fr/blog/meilleurs-perroquets-debutants/
  /fr/blog/quel-perroquet-choisir/

SENDS links to:
  /fr/petit-perroquet-a-vendre/     (small species for beginners)
  /fr/perroquet-pour-appartement/   (common beginner situation)
  /fr/perroquet-silencieux/         (common beginner concern)
  /fr/acheter-conure/               (recommended species)
  /fr/acheter-perroquet-du-senegal/ (recommended species)
  /fr/especies/perroquet-pionus/    (recommended species)
  /fr/processus-adoption/
  /fr/contact/
```

#### /fr/perroquet-pour-appartement/ (NEW)

```
RECEIVES links from:
  FR Homepage (buyer segment section)
  All 20 largest city pages (urban context: Paris, Lyon, Marseille etc)
  /fr/perroquet-silencieux/
  /fr/petit-perroquet-a-vendre/

SENDS links to:
  /fr/perroquet-silencieux/         (solves noise concern)
  /fr/petit-perroquet-a-vendre/     (solves size concern)
  /fr/acheter-conure/               (recommended)
  /fr/acheter-perroquet-du-senegal/ (recommended)
  /fr/especies/perroquet-pionus/    (recommended)
  /fr/livraison/                    (delivery reassurance)
  /fr/contact/
```

#### /fr/bebe-perroquet-a-vendre/ (NEW)

```
RECEIVES links from:
  FR Homepage (buyer segment section)
  /fr/acheter-perroquet/ (product section)
  /fr/perroquets-eleves-a-la-main/

SENDS links to:
  /fr/perroquets-eleves-a-la-main/  (quality explanation)
  /fr/processus-adoption/           (how it works)
  /fr/garantie-sante/               (trust)
  /fr/perroquets-disponibles/       (CTA)
  /fr/contact/
```

---

### TIER 3 — Species Buying Pages

Species buying pages sit below segment hubs and above species guides. They are the direct purchase intent pages.

#### Template for ALL species buying pages:

```
RECEIVES links from:
  Parent species hub (acheter-ara / acheter-cacatoes / acheter-amazone)
  Matching segment page (perroquet-parleur → acheter-gris-du-gabon)
  Related price page (prix-perroquet-gris-du-gabon → acheter-gris-du-gabon)

SENDS links to:
  Matching /fr/especies/{species}/     (full species guide — "learn more")
  Matching price page                  (transparency)
  /fr/perroquets-disponibles/          (CTA)
  /fr/contact/                         (CTA)
  /fr/garantie-sante/                  (trust)
  /fr/livraison/                       (logistics)
```

---

### TIER 4 — Species Guides (/fr/especies/)

Species guides are the deepest tier of content — they should NOT rank for buying intent. Their role is to educate and hand off to buying pages.

#### Template for ALL /fr/especies/ pages:

```
RECEIVES links from:
  /fr/connaissances/especes/            (knowledge hub)
  Matching buying page ("Voir notre guide complet →")
  Blog articles about the species

SENDS links to:
  Matching buying page: /fr/acheter-{species}/    ← THIS IS MISSING EVERYWHERE
  /fr/perroquets-disponibles/
  /fr/contact/
  /fr/connaissances/ hub
```

**Critical gap:** No `/fr/especies/` page currently links to the matching buying page. A visitor reading the Gris du Gabon guide at `/fr/especies/perroquet-gris-du-gabon/` has no path to `/fr/acheter-gris-du-gabon/`. This is a major conversion bottleneck.

---

### TIER 5 — City Pages

City pages are geographically targeted commercial pages. They should link to:
1. Delivery page (shows the breeder delivers to their city)
2. The most relevant buyer segment page (based on city type)
3. Knowledge pages (for pre-purchase education)

#### Recommended city page internal links by city type:

| City type | Priority 1 | Priority 2 | Priority 3 |
|-----------|-----------|-----------|-----------|
| Major metro (Paris, Lyon, Marseille, Toulouse) | `/fr/perroquet-pour-appartement/` | `/fr/livraison/` | `/fr/perroquet-parleur/` |
| Mid-size city (Bordeaux, Nantes, Strasbourg) | `/fr/livraison/` | `/fr/perroquet-pour-debutant/` | `/fr/acheter-perroquet/` |
| Smaller city (Lorient, Pau, Troyes) | `/fr/livraison/` | `/fr/acheter-perroquet/` | `/fr/contact/` |

**Current state:** All 50 city pages link to `/fr/connaissances/cites/` but NOT to `/fr/livraison/`. This is backwards — a city-page visitor has already overcome the legal concern; what they need is delivery reassurance.

---

## WEAK AREAS IDENTIFIED

### 🔴 CRITICAL — No path from species guides to buying pages

`/fr/especies/*` → no link → `/fr/acheter-{species}/`

Every species guide ends a reader's journey. There is no "buy this species" link on any of the 26 species guide pages. Fix: add a "Vous souhaitez adopter un [Espèce] ?" CTA block on every species guide page pointing to the matching buying page.

---

### 🔴 CRITICAL — Buyer segment pages don't exist yet

The four highest-converting page types (parleur, débutant, appartement, bébé) do not yet exist, so the entire middle of the funnel is missing. Every buying-intent page leads directly to species (too specific) or to the contact form (too early).

---

### 🟠 HIGH — City pages don't link to delivery page

50 city pages, 0 links to `/fr/livraison/`. A buyer visiting a city page wants to know "will you deliver to me?" The delivery page is the single most important page for city-page visitors. **Add one contextual link to `/fr/livraison/` in the body of every city page.**

---

### 🟠 HIGH — Price pages are dead ends

`/fr/prix-ara-hyacinthe/` and `/fr/prix-cacatoes/` receive search traffic but have no buying-page exit. They need a direct CTA to the matching buying page and to `/fr/contact/`.

---

### 🟠 HIGH — /fr/eleveur-perroquets/ not linked from buying pages

The breeder credentials page (`/fr/eleveur-perroquets/`) is the trust anchor for the whole site. It should be linked from every buying page as "Why choose us?" — currently it receives links only from the footer.

---

### 🟡 MEDIUM — Blog articles link to species guides but not to buying pages

All 11 blog posts link to species guides. None link to buying pages or price pages. A reader of "Prix d'un Perroquet en France" should see a link to `/fr/prix-perroquet-gris-du-gabon/` (once built) and `/fr/acheter-gris-du-gabon/`. This is a missed conversion opportunity on every blog post.

---

### 🟡 MEDIUM — /fr/a-propos/ and /fr/faq/ receive footer links from every page but send nothing useful

Both pages are linked from the footer site-wide, consuming significant PageRank, but neither sends meaningful links back into the commercial funnel. `/fr/a-propos/` should link to `/fr/nos-installations/`, `/fr/garantie-sante/`, and `/fr/eleveur-perroquets/`. `/fr/faq/` should link to at least 5 buying intent pages.

---

## LINK EQUITY FLOW (CURRENT vs IDEAL)

### Current (simplified):

```
Homepage → [7 species pages] → perroquets-disponibles → contact
         ↘ Every other page → same 7 species → same dead-end
```

### Ideal after Phase 2:

```
Homepage
  ↓          ↓            ↓              ↓
Parleur   Débutant   Appartement   Bébé perroquet
  ↓          ↓            ↓              ↓
Species   Small       Quiet         Eleves-main
 buying   species     species       process
  ↓          ↓            ↓              ↓
Species   Species     Species       Disponibles
 guide    buying      buying            ↓
  ↓                                 Contact
Disponibles ← ← ← ← ← ← ← ← ← ← ↗
  ↓
Contact
```

Every path leads to `perroquets-disponibles` or `contact` with no dead ends. Every entry point (city, blog, knowledge) has at least one path into the commercial funnel within 2 clicks.
