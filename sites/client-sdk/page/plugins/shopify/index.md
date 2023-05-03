---
title: Shopify
---

The Miso Shopify App adds a script in your Shopify store page, which consists of the standard SDK and a Shopify plugin. The script does the following:

* Create a MisoClient instance, as `window.miso`
* Set `anonymous_id` and `user_id` in context
* Capture some user interactions events automatically

#### MisoClient instance

Access the predefined MisoClient instance:

```js
const client = window.miso;
```

#### Events

Events captured by the script are:

* `home_page_view`
* `category_page_view`
* `product_detail_page_view`
* `search`
* `add_to_cart`
* `remove_from_cart`

Note that `checkout` events are covered by Shopify webhooks.

### Display recommendation results

See the [UI]({{ '/ui/' | url }}) chapters for details.
