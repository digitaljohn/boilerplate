/*global Backbone: true, _:true */
(function() {
  /**
   * Backbone.routeNotFound
   *
   * Simple plugin that listens for false returns on Backbone.history.loadURL and fires an event
   * to let the application know that no routes matched.
   *
   * @author STRML
   */
  var oldLoadUrl = Backbone.History.prototype.loadUrl;

  _.extend(Backbone.History.prototype, {

    /**
     * Override loadUrl & watch return value. Trigger event if no route was matched.
     * @return {Boolean} True if a route was matched
     */
    loadUrl : function() {
      var matched = oldLoadUrl.apply(this, arguments);
      if(!matched){
        this.trigger('routeNotFound', arguments);
      }
      return matched;
    }
  });
}).call(this);