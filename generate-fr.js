/**
 * generate-fr.js
 * Phase 5 — French Market Expansion
 * 39 pages: 9 structure + 8 species + 12 cities + 10 blog
 * Native French (fr-FR), full schemas, hreflang ES/PT/FR.
 */

const fs   = require('fs');
const path = require('path');

const BASE  = 'https://www.paraisodeaves.com';
const EMAIL = 'paraisodeloros@gmail.com';
const GA_ID = 'G-4007YHH4H9';

function mkdirp(d){ fs.mkdirSync(d, {recursive:true}); }

/* ── SHARED CSS ── */
function baseCSS(){
  return `
  :root{--primary:#1F3D2B;--secondary:#2B533C;--gold:#D4A94F;--gold-light:#E0B75F;--bg:#F8F5F0;--text:#1A1A1A;--muted:#5C5C5C;--border:#E7E0D2;--white:#fff;--radius:12px;--shadow:0 4px 24px rgba(0,0,0,.10);}
  *{margin:0;padding:0;box-sizing:border-box;}html{scroll-behavior:smooth;}
  body{font-family:'Open Sans',sans-serif;background:var(--bg);color:var(--text);line-height:1.75;font-size:16px;}
  h1,h2,h3,h4{font-family:'Poppins',sans-serif;font-weight:700;line-height:1.25;}
  a{color:var(--primary);text-decoration:none;}a:hover{color:var(--gold);}
  img{max-width:100%;height:auto;display:block;}
  .topbar{background:var(--primary);position:sticky;top:0;z-index:1000;padding:0 5%;}
  .topbar-inner{display:flex;align-items:center;justify-content:space-between;height:60px;max-width:1200px;margin:0 auto;}
  .logo{color:var(--white);font-family:'Poppins',sans-serif;font-weight:700;font-size:1.1rem;display:flex;align-items:center;gap:8px;}
  .logo span{font-size:1.5rem;}
  nav a{color:rgba(255,255,255,.85);margin-left:22px;font-size:.9rem;font-weight:500;transition:color .2s;}
  nav a:hover,nav a.active{color:var(--gold);}
  .lang-switch{display:flex;align-items:center;gap:5px;margin-left:22px;}
  .lang-switch a{font-size:.78rem;font-weight:600;color:rgba(255,255,255,.6);padding:3px 6px;border-radius:4px;transition:all .2s;}
  .lang-switch a.active{color:var(--gold);background:rgba(212,169,79,.15);}
  .lang-switch span{color:rgba(255,255,255,.3);font-size:.7rem;}
  .breadcrumb-bar{background:var(--primary);padding:10px 5%;border-bottom:1px solid rgba(255,255,255,.08);}
  .breadcrumb-bar .inner{max-width:1200px;margin:0 auto;font-size:.82rem;color:rgba(255,255,255,.6);}
  .breadcrumb-bar .inner a{color:rgba(255,255,255,.7);}
  .breadcrumb-bar .inner a:hover{color:var(--gold);}
  .breadcrumb-bar .inner span{margin:0 6px;}
  .hero{background:linear-gradient(135deg,var(--primary) 0%,var(--secondary) 100%);padding:64px 5%;text-align:center;color:var(--white);}
  .hero .badge{display:inline-block;background:rgba(212,169,79,.15);border:1px solid var(--gold);color:var(--gold);padding:6px 20px;border-radius:30px;font-size:.8rem;font-weight:700;letter-spacing:1px;margin-bottom:18px;}
  .hero h1{font-size:clamp(1.9rem,5vw,3rem);margin-bottom:12px;color:var(--white);}
  .hero .subtitle{font-size:1.05rem;color:rgba(255,255,255,.85);max-width:660px;margin:0 auto 24px;}
  .trust-pills{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-top:10px;}
  .trust-pills span{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);color:var(--white);padding:6px 16px;border-radius:20px;font-size:.82rem;font-weight:600;}
  .page-wrap{max-width:1200px;margin:0 auto;padding:56px 5%;display:grid;grid-template-columns:1fr 320px;gap:48px;align-items:start;}
  @media(max-width:900px){.page-wrap{grid-template-columns:1fr;}}
  .main-col p{margin-bottom:14px;color:#2a2a2a;}
  .main-col ul{padding-left:20px;margin-bottom:14px;}
  .main-col ul li{margin-bottom:6px;}
  .section{margin-bottom:48px;}
  .section h2{font-size:1.55rem;color:var(--primary);margin-bottom:16px;padding-bottom:10px;border-bottom:2px solid var(--gold);display:inline-block;}
  .section h3{font-size:1.1rem;color:var(--secondary);margin:20px 0 8px;}
  .delivery-box{background:var(--primary);color:var(--white);border-radius:12px;padding:28px;margin-bottom:32px;}
  .delivery-box h3{color:var(--gold);margin-bottom:14px;}
  .delivery-box p,.delivery-box li{color:rgba(255,255,255,.85);font-size:.93rem;}
  .delivery-box ul{padding-left:18px;}
  .delivery-box ul li{margin-bottom:6px;}
  .species-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:14px;margin-bottom:32px;}
  .species-card{background:var(--white);border:1px solid var(--border);border-radius:10px;padding:16px;text-align:center;transition:box-shadow .2s;}
  .species-card:hover{box-shadow:var(--shadow);}
  .species-card .icon{font-size:1.8rem;margin-bottom:6px;}
  .species-card h4{font-size:.85rem;color:var(--primary);font-family:'Poppins',sans-serif;margin-bottom:3px;}
  .species-card span{font-size:.77rem;color:var(--muted);}
  .faq-item{border-bottom:1px solid var(--border);padding:18px 0;}
  .faq-item:last-child{border-bottom:none;}
  .faq-q{font-family:'Poppins',sans-serif;font-weight:700;font-size:1rem;color:var(--primary);margin-bottom:8px;}
  .faq-a{color:#2a2a2a;font-size:.95rem;}
  .cities-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px;margin-top:14px;}
  .city-chip{background:var(--white);border:1px solid var(--border);border-radius:8px;padding:12px;text-align:center;font-size:.85rem;color:var(--secondary);font-weight:600;transition:all .2s;}
  .city-chip:hover{background:var(--primary);color:var(--gold);border-color:var(--primary);}
  .cta-box{background:linear-gradient(135deg,var(--primary),var(--secondary));border-radius:12px;padding:32px;color:var(--white);text-align:center;margin-bottom:32px;}
  .cta-box h3{color:var(--gold);font-size:1.15rem;margin-bottom:10px;}
  .cta-box p{color:rgba(255,255,255,.85);font-size:.9rem;margin-bottom:20px;}
  .btn-gold{display:inline-block;background:var(--gold);color:var(--primary);padding:12px 26px;border-radius:30px;font-weight:700;font-size:.92rem;transition:all .2s;}
  .btn-gold:hover{background:var(--gold-light);color:var(--primary);}
  .btn-outline{display:inline-block;border:2px solid rgba(255,255,255,.5);color:var(--white);padding:10px 22px;border-radius:30px;font-weight:600;font-size:.88rem;margin-left:10px;transition:all .2s;}
  .btn-outline:hover{border-color:var(--white);background:rgba(255,255,255,.1);color:var(--white);}
  .contact-form{background:var(--white);border:1px solid var(--border);border-radius:12px;padding:26px;}
  .contact-form h3{color:var(--primary);font-size:1rem;margin-bottom:14px;}
  .form-group{margin-bottom:12px;}
  .form-group label{display:block;font-size:.83rem;font-weight:600;color:var(--primary);margin-bottom:4px;}
  .form-group input,.form-group select,.form-group textarea{width:100%;padding:10px 13px;border:1.5px solid var(--border);border-radius:8px;font-family:'Open Sans',sans-serif;font-size:.88rem;color:var(--text);background:var(--bg);}
  .form-group textarea{min-height:80px;resize:vertical;}
  .sidebar-card{background:var(--white);border:1px solid var(--border);border-radius:12px;padding:20px;margin-bottom:22px;}
  .sidebar-card h4{font-family:'Poppins',sans-serif;color:var(--primary);font-size:.95rem;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid var(--gold);}
  .sidebar-card ul{list-style:none;padding:0;}
  .sidebar-card ul li{padding:6px 0;border-bottom:1px solid var(--border);font-size:.86rem;}
  .sidebar-card ul li:last-child{border-bottom:none;}
  .sidebar-card ul li a{color:var(--secondary);}
  .delivery-badge{background:linear-gradient(135deg,var(--primary),var(--secondary));border-radius:12px;padding:20px;text-align:center;color:var(--white);margin-bottom:22px;}
  .delivery-badge .time{font-family:'Poppins',sans-serif;font-size:2rem;font-weight:700;color:var(--gold);}
  .delivery-badge p{font-size:.82rem;color:rgba(255,255,255,.75);margin-top:4px;}
  .article-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1.2rem;margin:1.5rem 0;}
  .article-card{background:var(--white);border:1px solid var(--border);border-radius:14px;padding:1.2rem;transition:transform .2s,box-shadow .2s;}
  .article-card:hover{transform:translateY(-4px);box-shadow:var(--shadow);}
  .article-card h3{font-size:1rem;color:var(--primary);margin-bottom:.5rem;font-family:'Poppins',sans-serif;}
  .article-card p{font-size:.88rem;color:var(--muted);margin:0;}
  .article-card a{text-decoration:none;color:inherit;}
  .article-card a:hover h3{color:var(--gold);}
  footer{background:var(--primary);color:rgba(255,255,255,.75);padding:56px 5% 28px;}
  .footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr 1fr;gap:32px;max-width:1200px;margin:0 auto 40px;}
  @media(max-width:900px){.footer-grid{grid-template-columns:1fr 1fr;}}
  @media(max-width:500px){.footer-grid{grid-template-columns:1fr;}}
  .footer-brand h3{font-family:'Poppins',sans-serif;color:var(--white);font-size:1.1rem;margin-bottom:10px;}
  .footer-brand p{font-size:.84rem;line-height:1.7;max-width:260px;}
  .footer-col h4{font-family:'Poppins',sans-serif;color:var(--gold-light);font-size:.84rem;text-transform:uppercase;letter-spacing:.8px;margin-bottom:12px;}
  .footer-col ul{list-style:none;}
  .footer-col ul li{margin-bottom:6px;}
  .footer-col ul li a{color:rgba(255,255,255,.65);font-size:.82rem;transition:color .2s;}
  .footer-col ul li a:hover{color:var(--gold);}
  .footer-bottom{border-top:1px solid rgba(255,255,255,.1);padding-top:20px;text-align:center;font-size:.78rem;color:rgba(255,255,255,.4);max-width:1200px;margin:0 auto;}
  .article-hero{background:linear-gradient(135deg,var(--primary),var(--secondary));padding:56px 5%;color:var(--white);}
  .article-hero .badge{display:inline-block;background:rgba(212,169,79,.15);border:1px solid var(--gold);color:var(--gold);padding:5px 16px;border-radius:20px;font-size:.78rem;font-weight:700;letter-spacing:1px;margin-bottom:16px;}
  .article-hero h1{font-size:clamp(1.7rem,4vw,2.6rem);margin-bottom:10px;}
  .article-hero .meta{font-size:.85rem;color:rgba(255,255,255,.65);}
  .article-wrap{max-width:1200px;margin:0 auto;padding:56px 5%;display:grid;grid-template-columns:1fr 300px;gap:48px;}
  @media(max-width:900px){.article-wrap{grid-template-columns:1fr;}}
  .article-body p{margin-bottom:16px;color:#2a2a2a;font-size:1rem;}
  .article-body h2{font-size:1.45rem;color:var(--primary);margin:32px 0 14px;padding-bottom:8px;border-bottom:2px solid var(--gold);display:inline-block;}
  .article-body h3{font-size:1.1rem;color:var(--secondary);margin:20px 0 8px;}
  .article-body ul,.article-body ol{padding-left:20px;margin-bottom:16px;}
  .article-body ul li,.article-body ol li{margin-bottom:7px;}
  .article-body figure{margin:24px 0;border-radius:10px;overflow:hidden;box-shadow:var(--shadow);}
  .article-body figcaption{background:var(--primary);color:rgba(255,255,255,.75);font-size:.78rem;padding:8px 14px;font-style:italic;}
  .article-body .highlight-box{background:rgba(31,61,43,.07);border-left:4px solid var(--gold);padding:16px 20px;border-radius:0 8px 8px 0;margin:20px 0;}
  .highlight-box{background:rgba(31,61,43,.07);border-left:4px solid var(--gold);padding:16px 20px;border-radius:0 8px 8px 0;margin:20px 0;}
  .specs-table{width:100%;border-collapse:collapse;margin:20px 0;}
  .specs-table th{background:var(--primary);color:var(--white);padding:10px 14px;text-align:left;font-size:.85rem;}
  .specs-table td{padding:9px 14px;border-bottom:1px solid var(--border);font-size:.9rem;}
  .specs-table tr:nth-child(even) td{background:rgba(31,61,43,.04);}
  @media(max-width:700px){nav{display:none;}.page-wrap{padding:28px 4%;}.article-wrap{padding:28px 4%;}}
  `;
}

function frNav(active=''){
  const links = [
    {href:`${BASE}/fr/`,label:'Accueil',key:'Accueil'},
    {href:`${BASE}/fr/perroquets/`,label:'Perroquets',key:'Perroquets'},
    {href:`${BASE}/fr/blog/`,label:'Blog',key:'Blog'},
    {href:`${BASE}/fr/livraison/`,label:'Livraison',key:'Livraison'},
    {href:`${BASE}/fr/contact/`,label:'Contact',key:'Contact'},
  ];
  return `<header class="topbar">
    <div class="topbar-inner">
      <a class="logo" href="${BASE}/fr/"><span>🦜</span> paraisodeaves</a>
      <nav>
        ${links.map(l=>`<a href="${l.href}"${active===l.key?' class="active"':''}>  ${l.label}</a>`).join('')}
        <span class="lang-switch">
          <a href="${BASE}/" title="Español">ES</a>
          <span>|</span>
          <a href="${BASE}/pt/" title="Português">PT</a>
          <span>|</span>
          <a href="${BASE}/fr/" class="active" title="Français">FR</a>
        </span>
      </nav>
    </div>
  </header>`;
}

function frFooter(){
  return `<footer>
    <div class="footer-grid">
      <div class="footer-brand">
        <h3>🦜 Paraíso de Aves</h3>
        <p>Éleveur enregistré de perroquets exotiques à Llíria, Valence (Espagne). Plus de 25 ans d'expérience. Livraisons sécurisées dans toute la France et l'Europe.</p>
        <p style="margin-top:12px;font-size:.82rem;">📧 <a href="mailto:${EMAIL}" style="color:var(--gold-light);">${EMAIL}</a></p>
      </div>
      <div class="footer-col">
        <h4>Espèces</h4>
        <ul>
          <li><a href="${BASE}/fr/perroquet-gris-du-gabon/">Gris du Gabon</a></li>
          <li><a href="${BASE}/fr/ara-hyacinthe/">Ara Hyacinthe</a></li>
          <li><a href="${BASE}/fr/ara-bleu-et-jaune/">Ara Bleu et Jaune</a></li>
          <li><a href="${BASE}/fr/ara-macao/">Ara Macao</a></li>
          <li><a href="${BASE}/fr/cacatoes-huppe-jaune/">Cacatoès Huppé Jaune</a></li>
          <li><a href="${BASE}/fr/eclectus/">Éclectus</a></li>
          <li><a href="${BASE}/fr/amazone-front-bleu/">Amazone Front Bleu</a></li>
          <li><a href="${BASE}/fr/cacatoes-rosalbin/">Cacatoès Rosalbin</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Villes</h4>
        <ul>
          <li><a href="${BASE}/fr/perroquets-a-vendre-paris/">Paris</a></li>
          <li><a href="${BASE}/fr/perroquets-a-vendre-lyon/">Lyon</a></li>
          <li><a href="${BASE}/fr/perroquets-a-vendre-marseille/">Marseille</a></li>
          <li><a href="${BASE}/fr/perroquets-a-vendre-nice/">Nice</a></li>
          <li><a href="${BASE}/fr/perroquets-a-vendre-bordeaux/">Bordeaux</a></li>
          <li><a href="${BASE}/fr/perroquets-a-vendre-toulouse/">Toulouse</a></li>
          <li><a href="${BASE}/fr/perroquets-a-vendre-strasbourg/">Strasbourg</a></li>
          <li><a href="${BASE}/fr/perroquets-a-vendre-lille/">Lille</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Blog</h4>
        <ul>
          <li><a href="${BASE}/fr/blog/guide-cites-france/">Guide CITES France</a></li>
          <li><a href="${BASE}/fr/blog/prix-perroquet-france/">Prix d'un Perroquet</a></li>
          <li><a href="${BASE}/fr/blog/quel-perroquet-choisir/">Quel Perroquet Choisir?</a></li>
          <li><a href="${BASE}/fr/blog/meilleurs-perroquets-debutants/">Pour Débutants</a></li>
          <li><a href="${BASE}/fr/blog/preparer-maison-perroquet/">Préparer sa Maison</a></li>
          <li><a href="${BASE}/fr/blog/">Tous les articles →</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Informations</h4>
        <ul>
          <li><a href="${BASE}/fr/livraison/">Livraison en France</a></li>
          <li><a href="${BASE}/fr/garantie-sante/">Garantie Santé</a></li>
          <li><a href="${BASE}/fr/processus-adoption/">Processus d'Adoption</a></li>
          <li><a href="${BASE}/fr/faq/">FAQ</a></li>
          <li><a href="${BASE}/fr/a-propos/">À Propos</a></li>
          <li><a href="${BASE}/fr/contact/">Contact</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2026 Paraíso de Aves · Éleveur Enregistré · CITES Officiel · Llíria, Valence, Espagne</p>
      <p style="margin-top:6px;"><a href="${BASE}/" style="color:rgba(255,255,255,.4);">ES</a> · <a href="${BASE}/pt/" style="color:rgba(255,255,255,.4);">PT</a> · <a href="${BASE}/fr/" style="color:rgba(255,255,255,.4);">FR</a></p>
    </div>
  </footer>`;
}

function frContactForm(id){
  return `<div class="contact-form" id="contact">
    <h3>📋 Demander des informations</h3>
    <p style="font-size:.82rem;color:var(--muted);margin-bottom:14px;">Réponse sous 24h.</p>
    <form method="POST" data-netlify="true" name="contact-fr-${id}">
      <input type="hidden" name="form-name" value="contact-fr-${id}"/>
      <div class="form-group"><label>Nom *</label><input type="text" name="nom" required placeholder="Votre nom"/></div>
      <div class="form-group"><label>E-mail *</label><input type="email" name="email" required placeholder="email@exemple.fr"/></div>
      <div class="form-group"><label>Espèce souhaitée</label>
        <select name="espece">
          <option value="">Sélectionnez</option>
          <option>Perroquet Gris du Gabon</option><option>Ara Hyacinthe</option>
          <option>Ara Bleu et Jaune</option><option>Ara Macao</option>
          <option>Cacatoès à Huppe Jaune</option><option>Cacatoès Rosalbin</option>
          <option>Amazone à Front Bleu</option><option>Éclectus</option><option>Autre</option>
        </select>
      </div>
      <div class="form-group"><label>Message</label>
        <textarea name="message" placeholder="Questions sur la disponibilité, le prix, la livraison..."></textarea>
      </div>
      <button type="submit" class="btn-gold" style="width:100%;padding:12px;">Envoyer →</button>
    </form>
  </div>`;
}

function frHreflang(frPath, esPath='/', ptPath='/pt/'){
  return `
  <link rel="alternate" hreflang="fr-FR" href="${BASE}${frPath}"/>
  <link rel="alternate" hreflang="es-ES" href="${BASE}${esPath}"/>
  <link rel="alternate" hreflang="pt-PT" href="${BASE}${ptPath}"/>
  <link rel="alternate" hreflang="x-default" href="${BASE}/"/>`;
}

function frHead({title, metaDesc, canonical, ogImage='loro-gris-01.webp', frPath, type='website'}){
  return `<!DOCTYPE html>
<html lang="fr-FR" dir="ltr">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');</script>
  <title>${title}</title>
  <meta name="description" content="${metaDesc}"/>
  <meta name="robots" content="index, follow"/>
  <link rel="canonical" href="${BASE}${canonical}"/>
  ${frHreflang(canonical)}
  <meta property="og:type" content="${type}"/>
  <meta property="og:locale" content="fr_FR"/>
  <meta property="og:title" content="${title}"/>
  <meta property="og:description" content="${metaDesc}"/>
  <meta property="og:url" content="${BASE}${canonical}"/>
  <meta property="og:image" content="${BASE}/images/${ogImage}"/>
  <meta property="og:site_name" content="Paraíso de Aves"/>
  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:title" content="${title}"/>
  <meta name="twitter:description" content="${metaDesc}"/>
  <link rel="icon" href="/favicon.ico"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
  <style>${baseCSS()}</style>`;
}

/* ════════════════════════════════════════════════
   STRUCTURE PAGES
════════════════════════════════════════════════ */

function generateHomepage(){
  const schemas = `<script type="application/ld+json">{"@context":"https://schema.org","@graph":[
{"@type":"WebSite","@id":"${BASE}/fr/#website","url":"${BASE}/fr/","name":"Paraíso de Aves — Éleveur de Perroquets","inLanguage":"fr-FR","description":"Éleveur enregistré de perroquets exotiques. Ara, Cacatoès, Gris du Gabon — CITES officiel, livraison dans toute la France."},
{"@type":"Organization","@id":"${BASE}/#org","name":"Paraíso de Aves","url":"${BASE}","email":"${EMAIL}","address":{"@type":"PostalAddress","addressLocality":"Llíria","addressRegion":"Valence","addressCountry":"ES"},"areaServed":["FR","ES","PT","EU"],"knowsAbout":["Psittacidae","perroquets exotiques","CITES","ara","cacatoès"]},
{"@type":"LocalBusiness","@id":"${BASE}/#lb-fr","name":"Paraíso de Aves","description":"Éleveur enregistré de perroquets exotiques avec livraison en France","url":"${BASE}/fr/","email":"${EMAIL}","address":{"@type":"PostalAddress","addressLocality":"Llíria","addressRegion":"Valence","addressCountry":"ES"},"areaServed":{"@type":"Country","name":"France"}}
]}</script>`;

  return `${frHead({title:"Perroquets à Vendre en France | Éleveur Enregistré | CITES | Paraíso de Aves",metaDesc:"Achetez un perroquet exotique en France avec documentation CITES officielle. Gris du Gabon, Ara Hyacinthe, Cacatoès — éleveur enregistré depuis 25 ans, livraison dans toute la France.",canonical:"/fr/",frPath:"/fr/"})}
  ${schemas}
</head>
<body>
${frNav('Accueil')}
<section class="hero">
  <p class="badge">🦜 ÉLEVEUR ENREGISTRÉ · CITES OFFICIEL · FRANCE</p>
  <h1>Perroquets Exotiques à Vendre en France</h1>
  <p class="subtitle">Paraíso de Aves — éleveur spécialisé depuis plus de 25 ans. Gris du Gabon, Ara Hyacinthe, Cacatoès et bien plus — documentation CITES incluse, livraison dans toute la France.</p>
  <div class="trust-pills">
    <span>✓ CITES Officiel</span><span>✓ 25+ ans d'expérience</span><span>✓ Apprivoisés à la main</span><span>✓ Livraison France entière</span><span>✓ Suivi post-adoption</span>
  </div>
  <div style="margin-top:28px;">
    <a href="/fr/perroquets/" class="btn-gold">Voir les Espèces</a>
    <a href="/fr/contact/" class="btn-outline">Nous Contacter</a>
  </div>
</section>

<div style="max-width:1200px;margin:56px auto;padding:0 5%;">
  <h2 style="text-align:center;font-size:1.7rem;color:var(--primary);margin-bottom:10px;">Nos Espèces Disponibles</h2>
  <p style="text-align:center;color:var(--muted);margin-bottom:32px;">Tous nos perroquets sont élevés à la main, socialisés dès la naissance et accompagnés de leur documentation CITES officielle.</p>
  <div class="species-grid" style="grid-template-columns:repeat(auto-fit,minmax(175px,1fr));">
    <a href="${BASE}/fr/perroquet-gris-du-gabon/" class="species-card"><div class="icon">🩶</div><h4>Gris du Gabon</h4><span>Le plus intelligent</span></a>
    <a href="${BASE}/fr/ara-hyacinthe/" class="species-card"><div class="icon">💙</div><h4>Ara Hyacinthe</h4><span>Le plus grand ara</span></a>
    <a href="${BASE}/fr/ara-bleu-et-jaune/" class="species-card"><div class="icon">💛</div><h4>Ara Bleu et Jaune</h4><span>Très sociable</span></a>
    <a href="${BASE}/fr/ara-macao/" class="species-card"><div class="icon">❤️</div><h4>Ara Macao</h4><span>Spectaculaire</span></a>
    <a href="${BASE}/fr/cacatoes-huppe-jaune/" class="species-card"><div class="icon">🤍</div><h4>Cacatoès Huppé Jaune</h4><span>Très affectueux</span></a>
    <a href="${BASE}/fr/cacatoes-rosalbin/" class="species-card"><div class="icon">🩷</div><h4>Cacatoès Rosalbin</h4><span>Couleurs uniques</span></a>
    <a href="${BASE}/fr/amazone-front-bleu/" class="species-card"><div class="icon">💚</div><h4>Amazone Front Bleu</h4><span>Très bavard</span></a>
    <a href="${BASE}/fr/eclectus/" class="species-card"><div class="icon">🦜</div><h4>Éclectus</h4><span>Dimorphisme unique</span></a>
  </div>
</div>

<div style="background:var(--primary);padding:56px 5%;text-align:center;color:var(--white);">
  <div style="max-width:900px;margin:0 auto;">
    <h2 style="color:var(--gold);margin-bottom:14px;">Livraison dans toute la France</h2>
    <p style="color:rgba(255,255,255,.85);margin-bottom:28px;">De Paris à Nice, de Bordeaux à Strasbourg — nous livrons vos perroquets directement à votre domicile par transporteur spécialisé en animaux vivants, avec suivi en temps réel.</p>
    <div class="cities-grid" style="max-width:700px;margin:0 auto;">
      <a href="${BASE}/fr/perroquets-a-vendre-paris/" class="city-chip">📍 Paris</a>
      <a href="${BASE}/fr/perroquets-a-vendre-lyon/" class="city-chip">📍 Lyon</a>
      <a href="${BASE}/fr/perroquets-a-vendre-marseille/" class="city-chip">📍 Marseille</a>
      <a href="${BASE}/fr/perroquets-a-vendre-toulouse/" class="city-chip">📍 Toulouse</a>
      <a href="${BASE}/fr/perroquets-a-vendre-nice/" class="city-chip">📍 Nice</a>
      <a href="${BASE}/fr/perroquets-a-vendre-bordeaux/" class="city-chip">📍 Bordeaux</a>
      <a href="${BASE}/fr/perroquets-a-vendre-lille/" class="city-chip">📍 Lille</a>
      <a href="${BASE}/fr/perroquets-a-vendre-nantes/" class="city-chip">📍 Nantes</a>
      <a href="${BASE}/fr/perroquets-a-vendre-strasbourg/" class="city-chip">📍 Strasbourg</a>
      <a href="${BASE}/fr/perroquets-a-vendre-montpellier/" class="city-chip">📍 Montpellier</a>
      <a href="${BASE}/fr/perroquets-a-vendre-rennes/" class="city-chip">📍 Rennes</a>
      <a href="${BASE}/fr/perroquets-a-vendre-grenoble/" class="city-chip">📍 Grenoble</a>
    </div>
  </div>
</div>

<div style="max-width:1200px;margin:56px auto;padding:0 5%;">
  <h2 style="text-align:center;font-size:1.7rem;color:var(--primary);margin-bottom:32px;">Pourquoi Choisir Paraíso de Aves ?</h2>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:24px;">
    ${[
      ['📋','CITES Officiel','Toutes nos espèces sont accompagnées de leur documentation CITES complète, valable dans toute l\'Union Européenne.'],
      ['🏠','Apprivoisés à la Main','Nos perroquets sont élevés et socialisés à la main depuis la naissance pour garantir leur adaptation à la vie familiale.'],
      ['🩺','Garantie Santé','Chaque oiseau est livré avec un certificat vétérinaire à jour et bénéficie d\'une garantie santé.'],
      ['🚚','Livraison France','Livraison sécurisée dans toute la France par transporteur spécialisé, avec caisse IATA certifiée.'],
      ['📞','Suivi Post-Vente','Notre équipe reste disponible par e-mail pour répondre à toutes vos questions tout au long de la vie de l\'oiseau.'],
      ['⚖️','25 ans d\'Expérience','Plus de 25 ans de passion et d\'expertise en élevage de psittacidés. Références vérifiables.'],
    ].map(([icon,title,text])=>`<div style="background:var(--white);border:1px solid var(--border);border-radius:12px;padding:24px;">
      <div style="font-size:2rem;margin-bottom:10px;">${icon}</div>
      <h3 style="color:var(--primary);font-size:1rem;margin-bottom:8px;">${title}</h3>
      <p style="color:var(--muted);font-size:.88rem;">${text}</p>
    </div>`).join('')}
  </div>
</div>

<div style="max-width:900px;margin:0 auto 56px;padding:0 5%;">
  <h2 style="text-align:center;font-size:1.7rem;color:var(--primary);margin-bottom:28px;">Derniers Articles du Blog</h2>
  <div class="article-grid">
    <div class="article-card"><a href="${BASE}/fr/blog/guide-cites-france/"><h3>Guide CITES France 2026</h3><p>Tout sur la législation CITES en France : quelles espèces, quels documents, quelles obligations.</p></a></div>
    <div class="article-card"><a href="${BASE}/fr/blog/quel-perroquet-choisir/"><h3>Quel Perroquet Choisir ?</h3><p>Guide complet pour choisir l'espèce parfaite selon votre mode de vie, logement et expérience.</p></a></div>
    <div class="article-card"><a href="${BASE}/fr/blog/prix-perroquet-france/"><h3>Prix d'un Perroquet en France</h3><p>Guide des prix par espèce et coûts d'entretien annuels pour bien préparer votre budget.</p></a></div>
  </div>
  <div style="text-align:center;margin-top:24px;"><a href="${BASE}/fr/blog/" class="btn-gold">Voir tous les articles</a></div>
</div>

${frFooter()}
</body>
</html>`;
}

/* ════════════════════════════════════════════════
   SPECIES PAGES
════════════════════════════════════════════════ */

function speciesSchemas(s){
  const faqList = s.faqs.map(f=>`{"@type":"Question","name":${JSON.stringify(f.q)},"acceptedAnswer":{"@type":"Answer","text":${JSON.stringify(f.a)}}}`).join(',');
  return `<script type="application/ld+json">{"@context":"https://schema.org","@graph":[
{"@type":"WebPage","@id":"${BASE}/fr/${s.slug}/","name":${JSON.stringify(s.title)},"description":${JSON.stringify(s.metaDesc)},"url":"${BASE}/fr/${s.slug}/","inLanguage":"fr-FR"},
{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Accueil","item":"${BASE}/fr/"},{"@type":"ListItem","position":2,"name":"Perroquets","item":"${BASE}/fr/perroquets/"},{"@type":"ListItem","position":3,"name":${JSON.stringify(s.h1)},"item":"${BASE}/fr/${s.slug}/"}]},
{"@type":"FAQPage","mainEntity":[${faqList}]},
{"@type":"Product","name":${JSON.stringify(s.h1)},"description":${JSON.stringify(s.metaDesc)},"brand":{"@type":"Brand","name":"Paraíso de Aves"},"offers":{"@type":"Offer","availability":"https://schema.org/InStock","priceCurrency":"EUR","priceSpecification":{"@type":"PriceSpecification","description":"Sur demande — contactez-nous pour un devis actualisé"},"seller":{"@id":"${BASE}/#org"}}},
{"@type":"Organization","@id":"${BASE}/#org","name":"Paraíso de Aves","url":"${BASE}","email":"${EMAIL}"}
]}</script>`;
}

