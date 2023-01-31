const { readdirSync } = require('fs');
const { join } = require('path');
const { readYamlSync } = require('./files');
const { removeExt } = require('./misc');

function buildChapter(dir, file) {
  const chapterPath = removeExt(file);
  const chapter = readYamlSync(join(dir, file));
  const result = {};

  function addPageInfo({ path, title, desc }) {
    result[`/${chapterPath}${path || ''}/`] = {
      title: `${chapter.title} - ${title}`,
      desc,
    };
  }

  for (const { pages, ...section } of chapter.sections) {
    addPageInfo(section);
    for (const page of pages) {
      addPageInfo(page);
    }
  }
  return result;
}

module.exports = function build(dir) {
  return Object.freeze(readdirSync(dir).reduce((acc, file) => ({ ...acc, ...buildChapter(dir, file) }), {}));
}
