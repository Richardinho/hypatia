function App(options) {

	this.router = options.router;
}

App.prototype = {

	start : function () {

		this.router.route('item/:id', 'detailController');
		this.router.route('(:page)', 'controller');

		if ('scrollRestoration' in history) {
          history.scrollRestoration = 'manual';
        }

		Backbone.history.start({ pushState : true });
	}
};
App.inject = ['router'];