---
title: Setup
---

The UI plugin is shipped with the SDK and requires no extra dependency. To use the plugin, simply:

1. Install the SDK
1. Turn on the plugin in JavaScript
1. Add a stylesheet in your webpage

### Install the SDK

See SDK [Installation]({{ '/sdk/installation/' | url }}) section for details.

### Turn on the plugin

In your application, turn on the UI plugin before creating an SDK client.

```js
MisoClient.plugins.use('std:ui');
```

### Add a stylesheet in your webpage

Add the following stylesheet in your webpage:

The `version` parameter can be one of the following:
* A specific version. For example: `1.6.0`. (recommended)
* A tag: either `latest` or `beta`.

```html
<head>
  ...
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@miso.ai/client-sdk@{{'{{version}}'}}/dist/css/ui.css">
</head>
```
