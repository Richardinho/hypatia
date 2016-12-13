function Router (options) {
	this.delegate = new Backbone.Router();
	this.injector = options.injector;
}

Router.prototype = {

	navigate : function (href) {

		this.delegate.navigate(href, { trigger : true });
	},

	route : function (path, handler) {

		this.delegate.route(path, '',  function handleRequest () {

			var controller = this.injector.get(handler);
			controller.handleRequest.call(controller);

		}.bind(this));

	}
};

Router.inject = ['injector'];