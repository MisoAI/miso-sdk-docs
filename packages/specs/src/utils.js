function isMixin(key) {
  return key && key.charCodeAt(0) === 95; // '_'
}

function buildPropMap(props) {
  const map = new Map();
  for (const prop of props) {
    map.set(prop.key, { name: prop.key, ...prop });
  }
  return map;
}

function buildMixinGroupMap(groups) {
  const map = new Map();
  for (const group of groups) {
    if (isMixin(group.key)) {
      map.set(group.key, group);
    }
  }
  return map;
}

function unfoldProps(propMap, mixinGroupMap, keys, arr = []) {
  for (const key of keys) {
    if (isMixin(key)) {
      unfoldProps(propMap, mixinGroupMap, mixinGroupMap.get(key).props, arr);
    } else {
      arr.push(propMap.get(key));
    }
  }
  return arr;
}

export function resolveProps(groups, props) {
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
