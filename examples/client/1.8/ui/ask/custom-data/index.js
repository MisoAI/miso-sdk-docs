const misocmd = window.misocmd || (window.misocmd = []);
misocmd.push(() => {
  MisoClient.plugins.use('std:ui');
  const client = new MisoClient({
    apiKey: '...',
    apiHost: 'http://localhost:5000/api',
  });
  const workflow = client.ui.ask;
  workflow.useApi(false);
  const api = window.doggoganger.buildApi();
  workflow.on('input', async ({ session, payload }) => {
    const { question_id } = await api.ask.questions(payload);
    let intervalId;
    intervalId = setInterval(async () => {
      const value = await api.ask.answer(question_id);
      value.finished && clearInterval(intervalId);
      workflow.updateData({ session, value });
    }, 1000);
  });
});
