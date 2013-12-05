define([
	'backbone',
	'marionette',

	'hbs!templates/newsitem',
	'views/ViewTools'
],function(
	Backbone,
	Marionette,

	template,
	tools
){

    return Backbone.Marionette.ItemView.extend( {
        template: template,
        tagName: "li"
    });

});