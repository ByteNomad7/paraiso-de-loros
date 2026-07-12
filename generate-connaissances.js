#!/usr/bin/env node
/**
 * Phase 4 — French Knowledge Centre
 * Generates fr/connaissances/ hub + 9 category pages
 */
const fs = require('fs');
const path = require('path');

// ─── DATA ────────────────────────────────────────────────────────────────────

const BLOG_ARTICLES = [
  {
    slug: 'prix-perroquet-france',
    title: "Prix d'un Perroquet en France 2026",
    desc: "Combien coûte un perroquet ? Guide complet des tarifs par espèce, coûts annuels et frais CITES.",
    category: 'prix',
    readTime: '10 min',
    icon: '💰',
    species: ['ara-hyacinthe','perroquet-gris-du-gabon'],
    city: 'paris'
  },
  {
    slug: 'alimentation-perroquets',
    title: "Alimentation des Perroquets : Guide Complet",
    desc: "Fruits, légumes, graines, granulés — tout ce que votre perroquet doit manger pour vivre longtemps et en bonne santé.",
    category: 'alimentation',
    readTime: '12 min',
    icon: '🌿',
    species: ['perroquet-gris-du-gabon','amazone-front-bleu'],
    city: 'lyon'
  },
  {
    slug: 'ara-hyacinthe-guide',
    title: "Ara Hyacinthe : Tout Savoir sur le Plus Grand Perroquet",
    desc: "Origine, caractère, alimentation, prix et élevage de l'ara hyacinthe. Le guide le plus complet en français.",
    category: 'especes',
    readTime: '15 min',
    icon: '🦜',
    species: ['ara-hyacinthe','ara-bleu-et-jaune'],
    city: 'marseille'
  },
  {
    slug: 'eclectus-guide',
    title: "Perroquet Éclectus : Guide Complet de l'Espèce",
    desc: "Tout savoir sur l'éclectus : dimorphisme sexuel, alimentation spécifique, caractère et besoins particuliers.",
    category: 'especes',
    readTime: '13 min',
    icon: '🦜',
    species: ['eclectus','perroquet-du-senegal'],
    city: 'bordeaux'
  },
  {
    slug: 'perroquet-gris-du-gabon-guide',
    title: "Perroquet Gris du Gabon : Le Guide Ultime",
    desc: "Le perroquet le plus intelligent ? Découvrez tout sur le gris du Gabon : intelligence, langage, soins et élevage.",
    category: 'especes',
    readTime: '14 min',
    icon: '🦜',
    species: ['perroquet-gris-du-gabon','amazone-nuque-jaune'],
    city: 'toulouse'
  },
  {
    slug: 'guide-cites-france',
    title: "CITES en France : Documents Obligatoires pour Perroquets",
    desc: "Quelles espèces nécessitent un certificat CITES ? Comment obtenir vos documents légaux en France ? Guide officiel.",
    category: 'cites',
    readTime: '8 min',
    icon: '📋',
    species: ['ara-hyacinthe','cacatoes-huppe-jaune'],
    city: 'strasbourg'
  },
  {
    slug: 'meilleurs-perroquets-debutants',
    title: "Meilleurs Perroquets pour Débutants en 2026",
    desc: "Quel perroquet adopter en premier ? Notre classement des 10 espèces les plus adaptées aux novices.",
    category: 'comportement',
    readTime: '11 min',
    icon: '🐦',
    species: ['perroquet-du-senegal','conure-soleil'],
    city: 'nantes'
  },
  {
    slug: 'preparer-maison-perroquet',
    title: "Préparer sa Maison avant l'Arrivée du Perroquet",
    desc: "Cage, perchoirs, jouets, zones sécurisées — le guide complet pour aménager votre espace avant l'adoption.",
    category: 'comportement',
    readTime: '9 min',
    icon: '🏡',
    species: ['conure-jenday','caique'],
    city: 'nice'
  },
  {
    slug: 'choisir-eleveur-serieux',
    title: "Comment Choisir un Éleveur Sérieux de Perroquets",
    desc: "Les 10 critères pour identifier un éleveur fiable en France. Évitez les arnaques et adoptez en toute sécurité.",
    category: 'adoption',
    readTime: '7 min',
    icon: '✅',
    species: ['ara-macao','cacatoes-rosalbin'],
    city: 'perpignan'
  },
  {
    slug: 'combien-vit-perroquet',
    title: "Combien de Temps Vit un Perroquet ? (Par Espèce)",
    desc: "Espérance de vie par espèce, facteurs qui influencent la longévité et comment maximiser les années de votre oiseau.",
    category: 'sante',
    readTime: '10 min',
    icon: '❤️',
    species: ['ara-bleu-et-jaune','amazone-front-bleu'],
    city: 'grenoble'
  },
  {
    slug: 'quel-perroquet-choisir',
    title: "Quel Perroquet Choisir ? Le Guide Décisif 2026",
    desc: "Test par espèce selon vos critères : taille du logement, budget, temps disponible, niveau d'expérience.",
    category: 'adoption',
    readTime: '12 min',
    icon: '🤔',
    species: ['perroquet-pionus','loriquet-arc-en-ciel'],
    city: 'lille'
  }
];

const SPECIES_PAGES = [
  { slug: 'perroquet-gris-du-gabon', name: 'Perroquet Gris du Gabon', icon: '🐦' },
  { slug: 'ara-hyacinthe', name: 'Ara Hyacinthe', icon: '💙' },
  { slug: 'ara-bleu-et-jaune', name: 'Ara Bleu et Jaune', icon: '💛' },
  { slug: 'ara-macao', name: 'Ara Macao', icon: '❤️' },
  { slug: 'ara-chloroptere', name: 'Ara Chloroptère', icon: '💚' },
  { slug: 'cacatoes-huppe-jaune', name: 'Cacatoès à Huppe Jaune', icon: '🤍' },
  { slug: 'cacatoes-rosalbin', name: 'Cacatoès Rosalbin', icon: '🌸' },
  { slug: 'amazone-front-bleu', name: 'Amazone à Front Bleu', icon: '💚' },
  { slug: 'amazone-nuque-jaune', name: 'Amazone à Nuque Jaune', icon: '💚' },
  { slug: 'eclectus', name: 'Perroquet Éclectus', icon: '🟢' },
  { slug: 'conure-soleil', name: 'Conure Soleil', icon: '☀️' },
  { slug: 'conure-jenday', name: 'Conure Jenday', icon: '🧡' },
  { slug: 'caique', name: 'Caïque à Tête Noire', icon: '🌈' },
  { slug: 'caique-ventre-blanc', name: 'Caïque à Ventre Blanc', icon: '⚪' },
  { slug: 'perroquet-pionus', name: 'Perroquet Pionus', icon: '💜' },
  { slug: 'perroquet-du-senegal', name: 'Perroquet du Sénégal', icon: '🍊' },
  { slug: 'perruche-alexandre', name: 'Perruche Alexandre', icon: '💚' },
  { slug: 'loriquet-arc-en-ciel', name: 'Loriquet Arc-en-Ciel', icon: '🌈' },
  { slug: 'perruche-royale', name: 'Perruche Royale', icon: '👑' },
  { slug: 'grand-alexandre', name: 'Grand Alexandre', icon: '💚' }
];

const CITIES_SAMPLE = [
  { slug: 'paris', name: 'Paris' },
  { slug: 'marseille', name: 'Marseille' },
  { slug: 'lyon', name: 'Lyon' },
  { slug: 'toulouse', name: 'Toulouse' },
  { slug: 'nice', name: 'Nice' },
  { slug: 'bordeaux', name: 'Bordeaux' },
  { slug: 'nantes', name: 'Nantes' },
  { slug: 'strasbourg', name: 'Strasbourg' },
  { slug: 'montpellier', name: 'Montpellier' },
  { slug: 'lille', name: 'Lille' },
  { slug: 'grenoble', name: 'Grenoble' },
  { slug: 'perpignan', name: 'Perpignan' }
];

