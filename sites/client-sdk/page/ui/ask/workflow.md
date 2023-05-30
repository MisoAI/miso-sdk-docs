---
title: Ask UI - workflow
---

Workflows are JavaScript objects that control the process of the entire data flow from SDK API request to UI display. Use `ask` workflow to work with Miso [ask]({{ '/sdk/ask/' | url }}) API, which allows you:

* Configure API default payload.
* Configure the look and feel of UI elements.

### Access workflow

You can access the (root) workflow as the following:

```js
const workflow = client.ui.ask;
```

When there are multiple workflows, you can retrieve all of them or by question ID or by parent question ID:

```js
const workflows = client.ui.asks.workflows; // returns an array of workflows

const workflow0 = client.ui.asks.getByQuestionId('...');

const workflow1 = client.ui.asks.getByParentQuestionId('...');
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
workflow.useApi('questions', payload);
```

For example, to make the API return `8` products instead of the default value:

```js
workflow.useApi('questions', { rows: 8 });
```

Given a question `What's the meaing of life?`, the API payload will be:

```json
{
  "q": "What's the meaing of life?",
  "rows": 8
}
```

Available `apiName` values are:

<table class="table">
  <thead>
    <tr>
      <th scope="col">Value</th>
      <th scope="col">API</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>questions</code></td>
      <td>
        <a href="{{ '/sdk/ask/questions/' | url }}">Questions</a>
      </td>
    </tr>
  </tbody>
</table>

See the API reference for payload options.

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

### Events

Events on workflow collection:

```js
client.ui.asks.on('create', (workflow) => {
  // When a new workflow is created
});
```

Events on individual workflow:

```js
const workflow = client.ui.ask; // or other workflow

workflow.on('loading', () => {
  // When API is called and we are waiting for the response
});

workflow.on('ready', () => {
  // When answer starts to display
});

workflow.on('done', () => {
  // When answer is fully populated
});

```