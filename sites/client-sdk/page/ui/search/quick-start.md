---
title: Search - quick start
---

{%- from 'macros.njk' import stackblitz_link with context -%}

You can integrate Miso search in your website with a few simple steps:

1. Add Miso SDK to your webpage
1. Place Miso elements
1. Create a Miso client instance

#### Live demo

{{ stackblitz_link('1.8/ui/search/quick-start') }}

{% include 'section/ui-setup.md' %}

### Place Miso elements in your webpage

In your webpage, add the following elements where you want to display the search results:

```html
<miso-search>
  <!-- search box -->
  <miso-query></miso-query>
</miso-search>

...

<miso-search>
  <!-- results -->
  <miso-products></miso-products>
</miso-search>
```

See [elements]({{ '/ui/search/elements/' | url }}) section for details.

### Create a Miso client instance

Create a Miso client:

```html
<script>
// when the SDK is loaded asynchronously, use this pattern to access window.MisoClient
const misocmd = window.misocmd || (window.misocmd = []);
misocmd.push(() => {
  // turn on the UI plugin
  MisoClient.plugins.use('std:ui');
  // create a Miso client instance to enable search workflow
  new MisoClient(`${apiKey}`);
});
</script>
```

See [workflow]({{ '/ui/search/workflow/' | url }}) section for details.
