import * as specs from './specs/index.js';

function compute() {
  return Object.freeze({ ...specs });
}

export default class Specs {
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
  get ui() {
    return this._data.ui;
  }
}