const CATEGORIES = [
  {
    slug: 'especes',
    name: 'Fiches Espèces',
    icon: '🦜',
    color: '#1F3D2B',
    desc: 'Guides complets sur chaque espèce : caractère, alimentation, prix, espérance de vie.',
    articles: BLOG_ARTICLES.filter(a => a.category === 'especes'),
    articleCount: 3 + 20, // blog + species pages
    seoTitle: 'Fiches Espèces de Perroquets | Centre de Connaissances | Paraíso de Aves',
    seoDesc: 'Guides complets sur 20 espèces de perroquets exotiques : caractère, alimentation, besoins, prix et élevage. La référence en français.',
    intro: `Découvrez nos fiches espèces détaillées sur 20 espèces de perroquets exotiques disponibles en France. Chaque fiche couvre l'origine géographique, le caractère, les besoins alimentaires, l'espérance de vie, le niveau de difficulté et les spécificités de l'élevage. Que vous envisagiez d'adopter un ara géant ou une petite conure, nos guides vous aident à faire le choix le plus adapté à votre mode de vie.`,
    faq: [
      { q: "Quel perroquet vit le plus longtemps ?", a: "L'ara hyacinthe et le perroquet gris du Gabon peuvent vivre 50 à 80 ans. Les aras en général ont une longévité de 30 à 60 ans selon l'espèce et les soins reçus." },
      { q: "Quelle espèce est la plus intelligente ?", a: "Le perroquet gris du Gabon est reconnu comme l'espèce la plus intelligente : il peut développer un vocabulaire de 300 à 1 000 mots et comprend des concepts abstraits. Les aras et les cacatoès sont également très doués." },
      { q: "Quelle espèce est recommandée pour un appartement ?", a: "La conure soleil, le perroquet du Sénégal, le caïque ou la perruche alexandre sont d'excellents choix pour un appartement, à condition de leur consacrer du temps quotidiennement." },
      { q: "Est-ce que tous les perroquets parlent ?", a: "Non. Les espèces les plus douées pour le langage sont le gris du Gabon, l'amazone et l'ara. Les caïques et loris parlent peu. La capacité langagière dépend aussi de l'éducation reçue." }
    ]
  },
  {
    slug: 'prix',
    name: 'Prix & Tarifs',
    icon: '💰',
    color: '#D4A94F',
    desc: 'Tarifs actualisés par espèce, coûts d\'entretien annuels et frais cachés à connaître.',
    articles: BLOG_ARTICLES.filter(a => a.category === 'prix'),
    articleCount: 1,
    seoTitle: 'Prix des Perroquets en France 2026 | Guide Complet des Tarifs',
    seoDesc: 'Combien coûte un perroquet en France en 2026 ? Prix par espèce, coûts annuels d\'entretien, frais CITES. Guide transparent et à jour.',
    intro: `Le prix d'un perroquet exotique en France varie de quelques centaines d'euros pour une conure à plusieurs milliers pour un ara hyacinthe. Mais le prix d'achat n'est que la partie visible de l'iceberg : vétérinaire, alimentation, cage, jouets, certificats CITES et frais de livraison s'accumulent vite. Notre guide prix vous donne une vision complète et réaliste du budget à prévoir avant d'adopter.`,
    faq: [
      { q: "Quel est le perroquet le plus cher en France ?", a: "L'ara hyacinthe est l'espèce la plus onéreuse, avec des prix allant de 8 000 à 15 000 € pour un oiseau élevé à la main avec ses documents CITES. L'ara macao et l'ara chloroptère suivent entre 4 000 et 8 000 €." },
      { q: "Y a-t-il des frais cachés lors de l'achat d'un perroquet ?", a: "Oui : certificats CITES (50–200 €), cage adaptée (200–1 500 €), premier bilan vétérinaire (80–150 €), alimentation annuelle (500–1 200 €) et assurance santé animale (150–400 €/an). Prévoyez 1 500 à 3 000 € de budget initial en plus du prix d'achat." },
      { q: "Pourquoi les perroquets élevés à la main sont-ils plus chers ?", a: "L'élevage manuel (hand-feeding) demande des semaines de soins individuels intensifs, avec des repas toutes les 3–4 heures pour les oisillons. Ces oiseaux sont plus dociles, socialisés et adaptés à la vie familiale, ce qui justifie le surcoût." },
      { q: "Le prix inclut-il les documents CITES ?", a: "Chez Paraíso de Aves, oui : toutes nos espèces CITES sont livrées avec leurs documents légaux complets, bague d'élevage et certificat vétérinaire. Exigez toujours ces documents auprès de tout vendeur." }
    ]
  },
  {
    slug: 'alimentation',
    name: 'Alimentation',
    icon: '🌿',
    color: '#2B7A45',
    desc: 'Régimes alimentaires par espèce, aliments interdits et plans nutritionnels.',
    articles: BLOG_ARTICLES.filter(a => a.category === 'alimentation'),
    articleCount: 1,
    seoTitle: 'Alimentation des Perroquets | Guide Nutritionnel Complet | Paraíso de Aves',
    seoDesc: "Que mangent les perroquets exotiques ? Fruits, légumes, graines, granulés : guide nutritionnel complet par espèce avec aliments interdits.",
    intro: `Une alimentation équilibrée est le premier pilier de la santé de votre perroquet. Contrairement aux idées reçues, une alimentation à base de graines uniquement est insuffisante et peut conduire à des carences graves. Nos guides nutritionnels détaillent les régimes alimentaires recommandés par espèce, les aliments interdits (avocat, chocolat, oignon, alcool…) et les compléments indispensables selon l'âge et l'état de santé de votre oiseau.`,
    faq: [
      { q: "Peut-on nourrir un perroquet uniquement avec des graines ?", a: "Non. Un régime uniquement à base de graines entraîne des carences en vitamines A, D et en calcium, pouvant provoquer des problèmes hépatiques, osseux et immunitaires. Les graines ne doivent représenter que 20–30 % de la ration, complétées par des granulés, fruits et légumes frais." },
      { q: "Quels aliments sont dangereux pour les perroquets ?", a: "Aliments strictement interdits : avocat (mortel), chocolat, alcool, oignon, ail, rhubarbe, graines de pomme/pêche/cerise (noyaux), sel en excès, café et thé. Ces aliments peuvent être toxiques voire fatals." },
      { q: "Quelle quantité de fruits donner par jour ?", a: "Les fruits ne doivent pas dépasser 15–20 % de la ration journalière en raison de leur teneur en sucre. Privilégiez les baies, la papaye, la mangue, la grenade et les agrumes. Évitez l'avocat." },
      { q: "Les granulés sont-ils vraiment nécessaires ?", a: "Oui, les granulés de qualité (Zupreem, Harrison's, Roudybush) sont formulés pour couvrir tous les besoins nutritionnels. Ils doivent constituer 50–60 % de la ration et peuvent remplacer partiellement les graines." }
    ]
  },
  {
    slug: 'sante',
    name: 'Santé & Longévité',
    icon: '❤️',
    color: '#C0392B',
    desc: 'Vétérinaires spécialisés, maladies courantes, espérance de vie et bilans de santé.',
    articles: BLOG_ARTICLES.filter(a => a.category === 'sante'),
    articleCount: 1,
    seoTitle: 'Santé des Perroquets | Maladies, Longévité et Soins | Paraíso de Aves',
    seoDesc: "Tout sur la santé de votre perroquet : espérance de vie, maladies courantes, signes d'alerte, vétérinaires NAC et soins préventifs.",
    intro: `La santé d'un perroquet exotique dépend de son alimentation, de son environnement, de la stimulation mentale qu'il reçoit et de la qualité des soins vétérinaires. Les perroquets dissimulent instinctivement leurs signes de faiblesse (comportement hérité de leur vie sauvage), ce qui rend les bilans réguliers indispensables. Nos guides santé vous apprendront à détecter les signaux d'alerte, à choisir un vétérinaire NAC qualifié et à maintenir votre oiseau en pleine forme sur le long terme.`,
    faq: [
      { q: "À quelle fréquence consulter un vétérinaire NAC ?", a: "Un bilan annuel est recommandé pour tout perroquet en bonne santé. Pour les jeunes oiseaux nouvellement adoptés, une visite dans les 48–72 heures suivant l'arrivée est conseillée. Les espèces à longue vie (ara, gris du Gabon) peuvent nécessiter des bilans sanguins tous les 2–3 ans dès l'âge de 5 ans." },
      { q: "Quels sont les signes d'un perroquet malade ?", a: "Signes d'alerte : plumes ébouriffées en continu, perte d'appétit, selles anormales (couleur ou consistance), yeux larmoyants, écoulement nasal, léthargie, perte de poids visible, ou comportement inhabituellement agressif. Consultez rapidement un vétérinaire NAC." },
      { q: "Doit-on vacciner un perroquet ?", a: "Il n'existe pas de vaccin homologué pour les perroquets en France. La prévention passe par une quarantaine de 30 jours pour tout nouvel oiseau, des bilans réguliers, une alimentation équilibrée et un environnement propre et sans courants d'air." },
      { q: "Comment prolonger la vie de mon perroquet ?", a: "Alimentation équilibrée (granulés + fruits/légumes frais), stimulation mentale quotidienne, interaction sociale, absence de tabac et de produits chimiques ménagers, bilans vétérinaires réguliers et cage adaptée à la taille de l'oiseau sont les facteurs clés de la longévité." }
    ]
  },
  {
    slug: 'comportement',
    name: 'Comportement & Éducation',
    icon: '🧠',
    color: '#6C3483',
    desc: 'Sociabilisation, éducation positive, gestion des comportements difficiles.',
    articles: BLOG_ARTICLES.filter(a => a.category === 'comportement'),
    articleCount: 2,
    seoTitle: 'Comportement des Perroquets | Éducation et Sociabilisation | Paraíso de Aves',
    seoDesc: "Comprendre et éduquer votre perroquet : sociabilisation, renforcement positif, gestion des morsures et enrichissement mental.",
    intro: `Comprendre le comportement de votre perroquet est la clé d'une cohabitation harmonieuse. Ces oiseaux hautement intelligents ont besoin d'une stimulation mentale quotidienne, d'une socialisation précoce et d'une éducation basée sur le renforcement positif. Nos guides comportementaux vous aident à décoder les signaux corporels de votre oiseau, à gérer les comportements problématiques (morsures, cris excessifs, arrachage de plumes) et à établir un lien de confiance durable.`,
    faq: [
      { q: "Mon perroquet mord souvent, que faire ?", a: "La morsure est un mode de communication : l'oiseau exprime de la peur, de la douleur, de la surexcitation ou veut mettre fin à une interaction. Ne punissez jamais. Identifiez le déclencheur, respectez les signaux d'alerte (iris contracté, plumes hérissées, queue qui vibre) et travaillez avec le renforcement positif." },
      { q: "Combien d'heures par jour doit-on consacrer à son perroquet ?", a: "Un minimum de 2 à 4 heures d'interaction directe quotidienne est nécessaire pour les espèces sociales (ara, gris, amazone). Les conures et caïques peuvent accepter 1–2 heures si leur cage est bien enrichie. Un perroquet isolé développe des troubles comportementaux graves." },
      { q: "Comment enseigner des mots à un perroquet ?", a: "Répétez les mots dans leur contexte naturel (dire 'bonjour' en arrivant, 'graines' en remplissant la gamelle). Récompensez chaque vocalisation intentionnelle. La répétition quotidienne et la cohérence sont plus efficaces que les sessions d'entraînement intensives." },
      { q: "Mon perroquet arrache ses plumes, c'est grave ?", a: "L'arrachage de plumes (plumage compulsif) est un signal sérieux indiquant une détresse psychologique ou médicale. Consultez un vétérinaire NAC en priorité pour éliminer une cause médicale, puis un comportementaliste animalier si la cause est comportementale." }
    ]
  },
  {
    slug: 'cites',
    name: 'CITES & Légalité',
    icon: '📋',
    color: '#17607F',
    desc: 'Documents obligatoires, espèces protégées et cadre légal pour l\'achat en France.',
    articles: BLOG_ARTICLES.filter(a => a.category === 'cites'),
    articleCount: 1,
    seoTitle: 'CITES Perroquets France | Documents Légaux et Espèces Protégées | Paraíso de Aves',
    seoDesc: "Guide complet sur la législation CITES en France : quelles espèces sont protégées, documents obligatoires, comment acheter légalement un perroquet exotique.",
    intro: `La Convention CITES (Convention sur le commerce international des espèces de faune et de flore sauvages menacées d'extinction) réglemente le commerce de nombreuses espèces de perroquets. En France, détenir certaines espèces sans les documents appropriés est un délit passible de lourdes amendes. Notre guide légal vous explique quelles espèces sont concernées, quels documents vous devez exiger du vendeur, et comment vérifier la légalité d'un achat.`,
    faq: [
      { q: "Toutes les espèces de perroquets nécessitent-elles un certificat CITES ?", a: "Non. Seules les espèces classées en Annexe I (commercialement protégées) ou Annexe II (surveillance requise) de la CITES nécessitent des documents spécifiques. Les aras, cacatoès et perroquets gris du Gabon sont en Annexe I ou II. Les perruches ondulées et inséparables sont généralement exemptées." },
      { q: "Quels documents dois-je exiger lors d'un achat ?", a: "Pour une espèce CITES Annexe I : certificat CE (Certificat de la CE délivré par la DREAL), bague individuelle ou micropuce, et certificat vétérinaire. Pour une espèce Annexe II née en captivité : attestation de naissance en captivité et bague. Exigez systématiquement la facture avec les références légales." },
      { q: "Un vendeur peut-il refuser de me donner les documents CITES ?", a: "Non. Tout vendeur professionnel est légalement tenu de remettre les documents CITES au moment de la vente. Si un vendeur refuse ou retarde la remise des documents, c'est un signal d'alerte majeur — l'animal pourrait être issu de capture illégale." },
      { q: "Puis-je voyager en Europe avec mon perroquet ?", a: "Oui, au sein de l'UE, avec les documents CITES correspondants et un passeport vétérinaire européen. Pour les voyages hors UE, un permis d'exportation CITES est nécessaire. Renseignez-vous auprès de la DREAL de votre région au moins 2 mois avant le départ." }
    ]
  },
  {
    slug: 'adoption',
    name: 'Guide d\'Adoption',
    icon: '🏠',
    color: '#E67E22',
    desc: 'Choisir son espèce, trouver un éleveur fiable et préparer l\'arrivée.',
    articles: BLOG_ARTICLES.filter(a => a.category === 'adoption'),
    articleCount: 2,
    seoTitle: "Guide d'Adoption Perroquet France | Trouver un Éleveur Fiable | Paraíso de Aves",
    seoDesc: "Comment adopter un perroquet exotique en France ? Choisir son espèce, identifier un éleveur sérieux, documents à exiger. Guide complet 2026.",
    intro: `Adopter un perroquet est un engagement sur 20, 40 ou même 80 ans. Ce n'est pas une décision à prendre à la légère. Nos guides d'adoption vous accompagnent à chaque étape : choisir l'espèce adaptée à votre style de vie, identifier les éleveurs sérieux, poser les bonnes questions, vérifier les documents légaux et préparer l'arrivée de votre oiseau. Chez Paraíso de Aves, nous vous guidons tout au long du processus d'adoption depuis notre élevage en Espagne jusqu'à la livraison en France.`,
    faq: [
      { q: "Quelle est la différence entre un oiseau élevé à la main et un oiseau parent-élevé ?", a: "Un oiseau élevé à la main (hand-fed) a été nourri manuellement dès l'oisillonnage, ce qui le rend naturellement confiant avec les humains. Un oiseau parent-élevé a été élevé par ses parents et peut être plus sauvage, nécessitant une socialisation plus longue. Pour un premier perroquet, l'élevage manuel est fortement recommandé." },
      { q: "À quel âge adopter un perroquet ?", a: "L'âge idéal d'adoption varie selon l'espèce : 3–4 mois pour les conures et caïques, 4–6 mois pour les amazones et pionniers, 6–8 mois pour les aras et cacatoès, 12–18 mois pour les gris du Gabon. L'oiseau doit être pleinement sevré et autonome alimentairement." },
      { q: "Peut-on adopter un perroquet adulte ?", a: "Oui, c'est tout à fait possible. Un adulte bien socialisé peut créer des liens forts avec sa nouvelle famille. La transition demande plus de patience et une approche douce, mais de nombreux propriétaires préfèrent adopter des adultes dont le caractère est déjà connu." },
      { q: "Paraíso de Aves livre-t-il en France ?", a: "Oui. Nous livrons dans toute la France métropolitaine en 48–72 heures depuis notre élevage en Espagne. La livraison est effectuée dans des conditions optimales de confort et de sécurité, avec tous les documents légaux. Contactez-nous pour un devis personnalisé." }
    ]
  },
  {
    slug: 'livraison',
    name: 'Livraison en France',
    icon: '🚚',
    color: '#27AE60',
    desc: 'Comment nous livrons vos perroquets partout en France en toute sécurité.',
    articles: [],
    articleCount: 0,
    seoTitle: 'Livraison de Perroquets en France | Service Sécurisé | Paraíso de Aves',
    seoDesc: "Comment fonctionne notre livraison de perroquets en France ? Délais, conditions, sécurité et documents inclus. Livraison dans toute la France métropolitaine.",
    intro: `Paraíso de Aves livre des perroquets exotiques dans toute la France métropolitaine depuis notre élevage de Llíria, en Espagne. Notre service de livraison est conçu pour le bien-être maximal de l'oiseau : transport en caisse homologuée, température contrôlée, durée limitée à 8 heures maximum et présence d'eau et de nourriture. Chaque livraison est accompagnée de tous les documents légaux (CITES, vétérinaire, facture) et d'un suivi complet jusqu'à votre domicile.`,
    faq: [
      { q: "Comment se déroule la livraison d'un perroquet depuis l'Espagne ?", a: "Nous utilisons un transporteur spécialisé en animaux vivants, avec véhicule climatisé et habitacle séparé. L'oiseau voyage dans une caisse IATA homologuée, avec perchoir, eau et nourriture. La durée de transport est limitée à 8 heures. Vous recevez un suivi en temps réel et une notification d'arrivée." },
      { q: "Quels documents accompagnent la livraison ?", a: "Chaque livraison inclut : certificat CITES (si applicable), certificat vétérinaire de bonne santé, bague d'identification individuelle, facture officielle, carnet d'alimentation et conseils d'accueil personnalisés." },
      { q: "Livrez-vous dans toute la France ?", a: "Oui, nous livrons dans toute la France métropolitaine : Paris, Lyon, Marseille, Toulouse, Bordeaux, Nantes, Strasbourg et toutes les villes. Les DOM-TOM font l'objet d'une procédure spéciale avec transport aérien — contactez-nous pour en discuter." },
      { q: "Que faire si le perroquet semble stressé à l'arrivée ?", a: "Un léger stress de transport est normal. Placez l'oiseau dans sa cage dans une pièce calme, couvrez partiellement la cage d'un tissu léger et laissez-le se reposer 24–48 heures avant de chercher le contact. Proposez eau fraîche et ses aliments préférés. Appelez-nous si vous observez des signes inquiétants." }
    ]
  },
  {
    slug: 'faq',
    name: 'FAQ Générale',
    icon: '❓',
    color: '#8E44AD',
    desc: 'Toutes les réponses aux questions les plus fréquentes sur les perroquets et l\'adoption.',
    articles: [],
    articleCount: 0,
    seoTitle: 'FAQ Perroquets Exotiques | Toutes les Réponses | Paraíso de Aves France',
    seoDesc: "Réponses aux 50+ questions les plus fréquentes sur les perroquets exotiques en France : prix, légalité, alimentation, adoption, livraison et santé.",
    intro: `Vous avez des questions sur les perroquets exotiques ? Vous êtes au bon endroit. Cette FAQ rassemble plus de 30 réponses aux questions les plus fréquentes de nos futurs adoptants français : prix, légalité, documents, alimentation, comportement, livraison et suivi post-adoption. Si vous ne trouvez pas votre réponse ici, notre équipe est disponible par email à paraisodeloros@gmail.com.`,
    faq: [
      { q: "Paraíso de Aves est-il un élevage sérieux ?", a: "Oui. Paraíso de Aves est un élevage enregistré en Espagne, spécialisé dans les perroquets exotiques élevés à la main depuis plus de 15 ans. Tous nos oiseaux sont bagués, documentés CITES et accompagnés d'un certificat vétérinaire. Nous avons livré plus de 300 oiseaux en France." },
      { q: "Comment contacter Paraíso de Aves ?", a: "Par email à paraisodeloros@gmail.com — c'est notre canal principal. Nous répondons dans les 24–48 heures ouvrées. Nous ne communiquons pas de prix par téléphone public pour éviter les arnaques." },
      { q: "Proposez-vous une garantie santé ?", a: "Oui. Nous offrons une garantie santé de 15 jours sur tous nos oiseaux. Si un problème de santé lié à notre élevage est diagnostiqué par un vétérinaire NAC dans ce délai, nous prenons en charge le traitement ou procédons à un remplacement." },
      { q: "Peut-on visiter votre élevage en Espagne ?", a: "Les visites sont possibles sur rendez-vous uniquement, pour des raisons de biosécurité et de bien-être animal. Contactez-nous par email pour planifier une visite." },
      { q: "Quelle est la différence entre perroquets-a-vendre et especes sur votre site ?", a: "Les pages /fr/perroquets-a-vendre-[ville]/ concernent l'achat et la livraison dans votre région. Les pages /fr/especies/ sont des guides éducatifs détaillés sur chaque espèce. Les deux se complètent : commencez par la fiche espèce, puis consultez la page de votre ville." },
      { q: "Puis-je adopter si je suis locataire ?", a: "Oui, à condition que votre bail ne l'interdise pas explicitement et que vos voisins ne soient pas affectés par les vocalisations. Nous recommandons de vérifier votre contrat de bail et, si nécessaire, d'opter pour des espèces moins bruyantes (pionus, perroquet du Sénégal)." },
      { q: "Y a-t-il un suivi après adoption ?", a: "Oui. Nous restons disponibles par email après l'adoption pour répondre à vos questions sur l'alimentation, le comportement et la santé de votre oiseau. Nous avons aussi une communauté d'adoptants sur les réseaux sociaux." },
      { q: "Proposez-vous des oiseaux en stock permanent ?", a: "Notre élevage produit des portées selon les saisons. Contactez-nous pour connaître les disponibilités actuelles et, si l'espèce souhaitée n'est pas disponible, nous vous plaçons sur liste d'attente avec notification dès disponibilité." }
    ]
  }
];

