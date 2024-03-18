---
title: Recommendation UI - configure API
---

{%- from 'macros.njk' import stackblitz_link, since with context -%}

You can configure the API and its payload:

```js
const workflow = client.ui.recommendation;
workflow.useApi(apiName, payload);
```

For example, to make the API return `8` products instead of the default value:

```js
workflow.useApi('user_to_products', { rows: 8 });
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
      <td><code>"user_to_products"</code></td>
      <td>
        <a href="{{ '/sdk/recommendation/user_to_products/' | url }}">User to Products</a>
      </td>
    </tr>
    <tr>
      <td><code>"product_to_products"</code></td>
      <td>
        <a href="{{ '/sdk/recommendation/product_to_products/' | url }}">Product to Products</a>
      </td>
    </tr>
    <tr>
      <td><code>false</code></td>
      <td>
        Disable built-in data source.
      </td>
    </tr>
  </tbody>
</table>

See the API reference pages for more payload options.

#### Configure API globally

{{ since('1.8.2') }}

You can configure the API payload for all workflows:

```js
const context = client.ui.recommendations;
context.useApi(apiName, payload);
```
