---
title: Ask API - interactions (explore)
---

{% set workflow = specs.ui.workflows.explore %}
{% set api_name = workflow.api_names[0] %}
{% set property = workflow.properties[0] %}

{% include '../../_shared/_api-interactions-performance.md' %}

#### Examples

For example, suppose we call the API with the following response:

```js
const response = await client.api.ask.relatedQuestions(payload);

// response
{
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
  miso_id: '12345678-1234-4444-1234-123456789012'
}
```

And we want to track click interactions on the first two items from the `{{ property.name }}` property, then we send the following interaction:

```js
client.api.interactions.upload({
  type: 'click',
  miso_id: '12345678-1234-4444-1234-123456789012',
{%- if property.item_type == 'catalog' %}
  product_ids: ['{{ property.item_term }}_1', '{{ property.item_term }}_2'],
{%- endif %}
  context: {
    custom_context: {
      api_group: '{{ workflow.api_group }}',
      api_name: '{{ api_name }}',
{%- if workflow.name == 'ask' %}
      root_question_id: '...',
      question_id: '11111111-2222-4444-8888-000000000000',
{%- endif %}
      property: '{{ property.name }}',
{%- if property.item_type == 'non-catalog' %}
      items: ['{{ property.item_term }}_1', '{{ property.item_term }}_2'],
{%- endif %}
    },
  },
});
```

{% include '../../_shared/_api-interactions-references.md' %}