function generateSpeciesPage(s){
  return `${frHead({title:s.title,metaDesc:s.metaDesc,canonical:`/fr/${s.slug}/`,ogImage:s.img,frPath:`/fr/${s.slug}/`,type:'website'})}
  ${speciesSchemas(s)}
</head>
<body>
${frNav('Perroquets')}
<section class="hero">
  <p class="badge">${s.badge}</p>
  <h1>${s.h1}</h1>
  <p class="subtitle">${s.subtitle}</p>
  <div class="trust-pills">${s.pills.map(p=>`<span>${p}</span>`).join('')}</div>
</section>
<nav class="breadcrumb-bar" aria-label="Fil d'Ariane">
  <div class="inner">
    <a href="${BASE}/fr/">Accueil</a><span>·</span>
    <a href="${BASE}/fr/perroquets/">Perroquets</a><span>·</span>
    <strong style="color:rgba(255,255,255,.9)">${s.h1}</strong>
  </div>
</nav>

<div class="page-wrap">
  <main class="main-col">

    <div class="section">
      <h2>Présentation — ${s.h1}</h2>
      ${s.introHTML}
    </div>

    <div class="section">
      <h2>Fiche Technique</h2>
      <table class="specs-table">
        <tbody>
          ${s.specs.map(([k,v])=>`<tr><td><strong>${k}</strong></td><td>${v}</td></tr>`).join('')}
        </tbody>
      </table>
    </div>

    <div class="section">
      <h2>Tempérament et Comportement</h2>
      ${s.temperHTML}
    </div>

    <div class="section">
      <h2>Alimentation</h2>
      ${s.feedHTML}
    </div>

    <div class="section">
      <h2>Logement et Espace</h2>
      ${s.housingHTML}
    </div>

    <div class="section">
      <h2>CITES et Réglementation en France</h2>
      ${s.citesHTML}
    </div>

    <div class="section">
      <h2>Livraison en France</h2>
      <div class="delivery-box">
        <h3>🚚 Livraison dans toute la France</h3>
        ${s.deliveryHTML}
      </div>
    </div>

    <div class="section">
      <h2>Questions Fréquentes — ${s.h1}</h2>
      ${s.faqs.map(f=>`<div class="faq-item"><div class="faq-q">${f.q}</div><div class="faq-a">${f.a}</div></div>`).join('')}
    </div>

    <div class="section">
      <h2>Espèces Associées</h2>
      <div class="species-grid">
        ${s.related.map(r=>`<a href="${BASE}/fr/${r.slug}/" class="species-card"><div class="icon">${r.icon}</div><h4>${r.name}</h4><span>${r.desc}</span></a>`).join('')}
      </div>
    </div>

    <div class="cta-box">
      <h3>${s.ctaTitle}</h3>
      <p>${s.ctaText}</p>
      <a href="#contact" class="btn-gold">Demander un Devis</a>
      <a href="mailto:${EMAIL}" class="btn-outline">Envoyer un Email</a>
    </div>

  </main>

  <aside class="sidebar">
    <div class="delivery-badge">
      <div style="font-size:.78rem;color:rgba(255,255,255,.6);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Délai de Livraison</div>
      <div class="time">${s.deliveryTime}</div>
      <p>jours ouvrés après confirmation</p>
    </div>
    ${frContactForm(s.slug.replace(/-/g,''))}
    <div class="sidebar-card">
      <h4>Toutes nos Espèces</h4>
      <ul>
        <li><a href="${BASE}/fr/perroquet-gris-du-gabon/">Gris du Gabon</a></li>
        <li><a href="${BASE}/fr/ara-hyacinthe/">Ara Hyacinthe</a></li>
        <li><a href="${BASE}/fr/ara-bleu-et-jaune/">Ara Bleu et Jaune</a></li>
        <li><a href="${BASE}/fr/ara-macao/">Ara Macao</a></li>
        <li><a href="${BASE}/fr/cacatoes-huppe-jaune/">Cacatoès Huppé Jaune</a></li>
        <li><a href="${BASE}/fr/cacatoes-rosalbin/">Cacatoès Rosalbin</a></li>
        <li><a href="${BASE}/fr/amazone-front-bleu/">Amazone Front Bleu</a></li>
        <li><a href="${BASE}/fr/eclectus/">Éclectus</a></li>
      </ul>
    </div>
    <div class="sidebar-card">
      <h4>Articles Utiles</h4>
      <ul>
        <li><a href="${BASE}/fr/blog/guide-cites-france/">Guide CITES France</a></li>
        <li><a href="${BASE}/fr/blog/prix-perroquet-france/">Prix en France</a></li>
        <li><a href="${BASE}/fr/blog/quel-perroquet-choisir/">Quel Perroquet Choisir?</a></li>
        <li><a href="${BASE}/fr/blog/choisir-eleveur-serieux/">Choisir un Éleveur</a></li>
        <li><a href="${BASE}/fr/blog/preparer-maison-perroquet/">Préparer sa Maison</a></li>
      </ul>
    </div>
  </aside>
</div>
${frFooter()}
</body>
</html>`;
}

/* ── SPECIES DATA ── */
const ALL_SPECIES_REL = [
  {slug:'perroquet-gris-du-gabon',icon:'🩶',name:'Gris du Gabon',desc:'Le plus intelligent'},
  {slug:'ara-hyacinthe',icon:'💙',name:'Ara Hyacinthe',desc:'Le plus grand'},
  {slug:'ara-bleu-et-jaune',icon:'💛',name:'Ara Bleu et Jaune',desc:'Très sociable'},
  {slug:'ara-macao',icon:'❤️',name:'Ara Macao',desc:'Spectaculaire'},
  {slug:'cacatoes-huppe-jaune',icon:'🤍',name:'Cacatoès Huppé Jaune',desc:'Très affectueux'},
  {slug:'cacatoes-rosalbin',icon:'🩷',name:'Cacatoès Rosalbin',desc:'Couleurs uniques'},
  {slug:'amazone-front-bleu',icon:'💚',name:'Amazone Front Bleu',desc:'Très bavard'},
  {slug:'eclectus',icon:'🦜',name:'Éclectus',desc:'Dimorphisme unique'},
];

function relSpecies(mySlug){ return ALL_SPECIES_REL.filter(s=>s.slug!==mySlug).slice(0,4); }

