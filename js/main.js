/* Pfeil drehen */
var lat1 = 48.363715;
var lon1 = 10.899192;
var active = [];
var cat = [ "sights", "insidertip", "culinary" ];

var pois;
var radians = [];

function selectPOI() {
	var deg = radians[0];

	// $('#sights' ).hasClass('sightsactive');
	rotaryEventHandler = function(e) {

		if (e.detail.direction === "CW") {
			// console.log(deg);
			var index = radians.indexOf(deg);
			console.log("index: " + index);
			for (var i = 0; i < radians.length; i++) {
				if (i === index) {

					deg = radians[(index += radians.length + 1)
							% radians.length];
					/*
					 * if((radians[(index += radians.length -1)%
					 * radians.length])>180){
					 *  }
					 */
					console.log("deg+1: " + deg);
					return deg;
				}
				
				
				// Klasse dem Punkt zuweisen der den selben winkel hat 
				direction.style.transform = 'rotate(' + deg + 'deg)';
			}

		}
		if (e.detail.direction === "CCW") {
			var index = radians.indexOf(deg);
			console.log("index: " + index);
			for (var i = 0; i < radians.length; i++) {
				if (i === index) {

					// deg = radians[i - 1];
					deg = radians[(index += radians.length - 1)
							% radians.length];
					console.log("deg-1: " + deg);

					return deg;
				}

				// $('#sights').addClass('sightsactive');
				// console.log(deg);

				direction.style.transform = 'rotate(' + deg + 'deg)';

			}

		}
		// return deg;

		// console.log(direction.style.transform);
	}
	/* }; */

	document.addEventListener("rotarydetent", rotaryEventHandler, false);
};

db.POI.find().fetch(function(results) {

	pois = results;

	displayPOIS();

	console.log(results)
}, function() {
	console.log("ERROR")
})

// /// Get GEOLOCATION from USER
/*
 * var options = {enableHighAccuracy: true, maximumAge: 600000, timeout: 0}; var
 * watchID;
 * 
 * function successCallback(position) { console.log(position); }
 * 
 * function errorCallback(error) { console.log(error); } // start watching
 * current location var watchID =
 * navigator.geolocation.watchPosition(successCallback, errorCallback, options); //
 * stop watching navigator.geolocation.clearWatch(watchID);
 */

// //Position of USER
// //Sights Values
function displayPOIS() {
	l = pois.length;
	for (i = 0; i < l; i++) {
		var lat2 = pois[i].geometry.coordinates[1];
		var lon2 = pois[i].geometry.coordinates[0];
		var props = pois[i].properties;
		var d = getDistance(lat1, lon1, lat2, lon2);
		var coords = calculateBearing(lat1, lon1, lat2, lon2);

		var c = "point1";
		var color = "sights"

		if (props.sights === true) {
			//console.log("sights");
			color = "sights";
		} else if (props.culinary === true) {
			color = "culinary";
		} else if (props.insidertip === true) {
			color = "insidertip";
		}
		;
		/*
		 * if (d < 50) { c = "point1"; } else if (d < 100) { c = "point2"; }
		 * else if (d < 200) { c = "point3"; } else if (d < 300) { c = "point4"; }
		 * else if (d < 400) { c = "point5"; } else if (d < 500) { c = "point6"; }
		 * else if (d < 1000) { c = "point7"; } else if (d < 1500) { c =
		 * "point8"; } else if (d < 2000) { c = "point9"; } else { c =
		 * "point10"; }
		 */

		
		cat.forEach(function(i) {
			active[i] = true
		});

		function updateCats() {
			cat.forEach(function(i) {
				if (active[i]) {
					$('.' + i).hide();
				} else {
					$('.' + i).show();
				}
			});
		}

		cat.forEach(function(i) {
			$('#' + i).unbind().click(function() {
				if ($('#' + i).hasClass(i + 'active')) {
					$('#' + i).removeClass(i + 'active');
					active[i] = true;
				} else {
					$('#' + i).addClass(i + 'active');
					active[i] = false;
				}
				console.log(i + " active: " + active[i]);
				updateCats();
			});
		});
		
		if (d < 300) {
			radians.push(coords[3]);

			$("#center").append(
					"<div class=" + color + " style='left:" + (coords[0] - 10)
							+ "px;top:" + (coords[1] - 10) + "px'></div>")
		}
		;

	}
	radians.sort(function(a, b) {
		return a - b
	});
	selectPOI();
	console.log("radians: " + radians);
};

