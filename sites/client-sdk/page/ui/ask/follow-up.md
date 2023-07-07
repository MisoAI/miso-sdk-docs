---
title: Ask UI - follow-up questions
---

{%- from 'macros.njk' import stackblitz_link with context -%}

In this section, based on the previous [quick start]({{ '/ui/ask/quick-start/' | url }}) example, we will add the function to ask follow-up questions.

To do so, we need to:

1. Listen to `done` event of each workflow to add new elements to the page
2. When user starts over, remove the follow-up elements

#### Live demo

{{ stackblitz_link('1.7/ui/ask/follow-up') }}

### Create new follow-up questions

Add a new section to the page to hold follow-up questions:

```diff-html
    <section>
      <miso-ask>
        <miso-query></miso-query>
      </miso-ask>
    </section>

    <section>
      <miso-ask visible-when="ready">
        <div>You asked about...</div>
        <miso-question></miso-question>
        <hr>
        <miso-answer></miso-answer>
        ...
      </miso-ask>
    </section>

+   <!-- A place to put elements for follow up questions-->
+   <section id="follow-ups">
+   </section>
```

Make a render function to create new follow-up sections:

```js
function render({ parentQuestionId }) {
  return `
<div class="container">
  <miso-ask class="query-container" visible-when="initial loading" parent-question-id="${parentQuestionId}">
    <miso-query>
      <input class="input" data-role="input" placeholder="Ask a follow-up question">
      <div class="autocomplete" data-role="autocomplete">
        <ol class="suggestion-list" data-role="suggestion-list"></ol>
      </div>
    </miso-query>
  </miso-ask>
  <miso-ask visible-when="ready" logo="false" parent-question-id="${parentQuestionId}">
    <hr>
    <div class="phrase question">And then you asked about...</div>
    <miso-question></miso-question>
    <miso-answer></miso-answer>
    <miso-feedback></miso-feedback>
    <div class="phrase sources">My reply is based on the following:</div>
    <miso-sources></miso-sources>
    <hr>
    <div class="phrase">Go beyond, and learn more about this topic:</div>
    <miso-related-resources></miso-related-resources>
  </miso-ask>
</div>
`;
}
```

Listen to `done` event of each workflow to create a new follow-up section:

```diff-js
    const misocmd = window.misocmd || (window.misocmd = []);
    misocmd.push(() => {
      // turn on the UI plugin
      MisoClient.plugins.use('std:ui');
      // create a Miso client instance to enable ask workflow
-     new MisoClient(`${apiKey}`);
+     const client = new MisoClient(`${apiKey}`);

+     const rootWorkflow = client.ui.ask;
+     client.ui.asks.on('create', setup);
+     setup(rootWorkflow);
    });

+   function setup(workflow) {
+     // when a answer is fully populated, insert a new section for the follow-up question
+     workflow.on('done', () => {
+       followUpsSection.insertAdjacentHTML('beforeend', render({ parentQuestionId: workflow.questionId }));
+     });
+   }
```

### Clean up follow-up questions

When user starts over to submit a new question to the root workflow, we can clean up the follow-up questions by listening to its `loading` event:

```diff-js
    const misocmd = window.misocmd || (window.misocmd = []);
    misocmd.push(() => {
      // turn on the UI plugin
      MisoClient.plugins.use('std:ui');
      // create a Miso client instance to enable ask workflow
      const client = new MisoClient(`${apiKey}`);

      const rootWorkflow = client.ui.ask;
      client.ui.asks.on('create', setup);
      setup(rootWorkflow);

+     rootWorkflow.on('loading', () => {
+       // clean up the entire follow-ups section
+       followUpsSection.innerHTML = '';
+       // destroy all follow-up workflows
+       for (const workflow of client.ui.asks.workflows) {
+         if (workflow !== rootWorkflow) {
+           workflow.destroy();
+         }
+       }
+     });
    });
```

### Associate an element to the latest question

Let's make the outcome more elegant by extracting the `<miso-related-resources>` element to the end of page and have it always associated to the last question asked. Noted that we can use `logo` attribute to display and hide the Miso logo.

```diff-html
    <section>
      <miso-ask>
        <miso-query></miso-query>
      </miso-ask>
    </section>

    <section>
-     <miso-ask visible-when="ready">
+     <miso-ask visible-when="ready" logo="false">
        <div>You asked about...</div>
        <miso-question></miso-question>
        <hr>
        <miso-answer></miso-answer>
        <miso-feedback></miso-feedback>
        <hr>
        <div class="phrase">My reply is based on the following:</div>
        <miso-sources></miso-sources>
-       <hr>
-       <div class="phrase">Go beyond, and learn more about this topic:</div>
-       <miso-related-resources></miso-related-resources>
      </miso-ask>
    </section>

    <section id="follow-ups">
    </section>

+   <section>
+     <miso-ask id="related-resources" visible-when="ready" logo="true">
+       <hr>
+       <div class="phrase">Go beyond, and learn more about this topic:</div>
+       <miso-related-resources></miso-related-resources>
+     </miso-ask>
+   </section>
```

Remove it from the template as well:

```diff-js
    function render({ parentQuestionId }) {
      return `
    <div class="container">
      <miso-ask class="query-container" visible-when="initial loading" parent-question-id="${parentQuestionId}">
        <miso-query>
          <input class="input" data-role="input" placeholder="Ask a follow-up question">
          <div class="autocomplete" data-role="autocomplete">
            <ol class="suggestion-list" data-role="suggestion-list"></ol>
          </div>
        </miso-query>
      </miso-ask>
      <miso-ask visible-when="ready" logo="false" parent-question-id="${parentQuestionId}">
        <hr>
        <div class="phrase question">And then you asked about...</div>
        <miso-question></miso-question>
        <miso-answer></miso-answer>
        <miso-feedback></miso-feedback>
        <div class="phrase sources">My reply is based on the following:</div>
        <miso-sources></miso-sources>
-       <hr>
-       <div class="phrase">Go beyond, and learn more about this topic:</div>
-       <miso-related-resources></miso-related-resources>
      </miso-ask>
    </div>
    `;
    }
```

Last, we re-assign the workflow of the `<miso-related-resources>` element whenever a workflow is loading:

```diff-js
    function setup(workflow) {
+     // when a new query starts, associate the last section container to that workflow
+     workflow.on('loading', () => {
+       relatedResourcesContainer.workflow = workflow;
+     });
      // when a answer is fully populated, insert a new section for the follow-up question
      workflow.on('done', () => {
        followUpsSection.insertAdjacentHTML('beforeend', render({ parentQuestionId: workflow.questionId }));
      });
    }
```
