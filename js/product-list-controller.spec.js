describe('product-list-controller', () => {

	let productListController;


	describe('calculateActiveGroups()', () => {

		let activeRegionRatio;
		let windowHeight;
		let headerHeight;
		let groupHeight;
		let scrollY;

		let result;

		describe('test case 1', () => {

			let result;

			beforeEach(() => {

				activeRegionRatio = 1;
				windowHeight = 100;
				headerHeight =  100;
				groupHeight = 150;
				scrollY = 700;

				result = ProductListController.prototype.calculateActiveGroups.call({
					getOffset : function () {
						return windowHeight * activeRegionRatio;
					},
					getWindowInnerHeight : function () {
						return windowHeight;
					},
					getContainerElTop : function () {
						return headerHeight;
					},
					viewModel : {
						groupHeight : groupHeight,
						getMaxDisplayedGroupIndex :  function () { return 9; }

					}
				}, scrollY);
			});

			it('should return active groups', () => {
				expect(result).toEqual([3, 4, 5]);
			});
		});
		/*
			Same test as above but different values
		*/
		describe('test case 2', () => {

			let result;

			beforeEach(() => {

				activeRegionRatio = .5;
				windowHeight = 10;
				headerHeight =  27;
				groupHeight = 56;
				scrollY = 274;

				result = ProductListController.prototype.calculateActiveGroups.call({
					getOffset : function () {
						return windowHeight * activeRegionRatio;
					},
					getWindowInnerHeight : function () {
						return windowHeight;
					},
					getContainerElTop : function () {
						return headerHeight;
					},
					viewModel : {
						groupHeight : groupHeight,
						getMaxDisplayedGroupIndex :  function () { return 9; }
					}
				}, scrollY);
			});

			it('should return active groups', () => {
				expect(result).toEqual([4]);
			});
		});
	});

});