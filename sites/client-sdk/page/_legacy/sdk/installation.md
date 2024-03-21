---
title: Installation
---

### As NPM Module

To use SDK as an npm module, run in your project directory:
```bash
npm install --save @miso.ai/client-sdk
```

The `MisoClient` class is the default export of the module:

```js
const MisoClient = require('@miso.ai/client-sdk');
```

### Using Script Tag

The SDK is also served by [jsDelivr](https://www.jsdelivr.com/package/npm/@miso.ai/client-sdk).

You can also include the SDK in your webpage with script tag:

The `version` parameter can be one of the following:
* A specific version. For example: `{{sdk.latest_version}}`. (recommended)
* A tag: either `latest` or `beta`.

```html
<script async src="https://cdn.jsdelivr.net/npm/@miso.ai/client-sdk@{{'{{version}}'}}/dist/umd/miso.min.js"></script>
```

The `MisoClient` class is exposed as a global property:

```js
const MisoClient = window.MisoClient;
```

Note that when the script is loaded asynchronously, `MisoClient` may not be available immediately. You can use the following pattern to access the class:

```js
const misocmd = window.misocmd || (window.misocmd = []);
misocmd.push(() => {
  // MisoClient is available here
});
</script>
```
