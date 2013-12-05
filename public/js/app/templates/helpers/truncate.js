define(['handlebars'], function(Handlebars){

	function truncate ( len, options ) {
		var string = options.fn(this);
		if (string.length > len)
			return string.substring(0,len-3)+'...';
		else
			return string;
	}

	Handlebars.registerHelper( 'truncate', truncate );
	return truncate;
	
});