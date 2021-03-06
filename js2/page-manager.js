var PageManager = Backbone.View.extend({

	initialize : function (options, rootEl) {

		this.router = options.router;
		this.el = rootEl
		domutils.delegate(this.el, 'click', '[data-internal]', this.handleInternalLink, this);
	},

	handleInternalLink : function (event) {

		event.preventDefault();

		let href = event.target.getAttribute('href');
		this.router.navigate(href);
	},

	render : function (view) {

		this.el.innerHTML = '';
		this.el.appendChild(view.render().el);
		this.trigger('rendered');
	}
});

PageManager.inject = [
	'router'
];