// ─── SHARED HTML COMPONENTS ──────────────────────────────────────────────────

function head(title, desc, canonical, extra = '') {
  return `<!DOCTYPE html>
<html lang="fr-FR" dir="ltr">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-4007YHH4H9"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-4007YHH4H9');</script>
  <title>${title}</title>
  <meta name="description" content="${desc}"/>
  <meta name="robots" content="index, follow"/>
  <link rel="canonical" href="${canonical}"/>
  <link rel="alternate" hreflang="fr-FR" href="${canonical}"/>
  <link rel="alternate" hreflang="es-ES" href="https://www.paraisodeaves.com/"/>
  <link rel="alternate" hreflang="x-default" href="https://www.paraisodeaves.com/"/>
  <meta property="og:type" content="website"/>
  <meta property="og:locale" content="fr_FR"/>
  <meta property="og:title" content="${title}"/>
  <meta property="og:description" content="${desc}"/>
  <meta property="og:url" content="${canonical}"/>
  <meta property="og:image" content="https://www.paraisodeaves.com/images/loro-gris-02.webp"/>
  <meta property="og:site_name" content="Paraíso de Aves"/>
  <meta name="twitter:card" content="summary_large_image"/>
  <link rel="icon" href="/favicon.ico"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
  ${extra}`;
}

