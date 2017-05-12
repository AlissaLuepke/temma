"use strict";

// Aufruf:
// getDistance.calculate();
// Distanz Berechnung

var getPosition = (function () {
	
	function getLocation(){
	
	var options = {
			enableHighAccuracy : true,
			maximumAge : 30000,
			timeout : 27000
		};

		function success(pos) {
			var crd = pos.coords;

			//var lat1 = crd.latitude;
			//var lon1 = crd.longitude;
			 //getDatbase();
			// console.log(lat1);
			// console.log(lon1);
			alert('Your current position is:');
			alert('Latitude : ' + crd.latitude);
			alert('Longitude: ' + crd.longitude);
			alert('More or less ' + crd.accuracy + ' meters.');
			// return crd;

		};

		function error(err) {
			alert('ERROR(' + err.code + '): ' + err.message);
			// alert("Please turn your WIFI on");
		};
		navigator.geolocation.getCurrentPosition(success, error, options);

	
		
    }

    // Public API
    return {

    	location: function(lat1, lon1, lat, lon){
			return getLocation(lat1, lon1, lat, lon);
		}

    }

})();







