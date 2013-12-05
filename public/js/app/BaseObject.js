define(['backbone'], function (Backbone) {

    // Taken from here: https://github.com/jashkenas/backbone/issues/2601

    var BaseObject = function(options) {
        this.initialize.apply(this, arguments);
    };
    
    _.extend(BaseObject.prototype, Backbone.Events, {
        initialize: function(options) {}
    });

    // The self-propagating extend function that Backbone classes use.
    BaseObject.extend = Backbone.Model.extend;

    return BaseObject;

});