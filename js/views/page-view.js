
let PageView = Backbone.View.extend({

	className : 'book-list',

	tagName : 'ul',

	initialize : function (options) {

		this.books = options.books;

	},

	template : _.template(`
		<% _.each(books, function(book) { %>
			<li class="book"><%= book.title %> by <%= book.author %></li>
		<% }); %>
	`),

	render : function () {

		this.el.innerHTML = this.template({
			books : this.books
		});
		return this.el;
	}

});

PageView.factory = function (options) {
	return function (config) {
		_.extend(options, config);
		return new PageView(options);
	}
};


PageView.inject = [];