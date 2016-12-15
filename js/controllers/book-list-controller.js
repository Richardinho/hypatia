function BookListController(options) {

	this.bookListViewFactory = options.bookListViewFactory;
	this.dataService = options.dataService;
	this.pageManager = options.pageManager;
	this.searchCriteriaService = options.searchCriteriaService;
	this.booksService = options.booksService;
	this.queryBuilder = options.queryBuilder;
}

BookListController.prototype = {

	handleRequest : function (request) {

		this.searchCriteriaService.refresh({

			offset : request.queryParam('offset'),
			limit : request.queryParam('limit'),
			selectedFilters : request.multipleQueryParams('filters[]'),

		});

		this.dataService.fetchBooks(this.queryBuilder.buildAPIQueryString(this.searchCriteriaService)).then(data => {

			this.booksService.refresh(data.products);
			//this.searchCriteriaService.update(data.searchCriteria);

			let bookListView = this.bookListViewFactory();

			this.pageManager.render(bookListView);
		});
	}
};

BookListController.inject = [
	'bookListViewFactory',
	'dataService',
	'pageManager',
	'searchCriteriaService',
	'booksService',
	'queryBuilder'
];