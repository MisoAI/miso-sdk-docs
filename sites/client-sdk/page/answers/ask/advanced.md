---
title: Ask module - advanced usages
---

{%- from 'macros.njk' import since with context -%}

## Show images in answers

{{ since('1.11.5') }}

To display images in answers, we need to specify to insert the `<miso-images>` element in the answer layout.

```js
const context = client.ui.asks;
context.useLayouts({
  answer: {
    variant: ['slot', '<miso-images></miso-images>']
  }
});
```

* The images will be displayed right after the first `<p>` element in the answer section.
