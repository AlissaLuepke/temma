

tizen.application.launchAppControl(new tizen.ApplicationControl("http://tizen.org/appcontrol/operation/service"),
                                   "7pVzrIP6AZ.ServiceApplication",
                                   function() {console.log("Launch Service succeeded");},
                                   function(e) {console.log("Launch Service failed: " + e.message);});