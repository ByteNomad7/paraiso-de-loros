#!/usr/bin/env node
/* Build the 4 missing commercial placeholder pages (noindex). */
const fs = require('fs');
const { NAV_CSS, NAV_JS, PT_HEADER, FR_HEADER } = require('./apply-unified-nav.js');
const { FOOTER_CSS, PT_FOOTER, FR_FOOTER } = require('./apply-unified-footer.js');

const BASE_CSS = `<style>
:root{--primary:#1F3D2B;--secondary:#2B533C;--gold:#D4A94F;--gold-rich:#E0B75F;--gold-light:#E0B75F;--bg:#F8F5F0;--text:#1A1A1A;--muted:#5C5C5C;--border:#E7E0D2;--white:#fff}
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
footer{background:var(--primary);color:rgba(255,255,255,.75);padding:56px 5% 28px;}
.footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr 1fr;gap:32px;max-width:1200px;margin:0 auto 40px;}
@media(max-width:900px){.footer-grid{grid-template-columns:1fr 1fr;}}
@media(max-width:500px){.footer-grid{grid-template-columns:1fr;}}
.footer-brand h3{font-family:'Poppins',sans-serif;color:var(--white);font-size:1.1rem;margin-bottom:10px;}
.footer-brand p{font-size:.85rem;line-height:1.7;max-width:260px;}
.footer-col h4{font-family:'Poppins',sans-serif;color:var(--gold-light);font-size:.85rem;text-transform:uppercase;letter-spacing:.8px;margin-bottom:14px;}
.footer-col ul{list-style:none;}
.footer-col ul li{margin-bottom:7px;}
.footer-col ul li a{color:rgba(255,255,255,.65);font-size:.83rem;transition:color .2s;}
.footer-col ul li a:hover{color:var(--gold);}
.footer-bottom{border-top:1px solid rgba(255,255,255,.1);padding-top:22px;text-align:center;font-size:.78rem;color:rgba(255,255,255,.4);max-width:1200px;margin:0 auto;}
@media(max-width:600px){.ph-hero h1{font-size:1.55rem}}
</style>`;

