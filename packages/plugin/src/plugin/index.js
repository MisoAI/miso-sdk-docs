const { EleventyRenderPlugin } = require('@11ty/eleventy');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const mila = require('markdown-it-link-attributes');
const yaml = require('js-yaml');

const Specs = require('./specs.js');
const Helpers = require('./helpers.js');

const overrides = [];
const listeners = new WeakSet();

function overrideConfigResult(config, result) {
  if (!listeners.has(config)) {
    config.on('eleventy.config', (c) => {
      Object.assign(c.config, ...overrides);
    });
    listeners.add(config);
  }
  overrides.push(result);
}

function buildMarkdown({ hostname, pathPrefix }) {
  const markdown = markdownIt({ html: true }).use(markdownItAnchor);

  // add attributes on all external links
  // TODO: make it configurable by hostname
  // TODO: include pathPrefix
  markdown.use(mila, {
    pattern: /^(?!(https:\/\/misoai\.github\.io|#)).*$/gm,
    attrs: {
      target: '_blank',
      rel: 'noopener',
    },
  });

  return markdown;
}

function configMarkdown(config, options) {
  const markdown = buildMarkdown(options);
  config.setLibrary('md', markdown);
  config.addNunjucksFilter('markdown', value => markdown.renderInline(value));

  overrideConfigResult(config, {
    markdownTemplateEngine: 'njk', // 11ty offers stronger context support with njk toolchain
  });
}

module.exports = function MisoDocsPlugin(config, {
  hostname = 'misoai.github.io',
  pathPrefix,
} = {}) {

  // extentions & libraries
  config.addPlugin(EleventyRenderPlugin);
  config.addPlugin(syntaxHighlight);
  configMarkdown(config, { hostname, pathPrefix });
  config.addDataExtension('yml', contents => yaml.load(contents));
  // config.addPlugin(toc, { tags: ['h2', 'h3'] });

  // data & helpers
  const specs = new Specs();
  config.addNunjucksGlobal('specs', specs);
  config.on('eleventy.before', () => specs.refresh());
  config.addNunjucksGlobal('helpers', new Helpers());

  // site structure
  config.addPassthroughCopy({
    '../shared/asset': '/',
    'asset': '/'
  });
  // TODO: this is changed in 2.x
  config.setBrowserSyncConfig({
    files: [
      './dist/css/**/*.css',
    ],
  });
  config.addGlobalData('layout', 'base.njk');
  overrideConfigResult(config, {
    dir: {
      input: 'page',
      includes: '../../shared/_includes',
      layouts: '../../shared/_layouts',
      data: '../_data',
      output: 'dist'
    }
  });

  // site parameters
  config.addGlobalData('hostname', hostname);
  overrideConfigResult(config, {
    pathPrefix,
  });

  //config.on('eleventy.config', (c) => console.log(c));
}
