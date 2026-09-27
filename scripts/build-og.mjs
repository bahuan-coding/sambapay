/**
 * Renders the Open Graph card — what a shared link looks like on WhatsApp,
 * X and every chat that previews it. One PNG per language, 1200x630, written
 * to app/public/og/. Run: node scripts/build-og.mjs
 *
 * The card carries the wordmark, the headline of the language and the domain.
 * The fonts come from @fontsource, so the card is the same brand as the site.
 */
import { readFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const outDir = join(root, 'app', 'public', 'og');

const palette = {
  paper: '#ffffff',
  field: '#f4efe4',
  ink: '#1c3d4a',
  blue: '#1351b4',
  saffron: '#ff671f',
  indiaGreen: '#046a38',
  indiaNavy: '#06038d',
  muted: '#5a6a72',
  border: '#e6dfd2',
};

function fontBase64(pkg, file) {
  return readFileSync(join(root, 'node_modules', '@fontsource', pkg, 'files', file)).toString('base64');
}

// Fraunces 600 for the wordmark and headline, Raleway 500 for the domain.
const fraunces = fontBase64('fraunces', 'fraunces-latin-600-normal.woff');
const raleway = fontBase64('raleway', 'raleway-latin-500-normal.woff');

/** A headline line: its own size, so the widest one still fits in the margin. */
const cards = [
  { lang: 'en', file: 'og-en.png', lines: [['Payments across', 88], ['South and Central America,', 64], ['engineered.', 76, true]] },
  { lang: 'pt', file: 'og-pt.png', lines: [['Pagamentos na', 88], ['América do Sul e Central.', 62], ['Engenharia de verdade.', 72, true]] },
  { lang: 'es', file: 'og-es.png', lines: [['Pagos en', 88], ['América del Sur y Central.', 62], ['Pura ingeniería.', 72, true]] },
];

function svg({ lines }) {
  const baseline = [330, 428, 540];
  const headline = lines
    .map(([text, size, italic], i) => {
      const style = italic ? ' font-style="italic"' : '';
      const color = italic ? palette.blue : palette.ink;
      return `<text x="80" y="${baseline[i]}" font-family="Fraunces" font-weight="600" font-size="${size}" fill="${color}" letter-spacing="-2"${style}>${text}</text>`;
    })
    .join('\n  ');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <style>
      @font-face { font-family: 'Fraunces'; font-weight: 600; src: url(data:font/woff;base64,${fraunces}) format('woff'); }
      @font-face { font-family: 'Raleway'; font-weight: 500; src: url(data:font/woff;base64,${raleway}) format('woff'); }
    </style>
    <linearGradient id="samba" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${palette.saffron}"/>
      <stop offset="1" stop-color="${palette.indiaGreen}"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="${palette.field}"/>
  <rect x="0" y="0" width="1200" height="630" fill="none" stroke="${palette.border}" stroke-width="2"/>

  <text x="80" y="150" font-family="Fraunces" font-weight="600" font-size="56" letter-spacing="-1">
    <tspan fill="url(#samba)">Samba</tspan><tspan fill="${palette.indiaNavy}">Pay</tspan>
  </text>

  ${headline}

  <text x="1120" y="592" text-anchor="end" font-family="Raleway" font-weight="500" font-size="30" fill="${palette.muted}">sambapay.tech</text>
</svg>`;
}

mkdirSync(outDir, { recursive: true });

for (const card of cards) {
  const png = await sharp(Buffer.from(svg(card))).png().toBuffer();
  await sharp(png).toFile(join(outDir, card.file));
  console.log(`wrote app/public/og/${card.file}`);
}

console.log('Open Graph cards done.');
