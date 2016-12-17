describe('queryBuilder', () => {

	let queryBuilder,
		result;

	describe('buildAPIQueryString()', () => {

		beforeEach(() => {

			queryBuilder = new QueryBuilder();

			result = queryBuilder.buildAPIQueryString({
				offset : 4,
				limit : 24,
				selectedFilters : ['c4', 'r1301', 'r259']
			});
		});

		it('should generate query string from search criteria', () => {
			expect(result).toBe('offset=4&limit=24&filters[]=c4&filters[]=r1301&filters[]=r259');
		});
	});

});