# COMMERCIAL-SILO-PLAN.md
## Paraíso de Aves — French Commercial Content Silo Architecture
**Date:** 2026-07-29 | Planning document — no pages to be built yet

---

## OVERVIEW

The French section currently has no content silo structure — every page links to the same 7 pages regardless of topic. The architecture below creates **5 commercial silos** and **1 supporting knowledge layer**, each with a clear top-down hierarchy and lateral cross-links only between related topics.

---

## SILO 1 — TALKING PARROTS

**Commercial rationale:** "Perroquet qui parle" is the highest-volume lifestyle query in the French parrot market. This silo captures buyers motivated by conversation and interaction.

```
FR Homepage
  └── /fr/perroquet-parleur/              [SILO HUB — NEW]
        ├── /fr/perroquet-intelligent/    [SEGMENT — NEW]
        ├── /fr/especies/perroquet-gris-du-gabon/   [SPECIES GUIDE]
        │     └── /fr/acheter-gris-du-gabon/         [BUYING PAGE]
        │           └── /fr/prix-perroquet-gris-du-gabon/  [PRICE — NEW]
        ├── /fr/especies/amazone-front-bleu/         [SPECIES GUIDE]
        │     └── /fr/acheter-amazone/               [BUYING PAGE — NEW]
        │           └── /fr/prix-amazone/            [PRICE — NEW]
        ├── /fr/especies/amazone-nuque-jaune/        [SPECIES GUIDE]
        │     └── (feeds /fr/acheter-amazone/)
        └── /fr/contact/                            [CTA ENDPOINT]

Supporting knowledge:
  /fr/connaissances/especes/
  /fr/blog/perroquet-gris-du-gabon-guide/
  /fr/blog/eclectus-guide/
```

**Lateral cross-links:**
- `/fr/perroquet-parleur/` ↔ `/fr/perroquet-intelligent/`
- `/fr/perroquet-parleur/` → `/fr/perroquet-pour-debutant/` (if first bird)
- `/fr/acheter-gris-du-gabon/` → `/fr/acheter-amazone/` (alternative suggestion)

---

## SILO 2 — BUYER SEGMENTS (Lifestyle)

**Commercial rationale:** French buyers search by situation, not species. This silo intercepts pre-species decision-stage searches and funnels them into species recommendations and buying pages.

```
FR Homepage
  └── /fr/acheter-perroquet/              [MASTER BUYING HUB — existing, upgraded]
        ├── /fr/perroquet-pour-debutant/  [SEGMENT — NEW]
        │     ├── /fr/petit-perroquet-a-vendre/      [SIZE SEGMENT — NEW]
        │     │     └── /fr/acheter-conure/           [BUYING PAGE — NEW]
        │     │           ├── /fr/especies/conure-soleil/
        │     │           └── /fr/prix-conure/        [PRICE — NEW]
        │     ├── /fr/especies/perroquet-du-senegal/
        │     │     └── /fr/acheter-perroquet-du-senegal/  [BUYING — NEW]
        │     └── /fr/especies/perroquet-pionus/
        │
        ├── /fr/perroquet-pour-appartement/  [SEGMENT — NEW]
        │     ├── /fr/perroquet-silencieux/   [QUALIFIER — NEW]
        │     │     ├── /fr/especies/perroquet-pionus/
        │     │     └── /fr/especies/caique/
        │     └── /fr/petit-perroquet-a-vendre/
        │
        ├── /fr/perroquet-familial/        [SEGMENT — NEW]
        │     ├── /fr/perroquet-affectueux/ [QUALIFIER — NEW]
        │     └── /fr/bebe-perroquet-a-vendre/ [PRODUCT — NEW]
        │
        └── /fr/perroquet-pas-cher/        [SEGMENT — NEW]
              └── /fr/acheter-conure/
```

**Lateral cross-links:**
- `/fr/perroquet-pour-debutant/` ↔ `/fr/perroquet-parleur/` (Gris du Gabon for both)
- `/fr/perroquet-pour-appartement/` ↔ `/fr/perroquet-silencieux/`
- `/fr/perroquet-familial/` ↔ `/fr/perroquet-affectueux/`
- City pages → `/fr/perroquet-pour-appartement/` (all urban cities)

---

## SILO 3 — PREMIUM BIRDS (Ara & Rare Species)

**Commercial rationale:** Ara buyers are high-intent, high-value. This silo creates a clear premium funnel from "ara" generic search through to species-specific purchase intent.

```
FR Homepage
  └── /fr/acheter-ara/                    [ARA HUB — existing, upgraded]
        ├── /fr/grand-perroquet-a-vendre/ [SIZE ENTRY — NEW]
        │
        ├── /fr/acheter-ara-bleu-et-jaune/ [SPECIES BUYING — NEW]
        │     ├── /fr/especies/ara-bleu-et-jaune/   [SPECIES GUIDE]
        │     └── /fr/prix-ara/           [ARA PRICE HUB — NEW]
        │
        ├── /fr/acheter-ara-macao/        [SPECIES BUYING — NEW]
        │     └── /fr/especies/ara-macao/
        │
        ├── /fr/acheter-ara-hyacinthe/    [PREMIUM BUYING — NEW]
        │     ├── /fr/especies/ara-hyacinthe/
        │     └── /fr/prix-ara-hyacinthe/ [PRICE — existing]
        │
        └── /fr/perroquet-rare-a-vendre/  [RARE/PREMIUM HUB — NEW]
              ├── /fr/ara-catalina/        [HYBRID — existing]
              └── /fr/especies/loriquet-arc-en-ciel/

Supporting:
  /fr/blog/ara-hyacinthe-guide/
  /fr/perroquet-cites-france/       ← legal trust for CITES-heavy species
```

