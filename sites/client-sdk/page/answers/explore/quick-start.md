---
title: Explore module - quick start
---

{%- from 'macros.njk' import stackblitz_link, since with context -%}

Build your explore module in simple steps:

1. Obtain your API key from Miso [dashboard](https://dojo.askmiso.com/)
2. Add Miso SDK to your webpage
3. Place Miso elements in your webpage
4. Configure the `explore` workflow

{% set step = 1 %}
{% include 'step/obtain-api-key.md' %}

{% set step = 2 %}
{% include 'step/sdk-setup.md' %}

### 3. Place Miso elements in your webpage

In an article page of your webpage, add the following elements where you want to display the related questions:

```html
<miso-explore>
  <miso-related-questions></miso-related-questions>
  <!-- <miso-query> support is available since 1.9.1 -->
  <miso-query></miso-query>
</miso-explore>
```

### 4. Configure the `explore` workflow

There are two pieces of information that the `explore` workflow needs to know:
1. `product_id` of the article, so that it can tell Miso API which article to generate questions against.
2. How to get to the answers page given a question, so that it can generate links for the question items.

```js
// 1. create a Miso client instance and access the explore workflow
const client = new MisoClient(`${apiKey}`);
const workflow = client.ui.explore;

// 2. tell the workflow which article you want to generate questions against
//    the product_id must match the ones in your catalog
workflow.useApi({
  product_id: 'product_id_of_the_article',
});

// 3. tell the workflow how to get to the answers page given a question
//    the path must match the path of the answers page in your website
workflow.useLink(question => `/answers?q=${encodeURIComponent(question)}`);

// 4. kick off the workflow
workflow.start();
```
