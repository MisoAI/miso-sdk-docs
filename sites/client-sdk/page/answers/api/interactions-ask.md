---
title: Ask API - interactions (ask)
---

{% set workflow = specs.ui.workflows.ask %}
{% set api_name = workflow.api_names[0] %}
{% set property = workflow.properties[0] %}

{% include '../../_shared/_api-interactions-performance.md' %}

#### Examples

For example, suppose we call the API with the following response:

```js
const answer = await client.api.ask.questions(payload);
for await (const response of answer) {
  // ...
}

// response
{
  question_id: '11111111-2222-4444-8888-000000000000',
  {{ property.name }}: [
{%- if property.item_type == 'catalog' %}
    { product_id: '{{ property.item_term }}_1', ... },
    { product_id: '{{ property.item_term }}_2', ... },
    { product_id: '{{ property.item_term }}_3', ... }
{%- elif property.item_type == 'non-catalog' %}
    '{{ property.item_term }}_1',
    '{{ property.item_term }}_2',
    '{{ property.item_term }}_3'
{%- endif %}
  ],
  ...
}
```

And we want to track click interactions on the first two items from the `{{ property.name }}` property, then we send the following interaction:

```js
client.api.interactions.upload({
  type: 'click',
{%- if property.item_type == 'catalog' %}
  product_ids: ['{{ property.item_term }}_1', '{{ property.item_term }}_2'],
{%- endif %}
  context: {
    custom_context: {
      api_group: '{{ workflow.api_group }}',
      api_name: '{{ api_name }}',
      root_question_id: '...',
      question_id: '11111111-2222-4444-8888-000000000000',
      property: '{{ property.name }}',
{%- if property.item_type == 'non-catalog' %}
      items: ['{{ property.item_term }}_1', '{{ property.item_term }}_2'],
{%- endif %}
    },
  },
});
```

You can also learn from [live example]({{ '/demo/latest/answers/ask/' | url }}).

{% include '../../_shared/_api-interactions-references.md' %}
