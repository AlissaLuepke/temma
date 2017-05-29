"use strict";
var poiManager = (function () {
    var db, deg, lat1, lon1, currentObj;
    var active_cats = [];
  //  var categories = ["sights", "insidertip", "culinary"];
    var pois = [];
    var radians = [];
    var active_poi;
    var _watchPosition_options = {
        enableHighAccuracy: true
        , maximumAge: 300000
        , timeout: 27000
    };
    //48.15961   11.640874
    function init(_db) {
        db = _db;
        updatePOIS();
        navigator.geolocation.watchPosition(_event_watchPosition, function (err) {
            alert('ERROR(' + err.code + '): ' + err.message);
        }, _watchPosition_options);
        document.addEventListener("rotarydetent", _event_rotaryEventHandler, false);
        redraw();
    }
    /// TODO: filter by category
    // 1. Button wird angeklickt - active
    // 2. Datenbank wird abgefragt nach Kategorie
    // {"properties.culinary": true}
    // {"properties.insidertip":true}
    //{"properties.sights" : true}
    // 3. pois updaten 
    // var i = "sights";
    // Klasse hinzufügen bzw weggnehmen
    
    
    
 var categories = {
	sights : 0,
	culinary : 1,
	insidertip : 2
}
var active = [false, false, false];

for (var i in categories) {
	if (!categories.hasOwnProperty(i)) continue;
	
	$('#' + i).unbind().click(function () {
		if ($(this).hasClass($(this).attr('id') + 'filteractive')) {
			$('#' + $(this).attr('id')).removeClass($(this).attr('id') + 'filteractive');
			active[categories[$(this).attr('id')]] = false;
            filterDatabase();
		}
		else {
			$('#' + $(this).attr('id')).addClass($(this).attr('id') + 'filteractive');
			active[categories[$(this).attr('id')]] = true;
			console.log($(this).attr('id'));
            filterDatabase();
		}
	})
}


function filterDatabase(){
    console.log("filerDatabase");
	var query = {};
	var count = 0;
	active.forEach(function (val) {
		if ( val == true) count++;
	});
	if (count > 1) query['$or'] = [];
	for (var key in categories) {
		if (!categories.hasOwnProperty(key)) continue;
		
		if (count > 1) {
			var tmpQuery = {};
			tmpQuery["properties." + key] = true;
			if (active[categories[key]]) query['$or'].push(tmpQuery);
		} else {
			if (active[categories[key]]) query["properties." + key] = true;
		}
		
	}
	
	db.find( query ).fetch(function (results) {
				console.log("query: " + JSON.stringify(query));
				console.log("results: " + JSON.stringify(results));
				changePOIS(results);
				redraw();
			}, function (error) {
				console.log(error);
			});
	}


/*   
   categories.forEach(function (i) {
       active_cats[i] = true
   });
   
   
   categories.forEach(function (i) {
       $('#' + i).unbind().click(function () {
           if ($('#' + i).hasClass(i + 'filteractive')) {
               $('#' + i).removeClass(i + 'filteractive');
           }
           else {
               console.log("hi");
               $('#' + i).addClass(i + 'filteractive');
               filterDatabase(i);
           }
       })
   });*/
/* function filterDatabase(cat){
     if(cat==sights){
     db.find({
                 "properties.sights": true
             }).fetch(function (results) {
         console.log("sights results: "+JSON.stringify(results));
                 changePOIS(results);
                 redraw();
             }, function (error) {
                 console.log(error);
             });
     }
     else if(cat == culinary){
          db.find({
                 "properties.culinary": true
             }).fetch(function (results) {
         console.log("culinary results: "+ JSON.stringify(results));
                 changePOIS(results);
                 redraw();
             }, function (error) {
                 console.log(error);
             });
     }
     else {
          db.find({
                 "properties.insidertip": true
             }).fetch(function (results) {
         console.log("Insidertip results: "+JSON.stringify(results));
                 changePOIS(results);
                 redraw();
             }, function (error) {
                 console.log(error);
             });
     }
 }*/
/* function filterDatabase(cat) {
     console.log("cat: "+cat);
     if (cat == "sights" || cat == "culinary" || cat == "insidertip") {
         
             db.find({
                 "properties['sights']" : true 
             }).fetch(function (results) {
             console.log("cat results: " + JSON.stringify(results));
             changePOIS(results);
             redraw();
         }, function (error) {
             console.log(error);
         });
     }
     else {
         console.log("ERROR ! - Unknown Category recieved!");
     }
 }*/
//Pois werden aus der Datenbank geholt
// daten aus der datenbank werden durchgegangen 
// Berechnungen werden durchgeführt

function updatePOIS() {
    //console.log("updatePOIS");
    /* TODO: filter by cat */
    db.find().fetch(function (results) {
        console.log("whole Database");
        //Leeren des globalen arrays wenn watch position wieder aufgerufen wird 
        changePOIS(results);
        /*      pois = [];
              for (var i = 0; i < results.length; i++) {
                  // TODO: Description, Titel etc in poi._radian schreiben
                  var lat2 = results[i].geometry.coordinates[1];
                  var lon2 = results[i].geometry.coordinates[0];
                  var props = results[i].properties;
                  var id = results[i]._id;
                  var is_active = results[i]._id == active_poi;
                  var d = getDistance.calculate(lat1, lon1, lat2, lon2);
                  //console.log("distance: " + d);
                  var coords = getBearing.calculate(lat1, lon1, lat2, lon2);
                  // Welche Punkte werden angezeigt - die in einbem bestimmten radius sind 
                  if (d < 500) {
                      // results POIS - werden in var poi geschrieben
                      // alle werte werden upgedatet
                      var poi = results[i];
                      poi._radian = {
                          angle: coords[3]
                          , properties: props
                          , x: coords[0]
                          , y: coords[1]
                          , id: id
                          , is_active: is_active, //true oder false
                          distance: d
                      };
                      // in pois werden die daten von Poi reingeschrieben 
                      pois.push(poi);
                  };
              }*/
        console.log(JSON.stringify(pois));
    }, function (error) {
        console.log("ERROR")
    });
}

function changePOIS(results) {
    pois = [];
    for (var i = 0; i < results.length; i++) {
        // TODO: Description, Titel etc in poi._radian schreiben
        var lat2 = results[i].geometry.coordinates[1];
        var lon2 = results[i].geometry.coordinates[0];
        var props = results[i].properties;
        var id = results[i]._id;
        var is_active = results[i]._id == active_poi;
        var d = getDistance.calculate(lat1, lon1, lat2, lon2);
        //console.log("distance: " + d);
        var coords = getBearing.calculate(lat1, lon1, lat2, lon2);
        // Welche Punkte werden angezeigt - die in einbem bestimmten radius sind 
        if (d < 500) {
            // results POIS - werden in var poi geschrieben
            // alle werte werden upgedatet
            var poi = results[i];
            poi._radian = {
                angle: coords[3]
                , properties: props
                , x: coords[0]
                , y: coords[1]
                , id: id
                , is_active: is_active, //true oder false
                distance: d
            };
            // in pois werden die daten von Poi reingeschrieben 
            pois.push(poi);
        }
    }
}
//Überwachung der Position 
function _event_watchPosition(pos) {
    console.log("watch");
    var crd = pos.coords;
    // var heading = crd.heading;
    // console.log("richtung: " + heading);
    // direction2.style.transform = 'rotate(' + heading +
    // 'deg)';
    if (typeof lat1 == "undefined" && typeof lon1 == "undefined") {
        lat1 = crd.latitude;
        lon1 = crd.longitude;
        updatePOIS();
        redraw();
    }
    else {
        var d = getDistance.calculate(crd.latitude, crd.longitude, lat1, lon1);
        if (d > 20) { //20
            lat1 = crd.latitude;
            lon1 = crd.longitude;
            updatePOIS();
            redraw();
        }
    }
}

function bufferUser() {
    for (var i = 0; i < pois.length; i++) {
        if (pois[i]._radian.distance <= 10) {
            alert("Irgendeine Sehenswürdigekit");
        }
    }
}
/*function filter() {
    categories.forEach(function (i) {
        active_cats[i] = true
        $('#' + i).addClass(i + 'active');
    })
    categories.forEach(function (i) {
        $('#' + i).unbind().click(function () {
            if ($('#' + i).hasClass(i + 'active')) {
                $('#' + i).removeClass(i + 'active');
                active_cats[i] = true;
            }
            else {
                $('#' + i).addClass(i + 'active');
                active_cats[i] = false;
            }
        })
    })
}
filter();*/
// rotation Clockwise und Counterclockwise
function _event_rotaryEventHandler(e) {
    var index, len = pois.length
        , index_change = 1
        , activeP, currentIndex;
    // console.log("active1 " + JSON.stringify(active_poi));
    if (e.detail.direction === "CCW") {
        index_change = -1;
        // console.log("CCW: " + index_change);
    }
    pois.sort(function (a, b) {
        return a._radian.angle - b._radian.angle
    });
    // console.log(JSON.stringify(pois));
    activeP = getActivePoi();
    // console.log("activeP: " + JSON.stringify(activeP));
    // wenn es noch keinen aktiven punkt gibt, dann soll der aktive auf den ersten wert im array gesetzt werden
    // wenn es einen gibt dann nimm diesen
    //deg = activeP != null ? activeP._radian.angle : pois[0]._radian.angle;
    currentObj = activeP != null ? activeP : pois[0];
    //console.log("current Object: " + JSON.stringify(currentObj));
    for (var i = 0; i < len; i++) {
        //if (pois[i]._radian.angle === deg) {
        if (pois[i]._radian.id === currentObj._radian.id) {
            index = i; //0
            // console.log("index " + index);
            pois[index]._radian.is_active = false;
            break;
        }
    }
    //
    for (var i = 0; i < len; i++) {
        if (i === index) {
            currentIndex = (index += pois.length + (index_change)) % pois.length;
            //console.log(pois.length);
            //console.log("current index: " + JSON.stringify(currentIndex));
            deg = pois[currentIndex]._radian.angle;
            pois[currentIndex]._radian.is_active = true;
            active_poi = pois[currentIndex];
            // console.log("active Poi: " + JSON.stringify(active_poi));
            index = currentIndex;
            break;
        }
    }
    redraw();
}

function getActivePoi() {
    console.log("Get active POI");
    console.log("Get active POI active_poi: " + active_poi);
    //if (!active_poi) return null;
    if (typeof active_poi == "undefined") {
        //console.log("active_POI function null");
        return null;
    }
    else {
        for (var i = 0; i < pois.length; i++) {
            if (pois[i]._radian.id === active_poi._id) {
                //console.log("new pois: " + pois[i]._radian.id);
                return pois[i];
            }
        }
    }
}

function redraw() {
    redrawArrow();
    redrawPOIS();
    redrawTextelements();
}

function redrawArrow() {
    console.log("redraw Arrow");
    direction.style.transform = 'rotate(' + deg + 'deg)';
}

function redrawTextelements() {
    var title = active_poi.properties.title;
    var distance = active_poi._radian.distance;
    //var reUnit =  distance >= 1000 ? (reUnit = 'km', distance = distance/1000) : reUnit = 'm';
    $('#title').html(title);
    $('#distance').html(distance.toFixed(0) + " m");
    //$('#distance').html(distance.toFixed(0) + " " + reUnit);
};

function redrawPOIS() {
    //console.log("redrawPOIS");
    $('#center').empty();
    var len = pois.length;
    for (var i = 0; i < len; i++) {
        //pois[]._radian in var schreiben
        var props = pois[i]._radian.properties;
        var color = (props.sights === true) ? "sights" : (props.culinary === true) ? "culinary" : "insidertip";
        $("#center").append("<div class='" + color + " " + (pois[i]._radian.is_active ? color + "active" : " ") + "' id=" + pois[i]._radian.id + " style='left:" + (pois[i]._radian.x - 10) + "px;top:" + (pois[i]._radian.y - 10) + "px'></div>")
    }
}
// Public API
return {
    init: init
}
})();