let injector = new Diogenes();

let utils = sundry; // alias utility library


injector.register('app', App, Diogenes.INSTANCE);
injector.register('router', Router, Diogenes.CACHE_INSTANCE);
injector.register('injector', injector, Diogenes.VALUE);
injector.register('saveUserScroll', SaveUserScroll, Diogenes.CACHE_INSTANCE);
injector.register('requestObjectFactory', RequestObject.factory, Diogenes.FACTORY_FUNCTION);
injector.register('controller', Controller, Diogenes.INSTANCE);
injector.register('detailController', DetailController, Diogenes.INSTANCE);
injector.register('detailView', DetailView, Diogenes.INSTANCE);
injector.register('scrollManager', ScrollManager, Diogenes.CACHE_INSTANCE);
injector.register('dataService', DataService, Diogenes.CACHE_INSTANCE);



injector.register(
	'pageManager',
	PageManager,
	Diogenes.CACHE_INSTANCE,
	document.querySelector('#app'));

injector.start('app', function (app) {
	app.start();
});