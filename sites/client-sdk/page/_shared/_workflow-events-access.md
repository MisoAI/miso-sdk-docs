### Listen to events

You can listen to several events on the `{{ workflow.name }}` workflow. 

{% if workflow.context.context_name %}
#### Listen to events on all workflows

{{ since('1.8.2') }}

```js
const context = client.ui.{{ workflow.context.context_name }};

context.on('request', ({ workflow, session, payload }) => {
  // When user submits a question in search box.
});

context.on('done', ({ workflow, session, status, ongoing }) => {
  // When answer is fully populated
});
```

To remove an event listener, call the function returned by `on`:

```js
const off = context.on('done', ({ workflow, session, status, ongoing }) => {
  // ...
});

off(); // remove the listener
```
{% endif %}

#### Listen to events on an individual workflow

```js
workflow.on('request', ({ session, payload }) => {
  // When user submits a question in search box.
});

workflow.on('done', ({ session, status, ongoing }) => {
  // When answer is fully populated
});
```

To remove an event listener, call the function returned by `on`:

```js
const off = workflow.on('done', ({ session, status, ongoing }) => {
  // ...
});

off(); // remove the listener
```

See [workflow]({{ [workflow.url, 'workflow/'] | join | url }}) for individual workflow access.
