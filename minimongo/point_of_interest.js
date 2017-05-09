// JavaScript Document


var minimongo = require("minimongo");

var LocalDb = minimongo.MemoryDb;

var db = new LocalDb();

db.addCollection("POI");

Feature = {
    "properties": {
        "title": "Stadtmarkt",
        "description": "",
        "sights": true,
        "insidertip": false,
        "culinary": true
    },
    "geometry": {
        "coordinates": [10.895053, 48.368268],
        "type": "Point"
    }
};
db.POI.upsert(Feature);

Fischmarkt = {
    "properties": {
        "title": "Fischmarkt",
        "description": "",
        "sights": true,
        "insidertip": false,
        "culinary": false
    },
    "geometry": {
        "coordinates": [10.898322, 48.369025],
        "type": "Point"
    }
};
db.POI.upsert(Fischmarkt);

Rotes_Tor = {
    "properties": {
        "title": "Rotes Tor",
        "description": "",
        "sights": true,
        "insidertip": false,
        "culinary": false
    },
    "geometry": {
        "coordinates": [10.90309, 48.359906],
        "type": "Point"
    }
};
db.POI.upsert(Rotes_Tor);

Wassertürme_am_Roten_Tor = {
    "properties": {
        "title": "Wassertürme am Roten Tor",
        "description": "",
        "sights": true,
        "insidertip": false,
        "culinary": false
    },
    "geometry": {
        "coordinates": [10.90361, 48.36011],
        "type": "Point"
    }
};
db.POI.upsert(Wassertürme_am_Roten_Tor);

Weberhaus = {
    "properties": {
        "title": "Weberhaus",
        "description": "",
        "sights": true,
        "insidertip": false,
        "culinary": false
    },
    "geometry": {
        "coordinates": [10.897927, 48.367371],
        "type": "Point"
    }
};
db.POI.upsert(Weberhaus);

Merkurbrunnen = {
    "properties": {
        "title": "Merkurbrunnen",
        "description": "",
        "sights": true,
        "insidertip": false,
        "culinary": false
    },
    "geometry": {
        "coordinates": [10.898493, 48.36723],
        "type": "Point"
    }
};
db.POI.upsert(Merkurbrunnen);

Augsburger_Puppenkiste = {
    "properties": {
        "title": "Augsburger Puppenkiste",
        "description": "",
        "sights": true,
        "insidertip": false,
        "culinary": false
    },
    "geometry": {
        "coordinates": [10.90321, 48.36037],
        "type": "Point"
    }
};
db.POI.upsert(Augsburger_Puppenkiste);

Perlachturm = {
    "properties": {
        "title": "Perlachturm",
        "description": "",
        "sights": true,
        "insidertip": false,
        "culinary": false
    },
    "geometry": {
        "coordinates": [10.898538, 48.369203],
        "type": "Point"
    }
};
db.POI.upsert(Perlachturm);

St_Moritz = {
    "properties": {
        "title": "St. Moritz",
        "description": "",
        "sights": true,
        "insidertip": false,
        "culinary": false
    },
    "geometry": {
        "coordinates": [10.897938, 48.366924],
        "type": "Point"
    }
};
db.POI.upsert(St_Moritz);

Viktualienhalle = {
    "properties": {
        "title": "Viktualienhalle",
        "description": "",
        "sights": false,
        "insidertip": false,
        "culinary": true
    },
    "geometry": {
        "coordinates": [10.894998, 48.368058],
        "type": "Point"
    }
};
db.POI.upsert(Viktualienhalle);

Rathaus_Augsburg = {
    "properties": {
        "title": "Rathaus Augsburg",
        "description": "",
        "sights": true,
        "insidertip": false,
        "culinary": false
    },
    "geometry": {
        "coordinates": [10.898668, 48.368737],
        "type": "Point"
    }
};
db.POI.upsert(Rathaus_Augsburg);

Augustusbrunnen = {
    "properties": {
        "title": "Augustusbrunnen",
        "description": "",
        "sights": true,
        "insidertip": false,
        "culinary": false
    },
    "geometry": {
        "coordinates": [10.897815, 48.369132],
        "type": "Point"
    }
};
db.POI.upsert(Augustusbrunnen);

Alte_Komödie = {
    "properties": {
        "title": "Alte Komödie",
        "description": "",
        "sights": false,
        "insidertip": true,
        "culinary": false
    },
    "geometry": {
        "coordinates": [10.900804, 48.367206],
        "type": "Point"
    }
};
db.POI.upsert(Alte_Komödie);

