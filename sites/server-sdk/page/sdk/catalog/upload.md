---
title: Upload Catalog
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

{{ proptable('sdk:data', 'products.upload.payload') }}

#### Options
The `options` parameter is an optional object with the following properties:

{{ proptable('sdk:data', 'products.upload.options') }}

See the [request options page]({{ '/sdk/request-options/' | url }}) for more details.

#### Return value
A `Promise` without value.

#### Examples
```js
const event = {
  type: 'add_to_cart',
  product_ids: ['a001', 'a002'],
  quantities: [3, 5],
  user_id: '...'
};
await client.api.products.upload(event);
```

#### Learn more
For more information, see [REST API](https://api.askmiso.com/#operation/interaction_upload_api_v1_interactions_post).
