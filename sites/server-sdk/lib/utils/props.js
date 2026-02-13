import { readdirSync } from 'fs';
import { join } from 'path';
import { readYamlSync } from './files.js';
import { removeExt } from './misc.js';
import { helpers } from '../specs-data.js';

function getKey(file) {
  return removeExt(file).replaceAll('.', ':');
}

export function buildFile(file) {
  const { props, groups } = readYamlSync(file);
  return helpers.expand(groups, props);
}

export function buildDir(dir) {
  const result = {};
  for (const file of readdirSync(dir)) {
    result[getKey(file)] = buildFile(join(dir, file));
  }
  return Object.freeze(result);
}
