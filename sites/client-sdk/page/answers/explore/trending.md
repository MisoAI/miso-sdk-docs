---
title: Explore module - trending questions
---

{%- from 'macros.njk' import since with context -%}

### Retrieve trending questions

{{ since('1.11.6') }}

You can retrieve trending questions using the `useApi` method.

```js
workflow.useApi('trending_questions');
```

* Note that your don't need to specify `product_id` in the API payload for trending questions.

To specify extra API parameters, you can pass an object as the second argument to the `useApi` method.

```js
workflow.useApi('trending_questions', {
  /* ... */
});
```
