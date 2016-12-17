
/*
	Responsible for setting up the first page render and general structure.

*/
var BookListView = Backbone.View.extend({

	className : 'book-list',

	initialize : function (options) {

		this.booksService = options.booksService;
		this.pageViewFactory = options.pageViewFactory;
	},

	template : _.template(`

		<h2><%= title %></h2>

		<a data-internal href="list?filters[]=apple&offset=3&limit=20&filters[]=banana">hello world</a>
		<a data-internal href="book/4">book</a>

		<div id="page-container"></div>

		<button data-action="load-more">load more</button>

	`),

	events : {

		'click [data-action=load-more]' : 'handleLoadMore'

	},

	handleLoadMore : function () {

		this.trigger('load-more');

	},

	render : function () {

		this.el.innerHTML = this.template({

			title : 'my cool books'
		});

		var page = this.pageViewFactory({
			books : this.booksService.getPage(0)
		});

		this.el.querySelector('#page-container').appendChild(page.render());

		return this;
	}


});

BookListView.factory = function (options) {

	return function (config) {

		_.extend(options, config);
		return new BookListView(options);
	};
};

BookListView.factory.inject = [
	'booksService',
	'pageViewFactory'
];