function BookListController(options) {

	this.bookListViewFactory = options.bookListViewFactory;
	this.dataService = options.dataService;
	this.pageManager = options.pageManager;
	this.searchCriteriaService = options.searchCriteriaService;
	this.queryBuilder = options.queryBuilder;
	this.scrollManager = options.scrollManager;
	this.groupsFactory = options.groupsFactory;
	this.groups =  this.groupsFactory();
	this.config = options.config;

	this.bookListView = this.bookListViewFactory({
		groups : this.groups,
		config : this.config
	});


}

BookListController.prototype = {

	onScroll : function (yScroll, scrollingDown) {


		let activeGroups = this.calculateActiveGroups(yScroll);


		if (!this.groups.areDisplayed(activeGroups)) {

			this.groups.updateActiveGroups(activeGroups);

			let result = [];

			for (let i = activeGroups.indexOfFirstGroup; i <= activeGroups.indexOfLastGroup; i++) {
				result.push(i);
			}

			this.bookListView.update(result);

		} else {

			//  do nothing
		}
	},

	parseDataIntoGroups : function (rawData) {

    	let items = rawData.products;
    	let result = [];

    	let i,
    		j,
    		temparray,
    		chunk = this.config.itemsPerGroup;

    	for (i = 0,j = items.length; i < j; i += chunk) {
    		result.push(items.slice(i, i + chunk));
    	}
    	return result;
    },

	calculateActiveGroups : function (scrollY) {

		let offset = this.getOffset();


		let minGroupIndex = 0;
		let maxGroupIndex = this.maxGroupIndex;

		//  calculate active region
		let upperLimit = scrollY;
		let lowerLimit = scrollY + this.getWindowHeight();

		let containerElTop = this.getContainerElTop(scrollY);

		let groupHeight = this.getGroupHeight();

		let indexOfFirstGroup = Math.max(minGroupIndex, Math.floor((upperLimit - containerElTop) / groupHeight));
		let indexOfLastGroup =  Math.min(maxGroupIndex, Math.floor((lowerLimit - containerElTop) / groupHeight));

		indexOfFirstGroup = Math.min(indexOfFirstGroup, indexOfLastGroup);

		return {
			indexOfFirstGroup : indexOfFirstGroup,
			indexOfLastGroup : indexOfLastGroup
		};
	},

	getContainerElTop : function (scrollY) {
		let containerEl = this.bookListView.getContainerEl();
		return containerEl.getBoundingClientRect().top + scrollY ;
	},

	getOffset : function () {

		let offset = this.config.activeRegionRatio / 2;
		return (this.getWindowHeight() * offset);
	},

	getGroupHeight : function () {
		return this.config.groupHeight;
	},

	getWindowHeight : function () {

		return window.innerHeight;

	},


	handleRequest : function (request) {

		let groupsPerPage = this.config.groupsPerPage;
		let itemsPerGroup = this.config.itemsPerGroup;

		this.pageManager.render(this.bookListView);

		this.dataService.fetchBooks(this.queryBuilder.buildAPIQueryString(this.searchCriteriaService))
			.then(data => {

			//this.searchCriteriaService.update(data.searchCriteria);

			let totalItems = data.metadata.totalItems;

			this.maxGroupIndex = groupsPerPage;

			this.totalPages = totalItems / (itemsPerGroup * groupsPerPage);

			this.bookListView.totalPages = this.totalPages;

			let initialGroupsData = this.parseDataIntoGroups(data).slice(0, 2);

			let initialGroups = this.groups.initialiseGroups(initialGroupsData);

			this.bookListView.update(initialGroups);

			this.scrollManager.addListener('load-more', this);
		});
	}

};

BookListController.inject = [
	'bookListViewFactory',
	'dataService',
	'pageManager',
	'groupsFactory',
	'searchCriteriaService',
	'queryBuilder',
	'scrollManager',
	'config'
];