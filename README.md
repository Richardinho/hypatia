# Hypatia

### An implementation of 'load-more' which follows best practises

The best way for a web page to present a long list of search results has been the subject of much discussion in the web developer community. Pagination which was the traditional technique developed in the early days of the web was followed, later on, by approaches such as 'infinite-scroll' and 'load-more'. All of these techniques have perceived shortcomings, as well as virtues, and thus debates as to which is the superior method are fierce.

[The Baymard institute](http://baymard.com/), a world leader in web usabilty, published their research on product lists and concluded that 'load more' was the best technique, with the caveat that a careful implementation that addressed a variety of usability issues was essential to its effectiveness.

The goal of this project is to produce an implementation of 'load more' which follows the recommendations of the Baymard institute.

### Drawbacks of pagination

### Drawbacks of infinite scroll

### Benefits of Load More
'Load more' addresses some of the drawbacks of pagination and infinite scroll implementations. According to the Baymard report, pagination is perceived by users to be a slow way of reading list results. Infinite scroll goes to the other extreme and allows the user to scroll through large amounts of results but at the cost of focusing on individual list results. Load more hits a happy medium and allows the user to quickly move through a large number of results whilst giving them regular 'breaks' which give them a chance to examine the list in greater detail.

#### Algorithm for navigating categories
1. display 10-30 products on initial page load
2. lazy load in another 10-30 products as the user scrolls
3. on reaching around 100 products, display a load more button.
4. on clicking the load more button another 10-30 products are loaded in and the process repeats.

##### other considerations for 'load more'
* As results are lazy loaded in and out, the height of the page loses its 'natural' height and thus causing the scroll bar to cease to behave in the way that the user will expect. Thus fake the height of the list results by using a technique such as adding extra padding to fill up the space made by unloaded/removed pages.

* display the number of results

* support toggling between list and grid view

### configurable options
* number of results to lazy load at a time
* number of results to display before showing a load more button
* 