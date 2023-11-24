import elements from './elements.yml';

let { containers, components, ...rest } = elements;
const lookup = {};

components = components.map(shimComponent);
for (const component of components) {
  lookup[component.name] = component;
}

containers = containers.map(shimContainer);
for (const container of containers) {
  for (const component of container.components) {
    component.container = container;
  }
  lookup[container.name] = container;
}

export default Object.freeze({
  containers,
  components,
  lookup,
  ...rest,
});

function shimContainer(container = {}) {
  const { name, tag } = container;
  const components = asArray(container.components).map(({ name, ...options }) => ({ component: lookup[name], ...options }));
  const mains = components.filter(c => c.main);
  return Object.assign(container, {
    tag: tag || asTag(name),
    components,
    mains,
  });
}

function shimComponent(component = {}) {
  const { name, tag, property } = component;
  return Object.assign(component, {
    tag: tag || asTag(name),
    property: property || property === false ? property : name.replaceAll('-', '_'),
  });
}

function asTag(name) {
  return `<miso-${name}>`;
}

function asArray(value) {
  return !value ? [] : Array.isArray(value) ? value : [value];
}
