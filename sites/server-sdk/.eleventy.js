const { MisoDocsPlugin } = require('@miso.ai/eleventy-plugin-miso-docs');

const Data = require('./data');

module.exports = function(config) {
  config.addPlugin(MisoDocsPlugin, {
    pathPrefix: '/miso-server-js-sdk/',
    site: {
      title: 'Miso SDK for Node.js',
      projectLink: 'https://github.com/MisoAI/miso-server-js-sdk',
    },
  });

  const data = new Data();
  config.addNunjucksGlobal('data', data);
  config.on('eleventy.before', () => data.refresh());
};
