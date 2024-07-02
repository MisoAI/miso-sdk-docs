{% set container = workflow.container %}

You can customize the elements with the following API:

```js
workflow.useLayouts({
  // ...
});
```

For example, to customize the `miso-query` element:

```js
workflow.useLayouts({
  query: { /* ... */ }
});
```

The following elements are used in the {{ container.name | safe }} workflow. See their references for customization options:

| Tag | Type | Property in API response | Reference |
| --- | --- | --- | --- |
| `{{ container.tag | safe }}` | container | -- | [{{ container.slug | safe }}]({{ container.url | url }}) |
{%- for component in container.components %}
| `{{ component.tag | safe }}` | component | {%- if component.property -%}`{{ component.property }}`{%- else -%}--{%- endif -%} | {%- if component.url -%}[{{ component.slug | safe }}]({{ component.url | url }}){%- endif -%} |
{%- endfor -%}
