
/*
	Responsible for setting up the first page render and general structure.

*/
var BookListView = Backbone.View.extend({

	className : 'book-list',

	initialize : function (options) {

	},

	getContainerEl : function () {

		return this.el.querySelector('#page-container');
	},

	getLoadMoreButton : function () {
		return this.el.querySelector('[data-action=load-more]');
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



		return this;
	},

	createPlaceholder : function (groupId) {
		return new PageView({
			groupId : groupId,
			books : [
				{
					title : 'placeholder book',
					author : 'mr placeholder'
				}

			]
		});
	},

	createGroupView : function (groupId, data) {

		return new PageView({
			groupId : groupId,
			books : data
		});
	},

	hideLoadMoreButton : function () {

		this.getLoadMoreButton().style.display = 'none';
	},

	showLoadMoreButton : function () {

		this.getLoadMoreButton().style.display = 'inline-block';
	},


	//  renders groups into the list. Gets the data from the group.
	//  if the data does not exist, puts in a placeholder and fires a request to
	//  the server to get some more.

	update : function (activeGroups) {

		let pageContainerEl = this.getContainerEl();

		// clear out container. Crude but acceptable for the moment
		pageContainerEl.innerHTML = '';

		let frag = document.createDocumentFragment();

		for(let i=0, groupIndex = activeGroups.indexOfFirstGroup; i < activeGroups.groups.length; i++, groupIndex++) {

			let group = activeGroups.groups[i];

			if(group.data) {
				frag.appendChild(this.createGroupView(groupIndex, group.data).render());
			} else {
				frag.appendChild(this.createPlaceholder(groupIndex).render());
				//  should fire off to server for data

				// should this be done here?
			}
		}

		pageContainerEl.appendChild(frag);
	}

});

BookListView.factory = function (options) {

	return function (config) {

		_.extend(options, config);
		return new BookListView(options);
	};
};

BookListView.factory.inject = [
];