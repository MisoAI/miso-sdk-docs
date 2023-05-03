---
title: Recommendation UI - elements
---

{%- from 'macros.njk' import stackblitz_link with context -%}

Build a recommendation section in your webpage with the following elements:

```html
<miso-recommendation>
  <miso-results></miso-results>
</miso-recommendation>
```

### Elements

You can mix other elements into the section:

```html
<miso-recommendation>
  <h3>Recommendation Results</h3>
  <hr>
  <div>
    <miso-results></miso-results>
  </div>
</miso-recommendation>
```

To create a section of specific unit ID, put it on the attribute:

```html
<miso-recommendation unit-id="after-article-1">
  <miso-results></miso-results>
</miso-recommendation>
```

You can make the section invisible until the recommendation results are ready:

```html
<miso-recommendation visible-when="ready">
  <miso-results></miso-results>
</miso-recommendation>
```

### Layouts

You can configure the details of the Miso elements using workflow API:

```js
const workflow = client.ui.recommendation.get();
workflow.useLayouts({
  container: ...
  results: ...
});
```

You can find configuration details in the following sections:

* [Workflow]({{ '/ui/element/workflow/' | url }}) (`container`)
* [Collections]({{ '/ui/element/collections/' | url }}) (`results`)
