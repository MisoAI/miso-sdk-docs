{%- from 'macros.njk' import since with context -%}

## User context

To personalize search and recommendation results or provide authorization feature, you can specify user information (anonymous and/or signed-in) in client context so they will be passed into API calls automatically.

### User ID and user hash
You can set `user_id` and `user_hash`:

```js
client.context.user_id = '...';
client.context.user_hash = '...';
```

See [REST API](https://api.askmiso.com/#operation/search_v1_search_search_post) for more details about `user_hash`.

### User type

{{ since('1.10.0') }}

You can set `user_type`:

```js
client.context.user_id = '...';
client.context.user_type = '...';
```

The `user_type` value is passed into API calls only when `user_id` is also set.

### Anonymous ID

The SDK takes care of `anonymous_id` automatically using session storage, so you don't need to set it manually.

However, you can also override the `anonymous_id` value by yourself:

```js
client.context.anonymous_id = 'my_anonymous_id';
```
