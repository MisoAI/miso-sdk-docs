## Components

The following table lists the components that are available in the container. Each component either associates to a property in the API response or some input element.

| Tag | Property in API response | Description |
| --- | --- | --- |
{%- for en in workflow.components %}
| `{{ en.component.tag | safe }}` | {%- if en.component.property -%}`{{ en.component.property }}`{%- else -%}--{%- endif -%} |
{%- endfor -%}
