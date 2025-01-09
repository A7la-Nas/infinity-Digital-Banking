define({
  timerCounter : 0,
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  frmLocationPostshow: function(){
    this.setGesture();
  },
  frmLocationPreshow: function () {
    this.view.flxMap.setVisibility(true);
    this.view.flxCurrentLocation.setVisibility(false);
    this.bindData();
    this.view.onDeviceBack = function () { };
    this.view.onDeviceBack = function () { };
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
        this.view.flxHeader.setVisibility(true);
    }
    else{
        this.view.flxHeader.setVisibility(false);
    }
    var scope = this;
    this.view.customHeader.flxBack.onClick = function(){
      scope.navigateBack();
    };
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  navigateBack : function(){
    var navigationManager = applicationManager.getNavigationManager();
    navigationManager.goBack();
  },
  showFullDirections: function () {
    //this.view.customSearch.lblLocateUs.text = "GET DIRECTIONS";
    //this.view.flxDummy2.setVisibility(true);
    this.view.imgDirections.src = "carddown.png";
    //this.view.flxBranchesList.setVisibility(false);
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
        this.view.flxDirections.top = "40dp";
    }
    else{
      this.view.flxDirections.top = "0dp";
     }
    this.view.flxDirections.bottom="0dp";
    this.view.flxDirections.setVisibility(true);
    //this.view.flxHeaderAndSearch.height = "40dp";
    //this.view.flxMapButtons.setVisibility(false);
  },
  showgetDirections: function () {
    //this.hideAll();
    //this.view.customSearch.lblLocateUs.text = "GET DIRECTIONS";
    //this.view.flxHeaderAndSearch.setVisibility(true);
    this.view.flxMap.setVisibility(true);
    this.view.flxDirections.top = "81%";
    this.view.flxDirections.bottom="-70%";
    this.view.imgDirections.src = "cardup.png";
    this.view.flxDirections.setVisibility(true);
    //this.view.flxHeaderAndSearch.height = "40dp";
    this.view.flxCurrentLocation.isVisible = false;
    this.view.forceLayout();
  },
  setGesture: function () {
    var scopeObj = this;
    this.view.flxDirectionMain.setGestureRecognizer(constants.GESTURE_TYPE_SWIPE, {
      fingers: 1
    },
    function (widgetRef, gestureInfo) {
      if (gestureInfo.swipeDirection === 3) {
        scopeObj.animateFlxUp();
      } else if (gestureInfo.swipeDirection === 4) {
        scopeObj.animateFlxDown();
      }
    }.bind(this));
  },
  animateFlxUp: function () {
    var flx;
    if (this.view.flxDirections.isVisible)
      flx = this.view.flxDirections;
    else flx = null;
    if (flx !== null) {
      flx.animate(
        kony.ui.createAnimation({
          "100": {
            "top": "7%",
            "stepConfig": {
              "timingFunction": kony.anim.EASE
            },
            "rectified": true
          }
        }), {
          "delay": 0,
          "iterationCount": 1,
          "fillMode": kony.anim.FILL_MODE_FORWARDS,
          "duration": 0.5
        }, {});
      if (this.view.flxDirections.isVisible)
        this.showFullDirections();
    }
  },
  animateFlxDown: function () {
    var flx;
    if (this.view.flxDirections.isVisible)
      flx = this.view.flxDirections;
    else flx = null;
    if (flx !== null) {
      flx.animate(
        kony.ui.createAnimation({
          "100": {
            "top": "81%",
            "stepConfig": {
              "timingFunction": kony.anim.EASE
            },
            "rectified": true
          }
        }), {
          "delay": 0,
          "iterationCount": 1,
          "fillMode": kony.anim.FILL_MODE_FORWARDS,
          "duration": 0.5
        }, {});
      if (this.view.flxDirections.isVisible)
        this.showgetDirections();
    }
  },
  bindData : function(){
    var navManager = applicationManager.getNavigationManager();
    var directions = navManager.getCustomInfo("frmLocationDirections");
    var details = navManager.getCustomInfo("frmLocationDetails");
    var selectedLocation = details.selectedLocation;
    this.selectedLocation = selectedLocation;
    this.showDirections(directions);
  },
  showDirections : function(directions){
    var routes = directions;
    if(routes && routes.length > 0){
      //this.disableOnPinClick();
      //this.showgetDirections();
      this.setDirectionsDataToMap(routes);
      this.setStepDirectionsData(routes);
    }
    else{
      var i18n_noDirections = applicationManager.getPresentationUtility().getStringFromi18n("i18n.maps.NoDirectionsFound","Directions are not available for this location");
      this.bindError(i18n_noDirections);
    }
  },
  bindError : function(err){
    applicationManager.getDataProcessorUtility().showToastMessageError(this,err);
  },
  setDirectionsDataToMap : function(routes){
    //this.view.mapLocation.clear();
    //this.view.mapLocation.locationData = [];
    //this.view.forceLayout();
    var destinationInfo = this.selectedLocation;
    var routeColors = ["0000FFFF","FF00FFFF","FF0000FF","FFFF00FF","0x000000FF"];
    this.routes = [];
    for(var i=0;i<routes.length;i++)
    {
      this.routes.push("route"+i);
      this.drawRoute("route"+i, routes[i].polylinePoints, routeColors[i],destinationInfo);
    }
    this.view.mapDirections.isVisible = true;
    //this.view.forceLayout();
  },
  drawRoute : function(routeid,polyPoints,color,destinationInfo){
    var locateUsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"AboutUsMA","moduleName":"LocateUsUIModule"});
    var polylineData = locateUsModule.presentationController.processPolylineData(routeid,polyPoints,color,destinationInfo);
    this.addPolylineToMap(polylineData,destinationInfo);
  },
  /**
  *it will add the polyline to map
  */
  addPolylineToMap : function(polylineData,destinationInfo){
    kony.print("####  adding polyline  ####");
    this.view.mapDirections.zoomLevel = 14;
    this.view.mapDirections.addPolyline(polylineData);
    kony.print("#### added polyline with data "+JSON.stringify(polylineData)+" ####");
    this.view.forceLayout();
  },
  /**
  *
  it will set the text routes to segment
  */
  setStepDirectionsData : function(routes){
    var locateUsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"AboutUsMA","moduleName":"LocateUsUIModule"});
    var stepData = locateUsModule.presentationController.processStepDirectionsData(routes);
    this.view.lblDistanceAndTime.text = String(stepData.totalDistance)+" ("+String(stepData.totalDuration)+")";
    this.view.segDirections.setData(stepData.directionsList);
  },
});