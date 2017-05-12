"use strict";

// Aufruf:
// getDistance.calculate();
// Distanz Berechnung

var getDistance = (function () {

	function calculateDistance(lat1, lon1, lat, lon) {
		var R = 6371; // Radius of the earth in km

		var dLat = (lat - lat1) * Math.PI / 180; // deg2rad below
		var dLon = (lon - lon1) * Math.PI / 180;

		var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1))
				* Math.cos(deg2rad(lat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

		var distance = R * c * 1000; // Distance in m
		return distance;
		
    }

    // Public API
    return {

    	calculate: function(lat1, lon1, lat, lon){
			return calculateDistance(lat1, lon1, lat, lon);
		}

    }

})();







