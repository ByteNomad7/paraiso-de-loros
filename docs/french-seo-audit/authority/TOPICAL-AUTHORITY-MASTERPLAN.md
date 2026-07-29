# Topical Authority Masterplan — Paraíso de Aves FR

**Date:** 2026-07-29  
**Mission:** Become the undisputed French-language authority for parrot ownership, species, care, buying, health, training, nutrition, behaviour, CITES, delivery, and breeding.  
**Instruction:** Do not think like a content writer. Think like Google's ranking systems.

---

## THE AUTHORITY ARCHITECTURE

Google's ranking systems reward **topical completeness** — the ability to answer every reasonable question a user could ask within a domain, without sending them elsewhere. The site must become the answer, not a pointer to the answer.

This requires 11 parallel topical silos, each internally complete, each cross-linked to the commercial funnel, each feeding entity signals to Google's Knowledge Graph.

---

## SILO 1 — BUYING PARROTS

**Topical goal:** Own every commercial intent query for parrots in France  
**Current status:** Partial — strong on 3 species, weak on 7; no individual bird pages

```
PILLAR: /fr/acheter-perroquet/ [expand to full buying guide]
│
├── PRICE SUBPILLAR
│   ├── /fr/prix-perroquet-gris-du-gabon/          ✅ EXISTS
│   ├── /fr/prix-ara-hyacinthe/                    ✅ EXISTS
│   ├── /fr/prix-cacatoes/                         ✅ EXISTS
│   ├── /fr/prix-amazone/                          ❌ MISSING
│   ├── /fr/prix-ara-bleu-jaune/                   ❌ MISSING
│   ├── /fr/prix-ara-macao/                        ❌ MISSING
│   ├── /fr/prix-eclectus/                         ❌ MISSING
│   ├── /fr/prix-perroquet-senegal/                ❌ MISSING
│   ├── /fr/prix-perruche-a-collier/               ❌ MISSING
│   ├── /fr/prix-pionus/                           ❌ MISSING
│   └── /fr/guide-prix-perroquets/ [hub]           ❌ MISSING
│
├── AVAILABILITY SUBPILLAR
│   ├── /fr/perroquets-disponibles/                ✅ EXISTS
│   ├── /fr/perroquets-disponibles/[bird-id]/      ❌ MISSING (individual birds)
│   └── /fr/perroquets-eleves-a-la-main/           ✅ EXISTS
│
├── BUYER PROFILE SUBPILLAR
│   ├── /fr/perroquet-pour-debutant/               ✅ EXISTS
│   ├── /fr/perroquet-pour-famille/                ✅ EXISTS
│   ├── /fr/perroquet-appartement/                 ✅ EXISTS
│   ├── /fr/perroquets-calmes/                     ✅ EXISTS
│   ├── /fr/petits-perroquets/                     ✅ EXISTS
│   ├── /fr/perroquets-bebes/                      ✅ EXISTS
│   ├── /fr/choisir-son-perroquet/ [hub]           ❌ MISSING
│   ├── /fr/perroquet-personne-seule/              ❌ MISSING
│   ├── /fr/perroquet-retraite/                    ❌ MISSING
│   └── /fr/perroquet-enfants/                     ❌ MISSING
│
├── PROCESS SUBPILLAR
│   ├── /fr/processus-adoption/                    ✅ EXISTS
│   ├── /fr/adopter-perroquet/                     ✅ EXISTS
│   ├── /fr/garantie-sante/                        ✅ EXISTS
│   ├── /fr/comment-reconnaitre-eleveur-serieux/   ❌ MISSING
│   ├── /fr/questions-a-poser-eleveur/             ❌ MISSING
│   └── /fr/premier-achat-perroquet-checklist/     ❌ MISSING
│
└── CONVERSION
    ├── /fr/contact/                               ✅ EXISTS
    └── /fr/livraison/                             ✅ EXISTS
```

---

## SILO 2 — SPECIES

**Topical goal:** Be the definitive French source for every Psittacidae species  
**Current status:** Strong on flagship species, gaps in genus pages and taxonomy

