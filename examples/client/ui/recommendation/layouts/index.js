const apiKey = btoa(atob('AKeWVvgoLi4KMmO7wM6PpDNcn7tgThWww0OlWxQL').split('').reverse().join(''));

MisoClient.plugins.use('std:ui');

const client = new MisoClient(apiKey);
client.context.user_id = '1cvu70wkn3c6u45s';

const unit = client.units.get();
unit.useApi('user_to_products', { rows: 6 });
unit.useLayout(window.selectedLayout);

window.onSelectLayout = value => unit.useLayout(value);

unit.start();