**Lateral cross-links:**
- `/fr/acheter-ara/` ↔ `/fr/acheter-cacatoes/` (alternative large species)
- `/fr/perroquet-rare-a-vendre/` → `/fr/acheter-ara-hyacinthe/`
- `/fr/prix-ara/` → `/fr/prix-ara-hyacinthe/` (sub-page)

---

## SILO 4 — CACATOÈS & SMALLER SPECIES

**Commercial rationale:** Cockatoos are the second-most-searched parrot genus. This silo also captures buyers for Amazones and Éclectus who are not Ara buyers.

```
FR Homepage
  └── /fr/acheter-cacatoes/               [COCKATOO HUB — NEW]
        ├── /fr/especies/cacatoes-huppe-jaune/   [SPECIES GUIDE]
        ├── /fr/especies/cacatoes-rosalbin/       [SPECIES GUIDE]
        ├── /fr/especies/cacatoes-blanc/          [SPECIES GUIDE]
        ├── /fr/especies/cacatoes-goffin/         [SPECIES GUIDE]
        └── /fr/prix-cacatoes/            [PRICE — existing]

  └── /fr/acheter-amazone/               [AMAZONE HUB — NEW]
        ├── /fr/especies/amazone-front-bleu/
        ├── /fr/especies/amazone-nuque-jaune/
        ├── /fr/especies/amazone-aile-orange/
        └── /fr/prix-amazone/            [PRICE — NEW]

  └── /fr/acheter-eclectus/              [ECLECTUS BUYING — NEW]
        ├── /fr/especies/eclectus/
        ├── /fr/eclectus/                 [LEGACY — redirect or differentiate]
        └── (feeds into /fr/perroquet-parleur/ via talking ability)
```

**Lateral cross-links:**
- `/fr/acheter-cacatoes/` ↔ `/fr/acheter-amazone/` (buyers comparing)
- `/fr/perroquet-affectueux/` → `/fr/acheter-cacatoes/` (Rosalbin is the most affectionate)

---

## SILO 5 — TRUST & PROCESS

**Commercial rationale:** Every French buyer has two main fears: buying illegally and getting scammed. This silo removes both objections and feeds all other silos.

```
FR Homepage
  └── /fr/eleveur-perroquets/             [TRUST HUB — existing, upgraded]
        ├── /fr/perroquets-eleves-a-la-main/   [DIFFERENTIATOR — existing]
        │     └── /fr/bebe-perroquet-a-vendre/ [PRODUCT — NEW]
        ├── /fr/nos-installations/        [PROOF — existing]
        ├── /fr/garantie-sante/           [GUARANTEE — existing]
        ├── /fr/processus-adoption/       [JOURNEY — existing]
        ├── /fr/perroquet-cites-france/   [LEGAL — NEW]
        │     └── /fr/connaissances/cites/
        └── /fr/livraison/               [LOGISTICS — existing]

  └── /fr/a-propos/                       [BRAND — existing, needs upgrade]
        └── /fr/contact/                 [CTA ENDPOINT]
```

**Lateral cross-links:**
- Trust silo pages linked FROM every buying page in Silos 1–4
- `/fr/garantie-sante/` and `/fr/perroquet-cites-france/` appear as trust badges on product pages

---

## KNOWLEDGE LAYER (Supporting All Silos)

The knowledge hub does not belong to a commercial silo — it acts as an informational layer that feeds all silos with pre-purchase education traffic.

```
/fr/connaissances/                        [COLLECTION HUB — upgraded]
  ├── /fr/connaissances/especes/          [SPECIES INDEX]
  │     └── → all /fr/especies/* pages
  ├── /fr/connaissances/prix/             → feeds all price pages
  ├── /fr/connaissances/cites/            → feeds /fr/perroquet-cites-france/
  ├── /fr/connaissances/adoption/         → feeds /fr/processus-adoption/
  ├── /fr/connaissances/livraison/        → feeds /fr/livraison/
  ├── /fr/connaissances/comportement/     → feeds /fr/perroquet-parleur/, /fr/perroquet-intelligent/
  ├── /fr/connaissances/alimentation/
  ├── /fr/connaissances/sante/
  └── /fr/connaissances/faq/

Blog (11 articles) → feeds knowledge hub + commercial buying pages
City pages (50) → feed appartement + livraison silos
```

---

## SILO INTEGRITY RULES

1. **Every page belongs to ONE primary silo** — no page should try to serve two silos
2. **Cross-silo links are permitted only at the bottom of pages** — after the primary CTA
3. **Every silo has exactly ONE contact CTA** — pointing to `/fr/contact/`
4. **Knowledge articles link UP to commercial pages** — never down to other knowledge articles only
5. **City pages link to the nearest silo hub relevant to their region** — apartments in Paris → `/fr/perroquet-pour-appartement/`; rural city pages → `/fr/grand-perroquet-a-vendre/`
