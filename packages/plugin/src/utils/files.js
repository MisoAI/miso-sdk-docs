const { readFile } = require('fs/promises');
const { readFileSync } = require('fs');
const { load: loadYaml } = require('js-yaml');

async function readYaml(file) {
  return loadYaml(await readFile(file, 'utf8'));
}

function readYamlSync(file) {
  return loadYaml(readFileSync(file, 'utf8'));
}

module.exports = {
  readYaml,
  readYamlSync,
};
