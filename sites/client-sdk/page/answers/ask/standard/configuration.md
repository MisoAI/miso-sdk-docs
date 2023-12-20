---
title: Ask module (standard) - configuration
---

You can configure the ask module with the some options, including:
* Features
* Phrases

{% include 'step/sdk-setup-combo-config.md' %}

### Access the configuation method

Now you can access the configuration method:

```js
const misocmd = window.misocmd || (window.misocmd = []);
misocmd.push(() => {
  const MisoClient = window.MisoClient;
  const combo = MisoClient.ui.combo.ask;

  // pass the configuration options
  combo.config({
    //...
  });

  // manually start the routine, since we have disabled the auto-start
  combo.start();
});
```

## Features

You can configure the features of the ask module:

```js
combo.config({
  features: {
    relatedResources: true,
    followUpQuestions: true,
    querySuggestions: true,
  },
});
```

The following table lists the available options:

| Key | Description | Default |
| --- | ----------- | ------- |
{%- for feature in specs.ui.ask.combo.options.features %}
| `{{ feature.key }}` | {{ feature.desc | markdown | safe | trim }} | `{{ feature.default | safe }}` |
{%- endfor %}

## Phrases

You can configure the phrases displayed in the ask module:

```js
combo.config({
  phrases: {
    question: 'You asked...',
    sources: 'My reply is based on the following',
    relatedQuestions: 'Related questions you can explore',
    relatedResources: 'Go beyond, and learn more about this topic',
  },
});
```

The following table lists the available options:

| Key | Description | Default |
| --- | ----------- | ------- |
{%- for phrase in specs.ui.ask.combo.options.phrases %}
| `{{ phrase.key }}` | {{ phrase.desc | markdown | safe | trim }} | `{{ phrase.default | safe }}` |
{%- endfor %}
