describe('request-object', () => {
    let requestObject;
    describe('_parseQueryString()', () => {

        let result, ul;

        beforeEach(() => {

            url = 'filters[]=apple&offset=3&limit=20&filters[]=banana';
            result = RequestObject.prototype._parseQueryString.call(null, url);
        });

        it('should return criteria object', () => {
            expect(result).toEqual({
                'filters[]' : ['apple', 'banana'],
                'offset' : '3',
                'limit' : '20'
            });
        });
    });
});