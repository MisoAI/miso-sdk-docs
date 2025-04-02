---
title: Ask module - events
---

{% set workflow = specs.ui.workflows.ask %}

{% include '../../_shared/_workflow-events.md' %}

### Feedback Events

You can listen to feedback events when users click on the "Helpful" or "Not helpful buttons:

```js
const context = client.ui.asks;
context.on('feedback', (event) => {
  const questionId = event.workflow.questionId;
  const questionText = event.workflow._hub.states.query?.q;

  if (event.value === 'helpful') {
    // Handle helpful feedback
  } else if (event.value === 'unhelpful') {
    // Handle unhelpful feedback
  }
});
```
