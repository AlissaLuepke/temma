var position = false;
var database = false;
// var lat1 = 48.363715;
// var lon1 = 10.899192;
var lat1;
var lon1;
var active = [];
var cat = [ "sights", "insidertip", "culinary" ];
var pois;
var radians = [];

var options = {
	enableHighAccuracy : true,
	maximumAge : 300000,
	timeout : 27000
};

function initialize() {

	db.Muc.find().fetch(
			function(results) {
				pois = results;
				database = true;
				console.log("got them");
				// displayPOIS();

				// Position
				navigator.geolocation.watchPosition(function(pos) {
					var crd = pos.coords;
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
				}, options);

				console.log(results)
			}, function(error) {
				database = false;
				console.log("ERROR")
			});

}

initialize();

/* Pfeil drehen */
/*
 * setInterval(function() { }, 10);
 */

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
					altdeg = radians[(index += radians.length) % radians.length];

					deg = radians[(index += radians.length + 1)
							% radians.length];

					if (altdeg > 180 && deg < 180) {
						deg = 360;
						direction.style.transform = 'rotate(' + deg + 'deg)';
						deg = 0;
						direction.style.transform = 'rotate(' + deg + 'deg)';
						deg = radians[(index += radians.length + 1)
								% radians.length];

					}
					/*
					 * if((radians[(index += radians.length -1)%
					 * radians.length])>180){ }
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
}

// //Sights Values
function displayPOIS() {
	radians = [];
	$('#center').empty();
	l = pois.length;
	for (i = 0; i < l; i++) {

		var lat2 = pois[i].geometry.coordinates[1];
		var lon2 = pois[i].geometry.coordinates[0];
		var props = pois[i].properties;
		// var d = getDistance(lat1, lon1, lat2, lon2);
		var d = getDistance.calculate(lat1, lon1, lat2, lon2);
		console.log("distance: " + d);
		// var coords = calculateBearing(lat1, lon1, lat2, lon2);
		var coords = getBearing.calculate(lat1, lon1, lat2, lon2);
		var c = "point1";
		var color = "sights"

		if (props.sights === true) {
			// console.log("sights");
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

		if (d < 300000) {

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

function deg2rad(deg) {
	return deg * (Math.PI / 180)
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