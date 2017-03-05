describe('view-model', () => {

    let viewModel;

    describe('getItemsToRemoveFromTop()', () => {

        let itemsToRemove;

        beforeEach(() => {

            itemsToRemove = ViewModel.prototype.getItemsToRemoveFromTop.call({
                firstActiveItemIndex : 5,
                previousFirstActiveItemIndex  : 2
            });
        });

        it('should remove items before current first active item', () => {

            expect(itemsToRemove).toEqual([2, 3, 4]);
        });
    });

    describe('getItemsToAddToBottom()', () => {

        let itemsToAdd;

        beforeEach(() => {

            itemsToAdd = ViewModel.prototype.getItemsToAddToBottom.call({
                lastActiveItemIndex : 5,
                previousLastActiveItemIndex : 2
            });
        });

        it('should add items after previous last item', () => {

            expect(itemsToAdd).toEqual([3, 4, 5]);
        });
    });

    describe('getItemsToRemoveFromBottom()', () => {

        let itemsToRemove;

        beforeEach(() => {

            itemsToRemove = ViewModel.prototype.getItemsToRemoveFromBottom.call({
                lastActiveItemIndex : 5,
                previousLastActiveItemIndex : 8
            });
        });

        it('should remove items from bottom', () => {

            expect(itemsToRemove).toEqual([6, 7, 8]);
        });

    });

    describe('getItemsToAddToTop()', () => {

        let itemsToAdd;

        beforeEach(() => {

            itemsToAdd = ViewModel.prototype.getItemsToAddToTop.call({
                firstActiveItemIndex : 2,
                previousFirstActiveItemIndex  : 5
            });
        });

        it('should add items to top', () => {

            expect(itemsToAdd).toEqual([2, 3, 4]);
        });


    });
});

