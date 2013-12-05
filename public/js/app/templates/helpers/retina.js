define(['App', 'handlebars'], function ( App, Handlebars ){

	function retina ( media ) {
		if(!media) return "";

		var isRetina = window.devicePixelRatio > 1;

		return ((!isRetina && media.small)? media.small : media.image)+'?'+App.settings.urlArgs;
	}

	Handlebars.registerHelper( 'retina', retina );
	return retina;
	
});