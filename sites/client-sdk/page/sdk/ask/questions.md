---
api: questions
title: Questions
description: Answer a question using deep text technology.
---

The `questions` API takes time to process and generate answer. The SDK provides a simple polling mechanism to retrieve the answer.

#### Syntax
```js
// get answer object
const answer = await client.api.ask.questions(payload);

// get question ID if you are interested
const questionId = answer.questionId;

// polling response
let intervalId;
intervalId = setInterval(async () => {
  const response = await answer.get();

  // do something with response
  // ...

  if (response.finished) {
    clearInterval(intervalId);
  }
}, 1000);
```

Alternatively, the `answer` object is also [async iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_async_iterator_and_async_iterable_protocols), which can be processed with `for await ... of` [pattern](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of):

```js
// get answer object
const answer = await client.api.ask.questions(payload);

for await (const response of answer) {
  // do something with response
  // ...
}

// abort polling when necessary
answer.abort();
```

{% include 'section/sdk-query-api.md' %}

#### Examples
```js
const payload = {
  user_id: '...',
  user_hash: '...',
  question: 'Who\'s the best doggo?'
};

for (const { answer, sources } of await client.api.ask.questions(payload)) {
  // do something with response
  // ...
}
```
