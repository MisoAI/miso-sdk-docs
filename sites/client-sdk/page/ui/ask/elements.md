---
title: Ask UI - elements
---

{%- from 'macros.njk' import stackblitz_link with context -%}

Integrate Miso ask API in your webpage with the following elements:

```html
<!-- Place this section where you want the question input box to be -->
<miso-ask>
  <miso-query></miso-query>
</miso-ask>

<!-- Place this section where you want to display the answer -->
<miso-ask>
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
</miso-ask>

<!-- This element is only available for follow-up questions -->
<miso-ask>
  <miso-query-suggestions></miso-query-suggestions>
</miso-ask>
```

### Elements

You can mix other elements into the section, split them into multiple sections, or leave out some components:

```html
<miso-ask>
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
</miso-ask>

<miso-ask>
  <div>Go beyond, and learn more about this topic:</div>
  <!-- articles for further reading -->
  <miso-related-resources></miso-related-resources>
</miso-ask>
```

### Visibility

You can make the section invisible until the search results are ready:

```html
<miso-ask visible-when="ready">
  ...
</miso-ask>
```

Or display an error message:

```html
<miso-ask visible-when="erroneous">
  ...
</miso-ask>
```

The following visibility states are available:

* `initial`: The initial state, before the user enters a question.
* `loading`: The user has entered a question, waiting for the API to return the results.
* `ready`: The answer is ready to be displayed.
* `erroneous`: An error occurred while fetching the results.

### Layouts

You can configure the details of the Miso elements using workflow API:

```js
const workflow = client.ui.ask;
workflow.useLayouts({
  container: ...,
  query: ...,
  question: ...,
  answer: ...,
  sources: ...,
  related_resources: ...,
  query_suggestions: ...
});
```

You can find configuration details in the following sections:

* [Workflow]({{ '/ui/element/workflow/' | url }}) (`container`)
* [Collections]({{ '/ui/element/collections/' | url }}) (`sources`, `related_resources`)
* [Search box]({{ '/ui/element/search-box/' | url }}) (`query`)
