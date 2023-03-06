---
title: UI section placement
---

### Using built-in custom element

Place a custom element `<miso-unit>` in the webpage where you want to display your recommendation result:

```html
<miso-unit unit-id="default"></miso-unit>
```

You can have multiple units in a page, as long as they have distinct unit IDs:

```html
<miso-unit unit-id="unit-1"></miso-unit>
...
<miso-unit unit-id="unit-2"></miso-unit>
```

If omitted, the default unit ID value is `default`:

```html
<miso-unit></miso-unit>
<!--
  equlivalent to 
  <miso-unit unit-id="default"></miso-unit>
-->
```

### Using regular element with data attribute

You can also use any other element:

```html
<div id="my-div" data-miso-unit-id="default"></div>
```

Then you need to manually bind the element to recommendation unit object:

```js
const myDiv = document.getElementById('my-div');
const unit = client.units.get('default');
unit.bind(myDiv);
```