function commonStyles() {
  return `<style>
:root{--primary:#1F3D2B;--secondary:#2B533C;--gold:#D4A94F;--gold-light:#E0B75F;--bg:#F8F5F0;--text:#1A1A1A;--muted:#5C5C5C;--border:#E7E0D2;--white:#fff;--radius:12px;--shadow:0 4px 24px rgba(0,0,0,.10);}
*{margin:0;padding:0;box-sizing:border-box;}html{scroll-behavior:smooth;}
body{font-family:'Open Sans',sans-serif;background:var(--bg);color:var(--text);line-height:1.75;font-size:16px;}
h1,h2,h3,h4,h5{font-family:'Poppins',sans-serif;font-weight:700;line-height:1.25;}
a{color:var(--primary);text-decoration:none;}a:hover{color:var(--gold);}
img{max-width:100%;height:auto;display:block;}
.topbar{background:var(--primary);position:sticky;top:0;z-index:1000;padding:0 5%;}
.topbar-inner{display:flex;align-items:center;justify-content:space-between;height:60px;max-width:1200px;margin:0 auto;}
.logo{color:var(--white);font-family:'Poppins',sans-serif;font-weight:700;font-size:1.1rem;display:flex;align-items:center;gap:8px;}
.logo span{font-size:1.5rem;}
nav a{color:rgba(255,255,255,.85);margin-left:18px;font-size:.88rem;font-weight:500;transition:color .2s;}
nav a:hover,nav a.active{color:var(--gold);}
.lang-switch{display:flex;align-items:center;gap:5px;margin-left:18px;}
.lang-switch a{font-size:.78rem;font-weight:600;color:rgba(255,255,255,.6);padding:3px 6px;border-radius:4px;transition:all .2s;}
.lang-switch a.active{color:var(--gold);background:rgba(212,169,79,.15);}
.lang-switch span{color:rgba(255,255,255,.3);font-size:.7rem;}
.breadcrumb-bar{background:linear-gradient(to right,var(--primary),var(--secondary));padding:10px 5%;border-bottom:1px solid rgba(255,255,255,.08);}
.breadcrumb-bar .inner{max-width:1200px;margin:0 auto;font-size:.82rem;color:rgba(255,255,255,.65);}
.breadcrumb-bar .inner a{color:rgba(255,255,255,.75);}
.breadcrumb-bar .inner a:hover{color:var(--gold);}
.breadcrumb-bar .inner span{margin:0 6px;opacity:.5;}
.hero{background:linear-gradient(135deg,var(--primary) 0%,var(--secondary) 60%,#1a4d35 100%);padding:80px 5% 64px;text-align:center;color:var(--white);position:relative;overflow:hidden;}
.hero::before{content:'';position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;}
.hero .badge{display:inline-block;background:rgba(212,169,79,.18);border:1px solid rgba(212,169,79,.5);color:var(--gold);padding:6px 22px;border-radius:30px;font-size:.8rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:20px;position:relative;}
.hero h1{font-size:clamp(2rem,5vw,3.2rem);margin-bottom:16px;color:var(--white);position:relative;}
.hero h1 em{color:var(--gold);font-style:normal;}
.hero .subtitle{font-size:1.1rem;color:rgba(255,255,255,.88);max-width:680px;margin:0 auto 32px;position:relative;}
.trust-pills{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;position:relative;}
.trust-pills span{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);color:var(--white);padding:7px 18px;border-radius:20px;font-size:.83rem;font-weight:600;}
.container{max-width:1200px;margin:0 auto;padding:0 5%;}
.section{padding:64px 5%;}
.section-alt{background:var(--white);}
.section-title{text-align:center;margin-bottom:48px;}
.section-title .label{display:inline-block;background:rgba(212,169,79,.12);color:var(--gold);border:1px solid rgba(212,169,79,.3);padding:5px 18px;border-radius:20px;font-size:.78rem;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:12px;}
.section-title h2{font-size:clamp(1.7rem,4vw,2.4rem);color:var(--primary);margin-bottom:10px;}
.section-title p{font-size:1rem;color:var(--muted);max-width:560px;margin:0 auto;}
.cat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;}
.cat-card{background:var(--white);border:1px solid var(--border);border-radius:var(--radius);padding:28px;transition:all .25s;position:relative;overflow:hidden;cursor:pointer;}
.cat-card::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,var(--primary),var(--gold));}
.cat-card:hover{box-shadow:var(--shadow);transform:translateY(-3px);}
.cat-card .icon{font-size:2.5rem;margin-bottom:14px;}
.cat-card h3{font-size:1.15rem;color:var(--primary);margin-bottom:8px;}
.cat-card p{font-size:.9rem;color:var(--muted);margin-bottom:16px;line-height:1.6;}
.cat-card .count{font-size:.78rem;font-weight:700;color:var(--gold);background:rgba(212,169,79,.1);padding:3px 10px;border-radius:10px;}
.cat-card .arrow{position:absolute;right:20px;top:50%;transform:translateY(-50%);font-size:1.3rem;color:var(--border);transition:all .25s;}
.cat-card:hover .arrow{color:var(--gold);transform:translateY(-50%) translateX(4px);}
.article-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px;}
.article-card{background:var(--white);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;transition:all .25s;}
.article-card:hover{box-shadow:var(--shadow);transform:translateY(-2px);}
.article-card .card-body{padding:22px;}
.article-card .tag{display:inline-block;background:rgba(31,61,43,.08);color:var(--primary);padding:3px 10px;border-radius:8px;font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px;}
.article-card h3{font-size:1rem;color:var(--primary);margin-bottom:8px;line-height:1.4;}
.article-card p{font-size:.88rem;color:var(--muted);margin-bottom:14px;line-height:1.6;}
.article-card .meta{display:flex;align-items:center;justify-content:space-between;}
.article-card .read-time{font-size:.78rem;color:var(--muted);}
.article-card .read-link{font-size:.82rem;font-weight:700;color:var(--primary);}
.article-card .read-link:hover{color:var(--gold);}
.species-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:14px;}
.species-chip{background:var(--white);border:1px solid var(--border);border-radius:10px;padding:16px 12px;text-align:center;transition:all .2s;}
.species-chip:hover{border-color:var(--gold);box-shadow:0 2px 12px rgba(212,169,79,.15);}
.species-chip .emoji{font-size:1.8rem;margin-bottom:6px;}
.species-chip span{font-size:.8rem;color:var(--primary);font-family:'Poppins',sans-serif;font-weight:600;display:block;line-height:1.3;}
.stats-bar{background:var(--primary);padding:48px 5%;}
.stats-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:32px;text-align:center;}
.stat-item .num{font-family:'Poppins',sans-serif;font-size:2.4rem;font-weight:800;color:var(--gold);}
.stat-item .lbl{font-size:.85rem;color:rgba(255,255,255,.75);margin-top:4px;}
.cta-block{background:linear-gradient(135deg,var(--primary),var(--secondary));border-radius:var(--radius);padding:48px 40px;text-align:center;color:var(--white);}
.cta-block h2{font-size:1.8rem;margin-bottom:12px;color:var(--white);}
.cta-block p{color:rgba(255,255,255,.85);margin-bottom:28px;font-size:1rem;}
.btn-primary{display:inline-block;background:var(--gold);color:var(--primary);padding:14px 36px;border-radius:30px;font-family:'Poppins',sans-serif;font-weight:700;font-size:1rem;transition:all .2s;}
.btn-primary:hover{background:var(--gold-light);color:var(--primary);transform:translateY(-2px);box-shadow:0 6px 20px rgba(212,169,79,.4);}
.btn-outline{display:inline-block;border:2px solid rgba(255,255,255,.5);color:var(--white);padding:13px 32px;border-radius:30px;font-family:'Poppins',sans-serif;font-weight:600;font-size:.95rem;margin-left:12px;transition:all .2s;}
.btn-outline:hover{border-color:var(--white);color:var(--white);background:rgba(255,255,255,.1);}
.faq-list{max-width:800px;margin:0 auto;}
.faq-item{border:1px solid var(--border);border-radius:10px;margin-bottom:12px;overflow:hidden;}
.faq-q{background:var(--white);padding:18px 20px;font-family:'Poppins',sans-serif;font-weight:600;font-size:.97rem;color:var(--primary);cursor:pointer;display:flex;justify-content:space-between;align-items:center;}
.faq-q::after{content:'▾';color:var(--gold);transition:transform .3s;}
.faq-item.open .faq-q::after{transform:rotate(180deg);}
.faq-a{background:var(--bg);padding:0 20px;max-height:0;overflow:hidden;transition:max-height .35s ease,padding .35s ease;font-size:.93rem;color:#2a2a2a;}
.faq-item.open .faq-a{max-height:300px;padding:16px 20px;}
.search-box{background:rgba(255,255,255,.12);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.25);border-radius:40px;padding:14px 24px;display:flex;align-items:center;gap:12px;max-width:520px;margin:32px auto 0;position:relative;}
.search-box input{background:none;border:none;outline:none;color:var(--white);font-size:1rem;flex:1;font-family:'Open Sans',sans-serif;}
.search-box input::placeholder{color:rgba(255,255,255,.55);}
.search-box button{background:var(--gold);border:none;border-radius:30px;padding:8px 20px;color:var(--primary);font-weight:700;cursor:pointer;font-family:'Poppins',sans-serif;font-size:.88rem;}
#search-results{display:none;background:var(--white);border-radius:12px;max-width:600px;margin:16px auto 0;padding:16px;text-align:left;box-shadow:0 8px 32px rgba(0,0,0,.15);}
#search-results .sr-item{padding:10px 12px;border-bottom:1px solid var(--border);display:block;color:var(--primary);font-size:.9rem;}
#search-results .sr-item:last-child{border-bottom:none;}
#search-results .sr-item:hover{background:rgba(212,169,79,.07);}
#search-results .sr-item strong{display:block;margin-bottom:2px;}
#search-results .sr-empty{color:var(--muted);font-size:.9rem;text-align:center;padding:12px;}
.breadcrumb-inline{background:rgba(212,169,79,.07);border-left:3px solid var(--gold);padding:10px 16px;border-radius:0 8px 8px 0;margin-bottom:28px;font-size:.85rem;}
.breadcrumb-inline a{color:var(--primary);}
.page-content{max-width:1200px;margin:0 auto;padding:56px 5%;}
.intro-block{background:var(--white);border:1px solid var(--border);border-radius:var(--radius);padding:36px;margin-bottom:48px;}
.intro-block p{font-size:1rem;color:#2a2a2a;line-height:1.8;}
.city-chips{display:flex;flex-wrap:wrap;gap:10px;}
.city-chip{background:var(--primary);color:var(--white);padding:6px 16px;border-radius:20px;font-size:.82rem;font-weight:600;transition:background .2s;}
.city-chip:hover{background:var(--gold);color:var(--primary);}
.sidebar-box{background:var(--white);border:1px solid var(--border);border-radius:var(--radius);padding:24px;margin-bottom:20px;}
.sidebar-box h4{font-size:.95rem;color:var(--primary);margin-bottom:14px;padding-bottom:8px;border-bottom:2px solid var(--gold);display:inline-block;}
.sidebar-box ul{list-style:none;padding:0;}
.sidebar-box ul li{padding:6px 0;border-bottom:1px solid var(--border);font-size:.87rem;}
.sidebar-box ul li:last-child{border-bottom:none;}
.sidebar-box ul li a{color:var(--muted);}
.sidebar-box ul li a:hover{color:var(--primary);}
.two-col{display:grid;grid-template-columns:1fr 300px;gap:48px;align-items:start;}
@media(max-width:900px){.two-col{grid-template-columns:1fr;}.btn-outline{margin-left:0;margin-top:8px;}}
footer{background:var(--primary);color:rgba(255,255,255,.75);padding:48px 5% 28px;margin-top:80px;}
.footer-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:40px;margin-bottom:40px;}
.footer-col h4{color:var(--white);font-family:'Poppins',sans-serif;font-size:.95rem;margin-bottom:16px;}
.footer-col ul{list-style:none;padding:0;}
.footer-col ul li{margin-bottom:8px;}
.footer-col ul li a{color:rgba(255,255,255,.65);font-size:.87rem;}
.footer-col ul li a:hover{color:var(--gold);}
.footer-bottom{border-top:1px solid rgba(255,255,255,.1);padding-top:24px;text-align:center;font-size:.82rem;color:rgba(255,255,255,.45);}
@media(max-width:768px){.cat-grid{grid-template-columns:1fr;}.article-grid{grid-template-columns:1fr;}.stats-inner{grid-template-columns:repeat(2,1fr);}.hero{padding:56px 5% 48px;}}
</style>`;
}

