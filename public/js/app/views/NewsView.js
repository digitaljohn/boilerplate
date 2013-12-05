define([
    'backbone',
    'marionette',

    'hbs!templates/news',
    'views/NewsItemView',
    'views/ViewTools'
],function(
    Backbone,
    Marionette,

    template,
    NewsItemView,
    tools
){

    return Backbone.Marionette.CompositeView.extend( {
        template: template,
        className: 'news',

        itemView: NewsItemView,
        itemViewContainer: "ul.news-list",

        onShow: function(){
            tools.setPageTitle( 'Latest News' );
        }
    });
    
});