const species = [

{
  slug:'perroquet-gris-du-gabon',
  title:'Perroquet Gris du Gabon à Vendre | CITES | Paraíso de Aves France',
  metaDesc:'Achetez un perroquet gris du Gabon (Jaco) avec documentation CITES officielle. Éleveur enregistré, livraison dans toute la France. Le perroquet le plus intelligent du monde.',
  h1:'Perroquet Gris du Gabon',
  badge:'🩶 ÉLEVEUR ENREGISTRÉ · CITES I · ESPÈCE EXCEPTIONNELLE',
  subtitle:'Le Psittacus erithacus — considéré comme le perroquet le plus intelligent au monde — disponible avec documentation CITES complète et livraison dans toute la France.',
  pills:['✓ CITES Officiel','✓ Apprivoisé à la Main','✓ Certificat Vétérinaire','✓ Livraison France'],
  img:'loro-gris-01.webp',
  deliveryTime:'2–4',
  ctaTitle:'Intéressé par un Gris du Gabon ?',
  ctaText:'Vérifiez la disponibilité actuelle de nos Gris du Gabon avec documentation CITES I et livraison directe dans toute la France.',
  specs:[
    ['Nom scientifique','Psittacus erithacus'],
    ['Longueur','33 cm'],
    ['Poids','400 – 600 g'],
    ['Espérance de vie','50 – 70 ans'],
    ['CITES','Annexe I (protection maximale)'],
    ['Niveau sonore','Modéré (vocalisations variées)'],
    ['Intelligence','Exceptionnel — niveau cognitif d\'un enfant de 5 ans'],
    ['Aptitude verbale','Très élevée — plusieurs centaines de mots'],
    ['Convenance appartement','Oui (avec engagement quotidien)'],
    ['Alimentation','Mixte — granulés + fruits + légumes frais'],
  ],
  introHTML:`
    <p>Le Perroquet Gris du Gabon, connu aussi sous le nom de Jaco ou African Grey, est sans conteste la star des perroquets de compagnie en France. Sa réputation légendaire d'intelligence — documentée par des décennies de recherches académiques, dont les travaux remarquables de la Dre Irene Pepperberg avec Alex, un Gris du Gabon qui démontrait une compréhension conceptuelle réelle du langage — en fait une espèce à part dans le monde des psittacidés.</p>
    <p>En France, le Gris du Gabon est depuis longtemps l'espèce de perroquet la plus appréciée des amateurs éclairés. Sa discrétion relative, sa fidélité sans faille à ses tuteurs de confiance et sa capacité à s'exprimer verbalement avec une précision et une contextualisation parfois troublantes en font un compagnon de vie incomparable. De nombreux propriétaires de Gris du Gabon décrivent leur relation avec leur oiseau comme similaire à celle qu'ils ont avec un animal de compagnie exceptionnel — une relation nourrie par la réciprocité, la communication et la compréhension mutuelle.</p>
    <p>Sa plumage gris ardoise uniforme, relevé d'une queue rouge carmin éclatante et de yeux jaune pâle perçants, lui confère une élégance sobre mais immédiatement reconnaissable. Contrairement aux aras dont la beauté est explosive et chromatiquement spectaculaire, le Gris du Gabon impressionne par son regard — intense, attentif, évaluateur.</p>
    <p>Classé en Annexe I de la CITES, le Gris du Gabon bénéficie de la protection internationale la plus élevée. Toute acquisition doit obligatoirement s'accompagner d'une documentation CITES complète, fournie par un éleveur enregistré auprès des autorités compétentes. Paraíso de Aves dispose de toute la documentation nécessaire pour que l'acquisition et la détention de votre Gris du Gabon soient parfaitement légales en France.</p>
  `,
  temperHTML:`
    <p>Le Gris du Gabon est émotionnellement complexe — c'est à la fois sa richesse et son exigence. Il crée des liens d'une profondeur remarquable avec les membres de sa famille humaine, développant des préférences individuelles marquées et des rituels de communication très personnels. Cette profondeur affective a son revers : le Jaco est particulièrement sensible aux ruptures de routine, aux conflits domestiques et aux absences prolongées.</p>
    <p>L'anxiété de séparation est une problématique réelle et sérieuse chez le Gris du Gabon. Un oiseau insuffisamment stimulé, laissé seul de longues heures quotidiennement, peut développer des comportements stéréotypés comme l'arrachage de plumes — une manifestation de détresse émotionnelle qui nécessite une prise en charge vétérinaire et comportementale spécialisée. Pour les foyers où les deux adultes travaillent à l'extérieur à temps plein, l'adoption d'un Gris du Gabon mérite une réflexion approfondie — ou l'adoption en binôme.</p>
    <p>En revanche, pour les familles ou personnes avec une présence domestique significative, le Gris du Gabon offre une richesse relationnelle sans équivalent dans le monde animal. Il apprend le prénom de chaque membre de la famille, distingue les émotions humaines, commente ses propres expériences et démontre une mémoire à long terme impressionnante.</p>
  `,
  feedHTML:`
    <p>L'alimentation du Gris du Gabon doit être équilibrée et variée. Les recommandations actuelles des vétérinaires aviaires préconisent :</p>
    <ul>
      <li><strong>Granulés spécifiques psittacidés (50–60%) :</strong> Marques de référence comme Harrison's Bird Foods, Roudybush ou Zupreem Natural. Les granulés fournissent un apport nutritionnel complet et équilibré.</li>
      <li><strong>Fruits frais (15–20%) :</strong> Pomme (sans pépins !), poire, mangue, kiwi, grenade, myrtilles, framboises. La variété est essentielle.</li>
      <li><strong>Légumes frais (15–20%) :</strong> Poivron rouge et jaune (excellente source de bêtacarotène), brocoli, carotte, épinard, courgette, maïs frais.</li>
      <li><strong>Noix et graines (5–10%) :</strong> Noix, amandes, noisettes, graines de tournesol en quantité limitée.</li>
    </ul>
    <div class="highlight-box"><strong>⚠️ Aliments toxiques à proscrire absolument :</strong> Avocat, chocolat, café, alcool, oignon et ail en grande quantité, sel, graines de pomme. Ces aliments peuvent être mortels pour les perroquets.</div>
    <p>Le Gris du Gabon a des besoins particuliers en calcium et en vitamine A. Un apport insuffisant en vitamine A — très fréquent dans les régimes à base de graines exclusivement — est l'une des causes les plus courantes de problèmes de santé chez cette espèce. Les poivrons rouges et les légumes vert foncé sont d'excellentes sources naturelles de bêtacarotène (précurseur de la vitamine A).</p>
  `,
  housingHTML:`
    <p>Le Gris du Gabon nécessite une cage spacieuse — les dimensions minimales recommandées sont de 80 cm × 80 cm × 120 cm de hauteur, avec des barreaux en acier inoxydable espacés de 2 à 2,5 cm. La cage doit être suffisamment robuste pour résister au bec puissant de cette espèce.</p>
    <p>L'emplacement idéal de la cage est dans la pièce principale du logement, là où la famille passe le plus de temps — le Jaco a besoin de faire partie de la vie de la maison. Évitez les emplacements près des courants d'air, des fenêtres en plein soleil direct ou de la cuisine (les vapeurs de cuisson sont dangereuses pour les oiseaux).</p>
    <p>Votre Gris du Gabon doit pouvoir sortir de sa cage au minimum 3 à 4 heures par jour pour explorer, jouer et interagir. Un arbre à perroquets robuste dans la pièce principale facilite ces sorties supervisées.</p>
  `,
  citesHTML:`
    <p>Le Perroquet Gris du Gabon est inscrit à l'Annexe I de la CITES — le niveau de protection le plus élevé. En France, la détention de tout spécimen sans documentation CITES valide constitue une infraction au Code de l'environnement (article L.412-1), passible de sanctions pénales.</p>
    <p>Pour un Jaco acquis auprès d'un éleveur européen enregistré comme Paraíso de Aves, la documentation CITES est fournie par l'éleveur et est reconnue dans toute l'Union Européenne, dont la France. Elle comprend le certificat CITES de naissance en captivité, la bague d'identification fermée et le certificat vétérinaire.</p>
    <p>L'autorité française de gestion de la CITES est le Ministère de la Transition Écologique, via les DREAL (Directions Régionales de l'Environnement, de l'Aménagement et du Logement) et la DRIEAT pour la région parisienne. En cas de doute sur la légalité d'une acquisition, contactez directement ces organismes.</p>
  `,
  deliveryHTML:`
    <p>Nous livrons les Perroquets Gris du Gabon dans toute la France en <strong>2 à 4 jours ouvrés</strong> après confirmation du paiement. L'oiseau voyage dans une caisse IATA certifiée avec eau et nourriture pour la durée du trajet. L'ensemble de la documentation CITES, du certificat vétérinaire et des instructions d'accueil accompagne chaque livraison.</p>
    <ul>
      <li><strong>Paris et Île-de-France :</strong> 2–3 jours ouvrés</li>
      <li><strong>Grandes métropoles (Lyon, Marseille, Bordeaux, Toulouse) :</strong> 2–3 jours ouvrés</li>
      <li><strong>France entière :</strong> 2–4 jours ouvrés</li>
    </ul>
  `,
  faqs:[
    {q:'Le Perroquet Gris du Gabon est-il légal en France ?',a:'Oui, sous réserve de disposer de la documentation CITES valide. L\'annexe I de la CITES impose une documentation spécifique que tout éleveur enregistré doit fournir. Paraíso de Aves fournit toute la documentation nécessaire à la détention légale en France.'},
    {q:'Combien d\'heures d\'interaction quotidienne le Gris du Gabon nécessite-t-il ?',a:'Au minimum 3 à 4 heures par jour d\'interaction directe. C\'est l\'espèce la plus exigeante en termes d\'attention parmi les psittacidés couramment détenus. Pour les foyers où les adultes sont absents plus de 6 heures par jour, envisagez l\'adoption en binôme.'},
    {q:'Le Gris du Gabon peut-il vivre en appartement ?',a:'Oui. Le niveau sonore du Gris du Gabon est modéré comparé aux aras ou cacatoès. Il vit très bien en appartement à condition de disposer d\'espace suffisant et d\'une présence familiale importante.'},
    {q:'Quelle est la durée de vie d\'un Gris du Gabon en captivité ?',a:'Entre 50 et 70 ans. Des spécimens de plus de 80 ans ont été documentés. C\'est un engagement à vie — pensez à désigner un tuteur de confiance pour votre oiseau en cas d\'incapacité ou de décès prématuré.'},
    {q:'Le Jaco parle-t-il vraiment ?',a:'Oui, avec une précision qui peut être stupéfiante. Le Gris du Gabon est capable d\'apprendre plusieurs centaines de mots et de les utiliser en contexte de manière pertinente. La recherche académique a démontré sa compréhension conceptuelle des notions de couleur, forme, quantité et même d\'absence.'},
    {q:'Peut-on le laisser seul pendant les vacances ?',a:'Non sans organisation préalable. Le Jaco ne tolère pas bien les absences prolongées. Prévoyez une pension spécialisée en oiseaux exotiques ou un gardien de confiance venant au domicile au moins deux fois par jour. Paraíso de Aves peut vous orienter vers des solutions adaptées.'},
  ],
  related: relSpecies('perroquet-gris-du-gabon'),
},

{
  slug:'ara-hyacinthe',
  title:'Ara Hyacinthe à Vendre en France | CITES I | Paraíso de Aves',
  metaDesc:'Achetez un Ara Hyacinthe (Anodorhynchus hyacinthinus) avec documentation CITES I. Le plus grand perroquet du monde — éleveur enregistré, livraison en France.',
  h1:'Ara Hyacinthe',
  badge:'💙 CITES I · LE PLUS GRAND ARA DU MONDE · ESPÈCE RARE',
  subtitle:'Anodorhynchus hyacinthinus — le plus grand et le plus impressionnant des perroquets — disponible avec documentation CITES officielle et livraison dans toute la France.',
  pills:['✓ CITES I Officiel','✓ Apprivoisé à la Main','✓ Le Plus Grand Ara','✓ Livraison France'],
  img:'guacamayo-jacinto-01.webp',
  deliveryTime:'3–5',
  ctaTitle:'Intéressé par un Ara Hyacinthe ?',
  ctaText:'La disponibilité est très limitée. Contactez-nous pour vérifier les spécimens disponibles avec documentation CITES I complète.',
  specs:[
    ['Nom scientifique','Anodorhynchus hyacinthinus'],
    ['Longueur','95 – 100 cm'],
    ['Poids','1,2 – 1,7 kg'],
    ['Espérance de vie','50 – 60 ans'],
    ['CITES','Annexe I (protection maximale)'],
    ['Bec','Extrêmement puissant — peut briser des noix de coco'],
    ['Intelligence','Élevée — tempérament doux et affectueux'],
    ['Aptitude verbale','Modérée'],
    ['Espace nécessaire','Très grand — vol. minimum 4m × 3m × 2,5m'],
    ['Alimentation','Macadamia, noix de coco, pellets, fruits tropicaux'],
  ],
  introHTML:`
    <p>L'Ara Hyacinthe est une présence qui ne s'oublie pas. Presque un mètre de la pointe du bec à l'extrémité de la queue, un bleu cobalt profond qui absorbe et réfléchit la lumière de manière hypnotique, un cercle péri-oculaire jaune vif qui encadre un regard perçant — cet oiseau n'est pas simplement le plus grand perroquet du monde, c'est aussi l'un des plus majestueux animaux vivants.</p>
    <p>En France, l'Ara Hyacinthe est l'oiseau de compagnie le plus exclusif et le plus convoité parmi les amateurs de psittacidés. Sa rareté — la population sauvage est estimée entre 4 000 et 5 000 individus au Brésil — son classement en Annexe I de la CITES et son prix d'acquisition élevé en font un compagnon réservé aux passionnés les plus sérieux et les mieux préparés.</p>
    <p>Sa réputation d'ara doux — l'« ara gentil » selon les éleveurs expérimentés — surprend ceux qui s'attendraient à ce qu'un oiseau d'une telle puissance physique soit agressif. L'Ara Hyacinthe est au contraire un oiseau profondément affectueux, recherchant activement le contact physique avec ses tuteurs de confiance. Les propriétaires d'Ara Hyacinthe décrivent souvent une relation d'une intensité et d'une richesse émotionnelle incomparables.</p>
  `,
  temperHTML:`<p>L'Ara Hyacinthe est réputé pour son tempérament doux et son affection sincère envers ses tuteurs. Contrairement à certaines espèces plus petites qui peuvent être capricieuses, l'Ara Hyacinthe crée généralement un lien stable et prévisible. Cela dit, la puissance de son bec — capable de briser des noix de coco — impose une relation de confiance construite avec patience et cohérence. Un Ara Hyacinthe bien socialisé peut coexister avec des enfants raisonnables sous surveillance permanente. L'oiseau exprime son contentement par des vocalisations douces et musicales très différentes des cris stridents des petites espèces d'aras.</p>`,
  feedHTML:`<p>L'alimentation de l'Ara Hyacinthe en captivité doit reproduire sa diète naturelle à base de palmiers. Les noix de macadamia constituent le pilier de son alimentation — elles représentent la source lipidique la plus proche de sa nutrition sauvage. Complétez avec des pellets de qualité pour grandes espèces (30–35%), de la noix de coco fraîche, des fruits tropicaux (mangue, papaye, banane), du maïs frais et des légumes. L'Ara Hyacinthe a des besoins élevés en acides gras — une alimentation insuffisamment grasse entraîne des problèmes de plumage et de santé à long terme.</p>`,
  housingHTML:`<p>L'Ara Hyacinthe nécessite un espace considérable — c'est la contrainte principale qui doit être évaluée avant toute acquisition. Un appartement standard, même grand, n'est généralement pas adapté. La solution idéale est une pièce entière dédiée avec des perchoirs robustes en acier inoxydable, ou une volière extérieure couverte d'au moins 4m × 3m × 2,5m, accessible depuis l'intérieur lors des périodes froides. En France, les régions à hivers rigoureux nécessitent une volière chauffée ou un accès permanent à un espace intérieur chauffé.</p>`,
  citesHTML:`<p>L'Ara Hyacinthe est inscrit en Annexe I de la CITES. En France, sa détention sans documentation CITES valide est passible de poursuites pénales. Paraíso de Aves fournit l'intégralité de la documentation CITES I nécessaire pour la détention légale en France — certificat de naissance en captivité, bague d'identification et certificat vétérinaire. Ces documents sont reconnus par les autorités françaises (DREAL, DRIEAT) et valables dans toute l'Union Européenne.</p>`,
  deliveryHTML:`<p>La livraison de l'Ara Hyacinthe en France demande une logistique particulièrement soignée en raison de la taille et de la valeur de l'oiseau. Nous utilisons des caisses IATA grand format certifiées et planifions les envois en dehors des périodes de chaleur extrême ou de froid sévère. Délai estimé : <strong>3 à 5 jours ouvrés</strong> après confirmation.</p>`,
  faqs:[
    {q:'Peut-on avoir un Ara Hyacinthe dans un appartement en France ?',a:'Non recommandé pour un appartement standard. L\'Ara Hyacinthe est la plus grande espèce de perroquet et nécessite un espace proportionnel. Une maison avec une pièce dédiée ou une volière extérieure est l\'environnement idéal.'},
    {q:'Quelle est la différence entre l\'Ara Hyacinthe et l\'Ara Bleu et Jaune ?',a:'L\'Ara Hyacinthe est nettement plus grand (100 cm vs 86 cm), entièrement bleu cobalt, classé en Annexe I CITES (vs Annexe II pour l\'Ara Bleu et Jaune) et d\'un prix d\'acquisition significativement plus élevé. Le tempérament est similaire — les deux espèces sont affectueuses et sociables.'},
    {q:'Combien coûte un Ara Hyacinthe en France ?',a:'Le prix d\'un Ara Hyacinthe apprivoisé à la main avec documentation CITES I complète est significatif. Contactez-nous pour un devis actualisé — le prix varie selon l\'âge et la disponibilité.'},
    {q:'L\'Ara Hyacinthe est-il bruyant ?',a:'Il peut émettre des vocalisations puissantes, mais son tempérament doux implique des cris généralement moins fréquents que d\'autres espèces d\'aras. Ses vocalisations satisfaites sont plutôt douces et musicales.'},
    {q:'Quelle est la durée de vie d\'un Ara Hyacinthe ?',a:'Entre 50 et 60 ans en captivité bien soignée. Certains spécimens en conditions exceptionnelles ont dépassé 70 ans. C\'est un engagement qui peut dépasser une vie humaine — planifiez en conséquence.'},
  ],
  related: relSpecies('ara-hyacinthe'),
},

{
  slug:'ara-bleu-et-jaune',
  title:'Ara Bleu et Jaune à Vendre en France | CITES | Paraíso de Aves',
  metaDesc:'Achetez un Ara Bleu et Jaune (Ara ararauna) avec documentation CITES. Très sociable, livraison dans toute la France. Éleveur enregistré depuis 25+ ans.',
  h1:'Ara Bleu et Jaune',
  badge:'💛 CITES II · TRÈS SOCIABLE · EMBLÉMATIQUE',
  subtitle:'L\'Ara ararauna — le plus emblématique des perroquets — combien splendeur visuelle et personnalité joyeuse. CITES officiel, livraison dans toute la France.',
  pills:['✓ CITES Officiel','✓ Apprivoisé à la Main','✓ Très Sociable','✓ Livraison France'],
  img:'guacamayo-azul-01.webp',
  deliveryTime:'2–4',
  ctaTitle:'Votre Ara Bleu et Jaune vous attend',
  ctaText:'Vérifiez la disponibilité de nos Ara ararauna avec CITES et livraison directe dans toute la France.',
  specs:[
    ['Nom scientifique','Ara ararauna'],
    ['Longueur','86 cm'],
    ['Poids','900 g – 1,2 kg'],
    ['Espérance de vie','50 – 60 ans'],
    ['CITES','Annexe II'],
    ['Niveau sonore','Élevé en période d\'excitation'],
    ['Intelligence','Très élevée'],
    ['Aptitude verbale','Élevée'],
    ['Convenance appartement','Difficile (bruit, espace)'],
    ['Alimentation','Pellets + fruits + légumes + noix'],
  ],
  introHTML:`
    <p>L'Ara Bleu et Jaune est l'icône absolue du perroquet exotique. Sa silhouette — dos bleu électrique, ventre jaune soleil, queue longue et élancée — est immédiatement reconnaissable et a contribué à l'image populaire du perroquet tropical plus que toute autre espèce. En France, l'Ara ararauna est la deuxième espèce de grand ara la plus populaire après le Gris du Gabon, attirant des passionnés qui recherchent un compagnon spectaculaire et profondément social.</p>
    <p>L'Ara Bleu et Jaune se distingue par sa nature extravertie et communicative. Il adore les interactions, apprend facilement les rituels familiaux et exprime son contentement avec une exubérance caractéristique — des vocalisations joyeuses, des postures de jeu et une curiosité permanente pour tout ce qui se passe dans son environnement. Cette nature expressive est aussi ce qui le rend exigeant : un Ara Bleu et Jaune qui s'ennuie peut devenir très bruyant.</p>
    <p>Natif des forêts tropicales d'Amérique du Sud — du Venezuela jusqu'au Brésil central — l'Ara ararauna est une espèce adaptable qui s'accommode bien de la vie en captivité bien gérée. Son classement en Annexe II de la CITES (moins restrictif que l'Annexe I) facilite légèrement les démarches documentaires, tout en maintenant les exigences de traçabilité essentielles pour la protection de l'espèce.</p>
  `,
  temperHTML:`<p>L'Ara Bleu et Jaune est un oiseau passionné — dans les deux sens du terme. Très sociable et affectueux avec ses tuteurs de confiance, il peut également montrer de la force de caractère et nécessite une éducation cohérente fondée sur le renforcement positif. Il apprécie les interactions ludiques, le jeu actif et les défis cognitifs. Son niveau d'énergie élevé impose des sorties de cage quotidiennes d'au moins 3 à 4 heures. En l'absence de stimulation suffisante, il peut devenir destructeur ou excessivement bruyant.</p>`,
  feedHTML:`<p>L'alimentation de l'Ara Bleu et Jaune doit être variée et équilibrée : granulés de qualité pour grandes espèces (50–60%), fruits frais (mangue, pomme, poire, raisin sans pépins, papaye), légumes (poivron, brocoli, carotte, épinard, maïs), noix et amandes en quantité modérée. Évitez les régimes à base exclusive de graines — carencés en vitamines et favorisant l'obésité.</p>`,
  housingHTML:`<p>L'Ara Bleu et Jaune nécessite une cage très spacieuse — minimum 100cm × 80cm × 150cm pour l'hébergement en cage. L'idéal est une pièce dédiée ou une volière de grande taille. En France, les volières extérieures doivent être protégées des hivers rigoureux avec une section intérieure chauffée accessible en permanence. Des perchoirs de différentes dimensions — en bois naturel non traité de préférence — doivent varier l'exercice des pattes et du bec.</p>`,
  citesHTML:`<p>L'Ara Bleu et Jaune est inscrit à l'Annexe II de la CITES. Sa détention en France nécessite une documentation d'origine — certificat CITES de naissance en captivité et bague d'identification fermée — fournie par l'éleveur. Paraíso de Aves fournit toute la documentation requise, valable dans toute l'Union Européenne.</p>`,
  deliveryHTML:`<p>Livraison en France en <strong>2 à 4 jours ouvrés</strong> par transporteur spécialisé en animaux vivants. Caisse IATA certifiée incluse. Toute la documentation CITES et le certificat vétérinaire accompagnent la livraison.</p>`,
  faqs:[
    {q:'L\'Ara Bleu et Jaune est-il adapté à la vie en appartement ?',a:'C\'est difficile. Le niveau sonore de l\'Ara ararauna est élevé en période d\'excitation — ses cris peuvent traverser les murs. Une maison avec jardin ou un appartement avec bonne isolation acoustique et des voisins tolérants est nécessaire.'},
    {q:'L\'Ara Bleu et Jaune parle-t-il ?',a:'Oui, avec une bonne aptitude verbale. La plupart des spécimens apprennent plusieurs dizaines à quelques centaines de mots et de courtes phrases, souvent avec une intonation très précise.'},
    {q:'Peut-on avoir un Ara Bleu et Jaune avec d\'autres animaux ?',a:'Avec précautions. Avec les chiens et chats, la cohabitation nécessite une surveillance permanente et une séparation physique quand le tuteur n\'est pas présent. Avec d\'autres espèces de perroquets, une introduction progressive est nécessaire.'},
    {q:'Quelle est la différence avec l\'Ara Macao ?',a:'L\'Ara Macao a un plumage tricolore spectaculaire (rouge, jaune, bleu), un tempérament légèrement plus vif et parfois moins prévisible. Les deux espèces sont de taille similaire. L\'Ara Bleu et Jaune est généralement considéré comme plus facile à gérer pour les propriétaires moins expérimentés.'},
    {q:'Comment obtenir la documentation CITES pour un Ara Bleu et Jaune en France ?',a:'En achetant auprès d\'un éleveur enregistré comme Paraíso de Aves, la documentation CITES est fournie directement par l\'éleveur. Elle est valide dans toute l\'Union Européenne et reconnue par les autorités françaises (DREAL).'},
  ],
  related: relSpecies('ara-bleu-et-jaune'),
},

{
  slug:'ara-macao',
  title:'Ara Macao à Vendre en France | CITES | Éleveur Enregistré',
  metaDesc:'Achetez un Ara Macao (Ara macao) avec CITES officiel. Le perroquet aux couleurs les plus spectaculaires — livraison dans toute la France. Éleveur enregistré 25 ans.',
  h1:'Ara Macao',
  badge:'❤️ CITES I · COULEURS SPECTACULAIRES · ESPÈCE RARE',
  subtitle:'L\'Ara macao — rouge, jaune et bleu éclatants — est l\'un des oiseaux les plus beaux du monde. Documentation CITES I officielle, livraison dans toute la France.',
  pills:['✓ CITES Officiel','✓ Apprivoisé à la Main','✓ Le Plus Coloré','✓ Livraison France'],
  img:'guacamayo-escarlata-01.webp',
  deliveryTime:'3–5',
  ctaTitle:'Votre Ara Macao vous attend',
  ctaText:'Disponibilité limitée — contactez-nous pour vérifier les spécimens disponibles avec documentation CITES I complète.',
  specs:[
    ['Nom scientifique','Ara macao'],
    ['Longueur','86 – 90 cm'],
    ['Poids','900 g – 1,1 kg'],
    ['Espérance de vie','40 – 50 ans'],
    ['CITES','Annexe I'],
    ['Plumage','Rouge, jaune, bleu, vert — spectaculaire'],
    ['Intelligence','Élevée'],
    ['Aptitude verbale','Modérée à élevée'],
    ['Tempérament','Vif, passionné, parfois imprévisible'],
    ['Alimentation','Pellets + fruits + légumes + noix'],
  ],
  introHTML:`
    <p>L'Ara Macao — Ara macao — est souvent le premier perroquet qui vient à l'esprit lorsqu'on imagine un oiseau tropical : rouge flamboyant sur les ailes et le dos, jaune vif en dégradé vers le bleu électrique des rémiges, une longue queue rouge et bleue qui frôle le sol. Sa beauté chromatique est si intense qu'elle semble irréelle — comme si la nature avait voulu créer son chef-d'œuvre en matière d'oiseau coloré.</p>
    <p>En France, l'Ara Macao est une espèce de niche — plus rare en captivité que l'Ara Bleu et Jaune ou le Gris du Gabon — ce qui en fait un choix très distinctif pour les passionnés qui recherchent quelque chose d'exceptionnel. Son classement en Annexe I de la CITES (aux côtés du Gris du Gabon et de l'Ara Hyacinthe) témoigne de l'importance de sa protection internationale.</p>
    <p>Originaire des forêts tropicales depuis le Mexique jusqu'à l'Amazonie brésilienne, l'Ara Macao est une espèce adaptée aux milieux variés. En captivité, sa personnalité vive et passionnée en fait un compagnon extraordinaire pour les tuteurs expérimentés qui savent canaliser son énergie avec cohérence et enrichissement constant.</p>
  `,
  temperHTML:`<p>L'Ara Macao est souvent décrit comme le plus « volcanique » des grands aras — vif, passionné, enthousiaste et parfois imprévisible. Son niveau d'énergie élevé et sa forte personnalité exigent un tuteur expérimenté, capable de maintenir des limites claires et cohérentes. En revanche, un Ara Macao bien éduqué et correctement stimulé est d'une compagnie extraordinaire — expressif, joueur, affectueux et capable de créer des liens d'une profondeur remarquable. L'éducation par renforcement positif exclusif est essentielle : toute punition physique serait non seulement inefficace mais destructrice de la confiance.</p>`,
  feedHTML:`<p>Régime similaire aux autres grands aras : granulés de qualité (50–60%), fruits frais (mangue, papaye, grenade, kiwi, raisin sans pépins), légumes variés (poivron, brocoli, carotte, maïs), noix et amandes en quantité modérée. Assurez une hydratation quotidienne abondante — les aras boivent relativement peu mais apprécient les bains réguliers.</p>`,
  housingHTML:`<p>Mêmes exigences spatiales que l'Ara Bleu et Jaune : cage très spacieuse ou pièce dédiée, avec des perchoirs très robustes capables de résister au bec puissant de l'Ara Macao. En France, prévoyez un chauffage pour les hivers dans toutes les régions au nord de Lyon.</p>`,
  citesHTML:`<p>L'Ara Macao est inscrit en Annexe I de la CITES. La documentation CITES I fournie par Paraíso de Aves est valide en France et dans toute l'UE. Pour toute question sur la légalité de la détention en France, contactez la DREAL de votre région.</p>`,
  deliveryHTML:`<p>Livraison en France en <strong>3 à 5 jours ouvrés</strong>. Caisse IATA grand format, documentation CITES I complète et certificat vétérinaire inclus.</p>`,
  faqs:[
    {q:'L\'Ara Macao est-il plus difficile que l\'Ara Bleu et Jaune ?',a:'Généralement oui — il est considéré comme plus vif et potentiellement moins prévisible dans ses réactions. Il est recommandé pour des personnes ayant déjà une expérience avec les grands psittacidés.'},
    {q:'L\'Ara Macao peut-il vivre avec des enfants ?',a:'Avec surveillance permanente et sous réserve que les enfants respectent l\'espace de l\'oiseau. Son bec puissant peut causer des blessures sérieuses si l\'oiseau se sent menacé. Une éducation mutuelle — oiseau ET enfants — est indispensable.'},
    {q:'Combien vit un Ara Macao en captivité ?',a:'Entre 40 et 50 ans en captivité bien soignée — potentiellement jusqu\'à 60 ans dans des conditions excellentes.'},
    {q:'Comment distinguer l\'Ara Macao de l\'Ara Chloroptère ?',a:'L\'Ara Chloroptère (Ara chloropterus) est légèrement plus grand, avec des ailes vert vif marquées de rouge. L\'Ara Macao a des taches jaunes caractéristiques sur ses ailes — un marquage absent chez le Chloroptère.'},
    {q:'L\'Ara Macao apprend-il facilement à parler ?',a:'Modérément. Il apprend des mots et de courtes phrases, mais avec une aptitude généralement inférieure au Gris du Gabon ou à l\'Amazone. Ce n\'est pas l\'espèce à choisir si la capacité verbale est votre critère principal.'},
  ],
  related: relSpecies('ara-macao'),
},

{
  slug:'cacatoes-huppe-jaune',
  title:'Cacatoès à Huppe Jaune à Vendre en France | CITES | Paraíso de Aves',
  metaDesc:'Achetez un Cacatoès à Huppe Jaune (Cacatua galerita) avec CITES. Le plus populaire des cacatoès — livraison dans toute la France. Éleveur enregistré 25+ ans.',
  h1:'Cacatoès à Huppe Jaune',
  badge:'🤍 CITES II · LE PLUS POPULAIRE · TRÈS AFFECTUEUX',
  subtitle:'Cacatua galerita — blanc immaculé, huppe jaune éclatante, personnalité débordante — le cacatoès le plus apprécié en France, avec CITES officiel et livraison dans toute la France.',
  pills:['✓ CITES Officiel','✓ Apprivoisé à la Main','✓ Très Affectueux','✓ Livraison France'],
  img:'cacatua-01.webp',
  deliveryTime:'2–4',
  ctaTitle:'Adoptez un Cacatoès à Huppe Jaune',
  ctaText:'Nos spécimens sont apprivoisés à la main depuis la naissance pour garantir leur adaptation à la vie familiale. Vérifiez la disponibilité.',
  specs:[
    ['Nom scientifique','Cacatua galerita'],
    ['Longueur','44 – 55 cm'],
    ['Poids','820 – 1 000 g'],
    ['Espérance de vie','40 – 60 ans'],
    ['CITES','Annexe II'],
    ['Niveau sonore','Très élevé (jusqu\'à 85 dB)'],
    ['Intelligence','Très élevée'],
    ['Aptitude verbale','Bonne (intonation très précise)'],
    ['Besoin d\'attention','Extrêmement élevé'],
    ['Alimentation','Pellets + fruits + légumes (gras limité)'],
  ],
  introHTML:`
    <p>Le Cacatoès à Huppe Jaune est l'icône de l'Australie aviaire — blanc immaculé, huppe jaune déployée lors des moments d'excitation, yeux noirs expressifs, bec noir puissant. En France, c'est l'espèce de cacatoès la plus connue et la plus demandée, portée par une réputation d'affection extraordinaire et de personnalité flamboyante.</p>
    <p>Le Cacatua galerita est originaire d'Australie et de Nouvelle-Guinée, où il peuple les forêts et les zones agricoles par milliers. En captivité, sa vie est très longue — jusqu'à 60 ans et au-delà — et sa demande d'attention émotionnelle est parmi les plus élevées de toutes les espèces de perroquets. C'est un oiseau qui ne supporte pas l'ennui et qui exprime sa détresse d'une façon très audible.</p>
    <p>En France, le Cacatoès à Huppe Jaune est donc un oiseau pour les passionnés avec beaucoup de temps — idéalement des personnes travaillant à domicile, des retraités ou des familles avec une présence domestique importante. Pour ceux qui réunissent ces conditions, le Cacatoès à Huppe Jaune est un compagnon dont l'affection et la présence sont proprement incomparables.</p>
  `,
  temperHTML:`<p>Le Cacatoès à Huppe Jaune est le perroquet le plus affectueux parmi toutes les espèces courantes — et aussi le plus exigeant à cet égard. Il peut nécessiter 6 à 8 heures d'interaction quotidienne pour s'épanouir pleinement. Un cacatoès privé d'attention peut développer des stéréotypies graves comme l'arrachage de plumes. Son niveau sonore exceptionnel est à la fois son charme et son défi principal pour la vie en appartement. En milieu rural ou dans une maison avec isolation phonique, la richesse de sa personnalité l'emporte très largement sur cette contrainte.</p>`,
  feedHTML:`<p>Le Cacatoès à Huppe Jaune est prédisposé à l'obésité en captivité — son alimentation doit donc être moins riche en graisses que celle des aras. Granulés de qualité (60–70%), fruits frais variés, légumes (poivron, brocoli, carotte), légumineuses cuites. Les graines et noix doivent être très limitées. Un suivi vétérinaire régulier incluant une surveillance du poids est recommandé.</p>`,
  housingHTML:`<p>Cage solide d'au moins 90cm × 70cm × 120cm avec barreaux en acier inoxydable — le cacatoès est destructeur avec les cages de mauvaise qualité. Des jouets en bois non traité doivent être renouvelés régulièrement car le bec du cacatoès les transforme en sciure avec enthousiasme. Un arbre à perroquets robuste dans la pièce principale facilite les sorties quotidiennes.</p>`,
  citesHTML:`<p>Le Cacatoès à Huppe Jaune est en Annexe II de la CITES. Paraíso de Aves fournit la documentation complète — certificat CITES, bague d'identification, certificat vétérinaire — valide en France et dans toute l'UE.</p>`,
  deliveryHTML:`<p>Livraison en France en <strong>2 à 4 jours ouvrés</strong>. Toute la documentation et la caisse IATA certifiée sont incluses.</p>`,
  faqs:[
    {q:'Le Cacatoès à Huppe Jaune peut-il vivre en appartement en France ?',a:'Difficile dans un appartement standard. Son niveau sonore très élevé (jusqu\'à 85 dB) pose des problèmes de voisinage réels. Une maison ou un appartement très bien isolé acoustiquement avec des voisins tolérants est le minimum requis.'},
    {q:'Combien d\'heures d\'attention nécessite-t-il chaque jour ?',a:'Idéalement 5 à 8 heures de présence et d\'interaction. C\'est l\'espèce la plus exigeante en termes d\'attention de toutes les espèces courantes. Pour les foyers avec beaucoup d\'absences, envisagez une espèce plus indépendante.'},
    {q:'Peut-on le laisser avec d\'autres oiseaux ?',a:'Avec précautions et introduction progressive. Le Cacatoès à Huppe Jaune peut coexister avec d\'autres espèces mais peut aussi devenir dominateur. La cohabitation doit toujours être supervisée au début.'},
    {q:'Quelle est la différence avec le Cacatoès Rosalbin ?',a:'Le Rosalbin (Eolophus roseicapilla) est plus petit, rose et gris, et généralement considéré comme moins exigeant en termes d\'attention. Son niveau sonore est aussi plus modéré. Le Cacatoès à Huppe Jaune est plus grand, entièrement blanc et à la personnalité plus intense.'},
    {q:'L\'arrachage de plumes est-il fréquent chez cette espèce ?',a:'Malheureusement, c\'est l\'un des problèmes les plus courants chez le Cacatoès à Huppe Jaune insuffisamment stimulé. C\'est une manifestation de détresse émotionnelle — et non un comportement "naturel". Un oiseau correctement pris en charge et suffisamment stimulé ne devrait pas développer ce comportement.'},
  ],
  related: relSpecies('cacatoes-huppe-jaune'),
},

{
  slug:'cacatoes-rosalbin',
  title:'Cacatoès Rosalbin à Vendre en France | CITES | Paraíso de Aves',
  metaDesc:'Achetez un Cacatoès Rosalbin (Eolophus roseicapilla) avec CITES. Rose et gris, personnalité douce — livraison dans toute la France. Éleveur enregistré.',
  h1:'Cacatoès Rosalbin',
  badge:'🩷 CITES II · COULEURS DOUCES · PERSONNALITÉ ÉQUILIBRÉE',
  subtitle:'Eolophus roseicapilla — rose et gris, le cacatoès le plus accessible et le plus équilibré — avec CITES officiel et livraison dans toute la France.',
  pills:['✓ CITES Officiel','✓ Apprivoisé à la Main','✓ Tempérament Équilibré','✓ Livraison France'],
  img:'cacatua-02.webp',
  deliveryTime:'2–4',
  ctaTitle:'Adoptez un Cacatoès Rosalbin',
  ctaText:'Le cacatoès le plus accessible et le plus adapté à la vie familiale moderne — disponible avec CITES et livraison en France.',
  specs:[
    ['Nom scientifique','Eolophus roseicapilla'],
    ['Longueur','35 – 38 cm'],
    ['Poids','270 – 350 g'],
    ['Espérance de vie','25 – 40 ans'],
    ['CITES','Annexe II'],
    ['Plumage','Rose vif + gris ardoise'],
    ['Niveau sonore','Modéré à élevé'],
    ['Intelligence','Élevée'],
    ['Besoin d\'attention','Élevé (mais plus modéré que le Huppé Jaune)'],
    ['Alimentation','Pellets + légumes + fruits (très peu de graines)'],
  ],
  introHTML:`
    <p>Le Cacatoès Rosalbin est l'oiseau qui réconcilie beauté, personnalité et accessibilité. Sa robe rose intense contrastant avec le gris ardoise du dos et des ailes est l'une des plus belles combinaisons de couleurs de la famille des cacatoès. En Australie, c'est l'une des espèces les plus communes — des milliers de Rosalbins peuplent les parcs et les jardins des villes australiennes. En France, c'est une espèce de niche appréciée pour son tempérament plus équilibré que le Cacatoès à Huppe Jaune.</p>
    <p>Le Rosalbin est généralement considéré comme un meilleur choix pour les familles et pour les tuteurs moins expérimentés en cacatoès : moins bruyant, moins exigeant en temps d'attention et plus stable émotionnellement. Ce "moins" est tout relatif — il reste un cacatoès, avec toutes les exigences que cela implique — mais par rapport à son cousin à huppe jaune, la différence est significative.</p>
    <p>En France, sa taille moyenne (35–38 cm) le rend plus facile à héberger et sa personnalité plus tempérée le rend plus adapté aux appartements bien isolés et aux familles avec enfants supervisés.</p>
  `,
  temperHTML:`<p>Le Rosalbin est affectueux, joueur et curieux, avec un niveau d'énergie élevé mais un tempérament plus stable que le Cacatoès à Huppe Jaune. Il aime les interactions et les jeux actifs, mais tolère mieux les périodes de moindre attention. La relation avec le tuteur est intense et exclusive — le Rosalbin développe souvent des préférences marquées pour un membre de la famille. Il peut aussi être territorialement possessif vis-à-vis de sa cage.</p>`,
  feedHTML:`<p>Le Rosalbin est très sensible aux excès de graisses et de sucres — une alimentation basée sur les graines entraîne rapidement des carences et une obésité. Son régime doit être composé principalement de granulés de bonne qualité (60–70%), de légumes frais variés, d'une petite quantité de fruits et de légumineuses cuites. Les graines et fruits secs doivent être de véritables friandises occasionnelles.</p>`,
  housingHTML:`<p>Cage robuste d'au moins 80cm × 60cm × 100cm, avec sorties quotidiennes de 2 à 3 heures minimum. En France, le Rosalbin peut tolérer des températures fraîches (jusqu'à 10°C) pendant de courtes périodes, mais doit disposer d'un environnement intérieur chauffé pour les nuits d'hiver.</p>`,
  citesHTML:`<p>Annexe II de la CITES. Documentation complète fournie par Paraíso de Aves — certificat CITES, bague d'identification, certificat vétérinaire. Valide en France et dans toute l'UE.</p>`,
  deliveryHTML:`<p>Livraison en France en <strong>2 à 4 jours ouvrés</strong>. Caisse IATA certifiée et documentation complète incluses.</p>`,
  faqs:[
    {q:'Le Cacatoès Rosalbin est-il adapté aux appartements ?',a:'Mieux adapté que le Cacatoès à Huppe Jaune, mais toujours exigeant en termes de bruit. Dans un appartement avec bonne isolation et des voisins tolérants, c\'est envisageable avec beaucoup de stimulation.'},
    {q:'Peut-on distinguer facilement les mâles des femelles ?',a:'Oui, par la couleur de l\'iris : les mâles ont l\'iris brun foncé, les femelles l\'iris rose ou rouge. C\'est l\'un des rares cacatoès à présenter un dimorphisme sexuel visible à l\'œil nu.'},
    {q:'Est-il facile à apprivoiser ?',a:'Oui, surtout apprivoisé dès le plus jeune âge comme dans notre élevage. Un Rosalbin apprivoisé à la main est généralement très confiant et s\'adapte rapidement à son nouveau foyer.'},
    {q:'Quelle est la différence entre le Rosalbin et le Cacatoès à Huppe Jaune ?',a:'Le Rosalbin est plus petit, rose et gris, avec un niveau sonore et d\'exigence d\'attention légèrement inférieurs. Le Huppé Jaune est plus grand, entièrement blanc, et a la personnalité la plus intense de tous les cacatoès.'},
    {q:'Le Rosalbin peut-il vivre seul ou faut-il l\'adopter en couple ?',a:'Il peut vivre seul avec une présence humaine suffisante. Si vous êtes souvent absent, envisagez l\'adoption d\'un second Rosalbin — les deux s\'entendent généralement très bien de la même espèce.'},
  ],
  related: relSpecies('cacatoes-rosalbin'),
},

{
  slug:'amazone-front-bleu',
  title:'Amazone à Front Bleu à Vendre en France | CITES | Paraíso de Aves',
  metaDesc:'Achetez une Amazone à Front Bleu (Amazona aestiva) avec CITES. Très bavarde, personnalité forte — livraison dans toute la France. Éleveur enregistré 25+ ans.',
  h1:'Amazone à Front Bleu',
  badge:'💚 CITES II · TRÈS BAVARDE · PERSONNALITÉ FORTE',
  subtitle:'Amazona aestiva — verte, extravertie et extraordinairement bavarde — la plus populaire des amazones en France, avec CITES officiel et livraison dans toute la France.',
  pills:['✓ CITES Officiel','✓ Apprivoisé à la Main','✓ Très Communicative','✓ Livraison France'],
  img:'loro-amazonico-01.webp',
  deliveryTime:'2–4',
  ctaTitle:'Adoptez votre Amazone à Front Bleu',
  ctaText:'Extravertie, bavarde et profondément attachante — vérifiez la disponibilité de nos spécimens avec CITES et livraison France.',
  specs:[
    ['Nom scientifique','Amazona aestiva'],
    ['Longueur','37 – 41 cm'],
    ['Poids','400 – 500 g'],
    ['Espérance de vie','40 – 70 ans'],
    ['CITES','Annexe II'],
    ['Plumage','Vert dominant, front bleu, épaules jaunes, queue rouge'],
    ['Niveau sonore','Modéré à élevé (très vocal)'],
    ['Aptitude verbale','Très élevée — excellente articulation'],
    ['Tempérament','Extraverti, passionné, curieux'],
    ['Alimentation','Pellets + fruits + légumes (graines très limitées)'],
  ],
  introHTML:`
    <p>L'Amazone à Front Bleu est la grande vedette du répertoire verbal des perroquets. Si le Gris du Gabon est l'intellectuel du monde des psittacidés — comprenant et utilisant le langage avec une précision conceptuelle — l'Amazone est l'orateur-né, le comédien, l'entertainer. Son aptitude verbale est exceptionnelle : intonation précise, mimique sonore parfaite, vocabulaire étendu et surtout, un plaisir manifeste dans l'acte de vocaliser.</p>
    <p>En France, l'Amazone à Front Bleu (Amazona aestiva) est depuis longtemps la plus populaire des amazones — devant l'Amazone à Nuque Jaune — grâce à sa combinalité d'une personnalité explosive, d'une bonne santé générale et d'un tempérament qui, correctement géré, en fait un compagnon extraordinaire. Ses couleurs, dominées par un vert intense avec des touches de bleu (front), rouge (ailes) et jaune (épaules), sont belles sans être criantes.</p>
    <p>Originaire du Brésil et de l'Argentine — en particulier du Pantanal, du cerrado et des forêts galeries — l'Amazone aestiva est une espèce robuste et adaptable. Sa longévité peut atteindre 70 ans dans des conditions de soins optimales, en faisant l'un des engagements les plus durables du monde animal de compagnie.</p>
  `,
  temperHTML:`<p>L'Amazone à Front Bleu est extravertie, curieuse et passionnée — dans les bons moments, c'est un spectacle de joie et d'expressivité. Elle peut aussi manifester une forte personnalité lors de la période de maturité sexuelle (5–12 ans), devenant parfois plus territoriale et moins prévisible. Une éducation cohérente par renforcement positif, commencée dès le plus jeune âge, est essentielle pour traverser cette période sereinement. Les propriétaires d'Amazones décrivent souvent la maturité sexuelle comme un défi — mais une Amazone mature bien éduquée est aussi l'oiseau le plus riche et le plus profond à côtoyer.</p>`,
  feedHTML:`<p>L'Amazone est sensible à l'obésité — évitez les régimes riches en graisses. Granulés de qualité (55–65%), légumes frais (poivron, brocoli, carotte, courgette, épinard), fruits variés en quantité modérée, légumineuses cuites. Les graines de tournesol doivent être très limitées — elles sont comme des chips pour les amazones : irrésistibles mais caloriquement destructrices si consommées à excès.</p>`,
  housingHTML:`<p>Cage solide d'au moins 80cm × 70cm × 100cm, avec des sorties quotidiennes de 2 à 3 heures. L'Amazone est moins destructrice que les aras mais reste un oiseau vigoureux qui nécessite des jouets régulièrement renouvelés. En France, aucune contrainte climatique particulière — l'Amazone s'adapte bien aux températures intérieures européennes.</p>`,
  citesHTML:`<p>Annexe II de la CITES. Documentation fournie par Paraíso de Aves — valide en France et dans toute l'Union Européenne. Conformément à la réglementation française (Article L.412-1 du Code de l'environnement), la documentation CITES doit être conservée et présentable à toute inspection.</p>`,
  deliveryHTML:`<p>Livraison en France en <strong>2 à 4 jours ouvrés</strong>. Documentation CITES complète et certificat vétérinaire inclus dans chaque livraison.</p>`,
  faqs:[
    {q:'L\'Amazone à Front Bleu est-elle le meilleur perroquet pour apprendre à parler ?',a:'Elle est parmi les meilleures, aux côtés du Gris du Gabon. Son aptitude verbale est très élevée, avec une intonation précise et un plaisir manifeste dans la vocalisation. Elle peut apprendre plusieurs centaines de mots et de courtes chansons.'},
    {q:'Comment se passe la période de maturité sexuelle ?',a:'Entre 5 et 12 ans, l\'Amazone peut devenir plus territoriale et moins prévisible. Des comportements de « braquage » (attaque sans avertissement) peuvent apparaître. Un vétérinaire aviaire peut conseiller des stratégies comportementales adaptées pour traverser cette période.'},
    {q:'Peut-elle vivre en appartement en France ?',a:'Oui, avec une isolation acoustique correcte. L\'Amazone est vocal mais son niveau sonore est généralement plus gérable que les aras ou les cacatoès. Dans un appartement avec des murs épais (haussmannien, par exemple), c\'est tout à fait envisageable.'},
    {q:'L\'Amazone à Front Bleu et l\'Amazone à Nuque Jaune — laquelle choisir ?',a:'Les deux sont excellentes. L\'Amazone à Nuque Jaune (Amazona ochrocephala) est souvent considérée comme légèrement meilleure parleur, mais la différence est minime. L\'Amazone à Front Bleu (aestiva) est généralement plus disponible en Europe.'},
    {q:'Combien vit une Amazone à Front Bleu ?',a:'Entre 40 et 70 ans — l\'une des espèces les plus longévives de taille moyenne. Des spécimens de plus de 80 ans ont été documentés.'},
  ],
  related: relSpecies('amazone-front-bleu'),
},

{
  slug:'eclectus',
  title:'Éclectus à Vendre en France | CITES | Paraíso de Aves',
  metaDesc:'Achetez un Éclectus (Eclectus roratus) avec documentation CITES. Dimorphisme sexuel spectaculaire, tempérament serein — livraison dans toute la France.',
  h1:'Perroquet Éclectus',
  badge:'🦜 CITES II · DIMORPHISME UNIQUE · TEMPÉRAMENT SEREIN',
  subtitle:'Eclectus roratus — le perroquet au dimorphisme sexuel le plus spectaculaire du monde — avec CITES officiel, régime alimentaire spécifique et livraison dans toute la France.',
  pills:['✓ CITES Officiel','✓ Apprivoisé à la Main','✓ Tempérament Serein','✓ Livraison France'],
  img:'eclectus-01.webp',
  deliveryTime:'2–4',
  ctaTitle:'Adoptez un Perroquet Éclectus',
  ctaText:'Mâle ou femelle — vérifiez la disponibilité de nos Éclectus avec CITES et livraison directe en France.',
  specs:[
    ['Nom scientifique','Eclectus roratus'],
    ['Longueur','35 – 42 cm'],
    ['Poids','375 – 550 g'],
    ['Espérance de vie','30 – 50 ans'],
    ['CITES','Annexe II'],
    ['Dimorphisme','Mâle : vert/rouge. Femelle : rouge/bleu — spectaculaire'],
    ['Niveau sonore','Modéré (plus silencieux que la plupart)'],
    ['Intelligence','Élevée'],
    ['Tempérament','Calme, observateur, serein'],
    ['Alimentation','Fruits frais + légumes (pellets avec modération)'],
  ],
  introHTML:`
    <p>Le Perroquet Éclectus est une espèce à part dans le monde des psittacidés pour une raison saisissante : son dimorphisme sexuel est si prononcé que pendant des décennies, les mâles et les femelles ont été classifiés comme des espèces distinctes. Le mâle Éclectus est vert émeraude intense, avec un bec orange vif et des flancs rouge et bleu — d'une beauté végétale, presque irréelle. La femelle est rouge vif sur la tête et la poitrine, avec un ventre et des ailes bleu royal et un bec entièrement noir — une autre splendeur, radicalement différente.</p>
    <p>En France, l'Éclectus gagne progressivement une popularité méritée auprès des passionnés qui recherchent un oiseau de caractère avec un tempérament plus serein que les aras ou les cacatoès. Son niveau sonore modéré — nettement inférieur à la plupart des grands psittacidés — en fait l'une des meilleures options pour les appartements urbains en France.</p>
    <p>Natif de la Mélanésie, de l'Indonésie et du nord de l'Australie, l'Éclectus est adapté aux milieux forestiers humides. En captivité, ses besoins alimentaires spécifiques — une diète riche en fruits frais et légumes, nettement différente des autres psittacidés — nécessitent un engagement nutritionnel particulier de la part du tuteur.</p>
  `,
  temperHTML:`<p>L'Éclectus se distingue par un tempérament plus posé et observateur que la plupart des autres psittacidés de taille comparable. Il préfère observer avant d'agir, évalue ses interlocuteurs avec attention et crée des liens profonds basés sur la confiance construite progressivement. Il est moins enclin aux comportements impulsifs des aras ou à l'exigence émotionnelle intense des cacatoès. Cela en fait un excellent choix pour les tuteurs qui apprécient une relation tranquille mais profonde. Il existe une différence de tempérament notable entre mâle (généralement plus doux et sociable) et femelle (plus indépendante et potentiellement plus territoriale).</p>`,
  feedHTML:`<p>L'alimentation de l'Éclectus est son principal défi pour les tuteurs non avertis. Son tractus digestif long et ses besoins nutritionnels spécifiques imposent une diète basée sur les fruits et légumes frais (70–80%) plutôt que sur les pellets. Les pellets contenant des colorants artificiels, des conservateurs ou des vitamines synthétiques peuvent causer une hypertrichose (croissance anormale des plumes) chez cette espèce. Si vous utilisez des pellets, choisissez des formules naturelles sans additifs — Harrison's Bird Foods est une référence sûre. La variété alimentaire est clé : mangue, papaye, grenade, figue, brocoli, poivron, maïs, épinard.</p>`,
  housingHTML:`<p>Cage d'au moins 80cm × 60cm × 100cm avec des perchoirs de différentes diamètres pour la santé des pattes. L'Éclectus est moins destructeur que les aras mais apprécie les jouets en bois naturel et les défis cognitifs. En France, il tolère bien les températures intérieures européennes — pas de contrainte climatique particulière.</p>`,
  citesHTML:`<p>Annexe II de la CITES. Paraíso de Aves fournit toute la documentation nécessaire — certificat CITES, bague d'identification, certificat vétérinaire. Valide en France et dans toute l'UE.</p>`,
  deliveryHTML:`<p>Livraison en France en <strong>2 à 4 jours ouvrés</strong>. Toute la documentation et la caisse IATA certifiée sont incluses.</p>`,
  faqs:[
    {q:'Comment distinguer le mâle de la femelle Éclectus ?',a:'Très facilement — c\'est l\'un des rares perroquets chez qui le dimorphisme est évident à l\'œil nu. Le mâle est vert et rouge ; la femelle est rouge et bleue. Les deux sont spectaculaires mais radicalement différents visuellement.'},
    {q:'Pourquoi les pellets peuvent-ils poser problème chez l\'Éclectus ?',a:'Le tractus digestif long de l\'Éclectus ne tolère pas bien les additifs artificiels présents dans de nombreux pellets du commerce. Ces additifs peuvent interférer avec l\'absorption des vitamines et causer des problèmes de plumage. Choisissez uniquement des pellets naturels certifiés sans colorants ni conservateurs.'},
    {q:'L\'Éclectus est-il adapté aux appartements en France ?',a:'Oui — c\'est l\'une des meilleures espèces de grande taille pour les appartements en raison de son niveau sonore modéré. Ses vocalisations sont douces et musicales, nettement moins envahissantes que celles des aras ou des cacatoès.'},
    {q:'L\'Éclectus parle-t-il ?',a:'Oui, avec une bonne aptitude verbale — mais il exprime généralement son intelligence de manière plus comportementale que verbale. Il apprend des mots et des phrases avec une intonation précise, mais son vocabulaire est généralement moins étendu que celui du Gris du Gabon ou de l\'Amazone.'},
    {q:'Combien coûte un Éclectus en France ?',a:'Le prix d\'un Éclectus apprivoisé à la main avec documentation CITES varie selon l\'âge, le sexe et la disponibilité. Contactez-nous pour un devis actualisé.'},
  ],
  related: relSpecies('eclectus'),
},

];

/* ════════════════════════════════════════════════
   CITY PAGES
════════════════════════════════════════════════ */

function citySchemasFR(c){
  const faqList = c.faqs.map(f=>`{"@type":"Question","name":${JSON.stringify(f.q)},"acceptedAnswer":{"@type":"Answer","text":${JSON.stringify(f.a)}}}`).join(',');
  return `<script type="application/ld+json">{"@context":"https://schema.org","@graph":[
{"@type":"WebPage","@id":"${BASE}/fr/${c.slug}/","name":${JSON.stringify(c.title)},"description":${JSON.stringify(c.metaDesc)},"url":"${BASE}/fr/${c.slug}/","inLanguage":"fr-FR"},
{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Accueil","item":"${BASE}/fr/"},{"@type":"ListItem","position":2,"name":"Perroquets à Vendre","item":"${BASE}/fr/perroquets/"},{"@type":"ListItem","position":3,"name":${JSON.stringify('Perroquets à ' + c.name)},"item":"${BASE}/fr/${c.slug}/"}]},
{"@type":"FAQPage","mainEntity":[${faqList}]},
{"@type":"LocalBusiness","@id":"${BASE}/#lb-fr-${c.key}","name":"Paraíso de Aves","description":"Éleveur enregistré de perroquets avec livraison à ${c.name}","url":"${BASE}/fr/","email":"${EMAIL}","address":{"@type":"PostalAddress","addressLocality":"Llíria","addressRegion":"Valence","addressCountry":"ES"},"areaServed":{"@type":"City","name":"${c.name}","addressCountry":"FR"}},
{"@type":"Organization","@id":"${BASE}/#org","name":"Paraíso de Aves","url":"${BASE}","email":"${EMAIL}"}
]}</script>`;
}

