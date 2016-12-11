function Router () {
    //this.delegate = Backbone.Router();
}

Router.prototype = {
    route : function () {
        console.log('route', arguments);
    }
};

Router.inject = [];