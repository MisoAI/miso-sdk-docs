---
title: Request options
---

You can specify a few parameters in any API request options:

#### Timeout
You can specify a timeout in milleseconds.

```js
try {
  const { products } = await client.api.recommendation.userToProducts(payload, { timeout: 5000 });
} catch (e) {
  // ...
}
```

#### Bulk
You can call API in bulk mode. API calls in bulk mode from the same event loop will be packed into a single HTTP request to save communication resources.

```js
const [ responseA, responseB ] = await Promise.all([
  client.api.recommendation.userToProducts(payload, { bulk: true }),
  client.api.recommendation.userToTrending(payload, { bulk: true })
]);
```

Be aware of asynchrony. In the following example, the bulk mode will NOT be in effect:

```js
const responseA = await client.api.recommendation.userToProducts(payload, { bulk: true });
const responseB = await client.api.recommendation.userToProducts(payload, { bulk: true });
```
