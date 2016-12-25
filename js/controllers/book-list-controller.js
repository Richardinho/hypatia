function BookListController(options) {

	this.bookListViewFactory = options.bookListViewFactory;
	this.dataService = options.dataService;
	this.pageManager = options.pageManager;
	this.queryBuilder = options.queryBuilder;
	this.scrollManager = options.scrollManager;
	this.groupsFactory = options.groupsFactory;
	this.groups =  this.groupsFactory();
	this.config = options.config;

	this.bookListView = this.bookListViewFactory({
		groups : this.groups,
		config : this.config
	});

	this.bookListView.on('load-more', function () {
		this.incrementPage();
		this.onScroll(window.scrollY);

	}, this);


}

BookListController.prototype = {

	onScroll : function (yScroll) {

		let activeGroups = this.calculateActiveGroups(yScroll);

		if (!this.groups.areDisplayed(activeGroups)) {

			this.groups.updateActiveGroups(activeGroups);

			let result = [];

			for (let i = activeGroups.indexOfFirstGroup; i <= activeGroups.indexOfLastGroup; i++) {
				result.push(i);
			}

			this.bookListView.update(result);

		}
	},

	handleRequest : function (request) {

		this.pageManager.render(this.bookListView);
		this.maxGroupIndex = this.config.groupsPerPage;
		this.scrollManager.addListener('load-more', this);
		this.onScroll(window.scrollY);
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

    incrementPage : function () {

    	this.maxGroupIndex += this.config.groupsPerPage;
    },

	calculateActiveGroups : function (scrollY) {

		let offset = this.getOffset();


		let minGroupIndex = 0;
		let maxGroupIndex = this.maxGroupIndex;

		//  calculate active region
		let upperLimit = scrollY - offset;
		let lowerLimit = scrollY + this.getWindowHeight() + offset;

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

	}

};

BookListController.inject = [
	'bookListViewFactory',
	'dataService',
	'pageManager',
	'groupsFactory',
	'queryBuilder',
	'scrollManager',
	'config'
];