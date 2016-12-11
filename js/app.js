function App(options) {
    this.router = options.router;
}

App.prototype = {
    start : function () {
        this.router.route('', 'bookListController');
        this.router.route('book-list', 'bookListController');
    }
};
App.inject = ['router'];