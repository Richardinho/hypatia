var injector = new Diogenes();

injector.register('app',                 App,                  Diogenes.INSTANCE);
injector.register('router',              Router,               Diogenes.CACHE_INSTANCE);
injector.register('injector',            injector,             Diogenes.VALUE);
injector.register('bookListController',  BookListController,   Diogenes.INSTANCE);
injector.register('bookPageController',  BookPageController,   Diogenes.INSTANCE);
injector.register('bookListViewFactory', BookListView.factory, Diogenes.FACTORY);
injector.register('dataService',         DataService,          Diogenes.CACHE_INSTANCE);
injector.register('pageManager',         PageManager,          Diogenes.CACHE_INSTANCE, document.querySelector('#app'));

injector.start('app', function (app) {
    app.start();
});