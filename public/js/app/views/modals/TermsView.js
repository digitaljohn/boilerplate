define([
	'App',
	'backbone',
	'marionette',
	'hbs!templates/modals/terms'
],function(
	App,
	Backbone,
	Marionette,
	template
){

    return Backbone.Marionette.ItemView.extend( {
        template: template
    });

});