export default class Helpers {

  constructor() {
    this._indicies = {};
  }

  isCurrentPage(pageUrl, chapter, path) {
    return pageUrl === '/' + chapter + (path || '') + '/';
  }

  // TODO: get page info (from sitemap)

  /*
  getIndex(pageUrl) {
    const indicies = this._indicies;
    if (!indicies[pageUrl]) {
      indicies[pageUrl] = 1; // start with 1 to avoid falsy value
    }
    return indicies[pageUrl]++;
  }
  */

}
