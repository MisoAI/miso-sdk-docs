---
api: autocomplete
title: Autocomplete
description: Provides real-time, personalized, typo resistant typeahead for your search bar.
---

#### Syntax
```js
const response = await client.api.search.autocomplete(payload, options);
```

{% include 'section/sdk-query-api.md' %}

#### Examples
```js
const payload = {
  q: 'shiba ',
  fl: ['title', 'sale_price'],
  completion_fields: ['title', 'tags', 'custom_attributes.author']
};
const { completions } = await client.api.search.autocomplete(payload);
for (const { text, text_with_markups, product } of completions.title) {
  // ...
}
```

#### Learn more
* For advanced usage, see [REST API](https://api.askmiso.com/#tag/Search-APIs/operation/autocomplete_v1_search_autocomplete_post).
* For passing user data, see [Context]({{ '/search/api/context/' | url }}).
