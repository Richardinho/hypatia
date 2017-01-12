
let GroupView = Backbone.View.extend({

	className : 'book-list',

	tagName : 'ul',

	initialize : function (options) {

		this.books = options.books;
		this.groupId = options.groupId;

	},

	template : _.template(`
		<% _.each(books, function(book) { %>
			<li class="book">
				<h2>id: <%= id %></h2>
				<h3>productId : <%= book.id %></h3>
				<%= book.title %> by <%= book.author %>
				<img class="thumbnail" src="/images/<%= book.image %>">
			</li>
		<% }); %>
	`),

	render : function (books) {

		this.el.setAttribute('data-group-id', this.groupId);
		this.el.innerHTML = this.template({
			books : this.books,
			id : this.groupId
		});
		return this.el;
	}

});

