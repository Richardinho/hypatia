function App(options) {

	this.router = options.router;
}

App.prototype = {

	start : function () {

		this.router.route('', 'productListController');

		Backbone.history.start({ pushState : true });
	}
};
App.inject = ['router'];