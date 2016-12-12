function BookListController(options) {

    this.bookListViewFactory = options.bookListViewFactory;
    this.dataService = options.dataService;
}

BookListController.prototype = {

    handleRequest : function () {
        this.dataService.getPage().then(() => {
            let bookListView = this.bookListViewFactory();
            bookListView.render();
        });
    }
};

BookListController.inject = [
    'bookListViewFactory',
    'dataService'
];