---
title: Ask module - quick start
---

{%- from 'macros.njk' import stackblitz_link with context -%}

1. Obtain your API key from Miso [dashboard](https://dojo.askmiso.com/)
2. Add Miso SDK to your webpage
3. Place Miso elements in your webpage
4. Configure the workflows

#### Live demo

{{ stackblitz_link('1.9/answers/ask/custom/full') }}

{% set step = 1 %}
{% include 'step/obtain-api-key.md' %}

{% set step = 2 %}
{% include 'step/sdk-setup.md' %}

### 3. Place an element in your webpage

In your webpage, add the following elements where you want to display the ask module:

```html
<body>
  <div id="miso-ask-combo" class="miso-ask-combo"></div>
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
  const rootWorkflow = client.ui.ask;

  // wait for styles to be loaded
  await client.ui.ready;

  // render DOM and get element references
  // default templates are available since v1.9.1
  // wireFollowUps() and wireRelatedResources() are available since v1.9.9
  const defaults = MisoClient.ui.defaults.ask;
  const templates = defaults.templates;
  const wireFollowUps = defaults.wireFollowUps;
  const wireRelatedResources = defaults.wireRelatedResources;

  const rootElement = document.querySelector('#miso-ask-combo');
  rootElement.innerHTML = templates.root();

  // setup workflows
  wireFollowUps(client, rootElement.querySelector(`.miso-ask-combo__follow-ups`));
  wireRelatedResources(client, rootElement.querySelector(`.miso-ask-combo__related-resources`));

  // start query if specified in URL parameters
  rootWorkflow.autoQuery();
});
```

* See [template helpers]({{ '/answers/ask/templates/' | url }}) for template customization.
* See the [implementation](https://github.com/MisoAI/miso-client-js-sdk/blob/main/packages/client-sdk-ui/src/defaults/ask/controls.js) of the logic helper functions `wireFollowUps` and `wireRelatedResources` for more details.
