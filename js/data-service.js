function DataService() {}

DataService.prototype = {

    getPage : function () {

        return fetch('/data/books.json').then(response => {
            return response.json();
        });
    }
};

DataService.inject=[];

