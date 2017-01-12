function ViewModel(options) {

	this.config = options.config;

	/*
		the number of groups which constitute a page
	*/

	this.groupsPerPage = this.config.groupsPerPage;

	/*
		number of products contained within a group
	*/
	this.productsPerGroup = this.config.itemsPerGroup;

	/*
		ratio for calculating the size of the 'active region' in which
		groups of products should be displayed
	*/
	this.activeRegionRatio = this.config.activeRegionRatio;

	/*
		the height of a group of products
	*/
	this.groupHeight = this.config.groupHeight;
	/*
		cache group elements and store metadata
	*/
	this.groups = [];

	this.pageIndex = 0;
}

ViewModel.prototype = {

	incrementPageIndex : function () {

		this.pageIndex++;
		this.setCurrentMaxGroupIndex();
	},

	hasProductsToLoad : function () {

		return this.getNumberOfLoadedResults() < this.totalProducts;
	},

	getNumberOfLoadedResults : function () {
		return Math.min((this.currentMaxGroupIndex + 1) * this.productsPerGroup, this.totalProducts);
	},

	initialise : function (totalProducts) {

		this.totalProducts = totalProducts;

		//  calculate derived values
		this.totalGroups = Math.ceil(this.totalProducts / this.productsPerGroup);
		this.initialiseGroups();
		this.ultimateMaxGroupIndex = this.totalGroups - 1;
		this.setCurrentMaxGroupIndex();

	},

	resetDisplayPropertyOfGroups : function () {

		this.groups.forEach(group => {
			group.displayed = false;
		});
	},

	initialiseGroups : function () {

		for(let i = 0; i < this.totalGroups; i++) {
			this.groups[i] = {
				el : null,
				data : null,
				displayed : false
			};
		}
	},

	areGroupsDisplayed : function (groups) {

		return groups.reduce((areDisplayed, groupIndex) => {

			if(areDisplayed && (!this.groups[groupIndex] || !this.groups[groupIndex].displayed)) {
				//  once set to false, can't be set back to true
				areDisplayed = false;
			}
			return areDisplayed;

		}, true)
	},

	/*
		set index of last loaded group
	*/
	setCurrentMaxGroupIndex : function () {

		this.currentMaxGroupIndex = Math.min(
						this.ultimateMaxGroupIndex,
						(this.pageIndex + 1) * this.groupsPerPage );


	}
};