---
title: Elements - <miso-affiliation>
---

{% from 'macros.njk' import screenshot %}

{% set components = [specs.ui.elements.affiliation] %}

`<miso-affiliation>` is the element for displaying affilated products.

{% include './_component-containers.md' %}

### Layouts

The default look-and-feel of the affiliation element is as follows:

{{ screenshot('affiliation-default.png') }}

#### Customize header

You can customize the header content of the affiliation element:

```js
client.ui.asks.useLayouts({
  affiliation: {
    templates: {
      ctaText: "View deal",
      itemHeaderLeftText: "Today's best deals",
      logoText: "Selected by",
      logoUrl: ..., // your site logo image URL
    },
  },
});
```

If you provide a logo image URL, the image will be displayed on the right side of the header, along with the logo text:

{{ screenshot('affiliation-logo.png', 'small') }}

Tip: you may want to align the logo image with the logo text by specifying a vertical offset in the CSS:

```css
.miso-affiliation__item-header-logo-text {
  position: relative;
  top: -2px; /* adjust the value as needed */
}
```

#### Customize colors

You can override some CSS variables to customize the colors of the affiliation element:

```css
/* The values below are default ones */
:root {
  /* header */
  --miso-affiliation-item-header-bg-color: #e0e0e0;
  --miso-affiliation-item-header-text-color: #333;
  /* "View Deal" button */
  --miso-affiliation-item-cta-bg-color: #408048;
  --miso-affiliation-item-cta-text-color: #fff;
  /* previous/next buttons */
  --miso-affiliation-control-button-color: #fff;
  --miso-affiliation-control-button-color-hover: #f0f0f0;
}
```
