function App(options) {
    this.loadMore = options.loadMore;
}

App.prototype = {

	start : function () {
        console.log('starting app!');

	}
};
App.inject = ['loadMore'];