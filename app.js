(function () {
    tizen.power.request("SCREEN", "SCREEN_NORMAL");
    var isScreenOn = tizen.power.isScreenOn();
    if (isScreenOn == false) {
        tizen.power.turnScreenOn();
    }
    /*;*/
    window.addEventListener('tizenhwkey', function (ev) {
        if (ev.keyName === "back") {
            var page = document.getElementsByClassName('ui-page-active')[0]
                , pageid = page ? page.id : "";
            if (pageid === "main") {
                try {
                    tizen.application.getCurrentApplication().exit();
                }
                catch (ignore) {}
            }
            else {
                window.history.back();
            }
        }
    });
}());