---
title: Explore - workflow
---

Workflows are JavaScript objects that control the process of the entire data flow from SDK API request to UI display. Use `explore` workflow to work with Miso [ask/related_questions]({{ '/sdk/ask/related_questions/' | url }}) API, which allows you:

* Specify product ID to generate questions against.
* Specify URL mapping to link questions to answers page.
* Configure API payload.

### Access workflow

You can access the workflow as the following:

```js
const workflow = client.ui.explore;
```

### Specify product ID

You need to supply a `productId` to the API to generate questions against it. You can do it as the following:

```js
workflow.productId = 'product_id_of_the_article';
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

You can configure the default search API payload:

```js
workflow.useApi('related_questions', payload);
```

For example, to make the API return `8` products instead of the default value:

```js
workflow.useApi('related_questions', { rows: 8 });
```

Given a product ID `aaaa0000`, the API payload will be:

```json
{
  "product_id": "aaaa0000",
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
