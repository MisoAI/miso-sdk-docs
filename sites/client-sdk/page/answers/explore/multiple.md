---
title: Explore module - multiple units
---

{%- from 'macros.njk' import since with context -%}

Sometimes you may want to display multiple explore blocks in a single page, or have different explore blocks across your site. You can achieve this by creating multiple explore workflows with different unit IDs.

For example, specify a unit ID in the `<miso-explore>` element:

```html
<miso-explore unit-id="sidebar-1">
  <!-- ... -->
</miso-explore>
```

Then, you can access the workflow by the unit ID:

```js
// note the plural form of `explores`
const workflow = client.ui.explores.get(unitId);
```
