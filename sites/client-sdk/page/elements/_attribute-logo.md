### `logo`

Control Miso logo display. 

By default, Miso logo is appended at the end of the container that contains the main data component ({% include './_container-main-components-inline.md' %}) when data is ready. You can control the logo display by setting the `logo` attribute on the container element.

```html
<miso-{{ container.name }} logo="false">
  <!-- ... -->
</miso-{{ container.name }}>
```

| Value   | Default | Behavior |
| ------- |:-------:| -------- |
| `true`  |         | Miso logo is appended at the end of container when data is ready. |
| `false` |         | Miso logo is not displayed. |
| `auto`  | ✓       | Miso logo is appended at the end of container when data is ready only if it contains the main component. (e.g. {% include './_container-main-components-inline.md' %}) |
