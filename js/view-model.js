function ViewModel(options) {

	this.config = options.config;

	this.groupsPerPage = this.config.groupsPerPage;
	this.productsPerGroup = this.config.itemsPerGroup;
	this.activeRegionRatio = this.config.activeRegionRatio;
	this.groupHeight = this.config.groupHeight;
	this.groups = [];
	this.viewMode = 'list';  //  todo: implement grid mode

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
			//  if any group doesn't exist, set to false and break out of loop
			if(areDisplayed && (!this.groups[groupIndex] || !this.groups[groupIndex].displayed)) {

				areDisplayed = false;
			}
			return areDisplayed;

		}, true)
	},

	setCurrentMaxGroupIndex : function () {

        this.currentMaxGroupIndex = Math.min(
                        this.ultimateMaxGroupIndex,
                        (this.pageIndex + 1) * this.groupsPerPage );


	}
};