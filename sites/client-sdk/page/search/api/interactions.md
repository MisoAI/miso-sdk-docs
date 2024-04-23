---
title: Search API - interactions
---

To generate performance measurement data for analytics, you can send the following events to Miso API:

* Impression
* Viewable impression
* Click

See [Performance measurement]({{ '/advanced/performance/' | url }}) for detailed definitions.

#### Syntax

To send an event with SDK that works analytics, specifying `api_group`, `api_name`, and `property` in `custom_context` is required.

```js
client.api.interactions.upload({
  type: 'impression', // or 'viewable_impression', 'click'
  product_ids: [...],
  context: {
    custom_context: {
      api_group: 'search',
      api_name: 'search',
      property: 'products',
    },
  },
});
```
