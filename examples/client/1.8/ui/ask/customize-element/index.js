const misocmd = window.misocmd || (window.misocmd = []);
misocmd.push(() => {
  MisoClient.plugins.use('std:ui');
  const client = new MisoClient({
    apiKey: '...',
    apiHost: 'http://localhost:5000/api',
  });
  const workflow = client.ui.ask;
  workflow.useApi('questions', {
    source_fl: ['cover_image', 'url', 'created_at', 'updated_at'],
  });
  workflow.useLayouts({
    sources: {
      templates: {
        product: renderSourceContent,
      },
    },
  });
});
function renderSourceContent(layout, state, data) {
  const { url, cover_image, title, created_at, snippet } = data;
  return `
<a class="miso-list__item-body" data-role="item" href="${url}" target="_blank" rel="noopener">
  <div class="miso-list__item-cover-image-container">
    <img class="miso-list__item-cover-image" src="${cover_image}">
  </div>
  <div class="miso-list__item-info-container">
    <div class="miso-list__item-title">${title}</div>
    <div class="miso-list__item-date">${new Date(
      created_at
    ).toLocaleDateString()}</div>
    <div class="miso-list__item-snippet">${snippet}</div>
  </div>
</a>`;
}
