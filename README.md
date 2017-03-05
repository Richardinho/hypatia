One of the UX challenges in web development is how best to present a list of items to the users without having to load all the items
onto the page at once. Having faced this problem myself, I decided to attempt to study it and see if I could come up with a solution.

### Pagination and Infinite Scroll
The traditional solution is Pagination; where only a 'page' of items is loaded into the browser at a time and some form of navigation, usually buttons, are provided to allow the user to navigate between pages.

Pagination has the drawback of interrupting the user as she scrolls through the results (usually at an arbitrary point) and forcing her to perform an action - for example, pressing a button -  in order to resume. To address this shortcoming, Infinite Scroll was developed. 

Infinite Scroll appears to the user as a single page of results so that she can continue scrolling through the items uninterrupted until reaching the end. All the items are not loaded onto the page at once; instead items are loaded on the fly using Javascript as the user scrolls. Infinite scroll is somewhat controversial and there are technical and usability issues regarding it as well.

For example, users may not stop to look closely at any of the items , always hoping to see 'something more interesting' just below. Also the  page footer may never be seen unless the user scrolls right down to the bottom of the items list.

### A third solution: Load More
A third option, which once again tries to fix the issues of its predecessors, is what I will call 'Load More' . Load More is a kind of hybrid of Infinite Scroll and Pagination. As with Infinite Scroll, items are loaded in on the fly as the user scrolls the page, but the items are still grouped into pages and when the user reaches the end of a page of items, there is a single 'load more' button which when pressed will result in the next page being loaded. The user is not able to navigate to different pages as with Pagination. The number of items in a Load More page should be more than with Pagination. The idea is that the user can scroll through the items - but not for ever - and so they don't get a sense of 'never reaching their destination', and they are able to reach the page footer. 
Load more hits a happy medium and allows the user to quickly move through a large number of results whilst giving them regular 'breaks', giving them a chance to examine the list in greater detail.

### sidebar
A very good analysis of the problems concerning these two techniques was carried out by the [The Baymard institute](http://baymard.com/), an organization which specialises in Web usability testing. I will draw on their report heavily in this article. As well as presenting the problems of these techniques, Baymard also recommended what they thought was the best solution to the problem of long lists. My solution is heavily indebted to theirs.

### Load more requirements

When the user navigates away from the list of items then hits the back button, she should be brought back to exactly the same place in the list of items as she was before she navigated.

The vertical scroll bar should report correctly the user's position within the items. The scroll bar should behave the same as if all
the items were present in the DOM.

There should be a fallback for when Javascript is not available.

The list should be navigable via the keyboard as well as by the mouse.

items should be bookmarkable. 

The user should be able to jump ahead several pages

The user should be able to switch to normal pagination if they don't like load more

Out of bound pages should return a 404 page.

items should be lazy loaded. placeholders should be provided before the actual item is loaded.

items can be of any height. The height of an item will be unknown until it is actually loaded.

handle resize events


#### implementation

The runway contains all the items. Every DOM element in the runway should be promoted to its own layer. This means that the runway layer itself is completely empty and thus the browser can optimize an element that is perhaps hundreds of thousands of pixels high, for example by not having to store the layer's texture in the graphics card.













    