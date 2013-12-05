define([
    "App",
    "backbone"
],function(
    App,
    Backbone
){
        
    return Backbone.Model.extend({
        urlRoot: App.settings.apiRoot+"/articles",

        defaults: {
            type: "article",
            title: "Article title here.",
            summary: "Short article summary. Should not contain any HTML.",
            description: "<p>Main article body, enjoy...</p>"
        },

        readFile: function(file){

            if(file){
                var self = this;

                var reader = new FileReader();
                reader.onloadend = function(){
                    console.log(file.name);
                    var ext = file.name.split('.').pop().toLowerCase();
                    console.log("ext", ext);

                    if(ext == "jpg" || ext == "jpeg"){
                        self.set('upload', {
                            filename: file.name,
                            data: reader.result,
                            type: 'jpg'
                        });
                    }else{
                        self.unset('upload');
                    }
                };

                reader.readAsDataURL(file);

            }else{
                this.unset('upload');
            }

        }
    });

});