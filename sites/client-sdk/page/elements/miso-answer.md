---
title: Elements - <miso-answer>
---

{% set components = [specs.ui.elements.answer] %}

`<miso-answer>` is the element for answer text in ask workflow.

{% include './_component-containers.md' %}

### Layouts

#### Customize citation links

You can customize the element of citation links, as well as adding a tooltip:

```js
function onCitationLink({ addClass, setAttribute, setTooltipHtml, escapeHtml }, { source, index }) {
  addClass('my-custom-class');
  if (source) {
    setAttribute('data-title', source.title);
    const date = new Date(source.published_at).toLocaleDateString();
    setTooltipHtml(`<span class="title">${escapeHtml(source.title)}</span><span class="date">${date}</span>`);
  }
}

workflow.useLayouts({
  answer: {
    onCitationLink
  }
});
```

* For tooltip HTML, you should avoid using element tags that are natively block elements (i.e. `<div>`, `<p>`, etc.), even though in HTML5 elements are sementically neutral. This is due to the specification that `<p>` tags cannot contain block elements when setting its innerHTML. Instead, use inline elements like `<span>` and modify their display properties with CSS.
