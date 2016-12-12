function Router (options) {
    this.delegate = new Backbone.Router();
    this.injector = options.injector;
}

Router.prototype = {
    route : function (path, handler) {
        this.delegate.route(path, '',  function () {

            var controller = this.injector.get(handler);
            controller.handleRequest.call(controller);

        }.bind(this));
    }
};

Router.inject = ['injector'];