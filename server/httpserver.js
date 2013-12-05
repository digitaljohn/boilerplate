/*
   __   __  __                                 
  / /  / /_/ /____    ___ ___ _____  _____ ____
 / _ \/ __/ __/ _ \  (_-</ -_) __/ |/ / -_) __/
/_//_/\__/\__/ .__/ /___/\__/_/  |___/\__/_/   
            /_/                                                                    
*/

var express = require("express");
var http = require("http");
var server = module.exports = express();

var db;
var mail;


var passThrough = function (req, res) {
    res.sendfile("index.html", {root:__dirname + "/../public/"});
}

var sendJSON = function(type, slug, res){
    res.end(
        JSON.stringify(
            require('./json/'+type+'/'+slug+'.json')
        )
    );
}


module.exports.init = function(settings, d, m, callback){
    db = d;
    mail = m;
    
    this.setupServer( settings, callback );
}

module.exports.setupServer = function( settings, callback ){
    server.configure(function () {
        server.use(express["static"](__dirname + "/../public"));

        server.use(express.errorHandler({
            dumpExceptions:true,
            showStack:true
        }));

        server.use(express.bodyParser({limit: '50mb'}));
        server.use(server.router);
    });

    // REST - Contact form mailer
    server.post('/api/contact', function (req, res) {
        mail.contactRequest(req.body, function(err, errors){
            if(err){
                res.status(400);
                res.end( JSON.stringify(errors) );
            }else{
                res.end( JSON.stringify({}) );
            }
        });
    });

    // REST - Create New
    server.post('/api/articles', function (req, res) {
        db.articles.create(req.body, function(err, data){
            if(err){
                res.status(400);
                res.end( JSON.stringify({errors:data}) );
            }else{
                res.end( JSON.stringify({}) );
            }
        });
    });

    // REST - GET
    server.get('/api/articles/:slug', function (req, res) {
        db.articles.get(req.params.slug, function(err, item){
            if(item){
                res.end( JSON.stringify(item) );
            }else{
                res.status(404);
                res.end( JSON.stringify({}) );
            }
        });
    });

    // REST - DELETE
    server.del('/api/articles/:slug', function (req, res) {
        db.articles.delete(req.params.slug, function(err, data){
            res.end();
        });
    });

    // REST - UPDATE
    server.put('/api/articles/:slug', function (req, res) {
        db.articles.update(req.params.slug, req.body, function(err, data){
            if(err){
                res.status(400);
                res.end( JSON.stringify({errors:data}) );
            }else{
                res.end( JSON.stringify({}) );
            }
        });
    });

    // REST - LIST
    server.get('/api/articles', function (req, res) {
        db.articles.list(function(err, items){
            res.end(  JSON.stringify(items) );
        });
    });

    // Catch rest!
    server.get('*', passThrough);


    http.createServer(server).listen(settings.port);

    if(callback) callback(null);
}