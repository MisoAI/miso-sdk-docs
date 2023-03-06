---
title: Configure API payload
---

Configure your API payload as the following:

```js
unit.useApi(apiName, payload);
```

Available `apiName` values are:

<table class="table">
  <thead>
    <tr>
      <th scope="col">Value</th>
      <th scope="col">API</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>user_to_products</code></td>
      <td>
        <a href="{{ '/sdk/recommendation/user_to_products/' | url }}">User to Products</a>
      </td>
    </tr>
    <tr>
      <td><code>product_to_products</code></td>
      <td>
        <a href="{{ '/sdk/recommendation/product_to_products/' | url }}">Product to Products</a>
      </td>
    </tr>
  </tbody>
</table>

See the API reference for payload options.
