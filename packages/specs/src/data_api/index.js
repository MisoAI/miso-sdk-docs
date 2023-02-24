import { expand } from '../helpers.js';
import _groups from './groups.yml';
import _props from './props.yml';

const props = Object.freeze(_props);
const groups = expand(_groups, props);

export default Object.freeze({
  props,
  groups
});
