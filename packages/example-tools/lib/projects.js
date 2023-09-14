import { dirname } from 'path';
import { readFile, writeFile } from 'fs/promises';
import { Glob } from 'glob';
import { fileExists } from './utils.js';

export async function* list(path) {
  const glob = new Glob(`${path}/**/package.json`, { ignore: '**/node_modules/**' });
  for await (const file of glob) {
    yield dirname(file);
  }
}

// TODO: doggoganger as well

export async function upgrade(dir, version) {
  await upgradeSdkInHtml(dir, version);
}

async function upgradeSdkInHtml(dir, version) {
  const file = `${dir}/index.html`;
  if (!await fileExists(file)) {
    return;
  }
  const html = await readFile(file, 'utf8');
  const revised = html
    .replaceAll(/(\/@miso.ai\/client-sdk@)[^/]+(\/dist\/umd\/miso\.min\.js|\/dist\/css\/ui\.css)/g, `$1${version}$2`);
  await writeFile(file, revised, 'utf8');
}
