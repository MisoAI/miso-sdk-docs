---
title: Search UI - workflow
---

Workflows are JavaScript objects that control the process of the entire data flow from SDK API request to UI display. A search workflow is a type of workflow for Miso search API, which allows you:

* Configure API default payload.
* Configure the look and feel of UI elements.

### Access workflow

You can access the workflow as the following:

```js
const workflow = client.ui.search;
```

### Configure API

You can configure the default search API payload:

```js
workflow.useApi('search', payload);
```

For example, to make the API return `8` products instead of the default value:

```js
workflow.useApi('user_to_products', { rows: 8 });
```

Given a keyword `shiba`, the API payload will be:

```json
{
  "q": "shiba",
  "rows": 8
}
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
      <td><code>"search"</code></td>
      <td>
        <a href="{{ '/sdk/search/search/' | url }}">Search</a>
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

### Configure UI

You can choose the layout for the recommendation results:

```js
workflow.useLayouts({
  results: 'cards', // or 'carousel', 'list' (default)
});
```

To hide Miso logo:

```js
workflow.useLayouts({
  container: { logo: false }
});
```

See [elements]({{ '/ui/search/elements/' | url }}) section for details.
