function BooksService() {

	this.pages = [];
}

BooksService.prototype = {

	getNumberOfPages : function () {
		return this.pages.length;
	},

	refresh : function (products) {
		this.pages = [];
		this.addPage(products);
	},

	addPage : function (page) {
		this.pages.push(page);
	},

	getPage : function (index) {
		return this.pages[index];
	}


};