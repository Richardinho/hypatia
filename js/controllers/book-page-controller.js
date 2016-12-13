function BookPageController(options) {
    this.bookViewFactory = options.bookViewFactory;
    this.pageManager = options.pageManager;
}

BookPageController.prototype = {

    handleRequest : function () {
        let bookView = this.bookViewFactory();
        this.pageManager.render(bookView);
    }
};

BookPageController.inject = [
    'bookViewFactory',
    'pageManager'
];