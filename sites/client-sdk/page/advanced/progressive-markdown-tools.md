---
title: Tools for standalone progressive markdown rendering 
---

{%- from 'macros.njk' import since with context -%}

{{ since('1.10.0') }}

Miso provides a tool for standalone progressive markdown rendering, which does not depends on the SDK client nor the SDK UI module.

## Access the package

#### As a node module

In your project directory, run:

```bash
npm install --save @miso.ai/progressive-markdown
```

And then you can import the tools you need:

```js
import { Controller, presetMiso, loadStyles } from '@miso.ai/progressive-markdown';
// ...
```

#### Using a script tag

Alternatively, you can add the script tag to your webpage:

{% from 'macros.njk' import sdk_script_tag, sdk_styles_tag %}
{{ sdk_script_tag('miso-markdown.min.js') }}

* You can put the script tag anywhere in the document.

The module is available at `window.misomarkdown`. However, it won't be available until the script is loaded. We provide a way to access it regardless of the loading status:

```js
window.misomarkdown = window.misomarkdown || {};
window.misomarkdown.onload = () => {
  const { Controller, presetMiso, loadStyles } = window.misomarkdown;
  // ...
};
```

## Using the tools

#### Load the styles

First, you may want to load the default styles used by the tools:

```js
loadStyles();
```

Or, alternatively, you can include the stylesheet by your own:

{{ sdk_styles_tag('markdown.css') }}

#### Use the controller to render markdown

```diff-js
+   import { Controller, presetMiso, loadStyles } from '@miso.ai/progressive-markdown';

+   loadStyles();

    const inputElement = document.getElementById('input');
    const answerElement = document.getElementById('answer');

+   const controller = new Controller(answerElement, {
+     presets: [presetMiso],
+   });

    inputElement.addEventListener('keyup', (event) => (event.key === 'Enter') && handleSubmit(event));

    function handleSubmit(event) {
      query(inputElement.value.trim());
      inputElement.blur();
    }

    inputElement.focus();

    // API //
    const API_KEY = '...';
    const POLL_INTERVAL_MS = 1000;
    const DEFAULT_QUESTION_PAYLOAD = {
      cite_end: ']',
      cite_link: 1,
      cite_start: '[',
    };

    let currentQueryIndex = -1;

    async function query(question) {
      if (!question) {
        return;
      }
      // make a new session
      const queryIndex = ++currentQueryIndex;

      // show loading status
+     controller.clear();

      const questionId = await fetchQuestionId({ ...DEFAULT_QUESTION_PAYLOAD, question });
      if (queryIndex !== currentQueryIndex) {
        return; // next question has been asked
      }

      // polling for answer
      while (true) {
        if (queryIndex !== currentQueryIndex) {
          break;
        }
        const response = await fetchAnswer(questionId);
        if (queryIndex !== currentQueryIndex) {
          break;
        }
+       controller.update(response);
        if (response.finished) {
          break;
        }
        await new Promise(resolve => setTimeout(resolve, POLL_INTERVAL_MS));
      }
    }

    async function fetchQuestionId(payload) {
      const response = await window.fetch(`https://api.askmiso.com/v1/ask/questions?api_key=${API_KEY}`, {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      const { data } = await response.json();
      return data.question_id;
    }

    async function fetchAnswer(questionId) {
      const response = await window.fetch(`https://api.askmiso.com/v1/ask/questions/${questionId}/answer?api_key=${API_KEY}`);
      const { data } = await response.json();
      return data;
    }
```
