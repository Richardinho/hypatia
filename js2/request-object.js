function RequestObject(params) {
	//  a query param must be provided even if it's an empty string
	//  should fix this
	this.queryParams = this._parseQueryString(params.pop() || '');
	this.params = params;

}

RequestObject.prototype = {

	param : function (index) {
		return this.params[index];
	},

	queryParam : function (key) {

		return this.queryParams[key];
	},

	multipleQueryParams : function (key) {

		if(!this.queryParams[key]){
			return [];
		} else if(Array.isArray(this.queryParams[key])){
			return this.queryParams[key];
		} else {
			var array = [];
			array.push(this.queryParams[key]);
			return array;
		}
	},

	_parseQueryString : function (url) {
		// parse query string into key/value pairs and return as object
		var query = {};
		url = (url || location.search).replace(/^.*\?/, '').replace(/([^\=]+)\=([^\&]*)\&?/g, function(match, key, value) {
			if(query[key] && !Array.isArray(query[key])) {
				if(Array.isArray(query[key])) {
					query[key].push(decodeURIComponent(value));
				} else {
					let storeValue = query[key];
					query[key] = [storeValue, decodeURIComponent(value)];
				}
			} else {
				query[key] = decodeURIComponent(value);
			}
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