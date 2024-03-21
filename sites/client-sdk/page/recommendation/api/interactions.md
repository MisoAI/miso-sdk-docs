---
title: Recommendation API - interactions
---

To generate performance measurement data for analytics, you can send the following events to Miso API:

* Impression
* Viewable impression
* Click

See [Performance measurement]({{ '/common/performance/' | url }}) for detailed definitions.

#### Syntax

To send an event with SDK that works analytics, specifying `api_group`, `api_name`, and `property` in `custom_context` is required.

```js
client.api.interactions.upload({
  type: 'impression', // or 'viewable_impression', 'click'
  product_ids: [...],
  context: {
    custom_context: {
      api_group: 'recommendation',
      api_name: 'recommendation',
      property: 'user_to_products', // or 'products_to_products', 'user_to_attributes', 'user_to_trending'
    },
  },
});
```
