define([
    'backbone',
    'marionette',
    'jquery',

    'hbs!templates/articleedit',
    'editor',
    'views/ViewTools'
],function(
    Backbone,
    Marionette,
    $,

    template,
    editor,
    tools
){

    return Backbone.Marionette.Layout.extend( {
        template: template,
        className: 'article',

        events: {
            "mousedown .editable" : "startEdit",
            "change .upload" : "onUploadChange",
            "click .cancel" : "exitEditMode",
            "click .save" : "onSave"
        },

        startEdit: editor.editableInit,

        initialize: function() {
            _.extend(editor.config.buttonClasses, {
                'default': [],
                'all': ['bold', 'italic', 'unordered-list', 'ordered-list', 'link', 'clear-formatting']
            });
        },

        onShow: function(){
            tools.setPageTitle( 'Editing: ' + this.model.get('title') );
        },

        onUploadChange: function(event){
            var file = event.currentTarget.files[0];

            this.model.readFile(file);
        },

        exitEditMode: function(){
            Backbone.history.navigate('/news', {trigger: true});
        },

        onSave: function(){
            this.storeEditable();

            var self = this;

            this.$(':input').attr('disabled', 'disabled');

            this.model.save({}, {
                success: function(model, response){
                    self.exitEditMode();
                },
                error: function(){
                    alert("Error Saving!");
                    self.$(':input').prop('disabled', false);
                }
            });
        },

        storeEditable: function(){
            var self = this;
            this.$('.editable').each(function(){
                var element = $(this);
                self.model.set(element.data('attribute'), element.html());
            });
        }

    });

    
});