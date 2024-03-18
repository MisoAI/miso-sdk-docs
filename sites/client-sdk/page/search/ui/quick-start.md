---
title: Search UI - quick start
---

{%- from 'macros.njk' import stackblitz_link, since with context -%}

Build your search UI in simple steps:

1. Obtain your API key from Miso [dashboard](https://dojo.askmiso.com/)
2. Add Miso SDK to your webpage
3. Place Miso elements in your webpage
4. Create a Miso client instance

{% set step = 1 %}
{% include 'step/obtain-api-key.md' %}

{% set step = 2 %}
{% include 'step/sdk-setup.md' %}

### 3. Place Miso elements in your webpage

In an article page of your webpage, add the following elements for search box:

```html
<miso-search>
  <!-- search box -->
  <miso-query></miso-query>
</miso-search>
```

Add the following elements for search results:

```html
<miso-search>
  <!-- results -->
  <miso-products></miso-products>
</miso-search>
```

### 4. Create a Miso client instance

```js
// 1. create a Miso client instance
const client = new MisoClient(`${apiKey}`);
```
