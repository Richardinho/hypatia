fdescribe('groups', () => {

    let dataService;

    beforeEach(() => {

        dataService = new DataService();
    });

    it('should..', done => {

        let offset,
            limit;

        dataService.getBooks(offset, limit).then(books => {
            expect(books.length).toBe(4);
            done();
        });
    });
});