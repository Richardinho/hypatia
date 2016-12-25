
/*
	Responsible for setting up the first page render and general structure.

*/
var BookListView = Backbone.View.extend({

	className : 'book-list',

	initialize : function (options) {

		this.config = options.config;
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

	/*
		render initial list container
	*/

	render : function () {

		this.el.innerHTML = this.template({
			title : 'my cool books'
		});

		//  set page height with padding

		let pageHeight = this.config.groupHeight * this.config.groupsPerPage;

		this.getContainerEl().style.paddingBottom = pageHeight + 'px';
		this.getContainerEl().style.paddingTop = '0px';

		return this;
	},

    /*
        renders a placeholder group
    */
	createPlaceholder : function (groupId, itemsPerGroup) {

		//  make this dependent on the number of items per group

		let books = [];

		for(let i = 0; i < itemsPerGroup; i++) {
			books.push({
				title : 'placeholder book',
				author : 'mr placeholder'
			});
		}

		return new GroupView({
			groupId : groupId,
			books : books
		});
	},

	//  renders groups into the list. Gets the data from the group.
	//  if the data does not exist, puts in a placeholder and fires a request to
	//  the server to get some more.

	update : function (activeGroups) {

		let pageContainerEl = this.getContainerEl();

		// clear out container
		pageContainerEl.innerHTML = '';

		let frag = document.createDocumentFragment();

		activeGroups.forEach(group => {
			frag.appendChild(this.createPlaceholder(group, this.config.itemsPerGroup).render());
		});

		this.setPaddingTop(activeGroups[0]);
		this.setPaddingBottom(activeGroups[activeGroups.length - 1]);

		pageContainerEl.appendChild(frag);

	},

	setPaddingTop : function (firstActiveGroup) {
		this.getContainerEl().style.paddingTop = (firstActiveGroup * this.config.groupHeight) + 'px';
	},

	setPaddingBottom : function (lastActiveGroup) {
		let bottomPadding = this.config.groupHeight * (this.config.groupsPerPage - lastActiveGroup);
		this.getContainerEl().style.paddingBottom = bottomPadding + 'px';
	}

});

BookListView.factory = function (options) {

	return function (config) {

		_.extend(options, config);
		return new BookListView(options);
	};
};

BookListView.factory.inject = [];