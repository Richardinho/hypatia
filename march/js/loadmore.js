var ITEMS_PER_PAGE = 20;
var BUFFER_ZONE = 500;

function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;

    while(element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }

    return { x: xPosition, y: yPosition };
}

function LoadMore (options, config) {

    this.container = config.container;
    this.anchoredItem = config.anchoredItem;
    this.initialContainerHeight = config.containerHeight;
    this.scrollManager = options.scrollManager;
    this.dataService = options.dataService;
    this.scrollRecorder = options.scrollRecorder;
    this.items = [];
    this.placeholderHeight;
    this.renderInitialPage();
    this.scrollManager.addListener('lm', this);
    this.scrollRecorder.loadMore = this;
    //this.scrollManager.addListener('save-scroll', this.scrollRecorder);
    this.focusedItem;

    window.addEventListener("beforeunload", (event) => {

        let anchoredItem = this.getAnchoredItem();

        history.replaceState(
            Object.assign(history.state || {}, {
                anchoredItem : anchoredItem,
                containerHeight : document.querySelector('#item-container').offsetHeight
            }),
            document.title,
            window.location
        );
    });

}

LoadMore.prototype = {

    setContainerHeight : function (height) {
        this.container.style.height = height + 'px';
    },

    getAnchoredItem : function () {


        let anchoredItem = {
            index : 0,
            offset : 0
        };

        let containerTop = (this.container.getBoundingClientRect().top);

        if (containerTop < 0) {

            containerTop *= -1;

            //  look for anchored item index
            for (let i = 0; i < this.items.length; i++) {

                let offset = this.items[i].offset + this.items[i].height;

                if (offset > containerTop) {
                    anchoredItem.index = i;
                    anchoredItem.offset = this.items[i].height - (offset - containerTop);
                    break;
                }
            }
        }


        return anchoredItem;

    },

    getFocusableItem : function () {

        return this.items.find(item => {
            //  return first reified item in the DOM
            return item.el && item.el.parentElement;

        }).el;

    },

    renderInitialPage : function () {

        this.calculatePlaceholderHeight();
        this.recalculateOffsets();

        if (this.initialContainerHeight) {
            this.setContainerHeight(this.initialContainerHeight);
        }

        if (this.anchoredItem) {
            let anchoredItem = this.items[this.anchoredItem.index];

            let containerPosition = getPosition(this.container).y;
            let scroll = containerPosition + anchoredItem.offset;
            window.scrollTo(0, scroll);

        }

        this.onScroll();

        let container = this.container;





        this.container.addEventListener('focus', event => {

            if (!this.focusedItem) {

                let item = this.getFocusableItem();
                item.focus();
                this.focusedItem = item;

            } else {

                this.focusedItem.focus();
            }
        });

        this.container.addEventListener('blur', event => {

            console.log('blur');

        });


        this.container.addEventListener('keydown', event => {

            let id;

            switch (event.key) {
            case "ArrowDown":

                event.preventDefault();

                id = parseInt(this.focusedItem.id, 10);

                if ( id < ITEMS_PER_PAGE) {

                    let idOfNextItem = id + 1;

                    if (document.getElementById(idOfNextItem)) {
                        let nextItemEl = document.getElementById(idOfNextItem);
                        nextItemEl.focus();
                        this.focusedItem = nextItemEl;
                    }
                }

                break;
            case "ArrowUp":

                event.preventDefault();

                id = parseInt(this.focusedItem.id, 10);

                if(id === 0) { return; }

                let idOfPrevItem = id - 1;

                if (document.getElementById(idOfPrevItem)) {

                    let prevItem = document.getElementById(idOfPrevItem);
                    prevItem.focus();
                    this.focusedItem = prevItem;

                }
                break;
            case "ArrowLeft":
              // Do something for "left arrow" key press.
              console.log('arrow left')
              break;
            case "ArrowRight":
              // Do something for "right arrow" key press.
              console.log('arrow right')
              break;
            case "Enter":
              // Do something for "enter" or "return" key press.
              console.log('enter')
              break;
            case "Escape":
              // Do something for "esc" key press.
              console.log('escape')
              break;
            case 'Tab' :
                console.log('tab')
                break;
            default:
              return; // Quit when this doesn't handle the key event.
            }

        });

    },




    onScroll : function (a, b, diff) {

        let containerTop = (this.container.getBoundingClientRect().top * -1);

        let upperLimit = containerTop - BUFFER_ZONE;
        let lowerLimit = containerTop + window.innerHeight + BUFFER_ZONE;


        for (let i = 0; i < ITEMS_PER_PAGE; i++) {

            let item = this.items[i];

            if (item.offset > upperLimit && item.offset < lowerLimit) {

                if (item.reified) {

                    if(!item.el.parentElement) {

                        this.container.appendChild(item.el);
                    }
                    item.el.style.transform = `translateY(${item.offset}px)`;

                    //  remove obsolete placeholders
                    if(item.placeholderEl.parentElement) {

                        this.container.removeChild(item.placeholderEl);
                    }


                } else {  //  placeholder

                    if (!item.placeholderEl) {

                        this.createPlaceholderItem(i);
                    }

                    if(!item.placeholderEl.parentElement) {

                        this.container.appendChild(item.placeholderEl);
                    }
                    item.placeholderEl.style.transform = `translateY(${item.offset}px)`;
                }

            } else {

                if (item.reified) {

                    if (item.el && item.el.parentElement) {
                        this.container.removeChild(item.el);
                    }

                } else {

                    if (item.placeholderEl && item.placeholderEl.parentElement) {
                        this.container.removeChild(item.placeholderEl);
                    }
                }
            }
        }
        if(diff) {
            window.scrollTo(0, window.pageYOffset + diff);
        }
    },

    recalculateOffsets : function () {

        let offset = 0;

        for (let i = 0; i < ITEMS_PER_PAGE; i++) {

            if (!this.items[i]) {
                this.items[i] = {
                    height : this.placeholderHeight
                };
            }

            this.items[i].offset = offset;

            offset += this.items[i].height;

        }

        this.setContainerHeight(offset);

    },

    createPlaceholderItem : function (id) {

        this.items[id].placeholderEl = this.createPlaceholderEl(id);

        this.reifyItem(id);

    },

    reifyItem : function (id) {

        this.dataService.fetchData(id).then(itemData => {


            let item = this.items[id];
            let oldHeight = item.height;
            item.el = this.createItemEl(id, itemData);
            item.reified = true;

            this.calculateHeightOfItem(item);

            this.recalculateOffsets();

            if(id < this.anchoredItem.index) {
                let newHeight = item.height;
                this.onScroll(null, null, newHeight - oldHeight);
            } else {
                this.onScroll(null, null, 0);
            }

            console.log('reified!', window.scrollY);

        });

    },

    calculateHeightOfItem : function (item) {

        item.el.style.visibility = 'hidden'
        this.container.appendChild(item.el);
        item.height = item.el.offsetHeight;
        this.container.removeChild(item.el);
        item.el.style.visibility = 'visible'
    },

    createPlaceholderEl : function (id) {

        var el = document.createElement('div');
        el.classList.add('placeholder');
        el.textContent = id;
        return el;
    },

    createItemEl : function (id, data) {

        var el = document.createElement('a');
        el.href = data.href;
        el.classList.add('item');
        el.classList.add('clearfix');
        el.tabIndex = -1;
        el.id = id;
        el.innerHTML = `
            <div class='id'>${ id }</div>
            ` + (data.image ? `
            <img height='100' class='image' src='images/${data.image}'>` : '')
             +
            `
            <div>${ data.body }</div>
        `;
        return el;
    },

    calculatePlaceholderHeight : function () {

        let placeholderEl = this.createPlaceholderEl('blah');

        this.container.appendChild(placeholderEl);

        let placeholderHeight = placeholderEl.offsetHeight;

        this.placeholderHeight = placeholderHeight;
        // clean, up, we don't want this floating around.
        this.container.removeChild(placeholderEl);

    }



};
LoadMore.inject = [
    'scrollManager',
    'dataService',
    'scrollRecorder'
    ];