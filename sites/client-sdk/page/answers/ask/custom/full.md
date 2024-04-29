---
title: Ask module (custom) - full implementation
---

{%- from 'macros.njk' import stackblitz_link with context -%}

1. Obtain your API key from Miso [dashboard](https://dojo.askmiso.com/)
2. Add Miso SDK to your webpage
3. Place Miso elements in your webpage
4. Configure the workflows

#### Live demo

{{ stackblitz_link('1.9/ask/custom/full') }}

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

* See the [implementation](https://github.com/MisoAI/miso-client-js-sdk/blob/main/packages/client-sdk-ui/src/defaults/ask/controls.js) of the helper functions `wireFollowUps` and `wireRelatedResources` for more details.

## Default templates

For your reference, the default templates used in the implementation above are equivalent to the following:

#### Root

The `root` template is a function that returns the following HTML:

```html
<section id="miso-ask-combo__question" class="miso-ask-combo__section miso-ask-combo__question">
  <miso-ask class="miso-ask-combo__query-container">
    <miso-query></miso-query>
  </miso-ask>
</section>
<section class="miso-ask-combo__section miso-ask-combo__answer">
  <miso-ask class="miso-ask-combo__answer-container miso-circled-citation-index" logo="false" visible-when="ready">
    <div class="miso-ask-combo__phrase miso-ask-combo__question-phrase">You asked...</div>
    <miso-question></miso-question>
    <miso-answer></miso-answer>
    <miso-feedback></miso-feedback>
  </miso-ask>
  <miso-ask class="miso-ask-combo__sources-container miso-circled-citation-index" logo="false" visible-when="nonempty">
    <hr>
    <h3 class="miso-ask-combo__phrase miso-ask-combo__sources-phrase">My reply is based on the following</h3>
    <miso-sources></miso-sources>
  </miso-ask>
  <miso-ask class="miso-ask-combo__bottom-spacing-container" visible-when="ongoing"></miso-ask>
</section>
<div id="miso-ask-combo__follow-ups" class="miso-ask-combo__follow-ups"></div>
<section id="miso-ask-combo__related-resources" class="miso-ask-combo__section miso-ask-combo__related-resources">
  <miso-ask visible-when="nonempty" logo="true">
    <h2 class="miso-ask-combo__phrase miso-ask-combo__related-resources-phrase">Go beyond, and learn more about this topic</h2>
    <miso-related-resources></miso-related-resources>
  </miso-ask>
</section>
```

#### Follow-up

The `followUp` template is a function that returns the following HTML:

```html
<section class="miso-ask-combo__section miso-ask-combo__follow-up">
  <miso-ask class="miso-ask-combo__query-suggestions-container" visible-when="initial+nonempty" parent-question-id="${parentQuestionId}">
    <h3 class="miso-ask-combo__phrase miso-ask-combo__related-questions-phrase">Related questions you can explore</h3>
    <miso-query-suggestions></miso-query-suggestions>
  </miso-ask>
  <miso-ask class="miso-ask-combo__query-container" visible-when="initial loading" parent-question-id="${parentQuestionId}">
    <miso-query></miso-query>
  </miso-ask>
  <miso-ask class="miso-ask-combo__answer-container miso-circled-citation-index" logo="false" visible-when="ready" parent-question-id="${parentQuestionId}">
    <hr>
    <div class="miso-ask-combo__phrase miso-ask-combo__question-phrase">You asked...</div>
    <miso-question></miso-question>
    <miso-answer></miso-answer>
    <miso-feedback></miso-feedback>
  </miso-ask>
  <miso-ask class="miso-ask-combo__sources-container miso-circled-citation-index" logo="false" visible-when="nonempty" parent-question-id="${parentQuestionId}">
    <hr>
    <h3 class="miso-ask-combo__phrase miso-ask-combo__sources-phrase">My reply is based on the following</h3>
    <miso-sources></miso-sources>
  </miso-ask>
  <miso-ask class="miso-ask-combo__bottom-spacing-container" visible-when="ongoing" parent-question-id="${parentQuestionId}"></miso-ask>
</section>
```

## Customization

* Styles
* Visibility
* Logo
* Components
