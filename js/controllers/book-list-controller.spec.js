describe('book-list-controller', () => {
	let bookListController;
	describe('calculateActiveGroups()', () => {

        let windowHeight;
        let headerHeight;
        let groupHeight;
        let offset;
        let scrollY;

        let result;

        describe('test case 1', () => {

            beforeEach(() => {

                offset = 100;
                windowHeight = 200;
                headerHeight =  50;
                groupHeight = 100;
                scrollY = 300;

                setUpSpies(offset, windowHeight, headerHeight, groupHeight);

                result = BookListController.prototype.calculateActiveGroups.call(
                    _.extend(BookListController.prototype, { maxGroupIndex : 6 }), scrollY);
            });

            it('should return indices of first and last pages', () => {
                expect(result).toEqual({
                    indexOfFirstGroup : 1,
                    indexOfLastGroup : 5
                });
            });
        });

        describe('test case 2', () => {

            beforeEach(() => {

                offset = 31.5;
                windowHeight = 15;
                headerHeight =  125;
                groupHeight = 26;
                scrollY = 221.5;

                setUpSpies(offset, windowHeight, headerHeight, groupHeight);

                result = BookListController.prototype.calculateActiveGroups.call(_.extend(BookListController.prototype, { maxGroupIndex : 6 }), scrollY);
            });

            it('should return indices of first and last pages', () => {
                expect(result).toEqual({
                    indexOfFirstGroup : 2,
                    indexOfLastGroup : 5
                });
            });
        });

	});

	function setUpSpies(offset, windowHeight, headerHeight, groupHeight) {

        spyOn(BookListController.prototype, 'getOffset').and.returnValue(offset);
        spyOn(BookListController.prototype, 'getWindowHeight').and.returnValue(windowHeight);
        spyOn(BookListController.prototype, 'getContainerElTop').and.returnValue(headerHeight);
        spyOn(BookListController.prototype, 'getGroupHeight').and.returnValue(groupHeight);
	}
});