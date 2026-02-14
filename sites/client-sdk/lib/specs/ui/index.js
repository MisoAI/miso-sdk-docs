import { readYaml } from '../yaml.js';
import elements from './elements.js';
import workflows from './workflows.js';

const askCombo = readYaml('ui/ask-combo.yml');

export default Object.freeze({
  ask: Object.freeze({
    combo: Object.freeze(askCombo),
  }),
  elements,
  workflows,
});
