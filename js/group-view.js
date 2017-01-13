
let GroupView = Backbone.View.extend({

	className : 'book-list',

	tagName : 'ul',

	initialize : function (options) {

		this.books = options.books;
		this.groupId = options.groupId;

	},

	template : _.template(`
		<a data-product-link="<%= book.id %>" data-internal href="/book/<%= book.id %>">
			<img class="thumbnail" src="/images/<%= book.image %>">
			<h3><%= book.title %> <%= book.id %></h3>
			<h5>group:<%= id %>, product:<%= book.id %></h5>
			<h4>by <%= book.author %></h4>
			<p><%= book.description %></p>
		</a>
	`),

	render : function (height) {

		this.el.setAttribute('data-group-id', this.groupId);

		this.books.forEach(book => {

			let bookEl = document.createElement('div');
			bookEl.className = 'book';
			bookEl.innerHTML = this.template({
				book : book,
				id : this.groupId
			});
			bookEl.style.height = height + 'px';
			this.el.appendChild(bookEl);
		});

		return this.el;
	}

});

