## Page views

When a user visits a product or article page, you can send `product_detail_page_view` interactions to track the behavior. This information can be used to improve the user experience and provide more relevant recommendations.

First you could specify the user ID for a registered user, or the anonymous ID for an anonymous user:

```js
client.context.user_id = 'user_id';
// or
client.context.anonymous_id = 'some_anonymous_id';
```

* If you omit both `user_id` and `anonymous_id`, the SDK will generate an anonymous ID remembers it automatically.

Then you can send the `product_detail_page_view` interaction:

```js
client.api.interactions.upload({
  type: 'product_detail_page_view',
  product_ids: ['my_article_id', ...], // the IDs of the products or articles in your catalog
  timestamp: '2024-01-01T00:00:00Z', // optional
});
```

* If you omit the `timestamp`, the Miso API will use the current time.

#### Historical data

It is encouraged to send historical data to the Miso API. This will help Miso to understand the user's behavior and preferences better in a short time.

* When sending historical data, make sure to include `timestamp` in the interaction payload.
