import workflows from './workflows.yml';
import events from './events.js';

console.log(events);

for (const name in workflows) {
  const workflow = workflows[name];
  workflow.name = name;
  for (const api of workflow.context.apis) {
    api.api_name_camel_case = snakeToCamel(api.api_name);
  }
  workflow.context.events = events[name];
}

export default Object.freeze(workflows);

function snakeToCamel(str) {
  return str.replace(/_([a-z])/g, g => g[1].toUpperCase());
}
