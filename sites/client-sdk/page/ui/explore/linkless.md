---
title: Explore UI - Linkless
---

{%- from 'macros.njk' import stackblitz_link with context -%}

In this section, based on the previous [quick start]({{ '/ui/explore/quick-start/' | url }}) example, we will handle question selection without using links.

To do so, we need to:

1. Turn off link mapping function.
1. Listen to `select` event of the workflow to receive user selection.
1. Track `click` event manually, if necessary.

### Implementation

```diff-js
    const misocmd = window.misocmd || (window.misocmd = []);
    misocmd.push(() => {
      // turn on the UI plugin
      MisoClient.plugins.use('std:ui');

      // create a Miso client instance to enable explore workflow
      const client = new MisoClient(`${apiKey}`);
      const workflow = client.ui.explore;

      // tell the workflow which article you want to generate questions against
      workflow.product_id = 'product_id_of_the_article';

-     // tell the workflow how to get to the answers page given a question
-     workflow.useLink(question => `/answers?q=${encodeURIComponent(question)}`);
+     // omit link mapping, so list items are generated without links
+     workflow.useLink(false);
+ 
+     // listen to select event
+     workflow.on('select', ({ question }) => {
+       // do something with the question
+       const { text } = question;
+       // ...
+       workflow.tracker.click([ text ]); // track click event manually
+     });

      // kick off the workflow
      workflow.start();
    });
```
