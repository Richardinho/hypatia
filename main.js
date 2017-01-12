let injector = new Diogenes();

let utils = sundry; // alias utility library

let config = new Config(window.config);

injector.register('app', App, Diogenes.INSTANCE);
injector.register('router', Router, Diogenes.CACHE_INSTANCE);
injector.register('injector', injector, Diogenes.VALUE);
injector.register('requestObjectFactory', RequestObject.factory, Diogenes.FACTORY_FUNCTION);
injector.register('productListController', ProductListController, Diogenes.INSTANCE);
injector.register('scrollManager', ScrollManager, Diogenes.CACHE_INSTANCE);
injector.register('config', config, Diogenes.VALUE);
injector.register('dataService', DataService, Diogenes.CACHE_INSTANCE);



injector.register(
	'pageManager',
	PageManager,
	Diogenes.CACHE_INSTANCE,
	document.querySelector('#app'));

injector.start('app', function (app) {
	app.start();
});