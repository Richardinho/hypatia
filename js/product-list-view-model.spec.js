describe('product list view model', () => {

	let viewModel;

	describe('initialise()', () => {

		beforeEach(() => {

			viewModel = new ProductListViewModel({
				config : {
					groupsPerPage : 2,
					itemsPerGroup : 6,
					activeRegionRatio : 2,
					groupHeight : 800
				}

			});
			viewModel.pageIndex = 1;
			viewModel.initialise(24);
		});

		it('should set totalProducts and initialise groups', () => {

			expect(viewModel.totalProducts).toBe(24);
			expect(viewModel.groups.length).toBe(4);

		});
	});

	describe('getIndexOfFirstGroupInCurrentPage()', () => {

		let result;

		beforeEach(() => {

			viewModel = new ProductListViewModel({
				config : {
					groupsPerPage : 5
				}
			});
			viewModel.pageIndex = 2;

			result = viewModel.getIndexOfFirstGroupInCurrentPage();
		});

		it('should return index of first group on current page', () => {

			expect(result).toBe(10);
		});
	});

	describe('getIndexOfLastGroupOnPage()', () => {

		beforeEach(() => {

			let totalProducts = 41;

			viewModel = new ProductListViewModel({
				config : {
					groupsPerPage : 3,
					itemsPerGroup : 4
				}
			});

			viewModel.initialise(41);
			viewModel.pageIndex = 2;
		});

		it('should return the maximum displayed group index', () => {

			expect(viewModel.getIndexOfLastGroupOnPage()).toBe(8);
		});
	});

	describe('onLastPage()', () => {

		beforeEach(() => {

			let totalProducts = 17;

			viewModel = new ProductListViewModel({
				config : {
					groupsPerPage : 2,
					itemsPerGroup : 4
				}
			});
			viewModel.initialise(totalProducts);
		});

		describe('when on last page', () => {
			it('should return TRUE', () => {
				viewModel.pageIndex = 2;
				expect(viewModel.onLastPage()).toBe(true);
			});
		});

		describe('when NOT on last page', () => {
			it('should return FALSE', () => {
				viewModel.pageIndex = 1;
				expect(viewModel.onLastPage()).toBe(false);
			});
		});
	});

	describe('getNumberOfLoadedProducts()', () => {

		beforeEach(() => {

			let totalProducts = 17;

			viewModel = new ProductListViewModel({
				config : {
					groupsPerPage : 2,
					itemsPerGroup : 4
				}
			});
			viewModel.initialise(totalProducts);
		});

		describe('when on first page', () => {
			it('should return number of loaded products', () => {
				viewModel.pageIndex = 0;
				expect(viewModel.getNumberOfLoadedProducts()).toBe(8);
			});
		});

		describe('when on second page', () => {
			it('should return number of loaded products', () => {
				viewModel.pageIndex = 1;
				expect(viewModel.getNumberOfLoadedProducts()).toBe(16);
			});
		});

		describe('when on third page', () => {
			it('should return number of loaded products', () => {
				viewModel.pageIndex = 2;
				expect(viewModel.getNumberOfLoadedProducts()).toBe(17);
			});
		});
	});

	describe('getIndexOfLastGroup()', () => {

		beforeEach(() => {

			let totalProducts = 17;

			viewModel = new ProductListViewModel({
				config : {
					groupsPerPage : 2,
					itemsPerGroup : 4
				}
			});
			viewModel.initialise(totalProducts);
		});
		it('should return index of last group', () => {

			expect(viewModel.getIndexOfLastGroup()).toBe(4);
		});
	});

	describe('getTotalGroups()', () => {

		beforeEach(() => {

			let totalProducts = 17;

			viewModel = new ProductListViewModel({
				config : {
					groupsPerPage : 2,
					itemsPerGroup : 4
				}
			});
			viewModel.initialise(totalProducts);
		});
		it('should return total number of groups', () => {

			expect(viewModel.getTotalGroups()).toBe(5);
		});
	});

	//describe('resetDisplayPropertyOfGroups()', () => {});

	//describe('initialiseGroups()', () => {});

	describe('calculateProductsInLastGroup()', () => {

		beforeEach(() => {

			let totalProducts = 17;

			viewModel = new ProductListViewModel({
				config : {
					groupsPerPage : 2,
					itemsPerGroup : 4
				}
			});
			viewModel.initialise(totalProducts);
		});
		it('should return number of products in final group', () => {
			expect(viewModel.calculateProductsInLastGroup()).toBe(1);
		});
	});

	describe('areGroupsDisplayed()', () => {
		describe('when ALL groups are displayed', () => {
			it('should return TRUE', () => {
				let groups = [2, 3, 4];
				result = ProductListViewModel.prototype.areGroupsDisplayed.call({

					groups : [
						{  displayed : false },
						{  displayed : false },
						{  displayed : true },
						{  displayed : true },
						{  displayed : true },
						{  displayed : false }
					]

				}, groups);
				expect(result).toBe(true);
			});
		});
		describe('when any group is NOT displayed', () => {
			it('should return FALSE', () => {
				let groups = [2, 3, 4];
				result = ProductListViewModel.prototype.areGroupsDisplayed.call({

					groups : [
						{  displayed : false },
						{  displayed : false },
						{  displayed : true },
						{  displayed : false },
						{  displayed : true },
						{  displayed : false }
					]

				}, groups);
				expect(result).toBe(false);
			});
		});
	});
});