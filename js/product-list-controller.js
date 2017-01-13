

function ProductListController(options) {

	this.pageManager = options.pageManager;
	this.dataService = options.dataService;

	this.scrollManager = options.scrollManager;

	this.viewModel = new ViewModel({
		config : options.config
	});

	this.productListView = new ProductListView({
		viewModel : this.viewModel
	});

}

ProductListController.prototype = {

	handleRequest : function (request) {

		/*
			render out the basic containing structure of the product list page.
		*/


		this.pageManager.render(this.productListView);

		/*
			The total number of products is the first piece of information that we need.
		*/

		this.dataService.getTotalProducts().then((data) => {

			this.viewModel.initialise(data.totalProducts);
			this.scrollManager.addListener('load-more', this);

			this.productListView.on('load-more', function () {

				this.viewModel.incrementPageIndex();
				this.onScroll(window.scrollY);

			}, this);

			/*
				The 'placeholder-created' event is fired when the view renders a placeholder
				group to the page. We then make a call to the server for the actual data
				to make the real group.
			*/

			this.productListView.on('placeholder-created', function (index, l) {

				let offset = index * this.viewModel.productsPerGroup;
				let limit = l;

				this.dataService.getProducts(offset, limit).then(groupData => {

					this.productListView.replacePlaceholder(index, groupData);
				});
			}, this);

			//  manually call the first time
			this.onScroll(window.scrollY);
		});
	},

	isActiveElementProductLink : function (activeElement) {
		return activeElement && activeElement.getAttribute('data-product-link');
	},

	onScroll : function (scrollY) {

		let activeGroups = this.calculateActiveGroups(scrollY);
		this.productListView.updateNumberOfResults();

		if(this.viewModel.onLastPage()) {
			this.productListView.hideLoadMoreButton();
		} else {
			this.productListView.showLoadMoreButton();
		}

		if(!this.viewModel.areGroupsDisplayed(activeGroups)) {

			this.productListView.updateView(activeGroups);
		}
	},

	//  returns distance of top of container from top of page
	getContainerElTop : function (scrollY) {

		let containerEl = this.productListView.getContainerEl();
		return containerEl.getBoundingClientRect().top + scrollY ;
	},

	getOffset : function () {

		return this.getWindowInnerHeight() * this.viewModel.activeRegionRatio;
	},

	getWindowInnerHeight : function () {

		return window.innerHeight;
	},

	calculateActiveGroups : function (scrollY) {

		let offset = this.getOffset();

		let minGroupIndex = 0;

		//  calculate active region
		let upperLimit = scrollY - offset;
		let lowerLimit = scrollY + this.getWindowInnerHeight() + offset;

		let containerElTop = this.getContainerElTop(scrollY);

		let indexOfFirstGroup = Math.max(minGroupIndex, Math.floor((upperLimit - containerElTop) / this.viewModel.groupHeight));

		let indexOfLastGroup =  Math.min(
			this.viewModel.getMaxDisplayedGroupIndex(),
			Math.floor((lowerLimit - containerElTop) / this.viewModel.groupHeight));

		indexOfFirstGroup = Math.min(indexOfFirstGroup, indexOfLastGroup);

		let result = [];

		for(let i = indexOfFirstGroup; i <= indexOfLastGroup; i++)  {
			result.push(i);
		}

		return result;
	},

	destroy : function () {

		this.scrollManager.removeListener('load-more');
	}
};

ProductListController.inject = [
	'pageManager',
	'scrollManager',
	'config',
	'dataService'
];