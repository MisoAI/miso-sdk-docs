import { EleventyRenderPlugin } from '@11ty/eleventy';
import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import markdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';
import mila from 'markdown-it-link-attributes';
import yaml from 'js-yaml';

import Specs from './specs.js';
import Helpers from './helpers.js';

function buildMarkdown({ hostname, pathPrefix }) {
  const markdown = markdownIt({ html: true }).use(markdownItAnchor);

  // add class to all tables
  markdown.renderer.rules.table_open = () => `<table class="table">`;

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
}

export function setupMisoDocs(config, {
  hostname = 'misoai.github.io',
  pathPrefix,
  site,
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
    'asset': '/',
  });
  config.addWatchTarget('./scss/', './src/');
  config.addGlobalData('layout', 'base.njk');

  // directories
  config.setInputDirectory('page');
  config.setIncludesDirectory('../../shared/_includes');
  config.setLayoutsDirectory('../../shared/_layouts');
  config.setDataDirectory('../_data');
  config.setOutputDirectory('dist');

  // template
  config.setTemplateFormats(['njk', 'md', 'html', 'js', 'css', 'svg', 'png', 'jpg']);

  // site parameters
  config.addGlobalData('hostname', hostname);
  config.addGlobalData('site', site);

  //config.on('eleventy.config', (c) => console.log(c));

  return {
    pathPrefix,
    markdownTemplateEngine: 'njk',
  };
};
