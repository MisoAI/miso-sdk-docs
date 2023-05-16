---
api: questions
title: Questions
description: Answer a question using deep text technology.
---

The API takes time to process the question and generate answer. You can use the `question_id` returned from the first query to poll the API until the answer is fully populated.

#### Syntax
```js
// first query
let response = await client.api.ask.questions(payload);
const { question_id } = response;

// do something with response
// ...

// subsequent queries
let intervalId;
intervalId = setInterval(async () => {
  response = await client.api.ask.questions(question_id);

  // do something with response
  // ...

  if (response.finished) {
    clearInterval(intervalId);
  }
}, 1000);
```

Alternatively, you can configure the API to return an [async iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_async_iterator_and_async_iterable_protocols) and read with `for await ... of` [pattern](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of):

```js
for await (const response of client.api.ask.questions(payload, { iterable: true })) {
  // do something with response
  // ...
}
```

{% include 'section/sdk-query-api.md' %}

#### Examples
```js
const payload = {
  user_id: '...',
  user_hash: '...',
  q: 'Who\'s the best doggo?'
};
for (const { answer, sources } of client.api.ask.questions(payload, { iterable: true })) {
  // do something with response
  // ...
}
```
