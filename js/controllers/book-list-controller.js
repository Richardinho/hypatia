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

}

function parseDataIntoGroups(rawData) {

	let items = rawData.products;
	let itemsPerGroups = 3;
	let result = [];

	let i,j,temparray,chunk = itemsPerGroups;

	for (i = 0,j = items.length; i < j; i += chunk) {
		result.push(items.slice(i, i + chunk));
	}
	return result;
}

BookListController.prototype = {

	onScroll : function (yScroll, scrollingDown) {

		let activeGroups = this.calculateActiveGroups(yScroll);

		if(!this.groups.areDisplayed(activeGroups)) {

			//this.groups.updateActiveGroups(activeGroups);

			//this.bookListView.update(activeGroups);

		} else {

			//  do nothing
		}

	},

	calculateActiveGroups : function (scrollY) {

		let offset = this.getOffset();

		//  calculate active region
		let upperLimit = scrollY - offset;
		let lowerLimit = scrollY + this.getWindowHeight() + offset;

		let containerElTop = this.getContainerElTop();
		let groupHeight = this.getGroupHeight();

		let indexOfFirstGroup = Math.floor((upperLimit - containerElTop) / groupHeight);
		let indexOfLastGroup = Math.floor((lowerLimit - containerElTop) / groupHeight);

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

		let viewportToActiveAreaRatio = 2; // get from config
		let offset = viewportToActiveAreaRatio / 2;
		return (this.getWindowHeight() * offset);
	},

	getGroupHeight : function () {
		return 300;
	},

	getWindowHeight : function () {

		return window.innerHeight;

	},


	handleRequest : function (request) {

		this.searchCriteriaService.refresh({

			offset : request.queryParam('offset'),
			limit : request.queryParam('limit'),
			selectedFilters : request.multipleQueryParams('filters[]'),

		});

		this.pageManager.render(this.bookListView);

		this.dataService.fetchBooks(this.queryBuilder.buildAPIQueryString(this.searchCriteriaService))
			.then(data => {

			//this.searchCriteriaService.update(data.searchCriteria);

			let initialGroupsData = parseDataIntoGroups(data);

			let initialGroups = this.groups.initialiseGroups(initialGroupsData);

			this.bookListView.update({
				indexOfFirstGroup : 0,
				groups : initialGroups

			});




			//this.scrollManager.addListener('load-more', this);
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
];