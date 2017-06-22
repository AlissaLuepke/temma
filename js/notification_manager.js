"use strict";
var notificationManager = (function () {
    function message(poi) {
        
        //poi = null;
        //Vibration ausführen für x Sekunden     
        //function singleVibration() {
            /* Vibrate for 2 seconds */
          //  navigator.vibrate(1000);
        //}
        
        
    //    singleVibration();
       
        $("#pushMessage").fadeIn(600);
       
        
		function puschmessagenotification(){
		//alert("wird ausgeführt");
			var props = poi._radian.properties;
			var title = props.title;
			//$('#pushMessage').html("<p class=color:red;>"+title+"</p>");
		}
		puschmessagenotification();
        function notificationPicture() {
            // Bild auf Seite 1 
            // TODO: 
            // Alle Bilder in die Datenbank einpflegen
            var activeImage = poi._radian.properties.poi_img;
			//console.log("führt notificationP aus");
            $('.notificationimage').css("background-image", "url('img/" + activeImage + "')"); 
            
            //$('#image').html("<img  id='imgPOIfront' src='img/DSC_5191.jpg' alt='image'>").fadeIn(500).show();
        }
        notificationPicture();
        
        
        function notificationText(){
                   var props = poi._radian.properties;
             var s_description = props.s_decription;
            var l_description = props.l_description;
            var title = props.title;
            
            // - dynamische Farbe je nach Kategorie 
           var color = (props.sights === true) ? "sightsColor" : (props.culinary === true) ? "culinaryColor" : "insidertipColor";
            
            //Title der im eingeblendeten DIV auf Main dargestellt wird
             $('#pushMessage').html("<p class='"+color +"'>"+title+"</p>");
            
            //Titel auf Seite:
            // - 1 mit Bild
            // - 2 mit Text
            // TODO:
            
            $('.notificationTitle').html("<p class='"+color +"'>" +title+"</p>");
            //$('.notificationTitle').html("<p class='"+color +"'>hiertitel</p>");
            //Texte
            //Short Description und Long Description
            //für Seite 2 und 3
            //$('.sDescription').html("<p class=color:red;>" +s_description + "</p>");
            $('.lDescription').html(l_description);
			//$('#sDescription').html("<p class=color:red;>hier steht kurz was</p>");
            //$('#lDescription').html(l_description);
              
            
        }
        notificationText();
    }
    // Public API
    return {
        message: message
    };
})();