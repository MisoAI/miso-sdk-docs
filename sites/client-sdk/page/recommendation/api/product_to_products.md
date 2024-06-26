---
api: product_to_products
title: Product to products
description: Returns the products that are related to an anchor product (often the product the user is currently engaging with) and are also likely to drive conversions by connecting with the user’s interests. 
---

#### Syntax
```js
const response = await client.api.recommendation.productToProducts(payload, options);
```

{% include 'section/sdk-query-api.md' %}

#### Examples
```js
const payload = {
  product_id: '...',
  buy_together: true,
  fl: ['title', 'sale_price', 'custom_attributes.*']
};
const { products } = await client.api.recommendation.productToProducts(payload);
```

#### Learn more
* For advanced usage, see [REST API](https://api.askmiso.com/#tag/Recommendation-APIs/operation/product_to_products_v1_recommendation_product_to_products_post).
* For passing user data, see [Context]({{ '/recommendation/api/context/' | url }}).
