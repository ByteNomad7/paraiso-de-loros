#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Map of wrong URLs → correct URLs
const replacements = [
  ['/aves-disponibles/loro-gris-africano/', '/available-birds/loro-gris-africano.html'],
  ['/aves-disponibles/cacatua-blanca/', '/especies/cacatua-blanca'],
  ['/aves-disponibles/loro-senegal/', '/especies/loro-senegal'],
  ['/aves-disponibles/amazona-nuca-amarilla/', '/especies/amazona-nuca-amarilla'],
  ['/aves-disponibles/caique/', '/especies/caique'],
  ['/aves-disponibles/amazona-ala-naranja/', '/especies/amazona-ala-naranja'],
  ['/aves-disponibles/conuro-del-sol/', '/especies/conuro-del-sol'],
  ['/aves-disponibles/cacatua-goffin/', '/especies/cacatua-goffin'],
  ['/aves-disponibles/periquito-alejandrino/', '/especies/periquito-alejandrino'],
  ['/aves-disponibles/conuro-jenday/', '/especies/conuro-jenday'],
  ['/aves-disponibles/cotorra-monje/', '/especies/cotorra-monje'],
  ['/aves-disponibles/lorikeet-arcoiris/', '/especies/lorikeet-arcoiris'],
  ['/aves-disponibles/loro-pionus/', '/especies/loro-pionus'],
  ['/aves-disponibles/conuro-mejilla-verde/', '/especies/conuro-mejilla-verde'],
  ['/aves-disponibles/periquito-collar-indio/', '/especies/periquito-collar-indio'],
  ['/aves-disponibles/cacatua-galah/', '/especies/cacatua-galah'],
];

const files = [
  'conocimiento/compra/index.html',
  'conocimiento/nutricion/index.html',
  'conocimiento/salud/index.html',
  'conocimiento/cites-legal/index.html',
  'conocimiento/accesorios/index.html',
  'conocimiento/adiestramiento/index.html',
  'conocimiento/comportamiento/index.html',
  'conocimiento/cria/index.html',
  'conocimiento/guias-avanzadas/index.html',
  'conocimiento/guias-principiantes/index.html',
  'conocimiento/instalaciones/index.html',
  'conocimiento/viajes/index.html',
];

for (const file of files) {
  let html = fs.readFileSync(file, 'utf8');
  let changed = false;
  for (const [wrong, correct] of replacements) {
    if (html.includes(wrong)) {
      html = html.split(wrong).join(correct);
      changed = true;
      console.log(`  Fixed: ${wrong} → ${correct} in ${file}`);
    }
  }
  if (changed) {
    fs.writeFileSync(file, html, 'utf8');
    console.log(`✅ Saved: ${file}`);
  }
}
console.log('\nDone.');
