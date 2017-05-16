"use strict";

// Aufruf:
// getDistance.calculate();
// Distanz Berechnung

var poiManager = (function () {
	var db;
	var cat = [ "sights", "insidertip", "culinary" ];
	var pois = [];
	var radians = [];
	var active_poi;

	var _watchPosition_options = {
		enableHighAccuracy : true,
		maximumAge : 300000,
		timeout : 27000
	};

	function init(_db) {
		db = _db;

		updatePOIS();

		navigator.geolocation.watchPosition(_event_watchPosition, function(err) {
			position = false;
			alert('ERROR(' + err.code + '): ' + err.message);
		}, _watchPosition_options);

		document.addEventListener("rotarydetent", _event_rotaryEventHandler, false);

		/*
		cat.forEach(function(i) {
			$('#' + i).unbind().click(function() {
				if ($('#' + i).hasClass(i + 'active')) {
					$('#' + i).removeClass(i + 'active');
					active_cats[i] = true;
				} else {
					$('#' + i).addClass(i + 'active');
					active_cats[i] = false;
				}
				console.log(i + " active: " + active_cats[i]);
				updateCats();
			});
		});
		*/

		redraw();
	}

	function updatePOIS() {
		db.find(/* TODO: filter by cat */).fetch(
			function(results) {
				pois = [];
				console.log(results)
				for (var i = 0; i < results.length; i++) {
					
					var lat2 = pois[i].geometry.coordinates[1];
					var lon2 = pois[i].geometry.coordinates[0];
					var props = pois[i].properties;
					id = pois[i]._id;
					var is_active = pois[i]._id == active_poi;
					// var d = getDistance(lat1, lon1, lat2, lon2);
					var d = getDistance.calculate(lat1, lon1, lat2, lon2);
					console.log("distance: " + d);
					// var coords = calculateBearing(lat1, lon1, lat2, lon2);
					coords = getBearing.calculate(lat1, lon1, lat2, lon2);

					if (d < 2000) {
						poi = results[i];
						poi._radian = {
							angle : coords[3],
							properties : props,
							x : coords[0],
							y : coords[1],
							id : id,
							is_active: is_active,
							distance: d
						};
						pois.push(poi);
					}
					;
				}
				
			}, function(error) {
				console.log("ERROR")
			}
		);
	}

	function _event_watchPosition(pos) {
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

			updatePOIS();
			redraw();

		} else {

			var d = getDistance.calculate(crd.latitude,
					crd.longitude, lat1, lon1);
			if (d > 20) {

				lat1 = crd.latitude;
				lon1 = crd.longitude;

				updatePOIS();
				redraw();
			}

		}
	}

	function _event_rotaryEventHandler(e) {
		// TODO:
		// 1. POIs sortieren
		// 2. Aktiven POI -> Index
		// 3. Neuer Index -> neue POI ID
		// 4. redraw()

		var index_change = 1;
		if (e.detail.direction === "CCW") index_change = -1;


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

					deg = radians[(index += radians.length + index_change)
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


	}
	
	function getActivePoi() {
		if (!active_poi) return null;
		for (var i = 0; i < pois.length; i++) {
			if (pois[i]._id == active_poi)
				return pois[i]
		}
	}

	/* Pfeil drehen */
	/*
	* setInterval(function() { }, 10);
	*/

	function redraw() {
		redrawArrow();
		redrawPOIS();
	}

	function redrawArrow() {
		// var deg = radians[0].angle;
		deg = radians[0].angle;
		$("#" + radians[0].id).addClass('sightsactive');
		direction.style.transform = 'rotate(' + deg + 'deg)';
		console.log("default degree: " + deg);
		// console.log("index2: " + radians.indexOf(deg));
		
		// $('#sights' ).hasClass('sightsactive');
		

	}

	// //Sights Values
	function redrawPOIS() {
		$('#center').empty();
		console.log("Pois: " + JSON.stringify(pois[0]));
		l = pois.length;
		for (i = 0; i < l; i++) {
			var color = "sights"
			if (props.sights === true) {
				// console.log("sights");
				color = "sights";
			} else if (props.culinary === true) {
				color = "culinary";
			} else if (props.insidertip === true) {
				color = "insidertip";
			}
			/*
			* if (d < 50) { c = "point1"; } else if (d < 100) { c = "point2"; }
			* else if (d < 200) { c = "point3"; } else if (d < 300) { c = "point4"; }
			* else if (d < 400) { c = "point5"; } else if (d < 500) { c = "point6"; }
			* else if (d < 1000) { c = "point7"; } else if (d < 1500) { c =
			* "point8"; } else if (d < 2000) { c = "point9"; } else { c =
			* "point10"; }
			*/

							// radians.push(coords[3]);
				// "id="+i+
				$("#center").append(
						"<div class=" + color + (is_active ? ' active' : '') + " id=" + id + " style='left:"
								+ (pois._radian.x - 10) + "px;top:" + (pois._radian.y - 10)
								+ "px'></div>")

		}
		radians.sort(function(a, b) {
			return a.angle - b.angle
		});
	};


    // Public API
    return {
    	init: init
    }
})();







