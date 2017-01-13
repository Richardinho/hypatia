describe('request-object', () => {
	let requestObject, params;

	describe('queryParam(key)', () => {
		beforeEach(() => {
			params = ['foo=green&bar=red'];
			requestObject = new RequestObject(params);
		});
		it('should return corresponding value from query string', () => {
			expect(requestObject.queryParam('foo')).toBe('green');
			expect(requestObject.queryParam('bar')).toBe('red');
		});
	});

	describe('multipleQueryParams(key)', () => {

		beforeEach(() => {
			params = ['foo=green&bar=red&foo=blue'];
			requestObject = new RequestObject(params);
		});
		it('should return array of corresponding values from query string', () => {
			expect(requestObject.multipleQueryParams('foo')).toEqual(['green', 'blue']);
		});
	});

	describe('param(index)', () => {
		beforeEach(() => {
			params = ['orange', ''];
			requestObject = new RequestObject(params);
		});
		it('should return param by index', () => {
			expect(requestObject.param(0)).toEqual('orange');
		});
	});

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