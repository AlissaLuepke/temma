"use strict";

// Aufruf:
// getDatabase.fetchPosition();
// Distanz Berechnung

var getDatabase = (function () {

	function getPOIs() {
		db.POI.find().fetch(function(results) {

			pois = results;
			database= true;
			//displayPOIS();
			return pois;
			console.log(results)
		}, function(error) {
			database =false;
			console.log("ERROR")
			return undefined;
			
		})
		
    }

    // Public API
    return {

    	fetchPosition: function(){
			return getPOIs();
		}

    }

})();







