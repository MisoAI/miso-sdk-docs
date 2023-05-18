const login = document.querySelector('#login');
const keyInput = document.querySelector('#key-input');

keyInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    login.style.display = 'none';
    start(keyInput.value);
    keyInput.value = '';
  }
});

function start(apiKey) {
  const misocmd = window.misocmd || (window.misocmd = []);
  misocmd.push(() => {

    MisoClient.plugins.use('std:ui');

    const isLorem = apiKey.toLowerCase() === 'lorem';
    const apiHost = isLorem ? 'http://localhost:5000/api' : 'https://api.askmiso.com/v1';

    const client = new MisoClient({ apiKey, apiHost });

    const workflow = client.ui.ask;
    workflow.useLayouts({
      container: {
        logo: false
      }
    });

  });
}
