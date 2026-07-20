#!/usr/bin/env node
/**
 * generate-pt-conhecimento.js
 * Creates the /pt/conhecimento/ knowledge hub and 9 section pages in Portuguese.
 * Modelled on the ES /conocimiento/ structure.
 */

const fs   = require('fs');
const path = require('path');

const BASE  = 'https://www.paraisodeaves.com';
const GA    = 'G-4007YHH4H9';
const EMAIL = 'paraisodeloros@gmail.com';

function mkdirp(dir) { fs.mkdirSync(dir, { recursive: true }); }
function write(filePath, content) {
  mkdirp(path.dirname(filePath));
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✓', filePath);
}

// ─── Shared partials ──────────────────────────────────────────────────────────
function head({ title, desc, canonical, faqs = [] }) {
  const faqSchema = faqs.length ? `,
    {
      "@type": "FAQPage",
      "mainEntity": [
${faqs.map(f => `        {
          "@type": "Question",
          "name": ${JSON.stringify(f.q)},
          "acceptedAnswer": {"@type": "Answer", "text": ${JSON.stringify(f.a)}}
        }`).join(',\n')}
      ]
    }` : '';

  return `<!DOCTYPE html>
<html lang="pt-PT">
<head>
  <meta charset="UTF-8">
  <link rel="manifest" href="/site.webmanifest"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${desc}">
  <meta name="robots" content="index,follow">
  <link rel="canonical" href="${BASE}${canonical}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${desc}">
  <meta property="og:url" content="${BASE}${canonical}">
  <meta property="og:type" content="website">
  <link rel="alternate" hreflang="es" href="${BASE}${canonical.replace('/pt/conhecimento', '/conocimiento')}">
  <link rel="alternate" hreflang="pt-PT" href="${BASE}${canonical}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&family=Playfair+Display:wght@400;600;700;800;900&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
  <script async src="https://www.googletagmanager.com/gtag/js?id=${GA}"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA}');</script>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3219055968593295" crossorigin="anonymous"></script>
  <script type="application/ld+json">{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "${BASE}${canonical}",
      "url": "${BASE}${canonical}",
      "name": ${JSON.stringify(title)},
      "description": ${JSON.stringify(desc)},
      "inLanguage": "pt-PT",
      "publisher": {
        "@type": "Organization",
        "@id": "${BASE}/#org",
        "name": "paraisodeaves"
      }
    }${faqSchema}
  ]
}</script>
  ${css()}
</head>
<body>`;
}

function css() {
  return `<style>
  :root{--primary:#1B3D2F;--secondary:#2B533C;--gold:#C9A24B;--gold-rich:#D4A94F;--gold-hover:#A8873A;--bg:#F8F5ED;--surface:#FFFFFF;--border:#E7E0D2;--text:#2B2B2B;--muted:#5C5C5C}
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:'Open Sans',Arial,sans-serif;background:var(--bg);color:var(--text);line-height:1.8}
  h1,h2,h3,h4{font-family:'Playfair Display',Georgia,serif}
  a{color:var(--primary);text-decoration:none}a:hover{color:var(--gold-hover);text-decoration:underline}
  .topnav{position:sticky;top:0;z-index:50;background:var(--primary);border-bottom:2px solid var(--gold);padding:14px 5%;display:flex;align-items:center;justify-content:space-between}
  .topnav__brand img{height:52px;width:auto;display:block}
  .topnav__links{display:flex;gap:1.4rem;align-items:center;list-style:none}
  .topnav__links a{color:rgba(255,255,255,.9);font-weight:600;font-size:.9rem;transition:color .2s;text-decoration:none}
  .topnav__links a:hover,.topnav__links a.active{color:var(--gold)}
  .breadcrumb{background:var(--surface);border-bottom:1px solid var(--border);padding:12px 5%;font-size:.83rem;color:var(--muted)}
  .breadcrumb a{color:var(--primary)}
  .kc-hero{background:linear-gradient(135deg,var(--primary),var(--secondary));padding:56px 5% 48px;text-align:center;color:#fff}
  .kc-hero h1{font-size:2.2rem;font-weight:900;color:#fff;margin-bottom:14px}
  .kc-hero p{font-size:1.05rem;color:rgba(255,255,255,.82);max-width:640px;margin:0 auto 24px}
  .kc-badge{display:inline-block;background:rgba(201,162,75,.2);border:1px solid var(--gold);color:var(--gold);font-size:.78rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:4px 14px;border-radius:999px;margin-bottom:18px}
  .content{max-width:860px;margin:0 auto;padding:48px 5% 24px}
  .content h2{font-size:1.45rem;font-weight:800;color:var(--primary);margin:2.2rem 0 .85rem;padding-bottom:.45rem;border-bottom:2px solid var(--gold)}
  .content h3{font-size:1.1rem;font-weight:700;color:var(--secondary);margin:1.5rem 0 .5rem}
  .content p{margin-bottom:1.05rem;font-size:.98rem;color:var(--text);line-height:1.82}
  .content ul,.content ol{padding-left:22px;margin-bottom:1.1rem}
  .content li{margin:7px 0;font-size:.97rem;line-height:1.75}
  .content strong{color:var(--primary)}
  .callout{background:rgba(201,162,75,.08);border-left:4px solid var(--gold);border-radius:0 12px 12px 0;padding:16px 20px;margin:1.6rem 0}
  .callout p{margin-bottom:0}
  .cta-band{background:linear-gradient(135deg,var(--primary),var(--secondary));padding:44px 5%;text-align:center;color:#fff}
  .cta-band h2{font-size:1.5rem;color:#fff;margin-bottom:10px}
  .cta-band p{opacity:.9;margin-bottom:22px;font-size:.98rem}
  .cta-band a{display:inline-block;background:var(--gold);color:#fff;font-weight:700;padding:13px 32px;border-radius:10px;font-size:.97rem;transition:background .2s;text-decoration:none}
  .cta-band a:hover{background:#B8933E;color:#fff}
  .cat-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:18px;margin:2rem 0}
  .cat-card{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:24px;transition:box-shadow .2s,transform .2s}
  .cat-card:hover{box-shadow:0 8px 24px rgba(0,0,0,.1);transform:translateY(-2px)}
  .cat-card h3{font-size:1rem;font-weight:800;color:var(--primary);margin-bottom:8px}
  .cat-card p{font-size:.86rem;color:var(--muted);margin:0}
  .cat-card a{text-decoration:none;color:inherit}
  .cat-card a:hover h3{color:var(--gold-hover)}
  .faq{margin:2rem 0}
  .faq details{background:var(--surface);border:1px solid var(--border);border-radius:12px;margin-bottom:10px}
  .faq summary{font-weight:700;color:var(--primary);padding:15px 20px;cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center;font-family:'Playfair Display',Georgia,serif;font-size:.96rem}
  .faq summary::-webkit-details-marker{display:none}
  .faq summary::after{content:'▸';transition:transform .2s;color:var(--gold);font-size:.85rem}
  .faq details[open] summary::after{transform:rotate(90deg)}
  .faq-body{padding:0 20px 16px;font-size:.93rem;color:var(--muted);line-height:1.75}
  .site-footer{background:var(--primary);color:rgba(255,255,255,.8);padding:48px 5% 24px}
  .footer-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:28px;margin-bottom:28px}
  .footer-brand{color:#fff}
  .footer-brand strong{font-family:'Playfair Display',Georgia,serif;font-size:1.05rem;display:block;margin-bottom:10px}
  .footer-col strong{display:block;color:#fff;font-family:'Playfair Display',Georgia,serif;margin-bottom:12px;font-size:.88rem;text-transform:uppercase;letter-spacing:.05em}
  .footer-col a{display:block;color:rgba(255,255,255,.72);font-size:.84rem;margin-bottom:7px;transition:color .2s;text-decoration:none}
  .footer-col a:hover{color:var(--gold)}
  .footer-copy{max-width:1100px;margin:0 auto;text-align:center;font-size:.78rem;opacity:.55;padding-top:20px;border-top:1px solid rgba(255,255,255,.12)}
  @media(max-width:700px){.footer-inner{grid-template-columns:1fr 1fr}.cat-grid{grid-template-columns:1fr}.kc-hero h1{font-size:1.65rem}.topnav__links{display:none}}
</style>`;
}