Ratskirche_und_Elias_Holl_Platz = {
    "properties": {
        "title": "Ratskirche und Elias Holl Platz",
        "description": "",
        "sights": true,
        "insidertip": false,
        "culinary": false
    },
    "geometry": {
        "coordinates": [10.899226, 48.368718],
        "type": "Point"
    }
};
db.POI.upsert(Ratskirche_und_Elias_Holl_Platz);

Brunnen_am_Roten_Tor = {
    "properties": {
        "title": "Brunnen am Roten Tor",
        "description": "",
        "sights": false,
        "insidertip": true,
        "culinary": false
    },
    "geometry": {
        "coordinates": [10.9029, 48.359928],
        "type": "Point"
    }
};
db.POI.upsert(Brunnen_am_Roten_Tor);

Hotel_drei_Mohren = {
    "properties": {
        "title": "Hotel drei Mohren",
        "description": "",
        "sights": true,
        "insidertip": false,
        "culinary": false
    },
    "geometry": {
        "coordinates": [10.899016, 48.36552],
        "type": "Point"
    }
};
db.POI.upsert(Hotel_drei_Mohren);

König_von_Flandern = {
    "properties": {
        "title": "König von Flandern",
        "description": "",
        "sights": false,
        "insidertip": false,
        "culinary": true
    },
    "geometry": {
        "coordinates": [10.898161, 48.370015],
        "type": "Point"
    }
};
db.POI.upsert(König_von_Flandern);

Hans_Jakob_Fugger_Denkmal = {
    "properties": {
        "title": "Hans Jakob Fugger Denkmal",
        "description": "",
        "sights": true,
        "insidertip": false,
        "culinary": false
    },
    "geometry": {
        "coordinates": [10.896965, 48.367674],
        "type": "Point"
    }
};
db.POI.upsert(Hans_Jakob_Fugger_Denkmal);

Badstuben = {
    "properties": {
        "title": "Badstuben",
        "description": "",
        "sights": false,
        "insidertip": false,
        "culinary": true
    },
    "geometry": {
        "coordinates": [10.897771, 48.366078],
        "type": "Point"
    }
};
db.POI.upsert(Badstuben);

Domenikanerinnen_Kloster_St_Ursula = {
    "properties": {
        "title": "Domenikanerinnen Kloster St Ursula",
        "description": "",
        "sights": true,
        "insidertip": false,
        "culinary": false
    },
    "geometry": {
        "coordinates": [10.902533, 48.366222],
        "type": "Point"
    }
};
db.POI.upsert(Domenikanerinnen_Kloster_St_Ursula);

Vogeltor = {
    "properties": {
        "title": "Vogeltor",
        "description": "",
        "sights": true,
        "insidertip": false,
        "culinary": false
    },
    "geometry": {
        "coordinates": [10.903645, 48.366247],
        "type": "Point"
    }
};
db.POI.upsert(Vogeltor);

St_Antonius_Kapelle_Orthodoxe_Kirche = {
    "properties": {
        "title": "St Antonius Kapelle - Orthodoxe Kirche",
        "description": "",
        "sights": true,
        "insidertip": false,
        "culinary": false
    },
    "geometry": {
        "coordinates": [10.900117, 48.365806],
        "type": "Point"
    }
};
db.POI.upsert(St_Antonius_Kapelle_Orthodoxe_Kirche);

Heilig_Kreuz_Kirche = {
    "properties": {
        "title": "Heilig Kreuz Kirche",
        "description": "",
        "sights": true,
        "insidertip": false,
        "culinary": false
    },
    "geometry": {
        "coordinates": [10.891148, 48.372011],
        "type": "Point"
    }
};
db.POI.upsert(Heilig_Kreuz_Kirche);

Hoher_Dom_zu_Augsburg = {
    "properties": {
        "title": "Hoher Dom zu Augsburg",
        "description": "",
        "sights": true,
        "insidertip": false,
        "culinary": false
    },
    "geometry": {
        "coordinates": [10.896404, 48.372715],
        "type": "Point"
    }
};
db.POI.upsert(Hoher_Dom_zu_Augsburg);

Wasserrad_am_Schwallech = {
    "properties": {
        "title": "Wasserrad am Schwallech",
        "description": "",
        "sights": true,
        "insidertip": true,
        "culinary": false
    },
    "geometry": {
        "coordinates": [10.902672, 48.363819],
        "type": "Point"
    }
};
db.POI.upsert(Wasserrad_am_Schwallech);

