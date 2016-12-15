function QueryBuilder(options) {
	this.searchCriteriaService = options.searchCriteriaService;
}

/*
	query strings for api calls and for site links are not necessarily the same.
*/

QueryBuilder.prototype =  {

	buildAPIQueryString : function () {

		var result = [];

		this._appendParameterIfInCriteria('offset',     result, this.searchCriteriaService['offset']);
		this._appendParameterIfInCriteria('limit',      result, this.searchCriteriaService['limit']);
		this._appendParametersIfInCriteria('filters[]', result, this.searchCriteriaService['selectedFilters']);

		return result.join('&');
	},

	buildSiteQueryString : function () {

		return '';
	},

	_appendParametersIfInCriteria : function (keyName, result, value) {

		if(Array.isArray(value)) {

			value.forEach(parameterValue => {
				result.push(keyName + '=' + parameterValue);
			});
		}
	},

	_appendParameterIfInCriteria : function (keyName, result, value) {

		if(value) {
			result.push(keyName + '=' + value);
		}
	}

};

QueryBuilder.inject = [
	'searchCriteriaService'
];