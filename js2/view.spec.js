describe('view', () => {


    describe('calculateItemsInActiveRegion()', () => {

        let viewModel
            scrollY;

        beforeEach(() => {
            scrollY = 120;
            viewModel = {
                items : [
                    { height : 20 }
                    ,{ height : 30}
                    ,{ height : 10}
                    ,{ height : 30}
                    ,{ height : 10}
                    ,{ height : 20}
                    ,{ height : 50}
                    ,{ height : 20}
                ],
                containerTop : 20,
                firstActiveItemIndex : null,
                lastActiveItemIndex : null,

            }

            View.prototype.calculateItemsInActiveRegion.call({
                viewModel : viewModel,
                getUpperActiveRegionBoundary : function () { return 100; },
                getLowerActiveRegionBoundary : function () { return 160; }
            }, scrollY);
        });

        it('should calculate indexes of first and last items in active region', () => {

            expect(viewModel.firstActiveItemIndex).toBe(3);
            expect(viewModel.lastActiveItemIndex).toBe(6);
        });
    });


});