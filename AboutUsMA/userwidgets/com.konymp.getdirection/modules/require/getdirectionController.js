define(function() {
  var konymp = konymp || {};
  var KonyLoggerModule = require("com/konymp/getdirection/KonyLogger");
  konymp.logger = (new KonyLoggerModule("Get Directions Component")) || function() {};
  return {
    /**
		 * @constructor constructor
		 * @param basicConfig
		 * @param layoutConfig
		 * @param pspConfig
		 */
    constructor: function(baseConfig, layoutConfig, pspConfig) {
			var analytics=require("com/konymp/"+"getdirection"+"/analytics");
            analytics.notifyAnalytics();
      this._baseURL={
        iPhone: 'http://maps.apple.com/?',
        iPad: 'http://maps.apple.com/?',
        android: 'https://www.google.com/maps/dir/?api=1',
      };
      this._platform = kony.os.deviceInfo().name;
      this._travelModes = {google:{none :'none',
                                   driving:'driving',
                                   walking:'walking',
                                   bicycling:'bicycling',
                                   transit:'transit'
                                  },
                           apple:{
                             none :'none',
                             driving:'driving',
                             walking:'walking',
                             transit:'transit'
                           }};
      this._mapsHandler={
        googleMaps:this._openGoogleMaps,
        appleMaps:this._openAppleMaps
      };
      this._selectMaps = {
        APPLEMAPS : "Apple Maps",
        GOOGLEMAPS : "Google Maps",
        BOTHMAPS : "Both Maps"
      };
      this._isGoogleMapsEnabled=null;
      this._isAppleMapsEnabled=null;
      this._url=null;
      this._origin=null;
      this._destination=null;
      this._travelModeForGoogleMaps=null;
      this._travelModeForAppleMaps=null;
      this._originPlaceId=null;
      this._destinationPlaceId=null;
      this._wayPoints=null;
      this._waypointPlaceIds=null;
      this._turnByTurnNavigation=null;
      this._flag=0;
      this._defaultWidth=null;
      this._defaultHeight=null;
      this._defaultTop=null;
      this._defaultLeft=null;
      this._frame=null;
    },
    /**
		 * @initGettersSetters Logic for getters/setters of custom properties
		 */    
    initGettersSetters: function() {
      defineSetter(this, "isGoogleMapsEnabled", function(val) {
        try{
          konymp.logger.trace("----------------------------- Setting isGoogleMapsEnabled Start", konymp.logger.FUNCTION_EXIT);
          if (typeof(val)==='boolean') {
            this._isGoogleMapsEnabled = val;
          } else {
            throw {
              error: "InvalidType",
              message: "Invalid input type. Expecting boolean value."
            };
          }
        }
        catch (e) {
          konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
          if(e.error === "InvalidType"){  
            throw e;
          }
        }
        konymp.logger.trace("-----------------------------Setting isGoogleMapsEnabled End", konymp.logger.FUNCTION_EXIT);
      });
      defineSetter(this, "iOSMapOptions", function(val) {
                try {
                    konymp.logger.trace("----------------------------- Setting iOSMapOptions Start", konymp.logger.FUNCTION_EXIT);
                    if (typeof(val) === 'string') {
                      	if(val == this._selectMaps.APPLEMAPS || val == this._selectMaps.GOOGLEMAPS || val == this._selectMaps.BOTHMAPS){
                        this._iOSMapOptions = val;}
                      else
                        {
                          throw {
                            error: "InvalidValue",
                            message: "Invalid value. Valid Values : Apple Maps, Google Maps, Both Maps."
                        };
                        }
                    } else {
                        throw {
                            error: "InvalidType",
                            message: "Invalid input type. Expecting string value."
                        };
                    }
                } catch (e) {
                    konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
                        throw e;
                }
                konymp.logger.trace("-----------------------------Setting iOSMapOptions End", konymp.logger.FUNCTION_EXIT);
            });
            defineGetter(this, "iOSMapOptions", function() {
                konymp.logger.trace("----------------------------- Getting iOSMapOptions", konymp.logger.FUNCTION_ENTRY);
                return this._iOSMapOptions;
            });
      defineGetter(this, "isGoogleMapsEnabled", function() {
        konymp.logger.trace("----------------------------- Getting isGoogleMapsEnabled", konymp.logger.FUNCTION_ENTRY);
        return this._isGoogleMapsEnabled;
      });
      defineSetter(this, "isAppleMapsEnabled", function(val) {
        try{
          konymp.logger.trace("----------------------------- Setting isAppleMapsEnabled Start", konymp.logger.FUNCTION_ENTRY);
          if (typeof(val)==='boolean') {
            this._isAppleMapsEnabled = val;
          } else {
            throw {
              error: "InvalidType",
              message: "Invalid input type. Expecting boolean value."
            };
          }
        }
        catch (e) {
          konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
          if(e.error === "InvalidType"){  
            throw e;
          }
        }
        konymp.logger.trace("-----------------------------Setting isAppleMapsEnabled End", konymp.logger.FUNCTION_EXIT);
      });
      defineGetter(this, "isAppleMapsEnabled", function() {
        konymp.logger.trace("----------------------------- Getting isAppleMapsEnabled", konymp.logger.FUNCTION_ENTRY);
        return this._isAppleMapsEnabled;
      });
      defineSetter(this,"originPlace",function(value){
        try{
          konymp.logger.trace("----------------------------- Setting originPlace Start", konymp.logger.FUNCTION_ENTRY);
          if (typeof(value)==='string') {
            this._origin=value;
          } else {
            throw {
              error: "InvalidType",
              message: "Invalid input type. Expecting string."
            };
          }
        }
        catch (e) {
          konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
          if(e.error === "InvalidType"){  
            throw e;
          }
        }
        konymp.logger.trace("-----------------------------Setting originPlace End", konymp.logger.FUNCTION_EXIT);
      });
      defineGetter(this, "originPlace", function() {
        konymp.logger.trace("----------------------------- Getting originPlace", konymp.logger.FUNCTION_ENTRY);
        return this._origin;
      });
      defineSetter(this,"destinationPlace",function(value){
        try{
          konymp.logger.trace("----------------------------- Setting destinationPlace Start", konymp.logger.FUNCTION_ENTRY);
          if (typeof(value)==='string') {
            this._destination=value;
          } else {
            throw {
              error: "InvalidType",
              message: "Invalid input type. Expecting string."
            };
          }
        }
        catch (e) {
          konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
          if(e.error === "InvalidType"){  
            throw e;
          }
        }
        konymp.logger.trace("-----------------------------Setting destinationPlace End", konymp.logger.FUNCTION_EXIT);
      });
      defineGetter(this, "destinationPlace", function() {
        konymp.logger.trace("----------------------------- Getting destinationPlace", konymp.logger.FUNCTION_ENTRY);
        return this._destination;
      });
      defineSetter(this,"travelModesForGoogleMaps",function(value){
        try{
          konymp.logger.trace("----------------------------- Setting travelModesForGoogleMaps Start", konymp.logger.FUNCTION_ENTRY);
          if (typeof(value)==='string') {
            this._travelModeForGoogleMaps=value;
          } else {
            throw {
              error: "InvalidType",
              message: "Invalid input type. Expecting string."
            };
          }
        }
        catch (e) {
          konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
          if(e.error === "InvalidType"){  
            throw e;
          }
        }
        konymp.logger.trace("-----------------------------Setting travelModesForGoogleMaps End", konymp.logger.FUNCTION_EXIT);
      });
      defineGetter(this, "travelModesForGoogleMaps", function() {
        konymp.logger.trace("----------------------------- Getting travelModesForGoogleMaps", konymp.logger.FUNCTION_ENTRY);
        return this._travelModeForGoogleMaps;
      });
      defineSetter(this,"originPlaceId",function(value){
        try{
          konymp.logger.trace("----------------------------- Setting originPlaceId Start", konymp.logger.FUNCTION_ENTRY);
          if (typeof(value)==='string') {
            this._originPlaceId=value;
          } else {
            throw {
              error: "InvalidType",
              message: "Invalid input type. Expecting string."
            };
          }
        }
        catch (e) {
          konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
          if(e.error === "InvalidType"){  
            throw e;
          }
        }
        konymp.logger.trace("-----------------------------Setting originPlaceId End", konymp.logger.FUNCTION_EXIT);
      });
      defineGetter(this, "originPlaceId", function() {
        konymp.logger.trace("----------------------------- Getting originPlaceId", konymp.logger.FUNCTION_ENTRY);
        return this._originPlaceId;
      });
      defineSetter(this,"destinationPlaceId",function(value){
        try{
          konymp.logger.trace("----------------------------- Setting destinationPlaceId Start", konymp.logger.FUNCTION_ENTRY);
          if (typeof(value)==='string') {
            this._destinationPlaceId=value;
          } else {
            throw {
              error: "InvalidType",
              message: "Invalid input type. Expecting string."
            };
          }
        }
        catch (e) {
          konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
          if(e.error === "InvalidType"){  
            throw e;
          }
        }
        konymp.logger.trace("-----------------------------Setting destinationPlaceId End", konymp.logger.FUNCTION_EXIT);
      });
      defineGetter(this, "destinationPlaceId", function() {
        konymp.logger.trace("----------------------------- Getting destinationPlaceId", konymp.logger.FUNCTION_ENTRY);
        return this._destinationPlaceId;
      });
      defineSetter(this,"wayPoints",function(value){
        try{
          konymp.logger.trace("----------------------------- Setting wayPoints Start", konymp.logger.FUNCTION_ENTRY);
          if (typeof(value)==='string') {
            this._wayPoints=value;
          } else {
            throw {
              error: "InvalidType",
              message: "Invalid input type. Expecting string."
            };
          }
        }
        catch (e) {
          konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
          if(e.error === "InvalidType"){  
            throw e;
          }
        }
        konymp.logger.trace("-----------------------------Setting wayPoints End", konymp.logger.FUNCTION_EXIT);
      });
      defineGetter(this, "wayPoints", function() {
        konymp.logger.trace("----------------------------- Getting wayPoints", konymp.logger.FUNCTION_ENTRY);
        return this._wayPoints;
      });
      defineSetter(this,"waypointPlaceIds",function(value){
        try{
          konymp.logger.trace("----------------------------- Setting waypointPlaceIds Start", konymp.logger.FUNCTION_ENTRY);
          if (typeof(value)==='string') {
            this._waypointPlaceIds=value;
          } else {
            throw {
              error: "InvalidType",
              message: "Invalid input type. Expecting string."
            };
          }
        }
        catch (e) {
          konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
          if(e.error === "InvalidType"){  
            throw e;
          }
        }
        konymp.logger.trace("-----------------------------Setting waypointPlaceIds End", konymp.logger.FUNCTION_EXIT);
      });
      defineGetter(this, "waypointPlaceIds", function() {
        konymp.logger.trace("----------------------------- Getting waypointPlaceIds", konymp.logger.FUNCTION_ENTRY);
        return this._waypointPlaceIds;
      });
      defineSetter(this,"turnByTurnNavigation",function(value){
        try{
          konymp.logger.trace("----------------------------- Setting turnByTurnNavigation Start", konymp.logger.FUNCTION_ENTRY);
          if (typeof(value)==='boolean') {
            this._turnByTurnNavigation=value;
          } else {
            throw {
              error: "InvalidType",
              message: "Invalid input type. Expecting boolean value."
            };
          }
        }
        catch (e) {
          konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
          if(e.error === "InvalidType"){  
            throw e;
          }
        }
        konymp.logger.trace("-----------------------------Setting turnByTurnNavigation End", konymp.logger.FUNCTION_EXIT);
      });
      defineGetter(this, "turnByTurnNavigation", function() {
        konymp.logger.trace("----------------------------- Getting turnByTurnNavigation", konymp.logger.FUNCTION_ENTRY);
        return this._turnByTurnNavigation;
      });
      defineSetter(this,"travelModesForAppleMaps",function(value){
        try{
          konymp.logger.trace("----------------------------- Setting travelModesForAppleMaps Start", konymp.logger.FUNCTION_ENTRY);
          if (typeof(value)==='string') {
            this._travelModeForAppleMaps=value;
          } else {
            throw {
              error: "InvalidType",
              message: "Invalid input type. Expecting string."
            };
          }
        }
        catch (e) {
          konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
          if(e.error === "InvalidType"){  
            throw e;
          }
        }
        konymp.logger.trace("-----------------------------Setting travelModesForAppleMaps End", konymp.logger.FUNCTION_EXIT);
      });
      defineGetter(this, "travelModesForAppleMaps", function() {
        konymp.logger.trace("----------------------------- Getting travelModesForAppleMaps", konymp.logger.FUNCTION_ENTRY);
        return this._travelModeForAppleMaps;
      });
    },
    /**
		 * @function _gettingFrame
		 * @scope private
		 * @description to get the frame
		 */
    _gettingFrame: function() {
      try{
        konymp.logger.trace("-----------------------------Start _gettingFrame", konymp.logger.FUNCTION_ENTRY);
        if(this._flag===0){
          this._centerX = (this._frame.x + (this._frame.width) / 2) + "dp";
          this._centerY = (this._frame.y + (this._frame.height) / 2) + "dp";
          this._defaultCenterX= this._centerX;
          this._defaultCenterY= this._centerY;
          this.view.btnGetDirection.centerX = this._centerX;
          this.view.btnGetDirection.centerY = this._centerY;
          this.view.btnGetDirection.width = this._frame.width;
          this.view.btnGetDirection.height = this._frame.height;
          this._flag=1;
        }
        else if(this._flag===1){
          this.view.height=this._defaultHeight;
          this.view.width=this._defaultWidth;
          this.view.top=this._defaultTop;
          this.view.left=this._defaultLeft;
          this.view.btnGetDirection.centerX = "50%";
          this.view.btnGetDirection.centerY = "50%";
          this._flag=0;
        }
      }
      catch(e){
        konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
        throw e;
      }
      konymp.logger.trace("-----------------------------Setting _gettingFrame End", konymp.logger.FUNCTION_EXIT);
    },
    /**
		 * @function _getDirection
		 * @scope private
		 * @description to open maps depending on platform
		 */
    _getDirection:function(){
      try{
        konymp.logger.trace("-----------------------------Start _getDirection", konymp.logger.FUNCTION_ENTRY);
        var scopeObj = this;
        applicationManager.getPresentationUtility().showLoadingScreen();
        //var selectedLocationData = this.selectedLocation;
        var navigationManager = applicationManager.getNavigationManager();
        var selectedLocationData = navigationManager.getCustomInfo("getDirection");
        if(selectedLocationData !== undefined){
        var source = {};
        var destination = {};
        destination.latitude = selectedLocationData.lat;
        destination.longitude = selectedLocationData.lon;
        var positionoptions = {timeout:64000,fastestInterval:0,minimumTime : 0};
        this._destination =  selectedLocationData.lat+","+selectedLocationData.lon;
      	kony.location.getCurrentPosition(success.bind(this),failure,positionoptions);
      	function success(response){
        	if(response && response.coords && response.coords.latitude && response.coords.longitude){
          	source.latitude = response.coords.latitude;
          	source.longitude = response.coords.longitude;
          	var navManager = applicationManager.getNavigationManager();
          	navManager.setCustomInfo('LocationsCurrentForm','frmLocationDetails');
          	applicationManager.getPresentationUtility().dismissLoadingScreen();
			this._origin = response.coords.latitude+","+response.coords.longitude;
                       
            if(this._frame===null){
          	this._frame = this.view.frame;
          	this._defaultWidth=this._frame.width;
          	this._defaultHeight=this._frame.height;
          	this._defaultTop=this._frame.y;
          	this._defaultLeft=this._frame.x;
        	}
        if(this._platform==='android'){
          this._getDirectionForAndroid(this._destination,this._origin,this._travelModeForGoogleMaps, this._originPlaceId,this._destinationPlaceId,this._wayPoints,this._waypointPlaceIds,this._turnByTurnNavigation);
        }
        else if(this._platform==='iPhone'){
          this._getDirectionForiOS(this._destination,this._origin,this._travelModeForGoogleMaps,this._travelModeForAppleMaps,this._originPlaceId,this._destinationPlaceId,this._wayPoints,this._waypointPlaceIds,this._turnByTurnNavigation);
        }
        else if(this._platform === 'thinclient'){
          this._getDirectionForAndroid(this._destination,this._origin,this._travelModeForGoogleMaps, this._originPlaceId,this._destinationPlaceId,this._wayPoints,this._waypointPlaceIds,this._turnByTurnNavigation);
        }
        this._url=null;  
            }
      }
          
      function failure(error){
        scopeObj.geoLocationErrorCallBack(error);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
      }    
        	
      }
      catch(e){
        konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
        throw e;
      }
      konymp.logger.trace("-----------------------------Setting _getDirection End", konymp.logger.FUNCTION_EXIT);
    },
    /**
		 * @function _openGoogleMaps
		 * @scope private
		 * @description to create URL for google maps
		 */
    _openGoogleMaps:function(type,destination,origin,travelMode,originPlaceId,destinationPlaceId,wayPoints,waypointPlaceIds,navigation){
      try{

        konymp.logger.trace("-----------------------------Start _openGoogleMaps", konymp.logger.FUNCTION_ENTRY);
        this._url = this._baseURL['android'];
        if(destination===undefined || destination === null ||destination ==="")
        {
          throw { 
            error:'destination not found',
            message:'Please provide a valid destination'
          };
        }
        this._url +='&destination='+destination;
        if(origin!==undefined&&origin!==null&&origin!=="")
        {
          this._url+='&origin='+origin;
        }
        if(originPlaceId!==undefined&&originPlaceId!==null&&originPlaceId!=="")
        {
          this._url+='&origin_place_id='+originPlaceId;
        }
        if(destinationPlaceId!==undefined&&destinationPlaceId!==null&&destinationPlaceId!=="")
        {
          this._url+='&destination_place_id='+destinationPlaceId;
        }
        if(wayPoints!==undefined&&wayPoints!==null&&wayPoints!=="")
        {
          this._url+='&waypoints='+wayPoints;
        }
        if(waypointPlaceIds!==undefined&&waypointPlaceIds!==null&&waypointPlaceIds!=="")
        {
          this._url+='&waypoint_place_ids='+waypointPlaceIds;
        }
        if(navigation===true)
        {
          this._url+='&dir_action=navigate';
        }
        if(this._travelModes['google'][travelMode]===undefined||this._travelModes['google'][travelMode]===null){
          throw { 
            error:'Travel mode invalid',
            message:'Please provide a valid Travel mode for Google maps'
          };
        }
        if(this._travelModes['google'][travelMode]!==undefined&&this._travelModes['google'][travelMode]!==null&&this._travelModes['google'][travelMode]!=='none')
        {
          this._url+='&travelmode='+this._travelModes['google'][travelMode];
        }
      }
      catch(e){
        konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
        throw e;
      }
      konymp.logger.trace("-----------------------------End _openGoogleMaps", konymp.logger.FUNCTION_EXIT);

    },
    /**
		 * @function _openAppleMaps
		 * @scope private
		 * @description to create URL for Apple maps
		 */
    _openAppleMaps:function(type,destination,origin,travelMode){
      try{
        konymp.logger.trace("-----------------------------Start _openAppleMaps", konymp.logger.FUNCTION_ENTRY);
        this._url = this._baseURL['iPhone'];
        if(destination===undefined || destination === null ||destination ==="")
        {
          throw { 
            error:'destination not found',
            message:'Please provide a valid destination'
          };
        }
        this._url +='&daddr='+destination;

        if(origin!==undefined&&origin!==null&&origin!=="")
        {
          this._url+='&saddr='+origin;
        }
        if(this._travelModes['apple'][travelMode]===undefined||this._travelModes['apple'][travelMode]===null){
          throw { 
            error:'Travel mode invalid',
            message:'Please provide a valid Travel mode for Apple maps'
          };
        }
        if(this._travelModes['apple'][travelMode]!==undefined&&this._travelModes['apple'][travelMode]!==null&&this._travelModes['apple'][travelMode]!=='none')
        {
          switch(this._travelModes['apple'][travelMode])
          {
            case 'driving':
              this._url+='&dirflg='+'d';
              break;
            case 'walking':
              this._url+='&dirflg='+'w';
              break;
            case 'transit':
              this._url+='&dirflg='+'r';
              break;
          }
        }
      }
      catch(e){
        konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
        throw e;

      }
      konymp.logger.trace("-----------------------------End _openAppleMaps", konymp.logger.FUNCTION_EXIT);
    },
    /**
		 * @function _getDirectionForAndroid
		 * @scope private
		 * @description to open google map url for Android
		 */
    _getDirectionForAndroid:function(destination,origin,travelMode,originPlaceId,destinationPlaceId,wayPoints,waypointPlaceIds,navigation){
      try{
        konymp.logger.trace("-----------------------------Start _getDirectionForAndroid", konymp.logger.FUNCTION_ENTRY);
        this._openGoogleMaps("",destination,origin,travelMode,originPlaceId,destinationPlaceId,wayPoints,waypointPlaceIds,navigation);
        kony.application.openURL(this._url);
      }
      catch(e){
        konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
        throw e;
      }
      konymp.logger.trace("-----------------------------Setting _getDirectionForAndroid End", konymp.logger.FUNCTION_EXIT);
    },
    /**
		 * @function _getDirectionForiOS
		 * @scope private
		 * @description to open map url for iOS
		 */
    _getDirectionForiOS : function(destination,origin,travelModeForGoogleMaps,travelModeForAppleMaps,originPlaceId,destinationPlaceId,wayPoints,waypointPlaceIds,navigation){
      try{
        konymp.logger.trace("-----------------------------Start _getDirectionForiOS", konymp.logger.FUNCTION_ENTRY);

        if(this.iOSMapOptions ==this._selectMaps.APPLEMAPS){
          this._openAppleMaps("",destination,origin,travelModeForAppleMaps);
          kony.application.openURL(this._url);
        }
        else if(this.iOSMapOptions == this._selectMaps.GOOGLEMAPS){
          this._openGoogleMaps("",destination,origin,travelModeForGoogleMaps,originPlaceId,destinationPlaceId,wayPoints,waypointPlaceIds,navigation);
          kony.application.openURL(this._url);
        }
        this._userChoiceMaps(destination,origin,travelModeForAppleMaps,travelModeForGoogleMaps,originPlaceId,destinationPlaceId,wayPoints,waypointPlaceIds,navigation);
      }
      catch(e){
        konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
        throw e;
      }
      konymp.logger.trace("-----------------------------Setting _getDirectionForiOS End", konymp.logger.FUNCTION_EXIT);
    },
    /**
		 * @function _openRespectiveMaps
		 * @scope private
		 * @description to open chosen maps
		 */
    _openRespectiveMaps:function(){
      try{
        konymp.logger.trace("-----------------------------Start _openRespectiveMaps", konymp.logger.FUNCTION_ENTRY);
        var option = arguments[0];
        this._mapsHandler[option].apply(this,arguments);
        kony.application.openURL(this._url);
        this.view.actionSheetObject.isVisible=false;
        this.view.height=this._defaultHeight;
        this.view.width=this._defaultWidth;
        this.view.centerY=this._defaultCenterY;
        this.view.centerX=this._defaultCenterX;
        this.view.btnGetDirection.centerX = "50%";
        this.view.btnGetDirection.centerY = "50%";
        this._flag=0;

      }
      catch(e){
        konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
        throw e;
      }
      konymp.logger.trace("-----------------------------Setting _openRespectiveMaps End", konymp.logger.FUNCTION_EXIT);
    },
    /**
		 * @function _userChoiceMaps
		 * @scope private
		 * @description to open map url according to user's choice
		 */
    _userChoiceMaps:function(destination,origin,travelModeForAppleMaps,travelModeForGoogleMaps,originPlaceId,destinationPlaceId,wayPoints,waypointPlaceIds,navigation){
      try{
        konymp.logger.trace("-----------------------------Start _userChoiceMaps", konymp.logger.FUNCTION_ENTRY);
        if(this.iOSMapOptions == this._selectMaps.BOTHMAPS){
//           var tmpskn = this.view.actionsheet.skin;
//           if(this._flag===0){
//             this.view.actionsheet.skin = 'slFbox';
//             this.view.height="100%";
//             this.view.width="100%";
//             this.view.centerX = "50%";
//             this.view.centerY = "50%";
//             this._gettingFrame();
//           }
//           this.view.actionsheet.show();
//           this.view.actionsheet.skin = tmpskn;
//           this.view.actionsheet.isVisible=true;
//           this.view.actionsheet.onClickOption1=this._openRespectiveMaps.bind(this,'googleMaps',destination,origin,travelModeForGoogleMaps,originPlaceId,destinationPlaceId,wayPoints,waypointPlaceIds,navigation);
//           this.view.actionsheet.onClickOption2= this._openRespectiveMaps.bind(this,'appleMaps',destination,origin,travelModeForAppleMaps);
        var actionSheetObject = new kony.ui.ActionSheet(
      	  {
        	  "title":"Get Directions",
          	  "message":"Which map would you like to use?",
          	  "showCompletionCallback": null
        	}
	      );
		  applicationManager.actionSheetObject=actionSheetObject;
      	var actionGoogleMap = new kony.ui.ActionItem(
        	{
          	"title":"Google Maps",
          	"style":constants.ACTION_STYLE_DEFAULT,
	        "action": this._openRespectiveMaps.bind(this,'googleMaps',destination,origin,travelModeForGoogleMaps,originPlaceId,destinationPlaceId,wayPoints,waypointPlaceIds,navigation)
    	    }
      	);
        var actionAppleMap = new kony.ui.ActionItem(
        	{
          	"title":"Apple Maps",
          	"style":constants.ACTION_STYLE_DEFAULT,
	          "action": this._openRespectiveMaps.bind(this,'appleMaps',destination,origin,travelModeForAppleMaps)
    	    }
      	);  
      	var actionCancel = new kony.ui.ActionItem(
        	{
          	"title":"Cancel",
          	"style":constants.ACTION_ITEM_STYLE_CANCEL,
          	"action": null
        	}
      	);
      	actionSheetObject.addAction(actionGoogleMap);
        actionSheetObject.addAction(actionAppleMap);  
      	actionSheetObject.addAction(actionCancel);
      	actionSheetObject.show();
        }
      }
      catch(e){
        konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
        throw e;
      }
      konymp.logger.trace("-----------------------------Setting _userChoiceMaps End", konymp.logger.FUNCTION_EXIT);
    },
    
    geoLocationErrorCallBack: function(err) {
    var scopeObj = this;
    var deviceUtilManager = applicationManager.getDeviceUtilManager();
    var isIphone = deviceUtilManager.isIPhone();
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (err.code === 1) {
      var i18nKey = applicationManager.getPresentationUtility().getStringFromi18n("i18n.maps.locationPermissionDenied");
      scopeObj.bindGenericError(i18nKey);
    }
    if (err.code === 3 && !isIphone) {
      var i18n_timeOut = applicationManager.getPresentationUtility().getStringFromi18n("i18n.maps.locationTimeOut");
      scopeObj.bindGenericError(i18n_timeOut);
    }
    if (err.code === 2 && !isIphone) {
      var i18n_turnOnLocationAlert = applicationManager.getPresentationUtility().getStringFromi18n("i18n.maps.turnOnLocationAlert");
      kony.ui.Alert(i18n_turnOnLocationAlert, scopeObj.onClickSettingsOrCancelHandler.bind(scopeObj), constants.ALERT_TYPE_CONFIRMATION, "Cancel", "Settings", "");
    }
  },
    
  onClickSettingsOrCancelHandler: function(response) {
    if (response === false) {
      var  locateUsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LocateUsUIModule");
      locateUsModule.presentationController.openLocationSettings();
    }
  },  
    
    bindGenericError : function(msg)
  {
    applicationManager.getDataProcessorUtility().showToastMessageError(this,msg);
  },
  };
});