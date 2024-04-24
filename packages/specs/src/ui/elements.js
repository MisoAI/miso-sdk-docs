import elements from './elements.yml';
import workflows from './workflows.yml';

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
    (component.component.workflows || (component.component.workflows = [])).push(workflows[container.name]);
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
  let { name, tag, slug, url, main_component } = container;
  main_component = lookup[main_component];
  slug = slug || toSlug(name);
  const components = asArray(container.components).map(({ name, ...options }) => ({ component: lookup[name], ...options }));
  return Object.assign(container, {
    slug,
    tag: tag || toTag(name),
    url: url || toUrl(slug),
    main_component,
    components,
  });
}

function shimComponent(component = {}) {
  const { name, tag, slug, url, property } = component;
  return Object.assign(component, {
    slug,
    tag: tag || toTag(name),
    url: url || toUrl(slug),
    property: property || property === false ? property : name.replaceAll('-', '_'),
  });
}

function toSlug(name) {
  return `miso-${name}`;
}

function toTag(name) {
  return `<miso-${name}>`;
}

function toUrl(slug) {
  return slug ? `/elements/${slug}/` : false;
}

function asArray(value) {
  return !value ? [] : Array.isArray(value) ? value : [value];
}
