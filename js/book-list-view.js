function BookListView() {

}

BookListView.prototype = {

    render : function () {
        console.log('render book');
    }
};

BookListView.factory = function (options) {

    return function (config) {

        _.extend(options, config);
        return new BookListView(options);

    };
}
BookListView.factory.inject = [];