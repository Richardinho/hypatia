function BookListController(options) {

	this.bookListViewFactory = options.bookListViewFactory;
	this.dataService = options.dataService;
	this.pageManager = options.pageManager;
	this.searchCriteriaService = options.searchCriteriaService;
	this.productsService = options.productsService;
	this.queryBuilder = options.queryBuilder;
}

BookListController.prototype = {

	handleRequest : function (request) {

		this.searchCriteriaService.refresh({

			offset : request.queryParam('offset'),
			limit : request.queryParam('limit'),
			filters : request.multipleQueryParams('filters[]'),
			category : request.queryParam('category')

		});

		this.dataService.fetchProducts(this.queryBuilder.buildAPIQueryString()).then(data => {

			this.productsService.refresh(data.products);
			this.searchCriteriaService.update(data.searchCriteria);

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
	'productsService',
	'queryBuilder'
];