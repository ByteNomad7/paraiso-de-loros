#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

// CSS to inject once per page (unique rc- prefix to avoid conflicts)
const CSS_BLOCK = `<style>
.rc-section{max-width:1200px;margin:0 auto;padding:0 5% 56px}
.rc-section+.rc-section{padding-top:0}
.rc-title{font-family:'Playfair Display',Georgia,serif;font-size:1.6rem;font-weight:800;color:var(--primary);margin-bottom:8px}
.rc-sub{color:#5C5C5C;font-size:.95rem;margin-bottom:36px}
.rc-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px}
.rc-card{background:#fff;border:1px solid var(--border);border-radius:16px;padding:28px 24px;transition:transform .2s,box-shadow .2s;position:relative;overflow:hidden}
.rc-card:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(0,0,0,.1)}
.rc-card::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,var(--primary),var(--gold))}
.rc-card h3{font-family:'Playfair Display',Georgia,serif;font-size:1.1rem;font-weight:700;color:var(--primary);margin:8px 0}
.rc-card p{font-size:.88rem;color:#5C5C5C;line-height:1.6;margin-bottom:16px}
.rc-card a.rc-btn{display:inline-block;background:var(--primary);color:#fff;font-weight:700;font-size:.85rem;padding:9px 20px;border-radius:8px;transition:background .2s}
.rc-card a.rc-btn:hover{background:var(--gold)}
</style>`;

// Helper: build a species card
function speciesCard(emoji, name, desc, url) {
  return `      <div class="rc-card">
        <span style="font-size:1.6rem">${emoji}</span>
        <h3>${name}</h3>
        <p>${desc}</p>
        <a href="${url}" class="rc-btn">Voir la fiche →</a>
      </div>`;
}

// Helper: build a city card
function cityCard(city, slug, desc) {
  return `      <div class="rc-card">
        <span style="font-size:1.6rem">🏙️</span>
        <h3>Perroquets à ${city}</h3>
        <p>${desc}</p>
        <a href="/fr/perroquets-a-vendre-${slug}/" class="rc-btn">Voir la ville →</a>
      </div>`;
}

// Helper: build a full section block
function section(title, subtitle, cards) {
  return `\n<section class="rc-section">
  <h2 class="rc-title">${title}</h2>
  <p class="rc-sub">${subtitle}</p>
  <div class="rc-grid">
${cards.join('\n')}
  </div>
</section>`;
}

// ─── Page definitions ─────────────────────────────────────────────────────────

