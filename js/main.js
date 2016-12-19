var injector = new Diogenes();

var utils = sundry; // alias utility library

var config = new Config(window.config);

injector.register('app',                     App,                     Diogenes.INSTANCE);
injector.register('router',                  Router,                  Diogenes.CACHE_INSTANCE);
injector.register('queryBuilder',            QueryBuilder,            Diogenes.CACHE_INSTANCE);
injector.register('injector',                injector,                Diogenes.VALUE);
injector.register('bookListController',      BookListController,      Diogenes.INSTANCE);
injector.register('searchCriteriaService',   SearchCriteriaService,   Diogenes.CACHE_INSTANCE);
injector.register('groupsFactory',           Groups.factory,          Diogenes.FACTORY_FUNCTION);
injector.register('bookPageController',      BookPageController,      Diogenes.INSTANCE);
injector.register('pageViewFactory',         PageView.factory,        Diogenes.FACTORY_FUNCTION);
injector.register('bookListViewFactory',     BookListView.factory,    Diogenes.FACTORY_FUNCTION);
injector.register('requestObjectFactory',    RequestObject.factory,   Diogenes.FACTORY_FUNCTION);
injector.register('bookViewFactory',         BookView.factory,        Diogenes.FACTORY_FUNCTION);
injector.register('dataService',             DataService,             Diogenes.CACHE_INSTANCE);
injector.register('scrollManager',           ScrollManager,           Diogenes.CACHE_INSTANCE);
injector.register('config',                  config,                  Diogenes.VALUE);
injector.register(
	'pageManager',
	PageManager,
	Diogenes.CACHE_INSTANCE,
	document.querySelector('#app'));

injector.start('app', function (app) {
	app.start();
});