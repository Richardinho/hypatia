
/*
	Responsible for setting up the first page render and general structure.

*/
var BookListView = Backbone.View.extend({

	className : 'book-list',

	initialize : function (options) {
		// think we do need a reference to the group service here.
		this.groups = options.groups;
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

		//  make this dependent on the number of items per group
		return new PageView({
			groupId : groupId,
			books : [
				{ title : 'placeholder book', author : 'mr placeholder' },
				{ title : 'placeholder book', author : 'mr placeholder' },
				{ title : 'placeholder book', author : 'mr placeholder' },
				{ title : 'placeholder book', author : 'mr placeholder' }

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

	/*
		queries dom for currently displayed groups.
		returns an array of their group ids
	*/
	getDisplayedGroups : function () {

		return Array.from(this.el.querySelectorAll('[data-group-id]')).map(groupEl => {

			return groupEl.dataset.groupId;
		});

	},

	arrangeGroups : function (activeGroups, displayedGroups) {

		//  members of displayedGroups but not of activeGroups
		let groupsToRemove = displayedGroups.filter(group => {
			return activeGroups.indexOf(group) === -1;
		});

		//  members of activeGroups but not of displayed group
		let groupsToAdd = activeGroups.filter(group => {
			return displayedGroups.indexOf(group) === -1;
		});

		// members of both
		let groupsToLeave = displayedGroups.filter(group => {
			return activeGroups.indexOf(group) !== -1;
		});

		return {
			groupsToRemove : groupsToRemove,
			groupsToAdd : groupsToAdd,
			groupsToLeave : groupsToLeave
		};
	},


	//  renders groups into the list. Gets the data from the group.
	//  if the data does not exist, puts in a placeholder and fires a request to
	//  the server to get some more.

	update : function (activeGroups) {

		let pageContainerEl = this.getContainerEl();

		// clear out container

		let displayedGroups = this.getDisplayedGroups();


		let frag = document.createDocumentFragment();

		let groupsToRemove;
		let groupsToAdd;
		let groupsToLeave;

		console.log(activeGroups);

		({ groupsToRemove, groupsToAdd, groupsToLeave } = this.arrangeGroups(activeGroups, displayedGroups));

		/*for(let i = activeGroups.indexOfFirstGroup; i <= activeGroups.indexOfLastGroup; i++) {

			let group = this.groups.groups[i];  // where to get groups from?

			if(group.el) {  //  cache elements
				frag.appendChild(group.el);
			} else if(group.data) {  // this will only be on page load (I think...!)
				let groupEl = this.createGroupView(i, group.data).render();
				frag.appendChild(groupEl);
				// cache groupelement
				group.el = groupEl;
			} else {
				frag.appendChild(this.createPlaceholder(i).render());
				this.fetchGroup().then((group) => {
					//

				});
				//  should fire off to server for data

				// should this be done here?
			}
		}*/

		pageContainerEl.appendChild(frag);


	},

	fetchGroup : function () {

		return Promise.resolve({});
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