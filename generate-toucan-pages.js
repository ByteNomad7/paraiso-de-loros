#!/usr/bin/env node
/**
 * Phase 5 — Toucan Pages
 * Generates /tucanes/index.html and /fr/toucans/index.html
 * Features: video, 9 real photos, full species guide, FAQ, schemas
 */
const fs = require('fs');
const path = require('path');

const TOUCAN_IMAGES = [
  { file:'/images/shinda-daphne-01.webp', altEs:'Tucán Shinda de pico quilla en el criadero Paraíso de Aves', altFr:'Toucan Shinda à bec caréné à l\'élevage Paraíso de Aves', capEs:'Shinda — nuestro tucán de pico quilla nacido en el criadero', capFr:'Shinda — notre toucan à bec caréné né dans l\'élevage', featured:true },
  { file:'/images/shinda-daphne-02.webp', altEs:'Daphne la tucana posada en rama natural en el criadero', altFr:'Daphne la toucan perchée sur une branche naturelle', capEs:'Daphne — nuestra tucana hembra, de carácter dulce y curioso', capFr:'Daphne — notre toucan femelle, au caractère doux et curieux' },
  { file:'/images/shinda-daphne-03.webp', altEs:'Primer plano del colorido pico del tucán en el criadero', altFr:'Gros plan du bec coloré du toucan dans l\'élevage', capEs:'El pico del tucán — una obra maestra de la naturaleza', capFr:'Le bec du toucan — un chef-d\'œuvre de la nature' },
  { file:'/images/shinda-daphne-04.webp', altEs:'Pareja de tucanes Shinda y Daphne juntos en el criadero', altFr:'Couple de toucans Shinda et Daphne ensemble dans l\'élevage', capEs:'Shinda y Daphne — nuestra pareja reproductora de tucanes', capFr:'Shinda et Daphne — notre couple de toucans reproducteurs', featured:true },
  { file:'/images/gallery/aves-disponibles-tucan-pico-keel-01.jpg', altEs:'Tucán de pico quilla (Ramphastos sulfuratus) del criadero', altFr:'Toucan à bec caréné (Ramphastos sulfuratus) de l\'élevage', capEs:'Tucán keel-bill — el pico más colorido del reino animal', capFr:'Toucan à bec caréné — le bec le plus coloré du règne animal' },
  { file:'/images/gallery/aves-disponibles-tucan-bano-09.jpg', altEs:'Tucán disfrutando del baño en el criadero Paraíso de Aves', altFr:'Toucan profitant du bain à l\'élevage Paraíso de Aves', capEs:'Baño diario — los tucanes son apasionados del agua', capFr:'Bain quotidien — les toucans adorent l\'eau', featured:true },
  { file:'/images/gallery/aves-disponibles-tucan-ducha-17.jpg', altEs:'Tucán bajo la ducha de agua en el criadero', altFr:'Toucan sous la douche d\'eau dans l\'élevage', capEs:'Ducha refrescante — rutina de higiene esencial', capFr:'Douche rafraîchissante — routine d\'hygiène essentielle' },
  { file:'/images/gallery/aves-disponibles-tucan-tropical-exterior-18.jpg', altEs:'Tucán en espacio exterior tropicalizado del criadero', altFr:'Toucan dans un espace extérieur tropicalisé de l\'élevage', capEs:'Ambientes exteriores — diseñados para replicar su hábitat natural', capFr:'Espaces extérieurs — conçus pour reproduire leur habitat naturel' },
  { file:'/images/gallery/aves-disponibles-tucan-retrato-primer-plano-20.jpg', altEs:'Retrato de primer plano del tucán mostrando plumaje y pico', altFr:'Portrait en gros plan du toucan montrant plumage et bec', capEs:'Retrato del tucán — belleza natural sin igual', capFr:'Portrait du toucan — beauté naturelle sans égale' },
];

