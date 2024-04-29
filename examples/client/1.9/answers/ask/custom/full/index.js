const misocmd = window.misocmd || (window.misocmd = []);
misocmd.push(async () => {
  // setup client
  const MisoClient = window.MisoClient;
  const client = new MisoClient('eEQnZdeEMfuuvJXTdJ4u1ELjKgk0Ryx61j1zIYS7');
  const rootWorkflow = client.ui.ask;
  // render DOM and get elements
  await client.ui.ready;
  const { templates, wireFollowUps, wireRelatedResources } = MisoClient.ui.defaults.ask;
  const rootElement = document.querySelector('#miso-ask-combo');
  rootElement.innerHTML = templates.root();
  // setup workflows
  wireFollowUps(client, rootElement.querySelector(`.miso-ask-combo__follow-ups`));
  wireRelatedResources(client, rootElement.querySelector(`.miso-ask-combo__related-resources`));
  // start query if specified in URL
  rootWorkflow.autoQuery();
});