function navbar(activePage = '') {
  return `<nav class="topbar">
  <div class="topbar-inner">
    <a href="https://www.paraisodeaves.com/fr/" class="logo"><span>🦜</span> Paraíso de Aves</a>
    <nav>
      <a href="https://www.paraisodeaves.com/fr/perroquets-disponibles/">Disponibles</a>
      <a href="https://www.paraisodeaves.com/fr/especies/">Espèces</a>
      <a href="https://www.paraisodeaves.com/fr/connaissances/" class="${activePage === 'connaissances' ? 'active' : ''}">Connaissances</a>
      <a href="https://www.paraisodeaves.com/fr/livraison/">Livraison</a>
      <a href="https://www.paraisodeaves.com/fr/contact/">Contact</a>
    </nav>
    <div class="lang-switch">
      <a href="https://www.paraisodeaves.com/" >ES</a>
      <span>|</span>
      <a href="https://www.paraisodeaves.com/fr/" class="active">FR</a>
      <span>|</span>
      <a href="https://www.paraisodeaves.com/pt/">PT</a>
    </div>
  </div>
</nav>`;
}

function footer() {
  return `<footer>
  <div class="footer-inner">
    <div class="footer-col">
      <h4>🦜 Paraíso de Aves</h4>
      <p style="font-size:.87rem;color:rgba(255,255,255,.6);line-height:1.7;">Élevage spécialisé de perroquets exotiques élevés à la main. Livraison dans toute la France depuis l'Espagne.</p>
      <p style="margin-top:12px;font-size:.85rem;"><a href="mailto:paraisodeloros@gmail.com" style="color:var(--gold);">paraisodeloros@gmail.com</a></p>
    </div>
    <div class="footer-col">
      <h4>Connaissances</h4>
      <ul>
        <li><a href="https://www.paraisodeaves.com/fr/connaissances/">Hub des connaissances</a></li>
        <li><a href="https://www.paraisodeaves.com/fr/connaissances/especes/">Fiches espèces</a></li>
        <li><a href="https://www.paraisodeaves.com/fr/connaissances/prix/">Prix & tarifs</a></li>
        <li><a href="https://www.paraisodeaves.com/fr/connaissances/alimentation/">Alimentation</a></li>
        <li><a href="https://www.paraisodeaves.com/fr/connaissances/sante/">Santé & longévité</a></li>
        <li><a href="https://www.paraisodeaves.com/fr/connaissances/cites/">CITES & légalité</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Adoption</h4>
      <ul>
        <li><a href="https://www.paraisodeaves.com/fr/perroquets-disponibles/">Oiseaux disponibles</a></li>
        <li><a href="https://www.paraisodeaves.com/fr/adopter-perroquet/">Adopter un perroquet</a></li>
        <li><a href="https://www.paraisodeaves.com/fr/processus-adoption/">Processus d'adoption</a></li>
        <li><a href="https://www.paraisodeaves.com/fr/livraison/">Livraison en France</a></li>
        <li><a href="https://www.paraisodeaves.com/fr/garantie-sante/">Garantie santé</a></li>
        <li><a href="https://www.paraisodeaves.com/fr/faq/">FAQ</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Espèces Populaires</h4>
      <ul>
        <li><a href="https://www.paraisodeaves.com/fr/especies/perroquet-gris-du-gabon/">Perroquet Gris du Gabon</a></li>
        <li><a href="https://www.paraisodeaves.com/fr/especies/ara-hyacinthe/">Ara Hyacinthe</a></li>
        <li><a href="https://www.paraisodeaves.com/fr/especies/ara-bleu-et-jaune/">Ara Bleu et Jaune</a></li>
        <li><a href="https://www.paraisodeaves.com/fr/especies/cacatoes-huppe-jaune/">Cacatoès à Huppe Jaune</a></li>
        <li><a href="https://www.paraisodeaves.com/fr/especies/amazone-front-bleu/">Amazone à Front Bleu</a></li>
        <li><a href="https://www.paraisodeaves.com/fr/especies/">Toutes les espèces →</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <p>© 2026 Paraíso de Aves — Élevage de perroquets exotiques | Livraison France | <a href="https://www.paraisodeaves.com/fr/connaissances/" style="color:rgba(255,255,255,.5);">Centre de Connaissances</a></p>
  </div>
</footer>`;
}

