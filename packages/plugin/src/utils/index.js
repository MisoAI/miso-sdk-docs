const files = require('./files');
const misc = require('./misc');
const sitemap = require('./sitemap');
const props = require('./props');

module.exports = Object.assign({ sitemap, props }, files, misc);