function ViewModel() {

    this.items = [];

    this.totalItems;

    this.anchoredItem;

    this.pageIndex;

    this.itemsPerPage = 10;

    // height of a tombstone placeholder element
    this.tombstoneHeight;

}
ViewModel.prototype = {

    initialiseItemsArray : function () {

        for (let i = 0; i < this.totalItems; i++) {

            this.items.push({
                tombstone : true,
                height : this.tombstoneHeight,
                el : null
            });

        }
    },

    canLoadMore : function () {

        return ((this.pageIndex + 1) * this.itemsPerPage) < this.totalItems;

    }

/*
    getItemsToRemoveFromTop : function () {

        let firstIndex = this.firstActiveItemIndex;
        let previousFirstIndex = this.previousFirstActiveItemIndex;
        let result = [];

        for (let i = previousFirstIndex; i < firstIndex; i++) {
            result.push(i);
        }
        return result;
    },

    getItemsToAddToBottom : function () {

        let lastIndex = this.lastActiveItemIndex;
        let previousLastIndex = this.previousLastActiveItemIndex;

        let result = [];

        for (let i = lastIndex; i > previousLastIndex; i--) {
            result.unshift(i);
        }
        return result;
    },

    getItemsToRemoveFromBottom : function () {

        let lastIndex = this.lastActiveItemIndex;
        let previousLastIndex = this.previousLastActiveItemIndex;

        let result = [];

        for (let i = previousLastIndex; i > lastIndex; i--) {
            result.unshift(i);
        }
        return result;
    },

    getItemsToAddToTop : function () {

        let firstIndex = this.firstActiveItemIndex;
        let previousFirstIndex = this.previousFirstActiveItemIndex;
        let result = [];

        for (let i = firstIndex; i < previousFirstIndex; i++) {
            result.push(i);
        }
        return result;
    }*/
};

