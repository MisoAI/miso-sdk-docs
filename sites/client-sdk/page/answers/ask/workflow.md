---
title: Ask module - workflow
---

{%- from 'macros.njk' import since with context -%}

Workflows are JavaScript objects that control the process of the entire data flow from SDK API request to UI display. 

### Access workflow

You can access the (root) workflow as the following:

```js
const workflow = client.ui.ask;
```

When there are multiple workflows, you can retrieve all of them or by question ID or by parent question ID:

```js
const context = client.ui.asks;

const workflows = context.workflows; // returns an array of workflows
const workflow0 = context.getByQuestionId('...');
const workflow1 = context.getByParentQuestionId('...');
```

You can also navigate through the question chain:

```js
const nextWorkflow0 = workflow.next; // undefined if there is no follow-up question
const nextWorkflow1 = workflow.getOrCreateNext(); // create a new workflow if absent
const previousWorkflow = workflow.previous; // undefined for the root workflow
```

Listen to workflow creation:

```js
const context = client.ui.asks;

context.on('create', (workflow) => {
  // When a new workflow is created
});
```

### Properties

```js
const questionId = workflow.questionId;
const parentQuestionId = workflow.parentQuestionId;
```

### Methods

Takes the question from URL parameter `q` and starts the query:

```js
workflow.autoQuery();
```

{{ since('1.11.4') }}

You can use a parameter other than `q`:

```js
workflow.autoQuery({
  param: 's',
});
```

### Reset

In SPA scenario, you can reset all the workflows by calling `restart()` on the root workflow:

```js
client.ui.ask.restart();
```

Note that all event listeners and configurations on the context will still be available after the reset, so you don't need to reinitialize the context.
