{% from 'macros.njk' import proptable %}

#### Payload
The `payload` parameter is an object with the following properties:

{{ proptable('query_api', api + '.payload') }}

{% if data.props.query_api[api + '.options'] %}

#### Options
The `options` parameter is an optional object with the following properties:

{{ proptable('query_api', api + '.options') }}

See the [request options page]({{ '/sdk/request-options/' | url }}) for more details.

{% endif %}

#### Return value
A `Promise` of response object with the following properties:

{{ proptable('query_api', api + '.response') }}
