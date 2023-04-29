const misocmd = window.misocmd || (window.misocmd = []);
misocmd.push(() => {
  MisoClient.plugins.use('std:ui');
  new MisoClient({
    apiKey: '...',
    apiHost: 'http://localhost:5000/api',
  });
});
