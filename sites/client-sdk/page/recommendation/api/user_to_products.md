---
api: user_to_products
title: User to products
description: Returns the products that are most likely to drive conversion for the given user.
---

#### Syntax
```js
const response = await client.api.recommendation.userToProducts(payload, options);
```

{% include 'section/sdk-query-api.md' %}

#### Examples
```js
const payload = {
  fl: ['title', 'sale_price', 'custom_attributes.*']
};
const { products } = await client.api.recommendation.userToProducts(payload);
```

#### Learn more
* For advanced usage, see [REST API](https://api.askmiso.com/#tag/Recommendation-APIs/operation/user_to_products_v1_recommendation_user_to_products_post).
* For passing user data, see [Context]({{ '/recommendation/api/context/' | url }}).
