"use strict";

// Aufruf:
// getBearing.calculate();
// Calculate Bearing from USERS location to POI (from North)

var getBearing = (function () {

	function calculateBearing(lat1, lon1, lat, lon) {
		lat1 = lat1 * Math.PI / 180;
		lon1 = lon1 * Math.PI / 180;
		lat = lat * Math.PI / 180;
		lon = lon * Math.PI / 180;

		var dLon = lon - lon1;
		var y = Math.sin(dLon) * Math.cos(lat);
		var x = Math.cos(lat1) * Math.sin(lat) - Math.sin(lat1) * Math.cos(lat)
				* Math.cos(dLon);

		var bearing = (Math.atan2(y, x)) * 180 / Math.PI;
		//console.log("bearing1: " + bearing);
		var bearing2 = (bearing + 360) % 360;
		//Der normale kreis beginnt 0 im Osten(rechts), 
        //deshalb muss dem Winkel 90° Abgezogen werden damit die Winkel im Norden anfangen
		bearing = (bearing - 90) * Math.PI / 180;
		  
        //Wird derzeit im poi_manager berechnet
        
		var x2 = Math.cos(bearing) * 157.5 + 157.5;
		var y2 = Math.sin(bearing) * 157.5 + 157.5;
		return [ x2, y2, bearing, bearing2];

	}

    // Public API
    return {

    	calculate: function(lat1, lon1, lat, lon){
			return calculateBearing(lat1, lon1, lat, lon);
		}

    };

})();







