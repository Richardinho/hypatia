function BookListController(options) {

    this.bookListViewFactory = options.bookListViewFactory;
    this.dataService = options.dataService;
    this.pageManager = options.pageManager;
}

BookListController.prototype = {

    handleRequest : function () {
        this.dataService.getPage().then(pageData => {
            let bookListView = this.bookListViewFactory({
                data : pageData
            });
            this.pageManager.render(bookListView);
        });
    }
};

BookListController.inject = [
    'bookListViewFactory',
    'dataService',
    'pageManager'
];