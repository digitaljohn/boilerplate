define([
    'App',
    'underscore',
    'backbone',
    'marionette',
    'GA'
], function(
    App,
    _,
    Backbone,
    Marionette,
    ga
){

    return Backbone.Marionette.AppRouter.extend({
        appRoutes: {
            "" :                   "index",
            "about" :              "showAbout",
            "contact" :            "showContact",
            "news" :               "showNews",
            
            "article/new" :        "editArticle",
            "article/:slug" :      "showArticle",
            "article/:slug/edit" : "editArticle"
        },

        initialize: function(options){
            this.listenTo(Backbone.history, 'routeNotFound', options.controller._show404);

            if(App.settings.tracking){
                ga.initialize();

                this.listenTo(Backbone.history, 'all', function(route, router){
                    ga.trackevent(['_trackEvent', 'Boilerplate', 'Page Hit', Backbone.history.fragment, 1]);
                });
            }
        }
    });
    
});