function commonCSS() {
  return `<style>
:root{--primary:#1F3D2B;--secondary:#2B533C;--gold:#D4A94F;--gold-light:#E0B75F;--bg:#F8F5F0;--text:#1A1A1A;--muted:#5C5C5C;--border:#E7E0D2;--white:#fff;--radius:12px;--shadow:0 4px 24px rgba(0,0,0,.10);}
*{margin:0;padding:0;box-sizing:border-box;}html{scroll-behavior:smooth;}
body{font-family:'Open Sans',sans-serif;background:var(--bg);color:var(--text);line-height:1.75;font-size:16px;}
h1,h2,h3,h4{font-family:'Poppins',sans-serif;font-weight:700;line-height:1.25;}
a{color:var(--primary);text-decoration:none;}a:hover{color:var(--gold);}
img{max-width:100%;height:auto;display:block;}
.topbar{background:var(--primary);position:sticky;top:0;z-index:100;padding:0 5%;}
.topbar-inner{display:flex;align-items:center;justify-content:space-between;height:60px;max-width:1200px;margin:0 auto;}
.logo{color:#fff;font-family:'Poppins',sans-serif;font-weight:700;font-size:1.1rem;display:flex;align-items:center;gap:8px;}
nav a{color:rgba(255,255,255,.85);margin-left:18px;font-size:.88rem;font-weight:500;transition:color .2s;}
nav a:hover,nav a.active{color:var(--gold);}
.lang-sw{display:flex;align-items:center;gap:5px;margin-left:18px;}
.lang-sw a{font-size:.78rem;font-weight:600;color:rgba(255,255,255,.6);padding:3px 7px;border-radius:4px;}
.lang-sw a.active{color:var(--gold);background:rgba(212,169,79,.15);}
.lang-sw span{color:rgba(255,255,255,.25);}
.breadcrumb-bar{background:linear-gradient(to right,var(--primary),var(--secondary));padding:10px 5%;border-bottom:1px solid rgba(255,255,255,.08);}
.breadcrumb-bar .inner{max-width:1200px;margin:0 auto;font-size:.82rem;color:rgba(255,255,255,.65);}
.breadcrumb-bar .inner a{color:rgba(255,255,255,.75);}
.breadcrumb-bar .inner a:hover{color:var(--gold);}
.breadcrumb-bar .inner span{margin:0 6px;opacity:.4;}
/* Hero */
.hero{background:linear-gradient(135deg,#0d2218 0%,var(--primary) 40%,#0d3320 100%);padding:72px 5% 56px;color:#fff;position:relative;overflow:hidden;}
.hero::before{content:'';position:absolute;top:0;right:0;width:50%;height:100%;background:radial-gradient(ellipse at right,rgba(212,169,79,.08) 0%,transparent 70%);}
.hero-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 420px;gap:56px;align-items:center;}
@media(max-width:900px){.hero-inner{grid-template-columns:1fr;}.hero-img{display:none;}}
.hero .badge{display:inline-block;background:rgba(212,169,79,.18);border:1px solid rgba(212,169,79,.45);color:var(--gold);padding:5px 20px;border-radius:30px;font-size:.78rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:18px;}
.hero h1{font-size:clamp(2rem,5vw,3rem);color:#fff;margin-bottom:14px;position:relative;}
.hero h1 em{color:var(--gold);font-style:normal;}
.hero p{font-size:1.02rem;color:rgba(255,255,255,.88);margin-bottom:24px;position:relative;}
.hero-img img{border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,.4);width:100%;height:380px;object-fit:cover;}
.trust-pills{display:flex;flex-wrap:wrap;gap:10px;position:relative;}
.trust-pills span{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.18);color:#fff;padding:6px 16px;border-radius:20px;font-size:.82rem;font-weight:600;}
/* Page layout */
.page-wrap{max-width:1200px;margin:0 auto;padding:56px 5%;display:grid;grid-template-columns:1fr 300px;gap:48px;align-items:start;}
@media(max-width:900px){.page-wrap{grid-template-columns:1fr;}}
.main-col h2{font-size:1.5rem;color:var(--primary);margin:40px 0 16px;padding-bottom:10px;border-bottom:2px solid var(--gold);display:inline-block;}
.main-col h2:first-child{margin-top:0;}
.main-col p{margin-bottom:14px;color:#2a2a2a;font-size:.97rem;}
.main-col ul{padding-left:20px;margin-bottom:16px;}
.main-col ul li{margin-bottom:6px;color:#2a2a2a;font-size:.97rem;}
.main-col h3{font-size:1.1rem;color:var(--secondary);margin:20px 0 8px;}
/* Video */
.video-wrap{border-radius:14px;overflow:hidden;margin:32px 0;box-shadow:var(--shadow);}
.video-wrap video{width:100%;display:block;border-radius:14px;}
.video-caption{background:var(--primary);color:rgba(255,255,255,.8);padding:10px 16px;font-size:.83rem;border-radius:0 0 14px 14px;margin-top:-4px;}
/* Gallery */
.photo-gallery{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:24px 0 36px;}
@media(max-width:700px){.photo-gallery{grid-template-columns:repeat(2,1fr);}}
.gallery-thumb{position:relative;overflow:hidden;border-radius:10px;cursor:pointer;aspect-ratio:4/3;background:var(--border);}
.gallery-thumb img{width:100%;height:100%;object-fit:cover;transition:transform .4s ease;}
.gallery-thumb:hover img{transform:scale(1.06);}
.gallery-thumb .gh-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.6) 0%,transparent 60%);opacity:0;transition:opacity .3s;display:flex;align-items:flex-end;padding:10px;}
.gallery-thumb:hover .gh-overlay{opacity:1;}
.gallery-thumb .gh-cap{color:#fff;font-size:.76rem;font-weight:600;line-height:1.3;}
.gallery-thumb.featured::after{content:'⭐';position:absolute;top:8px;right:8px;font-size:.9rem;}
/* Info boxes */
.info-box{background:var(--white);border:1px solid var(--border);border-radius:var(--radius);padding:28px;margin-bottom:24px;}
.info-box h3{font-size:1rem;color:var(--primary);margin-bottom:14px;display:flex;align-items:center;gap:8px;}
.info-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:14px;margin-top:12px;}
.info-item{background:var(--bg);border-radius:8px;padding:12px;text-align:center;}
.info-item .val{font-family:'Poppins',sans-serif;font-weight:700;font-size:1.1rem;color:var(--primary);}
.info-item .lbl{font-size:.76rem;color:var(--muted);margin-top:3px;}
/* Alert box */
.alert-box{background:rgba(212,169,79,.08);border:1px solid rgba(212,169,79,.3);border-left:4px solid var(--gold);border-radius:0 10px 10px 0;padding:16px 20px;margin:24px 0;}
.alert-box p{font-size:.9rem;color:#2a2a2a;margin:0;}
/* FAQ */
.faq-item{border:1px solid var(--border);border-radius:10px;margin-bottom:10px;overflow:hidden;}
.faq-q{background:var(--white);padding:16px 20px;font-family:'Poppins',sans-serif;font-weight:600;font-size:.95rem;color:var(--primary);cursor:pointer;display:flex;justify-content:space-between;align-items:center;}
.faq-q::after{content:'▾';color:var(--gold);transition:transform .3s;flex-shrink:0;}
.faq-item.open .faq-q::after{transform:rotate(180deg);}
.faq-a{background:var(--bg);padding:0 20px;max-height:0;overflow:hidden;transition:max-height .35s ease,padding .35s ease;font-size:.91rem;color:#2a2a2a;}
.faq-item.open .faq-a{max-height:400px;padding:14px 20px;}
/* Sidebar */
.sidebar-box{background:var(--white);border:1px solid var(--border);border-radius:var(--radius);padding:22px;margin-bottom:18px;}
.sidebar-box h4{font-size:.92rem;color:var(--primary);margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid var(--gold);display:inline-block;}
.sidebar-box ul{list-style:none;padding:0;}
.sidebar-box ul li{padding:5px 0;border-bottom:1px solid var(--border);font-size:.85rem;}
.sidebar-box ul li:last-child{border-bottom:none;}
.sidebar-box ul li a{color:var(--muted);}
.sidebar-box ul li a:hover{color:var(--primary);}
/* CTA */
.cta-block{background:linear-gradient(135deg,var(--primary),var(--secondary));border-radius:var(--radius);padding:40px;text-align:center;color:#fff;margin-top:48px;}
.cta-block h2{font-size:1.7rem;color:#fff;margin-bottom:10px;}
.cta-block p{color:rgba(255,255,255,.85);margin-bottom:24px;}
.btn-gold{display:inline-block;background:var(--gold);color:var(--primary);padding:13px 32px;border-radius:30px;font-family:'Poppins',sans-serif;font-weight:700;font-size:.95rem;transition:all .2s;}
.btn-gold:hover{background:var(--gold-light);transform:translateY(-2px);box-shadow:0 6px 20px rgba(212,169,79,.4);}
.btn-white{display:inline-block;border:2px solid rgba(255,255,255,.4);color:#fff;padding:12px 28px;border-radius:30px;font-family:'Poppins',sans-serif;font-weight:600;font-size:.9rem;margin-left:10px;transition:all .2s;}
.btn-white:hover{border-color:#fff;background:rgba(255,255,255,.1);color:#fff;}
/* Lightbox */
.lb-overlay{position:fixed;inset:0;background:rgba(0,0,0,.95);z-index:9999;display:none;align-items:center;justify-content:center;}
.lb-overlay.open{display:flex;}
.lb-img{max-width:90vw;max-height:85vh;object-fit:contain;border-radius:8px;}
.lb-close{position:fixed;top:18px;right:22px;background:none;border:none;color:#fff;font-size:2rem;cursor:pointer;opacity:.8;z-index:10001;}
.lb-close:hover{opacity:1;}
.lb-nav{position:fixed;top:50%;transform:translateY(-50%);background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);color:#fff;width:46px;height:46px;border-radius:50%;font-size:1.4rem;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:10001;}
.lb-nav:hover{background:rgba(255,255,255,.2);}
.lb-prev{left:14px;}.lb-next{right:14px;}
.lb-cap{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);color:rgba(255,255,255,.8);font-size:.85rem;text-align:center;max-width:600px;z-index:10001;padding:0 20px;}
/* Footer */
footer{background:var(--primary);color:rgba(255,255,255,.65);padding:40px 5% 22px;margin-top:80px;}
.footer-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:36px;margin-bottom:32px;}
.footer-col h4{color:#fff;font-size:.92rem;margin-bottom:12px;}
.footer-col ul{list-style:none;}
.footer-col ul li{margin-bottom:7px;}
.footer-col ul li a{font-size:.83rem;color:rgba(255,255,255,.6);}
.footer-col ul li a:hover{color:var(--gold);}
.footer-bottom{border-top:1px solid rgba(255,255,255,.1);padding-top:18px;text-align:center;font-size:.78rem;color:rgba(255,255,255,.35);}
</style>`;
}

