define([],function(){

    return {
        apiRoot : window.config.apiUrl,
        staticUrl : window.config.staticUrl,
        urlArgs : window.config.urlArgs,

        isTouchDevice : ("ontouchstart" in document.documentElement),
        isRetina : window.devicePixelRatio > 1,

        // tracking : {
        //     account: 'UA-1234567-8'
        // },        

        supported : {
            browsers : {
                "Chrome" : 27,
                "Firefox" : 18,
                "Safari" : 5,
                "Mobile Safari" : 6,
                "Chrome Mobile iOS" : 30,
                "Chrome Mobile" : 18,
                "Android" : 4
            }
        }
    };

});