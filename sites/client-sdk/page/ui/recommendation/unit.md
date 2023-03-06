---
title: Recommendation Unit
---

It is common to have multiple recommendation sections in a website, and we want to track their performance individually.
The UI plugin supports the idea natively: each section is manage by a `recommendation unit`, identified by `unit IDs`.

### Unit API

#### Get unit by unit ID

```js
const unit = client.units.get(unitID);
```

You can configure the following aspects of a recommendation unit with JavaScript API:

* [Recommendation API parameters](../api/)
* [Layouts to display API result](../layout/)
* [Performance tracking options](../tracker/)
