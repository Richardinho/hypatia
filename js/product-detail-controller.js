function ProductDetailController(options) {

	this.pageManager = options.pageManager;
	this.dataService = options.dataService;
}

ProductDetailController.prototype = {

    handleRequest : function (request) {

        this.dataService.getProduct(request.param(0)).then(product => {

            this.productDetailView = new ProductDetailView({
                viewModel : {
                    book : product
                }
            });

            this.pageManager.render(this.productDetailView);
        });
    },

    destroy : function () {

    }
};

ProductDetailController.inject = [
    'pageManager',
    'dataService'
];