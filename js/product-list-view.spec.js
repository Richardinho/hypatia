describe('product-list-view', () => {


    let productListView,
        viewModel;


    beforeEach(() => {

        viewModel = {
            productsPerGroup : 4,
            itemHeight : 23,
            onLastPage : function () {},
            groups : [{}, {
                products : 3
            }],
            getMaxDisplayedGroupIndex : function () {}
        };

        productListView = new ProductListView({
            viewModel : viewModel
        });

    });

    describe('calculateBottomPadding()', () => {

        describe('when NOT on last page', () => {

            beforeEach(() => {

                spyOn(viewModel, 'onLastPage').and.returnValue(false);
                spyOn(viewModel, 'getMaxDisplayedGroupIndex').and.returnValue(7);
            });
            it('should calculate bottom padding', () => {
                expect(productListView.calculateBottomPadding(5)).toBe(184);
            });
        });
        describe('when on last page', () => {

            beforeEach(() => {

                spyOn(viewModel, 'onLastPage').and.returnValue(true);
                spyOn(viewModel, 'getMaxDisplayedGroupIndex').and.returnValue(7);
            });
            it('should calculate bottom padding', () => {
                expect(productListView.calculateBottomPadding(5)).toBe(161);
            });
        });
    });
});