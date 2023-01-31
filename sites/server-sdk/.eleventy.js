const { MisoDocsPlugin } = require('@miso.ai/eleventy-plugin-miso-docs');

const Data = require('./data');

module.exports = function(config) {
  config.addPlugin(MisoDocsPlugin, {
    pathPrefix: '/miso-sdk-docs/',
  });

  const data = new Data();
  config.addNunjucksGlobal('data', data);
  config.on('eleventy.before', () => data.refresh());
};
