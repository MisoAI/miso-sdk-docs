---
title: Ask UI - customize elements
---

{%- from 'macros.njk' import stackblitz_link with context -%}

In this section, based on the previous [quick start]({{ '/ui/ask/quick-start/' | url }}) example, we can configure the workflow to customize the look and feel of the elements. We will take `<miso-sources>` as an example.

To do so, we need to:

1. Configure the workflow customize the data fields of `source` items returned by the API, if necessary.
1. Configure the workflow to customize render function of `<miso-sources>` elements.

#### Live demo

{{ stackblitz_link('1.8/ui/ask/customize-element') }}

### Configure API payload

`sources` and `related_resources` items returned by the API will always return the following fields:
* `product_id`
* `title`
* `snippet`

You can configure the workflow to retrieve additional fields for `source` items:

```diff-js
    const misocmd = window.misocmd || (window.misocmd = []);
    misocmd.push(() => {
      // turn on the UI plugin
      MisoClient.plugins.use('std:ui');
      // create a Miso client instance to enable ask workflow
-     new MisoClient(`${apiKey}`);
+     const client = new MisoClient(`${apiKey}`);
+     const workflow = client.ui.ask;
+     // 1. configure API payload to retrieve additional fields for source items
+     workflow.useApi('questions', {
+       source_fl: ['url', 'cover_image', 'created_at', 'updated_at'],
+     });
    });
```

The default value of `source_fl` and `related_resource_fl` is `['url', 'cover_image']`.

See the [REST API reference](https://api.askmiso.com/#tag/Ask-APIs/operation/questions_v1_ask_questions_post) for payload options.

### Configure layout options

Specify layout options for `sources` or `related_resources` to override render functions:

```diff-js
    const misocmd = window.misocmd || (window.misocmd = []);
    misocmd.push(() => {
      // turn on the UI plugin
      MisoClient.plugins.use('std:ui');
      // create a Miso client instance to enable ask workflow
      new MisoClient(`${apiKey}`);
      const client = new MisoClient(`${apiKey}`);
      const workflow = client.ui.ask;
      // 1. configure API payload to retrieve additional fields for source items
      workflow.useApi('questions', {
        source_fl: ['url', 'cover_image', 'created_at', 'updated_at'],
      });
+     // 2. configure layout options to override the default item render function
+     workflow.useLayouts({
+       sources: {
+         templates: {
+           product: renderSourceContent,
+         },
+       },
+     });
    });
```

A sample render function for `sources` or `related_resources` items:

```js
function renderSourceContent(layout, state, data) {
  const { url, cover_image, title, created_at, snippet } = data;
  return `
<a class="miso-list__item-body" data-role="item" href="${url}" target="_blank" rel="noopener">
  <div class="miso-list__item-cover-image-container">
    <img class="miso-list__item-cover-image" src="${cover_image}">
  </div>
  <div class="miso-list__item-info-container">
    <div class="miso-list__item-title">${title}</div>
    <div class="miso-list__item-date">${new Date(created_at).toLocaleDateString()}</div>
    <div class="miso-list__item-snippet">${snippet}</div>
  </div>
</a>`;
}
```

Note that the `data-role="item"` attribute is required for performance event tracker to work properly.

You can also override the render function for the entire element. However, you need to take care of data status yourself:

```js
workflow.useLayouts({
  sources: {
    templates: {
      root: renderRoot,
    },
  },
});

function renderRoot(layout, state) {
  const { status, value } = state;
  switch (status) {
    case 'initial':
      return ``;
    case 'loading':
      return `<div">Loading...</div>`;
    case 'erroneous':
      return `...`;
    case `ready`:
      return `<ul>${value.map(item => `<li>${renderSourceContent(layout, state, data)}</li>`)}</ul>`;
  }
}
```

See [collection elements]({{ '/ui/element/collections/' | url }}) section and the [implementation](https://github.com/MisoAI/miso-client-js-sdk/blob/main/packages/client-sdk-ui/src/layout/list/collection.js) of collection element for details.
