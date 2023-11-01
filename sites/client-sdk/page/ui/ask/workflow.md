---
title: Ask UI - workflow
---

{%- from 'macros.njk' import since with context -%}

Workflows are JavaScript objects that control the process of the entire data flow from SDK API request to UI display. Use `ask` workflow to work with Miso [ask/questions]({{ '/sdk/ask/questions/' | url }}) API, which allows you:

* Configure API default payload.
* Configure the look and feel of UI elements.

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

See [follow-up questions]({{ '/ui/ask/follow-up/' | url }}) for details.

### Properties

```js
const questionId = workflow.questionId;
const parentQuestionId = workflow.parentQuestionId;
```

### Configure API

You can configure the default search API payload:

```js
workflow.useApi(payload);
```

For example, to make the API return `8` products instead of the default value:

```js
workflow.useApi({ rows: 8 });
```

Given a question `What's the meaing of life?`, the API payload will be:

```json
{
  "q": "What's the meaing of life?",
  "rows": 8
}
```

See the [REST API reference](https://api.askmiso.com/#tag/Ask-APIs/operation/questions_v1_ask_questions_post) for payload options.

You can configure the default API payload for all workflows:

#### Configure API globally

{{ since('1.8.2') }}

```js
const context = client.ui.asks;
context.useApi(payload);
```

To disable the built-in data source:

```js
// to disable for a specific workflow
workflow.useApi(false);

// or to disable for all workflows
const context = client.ui.asks;
context.useApi(false);
```

See <a href="{{ '/ui/ask/custom-data/' | url }}">customize data source</a> for details.

### Configure UI

You can choose the layout for the results:

```js
workflow.useLayouts({
  sources: 'cards', // or 'carousel', 'list' (default)
  related_resources: 'carousel' // or 'cards', 'list' (default)
});
```

To hide Miso logo:

```js
workflow.useLayouts({
  container: { logo: false }
});
```

See [elements]({{ '/ui/ask/elements/' | url }}) section for details.

#### Configure UI globally

{{ since('1.8.2') }}

You can configure the default layouts options for all workflows:

```js
const context = client.ui.asks;
context.useLayouts({
  //...
});
```

### Lifecycle

Update API results manually. See [customize data source]({{ '/ui/ask/custom-data/' | url }}) for details.

```js
const data = { session, value, ongoing };
workflow.updateData(data);
```

The data object has the following properties:

<table class="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Type</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>session</code></td>
      <td>object</td>
      <td>
        <strong>Required.</strong> Session object from `input` event. Updates associated to expired sessions are ignored.
      </td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>object</td>
      <td>
        <strong>Required.</strong> Result of <a href="{{ '/sdk/ask/questions/' | url }}">questions</a> API.
      </td>
    </tr>
    <tr>
      <td><code>ongoing</code></td>
      <td>boolean</td>
      <td>
        Whether the result is ongoing, expecting more updates to the current session. Default: <code>false</code>.
      </td>
    </tr>
  </tbody>
</table>

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
