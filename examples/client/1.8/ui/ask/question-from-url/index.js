
const misocmd = window.misocmd || (window.misocmd = []);
misocmd.push(() => {
  MisoClient.plugins.use('std:ui');
  const client = new MisoClient({
    apiKey: '...',
    apiHost: 'http://localhost:5000/api',
  });

  const question = new URLSearchParams(window.location.search).get('q');
  if (question) {
    client.ui.ask.query({ q: question });
  }

});