function generateCityPageFR(c){
  const relCities = ALL_FR_CITIES.filter(x=>x.slug!==c.slug).slice(0,6);
  return `${frHead({title:c.title,metaDesc:c.metaDesc,canonical:`/fr/${c.slug}/`,ogImage:c.img,frPath:`/fr/${c.slug}/`,type:'website'})}
  ${citySchemasFR(c)}
</head>
<body>
${frNav('Perroquets')}
<section class="hero">
  <p class="badge">🦜 LIVRAISON À ${c.name.toUpperCase()} · CITES OFFICIEL</p>
  <h1>Perroquets à Vendre à ${c.name}</h1>
  <p class="subtitle">${c.subtitle}</p>
  <div class="trust-pills">${c.pills.map(p=>`<span>${p}</span>`).join('')}</div>
</section>
<nav class="breadcrumb-bar" aria-label="Fil d'Ariane">
  <div class="inner">
    <a href="${BASE}/fr/">Accueil</a><span>·</span>
    <a href="${BASE}/fr/perroquets/">Perroquets</a><span>·</span>
    <strong style="color:rgba(255,255,255,.9)">Perroquets à ${c.name}</strong>
  </div>
</nav>

<div class="page-wrap">
  <main class="main-col">
    <div class="section">
      <h2>Perroquets à ${c.name} avec Documentation CITES</h2>
      ${c.introHTML}
    </div>
    <div class="delivery-box">
      <h3>🚚 Livraison à ${c.name} et ${c.region}</h3>
      ${c.deliveryHTML}
    </div>
    <div class="section">
      <h2>Espèces Disponibles pour ${c.name}</h2>
      <p>Toutes les espèces ci-dessous sont disponibles avec livraison directe à ${c.name}. Chaque oiseau inclut documentation CITES complète, certificat vétérinaire et caisse de transport IATA certifiée.</p>
      <div class="species-grid">
        <a href="${BASE}/fr/perroquet-gris-du-gabon/" class="species-card"><div class="icon">🩶</div><h4>Gris du Gabon</h4><span>Le plus intelligent</span></a>
        <a href="${BASE}/fr/ara-hyacinthe/" class="species-card"><div class="icon">💙</div><h4>Ara Hyacinthe</h4><span>Le plus grand</span></a>
        <a href="${BASE}/fr/ara-bleu-et-jaune/" class="species-card"><div class="icon">💛</div><h4>Ara Bleu et Jaune</h4><span>Très sociable</span></a>
        <a href="${BASE}/fr/ara-macao/" class="species-card"><div class="icon">❤️</div><h4>Ara Macao</h4><span>Le plus coloré</span></a>
        <a href="${BASE}/fr/cacatoes-huppe-jaune/" class="species-card"><div class="icon">🤍</div><h4>Cacatoès Huppé Jaune</h4><span>Très affectueux</span></a>
        <a href="${BASE}/fr/eclectus/" class="species-card"><div class="icon">🦜</div><h4>Éclectus</h4><span>Tempérament serein</span></a>
        <a href="${BASE}/fr/amazone-front-bleu/" class="species-card"><div class="icon">💚</div><h4>Amazone Front Bleu</h4><span>Très bavarde</span></a>
        <a href="${BASE}/fr/cacatoes-rosalbin/" class="species-card"><div class="icon">🩷</div><h4>Cacatoès Rosalbin</h4><span>Équilibré</span></a>
      </div>
    </div>
    <div class="section">
      <h2>CITES et Réglementation à ${c.name}</h2>
      ${c.citesHTML}
    </div>
    <div class="section">
      <h2>Guide d'Achat pour les Résidents de ${c.name}</h2>
      ${c.buyingHTML}
    </div>
    <div class="section">
      <h2>Processus de Réservation — Étape par Étape</h2>
      <ul>
        <li><strong>1. Contact initial :</strong> Envoyez-nous votre demande par formulaire ou par e-mail avec l'espèce souhaitée.</li>
        <li><strong>2. Vérification de disponibilité :</strong> Nous répondons sous 24h avec les spécimens disponibles, ages et prix actualisés.</li>
        <li><strong>3. Acompte de réservation :</strong> Un acompte garantit votre spécimen choisi.</li>
        <li><strong>4. Préparation :</strong> L'oiseau reçoit un bilan vétérinaire complet, toute la documentation CITES est préparée et la caisse IATA adaptée est sélectionnée.</li>
        <li><strong>5. Livraison à ${c.name} :</strong> L'oiseau est livré directement à votre adresse par transporteur spécialisé en animaux vivants.</li>
        <li><strong>6. Suivi post-livraison :</strong> Nous restons disponibles la première semaine pour répondre à vos questions d'adaptation.</li>
      </ul>
    </div>
    <div class="section">
      <h2>Pourquoi Choisir Paraíso de Aves pour ${c.name} ?</h2>
      ${c.whyUsHTML}
    </div>
    <div class="section">
      <h2>Questions Fréquentes — Perroquets à ${c.name}</h2>
      ${c.faqs.map(f=>`<div class="faq-item"><div class="faq-q">${f.q}</div><div class="faq-a">${f.a}</div></div>`).join('')}
    </div>
    <div class="section">
      <h2>Livraisons dans d'Autres Villes</h2>
      <div class="cities-grid">
        ${relCities.map(r=>`<a href="${BASE}/fr/${r.slug}/" class="city-chip">📍 ${r.name}</a>`).join('')}
      </div>
    </div>
    <div class="cta-box">
      <h3>Prêt à Adopter un Perroquet à ${c.name} ?</h3>
      <p>Contactez-nous dès aujourd'hui pour vérifier la disponibilité et recevoir un devis personnalisé avec livraison directe à ${c.name}.</p>
      <a href="#contact" class="btn-gold">Demander un Devis</a>
      <a href="mailto:${EMAIL}" class="btn-outline">Envoyer un Email</a>
    </div>
  </main>

  <aside class="sidebar">
    <div class="delivery-badge">
      <div style="font-size:.78rem;color:rgba(255,255,255,.6);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Livraison à ${c.name}</div>
      <div class="time">${c.deliveryTime}</div>
      <p>jours ouvrés après confirmation</p>
    </div>
    ${frContactForm(c.key)}
    <div class="sidebar-card">
      <h4>Espèces Disponibles</h4>
      <ul>
        <li><a href="${BASE}/fr/perroquet-gris-du-gabon/">Gris du Gabon</a></li>
        <li><a href="${BASE}/fr/ara-hyacinthe/">Ara Hyacinthe</a></li>
        <li><a href="${BASE}/fr/ara-bleu-et-jaune/">Ara Bleu et Jaune</a></li>
        <li><a href="${BASE}/fr/ara-macao/">Ara Macao</a></li>
        <li><a href="${BASE}/fr/cacatoes-huppe-jaune/">Cacatoès Huppé Jaune</a></li>
        <li><a href="${BASE}/fr/eclectus/">Éclectus</a></li>
        <li><a href="${BASE}/fr/amazone-front-bleu/">Amazone Front Bleu</a></li>
      </ul>
    </div>
    <div class="sidebar-card">
      <h4>Articles Utiles</h4>
      <ul>
        <li><a href="${BASE}/fr/blog/guide-cites-france/">Guide CITES France</a></li>
        <li><a href="${BASE}/fr/blog/prix-perroquet-france/">Prix en France</a></li>
        <li><a href="${BASE}/fr/blog/quel-perroquet-choisir/">Quel Perroquet?</a></li>
        <li><a href="${BASE}/fr/blog/meilleurs-perroquets-debutants/">Pour Débutants</a></li>
      </ul>
    </div>
  </aside>
</div>
${frFooter()}
</body>
</html>`;
}

const ALL_FR_CITIES = [
  {slug:'perroquets-a-vendre-paris',name:'Paris',key:'paris'},
  {slug:'perroquets-a-vendre-lyon',name:'Lyon',key:'lyon'},
  {slug:'perroquets-a-vendre-marseille',name:'Marseille',key:'marseille'},
  {slug:'perroquets-a-vendre-toulouse',name:'Toulouse',key:'toulouse'},
  {slug:'perroquets-a-vendre-nice',name:'Nice',key:'nice'},
  {slug:'perroquets-a-vendre-bordeaux',name:'Bordeaux',key:'bordeaux'},
  {slug:'perroquets-a-vendre-lille',name:'Lille',key:'lille'},
  {slug:'perroquets-a-vendre-nantes',name:'Nantes',key:'nantes'},
  {slug:'perroquets-a-vendre-strasbourg',name:'Strasbourg',key:'strasbourg'},
  {slug:'perroquets-a-vendre-montpellier',name:'Montpellier',key:'montpellier'},
  {slug:'perroquets-a-vendre-rennes',name:'Rennes',key:'rennes'},
  {slug:'perroquets-a-vendre-grenoble',name:'Grenoble',key:'grenoble'},
];

