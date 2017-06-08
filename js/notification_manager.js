"use strict";
var notificationManager = (function () {
    function message(poi) {
        //Vibration ausführen für x Sekunden     
        function singleVibration() {
            /* Vibrate for 2 seconds */
            navigator.vibrate(1000);
        }
        
        // Kurze Vibration
        // TODO:
        // überlegen wie lang bzw. ob man ein bestimmtes Muster einführt
        
        singleVibration();
        // Push Benachrichtigung wird auf Main eingeblendet 
        // TODO:
        // - fade in 
        // - slide in 
        // länge
        $("#pushMessage").fadeIn(600);

       
        
        function notificationPicture() {
          
            // Bild auf Seite 1 
            // TODO: 
            // Alle Bilder in die Datenbank einpflegen
            var activeImage = poi[i]._radian.properties.poi_img;
            $('#notificationimage').html("<img  id='imgPOI' src='img/" + activeImage + "' alt='image'>"); 
            
            //$('#image').html("<img  id='imgPOIfront' src='img/DSC_5191.jpg' alt='image'>").fadeIn(500).show();
        }
        
        
        
        function notificationText(){
                   var props = poi[i]._radian.properties;
             var s_description = props.s_decription;
            var l_description = props.l_description;
            var title = props.title;
     
            
            //Title der im eingeblendeten DIV auf Main dargestellt wird
             $('#pushMessage').html("<p>"+title+"</p>");
            //Titel auf Seite:
            // - 1 mit Bild
            // - 2 mit Text
            // TODO:
            // - dynamische Farbe je nach Kategorie
           var color = (props.sights === true) ? "sightscolor" : (props.culinary === true) ? "culinarycolor" : "insidertipcolor";
            
             
         
            $('.notificationTitle').html("<p class='"+ +"'>" +title+"</p>");
            
            //Texte
            //Short Description und Long Description
            //für Seite 2 und 3
            $('#sDescription').html(s_description);
            $('#lDescription').html(l_description);
              
            
        }
    }
    // Public API
    return {
        message: message
    }
})();