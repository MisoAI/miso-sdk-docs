---
title: Recommendation UI - performance tracking
---

Miso recommendation workflow tracks performance events (`impression`, `viewable_impression`, `click`) automatically.

### Manual tracking

You can turn off auto-tracking for each type of events individually:

```js
workflow.useTracker({
  impression: false,
  viewable: false,
  click: false
});
```

Or turn off auto-tracking for all events:

```js
workflow.useTracker(false);
```

To trigger an event manually:

```js
const productIds = ['product_id_0', 'product_id_1'];

// impression
workflow.tracker.impression(productIds);

// viewable_impression
workflow.tracker.viewable(productIds);

// click
workflow.tracker.click(productIds);
```
