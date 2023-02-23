---
title: Request Options
---

You can specify a few parameters in any API request options:

#### Asynchronous mode

In user/product upload APIs, you can turn on asynchronous mode. In standard mode, the API endpoint responses when the uploaded records is fully digested, while in asynchronous mode, the records are put in a queue and the endpoint responses immediately.

* The mode does not affect data scheme checks.
* The interactions upload API is always in asynchronous mode.

```js
await client.api.users.upload(users, { async: true });
await client.api.products.upload(products, { async: true });
```

#### Dry run

You can make a dry run with upload APIs. The data scheme checks are applied, but the dataset will not be modified.

```js
await client.api.users.upload(users, { dryRun: true });
await client.api.products.upload(products, { dryRun: true });
await client.api.interactions.upload(interactions, { dryRun: true });
```
