---
title: Explore module - workflow
---

{%- from 'macros.njk' import since with context -%}

Workflows are JavaScript objects that control the process of the entire data flow from SDK API request to UI display. 

### Access workflow

You can access the workflow as the following:

```js
const workflow = client.ui.explore;
```

## Methods

### Link function

The link function is used to generate the URL for the answers page given a question. The URL should match the path of the answers page in your website.

```js
workflow.useLink(question => `/answers?q=${encodeURIComponent(question)}`);
```

{{ since('1.11.5') }}

You can access more parameters in the link function:

```js
workflow.useLink((question, args) => {
  const generated = args.generated; // whether the question is generated by Miso API
  return `/answers?q=${encodeURIComponent(question)}}`;
});
```

{{ since('1.11.5') }}

You can specify link options:

```js
workflow.useLink(linkFn, {
  open: true, // whether to open the link in a new tab
  target: '_blank', // the target attribute of the link
  rel: 'noopener nofollow', // the rel attribute of the link
});
```

The settings will be applied to both related question links and user input submission.
