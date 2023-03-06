---
title: Tracking performance
---

Miso recommendation unit tracks performance events (`impression`, `viewable_impression`, `click`) automatically.

### Manual tracking

You can turn off auto-tracking for each type of events individually:

```js
unit.useTracker({
  impression: false,
  viewable: false,
  click: false
});
```

Or turn off auto-tracking for all events:

```js
unit.useTracker(false);
```

To trigger an event manually:

```js
const productIds = ['product_id_0', 'product_id_1'];

// impression
unit.tracker.impression(productIds);

// viewable_impression
unit.tracker.viewable(productIds);

// click
unit.tracker.click(productIds);
```
