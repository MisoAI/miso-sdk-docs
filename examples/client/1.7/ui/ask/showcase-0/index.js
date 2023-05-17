
const misocmd = window.misocmd || (window.misocmd = []);
misocmd.push(() => {
  MisoClient.plugins.use('std:ui');
  const client = new MisoClient({
    apiKey: '...',
    apiHost: 'http://localhost:5000/api',
  });
  const workflow = client.ui.ask;
  workflow.useLayouts({
    container: {
      logo: false
    }
  });
});
