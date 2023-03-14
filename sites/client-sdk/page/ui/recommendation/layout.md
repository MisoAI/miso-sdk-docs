---
title: Layouts
---

{%- from 'macros.njk' import stackblitz_link with context -%}

Select a layout to display the recommendation result:

```js
unit.useLayout(type);
```

Available built-in layouts are:

* `list` (default)
* `cards`

#### Live demo

{{ stackblitz_link('ui/recommendation/layouts') }}

### Customization

#### Styles
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
      <td>List</td>
      <td><code>miso-list</code></td>
    </tr>
    <tr>
      <td>Cards</td>
      <td><code>miso-cards</code></td>
    </tr>
  </tbody>
</table>

If you want to change the base class name of the elements, specify it in the options:

```js
unit.useLayout('list', {
  className: 'my-miso-list'
});
```

#### DOM structure
In addition, to customize product item DOM structure, you can override the template function:

```js
unit.useLayout('list', {
  templates: {
    product: renderProduct
  }
});

function renderProduct(layout, state, product) {
  const html = '...';
  return html;
}
```

The render function takes the following arguments and should return an HTML string.

* `layout`: the layout implementation widget
* `state`: the whole data state in this rendering process
* `product`: the product record to display

See also: the [default templates](https://github.com/MisoAI/miso-client-js-sdk/blob/main/packages/client-sdk-ui/src/layout/templates.js).

#### Logo

You can hide Miso logo:

```js
unit.useLayout('list', {
  logo: false
});
```
