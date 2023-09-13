---
title: Upload interactions
description: Upload user interaction events to Miso dataset.
---

{% from 'macros.njk' import proptable %}

#### Syntax
```js
await client.api.interactions.upload(events, options);
```

#### Parameters
The `events` parameter can be:
* An object, representing a single user interaction event
* An array of objects, representing multiple events
* A JSON string of array of objects

A single record of event object can have the following properties depending on the event type:

<style>
#event-types {
  display: flex;
  flex-flow: row wrap;
}

@media (min-width: 1200px) {
  #event-props-container {
    display: grid;
    gap: 1rem;
    grid-template-areas: "selection table";
    grid-template-columns: min-content 1fr;
  }
  #event-types-panel {
    grid-area: selection;
  }
  #event-props-table {
    grid-area: table;
  }
}
</style>

<style>
  {% for group in specs.event.groups -%}
  {%- for event in group.events -%}
  #event-props-table[data-event-type="{{ event.value }}"] tr[data-used-by-except~="{{ event.value }}"],
  {% endfor -%}
  {%- endfor -%}
  #event-props-table tr[data-used-by] {
    display: none;
  }
  {% for group in specs.event.groups -%}
  {%- for event in group.events -%}
  #event-props-table[data-event-type="{{ event.value }}"] tr[data-used-by~="{{ event.value }}"],
  {% endfor -%}
  {%- endfor -%}
  tr {
    display: table-row;
  }
</style>

<div id="event-props-container">
  <div id="event-types-panel">
    <p>
      Select an event type:
    </p>
    <div id="event-types" class="clearfix">
      {%- for group in specs.event.groups -%}
      <div class="btn-group-lite mb-4" role="group" aria-label="{{ group.title }}">
      {%- for event in group.events -%}
        <div class="labeled-input">
          <input type="radio" class="btn-check" name="event-type" id="event-type-{{ event.value }}" value="{{ event.value }}" autocomplete="off" onchange="onSelectEventType(this.value)">
          <label class="btn" for="event-type-{{ event.value }}"><code class="raw">{{ event.value }}</code></label>
        </div>
      {%- endfor -%}
      </div>
      {%- endfor -%}
    </div>
  </div>

  <table id="event-props-table" class="table">
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Type</th>
        <th scope="col">Description</th>
      </tr>
    </thead>
    <tbody>
    {%- for prop in specs.event.props -%}
      <tr {% if prop.used_by -%}data-used-by="{{ prop.used_by.join(' ') }}"{%- endif %}{% if prop.used_by_except -%}data-used-by-except="{{ prop.used_by_except.join(' ') }}"{%- endif %}>
        <td><code>{{ prop.name }}</code></td>
        <td>{{ prop.type }}</td>
        <td>{%- if prop.required -%}{{ '**Required.** ' | markdown | safe }}{%- endif -%}{{ prop.desc | markdown | safe }}</td>
      </tr>
    {%- endfor -%}
    </tbody>
  </table>
</div>

<script>
  // TODO: find a better way
  const table = document.querySelector('#event-props-table');
  const radio = document.querySelector('#event-types input[type="radio"]');
  radio.checked = true;
  function onSelectEventType(value) {
    table.setAttribute('data-event-type', value);
  }
  onSelectEventType(radio.value);
</script>

#### Options
The `options` parameter is an optional object with the following properties:

{{ proptable('data_api', 'interactions.upload.options') }}

See the [request options page]({{ '/sdk/request-options/' | url }}) for more details.

#### Return value
A `Promise` without value.

#### Examples
```js
const event = {
  type: 'add_to_cart',
  product_ids: ['a001', 'a002'],
  quantities: [3, 5],
  user_id: '...'
};
await client.api.interactions.upload(event);
```

#### Learn more
For more information, see [REST API](https://api.askmiso.com/#tag/Interaction-APIs/operation/interaction_upload_api_v1_interactions_post).
