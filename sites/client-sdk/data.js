const { join } = require('path');
const { utils } = require('@miso.ai/eleventy-plugin-miso-docs');

const DATA_DIR = join(__dirname, '_data');

function getComparisonGroup(file) {
  let { header, groups } = utils.readYamlSync(join(DATA_DIR, file));
  groups = groups.reduce((m, { props, ...group }) => {
    props = props.map(({ left, right, ...prop }) => ({
      ...prop,
      left: utils.asArray(left),
      right: utils.asArray(right),
    }));
    m[group.key] = { ...group, props };
    return m;
  }, {});
  return Object.freeze({ header, groups });
}

function computeComparisons() {
  return Object.freeze({
    algolia: getComparisonGroup('comparison/algolia.yml'),
  });
}

function compute() {
  return Object.freeze({
    env: process.env.ENV,
    props: utils.props.buildDir(join(DATA_DIR, 'prop')),
    comparisons: computeComparisons(),
    pageMeta: utils.sitemap(join(DATA_DIR, 'sitemap')),
  });
}

class Data {
  constructor() {
    this.refresh();
  }
  refresh() {
    this._data = compute();
  }
  get env() {
    return this._data.env;
  }
  get props() {
    return this._data.props;
  }
  get comparisons() {
    return this._data.comparisons;
  }
  get pageMeta() {
    return this._data.pageMeta;
  }
}

module.exports = Data;
