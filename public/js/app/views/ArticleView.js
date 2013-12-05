define([
    'backbone',
    'marionette',

    'hbs!templates/article',
    'views/ViewTools'
],function(
    Backbone,
    Marionette,

    template,
    tools
){
    return Backbone.Marionette.Layout.extend( {
        template: template,
        className: 'article',

        events: {
            "click .edit" : "onEdit",
            "click .delete" : "onDelete"
        },

        onShow: function(){
            tools.setPageTitle( this.model.get('title') );
        },

        onEdit: function(){
            Backbone.history.navigate('/article/'+this.model.id+'/edit', {trigger: true});
        },

        onDelete: function(){
            if( confirm('Are you sure you wish to delete this article?') ){
                this.model.destroy({
                    success: function(){
                        Backbone.history.navigate('/news', {trigger: true});
                    },
                    error: function(){
                        console.log("Error deleting!");
                    }
                });
            }
        }
    });

});