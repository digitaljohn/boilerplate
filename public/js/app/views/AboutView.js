define([
	'backbone',
	'marionette',
	'hbs!templates/about',
	'views/ViewTools'
],function(
	Backbone,
	Marionette,
	template,
	tools
){
        
    return Backbone.Marionette.ItemView.extend( {
        template: template,
        className: 'about',

        onShow: function(){
            tools.setPageTitle('About');
        }
    });

});