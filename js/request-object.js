function RequestObject(params) {

	this.queryParams = this._parseQueryString(params.pop() || '');
	this.params = params;

}

RequestObject.prototype = {

	queryParam : function (key) {

		return this.queryParams[key];
	},

	multipleQueryParams : function () {

		return [];
	},

	_parseQueryString : function (url) {
		// parse query string into key/value pairs and return as object
		var query = {};
		url = (url || location.search).replace(/^.*\?/, '').replace(/([^\=]+)\=([^\&]*)\&?/g, function(match, key, value) {
			query[key] = decodeURIComponent(value);
			return '';
		} );
		return query;
	}
};

RequestObject.inject = [];

RequestObject.factory = function () {

	return function (params) {
		return new RequestObject(params);

	};
};