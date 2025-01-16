import { prettify as _prettify, minify as _minify } from 'htmlfy';
import { getMisoClient } from '../client.js';

function processHtml(html, { minify = false } = {}) {
  html = _minify(html).trim();
  if (!minify) {
    html = _prettify(html);
  }
  html = html.replace(/“\s+/g, '“').replace(/\s+”/g, '”');
  html = html.replaceAll(/<\/miso-total>\s+/g, '</miso-total> '); // TODO: extract for hybrid search only
  return html;
}

export default class MisoSdkHtmlTemplateElement extends HTMLElement {

  static get tagName() {
    return 'miso-sdk-html-template';
  }

  static get observedAttributes() {
    return ['request'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  async render() {
    window.MisoClient ? this._render() : this._requestRender();
  }

  async _requestRender() {
    if (this._renderRequested) {
      return;
    }
    this._renderRequested = true;
    await getMisoClient();
    this._render();
  }

  async _render() {
    const request = this.getAttribute('request') || undefined;
    const source = processHtml(new Function(`return window.MisoClient.${request};`)());
    const highlighted = window.Prism.highlight(source, window.Prism.languages.html, 'html');
    this.innerHTML = `<pre class="language-html"><code class="language-html">${highlighted}</code></pre>`;
  }

}