const cities = [
  {slug:'perroquets-a-vendre-paris',name:'Paris',key:'paris',region:'Île-de-France',nearbyAreas:'Versailles, Saint-Denis, Boulogne-Billancourt',img:'loro-gris-01.webp',deliveryTime:'2–3',
    title:'Perroquets à Vendre à Paris | CITES | Éleveur Enregistré | Paraíso de Aves',
    metaDesc:'Achetez un perroquet exotique à Paris avec documentation CITES officielle. Livraison en Île-de-France. Gris du Gabon, Ara, Cacatoès. Éleveur enregistré 25+ ans.',
    subtitle:'Livraison directe à Paris et en Île-de-France — Gris du Gabon, Ara Hyacinthe, Cacatoès, Amazone — documentation CITES officielle incluse.',
    pills:['✓ CITES Officiel','✓ Livraison Île-de-France','✓ Apprivoisé à la Main','✓ Garantie Santé'],
    introHTML:`<p>Paris est le marché le plus important de France pour les perroquets exotiques de qualité. La capitale française, avec ses 12 millions d'habitants en Île-de-France, abrite une communauté passionnée d'oiseaux exotiques particulièrement développée — alimentée par une culture cosmopolite, des vétérinaires aviaires de renommée internationale et une densité de propriétaires de perroquets parmi les plus élevées d'Europe.</p>
    <p>Pour les Parisiens qui recherchent un perroquet d'un éleveur responsable et légalement enregistré, Paraíso de Aves représente la solution ibérique de référence : des oiseaux élevés à la main dans notre établissement de Llíria (Valence, Espagne), toute la documentation CITES exigée par la loi française, une livraison directe à votre domicile parisien et un suivi post-vente personnalisé.</p>
    <p>Paris dispose d'un réseau vétérinaire aviaire exceptionnel — la CAPV (Clinique des Animaux de Compagnie de Paris) et plusieurs cliniques spécialisées dans le 11e et le 12e arrondissement sont des références nationales en matière de soins aux oiseaux exotiques. C'est un avantage considérable pour les propriétaires de Gris du Gabon ou d'Ara Hyacinthe qui nécessitent des soins spécialisés.</p>
    <p>Que vous soyez dans un appartement haussmannien du 16e, une maison de banlieue à Vincennes ou une résidence à Versailles — nous livrons partout en Île-de-France avec les mêmes garanties de qualité et de légalité.</p>`,
    deliveryHTML:`<p>Pour Paris et l'Île-de-France, la livraison est effectuée en <strong>2 à 3 jours ouvrés</strong> après confirmation du paiement. Notre position en Espagne — à moins de 1 100 km de Paris par autoroute — nous permet d'assurer une logistique efficace via nos transporteurs partenaires spécialisés en animaux vivants.</p>
    <ul><li><strong>Paris intramuros et petite couronne :</strong> 2–3 jours ouvrés</li>
    <li><strong>Grande couronne (Versailles, Fontainebleau, Rambouillet) :</strong> 2–3 jours ouvrés</li>
    <li><strong>Aéroport CDG / Orly (option aérien pour espèces rares) :</strong> Sur devis</li></ul>`,
    citesHTML:`<p>En France, la DRIEAT (Direction Régionale et Interdépartementale de l'Environnement, de l'Aménagement et des Transports) d'Île-de-France est l'autorité compétente pour les questions CITES à Paris. La documentation fournie par Paraíso de Aves — certificat CITES de naissance en captivité, bague d'identification fermée, certificat vétérinaire — est parfaitement conforme à la réglementation française et reconnue par la DRIEAT. En cas de contrôle, votre oiseau est totalement en règle.</p>`,
    buyingHTML:`<p>À Paris, le marché des oiseaux exotiques est actif mais comporte de nombreux vendeurs sans licence opérant sur des plateformes en ligne. Pour acheter en toute sécurité à Paris : exigez toujours le certificat CITES complet avant tout paiement ; vérifiez la bague d'identification fermée ; demandez le numéro d'enregistrement de l'éleveur ; identifiez préalablement un vétérinaire aviaire dans votre arrondissement.</p>`,
    whyUsHTML:`<p>Paraíso de Aves a une présence consolidée sur le marché parisien, avec des livraisons régulières en Île-de-France. Notre documentation CITES est valide dans toute l'UE, nos oiseaux sont socialisés pour la vie en appartement et notre suivi post-vente par e-mail est disponible en français. 25+ ans d'expérience, zéro compromis sur la légalité.</p>`,
    faqs:[
      {q:'Livrez-vous directement à mon domicile à Paris ?',a:'Oui. Nous livrons à l\'adresse de votre choix à Paris et en Île-de-France, en 2 à 3 jours ouvrés par transporteur spécialisé en animaux vivants.'},
      {q:'La documentation CITES est-elle reconnue par la DRIEAT Paris ?',a:'Oui. Notre documentation est émise par un éleveur enregistré en Espagne et est valide dans toute l\'Union Européenne, dont la France. Elle est conforme aux exigences de la DRIEAT.'},
      {q:'Quels vétérinaires aviaires recommandez-vous à Paris ?',a:'Paris dispose d\'excellentes cliniques spécialisées en oiseaux exotiques. Nous fournissons une liste de référence à chaque client parisien lors de la livraison.'},
      {q:'Le Gris du Gabon est-il adapté à un appartement parisien ?',a:'Oui, avec un niveau sonore modéré et une présence familiale significative. Dans un appartement haussmannien avec de bons murs, le Gris du Gabon est tout à fait envisageable.'},
      {q:'Peut-on acheter un Ara Hyacinthe à Paris ?',a:'Oui, mais la disponibilité est très limitée. Contactez-nous avec vos disponibilités — nous vous informerons dès qu\'un Ara Hyacinthe est disponible pour livraison parisienne.'},
      {q:'Y a-t-il des restrictions spécifiques à Paris pour les oiseaux exotiques ?',a:'Aucune restriction municipale spécifique au-delà de la réglementation nationale. La documentation CITES valide est suffisante pour la détention légale à Paris.'},
    ],
  },

  {slug:'perroquets-a-vendre-lyon',name:'Lyon',key:'lyon',region:'Métropole de Lyon et Auvergne-Rhône-Alpes',nearbyAreas:'Grenoble, Saint-Étienne, Villeurbanne',img:'guacamayo-azul-01.webp',deliveryTime:'2–3',
    title:'Perroquets à Vendre à Lyon | CITES | Éleveur Enregistré | Paraíso de Aves',
    metaDesc:'Achetez un perroquet exotique à Lyon avec CITES officiel. Livraison Lyon et Auvergne-Rhône-Alpes. Gris du Gabon, Ara, Cacatoès. Éleveur enregistré 25+ ans.',
    subtitle:'Livraison directe à Lyon et en Auvergne-Rhône-Alpes — CITES officiel, apprivoisés à la main depuis 25+ ans d\'expérience.',
    pills:['✓ CITES Officiel','✓ Livraison Lyon','✓ Apprivoisé à la Main','✓ Suivi Post-Vente'],
    introHTML:`<p>Lyon, capitale gastronomique de la France et deuxième métropole du pays, a aussi une scène avicole sophistiquée. La métropole lyonnaise, avec ses 2,3 millions d'habitants, est le deuxième marché français pour les oiseaux exotiques de qualité après Paris. La tradition lyonnaise d'excellence et de raffinement se retrouve dans le type d'espèces les plus demandées : le Gris du Gabon y est particulièrement populaire, suivi des Amazones.</p>
    <p>La position géographique de Lyon — carrefour entre le nord et le sud de la France, à 3 heures de Paris et à 1 heure de la frontière italienne — en fait un hub logistique idéal pour nos livraisons vers toute la région Auvergne-Rhône-Alpes. Lyon dispose également d'un réseau vétérinaire aviaire bien développé, avec plusieurs cliniques spécialisées dans les oiseaux exotiques.</p>`,
    deliveryHTML:`<p>Pour Lyon et la région Auvergne-Rhône-Alpes, livraison en <strong>2 à 3 jours ouvrés</strong>.</p><ul><li><strong>Lyon et Métropole :</strong> 2–3 jours ouvrés</li><li><strong>Grenoble, Saint-Étienne, Annecy :</strong> 2–3 jours ouvrés</li><li><strong>Rhône-Alpes étendu :</strong> 2–4 jours ouvrés</li></ul>`,
    citesHTML:`<p>La DREAL Auvergne-Rhône-Alpes est l'autorité CITES compétente pour Lyon. Notre documentation est conforme et reconnue par cette autorité.</p>`,
    buyingHTML:`<p>À Lyon, comme dans toute grande ville française, vérifiez systématiquement la documentation CITES avant tout achat. Les marchés en ligne et les petites annonces régionales comportent de nombreuses offres sans documentation légale.</p>`,
    whyUsHTML:`<p>Éleveur enregistré depuis 25+ ans, documentation CITES complète valide en France, suivi post-vente en français — Paraíso de Aves est la référence ibérique pour les amateurs lyonnais de psittacidés.</p>`,
    faqs:[
      {q:'Livrez-vous à Lyon et dans la région ?',a:'Oui. Lyon ville et toute la métropole en 2–3 jours ouvrés. La région Auvergne-Rhône-Alpes en 2–4 jours ouvrés.'},
      {q:'Le Gris du Gabon est-il populaire à Lyon ?',a:'Oui — c\'est de loin l\'espèce la plus demandée par nos clients lyonnais, suivi de l\'Amazone à Front Bleu.'},
      {q:'Peut-on visiter l\'élevage depuis Lyon ?',a:'Oui. Notre établissement est à Llíria (Valence, Espagne), à environ 5 heures de Lyon par autoroute. Nous recevons sur rendez-vous. Beaucoup de clients lyonnais préfèrent la vidéoconférence pour découvrir les spécimens disponibles.'},
      {q:'Y a-t-il des vétérinaires aviaires spécialisés à Lyon ?',a:'Oui — Lyon dispose de très bonnes cliniques vétérinaires spécialisées en oiseaux exotiques. Nous fournissons des références à chaque client lyonnais.'},
      {q:'L\'Ara Bleu et Jaune est-il adapté au climat lyonnais ?',a:'Parfaitement, en intérieur. Le climat continental de Lyon ne pose aucun problème pour les espèces maintenues en appartement ou maison bien chauffée.'},
    ],
  },

  {slug:'perroquets-a-vendre-marseille',name:'Marseille',key:'marseille',region:'Métropole Aix-Marseille-Provence',nearbyAreas:'Aix-en-Provence, Toulon, Montpellier',img:'guacamayo-escarlata-01.webp',deliveryTime:'2–3',
    title:'Perroquets à Vendre à Marseille | CITES | Éleveur Enregistré | Paraíso de Aves',
    metaDesc:'Achetez un perroquet exotique à Marseille avec CITES. Livraison Marseille et PACA. Gris du Gabon, Ara, Cacatoès. Éleveur enregistré depuis 25 ans.',
    subtitle:'Le meilleur climat de France pour les perroquets — Marseille et toute la région PACA desservies avec CITES officiel et livraison directe.',
    pills:['✓ CITES Officiel','✓ Livraison PACA','✓ Climat Méditerranéen','✓ Garantie Santé'],
    introHTML:`<p>Marseille et la région Provence-Alpes-Côte d'Azur bénéficient du meilleur climat de France métropolitaine pour les perroquets exotiques. Les températures douces en hiver et la chaleur sèche en été créent des conditions proches des milieux d'origine de nombreuses espèces tropicales. Pour les propriétaires de perroquets dans le Sud de la France, c'est un avantage significatif qui permet, notamment, l'installation de volières extérieures couvertes pour les araras et les amazones — une option peu accessible dans les régions septentrionales.</p>
    <p>Marseille, avec ses 1,8 millions d'habitants dans la métropole, est la troisième ville de France et un marché important pour les oiseaux exotiques. La diversité culturelle de la ville — avec des communautés nombreuses d'Afrique du Nord, d'Afrique subsaharienne et des DOM-TOM — crée un environnement particulièrement riche pour les amateurs d'oiseaux tropicaux.</p>`,
    deliveryHTML:`<p>Livraison à Marseille et dans toute la région PACA en <strong>2 à 3 jours ouvrés</strong>.</p><ul><li><strong>Marseille et Métropole AMP :</strong> 2–3 jours ouvrés</li><li><strong>Aix-en-Provence, Toulon, Avignon :</strong> 2–3 jours ouvrés</li><li><strong>Nice, Cannes, Menton :</strong> 2–4 jours ouvrés</li></ul><p>Note : en cas de chaleur extrême estivale (au-dessus de 38°C), l'envoi peut être décalé de 24h pour protéger le bien-être de l'oiseau. Nous planifions alors l'envoi en début de nuit ou très tôt le matin.</p>`,
    citesHTML:`<p>La DREAL PACA gère les questions CITES pour la région Provence-Alpes-Côte d'Azur. Notre documentation est conforme et valide pour toute la région.</p>`,
    buyingHTML:`<p>Marseille dispose d'une communauté d'oiseaux exotiques active, mais comporte aussi un marché informel sans documentation légale. Exigez systématiquement le certificat CITES complet avant tout achat.</p>`,
    whyUsHTML:`<p>Avec des clients réguliers dans toute la région PACA, Paraíso de Aves est habitué aux spécificités du marché marseillais. Notre documentation est valide pour toute la France, notre suivi est assuré en français et nos oiseaux sont adaptés à la vie familiale méditerranéenne.</p>`,
    faqs:[
      {q:'Le climat de Marseille est-il idéal pour les perroquets ?',a:'Oui — c\'est l\'un des meilleurs de France métropolitaine. Les températures douces en hiver réduisent les coûts de chauffage, et l\'été chaud (mais sec) permet l\'installation de volières extérieures couvertes pour de nombreuses espèces.'},
      {q:'Peut-on avoir une volière extérieure à Marseille ?',a:'Oui. Le climat méditerranéen de Marseille est excellent pour les volières extérieures couvertes, surtout pour les espèces comme l\'Amazone ou l\'Ara. Prévoyez une section intérieure accessible en cas de Mistral ou de vague de froid.'},
      {q:'Livrez-vous aussi à Toulon et Aix-en-Provence ?',a:'Oui — toute la métropole AMP et la région PACA, en 2 à 4 jours ouvrés selon la localisation précise.'},
      {q:'Comment gérer la chaleur extrême estivale pour mon perroquet à Marseille ?',a:'Assurez toujours de l\'eau fraîche disponible, de l\'ombre et une ventilation adéquate. En cas de canicule, un ventilateur ou l\'air conditionné est fortement recommandé. La plupart des espèces ne tolèrent pas bien les températures supérieures à 35°C en exposition directe.'},
      {q:'Quelle espèce recommandez-vous pour Marseille ?',a:'Le Gris du Gabon est très populaire dans la région. Les Amazones apprécient aussi le climat méditerranéen. Pour les grandes volières extérieures, les Aras Bleu et Jaune s\'épanouissent particulièrement bien dans le sud.'},
    ],
  },

  {slug:'perroquets-a-vendre-toulouse',name:'Toulouse',key:'toulouse',region:'Métropole Occitanie',nearbyAreas:'Montauban, Albi, Tarbes, Bordeaux',img:'loro-amazonico-01.webp',deliveryTime:'2–3',
    title:'Perroquets à Vendre à Toulouse | CITES | Éleveur Enregistré | Paraíso de Aves',
    metaDesc:'Achetez un perroquet exotique à Toulouse avec CITES. Livraison Toulouse et Occitanie. Gris du Gabon, Ara, Amazone. Éleveur enregistré 25+ ans.',
    subtitle:'La Ville Rose accueille maintenant les livraisons directes de perroquets — CITES officiel, apprivoisés à la main, suivi en français.',
    pills:['✓ CITES Officiel','✓ Livraison Toulouse','✓ Apprivoisé à la Main','✓ Suivi Post-Vente'],
    introHTML:`<p>Toulouse, la Ville Rose, est la quatrième ville de France et la capitale de l'Occitanie. Avec ses 800 000 habitants dans la métropole et une population estudiantine parmi les plus élevées de France (80 000 étudiants à l'Université Paul Sabatier et à l'INP), Toulouse a une culture urbaine dynamique et une communauté de passionnés d'animaux exotiques en plein essor.</p>
    <p>Ville de l'aérospatiale — siège d'Airbus, du CNES et de nombreuses entreprises technologiques — Toulouse attire une population internationale et cosmopolite particulièrement sensible à la qualité et à l'authenticité. Ce public exigeant est précisément celui qui recherche des oiseaux d'un éleveur sérieux avec toute la documentation légale, plutôt que des acquisitions hasardeuses sans garanties.</p>
    <p>Le climat de Toulouse, intermédiaire entre le tempéré atlantique et le méditerranéen, est favorable à la plupart des espèces de perroquets. Les étés chauds permettent des sorties en volière extérieure ; les hivers sont généralement doux sans excès.</p>`,
    deliveryHTML:`<p>Livraison à Toulouse et en Occitanie en <strong>2 à 3 jours ouvrés</strong>.</p><ul><li><strong>Toulouse et agglomération :</strong> 2–3 jours ouvrés</li><li><strong>Montauban, Albi, Castres :</strong> 2–3 jours ouvrés</li><li><strong>Tarbes, Auch, Foix :</strong> 2–4 jours ouvrés</li></ul>`,
    citesHTML:`<p>La DREAL Occitanie est l'autorité CITES compétente pour Toulouse. Notre documentation est pleinement conforme et reconnue.</p>`,
    buyingHTML:`<p>À Toulouse, comme dans toute ville française, évitez les acquisitions sans CITES. L'Amazone à Front Bleu, très populaire dans la région, est particulièrement concernée — de nombreux spécimens circulent sans documentation légale.</p>`,
    whyUsHTML:`<p>Livraisons régulières en Occitanie, documentation CITES valide en France, 25 ans d'expérience et suivi en français — Paraíso de Aves est la référence pour les passionnés toulousains.</p>`,
    faqs:[
      {q:'Livrez-vous à Toulouse et dans toute l\'Occitanie ?',a:'Oui — Toulouse, Montpellier, Montauban, Albi, Tarbes et toute la région Occitanie, en 2 à 4 jours ouvrés.'},
      {q:'Quelle espèce est la plus demandée à Toulouse ?',a:'L\'Amazone à Front Bleu et le Gris du Gabon sont les espèces les plus demandées par nos clients toulousains.'},
      {q:'Le climat de Toulouse est-il adapté aux perroquets ?',a:'Oui — le climat de Toulouse est parmi les plus favorables de la moitié sud de la France. Les étés chauds permettent des sorties en volière extérieure ; les hivers modérés réduisent les contraintes de chauffage.'},
      {q:'Toulouse est-il proche de votre élevage ?',a:'Toulouse est à environ 5 heures de route de Llíria (Valence, Espagne) — relativement proche. Nous recevons des visiteurs sur rendez-vous, et de nombreux clients toulousains choisissent de venir découvrir leur futur oiseau directement.'},
      {q:'Proposez-vous un suivi en français pour les clients de Toulouse ?',a:'Oui — notre suivi post-vente est entièrement disponible en français par e-mail, pour tous nos clients en France, y compris Toulouse et l\'Occitanie.'},
    ],
  },

  {slug:'perroquets-a-vendre-nice',name:'Nice',key:'nice',region:'Alpes-Maritimes et Côte d\'Azur',nearbyAreas:'Monaco, Cannes, Antibes, Menton',img:'guacamayo-jacinto-02.webp',deliveryTime:'2–4',
    title:'Perroquets à Vendre à Nice | Côte d\'Azur | CITES | Paraíso de Aves',
    metaDesc:'Achetez un perroquet exotique à Nice avec CITES. Livraison Côte d\'Azur, Monaco, Cannes. Gris du Gabon, Ara Hyacinthe. Éleveur enregistré depuis 25+ ans.',
    subtitle:'La Côte d\'Azur — le marché le plus exclusif de France pour les perroquets rares — desservie avec CITES officiel et livraison directe à Nice.',
    pills:['✓ CITES Officiel','✓ Livraison Côte d\'Azur','✓ Espèces Rares Disponibles','✓ Garantie Santé'],
    introHTML:`<p>Nice et la Côte d'Azur représentent le marché le plus exclusif de France pour les oiseaux exotiques de prestige. La densité de résidents aisés — français, britanniques, italiens et internationaux — dans les Alpes-Maritimes crée une demande particulière pour les espèces les plus rares et les plus spectaculaires : l'Ara Hyacinthe, le Gris du Gabon et l'Ara Macao y sont régulièrement demandés.</p>
    <p>Le climat de Nice et de la Côte d'Azur est le plus tempéré de France continentale — des hivers doux (rarement en dessous de 5°C en ville) et des étés chauds mais ventilés. Ces conditions sont excellentes pour les perroquets tropicaux, permettant des volières extérieures presque toute l'année pour de nombreuses espèces.</p>
    <p>Monaco, Cannes, Antibes, Menton et toutes les communes des Alpes-Maritimes sont couverts par nos livraisons depuis Llíria. Pour les résidents à Monaco, la réglementation CITES monégasque est alignée sur celle de l'Union Européenne, notre documentation est donc valide pour les résidents français et européens de la Principauté.</p>`,
    deliveryHTML:`<p>Nice et la Côte d'Azur en <strong>2 à 4 jours ouvrés</strong>.</p><ul><li><strong>Nice, Cannes, Antibes :</strong> 2–4 jours ouvrés</li><li><strong>Monaco :</strong> 3–4 jours ouvrés</li><li><strong>Menton, Grasse, Vence :</strong> 2–4 jours ouvrés</li></ul>`,
    citesHTML:`<p>La DREAL PACA couvre les Alpes-Maritimes pour les questions CITES. Notre documentation est conforme à la réglementation française et valide sur la Côte d'Azur.</p>`,
    buyingHTML:`<p>Sur la Côte d'Azur, méfiez-vous des offres de perroquets exotiques « importés » sans documentation — la région est parfois le point d'entrée de spécimens sans CITES de bonne qualité. Vérifiez toujours la bague d'identification fermée et le certificat CITES d'origine.</p>`,
    whyUsHTML:`<p>Paraíso de Aves livre régulièrement sur la Côte d'Azur des espèces rares comme l'Ara Hyacinthe. Notre documentation CITES I et II est valide pour les résidents français et européens. Suivi post-vente en français.</p>`,
    faqs:[
      {q:'Livrez-vous à Monaco ?',a:'Oui. Pour les résidents à Monaco souhaitant un oiseau avec documentation CITES conforme à la réglementation européenne, nous livrons en 3 à 4 jours ouvrés.'},
      {q:'Le climat de Nice est-il idéal pour les perroquets ?',a:'Oui — le climat méditerranéen de Nice, avec des hivers très doux, est excellent. Il permet des volières extérieures presque toute l\'année pour de nombreuses espèces.'},
      {q:'Quelle est l\'espèce la plus demandée sur la Côte d\'Azur ?',a:'Les espèces rares et exclusives — Ara Hyacinthe, Gris du Gabon — sont particulièrement demandées sur la Côte d\'Azur. Le profil des clients y est souvent plus expérimenté et tourné vers les espèces d\'exception.'},
      {q:'Livrez-vous aussi à Cannes et Antibes ?',a:'Oui — toutes les communes des Alpes-Maritimes sont couvertes, en 2 à 4 jours ouvrés.'},
      {q:'Peut-on avoir une volière extérieure sur la Côte d\'Azur ?',a:'Oui — c\'est l\'une des meilleures régions de France pour les volières extérieures grâce au climat méditerranéen. Même en hiver, les températures à Nice descendent rarement sous 7°C.'},
    ],
  },

  {slug:'perroquets-a-vendre-bordeaux',name:'Bordeaux',key:'bordeaux',region:'Gironde et Nouvelle-Aquitaine',nearbyAreas:'Mérignac, Pessac, Arcachon, Libourne',img:'loro-gris-02.webp',deliveryTime:'2–3',
    title:'Perroquets à Vendre à Bordeaux | CITES | Éleveur Enregistré | Paraíso de Aves',
    metaDesc:'Achetez un perroquet exotique à Bordeaux avec CITES. Livraison Bordeaux et Nouvelle-Aquitaine. Gris du Gabon, Ara, Cacatoès. Éleveur enregistré 25+ ans.',
    subtitle:'Bordeaux et la Nouvelle-Aquitaine desservies directement — perroquets CITES officiel, apprivoisés à la main, suivi post-vente en français.',
    pills:['✓ CITES Officiel','✓ Livraison Bordeaux','✓ Apprivoisé à la Main','✓ Suivi Post-Vente'],
    introHTML:`<p>Bordeaux, capitale du vin et ville UNESCO, est aussi l'une des villes de France où la demande pour les oiseaux exotiques de qualité connaît la croissance la plus forte. La métropole bordelaise, dynamisée par l'arrivée du TGV Paris-Bordeaux en 2017 et par une attractivité résidentielle en forte hausse, accueille une population de plus en plus cosmopolite et une communauté de passionnés d'animaux exotiques en plein essor.</p>
    <p>Le climat atlantique de Bordeaux — doux, humide, avec des hivers rarement froids — est globalement favorable à la plupart des espèces de perroquets. La proximité de l'Espagne (Bordeaux n'est qu'à 2 heures de la frontière basque par l'A63) facilite nos livraisons et en réduit les délais.</p>`,
    deliveryHTML:`<p>Bordeaux et la Nouvelle-Aquitaine en <strong>2 à 3 jours ouvrés</strong>.</p><ul><li><strong>Bordeaux et agglomération :</strong> 2–3 jours ouvrés</li><li><strong>Arcachon, Libourne, Blaye :</strong> 2–3 jours ouvrés</li><li><strong>Bayonne, Biarritz, Pau :</strong> 2–3 jours ouvrés (proche de l'Espagne)</li></ul>`,
    citesHTML:`<p>La DREAL Nouvelle-Aquitaine est l'autorité CITES pour la région Bordeaux. Notre documentation est conforme à leurs exigences.</p>`,
    buyingHTML:`<p>À Bordeaux, le marché des oiseaux exotiques est actif. Comme partout, exigez la documentation CITES complète et la bague d'identification fermée avant tout achat.</p>`,
    whyUsHTML:`<p>La proximité de Bordeaux avec l'Espagne facilite nos livraisons — délais parmi les plus courts de France. Documentation CITES valide, 25 ans d'expérience, suivi en français.</p>`,
    faqs:[
      {q:'Bordeaux est-il proche de votre élevage ?',a:'Bordeaux est à seulement 2h30 de la frontière espagnole. C\'est l\'une des villes françaises les plus proches de notre élevage à Llíria — ce qui se reflète dans nos délais de livraison parmi les plus courts.'},
      {q:'Le climat atlantique est-il adapté aux perroquets ?',a:'Oui. Le climat doux et humide de Bordeaux est favorable à de nombreuses espèces, notamment le Gris du Gabon qui apprécie un taux d\'humidité modéré. Les hivers sont rares en dessous de 5°C.'},
      {q:'Livrez-vous à Bayonne et Biarritz ?',a:'Oui — toute la côte basque et les Pyrénées-Atlantiques sont couverts, souvent en 2 jours ouvrés grâce à notre proximité avec l\'Espagne.'},
      {q:'Quelle espèce recommandez-vous pour Bordeaux ?',a:'Le Gris du Gabon et l\'Amazone à Front Bleu sont très appréciés à Bordeaux. Pour les maisons avec jardin dans les communes périphériques, les Aras Bleu et Jaune sont aussi excellents.'},
      {q:'Peut-on visiter l\'élevage depuis Bordeaux ?',a:'Oui — Bordeaux est à environ 4 heures de Llíria (Valence, Espagne). Nous recevons des visiteurs bordelais régulièrement sur rendez-vous.'},
    ],
  },

  {slug:'perroquets-a-vendre-lille',name:'Lille',key:'lille',region:'Métropole Européenne de Lille et Hauts-de-France',nearbyAreas:'Roubaix, Tourcoing, Lens, Arras, Belgique',img:'eclectus-02.webp',deliveryTime:'2–4',
    title:'Perroquets à Vendre à Lille | CITES | Éleveur Enregistré | Paraíso de Aves',
    metaDesc:'Achetez un perroquet exotique à Lille avec CITES. Livraison Lille et Hauts-de-France. Gris du Gabon, Ara, Cacatoès. Éleveur enregistré depuis 25+ ans.',
    subtitle:'Livraison directe à Lille et dans les Hauts-de-France — CITES officiel, apprivoisés à la main, avec une attention particulière au voyage sous le froid nordique.',
    pills:['✓ CITES Officiel','✓ Livraison Hauts-de-France','✓ Apprivoisé à la Main','✓ Garantie Santé'],
    introHTML:`<p>Lille, capitale des Hauts-de-France et ville-carrefour à la confluence de la France, de la Belgique et du Royaume-Uni, est une métropole européenne dynamique d'1,1 million d'habitants. Sa position à la croisée des routes européennes en fait une ville au profil particulièrement international — un terreau favorable pour les passionnés d'oiseaux exotiques qui connaissent les exigences légales et documentaires liées aux espèces CITES.</p>
    <p>Le principal défi pour les propriétaires de perroquets à Lille est le climat : les hivers sont froids et humides (les températures descendent régulièrement sous 0°C), ce qui impose un chauffage fiable et constant pour les espèces tropicales. En revanche, les étés sont doux et agréables — une période idéale pour les bains et les sorties supervisées en extérieur.</p>`,
    deliveryHTML:`<p>Lille et les Hauts-de-France en <strong>2 à 4 jours ouvrés</strong>. Attention : en période hivernale, nous pouvons retarder l'envoi de 24h si les températures de transit sont trop basses pour garantir le bien-être de l'oiseau.</p><ul><li><strong>Lille et MEL :</strong> 2–4 jours ouvrés</li><li><strong>Roubaix, Tourcoing, Lens, Arras :</strong> 2–4 jours ouvrés</li><li><strong>Belgique (avec conformité réglementaire UE) :</strong> Sur devis</li></ul>`,
    citesHTML:`<p>La DREAL Hauts-de-France est l'autorité CITES pour la région lilloise. Notre documentation est conforme et valide.</p>`,
    buyingHTML:`<p>À Lille, vérifiez que toute offre de perroquet inclut une documentation CITES valide — en particulier pour les espèces acquises via des réseaux belges ou néerlandais, où la réglementation est similaire mais distincte dans certains aspects.</p>`,
    whyUsHTML:`<p>25 ans d'expérience, livraisons régulières dans le nord de la France, documentation CITES valide dans toute l'UE, suivi post-vente en français — Paraíso de Aves est la référence pour les amateurs lillois.</p>`,
    faqs:[
      {q:'Le froid du nord de la France est-il un problème pour les perroquets ?',a:'En intérieur chauffé, non. Assurez une température minimale de 18°C en hiver pour la plupart des espèces. Les courants d\'air froids sont plus dangereux que le froid lui-même — assurez-vous que la cage n\'est pas placée près d\'une fenêtre ou d\'une porte extérieure.'},
      {q:'Livrez-vous aussi en Belgique ?',a:'Nous livrons principalement en France. Pour la Belgique, la réglementation CITES est similaire (UE) mais avec quelques spécificités. Contactez-nous pour discuter des options de livraison vers la Belgique.'},
      {q:'Quelle espèce est la plus adaptée au climat lillois ?',a:'Le Gris du Gabon et les Cacatoès s\'adaptent bien aux intérieurs chauffés de la région. Le Cacatoès Rosalbin est particulièrement robuste. L\'Amazone à Front Bleu est aussi une excellente option.'},
      {q:'Peut-on avoir une volière extérieure à Lille ?',a:'Uniquement en été (mai à septembre) et uniquement si elle est couverte et à l\'abri du vent. Les hivers lillois sont trop rudes pour les volières extérieures permanentes sans chauffage.'},
      {q:'Livrez-vous en hiver sans problème ?',a:'Oui, avec précautions. En cas de températures très basses (-5°C ou moins), nous pouvons retarder l\'envoi de 24h pour protéger l\'oiseau. Nous vous prévenons systématiquement.'},
    ],
  },

  {slug:'perroquets-a-vendre-nantes',name:'Nantes',key:'nantes',region:'Loire-Atlantique et Pays de la Loire',nearbyAreas:'Saint-Nazaire, La Roche-sur-Yon, Angers, Rennes',img:'conuro-01.webp',deliveryTime:'2–4',
    title:'Perroquets à Vendre à Nantes | CITES | Éleveur Enregistré | Paraíso de Aves',
    metaDesc:'Achetez un perroquet exotique à Nantes avec CITES. Livraison Nantes et Pays de la Loire. Gris du Gabon, Ara, Cacatoès. Éleveur enregistré 25+ ans.',
    subtitle:'Nantes et les Pays de la Loire desservis directement — CITES officiel, apprivoisés à la main, livraison avec suivi.',
    pills:['✓ CITES Officiel','✓ Livraison Pays de la Loire','✓ Apprivoisé à la Main','✓ Suivi Post-Vente'],
    introHTML:`<p>Nantes, sixième ville de France et capitale des Pays de la Loire, connaît depuis plusieurs années une croissance démographique remarquable. Régulièrement classée dans les palmarès des villes françaises où il fait le mieux vivre, Nantes attire des familles et des professionnels qui apportent avec eux un intérêt croissant pour les animaux de compagnie exotiques de qualité.</p>
    <p>Le climat atlantique de Nantes — doux et humide toute l'année — est globalement favorable aux perroquets. Les hivers sont rares en dessous de 0°C et les étés tempérés. La Loire-Atlantique est une région agréable pour les propriétaires d'oiseaux exotiques, avec un accès aux soins vétérinaires spécialisés à Nantes même.</p>`,
    deliveryHTML:`<p>Nantes et les Pays de la Loire en <strong>2 à 4 jours ouvrés</strong>.</p><ul><li><strong>Nantes et agglomération :</strong> 2–4 jours ouvrés</li><li><strong>Saint-Nazaire, La Baule, Ancenis :</strong> 2–4 jours ouvrés</li><li><strong>Angers, La Roche-sur-Yon :</strong> 2–4 jours ouvrés</li></ul>`,
    citesHTML:`<p>La DREAL Pays de la Loire est l'autorité CITES pour Nantes et la région. Notre documentation est conforme et valide.</p>`,
    buyingHTML:`<p>À Nantes, le marché des oiseaux exotiques est en développement. Exigez systématiquement le certificat CITES et la bague d'identification avant tout achat.</p>`,
    whyUsHTML:`<p>Livraisons régulières dans les Pays de la Loire, documentation CITES valide en France, 25 ans d'expérience et suivi en français — Paraíso de Aves est la référence pour les passionnés nantais.</p>`,
    faqs:[
      {q:'Livrez-vous à Nantes et dans toute la région ?',a:'Oui — Nantes et les Pays de la Loire en 2 à 4 jours ouvrés. Saint-Nazaire, Angers, La Roche-sur-Yon également.'},
      {q:'Le climat de Nantes convient-il aux perroquets ?',a:'Oui — le climat atlantique doux de Nantes est favorable à la plupart des espèces. Quelques précautions de chauffage en janvier-février, mais rien d\'exceptionnel.'},
      {q:'Y a-t-il des vétérinaires aviaires spécialisés à Nantes ?',a:'Oui — Nantes dispose de cliniques vétérinaires avec expérience en oiseaux exotiques. Nous fournissons des références à nos clients nantais.'},
      {q:'Quelle espèce recommandez-vous pour une famille à Nantes ?',a:'Le Gris du Gabon (pour les familles disponibles) ou le Cacatoès Rosalbin (plus accessible) sont d\'excellents choix pour des familles nantaises avec un mode de vie actif.'},
      {q:'Comment fonctionne le paiement et la réservation depuis Nantes ?',a:'Contacte initial par formulaire ou e-mail → confirmation de disponibilité (24h) → acompte de réservation → préparation → livraison en 2 à 4 jours ouvrés à Nantes.'},
    ],
  },

  {slug:'perroquets-a-vendre-strasbourg',name:'Strasbourg',key:'strasbourg',region:'Bas-Rhin et Grand Est',nearbyAreas:'Colmar, Mulhouse, Freiburg (Allemagne), Karlsruhe (Allemagne)',img:'guacamayo-azul-02.webp',deliveryTime:'2–4',
    title:'Perroquets à Vendre à Strasbourg | CITES | Éleveur Enregistré | Paraíso de Aves',
    metaDesc:'Achetez un perroquet exotique à Strasbourg avec CITES. Livraison Strasbourg et Grand Est. Gris du Gabon, Ara, Cacatoès. Éleveur enregistré depuis 25+ ans.',
    subtitle:'Strasbourg, capitale européenne — nos perroquets CITES y arrivent en 2 à 4 jours ouvrés avec toute la documentation conforme au droit européen.',
    pills:['✓ CITES Officiel','✓ Livraison Grand Est','✓ Documentation UE','✓ Garantie Santé'],
    introHTML:`<p>Strasbourg, capitale du Parlement européen et ville à la confluence de la culture française et allemande, est une métropole unique en France par son profil international. Avec ses institutions européennes, ses universités de rang international et sa communauté d'expatriés nombreuse, Strasbourg abrite des passionnés d'oiseaux exotiques particulièrement bien informés sur les réglementations CITES — qui sont, rappelons-le, des traités internationaux gérés au niveau de l'Union Européenne.</p>
    <p>Le principal défi pour les propriétaires de perroquets à Strasbourg est le froid alsacien — les hivers sont rigoureux, avec des températures régulièrement négatives et des vagues de froid (températures pouvant descendre à -15°C lors de pics) qui imposent un chauffage fiable et continu. En revanche, les automnes dorés et les étés chauds créent des conditions agréables pour de nombreuses espèces.</p>`,
    deliveryHTML:`<p>Strasbourg et le Grand Est en <strong>2 à 4 jours ouvrés</strong>.</p><ul><li><strong>Strasbourg et Eurométropole :</strong> 2–4 jours ouvrés</li><li><strong>Colmar, Mulhouse, Sélestat :</strong> 2–4 jours ouvrés</li><li><strong>Nancy, Metz, Reims :</strong> 2–4 jours ouvrés</li></ul><p>En cas de vague de froid en Alsace, nous pouvons retarder l'envoi pour protéger le bien-être de l'oiseau.</p>`,
    citesHTML:`<p>La DREAL Grand Est est l'autorité CITES pour la région de Strasbourg. Notre documentation est valide en France et dans toute l'UE — particulièrement pertinent pour les résidents européens non français à Strasbourg.</p>`,
    buyingHTML:`<p>À Strasbourg, la proximité avec l'Allemagne et la Suisse peut créer des tentations d'acquisition auprès de vendeurs sans documentation française conforme. Vérifiez que la documentation est conforme à la réglementation française même si l'oiseau provient d'un éleveur allemand ou suisse.</p>`,
    whyUsHTML:`<p>Notre documentation CITES est valide dans toute l'Union Européenne, ce qui est particulièrement adapté aux résidents de Strasbourg, ville européenne par excellence. Suivi post-vente en français.</p>`,
    faqs:[
      {q:'Le froid alsacien pose-t-il des problèmes pour les perroquets ?',a:'En intérieur bien chauffé, non. La règle de base est de maintenir une température minimale de 18°C pour la plupart des espèces tropicales. En Alsace, un chauffage fiable et continu est indispensable d\'octobre à avril.'},
      {q:'La documentation CITES de votre élevage espagnol est-elle valide à Strasbourg ?',a:'Absolument. La CITES est une convention internationale gérée au niveau européen. Notre documentation émise en Espagne est parfaitement valide en France, y compris à Strasbourg, et dans toute l\'UE.'},
      {q:'Livrez-vous aussi en Allemagne pour les résidents frontaliers ?',a:'Pour les résidents français de l\'Eurométropole, nous livrons à l\'adresse française. Pour les résidents allemands, contactez-nous — des solutions peuvent être envisagées dans le cadre de la réglementation UE.'},
      {q:'Quelle espèce recommandez-vous pour Strasbourg ?',a:'Le Gris du Gabon s\'adapte très bien aux appartements strasbourgeois bien chauffés. Le Cacatoès Rosalbin est aussi une excellente option. Pour les maisons avec verrière ou jardin d\'hiver, les Amazones sont un beau choix.'},
      {q:'Avez-vous des clients à Strasbourg ?',a:'Oui — nous livrons régulièrement dans le Grand Est, dont Strasbourg et l\'Eurométropole. Nos clients alsaciens sont généralement très bien informés sur les réglementations CITES.'},
    ],
  },

  {slug:'perroquets-a-vendre-montpellier',name:'Montpellier',key:'montpellier',region:'Hérault et Occitanie méditerranéenne',nearbyAreas:'Nîmes, Béziers, Sète, Lunel',img:'loro-amazonico-02.webp',deliveryTime:'2–3',
    title:'Perroquets à Vendre à Montpellier | CITES | Paraíso de Aves France',
    metaDesc:'Achetez un perroquet exotique à Montpellier avec CITES. Livraison Montpellier et Hérault. Gris du Gabon, Ara, Amazone. Éleveur enregistré 25+ ans.',
    subtitle:'Montpellier — ville la plus jeune de France — accueille les perroquets CITES avec le meilleur climat méditerranéen de l\'Hérault.',
    pills:['✓ CITES Officiel','✓ Livraison Hérault','✓ Climat Méditerranéen','✓ Suivi Post-Vente'],
    introHTML:`<p>Montpellier est la ville la plus jeune de France par la moyenne d'âge de ses habitants — et l'une des plus dynamiques. Sa population estudiantine importante, son attractivité résidentielle en forte croissance et son climat méditerranéen exceptionnel en font un terreau idéal pour les propriétaires de perroquets. Le soleil de l'Hérault, les températures douces même en hiver et les étés chauds créent des conditions proches de celles des régions d'origine de nombreuses espèces tropicales.</p>
    <p>Montpellier est aussi une ville de sciences — avec une faculté de médecine parmi les plus anciennes d'Europe et de nombreux laboratoires de recherche — ce qui se traduit par une communauté de vétérinaires particulièrement bien formée, dont plusieurs spécialistes reconnus en médecine aviaire exotique.</p>`,
    deliveryHTML:`<p>Montpellier et l'Hérault en <strong>2 à 3 jours ouvrés</strong>.</p><ul><li><strong>Montpellier et agglomération :</strong> 2–3 jours ouvrés</li><li><strong>Nîmes, Béziers, Sète :</strong> 2–3 jours ouvrés</li><li><strong>Nîmes, Ales, Le Vigan :</strong> 2–4 jours ouvrés</li></ul>`,
    citesHTML:`<p>La DREAL Occitanie couvre Montpellier pour les questions CITES. Notre documentation est conforme et valide pour toute la région.</p>`,
    buyingHTML:`<p>À Montpellier, le marché des oiseaux exotiques est actif. Comme dans toute ville française, exigez le certificat CITES complet et la bague d'identification avant tout achat.</p>`,
    whyUsHTML:`<p>Le climat de Montpellier, très proche de l'Espagne, facilite nos livraisons — délais parmi les plus courts du sud de la France. Documentation CITES valide, suivi en français.</p>`,
    faqs:[
      {q:'Montpellier est-elle bien desservie par vos livraisons ?',a:'Oui — Montpellier est l\'une des villes françaises les mieux placées pour recevoir nos livraisons depuis Llíria (Valence, Espagne), à environ 4 heures de route.'},
      {q:'Le Gris du Gabon convient-il au climat de Montpellier ?',a:'Parfaitement. Le climat méditerranéen de Montpellier, avec ses hivers doux et ses étés chauds, est idéal pour le Gris du Gabon, qui apprécie les températures stables et la luminosité.'},
      {q:'Y a-t-il des vétérinaires aviaires à Montpellier ?',a:'Oui — Montpellier dispose d\'une bonne offre vétérinaire incluant des spécialistes en oiseaux exotiques. Nous fournissons des références à nos clients montpelliérains.'},
      {q:'L\'Amazone à Front Bleu est-elle populaire à Montpellier ?',a:'Oui — l\'Amazone est très appréciée dans toute la région méditerranéenne française. Sa robustesse et son caractère expressif en font un compagnon particulièrement adapté au style de vie méditerranéen.'},
      {q:'Livrez-vous aussi à Nîmes et Sète ?',a:'Oui — tout l\'Hérault et les départements voisins du Gard et de l\'Hérault, en 2 à 4 jours ouvrés.'},
    ],
  },

  {slug:'perroquets-a-vendre-rennes',name:'Rennes',key:'rennes',region:'Ille-et-Vilaine et Bretagne',nearbyAreas:'Saint-Malo, Brest, Nantes, Vannes',img:'conuro-02.webp',deliveryTime:'2–4',
    title:'Perroquets à Vendre à Rennes | CITES | Éleveur Enregistré | Paraíso de Aves',
    metaDesc:'Achetez un perroquet exotique à Rennes avec CITES. Livraison Rennes et Bretagne. Gris du Gabon, Ara, Cacatoès. Éleveur enregistré depuis 25+ ans.',
    subtitle:'Rennes et toute la Bretagne desservis — CITES officiel, apprivoisés à la main, avec attention particulière au voyage par temps bretons.',
    pills:['✓ CITES Officiel','✓ Livraison Bretagne','✓ Apprivoisé à la Main','✓ Garantie Santé'],
    introHTML:`<p>Rennes, capitale de la Bretagne et hub technologique de l'ouest de la France, est une ville en plein essor avec une jeunesse dynamique et une tradition culturelle forte. La communauté d'amateurs d'oiseaux exotiques y est moins développée que dans les grandes métropoles du sud, mais en pleine croissance grâce à une population éduquée et bien informée sur les enjeux de la détention légale des espèces CITES.</p>
    <p>Le principal défi pour les propriétaires de perroquets en Bretagne est le climat océanique : humide, nuageux et venté, avec des hivers doux mais des étés souvent frais. La bonne nouvelle est que le taux d'humidité naturellement élevé de la Bretagne est favorable à certaines espèces comme le Gris du Gabon, qui apprécie une humidité relative entre 50 et 70%.</p>`,
    deliveryHTML:`<p>Rennes et la Bretagne en <strong>2 à 4 jours ouvrés</strong>.</p><ul><li><strong>Rennes et agglomération :</strong> 2–4 jours ouvrés</li><li><strong>Saint-Malo, Fougères, Vitré :</strong> 2–4 jours ouvrés</li><li><strong>Brest, Quimper, Vannes :</strong> 3–5 jours ouvrés</li></ul>`,
    citesHTML:`<p>La DREAL Bretagne est l'autorité CITES pour la région. Notre documentation est conforme et valide.</p>`,
    buyingHTML:`<p>En Bretagne, le marché informel d'oiseaux sans documentation existe. Comme toujours, exigez le certificat CITES complet avant tout achat.</p>`,
    whyUsHTML:`<p>25 ans d'expérience, documentation CITES complète, livraison jusqu'en Finistère et suivi post-vente en français — Paraíso de Aves est la référence pour les passionnés bretons.</p>`,
    faqs:[
      {q:'Le climat breton est-il adapté aux perroquets ?',a:'L\'humidité naturelle de la Bretagne est favorable au Gris du Gabon. Le principal défi sont les étés frais — en Bretagne, une légère protection contre le vent et le froid est recommandée même en été pour les espèces tropicales.'},
      {q:'Livrez-vous jusqu\'en Finistère ?',a:'Oui — nous livrons dans toute la Bretagne, y compris le Finistère (Brest, Quimper, Douarnenez), avec des délais de 3 à 5 jours ouvrés selon la localisation.'},
      {q:'La pluie bretonne pose-t-elle des problèmes pour les perroquets ?',a:'Non, si l\'oiseau est en intérieur. La pluie ne présente aucun danger pour les perroquets dans un logement bien isolé. Les courants d\'air humides sont plus problématiques — assurez-vous que la cage n\'est pas placée près d\'une fenêtre susceptible d\'être ouverte par temps de pluie.'},
      {q:'Quelle espèce recommandez-vous pour Rennes ?',a:'Le Gris du Gabon est particulièrement bien adapté au climat humide de Rennes. Le Cacatoès Rosalbin est aussi un excellent choix pour les familles bretonnes.'},
      {q:'Peut-on vous rendre visite depuis Rennes ?',a:'Oui — Llíria (Valence, Espagne) est à environ 8 heures de route de Rennes. Nous recevons sur rendez-vous. La videoconférence est souvent la solution préférée de nos clients bretons.'},
    ],
  },

  {slug:'perroquets-a-vendre-grenoble',name:'Grenoble',key:'grenoble',region:'Isère et Alpes',nearbyAreas:'Chambéry, Annecy, Gap, Lyon',img:'cacatua-01.webp',deliveryTime:'2–4',
    title:'Perroquets à Vendre à Grenoble | CITES | Éleveur Enregistré | Paraíso de Aves',
    metaDesc:'Achetez un perroquet exotique à Grenoble avec CITES. Livraison Grenoble et Isère. Gris du Gabon, Ara, Cacatoès. Éleveur enregistré depuis 25+ ans.',
    subtitle:'Grenoble et les Alpes desservis directement — CITES officiel, apprivoisés à la main, avec conseils spécifiques pour le climat alpin.',
    pills:['✓ CITES Officiel','✓ Livraison Isère et Alpes','✓ Apprivoisé à la Main','✓ Suivi Post-Vente'],
    introHTML:`<p>Grenoble, capitale des Alpes et ville de haute technologie, est entourée de trois massifs montagneux qui lui confèrent une identité unique en France. Avec ses 450 000 habitants dans la métropole et une concentration exceptionnelle de chercheurs et d'ingénieurs (CEA, CNRS, STMicroelectronics), Grenoble est une ville intellectuelle et internationale particulièrement sensible aux questions de légalité et d'éthique dans l'acquisition des animaux.</p>
    <p>Le principal défi pour les propriétaires de perroquets à Grenoble est climatique : les hivers alpins peuvent être sévères, avec des températures descendant régulièrement sous -5°C et des chutes de neige. Un chauffage fiable est absolument indispensable, et les volières extérieures ne sont envisageables qu'en été (juin à août).</p>
    <p>En revanche, les étés grenoblois sont chauds et ensoleillés — une période propice aux bains au soleil et aux sorties en extérieur pour les espèces tropicales. La qualité de l'air grenoble (hors périodes d'inversion thermique hivernale) est globalement bonne pour les oiseaux.</p>`,
    deliveryHTML:`<p>Grenoble et l'Isère en <strong>2 à 4 jours ouvrés</strong>.</p><ul><li><strong>Grenoble et métropole :</strong> 2–4 jours ouvrés</li><li><strong>Chambéry, Annecy :</strong> 2–4 jours ouvrés</li><li><strong>Gap, Briançon :</strong> 3–5 jours ouvrés</li></ul><p>En périodes de forte chute de neige dans les Alpes, l'envoi peut être décalé de 24h.</p>`,
    citesHTML:`<p>La DREAL Auvergne-Rhône-Alpes est l'autorité CITES pour Grenoble et l'Isère. Notre documentation est conforme et valide.</p>`,
    buyingHTML:`<p>À Grenoble, exigez le certificat CITES complet et la bague d'identification avant tout achat. La population grenobloise est généralement bien informée sur la légalité des acquisitions d'espèces protégées.</p>`,
    whyUsHTML:`<p>Documentation CITES valide, 25 ans d'expérience, livraisons régulières dans les Alpes et suivi post-vente en français avec conseils spécifiques pour le climat alpin.</p>`,
    faqs:[
      {q:'Les hivers alpins sont-ils problématiques pour les perroquets ?',a:'En intérieur bien chauffé, non. La température minimale recommandée est de 18°C pour la plupart des espèces. À Grenoble, un chauffage fiable est indispensable d\'octobre à avril. Evitez absolument les courants d\'air froid.'},
      {q:'Peut-on avoir une volière extérieure à Grenoble ?',a:'Uniquement en été (juin à août). Le reste de l\'année, les températures alpines sont trop basses pour les volières extérieures sans chauffage. En été, les sorties supervisées sont excellentes pour le bien-être des oiseaux.'},
      {q:'Livrez-vous aussi à Chambéry et Annecy ?',a:'Oui — toute la région Auvergne-Rhône-Alpes, dont Chambéry, Annecy, Gap et les stations alpines, en 2 à 5 jours ouvrés.'},
      {q:'L\'altitude de Grenoble pose-t-elle des problèmes ?',a:'Grenoble est à 212 m d\'altitude — aucun problème. Les stations de montagne très hautes (Briançon : 1 326 m, Chamonix : 1 035 m) peuvent poser des questions sur la pression atmosphérique, mais pour la détention en intérieur, ce n\'est généralement pas un facteur significatif.'},
      {q:'Quelle espèce est la plus adaptée au climat alpin ?',a:'Le Gris du Gabon et les Cacatoès s\'adaptent bien aux intérieurs chauffés de Grenoble. Évitez les espèces les plus sensibles aux variations de température (certains Éclectus) si vous ne pouvez pas garantir une température parfaitement constante.'},
    ],
  },
];

/* ════════════════════════════════════════════════
   BLOG ARTICLES
════════════════════════════════════════════════ */

function blogSchemasFR(art){
  const faqList = art.faqs.map(f=>`{"@type":"Question","name":${JSON.stringify(f.q)},"acceptedAnswer":{"@type":"Answer","text":${JSON.stringify(f.a)}}}`).join(',');
  return `<script type="application/ld+json">{"@context":"https://schema.org","@graph":[
{"@type":"Article","@id":"${BASE}/fr/blog/${art.slug}/","headline":${JSON.stringify(art.title)},"description":${JSON.stringify(art.metaDesc)},"url":"${BASE}/fr/blog/${art.slug}/","datePublished":"2026-06-26","dateModified":"2026-06-26","author":{"@type":"Organization","name":"Paraíso de Aves"},"publisher":{"@id":"${BASE}/#org"},"inLanguage":"fr-FR","image":"${BASE}/images/${art.img}"},
{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Accueil","item":"${BASE}/fr/"},{"@type":"ListItem","position":2,"name":"Blog","item":"${BASE}/fr/blog/"},{"@type":"ListItem","position":3,"name":${JSON.stringify(art.h1)},"item":"${BASE}/fr/blog/${art.slug}/"}]},
{"@type":"FAQPage","mainEntity":[${faqList}]},
{"@type":"Organization","@id":"${BASE}/#org","name":"Paraíso de Aves","url":"${BASE}","email":"${EMAIL}"}
]}</script>`;
}

function generateBlogPageFR(art){
  return `${frHead({title:art.title,metaDesc:art.metaDesc,canonical:`/fr/blog/${art.slug}/`,ogImage:art.img,frPath:`/fr/blog/${art.slug}/`,type:'article'})}
  ${blogSchemasFR(art)}
</head>
<body>
${frNav('Blog')}
<section class="article-hero">
  <div style="max-width:900px;margin:0 auto;">
    <p class="badge">${art.badge}</p>
    <h1>${art.h1}</h1>
    <p class="meta">Par <strong>Paraíso de Aves</strong> · Publié le 26 juin 2026 · Lecture : ${art.readTime} min</p>
  </div>
</section>
<nav class="breadcrumb-bar" aria-label="Fil d'Ariane">
  <div class="inner">
    <a href="${BASE}/fr/">Accueil</a><span>·</span>
    <a href="${BASE}/fr/blog/">Blog</a><span>·</span>
    <strong style="color:rgba(255,255,255,.9)">${art.h1}</strong>
  </div>
</nav>

<div class="article-wrap">
  <article class="article-body">
    <figure>
      <picture>
        <source srcset="${BASE}/images/${art.img}" type="image/webp"/>
        <img src="${BASE}/images/${art.img}" alt="${art.imgAlt}" width="860" height="340" loading="eager" style="width:100%;height:300px;object-fit:cover;border-radius:12px;"/>
      </picture>
      <figcaption>${art.caption}</figcaption>
    </figure>

    ${art.bodyHTML}

    <h2>Questions Fréquentes</h2>
    ${art.faqs.map(f=>`<div class="faq-item"><div class="faq-q">${f.q}</div><div class="faq-a">${f.a}</div></div>`).join('')}

    <div class="cta-box" style="margin-top:40px;">
      <h3>${art.ctaTitle}</h3>
      <p>${art.ctaText}</p>
      <a href="${BASE}/fr/perroquets/" class="btn-gold">Voir nos Perroquets</a>
      <a href="${BASE}/fr/contact/" class="btn-outline">Nous Contacter</a>
    </div>
  </article>

  <aside class="sidebar">
    <div class="sidebar-card">
      <h4>Espèces Disponibles</h4>
      <ul>
        <li><a href="${BASE}/fr/perroquet-gris-du-gabon/">Gris du Gabon</a></li>
        <li><a href="${BASE}/fr/ara-hyacinthe/">Ara Hyacinthe</a></li>
        <li><a href="${BASE}/fr/ara-bleu-et-jaune/">Ara Bleu et Jaune</a></li>
        <li><a href="${BASE}/fr/ara-macao/">Ara Macao</a></li>
        <li><a href="${BASE}/fr/cacatoes-huppe-jaune/">Cacatoès Huppé Jaune</a></li>
        <li><a href="${BASE}/fr/amazone-front-bleu/">Amazone Front Bleu</a></li>
        <li><a href="${BASE}/fr/eclectus/">Éclectus</a></li>
      </ul>
    </div>
    <div class="sidebar-card">
      <h4>Articles Liés</h4>
      <ul>
        ${art.related.map(r=>`<li><a href="${BASE}/fr/blog/${r.slug}/">${r.label}</a></li>`).join('')}
      </ul>
    </div>
    <div class="sidebar-card">
      <h4>Livraisons en France</h4>
      <ul>
        <li><a href="${BASE}/fr/perroquets-a-vendre-paris/">Paris</a></li>
        <li><a href="${BASE}/fr/perroquets-a-vendre-lyon/">Lyon</a></li>
        <li><a href="${BASE}/fr/perroquets-a-vendre-marseille/">Marseille</a></li>
        <li><a href="${BASE}/fr/perroquets-a-vendre-toulouse/">Toulouse</a></li>
        <li><a href="${BASE}/fr/perroquets-a-vendre-nice/">Nice / Côte d'Azur</a></li>
        <li><a href="${BASE}/fr/perroquets-a-vendre-bordeaux/">Bordeaux</a></li>
      </ul>
    </div>
  </aside>
</div>
${frFooter()}
</body>
</html>`;
}

