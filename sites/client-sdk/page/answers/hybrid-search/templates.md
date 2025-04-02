---
title: Hybrid search module - template helpers
---

The SDK offers some helper templates for the hybrid search UI. You can leverage these templates to quickly set up the hybrid search UI in your application by either using the them directly or modifying the HTML string to suit your needs.

#### Root

The `root` template is all to you to set up the hybrid search UI. It contains a query input, a answer section and a search result section.

```js
const templates = MisoClient.ui.defaults.hybridSearch.templates;
const html = templates.root({ answerBox: true });
```

{# TODO: talk about answer box #}

### Customize the templates

The easiest way to customize the hybrid search UI is to modify the HTML string returned by the templates. Alternatively, you can also copy the template results and modify them to suit your needs.

```js
const templates = MisoClient.ui.defaults.hybridSearch.templates;
const html = templates.root({ answerBox: true });
```

The template function above gives you the following result:

<miso-sdk-html-template request="ui.defaults.hybridSearch.templates.root({ answerBox: true })"></miso-sdk-html-template>

You can turn off the answer box:

```js
const templates = MisoClient.ui.defaults.hybridSearch.templates;
const html = templates.root({ answerBox: false });
```

The template function above gives you the following result:

<miso-sdk-html-template request="ui.defaults.hybridSearch.templates.root({ answerBox: false })"></miso-sdk-html-template>

#### Visibility Control for Unanswerable Questions

By default, the answer section will be hidden when the AI cannot provide an answer to the question. This behavior is controlled by the `visible-when` attribute with the value `!unanswerable`. If you want to keep the answer section visible even when there's no answer, you can simply remove the `!unanswerable` part from the attribute.

For example, to keep the answer section always visible:
```html
<miso-hybrid-search class="miso-hybrid-search-combo__answer-container miso-circled-citation-index" visible-when="ready" logo="false">
  <!-- answer section content -->
</miso-hybrid-search>
```

When using the answer box, it will also be hidden by default when there's no answer. To keep it visible, you can modify the `wireAnswerBox` function call by adding the `hideWhenUnanswerable: false` option:

```js
wireAnswerBox(client, rootElement, { hideWhenUnanswerable: false });
```
