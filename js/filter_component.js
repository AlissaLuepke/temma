"use strict";
var filterCategories = (function () {
    var categories = {
        sights: 0
        , culinary: 1
        , insidertip: 2
    }
    var active = [false, false, false];    
    
    for (var i in categories) {
    	if (!categories.hasOwnProperty(i)) continue;
    	
    	$('#' + i).unbind().click(function () {
    		if ($(this).hasClass($(this).attr('id') + 'filteractive')) {
    			$('#' + $(this).attr('id')).removeClass($(this).attr('id') + 'filteractive');
    			active[categories[$(this).attr('id')]] = false;
                filterDatabase();
    		}
    		else {
    			$('#' + $(this).attr('id')).addClass($(this).attr('id') + 'filteractive');
    			active[categories[$(this).attr('id')]] = true;
    			console.log($(this).attr('id'));
                filterDatabase();
    		}
    	})
    }
    function filterDatabase() {
       
        var query = {};
        var count = 0;
        active.forEach(function (val) {
            if (val == true) count++;
        });
        if (count > 1) query['$or'] = [];
        for (var key in categories) {
            if (!categories.hasOwnProperty(key)) continue;
            if (count > 1) {
                var tmpQuery = {};
                tmpQuery["properties." + key] = true;
                if (active[categories[key]]) query['$or'].push(tmpQuery);
            }
            else {
                if (active[categories[key]]) query["properties." + key] = true;
            }
        }
        db.find(query).fetch(function (results) {
           // console.log("query: " + JSON.stringify(query));
        //    console.log("results: " + JSON.stringify(results));
            changePOIS(results);
            redraw();
        }, function (error) {
            console.log(error);
        });
    }
 
    
    // Public API
    return {
        init: init
    }
})();