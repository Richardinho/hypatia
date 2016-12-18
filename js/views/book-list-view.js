
/*
	Responsible for setting up the first page render and general structure.

*/
var BookListView = Backbone.View.extend({

	className : 'book-list',

	initialize : function (options) {

		this.pageViewFactory = options.pageViewFactory;
	},

	getContainerEl : function () {

		return this.el.querySelector('#page-container');
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
			books : [
				{
					title : 'placholder book',
					author : 'mr placholder'
				}

			]
		});

		this.el.querySelector('#page-container').appendChild(page.render([]));

		return this;
	},

	update : function (activeGroups) {

		//  strip out stale groups and add in active groups.
		// Could optimise and only swap in the new groups

		console.log('update');
	}


});

BookListView.factory = function (options) {

	return function (config) {

		_.extend(options, config);
		return new BookListView(options);
	};
};

BookListView.factory.inject = [
	'pageViewFactory'
];