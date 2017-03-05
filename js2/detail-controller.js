function DetailController(options) {

	this.pageManager = options.pageManager;
	this.dataService = options.dataService;
}

DetailController.prototype = {

    handleRequest : function (request) {

        this.dataService.getProduct(request.param(0)).then(product => {

            this.detailView = new DetailView({
                viewModel : {
                    book : product
                }
            });

            this.pageManager.render(this.detailView);
        });
    },

    destroy : function () {

    }
};

DetailController.inject = [
    'pageManager',
    'dataService'
];