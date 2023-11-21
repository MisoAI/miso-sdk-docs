---
title: Ask module (standard) - quick start
---

{%- from 'macros.njk' import stackblitz_link with context -%}

Build your ask module in simple steps:

1. Obtain your API key from Miso [dashboard](https://dojo.askmiso.com/)
2. Add Miso SDK to your webpage
3. Place an element in your webpage

#### Live demo

{{ stackblitz_link('1.9/answers/ask/standard/basic') }}

{% set step = 1 %}
{% include 'step/obtain-api-key.md' %}

{% set step = 2 %}
{% include 'step/sdk-setup-with-api-key.md' %}

### 3. Place an element in your webpage

In your webpage, add the following elements where you want to display the ask module:

```html
<body>
  <miso-ask-combo></miso-ask-combo>
</body>
```

## Customization

* [Configuration]({{ '/answers/ask/custom/configuration/' | url }})
* [CSS Styles]({{ '/answers/ask/custom/styles/' | url }})
