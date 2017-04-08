# Temma
Tell me more about

##  Tizen
### UI Application
* most general Tizen Application
* Graphical User Interface
* usage of device functionalities - sensors and call operations

#### Tizen Advanced UI (TAU UI toolkit)
Manage various kinds of UI components like Buttons, Sliders etc.
Custom JavaScript and CSS can be used they must be imported **after** the default ```<script>``` element.

##### Creating a page
Body section of the HTML contains 1 or more pages:
```html
<body>
    <!-- first page -->
   <div class="ui-page" id="main">
      <div class="ui-header">
         <h1>Hello World</h1>
      </div>
      <div class="ui-content">
         <p>Hello TAU!</p>
      </div>
      <div class="ui-footer">
         <button>OK</button>
      </div>
   </div>
</body>
```
##### Managing pages
###### Page Structure
* Header area
    Shows the user which page is currently open. The header can contain buttons, menus, and toolbars. The header is optional.
* Content area
    Contains the main application content. The content area has an optional scroll bar.
* Footer area 
    Contains a status line or buttons. The footer is optional.

All page areas are spcified by a corresponding ```class``` attribute.

###### Popup:
To create a popup:

```html
<div class="ui-page">
   <div class="ui-header">Popup Open Page</div>
   <div class="ui-content">
      <a href="#popup" class="ui-btn" data-rel="popup">Popup Open</a>
   </div>

   <div id="popup" class="ui-popup">
      <div class="ui-popup-header">Popup Page</div>
      <div class="ui-popup-content">Popup Content</div>
   </div>
</div>
```
The popup works because TAU opens (makes visible) the page whose ```id``` attribute corresponds to the ```#hashtag``` page. This is basic [page routing](https://developer.tizen.org/ko/development/guides/web-application/user-interface/tizen-advanced-ui/managing-pages#pageRouting);


##### Page Routing 
Works without any additional JavaScript code, but for more powerful page routing functionalities usage of the JavaScript API
* Routing without JavaScript:
    * based on URL hash changes
    * has a built-in mechanism for history tracking
    * framework respondes to ```#hashtag```changes and tries to display the page with the ```id``` attribute  equal to the hashtag.
    * TAU uses ```<a>``` elements  - all href attributes work with the framework router
    * The Main page is defined by the ```ui-page-active``` class

    **Example 1: multiple html documents**
    ```html
    <!--pageOne.html-->
    <div class="ui-page ui-page-active" id="first">
       <div class="ui-content">
          <a href="pageTwo.html">Go to page two</a>
       </div>
    </div>
    
    <!--pageTwo.html-->
    <div class="ui-page" id="two">
       <div class="ui-content">
          <a href="pageOne.html">Go to page one</a>
       </div>
    </div>
    ```
    **Example 2: multiple pages in one document**
    ```html
    <div class="ui-page ui-page-active" id="first">
       <div class="ui-content">
          <a href="#two">Go to page two</a>
       </div>
    </div>
    
    <div class="ui-page" id="two">
       <div class="ui-content">
          <a href="#first">Go to page one</a>
       </div>
    </div>
    ```
* Route using the API
    Change pages using the ```tau.changePage()``` method:  
    ```html
        <!--pageOne.html-->
    <div class="ui-page ui-page-active" id="first">
       <div class="ui-content">
          You are viewing the first page of the example.
          <button id="first-button">Click here to change to page two</button>
       </div>
       <script>
          var el1 = document.getElementById("first-button");
          el1.addEventListener("click", function()
          {
             tau.changePage("pageTwo.html");
          });
       </script>
    </div>
    
    <!--pageTwo.html-->
    <div class="ui-page" id="second">
       <div class="ui-content">
          This is the second page of the example.
          <button id="second-button">Click here to change to page one</button>
       </div>
       <script>
          var el2 = document.getElementById("second-button");
          el2.addEventListener("click", function()
          {
             tau.changePage("pageOne.html");
          });
       </script>
    </div>
    ```
* Load pages from an external resource
##### Event Handling
###### Hardware Key Events
To bind an event callback on the ```tizenhwkey``` events:
```javascript
window.addEventListener("tizenhwkey", function(ev)
{
   if (ev.keyName == "back") 
   {
      /* Call window.history.back() to go to previous browser window */
      /* Call tizen.application.getCurrentApplication().exit() to exit application */
      /* Add script to add another behavior */
   }
});
```

###### Rotary Events in Wearable Applications
Rotary Device 
* can rotate clockwise (CW) or counter-clockwise (CCW)
* has points called detents - if rotary device detects detent point it dispateches a seperate new event about the point (Number depends on device)

| Type      | Description          | Attribute |
| ------------- |:-------------:| -----:|
| ```rotarydetent```      |Event is triggered when a device detects the detent point. | ```detail.direction```: rotation direction: ```CW``` and ```CCW```  |

To bind an event callback on rotary events:
```javascript
document.addEventListener("rotarydetent", function(ev)
{
   var direction = ev.detail.direction;
   /* Add behavior for detent detected event with a direction value */
});
```

### Service Application

* Application without graphical user interface
* runs in the background, usefull to perform activities that need to run periodically or continuously
* doesn't require user interaction
* run on top of a more lightweight runtime
* perform better and consume less memory

#### Main Features
* Managing the life-cycle
* Packaging applications
* Launching applications
* Terminating applications

(see.: https://developer.tizen.org/ko/development/guides/web-application/application-management/applications/service-application)

#### Prerequisites
To enable the application use the service application functionality

1. Specify the following feature in the **config.xml** file :
     ```html
    <widget>
    <tizen:feature name="http://tizen.org/feature/web.service"/>
    </widget> 
    ```
2. To ensure that the service application is acknowledged by the platform, you must add a service application extension element ```<tizen:service>``` to the **config.xml** file to the application:
    ```html
    <widget>
       <tizen:service id="[App_ID]" auto-restart="true" on-boot="true">
          <tizen:content src="[Start_JS_File]"/>
          <tizen:name>[App_Name]</tizen:name>
          <tizen:icon src="[App_Icon]"/>
          <tizen:description>[Description]</tizen:description>
       </tizen:service>
    </widget>
    ```
The ```<tizen:service>``` element is a child of the ```<widget>``` element in the **config.xml** file. 
With the ```<tizen:service>``` element attributes you can set the traits of  a service application:
* application ID
* auto restart
* boot launching
With the ```<tizen:service>``` child elements you can set:
* the starting script
* name
* icon

3. Request permission by adding privilege to the **config.xml*
    ```html
    <tizen:privilege name="http://tizen.org/privilege/application.launch"/>
    ```
#### Managing the Service Application Life-cycle

To run the service application: 
* export a number of callbacks using the [CommonJS Module](http://wiki.commonjs.org/wiki/Modules/1.1)
* callbacks need to be added to the ```module.exports``` object (provided by the environment)

Following callbacks are called
* ```onStart()```:
Entry point of the service --> called after the service runtime finished the set-up
* ```onRequest()```:
Listener for application control callbacks. Provided to handle requests from other applications.
Reply to the request by using the ```tizen.application.getCurrentApplication().getRequestedAppControl()``` method.
Also called when the application is first launched
* ```onExit()```:
Called when the service ends

##### How to manage service application callbacks:
1. Create the service entry point with the ```onStart()``` callback:
    ```javascript
    module.exports.onStart = function()
    {
    console.log("service start");

   var remoteMsgPort =                              
        tizen.messageport.requestRemoteMessagePort("websvcapp0.WebServiceApplication", "SERVICE_SAMPLE1");
   var localMsgPort =
        tizen.messageport.requestLocalMessagePort("SERVICE_SAMPLE2");

   function onreceived(data, remoteMsgPort)
   {
      for (var i = 0; i < data.length; i++)
      {
         if (data[i].value == "SERVICE_EXIT")
         {
            localMsgPort.removeMessagePortListener(watchId);
            tizen.application.getCurrentApplication().exit();
         }
      }
   }
    var watchId = localMsgPort.addMessagePortListener(onreceived);
   }
   ```
2. Request handler with the ```onRequest()``` callback
    Callback is invoked to handle incoming service requests. To obtain request use the ```getRequestedAppControl()``` method in the Application API
    ```javascript
    module.exports.onRequest = function()
    {
       var reqAppControl = tizen.application.getCurrentApplication().getRequestedAppControl();
       if (reqAppControl)
       {
          if (reqAppControl.appControl.operation == "http://tizen.org/appcontrol/operation/service")
          {
             try
             {
                tizen.systeminfo.addPropertyValueChangeListener("DEVICE_ORIENTATION", onDeviceOrientationSuccess);
             }
          }
       }
    }
    ``` 
3. Termination with the ```onExit()``` callback

    ```javascript
    module.exports.onExit = function()
    {
       console.log("service terminate");
    }
    ```

(see: https://developer.tizen.org/ko/development/guides/web-application/application-management/applications/service-application)

### Application Package Manager 
* core module
* responsible for installing, uninstalling and updating packages and storing information
