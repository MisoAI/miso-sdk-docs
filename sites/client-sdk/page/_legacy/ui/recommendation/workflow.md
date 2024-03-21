---
title: Recommendation UI - workflow
---

{%- from 'macros.njk' import since with context -%}

Workflows are JavaScript objects that control the process of the entire data flow from SDK API request to UI display. A recommendation workflow is a type of workflow for Miso recommendation APIs, which allows you:

* Configure API and its payload.
* Configure the look and feel of UI elements.
* Configure performance tracking.
* Determine when to start the API request.

### Access workflow

You can access the workflow as the following:

```js
const workflow = client.ui.recommendation;
```

When there are multiple recommendation blocks in the page or in your site, you can access them by their unit IDs:

```js
const unitId = 'after-article-1';
const workflow = client.ui.recommendations.get(unitId);
```

The workflow will connect to a `<miso-recommendation>` element with a matching `unit-id` attribute:

```html
<miso-recommendation unit-id="after-article-1">
  ...
</miso-recommendation>
```

Workflow performance with different unit IDs are tracked separately.

### Configure API

You can configure the API and its payload:

```js
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

See the API reference for payload options.

#### Configure API globally

{{ since('1.8.2') }}

You can configure the default API payload for all workflows:

```js
const context = client.ui.recommendations;
context.useApi(apiName, payload);
```

### Configure UI

You can choose the layout for the recommendation results:

```js
workflow.useLayouts({
  products: 'cards', // or 'carousel', 'list' (default)
});
```

To hide Miso logo:

```js
workflow.useLayouts({
  container: { logo: false }
});
```

See [elements]({{ '/ui/recommendation/elements/' | url }}) section for details.

#### Configure UI globally

{{ since('1.8.2') }}

You can configure the default layouts options for all workflows:

```js
const context = client.ui.recommendations;
context.useLayouts({
  //...
});
```

### Configure performance tracking

See [performance tracking]({{ '/ui/recommendation/tracking/' | url }}) section for details.

### Start workflow

You can start the workflow by calling the `start()` method:

```js
workflow.start();
```
