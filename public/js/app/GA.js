define(['App'],function(App){
        
    var exports = {
        initialize: function() {
            var _gaq = window._gaq = _gaq || [];

            var ga = document.createElement('script');
            var s = document.getElementsByTagName('script')[0];

            _gaq.push(['_setAccount', App.settings.tracking.account]);
            _gaq.push(['_trackPageview']);
            
            ga.type = 'text/javascript';
            ga.async = true;
            ga.src = ('https:' == document.location.protocol ?
                'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';

            s.parentNode.insertBefore(ga, s);
        },

        trackevent: function(e) {
            window._gaq.push(e);
        }
    };

    return exports;

});