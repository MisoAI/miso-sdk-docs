import { readYaml } from '../yaml.js';

const _props = readYaml('interactions/props.yml');
const _types = readYaml('interactions/types.yml');

const props = Object.freeze(_props.map(prop => {
  const parts = prop.name.split('.');
  return Object.freeze({
    ...prop,
    key: parts[parts.length - 1],
    parent: parts.slice(0, -1).join('.'),
  });
}));

const types = Object.freeze(_types);

const KNOWN_WORKFLOWS = ['ask', 'explore', 'hybrid-search', 'search', 'recommendation'];

function getItemsForWorkflow(list, name) {
  return Object.freeze(list.filter((item) =>
    (!item.used_by && !item.used_by_except) ||
    (item.used_by && item.used_by.includes(name)) ||
    (item.used_by_except && !item.used_by_except.includes(name))
  ));
}

const workflows = {};
for (const name of KNOWN_WORKFLOWS) {
  workflows[name] = Object.freeze({
    props: getItemsForWorkflow(props, name),
    types: getItemsForWorkflow(types, name),
  });
}

export default Object.freeze({ props, workflows: Object.freeze(workflows) });
