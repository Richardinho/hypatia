function ProductListViewModel(options) {

	/*
		cache group elements and store metadata
	*/
	this.groups = [];  //  zero based

	this.pageIndex = 0;  //  zero based

	this.config = options.config;

	/*
		the number of groups which constitute a page
	*/

	this.groupsPerPage = this.config.groupsPerPage;

	/*
		number of products contained within a group
		The last group may have less products in it if the total products is not a multiple of the number
		of products in the group.
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
	this.groupHeight = this.config.groupHeight;  //  deprecate, use itemHeight instead

	this.itemHeight = this.config.itemHeight;

}

ProductListViewModel.prototype = {

	/*
		We do initialisation later as we need to wait for the data from
		the server coming back.
	*/

	initialise : function (totalProducts) {

		this.totalProducts = totalProducts;

		//  calculate derived values
		this.initialiseGroups();

	},

	incrementPageIndex : function () {

		this.pageIndex++;
	},

	getIndexOfFirstGroupInCurrentPage : function () {

		return this.pageIndex * this.groupsPerPage;
	},

	/*
		returns index of last group that is displayed

		i.e. the last group in the current page. If on last page,
		this will be the last group of all.
	*/
	getMaxDisplayedGroupIndex : function () {

		let indexOfLastGroup = this.getIndexOfLastGroup();

		return  Math.min(((this.pageIndex + 1)  * this.groupsPerPage ) - 1, indexOfLastGroup);
	},

	/*
		returns TRUE if we are on the last page
	*/
	onLastPage : function () {

		return !(this.getNumberOfLoadedProducts() < this.totalProducts);
	},

	getNumberOfLoadedProducts : function () {

		return Math.min((this.getMaxDisplayedGroupIndex() + 1) * this.productsPerGroup, this.totalProducts);
	},

	getIndexOfLastGroup : function () {

		return this.getTotalGroups() - 1;
	},

	getTotalGroups : function () {

		return Math.ceil(this.totalProducts / this.productsPerGroup);
	},

	resetDisplayPropertyOfGroups : function () {

		this.groups.forEach(group => {
			group.displayed = false;
		});
	},

	initialiseGroups : function () {

		for(let i = 0; i < this.getTotalGroups(); i++) {
			this.groups[i] = {
				el : null,
				data : null,
				products : this.productsPerGroup,
				displayed : false
			};
		}
		this.groups[this.getTotalGroups() - 1].products = this.calculateProductsInLastGroup();

	},

	calculateProductsInLastGroup : function () {

		return this.productsPerGroup - ((this.getTotalGroups() * this.productsPerGroup) - this.totalProducts);

	},

	areGroupsDisplayed : function (groups) {

		return groups.reduce((areDisplayed, groupIndex) => {

			if(areDisplayed && (!this.groups[groupIndex] || !this.groups[groupIndex].displayed)) {
				//  once set to false, can't be set back to true
				areDisplayed = false;
			}
			return areDisplayed;

		}, true)
	}


};