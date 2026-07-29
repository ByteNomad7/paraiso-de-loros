# Entity Inventory — Paraíso de Aves French Section

**Audit date:** 2026-07-29  
**Pages audited:** 157 FR pages  
**Method:** Filesystem crawl + schema inspection + content sampling

---

## 1. SPECIES ENTITIES

### 1.1 Tier 1 — Flagship Species (dedicated /fr/[species]/ pages)

| Entity | Scientific Name | FR Page | Tier |
|--------|----------------|---------|------|
| Perroquet Gris du Gabon | Psittacus erithacus | /fr/perroquet-gris-du-gabon/ | 1 |
| Amazone à Front Bleu | Amazona aestiva | /fr/amazone-front-bleu/ | 1 |
| Ara Bleu et Jaune | Ara ararauna | /fr/ara-bleu-et-jaune/ | 1 |
| Ara Hyacinthe | Anodorhynchus hyacinthinus | /fr/ara-hyacinthe/ | 1 |
| Ara Macao | Ara macao | /fr/ara-macao/ | 1 |
| Ara Catalina | Ara ararauna × Ara macao | /fr/ara-catalina/ | 1 |
| Cacatoès à Huppe Jaune | Cacatua galerita | /fr/cacatoes-huppe-jaune/ | 1 |
| Cacatoès Rosalbin | Eolophus roseicapilla | /fr/cacatoes-rosalbin/ | 1 |
| Éclectus | Eclectus roratus | /fr/eclectus/ | 1 |
| Pionus | Pionus menstruus | /fr/pionus/ | 1 |

### 1.2 Tier 2 — Extended Species Catalogue (/fr/especies/)

| Entity | Scientific Name | FR Page |
|--------|----------------|---------|
| Amazone Aile Orange | Amazona amazonica | /fr/especies/amazone-aile-orange/ |
| Amazone à Front Bleu (deep) | Amazona aestiva | /fr/especies/amazone-front-bleu/ |
| Amazone Nuque Jaune | Amazona oratrix | /fr/especies/amazone-nuque-jaune/ |
| Ara Bleu et Jaune (deep) | Ara ararauna | /fr/especies/ara-bleu-et-jaune/ |
| Ara Chloroptère | Ara chloropterus | /fr/especies/ara-chloroptere/ |
| Ara Hyacinthe (deep) | Anodorhynchus hyacinthinus | /fr/especies/ara-hyacinthe/ |
| Ara Macao (deep) | Ara macao | /fr/especies/ara-macao/ |
| Cacatoès Blanc | Cacatua alba | /fr/especies/cacatoes-blanc/ |
| Cacatoès de Goffin | Cacatua goffiniana | /fr/especies/cacatoes-goffin/ |
| Cacatoès à Huppe Jaune (deep) | Cacatua galerita | /fr/especies/cacatoes-huppe-jaune/ |
| Cacatoès Rosalbin (deep) | Eolophus roseicapilla | /fr/especies/cacatoes-rosalbin/ |
| Caïque à Ventre Noir | Pionites melanocephalus | /fr/especies/caique/ |
| Caïque à Ventre Blanc | Pionites leucogaster | /fr/especies/caique-ventre-blanc/ |
| Conure Jenday | Aratinga jandaya | /fr/especies/conure-jenday/ |
| Conure Joues Vertes | Pyrrhura molinae | /fr/especies/conure-joues-vertes/ |
| Conure Soleil | Aratinga solstitialis | /fr/especies/conure-soleil/ |
| Éclectus (deep) | Eclectus roratus | /fr/especies/eclectus/ |
| Grand Alexandre | Psittacula eupatria | /fr/especies/grand-alexandre/ |
| Loriquet Arc-en-Ciel | Trichoglossus moluccanus | /fr/especies/loriquet-arc-en-ciel/ |
| Perroquet du Sénégal | Poicephalus senegalus | /fr/especies/perroquet-du-senegal/ |
| Gris du Gabon (deep) | Psittacus erithacus | /fr/especies/perroquet-gris-du-gabon/ |
| Pionus (deep) | Pionus menstruus | /fr/especies/perroquet-pionus/ |
| Perruche à Collier | Psittacula krameri | /fr/especies/perruche-a-collier/ |
| Perruche d'Alexandre | Psittacula eupatria | /fr/especies/perruche-alexandre/ |
| Perruche Moine | Myiopsitta monachus | /fr/especies/perruche-moine/ |
| Perruche Royale | Alisterus scapularis | /fr/especies/perruche-royale/ |

