const { readdirSync } = require('fs');
const { join } = require('path');
const { readYamlSync } = require('./files');
const { removeExt } = require('./misc');

function isMixin(key) {
  return key && key.charCodeAt(0) === 95; // '_'
}

function buildPropMap(rawProps) {
  return rawProps.reduce((m, prop) => {
    m[prop.key] = Object.assign({ name: prop.key }, prop);
    return m;
  }, {});
}

function buildMixinGroupMap(rawGroups) {
  return rawGroups.reduce((m, group) => {
    if (isMixin(group.key)) { 
      m[group.key] = group;
    }
    return m;
  }, {});
}

function unfoldProps(propMap, mixinGroupMap, keys, arr = []) {
  for (const key of keys) {
    if (isMixin(key)) {
      unfoldProps(propMap, mixinGroupMap, mixinGroupMap[key].props, arr);
    } else {
      arr.push(propMap[key]);
    }
  }
  return arr;
}

function getKey(file) {
  return removeExt(file).replaceAll('.', ':');
}

function buildFile(file) {
  const { props, groups } = readYamlSync(file);

  const propMap = buildPropMap(props);
  const mixinGroupMap = buildMixinGroupMap(groups);

  return Object.freeze(groups.reduce((m, group) => {
    if (!isMixin(group.key)) {
      const keys = group.keys || [group.key];
      const props = unfoldProps(propMap, mixinGroupMap, group.props);
      for (const key of keys) {
        m[key] = { key, props };
      }
    }
    return m;
  }, {}));
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
