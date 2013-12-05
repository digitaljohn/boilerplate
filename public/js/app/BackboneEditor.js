define(["App", "jquery", "underscore", "backbone", "BaseObject"],
    function(App, $, _, Backbone, BaseObject) {


        var models = {},
            views = {},
            editor = {};

        editor.config = {
            // selector to specify editable elements   
            selector: '.editable',
                
            // Named sets of buttons to be specified on the editable element
            // in the markup as "data-button-class"   
            buttonClasses: {
                'default': ['save'],
                'all': ['bold', 'italic', 'underline', 'unordered-list', 'ordered-list', 'link', 'clear-formatting', 'save'],
                'title': ['bold', 'italic', 'underline', 'save']
            }
        };

        models.Editor = Backbone.Model;

        views.Editor = Backbone.View.extend({
            events: {
                'click .editor-bold': 'toggleBold',
                'click .editor-italic': 'toggleItalic',
                'click .editor-underline': 'toggleUnderline',
                'click .editor-heading': 'toggleHeading',
                'click .editor-unordered-list': 'toggleUnorderedList',
                'click .editor-justify-left': 'justifyLeft',
                'click .editor-justify-center': 'justifyCenter',
                'click .editor-justify-right': 'justifyRight',
                'click .editor-ordered-list': 'toggleOrderedList',
                'click .editor-link': 'toggleLink',
                'click .editor-image': 'getImage',
                'click .editor-save': 'save',
                'click .editor-clear-formatting': 'clearFormatting'
            },

            initialize: function() {
                this.$el = $(this.el);
                            
                // Model attribute event listeners:
                _.bindAll(this, 'changeButtons', 'changePosition', 'changeEditable', 'insertImage');
                this.model.bind('change:buttons', this.changeButtons);
                this.model.bind('change:position', this.changePosition);
                this.model.bind('change:editable', this.changeEditable);

                // Init Routines:
                this.changeEditable();
            },
                    
            changeEditable: function() {
                this.setButtonClass();
            },

            setButtonClass: function() {
                // check the button class of the element being edited and set the associated buttons on the model
                var editorModel = this.model;
                var buttonClass = editorModel.get('editable').attr('data-button-class') || 'default';
                editorModel.set({ buttons: editor.config.buttonClasses[buttonClass] });
            },

            changeButtons: function() {
                // render the buttons into the editor-panel
                this.$el.empty();
                var self = this;
                var buttons = this.model.get('buttons');
                            
                // hide editor panel if there are no buttons in it and exit early
                if(buttons.length){
                    _.each(this.model.get('buttons'), function(button){
                        var $buttonEl = $('<a href="#" class="editor-button editor-'+ button +'" title="'+ button.replace('-', ' ') +'"><span></span></a>');
                        self.$el.append($buttonEl);
                    });
                                
                    $(this.el).show();
                }else{
                    $(this.el).hide();
                }
            },

            changePosition: function() {
                // animate editor-panel to new position
                var pos = this.model.get('position');
                this.$el.css({'top': pos.y, 'left': pos.x});
            },
                    
            wrapSelection: function(selectionOrRange, elString, cb) {
                // wrap current selection with elString tag
                var range = selectionOrRange === Range ? selectionOrRange : selectionOrRange.getRangeAt(0);
                var el = document.createElement(elString);
                range.surroundContents(el);
            },
                    
            clearFormatting: function(e) {
                e.preventDefault();
                document.execCommand('removeFormat', false, null);
            },
                    
            toggleBold: function(e) {
                e.preventDefault();
                document.execCommand('bold', false, null);
            },

            toggleItalic: function(e) {
                e.preventDefault();
                document.execCommand('italic', false, null);
            },

            toggleUnderline: function(e) {
                e.preventDefault();
                document.execCommand('underline', false, null);
            },
                    
            toggleHeading: function(e) {
                e.preventDefault();
                var range = window.getSelection().getRangeAt(0);
                var wrapper = range.commonAncestorContainer.parentElement;
                if ($(wrapper).is('h3')) {
                    $(wrapper).replaceWith(wrapper.textContent);
                    return;
                }
                var h3 = document.createElement('h3');
                range.surroundContents(h3);
            },

            urlPrompt: function(callback) {
                // This uses the default browser UI prompt to get a url.
                // Override this function if you want to implement a custom UI.
                    
                var url = prompt('Enter a url', 'http://');
                    
                // Ensure a new link URL starts with http:// or https:// 
                // before it's added to the DOM.
                //
                // NOTE: This implementation will disallow relative URLs from being added
                // but will make it easier for users typing external URLs.
                if (/^((http|https)...)/.test(url)) {
                    callback(url);
                } else {
                    callback("http://" + url);
                }
            },
            
            toggleLink: function(e) {
                e.preventDefault();
                var range = window.getSelection().getRangeAt(0);

                // are we in an anchor element?
                if (range.startContainer.parentNode.tagName === 'A' || range.endContainer.parentNode.tagName === 'A') {
                    // unlink anchor
                    document.execCommand('unlink', false, null);
                } else {
                    // promt for url and create link
                    this.urlPrompt(function(url) {
                        document.execCommand('createLink', false, url);
                    });
                }
            },

            toggleUnorderedList: function(e) {
                e.preventDefault();
                document.execCommand('insertUnorderedList', false, null);
            },

            toggleOrderedList: function(e){
                e.preventDefault();
                document.execCommand('insertOrderedList', false, null);
            },
                    
            justifyLeft: function(e) {
                e.preventDefault();
                document.execCommand('justifyLeft', false, null);
            },

            justifyCenter: function(e) {
                e.preventDefault();
                document.execCommand('justifyCenter', false, null);
            },

            justifyRight: function(e) {
                e.preventDefault();
                document.execCommand('justifyRight', false, null);
            },

            getImage: function(e) {
                e.preventDefault();

                // call startUploader with callback to handle inserting it once it is uploded/cropped
                this.startUploader(this.insertImage);
            },
                    
            startUploader: function(cb) {
                // initialize Image Uploader
                var self = this;

                App.vent.trigger('modal:showUploader', function(image){
                    // view.startCropper(image, cb);
                    console.log("WOOP: ", image);

                    document.execCommand('insertImage', false, image);
                    // self.insertImage(image);
                });
                /*
                var model = new models.ImageUploader();
                var view = new views.ImageUploader({model: model});
                            
                // stash a reference to the callback to be called after image is uploaded
                model._imageCallback = function(image) {
                    view.startCropper(image, cb);
                };


                // stash reference to saved range for inserting the image once its 
                this._savedRange = window.getSelection().getRangeAt(0);

                // insert uploader html into DOM
                $('body').append(view.render().el);
                */
            },
                    
            // insertImage: function(image) {
            //     console.log("insertImage");
            //     // insert image - passed as a callback to startUploader
            //     var sel = window.getSelection();
            //     sel.removeAllRanges();
            //     sel.addRange(this._savedRange);
                            
            //     var attrs = {
            //         'editable': this.model.get('editable'),
            //         'editableModel': this.model.get('editableModel')
            //     };
                            
            //     _.extend(attrs, image);

            //     var model = new models.EditableImage(attrs);
            //     var view = new views.EditableImage({model: model});
            //     this._savedRange.insertNode($(view.render().el).addClass('editor-float-left')[0]);
            // },
                    
            save: function(e) {
                e.preventDefault();
                var editableModel = this.model.get('editableModel');
                editableModel.trigger('save');
            }
        });

        // tack on models, views, etc... as well as init function
        _.extend(editor, {
            models: models,
            views: views,

            // This function is to be used as callback to whatever event
            // you use to initialize editing 
            editableInit: function(e) {
                e.stopPropagation();

                var target = e.target || e.srcElement;
                var $editable = $(target).editorFindEditable();
                $editable.attr('contenteditable', true);

                // if the editor isn't already built, build it
                var $editor = $('.editor-panel');
                var editorModel = $editor.data('model');
                
                if (!$editor.size()) {
                    $editor = $('<div class="editor-panel">');
                    var editorAttrs = { editable: $editable, editableModel: this.model };
                    document.body.appendChild($editor[0]);
                    $editor.editorInstantiate({classType: 'Editor', attrs: editorAttrs});
                    editorModel = $editor.data('model');

                // check if we are on a new editable
                } else if ($editable[0] !== editorModel.get('editable')[0]) {
                    // set new editable
                    editorModel.set({
                        editable: $editable,
                        editableModel: this.model
                    });
                }
                
                // Firefox seems to be only browser that defaults to `StyleWithCSS == true`
                // so we turn it off here. Plus a try..catch to avoid an error being thrown in IE8.
                try {
                    document.execCommand('StyleWithCSS', false, false);
                }
                catch (err) {
                    // expecting to just eat IE8 error, but if different error, rethrow
                    if (err.message !== "Invalid argument.") {
                        throw err;
                    }
                }

                // if (models.EditableImage) {
                //     // instantiate any images that may be in the editable
                //     var $imgs = $editable.find('img');
                //     if ($imgs.size()) {
                //         var attrs = { editable: $editable, editableModel: this.model };
                //         $imgs.each(function() {
                //             var $this = $(this);
                //             if (!$this.data('editableImageModel')) {
                //                 var editableImageModel =  new models.EditableImage(attrs);
                //                 var editableImageView = new views.EditableImage({model: editableImageModel, el: this, tagName: this.tagName});
                //                 $this.data('editableImageModel', editableImageModel);
                //             }
                //         });
                //     }
                // }

                // listen for mousedowns that are not coming from the editor
                // and close the editor
                $('body').bind('mousedown.editor', function(e) {
                    // check to see if the click was in an editor tool
                    var target = e.target || e.srcElement;
                    if ($(target).not('.editor-panel, .editor-panel *, .editor-image-tools, .editor-image-tools *').size()) {
                        // remove editor
                        $editor.remove();
                                            
                                            
                        // if (models.EditableImage) {
                        //     // unblind the image-tools if the editor isn't active
                        //     $editable.find('img').unbind('mouseenter');

                        //     // remove any latent image tool model references
                        //     $(editor.config.selector+' img').data('editableImageModel', false);
                        // }
                                            
                        // once the editor is removed, remove the body binding for it
                        $(this).unbind('mousedown.editor');
                    }
                });

                editorModel.set({position: {x: e.pageX - 15, y: e.pageY - 80}});
            }
        });

        // jquery helper functions
        $.fn.editorInstantiate = function(options, cb) {
            return this.each(function() {
                var $el = $(this);
                options = options || (options = {});

                var settings = {
                    el: this,
                    attrs: {}
                };

                _.extend(settings, options);

                var model = new models[settings.classType](settings.attrs, settings);

                var view;

                // initialize a view is there is one
                if (_.isFunction(views[settings.classType])) {
                    view = new views[settings.classType]({model: model, el: this, tagName: this.tagName});
                }
                         
                // stash the model and view on the elements data object
                $el.data({model: model});
                $el.data({view: view});

                if (_.isFunction(cb)) {
                    cb({model: model, view: view});
                }
            });
        };

        $.fn.editorFindEditable = function() {
            // function that looks for the editable selector on itself or its parents
            // and returns that el when it is found
            var $el = $(this);
            return $el.is(editor.config.selector) ? $el : $el.closest(editor.config.selector);
        };
            
        return editor;

    }

);