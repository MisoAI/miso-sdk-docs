import { readFile } from 'fs/promises';
import { readFileSync } from 'fs';
import { load as loadYaml } from 'js-yaml';

export async function readYaml(file) {
  return loadYaml(await readFile(file, 'utf8'));
}

export function readYamlSync(file) {
  return loadYaml(readFileSync(file, 'utf8'));
}
