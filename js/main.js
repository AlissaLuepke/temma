
/* Pfeil drehen */
(function()
   {
	 
	 var deg = 0;
	 rotaryEventHandler = function(e){

	      if(e.detail.direction === "CW"){
	    	  deg = deg + 15;
	    	 
	      } if(e.detail.direction === "CCW"){
	    	  deg = deg - 15;
	      }
	      
	      direction.style.transform = 'rotate(' + deg + 'deg)';
	 }
	 
	 document.addEventListener("rotarydetent", rotaryEventHandler, false);

   }());


/*var items =20;

for(var i = 0; i < items; i++) {

    var x = 157.5 +157.5 * Math.cos(2 * Math.PI * i / items);
    var y = 157.5 + 157.5 * Math.sin(2 * Math.PI * i / items);   
    $("#center").append("<div class='point' style='left:"+ (x-10) +"px;top:"+ (y-10) +"px'></div>");    

}*/


/* Winkel von P1(Koordinate des Nutzers) zu P2(3,4,5,6 etc. Sehenswürdigkeiten) von Norden*/


/*var toRad = function (value) {
    return value * Math.PI / 180;
  };
  
 var toDeg = function (value) {
    return value * 180 / Math.PI;
  };*/
  
 
/* console.log("dlong: " + lat1);
    console.log("lat2 " + lat[i]);
    console.log("lon2 " + lon[i]);
    //*/

var lat1= 48.366177;
var lon1= 10.89652;
/*var lat= [48.364321 , 48.364321];
var lon= [10.899474 , 10.89652];*/
var lat= [48.364321 , 48.364321];
var lon= [10.899474 , 10.89652];
var latlen = lat.length;
var lonlen = lon.length;
calculateBearing(lat1, lon1, lat, lon);

function calculateBearing() {
	lat1 = lat1* Math.PI/180;
	lon1 = lon1* Math.PI/180;
	
	for(i = 0; i < latlen && i< lonlen; i++){
	lat2 = lat[i]* Math.PI/180;
    lon2 = lon[i]* Math.PI/180;
    var dLon = lon2 - lon1;
    var y = Math.sin(dLon) * Math.cos(lat2);
    var x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
    console.log("x: " + x + " y: " +y);
    //var bearing = (Math.atan2(y, x))* 180/Math.PI;
    var bearing = (Math.atan2(y, x))* 180/Math.PI;
    console.log("bearing: " + bearing);
    bearing = (bearing + 360) % 360;
    console.log("bearing2: " + bearing);
    bearing = (bearing-90)*Math.PI/180;
    //return bearing;
    
    var x2 = Math.cos(bearing) * 157.5 + 157.5;
    var y2 = Math.sin(bearing) * 157.5 + 157.5;
    console.log("x2: " + x2 + " y2+ " + y2);
    $("#center").append("<div class='point' style='left:"+ (x2-10) +"px;top:"+ (y2-10) +"px'></div>");
	}};

   






/*var degree = 0;*/
$("#move").click(function calculateBearing() {
	
    /*console.log('I was clicked');
	degree = degree + 15;
	
	//move.style.transform = "rotate(7deg)";
	move.style.transform = 'rotate(' + degree + 'deg)';
	console.log(move.style.transform);
	move.style.transformOrigin = "top left 300px";
	console.log(move.style.transformOrigin);
	move.style.transitionDuration="0.5s";
	move.style.transform = 'translate(50px, 100px)';
	*/
});




var touchtimer, flagLock, touchduration = 200;

var onlongtouch = function() {
	console.log("long touch");
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






// /rotate

function rotatePoint(origin, point, angle) {
	var radians = angle * Math.PI / 180.0,
	cos = Math.cos(radians),
	sin = Math.sin(radians),
	dX = point.x - origin.x,
	dY = point.y - origin.y;

	return {
	x: cos * dX - sin * dY + origin.x,
	y: sin * dX + cos * dY + origin.y
	};
	}
// /device orientation

var alphaElem = document.getElementById("alpha");
var betaElem = document.getElementById("beta");
var gammaElem = document.getElementById("gamma");

window.addEventListener("deviceorientation", function(e) {
	alphaElem.innerHTML = 'alpha value ' + Math.round(e.alpha);
	betaElem.innerHTML = 'beta value ' + Math.round(e.beta);
	gammaElem.innerHTML = 'gamma value ' + Math.round(e.gamma);

}, true);

console.log("alpha" + alphaElem + "beta" + betaElem + "gamma" + gammaElem);