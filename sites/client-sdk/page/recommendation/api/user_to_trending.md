---
api: user_to_trending
title: User to trending
description: Returns the products that are currently trending and are most likely to be of interest to this user.
---

#### Syntax
```js
const response = await client.api.recommendation.userToTrending(payload, options);
```

{% include 'section/sdk-query-api.md' %}

#### Examples
```js
const payload = {
  fl: ['title', 'sale_price', 'custom_attributes.*']
};
const { products } = await client.api.recommendation.userToTrending(payload);
```

#### Learn more
* For advanced usage, see [REST API](https://api.askmiso.com/#tag/Recommendation-APIs/operation/trending_items_v1_recommendation_user_to_trending_post).
* For passing user data, see [Context]({{ '/recommendation/api/context/' | url }}).
