function LoadMore(options) {
	this.pageViewFactory = options.pageViewFactory;
}

LoadMore.prototype = {

	onScroll : function (currentYScroll, scrollDown) {

		var pageView = this.pageViewFactory({
			books : []
		});

		if (scrollDown) {
			//	if scrolled beyond lower boundary
			//		if exceeded page total
			//		    show load more button
			//		else
			//		    load in more results
		} else {
			//	if scrolled above upper boundary
			//		if at top
			//		    do nothing
			//		else
			//		   restore earlier results from memory cache
		}
	},

	onLoadMore : function () {

		console.log('load more, onloadMore()');
	}

};

LoadMore.factory = function (options) {
	return function () {
		return new LoadMore(options);
	}
}


LoadMore.inject = ['pageViewFactory'];