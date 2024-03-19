---
title: Recommendation UI - multiple units
---

{%- from 'macros.njk' import stackblitz_link, since with context -%}

Sometimes you may want to display multiple recommendation blocks in a single page, or have different types of recommendation blocks across your site. You can achieve this by creating multiple recommendation workflows with different unit IDs.

For example, specify a unit ID in the `<miso-recommendation>` element:

```html
<miso-recommendation unit-id="after-article-1">
  <!-- ... -->
</miso-recommendation>
```

Then, you can access the workflow by the unit ID:

```js
// note the plural form of `recommendations`
const workflow = client.ui.recommendations.get(unitId);
```
