### {% if step %}{{ step }}. {% endif %}Add Miso SDK to your webpage

#### As a node module

In your project directory, run:

```bash
npm install --save @miso.ai/client-sdk
```

Then you can import `MisoClient` from the SDK:

```js
import MisoClient from '@miso.ai/client-sdk';

// work with MisoClient
```

#### Using a script tag

Add the SDK script tag to your webpage:

{% from 'macros.njk' import sdk_script_tag %}
{{ sdk_script_tag() }}

* You can put the script tag anywhere in the document.

`MisoClient` is available on `window` object. However, it won't be available until the SDK is loaded. The SDK provides a way to access it regardless of the loading status:

```js
const misocmd = window.misocmd || (window.misocmd = []);
misocmd.push(() => {
  const MisoClient = window.MisoClient;
  // work with MisoClient
});
```
