---
title: Upload users
description: Upload user data to Miso dataset.
---

{% from 'macros.njk' import proptable %}

#### Syntax
```js
await client.api.users.upload(users, options);
```

#### Parameters
The `users` parameter can be:
* An object, representing a single user
* An array of objects, representing multiple users
* A JSON string of array of objects

A single record of user can have the following properties:

{{ proptable('data_api', 'users.upload.payload') }}

#### Options
The `options` parameter is an optional object with the following properties:

{{ proptable('data_api', 'users.upload.options') }}

See the [request options page]({{ '/sdk/request-options/' | url }}) for more details.

#### Return value
A `Promise` without value.

#### Examples
```js
const user = {
  user_id: 'u01',
  custom_attributes: {
  }
};
await client.api.users.upload([user]);
```

#### Learn more
For more information, see [REST API](https://api.askmiso.com/#tag/Product-Content-APIs/operation/content_write_api_v1_products_post).
