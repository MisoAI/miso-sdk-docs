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

The following elements are used in the {{ workflow.name | safe }} workflow. See their references for customization options:

| Tag | Type | Property in API response | Reference |
| --- | --- | --- | --- |
| `{{ workflow.tag | safe }}` | container | -- | [{{ workflow.slug | safe }}]({{ workflow.url | url }}) |
{%- for en in workflow.components %}
| `{{ en.component.tag | safe }}` | component | {%- if en.component.property -%}`{{ en.component.property }}`{%- else -%}--{%- endif -%} | {%- if en.component.url -%}[{{ en.component.slug | safe }}]({{ en.component.url | url }}){%- endif -%} |
{%- endfor -%}
