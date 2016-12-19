
let PageView = Backbone.View.extend({

	className : 'book-list',

	tagName : 'ul',

	initialize : function (options) {

		this.books = options.books;
		this.groupId = options.groupId;

	},

	template : _.template(`
		<% _.each(books, function(book) { %>
			<li class="book"><%= book.title %> by <%= book.author %></li>
		<% }); %>
	`),

	render : function (books) {

		this.el.setAttribute('data-group-id', this.groupId);
		this.el.innerHTML = this.template({
			books : this.books
		});
		return this.el;
	}

});

PageView.inject = [];