const blogArticles = [

{slug:'quel-perroquet-choisir',title:'Quel Perroquet Choisir ? Guide Complet France 2026',metaDesc:'Quel perroquet choisir en France ? Guide complet par espèce — niveau sonore, espace, exigence, coût. Trouvez le perroquet parfait pour votre mode de vie.',
h1:'Quel Perroquet Choisir ? Le Guide Complet',badge:'🦜 GUIDE DE CHOIX · FRANCE 2026',readTime:9,
img:'loro-gris-01.webp',imgAlt:'Perroquet Gris du Gabon posé sur un perchoir, regardant vers l\'objectif',caption:'Choisir le bon perroquet est la décision la plus importante avant l\'adoption',
ctaTitle:'Vous avez fait votre choix ?',ctaText:'Paraíso de Aves propose toutes les espèces mentionnées avec documentation CITES officielle et livraison dans toute la France.',
related:[{slug:'prix-perroquet-france',label:'Prix en France'},{slug:'guide-cites-france',label:'Guide CITES France'},{slug:'meilleurs-perroquets-debutants',label:'Pour Débutants'},{slug:'choisir-eleveur-serieux',label:'Choisir un Éleveur'}],
faqs:[
  {q:'Quel est le perroquet le plus facile à vivre pour un débutant ?',a:'Le Cacatoès Rosalbin ou l\'Amazone à Front Bleu jeune sont généralement les meilleures options pour les débutants en France. Ils offrent un bon équilibre entre personnalité et niveau d\'exigence.'},
  {q:'Quel est le perroquet le plus silencieux ?',a:'L\'Éclectus est, parmi les espèces de grande taille, le plus discret. Le Gris du Gabon a un niveau sonore modéré. Les Cacatoès et les Aras sont les plus bruyants.'},
  {q:'Quel perroquet vit le plus longtemps ?',a:'Le Gris du Gabon et les grandes Amazones — jusqu\'à 70 ans. Les Aras peuvent vivre 50 à 60 ans. Les Cacatoès 40 à 60 ans. C\'est un engagement de vie.'},
  {q:'Quel perroquet apprend le mieux à parler ?',a:'Le Gris du Gabon est universellement reconnu comme le meilleur parleur. L\'Amazone à Front Bleu suit de près avec une excellente intonation. L\'Éclectus apprend aussi des mots mais avec moins de précision.'},
  {q:'Quel perroquet convient le mieux à un appartement parisien ?',a:'Le Gris du Gabon (niveau sonore modéré, taille raisonnable) ou l\'Amazone à Front Bleu dans un appartement bien isolé. L\'Éclectus est encore mieux adapté pour les appartements — c\'est l\'espèce de grande taille la plus discrète.'},
],
bodyHTML:`
  <p>La décision d'adopter un perroquet est l'une des plus engageantes que l'on puisse prendre — certaines espèces peuvent vivre plus de 60 ans, et leur personnalité, leurs besoins et leurs exigences varient énormément d'une espèce à l'autre. Ce guide vous aide à choisir l'espèce qui correspond réellement à votre mode de vie, votre logement et vos disponibilités.</p>
  <h2>Les Facteurs Essentiels à Évaluer</h2>
  <p>Avant de choisir une espèce, posez-vous honnêtement ces cinq questions :</p>
  <ul>
    <li><strong>Niveau sonore tolérable :</strong> Vivez-vous dans un appartement en immeuble ancien avec des murs fins ? Un Cacatoès à Huppe Jaune pourrait mettre votre vie de voisinage à rude épreuve.</li>
    <li><strong>Temps disponible :</strong> Êtes-vous souvent absent ? Le Gris du Gabon nécessite 3 à 4 heures d'interaction quotidienne minimum. Pour des personnes très occupées, un Éclectus ou un Conure sont plus adaptés.</li>
    <li><strong>Espace disponible :</strong> Un Ara Hyacinthe dans un studio parisien — non. Un Gris du Gabon dans un T3 avec jardin — parfaitement.</li>
    <li><strong>Budget à long terme :</strong> Avez-vous évalué le coût annuel d'entretien (alimentation, vétérinaire, jouets) ? Pour un Ara, comptez entre 1 000€ et 2 500€ par an.</li>
    <li><strong>Engagement à très long terme :</strong> Avez-vous pensé à ce qui se passera pour l'oiseau si vous n'êtes plus en mesure de vous en occuper ? Désignez un tuteur de confiance.</li>
  </ul>
  <h2>Le Top 5 par Profil de Propriétaire</h2>
  <h3>Pour le Passionné Expérimenté avec du Temps : Gris du Gabon</h3>
  <p>Le Gris du Gabon est l'espèce de référence pour ceux qui recherchent une relation profonde et intellectuellement stimulante. Sa compréhension du langage, sa mémoire et sa capacité à communiquer véritablement (et non juste à imiter) en font une expérience sans équivalent dans le monde animal de compagnie. Exigeant en temps et en engagement émotionnel — mais d'une richesse incomparable.</p>
  <h3>Pour les Grandes Demeures et les Passionnés de Magnificence : Ara Hyacinthe</h3>
  <p>Si vous avez l'espace, l'expérience et le budget, l'Ara Hyacinthe est le roi des perroquets. Aucune autre espèce ne combine de manière aussi saisissante la majesté physique et la douceur du tempérament. Un engagement pour 50 à 60 ans — et une présence dans la maison qui ne laisse personne indifférent.</p>
  <h3>Pour les Appartements (Bien Isolés) : Éclectus</h3>
  <p>L'Éclectus est la révélation pour ceux qui veulent un grand perroquet sans les problèmes de bruit. Son niveau sonore modéré, son tempérament calme et ses couleurs spectaculaires en font l'un des meilleurs choix pour les appartements urbains français. La contrainte : sa diète spécifique demande un vrai engagement nutritionnel.</p>
  <h3>Pour les Familles Actives : Amazone à Front Bleu</h3>
  <p>L'Amazone est l'entertainer de la famille — bavarde, comique, expressive et pleine de vie. Sa robustesse et sa longévité (jusqu'à 70 ans) en font un compagnon de générations. Elle nécessite une éducation cohérente pour traverser sereinement la période de maturité sexuelle, mais une Amazone bien éduquée est un joyau.</p>
  <h3>Pour les Débutants : Cacatoès Rosalbin</h3>
  <p>Le Rosalbin est souvent le meilleur point d'entrée dans le monde des grands psittacidés pour les personnes qui n'ont pas encore d'expérience avec les cacatoès. Plus accessible que le Huppé Jaune, ses couleurs rose et gris sont belles et distinctives, et son tempérament est plus stable que beaucoup d'autres espèces de taille comparable.</p>
  <h2>Tableau Comparatif des Espèces</h2>
  <table class="specs-table">
    <thead><tr><th>Espèce</th><th>Bruit</th><th>Attention/j</th><th>Durée de vie</th><th>Complexité</th></tr></thead>
    <tbody>
      <tr><td>Gris du Gabon</td><td>Modéré</td><td>3–4h</td><td>50–70 ans</td><td>Élevée</td></tr>
      <tr><td>Ara Hyacinthe</td><td>Modéré-Élevé</td><td>4–6h</td><td>50–60 ans</td><td>Très élevée</td></tr>
      <tr><td>Ara Bleu et Jaune</td><td>Élevé</td><td>3–4h</td><td>50–60 ans</td><td>Élevée</td></tr>
      <tr><td>Ara Macao</td><td>Élevé</td><td>3–4h</td><td>40–50 ans</td><td>Élevée</td></tr>
      <tr><td>Cacatoès Huppé Jaune</td><td>Très élevé</td><td>5–8h</td><td>40–60 ans</td><td>Très élevée</td></tr>
      <tr><td>Cacatoès Rosalbin</td><td>Modéré-Élevé</td><td>3–5h</td><td>25–40 ans</td><td>Modérée</td></tr>
      <tr><td>Amazone Front Bleu</td><td>Modéré-Élevé</td><td>2–3h</td><td>40–70 ans</td><td>Modérée</td></tr>
      <tr><td>Éclectus</td><td>Modéré</td><td>2–3h</td><td>30–50 ans</td><td>Modérée</td></tr>
    </tbody>
  </table>
  <p>Ce tableau est indicatif — chaque oiseau a sa propre personnalité qui peut varier significativement dans la moyenne de l'espèce. Un Gris du Gabon particulièrement confiant peut être moins exigeant qu'un Cacatoès Rosalbin anxieux. La socialisation de la cria depuis le plus jeune âge est un facteur déterminant.</p>
  <h2>La Règle d'Or : Avant tout, Visitez un Éleveur</h2>
  <p>Aucun article ne peut remplacer une rencontre directe avec les espèces qui vous intéressent. Paraíso de Aves reçoit des visiteurs sur rendez-vous dans notre élevage à Llíria (Valence, Espagne). Beaucoup de nos clients français font le déplacement — c'est aussi un voyage magnifique dans la région valencienne. Nous proposons également des vidéoconférences pour présenter les spécimens disponibles.</p>
`,
},

{slug:'prix-perroquet-france',title:'Prix d\'un Perroquet en France 2026 | Guide des Tarifs',metaDesc:'Combien coûte un perroquet en France en 2026 ? Prix par espèce, coûts d\'entretien annuels, frais CITES. Guide complet et transparent des tarifs.',
h1:'Prix d\'un Perroquet en France : Guide Complet 2026',badge:'💰 GUIDE DES PRIX · FRANCE 2026',readTime:8,
img:'loro-gris-02.webp',imgAlt:'Perroquet gris du Gabon avec documentation CITES sur une table — représentant les coûts d\'acquisition en France',caption:'Le prix d\'un perroquet inclut bien plus que l\'oiseau lui-même — documentation, transport et entretien sont à prévoir',
ctaTitle:'Demandez un Devis Actualisé',ctaText:'Les prix varient selon la disponibilité et l\'espèce. Contactez-nous pour une cotation complète incluant CITES, transport et documentation.',
related:[{slug:'quel-perroquet-choisir',label:'Quel Perroquet Choisir?'},{slug:'guide-cites-france',label:'Guide CITES France'},{slug:'meilleurs-perroquets-debutants',label:'Pour Débutants'},{slug:'choisir-eleveur-serieux',label:'Choisir un Éleveur'}],
faqs:[
  {q:'Pourquoi les perroquets avec CITES coûtent-ils plus cher ?',a:'Le coût de la documentation CITES, des frais d\'enregistrement, des contrôles vétérinaires et du transport certifié est inclus dans le prix. Cette différence est aussi une garantie : l\'oiseau n\'a pas été capturé illégalement dans la nature.'},
  {q:'Quel est le perroquet le moins cher avec CITES en France ?',a:'Les Conures et certaines espèces d\'Amazones sont généralement les options les plus accessibles parmi les perroquets avec documentation CITES complète.'},
  {q:'Combien dépense-t-on par an pour un Gris du Gabon en France ?',a:'Entre 1 000€ et 2 000€ par an, incluant alimentation de qualité, consultations vétérinaires annuelles, jouets et accessoires. En cas d\'urgence médicale, les coûts peuvent être très significativement supérieurs.'},
  {q:'Les frais de livraison en France sont-ils élevés ?',a:'Les frais de transport spécialisé pour animaux vivants varient selon la distance et l\'espèce. Comptez entre 80€ et 200€ pour une livraison en France depuis l\'Espagne. Nous incluons le devis complet dans notre réponse à toute demande.'},
  {q:'Peut-on négocier le prix d\'un perroquet ?',a:'Les prix d\'un éleveur enregistré reflètent des coûts réels — frais d\'élevage, documentation, vétérinaire. Une forte négociation à la baisse est le signal d\'alerte d\'un vendeur non sérieux. Un prix très bas pour une espèce rare devrait systématiquement éveiller les soupçons.'},
],
bodyHTML:`
  <p>« Combien coûte un perroquet ? » est la question que nous recevons le plus fréquemment de nos clients en France. La réponse honnête est : bien plus que le prix d'achat initial — et c'est précisément ce que ce guide détaille. Comprendre l'ensemble des coûts liés à l'acquisition et à l'entretien d'un perroquet est indispensable pour prendre une décision éclairée.</p>
  <h2>Prix d'Acquisition par Espèce (France, 2026)</h2>
  <p>Les prix ci-dessous concernent des oiseaux apprivoisés à la main par un éleveur enregistré, avec documentation CITES complète, bague d'identification fermée et certificat vétérinaire. Les prix des oiseaux sans documentation sont inférieurs — mais représentent un risque légal et sanitaire réel.</p>
  <div class="highlight-box"><strong>Note :</strong> Tous les prix sont indicatifs. La disponibilité et le prix exact varient selon l'âge, le degré de socialisation et la saison. Contactez-nous pour une cotation actualisée.</div>
  <h3>Conure (Pyrrhura / Aratinga)</h3>
  <p>Fourchette indicative : <strong>400€ – 900€</strong>. Les conures sont parmi les options les plus accessibles parmi les psittacidés avec CITES. Le prix varie selon l'espèce — les Conures Soleil (Aratinga solstitialis) sont nettement plus chères que les Conures Verts (Pyrrhura molinae).</p>
  <h3>Amazone à Front Bleu</h3>
  <p>Fourchette indicative : <strong>700€ – 1 800€</strong>. L'Amazone est une espèce d'entrée de gamme pour les grands psittacidés, avec un rapport qualité/personnalité/prix très favorable.</p>
  <h3>Éclectus</h3>
  <p>Fourchette indicative : <strong>900€ – 2 000€</strong>. Le prix reflète la rareté relative de l'espèce chez les éleveurs européens et son dimorphisme spectaculaire.</p>
  <h3>Gris du Gabon</h3>
  <p>Fourchette indicative : <strong>1 800€ – 4 000€</strong>. Son classement en Annexe I CITES et sa popularité en font l'une des espèces les plus chères du marché européen. Les spécimens Timneh (sous-espèce plus petite) sont généralement moins chers.</p>
  <h3>Cacatoès Rosalbin</h3>
  <p>Fourchette indicative : <strong>900€ – 2 000€</strong>.</p>
  <h3>Cacatoès à Huppe Jaune</h3>
  <p>Fourchette indicative : <strong>1 000€ – 3 000€</strong>.</p>
  <h3>Ara Bleu et Jaune</h3>
  <p>Fourchette indicative : <strong>2 500€ – 5 000€</strong>.</p>
  <h3>Ara Macao</h3>
  <p>Fourchette indicative : <strong>3 000€ – 6 000€</strong>. Son classement Annexe I et sa relative rareté chez les éleveurs européens expliquent ce prix élevé.</p>
  <h3>Ara Hyacinthe</h3>
  <p>Fourchette indicative : <strong>10 000€ – 25 000€</strong>. L'Ara Hyacinthe est l'espèce la plus chère du monde des psittacidés — reflet de sa rareté, de son classement CITES I et de la complexité de son élevage.</p>
  <h2>Coûts d'Entretien Annuels</h2>
  <p>Au-delà du prix d'acquisition, voici les coûts annuels réalistes pour les espèces les plus courantes :</p>
  <ul>
    <li><strong>Alimentation de qualité :</strong> 250€ – 800€/an (granulés + fruits + légumes frais)</li>
    <li><strong>Consultation vétérinaire annuelle :</strong> 80€ – 200€ (+ analyses de sang : 100€ – 250€)</li>
    <li><strong>Jouets et perchoirs (renouvellement) :</strong> 150€ – 400€/an</li>
    <li><strong>Cage et accessoires (amortissement) :</strong> 60€ – 250€/an</li>
    <li><strong>Total estimé hors urgences :</strong> 540€ – 1 650€/an</li>
  </ul>
  <h2>Les Coûts Cachés que Personne ne Mentionne</h2>
  <ul>
    <li><strong>Urgences vétérinaires :</strong> Une consultation d'urgence aviaire spécialisée coûte entre 150€ et 500€ à Paris. Une chirurgie peut dépasser 2 000€.</li>
    <li><strong>Pension pendant les vacances :</strong> Une pension spécialisée en oiseaux exotiques en France coûte 20€ à 50€ par jour.</li>
    <li><strong>Aménagements du logement :</strong> Protection des fenêtres, purificateur d'air (notamment pour les Cacatoès), chauffage supplémentaire.</li>
    <li><strong>Frais de livraison initiaux :</strong> 80€ à 200€ pour une livraison depuis l'Espagne en France.</li>
  </ul>
  <p>Un Gris du Gabon vivant 60 ans représente un coût total de maintenance estimé entre 50 000€ et 100 000€ — hors urgences médicales. C'est l'animal de compagnie avec le coût de vie total le plus élevé que la plupart des familles puissent adopter. La décision mérite une réflexion approfondie sur le budget à long terme.</p>
`,
},

{slug:'guide-cites-france',title:'Guide CITES France 2026 | Réglementation Perroquets',metaDesc:'Tout sur la CITES en France pour les perroquets. Annexes I et II, documents obligatoires, DREAL, contrôles et sanctions. Guide complet et actualisé 2026.',
h1:'Guide CITES France 2026 : Tout ce que Vous Devez Savoir',badge:'📋 CITES FRANCE · GUIDE RÉGLEMENTAIRE 2026',readTime:10,
img:'huevos-fertiles-01.webp',imgAlt:'Documentation CITES avec bague d\'identification — certificats obligatoires pour la détention légale de perroquets en France',caption:'La documentation CITES est obligatoire en France pour toutes les espèces de perroquets protégées',
ctaTitle:'Tous nos Perroquets ont leur CITES',ctaText:'Documentation légale complète, valable en France et dans toute l\'UE — incluse sans frais supplémentaires dans chaque oiseau.',
related:[{slug:'quel-perroquet-choisir',label:'Quel Perroquet Choisir?'},{slug:'choisir-eleveur-serieux',label:'Choisir un Éleveur Sérieux'},{slug:'prix-perroquet-france',label:'Prix en France'},{slug:'perroquet-gris-du-gabon',label:'Gris du Gabon'}],
faqs:[
  {q:'La CITES est-elle obligatoire pour tous les perroquets en France ?',a:'Pour toutes les espèces inscrites aux Annexes I ou II, oui. Cela inclut pratiquement tous les perroquets de taille moyenne et grande : Gris du Gabon, Aras, Cacatoès, Amazones, Éclectus. Seules quelques espèces communes (perruches ondulées non protégées) peuvent être exemptes.'},
  {q:'Que risque-t-on en France si on n\'a pas de CITES ?',a:'La saisie immédiate de l\'animal, une amende pouvant aller de 1 500€ à 150 000€ selon la gravité, et dans les cas de trafic intentionnel, des poursuites pénales avec peine de prison potentielle.'},
  {q:'Comment vérifier l\'authenticité d\'un certificat CITES ?',a:'Contactez la DREAL de votre région avec le numéro du certificat. Pour les certificats émis en Espagne, l\'autorité de vérification est le MITERD. Un certificat authentique a toujours un numéro unique, une date d\'émission et les données de l\'espèce et du détenteur.'},
  {q:'La bague d\'identification est-elle toujours obligatoire ?',a:'Pour les espèces nées en captivité d\'éleveurs enregistrés, la bague fermée est le moyen d\'identification standard. Une bague ouverte (placée artificiellement sur un adulte) est un signal d\'alerte majeur.'},
  {q:'Peut-on vendre un perroquet CITES à un autre particulier en France ?',a:'C\'est possible mais des formalités documentaires s\'appliquent. Pour les espèces Annexe I, une autorisation de la DREAL peut être nécessaire. Consultez la DREAL de votre région avant toute transaction.'},
],
bodyHTML:`
  <p>La Convention sur le Commerce International des Espèces de faune et de flore sauvages menacées d'extinction — la CITES — est le traité international qui régit le commerce légal des espèces protégées. En France, sa mise en œuvre est assurée par le Code de l'environnement (articles L.412-1 et suivants) et par les textes européens (Règlement CE 338/97). Pour tout propriétaire de perroquet en France, comprendre la CITES n'est pas une option — c'est une obligation légale.</p>
  <h2>Les Annexes de la CITES : Ce qu'Elles Signifient</h2>
  <h3>Annexe I — Protection Maximale</h3>
  <p>Les espèces de l'Annexe I sont menacées d'extinction. Leur commerce commercial international est interdit, à l'exception de la cession d'individus nés en captivité d'éleveurs enregistrés. En France, les espèces de perroquets les plus connues à l'Annexe I incluent :</p>
  <ul>
    <li>Perroquet Gris du Gabon (<em>Psittacus erithacus</em>) — depuis 2016</li>
    <li>Ara Hyacinthe (<em>Anodorhynchus hyacinthinus</em>)</li>
    <li>Ara Macao (<em>Ara macao</em>)</li>
    <li>Plusieurs espèces d'Amazones menacées</li>
  </ul>
  <p>Pour détenir légalement une espèce Annexe I en France, vous devez disposer du certificat CITES de naissance en captivité délivré par l'éleveur et, selon les cas, d'une autorisation d'importation délivrée par la DREAL compétente.</p>
  <h3>Annexe II — Commerce Contrôlé</h3>
  <p>Les espèces de l'Annexe II ne sont pas nécessairement menacées mais leur commerce doit être contrôlé pour éviter une exploitation excessive. La plupart des perroquets communs sont en Annexe II :</p>
  <ul>
    <li>Ara Bleu et Jaune (<em>Ara ararauna</em>)</li>
    <li>Cacatoès à Huppe Jaune (<em>Cacatua galerita</em>)</li>
    <li>Cacatoès Rosalbin (<em>Eolophus roseicapilla</em>)</li>
    <li>Amazone à Front Bleu (<em>Amazona aestiva</em>)</li>
    <li>Éclectus (<em>Eclectus roratus</em>)</li>
  </ul>
  <h2>Les Autorités Compétentes en France</h2>
  <p>En France, la gestion de la CITES est assurée par :</p>
  <ul>
    <li><strong>DREAL</strong> (Directions Régionales de l'Environnement, de l'Aménagement et du Logement) — autorités CITES régionales compétentes pour la délivrance et la vérification des certificats</li>
    <li><strong>DRIEAT Île-de-France</strong> — équivalent de la DREAL pour Paris et l'Île-de-France</li>
    <li><strong>Direction des Douanes</strong> — contrôle aux frontières</li>
    <li><strong>ONCFS / OFB</strong> (Office Français de la Biodiversité) — inspections et contrôles</li>
  </ul>
  <h2>La Documentation Obligatoire</h2>
  <h3>Pour les Espèces de l'Annexe II (élevage en captivité, origine UE)</h3>
  <ul>
    <li>Certificat CITES de naissance en captivité délivré par l'éleveur enregistré</li>
    <li>Bague d'identification fermée (apposée sur la patte de la cria par l'éleveur)</li>
    <li>Facture ou contrat d'acquisition de l'éleveur</li>
  </ul>
  <h3>Pour les Espèces de l'Annexe I (élevage en captivité, origine UE)</h3>
  <ul>
    <li>Tous les documents ci-dessus, plus :</li>
    <li>Pour certains cas : autorisation de détention de la DREAL (selon la réglementation française en vigueur)</li>
    <li>Certificat spécifique d'exemption ou de naissance en captivité</li>
  </ul>
  <h2>Les Sanctions en France</h2>
  <p>La détention d'un animal CITES sans documentation valide est sanctionnée par l'article L.415-3 du Code de l'environnement :</p>
  <ul>
    <li>Saisie immédiate de l'animal (confiscation)</li>
    <li>Amende de la 1ère à la 5ème classe contraventionnelle (jusqu'à 1 500€)</li>
    <li>Pour les délits plus graves : jusqu'à 150 000€ d'amende et 2 ans d'emprisonnement</li>
    <li>Pour le trafic organisé : jusqu'à 300 000€ et 5 ans d'emprisonnement</li>
  </ul>
  <p>Ces sanctions s'appliquent même si l'acheteur était de bonne foi — "je ne savais pas que le vendeur n'avait pas de documentation" n'est pas une défense recevable. Vérifiez toujours la documentation avant d'acheter.</p>
  <h2>Comment Paraíso de Aves Garantit la Conformité</h2>
  <p>Paraíso de Aves est un éleveur enregistré en Espagne depuis plus de 25 ans. Tous nos oiseaux sont nés en captivité dans notre établissement enregistré de Llíria (Valence). La documentation que nous fournissons — certificat CITES de naissance en captivité, bague d'identification fermée, certificat vétérinaire — est valide dans toute l'Union Européenne, dont la France, et reconnue par les DREAL françaises.</p>
`,
},

{slug:'choisir-eleveur-serieux',title:'Comment Choisir un Éleveur de Perroquets Sérieux en France',metaDesc:'Comment reconnaître un éleveur de perroquets sérieux en France ? 8 critères, 10 signaux d\'alerte et 8 questions obligatoires. Guide complet pour acheter en sécurité.',
h1:'Comment Choisir un Éleveur de Perroquets Sérieux',badge:'✅ GUIDE D\'ACHAT SÉCURISÉ · FRANCE',readTime:8,
img:'loro-gris-01.webp',imgAlt:'Éleveur présentant un Gris du Gabon apprivoisé à la main — exemple d\'un éleveur sérieux avec documentation visible',caption:'Un éleveur sérieux présente ses oiseaux, sa documentation et son établissement sans hésitation',
ctaTitle:'Paraíso de Aves est un Éleveur Enregistré',ctaText:'Plus de 25 ans d\'activité, documentation CITES complète et suivi post-vente — découvrez nos perroquets disponibles.',
related:[{slug:'guide-cites-france',label:'Guide CITES France'},{slug:'prix-perroquet-france',label:'Prix en France'},{slug:'quel-perroquet-choisir',label:'Quel Perroquet Choisir?'},{slug:'preparer-maison-perroquet',label:'Préparer sa Maison'}],
faqs:[
  {q:'Comment vérifier si un éleveur est légalement enregistré en France ?',a:'En France, vous pouvez contacter la DREAL de votre région pour vérifier si un éleveur est enregistré. Pour les éleveurs européens (comme en Espagne), demandez le numéro d\'enregistrement de l\'établissement et vérifiez via les autorités CITES du pays d\'origine.'},
  {q:'Un éleveur sans site web est-il forcément suspect ?',a:'Non — certains éleveurs sérieux n\'ont pas de site élaboré. Le critère essentiel est la documentation légale, pas la présence en ligne. Cependant, l\'absence totale de présence vérifiable (site, références, numéro d\'enregistrement) est un signal d\'alerte.'},
  {q:'Peut-on acheter un perroquet via une annonce en ligne sans risque ?',a:'C\'est possible mais risqué. Les plateformes d\'annonces françaises (Leboncoin, etc.) hébergent de nombreux vendeurs sans documentation légale. Exigez systématiquement le CITES complet et vérifiez la bague avant tout engagement financier.'},
  {q:'L\'apprivoisage à la main garantit-il un meilleur oiseau ?',a:'Pas automatiquement — mais un oiseau correctement apprivoisé depuis la naissance par un éleveur expérimenté est généralement plus sociable, moins craintif et s\'adapte mieux à la vie familiale. C\'est un critère important à vérifier.'},
  {q:'Que faire si j\'ai acheté un perroquet sans CITES ?',a:'Contactez la DREAL de votre région pour régulariser la situation si possible. Pour certains cas, une régularisation est envisageable ; pour d\'autres, la situation peut être difficile à résoudre. La meilleure solution reste de ne pas se retrouver dans cette situation.'},
],
bodyHTML:`
  <p>En France, le marché des perroquets exotiques est malheureusement peuplé de vendeurs peu scrupuleux — sans licence, sans documentation CITES valide et parfois avec des oiseaux en mauvais état de santé ou de socialisation. Ce guide vous donne tous les outils pour distinguer un éleveur sérieux d'un vendeur à éviter.</p>
  <h2>Les 8 Critères d'un Éleveur Sérieux</h2>
  <h3>1. Établissement Enregistré auprès des Autorités</h3>
  <p>Un éleveur légal dispose d'un numéro d'enregistrement de son établissement de reproduction. En France, ce numéro est délivré par la DDPP (Direction Départementale de la Protection des Populations). Pour les éleveurs étrangers (comme en Espagne), l'équivalent est délivré par l'autorité compétente nationale. Demandez ce numéro — un éleveur sérieux le fournit immédiatement.</p>
  <h3>2. Documentation CITES Complète et Vérifiable</h3>
  <p>Le certificat CITES doit accompagner chaque oiseau vendu. Il identifie l'individu spécifique (par le numéro de bague), indique l'espèce, la date de naissance, l'éleveur d'origine et est émis par l'autorité compétente. Un vendeur qui "prépare les documents" après la vente est un signal d'alarme majeur.</p>
  <h3>3. Bague d'Identification Fermée</h3>
  <p>La bague fermée est placée sur la patte de la cria quand elle est encore très jeune — il est impossible de la placer sur un adulte sans fracturer l'os. Une bague ouverte indique une manipulation a posteriori et peut signaler une origine douteuse. Vérifiez toujours que la bague est bien fermée et correspond au numéro inscrit sur le certificat CITES.</p>
  <h3>4. Oiseaux Apprivoisés à la Main depuis la Naissance</h3>
  <p>Les oiseaux d'un éleveur sérieux sont manipulés et socialisés dès le plus jeune âge. Observez comment l'éleveur interagit avec ses oiseaux — un éleveur expérimenté les tient avec confiance et les oiseaux réagissent sans stress excessif. Un oiseau qui tremble ou cherche à fuir à l'approche de l'éleveur est mal socialisé.</p>
  <h3>5. Installations Propres et Bien Entretenues</h3>
  <p>Si vous visitez l'élevage (fortement recommandé), vérifiez la propreté des volières et des cages, la qualité de l'alimentation proposée, l'accès à de l'eau fraîche et l'absence de signes de maladie (plumes en désordre, yeux fermés, léthargie). Un éleveur qui n'autorise pas les visites est suspect.</p>
  <h3>6. Certificat Vétérinaire Récent</h3>
  <p>En plus du CITES, un éleveur sérieux fournit un certificat vétérinaire attestant l'état de santé de l'oiseau — idéalement daté de la semaine précédant la livraison.</p>
  <h3>7. Suivi Post-Vente</h3>
  <p>Un bon éleveur ne coupe pas le contact à la livraison. Il reste disponible pour répondre à vos questions sur l'alimentation, le comportement et la santé de l'oiseau. Avant d'acheter, posez la question : "Puis-je vous contacter après la livraison si j'ai des questions ?"</p>
  <h3>8. Transparence sur les Prix et la Disponibilité</h3>
  <p>Un éleveur honnête est transparent sur les prix actualisés, les délais de disponibilité et ce qui est inclus ou non dans le prix. Méfiez-vous des prix très inférieurs au marché — ils indiquent souvent l'absence de documentation ou des oiseaux en mauvais état.</p>
  <h2>Les 10 Signaux d'Alerte Immédiats</h2>
  <ol>
    <li>Refus de montrer le certificat CITES avant le paiement</li>
    <li>Bague absente ou ouverte</li>
    <li>Refus de fournir le numéro d'enregistrement de l'élevage</li>
    <li>Prix très inférieur au marché sans explication</li>
    <li>Vente uniquement par messagerie sans possibilité de vidéoconférence</li>
    <li>Refus de visite de l'élevage</li>
    <li>Documentation "en cours de préparation" — disponible seulement après paiement</li>
    <li>Oiseaux visiblement en mauvais état (plumes abîmées, yeux fermés, léthargie)</li>
    <li>Pression pour une décision rapide ("j'ai d'autres acheteurs intéressés")</li>
    <li>Aucune référence vérifiable de clients précédents</li>
  </ol>
  <h2>Les 8 Questions Obligatoires à Poser</h2>
  <ol>
    <li>Quel est votre numéro d'enregistrement d'élevage ?</li>
    <li>Pouvez-vous me montrer le certificat CITES de cet oiseau spécifique ?</li>
    <li>L'oiseau a-t-il une bague fermée ? Puis-je voir le numéro ?</li>
    <li>Puis-je visiter l'élevage ou faire une vidéoconférence ?</li>
    <li>L'oiseau dispose-t-il d'un certificat vétérinaire récent ?</li>
    <li>L'oiseau a-t-il été apprivoisé à la main ? Depuis quel âge ?</li>
    <li>Le prix comprend-il le transport et la caisse IATA ?</li>
    <li>Puis-je vous contacter après la livraison si j'ai des questions ?</li>
  </ol>
`,
},

{slug:'meilleurs-perroquets-debutants',title:'Meilleurs Perroquets pour Débutants en France | Guide 2026',metaDesc:'Quels perroquets sont les mieux adaptés aux débutants en France ? Top 5 des espèces accessibles, avec niveau d\'exigence, durée de vie et conseils pratiques.',
h1:'Les 5 Meilleurs Perroquets pour les Débutants en France',badge:'🌟 GUIDE DÉBUTANTS · FRANCE 2026',readTime:7,
img:'conuro-01.webp',imgAlt:'Conure vert posé sur l\'épaule d\'une personne souriante — l\'espèce la plus accessible pour les débutants',caption:'La Conure verte est souvent recommandée comme premier perroquet pour les débutants',
ctaTitle:'Prêt pour Votre Premier Perroquet ?',ctaText:'Paraíso de Aves propose des espèces accessibles aux débutants avec CITES officiel et suivi personnalisé pour les nouveaux propriétaires.',
related:[{slug:'quel-perroquet-choisir',label:'Quel Perroquet Choisir?'},{slug:'prix-perroquet-france',label:'Prix en France'},{slug:'preparer-maison-perroquet',label:'Préparer sa Maison'},{slug:'alimentation-perroquets',label:'Alimentation'}],
faqs:[
  {q:'Quelle est la meilleure espèce pour débuter ?',a:'La Conure Verte (Pyrrhura molinae) ou l\'Amazone à Front Bleu jeune sont nos recommandations principales pour les débutants en France. Bon équilibre entre personnalité, exigence et durée de vie raisonnable.'},
  {q:'Le Gris du Gabon est-il adapté aux débutants ?',a:'Généralement non. Le Gris du Gabon est très exigeant émotionnellement et sensible aux erreurs de gestion. Pour une première expérience, mieux vaut commencer par une espèce plus robuste et plus tolérante.'},
  {q:'Quelle est la meilleure espèce pour un appartement parisien en tant que débutant ?',a:'L\'Éclectus est le meilleur choix pour un appartement avec son niveau sonore modéré. Pour un premier perroquet, la Conure Verte est aussi excellente en appartement de taille correcte.'},
  {q:'Combien d\'heures faut-il consacrer à un perroquet pour débutants ?',a:'Même pour les espèces les plus "indépendantes", prévoyez au minimum 1 à 2 heures d\'interaction directe par jour. Toutes les espèces de psittacidés sont des animaux sociaux qui ont besoin de contact humain régulier.'},
  {q:'Un perroquet pour débutant peut-il être laissé seul en journée ?',a:'Oui, pour de courtes périodes (4 à 6 heures maximum), à condition de fournir des jouets, une stimulation musicale (radio) et un retour garanti. Pour les absences plus longues, envisagez d\'adopter en binôme.'},
],
bodyHTML:`
  <p>Choisir son premier perroquet est une décision qui engage pour des années, voire des décennies. Toutes les espèces de psittacidés ont leurs exigences spécifiques — et certaines sont bien mieux adaptées que d'autres à des tuteurs qui découvrent pour la première fois la richesse et la complexité de ces oiseaux extraordinaires.</p>
  <h2>Ce qui Rend une Espèce Idéale pour les Débutants</h2>
  <ul>
    <li><strong>Tempérament équilibré :</strong> L'oiseau tolère bien les erreurs inévitables d'un tuteur débutant — sans réactions excessives de peur ou d'agressivité</li>
    <li><strong>Niveau d'exigence modéré :</strong> Il est heureux avec 1 à 3 heures d'interaction par jour — pas 6 à 8 heures comme certains Cacatoès</li>
    <li><strong>Robustesse sanitaire :</strong> Les maladies rares ou les traitements complexes sont plus difficiles à gérer pour un novice</li>
    <li><strong>Taille manejable :</strong> Un oiseau de 1,5 kg avec un bec puissant peut causer des blessures sérieuses — commencez avec une espèce de taille plus modeste</li>
    <li><strong>Durée de vie raisonnable :</strong> Un engagement de 25 ans est plus accessible qu'un de 70 ans pour une première expérience</li>
  </ul>
  <h2>Le Top 5 pour les Débutants en France</h2>
  <h3>1. La Conure Verte (Pyrrhura molinae) — Le Meilleur Premier Perroquet</h3>
  <p>La Conure verte est, de loin, notre première recommandation pour les débutants en France. Petite (25 cm), affectueuse sans être dépendante, niveau sonore modéré comparé à ses cousines Aratinga, espérance de vie raisonnable (15 à 25 ans), apprendquelques mots et est très joueurs — c'est l'équilibre parfait pour découvrir la vie avec un psittacidé sans se retrouver dépassé.</p>
  <h3>2. L'Amazone à Front Bleu Jeune — Communicative et Sociable</h3>
  <p>Un jeune Amazone bien socialisé est un compagnon extraordinaire pour les débutants motivés. Sa nature extravertie facilite la création d'un lien rapide, sa capacité verbale est gratifiante et son tempérament est généralement prévisible la première année. Attention : la maturité sexuelle (5 à 12 ans) peut être un défi — préparez-vous avec les conseils d'un vétérinaire aviaire.</p>
  <h3>3. L'Éclectus — Pour les Appartements</h3>
  <p>L'Éclectus est une surprise positive pour les débutants qui cherchent un grand perroquet avec un niveau sonore acceptable. Son tempérament calme et observateur est plus accessible que l'intensité émotionnelle des Cacatoès ou des Aras. La contrainte principale est sa diète spécifique — qui nécessite une apprentissage mais pas une expertise particulière.</p>
  <h3>4. Le Cacatoès Rosalbin — Pour Ceux qui Rêvent de Cacatoès</h3>
  <p>Pour les amateurs de Cacatoès qui trouvent le Huppé Jaune trop exigeant, le Rosalbin est une excellente alternative. Plus petit, moins bruyant (relativement) et avec un niveau d'exigence d'attention légèrement inférieur — tout en offrant la beauté et l'affection caractéristiques des Cacatoès.</p>
  <h3>5. La Perruche à Collier (Psittacula krameri) — Pour Commencer en Douceur</h3>
  <p>Moins habituellement citée dans les guides de psittacidés, la Perruche à Collier est pourtant un excellent choix pour les tout débutants qui veulent s'acclimater à la vie avec un oiseau exotique avant de passer à plus grand. Gracieuse, relativement indépendante et de maintenance simple, elle permet d'acquérir les réflexes essentiels.</p>
  <h2>Espèces à Éviter pour un Premier Perroquet</h2>
  <ul>
    <li><strong>Gris du Gabon :</strong> Exigence émotionnelle extrême, très sensible aux erreurs de gestion</li>
    <li><strong>Cacatoès à Huppe Jaune :</strong> Niveau de dépendance émotionnelle incompatible avec des tuteurs débutants ou très occupés</li>
    <li><strong>Ara Hyacinthe :</strong> Taille, coût et complexité largement supérieurs à ce que la plupart des débutants peuvent gérer</li>
    <li><strong>Grands Aras (Ara ararauna, Ara macao) :</strong> Bec puissant et forte personnalité — mieux adaptés pour des propriétaires avec de l'expérience</li>
  </ul>
  <h2>Checklist Avant d'Adopter Votre Premier Perroquet</h2>
  <ul>
    <li>✓ Lu au moins deux livres ou guides sur l'espèce choisie</li>
    <li>✓ Identifié un vétérinaire aviaire spécialisé dans votre ville</li>
    <li>✓ Préparé la cage, les perchoirs et les jouets avant l'arrivée</li>
    <li>✓ Vérifié votre logement pour les risques (teflon, plantes toxiques, fenêtres ouvertes)</li>
    <li>✓ Discuté de l'engagement avec toute la famille</li>
    <li>✓ Prévu un budget d'urgence vétérinaire (minimum 500€ à disposition)</li>
  </ul>
`,
},

{slug:'perroquet-gris-du-gabon-guide',title:'Perroquet Gris du Gabon : Guide Complet France 2026',metaDesc:'Guide complet du Perroquet Gris du Gabon en France. Caractéristiques, alimentation, CITES I, prix, durée de vie et comment adopter légalement en France.',
h1:'Perroquet Gris du Gabon : Guide Complet pour la France',badge:'🩶 GRIS DU GABON · GUIDE COMPLET FRANCE',readTime:11,
img:'loro-gris-01.webp',imgAlt:'Perroquet Gris du Gabon adulte regardant intensément la caméra — espèce la plus intelligente des psittacidés',caption:'Le Perroquet Gris du Gabon — le plus intelligent des perroquets et le plus demandé en France',
ctaTitle:'Intéressé par un Gris du Gabon ?',ctaText:'Vérifiez la disponibilité de nos Gris du Gabon avec documentation CITES I et livraison directe dans toute la France.',
related:[{slug:'quel-perroquet-choisir',label:'Quel Perroquet Choisir?'},{slug:'prix-perroquet-france',label:'Prix en France'},{slug:'guide-cites-france',label:'Guide CITES'},{slug:'ara-hyacinthe-guide',label:'Ara Hyacinthe Guide'}],
faqs:[
  {q:'Le Gris du Gabon est-il le perroquet le plus intelligent ?',a:'Oui, selon de nombreux spécialistes et chercheurs. Les travaux de la Dre Irene Pepperberg avec Alex, un Gris du Gabon, ont démontré sa capacité à utiliser le langage en contexte, à comprendre les notions de couleur, forme, quantité et même d\'absence — des aptitudes cognitives comparables à celles d\'un primate.'},
  {q:'Combien d\'années le Gris du Gabon vit-il en France ?',a:'Entre 50 et 70 ans en captivité avec de bons soins. Des spécimens de plus de 80 ans ont été documentés. C\'est l\'un des engagements les plus longs du monde animal de compagnie.'},
  {q:'Le Gris du Gabon est-il adapté aux enfants ?',a:'Avec précautions et supervision permanente. Le Gris du Gabon peut être un excellent compagnon pour des enfants calmes et respectueux — mais il peut aussi mordre fort s\'il se sent menacé. Une éducation mutuelle (oiseau ET enfants) est indispensable.'},
  {q:'Peut-on laisser un Gris du Gabon seul toute la journée ?',a:'Non. Le Gris du Gabon est très sensible à la solitude et peut développer des comportements stéréotypés (arrachage de plumes) s\'il est laissé seul plus de 4 à 6 heures quotidiennement. Pour les foyers avec des adultes absents en journée, l\'adoption en binôme ou chez un éleveur-pension est à envisager.'},
  {q:'Le CITES du Gris du Gabon est-il difficile à obtenir en France ?',a:'Non, si vous achetez auprès d\'un éleveur enregistré. L\'éleveur fournit directement le certificat CITES I de naissance en captivité. La complexité existe si vous essayez d\'importer un oiseau de pays tiers hors UE.'},
],
bodyHTML:`
  <p>Le Perroquet Gris du Gabon est, depuis plusieurs décennies, l'espèce de perroquet la plus populaire en France parmi les amateurs éclairés. Sa réputation légendaire d'intelligence — étayée par une recherche académique sérieuse — sa discrétion relative et sa fidélité profonde à ses tuteurs en font une espèce à part dans le monde des psittacidés. Ce guide vous dit tout ce que vous devez savoir pour adopter légalement un Gris du Gabon en France.</p>
  <h2>Classification et Origine</h2>
  <p>Le Perroquet Gris du Gabon (<em>Psittacus erithacus</em>) est originaire des forêts tropicales d'Afrique équatoriale — principalement du Gabon, du Congo, de la Côte d'Ivoire et des régions forestières entre ces pays. Il existe deux sous-espèces reconnus :</p>
  <ul>
    <li><strong>Psittacus erithacus erithacus</strong> — le Gris du Gabon nominatif, le plus grand et le plus répandu. C'est l'espèce décrite dans ce guide.</li>
    <li><strong>Psittacus erithacus timneh</strong> — le Gris du Timneh, plus petit, avec une queue brun-marron au lieu de rouge vif. Tempérament légèrement plus calme et moins stressé selon beaucoup de propriétaires ; prix généralement inférieur.</li>
  </ul>
  <p>Le Gris du Gabon a été classé en Annexe I de la CITES en 2016 — une reclassification de l'Annexe II — suite à une chute dramatique de ses populations sauvages (estimées avoir diminué de 90% sur 30 ans). Cette protection maximale est aujourd'hui indispensable à la survie de l'espèce.</p>
  <h2>L'Intelligence — Ce qui le Rend Unique</h2>
  <p>La recherche académique sur le Gris du Gabon est extensive et les résultats sont, littéralement, stupéfiants. Les travaux de la Dre Irene Pepperberg sur Alex, un Gris du Gabon qu'elle a étudié pendant 30 ans jusqu'à sa mort en 2007, ont démontré que cet oiseau était capable de :</p>
  <ul>
    <li>Identifier et nommer correctement plus de 50 objets, 7 couleurs et 5 formes</li>
    <li>Comprendre et utiliser les concepts de "même" et "différent" de manière contextuelle</li>
    <li>Comprendre la notion de zéro — une aptitude jusqu'alors attribuée uniquement aux primates et aux êtres humains</li>
    <li>Compter jusqu'à 6 et effectuer de simples additions</li>
    <li>Utiliser des mots pour exprimer de véritables émotions et intentions</li>
  </ul>
  <p>Alex, juste avant sa mort en 2007, a prononcé ses dernières paroles à la Dre Pepperberg : "You be good. I love you." Ces mots, soigneusement documentés, ont ému la communauté scientifique mondiale.</p>
  <h2>Caractéristiques Physiques</h2>
  <p>Le Gris du Gabon mesure environ 33 cm du bec à l'extrémité de la queue et pèse entre 400 et 600 g. Son plumage est gris ardoise uniforme avec des nuances légèrement plus claires sur le ventre. Sa queue est rouge carmin vif — la seule touche de couleur intense sur une silhouette par ailleurs très sobre. Ses yeux sont d'un jaune pâle qui vire au blanc-jaune chez les adultes.</p>
  <h2>Espérance de Vie et Engagement</h2>
  <p>Le Gris du Gabon peut vivre entre 50 et 70 ans en captivité avec des soins optimaux. C'est le record de longévité parmi les psittacidés les plus courants. Cette longévité extraordinaire est aussi son défi principal : adopter un Gris du Gabon à 35 ans signifie statistiquement que l'oiseau pourrait vous survivre. Planifiez un arrangement de tutelle de confiance.</p>
  <h2>CITES I — Réglementation en France</h2>
  <p>Depuis 2016, le Gris du Gabon est en Annexe I de la CITES. En France, sa détention sans documentation valide est passible de poursuites pénales. Pour acquérir légalement un Gris du Gabon en France :</p>
  <ol>
    <li>Achetez uniquement auprès d'un éleveur enregistré</li>
    <li>Vérifiez que le certificat CITES I est bien établi au nom de l'oiseau spécifique (pas un certificat générique)</li>
    <li>Vérifiez que la bague d'identification est bien fermée et correspond au numéro du certificat</li>
    <li>Conservez toujours la documentation en lieu sûr et presentable</li>
  </ol>
  <h2>Les Premières Semaines — La Période Critique</h2>
  <p>Le Gris du Gabon est une espèce particulièrement sensible au changement d'environnement. Les premières semaines dans un nouveau foyer peuvent être stressantes pour l'oiseau — il peut manger peu, paraître craintif et être silencieux. C'est normal. La clé est la patience et la constance :</p>
  <ul>
    <li>Laissez l'oiseau explorer la cage à son rythme sans forcer les interactions</li>
    <li>Parlez-lui de manière calme et régulière depuis une distance respectueuse</li>
    <li>Maintenez une routine quotidienne stable (mêmes heures de repas, mêmes voix)</li>
    <li>Évitez d'inviter des étrangers pour "voir le nouveau perroquet" les premières semaines</li>
    <li>Consultez un vétérinaire aviaire si l'oiseau ne mange pas normalement après 3 jours</li>
  </ul>
`,
},

{slug:'ara-hyacinthe-guide',title:'Ara Hyacinthe : Guide Complet France 2026 | CITES I',metaDesc:'Guide complet de l\'Ara Hyacinthe en France. La plus grande espèce de perroquet du monde — alimentation, espace, CITES I, prix et comment adopter légalement.',
h1:'Ara Hyacinthe : Guide Complet pour la France',badge:'💙 ARA HYACINTHE · GUIDE COMPLET · ESPÈCE RARE',readTime:10,
img:'guacamayo-jacinto-01.webp',imgAlt:'Ara Hyacinthe avec plumage bleu cobalt intense — la plus grande espèce de perroquet du monde',caption:'L\'Ara Hyacinthe (Anodorhynchus hyacinthinus) — le roi des perroquets, avec jusqu\'à 100 cm de la tête à la queue',
ctaTitle:'Intéressé par un Ara Hyacinthe ?',ctaText:'Disponibilité très limitée — contactez-nous pour vérifier les spécimens disponibles avec CITES I pour la France.',
related:[{slug:'quel-perroquet-choisir',label:'Quel Perroquet Choisir?'},{slug:'prix-perroquet-france',label:'Prix en France'},{slug:'guide-cites-france',label:'Guide CITES'},{slug:'perroquet-gris-du-gabon-guide',label:'Gris du Gabon Guide'}],
faqs:[
  {q:'L\'Ara Hyacinthe peut-il vivre dans un appartement en France ?',a:'Non recommandé pour un appartement standard. Sa taille imposante (jusqu\'à 100 cm) nécessite un espace très genereux — une pièce dédiée ou une grande volière extérieure est indispensable.'},
  {q:'Combien coûte un Ara Hyacinthe en France ?',a:'Le prix d\'un Ara Hyacinthe apprivoisé à la main avec CITES I complet en France est très significatif. Contactez-nous pour un devis actualisé.'},
  {q:'Est-ce une espèce agressive ?',a:'Au contraire — l\'Ara Hyacinthe est connu comme l\'"ara doux". Son tempérament est généralement affectueux et stable. Cela dit, son bec extrêmement puissant peut causer des blessures sérieuses si l\'oiseau se sent menacé ou est mal géré.'},
  {q:'Quelle alimentation pour un Ara Hyacinthe en France ?',a:'Les noix de macadamia sont la base de son alimentation (30-40%), avec des pellets de qualité pour grandes espèces, noix de coco fraîche, fruits tropicaux et légumes. La disponibilité des noix de macadamia en France est bonne via les épiceries bio et les marchés.'},
  {q:'L\'Ara Hyacinthe parle-t-il ?',a:'Modérément. L\'Ara Hyacinthe apprend quelques mots et phrases, mais avec une aptitude verbale nettement inférieure au Gris du Gabon ou à l\'Amazone. La vocalisation n\'est pas son point fort — sa présence physique et son affection le sont.'},
],
bodyHTML:`
  <p>Il existe des oiseaux remarquables, et il existe l'Ara Hyacinthe. À cent centimètres du bec à la queue, avec ce bleu cobalt profond qui capture et réfléchit la lumière de façon presque irréelle, et un bec noir capable de briser des noix de coco, l'Ara Hyacinthe est dans une catégorie à part — non seulement parmi les perroquets, mais parmi tous les animaux de compagnie possibles.</p>
  <h2>Pourquoi l'Ara Hyacinthe est-il si Rare ?</h2>
  <p>La rareté de l'Ara Hyacinthe en captivité s'explique par plusieurs facteurs convergents. Premièrement, son classement en Annexe I de la CITES depuis des décennies a fortement limité son commerce international. Deuxièmement, son élevage en captivité est complexe — les paires sont souvent difficiles à constituer, et les couvées sont petites (1 à 2 œufs par an maximum). Troisièmement, sa population sauvage, bien que mieux protégée aujourd'hui qu'il y a trente ans, reste vulnérable avec une estimation de 4 000 à 5 000 individus au Brésil.</p>
  <p>Pour les éleveurs enregistrés comme Paraíso de Aves, l'Ara Hyacinthe représente des années d'investissement en soins, infrastructure et documentation avant de pouvoir proposer des crias apprivoisées à la main à des acquéreurs qualifiés.</p>
  <h2>Le Bec — Puissance et Précision</h2>
  <p>Le bec de l'Ara Hyacinthe est un chef-d'œuvre évolutif. Sa puissance — estimée à plus de 100 kg/cm² — lui permet de briser des noix de coco et des noix de macadamia avec la même facilité qu'un humain casse une noix avec un casse-noisette. Cette puissance est mise au service d'une précision remarquable : le même bec qui brise des noix peut, avec la même facilité, éplucher délicatement un grain de raisin ou gratter doucement la tête de son tuteur favori.</p>
  <p>Pour les propriétaires, cela signifie qu'un Ara Hyacinthe qui décide de vous mordre — ce qui est très rare chez un oiseau bien socialisé — peut causer des blessures sérieuses. La relation de confiance, construite avec patience et cohérence depuis la cria, est le meilleur garant de la sécurité.</p>
  <h2>L'Espace Requis en France</h2>
  <p>C'est le critère éliminatoire pour la majorité des foyers français. L'Ara Hyacinthe ne peut pas vivre éthiquement dans une cage conventionnelle, même grande. Les options réalistes en France sont :</p>
  <ul>
    <li><strong>Pièce dédiée :</strong> Au moins 20 m² avec des perchoirs très robustes en acier inoxydable fixés au mur et au plafond. Cette option est la plus accessible dans une maison individuelle.</li>
    <li><strong>Volière extérieure chauffée :</strong> Minimum 5m × 3m × 3m, avec section intérieure accessible en permanence. Le chauffage est obligatoire pour les nuits d'hiver dans toutes les régions françaises.</li>
    <li><strong>Grande volière intérieure :</strong> Dans un espace type hangar ou grange aménagée — une solution souvent adoptée par les propriétaires ruraux.</li>
  </ul>
  <h2>L'Alimentation à la Noix de Macadamia</h2>
  <p>La noix de macadamia est à l'Ara Hyacinthe ce que la feuille de bambou est au panda — un aliment fondamental dont la disponibilité conditionne sa santé à long terme. En France, les noix de macadamia sont disponibles dans la plupart des épiceries biologiques, sur les marchés de qualité et en ligne. Comptez entre 20 et 40 euros par kilogramme selon la source.</p>
  <p>Votre Ara Hyacinthe devrait consommer entre 50 et 100 g de noix de macadamia par jour, complétés par des pellets de qualité pour grandes espèces (Harrisons, Zupreem), de la noix de coco fraîche, des fruits tropicaux (mangue, papaye, banane) et des légumes frais (poivron, brocoli, maïs).</p>
  <h2>Le Prix en France — Une Réalité à Accepter</h2>
  <p>L'Ara Hyacinthe est, sans conteste, la spèce de perroquet la plus coûteuse du marché européen. Cette réalité financière n'est pas une exploitation des amateurs — elle reflète fidèlement les coûts réels de l'élevage en captivité d'une espèce rare, les frais de documentation CITES I, les contrôles vétérinaires extensifs et la logistique de transport spécialisé. Un Ara Hyacinthe à prix anormalement bas devrait systématiquement éveiller les soupçons sur la légalité de l'offre.</p>
`,
},

{slug:'eclectus-guide',title:'Perroquet Éclectus : Guide Complet France 2026',metaDesc:'Guide complet de l\'Éclectus en France. Dimorphisme sexuel, alimentation spécifique, CITES, prix et comment adopter. L\'espèce la moins bruyante des grands perroquets.',
h1:'Perroquet Éclectus : Guide Complet pour la France',badge:'🦜 ÉCLECTUS · GUIDE COMPLET FRANCE 2026',readTime:9,
img:'eclectus-01.webp',imgAlt:'Éclectus mâle vert émeraude avec bec orange — dimorphisme spectaculaire caractéristique de l\'espèce',caption:'L\'Éclectus mâle (vert) — classifié pendant des décennies comme une espèce distincte de la femelle (rouge)',
ctaTitle:'Adoptez un Perroquet Éclectus',ctaText:'Paraíso de Aves propose des Éclectus mâles et femelles avec CITES officiel et livraison dans toute la France.',
related:[{slug:'quel-perroquet-choisir',label:'Quel Perroquet Choisir?'},{slug:'meilleurs-perroquets-debutants',label:'Pour Débutants'},{slug:'alimentation-perroquets',label:'Alimentation'},{slug:'prix-perroquet-france',label:'Prix en France'}],
faqs:[
  {q:'Vaut-il mieux adopter un Éclectus mâle ou femelle ?',a:'Les deux sont extraordinaires. Le mâle (vert) est généralement plus doux et sociable avec tous les membres de la famille. La femelle (rouge) est plus indépendante et peut être plus territoriale. Beaucoup de propriétaires adoptent un couple pour profiter du dimorphisme spectaculaire.'},
  {q:'Pourquoi les pellets standards sont-ils déconseillés pour l\'Éclectus ?',a:'Le tractus digestif long de l\'Éclectus ne tolère pas bien les additifs artificiels (colorants, conservateurs, vitamines synthétiques) présents dans de nombreux pellets du commerce. Ces additifs peuvent causer une hypertrichose — croissance anormale des plumes. Utilisez uniquement des pellets naturels certifiés sans additifs.'},
  {q:'L\'Éclectus convient-il à la vie en appartement à Paris ?',a:'Oui — c\'est même l\'une des meilleures espèces de grande taille pour les appartements grâce à son niveau sonore modéré. Ses vocalisations sont douces et musicales, bien moins envahissantes que les Aras ou Cacatoès.'},
  {q:'Peut-on adopter un Éclectus en première espèce ?',a:'Oui, avec les précautions nécessaires sur son alimentation spécifique. L\'Éclectus n\'est pas l\'espèce la plus facile (sa diète requiert un engagement nutritionnel particulier), mais son tempérament calme et son niveau sonore modéré le rendent accessible aux tuteurs motivés.'},
  {q:'Le mâle et la femelle Éclectus peuvent-ils cohabiter ?',a:'Oui, mais avec une introduction progressive et supervisée. L\'introduction doit se faire en territoire neutre, avec des phases de présentation séparées. La cohabitation réussie est fréquente — les deux sexes se complètent souvent très bien.'},
],
bodyHTML:`
  <p>Le Perroquet Éclectus est, avec le Dimorphisme Sexuel le plus prononcé de tous les psittacidés, une espèce à part. Le mâle est vert émeraude intense avec un bec orange vif — d'une beauté végétale et lumineuse. La femelle est rouge vif avec des ailes bleu roi et un bec entièrement noir — une autre splendeur, si différente qu'il faut un moment pour réaliser que l'on regarde deux individus de la même espèce.</p>
  <h2>Le Mystère du Dimorphisme — Une Histoire Scientifique</h2>
  <p>Pour comprendre à quel point le dimorphisme de l'Éclectus est saisissant, il faut savoir que pendant des décennies — du XVIIIe siècle jusqu'en 1913 — les mâles et les femelles étaient considérés comme des espèces distinctes par les naturalistes européens. Ce n'est qu'avec l'observation de la reproduction en captivité que la réalité fut établie : ces deux oiseaux si différents appartiennent à la même espèce.</p>
  <p>Cette différence visuelle extrême est une adaptation évolutive liée au système d'accouplement de l'espèce dans la nature. Les femelles Éclectus sont hautement polygames — elles peuvent défendre un nid contre d'autres femelles tout en recevant la visite de plusieurs mâles différents. Les mâles, plus nombreux, sont en compétition pour les faveurs des femelles. La couleur distinctive de chaque sexe permet une reconnaissance immédiate à distance dans les forêts denses.</p>
  <h2>Tempérament — Le Plus Serein des Grands Psittacidés</h2>
  <p>Si l'Éclectus se distingue visuellement par son dimorphisme, il se distingue aussi comportementalement par son tempérament. Comparé aux Aras explosifs, aux Cacatoès émotionnellement intenses et aux Amazones passionnées, l'Éclectus est le contemplatif — observateur, calme, réfléchi. Il n'est pas passif pour autant : son intelligence est élevée et s'exprime différemment, par l'observation, la manipulation précise de ses jouets et des comportements élaborés de résolution de problèmes.</p>
  <p>Il existe une différence notable entre les sexes :</p>
  <ul>
    <li><strong>Le mâle</strong> est généralement plus sociable et affectueux avec l'ensemble de la famille. Il recherche activement les interactions et distribue ses faveurs plus équitablement entre les différents membres du foyer.</li>
    <li><strong>La femelle</strong> est plus indépendante et développe souvent une préférence marquée pour une seule personne. Elle peut être territoriale vis-à-vis de sa cage et parfois moins tolérante envers les étrangers.</li>
  </ul>
  <h2>L'Alimentation Spécifique — Le Principal Défi</h2>
  <p>L'alimentation de l'Éclectus est, sans conteste, ce qui le distingue le plus des autres psittacidés dans les pratiques quotidiennes. Son système digestif, adapté à une diète naturelle basée sur les fruits mûrs dans les forêts tropicales de Mélanésie, répond différemment des autres espèces aux nutriments courants en captivité.</p>
  <p>La règle d'or est simple : <strong>70 à 80% de fruits et légumes frais</strong>, le reste en pellets naturels certifiés sans additifs.</p>
  <p>Les fruits et légumes recommandés disponibles en France :</p>
  <ul>
    <li><strong>Fruits :</strong> Mangue, papaye, figue, grenade, kiwi, raisin (sans pépins), pomme (sans pépins), poire, fruits rouges (myrtille, framboise, mûre)</li>
    <li><strong>Légumes :</strong> Poivron rouge et jaune (très recommandés), brocoli, carotte, épinard, courgette, maïs frais, courge</li>
    <li><strong>Légumineuses cuites :</strong> Lentilles, pois chiches, haricots — excellentes sources de protéines</li>
  </ul>
  <p>Ce que vous devez éviter à tout prix :</p>
  <ul>
    <li>Pellets contenant des colorants artificiels (E102, E110, E129, etc.)</li>
    <li>Vitamines synthétiques en poudre ou en gouttes</li>
    <li>Suppléments de vitamine D3 en excès</li>
    <li>Cacahuètes et noix de cajou (susceptibles de contenir des toxines)</li>
  </ul>
  <h2>L'Éclectus en Appartement Parisien — Une Excellente Option</h2>
  <p>L'Éclectus est, parmi les grands psittacidés, l'un des mieux adaptés à la vie en appartement urbain en France. Son niveau sonore modéré — nettement inférieur à celui d'un Ara ou d'un Cacatoès — ses vocalisations douces et musicales et son tempérament calme en font une espèce qui peut coexister avec des voisins dans un immeuble haussmannien sans créer de nuisances sonores insupportables.</p>
`,
},

{slug:'preparer-maison-perroquet',title:'Comment Préparer sa Maison pour un Perroquet | Guide France',metaDesc:'Comment préparer sa maison pour accueillir un perroquet en France ? Checklist de sécurité, emplacement de la cage, plantes toxiques et premiers jours. Guide pratique.',
h1:'Comment Préparer sa Maison pour un Perroquet',badge:'🏠 GUIDE DE PRÉPARATION · FRANCE',readTime:7,
img:'loro-amazonico-01.webp',imgAlt:'Espace intérieur français bien aménagé pour accueillir un perroquet — cage bien positionnée, jouets, eau fraîche',caption:'Une maison bien préparée garantit une adaptation sereine du perroquet à son nouveau foyer',
ctaTitle:'Votre Maison est Prête ?',ctaText:'Paraíso de Aves livre vos perroquets dans toute la France avec des instructions d\'accueil détaillées incluses dans chaque livraison.',
related:[{slug:'quel-perroquet-choisir',label:'Quel Perroquet Choisir?'},{slug:'alimentation-perroquets',label:'Alimentation'},{slug:'meilleurs-perroquets-debutants',label:'Pour Débutants'},{slug:'combien-vit-perroquet',label:'Durée de Vie'}],
faqs:[
  {q:'Quelles sont les plantes d\'intérieur toxiques pour les perroquets en France ?',a:'Le Spathiphyllum (fleur de lune), la Dieffenbachia, l\'Azalée, l\'Oléandre, le Lierre, le Pothos et la Ficus sont parmi les plantes les plus courantes en France et les plus toxiques pour les perroquets. Déplacez-les dans des pièces sans accès à l\'oiseau.'},
  {q:'Le téflon est-il vraiment dangereux pour les perroquets ?',a:'Extrêmement dangereux. Les vapeurs de PTFE (téflon) chauffé au-delà de 260°C sont mortelles pour les oiseaux en quelques minutes. C\'est la première cause de mortalité domestique soudaine chez les perroquets. Remplacez immédiatement toutes vos poêles et casseroles antiadhésives par des alternatives en inox, céramique ou fonte.'},
  {q:'Où placer la cage du perroquet dans un appartement parisien ?',a:'Dans la pièce principale où la famille passe le plus de temps, contre un mur (pour que l\'oiseau se sente protégé), sans courant d\'air direct, loin de la cuisine et pas en plein soleil direct. La salle à manger ou le salon sont généralement les meilleurs emplacements.'},
  {q:'Un chat et un perroquet peuvent-ils cohabiter en France ?',a:'Avec surveillance permanente et séparation physique quand vous n\'êtes pas présent. Le risque n\'est pas seulement l\'attaque directe — la salive et les griffes de chat peuvent provoquer des infections graves chez un perroquet même sans blessure visible.'},
  {q:'Combien de temps dure la période d\'adaptation d\'un perroquet ?',a:'Variable selon l\'espèce et l\'individu — de quelques jours à quelques mois. Le Gris du Gabon peut prendre plusieurs semaines avant de retrouver son appétit et son niveau d\'activité normal. L\'Amazone s\'adapte généralement plus vite.'},
],
bodyHTML:`
  <p>La préparation de votre maison avant l'arrivée d'un perroquet est aussi importante que le choix de l'espèce. Un environnement mal préparé peut mettre en danger la vie de votre oiseau dès les premiers jours — et certains risques sont totalement inattendus pour les novices. Ce guide vous présente tout ce que vous devez faire avant que votre futur compagnon franchisse la porte.</p>
  <h2>La Checklist de Sécurité — Les Risques Mortels</h2>
  <h3>1. Remplacer les Revêtements en Téflon</h3>
  <p>C'est la priorité absolue, et sans exception. Les vapeurs de PTFE (polytétrafluoroéthylène, connu sous la marque Téflon) libérées par les poêles, casseroles, grils et même certains fours chauffés au-delà de 260°C sont mortelles pour les oiseaux en quelques minutes. Le mécanisme est une nécrose pulmonaire aiguë — l'oiseau peut sembler parfaitement bien et mourir subitement.</p>
  <p>Remplacez tous vos ustensiles antiadhésifs par des alternatives sûres : inox, fonte, céramique (vérifiez l'absence de PTFE dans la composition). Cela inclut aussi les grille-pain, les appareils à raclette, les moules à gâteau antiadhésifs et certains fers à repasser.</p>
  <h3>2. Identifier et Déplacer les Plantes Toxiques</h3>
  <p>Beaucoup des plantes d'intérieur les plus populaires en France sont potentiellement toxiques pour les perroquets. Les voici par ordre de dangerosité :</p>
  <ul>
    <li><strong>Pothos (Epipremnum aureum) :</strong> Très courant, très toxique</li>
    <li><strong>Spathiphyllum (Fleur de lune) :</strong> Toxique — irritant grave</li>
    <li><strong>Dieffenbachia :</strong> Toxique — cause des brûlures graves de la muqueuse buccale</li>
    <li><strong>Ficus benjamina :</strong> Toxique — latex irritant</li>
    <li><strong>Oléandre :</strong> Extrêmement toxique — cardiotoxique</li>
    <li><strong>Azalée, Rhododendron :</strong> Toxique — cardiotoxique</li>
    <li><strong>Lierres (Hedera) :</strong> Toxiques</li>
  </ul>
  <p>Déplacez ces plantes dans des pièces sans accès au perroquet, ou donnez-les à des amis ou voisins.</p>
  <h3>3. Protéger les Fenêtres et Portes</h3>
  <p>Un perroquet effrayé peut s'envoler par une fenêtre ouverte en une fraction de seconde. Installez des grilles de protection ou des moustiquaires sur toutes les fenêtres susceptibles d'être ouvertes pendant la saison chaude. Établissez une règle familiale : toujours vérifier que le perroquet est dans sa cage avant d'ouvrir fenêtres ou portes.</p>
  <h3>4. Autres Risques à Éliminer</h3>
  <ul>
    <li><strong>Bougies et diffuseurs d'huiles essentielles :</strong> Les vapeurs concentrées peuvent être toxiques. Utilisez-les uniquement dans des pièces sans accès au perroquet.</li>
    <li><strong>Encens :</strong> La fumée d'encens irrite les voies respiratoires des oiseaux. Évitez en présence du perroquet.</li>
    <li><strong>Produits ménagers aérosols :</strong> Stockez-les et utilisez-les dans des pièces sans accès, jamais en présence de l'oiseau.</li>
    <li><strong>Miroirs à hauteur de vol :</strong> Un oiseau en vol libre peut se cogner violemment contre un miroir. Signalez-les avec des éléments visuels distinctifs.</li>
  </ul>
  <h2>L'Emplacement Idéal de la Cage</h2>
  <p>La position de la cage influence directement le bien-être de votre perroquet. Les principes essentiels :</p>
  <ul>
    <li><strong>Pièce principale de vie :</strong> Le salon ou la salle à manger, là où la famille passe le plus de temps — le perroquet veut faire partie de la vie de la maison</li>
    <li><strong>Adossée à un mur :</strong> Jamais au centre de la pièce — les perroquets se sentent plus en sécurité avec un mur protégeant un côté</li>
    <li><strong>Pas près de la cuisine :</strong> Vapeurs de cuisson, fumées et changements brusques de température sont dangereux</li>
    <li><strong>Pas en plein soleil direct :</strong> Quelques heures de lumière naturelle quotidienne sont bénéfiques, mais une exposition directe intense peut provoquer un coup de chaleur</li>
    <li><strong>Pas près des courants d'air :</strong> Loin des bouches de ventilation, des portes et fenêtres fréquemment ouvertes</li>
  </ul>
  <h2>Les Premiers Jours — La Patience Avant Tout</h2>
  <p>Quelle que soit l'espèce, le changement d'environnement est une source de stress. Durant les premiers jours :</p>
  <ul>
    <li>Laissez l'oiseau explorer la cage à son propre rythme — ne forcez pas les interactions</li>
    <li>Parlez-lui avec calme depuis une distance respectueuse — votre voix devient un son familier rassurant</li>
    <li>Maintenez une routine quotidienne stable</li>
    <li>Évitez d'inviter des inconnus pendant la première semaine</li>
    <li>Consultez un vétérinaire aviaire si l'appétit ne revient pas normalement après 48h</li>
  </ul>
`,
},

{slug:'alimentation-perroquets',title:'Alimentation des Perroquets : Guide Complet France 2026',metaDesc:'Guide complet de l\'alimentation des perroquets en France. Fruits, légumes, pellets, aliments toxiques à éviter. Par espèce, pour chaque saison.',
h1:'Alimentation des Perroquets : Guide Complet pour la France',badge:'🥗 GUIDE ALIMENTATION · FRANCE 2026',readTime:8,
img:'loro-amazonico-02.webp',imgAlt:'Perroquet amazone mangeant un poivron rouge frais — alimentation saine et naturelle pour psittacidés',caption:'Le poivron rouge est l\'un des aliments les plus nutritifs et les plus appréciés par tous les perroquets',
ctaTitle:'Besoin de Conseils Alimentaires ?',ctaText:'Paraíso de Aves fournit des instructions d\'alimentation personnalisées avec chaque livraison. Contactez-nous pour toute question.',
related:[{slug:'quel-perroquet-choisir',label:'Quel Perroquet Choisir?'},{slug:'preparer-maison-perroquet',label:'Préparer sa Maison'},{slug:'meilleurs-perroquets-debutants',label:'Pour Débutants'},{slug:'combien-vit-perroquet',label:'Durée de Vie'}],
faqs:[
  {q:'Les perroquets peuvent-ils manger des pépins de pomme ?',a:'Non — les pépins de pomme (comme ceux de poire, pêche et cerise) contiennent de l\'amygdaline, un composé cyanogène qui se transforme en cyanure dans l\'organisme. Offrez toujours les pommes et poires sans pépins.'},
  {q:'L\'avocat est-il vraiment dangereux pour les perroquets ?',a:'Oui — extrêmement dangereux. L\'avocat contient de la persine, une substance cardiotoxique pour les oiseaux. Même en petite quantité, l\'avocat peut provoquer la mort. Ne laissez jamais d\'avocat à portée de votre perroquet.'},
  {q:'Les pellets sont-ils vraiment meilleurs que les graines ?',a:'Dans la grande majorité des cas, oui. Les granulés de qualité sont formulés pour fournir tous les nutriments essentiels de façon équilibrée. Un régime basé sur les graines est souvent déficient en vitamines A, calcium et protéines. Les graines peuvent rester comme friandises (10-15% maximum de la diète).'},
  {q:'Peut-on donner du pain à son perroquet ?',a:'Occasionnellement, en très petite quantité. Préférez le pain complet sans sel. Le pain n\'a pas de valeur nutritionnelle significative pour les perroquets et les additifs des pains industriels peuvent être néfastes.'},
  {q:'L\'eau du robinet est-elle sûre pour les perroquets en France ?',a:'En général, oui — l\'eau du robinet française est potable. Certains perroquets sont sensibles au chlore ; si votre oiseau semble rejeter l\'eau du robinet, laissez-la reposer quelques heures à l\'air libre avant de la servir, ou utilisez de l\'eau filtrée.'},
],
bodyHTML:`
  <p>L'alimentation est le pilier fondamental de la santé et de la longévité d'un perroquet. Une alimentation inadaptée — basée exclusivement sur des graines, comme c'est encore trop souvent le cas — est la cause principale des maladies chroniques chez les psittacidés de compagnie en France. Ce guide vous présente les principes d'une alimentation optimale et adaptée à chaque espèce.</p>
  <h2>Les 4 Catégories Alimentaires pour Perroquets</h2>
  <h3>1. Les Granulés (Pellets) — La Base Nutritionnelle</h3>
  <p>Les granulés spécifiques psittacidés sont des aliments formulés pour couvrir l'ensemble des besoins nutritionnels de votre oiseau. Ils doivent constituer <strong>50 à 70% de la diète</strong> pour la plupart des espèces (à l'exception de l'Éclectus, voir ci-dessous).</p>
  <p>Marques disponibles et recommandées en France :</p>
  <ul>
    <li><strong>Harrison's Bird Foods</strong> (importé, disponible en ligne et dans les cliniques vétérinaires spécialisées) — référence absolue, sans additifs artificiels</li>
    <li><strong>Roudybush</strong> — bonne alternative, disponible en ligne en France</li>
    <li><strong>Zupreem Natural</strong> — attention : évitez les versions avec "Fruit Blend" (colorants artificiels) — choisissez la version "Natural"</li>
    <li><strong>Versele-Laga Nutribird</strong> — disponible en animaleries françaises, bonne qualité</li>
  </ul>
  <h3>2. Les Fruits Frais — Vitamines et Antioxydants</h3>
  <p>Les fruits frais doivent représenter <strong>15 à 25% de la diète</strong>. En France, nous avons accès à une excellente variété de fruits selon les saisons :</p>
  <ul>
    <li><strong>Grenade :</strong> Riche en antioxydants — les perroquets adorent extraire les graines. Disponible d'octobre à février.</li>
    <li><strong>Mangue :</strong> Excellente source de bêtacarotène (vitamine A). Disponible toute l'année en France.</li>
    <li><strong>Pomme (sans pépins !) :</strong> Bien tolérée, riche en pectine. Disponible toute l'année.</li>
    <li><strong>Raisin (sans pépins) :</strong> Riche en antioxydants. Disponible de juillet à novembre.</li>
    <li><strong>Kiwi :</strong> Riche en vitamine C. Disponible en hiver.</li>
    <li><strong>Fruits des bois :</strong> Myrtille, framboise, mûre — excellentes sources d'antioxydants. Disponibles en été.</li>
    <li><strong>Figue fraîche :</strong> Très appréciée des perroquets. Disponible en été et automne en France.</li>
  </ul>
  <h3>3. Les Légumes Frais — Minéraux et Fibres</h3>
  <p>Les légumes doivent représenter <strong>15 à 20% de la diète</strong>. En France, les marchés et supermarchés offrent une excellente variété :</p>
  <ul>
    <li><strong>Poivron rouge et jaune :</strong> LA star des légumes pour perroquets. Exceptionnellement riche en vitamine A (bêtacarotène), vitamine C et antioxydants. Offrez-le entier — les perroquets adorent extraire les graines.</li>
    <li><strong>Brocoli :</strong> Riche en calcium, vitamine C et vitamine K. Très bien accepté par la plupart des espèces.</li>
    <li><strong>Carotte :</strong> Riche en bêtacarotène. Offrez-la crue pour la stimulation du bec.</li>
    <li><strong>Épinard :</strong> Riche en fer et vitamines. En quantité modérée (les oxalates peuvent interférer avec l'absorption du calcium en excès).</li>
    <li><strong>Maïs frais :</strong> Très apprécié — offrez en épi pour la stimulation.</li>
    <li><strong>Courgette :</strong> Légère et bien tolérée. Peut être offerte crue ou légèrement cuite à la vapeur.</li>
    <li><strong>Haricots verts frais :</strong> Bonne source de fibres et vitamines.</li>
  </ul>
  <h3>4. Graines, Noix et Protéines — Avec Modération</h3>
  <p>Les graines et noix doivent représenter <strong>au maximum 10 à 15% de la diète</strong>, dada leur forte teneur en graisses. Ce sont d'excellentes friandises pour le dressage et les interactions, mais ne doivent pas constituer la base de l'alimentation.</p>
  <ul>
    <li>Noix, amandes, noisettes : excellentes sources de graisses insaturées et vitamine E</li>
    <li>Graines de tournesol : très appréciées mais très caloriques — en petite quantité</li>
    <li>Œuf dur : excellente source de protéines, 2 à 3 fois par semaine</li>
    <li>Légumineuses cuites (pois chiches, lentilles, haricots) : bonne source de protéines végétales</li>
  </ul>
  <h2>Aliments Strictement Interdits</h2>
  <div class="highlight-box"><strong>⚠️ Ces aliments peuvent être mortels pour les perroquets :</strong></div>
  <ul>
    <li><strong>Avocat :</strong> Persine — cardiotoxique, potentiellement fatal même en petite quantité</li>
    <li><strong>Chocolat :</strong> Théobromine — toxique neurologique</li>
    <li><strong>Café, thé, boissons avec caféine :</strong> Stimulant cardiaque dangereux</li>
    <li><strong>Alcool :</strong> Même en quantité infime, intoxication grave</li>
    <li><strong>Oignon et ail en grande quantité :</strong> Les composés soufrés peuvent endommager les globules rouges</li>
    <li><strong>Sel :</strong> Les reins des oiseaux ne tolèrent pas le sel en quantité significative</li>
    <li><strong>Pépins de pomme, de poire, de pêche, de cerise :</strong> Composés cyanogènes</li>
    <li><strong>Produits laitiers en excès :</strong> Faible tolérance au lactose</li>
    <li><strong>Aliments transformés, chips, fast-food :</strong> Sel, graisses trans, additifs — à proscrire</li>
  </ul>
  <h2>L'Eau — Souvent Négligée</h2>
  <p>L'eau fraîche doit être disponible en permanence et renouvelée deux fois par jour minimum. Les perroquets introduisent fréquemment des morceaux de nourriture dans leur eau — rendant celle-ci impropre en quelques heures. Utilisez des abreuvoirs faciles à nettoyer et stérilisez-les régulièrement à l'eau bouillante.</p>
`,
},

{slug:'combien-vit-perroquet',title:'Combien de Temps Vit un Perroquet ? Espérance de Vie par Espèce',metaDesc:'Combien vit un perroquet ? Espérance de vie par espèce — Gris du Gabon, Aras, Cacatoès, Amazone et Éclectus. Ce qui influence la longévité et comment maximiser la vie de votre oiseau.',
h1:'Combien de Temps Vit un Perroquet ? Guide par Espèce',badge:'⏳ LONGÉVITÉ · GUIDE PAR ESPÈCE',readTime:7,
img:'loro-gris-02.webp',imgAlt:'Gris du Gabon adulte en pleine santé — l\'espèce avec la plus grande espérance de vie parmi les perroquets',caption:'Le Gris du Gabon peut vivre 50 à 70 ans — un engagement qui peut dépasser une vie humaine',
ctaTitle:'Prêt pour un Engagement de Vie ?',ctaText:'Paraíso de Aves vous aide à choisir l\'espèce adaptée à votre situation et vous accompagne pendant toute la vie de l\'oiseau.',
related:[{slug:'quel-perroquet-choisir',label:'Quel Perroquet Choisir?'},{slug:'prix-perroquet-france',label:'Prix en France'},{slug:'alimentation-perroquets',label:'Alimentation'},{slug:'meilleurs-perroquets-debutants',label:'Pour Débutants'}],
faqs:[
  {q:'Quel est le perroquet qui vit le plus longtemps ?',a:'Le Gris du Gabon et les grandes Amazones ont les records documentés les plus élevés — avec des individus dépassant 70 ans. Les grands Aras peuvent aussi vivre 50 à 60 ans. Les Cacatoès 40 à 60 ans.'},
  {q:'Un perroquet de compagnie vit-il plus longtemps qu\'un perroquet sauvage ?',a:'En captivité avec de bons soins, oui. L\'absence de prédateurs, l\'accès à une alimentation régulière et les soins vétérinaires permettent aux oiseaux de compagnie de dépasser largement l\'espérance de vie sauvage.'},
  {q:'Que faire si votre perroquet vous survit ?',a:'Désignez un tuteur de confiance dans votre entourage et formalisez cet arrangement (testament, lettre d\'intention). Un perroquet qui perd son tuteur principal peut vivre un deuil véritable — un tuteur de remplacement bien connu de l\'oiseau de son vivant facilite considérablement la transition.'},
  {q:'L\'alimentation influence-t-elle vraiment la durée de vie ?',a:'Considérablement. Une alimentation basée sur des graines (régime souvent carencé) est l\'une des causes principales de maladies chroniques et de mort prématurée chez les perroquets de compagnie. Une alimentation équilibrée peut facilement ajouter 10 à 20 ans à la vie d\'un oiseau.'},
  {q:'Un Cacatoès peut-il vraiment vivre plus de 60 ans ?',a:'Oui — des cas documentés dépassant les 70 ans existent pour le Cacatoès à Huppe Jaune dans des conditions de soins exceptionnelles. Les exemples les plus connus sont des individus en collections zoologiques ou chez des éleveurs très expérimentés.'},
],
bodyHTML:`
  <p>La question de la durée de vie d'un perroquet est l'une des plus importantes — et l'une des plus sous-estimées — que tout futur propriétaire devrait poser. Pour beaucoup d'espèces de psittacidés, adopter un perroquet est un engagement qui peut s'étendre sur plusieurs décennies. Dans certains cas, l'oiseau peut vous survivre.</p>
  <h2>Espérance de Vie par Espèce</h2>
  <h3>Très Longue Durée de Vie (40+ ans)</h3>
  <ul>
    <li><strong>Gris du Gabon :</strong> 50–70 ans. Le record documenté dépasse 80 ans. C'est l'espèce longévive la plus commune en France.</li>
    <li><strong>Ara Hyacinthe :</strong> 50–60 ans. Certains spécimens en aviaires zoologiques ont dépassé 70 ans.</li>
    <li><strong>Ara Bleu et Jaune :</strong> 50–60 ans. L'une des araras les plus longévives en captivité.</li>
    <li><strong>Ara Macao :</strong> 40–50 ans. Potentiellement jusqu'à 60 ans dans des conditions exceptionnelles.</li>
    <li><strong>Cacatoès à Huppe Jaune :</strong> 40–60 ans. Des cas documentés de plus de 70 ans existent.</li>
    <li><strong>Amazone à Front Bleu :</strong> 40–70 ans. L'une des Amazones les plus longévives — comparable au Gris du Gabon.</li>
  </ul>
  <h3>Durée de Vie Moyenne (20–40 ans)</h3>
  <ul>
    <li><strong>Éclectus :</strong> 30–50 ans. Avec la diète spécifique correcte, peut atteindre la fourchette haute.</li>
    <li><strong>Cacatoès Rosalbin :</strong> 25–40 ans.</li>
    <li><strong>Grande Conure (Aratinga) :</strong> 20–30 ans.</li>
  </ul>
  <h3>Durée de Vie Plus Courte (10–20 ans)</h3>
  <ul>
    <li><strong>Petite Conure (Pyrrhura) :</strong> 15–25 ans.</li>
    <li><strong>Perruche ondulée :</strong> 10–15 ans avec de bons soins.</li>
  </ul>
  <h2>Les Facteurs qui Déterminent la Longévité</h2>
  <h3>1. L'Alimentation — Le Facteur le Plus Influent</h3>
  <p>Une diète équilibrée est, de loin, le facteur avec l'impact le plus important sur la longévité. Les perroquets nourris exclusivement aux graines ont une espérance de vie significativement réduite — les carences en vitamine A, en calcium et en protéines de qualité compromettent gravement la santé à long terme. Un oiseau bien nourri peut facilement vivre 10 à 20 ans de plus qu'un congénère mal alimenté.</p>
  <h3>2. L'Environnement et l'Espace</h3>
  <p>Un oiseau avec suffisamment d'espace pour exercer ses muscles, une stimulation mentale adéquate et un environnement stable et sans stress chronique vit significativement plus longtemps. Le stress chronique — causé par l'ennui, la solitude, le bruit excessif ou l'instabilité de l'environnement — est un facteur prouvé de réduction de l'espérance de vie.</p>
  <h3>3. Les Soins Vétérinaires</h3>
  <p>Des consultations vétérinaires annuelles chez un spécialiste en oiseaux exotiques, avec bilan sanguin préventif, permettent de détecter et traiter précocement des conditions qui, non traitées, réduisent significativement la durée de vie. En France, l'accès à des vétérinaires aviaires spécialisés s'est considérablement amélioré dans les grandes villes.</p>
  <h2>Les Implications pour les Propriétaires Français</h2>
  <p>Adopter un Gris du Gabon à 35 ans signifie statistiquement que l'oiseau vous survivra. Cette réalité, souvent ignorée par les nouveaux propriétaires enthousiasmes, mérite une planification sérieuse. Quelques questions à anticiper :</p>
  <ul>
    <li>Avez-vous désigné un tuteur de confiance pour votre oiseau en cas d'incapacité ou de décès ?</li>
    <li>Ce tuteur désigné connaît-il l'oiseau et accepte-t-il l'engagement ?</li>
    <li>L'oiseau est-il socialisé pour accepter d'autres personnes, ou est-il exclusivement lié à vous ?</li>
    <li>Avez-vous prévu un arrangement financier pour les soins futurs de l'oiseau ?</li>
  </ul>
  <p>Ces questions ne sont pas destinées à décourager l'adoption — elles sont destinées à s'assurer que l'engagement soit assumé pleinement et responsablement. La Paraíso de Aves encourage tous ses clients à réfléchir à ces aspects avant l'adoption et se tient disponible pour conseiller sur les meilleures pratiques.</p>
`,
},

];

