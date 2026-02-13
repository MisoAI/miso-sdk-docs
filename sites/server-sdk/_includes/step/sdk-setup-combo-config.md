### {% if step %}{{ step }}. {% endif %}Turn off auto-start

The combo element automatically starts the routine when the SDK is loaded. Thus, to configure the module in time, we want to disable the auto-start feature by setting `autostart` to `false` in the script URL:

```html
<script async src="https://cdn.jsdelivr.net/npm/@miso.ai/client-sdk@latest/dist/umd/miso.min.js?api_key=...&autostart=false"></script>
```

### {% if step %}{{ step + 1 }}. {% endif %}Access MisoClient

`MisoClient`, the entry point of the SDK is available on `window` object. However, it won't be available until the SDK is loaded. The SDK provides a way to access `MisoClient` regardless of the loading status:

```js
const misocmd = window.misocmd || (window.misocmd = []);
misocmd.push(() => {
  const MisoClient = window.MisoClient;
  // work with MisoClient
});
```