function nav(activeSlug = '') {
  return `
<nav class="topnav" aria-label="Navegação principal">
  <a class="topnav__brand" href="/pt/"><img src="/images/logo/paraiso-de-aves-logo-light.png" alt="Paraíso de Aves" width="110" height="55" loading="eager" style="height:52px;width:auto;display:block"></a>
  <ul class="topnav__links">
    <li><a href="/pt/papagaios-a-venda-portugal/">Adoção</a></li>
    <li><a href="/pt/conhecimento/" class="${activeSlug === '' ? 'active' : ''}">Conhecimento</a></li>
    <li><a href="/pt/blog/">Blog</a></li>
    <li><a href="/pt/contacto/">Contacto</a></li>
    <li><a href="/conocimiento/" hreflang="es" style="color:rgba(255,255,255,.55);font-size:.82rem">ES</a></li>
  </ul>
</nav>`;
}

function footer() {
  return `
<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-brand">
      <img src="/images/logo/paraiso-de-aves-logo-light.png" alt="Paraíso de Aves" width="110" height="55" loading="lazy" style="height:48px;width:auto;display:block;margin-bottom:10px">
      Criador registado · Llíria, Valência, Espanha<br>
      <a href="mailto:${EMAIL}">${EMAIL}</a>
    </div>
    <div class="footer-col">
      <strong>Conhecimento</strong>
      <a href="/pt/conhecimento/">Centro de Conhecimento</a>
      <a href="/pt/conhecimento/nutricao/">Nutrição</a>
      <a href="/pt/conhecimento/saude/">Saúde</a>
      <a href="/pt/conhecimento/comportamento/">Comportamento</a>
      <a href="/pt/conhecimento/adestramento/">Adestramento</a>
    </div>
    <div class="footer-col">
      <strong>Comprar</strong>
      <a href="/pt/papagaios-a-venda-portugal/">Portugal</a>
      <a href="/pt/cidades/papagaios-lisboa/">Lisboa</a>
      <a href="/pt/cidades/papagaios-porto/">Porto</a>
      <a href="/pt/conhecimento/comprar/">Guia de Compra</a>
    </div>
    <div class="footer-col">
      <strong>Informação</strong>
      <a href="/pt/conhecimento/documentacao-cites/">CITES e Legalidade</a>
      <a href="/pt/conhecimento/instalacoes/">Instalações</a>
      <a href="/pt/conhecimento/guias-iniciantes/">Guia para Iniciantes</a>
      <a href="/pt/contacto/">Contacto</a>
    </div>
  </div>
  <p class="footer-copy">© 2026 Paraíso de Aves · Criador legal · CITES certificado</p>
</footer>
</body>
</html>`;
}

// ─── PAGES ────────────────────────────────────────────────────────────────────

// ── 1. Hub / Index ────────────────────────────────────────────────────────────
const SECTIONS = [
  { slug: 'comprar',            emoji: '🛒', title: 'Como Comprar um Papagaio',    desc: 'Onde comprar, o que perguntar ao criador, documentação e lista de verificação.' },
  { slug: 'documentacao-cites', emoji: '📄', title: 'Documentação CITES',          desc: 'Apêndices CITES, CITES Portugal, como verificar a legalidade da ave.' },
  { slug: 'saude',              emoji: '🏥', title: 'Saúde Aviária',                desc: 'Doenças comuns, sinais de alerta, veterinários especializados e medicina preventiva.' },
  { slug: 'nutricao',           emoji: '🥦', title: 'Nutrição',                    desc: 'Dieta equilibrada, alimentos proibidos, pellets, frutas e verduras recomendadas.' },
  { slug: 'comportamento',      emoji: '🧠', title: 'Comportamento',               desc: 'Linguagem corporal, socialização, mordidelas e como interpretar o seu papagaio.' },
  { slug: 'adestramento',       emoji: '🎓', title: 'Adestramento',                desc: 'Técnicas de reforço positivo, treino de trucos e construção de confiança.' },
  { slug: 'instalacoes',        emoji: '🏠', title: 'Instalações e Gaiolas',       desc: 'Tamanho de gaiola, poleiros, brinquedos e preparação do espaço em casa.' },
  { slug: 'acessorios',         emoji: '🧰', title: 'Acessórios',                  desc: 'Comedouros, bebedouros, brinquedos, poleiros e transporte para papagaios.' },
  { slug: 'guias-iniciantes',   emoji: '🌱', title: 'Guia para Iniciantes',        desc: 'Tudo o que precisa de saber antes de adoptar o seu primeiro papagaio.' },
];

function hubPage() {
  return `${head({
    title: 'Centro de Conhecimento sobre Papagaios | paraisodeaves',
    desc: 'A maior enciclopédia de papagaios em português. Guias especializadas sobre nutrição, saúde, comportamento, CITES, adestramento e compra.',
    canonical: '/pt/conhecimento/',
  })}
${nav()}
<div class="breadcrumb">
  <a href="/pt/">Início</a> › <strong>Centro de Conhecimento</strong>
</div>
<div class="kc-hero">
  <span class="kc-badge">📚 9 categorias · 25+ anos de experiência</span>
  <h1>Centro de Conhecimento sobre Papagaios</h1>
  <p>Guias especializadas escritas por criadores com 25+ anos de experiência. Nutrição, saúde, comportamento, CITES, adestramento e muito mais.</p>
</div>
<div class="content">
  <h2>Todas as Categorias</h2>
  <div class="cat-grid">
${SECTIONS.map(s => `    <div class="cat-card">
      <a href="/pt/conhecimento/${s.slug}/">
        <h3>${s.emoji} ${s.title}</h3>
        <p>${s.desc}</p>
      </a>
    </div>`).join('\n')}
  </div>

  <h2>Porquê Consultar o Nosso Centro de Conhecimento?</h2>
  <p>Somos um criador registado com mais de 25 anos de experiência na criação de papagaios exóticos. Toda a informação deste centro é baseada na nossa experiência directa com centenas de aves e nas mais recentes investigações em medicina aviária e comportamento animal.</p>
  <p>Ao contrário de artigos genéricos, as nossas guias focam-se nas realidades do mercado português e espanhol, incluindo legislação CITES actualizada, veterinários especializados e recomendações práticas para proprietários de papagaios em Portugal.</p>

  <div class="callout">
    <p><strong>Criador registado com CITES:</strong> Todas as aves que disponibilizamos incluem documentação CITES oficial, certificado de nascimento e acompanhamento veterinário. <a href="/pt/conhecimento/documentacao-cites/">Saiba mais sobre documentação CITES</a>.</p>
  </div>

  <h2>Comece por Aqui</h2>
  <p>Se é um novo proprietário, recomendamos começar pelo <a href="/pt/conhecimento/guias-iniciantes/">Guia para Iniciantes</a>. Se já tem experiência, explore as categorias de <a href="/pt/conhecimento/nutricao/">Nutrição</a> e <a href="/pt/conhecimento/comportamento/">Comportamento</a> para aprofundar os seus conhecimentos.</p>
</div>
<div class="cta-band">
  <h2>Pronto para adoptar um papagaio?</h2>
  <p>Somos criador registado com toda a documentação legal. Contacte-nos para saber mais sobre disponibilidade e espécies.</p>
  <a href="/pt/contacto/">✉ Contactar Agora</a>
</div>
${footer()}`;
}

