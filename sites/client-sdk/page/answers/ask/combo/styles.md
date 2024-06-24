---
title: Ask module (combo) - customize CSS styles
---

You can customize the styles with CSS by:

* Providing your own CSS rules to override the existing ones.
* Levergae the CSS variables provided by Miso.

## CSS Variables

```css
:root {
  --miso-ask-combo-section-padding: 2rem;
  --miso-ask-combo-content-max-width: none; 
  --miso-ask-combo-content-padding: 2rem;
  --miso-ask-combo-question-phrase-color: #a6a5bb;
  --miso-ask-combo-related-resources-background: #fffaf5;
}
```

#### --miso-ask-combo-section-padding (A)<br>--miso-ask-combo-content-max-width (B)<br>--miso-ask-combo-content-padding (C)

<style>
#ask-combo-css-variables .frame {
  position: relative;
}
#ask-combo-css-variables .svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
}
</style>
<div id="ask-combo-css-variables" class="screenshot-container">
  <div class="frame">
    <img class="svg" src="{{ '/img/ask-combo-css-variables-0.svg' | url }}">
    <img src="{{ '/img/ask-combo-css-variables-0.png' | url }}">
  </div>
</div>

#### --miso-ask-combo-question-phrase-color

The text color of the phrase right before the question ("You asked...").

#### --miso-ask-combo-related-resources-background

The background color of the related resources section.
