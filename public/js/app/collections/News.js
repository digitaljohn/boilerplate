define([
	"App",
	"backbone",
	"models/Article"
],function(
	App,
	Backbone,
	Article
){

	return Backbone.Collection.extend({
		model: Article,
		url: App.settings.apiRoot+"/articles"
	});
	
});