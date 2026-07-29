# FRENCH-KEYWORD-MAP.md
## Paraíso de Aves — French Keyword Architecture
**Audit date:** 2026-07-29  
**Status:** READ-ONLY. No production files changed.

---

## METHODOLOGY
Keywords are grouped by cluster and mapped to existing FR pages where they exist, or flagged as gaps where no current page targets them. Intent classification: Commercial (C), Informational (I), Navigational (N), Transactional (T).

---

## CLUSTER 1: MAIN COMMERCIAL — Buying a Parrot

| Primary Keyword | Supporting Keywords | Intent | Recommended Page | Existing FR URL | Cannib. Risk | Importance | Gap |
|----------------|--------------------|---------|-----------------|-----------------|-----------|-----------|----|
| acheter un perroquet | perroquet à vendre, perroquet à acheter, acheter perroquet France | T/C | /fr/acheter-perroquet/ | ✓ EXISTS | Low | 🔴 Critical | None |
| perroquets à vendre France | perroquets disponibles France, oiseaux exotiques à vendre | C | /fr/perroquets/ | ✓ EXISTS | Medium | 🔴 Critical | Needs stronger differentiation from /fr/acheter-perroquet/ |
| perroquet disponible | oiseau disponible, perroquet disponible maintenant | T | /fr/perroquets-disponibles/ | ✓ EXISTS | Low | 🔴 Critical | Page needs real inventory cards |
| vente perroquet | vente d'oiseaux exotiques, oiseau exotique à vendre | C | /fr/vente-oiseaux/ | ✓ EXISTS | Medium | 🔴 Critical | Title could be stronger |
| éleveur de perroquets France | élevage perroquets France, criadero perroquets | C | /fr/eleveur-perroquets/ | ✓ EXISTS | Low | 🔴 Critical | None |
| perroquet élevé à la main | oiseau apprivoisé, perroquet apprivoisé | C | /fr/perroquets-eleves-a-la-main/ | ✓ EXISTS | Low | 🔴 Critical | None |
| adopter un perroquet | adoption perroquet France | C/I | /fr/adopter-perroquet/ | ✓ EXISTS | Low | 🔴 Critical | None |

---

## CLUSTER 2: SPECIES COMMERCIAL — "Acheter X"

| Primary Keyword | Supporting Keywords | Intent | Recommended Page | Existing FR URL | Gap |
|----------------|--------------------|---------|-----------------|-----------------|----|
| acheter un ara | ara à vendre France, ara CITES France | T | /fr/acheter-ara/ | ✓ EXISTS | None |
| acheter un gris du Gabon | gris du Gabon à vendre France | T | /fr/acheter-gris-du-gabon/ | ✓ EXISTS | None |
| ara bleu et jaune à vendre | ara bleu jaune France, ara prix France | T | /fr/ara-bleu-et-jaune/ | ✓ EXISTS | Could add price content |
| ara hyacinthe à vendre | ara hyacinthe prix France | T | /fr/ara-hyacinthe/ | ✓ EXISTS | None |
| ara macao à vendre | ara macao France, perroquet macao | T | /fr/ara-macao/ | ✓ EXISTS | None |
| cacatoès à vendre France | cacatoès prix, acheter cacatoès | T | No dedicated page | ❌ MISSING | CREATE /fr/acheter-cacatoes/ |
| amazone à vendre France | amazone prix, acheter amazone | T | No dedicated page | ❌ MISSING | CREATE /fr/acheter-amazone/ |
| conure à vendre France | conure soleil à vendre | T | No dedicated page | ❌ MISSING | CREATE /fr/acheter-conure/ |
| éclectus à vendre France | éclectus prix | T | /fr/eclectus/ | ✓ EXISTS | Good |
| pionus à vendre France | perroquet pionus France | T | /fr/pionus/ | ✓ EXISTS | Good |
| cacatoès rosalbin à vendre | cacatoès galah France | T | /fr/cacatoes-rosalbin/ | ✓ EXISTS | None |
| cacatoès à huppe jaune | cacatoès huppe France | T | /fr/cacatoes-huppe-jaune/ | ✓ EXISTS | None |
| amazone à front bleu à vendre | amazone front bleu France | T | /fr/amazone-front-bleu/ | ✓ EXISTS | None |
| ara chloroptère à vendre | ara à ailes rouges France | T | /fr/especies/ara-chloroptere/ | PARTIAL | Needs standalone commercial page |
| perroquet du Sénégal à vendre | Poicephalus sénégal France | T | No standalone page | ❌ MISSING | /fr/perroquet-du-senegal/ commercial page |

---

