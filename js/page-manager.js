var PageManager = Backbone.View.extend({

    initialize : function (options, rootEl) {

        this.el = rootEl
    },

    render : function (view) {

        this.el.appendChild(view.render().el);

    }
});
PageManager.inject = [];