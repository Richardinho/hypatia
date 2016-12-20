describe('book-list-view', () => {

	let bookListView;

	beforeEach(() => {
	    bookListView = new BookListView({
	        groups : Groups.factory,
	        pageViewFactory : PageView.factory
	    });
	    bookListView.render();
	});

	describe('arrangeGroups()', () => {

	    let activeGroups;
	    let displayedGroups;
	    let result;

	    describe('When adding groups to the end', () => {
            beforeEach(() => {
                activeGroups = [5, 6, 7];
                displayedGroups = [3, 4, 5];

                result = BookListView.prototype.arrangeGroups.call(null, activeGroups, displayedGroups);
            });
            it('should return arrays of groups to remove, add, and leave', () => {
                expect(result).toEqual({
                    groupsToAppend : [6, 7],
                    groupsToPrepend : [],
                    groupsToRemoveFromEnd : [],
                    groupsToRemoveFromFront : [3, 4],
                	groupsToLeave : [5]
                });
            });
	    });

	    describe('When prepending groups', () => {
            beforeEach(() => {
                activeGroups = [1, 2, 3];
                displayedGroups = [3, 4, 5];

                result = BookListView.prototype.arrangeGroups.call(null, activeGroups, displayedGroups);
            });
            it('should return arrays of groups to remove, add, and leave', () => {
                expect(result).toEqual({
                    groupsToAppend : [],
                    groupsToPrepend : [1, 2],
                    groupsToRemoveFromEnd : [4, 5],
                    groupsToRemoveFromFront : [],
                	groupsToLeave : [3]
                });
            });
	    });

	    describe('When adding groups for first time', () => {
            beforeEach(() => {
                activeGroups = [0, 1, 2, 3];
                displayedGroups = [];

                result = BookListView.prototype.arrangeGroups.call(null, activeGroups, displayedGroups);
            });
            it('should return arrays of groups to remove, add, and leave', () => {
                expect(result).toEqual({
                    groupsToAppend : [0, 1, 2, 3],
                    groupsToPrepend : [],
                    groupsToRemoveFromEnd : [],
                    groupsToRemoveFromFront : [],
                	groupsToLeave : []
                });
            });
	    });
	});

	describe('update()', () => {
	    let pageContainer,
	        activeGroups;

	    beforeEach(() => {
            pageContainer = bookListView.getContainerEl();

            activeGroups = {
                indexOfFirstGroup : 5,
                groups : [
                    { data : [
                        {
                            title : 'book1',
                            author : 'Mr X'
                        }, {
                            title : 'book2',
                            author : 'Joe Blogs'
                        }
                    ]},
                    {  /*  no data, placeholder data will be used instead */ },
                    { data : [
                        {
                            title : 'book3',
                            author : 'Bob Smith'
                        }, {
                            title : 'book4',
                            author : 'Jill Green'
                        }
                    ] },
                    { /*  no data, placeholder data will be used instead */ }
                ]
            };

            bookListView.update(activeGroups);
	    });

	    it('should render groups into page container element', () => {

            expect(pageContainer.querySelectorAll('.book-list').length).toBe(4);
            expect(pageContainer.querySelectorAll('.book').length).toBe(12);
            expect(pageContainer.querySelectorAll('.book').item(2).innerHTML).toContain('placeholder book by mr placeholder');
            expect(pageContainer.querySelectorAll('.book').item(6).innerHTML).toContain('book3 by Bob Smith');

        });
	});

});