const { MisoDocsPlugin } = require('@miso.ai/eleventy-plugin-miso-docs');

const Data = require('./data');

module.exports = function(config) {
  config.addPlugin(MisoDocsPlugin, {
    pathPrefix: '/miso-client-js-sdk/',
    site: {
      title: 'Miso SDK for JavaScript',
      projectLink: 'https://github.com/MisoAI/miso-client-js-sdk',
    },
  });

  const data = new Data();
  config.addNunjucksGlobal('data', data);
  config.on('eleventy.before', () => data.refresh());
};