Gerberei_Lederbekleidung = {
    "properties": {
        "title": "Gerberei Lederbekleidung",
        "description": "",
        "sights": false,
        "insidertip": true,
        "culinary": false
    },
    "geometry": {
        "coordinates": [10.901431, 48.366023],
        "type": "Point"
    }
};
db.POI.upsert(Gerberei_Lederbekleidung);

Mittlerer_Lechsteg = {
    "properties": {
        "title": "Mittlerer Lechsteg",
        "description": "",
        "sights": false,
        "insidertip": true,
        "culinary": false
    },
    "geometry": {
        "coordinates": [10.90009, 48.370163],
        "type": "Point"
    }
};
db.POI.upsert(Mittlerer_Lechsteg);

Kunstverein_Augsburg = {
    "properties": {
        "title": "Kunstverein Augsburg",
        "description": "",
        "sights": false,
        "insidertip": true,
        "culinary": false
    },
    "geometry": {
        "coordinates": [10.901251, 48.366844],
        "type": "Point"
    }
};
db.POI.upsert(Kunstverein_Augsburg);

Paritätisches_Hospiz = {
    "properties": {
        "title": "Paritätisches Hospiz",
        "description": "",
        "sights": false,
        "insidertip": true,
        "culinary": false
    },
    "geometry": {
        "coordinates": [10.903848, 48.361012],
        "type": "Point"
    }
};
db.POI.upsert(Paritätisches_Hospiz);

Privates_Hinterho_Gärtchen = {
    "properties": {
        "title": "Privates Hinterhof Gärtchen",
        "description": "",
        "sights": false,
        "insidertip": true,
        "culinary": false
    },
    "geometry": {
        "coordinates": [10.900272, 48.365817],
        "type": "Point"
    }
};
db.POI.upsert(Privates_Hinterho_Gärtchen);

Amtsgericht_Augsburg = {
    "properties": {
        "title": "Amtsgericht Augsburg",
        "description": "",
        "sights": true,
        "insidertip": false,
        "culinary": false
    },
    "geometry": {
        "coordinates": [10.892354, 48.369048],
        "type": "Point"
    }
};
db.POI.upsert(Amtsgericht_Augsburg);

Knabenschule = {
    "properties": {
        "title": "Knabenschule",
        "description": "",
        "sights": true,
        "insidertip": true,
        "culinary": false
    },
    "geometry": {
        "coordinates": [10.899474, 48.364321],
        "type": "Point"
    }
};
db.POI.upsert(Knabenschule);

Zeughaus = {
    "properties": {
        "title": "Zeughaus",
        "description": "",
        "sights": true,
        "insidertip": false,
        "culinary": false
    },
    "geometry": {
        "coordinates": [10.89652, 48.366177],
        "type": "Point"
    }
};
db.POI.upsert(Zeughaus);

Maria_Stern_Klosterkirche = {
    "properties": {
        "title": "Maria Stern Klosterkirche",
        "description": "",
        "sights": true,
        "insidertip": false,
        "culinary": false
    },
    "geometry": {
        "coordinates": [10.899954, 48.368773],
        "type": "Point"
    }
};
db.POI.upsert(Maria_Stern_Klosterkirche);

Hofgarten = {
    "properties": {
        "title": "Hofgarten",
        "description": "",
        "sights": false,
        "insidertip": true,
        "culinary": false
    },
    "geometry": {
        "coordinates": [10.893656, 48.372135],
        "type": "Point"
    }
};
db.POI.upsert(Hofgarten);

Predigerkloster = {
    "properties": {
        "title": "Predigerkloster",
        "description": "",
        "sights": true,
        "insidertip": false,
        "culinary": false
    },
    "geometry": {
        "coordinates": [10.90075, 48.36605],
        "type": "Point"
    }
};
db.POI.upsert(Predigerkloster);

Alte_Metzgerschule = {
    "properties": {
        "title": "Alte Metzgerschule",
        "description": "",
        "sights": true,
        "insidertip": false,
        "culinary": false
    },
    "geometry": {
        "coordinates": [10.899428, 48.369703],
        "type": "Point"
    }
};
db.POI.upsert(Alte_Metzgerschule);

Maximilianmuseum = {
    "properties": {
        "title": "Maximilianmuseum",
        "description": "Maximilianmuseum",
        "sights": true,
        "insidertip": false,
        "culinary": false
    },
    "geometry": {
        "coordinates": [10.896809, 48.367923],
        "type": "Point"
    }
};
db.POI.upsert(Maximilianmuseum);