### 1.3 Non-Psittacidae

| Entity | Scientific Name | FR Page |
|--------|----------------|---------|
| Toucan (genre) | Ramphastidae | /fr/toucans/ |

### 1.4 Hybrid Entities

| Entity | Parent Species | FR Page |
|--------|---------------|---------|
| Ara Catalina | Ara ararauna × Ara macao | /fr/ara-catalina/ + gallery |

---

## 2. INDIVIDUAL BIRD ENTITIES

Currently these are not represented as distinct structured entities on the site. They appear implicitly via:
- `/fr/perroquets-disponibles/` — availability listing (no per-bird URL)
- `/fr/galerie/perroquets-disponibles/` — photo gallery

**Gap:** No individual bird pages with unique Product schema per bird.

---

## 3. ATTRIBUTE ENTITIES (Species-level descriptors)

| Attribute Entity | Coverage | Notes |
|-----------------|----------|-------|
| Talking ability | ✓ Strong | /fr/perroquet-qui-parle/ cluster (11 pages) |
| Intelligence | ✓ Strong | /fr/les-perroquets-les-plus-intelligents/ |
| Noise level | ✓ Moderate | /fr/perroquets-calmes/, /fr/perroquet-appartement/ |
| Lifespan | ✓ Weak | Mentioned in species pages, no dedicated entity page |
| Price | ✓ Partial | 3 price pages (Gris, Ara Hyacinthe, Cacatoès); others missing |
| Availability | ✓ Moderate | /fr/perroquets-disponibles/ (no per-species availability) |
| Colour / plumage | ✗ Missing | No colour entity pages |
| DNA sex | ✗ Missing | Referenced in text; no entity page |
| Age / juvenile | ✓ Partial | /fr/perroquets-bebes/ covers juveniles broadly |
| Hand-raised | ✓ Moderate | /fr/perroquets-eleves-a-la-main/ |
| Parent-raised | ✗ Missing | Not covered |

---

## 4. BUSINESS / ORGANISATION ENTITIES

