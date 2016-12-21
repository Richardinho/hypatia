
/*
	Responsible for setting up the first page render and general structure.

*/
var BookListView = Backbone.View.extend({

	className : 'book-list',

	initialize : function (options) {

		this.groups = options.groups;
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

	/*
		queries dom for currently displayed groups.
		returns an array of their group ids
	*/
	getDisplayedGroups : function () {

		return Array.from(this.el.querySelectorAll('[data-group-id]')).map(groupEl => {

			return parseInt(groupEl.dataset.groupId, 10);
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

		let groupsToAppend = groupsToAdd.filter(group => {
			return displayedGroups.length ? group > (displayedGroups[displayedGroups.length - 1]): true;
		});

		let groupsToPrepend = groupsToAdd.filter(group => {
			return displayedGroups.length ? group < displayedGroups[0] : false
		});

		// members of both
		let groupsToLeave = displayedGroups.filter(group => {
			return activeGroups.indexOf(group) !== -1;
		});

		let groupsToRemoveFromEnd = groupsToRemove.filter(group => {
			return group > groupsToLeave[groupsToLeave.length - 1];
		});

		let groupsToRemoveFromFront = groupsToRemove.filter(group => {
			return group < groupsToLeave[0];
		});

		return {
			groupsToAppend : groupsToAppend,
			groupsToPrepend : groupsToPrepend,
			groupsToRemoveFromEnd : groupsToRemoveFromEnd,
			groupsToRemoveFromFront : groupsToRemoveFromFront,
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

		let groupsToAppend;
		let groupsToPrepend;
		let groupsToRemoveFromEnd;
		let groupsToRemoveFromFront;
		let groupsToLeave;

		({
			groupsToAppend,
			groupsToPrepend,
			groupsToRemoveFromEnd,
			groupsToRemoveFromFront,
			groupsToLeave
			} = this.arrangeGroups(activeGroups, displayedGroups));


		groupsToRemoveFromEnd.forEach(group => {
			let groupEl = this.el.querySelector('[data-group-id="' + group + '"]');
			pageContainerEl.removeChild(groupEl);
		});

		groupsToRemoveFromFront.forEach(group => {
			let groupEl = this.el.querySelector('[data-group-id="' + group + '"]');
			pageContainerEl.removeChild(groupEl);
		});

		groupsToPrepend.forEach(group => {
			pageContainerEl.insertBefore(this.createPlaceholder(group).render(), pageContainerEl.firstChild);
		});

		groupsToAppend.forEach(group => {
			this.getContainerEl().appendChild(this.createPlaceholder(group).render());
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

BookListView.factory.inject = [
];