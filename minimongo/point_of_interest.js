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
                "l_description": "befindet sich zwischen der Anna- und der Fuggerstraße. Seit: 1930 Ein zentraler Markt scheiterte vor 1900 immer an der Platzfrage.",
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
                "l_description": "Der Markt befindet sich zwischen Sankt Peter und dem Rathaus. Seit: 1260 Genutzt als Richt- und Schandplatz bis ins 17. Jahrhundert.",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": "Fischmarkt2-2.jpg"
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
                "l_description": "Sicherung des Verkehrs von und nach Italien und Tirol. Seit: 1223 Das rote Tor wurde von Stadtbaumeister Elias Holl geschaffen.",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": "Rotes-Tor-2.jpg"
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
                "l_description": "die ersten Wassertürme Augsburgs. Seit: ab 1416 Sie sollten den Niveauunterschied zur Maximilianstraße ausgleichen.",
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
                "l_description": "diente es als Sitz der Weberzunft bis zu ihrer Auflösung 1548. Seit: 1389 Es war ein zentraler Punkt des mittelalterlichen Textilhandels.",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": "Weberhaus3-2.jpg"
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
                "l_description": "ein Augsburger Prachtbrunnen. Seit: 16. Jh. Er ist nach Merkur, dem römischen Gott des Handels, benannt.",
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
                "l_description": "so wird das im Heilig-Geist-Spital untergebrachte Marionettentheater genannt. Seit: 1948 Sie erlangte seit 1953 durch Fernsehproduktionen bundesweite Bekanntschaft.",
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
                "l_description": "ein Augsburger Turm, der die bürgerliche Mitte der Stadt bezeichnet. Seit: 989 Diente früher als Wachturm für Brände und Feindannäherungen.",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": "Perlachturm1-2.jpg"
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
                "l_description": "ist eine katholische Stadtpfarrkirche. Seit: 1019 Im Bombenhagel 1944 wurde die Kirche fast vollständig zerstört.",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": "St.-Moritz1-2.jpg"
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
                "l_description": "1000 m² große Halle und Abteilung des Stadtmarktes. Seit: 1929 Bestehend aus 13 Geschäften, sowie 8 internationalen Imbissständen.",
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
                "l_description": "gilt als wichtigster Profanbau der Renaissance nördlich der Alpen. Seit: 1385 Da es im Zweiten Weltkrieg zerstört wurde, ist es größtenteils eine Kopie.",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": "Rathaus1-2.jpg"
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
                "l_description": "einer der Augsburger Prachtbrunnen, erbaut zur 1600-Jahrfeier der Stadt. Seit: 1588 - 1594 Dies ist der älteste und figurenreichste der drei Augsburger Prachtbrunnen.",
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
                "l_description": "Auch bekannt als Gignoux Haus, benannt nach Anna Barbara Gignoux. Seit: 1764/1765 Es diente 1945 als Ausweichspielstätte für das im Krieg zerstörte Theater.",
                "sights": false,
                "insidertip": true,
                "culinary": false,
                "poi_img": "Alte-Komödie1-2.img"
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
                "l_description": "nach dem berühmten Augsburger Stadtbaumeister Elias Holl benannt. Seit: 1882 Hier steht das Elias-Holl-Denkmal und erinnert an dessen Werke.",
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
                "title": "Venezianischer Muschelbrunnen",
                "s_description": "",
                "l_description": "der Brunnen hat seinen Namen von seiner Muschelform. Seit: Mitte 16. Jh. (Spätrenaissance) Dieser Brunnen stammt vom Platz mit dem Denkmal des Colleoni.",
                "sights": false,
                "insidertip": true,
                "culinary": false,
                "poi_img": "Brunnen-am-roten-Tor-2.jpg"
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
                "l_description": "ein weit über Deutschland hinaus bekanntes Augsburger Hotel. Seit: 1495 Geschichte: benannt von Gastwirt Minner nach drei Mönchen aus Abessinien.",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": "Hotel-drei-Mohren-2.jpg"
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
                "l_description": "die kleinste Brauerei Augsburgs mit Bierlokal und bayerischem Restaurant. Seit: 1988 Seit dem 16. Jahrhundert wird hier das Drei-Heller-Bier gebraut.",
                "sights": false,
                "insidertip": false,
                "culinary": true,
                "poi_img": "König-von-Flandern1-2.jpg"
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
                "l_description": "Denkmal für Hans Jakob Fugger, ein Neffe von Jakob Fugger. Seit: 1857 Der Fugger verkaufte seine Bücher dem Münchner Hof.",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": "Hans-Jakob-Fugger-Denkmal1-2.jpg"
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
                "l_description": "zwei Räume in den Fuggerhäusern, die als Sammlungskabinette gebaut wurden. Seit: 1569 - 1571 Bauherr Hans Fugger lagerte hier seine Sammlung antiker Kuriosa.",
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
                "l_description": "Ein Kloster, das schon mehr als 700 Jahre existiert. Seit: 13. Jh. Sechs junge Frauen lebten hier anfangs in einer Art Beginengemeinschaft.",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": "Domenikanerinnen-Kloster-St.-Ursula2-2.jpg"
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
                "l_description": "ein Teil der ehemaligen Stadtmauer. Seit: 1445  Das Tor diente früher als Einlass in die Jakobervorstadt.",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": "Vogeltor2-2.jpg"
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
                "l_description": "eine kleine Augsburger Kapelle in der Dominikanergasse. Seit: 15. Jh. Der einstige Bürgermeister Lorenz Egen stiftete eine Pfründe für Arme.",
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
                "l_description": "eine evangelische, sowie katholische Kirche. Seit: 1167 1143 wurde an der Stelle der Kirche ein Spital errichtet.",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": "Heilig-Kreuz-Kirche1-2.jpg"
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
                "l_description": "Hauptkirche der Diözese Augsburg. Seit:  11. Jh. (Romanik und Gotik) Sie bewahrt den ältesten Glasfensterzyklus der Welt.",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": "Hoher-Dom3-2.jpg"
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
                "l_description": "es zeigt die frühe Art der Energiegewinnung. Seit: 1900 Es wurde im zweiten Weltkrieg zerstört, doch im Jahr 1986 ersetzt.",
                "sights": true,
                "insidertip": true,
                "culinary": false,
                "poi_img": "Wasserrad-am-Schwallech-2.jpg"
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
                "l_description": "ein Augsburger Traditionsbetrieb für Kleidung aus Hirschleder. Seit: 1855 Aigner besitzt den letzten Gerberboden Augsburgs. ",
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
                "l_description": "ein Steg über den Lech. Seit: unbekannt Bezeichnung eines Steges, der aus der Innenstadt über den Fluss führt.",
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
                "l_description": "einer von etwa 250 deutschen Kunstvereinen. Seit: 1833 Der Augsburger Kunstverein ist einer der Ältesten.",
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
                "l_description": "ein Mehrgenerationen-Wohnhaus. Seit: Umbau 2009 Der Innenhof ist integraler Bestandteil des Konzepts des Hospitalstifts.",
                "sights": false,
                "insidertip": true,
                "culinary": false,
                "poi_img": "Paritätisches-Hospiz-2.jpg"
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
                "l_description": "versteckt liegender Garten als Geheimtipp zum Fotografiren. Seit: unbekannt. ",
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
                "l_description": "Eines von 73 Amtsgerichten in Bayern. Seit: 1. Oktober 1879 Errichtung anlässlich der Einführung des Gerichtsverfassungsgesetzes.",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": "Amtsgericht1-2.jpg"
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
                "l_description": "Eine Augsburger Förderschule. Seit: Umbau 2008 Benennung durch die Nähe zur Ulrichsbasilika.",
                "sights": true,
                "insidertip": true,
                "culinary": false,
                "poi_img": "Knabenschule-2.jpg"
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
                "l_description": "es wurde von Elias Holl errichtet. Seit: 1602 - 1607 Erbaut als Waffenarsenal und Unterbringung für bis zu 3000 Soldaten.",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": "Zeughaus2-2.jpg"
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
                "l_description": "die Klosterkirche Maria Stern gehört zum Kloster Maria Stern. Seit: 1574 - 1576 Im Februar 1944 wurde die Kirche durch Bombenangriffe beschädigt.",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": "Maria-Stern-Klosterkirche1-2.jpg"
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
                "l_description": "eine Gartenanlage im Domviertel von Augsburg. Seit:  1739 - 1744 Früher gehörte der Hofgarten zur Bischöflichen Residenz auf dem Fronhof.",
                "sights": false,
                "insidertip": true,
                "culinary": false,
                "poi_img": "Hofgarten2-2.jpg"
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
                "l_description": "ehemalige Dominikanerklosterkirche Sankt Magdalena in Augsburg. Seit: 1513- 1515 Sankt Magdalena hat nur zwei Schiffe, was äußerst selten ist.",
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
                "l_description": "als historisch gekennzeichnetes Gebäude. Seit: unbekannt Hier befand sich früher eine Schule.",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": "Alte-Metzgerschule1.ipg"
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
                "l_description": "das Stammhaus der Augsburger Kunstsammlungen. Seit: 15. Jh. Es besteht aus zwei Gebäuden, die zusammengelegt wurden.
