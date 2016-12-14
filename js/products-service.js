function ProductsService() {

	this.pages = [];
}

ProductsService.prototype = {

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