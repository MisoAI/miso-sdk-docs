---
title: Elements - collection elements
---

{% set components = [specs.ui.elements.lookup.products, specs.ui.elements.lookup.sources, specs.ui.elements.lookup['related-resources'], specs.ui.elements.lookup['related-questions']] %}

The following elements are classified as collection elements, which are used to display a collection of items in a list format.

{% include './_component-containers.md' %}

They are bound to different parts of API response data, but they share the same layout options.

### Layouts

To choose a layout for specified element:

```js
// Choose a layout for <miso-products>
workflow.useLayouts({
  products: 'carousel'
});

// Choose a layout for <miso-sources>
workflow.useLayouts({
  sources: 'carousel'
});

// Choose a layout for <miso-related-resources>
workflow.useLayouts({
  related_resources: 'carousel'
});
```

Available built-in layouts are:

* `list` (default)
* `cards`
* `carousel`

#### Layout options

You can customize the layout by specifying additional options in the following way:

```js
workflow.useLayouts({
  products: ['list', {
    // additional options
  }]
});

// or with default layout type
workflow.useLayouts({
  products: {
    // additional options
  }
});
```

#### Customize styles

You can customize the look-and-feel of any layouts by adding additional CSS rules. The built-in layouts have the following base class names:

<table class="table">
  <thead>
    <tr>
      <th scope="col">Layout</th>
      <th scope="col">Key</th>
      <th scope="col">CSS class name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>List</td>
      <td><code>list</code></td>
      <td><code>miso-list</code></td>
    </tr>
    <tr>
      <td>Cards</td>
      <td><code>cards</code></td>
      <td><code>miso-cards</code></td>
    </tr>
    <tr>
      <td>Carousel</td>
      <td><code>carousel</code></td>
      <td><code>miso-carousel</code></td>
    </tr>
  </tbody>
</table>

If you want to change the base class name of the elements, specify it in the options:

```js
workflow.useLayouts({
  products: ['list', {
    className: 'my-miso-list'
  }]
});
```

#### Customize DOM structure (products)

In addition, to customize product item DOM structure, you can override the template function:

```js
workflow.useLayouts({
  products: ['list', {
    templates: {
      product: renderProduct
    }
  }]
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

#### Customize DOM structure (sources, related resources)

to customize product item DOM structure, you can override the template function:

```js
workflow.useLayouts({
  sources: ['list', {
    templates: {
      article: renderArticle
    }
  }],
  related_resources: ['list', {
    templates: {
      article: renderArticle
    }
  }]
});

function renderArticle(layout, state, article) {
  const html = '...';
  return html;
}
```

The render function takes the following arguments and should return an HTML string.

* `layout`: the layout implementation widget
* `state`: the whole data state in this rendering process
* `article`: the article record to display

See also: [default templates](https://github.com/MisoAI/miso-client-js-sdk/blob/main/packages/client-sdk-ui/src/layout/templates.js).

Note that the properties of the article record are limited to the fields returned by the API. If you need additional fields, you need to specify `source_fl` or `related_resource_fl` in the API payload:

```js
const context = client.ui.asks;
context.useApi({
  source_fl: ['cover_image', 'url', 'created_at', 'updated_at', 'published_at', 'custom_attributes.my_prop'],
  related_resource_fl: ['cover_image', 'url', 'created_at', 'updated_at', 'published_at', 'custom_attributes.my_prop'],
});
```

See [Ask UI: data]({{ '/answers/ask/data/' | url }}) for details.

#### Customize DOM structure (related questions)

To customize related question item DOM structure, you can override the template function:

```js
workflow.useLayouts({
  related_questions: ['list', {
    templates: {
      question: renderQuestion
    }
  }]
});

function renderQuestion(layout, state, question) {
  const html = '...';
  return html;
}
```
