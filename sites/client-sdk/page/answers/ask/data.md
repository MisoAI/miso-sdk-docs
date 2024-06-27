---
title: Ask UI - data
---

{%- from 'macros.njk' import since with context -%}

### Configure API request

You can configure the base question API payload (request body):

```js
workflow.useApi(payload);
```

For example, to call the API with `yearly_decay` value `0.9`:

```js
workflow.useApi({ yearly_decay: 0.9 });
```

Given a question `What's the meaing of life?`, the API payload will be:

```json
{
  "question": "What's the meaing of life?",
  "yearly_decay": 0.9
}
```

See the [REST API reference](https://api.askmiso.com/#tag/Ask-APIs/operation/questions_v1_ask_questions_post) for payload options.

You can configure the default API payload for all workflows:

#### Configure API request globally

{{ since('1.8.2') }}

```js
const context = client.ui.asks;
context.useApi(payload);
```

{% include '../../_shared/_ui-user.md' %}

### Use a custom data source

You can use a custom data source in place of the built-in Miso API by the following steps:

1. Configure the workflow to disable the built-in data source.
2. Listen to `request` event of the workflow to receive data request.
3. Call `updateData` method of the workflow to update the data manually.

#### Disable built-in data source

To disable the built-in data source:

```js
// to disable for a specific workflow
workflow.useApi(false);

// or to disable for all workflows
const context = client.ui.asks;
context.useApi(false);
```

#### Listen to request event

To listen to request event:

```js
workflow.on('request', ({ session, payload }) => {
  // ...
});
```

#### Update data manually

To update API results manually:

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

#### Putting it all together

See the following example:

```js
const misocmd = window.misocmd || (window.misocmd = []);
misocmd.push(() => {
  const client = new MisoClient(`${apiKey}`);
  const workflow = client.ui.ask;
  // 1. disable the built-in data source
  workflow.useApi(false);
  // 2. listen to input event
  workflow.on('request', async ({ session, payload }) => {
    const questionId = await your.api.getQuestionId(payload); // your API call
    let intervalId;
    intervalId = setInterval(async () => {
      const value = await your.api.getAnswer(questionId); // your API call
      value.finished && clearInterval(intervalId);
      // 3. update data manually. make sure to pass in session
      //    value.finished should reflect whether there will be more data coming
      workflow.updateData({ session, value });
    }, 1000);
  });
});
```
