"use strict";

// Aufruf:
// getPosition.location();
// Position des Nutzers

var getPosition = (function () {
	
	function getLocation(){
	
	var options = {
			enableHighAccuracy : true,
			maximumAge : 30000,
			timeout : 27000
		};

		function position_success(pos) {
			var crd = pos.coords;

			alert('Your current position is:');
			alert('Latitude : ' + crd.latitude);
			alert('Longitude: ' + crd.longitude);
			alert('More or less ' + crd.accuracy + ' meters.');

		};

		function position_error(err) {
			alert('ERROR(' + err.code + '): ' + err.message);
			// alert("Please turn your WIFI on");
		};
		navigator.geolocation.getCurrentPosition(position_success, position_error, options);
		//navigator.geolocation.watchPosition(position_success, position_error, options);
	
		
    }

    // Public API
    return {

    	location: function(){
			return getLocation();
		}

    }

})();