",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": "Maximilianmuseum1-2.jpg"
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
                "l_description": "steht für das Handwerk der Schäffler. Seit: 18. Jh. Das Handwerk geht bis ins 7. Jahrhundert n. Chr. zurück.",
                "sights": false,
                "poi_img ": "",
                "insidertip": true,
                "culinary": false,
                "poi_img": "Schäfflerei-2.jpg"
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
                "l_description": "versetzt den Betrachter und Touristen in die Zeit des Rokoko. Seit: 1740 - 1768 Er ist in der Wandvertäfelung durch acht Ölgemälde geschmückt.",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": "Rokokosaal2-2.jpg"
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
                "l_description": "ist das älteste Gasthaus Augsburg's mit Schwäbisch-Bayrischer Küche. Seit: 1572 Schon Goethe, Mozart und Rudolf Diesel speisten einst hier.",
                "sights": false,
                "insidertip": false,
                "culinary": true,
                "poi_img": "Gasthaus-Bauerntanz1-2.jpg"
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
                "l_description": "Die Staats- und Stadtbibliothek entstand im Zuge der Reformation. Seit: Reformation Martin Luther hatte gefordert, überall im Land Bibliotheken zu gründen.",
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
                "l_description": "eine Augsburger Gasse. Seit: 16./17. Jh. 1920 zählte man in der Schwibbogengasse auf sechs Häuser drei Schäffler.",
                "sights": false,
                "insidertip": true,
                "culinary": false,
                "poi_img": "Schwibbogengasse-2.jpg"
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
                "l_description": "das größte der Theater in Augsburg und betreibt vier Spielstätten. Seit: 1776 Heute ist es ein Mehrspartenbetrieb mit Musiktheater, Schauspiel und Ballett. ",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": "Theater2-2.jpg"
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
                "l_description": "eines der wenigen erhaltenen Rokoko-Gebäude. Seit: 17./18. Jh. Die reiche Fassadenmalerei kam im 18. Jahrhundert dazu.",
                "sights": false,
                "insidertip": true,
                "culinary": false,
                "poi_img": "Kathan-Haus-2.jpg"
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
                "l_description": "befindet sich im ehemaligen Castellschen Palais (= Höhmannhaus). Seit: 1996 1707 kaufte Graf Castell-Remlingen das Gebäude, daher stammt der Name.",
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
                "l_description": "heute von den Kunstsammlungen der Stadt genutzt. Seit: 18. Jh. Größter und prunkvollster Profanbau des Spätrokokos in Augsburg.",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": "Schätzlerpalais-2.jpg"
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
                "l_description": "der katholische Teil zweier wie Zwillinge verbundener Kirchen. Seit: 1467 Nördlich der Alpen gibt es kaum ältere christliche Wallfahrtsstätten.",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": "St.-Ulrich-und-Afra-2.jpg"
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
                "l_description": "eine Residenz der Familie Fugger. Seit: 1512 - 1515 Errichtet an der damals wichtigsten Handelsstraße 'Via Claudia'.",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": "Stadtpalast-der-Fugger1-2.jpg"
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
                "l_description": "der Wollmarkt ist ein echter Geheimtipp mit seiner geruhsamen Atmospäre. Seit: 1855 - 1914 Jährlich im Juni wurde im 19. Jahrhundert der Wollmarkt abgehalten.",
                "sights": false,
                "insidertip": true,
                "culinary": false,
                "poi_img": "Wollmarkt-Innenhof-St.-Margareth-2.jpg"
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
                "title": "REWE",
                "l_description": "Willkommen beim REWE Hier gibt es Lebensmittel",
                "sights": true,
                "insidertip": false,
                "culinary": false,
                "poi_img": "04_Cafeteria_Rotes_Tor.jpg"
            },
            "geometry": {
                "coordinates": [11.641234, 48.157921],
                "type": "Point"
            }
        },
        {
            "properties": {
                "title": "DM",
                "l_description": "Der Drogeriemarkt",
                "sights": false,
                "insidertip": true,
                "culinary": false,
                "poi_img": "DSC_5191.jpg"
            },
            "geometry": {
                "coordinates": [11.643284, 48.159234],
                "type": "Point"
            }
        },
        {
            "properties": {
                "title": "zuhause",
                "s_description": "kurzer text",
                "l_description": "langer text mit vielen wörtern",
                "sights": false,
                "insidertip": true,
                "culinary": false,
                "poi_img": "DSC_5191.jpg"
            },
            "geometry": {
                "coordinates": [11.64087, 48.15961],
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