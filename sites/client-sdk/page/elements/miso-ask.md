---
title: Elements - <miso-ask>
---

{% set container = specs.ui.elements.ask %}

{% include './_container-intro.md' %}

```html
<miso-ask>
  <miso-query></miso-query>
  <miso-answer></miso-answer>
  <!-- ... -->
</miso-ask>
```

{% include './_container-components.md' %}

## Attributes

### `parent-question-id`

Associate to a follow-up question workflow by specifying the `parent-question-id` attribute:

```html
<miso-ask parent-question-id="...">
</miso-ask>
```

{% include './_container-attributes.md' %}
