---
title: Explore module - configuration
---

{%- from 'macros.njk' import since with context -%}

This page documents the configuration options available for the explore module.

### Configure the number of questions

You can configure the number of questions to display in the explore module using the `rows` parameter in the `useApi` method. The default value is 5.

```js
workflow.useApi({
  product_id: 'product_id_of_the_article',
  rows: 3 // default is 5
});
```

### Notes

- The actual number of questions displayed may be less than the specified rows if there are not enough questions available
