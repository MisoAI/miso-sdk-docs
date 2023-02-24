---
title: Upload catalog
description: Upload catalog data to Miso dataset.
---

{% from 'macros.njk' import proptable %}

#### Syntax
```js
await client.api.products.upload(products, options);
```

#### Parameters
The `products` parameter can be:
* An object, representing a single catalog item
* An array of objects, representing multiple items
* A JSON string of array of objects

A single record of catalog item can have the following properties:

{{ proptable('data_api', 'products.upload.payload') }}

#### Options
The `options` parameter is an optional object with the following properties:

{{ proptable('data_api', 'products.upload.options') }}

See the [request options page]({{ '/sdk/request-options/' | url }}) for more details.

#### Return value
A `Promise` without value.

#### Examples
```js
const product = {
  product_id: 'p01',
  title: 'Chocolate Cookies',
  url: 'https://my.shop.com/products/p01',
  cover_image: 'https://my.shop.com/img/products/p01.jpg',
  sale_price: 3.5,
  custom_attributes: {
    weight: 0.5,
    weight_unit: 'pound'
  }
};
await client.api.products.upload([product]);
```

#### Learn more
For more information, see [REST API](https://api.askmiso.com/#tag/Product-Content-APIs/operation/content_write_api_v1_products_post).
