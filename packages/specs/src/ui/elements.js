import _elements from './elements.yml';
import { addContainer, getWorkflow } from './relations.js';

const containerToComponents = {};
const componentToContainers = {};
const elements = {};

class Container {

  constructor({ components = [], ...args }) {
    let { name, tag, slug, url, main_component } = args;
    tag = tag || toTag(name);
    slug = slug || toSlug(name);
    url = url || toUrl(slug);
    main_component = elements[main_component];
    Object.assign(this, { ...args, tag, slug, url, main_component });
    Object.freeze(this);
    addContainer(this);
  }

  get components() {
    return (containerToComponents[this.name] || []).map(name => elements[name]);
  }

  get workflow() {
    return getWorkflow(this.name);
  }

}

class Component {
  
  constructor(args) {
    let { name, slug, tag, url, property } = args;
    tag = tag || toTag(name);
    url = url || toUrl(slug);
    property = property || property === false ? property : name.replaceAll('-', '_');
    Object.assign(this, { ...args, tag, url, property });
    Object.freeze(this);
  }

  get containers() {
    return (componentToContainers[this.name] || []).map(name => elements[name]);
  }

  get workflows() {
    return this.containers.map(container => container.workflow);
  }

}

let { containers, components } = _elements;

for (const { name: container, components } of containers) {
  (containerToComponents[container] || (containerToComponents[container] = [])).push(...components);
  for (const component of components) {
    (componentToContainers[component] || (componentToContainers[component] = [])).push(container);
  }
}

for (const component of components) {
  elements[component.name] = new Component(component);
}

for (const container of containers) {
  elements[container.name] = new Container(container);
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

export default Object.freeze(elements);