/* ════════════════════════════════════════════════
   STRUCTURE PAGES
════════════════════════════════════════════════ */

function generatePerroquetsPage(){
  return `${frHead({title:'Perroquets à Vendre en France | Toutes les Espèces | Paraíso de Aves',metaDesc:'Toutes les espèces de perroquets disponibles avec documentation CITES : Gris du Gabon, Ara Hyacinthe, Ara Bleu et Jaune, Cacatoès et plus. Éleveur enregistré, livraison France.',canonical:'/fr/perroquets/',frPath:'/fr/perroquets/'})}
</head><body>${frNav('Perroquets')}
<section class="hero"><p class="badge">🦜 TOUTES NOS ESPÈCES · CITES OFFICIEL</p>
<h1>Nos Perroquets Disponibles</h1>
<p class="subtitle">Chaque espèce est élevée à la main depuis la naissance dans notre établissement enregistré à Llíria, Valence (Espagne), avec documentation CITES officielle et livraison dans toute la France.</p>
</section>
<div style="max-width:1200px;margin:56px auto;padding:0 5%;">
  <div class="species-grid" style="grid-template-columns:repeat(auto-fill,minmax(260px,1fr));">
    ${ALL_SPECIES_REL.map(s=>`<a href="${BASE}/fr/${s.slug}/" class="species-card" style="padding:24px;">
      <div class="icon" style="font-size:2.5rem;">${s.icon}</div><h4 style="font-size:1.1rem;">${s.name}</h4><span>${s.desc}</span>
    </a>`).join('')}
  </div>
  <div style="text-align:center;margin-top:40px;">
    <a href="${BASE}/fr/contact/" class="btn-gold">Vérifier la Disponibilité</a>
  </div>
</div>
${frFooter()}</body></html>`;
}

