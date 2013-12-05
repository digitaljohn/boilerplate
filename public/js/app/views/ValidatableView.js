define([
    'backbone',
    'marionette',
    'underscore',
    'jquery'
],function(
    Backbone,
    Marionette,
    _,
    $
){

    return Backbone.Marionette.Layout.extend( {

        modelAction: "save",

        initialize: function(){
            if(!this.events) this.events = {};
            this.events["change input, select, textarea"] = "onFormItemChange";
            this.events["submit form"] = "submitForm";

            this.delegateEvents();
        },

        submit: function(){
            var attrs = this.serialize();

            var self = this;

            self.onFormSubmit();

            this.$('form :input').attr('disabled', 'disabled');

            var modelActionFunction = this.model[this.modelAction];

            modelActionFunction.call(this.model, attrs, {
                success: function(){
                    self.$('form :input').prop('disabled', false);
                    self.onSubmitSuccess();
                },
                error: function(model, response){
                    var errors = $.parseJSON(response.responseText).errors;
                    
                    self.showErrors(errors);
                    self.$('form :input').prop('disabled', false);
                    self.onSubmitError(errors);
                }
            });
        },

        submitForm: function(event){
            event.preventDefault();
            event.stopPropagation();

            this.submit();

            return false;
        },

        serialize: function(){
            return {};
        },

        onFormSubmit: function(){

        },

        onSubmitError: function(errors){

        },

        onSubmitSuccess: function(){

        },

        showErrors: function(errors){
            this.clearErrors();

            var self = this;

            _.forEach(errors, function(value, key){
                self.$('.'+key).addClass('error').after('<p class="error-message">'+value+'</p>');
            });
        },

        clearErrors: function(errors){
            if(this.model) this.model.unset('errors');

            this.$('.error-message').remove();
            this.$('.error').removeClass('error');
        },

        onFormItemChange: function(event){
            var item = $(event.currentTarget);

            if(item.hasClass('error'))
            {
                item.removeClass('error').nextAll('p.error-message').remove();
            }
        }
    });

});