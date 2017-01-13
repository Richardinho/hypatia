describe('view model', () => {

	let viewModel;

	describe('initialise()', () => {

		beforeEach(() => {

			viewModel = new ViewModel({
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

			viewModel = new ViewModel({
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

	describe('getMaxDisplayedGroupIndex()', () => {

		beforeEach(() => {

			let totalProducts = 41;

			viewModel = new ViewModel({
				config : {
					groupsPerPage : 3,
					itemsPerGroup : 4
				}
			});

			viewModel.initialise(41);
			viewModel.pageIndex = 2;
		});

		it('should return the maximum displayed group index', () => {

			expect(viewModel.getMaxDisplayedGroupIndex()).toBe(8);
		});
	});

	describe('hasProductsToLoad()', () => {

		beforeEach(() => {

			let totalProducts = 17;

			viewModel = new ViewModel({
				config : {
					groupsPerPage : 2,
					itemsPerGroup : 4
				}
			});
			viewModel.initialise(totalProducts);
		});

		describe('when on last page', () => {
			it('should return FALSE', () => {
				viewModel.pageIndex = 2;
				expect(viewModel.hasProductsToLoad()).toBe(false);
			});
		});

		describe('when NOT on last page', () => {
			it('should return TRUE', () => {
				viewModel.pageIndex = 1;
				expect(viewModel.hasProductsToLoad()).toBe(true);
			});
		});
	});
	//  no point in testing this as it just negates the above function
	//describe('onLastPage()', () => {});

	describe('getNumberOfLoadedProducts()', () => {

		beforeEach(() => {

			let totalProducts = 17;

			viewModel = new ViewModel({
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

			viewModel = new ViewModel({
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

			viewModel = new ViewModel({
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

			viewModel = new ViewModel({
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
				result = ViewModel.prototype.areGroupsDisplayed.call({

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
				result = ViewModel.prototype.areGroupsDisplayed.call({

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