---
title: Elements - <miso-recommendation>
---

{% set container = specs.ui.elements.recommendation %}

{% include './_container-intro.md' %}

```html
<miso-recommendation>
  <miso-products></miso-products>
</miso-recommendation>
```

{% include './_container-components.md' %}

## Attributes

### `unit-id`

Specify unit ID for [multiple recommendation units]({{ '/recommendation/ui/multiple/' | url }}).

```html
<miso-recommendation unit-id="after-article-1">
  <!-- ... -->
</miso-recommendation>
```

{% include './_container-attributes.md' %}
