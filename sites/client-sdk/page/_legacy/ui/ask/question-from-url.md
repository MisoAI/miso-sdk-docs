---
title: Ask UI - Take the question from URL
---

{%- from 'macros.njk' import stackblitz_link with context -%}

In this section, based on the previous [quick start]({{ '/ui/ask/quick-start/' | url }}) example, we will add the function to take user question from URL parameters.

To do so, we simply need to:

1. Get the question from URL parameters, if any
2. If there is a question, invoke query method of the workflow

#### Live demo

{{ stackblitz_link('1.8/ui/ask/question-from-url') }}

### Implementation

```diff-js
    const misocmd = window.misocmd || (window.misocmd = []);
    misocmd.push(() => {
      // turn on the UI plugin
      MisoClient.plugins.use('std:ui');
      // create a Miso client instance to enable ask workflow
-     new MisoClient(`${apiKey}`);
+     const client = new MisoClient(`${apiKey}`);

+     const question = new URLSearchParams(window.location.search).get('q');
+     if (question) {
+       client.ui.ask.query({ q: question });
+     }
    });
```