// ── 2. Section page generator ─────────────────────────────────────────────────
const SECTION_CONTENT = {
  comprar: {
    title: 'Como Comprar um Papagaio em Portugal | paraisodeaves',
    desc: 'Guia completo para comprar um papagaio legalmente em Portugal: onde comprar, documentação CITES, preços e lista de verificação.',
    heroTitle: 'Como Comprar um Papagaio em Portugal',
    heroDesc: 'Onde comprar, o que perguntar ao criador, documentação necessária e lista de verificação antes de adoptar.',
    badge: '🛒 Guia de Compra',
    body: `
  <h2>Onde Comprar um Papagaio Legal em Portugal</h2>
  <p>Em Portugal, a única forma legal de adquirir papagaios protegidos pela CITES é através de <strong>criadores registados</strong> com licença de núcleo zoológico emitida pelo ICNF (Instituto da Conservação da Natureza e das Florestas). Evite pet shops que não forneçam documentação CITES completa ou que ofereçam preços suspeitos.</p>
  <ul>
    <li><strong>Criadores registados:</strong> Peça sempre o número de registo do núcleo zoológico</li>
    <li><strong>Documentação CITES:</strong> Obrigatória para todas as espécies de apêndice I e II</li>
    <li><strong>Criação à mão:</strong> Garante melhor socialização e adaptação ao proprietário</li>
    <li><strong>Acompanhamento veterinário:</strong> O criador deve fornecer historial de saúde</li>
  </ul>

  <h2>O Que Perguntar ao Criador</h2>
  <p>Antes de comprometer-se com a compra, faça sempre as seguintes perguntas ao criador:</p>
  <ol>
    <li>Qual é o número de registo do seu núcleo zoológico?</li>
    <li>A ave inclui documentação CITES? Quais os documentos exactos?</li>
    <li>A ave foi criada à mão ou pelos pais?</li>
    <li>Qual é o historial veterinário da ave?</li>
    <li>Posso ver fotografias ou vídeo específico desta ave?</li>
    <li>Qual é o processo de entrega e transporte?</li>
  </ol>

  <h2>Preços de Referência em Portugal (2026)</h2>
  <p>Os preços variam consideravelmente por espécie e criador. Como referência geral:</p>
  <ul>
    <li><strong>Periquito monge / alexandrino:</strong> 250–500€</li>
    <li><strong>Conuro-do-Sol / Jenday:</strong> 600–1.200€</li>
    <li><strong>Papagaio Senegal / Caique:</strong> 800–1.600€</li>
    <li><strong>Cacatua (Galah, Goffin):</strong> 1.200–2.500€</li>
    <li><strong>Amazona:</strong> 1.500–3.500€</li>
    <li><strong>Papagaio Cinzento Africano:</strong> 2.500–4.000€</li>
    <li><strong>Araras (Azul, Escarlate):</strong> 4.000–9.000€</li>
    <li><strong>Arara Jacinto:</strong> 12.000–20.000€</li>
  </ul>

  <div class="callout">
    <p><strong>Alerta de burla:</strong> Desconfie de ofertas com preços muito abaixo do mercado, vendedores sem morada física, pagamento apenas por transferência bancária ou criadores que não fornecem documentação CITES. A <a href="/pt/conhecimento/documentacao-cites/">documentação CITES</a> é obrigatória e protege o comprador.</p>
  </div>

  <h2>Lista de Verificação Antes da Compra</h2>
  <ul>
    <li>☑ Verificou o registo do criador no ICNF</li>
    <li>☑ Solicitou documentação CITES original</li>
    <li>☑ Recebeu fotografias/vídeo específico da ave</li>
    <li>☑ Conhece o historial de saúde e alimentação</li>
    <li>☑ Preparou a <a href="/pt/conhecimento/instalacoes/">gaiola e instalações</a> em casa</li>
    <li>☑ Identificou um veterinário especializado em aves exóticas na sua área</li>
    <li>☑ Leu o <a href="/pt/conhecimento/guias-iniciantes/">guia para iniciantes</a></li>
  </ul>`,
    faqs: [
      { q: 'Quanto custa um papagaio em Portugal?', a: 'Os preços variam por espécie: periquitos (250–500€), conuros (600–1.200€), cacatuas (1.200–2.500€), amazonas (1.500–3.500€), papagaio cinzento (2.500–4.000€), araras (4.000–9.000€). Contacte sempre o criador para preços actualizados.' },
      { q: 'É legal comprar papagaios em Portugal?', a: 'Sim, desde que o criador seja registado e a ave inclua documentação CITES válida. Portugal segue a legislação europeia de protecção à fauna silvestre (CITES e Regulamento CE 338/97).' },
      { q: 'Quanto tempo demora a entrega?', a: 'Para espécies grandes (araras, papagaio cinzento) a espera habitual é 3–8 meses. Para espécies pequenas (conuros, caiques) pode haver disponibilidade imediata ou listas de espera de 1–3 meses.' },
      { q: 'Posso comprar um papagaio online?', a: 'Pode iniciar o contacto online, mas nunca pague sem ver documentação CITES e receber material específico da ave (fotos/vídeo actuais). Desconfie de vendedores que recusam videochamadas ou que apenas aceitam pagamentos não rastreáveis.' },
    ],
  },

  'documentacao-cites': {
    title: 'Documentação CITES para Papagaios em Portugal | paraisodeaves',
    desc: 'Tudo sobre documentação CITES para papagaios em Portugal: Apêndices I e II, certificados, verificação e legislação europeia.',
    heroTitle: 'Documentação CITES para Papagaios',
    heroDesc: 'Apêndices CITES, certificados obrigatórios, como verificar a legalidade da ave e o que exigir ao criador.',
    badge: '📄 Documentação Legal',
    body: `
  <h2>O Que é a CITES?</h2>
  <p>A CITES (Convenção sobre o Comércio Internacional de Espécies Ameaçadas de Fauna e Flora Silvestre) é um acordo internacional que regula o comércio de animais e plantas silvestres. Em Portugal e na UE, a CITES é implementada pelo Regulamento CE 338/97 e gerida pelo ICNF (Instituto da Conservação da Natureza e das Florestas).</p>

  <h2>Apêndices CITES — O Que Significam</h2>
  <ul>
    <li><strong>Apêndice I:</strong> Espécies em perigo crítico. Comércio proibido excepto em casos muito específicos (investigação, conservação). A maioria das araras grandes enquadra-se aqui.</li>
    <li><strong>Apêndice II:</strong> Espécies não necessariamente ameaçadas, mas cujo comércio deve ser controlado. A grande maioria dos papagaios de companhia (amazons, cacatuas, papagaio cinzento, etc.) está neste apêndice.</li>
    <li><strong>Apêndice III:</strong> Protecção pedida por países específicos. Menos comum em papagaios.</li>
  </ul>

  <h2>Documentação Exigida em Portugal</h2>
  <p>Para aves nascidas em cativeiro (geração F2 ou posterior), a documentação standard inclui:</p>
  <ul>
    <li><strong>Certificado de nascimento em cativeiro</strong> emitido pelo criador registado</li>
    <li><strong>Certificado CITES (Apêndice II):</strong> Para uso interno na UE, confirma que a ave é de reprodução legal</li>
    <li><strong>Anel de identificação</strong> (geralmente metálico) ou microchip</li>
    <li><strong>Número do núcleo zoológico do criador</strong> (registo no ICNF)</li>
  </ul>

  <div class="callout">
    <p><strong>Importante:</strong> A documentação CITES deve acompanhar sempre a ave. Em caso de mudança de proprietário, a transferência deve ser registada. Guarde todos os documentos em local seguro.</p>
  </div>

  <h2>Como Verificar a Legalidade de uma Ave</h2>
  <ol>
    <li>Peça o número do núcleo zoológico e verifique no site do ICNF</li>
    <li>Confirme que o anel de identificação coincide com os documentos</li>
    <li>Verifique que a documentação CITES tem o carimbo oficial</li>
    <li>Desconfie de documentos fotocopiados ou sem referência de autoridade emissora</li>
  </ol>

  <h2>Importação de Papagaios para Portugal</h2>
  <p>A importação de papagaios de países fora da UE requer licenças CITES especiais, inspecção veterinária na fronteira e período de quarentena. Este processo é gerido pelo ICNF e pode demorar vários meses. Recomendamos sempre adquirir aves já criadas legalmente dentro da UE.</p>`,
    faqs: [
      { q: 'Todos os papagaios precisam de documentação CITES?', a: 'A maioria dos papagaios de companhia (amazons, cacatuas, papagaio cinzento, araras, conuros, etc.) enquadra-se no Apêndice II da CITES e requer documentação. Alguns periquitos comuns podem ter requisitos diferentes. Verifique sempre com o criador.' },
      { q: 'O que acontece se comprar um papagaio sem documentação?', a: 'É ilegal e pode resultar em coimas elevadas, apreensão do animal e processo criminal. Além disso, sem documentação não pode transportar a ave, contratar seguro ou aceder a certos serviços veterinários.' },
      { q: 'Posso viajar com o meu papagaio para Espanha?', a: 'Sim, dentro da UE pode viajar com o seu papagaio desde que tenha a documentação CITES em ordem. Para viagens de avião, verifique os requisitos da companhia aérea. Recomendamos uma consulta veterinária antes da viagem.' },
      { q: 'Onde posso registar o meu papagaio em Portugal?', a: 'O registo deve ser feito junto do ICNF. O seu criador deve fornecer toda a documentação necessária para este processo. Contacte-nos para mais informações.' },
    ],
  },

  saude: {
    title: 'Saúde Aviária — Guia para Papagaios | paraisodeaves',
    desc: 'Guia completo de saúde para papagaios: doenças comuns, sinais de alerta, medicina preventiva e como escolher um veterinário especializado.',
    heroTitle: 'Saúde Aviária — Guia para Papagaios',
    heroDesc: 'Doenças comuns, sinais de alerta, medicina preventiva e como encontrar um veterinário especializado em aves exóticas.',
    badge: '🏥 Saúde e Medicina',
    body: `
  <h2>Consulta de Boas-Vindas</h2>
  <p>Ao adoptar um novo papagaio, agende uma consulta veterinária nos primeiros 5–7 dias. Esta consulta permite estabelecer um ponto de referência de saúde, verificar o peso, analisar as fezes e detectar eventuais problemas respiratórios ou parasitas que não sejam visíveis a olho nu.</p>

  <h2>Sinais de Alerta — Quando Ir ao Veterinário</h2>
  <p>Papagaios são especialistas em <strong>esconder sintomas de doença</strong> (comportamento herdado da natureza, onde mostrar fraqueza atrai predadores). Os seguintes sinais são motivo para consulta imediata:</p>
  <ul>
    <li>Penas arrepiadas por períodos prolongados</li>
    <li>Letargia ou falta de interesse no ambiente</li>
    <li>Perda de apetite ou recusa em comer por mais de 24 horas</li>
    <li>Fezes com cor, consistência ou cheiro anormais</li>
    <li>Descarga nasal ou ocular</li>
    <li>Respiração difícil, com o bico aberto ou com sons</li>
    <li>Perda de equilíbrio ou tremores</li>
    <li>Perda de penas além da muda normal</li>
  </ul>

  <h2>Doenças Mais Comuns em Papagaios</h2>
  <ul>
    <li><strong>Psitacose (Clamídia):</strong> Infecção bacteriana. Sintomas: fezes esverdeadas, letargia, perda de peso. Tratável com antibióticos. Atenção: pode ser transmissível a humanos.</li>
    <li><strong>Aspergilose:</strong> Infecção fúngica do sistema respiratório. Causas: ambiente húmido, dieta deficiente, stress. Tratamento longo e caro.</li>
    <li><strong>Proventricular Dilatation Disease (PDD):</strong> Doença viral que afecta o sistema nervoso e digestivo. Comum em araras e papagaios cinzentos.</li>
    <li><strong>Beak and Feather Disease (PBFD):</strong> Doença viral que afecta o bico, as penas e o sistema imunitário. Sem cura, mas gerível.</li>
    <li><strong>Parasitas internos e externos:</strong> Ácaros, piolhos, giárdia. Detectáveis em análises de rotina.</li>
  </ul>

  <div class="callout">
    <p><strong>Medicina preventiva:</strong> Recomendamos uma consulta anual de rotina mesmo que o papagaio pareça saudável. Inclua pesagem mensal em casa para detectar alterações precoces de peso.</p>
  </div>

  <h2>Nutrição e Saúde</h2>
  <p>Grande parte dos problemas de saúde em papagaios domésticos resulta de <a href="/pt/conhecimento/nutricao/">dieta inadequada</a>. Uma dieta exclusivamente de sementes é nutricionalmente deficiente. Consulte o nosso guia de nutrição para detalhes sobre a alimentação correcta.</p>

  <h2>Longevidade dos Papagaios</h2>
  <p>Papagaios são aves com longevidade excepcionalmente elevada. Um papagaio cinzento africano saudável pode viver 50–70 anos, araras 40–60 anos, e cacatuas 40–80 anos. Esta longevidade implica cuidados veterinários continuados ao longo de décadas.</p>`,
    faqs: [
      { q: 'Com que frequência devo levar o meu papagaio ao veterinário?', a: 'Recomendamos uma consulta anual de rotina, mesmo que o papagaio apareça saudável. Após a adopção, agende uma consulta nos primeiros 7 dias. Papagaios idosos (acima dos 15 anos) beneficiam de consultas semestrais.' },
      { q: 'Posso vacinar o meu papagaio?', a: 'Não existem vacinas aprovadas para as doenças mais comuns em papagaios. A prevenção baseia-se em higiene, dieta adequada, controlo de stress e consultas veterinárias regulares.' },
      { q: 'O papagaio pode transmitir doenças a humanos?', a: 'A psitacose (ornitose) pode ser transmitida a humanos, embora seja rara. Sintomas incluem febre, dores de cabeça e pneumonia. O tratamento com antibióticos é eficaz. Lave sempre as mãos após manusear a ave.' },
      { q: 'Onde encontro veterinários especializados em aves exóticas em Portugal?', a: 'As principais cidades portuguesas têm clínicas com especialistas em aves exóticas. Lisboa, Porto, Coimbra e Faro têm boa cobertura. Contacte-nos para recomendações na sua área.' },
    ],
  },

  nutricao: {
    title: 'Nutrição para Papagaios — Guia Completo | paraisodeaves',
    desc: 'Guia completo de nutrição para papagaios: dieta equilibrada, alimentos proibidos, pellets vs sementes, frutas e verduras recomendadas.',
    heroTitle: 'Nutrição para Papagaios — Guia Completo',
    heroDesc: 'Dieta equilibrada, alimentos proibidos, pellets vs sementes e as frutas e verduras mais benéficas para o seu papagaio.',
    badge: '🥦 Nutrição e Alimentação',
    body: `
  <h2>A Dieta Ideal para Papagaios</h2>
  <p>A base de uma alimentação saudável para papagaios inclui uma mistura equilibrada de diferentes grupos alimentares. Uma dieta exclusivamente de sementes — comum em aves mantidas em condições inadequadas — é nutricionalmente deficiente e está associada a uma esperança de vida significativamente reduzida.</p>
  <p>Proporção recomendada para a maioria das espécies:</p>
  <ul>
    <li><strong>40–60% pellets de alta qualidade:</strong> Base nutricional completa e equilibrada</li>
    <li><strong>20–30% verduras e legumes frescos:</strong> Fonte de vitaminas e minerais</li>
    <li><strong>10–15% frutas frescas:</strong> Com moderação devido ao teor de açúcar</li>
    <li><strong>5–10% sementes e frutos secos:</strong> Como suplemento, não como base</li>
  </ul>

  <h2>Verduras e Legumes Recomendados</h2>
  <ul>
    <li><strong>Excelentes:</strong> Couve, espinafres, brócolo, cenoura, pimentos (vermelho, amarelo, laranja), aipo, abóbora</li>
    <li><strong>Bons:</strong> Pepino, courgette, beterraba, ervilhas, milho doce (com moderação)</li>
    <li><strong>Com moderação:</strong> Alface (pouco valor nutricional), tomate (ácido)</li>
  </ul>

  <h2>Frutas Seguras</h2>
  <ul>
    <li><strong>Recomendadas:</strong> Maçã (sem sementes!), pêra, manga, papaia, kiwi, melão, melancia, figos, framboesas, mirtilos</li>
    <li><strong>Com moderação:</strong> Banana (muito calórica), uva, laranja</li>
  </ul>

  <h2>Alimentos Proibidos — NUNCA Oferecer</h2>
  <p>Os seguintes alimentos são tóxicos ou perigosos para papagaios:</p>
  <ul>
    <li>🚫 <strong>Abacate</strong> — Extremamente tóxico, pode ser fatal</li>
    <li>🚫 <strong>Chocolate e cacau</strong> — Tóxico, afecta o sistema nervoso</li>
    <li>🚫 <strong>Sementes de maçã e frutos com caroço</strong> — Contêm cianeto</li>
    <li>🚫 <strong>Cebola e alho</strong> — Destroem glóbulos vermelhos</li>
    <li>🚫 <strong>Sal</strong> — Leva a disfunções renais</li>
    <li>🚫 <strong>Álcool e cafeína</strong> — Podem ser fatais</li>
    <li>🚫 <strong>Cogumelos crus</strong> — Podem conter toxinas</li>
    <li>🚫 <strong>Lacticínios em excesso</strong> — Papagaios são intolerantes à lactose</li>
  </ul>

  <div class="callout">
    <p><strong>Pellets vs sementes:</strong> Os pellets são a opção nutricional mais completa. Se o seu papagaio apenas aceita sementes, faça a transição gradualmente ao longo de semanas, misturando progressivamente mais pellets com as sementes habituais. Consulte o veterinário antes de fazer alterações bruscas à dieta.</p>
  </div>

  <h2>Água Fresca Sempre Disponível</h2>
  <p>Ofereça sempre água fresca e limpa. Troque a água diariamente e lave o bebedouro regularmente para prevenir o crescimento de bactérias e algas.</p>`,
    faqs: [
      { q: 'Posso dar só sementes ao meu papagaio?', a: 'Não é recomendado. Uma dieta exclusivamente de sementes é pobre em vitamina A, cálcio e outros nutrientes essenciais. Está associada a problemas de fígado, sistema imunitário debilitado e esperança de vida reduzida. Introduza pellets e verduras gradualmente.' },
      { q: 'Com que frequência devo alimentar o meu papagaio?', a: 'A maioria dos papagaios deve ter comida disponível ao longo do dia. Ofereça comida fresca (verduras, frutas) de manhã, remove restos ao fim do dia. Pellets podem estar disponíveis sempre. Ajuste as porções ao tamanho e peso da ave.' },
      { q: 'O meu papagaio pode comer comida humana?', a: 'Alguns alimentos humanos são seguros: arroz cozido sem sal, massa cozida, ovos cozidos, legumes cozinhados sem sal ou temperos. Evite alimentos processados, com sal, açúcar, gorduras ou temperos. Nunca partilhe comida directamente da sua boca.' },
      { q: 'Que suplementos vitamínicos são necessários?', a: 'Se o seu papagaio tem uma dieta equilibrada com pellets de qualidade, suplementos adicionais geralmente não são necessários. Aves com dieta baseada em sementes podem beneficiar de suplementos de vitamina A e cálcio. Consulte sempre o veterinário antes de suplementar.' },
    ],
  },

  comportamento: {
    title: 'Comportamento de Papagaios — Guia Completo | paraisodeaves',
    desc: 'Guia de comportamento para papagaios: linguagem corporal, socialização, mordidelas, stress e como interpretar e responder ao seu papagaio.',
    heroTitle: 'Comportamento de Papagaios',
    heroDesc: 'Linguagem corporal, socialização, mordidelas, stress e como interpretar e responder ao comportamento do seu papagaio.',
    badge: '🧠 Comportamento',
    body: `
  <h2>Linguagem Corporal dos Papagaios</h2>
  <p>Papagaios comunicam através de uma rica linguagem corporal. Aprender a ler estes sinais é fundamental para construir uma relação saudável e evitar situações de stress ou mordidelas.</p>
  <ul>
    <li><strong>Penas arrepiadas (relaxadas):</strong> Ave confortável, quente e contente</li>
    <li><strong>Penas arrepiadas (persistente):</strong> Possível doença — consulte o veterinário</li>
    <li><strong>Pupilas a dilatar e contrair rapidamente:</strong> Excitação intensa, pode preceder mordidela</li>
    <li><strong>Cauda a abanar lateralmente:</strong> Geralmente contentamento (varia por espécie)</li>
    <li><strong>Asas entreabertas:</strong> Pode ser ameaça ou regulação de temperatura</li>
    <li><strong>Batimento de cauda:</strong> Normalmente boa disposição em cacatuas e ninfas</li>
    <li><strong>Coçar a cabeça com a pata:</strong> Sinal de confiança e relaxamento</li>
  </ul>

  <h2>Socialização — O Papel do Proprietário</h2>
  <p>Papagaios são aves altamente sociais. Na natureza, vivem em bandos onde aprendem comportamentos, partilham comida e se protegem mutuamente. Em cativeiro, o proprietário torna-se o "bando". Esta responsabilidade implica:</p>
  <ul>
    <li>Tempo diário de interacção fora da gaiola (mínimo 2–3 horas)</li>
    <li>Enriquecimento ambiental: brinquedos variados, foraging, desafios cognitivos</li>
    <li>Rotinas previsíveis que reduzem o stress</li>
    <li>Exposição gradual a novos sons, pessoas e ambientes</li>
  </ul>

  <h2>Mordidelas — Causas e Prevenção</h2>
  <p>Mordidelas raramente são agressão pura. Na maioria das vezes, resultam de:</p>
  <ul>
    <li><strong>Medo ou ameaça percebida:</strong> Movimentos bruscos, sons altos inesperados</li>
    <li><strong>Protecção territorial:</strong> Especialmente na gaiola ou com objectos favoritos</li>
    <li><strong>Excitação excessiva:</strong> Jogo muito intenso</li>
    <li><strong>Dor ou doença:</strong> Ave que morde sem razão aparente pode estar com dor</li>
    <li><strong>Desequilíbrio hormonal:</strong> Épocas de reprodução podem intensificar comportamentos territoriais</li>
  </ul>

  <div class="callout">
    <p><strong>Nunca puna fisicamente um papagaio.</strong> Punições físicas destroem a confiança e podem criar medo permanente. Em vez disso, use técnicas de <a href="/pt/conhecimento/adestramento/">adestramento com reforço positivo</a> para moldar comportamentos desejados.</p>
  </div>

  <h2>Vocalização e Aprendizagem de Palavras</h2>
  <p>Muitas espécies de papagaios têm capacidade extraordinária de imitar sons e voz humana. Esta capacidade varia muito por espécie e indivíduo. Para estimular a aprendizagem de palavras: repita palavras simples com entoação clara, associe palavras a contextos específicos (ex: "olá" ao entrar na sala) e elogie sempre que houver reprodução de sons.</p>`,
    faqs: [
      { q: 'O meu papagaio grita muito. O que posso fazer?', a: 'Os gritos de alerta são normais no amanhecer e ao pôr-do-sol (comportamento natural). Gritos excessivos durante o dia podem indicar tédio, falta de estimulação, stress ou doença. Aumente o tempo de interacção, ofereça mais brinquedos e verifique com o veterinário se o comportamento persiste.' },
      { q: 'O meu papagaio depenou as penas. O que fazer?', a: 'O auto-depênamento é um comportamento preocupante que pode ter causas médicas (dermatite, PBFD, parasitas) ou psicológicas (tédio, stress, isolamento). Consulte um veterinário especialista em aves imediatamente para descartar causas médicas.' },
      { q: 'Com que idade um papagaio começa a falar?', a: 'A maioria dos papagaios começa a imitar sons entre os 3–12 meses, dependendo da espécie. Papagaios cinzentos africanos são considerados os melhores faladores, com vocabulários que podem superar 1.000 palavras. Araras e cacatuas também aprendem, mas geralmente com vocabulário mais limitado.' },
      { q: 'O meu papagaio pode viver com outros animais de estimação?', a: 'Com supervisão adequada, é possível. Cães e gatos representam risco físico real — mesmo um arranhão de gato pode ser fatal para um papagaio devido a bactérias. Introduções devem ser extremamente graduais e nunca deixe papagaios sem supervisão com outros animais.' },
    ],
  },

  adestramento: {
    title: 'Adestramento de Papagaios — Guia Completo | paraisodeaves',
    desc: 'Guia de adestramento para papagaios: reforço positivo, treino de trucos, subir ao dedo, controlo de mordidelas e construção de confiança.',
    heroTitle: 'Adestramento de Papagaios',
    heroDesc: 'Técnicas de reforço positivo, treino de trucos, subir ao dedo e como construir uma relação de confiança com o seu papagaio.',
    badge: '🎓 Adestramento',
    body: `
  <h2>O Princípio do Reforço Positivo</h2>
  <p>O adestramento eficaz com papagaios baseia-se exclusivamente no <strong>reforço positivo</strong>: recompensar o comportamento desejado imediatamente após a sua ocorrência. Papagaios são extraordinariamente inteligentes e aprendem rapidamente quando motivados correctamente. Punições, gritos ou movimentos bruscos apenas destroem a confiança e atrasam a aprendizagem.</p>

  <h2>Escolher a Recompensa Certa</h2>
  <p>A recompensa mais eficaz varia por ave. Descubra o que mais motiva o seu papagaio:</p>
  <ul>
    <li><strong>Trato alimentar favorito:</strong> Um pequeno pedaço de fruta, uma noz, um pellet especial</li>
    <li><strong>Atenção e elogio verbal:</strong> Muitos papagaios respondem entusiasticamente a "muito bem!"</li>
    <li><strong>Acesso a brinquedo favorito:</strong> Para aves muito territoriais com certos objectos</li>
    <li><strong>Arranhões na cabeça:</strong> Para aves já confortáveis com o toque</li>
  </ul>

  <h2>Primeiros Passos — Construir Confiança</h2>
  <p>Com uma ave recém-adoptada, comece pela construção de confiança antes de qualquer treino formal:</p>
  <ol>
    <li><strong>Semana 1–2:</strong> Apenas presença. Fique perto da gaiola, fale com voz suave, não force o contacto.</li>
    <li><strong>Semana 2–4:</strong> Ofereça tratos através das grades. Deixe a ave aproximar-se por iniciativa própria.</li>
    <li><strong>Mês 2:</strong> Com a gaiola aberta, ofereça tratos na mão. Sem tentar tocar ainda.</li>
    <li><strong>Mês 2–3:</strong> Introduza o comando "sobe" com o dedo como poleiro, recompense qualquer aproximação.</li>
  </ol>

  <h2>O Comando "Sobe" (Step-Up)</h2>
  <p>O "sobe" (ou step-up) é o primeiro e mais importante comando a ensinar. Com o dedo estendido na altura do peito da ave, diga claramente "sobe" e aguarde. Qualquer movimento em direcção ao dedo merece recompensa imediata. Progrida gradualmente até a ave subir consistentemente ao comando.</p>

  <h2>Trucos Populares e Como Ensinar</h2>
  <ul>
    <li><strong>Dar a pata:</strong> Estenda o dedo indicador, toque suavemente a pata, ao levantar a pata diga "dá a pata" e recompense.</li>
    <li><strong>Andar de bicicleta:</strong> Use um brinquedo específico. Treino gradual com muita recompensa.</li>
    <li><strong>Apanhar objectos:</strong> Comece com objectos leves. Recompense qualquer contacto com o objecto, depois progrida para o pegar e largar.</li>
    <li><strong>Dizer palavras:</strong> Repita palavras simples associadas a contextos. Recompense qualquer tentativa de vocalização semelhante.</li>
  </ul>

  <div class="callout">
    <p><strong>Sessões curtas e frequentes:</strong> 5–10 minutos, 2–3 vezes por dia é muito mais eficaz do que sessões longas e exaustivas. Termine sempre com um sucesso e numa nota positiva. Papagaios cansados ou stressados não aprendem.</p>
  </div>`,
    faqs: [
      { q: 'Com que idade posso começar a adestrar um papagaio?', a: 'Aves criadas à mão geralmente estão prontas para treino básico a partir das 8–12 semanas de idade. Quanto mais jovem a ave, mais fácil a socialização e o treino. Aves adultas também aprendem, mas requerem mais paciência e tempo para construir confiança.' },
      { q: 'O meu papagaio não quer subir ao dedo. O que fazer?', a: 'Volte aos passos anteriores. Pode estar a avançar demasiado rápido. Certifique-se de que a ave está confortável com a sua presença e com a sua mão antes de tentar o step-up. Use tratos de alto valor e não force nunca o contacto.' },
      { q: 'Quanto tempo demora a adestrar um papagaio?', a: 'O step-up básico pode ser aprendido em dias a semanas. Trucos mais complexos levam meses. A construção de confiança com uma ave recém-adoptada pode levar 3–6 meses. A paciência é o factor mais importante.' },
      { q: 'O meu papagaio morde durante o treino. Como gerir?', a: 'Pare imediatamente a sessão de treino sem reacção emocional (gritar ou retirar a mão bruscamente pode ser percebido como jogo). Regresse à sessão mais tarde. Se as mordidelas são frequentes, reveja se está a avançar demasiado rápido ou se a ave está stressada ou doente.' },
    ],
  },

  instalacoes: {
    title: 'Instalações e Gaiolas para Papagaios | paraisodeaves',
    desc: 'Guia completo de instalações para papagaios: tamanho de gaiola ideal, poleiros, brinquedos, localização e preparação do espaço em casa.',
    heroTitle: 'Instalações e Gaiolas para Papagaios',
    heroDesc: 'Tamanho ideal de gaiola, poleiros, brinquedos, localização e como preparar o espaço em casa para receber o seu papagaio.',
    badge: '🏠 Instalações',
    body: `
  <h2>O Tamanho da Gaiola Importa</h2>
  <p>A gaiola deve ser suficientemente grande para que a ave possa abrir as asas completamente em qualquer direcção sem tocar nas grades. Como regra geral, <strong>quanto maior melhor</strong>. A gaiola é a casa do seu papagaio — não um espaço temporário.</p>
  <ul>
    <li><strong>Periquitos e pequenos conuros:</strong> Mínimo 60×40×60 cm (C×L×A)</li>
    <li><strong>Caiques, Senegais, conuros médios:</strong> Mínimo 80×60×80 cm</li>
    <li><strong>Amazons, cacatuas médias:</strong> Mínimo 90×70×120 cm</li>
    <li><strong>Papagaio cinzento, cacatuas grandes:</strong> Mínimo 100×80×150 cm</li>
    <li><strong>Araras:</strong> Mínimo 120×100×180 cm ou voliera exterior</li>
  </ul>

  <h2>Espaçamento das Grades</h2>
  <p>O espaçamento entre grades é crítico para a segurança. Uma grade demasiado larga pode prender a cabeça ou o corpo da ave:</p>
  <ul>
    <li>Periquitos e pequenas aves: 1–1,5 cm</li>
    <li>Conuros e aves médias: 1,5–2 cm</li>
    <li>Cacatuas e amazons: 2–2,5 cm</li>
    <li>Araras: 2,5–3,5 cm</li>
  </ul>

  <h2>Localização da Gaiola</h2>
  <p>A posição da gaiola dentro de casa influencia directamente o bem-estar da ave:</p>
  <ul>
    <li><strong>Num canto da sala:</strong> Oferece segurança (a ave tem apenas dois lados expostos)</li>
    <li><strong>Longe de correntes de ar:</strong> Papagaios são sensíveis a temperaturas extremas e correntes</li>
    <li><strong>Longe da cozinha:</strong> Vapores de PTFE (antiaderente) aquecido são fatais para aves</li>
    <li><strong>Com acesso a luz natural:</strong> Mas sem exposição directa ao sol sem zona de sombra</li>
    <li><strong>Na sala principal:</strong> Para participar na vida familiar — aves isoladas desenvolvem problemas comportamentais</li>
  </ul>

  <div class="callout">
    <p><strong>Atenção: PTFE (Teflon):</strong> O aquecimento de frigideiras e utensílios de cozinha com revestimento antiaderente liberta vapores que matam aves em minutos. Nunca use utensílios antiaderentes em casas com papagaios. Substitua por inox, ferro fundido ou cerâmica.</p>
  </div>

  <h2>Poleiros — Variedade é Essencial</h2>
  <p>Ofereça pelo menos 3–4 poleiros de diferentes materiais e diâmetros. Poleiros de diâmetro uniforme causam problemas nos pés a longo prazo. Inclua:</p>
  <ul>
    <li>Poleiros de madeira natural (bétula, macieira, salgueiro)</li>
    <li>Poleiro de corda de sisal ou algodão</li>
    <li>Poleiro de pedra-pomes ou concreto (ajuda a limpar as garras)</li>
    <li>Poleiro de madeira irregular (ramos naturais)</li>
  </ul>

  <h2>Enriquecimento Ambiental</h2>
  <p>Papagaios precisam de estimulação mental constante. Ofereça <a href="/pt/conhecimento/acessorios/">brinquedos</a> variados e rode-os regularmente para manter o interesse. Brinquedos de foraging (onde a ave tem de trabalhar para obter comida) são especialmente benéficos.</p>`,
    faqs: [
      { q: 'Posso ter um papagaio num apartamento?', a: 'Sim, desde que a gaiola seja adequada e haja espaço para voo livre diário dentro de casa. Algumas espécies são mais adaptáveis a apartamentos do que outras. Conuros menores, caiques e senegais adaptam-se bem. Para araras grandes, um apartamento terá de ser muito espaçoso.' },
      { q: 'Preciso de cobrir a gaiola à noite?', a: 'Sim, cobrir a gaiola à noite ajuda a regular o ciclo de sono da ave, reduz distúrbios causados por luz e ruído, e pode diminuir episódios de grito nocturno. Use uma capa específica ou um pano escuro e respirável. O papagaio precisa de 10–12 horas de sono por noite.' },
      { q: 'Com que frequência devo limpar a gaiola?', a: 'O fundo da gaiola deve ser limpo diariamente. Uma limpeza completa (grades, poleiros, comedouros) deve ser feita semanalmente. Desinfecção profunda mensalmente. Use produtos seguros para aves — evite produtos com ftalatos, cloro ou outros químicos tóxicos.' },
      { q: 'Posso ter mais do que um papagaio na mesma gaiola?', a: 'Depende das espécies e das aves individuais. Aves da mesma espécie criadas juntas adaptam-se melhor. Introduções entre aves adultas requerem quarentena e introdução gradual. Algumas espécies (ex: amazons machos) podem ser agressivas entre si durante a época de reprodução.' },
    ],
  },

  acessorios: {
    title: 'Acessórios para Papagaios — Guia Completo | paraisodeaves',
    desc: 'Guia de acessórios para papagaios: brinquedos essenciais, comedouros, bebedouros, poleiros e equipamento de transporte.',
    heroTitle: 'Acessórios para Papagaios',
    heroDesc: 'Brinquedos essenciais, comedouros, bebedouros, poleiros, transportadoras e o equipamento indispensável para o seu papagaio.',
    badge: '🧰 Acessórios',
    body: `
  <h2>Brinquedos — A Base do Enriquecimento</h2>
  <p>Brinquedos não são luxo — são uma necessidade para a saúde mental do papagaio. Um papagaio sem estimulação suficiente desenvolve comportamentos destrutivos (auto-depênamento, gritos excessivos, agressividade). Ofereça sempre pelo menos 3–5 brinquedos na gaiola e rode-os regularmente.</p>
  <ul>
    <li><strong>Brinquedos de destruição:</strong> Madeira, cortiça, sisal — para aves que adoram mastigar</li>
    <li><strong>Brinquedos de foraging:</strong> Onde a ave tem de trabalhar para encontrar a comida</li>
    <li><strong>Brinquedos interactivos:</strong> Espelhos, bolas coloridas, objectos que emitem sons</li>
    <li><strong>Brinquedos de escalada:</strong> Pontes, escadas, treliças</li>
    <li><strong>Brinquedos de pendurar:</strong> Argolas, cordas de sisal, adornos de couro</li>
  </ul>

  <h2>Materiais Seguros e a Evitar</h2>
  <p>Nem todos os materiais são seguros para papagaios:</p>
  <ul>
    <li>✅ <strong>Seguros:</strong> Madeira natural não tratada (bétula, salgueiro, macieira), sisal, couro natural sem corante, inox, acrílico seguro</li>
    <li>❌ <strong>Evitar:</strong> Metais com chumbo ou zinco, madeiras tratadas com verniz ou químicos, tintas não certificadas para aves, fio metálico fino que pode cortar</li>
  </ul>

  <h2>Comedouros e Bebedouros</h2>
  <ul>
    <li><strong>Material:</strong> Inox ou cerâmica são as melhores opções. Plástico pode acumular bactérias em arranhões.</li>
    <li><strong>Quantidade:</strong> Pelo menos 2 comedouros separados (um para pellets/sementes, outro para frescos)</li>
    <li><strong>Localização:</strong> Não directamente abaixo de poleiros (evita contaminação por fezes)</li>
    <li><strong>Limpeza:</strong> Diária — papagaios têm hábito de mergulhar comida na água</li>
  </ul>

  <div class="callout">
    <p><strong>Dica de segurança:</strong> Inspecione regularmente todos os brinquedos por peças partidas, fios soltos ou metal exposto. Um brinquedo danificado pode ser um risco sério para o papagaio. Substitua imediatamente brinquedos com danos.</p>
  </div>

  <h2>Transportadoras</h2>
  <p>Investir numa boa transportadora é essencial para visitas ao veterinário, viagens e situações de emergência. Critérios a considerar:</p>
  <ul>
    <li>Tamanho adequado à espécie (a ave deve poder virar-se confortavelmente)</li>
    <li>Material resistente — papagaios grandes destroem transportadoras de plástico fino</li>
    <li>Ventilação adequada sem correntes de ar directas</li>
    <li>Fácil de limpar e desinfetar</li>
    <li>Familiarize a ave com a transportadora antes de necessitar usá-la</li>
  </ul>

  <h2>Estação de Actividade (Play Stand)</h2>
  <p>Uma estação de actividade fora da gaiola é altamente recomendada para tempo de voo livre. Permite que a ave explore um espaço seguro enquanto você está por perto, com brinquedos e poleiros diferentes dos da gaiola.</p>`,
    faqs: [
      { q: 'Que brinquedo compro primeiro?', a: 'Comece com um brinquedo de destruição (madeira natural) e um de foraging. Observe o que motiva mais a sua ave — há papagaios que preferem destruição, outros adorem sons, outros ainda preferem puzzles. Adapte a selecção de brinquedos ao perfil individual da ave.' },
      { q: 'O meu papagaio não brinca com os brinquedos. O que fazer?', a: 'Papagaios podem ser desconfiados perante objectos novos. Introduza novos brinquedos gradualmente, deixando-os primeiro perto da gaiola sem os colocar dentro. Tente brincar você próprio com o brinquedo — aves são motivadas pela curiosidade e pelo comportamento social.' },
      { q: 'Brinquedos com espelho são bons para papagaios?', a: 'Com moderação. Espelhos podem ser problemáticos pois a ave pode "ligar" com o reflexo como se fosse um companheiro. Para aves solitárias pode oferecer alguma companhia, mas um companheiro real (humano ou outra ave) é sempre preferível.' },
      { q: 'Quanto devo gastar em acessórios por mês?', a: 'Depende da espécie e hábitos de destruição da ave. Araras e cacatuas destroem brinquedos rapidamente e podem custar 30–60€/mês em brinquedos. Espécies menores, 10–20€/mês. Considere comprar brinquedos de destruição a granel ou fazê-los em casa com materiais seguros.' },
    ],
  },

  'guias-iniciantes': {
    title: 'Guia para Novos Proprietários de Papagaios | paraisodeaves',
    desc: 'Guia completo para novos proprietários de papagaios: o que esperar, como preparar a casa, primeiros dias, erros comuns e escolha da espécie.',
    heroTitle: 'Guia para Novos Proprietários de Papagaios',
    heroDesc: 'Tudo o que precisa de saber antes de adoptar o seu primeiro papagaio: preparação, primeiros dias, erros comuns e escolha da espécie.',
    badge: '🌱 Para Iniciantes',
    body: `
  <h2>Antes de Adoptar — O Que Considerar</h2>
  <p>Adoptar um papagaio é um compromisso de décadas — literalmente. Um papagaio cinzento africano pode viver 70 anos. Uma arara, 60 anos. Esta decisão é mais comparável a adoptar um membro da família do que a comprar um animal de estimação comum. Antes de avançar, considere:</p>
  <ul>
    <li><strong>Longevidade:</strong> Tem planos para quem cuida do papagaio se não puder mais fazê-lo?</li>
    <li><strong>Tempo:</strong> Pode dedicar 2–4 horas diárias de atenção e interacção?</li>
    <li><strong>Custos:</strong> Para além do preço de compra, espere 100–300€/mês em comida, veterinário e acessórios</li>
    <li><strong>Ruído:</strong> Papagaios são barulhentos. Os seus vizinhos aceitarão bem?</li>
    <li><strong>Viagens:</strong> Quem cuida do papagaio durante as suas férias?</li>
  </ul>

  <h2>Qual Espécie Escolher — Para Iniciantes</h2>
  <p>Para quem está a começar, recomendamos espécies com temperamento mais previsível e necessidades de cuidados moderadas:</p>
  <ul>
    <li><strong>Papagaio Senegal:</strong> Afectuoso, tamanho médio, menos barulhento que outros papagaios</li>
    <li><strong>Caique:</strong> Alegre, enérgico, playful — excelente personalidade para famílias activas</li>
    <li><strong>Conuro-do-Sol ou Jenday:</strong> Muito sociáveis, adoram atenção — mas são barulhentos</li>
    <li><strong>Cacatua Ninfa (Carolina):</strong> Dóceis, sociáveis, bons para apartamento</li>
    <li><strong>Periquito Alexandrino:</strong> Bom falador, relativamente independente</li>
  </ul>

  <div class="callout">
    <p><strong>Espécies mais exigentes para iniciantes:</strong> Papagaios cinzentos africanos, araras e cacatuas brancas são magnificas aves, mas têm necessidades emocionais complexas que podem ser desafiantes para proprietários sem experiência anterior. Recomendamos acumular experiência com espécies mais pequenas primeiro.</p>
  </div>

  <h2>Preparação do Espaço — Antes da Chegada</h2>
  <ol>
    <li>Instale e prepare a <a href="/pt/conhecimento/instalacoes/">gaiola</a> com poleiros, comedouros e brinquedos</li>
    <li>Remova plantas tóxicas do espaço onde a ave terá acesso</li>
    <li>Identifique um veterinário especializado em aves exóticas na sua área</li>
    <li>Compre <a href="/pt/conhecimento/nutricao/">pellets de qualidade</a>, frutas e verduras adequadas</li>
    <li>Informe todos os membros da família sobre as regras de segurança</li>
  </ol>

  <h2>Os Primeiros Dias em Casa</h2>
  <p>Os primeiros dias são críticos para a adaptação da ave ao novo ambiente. Siga estas orientações:</p>
  <ul>
    <li>Deixe a ave explorar a gaiola ao seu ritmo — não force o contacto</li>
    <li>Mantenha rotinas previsíveis (horas de comida, cobertura da gaiola, etc.)</li>
    <li>Fale com a ave regularmente com voz suave</li>
    <li>Limite visitas de estranhos nas primeiras semanas</li>
    <li>Agende consulta veterinária nos primeiros 7 dias</li>
  </ul>

  <h2>Erros Comuns de Novos Proprietários</h2>
  <ul>
    <li>❌ Alimentar exclusivamente com sementes</li>
    <li>❌ Gritar ou punir fisicamente por comportamentos indesejados</li>
    <li>❌ Não consultar veterinário até haver sintomas óbvios</li>
    <li>❌ Gaiola demasiado pequena ou sem brinquedos</li>
    <li>❌ Deixar a ave sempre dentro da gaiola sem tempo de voo livre</li>
    <li>❌ Ignorar sinais subtis de doença (letargia, penas arrepiadas)</li>
    <li>❌ Usar produtos domésticos tóxicos (spray antiaderente, incenso, Febreze) em casa</li>
  </ul>`,
    faqs: [
      { q: 'Um papagaio é um bom primeiro animal de estimação?', a: 'Depende do estilo de vida e expectativas. Papagaios são animais muito sociais e inteligentes que requerem muito tempo e atenção. São excelentes para pessoas que têm tempo, espaço e comprometimento a longo prazo. Para famílias muito ocupadas, um animal com necessidades menos intensivas pode ser mais adequado.' },
      { q: 'Preciso de ter dois papagaios para que não fique sozinho?', a: 'Não é obrigatório, mas ter companhia (humana ou aviária) é importante para o bem-estar do papagaio. Se passar muitas horas fora de casa, considere adoptar dois papagaios compatíveis. Alternativamente, certifique-se de dedicar tempo de qualidade quando está em casa e forneça enriquecimento ambiental suficiente.' },
      { q: 'O papagaio pode ficar sozinho durante o dia?', a: 'Adultos com vida activa podem deixar o papagaio sozinho durante o período de trabalho (8 horas), desde que haja enriquecimento ambiental suficiente. Papagaios deixados sozinhos por períodos muito longos ou regularmente por mais de 10 horas desenvolvem frequentemente problemas comportamentais.' },
      { q: 'Papagaios são adequados para famílias com crianças?', a: 'Algumas espécies adaptam-se bem a famílias com crianças — caiques, conuros e ninfas são geralmente tolerantes. Araras e cacatuas grandes, pela força do bico, representam risco maior. Ensine sempre as crianças a respeitar o espaço da ave e a interpretar a linguagem corporal. Supervisão adulta é sempre necessária.' },
    ],
  },
};

