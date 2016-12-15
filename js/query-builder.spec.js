describe('queryBuilder', () => {

    let queryBuilder,
        result,
        searchCriteriaService;

    describe('buildAPIQueryString()', () => {

        beforeEach(() => {

            searchCriteriaService = new SearchCriteriaService();

            searchCriteriaService.refresh({
                offset : 4,
                limit : 24,
                selectedFilters : ['c4', 'r1301', 'r259']
            });

            queryBuilder = new QueryBuilder({
                searchCriteriaService : searchCriteriaService
            });

            result = queryBuilder.buildAPIQueryString();
        });

        it('should generate query string from search criteria', () => {
            expect(result).toBe('offset=4&limit=24&filters[]=c4&filters[]=r1301&filters[]=r259');
        });
    });

});