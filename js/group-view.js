
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
				<a data-internal href="/book/<%= book.id %>">
					<img class="thumbnail" src="/images/<%= book.image %>">
					<h3><%= book.title %></h3>
					<h4>by <%= book.author %></h4>
					<p><%= book.description %></p>
				</a>
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

