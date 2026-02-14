import { readYaml } from '../yaml.js';
import events from './events.js';
import { getContainer, addWorkflow } from '../relations.js';

const _workflows = readYaml('ui/workflows.yml');

class Workflow {

  constructor({ apis, ...args }) {
    apis = apis.map(args => ({
      ...args,
      api_name_camel_case: snakeToCamel(args.api_name),
    }));
    Object.assign(this, {
      ...args,
      apis,
    });
    Object.freeze(this);
    addWorkflow(this);
  }

  get container() {
    return getContainer(this.name);
  }

  get components() {
    return this.container.components;
  }

}

const workflows = {};

for (const workflow of _workflows) {
  workflows[workflow.name] = new Workflow({
    ...workflow,
    events: events[workflow.name],
  });
}

function snakeToCamel(str) {
  return str.replace(/_([a-z])/g, g => g[1].toUpperCase());
}

export default Object.freeze(workflows);
