import { expand } from '../helpers.js';
import { readYaml } from '../yaml.js';

const _groups = readYaml('query_api/groups.yml');
const _props = readYaml('query_api/props.yml');

const props = Object.freeze(_props);
const groups = expand(_groups, props);

export default Object.freeze({
  props,
  groups
});
