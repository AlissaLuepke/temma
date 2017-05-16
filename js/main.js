var position = false;
var database = false;
var coords = [];
var deg = 0;
var id;
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
	// var deg = radians[0].angle;
	deg = radians[0].angle;
	$("#" + radians[0].id).addClass('sightsactive');
	direction.style.transform = 'rotate(' + deg + 'deg)';
	console.log("default degree: " + deg);
	// console.log("index2: " + radians.indexOf(deg));

	// $('#sights' ).hasClass('sightsactive');
	rotaryEventHandler = function(e) {

		if (e.detail.direction === "CW") {

			var searchTerm = deg, index = -1;
			for (var j = 0, len = radians.length; j < len; j++) {
				if (radians[j].angle === searchTerm) {
					index = j;
					break;
				}
			}

			for (var i = 0; i < radians.length; i++) {
				if (i === index) {
					// altdeg = radians[(index += radians.length) %
					// radians.length];

					deg = radians[(index += radians.length + 1)
							% radians.length].angle;

					console.log("newdeg: " + deg);
					/*
					 * if (altdeg > 180 && deg < 180) { deg = 360;
					 * direction.style.transform = 'rotate(' + deg + 'deg)'; deg =
					 * 0; direction.style.transform = 'rotate(' + deg + 'deg)';
					 * deg = radians[(index += radians.length + 1) %
					 * radians.length]; }
					 */

					console.log("deg+1: " + deg);
					return deg;
				}

				//if (radians[index].id == $("#center").children().attr('id')) {
				
				
				//var color = (props.sights === true) ? "sights" : (props.culinary === true) ? "culinary" : "insidertip";
					$("#" + radians[index].id).addClass('sightsactive');
					$("#" + radians[(index-1)%radians.length].id).removeClass('sightsactive');
			//	}

				// Klasse dem Punkt zuweisen der den selben winkel hat
				direction.style.transform = 'rotate(' + deg + 'deg)';
				console.log("transform" + deg);
			}

		}
		if (e.detail.direction === "CCW") {
			// var index = radians.indexOf(deg);
			var searchTerm = deg, index = -1;
			for (var j = 0, len = radians.length; j < len; j++) {
				if (radians[j].angle === searchTerm) {
					index = j;
					break;
				}
			}
			console.log("index: " + index);
			for (var i = 0; i < radians.length; i++) {
				console.log("id " + radians[i].id);
				if (i === index) {

					// deg = radians[i - 1];
					deg = radians[(index += radians.length - 1)
							% radians.length].angle;
					console.log("deg-1: " + deg);

					return deg;
				}
				/*
				 * if(radians[i].x === coords[0]){
				 * $("div").addClass('sightsactive'); }
				 */
				// $('#sights').addClass('sightsactive');
				// console.log(deg);
				//if (radians[index].id == $("#center").children().attr('id')) {
					$("#" + radians[index].id).addClass('sightsactive');
					$("#" + radians[(index+1)%radians.length].id).removeClass('sightsactive');
			//	}

				direction.style.transform = 'rotate(' + deg + 'deg)';
				console.log("transform back" + deg);
			}

		}

	}

	document.addEventListener("rotarydetent", rotaryEventHandler, false);
}

// //Sights Values
function displayPOIS() {
	radians = [];
	$('#center').empty();
	console.log("Pois: " + JSON.stringify(pois[0]));
	l = pois.length;
	for (i = 0; i < l; i++) {

		var lat2 = pois[i].geometry.coordinates[1];
		var lon2 = pois[i].geometry.coordinates[0];
		var props = pois[i].properties;
		id = pois[i]._id;
		// var d = getDistance(lat1, lon1, lat2, lon2);
		var d = getDistance.calculate(lat1, lon1, lat2, lon2);
		console.log("distance: " + d);
		// var coords = calculateBearing(lat1, lon1, lat2, lon2);
		coords = getBearing.calculate(lat1, lon1, lat2, lon2);
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

		if (d < 2000) {

			radians.push({
				angle : coords[3],
				properties : props,
				x : coords[0],
				y : coords[1],
				id : id
			});

			// radians.push(coords[3]);
			// "id="+i+
			$("#center").append(
					"<div class=" + color + " id=" + id + " style='left:"
							+ (coords[0] - 10) + "px;top:" + (coords[1] - 10)
							+ "px'></div>")
		}
		;

	}
	radians.sort(function(a, b) {
		return a.angle - b.angle
	});

	selectPOI();
	/*console.log("radians 0: " + radians[0].angle);
	console.log("radians 1: " + radians[1].angle);
	console.log("radians 2: " + radians[2].angle);
	console.log("radians 3: " + radians[3].angle);
	console.log("id 0: " + radians[0].id);*/
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

$('#first').click(function() {
	tau.changePage(document.getElementById("main"));
});

/*
 * function startSensor() { "use strict"; console.log("YAY");
 * window.addEventListener("deviceorientation", onDeviceOrientation, true); }
 * 
 * function onDeviceOrientation(dataEvent) { "use strict"; console.log("Wogoo");
 * var angleMemory; var angle = dataEvent.alpha; console.log(angle); var text;
 * 
 * if (angle < 68 || angle > 292) { text += 'NORTH'; } else if (angle > 112 &&
 * angle < 248) { text += 'SOUTH'; }
 * 
 * if (angle > 22 && angle < 158) { text += 'EAST'; } else if (angle > 202 &&
 * angle < 338) { text += 'WEST'; }
 * 
 * var deltaAngle = angleMemory - angle;
 * 
 * 
 * if (Math.abs(deltaAngle) > 180) { if (deltaAngle > 0) { rotation -= ((360 -
 * angleMemory) + angle); } else { rotation += (angleMemory + (360 - angle)); } }
 * else { rotation += deltaAngle; } angleMemory = angle;
 * 
 * $('#direct').text(text); $("#angle").html(Math.round(angle) + "<sup>o</sup>");
 * //$('#rotation').css('-webkit-transform', 'rotate(' + rotation + 'deg)');
 * $('#rotation').text(rotation); }; startSensor();
 */

/*
 * window.removeEventListener("deviceorientation", compassListener, false);
 * 
 * function compassListener(event) { var degrees = compassHeading(event.alpha,
 * event.beta, event.gamma); console.log(Math.round(degrees) + '&deg; ' +
 * getDirection(degrees)); }
 * 
 * function compassHeading(alpha, beta, gamma) { var angle = alpha, deltaAngle; //
 * check angle change and calculate the rotation of the compass deltaAngle =
 * lastAngle - angle; if (Math.abs(deltaAngle) > 180) { if (deltaAngle > 0) {
 * rotation -= ((360 - lastAngle) + angle); } else { rotation += (lastAngle +
 * (360 - angle)); } } else { rotation += deltaAngle; } // save current
 * measurement lastAngle = angle;
 * 
 * return angle; }
 * 
 * function getDirection(degrees) { return ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE',
 * 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW',
 * 'N'][Math.round(degrees / 11.25 / 2)]; }
 * 
 */