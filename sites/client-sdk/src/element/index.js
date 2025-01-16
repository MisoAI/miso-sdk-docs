import { default as MisoSdkHtmlTemplateElement } from './miso-sdk-html-template.js';

function defineAndUpgrade(elementClass) {
  const { tagName } = elementClass;
  if (!customElements.get(tagName)) {
    customElements.define(tagName, elementClass);
  }
  for (const element of document.querySelectorAll(tagName)) {
    customElements.upgrade(element);
  }
}

const ELEMENT_CLASSES = [
  MisoSdkHtmlTemplateElement,
];

for (const elementClass of ELEMENT_CLASSES) {
  defineAndUpgrade(elementClass);
}
