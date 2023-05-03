---
title: Installation
---

### Install the NPM module
To use SDK as an npm module, run in your project directory:
```bash
npm install --save @miso.ai/server-sdk
```

### Create a Miso client
Create a Miso client instance:
```js
const MisoClient = require('@miso.ai/server-sdk');
const apiKey = '...';
const miso = new MisoClient(apiKey);
```