```
PILLAR: /fr/especies/ [expand to full species encyclopedia]
│
├── GENUS HUBS (MISSING)
│   ├── /fr/aras/                                  ❌ MISSING
│   ├── /fr/amazones/                              ❌ MISSING
│   ├── /fr/cacatoes/                              ❌ MISSING
│   ├── /fr/conures/                               ❌ MISSING
│   ├── /fr/caiques/                               ❌ MISSING
│   └── /fr/poicephalus/                           ❌ MISSING (Sénégal genus)
│
├── FLAGSHIP SPECIES (Tier 1)
│   ├── /fr/perroquet-gris-du-gabon/               ✅ EXISTS
│   ├── /fr/amazone-front-bleu/                    ✅ EXISTS
│   ├── /fr/ara-bleu-et-jaune/                     ✅ EXISTS
│   ├── /fr/ara-hyacinthe/                         ✅ EXISTS
│   ├── /fr/ara-macao/                             ✅ EXISTS
│   ├── /fr/ara-catalina/                          ✅ EXISTS
│   ├── /fr/cacatoes-huppe-jaune/                  ✅ EXISTS
│   ├── /fr/cacatoes-rosalbin/                     ✅ EXISTS
│   ├── /fr/eclectus/                              ✅ EXISTS
│   └── /fr/pionus/                               ✅ EXISTS
│
├── DEEP SPECIES GUIDES (Tier 2 /fr/especies/)
│   └── [26 existing pages]                        ✅ EXISTS
│
├── SPECIES COMPARISON PAGES (MISSING)
│   ├── /fr/gris-du-gabon-vs-amazone/              ❌ MISSING
│   ├── /fr/ara-vs-cacatoes/                       ❌ MISSING
│   ├── /fr/conure-vs-perruche/                    ❌ MISSING
│   ├── /fr/perroquet-senegal-vs-caique/           ❌ MISSING
│   └── /fr/quel-ara-choisir/                      ❌ MISSING
│
└── SPECIES ATTRIBUTE PAGES
    ├── /fr/perroquet-qui-parle/                   ✅ EXISTS (11-page cluster)
    ├── /fr/les-perroquets-les-plus-intelligents/  ✅ EXISTS
    ├── /fr/perroquet-qui-parle-le-mieux/          ✅ EXISTS
    ├── /fr/perroquets-longue-vie/                 ❌ MISSING
    ├── /fr/perroquets-affectueux/                 ❌ MISSING
    └── /fr/perroquets-couleurs/                   ❌ MISSING
```

---

## SILO 3 — PARROT CARE

**Topical goal:** Own "soin perroquet", "entretien perroquet", "bien-être perroquet" queries  
**Current status:** Sparse — 4 care-adjacent pages, no care pillar

```
PILLAR: /fr/soins-perroquet/ [NEW — does not exist]
│
├── HOUSING SUBPILLAR
│   ├── /fr/cages-pour-perroquets/                 ✅ EXISTS (thin)
│   ├── /fr/quelle-cage-pour-quel-perroquet/       ❌ MISSING
│   ├── /fr/taille-cage-perroquet/                 ❌ MISSING
│   ├── /fr/cage-ara/                              ❌ MISSING
│   ├── /fr/voliere-interieure-perroquet/          ❌ MISSING
│   └── /fr/amenager-cage-perroquet/               ❌ MISSING
│
├── ENRICHMENT SUBPILLAR
│   ├── /fr/jouets-naturels-pour-perroquets/       ✅ EXISTS (thin)
│   ├── /fr/enrichissement-perroquet/              ❌ MISSING
│   ├── /fr/foraging-perroquet/                    ❌ MISSING
│   └── /fr/jouets-faire-soi-meme-perroquet/       ❌ MISSING
│
├── GROOMING SUBPILLAR
│   ├── /fr/rogner-griffes-perroquet/              ❌ MISSING
│   ├── /fr/baigner-perroquet/                     ❌ MISSING
│   └── /fr/entretien-plumes-perroquet/            ❌ MISSING
│
└── DAILY ROUTINE SUBPILLAR
    ├── /fr/routine-quotidienne-perroquet/         ❌ MISSING
    ├── /fr/combien-heures-perroquet-sort-cage/    ❌ MISSING
    └── /fr/perroquet-seul-travail/                ❌ MISSING
```

---

## SILO 4 — BEHAVIOUR

**Topical goal:** Own "comportement perroquet" queries — currently near-zero coverage  
**Current status:** 1 knowledge-base page; 11-page talking cluster is the only behaviour depth

