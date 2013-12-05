define(['handlebars'], function(Handlebars){

	function url ( model ) {
		if(!model) return "";
		return "/"+model.type+"/"+model.id;
	}

	Handlebars.registerHelper( 'url', url );
	return url;

});
