const specs = require('@miso.ai/miso-specs');

function compute() {
  return Object.freeze(specs);
}

class Specs {
  constructor() {
    this.refresh();
  }
  refresh() {
    this._data = compute();
  }
  get event() {
    // TODO: use proxy
    return this._data.event;
  }
}

module.exports = Specs;
