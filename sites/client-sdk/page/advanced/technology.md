---
title: Technology stack
---

<table class="miso-tech-stack">
  <thead>
    <tr>
      <th style="text-align: center;">Layer</th>
      <th></th>
      <th>What does it do</th>
    </tr>
  </thead>
  <tbody>
    <tr class="layer-row-spacing"></tr>
    {% for layer in data.tech_stack.layers %}
    <tr class="layer">
      <td class="layer-info-cell">
        <div class="layer-box">
          <div class="layer-title">{{ layer.title }}</div>
        </div>
      </td>
      <td class="layer-column-spacing"></td>
      <td class="layer-features-cell">
        <p class="layer-desc">{{ layer.desc | safe }}</p>
        <ul class="layer-features-list">
          {%- for feature in layer.features -%}
          <li>{{ feature | safe }}</li>
          {%- endfor -%}
        </ul>
      </td>
    </tr>
  {% endfor %}
  </tbody>
</table>