```
PILLAR: /fr/comportement-perroquet/ [NEW]
│
├── COMMUNICATION SUBPILLAR
│   ├── /fr/perroquet-qui-parle/                   ✅ EXISTS (11-page cluster)
│   ├── /fr/cris-perroquet-signification/          ❌ MISSING
│   ├── /fr/langage-corporel-perroquet/            ❌ MISSING
│   └── /fr/perroquet-content-vs-stresse/          ❌ MISSING
│
├── PROBLEMATIC BEHAVIOUR SUBPILLAR
│   ├── /fr/perroquet-qui-mord/                    ❌ MISSING
│   ├── /fr/picage-perroquet/                      ❌ MISSING
│   ├── /fr/perroquet-qui-crie-tout-le-temps/      ❌ MISSING
│   ├── /fr/perroquet-agressif/                    ❌ MISSING
│   └── /fr/perroquet-peur-humains/                ❌ MISSING
│
├── SOCIAL BEHAVIOUR SUBPILLAR
│   ├── /fr/perroquet-seul-ou-en-couple/           ❌ MISSING
│   ├── /fr/introduire-nouveau-perroquet/          ❌ MISSING
│   └── /fr/perroquet-chats-chiens/                ❌ MISSING
│
└── SEASONAL BEHAVIOUR SUBPILLAR
    ├── /fr/perroquet-mue/                         ❌ MISSING
    └── /fr/perroquet-reproduction-comportement/   ❌ MISSING
```

---

## SILO 5 — HEALTH

**Topical goal:** Own "santé perroquet", "maladies perroquet" queries  
**Current status:** 1 knowledge-base page; no dedicated health pages

```
PILLAR: /fr/sante-perroquet/ [NEW]
│
├── COMMON ILLNESS SUBPILLAR
│   ├── /fr/maladies-courantes-perroquet/          ❌ MISSING
│   ├── /fr/aspergillose-perroquet/                ❌ MISSING
│   ├── /fr/psittacose-perroquet/                  ❌ MISSING
│   ├── /fr/perroquet-qui-eternue/                 ❌ MISSING
│   └── /fr/perroquet-problemes-respiratoires/     ❌ MISSING
│
├── PREVENTION SUBPILLAR
│   ├── /fr/vaccination-perroquet/                 ❌ MISSING
│   ├── /fr/bilan-veterinaire-perroquet/           ❌ MISSING
│   ├── /fr/quarantaine-nouvel-oiseau/             ❌ MISSING
│   └── /fr/parasites-perroquet/                   ❌ MISSING
│
├── VET SUBPILLAR
│   ├── /fr/veterinaire-nac-perroquet/             ❌ MISSING
│   ├── /fr/quand-consulter-veterinaire-perroquet/ ❌ MISSING
│   └── /fr/urgence-perroquet/                     ❌ MISSING
│
└── GUARANTEE BRIDGE
    └── /fr/garantie-sante/                        ✅ EXISTS
```

---

## SILO 6 — NUTRITION

**Topical goal:** Own "alimentation perroquet" queries  
**Current status:** 1 blog post + 1 knowledge page + 1 product page; no nutrition cluster

```
PILLAR: /fr/alimentation-perroquet/ [NEW or expand existing]
│
├── FOOD TYPE SUBPILLAR
│   ├── /fr/nourriture-pour-perroquets/            ✅ EXISTS (thin)
│   ├── /fr/granules-perroquet/                    ❌ MISSING
│   ├── /fr/fruits-legumes-perroquet/              ❌ MISSING
│   ├── /fr/graines-perroquet-avantages-risques/   ❌ MISSING
│   └── /fr/aliments-interdits-perroquet/          ❌ MISSING
│
├── SPECIES-SPECIFIC NUTRITION
│   ├── /fr/alimentation-gris-du-gabon/            ❌ MISSING
│   ├── /fr/alimentation-ara/                      ❌ MISSING
│   └── /fr/alimentation-cacatoes/                 ❌ MISSING
│
└── SUPPLEMENTATION
    ├── /fr/vitamines-perroquet/                   ❌ MISSING
    └── /fr/hydratation-perroquet/                 ❌ MISSING
```

---

## SILO 7 — TRAINING

**Topical goal:** Own "dresser perroquet", "apprivoiser perroquet" queries  
**Current status:** 1 page on talking; no broader training content

```
PILLAR: /fr/dresser-perroquet/ [NEW]
│
├── LANGUAGE TRAINING (existing)
│   └── [11-page talking cluster]                  ✅ EXISTS
│
├── TAMING SUBPILLAR
│   ├── /fr/apprivoiser-perroquet/                 ❌ MISSING
│   ├── /fr/perroquet-monter-doigt/                ❌ MISSING
│   └── /fr/apprivoiser-perroquet-adulte/          ❌ MISSING
│
├── COMMAND TRAINING SUBPILLAR
│   ├── /fr/apprendre-tours-perroquet/             ❌ MISSING
│   ├── /fr/clicker-training-perroquet/            ❌ MISSING
│   └── /fr/renforcement-positif-perroquet/        ❌ MISSING
│
└── RECALL / FREE FLIGHT
    ├── /fr/rappel-perroquet/                      ❌ MISSING
    └── /fr/vol-libre-perroquet/                   ❌ MISSING
```

