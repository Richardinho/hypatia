function QueryBuilder(options) {
	this.searchCriteriaService = options.searchCriteriaService;
}

/*
	query strings for api calls and for site links are not necessarily the same.
*/

QueryBuilder.prototype =  {

	buildAPIQueryString : function () {

		return '';
	},

	buildSiteQueryString : function () {

		return '';
	}

};

QueryBuilder.inject = [
	'searchCriteriaService'
];