const pages = {

  'adoption': {
    species: section(
      'Espèces à adopter',
      'Chaque espèce a ses propres besoins. Consultez la fiche détaillée avant de vous décider.',
      [
        speciesCard('🦜', 'Perroquet Gris du Gabon', 'L\'espèce la plus intelligente, idéale pour les familles patientes. Longévité 50–80 ans.', '/fr/especies/perroquet-gris-du-gabon/'),
        speciesCard('💛', 'Ara Bleu et Jaune', 'Grand et affectueux, l\'ara bleu est un compagnon exceptionnel pour les espaces spacieux.', '/fr/especies/ara-bleu-et-jaune/'),
        speciesCard('🔆', 'Conure Soleil', 'Petite et enjouée, la conure soleil est parfaite pour un premier perroquet en appartement.', '/fr/especies/conure-soleil/'),
        speciesCard('🟢', 'Perruche à Collier', 'Sociable et facile à apprivoiser, elle s\'adapte bien à la vie en appartement.', '/fr/especies/perruche-a-collier/'),
      ]
    ),
    cities: section(
      'Adopter un perroquet dans votre ville',
      'Nous livrons partout en France métropolitaine. Retrouvez nos disponibilités par ville.',
      [
        cityCard('Paris', 'paris', 'Livraison express à Paris et en Île-de-France. Prise en charge professionnelle.'),
        cityCard('Lyon', 'lyon', 'Livraison rapide à Lyon et en Auvergne-Rhône-Alpes depuis notre élevage en Espagne.'),
        cityCard('Marseille', 'marseille', 'Livraison à Marseille et dans toute la région PACA. Oiseaux documentés CITES.'),
        cityCard('Toulouse', 'toulouse', 'Livraison à Toulouse et en Occitanie. Accompagnement personnalisé à l\'adoption.'),
      ]
    ),
  },

  'alimentation': {
    species: section(
      'Régimes alimentaires par espèce',
      'Chaque espèce a des besoins nutritionnels spécifiques. Découvrez la fiche de votre perroquet.',
      [
        speciesCard('🦜', 'Perroquet Gris du Gabon', 'Nécessite un apport élevé en calcium et vitamine A. Régime varié indispensable pour éviter les carences.', '/fr/especies/perroquet-gris-du-gabon/'),
        speciesCard('🤍', 'Cacatoès à Huppe Jaune', 'Sensible à l\'obésité : régime pauvre en graisses, riche en légumes verts et granulés de qualité.', '/fr/especies/cacatoes-huppe-jaune/'),
        speciesCard('🟠', 'Perroquet du Sénégal', 'Petit et actif, il nécessite des pellets de qualité, fruits frais et légumes au quotidien.', '/fr/especies/perroquet-du-senegal/'),
        speciesCard('💙', 'Amazone à Front Bleu', 'Les amazones sont sujettes aux maladies hépatiques ; évitez les régimes trop riches en graines.', '/fr/especies/amazone-front-bleu/'),
      ]
    ),
    cities: section(
      'Trouver votre perroquet en France',
      'Nous livrons dans toute la France métropolitaine avec tous les documents légaux.',
      [
        cityCard('Paris', 'paris', 'Livraison 48–72 h à Paris. Oiseaux élevés à la main, documentés et vétérinés.'),
        cityCard('Lyon', 'lyon', 'Service de livraison à Lyon et en Auvergne-Rhône-Alpes. Devis sur demande.'),
        cityCard('Bordeaux', 'bordeaux', 'Livraison à Bordeaux et en Nouvelle-Aquitaine. Accompagnement avant et après adoption.'),
        cityCard('Nantes', 'nantes', 'Livraison à Nantes et en Pays de la Loire. Contact rapide pour connaître les disponibilités.'),
      ]
    ),
  },

  'cites': {
    species: section(
      'Espèces réglementées par la CITES',
      'Consultez la documentation requise pour chaque espèce avant tout achat ou adoption.',
      [
        speciesCard('🦜', 'Perroquet Gris du Gabon — Annexe I', 'Espèce la plus réglementée : certificat CE obligatoire, bague individuelle et certificat vétérinaire.', '/fr/especies/perroquet-gris-du-gabon/'),
        speciesCard('💙', 'Ara Hyacinthe — Annexe I', 'Le plus grand des aras, classé Annexe I : documentation d\'origine captive exigée à la vente.', '/fr/especies/ara-hyacinthe/'),
        speciesCard('🤍', 'Cacatoès à Huppe Jaune — Annexe II', 'Surveillance CITES renforcée. Exigez l\'attestation de naissance en captivité et la bague.', '/fr/especies/cacatoes-huppe-jaune/'),
        speciesCard('💛', 'Amazone Nuque Jaune — Annexe I', 'Espèce menacée classée Annexe I. Seuls les oiseaux nés en élevage certifié peuvent être vendus.', '/fr/especies/amazone-nuque-jaune/'),
      ]
    ),
    cities: section(
      'Acheter légalement dans votre ville',
      'Paraíso de Aves livre des oiseaux avec tous les documents CITES valides dans toute la France.',
      [
        cityCard('Paris', 'paris', 'Documents CITES complets pour chaque livraison à Paris. Élevage certifié depuis l\'Espagne.'),
        cityCard('Marseille', 'marseille', 'Livraison à Marseille avec certificat vétérinaire et documentation légale complète.'),
        cityCard('Lyon', 'lyon', 'Achat légal à Lyon : bague, certificat CE et documents sanitaires fournis systématiquement.'),
        cityCard('Toulouse', 'toulouse', 'Livraison documentée à Toulouse. Transparence totale sur l\'origine et le statut CITES.'),
      ]
    ),
  },

  'comportement': {
    species: section(
      'Comportement par espèce',
      'Chaque perroquet a sa propre personnalité. Consultez les fiches pour choisir l\'espèce adaptée à votre foyer.',
      [
        speciesCard('🦜', 'Perroquet Gris du Gabon', 'Très sensible et attaché à son tuteur. Peut développer des comportements obsessionnels sans stimulation suffisante.', '/fr/especies/perroquet-gris-du-gabon/'),
        speciesCard('❤️', 'Ara Macao', 'Exubérant et affectueux, l\'ara macao est joueur et vocal. Nécessite beaucoup d\'espace et de socialisation.', '/fr/especies/ara-macao/'),
        speciesCard('🟢', 'Perruche Moine', 'Sociable et curieuse, la perruche moine est calme en appartement tout en restant active et joueuse.', '/fr/especies/perruche-moine/'),
        speciesCard('🔵', 'Caïque Ventre Blanc', 'Énergique et espiègle, le caïque est un clown naturel qui adore les jeux acrobatiques.', '/fr/especies/caique-ventre-blanc/'),
      ]
    ),
    cities: section(
      'Adopter dans votre région',
      'Nous livrons des perroquets bien socialisés partout en France. Contactez-nous pour un conseil personnalisé.',
      [
        cityCard('Paris', 'paris', 'Livraison à domicile en Île-de-France. Accompagnement comportemental inclus.'),
        cityCard('Lyon', 'lyon', 'Livraison à Lyon avec conseil personnalisé sur la socialisation de votre perroquet.'),
        cityCard('Bordeaux', 'bordeaux', 'Service de livraison à Bordeaux. Oiseaux élevés à la main et habitués au contact humain.'),
        cityCard('Strasbourg', 'strasbourg', 'Livraison à Strasbourg et en Alsace. Suivi post-adoption disponible par email.'),
      ]
    ),
  },

  'especes': {
    species: section(
      'Espèces populaires en France',
      'Découvrez nos fiches détaillées sur les espèces les plus adoptées par les familles françaises.',
      [
        speciesCard('🦜', 'Perroquet Gris du Gabon', 'Le plus intelligent des perroquets. Vocabulaire jusqu\'à 1 000 mots, longévité 50–80 ans.', '/fr/especies/perroquet-gris-du-gabon/'),
        speciesCard('💙', 'Ara Hyacinthe', 'Le plus grand des perroquets au monde. Bleu intense, affectueux et impressionnant.', '/fr/especies/ara-hyacinthe/'),
        speciesCard('💛', 'Ara Bleu et Jaune', 'Coloré et sociable, l\'ara bleu et jaune est l\'un des perroquets les plus appréciés en famille.', '/fr/especies/ara-bleu-et-jaune/'),
        speciesCard('🤍', 'Cacatoès à Huppe Jaune', 'Très expressif et joueur, le cacatoès à huppe jaune est un compagnon exubérant et fidèle.', '/fr/especies/cacatoes-huppe-jaune/'),
      ]
    ),
    cities: section(
      'Trouver votre oiseau en France',
      'Nous livrons toutes nos espèces dans toute la France métropolitaine avec accompagnement personnalisé.',
      [
        cityCard('Paris', 'paris', 'Livraison à Paris et Île-de-France. Toutes espèces disponibles sur commande.'),
        cityCard('Lyon', 'lyon', 'Livraison à Lyon et alentours. Demandez nos disponibilités par espèce.'),
        cityCard('Marseille', 'marseille', 'Livraison à Marseille et en PACA. Documentation CITES systématiquement fournie.'),
        cityCard('Lille', 'lille', 'Livraison à Lille et dans le Nord. Service rapide 48–72 h depuis l\'Espagne.'),
      ]
    ),
  },

  'faq': {
    species: section(
      'Espèces les plus demandées',
      'Retrouvez les fiches des perroquets sur lesquels nos clients posent le plus de questions.',
      [
        speciesCard('🦜', 'Perroquet Gris du Gabon', 'La question n° 1 : « parle-t-il vraiment ? ». Oui — jusqu\'à 1 000 mots avec une mémoire remarquable.', '/fr/especies/perroquet-gris-du-gabon/'),
        speciesCard('💛', 'Ara Bleu et Jaune', 'Très demandé pour son caractère expressif et sa grande beauté. Fiche complète : alimentation, espace, budget.', '/fr/especies/ara-bleu-et-jaune/'),
        speciesCard('🔆', 'Conure Soleil', 'Espèce idéale pour les débutants : affectueuse, joueuse et moins exigeante que les grands perroquets.', '/fr/especies/conure-soleil/'),
        speciesCard('🟢', 'Perruche Moine', 'Très populaire en appartement : calme, sociable et capable d\'apprendre quelques mots.', '/fr/especies/perruche-moine/'),
      ]
    ),
    cities: section(
      'Livraison partout en France',
      'Nos perroquets sont livrés en 48–72 heures dans toute la France métropolitaine depuis notre élevage en Espagne.',
      [
        cityCard('Paris', 'paris', 'Livraison à Paris et Île-de-France. Service rapide avec suivi en temps réel.'),
        cityCard('Marseille', 'marseille', 'Livraison à Marseille et en région PACA. Oiseaux vétérinés et documentés.'),
        cityCard('Bordeaux', 'bordeaux', 'Livraison à Bordeaux et en Gironde. Accompagnement personnalisé disponible.'),
        cityCard('Toulouse', 'toulouse', 'Livraison à Toulouse et en Haute-Garonne. Contactez-nous pour un devis gratuit.'),
      ]
    ),
  },

  'livraison': {
    species: section(
      'Espèces disponibles à la livraison',
      'Nous livrons toutes nos espèces élevées à la main en France. Consultez la fiche de chaque oiseau.',
      [
        speciesCard('🦜', 'Perroquet Gris du Gabon', 'Notre espèce phare — livré avec certificat CE, bague et garantie santé 15 jours.', '/fr/especies/perroquet-gris-du-gabon/'),
        speciesCard('💛', 'Ara Bleu et Jaune', 'Livraison adaptée aux grands perroquets dans des caisses agréées bien ventilées.', '/fr/especies/ara-bleu-et-jaune/'),
        speciesCard('🔆', 'Conure Soleil', 'Livraison rapide pour cette petite espèce sociable. Disponible régulièrement.', '/fr/especies/conure-soleil/'),
        speciesCard('🟣', 'Perroquet Pionus', 'Espèce calme et peu criarde, idéale en appartement. Fiche complète et disponibilités.', '/fr/especies/perroquet-pionus/'),
      ]
    ),
    cities: section(
      'Livraison dans votre ville',
      'Nous couvrons plus de 50 villes en France métropolitaine. Voici quelques destinations populaires.',
      [
        cityCard('Paris', 'paris', 'Livraison express à Paris et Île-de-France en 48–72 h. Suivi en temps réel.'),
        cityCard('Lyon', 'lyon', 'Livraison à Lyon en 48–72 h. Coordination vétérinaire disponible à l\'arrivée.'),
        cityCard('Marseille', 'marseille', 'Livraison à Marseille avec toute la documentation sanitaire et CITES.'),
        cityCard('Nantes', 'nantes', 'Livraison à Nantes et en Pays de la Loire. Contactez-nous pour planifier.'),
      ]
    ),
  },

  'prix': {
    species: section(
      'Prix par espèce',
      'Consultez les fiches individuelles pour connaître le prix de chaque espèce et les frais associés.',
      [
        speciesCard('🔆', 'Conure Soleil', 'L\'une des espèces les plus accessibles. Fiche complète avec fourchette de prix 2026.', '/fr/especies/conure-soleil/'),
        speciesCard('🟢', 'Perruche Moine', 'Espèce économique et sociable. Excellent rapport qualité / plaisir pour les débutants.', '/fr/especies/perruche-moine/'),
        speciesCard('🦜', 'Perroquet Gris du Gabon', 'Investissement plus élevé, mais rentabilisé sur 50 ans de compagnie exceptionnelle.', '/fr/especies/perroquet-gris-du-gabon/'),
        speciesCard('💙', 'Ara Hyacinthe', 'Le perroquet le plus cher du marché — et l\'un des plus impressionnants. Prix et raretés.', '/fr/especies/ara-hyacinthe/'),
      ]
    ),
    cities: section(
      'Trouver un perroquet près de chez vous',
      'Comparez les prix et trouvez votre perroquet idéal livré directement dans votre ville.',
      [
        cityCard('Paris', 'paris', 'Livraison à Paris et petite couronne. Prix transparents, sans frais cachés.'),
        cityCard('Nantes', 'nantes', 'Livraison à Nantes et en Loire-Atlantique. Devis personnalisé selon l\'espèce choisie.'),
        cityCard('Bordeaux', 'bordeaux', 'Livraison à Bordeaux. Frais de livraison calculés selon la taille et la distance.'),
        cityCard('Strasbourg', 'strasbourg', 'Livraison à Strasbourg et en Alsace. Contactez-nous pour un tarif précis.'),
      ]
    ),
  },

  'sante': {
    species: section(
      'Santé par espèce',
      'Chaque espèce a ses fragilités spécifiques. Consultez la fiche pour mieux prévenir les problèmes.',
      [
        speciesCard('🦜', 'Perroquet Gris du Gabon', 'Sensible aux maladies respiratoires et au PBFD. Bilans sanguins annuels recommandés.', '/fr/especies/perroquet-gris-du-gabon/'),
        speciesCard('🤍', 'Cacatoès Blanc', 'Sujet à l\'obésité et aux maladies hépatiques. Évitez les régimes trop riches en graines.', '/fr/especies/cacatoes-blanc/'),
        speciesCard('🌈', 'Loriquet Arc-en-ciel', 'Régime spécifique à base de nectar. Très sensible aux infections fongiques.', '/fr/especies/loriquet-arc-en-ciel/'),
        speciesCard('💙', 'Amazone à Front Bleu', 'Prédisposée aux infections respiratoires et aux problèmes hépatiques liés à l\'alimentation.', '/fr/especies/amazone-front-bleu/'),
      ]
    ),
    cities: section(
      'Vétérinaires NAC et éleveurs dans votre ville',
      'Nos oiseaux sont livrés avec un certificat vétérinaire. Nous vous aidons à trouver un suivi NAC local.',
      [
        cityCard('Paris', 'paris', 'Paris compte de nombreux vétérinaires NAC. Nos oiseaux arrivent vétérinés et garantis 15 jours.'),
        cityCard('Lyon', 'lyon', 'Réseau de vétérinaires NAC à Lyon. Livraison avec documents sanitaires complets.'),
        cityCard('Marseille', 'marseille', 'Livraison à Marseille. Certificat vétérinaire inclus et suivi disponible par email.'),
        cityCard('Toulouse', 'toulouse', 'Livraison à Toulouse avec garantie santé 15 jours et accompagnement post-adoption.'),
      ]
    ),
  },

};

// ─── Apply to each file ───────────────────────────────────────────────────────

const baseDir = path.join(__dirname, 'fr', 'connaissances');
let totalModified = 0;

for (const [slug, content] of Object.entries(pages)) {
  const filePath = path.join(baseDir, slug, 'index.html');
  
  if (!fs.existsSync(filePath)) {
    console.warn(`SKIP (not found): ${filePath}`);
    continue;
  }

  let html = fs.readFileSync(filePath, 'utf8');

  // Skip if already modified
  if (html.includes('rc-section')) {
    console.log(`SKIP (already done): fr/connaissances/${slug}/`);
    continue;
  }

  // Build the injection block: CSS + species section + city section
  const injection = '\n' + CSS_BLOCK + content.species + content.cities + '\n';

  // Insert before <footer>
  if (!html.includes('\n<footer>')) {
    console.warn(`WARN: no <footer> found in ${filePath} — skipping`);
    continue;
  }

  html = html.replace('\n<footer>', injection + '\n<footer>');

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`OK: fr/connaissances/${slug}/`);
  totalModified++;
}

console.log(`\nDone. Modified ${totalModified} file(s).`);
