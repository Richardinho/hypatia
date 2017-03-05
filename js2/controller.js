function Controller (options) {


	this.pageManager = options.pageManager;
	this.dataService = options.dataService;

	this.scrollManager = options.scrollManager;
	this.router = options.router;

	this.viewModel = new ViewModel();

	this.view = new View({
		viewModel : this.viewModel
	});

    window.addEventListener('resize', this.resizeHandler.bind(this));
}

Controller.prototype = {

    handleRequest : function (request) {

        let pageIndex = parseInt(request.param(0), 10) || 0;

        //  assume that we are at the top to begin with.
        this.dataService.getTotalItems().then((data) => {
            this.viewModel.totalItems = data.totalItems;
            this.viewModel.pageIndex = pageIndex;
            this.pageManager.render(this.view);
            this.onRender();
        });

    },

    resizeHandler : function () {

        this.view.recalculateHeights();
        this.view.adjustScroll();
    },

    onRender : function () {

        this.viewModel.tombstoneHeight = this.view.getTombstoneHeight();


        this.view.on('load-more', this.onLoadMore, this);
        this.view.on('rendered-tombstone', this.onTombstoneRendered, this);
        this.scrollManager.addListener('scroll-anchor', new SaveUserScroll(this.view));


        this.viewModel.initialiseItemsArray();

        this.view.loadItems(
            0,
            Math.min(
                this.viewModel.totalItems,
                (this.viewModel.pageIndex * this.viewModel.itemsPerPage) + this.viewModel.itemsPerPage) - 1,
            true);

        if(!history.state) {
            this.view.calculateAnchoredItem(window.scrollY);
        }

        this.view.adjustScroll();
        this.view.calculateAnchoredItem();


    },

    loadPage : function () {

        let firstIndex = this.viewModel.pageIndex * this.viewModel.itemsPerPage;
        let lastIndex = Math.min(this.viewModel.totalItems, firstIndex + this.viewModel.itemsPerPage) - 1;

        this.view.loadItems(
            firstIndex,
            lastIndex,
            true);

        this.view.calculateAnchoredItem(window.scrollY);
    },

    onTombstoneRendered : function (index) {

        this.dataService.getItem(index).then(data => {
            if(!this.destroyed) {
                this.view.reifyItem(index, data);
                this.view.adjustScroll();
            }

        });
    },

    onLoadMore : function () {

        if(this.viewModel.canLoadMore()) {
            this.viewModel.pageIndex++;
            this.loadPage();
            this.router.replaceSilently('' + this.viewModel.pageIndex);
        }

    },


    /*
    *
    *  un-register listeners and other clean up
    *
    */

    destroy : function () {
        this.destroyed = true;
        this.scrollManager.removeListener('scroll-anchor');
        this.view.off('rendered-tombstone', this.onTombstoneRendered, this);

    }


};
Controller.inject = [
    'pageManager',
    'dataService',
    'scrollManager',
    'router'
];