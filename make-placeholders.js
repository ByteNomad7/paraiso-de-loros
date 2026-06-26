#!/usr/bin/env node
/* Build the 4 missing commercial placeholder pages (noindex). */
const fs = require('fs');
const { NAV_CSS, NAV_JS, PT_HEADER, FR_HEADER } = require('./apply-unified-nav.js');

const BASE_CSS = `<style>
:root{--primary:#1F3D2B;--secondary:#2B533C;--gold:#D4A94F;--gold-rich:#E0B75F;--bg:#F8F5F0;--text:#1A1A1A;--muted:#5C5C5C;--border:#E7E0D2;--white:#fff}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Open Sans',Arial,sans-serif;background:var(--bg);color:var(--text);line-height:1.8}
a{color:var(--secondary)}
.ph-hero{background:linear-gradient(135deg,var(--primary),var(--secondary));color:#fff;padding:3.4rem 5% 3rem;text-align:center}
.ph-hero .badge{display:inline-block;background:rgba(212,169,79,.18);color:var(--gold-rich);font-weight:700;font-size:.8rem;padding:.4rem 1rem;border-radius:999px;margin-bottom:1rem}
.ph-hero h1{font-family:'Poppins',Arial,sans-serif;font-size:2rem;font-weight:900;margin-bottom:.8rem;max-width:780px;margin-left:auto;margin-right:auto}
.ph-hero p{max-width:680px;margin:0 auto;color:rgba(255,255,255,.9);font-size:1.02rem}
.ph-wrap{max-width:780px;margin:0 auto;padding:3rem 5%}
.ph-wrap h2{font-family:'Poppins',Arial,sans-serif;color:var(--primary);font-size:1.4rem;margin:2rem 0 .8rem}
.ph-wrap p{margin-bottom:1rem;color:#2a2a2a}
.ph-note{background:#fff;border:1px solid var(--border);border-left:4px solid var(--gold);border-radius:0 10px 10px 0;padding:1.1rem 1.3rem;margin:1.5rem 0;color:var(--muted);font-size:.95rem}
.ph-cta{background:var(--primary);color:#fff;text-align:center;padding:2.6rem 5%;border-radius:16px;margin:2.2rem 0}
.ph-cta h2{color:var(--gold-rich);margin-bottom:.6rem}
.ph-cta a.btn{display:inline-block;margin-top:1rem;background:linear-gradient(135deg,var(--gold),var(--gold-rich));color:#fff;font-weight:800;padding:.85rem 1.8rem;border-radius:999px;text-decoration:none}
.ph-related{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin:1.4rem 0}
.ph-related a{background:#fff;border:1px solid var(--border);border-radius:12px;padding:1.1rem 1.2rem;text-decoration:none;color:var(--primary);font-weight:700;transition:transform .2s,box-shadow .2s}
.ph-related a:hover{transform:translateY(-3px);box-shadow:0 12px 28px rgba(0,0,0,.08)}
.ph-foot{background:var(--primary);color:rgba(255,255,255,.75);text-align:center;padding:2.4rem 5%;font-size:.9rem}
.ph-foot a{color:rgba(255,255,255,.8)}
@media(max-width:600px){.ph-hero h1{font-size:1.55rem}}
</style>`;

