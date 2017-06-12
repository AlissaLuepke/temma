"use strict";
var poiManager = (function () {
    var db, deg, o_deg, new_deg,  lat1, lon1, currentObj;
    var pois = [];
    var radians = [];
    var active_poi;
    
    
    
    
    
   
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