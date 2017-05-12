"use strict";

// Aufruf:
// selectPOIs.select();
// Auswahl der POIs

var selectPOIs = (function () {

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

						deg = radians[(index += radians.length + 1)
								% radians.length];
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


    // Public API
    return {

    	select: function(){
			return selectPOI();
		}

    }

})();







