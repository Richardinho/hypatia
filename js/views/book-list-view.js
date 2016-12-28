
/*
	Responsible for setting up the first page render and general structure.

*/
var BookListView = Backbone.View.extend({

	className : 'book-list',

	initialize : function (options) {

		this.viewModel = options.viewModel;
		this.dataService = options.dataService;
	},

	events : {
	    'click [data-action=load-more]' : 'handleLoadMore'
	},

	handleLoadMore : function () {

        this.viewModel.pageIndex++;
	    this.trigger('load-more');

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

		let pageHeight = this.viewModel.groupHeight * this.viewModel.groupsPerPage;

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

			let groupEl = this.viewModel.getGroupEl(group);

			if (groupEl) {
				frag.appendChild(groupEl);
			} else {
			    let placeholderEl = this.createPlaceholder(group, this.viewModel.itemsPerGroup).render();
				frag.appendChild(placeholderEl);
				this.viewModel.storeGroupEl(group, placeholderEl);
				let offset = group * this.viewModel.itemsPerGroup;
				let limit = this.viewModel.itemsPerGroup;
				this.dataService.getBooks(offset, limit).then(groupData => {
					let books = groupData.products.slice(offset, offset + limit);
					let groupView = new GroupView({
						groupId : group,
						books : books
					});
					let el = groupView.render();
					this.viewModel.storeGroupEl(group, el);
					if(this.isDisplayed(placeholderEl)) {
                        pageContainerEl.replaceChild(el, placeholderEl);
					}
				});
			}
		});

		this.setPaddingTop(activeGroups[0]);
		this.setPaddingBottom(activeGroups[activeGroups.length - 1]);

		pageContainerEl.appendChild(frag);

	},

	isDisplayed : function (el) {

	    return !!el.parentElement;

	},

	setPaddingTop : function (firstActiveGroup) {

		this.getContainerEl().style.paddingTop = (firstActiveGroup * this.viewModel.groupHeight) + 'px';
	},

	setPaddingBottom : function (lastActiveGroup) {

		let bottomPadding = this.viewModel.groupHeight * (this.viewModel.pageIndex * this.viewModel.groupsPerPage - lastActiveGroup);
		this.getContainerEl().style.paddingBottom = bottomPadding + 'px';
	}

});

BookListView.factory = function (options) {

	return function (config) {

		_.extend(options, config);
		return new BookListView(options);

	};
};

BookListView.factory.inject = ['dataService'];