var injector = new Diogenes();

var utils = sundry; // alias utility library

injector.register('app',                     App,                     Diogenes.INSTANCE);
injector.register('router',                  Router,                  Diogenes.CACHE_INSTANCE);
injector.register('queryBuilder',            QueryBuilder,            Diogenes.CACHE_INSTANCE);
injector.register('injector',                injector,                Diogenes.VALUE);
injector.register('bookListController',      BookListController,      Diogenes.INSTANCE);
injector.register('searchCriteriaService',   SearchCriteriaService,   Diogenes.CACHE_INSTANCE);
injector.register('booksService',            BooksService,            Diogenes.CACHE_INSTANCE);
injector.register('bookPageController',      BookPageController,      Diogenes.INSTANCE);
injector.register('bookListViewFactory',     BookListView.factory,    Diogenes.FACTORY);
injector.register('requestObjectFactory',    RequestObject.factory,   Diogenes.FACTORY);
injector.register('bookViewFactory',         BookView.factory,        Diogenes.FACTORY);
injector.register('dataService',             DataService,             Diogenes.CACHE_INSTANCE);
injector.register(
    'pageManager',
    PageManager,
    Diogenes.CACHE_INSTANCE,
    document.querySelector('#app'));

injector.start('app', function (app) {
    app.start();
});