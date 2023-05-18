((window) => {
  const _fetch = window.fetch;
  window.fetch = async function(url, options) {
    // add header: Content-Type: application/json
    options = { ...options, headers: { ...options.headers, 'Content-Type': 'application/json' } };
    return _fetch(url, options);
  }
  /*
  const Response = window.Response;
  const _json = Response.prototype.json;
  Response.prototype.json = async function() {
    const json = await _json.call(this);
    return json.data ? json : { data: json };
  }
  */
})(window);