function sectionPage(slug) {
  const content = SECTION_CONTENT[slug];
  if (!content) return null;

  const canonical = `/pt/conhecimento/${slug}/`;

  return `${head({
    title: content.title,
    desc: content.desc,
    canonical,
    faqs: content.faqs,
  })}
${nav(slug)}
<div class="breadcrumb">
  <a href="/pt/">Início</a> › <a href="/pt/conhecimento/">Centro de Conhecimento</a> › <strong>${content.heroTitle}</strong>
</div>
<div class="kc-hero">
  <span class="kc-badge">${content.badge}</span>
  <h1>${content.heroTitle}</h1>
  <p>${content.heroDesc}</p>
</div>
<div class="content">
${content.body}

  <h2>Perguntas Frequentes</h2>
  <div class="faq">
${content.faqs.map(f => `    <details>
      <summary>${f.q}</summary>
      <div class="faq-body">${f.a}</div>
    </details>`).join('\n')}
  </div>

  <h2>Mais Recursos</h2>
  <ul>
${SECTIONS.filter(s => s.slug !== slug).slice(0, 4).map(s => `    <li><a href="/pt/conhecimento/${s.slug}/">${s.emoji} ${s.title}</a></li>`).join('\n')}
  </ul>
</div>
<div class="cta-band">
  <h2>Interessado em adoptar um papagaio?</h2>
  <p>Somos criador registado com mais de 25 anos de experiência e toda a documentação CITES em ordem. Contacte-nos para saber mais.</p>
  <a href="/pt/contacto/">✉ Contactar Agora</a>
</div>
${footer()}`;
}

// ─── Generate ─────────────────────────────────────────────────────────────────
write('pt/conhecimento/index.html', hubPage());
for (const { slug } of SECTIONS) {
  const page = sectionPage(slug);
  if (page) write(`pt/conhecimento/${slug}/index.html`, page);
}
console.log('\n✅ PT conhecimento pages generated.\n');
