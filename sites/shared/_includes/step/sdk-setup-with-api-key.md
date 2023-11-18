### {% if step %}{{ step }}. {% endif %}Add Miso SDK to your webpage

Add the SDK JavaScript to your webpage:

```html
<head>
  <script async src="https://cdn.jsdelivr.net/npm/@miso.ai/client-sdk@{{sdk.latest_version}}/dist/umd/miso.min.js?api_key={{'{{api_key}}'}}"></script>
</head>
```

* You can put the script tag anywhere in the document.
* Make sure to use the **publishable** API key, rather than the secret one.
