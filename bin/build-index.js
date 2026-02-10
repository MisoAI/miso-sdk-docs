import { fileURLToPath } from 'url';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, join, relative } from 'path';
import fg from 'fast-glob';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

const SITE_DIRS = ['sites/client-sdk', 'sites/server-sdk'];
const MAIN_TAG_REGEXP = /<main[^>]*>([\s\S]*?)<\/main>/;
const HTML_TAG_REGEXP = /<[^>]+>/g;

function extractText(html) {
  const match = html.match(MAIN_TAG_REGEXP);
  if (!match) return '';
  return match[1]
    .replace(HTML_TAG_REGEXP, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/^[ \t]+/gm, '')
    .replace(/[ \t]+$/gm, '')
    .replace(/\n{2,}/g, '\n')
    .trim();
}

for (const siteDir of SITE_DIRS) {
  const distDir = join(rootDir, siteDir, 'dist');
  const indexDir = join(rootDir, siteDir, 'index');
  const files = fg.sync('**/index.html', { cwd: distDir });

  let count = 0;
  for (const file of files) {
    // Skip root index.html and paths containing underscores
    if (file === 'index.html') continue;
    if (file.includes('_')) continue;

    const html = readFileSync(join(distDir, file), 'utf-8');
    const text = extractText(html);
    if (!text) continue;

    // dist/a/b/c/index.html → index/a/b/c.txt
    const outPath = join(indexDir, file.replace(/\/index\.html$/, '.txt'));
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, text);
    count++;
  }
  console.log(`${siteDir}: ${count} files indexed`);
}
