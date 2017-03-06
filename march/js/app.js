function App(options) {
    this.loadMore = options.loadMore;
}

App.prototype = {

	start : function () {
        console.log('starting app!', window.scrollY);

        if ('scrollRestoration' in history) {
          // Back off, browser, I got this...
          history.scrollRestoration = 'manual';
        }





	}
};
App.inject = ['loadMore'];