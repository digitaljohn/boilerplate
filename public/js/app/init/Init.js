require([
	"App",
	"routers/AppRouter",
	"controllers/Controller",
	"marionette"
],function(
	App,
	AppRouter,
	AppController
){
	
    App.appRouter = new AppRouter({
        controller: new AppController()
    });
    App.start();

});