Schäfflerei = {
    "properties": {
        "title": "Schäfflerei",
        "description": "",
        "sights": false,
        "insidertip": true,
        "culinary": false
    },
    "geometry": {
        "coordinates": [10.903557, 48.362876],
        "type": "Point"
    }
};
db.POI.upsert(Schäfflerei);

Rokokosaal_der_Regierung_von_Schwaben = {
    "properties": {
        "title": "Rokokosaal der Regierung von Schwaben",
        "description": "",
        "sights": true,
        "insidertip": false,
        "culinary": false
    },
    "geometry": {
        "coordinates": [10.894317, 48.371702],
        "type": "Point"
    }
};
db.POI.upsert(Rokokosaal_der_Regierung_von_Schwaben);

Gasthaus_Bauerntanz = {
    "properties": {
        "title": "Gasthaus Bauerntanz",
        "description": "",
        "sights": false,
        "insidertip": false,
        "culinary": true
    },
    "geometry": {
        "coordinates": [10.90054, 48.367425],
        "type": "Point"
    }
};
db.POI.upsert(Gasthaus_Bauerntanz);

Staats_und_Stadtbibliothek = {
    "properties": {
        "title": "Staats und Stadtbibliothek",
        "description": "",
        "sights": false,
        "insidertip": true,
        "culinary": false
    },
    "geometry": {
        "coordinates": [10.890553, 48.369525],
        "type": "Point"
    }
};
db.POI.upsert(Staats_und_Stadtbibliothek);

Schwibbogengasse = {
    "properties": {
        "title": "Schwibbogengasse",
        "description": "",
        "sights": false,
        "insidertip": true,
        "culinary": false
    },
    "geometry": {
        "coordinates": [10.90418, 48.362355],
        "type": "Point"
    }
};
db.POI.upsert(Schwibbogengasse);

Theater_Augsburg = {
    "properties": {
        "title": "Theater Augsburg",
        "description": "",
        "sights": true,
        "insidertip": false,
        "culinary": false
    },
    "geometry": {
        "coordinates": [10.892633, 48.37007],
        "type": "Point"
    }
};
db.POI.upsert(Theater_Augsburg);

Kathan_Haus = {
    "properties": {
        "title": "Kathan-Haus",
        "description": "",
        "sights": false,
        "insidertip": true,
        "culinary": false
    },
    "geometry": {
        "coordinates": [10.898266, 48.36432],
        "type": "Point"
    }
};
db.POI.upsert(Kathan_Haus);

Neue_Galerie_im_Höhmannhaus = {
    "properties": {
        "title": "Neue Galerie im Höhmannhaus",
        "description": "",
        "sights": true,
        "insidertip": false,
        "culinary": false
    },
    "geometry": {
        "coordinates": [10.899350, 48.364980],
        "type": "Point"
    }
};
db.POI.upsert(Neue_Galerie_im_Höhmannhaus);

Schätzlerpalais = {
    "properties": {
        "title": "Schätzlerpalais",
        "description": "",
        "sights": true,
        "insidertip": false,
        "culinary": false
    },
    "geometry": {
        "coordinates": [10.899290, 48.365000],
        "type": "Point"
    }
};
db.POI.upsert(Schätzlerpalais);

St_Ulrich_und_Afra = {
    "properties": {
        "title": "St. Ulrich und Afra",
        "description": "",
        "sights": true,
        "insidertip": false,
        "culinary": false
    },
    "geometry": {
        "coordinates": [10.900403, 48.361592],
        "type": "Point"
    }
};
db.POI.upsert(St_Ulrich_und_Afra);

Stadtpalast_der_Fugger = {
    "properties": {
        "title": "Stadtpalast der Fugger",
        "description": "",
        "sights": true,
        "insidertip": false,
        "culinary": false
    },
    "geometry": {
        "coordinates": [10.898861, 48.366053],
        "type": "Point"
    }
};
db.POI.upsert(Stadtpalast_der_Fugger);

Wollmarkt = {
    "properties": {
        "title": "Wollmarkt (Innenhof St. Margareth)",
        "description": "",
        "sights": false,
        "insidertip": true,
        "culinary": false
    },
    "geometry": {
        "coordinates": [10.902951, 48.361772],
        "type": "Point"
    }
};
db.POI.upsert(Wollmarkt);

//export db;