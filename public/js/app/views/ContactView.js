define([
    'backbone',
    'marionette',
    'jquery',

    'hbs!templates/contact',
    'views/ValidatableView',
    'views/ViewTools'
],function(
    Backbone,
    Marionette,
    $,

    template,
    ValidatableView,
    tools
){

    return ValidatableView.extend( {
        template: template,
        className: 'contact',

        onShow: function(){
            tools.setPageTitle('About');
        },

        serialize: function(){
            return {
                name: this.$('.name').val(),
                email: this.$('.email').val(),
                comments: this.$('.comments').val()
            };
        },

        onSubmitSuccess: function(){
            console.log("onSubmitSuccess");

            this.$('form').slideUp(200);

            this.$('p').slideUp(200, function(){
                $(this).html('Thanks! We will be in touch.').slideDown(400);
            });
        }
    });

});