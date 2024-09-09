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

When including `user_type`, you must modify your `user_hash` generation process. Instead of hashing only the `user_id`, you should hash the combination of `user_type` and `user_id` in the format `user_type:user_id`. Here's a Python script demonstrating how to generate the `user_hash`:

```python
import hashlib
import hmac

def generate_user_hash(secret_key, user_id, user_type=None):
    key_bytes = secret_key.encode('utf-8')
    
    if user_type:
        message = f"{user_type}:{user_id}".encode('utf-8')
    else:
        message = user_id.encode('utf-8')
    
    user_hash = hmac.new(key_bytes, message, hashlib.sha256).hexdigest()
    return user_hash
```

### Anonymous ID

The SDK takes care of `anonymous_id` automatically using session storage, so you don't need to set it manually.

However, you can also override the `anonymous_id` value by yourself:

```js
client.context.anonymous_id = 'my_anonymous_id';
```
