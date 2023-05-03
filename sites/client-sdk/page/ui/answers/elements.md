---
title: Answers UI - elements
---

{%- from 'macros.njk' import stackblitz_link with context -%}

Integrate Miso answers in your webpage with the following elements:

```html
<!-- Place this section where you want the question input box to be -->
<miso-answers>
  <miso-query></miso-query>
</miso-answers>

<!-- Place this section where you want to display the answer -->
<miso-answers>
  <div>You asked about...</div>
  <!-- question text -->
  <miso-question></miso-question>
  <!-- answer text -->
  <miso-answer></miso-answer>
  <!-- feedback buttons -->
  <miso-feedback></miso-feedback>
  <!-- references in the answer -->
  <miso-sources></miso-sources>
  <!-- articles for further reading -->
  <miso-related-resources></miso-related-resources>
</miso-answers>
```

### Elements

You can mix other elements into the section, split them into multiple secions, or leave out some components:

```html
<miso-answers>
  <div>You asked about...</div>
  <!-- question text -->
  <miso-question></miso-question>
  <!-- answer text -->
  <miso-answer></miso-answer>
  <!-- feedback buttons -->
  <!--
  <miso-feedback></miso-feedback>
  -->
  <div>My reply is based on the following:</div>
  <!-- references in the answer -->
  <miso-sources></miso-sources>
</miso-answers>

<miso-answers>
  <div>Go beyond, and learn more about this topic:</div>
  <!-- articles for further reading -->
  <miso-related-resources></miso-related-resources>
</miso-answers>
```

You can make the section invisible until the search results are ready:

```html
<miso-answers visible-when="ready">
  ...
</miso-answers>
```

### Layouts

You can configure the details of the Miso elements using workflow API:

```js
const workflow = client.ui.answers;
workflow.useLayouts({
  container: ...
  question: ...
  answer: ...
  sources: ...
  related_resources: ...
});
```

You can find configuration details in the following sections:

* [Workflow]({{ '/ui/element/workflow/' | url }}) (`container`)
* [Collections]({{ '/ui/element/collections/' | url }}) (`sources`, `related_resources`)
