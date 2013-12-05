/*
              _ __
  __ _  ___ _(_) /
 /  ' \/ _ `/ / / 
/_/_/_/\_,_/_/_/  
                                                      
*/

var nodemailer = require("nodemailer");

var settings;

var smtpTransport;


var validateEmail = function(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 


module.exports.init = function(s, callback){
    settings = s;

    smtpTransport = nodemailer.createTransport(settings.type, settings.credentials);

    if(callback) callback();
}

module.exports.contactRequest = function(body, callback){
    var error = false;
    var errors = {};

    if( !body.name ){
        error = true;
        errors.name = 'You must provide your name';
    }

    if( !body.comments ){
        error = true;
        errors.comments = 'Please ask us something';
    }

    if( !body.email ){
        error = true;
        errors.email = 'You must provide your email';
    }else if( !validateEmail(body.email) ){
        error = true;
        errors.email = 'You must provide a valid email';
    }

    if(error){
        callback(true, {errors:errors});
    }else{
        var mailOptions = {
            from: settings.from,
            to: settings.to,
            subject: "Contact Request",
            text: body.name+"("+body.email+") said this:\n"+body.comments
        }

        // send mail with defined transport object
        smtpTransport.sendMail(mailOptions, function(error, response){
            if(error){
                errors.email = 'There was a problem emailing...';
                callback(true, {errors:errors});
            }else{
                callback(null);
            }

            // if you don't want to use this transport object anymore, uncomment following line
            //smtpTransport.close(); // shut down the connection pool, no more messages
        });
    }
}