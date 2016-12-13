
var BookListView = Backbone.View.extend({

	className : 'book-list',

	initialize : function (options) {

		this.data = options.data;
	},

	render : function () {

		var compiledTemplate = _.template(document.querySelector('#book-list').innerHTML);

		this.el.innerHTML = compiledTemplate({
			books : this.data,
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
}
BookListView.factory.inject = [];