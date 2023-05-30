---
title: Elements - search box
---

The following elements are classified as search box elements:

<table class="table">
  <thead>
    <tr>
      <th scope="col">Element tag name</th>
      <th scope="col">Used in</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>&lt;miso-query&gt;</code></td>
      <td>
        <a href="{{ '/ui/search/elements/' | url }}">Search</a>&nbsp; | &nbsp;<a href="{{ '/ui/ask/elements/' | url }}">Ask</a>
      </td>
    </tr>
  </tbody>
</table>

### Layouts

The is currently no configuration options for search box elements.

#### Customize styles

You can customize the look-and-feel of any layouts by adding additional CSS rules. The built-in layouts have the following base class names:

<table class="table">
  <thead>
    <tr>
      <th scope="col">Layout</th>
      <th scope="col">CSS class name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>SearchBox</td>
      <td><code>miso-search-box</code></td>
    </tr>
  </tbody>
</table>

If you want to change the base class name of the elements, specify it in the options:

```js
workflow.useLayouts({
  query: {
    className: 'my-miso-search-box'
  }
});
```

#### Customize DOM structure

Simply leave elements inside `<miso-query>` element:

```html
<miso-query>
  <div>
    <input>
    <button type="submit">
  </div>
</miso-query>
```

The layout handles DOM events by the following rules:

1. The first `<input>` element without attribute `type="submit"` holds the query text.
1. When clicking on an element with attribute `type="submit"`, it submits the query.
