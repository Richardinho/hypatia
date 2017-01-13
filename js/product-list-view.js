let ProductListView = Backbone.View.extend({

    initialize : function (options) {

        this.viewModel = options.viewModel;
    },


	template : _.template(`

		<h2 class="number-of-results" data-component="number-of-results"></h2>
		<div id="page-container"></div>
		<h2 data-component="number-of-results"></h2>
		<button data-action="load-more">load more</button>
		<button data-action="back-to-top">back to top</button>

	`),

	/*
		render active groups into view
	*/
	updateView : function (activeGroups) {

        let pageContainerEl = this.getContainerEl();

        pageContainerEl.innerHTML = '';
        this.viewModel.resetDisplayPropertyOfGroups();

        let frag = document.createDocumentFragment();

        activeGroups.forEach(groupIndex => {

        	if(this.viewModel.groups[groupIndex].el) {

        		frag.appendChild(this.viewModel.groups[groupIndex].el);

        	} else {

				let placeholderEl = this.createPlaceholderGroup(groupIndex, this.viewModel.groups[groupIndex].products );
				frag.appendChild(placeholderEl);
				this.viewModel.groups[groupIndex].el = placeholderEl;
				this.viewModel.groups[groupIndex].placeholder = true;
				this.trigger('placeholder-created', groupIndex, this.viewModel.groups[groupIndex].products );

        	}

        	this.viewModel.groups[groupIndex].displayed = true;

        });

        pageContainerEl.appendChild(frag);

        this.setPaddingTop(activeGroups[0]);
        this.setPaddingBottom(activeGroups[activeGroups.length - 1]);



	},

	placeholderTemplate : _.template(`
		<h2>groupIndex: <%= groupIndex %>, i: <%= productIndex %></h2>
		<img class="spinner" src="/images/spinner.svg">
	`),

	createPlaceholderGroup : function (groupIndex, productsPerGroup) {

	    let el = document.createElement('div');
	    el.className = 'placeholder-group';
	    for(let i = 0; i < productsPerGroup; i++) {
	    	let productEl = document.createElement('div');
	    	productEl.innerHTML = this.placeholderTemplate({
	    		groupIndex : groupIndex,
	    		productIndex : 1 + (groupIndex * 4) + (i )
	    	});
	    	productEl.className = 'book';
	    	productEl.style.height = this.viewModel.itemHeight + 'px';
	    	el.appendChild(productEl);
	    }
	    return el;

	},

	/*
		replace placeholder group with group with actual data
	*/
	replacePlaceholder : function (groupIndex, groupData) {

		let group = this.viewModel.groups[groupIndex];
		let placeholderEl = group.el;

		let el = (new GroupView({

			groupId : groupIndex,
			books : groupData

		})).render(this.viewModel.itemHeight);



		// if the placeholder is currently in the DOM
		if(!!placeholderEl.parentElement) {
			this.getContainerEl().replaceChild(el, placeholderEl);
			this.revealGroup(el);
			if(group.focus) {
				el.querySelector('[data-product-link]').focus();
				group.focus = false;
			}
		}
		// cache new el
		group.el = el;

	},

	revealGroup : function (groupEl) {

		groupEl.style.opacity = 0;
		groupEl.clientWidth;
		groupEl.style.transition = 'opacity 1s ease';
		groupEl.style.opacity = 1;

	},

    getContainerEl : function () {

        return this.el.querySelector('#page-container');
    },

	events : {

		'click [data-action=load-more]' : 'loadMore',
		'click [data-action=back-to-top]' : 'backToTop'
	},

	loadMore : function () {

		this.trigger('load-more');
	},

	backToTop : function () {

	    window.scrollTo(0,0);
	},

	showLoadMoreButton : function () {

		this.el.querySelector('[data-action=load-more]').style.visibility = 'visible';

	},

	hideLoadMoreButton : function () {

		this.el.querySelector('[data-action=load-more]').style.visibility = 'hidden';
	},

	render : function () {

		this.el.innerHTML = this.template({

			title : 'product list page'

		});

		return this;
	},

	numberOfResultsTemplate : _.template(`
		1 - <%= numberOfLoadedResults %> results of <%= numberOfTotalResults %>
	`),

	updateNumberOfResults : function () {

		let componentEls = this.el.querySelectorAll('[data-component=number-of-results]');

		componentEls.forEach(componentEl => {
			componentEl.innerHTML = this.numberOfResultsTemplate({
				numberOfLoadedResults : this.viewModel.getNumberOfLoadedProducts(),
				numberOfTotalResults : this.viewModel.totalProducts
			})
		});
	},

    setPaddingTop : function (firstGroupIndex) {

		this.getContainerEl().style.paddingTop =  firstGroupIndex * this.viewModel.groupHeight + 'px';
    },

    setPaddingBottom : function (lastGroupIndex) {


		let padding = (
            this.viewModel.getMaxDisplayedGroupIndex() - lastGroupIndex)
            * (this.viewModel.itemHeight * this.viewModel.productsPerGroup);

		if(this.viewModel.onLastPage()) {
			let lastGroup = this.viewModel.groups[this.viewModel.groups.length - 1];
			let productsInLastGroup = lastGroup.products;
			let diff = this.viewModel.productsPerGroup - productsInLastGroup;
			let remainingGroups = (this.viewModel.getMaxDisplayedGroupIndex() - lastGroupIndex);
			if(!remainingGroups) {
				padding = 0;
			} else {

				let items = (remainingGroups * this.viewModel.productsPerGroup) - diff;
				padding = items * this.viewModel.itemHeight;
			}


		}

    	this.getContainerEl().style.paddingBottom = padding + 'px';
    }

});
