---
title: Ask module (standard) - customize CSS styles
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

{#

#### --miso-ask-combo-section-padding<br>--miso-ask-combo-content-max-width<br>--miso-ask-combo-content-padding

#}

#### --miso-ask-combo-question-phrase-color

The color of the phrase text "You asked about...".

#### --miso-ask-combo-related-resources-background

The background color of the related resources section.
