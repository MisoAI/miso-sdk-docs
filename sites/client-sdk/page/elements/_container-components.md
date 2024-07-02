## Components

The following table lists the components that are available in the container. Each component either associates to a property in the API response or some input element.

| Tag | Property in API response | Description |
| --- | --- | --- |
{%- for component in container.components %}
| `{{ component.tag | safe }}` | {%- if component.property -%}`{{ component.property }}`{%- else -%}--{%- endif -%} |
{%- endfor -%}
