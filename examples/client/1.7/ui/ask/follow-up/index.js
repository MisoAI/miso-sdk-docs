const followUpsSection = document.getElementById('follow-ups');
const relatedResourcesContainer = document.getElementById('related-resources');
const TEMPLATE_STRING = `
<div class="follow-up">
  <hr>
  <miso-ask visible-when="initial loading" parent-question-id="{{parentQuestionId}}">
    <miso-query></miso-query>
  </miso-ask>
  <miso-ask visible-when="ready" parent-question-id="{{parentQuestionId}}" logo="false">
    <div class="phrase">You asked about...</div>
    <miso-question></miso-question>
    <hr>
    <miso-answer></miso-answer>
    <miso-feedback></miso-feedback>
    <hr>
    <div class="phrase">My reply is based on the following:</div>
    <miso-sources></miso-sources>
  </miso-ask>
</div>`;

const template = (data) => {
  let html = TEMPLATE_STRING.trim();
  for (const key of Object.keys(data)) {
    const value = data[key];
    html = html.replaceAll(`{{${key}}}`, value);
  }
  return html;
};

function setup(workflow) {
  // when a new query starts, associate the last section container to that workflow
  workflow.on('loading', () => {
    relatedResourcesContainer.workflow = workflow;
  });
  // when a answer is fully populated, insert a new section for the follow-up question
  workflow.on('done', () => {
    followUpsSection.insertAdjacentHTML('beforeend', template({ parentQuestionId: workflow.questionId }));
  });
}

const misocmd = window.misocmd || (window.misocmd = []);
misocmd.push(() => {
  MisoClient.plugins.use('std:ui');
  const client = new MisoClient({
    apiKey: '...',
    apiHost: 'http://localhost:5000/api',
  });

  const rootWorkflow = client.ui.ask;
  client.ui.asks.on('create', setup);
  setup(rootWorkflow);

  rootWorkflow.on('loading', () => {
    // clean up the entire follow-ups section
    followUpsSection.innerHTML = '';
    // destroy all follow-up workflows
    for (const workflow of client.ui.asks.workflows) {
      if (workflow !== rootWorkflow) {
        workflow.destroy();
      }
    }
  });

});
