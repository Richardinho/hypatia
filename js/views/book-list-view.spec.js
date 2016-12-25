describe('book-list-view', () => {

	let bookListView;

	describe('update()', () => {
	    let pageContainer,
	        activeGroups;

	    beforeEach(() => {

	        bookListView = new BookListView({
	            config : {
	                groupsPerPage : 10,
                    itemsPerGroup : 4,
                    activeRegionRatio : 2,
                    groupHeight : 400
	            }
	        });
	        bookListView.render();

            pageContainer = bookListView.getContainerEl();

            activeGroups = [ 3, 4, 5, 6 ];

            bookListView.update(activeGroups);
	    });

	    it('should render groups into page container element', () => {

            expect(pageContainer.querySelectorAll('.book-list').length).toBe(4);
            expect(pageContainer.querySelectorAll('.book').length).toBe(16);
            expect(pageContainer.querySelectorAll('.book').item(2).innerHTML).toContain('placeholder book by mr placeholder');

        });
	});

});