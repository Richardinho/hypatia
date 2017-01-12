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

		it('should set totalProducts and derived values', () => {

			expect(viewModel.totalProducts).toBe(24);
			expect(viewModel.totalGroups).toBe(4);
			expect(viewModel.ultimateMaxGroupIndex).toBe(3);
			expect(viewModel.currentMaxGroupIndex).toBe(3);
			expect(viewModel.groups.length).toBe(4);

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