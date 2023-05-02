const apiKey = btoa(atob('AKeWVvgoLi4KMmO7wM6PpDNcn7tgThWww0OlWxQL').split('').reverse().join(''));

const misocmd = window.misocmd || (window.misocmd = []);
misocmd.push(() => {
  MisoClient.plugins.use('std:ui');
  new MisoClient(apiKey);
});
