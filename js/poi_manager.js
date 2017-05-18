"use strict";
var poiManager = (function () {
    var db,
        deg,
        lat1,
        lon1,
        currentObj;

    var cat = ["sights", "insidertip", "culinary"];
    var pois = [];

    var radians = [];
    var active_poi;
   
    var _watchPosition_options = {
        enableHighAccuracy: true,
        maximumAge: 300000,
        timeout: 27000
    };

    function init(_db) {
        db = _db;

        updatePOIS();

        navigator.geolocation.watchPosition(_event_watchPosition, function (err) {
            
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
    
    
    //Pois werden aus der Datenbank geholt
    // daten aus der datenbank werden durchgegangen 
    // Berechnungen werden durchgeführt
    function updatePOIS() {
        console.log("updatePOIS");
        db.find( /* TODO: filter by cat */ ).fetch(
            function (results) {
                //Leeren des globalen arrays wenn watch position wieder aufgerufen wird 

                pois = [];
                
                for (var i = 0; i < results.length; i++) {
                    // TODO: Description, Titel etc in poi._radian schreiben
                    var lat2 = results[i].geometry.coordinates[1];
                    var lon2 = results[i].geometry.coordinates[0];
                    var props = results[i].properties;
                    var id = results[i]._id;
                    var is_active = results[i]._id == active_poi;
                    var d = getDistance.calculate(lat1, lon1, lat2, lon2);
                    console.log("distance: " + d);

                    var coords = getBearing.calculate(lat1, lon1, lat2, lon2);
                    // Welche Punkte werden angezeigt - die in einbem bestimmten radius sind 
                    if (d < 500) {
                        // results POIS - werden in var poi geschrieben
                        // alle werte werden upgedatet
                       var poi = results[i];
                        poi._radian = {
                            angle: coords[3],
                            properties: props,
                            x: coords[0],
                            y: coords[1],
                            id: id,
                            is_active: is_active, //true oder false
                            distance: d
                        };

                        // in pois werden die daten von Poi reingeschrieben 
                        pois.push(poi);
                    };
                }
console.log(JSON.stringify(pois));
            },
            function (error) {
                console.log("ERROR")
            }
        );
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


    // rotation Clockwise und Counterclockwise
    function _event_rotaryEventHandler(e) {
        var index = -1,
            len = pois.length,
            index_change = 1,
            activeP;
         console.log("active1" + active_poi);


        if (e.detail.direction === "CCW") index_change = -1;

        pois.sort(function (a, b) {
            return a._radian.angle - b._radian.angle
        });

        activeP = getActivePoi();
        // wenn es noch keinen aktiven punkt gibt, dann soll der aktive auf den ersten wert im array gesetzt werden
        // wenn es einen gibt dann nimm diesen

        //deg = activeP != null ? activeP._radian.angle : pois[0]._radian.angle;
        currentObj = activeP != null ? activeP : pois[0];

        for (var i = 0; i < len; i++) {


            //if (pois[i]._radian.angle === deg) {
            if(pois[i]._radian.id === currentObj._radian.id ){
                index = i;
                pois[index]._radian.is_active = false;
                break;
            }
        }

        for (var i = 0; i < len; i++) {
            if (i === index) {
                var currentIndex = (index += pois.length + index_change) % pois.length;
                deg = pois[currentIndex]._radian.angle;
                pois[currentIndex]._radian.is_active = true;
                active_poi = pois[currentIndex];
                
            }
        }
        console.log("active2" + active_poi);
        redraw();

    }


    function getActivePoi() {
        console.log("Get active POI");
        if (!active_poi) return null;
        for (var i = 0; i < pois.length; i++) {
            if (pois[i]._radian._id == active_poi)
                return pois[i]
        }
    }

   

    function redraw() {
        redrawArrow();
        redrawPOIS();
    }

    function redrawArrow() {
        console.log("redraw Arrow");
        direction.style.transform = 'rotate(' + deg + 'deg)';
    }
    
    

    
    function redrawPOIS() {
        console.log("redrawPOIS");
        $('#center').empty();
        
        
        var len = pois.length;
            
        
        for (var i = 0; i < len; i++) {
            //pois[]._radian in var schreiben
            var props = pois[i]._radian.properties;
             var color = (props.sights === true) ? "sights" : (props.culinary === true) ? "culinary" : "insidertip";
            
             $("#center").append(
                "<div class='" + color + " " + (pois[i]._radian.is_active ? color + "active" : " ")+ "' id=" + pois[i]._radian.id + " style='left:" + (pois[i]._radian.x - 10) + "px;top:" + (pois[i]._radian.y - 10) + "px'></div>")
            }

           

        }

    
    // Public API
    return {
        init: init
    }
})();