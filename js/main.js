var injector = new Diogenes();

injector.register('app', App, Diogenes.INSTANCE);

injector.start('app', function (app) {
    app.start();
});