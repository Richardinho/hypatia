function BookListController(options) {

	this.bookListViewFactory = options.bookListViewFactory;
	this.dataService = options.dataService;
	this.pageManager = options.pageManager;
	this.searchCriteriaService = options.searchCriteriaService;
	this.queryBuilder = options.queryBuilder;
	this.scrollManager = options.scrollManager;
	this.groupsFactory = options.groupsFactory;
	this.groups =  this.groupsFactory();
	this.bookListView = this.bookListViewFactory();
	this.config = options.config;

}

BookListController.prototype = {

	onScroll : function (yScroll, scrollingDown) {


		let activeGroups = this.calculateActiveGroups(yScroll);

		if(!this.groups.areDisplayed(activeGroups)) {

			this.groups.updateActiveGroups(activeGroups);

			this.bookListView.update({
				totalPages : this.totalPages,
				indexOfFirstGroup : activeGroups.indexOfFirstGroup,
				groups : dummyGroups(activeGroups.indexOfFirstGroup, activeGroups.indexOfLastGroup)
			});

		} else {

			//  do nothing
		}

		function dummyGroups(index1, index2) {

			var result = [];

			for(i=index1; i <= index2; i++) {
				result.push({});
			}

			return result;
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
		let upperLimit = scrollY - offset;
		let lowerLimit = scrollY + this.getWindowHeight() + offset;

		let containerElTop = this.getContainerElTop();
		let groupHeight = this.getGroupHeight();

		let indexOfFirstGroup = Math.max(minGroupIndex, Math.floor((upperLimit - containerElTop) / groupHeight));
		let indexOfLastGroup =  Math.min(maxGroupIndex, Math.floor((lowerLimit - containerElTop) / groupHeight));

		return {
			indexOfFirstGroup : indexOfFirstGroup,
			indexOfLastGroup : indexOfLastGroup
		};
	},

	getContainerElTop : function () {
		let containerEl = this.bookListView.getContainerEl();
		return containerEl.getBoundingClientRect().top;
	},

	getOffset : function () {

		let offset = this.config.activeRegionRatio / 2;
		return (this.getWindowHeight() * offset);
	},

	getGroupHeight : function () {
		return 300;
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

			this.maxGroupIndex = Math.floor(totalItems / itemsPerGroup);

			this.totalPages = totalItems / (itemsPerGroup * groupsPerPage);

			let initialGroupsData = this.parseDataIntoGroups(data).slice(0, groupsPerPage);

			let initialGroups = this.groups.initialiseGroups(initialGroupsData);

			this.bookListView.update({
				totalPages : this.totalPages,
				indexOfFirstGroup : 0,
				groups : initialGroups
			});

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