function DataService() {}

DataService.prototype = {

	urls : {

		BOOKS : '/data/books.json',
		BOOK : '/data/book'
	},

	fetchBooks : function (queryString) {

		return fetch(this._createURL(this.urls.BOOKS, queryString)).then(response => {
			return response.json();
		});
	},

	fetchBook : function (id) {

		return Promise.resolve({
			author : 'Shakespear',
			title : 'Hamlet'
		});

	},

	getBooks : function (offset, limit) {

		return this.fetchBooks('').then(data => {
			return data;
		});
	},

	_createURL : function (url, queryString) {
		if (queryString) {
			return url + '?' + queryString;
		} else {
			return url;
		}
	}
};

DataService.inject=[];

