const workflows = {};
const containers = {};

export function addWorkflow(workflow) {
  workflows[workflow.name] = workflow;
}

export function getWorkflow(name) {
  return workflows[name];
}

export function addContainer(container) {
  containers[container.name] = container;
}

export function getContainer(name) {
  return containers[name];
}
