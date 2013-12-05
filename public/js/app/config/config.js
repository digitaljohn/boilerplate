require.config({
    baseUrl: "/js/app",
    // urlArgs: "ver=0.5", // Cache Busting
    
    // 3rd party script alias names (Easier to type "jquery" than "libs/jquery, etc")
    paths: {
        // Core Libraries
        "jquery": "../libs/jquery",
        "underscore": "../libs/lodash",
        "backbone": "../libs/backbone",
        "marionette": "../libs/backbone.marionette",
        "handlebars": "../libs/handlebars",
        "hbs": "../libs/hbs",
        "i18nprecompile": "../libs/i18nprecompile",
        "json2": "../libs/json2",
        "detect": "../libs/detect",

        // Plugins
        "backbone-routenotfound": "../libs/plugins/backbone.routeNotFound",
        "editor": "BackboneEditor",
        "text": "../libs/plugins/text"
    },

    // Sets the configuration for your third party scripts that are not AMD compatible
    shim: {
        "backbone": {
            "deps": ["underscore", "jquery"],
            "exports": "Backbone"
        },
        "marionette": {
            "deps": ["underscore", "backbone", "jquery"],
            "exports": "Marionette"
        },
        "handlebars": {
            "exports": "Handlebars",
            init: function(){
                this.Handlebars = Handlebars;
                return this.Handlebars;
            }
        },
        "backbone-routenotfound": {
            "deps": ["underscore", "backbone"]
        }
    },
    
    // hbs config - must duplicate in Gruntfile.js Require build
    hbs: {
        templateExtension: "html",
        helperDirectory: "templates/helpers/",
        i18nDirectory: "templates/i18n/",

        // options object which is passed to Handlebars compiler
        compileOptions: {}
    }
});