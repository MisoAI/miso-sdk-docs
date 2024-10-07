---
title: Ask UI - template helpers
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

```html
<section id="miso-ask-combo__question" class="miso-ask-combo__section miso-ask-combo__question">
  <miso-ask class="miso-ask-combo__query-container">
    <miso-query></miso-query>
  </miso-ask>
</section>
<section class="miso-ask-combo__section miso-ask-combo__answer">
  <miso-ask class="miso-ask-combo__answer-container miso-circled-citation-index" logo="false" visible-when="ready">
    <div class="miso-ask-combo__phrase miso-ask-combo__question-phrase">You asked...</div>
    <miso-question></miso-question>
    <miso-answer></miso-answer>
    <miso-feedback></miso-feedback>
  </miso-ask>
  <miso-ask class="miso-ask-combo__affiliation-container miso-circled-citation-index" logo="false" visible-when="nonempty">
    <miso-affiliation></miso-affiliation>
  </miso-ask>
  <miso-ask class="miso-ask-combo__sources-container miso-circled-citation-index" logo="false" visible-when="nonempty">
    <hr>
    <h3 class="miso-ask-combo__phrase miso-ask-combo__sources-phrase">My reply is based on the following</h3>
    <miso-sources></miso-sources>
  <miso-ask class="miso-ask-combo__bottom-spacing-container" visible-when="ongoing"></miso-ask>
</section>
<div id="miso-ask-combo__follow-ups" class="miso-ask-combo__follow-ups"></div>
<section id="miso-ask-combo__related-resources" class="miso-ask-combo__section miso-ask-combo__related-resources">
  <miso-ask visible-when="nonempty" logo="true">
    <h2 class="miso-ask-combo__phrase miso-ask-combo__related-resources-phrase">Go beyond, and learn more about this topic</h2>
    <miso-related-resources></miso-related-resources>
  </miso-ask>
</section>
```

#### Follow-up

```js
const html = MisoClient.ui.defaults.ask.templates.followUp({ parentQuestionId });
```

The `followUp` template is a function that returns the following HTML:

```html
<section class="miso-ask-combo__section miso-ask-combo__follow-up">
  <miso-ask class="miso-ask-combo__query-suggestions-container" visible-when="initial+nonempty" parent-question-id="${parentQuestionId}">
    <h3 class="miso-ask-combo__phrase miso-ask-combo__related-questions-phrase">Related questions you can explore</h3>
    <miso-query-suggestions></miso-query-suggestions>
  </miso-ask>
  <miso-ask class="miso-ask-combo__query-container" visible-when="initial loading" parent-question-id="${parentQuestionId}">
    <miso-query></miso-query>
  </miso-ask>
  <miso-ask class="miso-ask-combo__answer-container miso-circled-citation-index" logo="false" visible-when="ready" parent-question-id="${parentQuestionId}">
    <hr>
    <div class="miso-ask-combo__phrase miso-ask-combo__question-phrase">You asked...</div>
    <miso-question></miso-question>
    <miso-answer></miso-answer>
    <miso-feedback></miso-feedback>
  </miso-ask>
  <miso-ask class="miso-ask-combo__affiliation-container miso-circled-citation-index" logo="false" visible-when="nonempty">
    <miso-affiliation></miso-affiliation>
  </miso-ask>
  <miso-ask class="miso-ask-combo__sources-container miso-circled-citation-index" logo="false" visible-when="nonempty" parent-question-id="${parentQuestionId}">
    <hr>
    <h3 class="miso-ask-combo__phrase miso-ask-combo__sources-phrase">My reply is based on the following</h3>
    <miso-sources></miso-sources>
  </miso-ask>
  <miso-ask class="miso-ask-combo__bottom-spacing-container" visible-when="ongoing" parent-question-id="${parentQuestionId}"></miso-ask>
</section>
```
