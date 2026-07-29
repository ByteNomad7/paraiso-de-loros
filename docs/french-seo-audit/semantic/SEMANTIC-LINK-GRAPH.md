# Semantic Link Graph — Paraíso de Aves French Section

**Date:** 2026-07-29  
**Purpose:** Ideal internal link architecture for maximum semantic entity signal flow  
**Principle:** Authority flows from content depth → category hubs → commercial pages → conversion

---

## LINK GRAPH DESIGN PRINCIPLES

1. **No orphan entities** — every page receives links from at least 3 contextually relevant sources
2. **Bidirectional species links** — content pages and species pages link to each other
3. **Hub pages aggregate** — category hubs collect all children and pass authority down
4. **Commercial pages receive from all funnel stages** — awareness → consideration → decision
5. **City pages cluster** — cities link upward + sideways to near cities + downward to species
6. **Schema entities match link entities** — a species declared in schema should have a corresponding link

---

## TIER DEFINITIONS

| Tier | Role | Examples |
|------|------|---------|
| T0 | Homepage | /fr/ |
| T1 | Category hubs | /fr/perroquets/, /fr/connaissances/, /fr/perroquets-disponibles/ |
| T2 | Species pages & commercial hubs | /fr/perroquet-gris-du-gabon/, /fr/acheter-perroquet/ |
| T3 | Deep guides, cluster pages, species deep-dives | /fr/especies/*, /fr/perroquet-qui-parle/ |
| T4 | Supporting content | blog posts, cluster supporting pages, city pages |
| T5 | Conversion | /fr/contact/, /fr/perroquets-disponibles/ (also T1) |

---

## HOMEPAGE (T0) OUTBOUND LINKS

The homepage should link to (and currently links to):
```
/fr/ → /fr/perroquets-disponibles/        [primary CTA]
/fr/ → /fr/perroquet-gris-du-gabon/       [flagship species]
/fr/ → /fr/ara-bleu-et-jaune/             [flagship species]
/fr/ → /fr/cacatoes-huppe-jaune/          [flagship species]
/fr/ → /fr/amazone-front-bleu/            [flagship species]
/fr/ → /fr/eclectus/                      [flagship species]
/fr/ → /fr/perroquet-qui-parle/           [content cluster hub]
/fr/ → /fr/connaissances/                 [knowledge hub]
/fr/ → /fr/garantie-sante/                [trust signal]
/fr/ → /fr/livraison/                     [service signal]
/fr/ → /fr/contact/                       [conversion]
```
**Gap:** Homepage should also link to `/fr/eleveur-perroquets/` for E-E-A-T.

---

## SPECIES KNOWLEDGE GRAPH — IDEAL LINK STRUCTURE

### Per Tier 1 Species Page → outbound
```
/fr/[species]/ → /fr/especies/[species]/           [deeper taxonomic guide]
/fr/[species]/ → /fr/prix-[species]/               [price guide]
/fr/[species]/ → /fr/acheter-[species]/  [if exists] or /fr/acheter-perroquet/
/fr/[species]/ → /fr/perroquets-disponibles/        [availability]
/fr/[species]/ → /fr/perroquet-qui-parle/           [if talking species]
/fr/[species]/ → /fr/les-perroquets-les-plus-intelligents/ [if intelligent species]
/fr/[species]/ → /fr/connaissances/[relevant]/      [care/health/behaviour]
/fr/[species]/ → /fr/blog/[species-guide]/          [blog back-link — GAP]
/fr/[species]/ → /fr/galerie/[species]/   [if gallery exists]
/fr/[species]/ → /fr/contact/                       [conversion]
```

### Per Tier 2 /fr/especies/[species]/ → outbound
```
/fr/especies/[species]/ → /fr/[species]/            [commercial tier 1 upward]
/fr/especies/[species]/ → /fr/especies/             [hub upward]
/fr/especies/[species]/ → /fr/connaissances/        [knowledge hub]
/fr/especies/[species]/ → /fr/perroquets-disponibles/
/fr/especies/[species]/ → /fr/contact/
```

### Inbound to each Tier 1 species page (target: ≥10 unique internal sources)
```
/fr/                                    → species
/fr/perroquets-disponibles/             → species (listing)
/fr/especies/                           → species (hub)
/fr/perroquet-qui-parle/                → (if talking) species
/fr/les-perroquets-les-plus-intelligents/ → (if intelligent) species
/fr/perroquet-pour-[profile]/           → relevant species
/fr/perroquets-calmes/                  → (if quiet) species
/fr/petits-perroquets/                  → (if small) species
/fr/perroquets-a-vendre-[city]/         → all species (nav links)
/fr/blog/[species-guide]/               → species (editorial)
/fr/galerie/[category]/                 → species
/fr/connaissances/especes/              → species
```

---

## BUYER JOURNEY LINK FLOWS

### Awareness → Consideration → Decision

```
AWARENESS LAYER
/fr/perroquet-qui-parle/ ──────────────────────→ /fr/perroquets-disponibles/
/fr/les-perroquets-les-plus-intelligents/ ──────→ /fr/perroquets-disponibles/
/fr/blog/* ────────────────────────────────────→ relevant species pages
/fr/connaissances/* ────────────────────────────→ /fr/acheter-perroquet/

CONSIDERATION LAYER
/fr/perroquet-pour-debutant/ ──────────────────→ /fr/especies/perroquet-du-senegal/
                               ──────────────→ /fr/especies/perruche-a-collier/
                               ──────────────→ /fr/perroquets-disponibles/
/fr/perroquet-pour-famille/ ───────────────────→ /fr/amazone-front-bleu/
                              ────────────────→ /fr/ara-bleu-et-jaune/
                              ────────────────→ /fr/perroquets-disponibles/
/fr/prix-*/ ───────────────────────────────────→ /fr/acheter-*/
             ─────────────────────────────────→ /fr/perroquets-disponibles/

