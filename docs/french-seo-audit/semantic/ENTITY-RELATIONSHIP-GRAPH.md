# Entity Relationship Graph — Paraíso de Aves French Section

**Date:** 2026-07-29  
**Notation:** → = directed relationship (entity A is a parent/source of entity B)  
**Coverage:** All major entity clusters

---

## MASTER RELATIONSHIP MAP

```
PARAÍSO DE AVES (Organization / LocalBusiness / WebSite)
│
├─── SPECIES KNOWLEDGE GRAPH
│    │
│    ├─── TIER 1 SPECIES (flagship pages)
│    │    ├─── Gris du Gabon
│    │    ├─── Amazone à Front Bleu
│    │    ├─── Ara Bleu et Jaune
│    │    ├─── Ara Hyacinthe
│    │    ├─── Ara Macao
│    │    ├─── Ara Catalina (hybrid)
│    │    ├─── Cacatoès à Huppe Jaune
│    │    ├─── Cacatoès Rosalbin
│    │    ├─── Éclectus
│    │    └─── Pionus
│    │
│    ├─── TIER 2 SPECIES (catalogue pages /fr/especies/)
│    │    └─── [26 species pages]
│    │
│    └─── SPECIES ATTRIBUTES (cross-cutting)
│         ├─── Talking ability → /fr/perroquet-qui-parle/ cluster
│         ├─── Intelligence → /fr/les-perroquets-les-plus-intelligents/
│         ├─── Noise level → /fr/perroquets-calmes/
│         ├─── Price → /fr/prix-*/
│         ├─── Lifespan → blog + species pages
│         └─── Availability → /fr/perroquets-disponibles/
│
├─── BUYER JOURNEY GRAPH
│    │
│    ├─── AWARENESS (discovery / research)
│    │    ├─── /fr/perroquet-qui-parle/ (talking cluster hub)
│    │    ├─── /fr/les-perroquets-les-plus-intelligents/
│    │    ├─── /fr/perroquet-qui-parle-le-mieux/
│    │    ├─── /fr/blog/ (12 articles)
│    │    └─── /fr/connaissances/ (10 sections)
│    │
│    ├─── CONSIDERATION (comparison / evaluation)
│    │    ├─── /fr/perroquet-pour-debutant/
│    │    ├─── /fr/perroquet-pour-famille/
│    │    ├─── /fr/perroquet-appartement/
│    │    ├─── /fr/perroquets-calmes/
│    │    ├─── /fr/petits-perroquets/
│    │    ├─── /fr/perroquets-bebes/
│    │    ├─── /fr/prix-perroquet-gris-du-gabon/
│    │    ├─── /fr/prix-ara-hyacinthe/
│    │    └─── /fr/prix-cacatoes/
│    │
│    └─── DECISION (conversion)
│         ├─── /fr/perroquets-disponibles/
│         ├─── /fr/acheter-perroquet/
│         ├─── /fr/acheter-ara/
│         ├─── /fr/acheter-gris-du-gabon/
│         ├─── /fr/adopter-perroquet/
│         ├─── /fr/processus-adoption/
│         ├─── /fr/vente-oiseaux/
│         └─── /fr/contact/
│
├─── TRUST GRAPH
│    │
│    ├─── /fr/eleveur-perroquets/ (breeder authority)
│    ├─── /fr/a-propos/ (company story)
│    ├─── /fr/nos-installations/ (facility proof)
│    ├─── /fr/garantie-sante/ (health guarantee)
│    ├─── /fr/connaissances/cites/ (legal compliance)
│    └─── /fr/perroquets-eleves-a-la-main/ (methodology)
│
├─── SERVICE GRAPH
│    │
│    ├─── /fr/livraison/ (France-wide delivery)
│    ├─── /fr/caisses-de-transport/ (IATA transport)
│    ├─── /fr/garantie-sante/ (health guarantee)
│    └─── /fr/processus-adoption/ (adoption process)
│
└─── GEOGRAPHIC GRAPH
     │
     ├─── France (country-level)
     └─── 50 French cities → /fr/perroquets-a-vendre-[ville]/
```

---

## SPECIES-LEVEL RELATIONSHIP CHAINS

### Gris du Gabon Entity Chain
```
[Psittacus erithacus] (taxon)
        ↓
[Gris du Gabon] (tier 1 species page)
        ↓
[Deep species guide] /fr/especies/perroquet-gris-du-gabon/
        ↓
[Talking ability] /fr/perroquet-qui-parle/ ←→ /fr/perroquet-qui-parle-le-mieux/
        ↓
[Intelligence] /fr/les-perroquets-les-plus-intelligents/
        ↓
[Training guide] /fr/comment-apprendre-a-un-perroquet-a-parler/
        ↓
[Why not talking] /fr/pourquoi-mon-perroquet-ne-parle-pas/
        ↓
[Price guide] /fr/prix-perroquet-gris-du-gabon/
        ↓
[Buy intent] /fr/acheter-gris-du-gabon/
        ↓
[Available birds] /fr/perroquets-disponibles/
        ↓
[Contact/Conversion] /fr/contact/
```