---

## SILO 8 — HOUSING

**Topical goal:** Own "cage perroquet", "volière perroquet", "logement perroquet"  
**Current status:** 1 thin product page

```
PILLAR: /fr/logement-perroquet/ [NEW — consolidates cage + enrichment]
│
├── /fr/cages-pour-perroquets/                     ✅ EXISTS (expand)
├── /fr/quelle-cage-ara/                           ❌ MISSING
├── /fr/voliere-interieure/                        ❌ MISSING
├── /fr/perchoirs-perroquet/                       ❌ MISSING
├── /fr/position-cage-maison/                      ❌ MISSING
└── /fr/temperature-perroquet/                     ❌ MISSING
```

---

## SILO 9 — CITES & LEGAL

**Topical goal:** Be the authoritative FR source for CITES regulations — zero competition in this niche  
**Current status:** 1 knowledge page + FAQ references; strong foundation but thin

```
PILLAR: /fr/cites-perroquet/ [expand /fr/connaissances/cites/]
│
├── /fr/connaissances/cites/                       ✅ EXISTS (thin)
├── /fr/cites-annexe-i-ii/                         ❌ MISSING
├── /fr/importer-perroquet-france/                 ❌ MISSING
├── /fr/acheter-perroquet-sans-cites-risques/      ❌ MISSING
├── /fr/bague-perroquet-obligatoire/               ❌ MISSING
├── /fr/declaraion-nac-france/                     ❌ MISSING
└── /fr/documents-perroquet-voyage/                ❌ MISSING
```

---

## SILO 10 — DELIVERY

**Topical goal:** Own "livraison perroquet france", "transport perroquet"  
**Current status:** 1 service page; no supporting cluster

```
PILLAR: /fr/livraison/ [expand]
│
├── /fr/livraison/                                 ✅ EXISTS
├── /fr/caisses-de-transport/                      ✅ EXISTS (thin)
├── /fr/transport-perroquet-voiture/               ❌ MISSING
├── /fr/transport-perroquet-avion/                 ❌ MISSING
├── /fr/stress-transport-perroquet/                ❌ MISSING
├── /fr/accueil-perroquet-livraison/               ❌ MISSING
└── /fr/livraison-perroquet-europe/                ❌ MISSING
```

---

## SILO 11 — BREEDING EDUCATION

**Topical goal:** Position as the expert source on ethical captive breeding  
**Current status:** Implicit across breeder/eleveur pages; no dedicated cluster

```
PILLAR: /fr/elevage-perroquets/ [expand /fr/eleveur-perroquets/]
│
├── /fr/eleveur-perroquets/                        ✅ EXISTS
├── /fr/elevage-a-la-main-pourquoi/                ❌ MISSING
├── /fr/sevrage-perroquet/                         ❌ MISSING
├── /fr/reproduction-perroquet/                    ❌ MISSING
├── /fr/nidification-perroquet/                    ❌ MISSING
├── /fr/croissance-bebe-perroquet/                 ❌ MISSING
└── /fr/choisir-eleveur-responsable/               ❌ MISSING
```

---

## CROSS-SILO PRIORITY MATRIX

| Silo | Current depth | Gap severity | Revenue potential | Build priority |
|------|--------------|-------------|-------------------|----------------|
| BUYING | 60% | High (7 price pages) | ⬆⬆⬆⬆⬆ | **P1** |
| SPECIES | 70% | Medium (genus hubs, comparisons) | ⬆⬆⬆⬆ | **P1** |
| BEHAVIOUR | 15% | Critical | ⬆⬆⬆ | **P2** |
| TRAINING | 10% | Critical | ⬆⬆⬆ | **P2** |
| HEALTH | 5% | Critical | ⬆⬆⬆ | **P2** |
| NUTRITION | 20% | High | ⬆⬆⬆ | **P2** |
| CARE | 15% | High | ⬆⬆ | **P3** |
| HOUSING | 10% | High | ⬆⬆ | **P3** |
| CITES | 30% | Medium (unique opportunity) | ⬆⬆⬆ | **P2** |
| DELIVERY | 40% | Medium | ⬆⬆ | **P3** |
| BREEDING | 25% | Medium | ⬆⬆ | **P3** |

---

## TOTAL CONTENT SCOPE

| Status | Count |
|--------|-------|
| Pages existing | 157 |
| Pages needed (minimum authority) | ~180 additional |
| Target total (full authority) | ~340 pages |
| Estimated sessions to complete | 8–12 focused builds |
