// generate-5c.js — Phase 5C main runner: generates all 77 new blog posts
'use strict';

const fs = require('fs');
const path = require('path');
const { generateHTML } = require('./generate-5c-template.js');
const articlesA = require('./data-5c-a.js');
const articlesA2 = require('./data-5c-a2.js');
const articlesB = require('./data-5c-b.js');
const comparisons = require('./data-5c-comparisons.js');

// One extra comparison page missing from data file
const extraComparison = {
slug:'cacatua-galah-vs-ninfa',title:'Cacatúa Galah vs Cacatúa Ninfa: ¿Cuál Elegir? 2026',titleTag:'Cacatúa Galah vs Ninfa | Comparativa 2026 | paraisodeaves',
desc:'Comparativa entre la cacatúa galah (rosada) y la cacatúa ninfa (cockatiel): tamaño, carácter, ruido, polvo y cuál es más adecuada para principiantes y pisos.',
keywords:'cacatua galah vs ninfa, galah vs cockatiel, cacatua rosada vs ninfa diferencias',
badge:'⚖️ Comparativa',h1:'Cacatúa Galah vs Cacatúa Ninfa: Dos Opciones de Cacatúa para Principiantes',readTime:'8 min',
sections:[
{h2:'Dos cacatúas muy diferentes en tamaño y carácter',
content:`La cacatúa galah (<em>Eolophus roseicapilla</em>) y la cacatúa ninfa (<em>Nymphicus hollandicus</em>) pertenecen a la misma familia pero representan extremos opuestos en términos de tamaño, intensidad y facilidad de manejo. La comparativa es especialmente útil para quienes están decidiendo entre su primera cacatúa.`},
{h2:'Tabla comparativa',
content:`<table>
<tr><th>Característica</th><th>Cacatúa Galah</th><th>Cacatúa Ninfa</th></tr>
<tr><td>Tamaño</td><td>35-38 cm / 300-400 g</td><td>30-33 cm / 80-130 g</td></tr>
<tr><td>Nivel de ruido</td><td>★★★★ (alto)</td><td>★★ (moderado)</td></tr>
<tr><td>Polvo de plumaje</td><td>Abundante</td><td>Muy abundante</td></tr>
<tr><td>Demanda afectiva</td><td>★★★★ (alta)</td><td>★★★ (moderada)</td></tr>
<tr><td>Para principiantes</td><td>⚠️ Con algo de experiencia</td><td>✅ Ideal</td></tr>
<tr><td>Apto para pisos</td><td>⚠️ Con reservas</td><td>✅ Sí</td></tr>
<tr><td>Longevidad</td><td>25-40 años</td><td>15-25 años</td></tr>
</table>`},
{h2:'La ninfa: la elección de principiantes',
content:`La cacatúa ninfa es la opción más recomendada para quien nunca ha tenido aves. Su tamaño compacto, su carácter dócil y su nivel de ruido moderado (silbidos agradables, no gritos estridentes) la hacen ideal para pisos y para cualquier tipo de hogar. Es la especie con menor margen de error para propietarios nuevos.`},
{h2:'La galah: más grande, más intensa',
content:`La galah (también llamada "cacatúa rosada") es una cacatúa de tamaño mediano con un carácter más intenso que la ninfa. Es muy afectuosa y social, pero sus vocalizaciones son más potentes y su necesidad de interacción más alta. Para alguien con experiencia previa con aves que quiere dar el salto a una cacatúa más "grande", la galah es un escalón natural.`},
],
faqs:[
{q:'¿Cuál produce más polvo de plumaje?',a:'La ninfa produce más polvo relativo a su tamaño — es característica de todas las cacatúas y especialmente pronunciada en la ninfa. La galah también produce abundante polvo. Ambas son problemáticas para personas con alergias al polvo de ave.'},
{q:'¿La galah habla?',a:'Aprende algunas palabras y puede reproducir sonidos del entorno. No es su punto fuerte comparada con las amazonas o el yaco.'},
{q:'¿Pueden convivir una galah y una ninfa?',a:'No en la misma jaula — la galah es significativamente más grande y podría intimidar o lesionar a la ninfa. En habitaciones separadas pueden coexistir perfectamente.'},
],
related:[{title:'Guía Cacatúa Ninfa',desc:'Todo sobre el cockatiel.',url:'/blog/guia-cacatua-ninfa.html'},{title:'Cacatúa Blanca vs Galah',desc:'Dos cacatúas grandes comparadas.',url:'/blog/cacatua-blanca-vs-galah.html'},{title:'Mejores Loros Principiantes',desc:'La ninfa en el ranking general.',url:'/blog/mejores-loros-principiantes.html'},{title:'Cacatúas Disponibles',desc:'Ver cacatúas en paraisodeaves.',url:'/cacatua.html'}]
};

const allArticles = [
  ...articlesA,
  ...articlesA2,
  ...articlesB,
  ...comparisons,
  extraComparison,
];

console.log(`\n🦜 Phase 5C Generator — ${allArticles.length} articles to generate\n`);

let generated = 0;
let skipped = 0;
const slugs = [];

for (const article of allArticles) {
  const outPath = path.join('blog', article.slug + '.html');
  
  // Check for duplicates with existing blog posts
  if (fs.existsSync(outPath)) {
    const existing = fs.readFileSync(outPath, 'utf8');
    // Only skip if it's NOT a 5C generated file (i.e., it has a different generator signature)
    if (!existing.includes('generate-5c') && existing.length > 5000) {
      console.warn(`  ⚠️  SKIP (existing): ${article.slug}`);
      skipped++;
      continue;
    }
  }
  
  try {
    const html = generateHTML(article);
    fs.writeFileSync(outPath, html, 'utf8');
    slugs.push(article.slug);
    generated++;
    if (generated % 10 === 0) {
      console.log(`  ✅ ${generated} generated so far...`);
    }
  } catch (err) {
    console.error(`  ❌ ERROR generating ${article.slug}: ${err.message}`);
  }
}

console.log(`\n✅ Done! Generated: ${generated} | Skipped (existing): ${skipped}\n`);

// Write slug list for sitemap/redirects update scripts
fs.writeFileSync('5c-slugs.json', JSON.stringify(slugs, null, 2), 'utf8');
console.log(`📝 Slug list written to 5c-slugs.json (${slugs.length} slugs)`);