| Entity | Type | Schema Present | Page |
|--------|------|---------------|------|
| Paraíso de Aves | Organization | ✓ (@id: #org) | /fr/ |
| Paraíso de Aves | LocalBusiness | ✓ (@id: #lb-fr) | /fr/ |
| Paraíso de Aves | WebSite | ✓ | /fr/ |
| Éleveur (breeder profile) | Person | ✗ Missing | /fr/eleveur-perroquets/ |

---

## 5. SERVICE ENTITIES

| Entity | Type | Page | Schema |
|--------|------|------|--------|
| Livraison France | Service | /fr/livraison/ | ✗ No Service schema |
| Adoption process | Service | /fr/processus-adoption/ | ✗ No Service schema |
| Garantie santé | Service | /fr/garantie-sante/ | ✗ No Service schema |
| CITES certification | Service/Process | /fr/connaissances/cites/ | ✗ No schema |
| Transport en caisse IATA | Service | /fr/caisses-de-transport/ | ✗ No schema |

---

## 6. GEOGRAPHIC ENTITIES

| Entity Type | Count | Pages |
|------------|-------|-------|
| Country — France | 1 | Implicit across entire FR section |
| City landing pages | 50 | /fr/perroquets-a-vendre-[ville]/ |
| Breeder location | 1 | Llíria, Valence, Espagne (in Organization schema) |

**50 cities covered:**
Aix-en-Provence, Amiens, Angers, Annecy, Antibes, Avignon, Bayonne, Besançon, Béziers, Bordeaux, Brest, Caen, Cannes, Chambéry, Clermont-Ferrand, Colmar, Dijon, Grenoble, La Rochelle, Le Havre, Le Mans, Lille, Limoges, Lorient, Lyon, Marseille, Metz, Montauban, Montpellier, Mulhouse, Nantes, Narbonne, Nice, Nîmes, Orléans, Paris, Pau, Perpignan, Poitiers, Reims, Rennes, Rouen, Saint-Étienne, Strasbourg, Toulon, Toulouse, Tours, Troyes, Valence, Villeurbanne

---

## 7. PRODUCT / ACCESSORY ENTITIES

| Entity | Page | Schema |
|--------|------|--------|
| Nourriture pour perroquets | /fr/nourriture-pour-perroquets/ | Unknown |
| Cages pour perroquets | /fr/cages-pour-perroquets/ | Unknown |
| Jouets naturels | /fr/jouets-naturels-pour-perroquets/ | Unknown |
| Caisses de transport IATA | /fr/caisses-de-transport/ | Unknown |

---

## 8. COMMERCIAL INTENT ENTITIES (Buyer Journey)

| Entity | Intent Stage | Page |
|--------|-------------|------|
| Acheter un perroquet | Decision | /fr/acheter-perroquet/ |
| Acheter un ara | Decision | /fr/acheter-ara/ |
| Acheter un Gris du Gabon | Decision | /fr/acheter-gris-du-gabon/ |
| Adopter un perroquet | Decision | /fr/adopter-perroquet/ |
| Processus d'adoption | Decision | /fr/processus-adoption/ |
| Vente d'oiseaux | Decision | /fr/vente-oiseaux/ |
| Perroquets disponibles | Decision | /fr/perroquets-disponibles/ |
| Éleveur sérieux | Trust | /fr/eleveur-perroquets/ |
| Nos installations | Trust | /fr/nos-installations/ |
| À propos | Trust | /fr/a-propos/ |
| Contact | Conversion | /fr/contact/ |

---

## 9. TRUST / CREDIBILITY ENTITIES

| Entity | Page |
|--------|------|
| CITES documentation | /fr/connaissances/cites/ |
| Garantie santé | /fr/garantie-sante/ |
| Bague d'identification | Referenced in species pages |
| Certificat vétérinaire | Referenced in FAQ |
| 25 ans d'expérience | Referenced in multiple pages |

---

## 10. KNOWLEDGE / CONTENT ENTITIES

| Category | Count | Hub Page |
|----------|-------|---------|
| Blog articles | 12 | /fr/blog/ |
| Knowledge base sections | 10 | /fr/connaissances/ |
| Talking cluster pages | 11 | /fr/perroquet-qui-parle/ |
| Buyer intent guides | 6 | Various |
| Gallery categories | 12 | /fr/galerie/ |
| Price guides | 3 | /fr/prix-*/ |
| FAQ page | 1 | /fr/faq/ |

---

## 11. BEHAVIOUR / CARE ENTITIES

| Entity | Coverage | Page |
|--------|----------|------|
| Alimentation | ✓ | /fr/nourriture-pour-perroquets/ + /fr/connaissances/alimentation/ + blog |
| Comportement | ✓ Weak | /fr/connaissances/comportement/ |
| Santé aviaire | ✓ Weak | /fr/connaissances/sante/ |
| Enrichissement / jouets | ✓ | /fr/jouets-naturels-pour-perroquets/ |
| Logement / cages | ✓ | /fr/cages-pour-perroquets/ |
| Dressage / training | ✓ Partial | /fr/comment-apprendre-a-un-perroquet-a-parler/ (language only) |
| Socialisation | ✓ Partial | /fr/perroquets-eleves-a-la-main/ + /fr/perroquets-bebes/ |

---

## ENTITY COUNT SUMMARY

| Category | Count |
|----------|-------|
| Species entities (unique) | 31 |
| Hybrid species | 1 |
| Geographic entities (cities) | 50 |
| Commercial intent pages | 11 |
| Knowledge/content entities | 46+ |
| Attribute entities | 13 |
| Service entities | 5 |
| Product/accessory entities | 4 |
| Business entities | 3 |
| **TOTAL FR PAGES** | **157** |
