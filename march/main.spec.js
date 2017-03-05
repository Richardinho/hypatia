describe('loadMore', () => {

    let loadMore;

    beforeEach(() => {

    });

    describe('recalculateOffsets()', () => {

        let items,
            placeholderHeight,
            offset1,
            offset2,
            offset3;

        beforeEach(() => {

            placeholderHeight = 25;
            offset1 = 23;
            offset2 = 45;
            offset3 = 12;

            items = [
                undefined,
                undefined,
                { height : offset1 },
                { height : offset2},
                undefined,
                { height : offset3 }
            ];

            let context = {
                items : items,
                placeholderHeight : placeholderHeight,
                setContainerHeight : function () {}
            };

            LoadMore.prototype.recalculateOffsets.call(context);

        });

        it('should calculate offsets', () => {

            expect(items[0].offset).toBe(0);
            expect(items[1].offset).toBe(placeholderHeight);
            expect(items[2].offset).toBe(placeholderHeight + placeholderHeight);
            expect(items[3].offset).toBe(placeholderHeight + placeholderHeight + offset1);
            expect(items[4].offset).toBe(placeholderHeight + placeholderHeight + offset1 + offset2);
            expect(items[5].offset).toBe(placeholderHeight + placeholderHeight + offset1 + offset2 + placeholderHeight);

        });
    });
});