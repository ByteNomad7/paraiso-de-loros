# Conversion Flow — Customer Journey Map & Optimisation

**Date:** 2026-07-29  
**Role:** CRO Specialist + UX Director  
**Scope:** Complete French section buyer journey from first touch to post-purchase

---

## THE IDEAL CONVERSION JOURNEY

```
SEARCH / SOCIAL / REFERRAL
         ↓
LANDING PAGE (species page, blog, city page, homepage)
         ↓
COMMERCIAL PAGE (acheter, prix, available-birds)
         ↓
SPECIES GUIDE (deep species information)
         ↓
AVAILABLE BIRDS (perroquets-disponibles)
         ↓
ENQUIRY (contact form submission)
         ↓
CONFIRMATION + FOLLOW-UP (email → processus-adoption)
         ↓
DEPOSIT + RESERVATION
         ↓
DELIVERY + ACCUEIL GUIDE
         ↓
LIFETIME SUPPORT (post-sale relationship)
```

---

## STAGE 1: LANDING PAGE

### Entry points (in approximate traffic order)
1. City pages (/fr/perroquets-a-vendre-[ville]/) — local commercial intent
2. Species pages (Tier 1 flagship) — species discovery/research
3. Cluster pages (talking, buyer profiles) — informational
4. Tier 2 species pages (/fr/especies/) — deep research
5. Homepage (/fr/) — direct/brand navigation
6. Blog posts — SEO/content traffic
7. Price pages — high-intent commercial

### Drop-off risk by entry point

| Entry type | Conversion clarity | Trust on entry | Drop risk |
|-----------|------------------|---------------|-----------|
| City pages | ⚠️ Medium — lists species but no individual bird | 4/10 | HIGH |
| Tier 1 species | ✅ Good — CTA to price + available | 7/10 | MEDIUM |
| Cluster pages | ❌ Low — informational, CTA buried | 5/10 | HIGH |
| Tier 2 species | ⚠️ Medium — links to Tier 1 but weak CTA | 5/10 | HIGH |
| Homepage | ✅ Good — clear species grid + CTA | 7/10 | MEDIUM |
| Blog posts | ❌ Low — sidebar CTA only | 4/10 | VERY HIGH |
| Price pages | ✅ Good — direct CTA to contact | 7/10 | MEDIUM-LOW |

### Recommendations — Landing stage
**CF-L01:** Every page (without exception) must carry a contextually relevant CTA above the fold visible on mobile. Currently, cluster pages and city pages bury the CTA.

**CF-L02:** City pages need a trust statement at the top: "Livraison vers [Ville] sous 2–4 jours — Documentation CITES incluse." This immediately answers the buyer's primary question.

**CF-L03:** Blog posts need a persistent sticky sidebar or floating CTA on mobile. The current sidebar disappears on small screens.

---

## STAGE 2: COMMERCIAL PAGE

### Pages involved
- /fr/acheter-perroquet/ (thin — needs expansion)
- /fr/acheter-ara/, /fr/acheter-gris-du-gabon/
- /fr/prix-[species]/ pages (strong — best performing commercial pages)

### Current conversion analysis

**Price pages** (strongest):
- ✅ Clear species focus
- ✅ Product schema with honest "prix sur demande"
- ✅ FAQPage answering cost objections
- ❌ No testimonials on these pages
- ❌ CTA leads to generic contact — not species-specific

**Acheter pages** (weakest):
- ❌ Thin content
- ❌ No trust elements beyond navigation
- ❌ No specific CTAs (just generic "contact us")

### Recommendations — Commercial stage
**CF-C01:** Price pages CTA should pre-populate contact form: "Je souhaite des informations sur le [Species]" — reduce friction from click to enquiry.

**CF-C02:** Add a "Pourquoi notre élevage?" trust block to every commercial page — 3 icons + sentences: CITES, Vet check, 25 years. This addresses the "why you" question at the moment of commercial intent.

**CF-C03:** Add a "disponibilité actuelle" indicator to commercial pages — even a simple "✓ [Species] disponibles actuellement — contactez-nous" reassures buyers that it's worth enquiring.