function buildToucanPage(lang) {
  const isEs = lang === 'es';
  const base  = isEs ? '' : '/fr';

  const title    = isEs
    ? 'Tucanes en Paraíso de Aves | Crianza, Fotos y Guía Completa'
    : 'Toucans à Paraíso de Aves | Élevage, Photos et Guide Complet';
  const desc     = isEs
    ? 'Conoce a Shinda y Daphne, nuestros tucanes de pico quilla. Fotos reales, vídeo, guía de cuidados, alimentación, instalaciones y preguntas frecuentes.'
    : 'Découvrez Shinda et Daphne, nos toucans à bec caréné. Photos réelles, vidéo, guide des soins, alimentation, installations et questions fréquentes.';
  const canonical = isEs
    ? 'https://www.paraisodeaves.com/tucanes/'
    : 'https://www.paraisodeaves.com/fr/toucans/';

  // Schema
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": canonical,
        "url": canonical,
        "name": title,
        "description": desc,
        "inLanguage": isEs ? "es-ES" : "fr-FR",
        "publisher": {"@type":"Organization","name":"Paraíso de Aves","url":"https://www.paraisodeaves.com/"},
        "breadcrumb": {
          "@type":"BreadcrumbList",
          "itemListElement":[
            {"@type":"ListItem","position":1,"name":isEs?"Inicio":"Accueil","item":isEs?"https://www.paraisodeaves.com/":"https://www.paraisodeaves.com/fr/"},
            {"@type":"ListItem","position":2,"name":isEs?"Tucanes":"Toucans","item":canonical}
          ]
        }
      },
      {
        "@type": "Article",
        "headline": title,
        "description": desc,
        "image": "https://www.paraisodeaves.com/images/shinda-daphne-01.webp",
        "author": {"@type":"Organization","name":"Paraíso de Aves"},
        "publisher": {"@type":"Organization","name":"Paraíso de Aves","logo":{"@type":"ImageObject","url":"https://www.paraisodeaves.com/favicon.ico"}},
        "datePublished": "2026-07-12",
        "dateModified": "2026-07-12",
        "inLanguage": isEs ? "es-ES" : "fr-FR"
      },
      {
        "@type": "FAQPage",
        "mainEntity": isEs ? [
          {"@type":"Question","name":"¿Los tucanes son buenas mascotas?","acceptedAnswer":{"@type":"Answer","text":"Los tucanes son animales exóticos que requieren experiencia, espacios amplios y una dieta muy específica (frutas frescas principalmente). Son fascinantes pero exigentes — no recomendados para principiantes. En Paraíso de Aves los criamos con amor y expertise."}},
          {"@type":"Question","name":"¿Qué comen los tucanes?","acceptedAnswer":{"@type":"Answer","text":"Los tucanes son principalmente frugívoros: frutas tropicales (papaya, mango, maracuyá, banana) constituyen el 70-80% de su dieta. Complementan con insectos, huevos, pequeños lagartos y occasionally aves pequeñas en la naturaleza. En cautividad, se les ofrece fruta fresca, pellets específicos y suplementos proteicos."}},
          {"@type":"Question","name":"¿Cuánto vive un tucán?","acceptedAnswer":{"@type":"Answer","text":"En cautividad bien cuidada, los tucanes viven entre 15 y 25 años. La longevidad depende de la calidad de la alimentación, el espacio disponible, la estimulación mental y los cuidados veterinarios regulares."}},
          {"@type":"Question","name":"¿Es legal tener un tucán en España?","acceptedAnswer":{"@type":"Answer","text":"En España, los tucanes no están incluidos en las Anexos I de CITES y pueden tenerse como mascotas con documentación básica. Sin embargo, debes asegurarte de que el animal procede de cría en cautividad legal y cuenta con documentación. Consulta siempre con la autoridad ambiental local."}},
          {"@type":"Question","name":"¿Puedo visitar vuestros tucanes en el criadero?","acceptedAnswer":{"@type":"Answer","text":"Sí, aceptamos visitas concertadas al criadero en Llíria, Valencia. Contacta con nosotros por email en paraisodeloros@gmail.com para organizar tu visita y conocer personalmente a Shinda y Daphne."}},
          {"@type":"Question","name":"¿Vendéis tucanes?","acceptedAnswer":{"@type":"Answer","text":"Actualmente Shinda y Daphne son nuestra pareja reproductora. En función de la disponibilidad de crías, podemos valorar la cesión de ejemplares criados a mano. Contacta con nosotros para información actualizada sobre disponibilidad."}},
          {"@type":"Question","name":"¿Qué tamaño de jaula necesita un tucán?","acceptedAnswer":{"@type":"Answer","text":"Un tucán necesita un espacio de mínimo 3×2×2 metros, preferiblemente un aviario exterior climatizado de mayor tamaño. Necesitan espacio para saltar (no vuelan bien entre ramas cercanas), varias perchas a distintas alturas, y zona de baño obligatoria."}},
          {"@type":"Question","name":"¿Hablan los tucanes?","acceptedAnswer":{"@type":"Answer","text":"No. Los tucanes no imitan el habla humana como los loros. Producen sonidos naturales como croaks, silbidos y ruidos tipo rana. Su vínculo con el cuidador es más similar al de una ave rapaz bien socializada — confiado y tranquilo, pero no hablador."}}
        ] : [
          {"@type":"Question","name":"Les toucans sont-ils de bons animaux de compagnie ?","acceptedAnswer":{"@type":"Answer","text":"Les toucans sont des animaux exotiques qui requièrent de l'expérience, de grands espaces et une alimentation très spécifique (fruits frais principalement). Ils sont fascinants mais exigeants — non recommandés aux débutants. À Paraíso de Aves, nous les élevons avec amour et expertise."}},
          {"@type":"Question","name":"Que mangent les toucans ?","acceptedAnswer":{"@type":"Answer","text":"Les toucans sont principalement frugivores : les fruits tropicaux (papaye, mangue, fruit de la passion, banane) constituent 70-80 % de leur alimentation. En captivité, on leur propose des fruits frais quotidiens, des granulés spécifiques et des compléments protéiques."}},
          {"@type":"Question","name":"Combien de temps vit un toucan ?","acceptedAnswer":{"@type":"Answer","text":"En captivité bien gérée, les toucans vivent entre 15 et 25 ans. La longévité dépend de la qualité de l'alimentation, de l'espace disponible, de la stimulation mentale et des soins vétérinaires réguliers."}},
          {"@type":"Question","name":"Est-il légal d'avoir un toucan en France ?","acceptedAnswer":{"@type":"Answer","text":"En France, la plupart des espèces de toucans ne sont pas en Annexe I de la CITES et peuvent être détenues avec une documentation basique attestant de la naissance en captivité légale. Consultez la DREAL de votre région pour les exigences spécifiques."}},
          {"@type":"Question","name":"Puis-je visiter vos toucans à l'élevage ?","acceptedAnswer":{"@type":"Answer","text":"Oui, nous acceptons les visites sur rendez-vous à notre élevage de Llíria, en Espagne. Contactez-nous par email à paraisodeloros@gmail.com pour organiser votre visite et rencontrer Shinda et Daphne en personne."}},
          {"@type":"Question","name":"Vendez-vous des toucans ?","acceptedAnswer":{"@type":"Answer","text":"Actuellement, Shinda et Daphne sont notre couple reproducteur. Selon la disponibilité des poussins, nous pouvons envisager la cession d'exemplaires élevés à la main. Contactez-nous pour les disponibilités actuelles."}},
          {"@type":"Question","name":"Quelle taille de cage faut-il pour un toucan ?","acceptedAnswer":{"@type":"Answer","text":"Un toucan a besoin d'un espace d'au moins 3×2×2 mètres, de préférence une grande volière extérieure climatisée. Ils ont besoin d'espace pour sauter, de plusieurs perchoirs à différentes hauteurs et d'un espace de bain obligatoire."}},
          {"@type":"Question","name":"Les toucans parlent-ils ?","acceptedAnswer":{"@type":"Answer","text":"Non. Les toucans n'imitent pas la parole humaine comme les perroquets. Ils produisent des sons naturels — croassements, sifflements, sons grenouille. Leur lien avec le soigneur ressemble davantage à celui d'un rapace bien socialisé : confiant et calme, mais non bavard."}}
        ]
      }
    ]
  };

  const photos = TOUCAN_IMAGES.map((img, i) => `<div class="gallery-thumb${img.featured?' featured':''}" data-src="${img.file}" data-cap="${(isEs?img.capEs:img.capFr).replace(/"/g,'&quot;')}" role="button" tabindex="0" aria-label="${(isEs?img.altEs:img.altFr).replace(/"/g,'&quot;')}">
              <img src="${img.file}" alt="${(isEs?img.altEs:img.altFr).replace(/"/g,'&quot;')}" loading="${i===0?'eager':'lazy'}" width="800" height="600" decoding="async"/>
              <div class="gh-overlay"><div class="gh-cap">${isEs?img.capEs:img.capFr}</div></div>
            </div>`).join('\n            ');

  const faqItems = isEs ? [
    {q:'¿Los tucanes son buenas mascotas?', a:'Los tucanes son animales exóticos que requieren experiencia, espacios amplios y una dieta muy específica. Son fascinantes pero exigentes — no recomendados para principiantes. En Paraíso de Aves los criamos con amor y amplia experiencia.'},
    {q:'¿Qué comen los tucanes?', a:'Los tucanes son principalmente frugívoros: frutas tropicales (papaya, mango, maracuyá, banana) constituyen el 70-80% de su dieta. Complementan con insectos y proteínas. En cautividad se les ofrece fruta fresca diaria, pellets específicos y suplementos.'},
    {q:'¿Cuánto vive un tucán?', a:'En cautividad bien cuidada, los tucanes viven entre 15 y 25 años. La longevidad depende de la calidad de la alimentación, el espacio disponible, la estimulación mental y los cuidados veterinarios regulares.'},
    {q:'¿Es legal tener un tucán en España?', a:'En España, la mayoría de tucanes no están en Anexo I de CITES y pueden tenerse con documentación básica de cría en cautividad legal. Consulta siempre con la autoridad ambiental de tu comunidad autónoma.'},
    {q:'¿Hablan los tucanes?', a:'No. Los tucanes no imitan el habla humana como los loros. Producen sonidos naturales como croaks y silbidos. Su vínculo con el cuidador es profundo pero diferente al de un loro.'},
    {q:'¿Puedo visitar vuestros tucanes en el criadero?', a:'Sí, aceptamos visitas concertadas al criadero en Llíria, Valencia. Contacta con nosotros por email en paraisodeloros@gmail.com para organizar tu visita.'},
    {q:'¿Qué tamaño de jaula necesita un tucán?', a:'Un tucán necesita un espacio mínimo de 3×2×2 metros, preferiblemente un aviario exterior de mayor dimensión. Necesitan zona de baño obligatoria y perchas a distintas alturas.'},
    {q:'¿Vendéis tucanes?', a:'Shinda y Daphne son nuestra pareja reproductora. En función de disponibilidad de crías criadas a mano, podemos valorar cesión. Contacta para información actualizada.'}
  ] : [
    {q:'Les toucans sont-ils de bons animaux de compagnie ?', a:'Les toucans sont des animaux exotiques qui nécessitent de l\'expérience et de grands espaces. Fascinants mais exigeants — non recommandés aux débutants. À Paraíso de Aves nous les élevons avec expertise.'},
    {q:'Que mangent les toucans ?', a:'Les toucans sont principalement frugivores : fruits tropicaux (papaye, mangue, banane) constituent 70-80 % de leur alimentation. En captivité : fruits frais quotidiens, granulés spécifiques et compléments protéiques.'},
    {q:'Combien de temps vit un toucan ?', a:'En captivité bien gérée, les toucans vivent entre 15 et 25 ans selon la qualité des soins, de l\'alimentation et de l\'environnement.'},
    {q:'Est-il légal d\'avoir un toucan en France ?', a:'La plupart des espèces de toucans ne sont pas en Annexe I CITES. Une attestation de naissance en captivité légale suffit généralement. Consultez votre DREAL pour les exigences locales.'},
    {q:'Les toucans parlent-ils ?', a:'Non. Les toucans n\'imitent pas la parole humaine. Ils produisent des sons naturels — croassements, sifflements. Leur lien avec leur soigneur est fort mais différent des perroquets.'},
    {q:'Puis-je visiter vos toucans ?', a:'Oui, visites sur rendez-vous à notre élevage de Llíria, Espagne. Écrivez-nous à paraisodeloros@gmail.com.'},
    {q:'Quelle taille de cage pour un toucan ?', a:'Minimum 3×2×2 mètres, de préférence une grande volière extérieure climatisée, avec bain obligatoire et plusieurs perchoirs.'},
    {q:'Vendez-vous des toucans ?', a:'Shinda et Daphne sont notre couple reproducteur. Contactez-nous pour les disponibilités actuelles de poussins élevés à la main.'}
  ];

  const faqHtml = faqItems.map(f => `<div class="faq-item">
          <div class="faq-q">${f.q}</div>
          <div class="faq-a">${f.a}</div>
        </div>`).join('\n        ');

  return `<!DOCTYPE html>
<html lang="${isEs?'es-ES':'fr-FR'}" dir="ltr">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-4007YHH4H9"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-4007YHH4H9');</script>
  <title>${title}</title>
  <meta name="description" content="${desc}"/>
  <meta name="robots" content="index, follow"/>
  <link rel="canonical" href="${canonical}"/>
  <link rel="alternate" hreflang="${isEs?'es-ES':'fr-FR'}" href="${canonical}"/>
  <link rel="alternate" hreflang="${isEs?'fr-FR':'es-ES'}" href="https://www.paraisodeaves.com${isEs?'/fr/toucans/':'/tucanes/'}"/>
  <link rel="alternate" hreflang="x-default" href="https://www.paraisodeaves.com/"/>
  <link rel="preload" as="image" href="/images/shinda-daphne-01.webp" fetchpriority="high"/>
  <meta property="og:type" content="article"/>
  <meta property="og:locale" content="${isEs?'es_ES':'fr_FR'}"/>
  <meta property="og:title" content="${title}"/>
  <meta property="og:description" content="${desc}"/>
  <meta property="og:url" content="${canonical}"/>
  <meta property="og:image" content="https://www.paraisodeaves.com/images/shinda-daphne-01.webp"/>
  <meta property="og:site_name" content="Paraíso de Aves"/>
  <meta name="twitter:card" content="summary_large_image"/>
  <link rel="icon" href="/favicon.ico"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
  ${commonCSS()}
</head>
<body>
<nav class="topbar">
  <div class="topbar-inner">
    <a href="https://www.paraisodeaves.com${base}/" class="logo"><span>🦜</span> Paraíso de Aves</a>
    <nav>
      <a href="https://www.paraisodeaves.com${base}/${isEs?'aves-disponibles':'perroquets-disponibles'}/">${isEs?'Disponibles':'Disponibles'}</a>
      <a href="https://www.paraisodeaves.com${base}/especies/">${isEs?'Especies':'Espèces'}</a>
      <a href="https://www.paraisodeaves.com${base}/${isEs?'galeria':'galerie'}/">${isEs?'Galería':'Galerie'}</a>
      <a href="https://www.paraisodeaves.com${base}/contact${isEs?'o':''}/">${isEs?'Contacto':'Contact'}</a>
    </nav>
    <div class="lang-sw">
      <a href="https://www.paraisodeaves.com/tucanes/" ${isEs?'class="active"':''}>ES</a>
      <span>|</span>
      <a href="https://www.paraisodeaves.com/fr/toucans/" ${!isEs?'class="active"':''}>FR</a>
    </div>
  </div>
</nav>

<div class="breadcrumb-bar">
  <div class="inner">
    <a href="https://www.paraisodeaves.com${base}/">${isEs?'Inicio':'Accueil'}</a>
    <span>›</span>
    <strong style="color:var(--gold);">${isEs?'Tucanes':'Toucans'}</strong>
  </div>
</div>

<section class="hero">
  <div class="hero-inner">
    <div>
      <div class="badge">🌿 ${isEs?'PARAÍSO DE AVES':'PARAÍSO DE AVES'}</div>
      <h1>${isEs?'Conoce a <em>Shinda y Daphne</em>':'Rencontrez <em>Shinda et Daphne</em>'}</h1>
      <p>${isEs?'Nuestros tucanes de pico quilla (Ramphastos sulfuratus), criados a mano en nuestro criadero de Llíria, Valencia. Dos personalidades únicas con una historia que te va a fascinar.':'Nos toucans à bec caréné (Ramphastos sulfuratus), élevés à la main dans notre élevage de Llíria, Espagne. Deux personnalités uniques avec une histoire qui vous fascinera.'}</p>
      <div class="trust-pills">
        <span>📸 9 ${isEs?'fotos reales':'photos réelles'}</span>
        <span>🎬 ${isEs?'Vídeo exclusivo':'Vidéo exclusive'}</span>
        <span>🌿 ${isEs?'Criados a mano':'Élevés à la main'}</span>
        <span>✅ ${isEs?'Guía completa':'Guide complet'}</span>
      </div>
    </div>
    <div class="hero-img">
      <img src="/images/shinda-daphne-01.webp" alt="${isEs?'Tucán Shinda en el criadero Paraíso de Aves':'Toucan Shinda à l\'élevage Paraíso de Aves'}" width="420" height="380" loading="eager" fetchpriority="high"/>
    </div>
  </div>
</section>

<div class="page-wrap">
  <div class="main-col">

    <h2>${isEs?'Shinda y Daphne — Nuestra Pareja de Tucanes':'Shinda et Daphne — Notre Couple de Toucans'}</h2>
    <p>${isEs?'Shinda es nuestro macho de tucán keel-bill (Ramphastos sulfuratus), una especie reconocible al instante por su enorme pico multicolor que puede medir hasta 20 cm de longitud — casi un tercio del tamaño total del ave. Daphne, nuestra hembra, tiene el mismo pico espectacular pero un carácter más tranquilo y contemplativo. Juntos forman una de las parejas más fotogénicas del criadero.':'Shinda est notre mâle toucan à bec caréné (Ramphastos sulfuratus), une espèce reconnaissable instantanément par son énorme bec multicolore pouvant mesurer jusqu\'à 20 cm — presque un tiers de la taille totale de l\'oiseau. Daphne, notre femelle, possède le même bec spectaculaire mais un caractère plus calme et contemplatif. Ensemble, ils forment l\'un des couples les plus photogéniques de l\'élevage.'}</p>

    <p>${isEs?'Ambos fueron criados a mano desde muy pequeños en nuestro criadero, lo que los convierte en animales completamente sociabilizados con los humanos. Se acercan voluntariamente a los cuidadores, toleran bien la manipulación y disfrutan del contacto diario. Su rutina incluye baños de agua, sesiones de fruta fresca y tiempo de vuelo libre supervisado.':'Tous deux ont été élevés à la main dès leur plus jeune âge dans notre élevage, ce qui en fait des animaux complètement socialisés avec les humains. Ils s\'approchent volontairement des soigneurs, tolèrent bien la manipulation et apprécient le contact quotidien. Leur routine comprend des bains d\'eau, des sessions de fruits frais et du temps de vol libre supervisé.'}</p>

    <!-- VIDEO SECTION -->
    <h2>${isEs?'Vídeo: Un Día con Shinda y Daphne':'Vidéo : Une Journée avec Shinda et Daphne'}</h2>
    <div class="video-wrap">
      <video controls preload="none" poster="/images/shinda-daphne-01.webp" width="100%" aria-label="${isEs?'Vídeo de los tucanes Shinda y Daphne en el criadero':'Vidéo des toucans Shinda et Daphne dans l\'élevage'}">
        <source src="/images/shinda-daphne.mp4" type="video/mp4"/>
        ${isEs?'Tu navegador no soporta vídeo HTML5.':'Votre navigateur ne supporte pas la vidéo HTML5.'}
      </video>
      <div class="video-caption">▶ ${isEs?'Shinda y Daphne en su día a día en el criadero Paraíso de Aves — Llíria, Valencia':'Shinda et Daphne au quotidien dans l\'élevage Paraíso de Aves — Llíria, Espagne'}</div>
    </div>

    <!-- PHOTO GALLERY -->
    <h2>📸 ${isEs?'Galería de Fotos':'Galerie Photos'}</h2>
    <p>${isEs?'Todas las fotos son reales, tomadas en nuestro criadero. Sin filtros, sin edición artificial.':'Toutes les photos sont réelles, prises dans notre élevage. Sans filtres, sans retouche artificielle.'}</p>
    <div class="photo-gallery">
      ${photos}
    </div>
    <p style="text-align:center;margin-bottom:32px;"><a href="https://www.paraisodeaves.com${base}/${isEs?'galeria':'galerie'}/" style="color:var(--primary);font-weight:700;font-size:.9rem;">→ ${isEs?'Ver galería completa del criadero':'Voir la galerie complète de l\'élevage'}</a></p>

    <!-- SPECIES INFO -->
    <h2>🌿 ${isEs?'El Tucán de Pico Quilla — Ramphastos sulfuratus':'Le Toucan à Bec Caréné — Ramphastos sulfuratus'}</h2>
    <div class="info-box">
      <h3>📋 ${isEs?'Datos de la especie':'Données de l\'espèce'}</h3>
      <div class="info-row">
        <div class="info-item"><div class="val">50-60 cm</div><div class="lbl">${isEs?'Longitud total':'Longueur totale'}</div></div>
        <div class="info-item"><div class="val">130-160 g</div><div class="lbl">${isEs?'Peso adulto':'Poids adulte'}</div></div>
        <div class="info-item"><div class="val">15-25 ${isEs?'años':'ans'}</div><div class="lbl">${isEs?'Esperanza de vida':'Espérance de vie'}</div></div>
        <div class="info-item"><div class="val">${isEs?'Tropical':'Tropical'}</div><div class="lbl">${isEs?'Hábitat natural':'Habitat naturel'}</div></div>
        <div class="info-item"><div class="val">18-20 cm</div><div class="lbl">${isEs?'Longitud del pico':'Longueur du bec'}</div></div>
        <div class="info-item"><div class="val">II</div><div class="lbl">CITES</div></div>
      </div>
    </div>

    <p>${isEs?'El tucán de pico quilla (Ramphastos sulfuratus) es originario de los bosques tropicales de América Central y el norte de América del Sur, desde México hasta Venezuela. Su pico extraordinario, de hasta 20 cm de longitud con brillantes colores verde, azul, rojo y naranja, es uno de los más llamativos del reino animal.':'Le toucan à bec caréné (Ramphastos sulfuratus) est originaire des forêts tropicales d\'Amérique centrale et du nord de l\'Amérique du Sud, du Mexique au Venezuela. Son bec extraordinaire, d\'une longueur de 20 cm avec des couleurs vives vert, bleu, rouge et orange, est l\'un des plus frappants du règne animal.'}</p>

    <p>${isEs?'A pesar de su impresionante tamaño, el pico es ligero y esponjoso en su interior, formado por una estructura de queratina y hueso con cámaras de aire que reducen significativamente su peso. Esta estructura también actúa como un radiador biológico, ayudando al tucán a regular su temperatura corporal.':'Malgré sa taille impressionnante, le bec est léger et spongieux à l\'intérieur, formé d\'une structure de kératine et d\'os avec des chambres d\'air qui réduisent considérablement son poids. Cette structure sert également de radiateur biologique, aidant le toucan à réguler sa température corporelle.'}</p>

    <h2>🍓 ${isEs?'Alimentación':'Alimentation'}</h2>
    <p>${isEs?'Los tucanes son principalmente frugívoros, con una dieta basada en frutas tropicales frescas. En el criadero, Shinda y Daphne reciben:':'Les toucans sont principalement frugivores, avec un régime à base de fruits tropicaux frais. Dans notre élevage, Shinda et Daphne reçoivent :'}</p>
    <ul>
      ${isEs ? `
      <li><strong>Frutas frescas (70-80% de la dieta):</strong> papaya, mango, maracuyá, fresas, uvas, banana, arándanos</li>
      <li><strong>Pellets específicos para tucanes</strong> — complementan los micronutrientes ausentes en la fruta</li>
      <li><strong>Proteínas:</strong> insectos vivos o liofilizados, gryllus, tenebrios ocasionalmente</li>
      <li><strong>Agua fresca siempre disponible</strong> — esencial para su salud renal</li>
      <li><strong>Suplementos de vitaminas</strong> y calcio según temporada y necesidades individuales</li>` : `
      <li><strong>Fruits frais (70-80 % du régime) :</strong> papaye, mangue, fruit de la passion, fraises, raisins, banane, myrtilles</li>
      <li><strong>Granulés spécifiques pour toucans</strong> — complètent les micronutriments absents des fruits</li>
      <li><strong>Protéines :</strong> insectes vivants ou lyophilisés, gryllus, ténébrios occasionnellement</li>
      <li><strong>Eau fraîche toujours disponible</strong> — essentielle pour leur santé rénale</li>
      <li><strong>Compléments vitamines</strong> et calcium selon saison et besoins individuels</li>`}
    </ul>
    <div class="alert-box">
      <p>⚠️ ${isEs?'<strong>Importante:</strong> Los tucanes son extremadamente sensibles al hierro. Un exceso de hierro en la dieta puede causar hemocromatosis (acumulación de hierro en órganos internos), una condición frecuentemente mortal. Evitar alimentos ricos en hierro: espinacas, legumbres, carnes rojas.':'<strong>Important :</strong> Les toucans sont extrêmement sensibles au fer. Un excès de fer dans l\'alimentation peut causer une hémochromatose (accumulation de fer dans les organes internes), souvent mortelle. Éviter les aliments riches en fer : épinards, légumineuses, viandes rouges.'}</p>
    </div>

    <h2>🏠 ${isEs?'Instalaciones y Alojamiento':'Installations et Logement'}</h2>
    <p>${isEs?'Shinda y Daphne disponen de un aviario exterior naturalizado de grandes dimensiones, con vegetación tropical, perchas de madera natural a distintas alturas y una zona de baño permanente. Los tucanes son aves de movimientos saltarines más que de vuelo largo, por lo que necesitan longitud más que altura.':'Shinda et Daphne disposent d\'une grande volière extérieure naturalisée, avec végétation tropicale, perchoirs en bois naturel à différentes hauteurs et une zone de bain permanente. Les toucans se déplacent par sauts plutôt que par de longs vols, ils ont donc besoin de longueur plutôt que de hauteur.'}</p>
    <ul>
      ${isEs ? `
      <li>Aviario exterior: 8×3×3 m con zona cubierta y zona abierta</li>
      <li>Temperatura mínima mantenida sobre 18°C en invierno</li>
      <li>Perchas de distintos diámetros y alturas para ejercicio natural</li>
      <li>Zona de baño amplia — los tucanes se bañan varias veces al día</li>
      <li>Plantas naturales no tóxicas para enriquecimiento ambiental</li>
      <li>Acceso a interior calefactado para días fríos` : `
      <li>Volière extérieure : 8×3×3 m avec zone couverte et zone ouverte</li>
      <li>Température minimale maintenue au-dessus de 18°C en hiver</li>
      <li>Perchoirs de différents diamètres et hauteurs pour l'exercice naturel</li>
      <li>Grande zone de bain — les toucans se baignent plusieurs fois par jour</li>
      <li>Plantes naturelles non toxiques pour l'enrichissement environnemental</li>
      <li>Accès à un espace intérieur chauffé pour les jours froids`}
    </ul>

    <h2>❓ ${isEs?'Preguntas Frecuentes sobre Tucanes':'Questions Fréquentes sur les Toucans'}</h2>
    ${faqHtml}

    <div class="cta-block">
      <h2>${isEs?'¿Quieres conocer a Shinda y Daphne?':'Vous voulez rencontrer Shinda et Daphne ?'}</h2>
      <p>${isEs?'Visitas al criadero en Llíria, Valencia, con cita previa. También puedes contactar por email para cualquier consulta.':'Visites de l\'élevage à Llíria, Espagne, sur rendez-vous. Vous pouvez aussi nous contacter par email pour toute question.'}</p>
      <a href="https://www.paraisodeaves.com${base}/contact${isEs?'o':''}/" class="btn-gold">${isEs?'Contactar':'Nous contacter'}</a>
      <a href="https://www.paraisodeaves.com${base}/${isEs?'galeria':'galerie'}/" class="btn-white">${isEs?'Ver galería completa':'Voir la galerie complète'}</a>
    </div>
  </div>

  <!-- Sidebar -->
  <div>
    <div class="sidebar-box">
      <h4>${isEs?'En este artículo':'Dans cet article'}</h4>
      <ul>
        <li><a href="#shinda">Shinda y Daphne</a></li>
        <li><a href="#">Vídeo exclusivo</a></li>
        <li><a href="#">Galería de fotos</a></li>
        <li><a href="#">Especie: R. sulfuratus</a></li>
        <li><a href="#">Alimentación</a></li>
        <li><a href="#">Instalaciones</a></li>
        <li><a href="#">Preguntas frecuentes</a></li>
      </ul>
    </div>
    <div class="sidebar-box">
      <h4>${isEs?'📸 Ver más fotos':'📸 Voir plus de photos'}</h4>
      <a href="https://www.paraisodeaves.com${base}/${isEs?'galeria':'galerie'}/" style="display:block;background:var(--primary);color:#fff;text-align:center;padding:10px;border-radius:8px;font-weight:600;font-size:.88rem;margin-bottom:10px;">${isEs?'Galería completa →':'Galerie complète →'}</a>
      <p style="font-size:.82rem;color:var(--muted);">${isEs?'50+ fotos reales del criadero en una sola galería':'50+ photos réelles de l\'élevage dans une seule galerie'}</p>
    </div>
    <div class="sidebar-box">
      <h4>${isEs?'🦜 Otras especies':'🦜 Autres espèces'}</h4>
      <ul>
        <li><a href="https://www.paraisodeaves.com${base}/especies/${isEs?'':''}ara${isEs?'-jacinto':'…'}/">${isEs?'Ara Jacinto':'Ara Hyacinthe'}</a></li>
        <li><a href="https://www.paraisodeaves.com${base}/especies/">→ ${isEs?'Ver todas las especies':'Voir toutes les espèces'}</a></li>
      </ul>
    </div>
    <div class="sidebar-box">
      <h4>📧 ${isEs?'Contacto':'Contact'}</h4>
      <p style="font-size:.85rem;color:var(--muted);margin-bottom:10px;">${isEs?'¿Preguntas sobre tucanes? Escríbenos.':'Questions sur les toucans ? Écrivez-nous.'}</p>
      <a href="mailto:paraisodeloros@gmail.com" style="display:block;background:var(--gold);color:var(--primary);text-align:center;padding:9px;border-radius:8px;font-weight:700;font-size:.87rem;">paraisodeloros@gmail.com</a>
    </div>
    <div class="sidebar-box">
      <h4>${isEs?'📍 Ubicación':'📍 Localisation'}</h4>
      <p style="font-size:.85rem;color:var(--muted);">Llíria, Valencia, España</p>
      <a href="https://www.paraisodeaves.com${base}/nuestras${isEs?'':'-'}instalaciones/" style="font-size:.84rem;color:var(--primary);font-weight:600;">${isEs?'Ver instalaciones →':'Voir les installations →'}</a>
    </div>
  </div>
</div>

<footer>
  <div class="footer-inner">
    <div class="footer-col">
      <h4>🦜 Paraíso de Aves</h4>
      <p style="font-size:.83rem;color:rgba(255,255,255,.55);line-height:1.7;">${isEs?'Criadero de loros y aves exóticas en Llíria, Valencia. Crianza a mano, envíos a toda Europa.':'Élevage de perroquets et oiseaux exotiques à Llíria, Espagne. Élevage manuel, livraison dans toute l\'Europe.'}</p>
    </div>
    <div class="footer-col">
      <h4>${isEs?'Explorar':'Explorer'}</h4>
      <ul>
        <li><a href="https://www.paraisodeaves.com${base}/${isEs?'galeria':'galerie'}/">${isEs?'Galería de fotos':'Galerie photos'}</a></li>
        <li><a href="https://www.paraisodeaves.com${base}/${isEs?'tucanes':'toucans'}/">${isEs?'Tucanes':'Toucans'}</a></li>
        <li><a href="https://www.paraisodeaves.com${base}/especies/">${isEs?'Todas las especies':'Toutes les espèces'}</a></li>
        <li><a href="https://www.paraisodeaves.com${base}/${isEs?'aves-disponibles':'perroquets-disponibles'}/">${isEs?'Aves disponibles':'Perroquets disponibles'}</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>${isEs?'Adoptar':'Adopter'}</h4>
      <ul>
        <li><a href="https://www.paraisodeaves.com${base}/${isEs?'adoptar-loro':'adopter-perroquet'}/">${isEs?'Proceso de adopción':'Processus d\'adoption'}</a></li>
        <li><a href="https://www.paraisodeaves.com${base}/garantie${isEs?'-de-salud':'-sante'}/">${isEs?'Garantía de salud':'Garantie santé'}</a></li>
        <li><a href="https://www.paraisodeaves.com${base}/contact${isEs?'o':''}/">${isEs?'Contacto':'Contact'}</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">© 2026 Paraíso de Aves — ${isEs?'Criadero de aves exóticas, Llíria, Valencia':'Élevage d\'oiseaux exotiques, Llíria, Espagne'}</div>
</footer>

<!-- Lightbox -->
<div class="lb-overlay" id="lb" role="dialog" aria-modal="true">
  <button class="lb-close" id="lb-close" aria-label="${isEs?'Cerrar':'Fermer'}">✕</button>
  <button class="lb-nav lb-prev" id="lb-prev" aria-label="${isEs?'Anterior':'Précédente'}">‹</button>
  <img class="lb-img" id="lb-img" src="" alt="" tabindex="0"/>
  <button class="lb-nav lb-next" id="lb-next" aria-label="${isEs?'Siguiente':'Suivante'}">›</button>
  <div class="lb-cap" id="lb-cap"></div>
</div>

<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>
<script>
(function(){
  var items = [];
  document.querySelectorAll('.gallery-thumb[data-src]').forEach(function(el){
    items.push({ src: el.dataset.src, cap: el.dataset.cap });
    el.addEventListener('click', function(){ openLb(el.dataset.src, el.dataset.cap); });
    el.addEventListener('keydown', function(e){ if(e.key==='Enter') openLb(el.dataset.src, el.dataset.cap); });
  });
  var cur = 0;
  var lb = document.getElementById('lb');
  var img = document.getElementById('lb-img');
  var cap = document.getElementById('lb-cap');

  function openLb(src, c) {
    cur = items.findIndex(function(i){ return i.src===src; });
    img.src = src; cap.textContent = c;
    lb.classList.add('open'); document.body.style.overflow='hidden';
  }
  function closeLb(){ lb.classList.remove('open'); document.body.style.overflow=''; }
  function nav(d){ cur=(cur+d+items.length)%items.length; img.src=items[cur].src; cap.textContent=items[cur].cap; }

  document.getElementById('lb-close').addEventListener('click', closeLb);
  document.getElementById('lb-prev').addEventListener('click', function(){ nav(-1); });
  document.getElementById('lb-next').addEventListener('click', function(){ nav(1); });
  lb.addEventListener('click', function(e){ if(e.target===lb) closeLb(); });
  document.addEventListener('keydown', function(e){
    if(!lb.classList.contains('open')) return;
    if(e.key==='Escape') closeLb();
    if(e.key==='ArrowLeft') nav(-1);
    if(e.key==='ArrowRight') nav(1);
  });
  var tx=0;
  lb.addEventListener('touchstart',function(e){tx=e.touches[0].clientX;},{passive:true});
  lb.addEventListener('touchend',function(e){var dx=e.changedTouches[0].clientX-tx;if(Math.abs(dx)>50)nav(dx<0?1:-1);},{passive:true});

  document.querySelectorAll('.faq-q').forEach(function(q){
    q.addEventListener('click',function(){q.parentElement.classList.toggle('open');});
  });
})();
</script>
</body>
</html>`;
}

// ─── WRITE ────────────────────────────────────────────────────────────────────
const esDir = path.join('tucanes');
const frDir = path.join('fr', 'toucans');
fs.mkdirSync(esDir, { recursive: true });
fs.mkdirSync(frDir, { recursive: true });

fs.writeFileSync(path.join(esDir, 'index.html'), buildToucanPage('es'), 'utf8');
console.log('✓ Generated tucanes/index.html');

fs.writeFileSync(path.join(frDir, 'index.html'), buildToucanPage('fr'), 'utf8');
console.log('✓ Generated fr/toucans/index.html');

console.log('\n✅ Toucan pages complete');
