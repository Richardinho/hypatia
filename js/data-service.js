function DataService() {}

DataService.prototype = {

	urls : {

		BOOKS : '/data/books.json'
	},

	fetchProducts : function (queryString) {

		return fetch(this._createURL(this.urls.BOOKS, queryString)).then(response => {
			return response.json();
		});
	},

	_createURL : function (url, queryString) {

		return url + '?' + queryString;
	}
};

DataService.inject=[];

