---
title: Setup
---

The UI plugin is shipped with the SDK and requires no extra dependency. To use the plugin, simply:

1. Add Miso SDK to your webpage
1. Turn on the plugin in JavaScript

### Add Miso SDK to your webpage

Add the SDK JavaScript and stylesheet to your webpage:

The `version` parameter can be one of the following:
* A specific version. For example: `{{sdk.latest_version}}`. (recommended)
* A tag: either `latest` or `beta`.

```html
<head>
  <script async src="https://cdn.jsdelivr.net/npm/@miso.ai/client-sdk@{{'{{version}}'}}/dist/umd/miso.min.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@miso.ai/client-sdk@{{'{{version}}'}}/dist/css/ui.css">
</head>
```

For example:

```html
<head>
  <script async src="https://cdn.jsdelivr.net/npm/@miso.ai/client-sdk@{{sdk.latest_version}}/dist/umd/miso.min.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@miso.ai/client-sdk@{{sdk.latest_version}}/dist/css/ui.css">
</head>
```

To install the SDK as an NPM dependency in your JavaScript project, see SDK [Installation]({{ '/sdk/installation/' | url }}) section for details.

### Turn on the plugin

In your application, turn on the UI plugin before creating an SDK client.

```js
const misocmd = window.misocmd || (window.misocmd = []);
misocmd.push(() => {
  // turn on the UI plugin
  MisoClient.plugins.use('std:ui');
  // create client instance
  const client = new MisoClient(`${apiKey}`);
  // ...
});
</script>
```
