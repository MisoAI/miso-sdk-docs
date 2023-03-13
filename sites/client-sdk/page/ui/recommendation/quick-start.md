---
title: Recommendation UI - quick start
---

You can integrate Miso recommendation results in your website with a few simple steps:

1. Setup UI plugin
1. Define a recommendation UI section in your webpage
1. Configure your recommendation UI unit

### Setup UI plugin

Add the SDK JavaScript and stylesheet to your webpage:

```html
<head>
  ...
  <script async src="https://cdn.jsdelivr.net/npm/@miso.ai/client-sdk@latest/dist/umd/miso.min.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@miso.ai/client-sdk@latest/dist/css/ui.css">
</head>
```

See [Setup](../../setup/) section for more options.

### Define a recommendation UI section in your webpage

In your webpage, add a `<miso-unit>` custom element where you want to display the recommendation result:

```html
<miso-unit unit-id="default"></miso-unit>
```

See [UI Placement](../placement/) section for details.

### Configure your recommendation UI unit

Configure the recommendation unit:

```js
// turn on the UI plugin
MisoClient.plugins.use('std:ui');

const client = new MisoClient(`${apiKey}`);
const unit = client.units.get('default');

// specify API parameters (optional)
unit.useApi('user_to_products', { rows: 6 }); // default: 'user_to_products', {}

// choose a layout (optional)
unit.useLayout('cards'); // default: 'list'

unit.start();
```
