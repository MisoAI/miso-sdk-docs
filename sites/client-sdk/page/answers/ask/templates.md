---
title: Ask module - template helpers
---

The SDK offers some helper templates for the Ask UI. You can leverage these templates to quickly set up the Ask UI in your application by either using the them directly or modifying the HTML string to suit your needs.

#### Root

The `root` template is rendered when the Ask UI is initialized. It contains the query input and the answer sections (which is empty at the beginning) for the root question.

#### Follow-up

The `followUp` template is rendered when the answer of a question is fully displayed. It contains the query input and the answer sections for the follow-up question.

### Customize the templates

The easiest way to customize the Ask UI is to modify the HTML string returned by the templates. Note that if you want the change applied to all questions, you need to modify both `root` and `followUp` templates.

#### Root

```js
const rootElement = document.querySelector('#miso-ask-combo');
let html = MisoClient.ui.defaults.ask.templates.root();
// ... modify the HTML string
rootElement.innerHTML = html;
```

#### Follow-up

Suppose you wire up the follow-up feature using the `wireFollowUp` helper function, you can pass in your own `followUp` template function as an option to customize it:

```js
function followUpTemplate({ parentQuestionId }) {
  let html = MisoClient.ui.defaults.ask.templates.followUp({ parentQuestionId });
  // ... modify the HTML string
  return html;
}

wireFollowUps(client, rootElement.querySelector(`.miso-ask-combo__follow-ups`), {
  template: followUpTemplate
});
```

#### Examples

For example, suppose you want to add a disclaimer section right after the feedback element, you can do the following:

```js
function addDisclaimer(html) {
  let i = html.indexOf('</miso-feedback>');
  if (i < 0) {
    throw new Error('Cannot find the feedback element');
  }
  i += '</miso-feedback>'.length;
  return html.slice(0, i) + '<div class="disclaimer">This is a disclaimer</div>' + html.slice(i);
}
```

### Default values

For your reference, the default templates used in the [quick start guide]({{ '/answers/ask/quick-start/' | url }}) are equivalent to the following:

#### Root

```js
const html = MisoClient.ui.defaults.ask.templates.root();
```

The `root` template is a function that returns the following HTML:

<miso-sdk-html-template request="ui.defaults.ask.templates.root()"></miso-sdk-html-template>

#### Follow-up

```js
const html = MisoClient.ui.defaults.ask.templates.followUp({ parentQuestionId });
```

The `followUp` template is a function that returns the following HTML:

<miso-sdk-html-template request="ui.defaults.ask.templates.followUp({ parentQuestionId: '${parentQuestionId}' })"></miso-sdk-html-template>
