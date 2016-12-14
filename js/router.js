function Router (options) {

	this.delegate = new Backbone.Router();
	this.injector = options.injector;
	this.requestObjectFactory = options.requestObjectFactory;
}

Router.prototype = {

	navigate : function (href) {

		this.delegate.navigate(href, { trigger : true });
	},

	route : function (path, handler) {

		this.delegate.route(path, '',  function handleRequest () {

			var controller = this.injector.get(handler);
			var requestObj = this.requestObjectFactory(utils.toArray(arguments));
			controller.handleRequest.call(controller, requestObj);

		}.bind(this));

	}
};

Router.inject = [
	'injector',
	'requestObjectFactory'
];