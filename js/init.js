// long touch Event for Filter

var touchtimer, flagLock, touchduration = 200;
var onlongtouch = function() {
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




poiManager.init(database.db);
