---
title: Configuration
---

### Create Miso client

Create the client instance from npm module:

```js
const MisoClient = require('@miso.ai/client-sdk');
const apiKey = '...';
const client = new MisoClient(apiKey);
```

If you include the SDK by script tag, create the client like this:

```js
const apiKey = '...';
const client = new MisoClient(apiKey);
```

### Load asynchronously

If the SDK is loaded by an `async` script tag, it will be ready in the following callback:

```js
const apiKey = '...';
const misocmd = window.misocmd || (window.misocmd = []);
misocmd.push(() => {
  const client = new MisoClient(apiKey);
});
```

## Client options

The `MisoClient` can be configured optionally:

### Request timeout

You can specify request timeout globally:

```js
const client = new MisoClient({
  apiKey: '...',
  request: {
    timeout: 10000, // in milliseconds
  },
});
```

### Send API key by header

If you don't like the API key shown in the URL, you can send it by header instead:

```js
const client = new MisoClient({
  apiKey: '...',
  request: {
    sendApiKeyByHeader: true, // default: false
  },
});
```

Note that:

* User can still read it key from the browser's network inspector.
* It will cause the browser to send an extra preflight request due to CORS mechanism.
