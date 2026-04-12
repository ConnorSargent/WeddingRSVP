// Run: npm run build, then node scripts/copy-dist-for-pages.js
// This copies the CONTENTS of dist into ../WeddingRSVP-pages so you can
// copy that folder's contents into your WeddingRSVP repo root and push.

const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
const outDir = path.join(__dirname, '..', '..', 'WeddingRSVP-pages');

if (!fs.existsSync(distDir)) {
  console.error('Run "npm run build" first.');
  process.exit(1);
}

if (fs.existsSync(outDir)) fs.rmSync(outDir, { recursive: true });
fs.mkdirSync(outDir, { recursive: true });

for (const name of fs.readdirSync(distDir)) {
  const src = path.join(distDir, name);
  const dest = path.join(outDir, name);
  fs.cpSync(src, dest, { recursive: true });
}

console.log('Done! Contents of dist are now in:');
console.log(path.resolve(outDir));
console.log('\nNext: copy everything INSIDE WeddingRSVP-pages into the root of your WeddingRSVP repo, then commit and push.');
