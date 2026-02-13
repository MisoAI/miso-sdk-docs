import { setupMisoDocs } from './lib/setup.js';
import Data from './data.js';

export default function(config) {
  const data = new Data();
  config.addNunjucksGlobal('data', data);
  config.on('eleventy.before', () => data.refresh());

  return setupMisoDocs(config, {
    pathPrefix: '/miso-client-js-sdk/',
    site: {
      title: 'Miso SDK for JavaScript',
      projectLink: 'https://github.com/MisoAI/miso-client-js-sdk',
    },
  });
};