// displayPOIS(latlen, lonlen, filterlen);

// / Get DISTANCE from USERS Position to Sights

function getDistance(lat1, lon1, lat, lon) {
	var R = 6371; // Radius of the earth in km

	var dLat = (lat - lat1) * Math.PI / 180; // deg2rad below
	var dLon = (lon - lon1) * Math.PI / 180;

	var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1))
			* Math.cos(deg2rad(lat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	var distance = R * c * 1000; // Distance in m
	console.log("distance: " + distance);
	//
	return distance;
};

function deg2rad(deg) {
	return deg * (Math.PI / 180)
};

// // Calculate Bearing from USERS location to POI (from North)
function calculateBearing(lat1, lon1, lat, lon) {
	// console.log("lat: " + lat);
	// console.log("lon: "+ lon);
	lat1 = lat1 * Math.PI / 180;
	lon1 = lon1 * Math.PI / 180;
	lat = lat * Math.PI / 180;
	lon = lon * Math.PI / 180;

	var dLon = lon - lon1;
	var y = Math.sin(dLon) * Math.cos(lat);
	var x = Math.cos(lat1) * Math.sin(lat) - Math.sin(lat1) * Math.cos(lat)
			* Math.cos(dLon);

	var bearing = (Math.atan2(y, x)) * 180 / Math.PI;
	console.log("bearing1: " + bearing);
	bearing2 = (bearing + 360) % 360;
	console.log("bearing2: " + bearing);
	bearing = (bearing - 90) * Math.PI / 180;
	console.log("bearing3: " + bearing);

	// return bearing;
	var x2 = Math.cos(bearing) * 157.5 + 157.5;
	var y2 = Math.sin(bearing) * 157.5 + 157.5;
	return [ x2, y2, bearing, bearing2 ];

};

// // Long Touch Event to set Filter

var touchtimer, flagLock, touchduration = 200;
var onlongtouch = function() {
	// console.log("long touch");
	tau.changePage(document.getElementById("two"));
};

function touchstart(e) {
	e.preventDefault();
	if (flagLock) {
		return;
	}
	touchtimer = setTimeout(onlongtouch, touchduration);
	flagLock = true;
}

function touchend() {
	if (touchtimer) {
		clearTimeout(touchtimer);
		flagLock = false;
	}
}
window.onload = function() {
	document.getElementById("direction-button").addEventListener("touchstart",
			touchstart, false);
	document.getElementById("direction-button").addEventListener("touchend",
			touchend, false);
};
var page1 = document.getElementById("first");
page1.addEventListener("click", function() {
	tau.changePage(document.getElementById("main"));
});
// /rotate
function rotatePoint(origin, point, angle) {
	var radians = angle * Math.PI / 180.0, cos = Math.cos(radians), sin = Math
			.sin(radians), dX = point.x - origin.x, dY = point.y - origin.y;
	return {
		x : cos * dX - sin * dY + origin.x,
		y : sin * dX + cos * dY + origin.y
	};
}

// / Get device orientation of the Watch

var alphaElem = document.getElementById("alpha");
var betaElem = document.getElementById("beta");
var gammaElem = document.getElementById("gamma");
window.addEventListener("deviceorientation", function(e) {
	alphaElem.innerHTML = 'alpha value ' + Math.round(e.alpha);
	betaElem.innerHTML = 'beta value ' + Math.round(e.beta);
	gammaElem.innerHTML = 'gamma value ' + Math.round(e.gamma);
}, true);
console.log("alpha" + alphaElem + "beta" + betaElem + "gamma" + gammaElem);