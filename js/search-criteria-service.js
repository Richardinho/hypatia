function SearchCriteriaService(criteria) {

	this.offset;
	this.limit;
	this.selectedFilters;
}

SearchCriteriaService.prototype = {

	refresh : function (criteria) {

		this.offset = criteria.offset;
		this.limit = criteria.limit;
		this.selectedFilters = criteria.selectedFilters;

	},

	update : function () {}
};