function faqScript() {
  return `<script>
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.parentElement;
    item.classList.toggle('open');
  });
});
</script>`;
}

// ─── HUB PAGE ────────────────────────────────────────────────────────────────

function generateHub() {
  const canonical = 'https://www.paraisodeaves.com/fr/connaissances/';
  const title = 'Centre de Connaissances | Perroquets Exotiques en France | Paraíso de Aves';
  const desc = "Le plus grand centre de connaissances sur les perroquets exotiques en France. Fiches espèces, guides prix, alimentation, santé, CITES, adoption et livraison.";

  const allArticles = BLOG_ARTICLES.map(a => ({
    slug: a.slug, title: a.title, desc: a.desc, category: a.category, readTime: a.readTime, icon: a.icon
  }));

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": canonical,
        "url": canonical,
        "name": title,
        "description": desc,
        "inLanguage": "fr-FR",
        "publisher": { "@type": "Organization", "name": "Paraíso de Aves", "url": "https://www.paraisodeaves.com/" },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.paraisodeaves.com/fr/" },
            { "@type": "ListItem", "position": 2, "name": "Centre de Connaissances", "item": canonical }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "Qu'est-ce que le Centre de Connaissances de Paraíso de Aves ?", "acceptedAnswer": { "@type": "Answer", "text": "Le Centre de Connaissances est la plus grande ressource française sur les perroquets exotiques : fiches espèces, guides prix, conseils alimentation et santé, légalité CITES, guides d'adoption et informations sur la livraison en France." } },
          { "@type": "Question", "name": "Ces guides sont-ils gratuits ?", "acceptedAnswer": { "@type": "Answer", "text": "Oui, tous les guides du Centre de Connaissances sont 100 % gratuits et accessibles sans inscription. Nous les mettons à jour régulièrement avec les dernières informations." } },
          { "@type": "Question", "name": "Comment adopter un perroquet via Paraíso de Aves ?", "acceptedAnswer": { "@type": "Answer", "text": "Consultez notre guide d'adoption, choisissez votre espèce dans les fiches, puis contactez-nous à paraisodeloros@gmail.com pour connaître les disponibilités. Nous livrons dans toute la France." } }
        ]
      }
    ]
  };

  // Search index for JS
  const searchIndex = JSON.stringify(BLOG_ARTICLES.map(a => ({
    t: a.title, d: a.desc, s: a.slug, c: a.category, i: a.icon
  })));

  const catCardsHtml = CATEGORIES.map(cat => {
    const count = cat.articleCount > 0 ? cat.articleCount : BLOG_ARTICLES.filter(a => a.category === cat.slug).length;
    const displayCount = count > 0 ? count : BLOG_ARTICLES.filter(a => a.category === cat.slug).length;
    const label = displayCount > 0 ? `${displayCount} ressource${displayCount > 1 ? 's' : ''}` : 'Guide complet';
    return `<a href="https://www.paraisodeaves.com/fr/connaissances/${cat.slug}/" class="cat-card" style="display:block;color:inherit;">
  <div class="icon">${cat.icon}</div>
  <h3>${cat.name}</h3>
  <p>${cat.desc}</p>
  <span class="count">${label}</span>
  <span class="arrow">→</span>
</a>`;
  }).join('\n');

  const featuredArticles = BLOG_ARTICLES.slice(0, 6).map(a => `<a href="https://www.paraisodeaves.com/fr/blog/${a.slug}/" class="article-card" style="display:block;color:inherit;">
  <div class="card-body">
    <span class="tag">${getCategoryName(a.category)}</span>
    <h3>${a.icon} ${a.title}</h3>
    <p>${a.desc}</p>
    <div class="meta">
      <span class="read-time">⏱ ${a.readTime} de lecture</span>
      <span class="read-link">Lire →</span>
    </div>
  </div>
</a>`).join('\n');

  const speciesChips = SPECIES_PAGES.slice(0, 12).map(s => `<a href="https://www.paraisodeaves.com/fr/especies/${s.slug}/" class="species-chip">
  <div class="emoji">${s.icon}</div>
  <span>${s.name}</span>
</a>`).join('\n');

  return `${head(title, desc, canonical)}
${commonStyles()}
</head>
<body>
${navbar('connaissances')}

<!-- Breadcrumb -->
<div class="breadcrumb-bar">
  <div class="inner">
    <a href="https://www.paraisodeaves.com/fr/">Accueil</a>
    <span>›</span>
    <strong style="color:var(--gold);">Centre de Connaissances</strong>
  </div>
</div>

<!-- Hero -->
<section class="hero">
  <div class="badge">📚 CENTRE DE CONNAISSANCES</div>
  <h1>La référence française sur les <em>perroquets exotiques</em></h1>
  <p class="subtitle">Guides complets, fiches espèces, conseils d'experts. Tout ce que vous devez savoir pour adopter et élever un perroquet en France.</p>
  <div class="trust-pills">
    <span>📖 11 guides approfondis</span>
    <span>🦜 20 fiches espèces</span>
    <span>🇫🇷 50 villes couvertes</span>
    <span>✅ Mis à jour en 2026</span>
  </div>
  <!-- Search -->
  <div class="search-box">
    <span style="font-size:1.1rem;">🔍</span>
    <input type="text" id="search-input" placeholder="Rechercher une espèce, un guide, une ville…" autocomplete="off"/>
    <button onclick="doSearch()">Rechercher</button>
  </div>
  <div id="search-results"></div>
</section>

<!-- Stats -->
<div class="stats-bar">
  <div class="stats-inner">
    <div class="stat-item"><div class="num">20+</div><div class="lbl">Espèces documentées</div></div>
    <div class="stat-item"><div class="num">11</div><div class="lbl">Guides approfondis</div></div>
    <div class="stat-item"><div class="num">50</div><div class="lbl">Villes en France</div></div>
    <div class="stat-item"><div class="num">9</div><div class="lbl">Catégories de contenu</div></div>
    <div class="stat-item"><div class="num">15+</div><div class="lbl">Ans d'expérience</div></div>
  </div>
</div>

<!-- Categories -->
<section class="section">
  <div class="container">
    <div class="section-title">
      <div class="label">Catégories</div>
      <h2>Explorez par thème</h2>
      <p>Chaque catégorie rassemble nos meilleurs contenus sur un aspect essentiel de la vie avec un perroquet.</p>
    </div>
    <div class="cat-grid">
      ${catCardsHtml}
    </div>
  </div>
</section>

<!-- Featured Articles -->
<section class="section section-alt">
  <div class="container">
    <div class="section-title">
      <div class="label">Articles vedettes</div>
      <h2>Nos guides les plus consultés</h2>
      <p>Sélection des ressources incontournables pour tout futur propriétaire de perroquet.</p>
    </div>
    <div class="article-grid">
      ${featuredArticles}
    </div>
    <div style="text-align:center;margin-top:36px;">
      <a href="https://www.paraisodeaves.com/fr/blog/" class="btn-primary">Voir tous les articles →</a>
    </div>
  </div>
</section>

<!-- Species Guides -->
<section class="section">
  <div class="container">
    <div class="section-title">
      <div class="label">Fiches Espèces</div>
      <h2>20 espèces documentées en détail</h2>
      <p>Chaque fiche couvre l'origine, le caractère, l'alimentation, le prix et les soins spécifiques.</p>
    </div>
    <div class="species-grid">
      ${speciesChips}
    </div>
    <div style="text-align:center;margin-top:36px;">
      <a href="https://www.paraisodeaves.com/fr/especies/" class="btn-primary">Toutes les fiches espèces →</a>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="section section-alt">
  <div class="container">
    <div class="cta-block">
      <h2>Prêt à adopter votre perroquet ?</h2>
      <p>Nos experts sont disponibles pour vous accompagner dans le choix de votre espèce et vous informer sur les disponibilités actuelles.</p>
      <a href="https://www.paraisodeaves.com/fr/contact/" class="btn-primary">Nous contacter</a>
      <a href="https://www.paraisodeaves.com/fr/perroquets-disponibles/" class="btn-outline">Voir les disponibles</a>
    </div>
  </div>
</section>

<!-- FAQ -->
<section class="section">
  <div class="container">
    <div class="section-title">
      <div class="label">Questions fréquentes</div>
      <h2>Ce que nos visiteurs demandent</h2>
    </div>
    <div class="faq-list">
      <div class="faq-item">
        <div class="faq-q">Qu'est-ce que le Centre de Connaissances de Paraíso de Aves ?</div>
        <div class="faq-a">Le Centre de Connaissances est la plus grande ressource française sur les perroquets exotiques : fiches espèces, guides prix, conseils alimentation et santé, légalité CITES, guides d'adoption et informations sur la livraison en France.</div>
      </div>
      <div class="faq-item">
        <div class="faq-q">Ces guides sont-ils gratuits ?</div>
        <div class="faq-a">Oui, tous les guides du Centre de Connaissances sont 100 % gratuits et accessibles sans inscription. Nous les mettons à jour régulièrement avec les dernières informations.</div>
      </div>
      <div class="faq-item">
        <div class="faq-q">Comment adopter un perroquet via Paraíso de Aves ?</div>
        <div class="faq-a">Consultez notre guide d'adoption, choisissez votre espèce dans les fiches, puis contactez-nous à paraisodeloros@gmail.com pour connaître les disponibilités. Nous livrons dans toute la France métropolitaine.</div>
      </div>
      <div class="faq-item">
        <div class="faq-q">Les informations sont-elles spécifiques à la France ?</div>
        <div class="faq-a">Oui. Tous nos guides sont écrits pour le contexte français : législation CITES française, vétérinaires NAC, villes de livraison, réglementation sur la détention d'animaux exotiques et prix en euros.</div>
      </div>
      <div class="faq-item">
        <div class="faq-q">Puis-je faire confiance à Paraíso de Aves ?</div>
        <div class="faq-a">Paraíso de Aves est un élevage enregistré en Espagne, spécialisé dans les perroquets exotiques depuis plus de 15 ans. Tous nos oiseaux sont bagués, documentés et accompagnés d'un certificat vétérinaire. Nous avons livré des centaines d'oiseaux en France avec une garantie santé de 15 jours.</div>
      </div>
    </div>
    <div style="text-align:center;margin-top:32px;">
      <a href="https://www.paraisodeaves.com/fr/connaissances/faq/" class="btn-primary">Voir toutes les FAQ →</a>
    </div>
  </div>
</section>

<!-- Schema -->
<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>

${footer()}

${faqScript()}
<script>
const searchIndex = ${searchIndex};
const catNames = ${JSON.stringify(CATEGORIES.reduce((acc,c)=>({...acc,[c.slug]:c.name}),{}))};

function doSearch() {
  const q = document.getElementById('search-input').value.trim().toLowerCase();
  const container = document.getElementById('search-results');
  if (q.length < 2) { container.style.display='none'; return; }
  const hits = searchIndex.filter(a => a.t.toLowerCase().includes(q) || a.d.toLowerCase().includes(q) || a.c.toLowerCase().includes(q));
  if (!hits.length) {
    container.innerHTML = '<div class="sr-empty">Aucun résultat pour "' + q + '"</div>';
  } else {
    container.innerHTML = hits.slice(0,6).map(a => \`<a href="https://www.paraisodeaves.com/fr/blog/\${a.s}/" class="sr-item"><strong>\${a.i} \${a.t}</strong>\${a.d.substring(0,80)}…</a>\`).join('');
  }
  container.style.display = 'block';
}
document.getElementById('search-input').addEventListener('keyup', function(e) {
  if (e.key === 'Enter') doSearch();
  else if (this.value.length >= 3) doSearch();
  else if (this.value.length === 0) { document.getElementById('search-results').style.display='none'; }
});
document.addEventListener('click', function(e) {
  if (!e.target.closest('.search-box') && !e.target.closest('#search-results')) {
    document.getElementById('search-results').style.display='none';
  }
});
</script>
</body>
</html>`;
}

