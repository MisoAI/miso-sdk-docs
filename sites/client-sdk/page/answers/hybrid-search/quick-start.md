---
title: Hybrid search module - quick start
---

{%- from 'macros.njk' import stackblitz_link with context -%}

1. Obtain your API key from Miso [dashboard](https://dojo.askmiso.com/)
2. Add Miso SDK to your webpage
3. Place Miso elements in your webpage
4. Configure the workflows

{% set step = 1 %}
{% include 'step/obtain-api-key.md' %}

{% set step = 2 %}
{% include 'step/sdk-setup.md' %}

### 3. Place an element in your webpage

In your webpage, add the following elements where you want to display the hybrid search module:

```html
<body>
  <div id="miso-hybrid-search-combo" class="miso-hybrid-search-combo"></div>
</body>
```

### 4. Configure the workflows

Configure the workflows as the following:

```js
const misocmd = window.misocmd || (window.misocmd = []);
misocmd.push(async () => {
  // setup client
  const MisoClient = window.MisoClient;
  const client = new MisoClient('your_api_key');
  const workflow = client.ui.hybridSearch;

  // wait for styles to be loaded
  await client.ui.ready;

  // render DOM and get element references
  const defaults = MisoClient.ui.defaults.hybridSearch;
  const templates = defaults.templates;

  const rootElement = document.querySelector('#miso-hybrid-search-combo');
  rootElement.innerHTML = templates.root();

  // start query if specified in URL parameters
  workflow.autoQuery();
});
```

* See [template helpers]({{ '/answers/hybrid-search/templates/' | url }}) for template customization.

