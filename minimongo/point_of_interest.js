// JavaScript Document
var database = (function () {
    var minimongo = require("minimongo");
    var LocalDb = minimongo.MemoryDb;
    var db = new LocalDb();
    db.addCollection("POI");
    var _pois = [
        {
            "properties": {
                "title": "Stadtmarkt",
                "s_description": "",
                "l_description": "",
                "sights": true,
                "insidertip": false,
                "culinary": true,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.895053, 48.368268],
                "type": "Point"
            }
            },

        {
            "properties": {
                "title": "Fischmarkt",
                "s_description": "",
                "l_description": "",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.898322, 48.369025],
                "type": "Point"
            }
            },

        {
            "properties": {
                "title": "Rotes Tor",
                "s_description": "",
                "l_description": "",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.90309, 48.359906],
                "type": "Point"
            }
            },

        {
            "properties": {
                "title": "Wassertürme am Roten Tor",
                "s_description": "",
                "l_description": "",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.90361, 48.36011],
                "type": "Point"
            }
            },

        {
            "properties": {
                "title": "Weberhaus",
                "s_description": "",
                "l_description": "",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.897927, 48.367371],
                "type": "Point"
            }
            },

        {
            "properties": {
                "title": "Merkurbrunnen",
                "s_description": "",
                "l_description": "",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.898493, 48.36723],
                "type": "Point"
            }
            },

        {
            "properties": {
                "title": "Augsburger Puppenkiste",
                "s_description": "",
                "l_description": "",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.90321, 48.36037],
                "type": "Point"
            }
            },

        {
            "properties": {
                "title": "Perlachturm",
                "s_description": "",
                "l_description": "",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.898538, 48.369203],
                "type": "Point"
            }
            },

        {
            "properties": {
                "title": "St. Moritz",
                "s_description": "",
                "l_description": "",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.897938, 48.366924],
                "type": "Point"
            }
            },

        {
            "properties": {
                "title": "Viktualienhalle",
                "s_description": "",
                "l_description": "",
                "sights": false,
                "insidertip": false,
                "culinary": true,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.894998, 48.368058],
                "type": "Point"
            }
            },

        {
            "properties": {
                "title": "Rathaus Augsburg",
                "s_description": "",
                "l_description": "",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.898668, 48.368737],
                "type": "Point"
            }
            },

        {
            "properties": {
                "title": "Augustusbrunnen",
                "s_description": "",
                "l_description": "",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.897815, 48.369132],
                "type": "Point"
            }
            },

        {
            "properties": {
                "title": "Alte Komödie",
                "s_description": "",
                "l_description": "",
                "sights": false,
                "insidertip": true,
                "culinary": false,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.900804, 48.367206],
                "type": "Point"
            }
            },

        {
            "properties": {
                "title": "Ratskirche und Elias Holl Platz",
                "s_description": "",
                "l_description": "",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.899226, 48.368718],
                "type": "Point"
            }
            },

        {
            "properties": {
                "title": "Brunnen am Roten Tor",
                "s_description": "",
                "l_description": "",
                "sights": false,
                "insidertip": true,
                "culinary": false,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.9029, 48.359928],
                "type": "Point"
            }
            },

        {
            "properties": {
                "title": "Hotel drei Mohren",
                "s_description": "",
                "l_description": "",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.899016, 48.36552],
                "type": "Point"
            }
            },

        {
            "properties": {
                "title": "König von Flandern",
                "s_description": "",
                "l_description": "",
                "sights": false,
                "insidertip": false,
                "culinary": true,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.898161, 48.370015],
                "type": "Point"
            }
            },

        {
            "properties": {
                "title": "Hans Jakob Fugger Denkmal",
                "s_description": "",
                "l_description": "",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.896965, 48.367674],
                "type": "Point"
            }
            },

        {
            "properties": {
                "title": "Badstuben",
                "s_description": "",
                "l_description": "",
                "sights": false,
                "insidertip": false,
                "culinary": true,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.897771, 48.366078],
                "type": "Point"
            }
            },

        {
            "properties": {
                "title": "Domenikanerinnen Kloster St Ursula",
                "s_description": "",
                "l_description": "",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.902533, 48.366222],
                "type": "Point"
            }
            },

        {
            "properties": {
                "title": "Vogeltor",
                "s_description": "",
                "l_description": "",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.903645, 48.366247],
                "type": "Point"
            }
            },

        {
            "properties": {
                "title": "St Antonius Kapelle - Orthodoxe Kirche",
                "s_description": "",
                "l_description": "",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.900117, 48.365806],
                "type": "Point"
            }
            },

        {
            "properties": {
                "title": "Heilig Kreuz Kirche",
                "s_description": "",
                "l_description": "",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.891148, 48.372011],
                "type": "Point"
            }
            },

        {
            "properties": {
                "title": "Hoher Dom zu Augsburg",
                "s_description": "",
                "l_description": "",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.896404, 48.372715],
                "type": "Point"
            }
            },

        {
            "properties": {
                "title": "Wasserrad am Schwallech",
                "s_description": "",
                "l_description": "",
                "sights": true,
                "insidertip": true,
                "culinary": false,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.902672, 48.363819],
                "type": "Point"
            }
            },

        {
            "properties": {
                "title": "Gerberei Lederbekleidung",
                "s_description": "",
                "l_description": "",
                "sights": false,
                "insidertip": true,
                "culinary": false,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.901431, 48.366023],
                "type": "Point"
            }
            },

        {
            "properties": {
                "title": "Mittlerer Lechsteg",
                "s_description": "",
                "l_description": "",
                "sights": false,
                "insidertip": true,
                "culinary": false,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.90009, 48.370163],
                "type": "Point"
            }
            },

        {
            "properties": {
                "title": "Kunstverein Augsburg",
                "s_description": "",
                "l_description": "",
                "sights": false,
                "insidertip": true,
                "culinary": false,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.901251, 48.366844],
                "type": "Point"
            }
            },

        {
            "properties": {
                "title": "Paritätisches Hospiz",
                "s_description": "",
                "l_description": "",
                "sights": false,
                "insidertip": true,
                "culinary": false,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.903848, 48.361012],
                "type": "Point"
            }
            },

        {
            "properties": {
                "title": "Privates Hinterhof Gärtchen",
                "s_description": "",
                "l_description": "",
                "sights": false,
                "insidertip": true,
                "culinary": false,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.900272, 48.365817],
                "type": "Point"
            }
            },

        {
            "properties": {
                "title": "Amtsgericht Augsburg",
                "s_description": "",
                "l_description": "",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.892354, 48.369048],
                "type": "Point"
            }
            },

        {
            "properties": {
                "title": "Knabenschule",
                "description": "",
                "l_description": "",
                "sights": true,
                "insidertip": true,
                "culinary": false,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.899474, 48.364321],
                "type": "Point"
            }
            },

        {
            "properties": {
                "title": "Zeughaus",
                "s_description": "",
                "l_description": "",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.89652, 48.366177],
                "type": "Point"
            }
            },

        {
            "properties": {
                "title": "Maria Stern Klosterkirche",
                "s_description": "",
                "l_description": "",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.899954, 48.368773],
                "type": "Point"
            }
            },

        {
            "properties": {
                "title": "Hofgarten",
                "s_description": "",
                "l_description": "",
                "sights": false,
                "insidertip": true,
                "culinary": false,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.893656, 48.372135],
                "type": "Point"
            }
            },

        {
            "properties": {
                "title": "Predigerkloster",
                "s_description": "",
                "l_description": "",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.90075, 48.36605],
                "type": "Point"
            }
            },

        {
            "properties": {
                "title": "Alte Metzgerschule",
                "s_description": "",
                "l_description": "",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.899428, 48.369703],
                "type": "Point"
            }
            },

        {
            "properties": {
                "title": "Maximilianmuseum",
                "s_description": "Maximilianmuseum",
                "l_description": "",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.896809, 48.367923],
                "type": "Point"
            }
            },

        {
            "properties": {
                "title": "Schäfflerei",
                "s_description": "",
                "l_description": "",
                "sights": false,
                "poi_img ": "",
                "insidertip": true,
                "culinary": false,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.903557, 48.362876],
                "type": "Point"
            }
            },

        {
            "properties": {
                "title": "Rokokosaal der Regierung von Schwaben",
                "s_description": "",
                "l_description": "",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.894317, 48.371702],
                "type": "Point"
            }
            },

        {
            "properties": {
                "title": "Gasthaus Bauerntanz",
                "s_description": "",
                "l_description": "",
                "sights": false,
                "insidertip": false,
                "culinary": true,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.90054, 48.367425],
                "type": "Point"
            }
            },

        {
            "properties": {
                "title": "Staats und Stadtbibliothek",
                "s_description": "",
                "l_description": "",
                "sights": false,
                "insidertip": true,
                "culinary": false,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.890553, 48.369525],
                "type": "Point"
            }
            },

        {
            "properties": {
                "title": "Schwibbogengasse",
                "s_description": "",
                "l_description": "",
                "sights": false,
                "insidertip": true,
                "culinary": false,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.90418, 48.362355],
                "type": "Point"
            }
            },

        {
            "properties": {
                "title": "Theater Augsburg",
                "s_description": "",
                "l_description": "",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.892633, 48.37007],
                "type": "Point"
            }
            },

        {
            "properties": {
                "title": "Kathan-Haus",
                "s_description": "",
                "l_description": "",
                "sights": false,
                "insidertip": true,
                "culinary": false,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.898266, 48.36432],
                "type": "Point"
            }
            },

        {
            "properties": {
                "title": "Neue Galerie im Höhmannhaus",
                "s_description": "",
                "l_description": "",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.899350, 48.364980],
                "type": "Point"
            }
            },

        {
            "properties": {
                "title": "Schätzlerpalais",
                "s_description": "",
                "l_description": "",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.899290, 48.365000],
                "type": "Point"
            }
            },

        {
            "properties": {
                "title": "St. Ulrich und Afra",
                "s_description": "",
                "l_description": "",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.900403, 48.361592],
                "type": "Point"
            }
            },

        {
            "properties": {
                "title": "Stadtpalast der Fugger",
                "s_description": "",
                "l_description": "",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.898861, 48.366053],
                "type": "Point"
            }
            },

        {
            "properties": {
                "title": "Wollmarkt (Innenhof St. Margareth)",
                "s_description": "",
                "l_description": "",
                "sights": false,
                "insidertip": true,
                "culinary": false,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.902951, 48.361772],
                "type": "Point"
            }
            }
        , {
            "properties": {
                "title": "Meistersinger",
                "description": "",
                "sights": false,
                "insidertip": false,
                "culinary": true,
                "poi_img": "02_Schwein-Blume.jpg"
            },
            "geometry": {
                "coordinates": [11.639609, 48.157723],
                "type": "Point"
            }
            },
        {
            "properties": {
                "title": "DM",
                "description": "",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": "04_Cafeteria_Rotes_Tor.jpg"
            },
            "geometry": {
                "coordinates": [11.639984, 48.162806],
                "type": "Point"
            }
        },
        {
            "properties": {
                "title": "DM",
                "description": "",
                "sights": false,
                "insidertip": true,
                "culinary": false,
                "poi_img": "DSC_5191.jpg"
            },
            "geometry": {
                "coordinates": [11.637035, 48.161222],
                "type": "Point"
            }
        },
        {
            "properties": {
                "title": "nähe uni",
                "description": "",
                "sights": false,
                "insidertip": true,
                "culinary": false,
                "poi_img": ""
            },
            "geometry": {
                "coordinates": [10.908508, 48.357167],
                "type": "Point"
            }
        },
        {
            "properties": {
                "title": "Alt Athen",
                "s_description": "Grichisches Restaurant",
                "l_description": "Restaurant Öffnungszeiten: Di-Fr, So: 11:00-14:00 17:30-24:00 Sa:17:30-24:00 Mo: Ruhetag",
                "sights": false,
                "insidertip": false,
                "culinary": true,
                "poi_img": "PointImgs\Test-Route-HSA/AltAthen.png"
            },
            "geometry": {
                "coordinates": [10.9065143, 48.3564486],
                "type": "Point"
            }
        },
        {
            "properties": {
                "title": "Finas",
                "s_description": "Scene bar",
                "l_description": "Finas Cafe/Bar/Restaurant Öffnungszeiten: Mo,Di,Do,Fr: 11:30-01:00 Mi: 09:00-24:00 Sa:14:00-01:00",
                "sights": false,
                "insidertip": false,
                "culinary": true,
                "poi_img": "PointImgs/Test-Route-HSA/Finas.png"
            },
            "geometry": {
                "coordinates": [10.9025668, 48.3551092],
                "type": "Point"
            }
            },
        {
            "properties": {
                "title": "Glücksbach",
                "s_description": "aka Brunnenlech",
                "l_description": "Glücksbach Kanalbau: 1999 Beliebter Ort für studentisches Treiben. Studenten werfen vor Klausuren gerne einen Glückspfennig in den Bach",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": "PointImgs/Test-Route-HSA/Glücksbach.png"
            },
            "geometry": {
                "coordinates": [10.9041288, 48.3552360],
                "type": "Point"
            }
        },
        {
            "properties": {
                "title": "Flying Pig",
                "s_description": "Kunstwerk",
                "l_description": "Künstler: Robert Mayer Fertigstellung: 2010 Intention: Wer hoch hinaus will, muss fliegen lernen",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": "PointImgs/Test-Route-HSA/Kreis_02_Schwein-Blume.png"
            },
            "geometry": {
                "coordinates": [10.9055179, 48.3585586],
                "type": "Point"
            }
        },
        {
            "properties": {
                "title": "Cafeteria",
                "s_description": "Fh Cafeteria",
                "l_description": "Cafeteria HSA Öffnungszeiten: Mo-Do: 07:30-16:30 Fr: 07:30-14:00 Sa/So: geschlossen",
                "sights": false,
                "insidertip": false,
                "culinary": true,
                "poi_img": "PointImgs/Test-Route-HSA/Kreis_04_Cafeteria_Rotes_Tor.png"
            },
            "geometry": {
                "coordinates": [10.9062763, 48.3584731],
                "type": "Point"
            }
        },
        {
            "properties": {
                "title": "Smoking Man",
                "s_description": "Graffiti",
                "l_description": "Künstler: Graffiti King Fertigstellung: 2016 Intention: Ist noch was zum rauchen da?",
                "sights": false,
                "insidertip": true,
                "culinary": false,
                "poi_img": "PointImgs/Test-Route-HSA/Kreis_05_Graffiti_Men.png"
            },
            "geometry": {
                "coordinates": [10.904621, 48.357507],
                "type": "Point"
            }
}];
    //for (var i = 0; i++; i < _pois.length) {
    db.POI.upsert(_pois);
    return {
        db: db.POI
    }
    //}
})();