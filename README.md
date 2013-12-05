# DigitalJohn Boilerplate

# Getting Started

1. Download and install [Node.js](http://nodejs.org/#download)
2. Clone this repository
3. On the command line, type `npm install nodemon -g` to install the [nodemon](https://github.com/remy/nodemon) library globally.  If it complains about user permissions type `sudo npm install nodemon -g`.
4.  If you have installed [Grunt](http://gruntjs.com/) globally in the past, you will need to remove it first by typing `npm uninstall -g grunt`.  If it complains about user permissions, type `sudo npm uninstall -g grunt`.
5.  Next, install the latest version of [Grunt](http://gruntjs.com/) by typing `npm install -g grunt-cli`.  If it complains about user permissions, type `sudo npm install -g grunt-cli`. 
6. Navigate to inside of the **boilerplate** folder and type `npm install`
7. Next, type `nodemon` (this will start your Node.js web server and restart the server any time you make a change to a file)
8. To view the site, go to `http://localhost:8001`
9. Type `grunt` to run your grunt build and create minified .js and .css files

# Tour of the Boilerplate Files

## index.html

### Configuration

As you continue down the page to the core `<script>` tag, you will notice there is an object that is placed in the root window object, called `config`, This has various settings that control the launch of the Boilerplate.

- `production` Used to communicate to your application whether you would like to load production or development CSS and JavaScript files.
- `staticUrl` This is the path to the static assets. Generally just `/`.
- `apiUrl` The path to the API endpoint.
- `urlArgs` This can be used for cache busting. If you need your files to be reloaded, change this variable.
- `files` An object describing the files that need to be be loaded for both `development` and `production` modes.


### Boilerplate Loader Methods

To load our production/development CSS and JavaScript files, you can use the Bootstrap loader methods included directly in our HTML page.  Below are the available helper methods:

- `init()` Configures the loader, decides what to load.
- `loadNext()` Loads the next file. Files are loaded in the following order.
	1. CSS Files
	2. JavaScript Files
	3. Then the core Init function is executed using require.
- `loadCSS(url, callback)` - Asynchronously includes a CSS file to a page.
- `loadJS(file, callback)` - Asynchronously includes a JavaScript file to a page.

**Note:** Require.js does not officially support [loading CSS files](http://requirejs.org/docs/faq-advanced.html#css), which is why we included the `loadCSS()` method to asynchronously include our CSS files.

Loading files asynchronously prevents our application files from blocking the loading of the UI.


### Production Mode

In production mode, your app's single minified and concatenated JavaScript file is loaded using Almond.js instead of Require.js.  Your application's minfied common CSS file is also included.


### Development Mode

In development mode, your app's non-minified JavaScript files are loaded using Require.js instead of Almond.js.  Your application's non-minified common CSS file is also included.


## Config.js

This file includes your Require.js configurations.

If we look at our App's Require.js configurations, we will see the first thing being configured are the module paths.  Setting paths allow you to define an alias name and file path for any module that you like.

Typically, you want to set a path for any module that will be listed as a dependency in more than one other module (eq. jQuery, Backbone).  This saves you some typing, since you just have to list the alias name, and not the entire file path, when listing dependencies.  After all of the file paths are set, you will find the Shim configuration (Added in Require.js 2.0).
   
The Shim configuration allows you to easily include non-AMD compatible JavaScript files with Require.js (a separate library such as [Use.js](https://github.com/tbranyen/use.js/) was previously needed for this). This is very important, because Backbone versions > 0.5.3 no longer support AMD (meaning you will get an error if you try to use both Require.js and the latest version of Backbone).  This configuration is a much better solution than manually editing non-AMD compatible JavaScript files to make sure the code is wrapped in a `define` method.  Require.js creator [James Burke](http://tagneto.blogspot.com/) previously maintained AMD compatible forks of both Backbone.js and Underscore.js because of this exact reason.

```js
   shim: {

      // Backbone
      "backbone": {

         // Depends on underscore/lodash and jQuery
         "deps": ["underscore", "jquery"],

         // Exports the global window.Backbone object
         "exports": "Backbone"

      },

   }
```

The Shim configuration also takes the place for the old Require.js `order` plugin.  Within the Shim configuration, you can list files and their dependency tree.  An example is jPlayer being dependent on jQuery:

```js
   shim: {

      // jPlayer depends on jQuery
      "jplayer": ["jquery"]

   }
```

> You do not need a shim configuration for [jQuery](http://www.jquery.com) or [lodash](https://github.com/bestiejs/lodash) because they do not have any dependencies.


## Init.js

The `require` method is used to asynchronously include all of the files/dependencies passed into the first parameter (jQuery, Backbone, Lodash, Router, etc) into the page.

Finally, a new [Marionette.Application](https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.application.md) instance is instantiated to get your Marionette app up and running.

> You don't need to instantiate a new router instance if you aren't using a Backbone Router class.


## App.js

App.js is where we instantiate our globally accessible `Marionette.Application` object.  This file starts with a define method that lists Backbone and Marionette as dependencies. Keep in mind that Backbone and Marionette had already been previously loaded in MobileInit.js/DesktopInit.js, but Require.js is smart enough not to load dependencies more than once.

It is best practice to list out all of your dependencies for every file, regardless of whether or not they expose global objects and are already included in the page.  This is also especially important for the Require.js optimizer (which needs to determine which files depend on which other files).  

> If your dependencies do not expose global objects, then it is absolutely mandatory to list it as a dependency, since Require.js does not allow global variables (meaning your modules are private and cannot be accessed by other modules or code without explicitly listing them as dependencies).

[Marionette.Application](https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.application.md) is the heart of the Marionette framework.  The [Regions](https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.region.md), [Layouts](https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.layout.md) and [AppRouters](https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.approuter.md) you create are typically hung off of a global instance of `Marionette.Application`.  

One of Marionette's strengths is that it introduces a Composite architecture, which lets you organize your application into separate regions or areas, with their own self-contained logic and structure.  One of the main ways this can be done is with [Regions](https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.region.md).  In App.js, we divide our application into multiple regions like so:

        App.addRegions({
            headerRegion:"header",
            mainRegion:"#main"
        });

This searches the DOM for a `<header>` element, an element with an `id` of `main` and creates a new `Marionette.Region` for each.  Regions have a `show` method which can be passed a `View`.  When a view is passed to a `Region.show`, the view is appended to the Regions associated DOM element and its `render` method is triggered.  An associated `close` method is also available, which contains some basic logic for tearing down the Region's view.  We will see how `show` is used later in MobileController.js.

App.js also has an initializer that performs some basic initial tasks, including some quirks fixes, Ajax Authentication Error Routing, jRespond breakpoints setup and starting the Backbone History.


## AppRouter.js

AppRouter.js is where you can configure application-level routing paths.  It is a Marionette.js AppRouter class, which is a variation of a Backbone.Router.  AppRouter's allow you to configure routes in an `appRoutes` map.  When a route in `appRoutes` is fired from a hash change event, it gets handled in the AppRouter's associated `controller` attribute object.  `AppRouter.controller` can actually be any object with method names that match the values in `appRoutes`, but Marionette provides a simple `Marionette.Controller` object which can be used for this purpose, and which provides Marionette event-handling and an `initialize` method.  

Here is a simple example of how a Marionette.Controller and Marionette.AppRouter interact:
        
        var AppRouter = new Backbone.Marionette.AppRouter({
           //"home" must be a method in AppRouter's controller
           appRoutes: {
               "home": "home"
           }, 
           controller: new Backbone.Marionette.Controller({
                home: function() {
                    //do something
                }
            })
        });

Here we see that when a URL change event occurs and the URL hash matches `#home`, the `home` method in `AppRouter.controller` will be fired.


## Controller.js

Controller.js the main hub of the application. It primarily includes the functions that are called by the AppRouter.


## ItemViews

ItemViews are a derivative of Backbone.View. The [require-handlebars-plugin](https://github.com/SlexAxton/require-handlebars-plugin) (`hbs` for short) is used to load pre-compiled Handlebars views from the templates specified.  This is different than the more common strategy of using the RequireJS `text` plugin to load strings from template files, then compiling them with Handlebars or Underscore. For example, in the case of `AlbumView`, we load the template function for our template `album.html`, and set it as the `template` attribute on our `AlbumView` class.  

Backbone.js Views have a one-to-one relationship with DOM elements, and a View's DOM element is listed in the `el` property, or is created as a simple `div` if none is specified.  The jQuery-wrapped DOM element is then available as `$el`.  The View's `model` is set to a new instance of Model.js, listed above as a dependency.  

Marionette.ItemView is an extension of the base Backbone.View, but contains some basic logic for rendering and tearing down the view.  If a View's `template` attribute is set to a template function created by an engine like Handlebars or Underscore, ItemView's `render` method will automatically render the View's `$el` for you.  Of course you are also free to write your own simple `render` method.  Our `SuccessView` is a good example of the simplest of possible views:

	define( ['App', 'backbone', 'marionette', 'underscore', 'jquery', 'hbs!templates/modals/success'],
	    function(App, Backbone, Marionette, _, $, template) {
	        return Backbone.Marionette.ItemView.extend( {
	            template: template
	        });
	    })

Here we use the `hbs` plugin to load success.html in as a pre-compiled Handlebars template function. Pre-compiled templates are a big performance boost in production-built applications.

Next you will find an `events` object.  This is where all of your View DOM event handlers associated with the HTML element referenced by your View's `el` property should be stored.  Keep in mind that Backbone is using the jQuery `delegate` method, so it expects a selector that is within your View's `el` property.  I did not include any events by default, so you will have to fill those in yourself.  Below is an example of having an events object with one event handler that calls a View's `someMethod()` method when an element with a class name of _someElement_ is clicked.

	// View Event Handlers
	events: {
	   "click .someElement": "someMethod"
	}


Finally, we return the View class.

**Note**: If you have read all of the documentation up until this point, you will most likely have already noticed that [lodash](https://github.com/bestiejs/lodash) is being used instead of Underscore.js.  Apart from having a bit better cross-browser performance and stability than Underscore.js, lodash also provides a custom build process.  Although I have provided a version of lodash that has all of the Underscore.js methods you would expect, you can download a custom build and swap that in.  Also, it doesn't hurt that Lodash creator, [John-David Dalton](https://twitter.com/jdalton), is an absolute performance and API consistency maniac =)


## Templates

Templates are a useful way for you to update your View (the DOM) if a Model attribute changes.  They are also useful when you have a lot of HTML and JavaScript that you need to fit together, and instead of concatenating HTML strings inside of your JavaScript, templates provide a cleaner solution.  Look at Handlebars' and Underscore's documentation to read more about the respective syntaxes of these handy templating solutions.


### Handlebars helpers with require-handlebars-plug (hbs)

In addition to loading pre-compiled template functions, `hbs` also does a couple more interesting things for us.  

First, any Handlebars helper methods you define in the `template\helpers` folder will automatically get loaded and will be available in your templates.  For instance:

#### dateFormat.js

This useful Handlebars template method to convert UNIX timestamps into a more friendly format.  It takes a string as input, and appends a bunch of bangs.  

In our `article.html`, we see its usage:

	<p class="published">{{dateFormat metadata.published}}</p>


#### i18n

By defining a JSON mapping file in `en_us.json` (for example), we can define a set of labels and messages which can later be translated into other languages.  

##### en_us.json

```js
{
  "desktop" : "Desktop Computer",
  "mobile" : "Mobile Device"
}
```

We can then reference these English phrases in our templates like this example from `welcome.html`: 

```html
   You are viewing this application on
        {{#if mobile}}
                <strong>{{$ mobile}}</strong>
        {{else}}
                <strong>{{$ desktop}}</strong>
        {{/if}}.
```


## SASS

TBW


## Gruntfile.js

This file is ready made for you to have your entire project optimized using Grunt.js, the [Require.js Optimizer](https://github.com/jrburke/r.js/) and [almond.js](https://github.com/jrburke/almond).

Grunt.js is a JavaScript command line task runner that allows you to easily automate common development tasks such as code linting, minification.

Almond.js a lightweight AMD shim library created by [James Burke](https://github.com/jrburke), the creator of Require.js.  Almond is meant for small to medium sized projects that use one concatenated/minified JavaScript file.  If you don't need some of the advanced features that Require.js provides (lazy loading, etc) then Almond.js is great for performance.

Boilerplate is setup to use Require.js in development and Almond.js in production.  By default, Boilerplate is in _development_ mode, so if you want to try out the production build, read the production instructions below.

### Production Build Instructions

Navigate to the root directory of the Boilerplate folder and type **grunt** and wait a few seconds for the build to complete.

> If you are on a Windows machine, you will have to type `grunt.cmd`

Once the script has finished, you will see that both _Init.min.js_ and the _main.min.css_ files will be created/updated.

Next, update the `production` local variable inside of **index.html** to be **true**.

> Note that when running optimized builds, you must define a separate build process for each i18n language supported.  



# FAQ

## What libraries have you included?

Marionette, Backbone, Require, Lodash, Almond, jQuery, Handlebars

## What Require.js plugins are you using?

The require-handlebars-plugin `hbs` plugin.  As described above, it provides an easy way to load pre-compiled templates as AMD modules from static html template files.  I was previously using the RequireJS text plugin to load template strings in to each View and compiling them there, but hbs allows me to load these templates pre-compiled, simplifying my code and improving performance.  It also brings support for Handlebars helper methods as well as i18n internationalization, as described before.


## Why are you using Grunt for the build?

Grunt comes jam packed with features and plugins to help improve project automation tasks.  Although the main job of Grunt is to run the Require.js optimizer, it is also for other tasks such as JSHinting your code.

## What Grunt plugins are you using?

Boilerplate uses the **grunt-contrib-requirejs** plugin to run the Require.js optimizer and the **grunt-contrib-jshint** plugin to automate JSHint code quality checking.  Both plugins are maintained by the core Grunt team.

## What Grunt tasks can I use?

Boilerplate provides `test`, `build`, and `default` tasks.

   - The `test` task will only JSHint your code for quality.  You can run the `test` task by typing `grunt test`.

   - The `build` task will concatenate and minify your Desktop/Mobile JavaScript and CSS files using the Require.js optimizer.  You can run the `build` task by typing `grunt build`.

   - The `default` task will run both the `test` and `build` tasks.  You can run the `default` task by typing `grunt`.

## Do I need a web server to test the Boilerplate?

   - Yep, because the Require.js text plugin dynamically pulls in template files via ajax (which is not allowed with the `File://` local extension.  Luckily for you I have provided an easy to use Node.js web server for convenience.


## Contributors
[John Richard Chipps-Harding](http://www.digitaljohn.co.uk)

