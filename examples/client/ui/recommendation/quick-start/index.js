const apiKey = btoa(atob('AKeWVvgoLi4KMmO7wM6PpDNcn7tgThWww0OlWxQL').split('').reverse().join(''));

MisoClient.plugins.use('std:ui');

const client = new MisoClient(apiKey);
const unit = client.units.get();

// try different API parameters
//unit.useApi('user_to_products', { rows: 6 });

// try a different layout
//unit.useLayout('cards');

unit.start();
