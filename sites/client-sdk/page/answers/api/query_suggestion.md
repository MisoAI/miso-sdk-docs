---
api: query_suggestion
title: Ask API - query suggestion
description: Generate query suggestions based on a partial query string.
---

{%- from 'macros.njk' import since with context -%}

{{ since('1.13.1') }}

#### Syntax
```js
const response = await client.api.ask.querySuggestion(payload, options);
```

{% include 'section/sdk-query-api.md' %}

#### Examples
```js
const payload = {
  q: '...'
};
const { completions } = await client.api.ask.querySuggestion(payload);
for (const text of completions) {
  // ...
}
```
