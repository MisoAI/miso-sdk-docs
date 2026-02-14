import { expand } from '../helpers.js';
import { readYaml } from '../yaml.js';

const _groups = readYaml('data_api/groups.yml');
const _props = readYaml('data_api/props.yml');

const props = Object.freeze(_props);
const groups = expand(_groups, props);

export default Object.freeze({
  props,
  groups
});
