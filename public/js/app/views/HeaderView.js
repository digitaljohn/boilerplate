define([
    'backbone',
    'marionette',

    'hbs!templates/header'
],function(
    Backbone,
    Marionette,
    
    template
){

    return Backbone.Marionette.ItemView.extend({
        template:template,
    });
    
});