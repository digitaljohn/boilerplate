define(['handlebars'],function(Handlebars){

    function dateFormat ( context ) {

        var months = [
            'January',
            'Fubruary',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];

        var date = new Date(context * 1000);

        var datePadded = date.getDate();
        if(datePadded < 10) datePadded = '0'+datePadded;

        return months[date.getMonth()]+" "+datePadded+" "+date.getFullYear();
    }

    Handlebars.registerHelper( 'dateFormat', dateFormat );
    return dateFormat;
    
});
