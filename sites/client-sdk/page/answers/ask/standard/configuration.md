---
title: Ask module (standard) - configuration
---

You can configure the ask module with the some options, including:
* Phrases

{% include 'step/sdk-setup-combo-config.md' %}

### Access the configuation method

Now you can access the configuration method:

```js
const misocmd = window.misocmd || (window.misocmd = []);
misocmd.push(() => {
  const MisoClient = window.MisoClient;
  const combo = MisoClient.ui.ask.combo;

  // pass the configuration options
  combo.config({
    //...
  });

  // manually start the routine, since we have disabled the auto-start
  combo.start();
});
```

## Phrases

You can configure the phrases displayed in the ask module:

```js
MisoClient.ui.ask.combo.config({
  phrases: {
    question: 'You asked...',
    sources: 'My reply is based on the following',
    relatedQuestions: 'Related questions you can explore',
    relatedResources: 'Go beyond, and learn more about this topic',
  },
});
```

The following table lists the available options:

<table class="table">
  <thead>
    <tr>
      <th scope="col">Key</th>
      <th scope="col">Description</th>
      <th scope="col">Default</th>
    </tr>
  </thead>
  <tbody>
  {% for phrase in specs.ui.ask.combo.options.phrases %}
    <tr>
      <td><code>{{ phrase.key }}</code></td>
      <td>{{ phrase.desc | markdown | safe }}</td>
      <td><code>{{ phrase.default }}</code></td>
    </tr>
  {%- endfor -%}
  </tbody>
</table>
