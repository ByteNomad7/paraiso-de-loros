# COMMERCIAL-FUNNEL.md
## Paraíso de Aves — Ideal French Buyer Journey & Missing Links
**Date:** 2026-07-29 | Task 2: Commercial Funnel Design

> No pages modified. Planning document only.

---

## IDEAL BUYER JOURNEY MAP

```
┌─────────────────────────────────────────────────────────────┐
│                      FR HOMEPAGE /fr/                        │
│                                                               │
│  Entry points: direct, branded, city-page overflow           │
│  Outbound: species grid, buyer segment section (to add),     │
│            perroquets-disponibles, blog                      │
└──────────────────────────┬──────────────────────────────────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
          ▼                ▼                ▼
┌─────────────────┐ ┌────────────────┐ ┌──────────────────┐
│ COMMERCIAL HUBS │ │  BUYER SEGMENT │ │  ENTRY FROM      │
│                 │ │  PAGES (new)   │ │  CITY PAGES (50) │
│ /fr/acheter-    │ │                │ │                  │
│  perroquet/     │ │ /fr/perroquet- │ │ → /fr/livraison/ │
│ /fr/perroquets/ │ │  parleur/      │ │ → /fr/acheter-   │
│ /fr/adopter-    │ │ /fr/perroquet- │ │   perroquet/     │
│  perroquet/     │ │  pour-debutant/│ │ → segment pages  │
│ /fr/vente-      │ │ /fr/perroquet- │ │                  │
│  oiseaux/       │ │  pour-appart./ │ └──────────────────┘
└────────┬────────┘ │ /fr/bebe-perr./│
         │          │ /fr/perroquet- │
         │          │  familial/     │
         │          └───────┬────────┘
         │                  │
         └──────────┬───────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────┐
│                    BUYING GUIDES                              │
│                                                              │
│  Species buying pages (existing + new):                      │
│  /fr/acheter-ara/          /fr/acheter-gris-du-gabon/        │
│  /fr/acheter-cacatoes/     /fr/acheter-amazone/              │
│  /fr/acheter-ara-hyacinthe/ /fr/acheter-conure/              │
│  /fr/acheter-eclectus/     /fr/acheter-perr-du-senegal/      │
│                                                              │
│  Price pages:                                                │
│  /fr/prix-ara-hyacinthe/   /fr/prix-cacatoes/                │
│  /fr/prix-perroquet-gris-du-gabon/ (new)                    │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   SPECIES PAGES                               │
│                                                              │
│  /fr/especies/{species}/  (26 comprehensive guides)          │
│  /fr/{species}/           (11 root-level commercial pages)   │
│                                                              │
│  Each guide: character, care, diet, talking ability,         │
│  FAQPage schema, BreadcrumbList                              │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                 AVAILABLE BIRDS                               │
│                                                              │
│  /fr/perroquets-disponibles/                                 │
│                                                              │
│  The only page with live inventory. All buying journeys      │
│  must ultimately funnel here or to /fr/contact/              │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼ (no individual bird profiles exist yet)
┌─────────────────────────────────────────────────────────────┐
│              INDIVIDUAL BIRD PROFILES                         │
│                                                              │
│  NOT YET BUILT — currently absent from the architecture.     │
│  Each available bird should have a dedicated page with:      │
│  species, age, sex (if known), hatch date, unique traits,    │
│  photos, and a direct enquiry link.                          │
│  These sit between /perroquets-disponibles/ and /contact/.   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                     CONTACT                                   │
│                                                              │
│  /fr/contact/                                                │
│  Email only: paraisodeloros@gmail.com                        │
│  Response: within 24 hours                                   │
└─────────────────────────────────────────────────────────────┘
```

---

## TRUST LAYER (supports all funnel levels)

The trust layer is not part of the linear funnel — it provides reassurance that users can access from any funnel stage:

```
/fr/eleveur-perroquets/          ← must link FROM every buying page
/fr/perroquets-eleves-a-la-main/ ← links FROM baby/segment pages
/fr/garantie-sante/              ← links FROM all buying pages (badge)
/fr/processus-adoption/          ← links FROM buying guides + adopter page
/fr/nos-installations/           ← links FROM eleveur page
/fr/a-propos/                    ← links FROM footer (already)
/fr/perroquet-cites-france/ (new)← links FROM legal-concern entry points
/fr/livraison/                   ← links FROM city pages + buying guides
```

---

## MISSING INTERNAL LINKS — COMPLETE INVENTORY

### Category A: CRITICAL — Funnel breaks without these

