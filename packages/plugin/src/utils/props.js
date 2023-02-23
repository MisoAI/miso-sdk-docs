const { readdirSync } = require('fs');
const { join } = require('path');
const { readYamlSync } = require('./files');
const { removeExt } = require('./misc');
const { helpers } = require('@miso.ai/miso-specs');

function getKey(file) {
  return removeExt(file).replaceAll('.', ':');
}

function buildFile(file) {
  const { props, groups } = readYamlSync(file);
  return helpers.expand(groups, props);
}

function buildDir(dir) {
  const result = {};
  for (const file of readdirSync(dir)) {
    result[getKey(file)] = buildFile(join(dir, file));
  }
  return Object.freeze(result);
}

module.exports = {
  buildFile,
  buildDir,
};
