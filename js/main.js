/* Pfeil drehen */
(function() {
	var deg = 0;
	rotaryEventHandler = function(e) {
		if (e.detail.direction === "CW") {
			deg = deg + 15;
		}
		if (e.detail.direction === "CCW") {
			deg = deg - 15;
		}
		direction.style.transform = 'rotate(' + deg + 'deg)';
	}
	document.addEventListener("rotarydetent", rotaryEventHandler, false);
}());


///// Get GEOLOCATION from USER
/*var options = {enableHighAccuracy: true, maximumAge: 600000, timeout: 0};
var watchID;

function successCallback(position)
{
	console.log(position);
}

function errorCallback(error)
{
	console.log(error);
}
// start watching current location
var watchID = navigator.geolocation.watchPosition(successCallback, errorCallback, options);

// stop watching
navigator.geolocation.clearWatch(watchID);*/


////Position of USER

var lat1 =  48.363715;
var lon1 = 10.899192;

////Sights Values

var lat = [ 48.364321, 48.364321, 48.366222, 48.369048, 48.372715, 48.367674, 48.36037, 48.36011, 48.366247];
var lon = [ 10.899474, 10.89652, 10.902533, 10.892354, 10.896404, 10.896965, 10.90321, 10.90361, 10.903645];
var filter = [ 'sights','sights','sights','sights','sights','insider','insider','sights','sights' ]
var latlen = lat.length;
var lonlen = lon.length;
var filterlen = filter.length;


///Show POIs on Watch

function displayPOIS() {
	for (i = 0; i < latlen && i < lonlen && i<filterlen; i++) {
		var d = getDistance(lat1, lon1, lat[i], lon[i]);
		var coords = calculateBearing(lat1, lon1, lat[i], lon[i]);
		var filters = filter[i];
		console.log("filter: "+ filters);
		if (d < 50) {
			$("#center").append(
					"<div class='point1' style='left:" + (coords[0] - 10) + "px;top:"
							+ (coords[1] - 10) + "px'></div>")
		} else if(d<100){
			$("#center").append(
					"<div class='point2' style='left:" + (coords[0] - 10) + "px;top:"
							+ (coords[1] - 10) + "px'></div>")
			
		}
		else if(d<200){
			$("#center").append(
					"<div class='point3' style='left:" + (coords[0] - 8) + "px;top:"
							+ (coords[1] - 8) + "px'></div>")
		}
		else if (d<300){
			$("#center").append(
					"<div class='point4' style='left:" + (coords[0] - 10) + "px;top:"
							+ (coords[1] - 10) + "px'></div>")
		}
		else if (d<400){
			$("#center").append(
					"<div class='point5' style='left:" + (coords[0] - 10) + "px;top:"
							+ (coords[1] - 10) + "px'></div>")
		}else if (d<500 && filters == 'insider'){
			$("#center").append(
					"<div class='point_insider' style='left:" + (coords[0] - 10) + "px;top:"
							+ (coords[1] - 10) + "px'></div>")
		}else if (d<500 && filters == 'sights'){
			$("#center").append(
					"<div class='point6' style='left:" + (coords[0] - 10) + "px;top:"
							+ (coords[1] - 10) + "px'></div>")
		}
		else if (d<1000){
			$("#center").append(
					"<div class='point7' style='left:" + (coords[0] - 10) + "px;top:"
							+ (coords[1] - 10) + "px'></div>")
		}
		else if(d<1500){
			$("#center").append(
					"<div class='point8' style='left:" + (coords[0] - 10) + "px;top:"
							+ (coords[1] - 10) + "px'></div>")
		}
		else if(d<2000){
			$("#center").append(
					"<div class='point9' style='left:" + (coords[0] - 10) + "px;top:"
							+ (coords[1] - 10) + "px'></div>")
		}
			else {
		
			$("#center").append(
					"<div class='point10' style='left:" + (coords[0] - 10) + "px;top:"
							+ (coords[1] - 10) + "px'></div>")
		};
	}
};
displayPOIS(latlen, lonlen, filterlen);



/// Get DISTANCE from USERS Position to Sights

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



//// Calculate Bearing from USERS location to POI (from North)
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
	console.log("bearing: " + bearing);
	bearing = (bearing + 360) % 360;
	
	bearing = (bearing - 90) * Math.PI / 180;
	// return bearing;
	var x2 = Math.cos(bearing) * 157.5 + 157.5;
	var y2 = Math.sin(bearing) * 157.5 + 157.5;
	return [x2, y2];

};




//// Long Touch Event to set Filter

var touchtimer, flagLock, touchduration = 200;
var onlongtouch = function() {
	console.log("long touch");
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




/// Get device orientation of the Watch

var alphaElem = document.getElementById("alpha");
var betaElem = document.getElementById("beta");
var gammaElem = document.getElementById("gamma");
window.addEventListener("deviceorientation", function(e) {
	alphaElem.innerHTML = 'alpha value ' + Math.round(e.alpha);
	betaElem.innerHTML = 'beta value ' + Math.round(e.beta);
	gammaElem.innerHTML = 'gamma value ' + Math.round(e.gamma);
}, true);
console.log("alpha" + alphaElem + "beta" + betaElem + "gamma" + gammaElem);