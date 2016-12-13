function BookListController(options) {

    this.bookListViewFactory = options.bookListViewFactory;
    this.dataService = options.dataService;
}

BookListController.prototype = {

    handleRequest : function () {
        this.dataService.getPage().then(pageData => {
            let bookListView = this.bookListViewFactory({
                data : pageData
            });
            console.log(bookListView.render().el);
        });
    }
};

BookListController.inject = [
    'bookListViewFactory',
    'dataService'
];