var injector = new Diogenes();

injector.register('app', App, Diogenes.INSTANCE);
injector.register('router', Router, Diogenes.CACHE_INSTANCE);

injector.start('app', function (app) {
    app.start();
});