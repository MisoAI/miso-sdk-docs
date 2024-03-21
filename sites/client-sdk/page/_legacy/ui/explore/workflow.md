---
title: Explore - workflow
---

{%- from 'macros.njk' import since with context -%}

Workflows are JavaScript objects that control the process of the entire data flow from SDK API request to UI display. Use `explore` workflow to work with Miso [ask/related_questions]({{ '/sdk/ask/related_questions/' | url }}) API, which allows you:

* Specify product ID to generate questions against.
* Specify URL mapping to link questions to answers page.
* Configure API payload.

### Access workflow

You can access the workflow as the following:

```js
const workflow = client.ui.explore;
```

### Specify URL mapping

When the API returns a list of questions, the workflow needs to know how to get to the answers page given a question. Suppose you have a page that handles user questions with a URL pattern `/answers?q=...`, you can specify it as the following:

```js
workflow.useLink(question => `/answers?q=${encodeURIComponent(question)}`);
```

To generate items without a link, pass in `false`:

```js
workflow.useLink(false);
```

### Configure API

To configure the default related questions API payload:

```js
workflow.useApi(payload);
```

You need to specify either a `product_id`, article `content` in the payload:

```js
workflow.useApi({
  product_id: '...',
});

workflow.useApi({
  title: '...', // optional
  content: '...', // must be non-empty to be effective
});
```

For another example, to make the API return `8` products instead of the default value:

```js
workflow.useApi({ product_id: '...', rows: 8 });
```

Then, the API payload will be:

```json
{
  "product_id": "...",
  "rows": 8
}
```

### Start workflow

You can start the workflow by calling the `start()` method:

```js
workflow.start();
```

### Events

```js
workflow.on('select', ({ session, question, element }) => {
  // When user select a question in the question list.
  const { text } = question;
  // ...
});
```

To remove an event listener, call the function returned by `on`:

```js
const off = workflow.on('select', ({ session, status, ongoing }) => {
  // ...
});

off(); // remove the listener
```
