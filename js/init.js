var mainpage = document.getElementById("main");
tau.event.enableGesture(mainpage, new tau.event.gesture.Swipe());
mainpage.addEventListener("swipe", function (e) {

    if (e.detail.direction == "left") {
        tau.changePage(document.getElementById("filterPage"));
    } else {
        tau.changePage(document.getElementById("settingsPage"));
    }
});

var filterpage = document.getElementById("filterPage");
// Rotary Event disable 


var settingspage = document.getElementById("settingsPage")
tau.event.enableGesture(settingspage, new tau.event.gesture.Swipe());
settingspage.addEventListener("swipe", function (e) {

    if (e.detail.direction == "left") {
        tau.changePage(document.getElementById("main"));
    }
});


var discardMessage = document.getElementById("pushMessage")
tau.event.enableGesture(discardMessage, new tau.event.gesture.Swipe());
discardMessage.addEventListener("swipe", function (e) {

    console.log("swipe direction = " + e.detail.direction);
    if (e.detail.direction == "right") {
        $("#pushMessage").fadeOut(600);
    }
});

$("#okButton").click(function () {

    tau.changePage(document.getElementById("main"));
});

$("#pushMessage").click(function () {

    tau.changePage(document.getElementById("pushPage"));
    $("#pushMessage").hide();

});


var pushPage = document.getElementById("pushPage")
tau.event.enableGesture(pushPage, new tau.event.gesture.Swipe());
pushPage.addEventListener("swipe", function (e) {

    if (e.detail.direction == "right") {

        tau.changePage(document.getElementById("main"));
    }
});


$("#center").click(function () {
    poiManager.picture();
    tau.event.disableGesture(mainpage);
    console.log("hey");
});
/*
$("#center").click(function () {
    $("#pushMessage").fadeIn(600);
    
});
*/
$('#image').click(function () {
    // $("#image").css("opacity", "0.6");
    $('#image').fadeOut(500);
});



$("#stumm").click(function () {

    if ($("#stumm").hasClass("stummactive")) {
        console.log("removeClass");
        $("#stumm").removeClass("stummactive");

    } else {
        console.log("addClass");
        $("#stumm").addClass("stummactive");
    }
});


//Klicken auf den Pfeil zum wieder Anzeigen des aktuellen Bildes
/*
$("#direction").click(function () {
    console.log("draw Picture");
  //  poiManager.picture();
    //Abfrage, ob schon ein aktives POI ausgewählt ist dann Bilder über allen (z-index: 9999) anzeigen
    
    // wenn noch keins ausgewählt ist:
    // Hinweis:
    // Es wurde noch kein POI ausgwählt. Wähle eins aus, um das Bild zu sehen
    
    
    
});*/






positionManager.init();
//notificationManager.message();
poiManager.init(database.db);