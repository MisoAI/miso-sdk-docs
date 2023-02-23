import { resolveProps } from '../utils.js';
import _groups from './groups.yml';
import _props from './props.yml';

const props = Object.freeze(_props);
const groups = resolveProps(_groups, props);

export default Object.freeze({
  props,
  groups
});
