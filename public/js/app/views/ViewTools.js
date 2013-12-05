define(['BaseObject'],function(BaseObject){

    var ViewTools =  BaseObject.extend( {
        setPageTitle: function(title){
            document.title = title + " | Bootstrap";
        }
    });

    return new ViewTools(); 

});