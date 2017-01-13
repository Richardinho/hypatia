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

	replaceSilently : function (href) {

		this.delegate.navigate(href, {trigger: false, replace: true});
	},

	route : function (path, handler) {

		this.delegate.route(path, '',  function handleRequest () {

			/*
				call destroy() on old controller  to allow clean up to be carried out.
			*/
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
	destroy : function () {}
};

Router.inject = [
	'injector',
	'requestObjectFactory'
];