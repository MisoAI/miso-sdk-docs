---
title: Elements - workflow containers
---

The following elements serve as containers for corresponding workflows:

<table class="table">
  <thead>
    <tr>
      <th scope="col">Element tag name</th>
      <th scope="col">Workflow</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>&lt;miso-ask&gt;</code></td>
      <td><a href="{{ '/ui/ask/elements/' | url }}">Ask</a></td>
    </tr>
    <tr>
      <td><code>&lt;miso-search&gt;</code></td>
      <td><a href="{{ '/ui/search/elements/' | url }}">Search</a></td>
    </tr>
    <tr>
      <td><code>&lt;miso-recommendation&gt;</code></td>
      <td><a href="{{ '/ui/recommendation/elements/' | url }}">Recommendation</a></td>
    </tr>
  </tbody>
</table>

### Layouts

You can configure the layout options for the workflow elements:

```js
workflow.setLayouts({
  container: {
    //...
  }
});
```

#### Logo

Turn off Miso logo display globally:

```js
workflow.setLayouts({
  container: {
    logo: false
  },
});
```

Configure Miso logo display for each workflow element:

```html
<miso-ask logo="false">
</miso-ask>

<miso-search logo="false">
</miso-search>

<miso-recommendation logo="false">
</miso-recommendation>
```

<table class="table">
  <thead>
    <tr>
      <th scope="col">Value</th>
      <th scope="col">Default</th>
      <th scope="col">Behavior</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>true</code></td>
      <td></td>
      <td>Append Miso logo at the end of container visible when data ready.</td>
    </tr>
    <tr>
      <td><code>false</code></td>
      <td></td>
      <td>Does not append Miso logo.</td>
    </tr>
    <tr>
      <td><code>"auto"</code></td>
      <td style="text-align: center">✓</td>
      <td>Append Miso logo at the end of container visible when data ready only if it contains <code>&lt;miso-results&gt;</code> or <code>&lt;miso-answer&gt;</code>.</td>
    </tr>
  </tbody>
</table>
