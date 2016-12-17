function ScrollManager() {

	this.listeners = {};


	var latestKnownScrollY = window.scrollY,
		previousScroll,
		ticking = false;

	function onScroll() {
		previousScroll = latestKnownScrollY;
		latestKnownScrollY = window.scrollY;
		requestTick();
	}

	function requestTick() {
		if(!ticking) {
			requestAnimationFrame(update);
		}
		ticking = true;
	}

	let self = this;

	function update() {
		// reset the tick so we can
		// capture the next onScroll
		ticking = false;

		var currentScrollY = latestKnownScrollY;

		var scrollingDown = latestKnownScrollY > previousScroll;

		Object.keys(self.listeners).forEach(key => {
			let listener = self.listeners[key];
			listener.onScroll(latestKnownScrollY, scrollingDown);

		});
		// read offset of DOM elements
		// and compare to the currentScrollY value
		// then apply some CSS classes
		// to the visible items
	}

	window.addEventListener('scroll', onScroll);
}

ScrollManager.prototype = {

	addListener : function (key, listener) {

		this.listeners[key] = listener;
	},

	removeListener : function (key) {

		delete this.listeners[key];
	}
};

ScrollManager.inject = [];