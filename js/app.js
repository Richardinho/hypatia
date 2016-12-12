function App(options) {
    this.router = options.router;
}

App.prototype = {

    start : function () {

        this.router.route('',     'bookListController');
        this.router.route('book', 'bookPageController');

        Backbone.history.start({ pushState : true });
    }
};
App.inject = ['router'];