function App(options) {

	this.router = options.router;
}

App.prototype = {

	start : function () {

		this.router.route('products(/)(:pageIndex)', 'productListController');
		this.router.route('book/:id', 'productDetailController');

		Backbone.history.start({ pushState : true });
	}
};
App.inject = ['router'];