## CLUSTER 3: BUYER INTENT — Type/Characteristic

| Primary Keyword | Supporting Keywords | Intent | Recommended Page | Existing FR URL | Gap |
|----------------|--------------------|---------|-----------------|-----------------|----|
| perroquet qui parle | perroquet parleur, perroquet hablador | C | No page | ❌ MISSING | HIGH PRIORITY — CREATE /fr/perroquets-qui-parlent/ |
| perroquet pour famille | perroquet enfants, perroquet familial | C | No page | ❌ MISSING | HIGH PRIORITY — CREATE /fr/perroquet-pour-famille/ |
| perroquet pour appartement | petit perroquet appartement | C | No page | ❌ MISSING | HIGH PRIORITY — CREATE /fr/perroquet-appartement/ |
| petit perroquet | petite espèce perroquet | C | No page | ❌ MISSING | HIGH PRIORITY — CREATE /fr/petits-perroquets/ |
| grand perroquet | grand perroquet ara, grande espèce | C | No page | ❌ MISSING | MEDIUM — CREATE /fr/grands-perroquets/ |
| perroquet bébé | oisillon apprivoisé, bébé perroquet à vendre | C/T | No page | ❌ MISSING | HIGH — CREATE /fr/perroquets-bebes/ |
| perroquet apprivoisé | oiseau domestiqué main | C | /fr/perroquets-eleves-a-la-main/ | PARTIAL | Expand to cover "apprivoisé" keywords |
| meilleur perroquet débutant | quel perroquet choisir débutant | I | /fr/blog/meilleurs-perroquets-debutants/ | ✓ EXISTS | Good — consider promoting to knowledge section |
| perroquet de compagnie | oiseau de compagnie | C | Partial — spread across pages | PARTIAL | No single dedicated landing page |
| perroquet rare | espèce rare perroquet | C | No page | ❌ MISSING | MEDIUM — /fr/perroquets-rares/ |
| perroquet de luxe | ara hyacinthe luxe | C | Partial — /fr/ara-hyacinthe/ | PARTIAL | MEDIUM — dedicated /fr/perroquets-luxe/ |

---

## CLUSTER 4: PRICE KEYWORDS

| Primary Keyword | Supporting Keywords | Intent | Recommended Page | Existing FR URL | Gap |
|----------------|--------------------|---------|-----------------|-----------------|----|
| prix perroquet France | combien coûte un perroquet | I/C | /fr/connaissances/prix/ | ✓ EXISTS | Possible cannibalisation with blog post |
| prix ara hyacinthe | ara hyacinthe combien | I/C | /fr/prix-ara-hyacinthe/ | ✓ EXISTS | Good |
| prix cacatoès | cacatoès combien | I/C | /fr/prix-cacatoes/ | ✓ EXISTS | Good |
| prix gris du Gabon | gris du Gabon combien coûte | I/C | No page | ❌ MISSING | HIGH — CREATE /fr/prix-gris-du-gabon/ |
| prix ara bleu et jaune | ara bleu jaune prix | I/C | No dedicated price page | ❌ MISSING | MEDIUM — CREATE /fr/prix-ara-bleu-et-jaune/ |
| prix conure soleil | conure soleil combien | I/C | No dedicated price page | ❌ MISSING | MEDIUM |
| entretien perroquet coût | budget perroquet mensuel | I | No page | ❌ MISSING | MEDIUM — /fr/cout-entretien-perroquet/ |

---

## CLUSTER 5: LOCAL / CITY

| Primary Keyword | Supporting Keywords | Intent | Recommended Page | Existing FR URL | Gap |
|----------------|--------------------|---------|-----------------|-----------------|----|
| perroquet à vendre Paris | perroquet Paris, acheter perroquet Île-de-France | T/C | /fr/perroquets-a-vendre-paris/ | ✓ EXISTS | Add regional page |
| perroquet à vendre Lyon | perroquet Lyon, acheter perroquet Lyon | T/C | /fr/perroquets-a-vendre-lyon/ | ✓ EXISTS | None |
| perroquet à vendre Marseille | perroquet Marseille | T/C | /fr/perroquets-a-vendre-marseille/ | ✓ EXISTS | None |
| perroquet Île-de-France | oiseau exotique région parisienne | C | No page | ❌ MISSING | MEDIUM — regional page |
| perroquet PACA | perroquet Provence, oiseau exotique Sud | C | No page | ❌ MISSING | MEDIUM |
| [+ 47 other city keywords] | All major FR cities covered | | [city pages] | ✓ EXISTS | Cities hub needed |

---

## CLUSTER 6: CARE & INFORMATIONAL

