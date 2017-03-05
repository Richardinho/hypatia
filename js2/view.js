let View = Backbone.View.extend({


	initialize : function (options) {

		this.viewModel = options.viewModel;
	},

    events : {
        'click [data-action=load-more]' : 'loadMore',
        'click [data-action=back-to-top]' : 'backToTop'
	},


    /*
        renders main html structure - the container but without items
    */
    render : function () {

        this.el.innerHTML = this.template();
        return this;
    },

    template : _.template(`

        <h2 class="number-of-results" data-component="number-of-results"></h2>
        <ul id="container"></ul>
        <h2 data-component="number-of-results"></h2>
        <div class="buttons">
            <button class="load-more" data-action="load-more">load more</button>
            <button class="back-to-top" data-action="back-to-top">back to top</button>
        </div>

    `),

    renderItem : function (index, data) {
        let el = document.createElement('li');
        el.className = "item";
        el.innerHTML = this.itemTemplate({
         index : index,
         item : {
            title : data.title,
            image : data.image,
            id : data.id,
            author : data.author,
            description : data.description
        }});
        return el;

    },

    itemTemplate : _.template(`

		<a data-internal href="/item/<%= item.id %>" class="clearfix">
			<img class="thumbnail" src="/images/<%= item.image %>">
			<h3><%= index %></h3>
			<h4>by <%= item.author %></h4>
			<p><%= item.description %></p>
		</a>
    `),

    renderTombstone : function (id) {

        let el = document.createElement('li');
        el.className = "item tombstone";
        el.innerHTML = this.tombstoneTemplate({
            id : id
        });
        return el;
    },


    tombstoneTemplate : _.template(`
        <a data-internal href="" tabindex="0">
            <span><%= id %></span>
            <img class="spinner" src="/images/spinner.svg">
        </a>
    `),

    reifyItem : function (index, data) {
        let el = this.renderItem(index, data);
        let item = this.viewModel.items[index];
        let isFocused = item.el.querySelector('a') === document.activeElement;

        this.getContainerEl().replaceChild(el, item.el);
        if(isFocused) {
            el.querySelector('a').focus();
        }
        item.el = el;
        item.height = el.getBoundingClientRect().height;
        item.tombstone = false;
    },

    recalculateHeights : function () {

        let items = this.viewModel.items;

        this.viewModel.tombstoneHeight = this.getTombstoneHeight();

        for (let i = 0; i < items.length; i++) {

            let item = items[i];
            if(item.el) {
                item.height = item.el.getBoundingClientRect().height
            }
        }
    },

    /*
        Take scroll amount and work out what the scroll anchor item is and
        its offset
    */
    calculateAnchoredItem : function (scrollY) {

        let items = this.viewModel.items;

        let itemBottom = this.calculateContainerTop();

        for (let i = 0; i < items.length; i++) {

            let item = items[i];
            let height = item.height;

            itemBottom += height;

            if (itemBottom > scrollY) {
                let offset = itemBottom - scrollY;

                history.replaceState(
                    _.extend(history.state || {}, {
                        anchoredItem : {
                            index : i,
                            offset : offset
                        }
                    }),
                    document.title,
                    window.location
                );
                break;
            }
        }
        console.log('calculateanchoreditem', history.state.anchoredItem);
    },

    adjustScroll : function () {

        let anchoredItem = history.state.anchoredItem;

        let items = this.viewModel.items;

        let scroll = this.calculateContainerTop();
        let record = [];

        for (let i = 0; i < items.length; i++) {
            scroll += items[i].height;
            if(i === anchoredItem.index) {
                scroll -= anchoredItem.offset;
                break;
            }
        }

        console.log('adjust scroll', anchoredItem, scroll);
        window.scrollTo(0, scroll);

    },

    loadMore : function () {

        this.trigger('load-more');
    },

    backToTop : function () {
        window.scrollTo(0, 0);
        document.getElementById('foo').focus();
    },

    loadItems : function (firstItem, lastItem, shouldAppend) {

        let items = this.viewModel.items;

        let frag = document.createDocumentFragment();

        let containerEl = this.getContainerEl();

        for (let i = firstItem; i <= lastItem; i++) {
            let el;
            let item = items[i];
            //  If the element has not been created we need to start with a tombstone
            if(!item.el) {
                el = this.renderTombstone(i);
                //  cache element
                item.el = el;

                this.trigger('rendered-tombstone', i);
            }

            frag.appendChild(el);

        }

        if(shouldAppend) {

            containerEl.appendChild(frag);

        }

        if(this.viewModel.canLoadMore()) {
            this.getLoadMoreButton().style.display = 'inline-block';
        } else {
            this.getLoadMoreButton().style.display = 'none';
        }

        this.focusOnNextItem(firstItem);

    },

    focusOnNextItem : function (item) {

        this.viewModel.items[item].el.querySelector('a').focus();


        // work out the first item on the new page.
        // focus on this item.
    },

    /*
        calculates dynamic value of a tombstone height.
        We cache this value between calls.
    */
    getTombstoneHeight : function () {

        let height;

        //  add a tombstone in, measure it, then remove it again.
        let tombstoneEl = this.renderTombstone(5);
        this.getContainerEl().appendChild(tombstoneEl);
        height = tombstoneEl.offsetHeight;
        this.getContainerEl().removeChild(tombstoneEl);

        return height;

    },

    calculateContainerTop : function () {

         return this.getContainerEl().getBoundingClientRect().top + window.scrollY;
    },

    getContainerEl : function () {

        return this.el.querySelector('#container');
    },

    getLoadMoreButton : function () {

        return this.el.querySelector('[data-action=load-more]');
    }

});