---
title: Search UI - configure API
---

{%- from 'macros.njk' import stackblitz_link, since with context -%}

You can configure the base API payload for the search workflow:

```js
const workflow = client.ui.search;
workflow.useApi(payload);
```

For example, to make the API return `8` products instead of the default value:

```js
workflow.useApi({ rows: 8 });
```

When user submit a keyword `shiba`, the API payload will be:

```json
{
  "q": "shiba",
  "rows": 8
}
```

See the [API reference]({{ '/search/api/search/' | url }}) for more payload options.
