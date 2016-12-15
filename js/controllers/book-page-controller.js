function BookPageController(options) {
	this.bookViewFactory = options.bookViewFactory;
	this.pageManager = options.pageManager;
	this.dataService = options.dataService;
}

BookPageController.prototype = {

	handleRequest : function (requestObject) {

		this.dataService.fetchBook(requestObject.param(0)).then(data => {

			let bookView = this.bookViewFactory({
				bookData : data
			});
			this.pageManager.render(bookView);

		});
	}
};

BookPageController.inject = [
	'bookViewFactory',
	'pageManager',
	'dataService'
];