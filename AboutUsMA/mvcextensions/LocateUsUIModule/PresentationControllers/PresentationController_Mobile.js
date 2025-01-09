/**
*@module LocateUs_PresentationController
*/
define([], function() {
  /**
  *@alias module:LocateUs_PresentationController
  *@class
  */
  function LocateUs_PresentationController() {
    kony.mvc.Presentation.BasePresenter.call(this);
    /* These are constants used to identify the state of form*/
    this.CURRENTLOCATION = 1; //map showing only near by locations
    this.CURRENTLOCATION_FILTER = 2; //filter applied on current location
    this.SEARCH = 3; // map showing locations based on search string
    this.SEARCH_FILTER = 4; // filter applied on search
    this.mapStatus = {
      "state" : this.CURRENTLOCATION
    };
    this.currentLatitude = null;
    this.currentLongitude = null;
    this.isUserLoggedIn = false;
    this.isFromChatBot = false;
    this.chatBotData = null;
    this.isFromTouchID = false;
    this.searchStr = null;
    /* logger */
    this.logger = applicationManager.getLoggerManager();
    locateUsPresentationScope = this;
  }
  inheritsFrom(LocateUs_PresentationController, kony.mvc.Presentation.BasePresenter);
  LocateUs_PresentationController.prototype.initializePresentationController = function() {
  };
  /**
  *this is common function for navigation
  *@param {string} formName - name of the form
  */
  LocateUs_PresentationController.prototype.commonFunctionForNavigation = function(formName){
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo(formName);
  };
  /**
  * it updates the currentLatitude and currentLongitude
  * @param {string} lat - latitude
  * @param {string} long - longitude
  */
  LocateUs_PresentationController.prototype.setLatLong = function(lat,long){
    this.currentLatitude = lat;
    this.currentLongitude = long;
  };
  /**
  * this is to present the locateUs view from 3d touch and if default login is TouchID
  * @param {boolean} flag - true or false indicates whether user loggedin or not
  * @param {string} formName - name of the form
  */
  LocateUs_PresentationController.prototype.presentLocateUsView1 = function(flag,formName){
    var controller = applicationManager.getPresentationUtility().getController(formName, true);
    locateUsPresentationScope.isFromTouchID = true;
    locateUsPresentationScope.presentLocateUsView(flag,controller);
  };
  /**
  * this is the common function to show the locateus view
  * @param {boolean} isUserLoggedIn
  * @param {Object} scope - scope of the form from which we are navigating to locate form
  */
  LocateUs_PresentationController.prototype.presentLocateUsView = function(isUserLoggedIn,scope){
    locateUsPresentationScope.isUserLoggedIn = isUserLoggedIn;
    var scopeObj = this;
    var positionoptions = {
      timeout: 64000,
      fastestInterval: 0,
      minimumTime: 0
    };
    applicationManager.getPresentationUtility().showLoadingScreen();
    kony.location.getCurrentPosition(geoLocationSuccessCallBack,geoLocationErrorCallBack, positionoptions);
    function geoLocationSuccessCallBack(response) {
      try {
        var MenuHandler =  applicationManager.getMenuHandler();
        var latitude, longitude;
        var latLongObj = {};
        if (response && response.coords && response.coords.latitude && response.coords.longitude) {
          latitude = response.coords.latitude;
          longitude = response.coords.longitude;
          latLongObj.latitude = latitude;
          latLongObj.longitude = longitude;
          locateUsPresentationScope.isFromChatBot = false;
          locateUsPresentationScope.getNearByLocations(latLongObj);
          if(MenuHandler.forceTouchFlow === 'ATM finder' && locateUsPresentationScope.isFromTouchID === true){
            MenuHandler.forceTouchFlow = "";
            locateUsPresentationScope.isFromTouchID = false;
          }
        }
      } catch (err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
    }
    function geoLocationErrorCallBack(err) {
      var scopeObj = this;
      var deviceUtilManager = applicationManager.getDeviceUtilManager();
      var isIphone = deviceUtilManager.isIPhone();
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      if (err.code === 1) {
        var i18nKey = applicationManager.getPresentationUtility().getStringFromi18n("i18n.maps.locationPermissionDenied");
        applicationManager.getDataProcessorUtility().showToastMessageError(scope,i18nKey);
      }
      if (err.code === 3 && !isIphone) {
        var i18n_timeOut = applicationManager.getPresentationUtility().getStringFromi18n("i18n.maps.locationTimeOut");
        applicationManager.getDataProcessorUtility().showToastMessageError(scope,i18n_timeOut);
      }
      if (err.code === 2 && !isIphone) {
        var i18n_turnOnLocationAlert = applicationManager.getPresentationUtility().getStringFromi18n("i18n.maps.turnOnLocationAlert");
        kony.ui.Alert(i18n_turnOnLocationAlert, onClickSettingsOrCancelHandler, constants.ALERT_TYPE_CONFIRMATION, "Cancel", "Settings", "");
      }
      function onClickSettingsOrCancelHandler(response){
        if (response === false) {
          locateUsPresentationScope.openLocationSettings();
        }
        else{
          locateUsPresentationScope.checkLoggedIn();
        }
      }
    }
  };
  LocateUs_PresentationController.prototype.showLocateUsPage = function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    this.getLocationsData();
  };
  /**
  * it will open the LocationsSettings making FFI call
  */
  LocateUs_PresentationController.prototype.openLocationSettings = function(){
    // kony.location.LocationSettings.open(); //LocationSettings FFI
    var params = {
      requestModifyLocationSettings: true,
      accuracyMode: constants.ACCURACY_BALANCED_POWER,
      onSuccess: function(){},
      onFailure: function(){}
  };
  kony.location.checkLocationSettings(params);
  };
  LocateUs_PresentationController.prototype.checkLoggedIn = function(){
    var loggedIn = locateUsPresentationScope.isUserLoggedIn;
    if(loggedIn){
    }else{
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo({"appName" :"AuthenticationMA","friendlyName":"AuthUIModule/frmLogin"});
      //navManager.navigateTo("frmLogin");
    }
  };
  /**
  *it fetch the locations with given lat and long by calling the locationManager
  *@param {JSON} - latLongObj contains lat and long
  */
  LocateUs_PresentationController.prototype.getNearByLocations = function(latLongObj){
    locateUsPresentationScope.logger.log("#### start LocateUs_PresentationController : getNearByLocations ####");
    locateUsPresentationScope.logger.log("#### input parameter "+JSON.stringify(latLongObj)+" ####");
    locateUsPresentationScope.currentLatitude = latLongObj.latitude;
    locateUsPresentationScope.currentLongitude = latLongObj.longitude;
    applicationManager.getPresentationUtility().showLoadingScreen();
    var locationManger = applicationManager.getLocationManager();
    var defaultRange = "50";
    var range  = 1609* parseInt(defaultRange);
    locateUsPresentationScope.logger.log("#### making the services call with locationManager ####");
    locationManger.fetchLocationsByRange(latLongObj,range,locateUsPresentationScope.getNearByLocationsSuccess,locateUsPresentationScope.getNearByLocationsFailure);
  };
  /**
  *success callback of getNearByLocations of LocateUs_PresentationController
  */
  LocateUs_PresentationController.prototype.getNearByLocationsSuccess = function(response){
    try{
      locateUsPresentationScope.logger.log("#### in success callback of getNearByLocations ####");
      var locationList = response;
      if(locationList && locationList.length){
        applicationManager.getPresentationUtility().showLoadingScreen();
        locateUsPresentationScope.logger.log("#### response is "+JSON.stringify(locationList)+" ####");
        locateUsPresentationScope.setMapZoomLevel(15);
        locateUsPresentationScope.mapStatus.state = locateUsPresentationScope.CURRENTLOCATION;
        var data = locateUsPresentationScope.ProcessDataForView(locationList);
        locateUsPresentationScope.logger.log("#### processed data : "+JSON.stringify(data)+" ####");
        var navigationManager = applicationManager.getNavigationManager();
        var navigationData = {};
        navigationData.isUserLoggedIn = locateUsPresentationScope.isUserLoggedIn;
        navigationData.data = data;
        var navManager = applicationManager.getNavigationManager();
		 navigationManager.setCustomInfo("frmLocationMap",navigationData);
        navManager.navigateTo({
         "appName": "AboutUsMA",
         "friendlyName": "LocateUsUIModule/frmLocationMap"
        });
        var frmLocationController = applicationManager.getPresentationUtility().getController('frmLocationMap',true);
        frmLocationController.bindLocations(navigationData);
       
        locateUsPresentationScope.presentView();
      }
      else{
        locateUsPresentationScope.logger.log("#### No results found ####");
        var state = locateUsPresentationScope.mapStatus.state;
        var formName = 'frmLocationMap';
        if(state === locateUsPresentationScope.CURRENTLOCATION){
          formName = 'frmLogin';
        }
        formName = kony.application.getCurrentForm().id; //AAC-7419
       var frmLocationController = applicationManager.getPresentationUtility().getController(formName,true);
       var i18n_noResults = applicationManager.getPresentationUtility().getStringFromi18n("i18n.maps.NoResultsFound","No Results Found");
        frmLocationController.bindGenericError(i18n_noResults);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
    }
    catch(e){
      locateUsPresentationScope.logger.log("#### in catch : "+JSON.stringify(e)+" ####");
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
  };
  /**
  *failure callback of getNearByLocationsFailure
  */
  LocateUs_PresentationController.prototype.getNearByLocationsFailure = function(error){
    locateUsPresentationScope.logger.log("#### LocateUs_PresentationCController getNearByLocationsFailure ####");
    var state = locateUsPresentationScope.mapStatus.state;
    var formName = 'frmLocationMap';
    if(state === locateUsPresentationScope.CURRENTLOCATION){
      formName = 'frmLogin';
    }
    // var frmLocationController = applicationManager.getPresentationUtility().getController(formName,true);
    // var i18n_noResults = applicationManager.getPresentationUtility().getStringFromi18n("i18n.maps.NoResultsFound","No Results Found");
    // frmLocationController.bindGenericError(i18n_noResults);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
		if (error["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("preLogin", error);
        }
  };
  LocateUs_PresentationController.prototype.setMapZoomLevel =function(zoomLevel){
    locateUsPresentationScope.zoomLevel = zoomLevel;
  };
  LocateUs_PresentationController.prototype.getMapZoomLevel =function(){
    return locateUsPresentationScope.zoomLevel?locateUsPresentationScope.zoomLevel:14;
  };
  /**
  * process the data for view
  * @param {Array} locationList - response of service call from LocationManager
  * @return {Array} processedData
  */
  LocateUs_PresentationController.prototype.ProcessDataForView = function(locationList){
    locateUsPresentationScope.logger.log("#### start LocateUs_PresentationController ProcessDataForView ####");
    locateUsPresentationScope.logger.log("#### data to be processed is "+JSON.stringify(locationList)+" ####");
    try{
      var tempLocaterData=[];
      var locatorResultSet=[];
      var LocationData = [];
      for(var i=0;i<locationList.length;i++){
        tempLocaterData =
          {
          lat: locationList[i].latitude,
          lon:locationList[i].longitude,
          name:locationList[i].informationTitle,//informationTitle,//addressLine1
          desc:locationList[i].addressLine1,//addressLine1,//addressLine2
          locationId : locationList[i].locationId,
          image: locateUsPresentationScope.getMapPinIcon(locationList[i].type),
          city:locationList[i].city,
          zipCode:locationList[i].zipCode,
          phone:locationList[i].phone,
          email:locationList[i].email,
          services:locationList[i].services,
          workingHours:locationList[i].workingHours,
          type: locationList[i].type,
          showcallout: false,
          distanceLabel:"",
          status : locationList[i].status,
          calloutStatus : {"text":locationList[i].status,"skin":locateUsPresentationScope.getCallOutStatusSkin(locationList[i].status)},
          listViewStatus : {"text":locationList[i].status,"skin":locateUsPresentationScope.getListViewStatusSkin(locationList[i].status)},
          listViewImage : locateUsPresentationScope.getListViewIcon(locationList[i].type)
        };
        LocationData.push(tempLocaterData);
        tempLocaterData = [];
      }
      var currentLocation = {
        lat : locateUsPresentationScope.currentLatitude,
        lon : locateUsPresentationScope.currentLongitude,
        image : locateUsPresentationScope.getMapPinIcon("currentLocation"),
        showcallout : false
      };
      LocationData.push(currentLocation);
      locateUsPresentationScope.logger.log("#### after data processed "+JSON.stringify(LocationData));
      return LocationData;
    }
    catch(e){
      locateUsPresentationScope.logger.log("#### in catch "+JSON.stringify(e)+" ####");
    }
  };
  /**
  * this function is used only in this module to present the locate us view
  */
  LocateUs_PresentationController.prototype.presentView = function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    locateUsPresentationScope.logger.log("#### showing the frmLocation form ####");
    var navManager = applicationManager.getNavigationManager();
    var deviceUtilManager = applicationManager.getDeviceUtilManager();
        
    if(navManager.getCurrentForm() !== 'frmLocationMap' || deviceUtilManager.isIPhone() === true){
      navManager.navigateTo({"appName" :"AboutUsMA","friendlyName":"LocateUsUIModule/frmLocationMap"});
      //navManager.navigateTo('frmLocationMap');
    }
    else{
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
  };
  /**
  * get the locationdetails from LocationManager
  * @param {string} locationId - Id of a location
  */
  LocateUs_PresentationController.prototype.getLocationDetails = function(locationId,selectedLocation){
    applicationManager.getPresentationUtility().showLoadingScreen();
    locateUsPresentationScope.logger.log("#### start LocateUs_PresentationController fetchLocationDetais ####");
    locateUsPresentationScope.logger.log("#### locationId is "+locationId+" ####");
    var locationManager = applicationManager.getLocationManager();
    locationManager.fetchLocationDetails(locationId,successCallback,failureCallback);
    function successCallback(data){
      locateUsPresentationScope.logger.log("#### success callback of fetchLocationDetails "+JSON.stringify(data)+" ####");
      //var frmLocationController = applicationManager.getPresentationUtility().getController('frmLocation',true);
      //frmLocationController.getLocationDetailsSuccess(data[0]);
      var customInfo = {};
      customInfo.selectedLocation = selectedLocation;
      customInfo.locationDetails = data[0];
      var navigationManager = applicationManager.getNavigationManager();
      navigationManager.setCustomInfo("frmLocationDetails",customInfo);
        navigationManager.navigateTo({"appName" :"AboutUsMA","friendlyName":"LocateUsUIModule/frmLocationDetails"});
      //navigationManager.navigateTo('frmLocationDetails');
    }
    function failureCallback(error){
      var customInfo = {};
      customInfo.selectedLocation = selectedLocation;
      customInfo.locationDetails = null;
      var navigationManager = applicationManager.getNavigationManager();
      navigationManager.setCustomInfo("frmLocationDetails",customInfo);
      navigationManager.navigateTo({"appName" :"AboutUsMA","friendlyName":"LocateUsUIModule/frmLocationDetails"});
      //navigationManager.navigateTo('frmLocationDetails');
      //var frmLocationController = applicationManager.getPresentationUtility().getController('frmLocation',true);
      //frmLocationController.getLocationDetailsFailure();
      locateUsPresentationScope.logger.log("#### in error callback of fetchLocationDetails "+JSON.stringify(error)+" ####");
    }
  };
  /**
  * Get the Locations based on search from LocationManager
  * @param {string} searchStr - place or zipcode
  */
  LocateUs_PresentationController.prototype.getLocationsBySearch = function(searchStr){
    locateUsPresentationScope.searchStr  = searchStr;
    locateUsPresentationScope.logger.log("#### start LocateUs_PresentationController : fetchLocationsBySearch ####");
    locateUsPresentationScope.logger.log("#### search string is "+searchStr+" ####");
    var validationManager = applicationManager.getValidationUtilManager();
    var isValidZipCode = validationManager.isValidZip(searchStr);
    if (isValidZipCode === true) {
            applicationManager.getPresentationUtility().showLoadingScreen();
    		var locationManager = applicationManager.getLocationManager();
    		locationManager.fetchLocationsBySearch(searchStr,locateUsPresentationScope.getLocationsBySearchSuccess,locateUsPresentationScope.getLocationsBySearchFailure);
        }
        else {
		    var controller = applicationManager.getPresentationUtility().getController('frmLocationMap', true);
            controller.bindError(applicationManager.getPresentationUtility().getStringFromi18n("i18n.maps.invalidZipCode"));
        }
  };
  /**
  * success callback of getLocationsBySearch
  */
  LocateUs_PresentationController.prototype.getLocationsBySearchSuccess = function(data){
    locateUsPresentationScope.logger.log("#### successcallback of fetchLocationsBySearch "+JSON.stringify(data)+"####");
    if(data && data.length){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var frmLocationController = applicationManager.getPresentationUtility().getController('frmLocationMap',true);
      if(locateUsPresentationScope.mapStatus.state === locateUsPresentationScope.CURRENTLOCATION_FILTER || locateUsPresentationScope.mapStatus.state === locateUsPresentationScope.SEARCH_FILTER)
      {
         locateUsPresentationScope.mapStatus.state = locateUsPresentationScope.SEARCH_FILTER;
         frmLocationController.applyFilterToData(data);
      }
      else{
         locateUsPresentationScope.mapStatus.state = locateUsPresentationScope.SEARCH;
         frmLocationController.searchLocationsSuccess(data);
      }
    }else{
      locateUsPresentationScope.logger.log("#### No Results Found ####");
      var frmLocationCon = applicationManager.getPresentationUtility().getController('frmLocationMap',true);
      var i18n_noResults = applicationManager.getPresentationUtility().getStringFromi18n("i18n.maps.NoResultsFound","No Results Found");
      frmLocationCon.bindError(i18n_noResults);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
  };
  /**
  * failure callback of getLocationsBySearch
  */
  LocateUs_PresentationController.prototype.getLocationsBySearchFailure = function(error){
    locateUsPresentationScope.logger.log("#### in error callback of fetchLocationsBySearch ####");
    var frmLocationCon = applicationManager.getPresentationUtility().getController('frmLocationMap',true);
    var i18n_noResults = applicationManager.getPresentationUtility().getStringFromi18n("i18n.maps.NoResultsFound","No Results Found");
    frmLocationCon.bindError(i18n_noResults);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
  /**
  * return the image name based on location type
  * @param {string} type - Atm or Branch
  * @return {string} image Name
  */
  LocateUs_PresentationController.prototype.getMapPinIcon = function(type){
    if(type === "ATM" || type.toLowerCase() === "atm"){
      return "atmicon.png";
    }
    else if(type === "BRANCH" || type === "MainBranch" || type.toLowerCase() === "branch"){
      return "bankicon.png";
    }
    else if(type === "currentLocation"){
      return "current_location.png";
    }
  };
  /**
  * return the skin for callout template
  * @param {string} status - like "open" or "closed"
  * @returns {string} skin name
  */
  LocateUs_PresentationController.prototype.getCallOutStatusSkin = function(status){
    if(status.toLowerCase() === "open"){
      return "sknLbl5daf0bSSP79pr";
    }
    if(status.toLowerCase() === "closed"){
      return "sknLblFD3F2F26px";
    }
  };
  /**
  * return the skin for ListView Segment
  * @param {string} status - like "open" or "closed"
  * @returns {string} skin name
  */
  LocateUs_PresentationController.prototype.getListViewStatusSkin = function(status){
    if(status.toLowerCase() === "open"){
      return "sknLbl5daf0bSSP79pr";
    }
    if(status.toLowerCase() === "closed"){
      return "sknLblFD3F2F26px";
    }
  };
  /**
  * it will return the ListView icon based on type of location
  * @param {string} type - Atm or Branch
  * @returns {string} Name of Image
  */
  LocateUs_PresentationController.prototype.getListViewIcon = function(type){
    if(type === "ATM" || type.toLowerCase() === "atm"){
      return "grouptwo.png";
    }
    else if(type === "BRANCH" || type === "MainBranch" || type.toLowerCase() === "branch"){
      return "group.png";
    }
  };
  /**
  * Get the directions from source to destination
  * @param {JSON} source - contains source lat and long
  * @param {JSON} destination - contains destination lat and long
  */
  LocateUs_PresentationController.prototype.getDirections = function(source,destination){
    locateUsPresentationScope.logger.log("#### start LocateUs_PresentationController : getDirections ####");
    locateUsPresentationScope.logger.log("#### source is "+JSON.stringify(source)+" ####");
    locateUsPresentationScope.logger.log("#### destination is "+JSON.stringify(destination)+" ####");
    applicationManager.getPresentationUtility().showLoadingScreen();
    var locationManager = applicationManager.getLocationManager();
    locationManager.fetchDirections(source,destination,locateUsPresentationScope.getDirectionsSuccess,locateUsPresentationScope.getDirectionsFailure);
  };
  /**
  * success callback of fetchDirections. It will pass the data to view controller
  * @param {JSON} directions - response of fetchDirections
  */
  LocateUs_PresentationController.prototype.getDirectionsSuccess = function(directions){
    locateUsPresentationScope.logger.log("#### in getDirectionsSuccess "+JSON.stringify(directions)+" ####");
    if(directions && directions.length > 0){
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("frmLocationDirections",directions);
      navManager.navigateTo({"appName" :"AboutUsMA","friendlyName":"LocateUsUIModule/frmLocationDirections"});
      //navManager.navigateTo('frmLocationDirections');
    }else{
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var navManager1 = applicationManager.getNavigationManager();
      var currentForm = navManager1.getCurrentForm();
      //frmLocationDetails
      var navigationManager = applicationManager.getNavigationManager();
      var form = navigationManager.getCustomInfo('LocationsCurrentForm');
      if(form !== null && form !== undefined){
        currentForm = form;
      }
      var frmLocationController = applicationManager.getPresentationUtility().getController(currentForm,true);
      var i18n_noDirections = applicationManager.getPresentationUtility().getStringFromi18n("i18n.maps.NoDirectionsFound","Directions are not available for this location");
      frmLocationController.bindError(i18n_noDirections);
    }
    //var frmLocationController = applicationManager.getPresentationUtility().getController('frmLocationDirections',true);
    //frmLocationController.showDirections(directions);
  };
  /**
  * failure callback of fetchDirections.
  * @param {JSON} error
  */
  LocateUs_PresentationController.prototype.getDirectionsFailure = function(error){
    locateUsPresentationScope.logger.log("#### in getDirectionsFialure "+JSON.stringify(error)+" ####");
    var navManager1 = applicationManager.getNavigationManager();
    var currentForm = navManager1.getCurrentForm();
    var navigationManager = applicationManager.getNavigationManager();
	var userPreferencesManager = applicationManager.getUserPreferencesManager();
    var form = navigationManager.getCustomInfo('LocationsCurrentForm');
    if(form !== null && form !== undefined){
      currentForm = form;
    }
    //no network error code for android - 3
    //no network error code for ios - 1503
     if(error === 3 || error ===1503)
    {
      if(userPreferencesManager.isLoggedIn)
      {
        var errorMsg = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.deviceConnectivityIssueMessage");
        kony.ui.Alert({
          "alertType": constants.ALERT_TYPE_INFO_ERROR,
          "alertTitle": "Error",
          "message": errorMsg,
          "alertHandler": alertCallback
        }, {});
      }
      else
      {
        var i18n_noConnectivity = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.deviceConnectivityIssueMessage");
        var frmLocationController = applicationManager.getPresentationUtility().getController(currentForm,true);
        frmLocationController.bindError(i18n_noConnectivity);
      }
    } else if (error.code == 422){
      var i18n_apiNotSupported = applicationManager.getPresentationUtility().getStringFromi18n("i18n.common.apiNotSupported","This API is not supported on this device");
      var frmLocationController = applicationManager.getPresentationUtility().getController(currentForm,true);
      frmLocationController.bindError(i18n_apiNotSupported);
    }
    else
    {
      var i18n_noDirections = applicationManager.getPresentationUtility().getStringFromi18n("i18n.maps.NoDirectionsFound","Directions are not available for this location");
      var frmLocationController = applicationManager.getPresentationUtility().getController(currentForm,true);
      frmLocationController.bindError(i18n_noDirections);
    }
	function alertCallback(){
		var authMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"AuthenticationMA","moduleName" : "AuthUIModule"});
        authMode.presentationController.onLogout();
	}
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
  /**
  * it will process the data to required format
  * @param {number} routeid - id of the route
  * @param {Array} poluPoints
  * @param {string} color
  * @param {Object} destinationinfo
  */
  LocateUs_PresentationController.prototype.processPolylineData = function(routeid,polyPoints,color,destinationInfo){
    locateUsPresentationScope.logger.log("#### start LocateUs_PresentationController processPolylineData ####");
    var steps = polyPoints;
    var ei = steps.length-1;
    var startLoc = {
      lat:steps[0].lat,
      lon:steps[0].lon,
      image:{source:locateUsPresentationScope.getMapPinIcon("currentLocation"),anchor:kony.map.PIN_IMG_ANCHOR_CENTER}
    };
    var endLoc = {
      lat:steps[ei].lat,
      lon:steps[ei].lon,
      image:{source:locateUsPresentationScope.getMapPinIcon(destinationInfo.type),anchor:kony.map.PIN_IMG_ANCHOR_CENTER}
    };
    locateUsPresentationScope.logger.log("#### start location of map : "+JSON.stringify(startLoc)+" ####");
    locateUsPresentationScope.logger.log("#### end location of map : "+JSON.stringify(endLoc)+" ####");
    var polylineData = {
      id : routeid,
      locations : steps,
      startLocation : startLoc,
      endLocation : endLoc,
      polylineConfig : {lineWidth : 5, lineColor: color}
    };
    return polylineData;
  };
  /**
  * it will process the response of fetchDirections to view required format
  */
  LocateUs_PresentationController.prototype.processStepDirectionsData = function(resultTable){
    try{
      var locationManager = applicationManager.getLocationManager();
      if (resultTable && resultTable[0]) {
        var stepsTable = resultTable[0]["legs"][0]["steps"]; //main
        var newDirectionsList = [];
        var distanceValue = "";
        var durationValue = "";
        var longInstructionVA = "";
        var totalDuration = resultTable[0]["legs"][0]["duration"]; //main
        var totalDistance = 0;
        var eachStep;
        var defaultRoutes = kony.i18n.getLocalizedString("i18n.common.Map.defaultDirectionListVA.ValueVA");
        var defaultRoutesArray = defaultRoutes.split(",");
        var defaultTable = [];
        var len = 0;
        for (var j = 0; j < defaultRoutesArray.length; j++) { // gets the respective maneuver image
          var entry = defaultRoutesArray[j];
          defaultTable.push({
            "key": entry.split(":")[0],
            value: entry.split(":")[1]
          });
          len = defaultTable.length;
        }
        for (var i = 0;
             ((stepsTable) != null) && i < stepsTable.length; i++) {
          eachStep = stepsTable[i];
          var imgDirectionVA = "";
          longInstructionVA = eachStep["instruction"];
          longInstructionVA = longInstructionVA ? longInstructionVA.replace(/(<([^>]+)>)/ig, "") : "";
          longInstructionVA = longInstructionVA ? longInstructionVA.replace(/&nbsp;/gi, ' ') : "";
          var lowerLongInstructionVA = longInstructionVA ? longInstructionVA.toLowerCase() : "";
          var value;
          var directionImage = "";
          var record;
          for (var k = 0; k < len; k++) {
            record = defaultTable[k];
            value = locateUsPresentationScope.getDirectionImage(record["key"], lowerLongInstructionVA);
            if (value != -1) {
              directionImage = defaultTable[k]["value"];
              k = len + 1;
            }
          }
          if (directionImage != "") {
            imgDirectionVA = directionImage;
          } else {
            imgDirectionVA = "";
          }
          var distanceValue = locationManager.convertToMiles(eachStep["distance"]);
          var timeValue = "";
          if(eachStep["duration"] && eachStep["duration"] !== undefined && eachStep["duration"] !== "" && eachStep["duration"] !== null){
            timeValue = locationManager.convertToMins(eachStep["duration"]);
          }
          totalDistance = totalDistance + eachStep["distance"];
          kony.table.insert(newDirectionsList, {
            lblDistance : distanceValue,
            lblDirection : longInstructionVA,
            lblTime : timeValue,
            imgDirection : imgDirectionVA
          });
        }
        var totalDurationFinal = locationManager.convertToMins(totalDuration);
        var totalDistanceFinal = locationManager.convertToMiles(totalDistance);
        var obj = {};
        obj.totalDuration = totalDurationFinal;
        obj.totalDistance = totalDistanceFinal;
        obj.directionsList = newDirectionsList;
        return obj;
      }
    }catch(err){
      locateUsPresentationScope.logger.log("#### in catch : "+JSON.stringify(err)+" "+err);
    }
  };
  /**
  * it will return the direction image like left turn or u-turn...
  */
  LocateUs_PresentationController.prototype.getDirectionImage = function(key,value){
    var keyOccurredAt = -1;
    value = value ? value.replace(/(<([^>]+)>)/ig, "") : "";
    if(value != ""){
      var keyi18nValue = kony.i18n.getLocalizedString("i18n.common.Map."+key+".ValueVA");//see
      var splitFlag = false;
      if(keyi18nValue && keyi18nValue.indexOf(',') != -1){
        keyArray = keyi18nValue.split(",");
        splitFlag = true;
      }
      if(splitFlag){
        for (var k=0; ((keyArray) != null) && k< keyArray.length; k++ ){
          var keyValue = keyArray[k];
          keyValue = keyValue.toLowerCase();
          if((value.indexOf(keyValue))!= -1){
            keyOccurredAt = value.indexOf(keyValue);
            return keyOccurredAt;
          }
        }
      }else{
        if(keyi18nValue && (value.indexOf(keyi18nValue))!= -1){
          keyi18nValue = keyi18nValue.toLowerCase();
          keyOccurredAt = value.indexOf(keyi18nValue);
        }
      }
    }
    return keyOccurredAt;
  };
  /**
  * it will get take lat and long of the first location in current map and make the service call
    with range from LocationManager
  * @param {number} range - radius
  */
  LocateUs_PresentationController.prototype.getLocationsNearFirstLocationWithRange = function(range){
    locateUsPresentationScope.logger.log("#### start LocateUs_PresentationController getLocationsNearFirstLocationWithRnage ####");
    var locationManager = applicationManager.getLocationManager();
    var data = [];
//     if(locateUsPresentationScope.mapStatus.state === locateUsPresentationScope.CURRENTLOCATION || locateUsPresentationScope.mapStatus.state === locateUsPresentationScope.CURRENTLOCATION_FILTER){
//       data = locationManager.getNearByLocations();
//     }
//     else
      if(locateUsPresentationScope.mapStatus.state === locateUsPresentationScope.SEARCH || locateUsPresentationScope.mapStatus.state === locateUsPresentationScope.SEARCH_FILTER){
      locateUsPresentationScope.mapStatus.state = locateUsPresentationScope.SEARCH_FILTER;
      locateUsPresentationScope.getLocationsBySearch(locateUsPresentationScope.searchStr);
      return;
    }
    applicationManager.getPresentationUtility().showLoadingScreen();
//     var firstLocation = null;
//     if(locateUsPresentationScope.isFromChatBot === true){
//       firstLocation = locateUsPresentationScope.chatBotData[0];
//     }
//     else{
//       firstLocation = data[0];
//     }
    var obj = {};
    obj.latitude =  locateUsPresentationScope.currentLatitude;
    obj.longitude = locateUsPresentationScope.currentLongitude;
    var radius = 1609* parseInt(range);
    locateUsPresentationScope.logger.log("#### raduis is "+radius+" ####");
    locationManager.fetchLocationsByRange(obj,radius,locateUsPresentationScope.getLocationsNearFirstLocationSuccess,locateUsPresentationScope.getLocationsNearFirstLocationFailure);
  };
  /**
  * it is success callback of getLocationsNearFirstLocationWithRange. it will pass the data to the view
  */
  LocateUs_PresentationController.prototype.getLocationsNearFirstLocationSuccess = function(data){
    locateUsPresentationScope.logger.log("#### in getLocationsNearFirstLocationSuccess "+JSON.stringify(data)+" ####");
    var frmLocationController = applicationManager.getPresentationUtility().getController('frmLocationMap',true);
    if(data && data.length){
      frmLocationController.applyFilterToData(data);
    }else{
      var i18n_noResults = applicationManager.getPresentationUtility().getStringFromi18n("i18n.maps.NoResultsFound","No Results Found");
      frmLocationController.bindError(i18n_noResults);
    }
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
  /**
  * it is failure callback of getLocationsNearFirstLocationWithRange.
  */
  LocateUs_PresentationController.prototype.getLocationsNearFirstLocationFailure = function(error){
    locateUsPresentationScope.logger.log("#### in getLocationsNearFirstLocationFailure callback "+JSON.stringify(error)+" ####");
     applicationManager.getPresentationUtility().dismissLoadingScreen();
   if (error["isServerUnreachable"]) {
      var userObj = applicationManager.getUserPreferencesManager();
        var Login = userObj.isUserLoggedin();
      if(Login === true){
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
      }else{
        applicationManager.getPresentationInterruptHandler().showErrorMessage("preLogin", error);
      }
        } else{
          var i18n_noResults = applicationManager.getPresentationUtility().getStringFromi18n("i18n.maps.NoResultsFound","No Results Found");
          var frmLocationController = applicationManager.getPresentationUtility().getController('frmLocationMap',true);
          frmLocationController.bindError(i18n_noResults);
        }
  };
  /**
  * it filter the given locations data with given services
  * @param {Object} locations - locations data which is response of service call
  * @param {Object} services - user selected services from filter
  * @returns {Object} filtered Locations
  */
  LocateUs_PresentationController.prototype.filterLocationsWithServices = function(locations,services,type){
    try{
      locateUsPresentationScope.logger.log("#### start LocateUs_PresentationController : filterLocationsWithServices ####");
      locateUsPresentationScope.logger.log("#### locations : "+JSON.stringify(locations)+" ####");
      locateUsPresentationScope.logger.log("#### services : "+JSON.stringify(services)+" ####");
      var result = [];
      if(services && services.length > 0 && services[0].toLowerCase() === "all"){
        result = locations;
      }
      else{
        for(var i = 0;i<locations.length;i++){
          if(locations[i].services){
            var locationServices1 = locations[i].services.toLowerCase().split("||");
            var locationServices = [];
            for(var k=0;k<locationServices1.length;k++){
              locationServices.push(locationServices1[k].trim());
            }
            locateUsPresentationScope.logger.log("#### locationServices is "+JSON.stringify(locationServices)+" ####");
            for(var j=0;j<services.length;j++){
              locateUsPresentationScope.logger.log("#### services is  "+JSON.stringify(services)+" ####");
              if(locationServices.indexOf(services[j].toLowerCase().trim()) > -1){
                result.push(locations[i]);
                break;
              }
            }
          }
        }
      }
      locateUsPresentationScope.logger.log("#### result is "+JSON.stringify(result)+" ####");
      result = locateUsPresentationScope.filterBasedOnType(result,type);
      var state = locateUsPresentationScope.mapStatus.state;
      locateUsPresentationScope.logger.log("#### state is "+state+" ####");
      if(result.length > 0){
        if(state === locateUsPresentationScope.SEARCH || state === locateUsPresentationScope.SEARCH_FILTER){
          locateUsPresentationScope.logger.log("#### changing map state to search filter ####");
          locateUsPresentationScope.mapStatus.state = locateUsPresentationScope.SEARCH_FILTER;
        }
        else{
          locateUsPresentationScope.logger.log("#### changing map state to currentlocation_filter ####");
          locateUsPresentationScope.mapStatus.state = locateUsPresentationScope.CURRENTLOCATION_FILTER;
        }
      }
      return result;
    }catch(err){
      locateUsPresentationScope.logger.log("#### in catch "+JSON.stringify(err)+" ####");
    }
  };
  /**
  * it is helper function to filter the locations based on type
  * @param {Array} locations
  * @param {string} type
  */
  LocateUs_PresentationController.prototype.filterBasedOnType = function(locations,type){
    if(type.toLowerCase() === "both"){
      return locations;
    }
    var result = [];
    for(var i=0;i<locations.length;i++){
      if(locations[i].type.toLowerCase() === type.toLowerCase()){
        result.push(locations[i]);
      }
    }
    return result;
  };
  /**
  * it returns the form state like CURRENTLOCATION or SEARCH
  * @member of LocateUs_PresentationController
  */
  LocateUs_PresentationController.prototype.getMapState = function(){
    return locateUsPresentationScope.mapStatus.state;
  };
  /**
  *this function resets the all variables
  */
  LocateUs_PresentationController.prototype.reset = function(){
    locateUsPresentationScope.logger.log("#### resetting the all variables of LocateUs_PresentationController ####");
    locateUsPresentationScope.mapStatus = {
      "state" : locateUsPresentationScope.CURRENTLOCATION
    };
    locateUsPresentationScope.currentLatitude = null;
    locateUsPresentationScope.currentLongitude = null;
  };
  /**
  * it navigate to the locateus view from chatbot form
  *@param {Array} locationList - collection of locations
  */
  LocateUs_PresentationController.prototype.showLocateViewWithData = function(locationList){
    locateUsPresentationScope.mapStatus.state = locateUsPresentationScope.CURRENTLOCATION;
    var data = locateUsPresentationScope.ProcessDataForView(locationList);
    locateUsPresentationScope.logger.log("#### processed data : "+JSON.stringify(data)+" ####");
    var navigationManager = applicationManager.getNavigationManager();
    var navigationData = {};
    navigationData.isUserLoggedIn = locateUsPresentationScope.isUserLoggedIn;
    navigationData.data = data;
    var frmLocationController = applicationManager.getPresentationUtility().getController('frmLocationMap',true);
    frmLocationController.bindLocations(navigationData);
    locateUsPresentationScope.isFromChatBot = true;
    locateUsPresentationScope.chatBotData = locationList;
    navigationManager.setCustomInfo("frmLocationMap",navigationData);
    locateUsPresentationScope.presentView();
  };
  /**
  * it navigate to the location details screen from the chatbot
  * @param {Object} data - location details
  */
  LocateUs_PresentationController.prototype.navigateToDetailsFromChatBot = function(data){
    var locationId = data.locationId;
    var list = [];
    list.push(data);
    var processedList = locateUsPresentationScope.ProcessDataForView(list);
    locateUsPresentationScope.getLocationDetails(locationId,processedList[0]);
  };
  return LocateUs_PresentationController;
});