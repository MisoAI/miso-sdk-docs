## Performance events

To generate performance measurement data for analytics, you can send the following events to Miso API:

* Impression
* Viewable impression
* Click

See [Performance measurement]({{ '/advanced/performance/' | url }}) for detailed definitions.

#### Syntax

To send an event using SDK that works with analytics, specifying `api_group`, `api_name`, and `property` in `custom_context` is required.

```js
client.api.interactions.upload({
  type: 'impression', // or 'viewable_impression', 'click'
  product_ids: [...], // if subjects are catalog items
  context: {
    custom_context: {
      api_group: '{{ workflow.context.api_group }}',
      api_name: {% for api in workflow.context.apis -%}'{{ api.api_name }}'{{ ', ' if not loop.last or loop.first }}{{ '// or ' if loop.first and not loop.last }}{%- endfor %}
{%- if workflow.name == 'ask' %}
      question_id: '...',
      root_question_id: '...',
{%- endif %}
      property: '...',
      items: [...], // if subjects are not catalog items
    },
  },
});
```

| Parameter | Type | Description |
| --- | --- | --- |
| `type` | string | Event type: `impression`, `viewable_impression`, or `click`. |
| `product_ids` | array of strings | Product ids of the event subjects |
| `items` | array of strings | Event subjects (when they are not catalog items) |
| `api_group` | string | The first segment of API path, in snake case |
| `api_name` | string | The second segment of API path, in snake case |
{%- if workflow.name == 'ask' %}
| `question_id` | string | The question id in ask API response |
| `root_question_id` | string | The question id of the first question in question sequence. It is different from `question_id` only when the question is a follow-up one. |
{%- endif %}
| `property` | string | The property name of the event subjects, which corresponds to the API response |

#### API and key properties

| API | Property | Is catalog item? |
| --- | --- | --- |
{%- for api in workflow.context.apis %}
{%- for property in api.properties %}
| {% if loop.first %}`{{ api.api_name }}`{% endif %} | `{{ property.name }}` | {% if property.in_catalog %}✓{% else %}✗{% endif %} |
{%- endfor %}
{%- endfor %}

{% set api = workflow.context.apis[0] %}
{% set property = api.properties[0] %}

#### Examples

For example, suppose we call the API with the following response:

```js
{%- if workflow.name == 'ask' %}
const answer = await client.api.ask.questions(payload);
for await (const response of answer) {
  // ...
}
{%- else %}
const response = await client.api.{{ workflow.context.api_group }}.{{ api.api_name_camel_case }}(payload);
{%- endif %}

// response
{
{%- if workflow.name == 'ask' %}
  question_id: '11111111-2222-4444-8888-000000000000',
{%- endif %}
  {{ property.name }}: [
{%- if property.in_catalog %}
    { product_id: '{{ property.item_term }}_1', ... },
    { product_id: '{{ property.item_term }}_2', ... },
    { product_id: '{{ property.item_term }}_3', ... }
{%- else %}
    '{{ property.item_term }}_1',
    '{{ property.item_term }}_2',
    '{{ property.item_term }}_3'
{%- endif %}
  ],
  ...
}
```

And we want to track click events on the first two items from the `{{ property.name }}` property, then we send the following interaction:

```js
client.api.interactions.upload({
  type: 'click',
{%- if property.in_catalog %}
  product_ids: ['{{ property.item_term }}_1', '{{ property.item_term }}_2'],
{%- endif %}
  context: {
    custom_context: {
      api_group: '{{ workflow.context.api_group }}',
      api_name: '{{ api.api_name }}',
{%- if workflow.name == 'ask' %}
      root_question_id: '...',
      question_id: '11111111-2222-4444-8888-000000000000',
{%- endif %}
      property: '{{ property.name }}',
{%- if not property.in_catalog %}
      items: ['{{ property.item_term }}_1', '{{ property.item_term }}_2'],
{%- endif %}
    },
  },
});
```

{%- if workflow.name == 'ask' %}
You can also learn from [live example]({{ '/demo/latest/answers/ask/' | url }}).
{%- endif %}