---

## STAGE 3: SPECIES GUIDE

### Pages involved
All Tier 1 (/fr/[species]/) and Tier 2 (/fr/especies/[species]/)

### Current conversion analysis
- ✅ Good depth on Tier 2 pages
- ✅ FAQ sections address common questions
- ❌ Commercial CTA is not consistent across all species pages
- ❌ No "Is this species right for me?" decision helper
- ❌ No direct link from species page to "available birds of this species"

### Recommendations — Species guide stage
**CF-S01:** Add a "compatibility check" section to every species page: "Cette espèce vous convient-elle?" with 3 questions (experience level, living space, time availability). Buyers who qualify themselves are more committed enquirers.

**CF-S02:** Add an explicit "Oiseaux disponibles de cette espèce" CTA on every Tier 1 species page — currently the link to disponibles is generic.

**CF-S03:** "Prix indicatif" link from species page to the relevant price page (where it exists) — currently this cross-link is inconsistent.

---

## STAGE 4: AVAILABLE BIRDS

### Page: /fr/perroquets-disponibles/

### Current analysis
- ✅ Bird grid with cards
- ✅ "Pourquoi choisir un éleveur" section
- ✅ Documentation list
- ❌ **All cards show "Consulter disponibilité"** — zero differentiation, no urgency
- ❌ No individual bird profiles
- ❌ No species filter
- ❌ No sex filter
- ❌ No age filter
- ❌ Gallery section present but not directly linked to bird cards
- ❌ Sidebar contact form does not pre-populate species

### This is the highest-risk drop-off point on the site.

A buyer who has done their research arrives at "available birds" expecting to see actual available birds with photos, age, sex, status. They find identical cards with identical "Consulter disponibilité" labels. The cognitive signal is: "nothing specific is available, so why contact them?"

### Recommendations — Available birds stage (ordered by impact)

**CF-A01 — Differentiate bird cards immediately**  
Each card should show at minimum:
- Species (clearly)
- Sex (if DNA tested: ♂ or ♀)
- Approximate age/year hatched
- Status: "Disponible" (green) / "Réservé" (amber) / "Bientôt disponible" (blue)

**CF-A02 — Add a filter bar**  
Simple HTML/CSS filter: Species | Sex | Status. No JavaScript required — CSS `:target` or simple anchor filtering works.

**CF-A03 — Individual bird pages (medium-term)**  
Each available bird gets /fr/perroquets-disponibles/[species]-[ref]/  
This is the highest-conversion page type possible: "Gris du Gabon mâle, né 2024, disponible" is a specific offer that creates real urgency.

**CF-A04 — "Oiseau récemment adopté" gallery**  
A small section showing recently adopted birds (with photo, species, "Adopté par une famille de [Ville]") creates urgency and social proof simultaneously.

**CF-A05 — Contact form pre-population**  
The sidebar contact form should default to the most recently viewed species. Currently it shows a generic dropdown.

---

## STAGE 5: ENQUIRY (Contact)

### Page: /fr/contact/

### Current analysis
- ✅ Form: Name, Email, Species dropdown, Message
- ✅ "Réponse sous 24h" promise
- ✅ "En français" stated
- ❌ Gmail address displayed — immediate trust drop
- ❌ No reassurance about what happens after submission
- ❌ No phone alternative (even "email only" should be stated explicitly)
- ❌ No FAQ answering "what should I ask?" to help first-time buyers

### Recommendations — Enquiry stage

**CF-E01 — Replace Gmail with professional email** (P1 — see TRUST-SIGNALS.md TS-L04)

**CF-E02 — Post-submission journey explanation**  
Below the form: "Après votre message: Vous recevrez un email de confirmation. Nous vous répondrons sous 24h avec des informations sur les oiseaux disponibles et les étapes suivantes."

**CF-E03 — Expand species dropdown**  
Include all 10+ species with common names. "Autres" as final option. This signals care and completeness.

