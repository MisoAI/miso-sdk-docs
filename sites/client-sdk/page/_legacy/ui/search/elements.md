---
title: Search UI - elements
---

{%- from 'macros.njk' import stackblitz_link with context -%}

Integrate search function in your webpage with the following elements:

```html
<!-- Place this section where you want the search box to be -->
<miso-search>
  <miso-query></miso-query>
</miso-search>

<!-- Place this section where you want to display search results -->
<miso-search>
  <miso-products></miso-products>
</miso-search>
```

### Elements

You can mix other elements into the section:

```html
<miso-search>
  <h3>Search Results</h3>
  <hr>
  <div>
    <miso-products></miso-products>
  </div>
</miso-search>
```

You can make the section invisible until the search results are ready:

```html
<miso-search visible-when="ready">
  <miso-products></miso-products>
</miso-search>
```

### Layouts

You can configure the details of the Miso elements using workflow API:

```js
const workflow = client.ui.search;
workflow.useLayouts({
  container: ...
  results: ...
});
```

You can find configuration details in the following sections:

* [Workflow]({{ '/ui/element/workflow/' | url }}) (`container`)
* [Collections]({{ '/ui/element/collections/' | url }}) (`results`)