function page({ lang, slug, title, desc, esUrl, ptUrl, frUrl, h1, hero, body, related, ctaTitle, ctaText, ctaBtn, contactUrl, footText, header }) {
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex, follow">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="https://www.paraisodeaves.com/${slug}">
<link rel="alternate" hreflang="es-ES" href="${esUrl}">
<link rel="alternate" hreflang="pt-PT" href="${ptUrl}">
<link rel="alternate" hreflang="fr-FR" href="${frUrl}">
<link rel="alternate" hreflang="x-default" href="https://www.paraisodeaves.com/">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800;900&family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet">
<script async src="https://www.googletagmanager.com/gtag/js?id=G-4007YHH4H9"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-4007YHH4H9');</script>
${BASE_CSS}
${NAV_CSS}
</head>
<body>
${header}
<section class="ph-hero">
  <span class="badge">${hero}</span>
  <h1>${h1}</h1>
  <p>${desc}</p>
</section>
<main class="ph-wrap">
${body}
  <div class="ph-cta">
    <h2>${ctaTitle}</h2>
    <p>${ctaText}</p>
    <a class="btn" href="mailto:paraisodeloros@gmail.com">✉ ${ctaBtn}</a>
  </div>
  <div class="ph-related">
${related.map(([u, t]) => `    <a href="${u}">${t} →</a>`).join('\n')}
  </div>
</main>
<footer class="ph-foot">
  <p>🦜 <strong>paraisodeaves</strong> — ${footText}</p>
  <p style="margin-top:.6rem">📧 <a href="mailto:paraisodeloros@gmail.com">paraisodeloros@gmail.com</a></p>
  <p style="margin-top:.6rem;font-size:.8rem;opacity:.6">© 2026 paraisodeaves · <a href="${contactUrl}">Contacto</a></p>
</footer>
${NAV_JS}
<script src="/lang-switcher.js" defer></script>
</body>
</html>`;
}

const HRE = {
  cages: {
    es: 'https://www.paraisodeaves.com/jaulas-para-loros',
    pt: 'https://www.paraisodeaves.com/pt/gaiolas-para-papagaios',
    fr: 'https://www.paraisodeaves.com/fr/cages-pour-perroquets'
  },
  transport: {
    es: 'https://www.paraisodeaves.com/transportines-para-loros',
    pt: 'https://www.paraisodeaves.com/pt/transportadoras-para-papagaios',
    fr: 'https://www.paraisodeaves.com/fr/caisses-de-transport'
  }
};

const pages = [
  {
    file: 'pt/gaiolas-para-papagaios/index.html',
    data: {
      lang: 'pt', slug: 'pt/gaiolas-para-papagaios', header: PT_HEADER,
      title: 'Gaiolas para Papagaios | paraisodeaves',
      desc: 'Aconselhamento sobre gaiolas adequadas para papagaios — tamanho, material e segurança por espécie. Fale connosco para recomendações personalizadas.',
      esUrl: HRE.cages.es, ptUrl: HRE.cages.pt, frUrl: HRE.cages.fr,
      hero: '🏠 ACESSÓRIOS · GAIOLAS', h1: 'Gaiolas para Papagaios',
      body: `  <p>A gaiola é o espaço onde o seu papagaio passa grande parte do dia, por isso a sua escolha é uma das decisões mais importantes para o bem-estar da ave. Uma gaiola demasiado pequena gera stress, problemas de comportamento e até doenças, enquanto uma gaiola bem dimensionada permite que o papagaio abra as asas, trepe e brinque com liberdade.</p>
  <h2>O tamanho certo para cada espécie</h2>
  <p>Cada espécie tem necessidades diferentes. Um papagaio cinzento africano precisa de uma gaiola robusta com barras horizontais para trepar; uma arara exige um espaço amplo e barras grossas que resistam ao seu bico poderoso; cacatuas e amazonas precisam de altura e largura para se movimentarem. Como regra geral, a gaiola deve permitir que a ave estenda completamente as asas em qualquer direção, com margem para acessórios e poleiros.</p>
  <h2>Material e segurança</h2>
  <p>Recomendamos gaiolas em aço inoxidável ou com revestimento atóxico, sem zinco nem chumbo, materiais perigosos se ingeridos. O espaçamento das barras deve ser adequado ao tamanho da espécie para evitar que a cabeça ou as patas fiquem presas. Fechos seguros são essenciais — muitos papagaios aprendem rapidamente a abrir fechos simples.</p>
  <div class="ph-note">Estamos a preparar uma seleção detalhada de gaiolas recomendadas por espécie. Enquanto isso, ao adquirir um papagaio connosco, aconselhamos gratuitamente sobre a gaiola e o equipamento ideal para a sua ave.</div>
  <h2>Equipamento essencial</h2>
  <p>Uma boa gaiola deve incluir poleiros de diâmetros variados (para exercitar as patas), comedouros e bebedouros de aço inox, brinquedos de enriquecimento e uma bandeja inferior de fácil limpeza. A localização também importa: longe de correntes de ar e da cozinha, num espaço social da casa onde a ave se sinta integrada na família.</p>`,
      related: [
        ['/pt/comida-para-papagaios/', 'Comida para Papagaios'],
        ['/pt/brinquedos-naturais-para-papagaios/', 'Brinquedos Naturais'],
        ['/pt/papagaios-a-venda-portugal/', 'Papagaios à Venda'],
        ['/pt/contacto/', 'Contactar Criador']
      ],
      ctaTitle: 'Precisa de aconselhamento sobre gaiolas?',
      ctaText: 'Diga-nos a espécie e o espaço disponível e recomendamos a gaiola ideal sem compromisso.',
      ctaBtn: 'Solicitar Recomendação', contactUrl: '/pt/contacto/',
      footText: 'Criador registado de papagaios e aves exóticas. Documentação CITES e envios para toda a Europa.'
    }
  },
  {
    file: 'pt/transportadoras-para-papagaios/index.html',
    data: {
      lang: 'pt', slug: 'pt/transportadoras-para-papagaios', header: PT_HEADER,
      title: 'Transportadoras para Papagaios | paraisodeaves',
      desc: 'Transportadoras seguras para papagaios — viagens ao veterinário, mudanças e deslocações. Aconselhamento sobre o modelo adequado por espécie.',
      esUrl: HRE.transport.es, ptUrl: HRE.transport.pt, frUrl: HRE.transport.fr,
      hero: '🧳 ACESSÓRIOS · TRANSPORTE', h1: 'Transportadoras para Papagaios',
      body: `  <p>Uma transportadora adequada é indispensável para qualquer dono de papagaio. Seja para a primeira viagem até casa, consultas veterinárias ou mudanças, uma boa transportadora protege a ave do stress e de lesões, garantindo segurança e ventilação durante o trajeto.</p>
  <h2>Como escolher a transportadora certa</h2>
  <p>A transportadora deve ser sólida, bem ventilada e do tamanho certo: suficientemente espaçosa para a ave se manter de pé e virar-se, mas não tão grande que se magoe em travagens bruscas. Para espécies maiores, como araras e cacatuas, recomendam-se transportadoras rígidas com um poleiro interior fixo. Para espécies mais pequenas, modelos compactos com base antiderrapante são suficientes.</p>
  <h2>Conforto e segurança durante a viagem</h2>
  <p>Um poleiro firme à altura certa evita que a ave escorregue. Cubra parcialmente a transportadora para reduzir o stress visual, mantenha uma temperatura estável e nunca deixe a ave dentro de um veículo ao sol. Para viagens longas, ofereça água e fruta com elevado teor de humidade nas paragens.</p>
  <div class="ph-note">Estamos a preparar uma seleção de transportadoras recomendadas por espécie. Ao adquirir um papagaio connosco, aconselhamos sobre o modelo de transporte mais adequado para a sua ave.</div>
  <h2>O transporte das nossas aves</h2>
  <p>Todos os nossos papagaios viajam em transportadoras homologadas, com documentação CITES e em condições que cumprem a normativa de bem-estar animal. Aconselhamos sempre o novo dono sobre como continuar a transportar a ave em segurança após a chegada.</p>`,
      related: [
        ['/pt/gaiolas-para-papagaios/', 'Gaiolas para Papagaios'],
        ['/pt/comida-para-papagaios/', 'Comida para Papagaios'],
        ['/pt/papagaios-a-venda-portugal/', 'Papagaios à Venda'],
        ['/pt/contacto/', 'Contactar Criador']
      ],
      ctaTitle: 'Dúvidas sobre o transporte do seu papagaio?',
      ctaText: 'Aconselhamos a transportadora ideal segundo a espécie e o tipo de viagem.',
      ctaBtn: 'Solicitar Aconselhamento', contactUrl: '/pt/contacto/',
      footText: 'Criador registado de papagaios e aves exóticas. Documentação CITES e envios para toda a Europa.'
    }
  },
  {
    file: 'fr/cages-pour-perroquets/index.html',
    data: {
      lang: 'fr', slug: 'fr/cages-pour-perroquets', header: FR_HEADER,
      title: 'Cages pour Perroquets | paraisodeaves',
      desc: 'Conseils sur les cages adaptées aux perroquets — taille, matériau et sécurité par espèce. Contactez-nous pour des recommandations personnalisées.',
      esUrl: HRE.cages.es, ptUrl: HRE.cages.pt, frUrl: HRE.cages.fr,
      hero: '🏠 ACCESSOIRES · CAGES', h1: 'Cages pour Perroquets',
      body: `  <p>La cage est l'espace où votre perroquet passe une grande partie de la journée : son choix est donc l'une des décisions les plus importantes pour le bien-être de l'oiseau. Une cage trop petite engendre du stress, des troubles du comportement et même des maladies, tandis qu'une cage bien dimensionnée permet au perroquet de déployer ses ailes, de grimper et de jouer librement.</p>
  <h2>La bonne taille pour chaque espèce</h2>
  <p>Chaque espèce a des besoins différents. Un gris du Gabon a besoin d'une cage robuste avec des barreaux horizontaux pour grimper ; un ara exige un grand espace et des barreaux épais qui résistent à son bec puissant ; les cacatoès et les amazones ont besoin de hauteur et de largeur pour se déplacer. En règle générale, la cage doit permettre à l'oiseau d'étendre complètement ses ailes dans toutes les directions, avec une marge pour les accessoires et les perchoirs.</p>
  <h2>Matériau et sécurité</h2>
  <p>Nous recommandons des cages en acier inoxydable ou avec un revêtement non toxique, sans zinc ni plomb — des matériaux dangereux en cas d'ingestion. L'espacement des barreaux doit être adapté à la taille de l'espèce pour éviter que la tête ou les pattes ne se coincent. Des fermetures sécurisées sont essentielles : de nombreux perroquets apprennent vite à ouvrir les loquets simples.</p>
  <div class="ph-note">Nous préparons une sélection détaillée de cages recommandées par espèce. En attendant, lors de l'acquisition d'un perroquet chez nous, nous vous conseillons gratuitement sur la cage et l'équipement idéal pour votre oiseau.</div>
  <h2>Équipement essentiel</h2>
  <p>Une bonne cage doit inclure des perchoirs de diamètres variés (pour exercer les pattes), des mangeoires et abreuvoirs en inox, des jouets d'enrichissement et un bac inférieur facile à nettoyer. L'emplacement compte aussi : loin des courants d'air et de la cuisine, dans un espace social du foyer où l'oiseau se sent intégré à la famille.</p>`,
      related: [
        ['/fr/nourriture-pour-perroquets/', 'Nourriture pour Perroquets'],
        ['/fr/jouets-naturels-pour-perroquets/', 'Jouets Naturels'],
        ['/fr/perroquets-disponibles/', 'Perroquets Disponibles'],
        ['/fr/contact/', 'Contacter l\'Éleveur']
      ],
      ctaTitle: 'Besoin de conseils sur les cages ?',
      ctaText: 'Indiquez-nous l\'espèce et l\'espace disponible et nous vous recommandons la cage idéale sans engagement.',
      ctaBtn: 'Demander une Recommandation', contactUrl: '/fr/contact/',
      footText: 'Éleveur enregistré de perroquets et oiseaux exotiques. Documentation CITES et livraison dans toute l\'Europe.'
    }
  },
  {
    file: 'fr/caisses-de-transport/index.html',
    data: {
      lang: 'fr', slug: 'fr/caisses-de-transport', header: FR_HEADER,
      title: 'Caisses de Transport pour Perroquets | paraisodeaves',
      desc: 'Caisses de transport sûres pour perroquets — visites vétérinaires, déménagements et déplacements. Conseils sur le modèle adapté par espèce.',
      esUrl: HRE.transport.es, ptUrl: HRE.transport.pt, frUrl: HRE.transport.fr,
      hero: '🧳 ACCESSOIRES · TRANSPORT', h1: 'Caisses de Transport pour Perroquets',
      body: `  <p>Une caisse de transport adaptée est indispensable pour tout propriétaire de perroquet. Que ce soit pour le premier trajet jusqu'à la maison, les consultations vétérinaires ou les déménagements, une bonne caisse protège l'oiseau du stress et des blessures, tout en garantissant sécurité et ventilation pendant le trajet.</p>
  <h2>Comment choisir la bonne caisse</h2>
  <p>La caisse doit être solide, bien ventilée et à la bonne taille : assez spacieuse pour que l'oiseau se tienne debout et se retourne, mais pas trop grande pour éviter qu'il ne se blesse lors de freinages brusques. Pour les grandes espèces, comme les aras et les cacatoès, on recommande des caisses rigides avec un perchoir intérieur fixe. Pour les espèces plus petites, des modèles compacts avec une base antidérapante suffisent.</p>
  <h2>Confort et sécurité pendant le voyage</h2>
  <p>Un perchoir ferme à la bonne hauteur évite que l'oiseau ne glisse. Couvrez partiellement la caisse pour réduire le stress visuel, maintenez une température stable et ne laissez jamais l'oiseau dans un véhicule au soleil. Pour les longs trajets, proposez de l'eau et des fruits à forte teneur en eau lors des arrêts.</p>
  <div class="ph-note">Nous préparons une sélection de caisses de transport recommandées par espèce. Lors de l'acquisition d'un perroquet chez nous, nous vous conseillons sur le modèle de transport le plus adapté à votre oiseau.</div>
  <h2>Le transport de nos oiseaux</h2>
  <p>Tous nos perroquets voyagent dans des caisses homologuées, avec leur documentation CITES et dans des conditions conformes à la réglementation sur le bien-être animal. Nous conseillons toujours le nouveau propriétaire sur la manière de continuer à transporter l'oiseau en toute sécurité après son arrivée.</p>`,
      related: [
        ['/fr/cages-pour-perroquets/', 'Cages pour Perroquets'],
        ['/fr/nourriture-pour-perroquets/', 'Nourriture pour Perroquets'],
        ['/fr/perroquets-disponibles/', 'Perroquets Disponibles'],
        ['/fr/contact/', 'Contacter l\'Éleveur']
      ],
      ctaTitle: 'Des questions sur le transport de votre perroquet ?',
      ctaText: 'Nous vous conseillons la caisse idéale selon l\'espèce et le type de voyage.',
      ctaBtn: 'Demander un Conseil', contactUrl: '/fr/contact/',
      footText: 'Éleveur enregistré de perroquets et oiseaux exotiques. Documentation CITES et livraison dans toute l\'Europe.'
    }
  }
];

for (const { file, data } of pages) {
  fs.mkdirSync(file.replace(/\/index\.html$/, ''), { recursive: true });
  fs.writeFileSync(file, page(data));
  console.log('wrote', file);
}
console.log('Placeholders done.');
