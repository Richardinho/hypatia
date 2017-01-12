let ProductDetailView = Backbone.View.extend({

    initialize : function (options) {
        this.viewModel = options.viewModel;
    },

    className : 'product-detail',

	template : _.template(`

		<h2><%= book.title %></h2>
		<p><%= book.description %></p>
		<img src='/images/<%= book.image %>'>

	`),

	events : {

	},

	render : function () {

		this.el.innerHTML = this.template({
            book : this.viewModel.book
		});

		return this;
	}

});
