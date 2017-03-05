function SaveUserScroll (view) {

    this.timerId;
    this.view = view;

}
SaveUserScroll.prototype = {


    onScroll : function (scrollY) {

        this.view.calculateAnchoredItem(scrollY);

    }

};


SaveUserScroll.inject = [

];