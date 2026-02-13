import { readdirSync } from 'fs';
import { join } from 'path';
import { readYamlSync } from './files.js';
import { removeExt } from './misc.js';

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

  for (const { pages = [], ...section } of chapter.sections) {
    addPageInfo(section);
    for (const page of pages) {
      addPageInfo(page);
    }
  }

  return result;
}

export default function buildSitemap(dir) {
  const result = {};
  for (const file of readdirSync(dir)) {
    Object.assign(result, buildChapter(dir, file));
  }
  return Object.freeze(result);
}
