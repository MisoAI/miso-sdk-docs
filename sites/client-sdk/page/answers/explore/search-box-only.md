---
title: Explore module - search box only
---

{%- from 'macros.njk' import since with context -%}

### Display only the search box

{{ since('1.9.1') }}

You can use the explore module with only a search box, without displaying related questions. This is useful when you want to provide a simple search entry point.

#### HTML setup

Place only the `<miso-query>` element inside the explore container:

```html
<miso-explore>
  <miso-query></miso-query>
</miso-explore>
```

#### JavaScript setup

Start the workflow with `relatedQuestions: false`:

```js
const client = new MisoClient(`${apiKey}`);
const workflow = client.ui.explore;

workflow.useLink(question => `/answers?q=${encodeURIComponent(question)}`);

// start the workflow without related questions
workflow.start({
  relatedQuestions: false,
});
```

* Note that you don't need to call `useApi` with `product_id` in this scenario, since no related questions are generated.
