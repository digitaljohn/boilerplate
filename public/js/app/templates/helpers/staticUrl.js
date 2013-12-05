define(['App', 'handlebars'],function( App, Handlebars ){
	
	function staticUrl(url) {
		return App.settings.staticUrl+url+'?'+App.settings.urlArgs;
	}

	Handlebars.registerHelper( 'staticUrl', staticUrl );
	return staticUrl;

});
