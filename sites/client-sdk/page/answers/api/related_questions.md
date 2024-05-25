---
api: related_questions
title: Ask API - related questions
description: Generate related questions against an article.
---

#### Syntax
```js
const response = await client.api.ask.relatedQuestions(payload, options);
```

{% include 'section/sdk-query-api.md' %}

#### Examples
```js
const payload = {
  product_id: '...'
};
const { related_questions } = await client.api.ask.relatedQuestions(payload);
```
