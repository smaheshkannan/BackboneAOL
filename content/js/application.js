$(function(){

	var ApplicationRouter = Backbone.Router.extend({

		routes: {
			"": "home",
			"home": "home",
			"about": "about",
			"contact": "contact"
		},

		deselectPills: function(){
			$('ul.pills li').removeClass('active');
		},

		selectPill: function(pill){
			this.deselectPills();
			$(pill).addClass('active');
		},

		hidePages: function(){
			$('div.pages').hide();
		},

		showPage: function(page){
			this.hidePages();
			$(page).show();
		},

		home: function() {
			this.showPage('div#home-page');
			this.selectPill('li.home-pill');
		},

		about: function() {
			this.showPage('div#about-page');
			this.selectPill('li.about-pill');
		},

		contact: function() {
			this.showPage('div#contact-page');
			this.selectPill('li.contact-pill');
		}

	});

	var ApplicationView = Backbone.View.extend({

		el: $('body'),

		events: {
			'click ul.pills li.home-pill a': 'displayHome',
			'click ul.pills li.about-pill a': 'displayAbout',
			'click ul.pills li.contact-pill a': 'displayContact'
		},

		initialize: function(){
			this.router = new ApplicationRouter();
			Backbone.history.start();
		},

		displayHome: function(){
			this.router.navigate("home", true);
		},

		displayAbout: function(){
			this.router.navigate("about", true);
		},

		displayContact: function(){
			this.router.navigate("contact", true);
		}

	});

	new ApplicationView();

	productList = Backbone.Collection.extend({
	    initialize: function () {
	        this.bind("add", function (model) {
	            view.render(model);
	        })
	    }
	});

	productView = Backbone.View.extend({

	    tagName: 'li',

	    events: {
	        'click #add-input': 'getproduct',
	    },

	    initialize: function () {
	        this.productslist = new productList;
	        _.bindAll(this, 'render');
	    },

	    getproduct: function () {
	        var product_name = $('#input').val();

	        if (product_name.length > 0) {
	            if( this.productslist.length == 0 )
	                $("#products-list").append("<tr><th> Product Name </th></tr>");
	            this.productslist.add({ name: product_name });
	        }
	    },

	    render: function (model) {

	        $("#products-list").append("<tr><td>" + model.get

    ("name") + "</td></tr>");
	        console.log('rendered')
	    },

	});

	var view = new productView({ el: 'body' });
});