| From | To | Missing link | Impact |
|------|----|-------------|--------|
| `/fr/especies/perroquet-gris-du-gabon/` | `/fr/acheter-gris-du-gabon/` | No "acheter cette espèce" CTA | 🔴 Buyer reads full guide, hits dead end |
| `/fr/especies/ara-bleu-et-jaune/` | `/fr/acheter-ara/` | No buying CTA | 🔴 Dead end |
| `/fr/especies/ara-hyacinthe/` | `/fr/acheter-ara/` + `/fr/prix-ara-hyacinthe/` | No buying or price CTA | 🔴 Dead end |
| `/fr/especies/ara-macao/` | `/fr/acheter-ara/` | No buying CTA | 🔴 Dead end |
| `/fr/especies/cacatoes-huppe-jaune/` | `/fr/acheter-perroquet/` | Links only to homepage | 🔴 Completely isolated |
| `/fr/especies/amazone-front-bleu/` | `/fr/acheter-perroquet/` | Links only to homepage | 🔴 Completely isolated |
| `/fr/especies/ara-bleu-et-jaune/` | `/fr/acheter-perroquet/` | Links only to homepage | 🔴 Completely isolated |
| `/fr/especies/ara-hyacinthe/` | `/fr/acheter-perroquet/` | Links only to homepage | 🔴 Completely isolated |
| `/fr/especies/ara-chloroptere/` | `/fr/acheter-perroquet/` | Links only to homepage | 🔴 Completely isolated |
| `/fr/especies/caique-ventre-blanc/` | `/fr/acheter-perroquet/` | Links only to homepage | 🔴 Completely isolated |
| `/fr/especies/grand-alexandre/` | `/fr/acheter-perroquet/` | Links only to homepage | 🔴 Completely isolated |
| `/fr/especies/perruche-royale/` | `/fr/acheter-perroquet/` | Links only to homepage | 🔴 Completely isolated |
| `/fr/especies/perroquet-gris-du-gabon/` | `/fr/acheter-perroquet/` | Links only to homepage | 🔴 Completely isolated |
| All 50 city pages | `/fr/livraison/` | Zero city pages link to delivery | 🔴 Removes logistics objection — never addressed |
| `/fr/prix-ara-hyacinthe/` | `/fr/acheter-ara/` or `/fr/acheter-ara-hyacinthe/` | Price page has no buying CTA | 🔴 Price research dead end |
| `/fr/prix-cacatoes/` | `/fr/acheter-perroquet/` or `/fr/acheter-cacatoes/` | Price page has no buying CTA | 🔴 Price research dead end |
| `/fr/perroquets-disponibles/` | `/fr/contact/` | Unknown — needs verification | 🔴 Available birds page must have prominent enquiry link |

### Category B: HIGH — Significant conversion loss

| From | To | Missing link | Impact |
|------|----|-------------|--------|
| `/fr/blog/*` (all 11 articles) | `/fr/acheter-perroquet/` or relevant buying page | Blog articles end without commercial CTA | 🟠 High organic traffic, zero buying nudge |
| `/fr/eleveur-perroquets/` | All buying pages | Trust page receives no links FROM buying pages | 🟠 Buyers can't find trust proof without nav |
| `/fr/garantie-sante/` | All buying pages | Health guarantee is isolated — not linked from buying pages | 🟠 Key trust signal not connected to purchase path |
| `/fr/perroquets-eleves-a-la-main/` | `/fr/perroquets-disponibles/` + `/fr/processus-adoption/` | Differentiator page sends nowhere useful | 🟠 |
| `/fr/adopter-perroquet/` | Species-specific buying pages | Buyer-profile H2 has no links to matching species | 🟠 Recommendation with no pathway |
| `/fr/acheter-perroquet/` | Buyer segment pages (débutant, parleur, appartement) | Currently links only to species — misses lifestyle entry | 🟠 |
| `/fr/perroquets/` | Species buying pages | Species families listed with no buying page links | 🟠 |
| `/fr/vente-oiseaux/` | `/fr/perroquet-cites-france/` (once built) | Legal-trust page has no legal deep-dive link | 🟠 |
| `/fr/a-propos/` | `/fr/eleveur-perroquets/` + `/fr/nos-installations/` | About page sends nowhere | 🟠 |
| `/fr/faq/` | Buying pages + knowledge pages | FAQ answers with no onward journey | 🟠 |

### Category C: MEDIUM — Topical authority gaps

| From | To | Missing link | Impact |
|------|----|-------------|--------|
| `/fr/nourriture-pour-perroquets/` | Species guide pages (5 most food-sensitive species) | Care content isolated from species context | 🟡 |
| `/fr/jouets-naturels-pour-perroquets/` | `/fr/especies/caique/`, `/fr/especies/loriquet-arc-en-ciel/` | Most playful species not linked from toy page | 🟡 |
| City pages | `/fr/perroquet-pour-appartement/` (once built) | Urban cities should point to apartment-parrot page | 🟡 |
| `/fr/connaissances/*` (9 sub-pages) | Relevant buying pages | Knowledge content sends to hub but not to commercial pages | 🟡 |
| `/fr/especies/` hub page | `/fr/perroquets/` | Species hub and catalogue hub not cross-linked | 🟡 |

---

## FUNNEL STAGE HEALTH CHECK

| Stage | Current health | Key problem |
|-------|---------------|-------------|
| FR Homepage | 🟡 Medium | No buyer-segment section; species grid links to root-level pages |
| Commercial Hubs | 🟡 Medium | 4 pages with duplicate H2s; no links between them |
| Buying Guides | 🔴 Weak | Species buying pages mostly exist; none receive links FROM species guides |
| Species Pages | 🔴 Critical | 8 of 26 guides link ONLY to homepage — completely isolated |
| Available Birds | 🟡 Medium | Exists; receives links but needs more prominent prominence in nav |
| Individual Bird Profiles | 🔴 Missing | Does not exist at all — architectural gap between "available" and "contact" |
| Contact | 🟢 Strong | Present, email-only, 24h response stated |

---

## INDIVIDUAL BIRD PROFILES — ARCHITECTURAL RECOMMENDATION

The funnel gap between `/fr/perroquets-disponibles/` (listing) and `/fr/contact/` (enquiry) is significant. At high prices (€600–€15,000), buyers need to feel a personal connection with the specific bird before contacting. A page per available bird at `/fr/perroquets-disponibles/{bird-name}/` with: species, age, character notes, hand-raised confirmation, photos, and a direct enquiry link would significantly lift conversion. This is a Phase 3+ task — noted here for architecture completeness.
