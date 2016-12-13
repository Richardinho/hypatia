
var BookView = Backbone.View.extend({

	className : 'book',

	initialize : function (options) {

	},

	render : function () {

		var compiledTemplate = _.template(document.querySelector('#book').innerHTML);

		this.el.innerHTML = compiledTemplate();

		return this;
	}
});

BookView.factory = function (options) {

	return function (config) {

		_.extend(options, config);
		return new BookView(options);

	};
}
BookView.factory.inject = [

];