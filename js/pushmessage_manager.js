"use strict";
var pushmessageManager = (function () {
   
    function message(poi){
        console.log(poi);
    }
    
    // Public API
    return {
       message: message

       
    }
})();