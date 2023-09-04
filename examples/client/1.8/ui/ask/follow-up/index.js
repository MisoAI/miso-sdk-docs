const followUpsSection = document.getElementById('follow-ups');
const relatedResourcesContainer = document.getElementById('related-resources');

function render({ parentQuestionId }) {
  return `
<div class="container">
  <miso-ask class="query-suggestions-container" visible-when="initial" parent-question-id="${parentQuestionId}">
    <div class="phrase query-suggestions">Related questions you can explore</div>
    <miso-query-suggestions></miso-query-suggestions>
  </miso-ask>
  <miso-ask class="query-container" visible-when="initial loading" parent-question-id="${parentQuestionId}">
    <miso-query></miso-query>
  </miso-ask>
  <miso-ask visible-when="ready" logo="false" parent-question-id="${parentQuestionId}">
    <hr>
    <div class="phrase question">And then you asked about...</div>
    <miso-question></miso-question>
    <miso-answer></miso-answer>
    <miso-feedback></miso-feedback>
    <div class="phrase sources">My reply is based on the following:</div>
    <miso-sources></miso-sources>
  </miso-ask>
</div>
`;
}

function setup(workflow) {
  // when a new query starts, associate the last section container to that workflow
  workflow.on('loading', () => {
    relatedResourcesContainer.workflow = workflow;
  });
  // when a answer is fully populated, insert a new section for the follow-up question
  workflow.on('done', () => {
    followUpsSection.insertAdjacentHTML('beforeend', render({ parentQuestionId: workflow.questionId }));
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