function generateContactPage(){
  return `${frHead({title:'Contact | Paraíso de Aves France',metaDesc:'Contactez Paraíso de Aves pour l\'adoption d\'un perroquet en France. Réponse sous 24h. Éleveur enregistré, CITES officiel.',canonical:'/fr/contact/',frPath:'/fr/contact/'})}
</head><body>${frNav('Contact')}
<section class="hero"><h1>Nous Contacter</h1><p class="subtitle">Notre équipe répond à toutes vos demandes sous 24 heures — en français.</p></section>
<div style="max-width:700px;margin:56px auto;padding:0 5%;">
  ${frContactForm('contact-principal')}
  <div style="margin-top:32px;background:var(--white);border:1px solid var(--border);border-radius:12px;padding:24px;">
    <h3 style="color:var(--primary);margin-bottom:12px;">📧 Contact Direct</h3>
    <p>E-mail : <a href="mailto:${EMAIL}" style="color:var(--gold);">${EMAIL}</a></p>
    <p style="margin-top:8px;color:var(--muted);font-size:.88rem;">Réponse garantie sous 24 heures ouvrées.</p>
  </div>
</div>
${frFooter()}</body></html>`;
}

function generateBlogIndex(){
  return `${frHead({title:'Blog Perroquets | Conseils, CITES, Espèces | Paraíso de Aves France',metaDesc:'Blog sur les perroquets en France — CITES, prix, choix d\'espèce, alimentation, préparation. Par l\'éleveur enregistré Paraíso de Aves.',canonical:'/fr/blog/',frPath:'/fr/blog/'})}
</head><body>${frNav('Blog')}
<section class="hero"><h1>Blog — Perroquets en France</h1>
<p class="subtitle">Conseils, guides pratiques et informations légales pour les propriétaires et futurs propriétaires de perroquets en France.</p>
</section>
<div style="max-width:1100px;margin:56px auto;padding:0 5%;">
  <div class="article-grid">
    ${blogArticles.map(a=>`<div class="article-card"><a href="${BASE}/fr/blog/${a.slug}/"><h3>${a.h1}</h3><p>${a.metaDesc.substring(0,110)}...</p></a></div>`).join('')}
  </div>
</div>
${frFooter()}</body></html>`;
}

function generateSimplePage(slug, title, h1, content){
  return `${frHead({title,metaDesc:title,canonical:`/fr/${slug}/`,frPath:`/fr/${slug}/`})}
</head><body>${frNav()}
<section class="hero"><h1>${h1}</h1></section>
<div style="max-width:900px;margin:56px auto;padding:0 5%;">${content}</div>
${frFooter()}</body></html>`;
}

/* ════════════════════════════════════════════════
   GENERATE ALL
════════════════════════════════════════════════ */

console.log('\n🇫🇷  Phase 5 — French Market Expansion\n');

let count = 0;

// Homepage
mkdirp('fr'); fs.writeFileSync('fr/index.html', generateHomepage(), 'utf8');
console.log('✓ fr/index.html'); count++;

// Perroquets hub
mkdirp('fr/perroquets'); fs.writeFileSync('fr/perroquets/index.html', generatePerroquetsPage(), 'utf8');
console.log('✓ fr/perroquets/index.html'); count++;

// Contact
mkdirp('fr/contact'); fs.writeFileSync('fr/contact/index.html', generateContactPage(), 'utf8');
console.log('✓ fr/contact/index.html'); count++;

// Blog index
mkdirp('fr/blog'); fs.writeFileSync('fr/blog/index.html', generateBlogIndex(), 'utf8');
console.log('✓ fr/blog/index.html'); count++;

// Simple structure pages
const simplePages = [
  ['a-propos','À Propos | Paraíso de Aves France','À Propos de Paraíso de Aves',
   `<h2>Notre Histoire</h2><p>Paraíso de Aves est un éleveur enregistré de perroquets exotiques basé à Llíria, Valence (Espagne). Avec plus de 25 ans d'expérience dans l'élevage de psittacidés, nous sommes l'un des établissements d'élevage les plus reconnus de la Péninsule Ibérique.</p>
   <h2>Notre Mission</h2><p>Proposer des perroquets sains, bien socialisés et légalement documentés à des familles françaises passionnées — avec toute la transparence et le suivi que mérite un engagement de vie.</p>
   <h2>Nos Engagements</h2><ul><li>Documentation CITES complète pour chaque oiseau</li><li>Oiseaux apprivoisés à la main depuis la naissance</li><li>Suivi post-adoption disponible en français</li><li>Livraison sécurisée dans toute la France</li></ul>
   <p>📧 <a href="mailto:${EMAIL}">${EMAIL}</a></p>`],
  ['livraison','Livraison en France | Paraíso de Aves','Livraison de Perroquets en France',
   `<h2>Délais de Livraison</h2><ul><li><strong>Paris et Île-de-France :</strong> 2–3 jours ouvrés</li><li><strong>Lyon, Marseille, Bordeaux, Toulouse :</strong> 2–3 jours ouvrés</li><li><strong>France entière :</strong> 2–5 jours ouvrés</li><li><strong>Corse :</strong> Sur devis (transport aérien)</li></ul>
   <h2>Comment ça Marche</h2><ol><li>Contactez-nous pour vérifier la disponibilité</li><li>Versement d'un acompte de réservation</li><li>Bilan vétérinaire et préparation des documents CITES</li><li>Envoi par transporteur spécialisé en animaux vivants</li><li>Livraison à domicile à votre adresse en France</li></ol>
   <h2>Conditions</h2><p>Nous n'expédions pas par temps de grande chaleur (>38°C) ou de grand froid (<0°C prévu pendant le trajet). La caisse IATA certifiée est incluse dans le prix de livraison.</p>`],
  ['garantie-sante','Garantie Santé | Paraíso de Aves France','Notre Garantie Santé',
   `<h2>Ce que comprend notre Garantie Santé</h2><p>Chaque oiseau livré est accompagné d'un certificat vétérinaire récent attestant son bon état de santé au moment de l'expédition. Nous garantissons que l'oiseau est libre de maladies contagieuses détectables au moment de l'examen.</p>
   <h2>En cas de Problème</h2><p>Si un problème de santé se manifeste dans les 72 heures suivant la livraison et est confirmé par un vétérinaire aviaire comme préexistant, contactez-nous immédiatement par e-mail à <a href="mailto:${EMAIL}">${EMAIL}</a> avec le rapport vétérinaire.</p>
   <h2>Ce qui n'est pas Couvert</h2><p>Les maladies développées après la livraison du fait du nouvel environnement ou de soins inadaptés ne sont pas couvertes par la garantie. C'est pourquoi nous vous conseillons de consulter un vétérinaire aviaire dans les 15 premiers jours.</p>`],
  ['processus-adoption','Processus d\'Adoption | Paraíso de Aves France','Notre Processus d\'Adoption',
   `<h2>Étape 1 — Contact Initial</h2><p>Envoyez-nous votre demande par <a href="/fr/contact/">formulaire</a> ou par e-mail en indiquant l'espèce souhaitée, votre région et votre expérience avec les oiseaux.</p>
   <h2>Étape 2 — Vérification de Disponibilité</h2><p>Nous répondons sous 24 heures avec les spécimens disponibles, leurs caractéristiques et les prix actualisés.</p>
   <h2>Étape 3 — Acompte de Réservation</h2><p>Un acompte garantit votre spécimen choisi pendant la période de préparation.</p>
   <h2>Étape 4 — Préparation</h2><p>Bilan vétérinaire complet, préparation de toute la documentation CITES, sélection de la caisse IATA adaptée.</p>
   <h2>Étape 5 — Livraison en France</h2><p>L'oiseau est livré directement à votre adresse par transporteur spécialisé en animaux vivants, avec suivi en temps réel.</p>
   <h2>Étape 6 — Suivi Post-Adoption</h2><p>Nous restons disponibles par e-mail pour toutes vos questions pendant toute la vie de l'oiseau.</p>`],
  ['faq','FAQ | Questions Fréquentes | Paraíso de Aves France','Questions Fréquentes',
   `<div class="faq-item"><div class="faq-q">Les documents CITES de votre élevage espagnol sont-ils valides en France ?</div><div class="faq-a">Oui. La CITES est une convention internationale et la documentation émise par un éleveur enregistré en Espagne est valide dans toute l'Union Européenne, dont la France. Elle est reconnue par les DREAL françaises.</div></div>
   <div class="faq-item"><div class="faq-q">Peut-on visiter l'élevage en Espagne avant d'acheter ?</div><div class="faq-a">Oui, sur rendez-vous. Notre établissement est à Llíria, Valence (Espagne). Nous proposons aussi des vidéoconférences pour découvrir les spécimens disponibles sans se déplacer.</div></div>
   <div class="faq-item"><div class="faq-q">Livrez-vous en Corse et dans les DOM-TOM ?</div><div class="faq-a">Pour la Corse, nous livrons par transport aérien — sur devis. Pour les DOM-TOM, les réglementations CITES sont plus complexes — contactez-nous pour discuter des options.</div></div>
   <div class="faq-item"><div class="faq-q">Quel est le délai de réponse à une demande ?</div><div class="faq-a">Nous répondons à toutes les demandes en français sous 24 heures ouvrées.</div></div>
   <div class="faq-item"><div class="faq-q">Proposez-vous des facilités de paiement ?</div><div class="faq-a">Contactez-nous pour discuter des options de paiement adaptées à votre situation.</div></div>`],
];

simplePages.forEach(([slug, title, h1, content]) => {
  mkdirp(`fr/${slug}`);
  fs.writeFileSync(`fr/${slug}/index.html`, generateSimplePage(slug, title, h1, content), 'utf8');
  console.log(`✓ fr/${slug}/index.html`); count++;
});
console.log('');

// Species pages
species.forEach(s => {
  mkdirp(`fr/${s.slug}`);
  fs.writeFileSync(`fr/${s.slug}/index.html`, generateSpeciesPage(s), 'utf8');
  console.log(`✓ fr/${s.slug}/index.html`); count++;
});
console.log('');

// City pages
cities.forEach(c => {
  mkdirp(`fr/${c.slug}`);
  fs.writeFileSync(`fr/${c.slug}/index.html`, generateCityPageFR(c), 'utf8');
  console.log(`✓ fr/${c.slug}/index.html`); count++;
});
console.log('');

// Blog articles
blogArticles.forEach(art => {
  mkdirp(`fr/blog/${art.slug}`);
  fs.writeFileSync(`fr/blog/${art.slug}/index.html`, generateBlogPageFR(art), 'utf8');
  console.log(`✓ fr/blog/${art.slug}/index.html`); count++;
});

console.log(`\n✅  Done! Generated ${count} French pages total`);
console.log(`   Structure: 9 pages (/, /perroquets, /contact, /blog, /a-propos, /livraison, /garantie-sante, /processus-adoption, /faq)`);
console.log(`   Species: ${species.length} pages`);
console.log(`   Cities: ${cities.length} pages`);
console.log(`   Blog: ${blogArticles.length} articles\n`);
