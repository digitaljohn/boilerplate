define([
    'App',
    'backbone',
    'marionette',
    'jquery',
    'backbone-routenotfound',

    'views/HeaderView',
    'views/FooterView',
    'views/ModalView',
    'views/ErrorView',

    'views/HomeView',
    'views/ContactView',
    'views/AboutView',
    'views/NewsView',
    'views/ArticleView',
    'views/ArticleEditView',

    'models/Article',
    'models/ContactRequest',

    'collections/News'
],
function (
    App,
    Backbone,
    Marionette,
    $,
    routeNotFound,

    HeaderView,
    FooterView,
    ModalView,
    ErrorView,

    HomeView,
    ContactView,
    AboutView,
    NewsView,
    ArticleView,
    ArticleEditView,

    Article,
    ContactRequest,

    News
){

    return Backbone.Marionette.Controller.extend({
        
        initialize:function (options) {
            App.headerRegion.show( new HeaderView() );
            App.footerRegion.show( new FooterView() );
            App.modalRegion.show( new ModalView() );          

            this._setupGlobalListeners();
        },

        index:function () {
            App.mainRegion.show(new HomeView());
        },

        showAbout:function () {
            App.mainRegion.show(new AboutView());
        },

        showContact:function () {
            var self = this;

            App.mainRegion.close();

            var model = new ContactRequest();
            App.mainRegion.show(new ContactView( {model:model} ));
        },

        showNews:function (slug) {
            this._loadAndShowCollection(News, NewsView, slug);
        },

        showArticle:function (slug) {
            this._loadAndShowModel(Article, ArticleView, slug);
        },

        editArticle:function (slug) {
            this._loadAndShowModel(Article, ArticleEditView, slug);
        },

        _loadAndShowModel: function(modelType, viewType, id){
            var self = this;

            App.mainRegion.close();

            var model;

            if(id){
                model = new modelType({id:id});
                model.fetch({
                    success: function(){
                        App.mainRegion.show(new viewType( {model:model} ));
                    },
                    error: function(){
                        self._show404();
                    }
                });
            }else{
                model = new modelType();
                App.mainRegion.show(new viewType( {model:model} ));

            }
        },

        _loadAndShowCollection: function(collectionType, viewType){
            var self = this;

            App.mainRegion.close();

            var collection = new collectionType();
            collection.fetch({
                success: function(){
                    App.mainRegion.show(new viewType( {collection:collection} ));
                },
                error: function(){
                    self._show404();
                }
            });
        },

        _show404: function () {

            App.mainRegion.show(new ErrorView({
                title: "404 File Not Found", 
                description: "We are really sorry, but the page you requested could not be found.",
                icon: "oneup"
            }));
            
        },

        _setupGlobalListeners: function(){
            var self = this;

            App.mainRegion.on('show', function(){
                $('body').scrollTop(0);
            });

            // Pass through links to router if avaliable.
            $(document).on('click', 'a', function (evt) {
                var anchor = $(this);
                var href = anchor.attr('href');
                var rel = anchor.attr('rel');

                if(!anchor.hasClass('disabled')){
                    if(rel == "external"){
                        window.open(href, "_blank");
                    }else{
                        if(href && href != '#'){
                            var protocol = this.protocol + '//';
                            Backbone.history.navigate(href, {trigger: true});
                        }
                    }
                }

                evt.preventDefault();
                return false;
            });
        }
    });

});