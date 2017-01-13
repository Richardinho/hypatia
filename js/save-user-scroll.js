function SaveUserScroll () {

    this.timerId;

}
SaveUserScroll.prototype = {

    replaceState : function () {

        history.replaceState(
            _.extend(history.state || {}, {
                scrollTop: document.body.scrollTop
            }),
            document.title,
            window.location
        );

    },


    onScroll : function (scrollY) {

        clearTimeout(this.timerId);

        this.timerId = setTimeout(this.replaceState.bind(this), 50);
    }

};


SaveUserScroll.inject = [];