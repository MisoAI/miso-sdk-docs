---
title: Explore - quick start
---

{%- from 'macros.njk' import stackblitz_link with context -%}

You can integrate Miso related questions API in your website with a few simple steps:

1. Add Miso SDK to your webpage
1. Place Miso elements in your webpage
1. Create a Miso client instance
1. Specify `product_id` and URL mapping

{% include 'section/ui-setup.md' %}

### Place Miso elements in your webpage

In an article page of your webpage, add the following elements where you want to display the related questions:

```html
<miso-explore>
  <miso-related-questions></miso-related-questions>
</miso-explore>
```

### Create a Miso client instance and setup workflow

In your script, create a Miso client:

```js
// when the SDK is loaded asynchronously, use this pattern to access window.MisoClient
const misocmd = window.misocmd || (window.misocmd = []);
misocmd.push(() => {
  // turn on the UI plugin
  MisoClient.plugins.use('std:ui');

  // create a Miso client instance to enable explore workflow
  const client = new MisoClient(`${apiKey}`);
  const workflow = client.ui.explore;

  // tell the workflow which article you want to generate questions against
  workflow.useApi({
    product_id: 'product_id_of_the_article',
  });

  // tell the workflow how to get to the answers page given a question
  workflow.useLink(question => `/answers?q=${encodeURIComponent(question)}`);

  // kick off the workflow
  workflow.start();
});
```

See [workflow]({{ '/ui/explore/workflow/' | url }}) section for details.

### Handle user questions in another page

See the [guide]({{ '/ui/ask/quick-start/' | url }}) to implement the answers page in your website, with the [practice]({{ '/ui/ask/question-from-url/' | url }}) to take user questions from URL.
