function ScrollRecorder () {}

let timerId;

ScrollRecorder.prototype = {

    onScroll : function () {



        clearTimeout(timerId);

        timerId = setTimeout(() => {

            let anchoredItem = this.loadMore.getAnchoredItem();

            history.replaceState(
                Object.assign(history.state || {}, {
                    anchoredItem : anchoredItem,
                    containerHeight : document.querySelector('#item-container').offsetHeight
                }),
                document.title,
                window.location
            );


        }, 500);
    }

};

ScrollRecorder.inject = [];

