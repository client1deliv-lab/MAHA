import fs from 'fs';
import path from 'path';

const globalsPath = path.resolve('app/globals.css');
const stylePath = path.resolve('../css/style.css');

let globalsCss = fs.readFileSync(globalsPath, 'utf8');
const styleCss = fs.readFileSync(stylePath, 'utf8');

// We want to add these to @theme inline { ... }
const themeAdditions = `
  --color-maha-bg: var(--bg);
  --color-maha-panel: var(--panel);
  --color-maha-panel2: var(--panel2);
  --color-maha-ink: var(--ink);
  --color-maha-dim: var(--dim);
  --color-maha-faint: var(--faint);
  --color-maha-gold: var(--gold);
  --color-maha-red: var(--red);
  --color-maha-line: var(--line);
  
  --font-display: var(--font-big-shoulders);
  --font-sans: var(--font-dm-sans);
  --font-mono: var(--font-ibm-plex);

  --radius-maha: var(--radius-maha-val);
  --container-wrap: var(--wrap);
`;

globalsCss = globalsCss.replace('@theme inline {', '@theme inline {' + themeAdditions);

// We want to add the MAHA root variables to :root { ... }
const rootAdditions = `
  --bg: #09090a;
  --panel: #121214;
  --panel2: #19191c;
  --ink: #f5f0e7;
  --dim: #b7b0a4;
  --faint: #777169;
  --gold: #e8a33d;
  --red: #a92e42;
  --line: rgba(245, 240, 231, 0.13);
  --radius-maha-val: 3px;
  --wrap: 1240px;
`;

globalsCss = globalsCss.replace(':root {', ':root {' + rootAdditions);

// Now process style.css:
// 1. Remove the first :root block
let processedStyle = styleCss.replace(/:root\s*\{[^}]+\}/m, '');

// 2. Replace fonts
processedStyle = processedStyle.replace(/"DM Sans", sans-serif/g, 'var(--font-dm-sans)');
processedStyle = processedStyle.replace(/"Big Shoulders Display", sans-serif/g, 'var(--font-big-shoulders)');
processedStyle = processedStyle.replace(/"IBM Plex Mono", monospace/g, 'var(--font-ibm-plex)');

// 3. Optional: replace hardcoded hex with var(--bg), var(--ink) if missed, but style.css uses variables mostly.
// Actually, let's fix body font
processedStyle = processedStyle.replace(/font-family: var\(--font-dm-sans\);/g, 'font-family: var(--font-sans);');
processedStyle = processedStyle.replace(/font-family: var\(--font-big-shoulders\);/g, 'font-family: var(--font-display);');
processedStyle = processedStyle.replace(/font-family: var\(--font-ibm-plex\);/g, 'font-family: var(--font-mono);');


// Append processed style to globals.css
const finalCss = globalsCss + '\n\n/* --- MAHA FILMS COMPONENT STYLES --- */\n\n' + processedStyle;

fs.writeFileSync(globalsPath, finalCss);
console.log('Successfully merged style.css into globals.css');
