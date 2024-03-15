---
title: Recommendation UI - quick start
---

{%- from 'macros.njk' import stackblitz_link, since with context -%}

Build your recommendation UI in simple steps:

1. Obtain your API key from Miso [dashboard](https://dojo.askmiso.com/)
2. Add Miso SDK to your webpage
3. Place Miso elements in your webpage
4. Create a Miso client instance and access the recommendation workflow

{% set step = 1 %}
{% include 'step/obtain-api-key.md' %}

{% set step = 2 %}
{% include 'step/sdk-setup.md' %}

### 3. Place Miso elements in your webpage

In your webpage, add the following elements where you want to display the recommendation results:

```html
<miso-recommendation>
  <miso-products></miso-products>
</miso-recommendation>
```

### 4. Create a Miso client instance

```js
// 1. create a Miso client instance and access the recommendation workflow
const client = new MisoClient(`${apiKey}`);
const workflow = client.ui.recommendation;

// 2. override API parameters (optional)
workflow.useApi('user_to_products', { rows: 6 }); // default: 'user_to_products', {}

// 3. use a different layout (optional)
workflow.useLayouts({
  products: 'cards' // default: 'list'
});

// 4. kick off the workflow
workflow.start();
```
