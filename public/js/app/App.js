define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'handlebars',

    'config/Settings',
    'detect',
    'views/ErrorView'
],function(
    $,
    _,
    Backbone,
    Marionette,
    Handlebars,

    settings,
    detect,
    ErrorView
){

    // Create the Application
    var App = new Backbone.Marionette.Application();

    // Store the settings object in App
    App.settings = settings;

    // Regions
    App.addRegions({
        headerRegion:"header",
        footerRegion:"footer",
        mainRegion:"#main",
        modalRegion:"#modal"
    });

    App.addInitializer(function () {

        // Detect Browser
        var ua = detect.parse(navigator.userAgent);
        var version = settings.supported.browsers[ua.browser.family];
        var supported = false;

        if(version){
            if(ua.browser.major >= version){
                supported = true;
            }
        }

        // DOES NOT WORK ON FIREFOX / ANDROID
        if(ua.browser.family == "Firefox" && ua.os.family == "Android") supported = false;

        if(!supported){
            var desc = "Boilerplate is designed for modern web browsers.<br />We may add support for other browsers in the future.</p>";
            desc += "<p>If you want to use Boilerplate, you'll need to upgrade to:</p>";

            var browsers = [];

            _.each(settings.supported.browsers, function(version, browser){
                browsers.push('<strong>'+browser+'</strong> '+version);
            });

            desc += "<p>"+browsers.join('<br />')+"</p>";

            App.mainRegion.show(new ErrorView({
                title: "Your Browser is Unsupported",
                description: desc,
                icon: 'computer-settings'
            }));

            $('header ul').hide();

            return;
        }

        // Start this Backbone History
        Backbone.history.start({pushState: true});
    });

    return App;
    
});