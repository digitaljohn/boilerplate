/*
            __             __       
 __ _____  / /__  ___ ____/ /__ ____
/ // / _ \/ / _ \/ _ `/ _  / -_) __/
\_,_/ .__/_/\___/\_,_/\_,_/\__/_/   
   /_/                                                                   
*/

var crypto = require('crypto');
var AWS = require('aws-sdk');

var settings;


exports.init = function(s, callback){
	settings = s;
	AWS.config.update( settings.credentials );

	if(callback) callback(null);
}

exports.uploadData = function(data, destination, bucket, callback){
	var buf = new Buffer(data, 'base64');

	var s3 = new AWS.S3();

	s3.client.putObject({
		Bucket: bucket,
		Key: destination,
		Body: buf,
		ContentType: 'image/jpeg',
		ACL:'public-read'
	}, function(err, res){
		if(err){
			callback(err, res);
		}else{
			callback(null, "http://s3.amazonaws.com/"+bucket+"/"+destination);
		}
	});
}

exports.imageUploadWithRandomHash = function(data, callback){
    var imageData = data.replace(/^data:image\/\w+;base64,/, "");
    var current_date = (new Date()).valueOf().toString();
    var random = Math.random().toString();
    var hash = crypto.createHash('sha1').update(current_date + random).digest('hex');

    this.uploadData(imageData, 'articles/'+hash+'.jpg', settings.bucket, callback);
}