DECISION LAYER
/fr/acheter-perroquet/ ────────────────────────→ /fr/perroquets-disponibles/
                        ────────────────────→ /fr/garantie-sante/
                        ────────────────────→ /fr/livraison/
                        ────────────────────→ /fr/contact/
/fr/processus-adoption/ ───────────────────────→ /fr/contact/
                         ──────────────────→ /fr/garantie-sante/
                         ──────────────────→ /fr/perroquets-disponibles/
```

---

## TALKING CLUSTER LINK GRAPH (CURRENT STATE + IDEAL)

### Current: Hub → 10 cluster pages ✅
### Missing: Cluster ↔ Knowledge Base + Blog

```
IDEAL CLUSTER INTERNAL GRAPH:

/fr/perroquet-qui-parle/ [HUB]
├── → all 10 cluster pages ✅
├── → /fr/connaissances/comportement/ ❌ missing
├── → /fr/blog/perroquet-gris-du-gabon-guide/ ❌ missing
└── → /fr/perroquets-disponibles/ ✅

/fr/comment-apprendre-a-un-perroquet-a-parler/
├── → /fr/perroquet-qui-parle/ ✅
├── → /fr/pourquoi-mon-perroquet-ne-parle-pas/ ✅
├── → /fr/connaissances/comportement/ ❌ missing
└── → species pages ✅

/fr/connaissances/comportement/ [CURRENTLY ISOLATED]
├── → /fr/perroquet-qui-parle/ ❌ missing
├── → /fr/comment-apprendre-a-un-perroquet-a-parler/ ❌ missing
├── → /fr/pourquoi-mon-perroquet-ne-parle-pas/ ❌ missing
└── → species pages ❌ missing
```

---

## GEOGRAPHIC CLUSTER LINK GRAPH

### Ideal city page structure
```
/fr/perroquets-a-vendre-[ville]/
├── → /fr/perroquets-disponibles/ ✅
├── → /fr/livraison/ ✅ (should be)
├── → /fr/contact/ ✅
├── → /fr/perroquet-gris-du-gabon/ ✅ (species shown)
├── → /fr/[region-hub]/ ❌ missing
└── → 3 nearby cities ❌ missing

Target region hubs (to build):
/fr/perroquets-ile-de-france/ → Paris, Versailles, etc.
/fr/perroquets-bretagne/ → Brest, Rennes, Lorient, etc.
/fr/perroquets-occitanie/ → Toulouse, Montpellier, Narbonne, etc.
/fr/perroquets-paca/ → Marseille, Nice, Toulon, Cannes, Aix, etc.
```

---

## ORPHAN PAGE AUDIT

Pages with fewer than 3 contextual inbound links (estimated):

| Page | Estimated inbound | Fix |
|------|-------------------|-----|
| /fr/toucans/ | ~2 | Link from /fr/ + /fr/nos-installations/ + /fr/galerie/ |
| /fr/caisses-de-transport/ | ~3 | Link from /fr/livraison/ + /fr/processus-adoption/ + /fr/garantie-sante/ |
| /fr/nos-installations/ | ~4 | Link from /fr/a-propos/ + /fr/eleveur-perroquets/ + /fr/garantie-sante/ + homepage |
| /fr/a-propos/ | ~3 | Link from /fr/eleveur-perroquets/ + /fr/nos-installations/ + footer-enhanced |
| /fr/connaissances/livraison/ | ~3 | Link from /fr/livraison/ + /fr/processus-adoption/ + all city pages |
| /fr/connaissances/prix/ | ~3 | Link from all price pages + /fr/acheter-perroquet/ |
| /fr/galerie/toucans/ | ~2 | Link from /fr/toucans/ + /fr/nos-installations/ |

---

## LINK GRAPH DENSITY TARGET

| Layer | Current avg inbound | Target | Gap |
|-------|-------------------|--------|-----|
| Tier 1 species pages | ~8 | 12–15 | +4–7 |
| Tier 2 species pages | ~5 | 8–10 | +3–5 |
| Commercial pages | ~6 | 10–12 | +4–6 |
| Cluster pages | ~5 | 10–12 | +5–7 |
| City pages | ~4 | 6–8 | +2–4 |
| Blog posts | ~4 | 6–8 | +2–4 |
| Knowledge base | ~5 | 8–10 | +3–5 |

---

## QUICK-WIN LINK ACTIONS (no new pages required)

1. Add `/fr/eleveur-perroquets/` link to homepage hero section
2. Add "Sur le blog" section to each of the 10 Tier 1 species pages linking to relevant blog articles
3. Add `/fr/connaissances/comportement/` → talking cluster links (3 edits)
4. Add `/fr/caisses-de-transport/` link to `/fr/livraison/` page (1 edit)
5. Add cross-links between `/fr/nos-installations/` and `/fr/galerie/installations/` (2 edits)
6. Add 50 city pages → `/fr/eleveur-perroquets/` in footer-trust section
7. Add `/fr/prix-[species]/` links from respective Tier 1 species pages (for existing 3 price pages — likely already present; verify)
8. Add blog posts as "sources" citations on cluster pages where content overlaps
