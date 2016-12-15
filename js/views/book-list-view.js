
var BookListView = Backbone.View.extend({

	className : 'book-list',

	initialize : function (options) {

		this.booksService = options.booksService;
	},

	render : function () {

		let compiledTemplate = _.template(document.querySelector('#book-list').innerHTML);

		this.el.innerHTML = compiledTemplate({
			books : this.booksService.getPage(0),
			title : 'my cool books'
		});

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
	'booksService'
];