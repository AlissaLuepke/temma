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



//export db;