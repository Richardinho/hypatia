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

	getTotalProducts : function () {
		return this.fetchBooks('').then(data => {
			return {
				totalProducts : data.metadata.totalItems
			};
		});
	},

	getProducts : function (offset, limit) {

		return this.fetchBooks('').then(data => {
			return new Promise((resolve) => {
				setTimeout(function () {
					resolve(data.products.slice(offset, offset + limit));
				}, 1000)
			});
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

