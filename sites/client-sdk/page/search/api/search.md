---
api: search
title: Search
description: Perform a personalized, typo-correcting, semantic search.
---

#### Syntax
```js
const response = await client.api.search.search(payload, options);
```

{% include 'section/sdk-query-api.md' %}

#### Examples
```js
const payload = {
  q: 'doge',
  fl: ['title', 'sale_price', 'custom_attributes.*']
};
const { products } = await client.api.search.search(payload);
```

#### Learn more
* For advanced usage, see [REST API](https://api.askmiso.com/#tag/Search-APIs/operation/search_v1_search_search_post).
* For passing user data, see [Context]({{ '/search/api/context/' | url }}).
