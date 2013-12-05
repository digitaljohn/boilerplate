/*
     __     __       __               
 ___/ /__ _/ /____ _/ /  ___ ____ ___ 
/ _  / _ `/ __/ _ `/ _ \/ _ `(_-</ -_)
\_,_/\_,_/\__/\_,_/_.__/\_,_/___/\__/ 
                                      
*/

var mongodb = require('mongodb');

var articlesCollection;

var uploader;

var tidyArticle = function(article, callback){
    delete article._id;
    article.published = Math.round(new Date().getTime() / 1000);

    // Generate Slug
    article.id = article.title.toLowerCase().replace(/[^\w ]+/g,' ').replace(/ +/g,'-');

    // Check for Upload
    if(article.upload){
        uploader.imageUploadWithRandomHash(article.upload.data, function(err, url){
            delete article.upload;

            article.media = { image:url };

            callback(null, article);
        });
    }else{
        callback(null, article);
    }
}

exports.init = function(settings, u, callback){
    uploader = u;

    var MongoClient = mongodb.MongoClient;

    MongoClient.connect(settings.credentials.server, function(err, db) {
        if(err) { return console.dir(err); }

        articlesCollection = db.collection('articles');

        if(callback) callback(null);

    });
}

exports.articles = {
    
    list: function(callback){
        articlesCollection.find({},{id:1,type:1, title:1, summary:1}).toArray(function(err, items) {
            callback(null, items);
        });
    },

    get: function(slug, callback){
        articlesCollection.findOne({id:slug}, function(err, item) {
            callback(null, item);
        });
    },

    delete: function(slug, callback){
        articlesCollection.remove({id:slug}, function(err, result) {
            callback(null);
        });
    },

    create: function(data, callback){
        tidyArticle(data, function(err, article){
            articlesCollection.insert(article, function(err, result) {
                if(err){
                    if(err.code == '11000'){
                        callback(true, "Article with same name not allowed.");
                    }else{
                        callback(true, "Unknown error.");
                    }
                }else{
                    callback(null);
                }
            });
        });
    },

    update: function(slug, data, callback){
        tidyArticle(data, function(err, article){
            articlesCollection.update({id:slug}, article, function(err, result) {
                if(err){
                    if(err.code == '11001'){
                        callback(true, "Article with same name not allowed.");
                    }else{
                        callback(true, "Unknown error.");
                    }
                }else{
                    callback(null);
                }
            });
        });
    }

};