| Primary Keyword | Supporting Keywords | Intent | Recommended Page | Existing FR URL | Gap |
|----------------|--------------------|---------|-----------------|-----------------|----|
| alimentation perroquets | que mangent les perroquets | I | /fr/connaissances/alimentation/ + blog | ✓ EXISTS | Good |
| soins perroquet | comment soigner un perroquet | I | No dedicated hub | PARTIAL | MEDIUM — needs consolidation |
| santé perroquet | maladies perroquets, longévité | I | /fr/connaissances/sante/ | ✓ EXISTS | Good |
| comportement perroquet | éducation perroquet | I | /fr/connaissances/comportement/ | ✓ EXISTS | Could be expanded |
| dresser un perroquet | éduquer perroquet, clicker training | I | No page | ❌ MISSING | HIGH — /fr/connaissances/dressage/ |
| cage pour perroquet | volière perroquet | I/C | /fr/cages-pour-perroquets/ | ✓ EXISTS | Thin content — expand |
| longévité perroquet | combien vit un perroquet | I | /fr/blog/combien-vit-perroquet/ | ✓ EXISTS | Good |
| perroquet gris du Gabon caractère | gris Gabon comportement | I | /fr/especies/perroquet-gris-du-gabon/ | ✓ EXISTS | Good |
| les perroquets peuvent-ils manger X | (individual food FAQs) | I | No individual FAQ pages | ❌ MISSING | HIGH — 15+ individual FAQ pages |

---

## CLUSTER 7: LEGAL & TRUST

| Primary Keyword | Supporting Keywords | Intent | Recommended Page | Existing FR URL | Gap |
|----------------|--------------------|---------|-----------------|-----------------|----|
| CITES perroquet France | documents CITES, perroquet légal France | I | /fr/connaissances/cites/ | ✓ EXISTS | Good |
| livraison perroquet France | transport oiseau France | I/C | /fr/livraison/ + /fr/connaissances/livraison/ | ✓ EXISTS | Consolidate or differentiate |
| garantie santé perroquet | garantie oiseau | C | /fr/garantie-sante/ | ✓ EXISTS | Good trust page |
| processus adoption perroquet | comment adopter perroquet | I | /fr/processus-adoption/ | ✓ EXISTS | Needs schema |
| éleveur sérieux perroquet | comment choisir éleveur | I | /fr/blog/choisir-eleveur-serieux/ | ✓ EXISTS | Good |
| perroquet DNA sexé | test ADN oiseau | I | No dedicated page | ❌ MISSING | MEDIUM |

---

## PRIORITY KEYWORD GAPS (TOP 15 MISSING)

Ranked by estimated French search demand and commercial value:

| Rank | Keyword | Est. Intent | Proposed URL | Why Important |
|------|---------|------------|-------------|---------------|
| 1 | perroquet qui parle / parleur | C | /fr/perroquets-qui-parlent/ | #1 buyer intent query in FR pet market |
| 2 | perroquet pour famille | C | /fr/perroquet-pour-famille/ | Decision-making page; high conversion intent |
| 3 | perroquet pour appartement | C | /fr/perroquet-appartement/ | Urban France buyers; top query |
| 4 | petit perroquet | C | /fr/petits-perroquets/ | High volume, entry-level buyers |
| 5 | perroquet bébé / oisillon | C/T | /fr/perroquets-bebes/ | Purchase intent; "raised by hand" variant |
| 6 | prix gris du Gabon | I/C | /fr/prix-gris-du-gabon/ | Most popular species + high-value |
| 7 | FAQ perroquet can-eat-X (x15 pages) | I | /fr/faq/{slug}/ | 37 ES pages, zero FR — massive gap |
| 8 | dresser un perroquet | I | /fr/connaissances/dressage/ | High-engagement informational pillar |
| 9 | cacatoès à vendre France | T | /fr/acheter-cacatoes/ | Commercial gap despite species guide coverage |
| 10 | amazone à vendre France | T | /fr/acheter-amazone/ | Same gap |
| 11 | perroquet rare France | C | /fr/perroquets-rares/ | Differentiator page; luxury segment |
| 12 | entretien perroquet budget | I | /fr/cout-entretien-perroquet/ | ES has equivalent; FR buyers ask this |
| 13 | conure soleil à vendre | T | /fr/acheter-conure/ | Popular species, no commercial page |
| 14 | perroquet DNA sexé | I | /fr/connaissances/sexage-adn/ | Trust/quality differentiator |
| 15 | élevage de perroquets région X | C | /fr/perroquets-{region}/ (x4) | Captures regional intent current cities miss |
