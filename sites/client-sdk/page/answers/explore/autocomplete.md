---
title: Explore module - autocomplete
---

{%- from 'macros.njk' import since with context -%}

### Enable autocomplete

{{ since('1.13.1') }}

You can turn on autocomplete for all explore units:

```js
client.ui.explores.autocomplete.enable();
```

When enabled, the search box in each explore unit will display query suggestions as the user types, powered by the [query suggestion API]({{ '/answers/api/query_suggestion/' | url }}).

Alternatively, you can enable autocomplete for a specific explore unit:

```js
const workflow1 = client.ui.explore; // the unit with unit-id = "default"
workflow1.autocomplete.enable();

const workflow2 = client.ui.explores.get(unitId);
workflow2.autocomplete.enable();
```
