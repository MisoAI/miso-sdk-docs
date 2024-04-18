| Tag | Used in |
| --- | --- |
{%- for component in components %}
| `{{ component.tag | safe }}` | {%- for workflow in component.workflows -%}[{{ workflow.label }}]({{ workflow.url | url }}){%- if not loop.last -%}&nbsp; \| &nbsp;{%- endif -%}{%- endfor -%} |
{%- endfor -%}
