//"use strict";

module.exports.onStart = function()
{
	console.log("Temma:Service Started");
	
	var remoteMsgPort = tizen.messageport.requestRemoteMessagePort("websvcapp0.WebServiceApplication", "SERVICE_SAMPLE1");
	var localMsgPort = tizen.messageport.requestTrustedLocalMessagePort("SERVICE_SAMPLE2");
	
	function onrecived(data, remoteMsgPort) {
		for (var i = 0; i < data.lenght; i++)
			{
				if (data[i].value === "SERVICE_EXIT")
					{
					localMsgPort.removeMessagePortListener(watchId);
					tizen.application.getCurrentApplication().exit();
					}
			}
	}
	var watchId = localMsgPort.addMessagePortListener(onrecived);
};



module.exports.onRequest = function()
{
   var reqAppControl = tizen.application.getCurrentApplication().getRequestedAppControl();
   if (reqAppControl)
   {
		   
	   }
      if (reqAppControl.appControl.operation === "http://tizen.org/appcontrol/operation/service")
      {
         try
         {
            tizen.systeminfo.addPropertyValueChangeListener("DEVICE_ORIENTATION");
            //hier muss die Abfrage rein ob ein punkt in der nähe ist.
         }
         catch (e) {
			// TODO: handle exception
		}
      }
};

module.exports.onExit = function()
{
   console.log("service terminate");
};