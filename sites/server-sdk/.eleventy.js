import { setupMisoDocs } from './lib/setup.js';
import Data from './data.js';

export default function(config) {
  const data = new Data();
  config.addNunjucksGlobal('data', data);
  config.on('eleventy.before', () => data.refresh());

  return setupMisoDocs(config, {
    pathPrefix: '/miso-server-js-sdk/',
    site: {
      title: 'Miso SDK for Node.js',
      projectLink: 'https://github.com/MisoAI/miso-server-js-sdk',
    },
  });
};
