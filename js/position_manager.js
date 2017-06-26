"use strict";
var positionManager = (function () {
    var _watchPosition_options = {
        enableHighAccuracy: true
        , maximumAge: 300000
        , timeout: 27000
    };
    
    
    var DEBUG = true;
    var _success_functions = [];
    var _error_functions = [];
    var _debug_fake_positions = [{
            latitude: 48.15961
            , longitude: 11.64087
            , heading: 200
            , is_heading_accurate: true
    },{
            latitude: 48.159680 
            , longitude: 11.641373
            , heading: 220
            , is_heading_accurate: true
    },{
            latitude: 48.159744 
            , longitude: 11.641981
            , heading: 250
            , is_heading_accurate: true
    }

    ];
    var _current_position = null;
    var _last_position = null;

    function init() {
        if (DEBUG)
        // eigene Implemenierung
        {
            window.setInterval(function () {
                _last_position = _current_position;
                _current_position = {
                    latitude: 48.15961
                    , longitude: 11.64087
                    , heading: 0
                    , is_heading_accurate: true
                };
                _call_success_functions(_current_position);
            }, 1000);
        }
        else {
            //console.log("positionmanager");
            navigator.geolocation.watchPosition(_event_watchPosition, _event_errorPosition, _watchPosition_options);
        }
    }

    function register(success, error) {
        if (!!success) {
            _success_functions.push(success);
        }
        if (!!error) {
            _error_functions.push(error);
        }
    }
    //Überwachung der Position 
    function _event_watchPosition(pos) {
       
        var crd = pos.coords;
        _last_position = _current_position;
        //eigene Parameter
        _current_position = {
            latitude: crd.latitude
            , longitude: crd.longitude
            , heading: crd.heading
            , accuracy: crd.accuracy
            , is_heading_accurate: true
        };
       
        if (!_last_position) {
            _call_success_functions(_current_position);
        }
        else {
            var d = getDistance.calculate(crd.latitude, crd.longitude, _last_position.latitude, _last_position.longitude);
            if (d > 0) { //20
                _call_success_functions(_current_position);
            }
        }
    }

    function _call_success_functions(pos) {
        for (var i = 0; i < _success_functions.length; i++) {
            //console.log("sucessfull");
            _success_functions[i](pos);
        }
    }

    function _call_error_functions(err) {
        for (var i = 0; i < _error_functions.length; i++) {
            _error_functions[i](err);
        }
    }

    function _event_errorPosition(err) {
        $('#divGeoWait').show();
        
           
        _last_position = null;
        _current_position = null;
        _call_error_functions(err);
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