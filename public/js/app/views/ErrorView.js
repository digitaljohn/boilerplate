define([
    'backbone',
    'marionette',

    'hbs!templates/error',
    'views/ViewTools'
],function(
    Backbone,
    Marionette,

    template,
    tools
){

    return Backbone.Marionette.ItemView.extend( {
        template: template,
        className: 'page-error-message',

        onShow: function(){
            tools.setPageTitle( this.options.title );
        },

        serializeData: function(){
            return {
                title: this.options.title,
                description: this.options.description,
                icon: this.options.icon,
                showPromo: this.options.showPromo
            };
        }
    });

});