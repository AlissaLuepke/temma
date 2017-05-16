
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

$('#first').click(function() {
	tau.changePage(document.getElementById("main"));
});


var _watchPosition_options = {
	enableHighAccuracy : true,
	maximumAge : 300000,
	timeout : 27000
};

function initialize() {
console.log("init");
	db.POI.find().fetch(
			function(results) {
				pois = results;

				database = true;
				console.log("got them");
				// displayPOIS();

				// Position
				navigator.geolocation.watchPosition(function(pos) {
					var crd = pos.coords;
					// var heading = crd.heading;
					// console.log("richtung: " + heading);
					// direction2.style.transform = 'rotate(' + heading +
					// 'deg)';
					position = true;

					if (typeof lat1 == "undefined"
							&& typeof lon1 == "undefined") {

						lat1 = crd.latitude;
						lon1 = crd.longitude;

						displayPOIS();

					} else {

						var d = getDistance.calculate(crd.latitude,
								crd.longitude, lat1, lon1);
						if (d > 20) {

							lat1 = crd.latitude;
							lon1 = crd.longitude;

							displayPOIS();
						}

					}

					console.log("go postion");
					/*
					 * alert('Your current position is:'); alert('Latitude : ' +
					 * crd.latitude); alert('Longitude: ' + crd.longitude);
					 * alert('More or less ' + crd.accuracy + ' meters.');
					 */
				}, function(err) {
					position = false;
					alert('ERROR(' + err.code + '): ' + err.message);
				}, _watchPosition_options);

				console.log(results)
			}, function(error) {
				database = false;
				console.log("ERROR")
			});

}

initialize();