// ─── CATEGORY PAGE ────────────────────────────────────────────────────────────

function getCategoryName(slug) {
  const cat = CATEGORIES.find(c => c.slug === slug);
  return cat ? cat.name : slug;
}

function generateCategoryPage(cat) {
  const canonical = `https://www.paraisodeaves.com/fr/connaissances/${cat.slug}/`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": canonical,
        "url": canonical,
        "name": cat.seoTitle,
        "description": cat.seoDesc,
        "inLanguage": "fr-FR",
        "publisher": { "@type": "Organization", "name": "Paraíso de Aves", "url": "https://www.paraisodeaves.com/" },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.paraisodeaves.com/fr/" },
            { "@type": "ListItem", "position": 2, "name": "Centre de Connaissances", "item": "https://www.paraisodeaves.com/fr/connaissances/" },
            { "@type": "ListItem", "position": 3, "name": cat.name, "item": canonical }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": cat.faq.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a }
        }))
      }
    ]
  };

  // Article cards for this category
  const catArticles = cat.articles.length > 0 ? cat.articles : BLOG_ARTICLES.filter(a => a.category === cat.slug);

  const articleCards = catArticles.length > 0 ? catArticles.map(a => `<a href="https://www.paraisodeaves.com/fr/blog/${a.slug}/" class="article-card" style="display:block;color:inherit;">
  <div class="card-body">
    <span class="tag">${cat.name}</span>
    <h3>${a.icon || '📖'} ${a.title}</h3>
    <p>${a.desc}</p>
    <div class="meta">
      <span class="read-time">⏱ ${a.readTime} de lecture</span>
      <span class="read-link">Lire →</span>
    </div>
  </div>
</a>`).join('\n') : `<div style="background:var(--white);border:1px solid var(--border);border-radius:var(--radius);padding:36px;text-align:center;grid-column:1/-1;">
  <div style="font-size:2rem;margin-bottom:12px;">${cat.icon}</div>
  <h3 style="color:var(--primary);margin-bottom:8px;">Contenu en cours de rédaction</h3>
  <p style="color:var(--muted);">Notre équipe prépare des guides approfondis sur ${cat.name.toLowerCase()}. En attendant, consultez notre <a href="https://www.paraisodeaves.com/fr/blog/">blog</a> ou contactez-nous directement.</p>
</div>`;

  // Related species (always show some)
  const speciesLinks = SPECIES_PAGES.slice(0, 6).map(s =>
    `<li><a href="https://www.paraisodeaves.com/fr/especies/${s.slug}/">${s.icon} ${s.name}</a></li>`
  ).join('\n');

  // 3 related cities
  const cityLinks = CITIES_SAMPLE.slice(0, 3).map(c =>
    `<a href="https://www.paraisodeaves.com/fr/perroquets-a-vendre-${c.slug}/" class="city-chip">${c.name}</a>`
  ).join('\n');

  // Other categories for nav
  const otherCats = CATEGORIES.filter(c => c.slug !== cat.slug).slice(0, 6);
  const otherCatLinks = otherCats.map(c =>
    `<li><a href="https://www.paraisodeaves.com/fr/connaissances/${c.slug}/">${c.icon} ${c.name}</a></li>`
  ).join('\n');

  // FAQ items
  const faqItems = cat.faq.map(f => `<div class="faq-item">
  <div class="faq-q">${f.q}</div>
  <div class="faq-a">${f.a}</div>
</div>`).join('\n');

  return `${head(cat.seoTitle, cat.seoDesc, canonical)}
${commonStyles()}
</head>
<body>
${navbar('connaissances')}

<!-- Breadcrumb -->
<div class="breadcrumb-bar">
  <div class="inner">
    <a href="https://www.paraisodeaves.com/fr/">Accueil</a>
    <span>›</span>
    <a href="https://www.paraisodeaves.com/fr/connaissances/">Centre de Connaissances</a>
    <span>›</span>
    <strong style="color:var(--gold);">${cat.name}</strong>
  </div>
</div>

<!-- Hero -->
<section class="hero" style="padding:60px 5% 50px;">
  <div class="badge">${cat.icon} ${cat.name.toUpperCase()}</div>
  <h1>${cat.name}</h1>
  <p class="subtitle">${cat.desc}</p>
  <div class="trust-pills">
    <span>✅ Informations vérifiées 2026</span>
    <span>🇫🇷 Contexte français</span>
    <span>📧 Experts disponibles</span>
  </div>
</section>

<!-- Main content -->
<div class="page-content">
  <div class="two-col">
    <!-- Left col -->
    <div>
      <!-- Intro -->
      <div class="intro-block">
        <div class="breadcrumb-inline">
          <a href="https://www.paraisodeaves.com/fr/">Accueil</a> › 
          <a href="https://www.paraisodeaves.com/fr/connaissances/">Connaissances</a> › 
          ${cat.name}
        </div>
        <p>${cat.intro}</p>
        <p style="margin-top:12px;"><a href="https://www.paraisodeaves.com/fr/contact/" style="color:var(--primary);font-weight:600;">Vous avez une question spécifique ? Écrivez-nous →</a></p>
      </div>

      <!-- Articles -->
      ${catArticles.length > 0 ? '<h2 style="color:var(--primary);margin-bottom:24px;font-size:1.5rem;">📖 Articles de cette catégorie</h2>' : ''}
      <div class="article-grid" style="grid-template-columns:1fr;">
        ${articleCards}
      </div>

      ${catArticles.length > 0 ? `<div style="text-align:center;margin:36px 0;">
        <a href="https://www.paraisodeaves.com/fr/blog/" class="btn-primary" style="background:var(--primary);color:var(--white);">Voir tous nos articles →</a>
      </div>` : ''}

      <!-- FAQ -->
      <h2 style="color:var(--primary);margin:48px 0 24px;font-size:1.5rem;">❓ Questions fréquentes — ${cat.name}</h2>
      <div class="faq-list" style="max-width:100%;">
        ${faqItems}
      </div>

      <!-- Cities -->
      <div style="margin-top:48px;">
        <h3 style="color:var(--primary);margin-bottom:16px;">🏙️ Livraison dans votre ville</h3>
        <p style="color:var(--muted);font-size:.9rem;margin-bottom:14px;">Nous livrons des perroquets dans toute la France — trouvez votre ville :</p>
        <div class="city-chips">
          ${CITIES_SAMPLE.map(c => `<a href="https://www.paraisodeaves.com/fr/perroquets-a-vendre-${c.slug}/" class="city-chip">${c.name}</a>`).join('\n          ')}
        </div>
        <p style="margin-top:12px;font-size:.85rem;"><a href="https://www.paraisodeaves.com/fr/livraison/" style="color:var(--primary);font-weight:600;">En savoir plus sur la livraison →</a></p>
      </div>

      <!-- CTA block -->
      <div class="cta-block" style="margin-top:48px;">
        <h2>Prêt à accueillir votre perroquet ?</h2>
        <p>Consultez nos disponibilités actuelles ou contactez-nous pour un conseil personnalisé. Livraison dans toute la France métropolitaine.</p>
        <a href="https://www.paraisodeaves.com/fr/contact/" class="btn-primary">Nous contacter</a>
        <a href="https://www.paraisodeaves.com/fr/perroquets-disponibles/" class="btn-outline">Voir les disponibles</a>
      </div>
    </div>

    <!-- Sidebar -->
    <div>
      <div class="sidebar-box">
        <h4>📚 Toutes les catégories</h4>
        <ul>
          <li style="padding:8px 0;border-bottom:1px solid var(--border);"><a href="https://www.paraisodeaves.com/fr/connaissances/" style="font-weight:700;color:var(--primary);">🏠 Vue d'ensemble</a></li>
          ${CATEGORIES.map(c => `<li><a href="https://www.paraisodeaves.com/fr/connaissances/${c.slug}/" ${c.slug === cat.slug ? 'style="color:var(--gold);font-weight:700;"' : ''}>${c.icon} ${c.name}</a></li>`).join('\n          ')}
        </ul>
      </div>

      <div class="sidebar-box">
        <h4>🦜 Fiches Espèces</h4>
        <ul>
          ${speciesLinks}
          <li><a href="https://www.paraisodeaves.com/fr/especies/" style="color:var(--gold);font-weight:600;">Voir les 20 espèces →</a></li>
        </ul>
      </div>

      <div class="sidebar-box">
        <h4>📧 Contact rapide</h4>
        <p style="font-size:.87rem;color:var(--muted);margin-bottom:12px;">Une question ? Notre équipe répond en 24–48h.</p>
        <a href="mailto:paraisodeloros@gmail.com" class="btn-primary" style="display:block;text-align:center;font-size:.88rem;padding:10px 20px;background:var(--primary);color:var(--white);">Écrire un email</a>
        <p style="font-size:.78rem;color:var(--muted);margin-top:8px;text-align:center;">paraisodeloros@gmail.com</p>
      </div>

      <div class="sidebar-box">
        <h4>🏙️ Villes populaires</h4>
        <ul>
          ${CITIES_SAMPLE.slice(0,6).map(c => `<li><a href="https://www.paraisodeaves.com/fr/perroquets-a-vendre-${c.slug}/">Perroquets à ${c.name}</a></li>`).join('\n          ')}
        </ul>
        <p style="margin-top:8px;font-size:.82rem;"><a href="https://www.paraisodeaves.com/fr/livraison/" style="color:var(--gold);font-weight:600;">50 villes couvertes →</a></p>
      </div>

      <div class="sidebar-box">
        <h4>✅ Adoption sécurisée</h4>
        <ul>
          <li><a href="https://www.paraisodeaves.com/fr/adopter-perroquet/">Adopter un perroquet</a></li>
          <li><a href="https://www.paraisodeaves.com/fr/garantie-sante/">Garantie santé 15 jours</a></li>
          <li><a href="https://www.paraisodeaves.com/fr/processus-adoption/">Processus d'adoption</a></li>
          <li><a href="https://www.paraisodeaves.com/fr/livraison/">Livraison France</a></li>
          <li><a href="https://www.paraisodeaves.com/fr/faq/">FAQ complète</a></li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- Schema -->
<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>

${footer()}
${faqScript()}
</body>
</html>`;
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

const generated = [];

// Create hub
const hubDir = path.join('fr', 'connaissances');
fs.mkdirSync(hubDir, { recursive: true });
fs.writeFileSync(path.join(hubDir, 'index.html'), generateHub(), 'utf8');
generated.push('/fr/connaissances/');
console.log('✓ Generated fr/connaissances/index.html');

// Create category pages
for (const cat of CATEGORIES) {
  const catDir = path.join('fr', 'connaissances', cat.slug);
  fs.mkdirSync(catDir, { recursive: true });
  fs.writeFileSync(path.join(catDir, 'index.html'), generateCategoryPage(cat), 'utf8');
  generated.push(`/fr/connaissances/${cat.slug}/`);
  console.log(`✓ Generated fr/connaissances/${cat.slug}/index.html`);
}

console.log(`\n✅ Total: ${generated.length} pages generated`);
console.log(generated.map(p => '  ' + p).join('\n'));
