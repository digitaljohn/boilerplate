/*
   ____                    
  / __/__ _____  _____ ____
 _\ \/ -_) __/ |/ / -_) __/
/___/\__/_/  |___/\__/_/   
                           
*/

var async = require('async');

var settings = require('./settings');
var uploader = require("./uploader");
var db = require('./db');
var mail = require('./mail');
var httpserver = require("./httpserver");

// Start the core server
async.series([
    function(callback){
        console.log('Init Uploader');
        uploader.init( settings.amazon, callback);
    },
    function(callback){
        console.log('Init Database');
        db.init( settings.database, uploader, callback);
    },
    function(callback){
        console.log('Init Mail');
        mail.init( settings.mail, callback);
    },
    function(callback){
        console.log('Init HTTP Server');
        httpserver.init(settings.http, db, mail, callback);
    }
],
function(err, results){
    if(err){
        console.log('error starting server!');
    }else{
        console.log('server started!');
    }
});

