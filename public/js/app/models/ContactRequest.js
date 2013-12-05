define([
    "App",
    "backbone"
],function(
    App,
    Backbone
){
        
    return Backbone.Model.extend({
        urlRoot: App.settings.apiRoot+"/contact"
    });

});