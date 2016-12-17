function BookListController(options) {

	this.bookListViewFactory = options.bookListViewFactory;
	this.dataService = options.dataService;
	this.pageManager = options.pageManager;
	this.searchCriteriaService = options.searchCriteriaService;
	this.booksService = options.booksService;
	this.queryBuilder = options.queryBuilder;
	this.scrollManager = options.scrollManager;
	this.loadMoreFactory = options.loadMoreFactory;
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

			var loadMore = this.loadMoreFactory();

			this.scrollManager.addListener('load-more', loadMore);

			bookListView.on('load-more', loadMore.onLoadMore, loadMore);

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
	'queryBuilder',
	'scrollManager',
	'loadMoreFactory'
];