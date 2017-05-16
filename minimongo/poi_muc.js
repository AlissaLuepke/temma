// JavaScript Document


var minimongo = require("minimongo");

var LocalDb = minimongo.MemoryDb;

var db = new LocalDb();

db.addCollection("Muc");

Feature = {
    "properties": {
        "title": "Meistersinger",
        "description": "",
        "sights": false,
        "insidertip": false,
        "culinary": true
    },
    "geometry": {
        "coordinates": [11.639609,48.157723],
        "type": "Point"
    }
};
db.Muc.upsert(Feature);

Wassertürme_am_Roten_Tor = {
		"properties" : {
			"title" : "Wassertürme am Roten Tor",
			"description" : "",
			"sights" : true,
			"insidertip" : false,
			"culinary" : false
		},
		"geometry" : {
			"coordinates" : [ 10.90361, 48.36011 ],
			"type" : "Point"
		}
	};
	db.Muc.upsert(Wassertürme_am_Roten_Tor);

test = {
	    "properties": {
	        "title": "Meistersinger",
	        "description": "",
	        "sights": false,
	        "insidertip": false,
	        "culinary": true
	    },
	    "geometry": {
	        "coordinates": [11.641247,48.160401],
	        "type": "Point"
	    }
	};
	db.Muc.upsert(test);
	Weberhaus = {
			"properties" : {
				"title" : "Weberhaus",
				"description" : "",
				"sights" : true,
				"insidertip" : false,
				"culinary" : false
			},
			"geometry" : {
				"coordinates" : [ 10.897927, 48.367371 ],
				"type" : "Point"
			}
		};
		db.Muc.upsert(Weberhaus);
		
		Rotes_Tor = {
				"properties" : {
					"title" : "Rotes Tor",
					"description" : "",
					"sights" : true,
					"insidertip" : false,
					"culinary" : false
				},
				"geometry" : {
					"coordinates" : [ 10.90309, 48.359906 ],
					"type" : "Point"
				}
			};
			db.Muc.upsert(Rotes_Tor);
			
			Ratskirche_und_Elias_Holl_Platz = {
					"properties" : {
						"title" : "Ratskirche und Elias Holl Platz",
						"description" : "",
						"sights" : true,
						"insidertip" : false,
						"culinary" : false
					},
					"geometry" : {
						"coordinates" : [ 10.899226, 48.368718 ],
						"type" : "Point"
					}
				};
				db.Muc.upsert(Ratskirche_und_Elias_Holl_Platz);

DM = {
    "properties": {
        "title": "DM",
        "description": "",
        "sights": false,
        "insidertip":true,
        "culinary": false
    },
    "geometry": {
        "coordinates": [11.643121, 48.159309],
        "type": "Point"
    }
}; 
db.Muc.upsert(DM);

Schule = {
	    "properties": {
	        "title": "DM",
	        "description": "",
	        "sights": true,
	        "insidertip": false,
	        "culinary": false
	    },
	    "geometry": {
	        "coordinates": [11.639984,48.162806],
	        "type": "Point"
	    }
	};
	db.Muc.upsert(Schule);

/*Schwibbogengasse = {
		"properties" : {
			"title" : "Schwibbogengasse",
			"description" : "",
			"sights" : false,
			"insidertip" : true,
			"culinary" : false
		},
		"geometry" : {
			"coordinates" : [ 10.90418, 48.362355 ],
			"type" : "Point"
		}
	};
	db.Muc.upsert(Schwibbogengasse);

	Theater_Augsburg = {
		"properties" : {
			"title" : "Theater Augsburg",
			"description" : "",
			"sights" : true,
			"insidertip" : false,
			"culinary" : false
		},
		"geometry" : {
			"coordinates" : [ 10.892633, 48.37007 ],
			"type" : "Point"
		}
	};
	db.Muc.upsert(Theater_Augsburg);

	Kathan_Haus = {
		"properties" : {
			"title" : "Kathan-Haus",
			"description" : "",
			"sights" : false,
			"insidertip" : true,
			"culinary" : false
		},
		"geometry" : {
			"coordinates" : [ 10.898266, 48.36432 ],
			"type" : "Point"
		}
	};
	db.Muc.upsert(Kathan_Haus);

	Neue_Galerie_im_Höhmannhaus = {
		"properties" : {
			"title" : "Neue Galerie im Höhmannhaus",
			"description" : "",
			"sights" : true,
			"insidertip" : false,
			"culinary" : false
		},
		"geometry" : {
			"coordinates" : [ 10.899350, 48.364980 ],
			"type" : "Point"
		}
	};
	db.Muc.upsert(Neue_Galerie_im_Höhmannhaus);

	Schätzlerpalais = {
		"properties" : {
			"title" : "Schätzlerpalais",
			"description" : "",
			"sights" : true,
			"insidertip" : false,
			"culinary" : false
		},
		"geometry" : {
			"coordinates" : [ 10.899290, 48.365000 ],
			"type" : "Point"
		}
	};
	db.Muc.upsert(Schätzlerpalais);
	*/


//export db;