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
    // TODO: use proxy?
    return this._data.event;
  }
  get query_api() {
    return this._data.query_api;
  }
  get data_api() {
    return this._data.data_api;
  }
}

module.exports = Specs;
