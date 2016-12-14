function App(options) {

	this.router = options.router;
}

App.prototype = {

	start : function () {

		this.router.route('',     'bookListController');
		this.router.route('book', 'bookPageController');
		this.router.route('lala/:param1/:param2', 'bookPageController');

		Backbone.history.start({ pushState : true });
	}
};
App.inject = ['router'];