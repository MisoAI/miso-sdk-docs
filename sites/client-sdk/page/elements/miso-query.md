---
title: Elements - <miso-query>
---

{% set components = [specs.ui.elements.query] %}

`<miso-query>` is the element for search or question input.

{% include './_component-containers.md' %}

### Layouts

The only and default layout for this category is `search-box`.

{#
#### Autocomplete

The search box elements enable autocomplete feature with `ask` workflow. You can disable it by:

```js
workflow.useLayouts({
  query: {
    autocomplete: false
  }
});
```
#}

#### Placeholder text

You can specify the placeholder text of the search box input element by:

```js
workflow.useLayouts({
  query: {
    placeholder: 'Ask anything!'
  }
});
```

#### Button text

The default text of the submit button is `Search` for `search` workflow and `Ask` for `ask` workflow. You can change it by:

```js
workflow.useLayouts({
  query: {
    buttonText: 'Go!'
  }
});
```

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
    <input type="text" data-role="input">
    <button type="submit">
  </div>
</miso-query>
```

{#
```html
<miso-query>
  <div>
    <input type="text" data-role="input">
    <button type="submit">
  </div>
  <div data-role="autocomplete">
    <ol data-role="suggestion-list"></ol>
  </div>
</miso-query>
```
#}

The layout handles DOM events by the following rules:

1. The first `<input>` or `<textarea>` element with attribute `data-role="input"` holds the query text.
1. When clicking on an element with attribute `type="submit"` or `data-role="button"`, it submits the query.

{#
1. If present, the element with attribute `data-role="autocomplete"` works an autocomplete container.
1. If present, the element with attribute `data-role="suggestion-list"` holds option items of autocomplete suggestions.
#}
