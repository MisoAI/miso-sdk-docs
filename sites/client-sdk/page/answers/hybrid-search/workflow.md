---
title: Hybrid search module - workflow
---

{%- from 'macros.njk' import since with context -%}

Workflows are JavaScript objects that control the process of the entire data flow from SDK API request to UI display. 

### Access workflow

You can access the workflow as the following:

```js
const workflow = client.ui.hybridSearch;
```

### Properties

```js
const questionId = workflow.questionId;
```

### Methods

Takes the search term from URL parameter `q` and starts the query:

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
