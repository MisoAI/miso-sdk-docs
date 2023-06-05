---
title: Ask UI - customize data source
---

{%- from 'macros.njk' import stackblitz_link with context -%}

In this section, based on the previous [quick start]({{ '/ui/ask/quick-start/' | url }}) example, we can configure the workflow to work with a custom data source in place of the official Miso API.

To do so, we need to:

1. Configure the workflow to disable the built-in data source.
2. Listen to [input event]({{ '/ui/ask/workflow/#events' | url }}) of the workflow to receive user input.
3. Call [updateData]({{ '/ui/ask/workflow/#lifecycle' | url }}) method of the workflow to update the data manually.

#### Live demo

{{ stackblitz_link('1.7/ui/ask/custom-data') }}

### Customize your data source

See the following example:

```diff-js
    const misocmd = window.misocmd || (window.misocmd = []);
    misocmd.push(() => {
      // turn on the UI plugin
      MisoClient.plugins.use('std:ui');
      // create a Miso client instance to enable ask workflow
-     new MisoClient(`${apiKey}`);
+     const client = new MisoClient(`${apiKey}`);
+     const workflow = client.ui.ask;
+     // 1. disable the built-in data source
+     workflow.useApi(false);
+     // 2. listen to input event
+     workflow.on('input', async ({ session, payload }) => {
+       // payload = { question: "test", source_fl: ["cover_image"] }
+       const questionId = await your.api.getQuestionId(payload); // your API call
+       let intervalId;
+       intervalId = setInterval(async () => {
+         const value = await your.api.getAnswer(questionId); // your API call
+         const { finished } = value;
+         finished && clearInterval(intervalId);
+         // 3. update data manually. make sure to pass in session and ongoing flag
+         workflow.updateData({ session, value, ongoing: !finished });
+       }, 1000);
+     });
    });
```
