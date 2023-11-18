---
title: Ask - quick start
---

{%- from 'macros.njk' import stackblitz_link with context -%}

You can integrate Miso ask API in your website with a few simple steps:

1. Obtain your API key from Miso [dashboard](https://dojo.askmiso.com/)
2. Add Miso SDK to your webpage
3. Place Miso elements in your webpage
4. Configure the `ask` workflow

{#
#### Live demo

{{ stackblitz_link('1.9/ui/ask/custom/quick-start') }}
#}

{% set step = 1 %}
{% include 'step/obtain-api-key.md' %}

{% set step = 2 %}
{% include 'step/sdk-setup.md' %}

### 3. Place Miso elements in your webpage

In your webpage, add the following elements where you want to display the answer:

```html
<miso-ask>
  <!-- search box -->
  <miso-query></miso-query>
</miso-ask>

<miso-ask visible-when="ready">
  <div>You asked about...</div>
  <!-- question text -->
  <miso-question></miso-question>
  <hr>

  <!-- answer text -->
  <miso-answer></miso-answer>
  <!-- feedback buttons -->
  <miso-feedback></miso-feedback>
  <hr>

  <div>My reply is based on the following:</div>
  <!-- references in the answer -->
  <miso-sources></miso-sources>
  <hr>

  <div>Go beyond, and learn more about this topic:</div>
  <!-- articles for further reading -->
  <miso-related-resources></miso-related-resources>
</miso-ask>
```

You can arrange the elements or modify the styles to fit your website. See [elements]({{ '/ui/ask/elements/' | url }}) section for details.

### Create a Miso client instance

In your script, create a Miso client:

```js
// when the SDK is loaded asynchronously, use this pattern to access window.MisoClient
const misocmd = window.misocmd || (window.misocmd = []);
misocmd.push(() => {
  // turn on the UI plugin
  MisoClient.plugins.use('std:ui');
  // create a Miso client instance to enable ask workflow
  new MisoClient(`${apiKey}`);
});
```
