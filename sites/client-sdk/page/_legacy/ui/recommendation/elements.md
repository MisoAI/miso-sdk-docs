---
title: Recommendation UI - elements
---

{%- from 'macros.njk' import stackblitz_link with context -%}

Build a recommendation section in your webpage with the following elements:

```html
<miso-recommendation>
  <miso-products></miso-products>
</miso-recommendation>
```

### Elements

You can mix other elements into the section:

```html
<miso-recommendation>
  <h3>Recommendation Results</h3>
  <hr>
  <div>
    <miso-products></miso-products>
  </div>
</miso-recommendation>
```

To create a section of specific unit ID, put it on the attribute:

```html
<miso-recommendation unit-id="after-article-1">
  <miso-products></miso-products>
</miso-recommendation>
```

You can make the section invisible until the recommendation results are ready:

```html
<miso-recommendation visible-when="ready">
  <miso-products></miso-products>
</miso-recommendation>
```

### Layouts

You can configure the details of the Miso elements using workflow API:

```js
const workflow = client.ui.recommendation;
workflow.useLayouts({
  container: ...
  products: ...
});
```

You can find configuration details in the following sections:

* [Workflow]({{ '/ui/element/workflow/' | url }}) (`container`)
* [Collections]({{ '/ui/element/collections/' | url }}) (`results`)
