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