**CF-E04 — Add a helpful prompt**  
"Pour une réponse personnalisée, précisez: l'espèce souhaitée, votre expérience avec les perroquets, et votre localisation." This pre-qualifies enquiries and sets buyer expectations.

**CF-E05 — Form field for "Comment avez-vous entendu parler de nous?"**  
Optional — captures attribution data and makes the form feel more personal.

---

## STAGE 6: CONFIRMATION + FOLLOW-UP

### Current state
- After form submission: unknown (no confirmation page specified in audit)
- Adoption process page (/fr/processus-adoption/) exists but is not prominently linked from contact page

### Recommendations

**CF-F01 — Dedicated "Merci" confirmation page**  
After form submission: a /fr/merci/ page that:
- Confirms the message was received
- Restates the 24h response promise
- Links to /fr/processus-adoption/ (so they know what comes next)
- Links to /fr/galerie/ (keeps them engaged)
- Optionally: "Pendant que vous attendez, découvrez nos derniers oiseaux disponibles →"

**CF-F02 — Link from contact to processus-adoption**  
The adoption process should be visually linked from the contact page — "Voici comment se déroule l'adoption ↓" — before the form. Buyers who know the process are more committed.

---

## STAGE 7: DEPOSIT + RESERVATION

### Current state
- Step 3 of processus-adoption mentions "Acompte"
- No amount specified, no payment method stated, no security described

### Recommendations

**CF-D01 — Deposit clarity**  
State the deposit percentage/amount. "Un acompte de [X]% de la valeur de l'oiseau est demandé pour confirmer la réservation." Vagueness here causes buyers to disengage.

**CF-D02 — Payment method statement**  
"Paiement par virement bancaire sécurisé / PayPal" (whichever is accurate). Explicitly state that payment is only requested after personal communication — this protects against scam associations.

---

## STAGE 8: DELIVERY

### Current state
- /fr/livraison/ describes timelines
- IATA crate mentioned
- No carrier named, no tracking described

### Recommendations (see also TRUST-SIGNALS.md TS-D01-D03)

**CF-DL01 — Delivery confirmation email sequence**  
After deposit: a defined sequence of 3 emails:
1. Deposit confirmed + paperwork checklist
2. Bird preparation update + vet check confirmation
3. Delivery scheduled + what to prepare at home

**CF-DL02 — Accueil guide**  
A dedicated /fr/accueil-perroquet-livraison/ page (or PDF) sent with every delivery describing: first 24h, first week, normal stress behaviours, feeding during transition.

---

## STAGE 9: LIFETIME SUPPORT

### Current state
- "Suivi Post-Adoption" is Step 6 of the process
- "Toute la vie de l'oiseau" stated
- No practical description of what this involves

### Recommendations

**CF-LS01 — Lifetime Support page**  
A dedicated /fr/support-post-adoption/ page explaining:
- Email address for post-adoption questions
- Typical response time
- Types of questions answered (diet, behaviour, health alerts)
- When to see a vet vs when to email the breeder

This page also serves as strong E-E-A-T content — it demonstrates ongoing expert involvement.

---

## JOURNEY DROP-OFF RISK SUMMARY

| Stage | Drop risk | Main cause | Priority fix |
|-------|-----------|-----------|-------------|
| Landing (city/blog) | VERY HIGH | No above-fold CTA | CF-L01 |
| Commercial pages | MEDIUM | No trust block, generic CTA | CF-C02 |
| Species guide | MEDIUM | No availability link | CF-S02 |
| Available birds | **CRITICAL** | All cards identical "Consulter" | CF-A01 |
| Enquiry | HIGH | Gmail address, no post-submit info | CF-E01, CF-F01 |
| Confirmation | HIGH | No confirmation page | CF-F01 |
| Deposit | HIGH | No amount, no payment method | CF-D01 |
| Delivery | MEDIUM | No tracking, no carrier | CF-DL01 |

**The two highest-priority CRO fixes:**
1. Differentiate available bird cards (CF-A01) — highest impact
2. Replace Gmail + add confirmation page (CF-E01, CF-F01) — highest trust gain
