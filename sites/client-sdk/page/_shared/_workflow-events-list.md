### Events

| Name | Properties | Triggered when |
| --- | --- | --- |
{%- for event in workflow.context.events %}
| `{{ event.name }}` | {% for property in event.properties %}{% if not loop.first %}, {% endif %}`{{ property.name }}`{% endfor %} | {{ event.definition }} |
{%- endfor %}

* The session will always result in either a `done`, `interrupt`, or `error` event.
* Following the three types of event, the session then always ends with a `finally` event.
