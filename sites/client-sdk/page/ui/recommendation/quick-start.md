---
title: Recommendation UI - quick start
---

{%- from 'macros.njk' import stackblitz_link with context -%}

You can integrate Miso recommendation results in your website with a few simple steps:

1. Add Miso SDK to your webpage
1. Place Miso elements in your webpage
1. Configure your recommendation workflow

#### Live demo

{{ stackblitz_link('1.8/ui/recommendation/quick-start') }}

{% include 'section/ui-quick-start-setup.md' %}

### Place Miso elements in your webpage

In your webpage, add the following elements where you want to display the recommendation results:

```html
<miso-recommendation>
  <miso-products></miso-products>
</miso-recommendation>
```

See [elements]({{ '/ui/recommendation/elements/' | url }}) section for details.

### Configure your recommendation workflow

Configure the workflow:

```html
<script>
// when the SDK is loaded asynchronously, use this pattern to access window.MisoClient
const misocmd = window.misocmd || (window.misocmd = []);
misocmd.push(() => {
  // turn on the UI plugin
  MisoClient.plugins.use('std:ui');
  const client = new MisoClient(`${apiKey}`);
  const workflow = client.ui.recommendation;

  // override API parameters (optional)
  workflow.useApi('user_to_products', { rows: 6 }); // default: 'user_to_products', {}

  // use a different layout (optional)
  workflow.useLayouts({
    products: 'cards' // default: 'list'
  });

  // kick off the workflow
  workflow.start();
});
</script>
```

See [workflow]({{ '/ui/recommendation/workflow/' | url }}) section for details.
