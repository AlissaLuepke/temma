"use strict";
var positionManager = (function () {
    var _watchPosition_options = {
        enableHighAccuracy: true
        , maximumAge: 300000
        , timeout: 27000
    };
    var _debug_fake_positions = [

    ];
    var _current_position = null;

    function init() {
        if (DEBUG)
        // eigene Implemenierung
        {
            window.setTimeout(_fake_next_position, 1000);
        }
        else {
            navigator.geolocation.watchPosition(_event_watchPosition, _event_errorPosition _watchPosition_options);
        }
    }

    function register(success, error) {}
    //Überwachung der Position 
    function _event_watchPosition(pos) {
        
        //eigene Parameter
        _current_position = {
            lat: "latitude"
            , lon: "longitude"
            , heading: "heading"
            , is_heading_accurate: false
         };
        
        
        $('#divGeoWait').hide();
        
        
        
        var crd = pos.coords;
        if (typeof lat1 == "undefined" && typeof lon1 == "undefined") {
            call_success_functions(_current_position);
        }
        else {
            var d = getDistance.calculate(crd.latitude, crd.longitude, lat1, lon1);
            if (d > 20) { //20
                call_success_functions(_current_position);
            }
        }
    }

    function _event_errorPosition(err) {
        _current_position = null;
        call_error_functions(err);
    }
    // Public API
    return {
        init: init
        , register: register
        , get: function () {
            return _current_position;
        }
    }
})();