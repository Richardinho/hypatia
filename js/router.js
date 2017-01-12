function Router (options) {

	this.delegate = new Backbone.Router();
	this.injector = options.injector;
	this.requestObjectFactory = options.requestObjectFactory;

	this.currentController = Router.nullController;
}

Router.prototype = {

	navigate : function (href) {

		this.delegate.navigate(href, { trigger : true });
	},

	route : function (path, handler) {

		this.delegate.route(path, '',  function handleRequest () {

			this.currentController.destroy();
			let newController = this.injector.get(handler);
			let requestObj = this.requestObjectFactory(utils.toArray(arguments));
			newController.handleRequest.call(newController, requestObj);

			this.currentController = newController;

		}.bind(this));

	}
};

Router.nullController = {
	//  no ops
	handleRequest : function () {},
	destroy : function () { console.log('destroy null controller'); }
};

Router.inject = [
	'injector',
	'requestObjectFactory'
];