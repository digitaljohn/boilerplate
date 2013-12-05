/*
   ____                    
  / __/__ _____  _____ ____
 _\ \/ -_) __/ |/ / -_) __/
/___/\__/_/  |___/\__/_/   
                           
*/

var settings = require('./settings');

var uploader = require("./uploader");
var db = require('./db');
var mail = require('./mail');
var httpserver = require("./httpserver");

// Start the core server

// Connect to the Dabase
uploader.init( settings.amazon, function(err, res){
    console.log("Amazon S3 Configured");

    // Configure the Amazon S3 Uploader
    db.init( settings.database, uploader, function(err, res){
        console.log("Database Connected");

        mail.init( settings.mail, function(err, res){
            console.log("Mail Configured");

            // Start the HTTP Server
            httpserver.init(settings.http, db, mail, function(err, res){
                console.log("--> Server up and running <--");
            });
        });
    });
});
