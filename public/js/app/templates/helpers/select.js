define(['handlebars'],function(Handlebars){
	
	function select(value, options){
		var $el = $('<select />').html( options.fn(this) );
		$el.find('[value=' + value + ']').attr({'selected':'selected'});
		return $el.html();
	}

	Handlebars.registerHelper( 'select', select );
	return select;

});
