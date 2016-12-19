describe('book-list-view', () => {

	let bookListView;

	beforeEach(() => {
	    bookListView = new BookListView({
	        groups : Groups.factory,
	        pageViewFactory : PageView.factory
	    });
	    bookListView.render();
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