### Ara Entity Chain
```
[Ara] (genus entity)
        ↓
[Ara Bleu et Jaune] + [Ara Hyacinthe] + [Ara Macao] + [Ara Catalina]
(tier 1 pages) ← linked from → (tier 2 /fr/especies/ deep pages)
        ↓
[Prix Ara Hyacinthe] /fr/prix-ara-hyacinthe/
        ↓
[Acheter un Ara] /fr/acheter-ara/
        ↓
[Available Aras] /fr/perroquets-disponibles/
        ↓
[Contact] /fr/contact/
```

### Cacatoès Entity Chain
```
[Cacatoès] (genus entity)
        ↓
[Cacatoès Huppe Jaune] + [Cacatoès Rosalbin] + [Cacatoès Blanc] + [Cacatoès Goffin]
(tier 1 + tier 2 pages)
        ↓
[Les plus intelligents] /fr/les-perroquets-les-plus-intelligents/
        ↓
[Prix Cacatoès] /fr/prix-cacatoes/
        ↓
[Available birds] /fr/perroquets-disponibles/
        ↓
[Contact] /fr/contact/
```

### Buyer Profile Entity Chains
```
[Débutant] /fr/perroquet-pour-debutant/
     ↓
[Petits perroquets] /fr/petits-perroquets/
     ↓
[Sénégal] /fr/especies/perroquet-du-senegal/
     ↓
[Perroquet appartement] /fr/perroquet-appartement/
     ↓
[Perroquets calmes] /fr/perroquets-calmes/
     ↓
[Perroquets disponibles] /fr/perroquets-disponibles/

[Famille] /fr/perroquet-pour-famille/
     ↓
[Amazone] + [Ara] + [Perruche à Collier]
     ↓
[Bébé perroquet] /fr/perroquets-bebes/
     ↓
[Élevés à la main] /fr/perroquets-eleves-a-la-main/
     ↓
[Processus adoption] /fr/processus-adoption/
```

---

## GEOGRAPHIC ENTITY RELATIONSHIPS

```
[France - Country entity]
        ↓
[50 City landing pages]
/fr/perroquets-a-vendre-[ville]/
        ↓
[Perroquets disponibles] /fr/perroquets-disponibles/
        ↓
[Contact] /fr/contact/
        ↓
[Livraison] /fr/livraison/
```

---

## ATTRIBUTE ↔ SPECIES CROSS-MATRIX

| Attribute | Gris | Ara | Amazone | Cacatoès | Éclectus | Sénégal | P.Collier |
|-----------|------|-----|---------|----------|----------|---------|-----------|
| Talking ability | ●●●●● | ●●●○○ | ●●●●○ | ●●○○○ | ●●●●○ | ●●●○○ | ●●●●○ |
| Intelligence | ●●●●● | ●●●●○ | ●●●●○ | ●●●●● | ●●●○○ | ●●●○○ | ●●●○○ |
| Noise level | Medium | High | High | Very High | Low | Low | Medium |
| Beginner-friendly | ✗ | ✗ | Partial | ✗ | ✗ | ✓ | ✓ |
| Family-friendly | ✓ | ✓ | ✓ | Partial | ✓ | ✓ | ✓ |
| Apartment | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ | ✓ |
| Price guide page | ✓ | ✓ (Hyacinthe) | ✗ | ✓ | ✗ | ✗ | ✗ |

---

## KNOWLEDGE HUB RELATIONSHIP MAP

```
/fr/connaissances/ (Knowledge Hub)
├── /fr/connaissances/adoption/
├── /fr/connaissances/alimentation/
├── /fr/connaissances/cites/
├── /fr/connaissances/comportement/
├── /fr/connaissances/especes/
├── /fr/connaissances/faq/
├── /fr/connaissances/livraison/
├── /fr/connaissances/prix/
└── /fr/connaissances/sante/

Each section ↔ corresponds to species attributes and commercial pages:
adoption → processus-adoption → perroquets-disponibles → contact
alimentation → nourriture-pour-perroquets → blog/alimentation
cites → garantie-sante → eleveur-perroquets
comportement → perroquet-qui-parle cluster → training guides
especes → /fr/especies/ → tier 1 species pages
prix → /fr/prix-*/ → acheter-* → perroquets-disponibles
sante → garantie-sante → contact
```

---

## SEMANTIC GAPS IN RELATIONSHIP GRAPH

1. **No genus-level entity pages** — "Les Aras", "Les Cacatoès", "Les Amazones" as collection entities
2. **No Taxon schema** — species scientific names aren't declared as linked data entities
3. **Individual birds are not entities** — available-birds listing has no per-bird URL
4. **Colour/plumage entities missing** — no pages connecting colour search to species
5. **DNA sex entity missing** — buyers often search by sex, no entity page
6. **Connaissances ↔ Cluster pages not fully linked** — /fr/connaissances/comportement/ doesn't link to talking cluster
7. **Blog posts not fully integrated** — 12 blog posts have weak bidirectional species links
8. **50 city pages link only upward** — no cross-city or region-level entity page
