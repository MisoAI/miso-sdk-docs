The UI plugin of SDK sends user interactions to Miso API for analytics automatically. You can send interactions manually if needed.

#### Syntax

```js
client.api.interactions.upload({
  type: 'impression', // or 'viewable_impression', 'click', 'submit'
{%- if workflow.name == 'ask' %}
  product_ids: [...], // if subjects are catalog items
{%- endif %}
{%- if workflow.name != 'ask' %}
  miso_id: '...', // miso_id from API response
{%- endif %}
  context: {
    custom_context: {
      api_group: '{{ workflow.api_group }}',
      api_name: {% for api_name in workflow.api_names -%}'{{ api_name }}'{{ ', ' if not loop.last or loop.first }}{{ '// or ' if loop.first and not loop.last }}{%- endfor %}
      property: '...',
      items: [...], // if subjects are not catalog items
{%- if workflow.name == 'ask' %}
      question_id: '...',
      root_question_id: '...',
{%- endif %}
    },
  },
});
```

#### API names

{%- for api_name in workflow.api_names %}
* `{{ api_name }}`
{%- endfor %}

#### Properties

The property field in the interaction payload refers to the subject of the interaction. It usually corresponds to a field in the API response with a few exceptions.

| Property | Associated required field | Interactions |
| --- | --- | --- |
{%- for property in workflow.properties %}
| `{{ property.name }}` | {% if property.item_type == 'catalog' %}`product_ids`{% elif property.item_type == 'non-catalog' %}`context.custom_context.items`{% elif property.item_type == 'itemless' %}--{% endif %} | `{{ property.interaction_types | join('`, `') }}` |
{%- endfor %}

{%- if workflow.name == 'explore' %}
* The property `container` refers to the entire explore unit section. The purpose of tracking `container` is to keep track of the data when the API response is empty or in a scenario where the user does not send an API request (e.g. search bar only).
* In the analytics, the CTR of submit is defined as `query`'s `submit` divided by `container`'s `impression`. Vice versa for vCTR, it is `query`'s `submit` divided by `container`'s `viewable_impression`.
{%- endif %}

#### Interaction types

| Type | Definition |
| --- | --- |
{%- for type in specs.interactions.workflows[workflow.name].types %}
| `{{ type.name }}` | {{ type.desc | trim }} |
{%- endfor %}

* See [performance measurement]({{ '/advanced/performance/' | url }}) for the detailed definitions and metrics of CTR, vCTR, and view rate.

#### Interaction payload fields

Top-level fields:

| Field | Type | Required | Description |
| --- | --- | --- | --- |
{%- for prop in specs.interactions.workflows[workflow.name].props %}
{%- if not prop.parent %}
| `{{ prop.key }}` | {{ prop.type }} | {% if prop.required %}✓{% endif %} | {{ prop.desc | trim }} |
{%- endif %}
{%- endfor %}

Fields under `context.custom_context`:

| Field | Type | Required | Description |
| --- | --- | --- | --- |
{%- for prop in specs.interactions.workflows[workflow.name].props %}
{%- if prop.parent == 'context.custom_context' %}
| `{{ prop.key }}` | {{ prop.type }} | {% if prop.required %}✓{% endif %} | {{ prop.desc | trim }} |
{%- endif %}
{%- endfor %}
