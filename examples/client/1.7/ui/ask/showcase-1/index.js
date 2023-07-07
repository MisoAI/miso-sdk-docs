const login = document.querySelector('#login');
const keyInput = document.querySelector('#key-input');
const mainInput = document.querySelector('miso-ask miso-query input');

keyInput.focus();

keyInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    login.style.display = 'none';
    start(keyInput.value);
    keyInput.value = '';
    mainInput.focus();
  }
});

const followUpsSection = document.getElementById('follow-ups');
const relatedResourcesContainer = document.getElementById('related-resources');

function render({ parentQuestionId }) {
  return `
<div class="container">
  <miso-ask class="query-container" visible-when="initial loading" parent-question-id="${parentQuestionId}">
    <miso-query>
      <input class="input" data-role="input" placeholder="Ask a follow-up question">
      <div class="autocomplete" data-role="autocomplete">
        <ol class="suggestion-list" data-role="suggestion-list"></ol>
      </div>
    </miso-query>
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
  // follow-up questions:
  // when a answer is fully populated, insert a new section for the follow-up question
  workflow.on('done', () => {
    followUpsSection.insertAdjacentHTML('beforeend', render({ parentQuestionId: workflow.questionId }));
  });
  // follow-up questions:
  // when a new query starts, associate the last section container (for related resources) to that workflow
  workflow.on('loading', () => {
    relatedResourcesContainer.workflow = workflow;
  });
}

function start(apiKey) {
  const misocmd = window.misocmd || (window.misocmd = []);
  misocmd.push(() => {

    MisoClient.plugins.use('std:ui');

    const isLorem = apiKey.toLowerCase() === 'lorem';
    const apiHost = isLorem ? 'http://localhost:5000/api' : 'https://api.askmiso.com/v1';

    const client = new MisoClient({ apiKey, apiHost });

    const rootWorkflow = client.ui.ask;
    setup(rootWorkflow);
    client.ui.asks.on('create', setup);

    // follow-up questions:
    // if user starts over, clean up current follow-up questions
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
}
