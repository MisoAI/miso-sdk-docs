import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { load } from 'js-yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));

export function readYaml(relativePath) {
  return load(readFileSync(join(__dirname, relativePath), 'utf8'));
}
