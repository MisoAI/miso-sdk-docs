---
title: Ask UI - workflow
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

### Properties

```js
const questionId = workflow.questionId;
const parentQuestionId = workflow.parentQuestionId;
```

### Events

Events on workflow context:

```js
const context = client.ui.asks;

context.on('create', (workflow) => {
  // When a new workflow is created
});
```

Events on individual workflow:

```js
const workflow = client.ui.ask; // or other workflow

workflow.on('request', ({ session, payload }) => {
  // When user submits a question in search box.
});

workflow.on('done', ({ session, status, ongoing }) => {
  // When answer is fully populated
});
```

* The session will always result in either a `done`, `interrupt`, or `error` event.
* Following the three types of event, the session then always ends with a `finally` event.

<table class="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Data</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>request</code></td>
      <td>
        <code>session</code>, <code>payload</code>
      </td>
      <td>
        When user submits a question in search box.
      </td>
    </tr>
    <tr>
      <td><code>loading</code></td>
      <td>
        <code>session</code>, <code>status</code>, <code>ongoing</code>
      </td>
      <td>
        When API is called and the workflow is waiting for the response.
      </td>
    </tr>
    <tr>
      <td><code>ready</code></td>
      <td>
        <code>session</code>, <code>status</code>, <code>ongoing</code>
      </td>
      <td>
        When the workflow starts to display the answer.
      </td>
    </tr>
    <tr>
      <td><code>done</code></td>
      <td>
        <code>session</code>, <code>status</code>, <code>ongoing</code>
      </td>
      <td>
        When the answer is fully populated.
      </td>
    </tr>
    <tr>
      <td><code>interrupt</code></td>
      <td>
        <code>session</code>, <code>status</code>, <code>ongoing</code>
      </td>
      <td>
        When the current session is interrupted by a new session (usually by a new question input).
      </td>
    </tr>
    <tr>
      <td><code>error</code></td>
      <td>
        <code>session</code>, <code>status</code>, <code>ongoing</code>
      </td>
      <td>
        When the session is interrupted by an error.
      </td>
    </tr>
    <tr>
      <td><code>finally</code></td>
      <td>
        <code>session</code>, <code>status</code>, <code>ongoing</code>
      </td>
      <td>
        When the session is terminated, either due to completion, interruption or error.
      </td>
    </tr>
  </tbody>
</table>

#### Listen events globally

{{ since('1.8.2') }}

You can also listen to workflow events for all workflows at once:

```js
const context = client.ui.asks;

context.on('request', ({ workflow, session, payload }) => {
  // When user submits a question in search box.
});

context.on('done', ({ workflow, session, status, ongoing }) => {
  // When answer is fully populated
});
```

To remove an event listener, call the function returned by `on`:

```js
const off = workflow.on('done', ({ session, status, ongoing }) => {
  // ...
});

off(); // remove the listener
```
