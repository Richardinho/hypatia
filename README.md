# Hypatia
###An implementation of 'load-more' which follows best practises

The best way for a web page to present a long list of search results has been the subject of much discussion in the web developer community. Pagination which was the traditional technique developed in the early days of the web was followed, later on, by approaches such as 'infinite-scroll' and 'load-more'. All of these techniques have perceived shortcomings, as well as virtues, and thus debates as to which is the superior method are fierce.

[The Baymard institute](http://baymard.com/), a world leader in web usabilty, published their research on product lists and concluded that 'load more' was the best technique, with the caveat that a careful implementation that addressed a variety of usability issues was essential to its effectiveness.

The goal of this project is to produce an implementation of 'load more' which follows the recommendations of the Baymard institute.

#### Benefits of Load More
'Load more' addresses some of the drawbacks of pagination and infinite scroll implementations. According to the Baymard report, pagination is perceived by users to be a slow way of reading list results. Infinite scroll goes to the other extreme and allows the user to scroll through large amounts of results but at the cost of focusing on individual list results. Load more hits a happy medium and allows the user to quickly move through a large number of results whilst giving them regular 'breaks', giving them a chance to examine the list in greater detail.

### Acceptance Criteria

**GIVEN** the user has scrolled downwards
**AND** the user has scrolled past the bottom page limit
**THEN** the 'load more' button should be displayed

**GIVEN** the user clicks on the 'load more' button
**THEN**  the next page of items should be added to the list


### Other requirements
At all times, the height of the list should be equal to what it would be if all current pages were displayed within it. This is so that the scroll bar remains usable for the user.

As well as through manual scrolling by the user, scrolling can occur programmatically both by user code and by the browser itself. The solution must behave in an expected way under these circumstances.

### configurable options
* number of items within a **_group_**
* number of groups within a **_page_**
* active region in which to display groups before switching some out; specified as a ratio of the viewport height

#### definitions
<dl>
  <dt>item</dt><dd>a.k.a 'list-item'. The individual search result or product to display. For example a product or a search result</dd>

  <dt>list</dt><dd>The container for all items </dd>
  
  <dt>page</dt> <dd>The list is split up into pages. When the user reaches the bottom of the last displayed page in the list, a 'load more' button is displayed if there are more items on the server</dd>
  
  <dt>group</dt><dd>A page is split into groups of items.The user is not aware of groups but individual groups can be loaded in and swapped out in order to achieve performance benefits.</dd>
  
  <dt>universal set</dt><dd>The entire set of items that can be displayed. Normally these exist on the server with only a subset existing on the client side at any one time, although not necessarily being displayed.</dd>
</dl>






    