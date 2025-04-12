import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { utils } from '@miso.ai/eleventy-plugin-miso-docs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
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
  });
}

function compute() {
  return Object.freeze({
    props: utils.props.buildDir(join(DATA_DIR, 'prop')),
    comparisons: computeComparisons(),
    page_meta: utils.sitemap(join(DATA_DIR, 'sitemap')),
  });
}

export default class Data {
  constructor() {
    this.refresh();
  }
  refresh() {
    this._data = compute();
  }
  get props() {
    return this._data.props;
  }
  get comparisons() {
    return this._data.comparisons;
  }
  get page_meta() {
    return this._data.page_meta;
  }
}
