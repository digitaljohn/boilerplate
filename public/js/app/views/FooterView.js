define([
    'App',
    'backbone',
    'marionette',

    'hbs!templates/footer',

],function(
    App,
    Backbone,
    Marionette,

    template
){

    return Backbone.Marionette.ItemView.extend({
        template:template,

        events: {
            "click .terms" : "showTerms"
        },

        showTerms: function(){
            App.vent.trigger('modal:showTerms');
        }
    });
    
});