define([
	'backbone',
	'marionette',

	'hbs!templates/home',
	'views/ViewTools'
],function(
	Backbone,
	Marionette,

	template,
	tools
){
    
    return Backbone.Marionette.ItemView.extend( {
        template: template,
        className: 'home',

        onShow: function(){
            tools.setPageTitle('Home');
        }
    });

});