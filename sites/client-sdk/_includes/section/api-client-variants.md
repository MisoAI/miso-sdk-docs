The client SDK ships in two variants. Pick the one that matches how you use Miso:

| Variant | Bundle file | Includes UI plugins | Use when |
| --- | --- | --- | --- |
| Standard | `miso.min.js` | Yes | You use Miso's prebuilt UI modules (ask, explore, search, recommendation) and/or call Miso APIs directly. |
| Lite | `miso-lite.min.js` | No | You only call Miso APIs directly and render results with your own UI code. |

The lite variant is a strict subset of the standard variant: it omits the UI plugin and analytics plugin, which means no custom elements, workflows, or built-in event tracking. The `MisoClient` class and its `api` namespace behave identically in both.

### As a node module

Install the SDK:

```bash
npm install --save @miso.ai/client-sdk
```

Import the standard variant from the package root:

```js
import MisoClient from '@miso.ai/client-sdk';
```

Import the lite variant from the `lite.js` subpath:

```js
import MisoClient from '@miso.ai/client-sdk/lite.js';
```

### Using a script tag

{% from 'macros.njk' import sdk_script_tag %}

Standard variant:

{{ sdk_script_tag() }}

Lite variant:

{{ sdk_script_tag('miso-lite.min.js') }}