function page({ lang, slug, title, desc, esUrl, ptUrl, frUrl, h1, hero, body, related, ctaTitle, ctaText, ctaBtn, contactUrl, footer, header }) {
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
${FOOTER_CSS}
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
${footer}
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
  <p>Uma boa gaiola deve incluir poleiros de diâmetros variados (para exercitar as patas), comedouros e bebedouros de aço inox, brinquedos de enriquecimento e uma bandeja inferior de fácil limpeza. A localização também importa: longe de correntes de ar e da cozinha, num espaço social da casa onde a ave se sinta integrada na família.</p>
  <h2>Tamanhos mínimos por porte</h2>
  <p>Como referência prática: para aves pequenas (caturras, periquitos) procure uma gaiola com pelo menos 60×40×60 cm; para porte médio (papagaio cinzento, amazonas) recomenda-se 80×70×100 cm; e para grande porte (araras, cacatuas) o ideal são modelos a partir de 100×80×150 cm ou uma voadeira. Lembre-se de que estes valores são mínimos para descanso — nenhuma gaiola substitui várias horas diárias de voo e interação fora dela, fundamentais para a saúde física e mental do papagaio.</p>
  <h2>Erros comuns ao escolher a gaiola</h2>
  <p>Os erros mais frequentes são comprar uma gaiola pequena demais "para começar", optar por barras verticais que dificultam a trepa, escolher pintura ou soldas de baixa qualidade que libertam metais tóxicos, e colocar a gaiola num local isolado. Outro erro é encher o interior de acessórios ao ponto de a ave não conseguir abrir as asas. Prefira menos acessórios, mas de qualidade, e mantenha sempre uma zona livre para movimento.</p>
  <h2>Acompanhamento após a compra</h2>
  <p>Quando adquire um papagaio no nosso criadouro, ajudamo-lo a planear a instalação completa: dimensão da gaiola, tipo de poleiros, disposição dos comedouros e localização na casa. Este acompanhamento reduz o stress de adaptação da ave ao novo lar e evita gastos desnecessários em equipamento inadequado.</p>`,
      related: [
        ['/pt/comida-para-papagaios/', 'Comida para Papagaios'],
        ['/pt/brinquedos-naturais-para-papagaios/', 'Brinquedos Naturais'],
        ['/pt/papagaios-a-venda-portugal/', 'Papagaios à Venda'],
        ['/pt/contacto/', 'Contactar Criador']
      ],
      ctaTitle: 'Precisa de aconselhamento sobre gaiolas?',
      ctaText: 'Diga-nos a espécie e o espaço disponível e recomendamos a gaiola ideal sem compromisso.',
      ctaBtn: 'Solicitar Recomendação', contactUrl: '/pt/contacto/',
      footer: PT_FOOTER
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
  <p>Todos os nossos papagaios viajam em transportadoras homologadas, com documentação CITES e em condições que cumprem a normativa de bem-estar animal. Aconselhamos sempre o novo dono sobre como continuar a transportar a ave em segurança após a chegada.</p>
  <h2>Materiais e ventilação</h2>
  <p>As transportadoras rígidas em plástico resistente, com grelhas de ventilação laterais, são as mais seguras para papagaios: mantêm a forma em caso de impacto e permitem boa circulação de ar. Evite caixas de cartão ou tecido, que a ave destrói facilmente com o bico e que não protegem em caso de queda. Verifique sempre se os fechos são firmes — muitos papagaios aprendem a abrir portas mal fechadas.</p>
  <h2>Habituar a ave à transportadora</h2>
  <p>Uma transportadora não deve ser apresentada apenas no dia da viagem. Deixe-a acessível em casa durante alguns dias, com um prémio no interior, para que a ave a associe a uma experiência positiva. Esta habituação reduz drasticamente o stress nas deslocações ao veterinário e torna todo o processo mais seguro tanto para a ave como para o dono.</p>
  <h2>Viagens longas e clima</h2>
  <p>Em trajetos longos, faça paragens para oferecer água e fruta com elevado teor de humidade, e nunca exponha a transportadora ao sol direto nem a correntes de ar frio. No verão, viaje nas horas mais frescas; no inverno, proteja a ave das mudanças bruscas de temperatura entre o exterior e o interior do veículo.</p>`,
      related: [
        ['/pt/gaiolas-para-papagaios/', 'Gaiolas para Papagaios'],
        ['/pt/comida-para-papagaios/', 'Comida para Papagaios'],
        ['/pt/papagaios-a-venda-portugal/', 'Papagaios à Venda'],
        ['/pt/contacto/', 'Contactar Criador']
      ],
      ctaTitle: 'Dúvidas sobre o transporte do seu papagaio?',
      ctaText: 'Aconselhamos a transportadora ideal segundo a espécie e o tipo de viagem.',
      ctaBtn: 'Solicitar Aconselhamento', contactUrl: '/pt/contacto/',
      footer: PT_FOOTER
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
  <p>Une bonne cage doit inclure des perchoirs de diamètres variés (pour exercer les pattes), des mangeoires et abreuvoirs en inox, des jouets d'enrichissement et un bac inférieur facile à nettoyer. L'emplacement compte aussi : loin des courants d'air et de la cuisine, dans un espace social du foyer où l'oiseau se sent intégré à la famille.</p>
  <h2>Tailles minimales par gabarit</h2>
  <p>À titre de repère : pour les petits oiseaux (calopsittes, perruches), visez une cage d'au moins 60×40×60 cm ; pour les gabarits moyens (gris du Gabon, amazones), comptez 80×70×100 cm ; et pour les grands perroquets (aras, cacatoès), privilégiez des modèles à partir de 100×80×150 cm ou une volière. Ces dimensions sont des minimums pour le repos : aucune cage ne remplace plusieurs heures quotidiennes de vol et d'interaction en dehors, indispensables à l'équilibre physique et mental de l'oiseau.</p>
  <h2>Les erreurs fréquentes</h2>
  <p>Les erreurs les plus courantes sont d'acheter une cage trop petite « pour débuter », de choisir des barreaux verticaux qui empêchent l'oiseau de grimper, d'opter pour des peintures ou soudures de mauvaise qualité libérant des métaux toxiques, et d'installer la cage dans un endroit isolé. Surcharger l'intérieur d'accessoires au point d'empêcher le déploiement des ailes est également à éviter : préférez moins d'accessoires mais de qualité, en gardant toujours une zone de mouvement dégagée.</p>
  <h2>Notre accompagnement</h2>
  <p>Lorsque vous adoptez un perroquet dans notre élevage, nous vous aidons à planifier l'installation complète : dimensions de la cage, type de perchoirs, disposition des mangeoires et emplacement dans la maison. Cet accompagnement facilite l'adaptation de l'oiseau à son nouveau foyer et évite des dépenses inutiles en matériel inadapté.</p>`,
      related: [
        ['/fr/nourriture-pour-perroquets/', 'Nourriture pour Perroquets'],
        ['/fr/jouets-naturels-pour-perroquets/', 'Jouets Naturels'],
        ['/fr/perroquets-disponibles/', 'Perroquets Disponibles'],
        ['/fr/contact/', 'Contacter l\'Éleveur']
      ],
      ctaTitle: 'Besoin de conseils sur les cages ?',
      ctaText: 'Indiquez-nous l\'espèce et l\'espace disponible et nous vous recommandons la cage idéale sans engagement.',
      ctaBtn: 'Demander une Recommandation', contactUrl: '/fr/contact/',
      footer: FR_FOOTER
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
  <p>Tous nos perroquets voyagent dans des caisses homologuées, avec leur documentation CITES et dans des conditions conformes à la réglementation sur le bien-être animal. Nous conseillons toujours le nouveau propriétaire sur la manière de continuer à transporter l'oiseau en toute sécurité après son arrivée.</p>
  <h2>Matériaux et ventilation</h2>
  <p>Les caisses rigides en plastique résistant, dotées de grilles d'aération latérales, sont les plus sûres pour les perroquets : elles conservent leur forme en cas de choc et assurent une bonne circulation de l'air. Évitez les caisses en carton ou en tissu, que l'oiseau détruit rapidement avec son bec et qui n'offrent aucune protection en cas de chute. Vérifiez toujours la solidité des fermetures — de nombreux perroquets apprennent à ouvrir une porte mal verrouillée.</p>
  <h2>Habituer l'oiseau à la caisse</h2>
  <p>Une caisse de transport ne doit pas être présentée uniquement le jour du départ. Laissez-la accessible à la maison pendant quelques jours, avec une friandise à l'intérieur, afin que l'oiseau l'associe à une expérience positive. Cette habituation réduit considérablement le stress lors des visites chez le vétérinaire et rend chaque déplacement plus sûr pour l'oiseau comme pour son propriétaire.</p>
  <h2>Trajets longs et climat</h2>
  <p>Sur les longs trajets, prévoyez des pauses pour proposer de l'eau et des fruits riches en eau, et n'exposez jamais la caisse au soleil direct ni aux courants d'air froid. En été, voyagez aux heures les plus fraîches ; en hiver, protégez l'oiseau des écarts brusques de température entre l'extérieur et l'habitacle du véhicule.</p>`,
      related: [
        ['/fr/cages-pour-perroquets/', 'Cages pour Perroquets'],
        ['/fr/nourriture-pour-perroquets/', 'Nourriture pour Perroquets'],
        ['/fr/perroquets-disponibles/', 'Perroquets Disponibles'],
        ['/fr/contact/', 'Contacter l\'Éleveur']
      ],
      ctaTitle: 'Des questions sur le transport de votre perroquet ?',
      ctaText: 'Nous vous conseillons la caisse idéale selon l\'espèce et le type de voyage.',
      ctaBtn: 'Demander un Conseil', contactUrl: '/fr/contact/',
      footer: FR_FOOTER
    }
  }
];

for (const { file, data } of pages) {
  fs.mkdirSync(file.replace(/\/index\.html$/, ''), { recursive: true });
  fs.writeFileSync(file, page(data));
  console.log('wrote', file);
}
console.log('Placeholders done.');
