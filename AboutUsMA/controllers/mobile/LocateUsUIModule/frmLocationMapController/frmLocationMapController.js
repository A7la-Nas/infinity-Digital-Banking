define(['CampaignUtility'], function(CampaignUtility){
  return{
  timerCounter : 0,
  isFromBack : false,
  init : function(){
	this.view.mapLocation.onClick = this.onMapClickUI;
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    
    
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  frmLocationPreshow: function() {
    //this.setPreshowData();
    //this.readDataFromNavigatorAndPresentView();
    var scopeObj = this;
    this.isFromBack = true;
    var navigationManager = applicationManager.getNavigationManager();
    var navigationData = navigationManager.getCustomInfo("frmLocationMap");
    var isUserLoggedIn = navigationData.isUserLoggedIn;
    var configManager = applicationManager.getConfigurationManager();
   //osama this.view.onDeviceBack = function () { };
   this.view.onDeviceBack = scopeObj.onflxBack;
    if(configManager.appLaunchedMode  === "shortcut"){
      if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
        this.view.customSearch.flxBack.setVisibility(false);
        this.view.customSearch.btnCancel.setVisibility(true);
      }
      else{this.view.setTitleBarRightSideButtonSkin("Close", "sknBtnffffffSSPSemiBold30px", this.onClose);
          }
    }else{
      if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
        this.view.customSearch.flxBack.setVisibility(true);
        this.view.customSearch.btnCancel.setVisibility(false);
      }
      else{this.view.setTitleBarRightSideButtonSkin("", "sknBtnffffffSSPSemiBold30px", function() {});
          }
    }
	if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone")
      this.view.customSearch.flxHeaderSeparator.setVisibility(true);
    else
      this.view.customSearch.flxHeaderSeparator.setVisibility(false);
    this.setFlowActions();
    this.view.customSearch.tbxSearch.setEnabled(true);
    this.view.customSearchbox.tbxSearch.setEnabled(true);
  this.view.customSearch.tbxSearch.setFocus(false);
    this.view.customSearchbox.tbxSearch.setFocus(false);
    this.view.customSearch.flxBack.onClick = scopeObj.onflxBack;
    this.view.customSearch.btnCancel.onClick = scopeObj.onClose;
    //this.view.onDeviceBack = function () { };
    if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
      this.view.flxHeaderAndSearch.top = "0dp";
      this.view.flxBranchesList.top = "111dp";
    } else {
      this.view.flxHeaderAndSearch.top = "-56dp";
       this.view.flxBranchesList.top = "54dp";
    }
    var LocateUs = applicationManager.getLoggerManager();
    LocateUs.setCustomMetrics(this, false, "Locations");
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    this.resetCustomSearch();
    function campaignPopUpSuccess(response){
      CampaignUtility.showCampaign(response, scopeObj.view);
    }
    function campaignPopUpError(response){
      kony.print(response, "Campaign Not Found!");
    }
    if(isUserLoggedIn){
      CampaignUtility.fetchPopupCampaigns(campaignPopUpSuccess, campaignPopUpError);
    }
    this.view.customSearch.lblLocateUs.skin="sknBtnffffffSSP28px";
  },
  onClose: function() {
    var navManager = applicationManager.getNavigationManager();
    var userObj = applicationManager.getUserPreferencesManager();
    var isLoggedin = userObj.isUserLoggedin();
    if(!isLoggedin || isLoggedin.length === null){
      var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"AuthenticationMA","moduleName":"AuthUIModule"});
      authModule.presentationController.commonFunctionForNavigation("frmLogin");
    }else{
      navManager.goBack();
    }
  },
  onflxBack : function(){
    this.navigateBack();
  },
  setPreshowData: function () {
    if(this.view.flxHeaderSearchbox.height === "40dp") {
      this.resetCustomSearch();
    }
    if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone")
      this.view.customSearch.flxHeaderSeparator.setVisibility(true);
    else
      this.view.customSearch.flxHeaderSeparator.setVisibility(false);
    this.view.customSearch.tbxSearch.text = "";
    this.view.customSearch.tbxSearch.Placeholder = kony.i18n.getLocalizedString("i18n.payments.searchByCityPlaceholder");
    this.view.customSearch.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.footer.locateUs");
    this.view.customSearchbox.tbxSearch.Placeholder = kony.i18n.getLocalizedString("i18n.payments.searchByCityPlaceholder");
    this.view.customSearchbox.btnCancel.text = kony.i18n.getLocalizedString("i18n.TransfersEur.btnCancel");
   // this.view.flxHeaderSearchbox.isVisible = false;
    this.view.flxHeaderSearchbox.height ="0dp";
    this.view.flxHeaderAndSearch.setVisibility(true);
    this.view.flxMap.setVisibility(true);
    this.view.flxCurrentLocation.setVisibility(true);
    this.view.flxFilters.isVisible = false;
    this.view.flxMapButtons.setVisibility(true);
    this.view.flxBranchesList.setVisibility(false);
    this.view.lblListView.text = "List View";
    this.view.imgListView.src = "listview.png";
    this.view.flxDetailsMain.isVisible = false;
  },
  setFlowActions: function () {
    var scopeObj = this;
    kony.print("this.view.flxBranchesList : "+this.view.flxBranchesList);
    this.view.customSearch.tbxSearch.onTouchStart = function () {
      var branchListWidget = scopeObj.view.flxBranchesList;
      kony.print("branch obj :"+branchListWidget);
      if(branchListWidget.isVisible === true){
        branchListWidget.top = "40dp";
      }
      else{
        scopeObj.view.flxMap.top = "40dp";
      }
      kony.print("branch obj :"+branchListWidget);
      if(applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone"){
       // scopeObj.view.flxHeaderAndSearch.isVisible = false;
        scopeObj.view.flxHeaderAndSearch.height = "0dp";
     //   scopeObj.view.flxHeaderSearchbox.isVisible = true;
        scopeObj.view.flxHeaderSearchbox.height ="40dp";
        scopeObj.view.flxHeaderSearchbox.top="0dp";
        scopeObj.view.customSearchbox.tbxSearch.text = scopeObj.view.customSearch.tbxSearch.text;
        scopeObj.view.customSearch.tbxSearch.setEnabled(false);
        scopeObj.view.customSearch.tbxSearch.setFocus(false);
        scopeObj.view.customSearchbox.tbxSearch.setEnabled(true);
        scopeObj.view.customSearchbox.tbxSearch.setFocus(true);
      }
      if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
       // scopeObj.view.flxHeaderAndSearch.isVisible = false;
        scopeObj.view.flxHeaderAndSearch.height = "0dp";
        scopeObj.view.flxHeaderSearchbox.height ="40dp";
        //scopeObj.view.flxHeaderSearchbox.isVisible = true;
        scopeObj.view.flxHeaderSearchbox.top="0dp";
        scopeObj.view.customSearchbox.tbxSearch.text = scopeObj.view.customSearch.tbxSearch.text;
        scopeObj.view.customSearch.tbxSearch.setEnabled(false);
        scopeObj.view.customSearch.tbxSearch.setFocus(false);
        scopeObj.view.customSearchbox.tbxSearch.setEnabled(true);
        scopeObj.view.customSearchbox.tbxSearch.setFocus(true);
      }
      scopeObj.view.forceLayout();
    };
    this.view.customSearchbox.btnCancel.onClick = this.resetCustomSearch;
    this.view.customSearchbox.tbxSearch.onDone = function(){
      scopeObj.onSearch(scopeObj.view.customSearchbox.tbxSearch.text);
    };
    this.view.segBranchList.onRowClick = function(){
      scopeObj.onListViewRowClickHandler(scopeObj.view.segBranchList.selectedItems[0]);
    };
    this.view.flxCurrentLocation.onClick = function(){
      scopeObj.onClickOfCurrentLocation();
    };
    this.view.mapLocation.onPinClick = function (mapId,response) {
      scopeObj.onPinClickHandler(mapId,response);
    };
    this.view.flxBtnListView.onClick = function () {
      var a = scopeObj.view.lblListView.text;
      if (scopeObj.view.lblListView.text === "List View") {
        scopeObj.showListView();
      } else
        scopeObj.showMapView();
    };
    this.view.flxBtnFilters.onClick = function () {
      scopeObj.showFilters();
    };
    this.view.flxFilterClose.onClick = function () {
      scopeObj.view.flxFilters.setVisibility(false);
	  scopeObj.view.flxDetailsMain.setVisibility(false);
      scopeObj.view.flxMapButtons.bottom = "3%";
    };
    this.view.btnApply.onClick = function () {
      //scopeObj.setPreshowData();
      scopeObj.onApplyFilter();
    };
    var self = this.view;
    this.view.segServicesFilter.onRowClick = function(){
      var rowNumber = self.segServicesFilter.selectedRowIndex[1];
      var indices = self.segServicesFilter.selectedRowIndices;
      scopeObj.onRowClickOfSegServicesFilter(indices,rowNumber);
      //   var rowNumber = self.segServicesFilter.selectedRowIndex[1];
      //   var indices = self.segServicesFilter.selectedRowIndices;
      //   scopeObj.onRowClickOfSegServicesFilter(indices,rowNumber);
    };
  },
  resetCustomSearch: function() {
      var scopeObj = this;
      var branchListWidget = scopeObj.view.flxBranchesList;
        if(applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone"){
         if(branchListWidget.isVisible === true){
           branchListWidget.top = "54dp";
      }else{
          this.view.flxMap.top = "54dp";
        }
        scopeObj.view.customSearch.tbxSearch.setEnabled(true);
        scopeObj.view.customSearchbox.tbxSearch.setEnabled(false);
       // scopeObj.view.flxHeaderAndSearch.isVisible = true;
          scopeObj.view.flxHeaderAndSearch.height = "111dp";
        //scopeObj.view.flxHeaderSearchbox.isVisible = false;
          scopeObj.view.flxHeaderSearchbox.height ="0dp";
      }
      if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
        if(branchListWidget.isVisible === true){
        branchListWidget.top = "111dp";
      }else {
         this.view.flxMap.top = "110dp";
      }
        scopeObj.view.customSearch.tbxSearch.setEnabled(true);
        scopeObj.view.customSearchbox.tbxSearch.setEnabled(false);
       // scopeObj.view.flxHeaderAndSearch.isVisible = true;
        scopeObj.view.flxHeaderAndSearch.height = "111dp";
       // scopeObj.view.flxHeaderSearchbox.isVisible = false;
        scopeObj.view.flxHeaderSearchbox.height ="0dp";
      }
      this.view.customSearch.tbxSearch.text = "";
      this.view.customSearchbox.tbxSearch.text = "";
      this.searchString = "";
      scopeObj.view.forceLayout();
  },
  showFullDirections: function () {
    this.view.customSearch.lblLocateUs.text = "GET DIRECTIONS";
    this.view.flxDummy2.setVisibility(true);
    this.view.imgDirections.src = "carddown.png";
    this.view.flxBranchesList.setVisibility(false);
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxDirections.top = "40dp";
    }
    else{
      this.view.flxDirections.top = "0dp";
    }
    this.view.flxDirections.bottom="0dp";
    this.view.flxDirections.setVisibility(true);
    this.view.flxHeaderAndSearch.height = "40dp";
    this.view.flxMapButtons.setVisibility(false);
  },
  showgetDirections: function () {
    this.hideAll();
    this.view.customSearch.lblLocateUs.text = "GET DIRECTIONS";
    this.view.flxHeaderAndSearch.setVisibility(true);
    this.view.flxMap.setVisibility(true);
    this.view.flxDirections.top = "81%";
    this.view.flxDirections.bottom="-70%";
    this.view.imgDirections.src = "cardup.png";
    this.view.flxDirections.setVisibility(true);
    this.view.flxHeaderAndSearch.height = "40dp";
    this.view.flxCurrentLocation.isVisible = false;
    this.view.forceLayout();
  },
  showMapView : function(){
    if(this.view.flxHeaderSearchbox.height ==="40dp") {
      this.view.flxMap.top = "40dp";
    }
    else
    {
      if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone")
        this.view.flxMap.top = "110dp";
      else
        this.view.flxMap.top = "54dp";
    }
    this.view.flxMap.setVisibility(true);
    this.view.flxCurrentLocation.setVisibility(true);
    this.view.flxFilters.isVisible = false;
    this.view.flxMapButtons.setVisibility(true);
    this.view.lblListView.text = "List View";
    this.view.imgListView.src = "listview.png";
    this.view.flxDetailsMain.isVisible = false;
    this.view.flxBranchesList.setVisibility(false);
    this.view.forceLayout();
    },
  showListView: function () {
    if(this.view.flxHeaderSearchbox.height ==="40dp") {
      this.view.flxBranchesList.top = "40dp";
    }
    else
    {
      if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone")
        this.view.flxBranchesList.top = "110dp";
      else
        this.view.flxBranchesList.top = "54dp";
    }
//       this.resetCustomSearch();
//     }
    this.view.flxBranchesList.setVisibility(true);
    this.view.imgListView.src = "mapviewicon.png";
    this.view.lblListView.text = "Map View";
    this.view.flxMapButtons.setVisibility(true);
    //this.setBranchListData();
    this.view.flxMapButtons.bottom = "3%";
    this.view.flxMap.setVisibility(false);
    this.view.forceLayout();
  },
  showFilters: function () {
	if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxFilters.top = "8%";
      this.view.flxFilters.height = "92%";
    }
    this.view.flxFilters.setVisibility(true);
    //this.setShowFilterData();
    applicationManager.getPresentationUtility().showLoadingScreen();
    this.setDataToServices();
    this.setDataToShow();
    this.setDataToRange();
    this.view.flxFilters.setVisibility(true);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  showFullDetails: function () {
    this.view.flxMapButtons.setVisibility(false);
    this.view.flxDummy.setVisibility(true);
    this.view.flxHeaderAndSearch.height = "40dp"
    this.view.flxDetails.setVisibility(true);
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxDetails.top = "40dp";
    }
    else{
      this.view.flxDetails.top = "0dp";
    }
    this.view.flxDetails.bottom="0dp"
    this.view.imgDetails.src = "carddown.png";
    //this.setOperationalHoursData();
    //this.setServicesData();
  },
  //   setGesture: function () {
  //     var scopeObj = this;
  //     this.view.flxDirections.setGestureRecognizer(constants.GESTURE_TYPE_SWIPE, {
  //       fingers: 1
  //     },
  //     function (widgetRef, gestureInfo) {
  //       if (gestureInfo.swipeDirection === 3) {
  //         scopeObj.animateFlxUp();
  //       } else if (gestureInfo.swipeDirection === 4) {
  //         scopeObj.animateFlxDown();
  //       }
  //     }.bind(this));
  //   },
  //   animateFlxUp: function () {
  //     var flx;
  //     if (this.view.flxDetails.isVisible)
  //       flx = this.view.flxDetails;
  //     else if (this.view.flxDirections.isVisible)
  //       flx = this.view.flxDirections;
  //     else flx = null;
  //     if (flx !== null) {
  //       flx.animate(
  //         kony.ui.createAnimation({
  //           "100": {
  //             "top": "7%",
  //             "stepConfig": {
  //               "timingFunction": kony.anim.EASE
  //             },
  //             "rectified": true
  //           }
  //         }), {
  //           "delay": 0,
  //           "iterationCount": 1,
  //           "fillMode": kony.anim.FILL_MODE_FORWARDS,
  //           "duration": 0.5
  //         }, {});
  //       if (this.view.flxDetails.isVisible)
  //         this.showFullDetails();
  //       else if (this.view.flxDirections.isVisible)
  //         this.showFullDirections();
  //     }
  //   },
  //   animateFlxDown: function () {
  //     var flx;
  //     if (this.view.flxDetails.isVisible)
  //       flx = this.view.flxDetails;
  //     else if (this.view.flxDirections.isVisible)
  //       flx = this.view.flxDirections;
  //     else flx = null;
  //     if (flx !== null) {
  //       flx.animate(
  //         kony.ui.createAnimation({
  //           "100": {
  //             "top": "81%",
  //             "stepConfig": {
  //               "timingFunction": kony.anim.EASE
  //             },
  //             "rectified": true
  //           }
  //         }), {
  //           "delay": 0,
  //           "iterationCount": 1,
  //           "fillMode": kony.anim.FILL_MODE_FORWARDS,
  //           "duration": 0.5
  //         }, {});
  //       if (this.view.flxDetails.isVisible)
  //         this.showSelectedLocation();
  //       else if (this.view.flxDirections.isVisible)
  //         this.showgetDirections();
  //     }
  //   },
  bindLocations : function(navigationData){
    var isUserLoggedIn = navigationData.isUserLoggedIn;
    var data = navigationData.data;
    this.setPreshowData();
    this.enableOrDisableHamburger(isUserLoggedIn);
    this.setDataToMapView(data);
    this.setDataToListSegView(data);
  },
  readDataFromNavigatorAndPresentView : function(){
    var navigationManager = applicationManager.getNavigationManager();
    var navigationData = navigationManager.getCustomInfo("frmLocationMap");
    var isUserLoggedIn = navigationData.isUserLoggedIn;
    var data = navigationData.data;
    this.enableOrDisableHamburger(isUserLoggedIn);
    this.setDataToMapView(data);
    this.setDataToListSegView(data);
  },
  enableOrDisableHamburger :function(isUserLoggedIn){
    isUserLoggedIn = false;
    if(isUserLoggedIn){
      this.view.customSearch.flxBack.imgBack.src = "hamburger.png";
      var configManager = applicationManager.getConfigurationManager();
      var MenuHandler =  applicationManager.getMenuHandler();
      MenuHandler.setUpHamburgerForForm(this,configManager.constants.MENULOCATE);
      if(applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone"){
        this.view.flxMap.bottom = "60dp";
      }
      else{
        this.view.flxMap.bottom = "0dp";
        //this.view.flxFooter.isVisible = false;
      }
    }else{
      var scope = this;
      //this.view.flxFooter.isVisible = false;
      this.view.flxMap.bottom = "0dp";
      this.view.customSearch.flxBack.imgBack.src = "backbutton.png";
      this.view.customSearch.flxBack.onClick =scope.onflxBack;
    }
  },
    navigateBack : function(){
      var userObj = applicationManager.getUserPreferencesManager();
      var Login = userObj.isUserLoggedin();
      if(Login === true){
        //           var navManager = applicationManager.getNavigationManager();
        //           navManager.goBack();
        var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"HomepageMA","moduleName": "AccountsUIModule"});
        accountMod.presentationController.showDashboard();

      }
      else{
        var informationPC = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"AboutUsMA","moduleName": "InformationUIModule"});
        informationPC.presentationController.commonFunctionForNavigation({"appName":"AuthenticationMA","friendlyName": "AuthUIModule/frmLogin"});
      }
    },
  setDataToMapView:function(data){
    try{
      applicationManager.getPresentationUtility().showLoadingScreen();
      if(data && data.length >0){
        var locateUsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" :"AboutUsMA","moduleName":"LocateUsUIModule"});
        var zoomLevel = locateUsModule.presentationController.getMapZoomLevel();
        this.oldLocationData = data;
        this.setDataToMapViewHelper(data,zoomLevel);
      }
      else{
        this.view.mapLocation.locationData=[];
      }
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }catch(err){
      kony.print(err+JSON.stringify(err));
    }
  },
  setDataToMapViewHelper : function(data,zoomLevel){
    this.view.mapLocation.zoomLevel = 15;
    this.view.mapLocation.locationData=data;
    this.view.forceLayout();
    this.navigateToFirstLocationInMap();
  },
  setDataToListSegView : function(data){
    try{
      applicationManager.getPresentationUtility().showLoadingScreen();
      if(data && data.length > 0){
        this.view.segBranchList.widgetDataMap = {
          imgBank : "listViewImage",
          lblName : "name",
          lblAddress : "desc",
          lblSatus : "listViewStatus"
        };
        this.view.segBranchList.setData(data.slice(0,-1));
        this.view.segBranchList.selectedRowIndex = [0,0];
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
    }catch(err){
      kony.print(err+JSON.stringify(err));
    }
  },
  navigateToFirstLocationInMap : function(){
    this.view.mapLocation.navigateTo(0,false);
  },
  onListViewRowClickHandler : function(locationDetails){
    this.getLocationDetails(locationDetails);
  },
  getLocationDetails : function(selectedLocation){
    var locationId = selectedLocation.locationId;
    var locateUsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" :"AboutUsMA","moduleName":"LocateUsUIModule"});
    locateUsModule.presentationController.getLocationDetails(locationId,selectedLocation);
  },
  onSearch : function(searchStr){
    if(searchStr === null || searchStr === undefined || searchStr === ""){
      return;
    }
    this.searchString = "";
    this.searchString = searchStr;
    var locateUsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" :"AboutUsMA","moduleName":"LocateUsUIModule"});
    locateUsModule.presentationController.getLocationsBySearch(searchStr);
  },
  searchLocationsSuccess : function(data){
    var locateUsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" :"AboutUsMA","moduleName":"LocateUsUIModule"});
    var processedData = locateUsModule.presentationController.ProcessDataForView(data);
    var state = locateUsModule.presentationController.getMapState();
    //this.setPreshowData();
    if(state === locateUsModule.presentationController.SEARCH || state === locateUsModule.presentationController.SEARCH_FILTER){
      this.view.customSearch.tbxSearch.text = this.searchString;
    }
    this.setDataToMapView(processedData);
    this.setDataToListSegView(processedData);
  },
  bindError : function(err){
    applicationManager.getDataProcessorUtility().showToastMessageError(this,err);
  },
  setDataToServices : function(){
    var locateUsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" :"AboutUsMA","moduleName":"LocateUsUIModule"});
    var mapState = locateUsModule.presentationController.getMapState();
    if(mapState === locateUsModule.presentationController.CURRENTLOCATION_FILTER || mapState === locateUsModule.presentationController.SEARCH_FILTER){
      /* if form is already in filtered state(if filter already applied) then preserve the filter data*/
      this.setSelectedDataToServices();
      return;
    }
    var self = this;
    var services = this.getServicesMasterData();
    var data = [];
    var dataMap = {
      "flxCheckbox": "flxCheckbox",
      "flxRange": "flxRange",
      "imgCheckbox": "imgCheckbox",
      "lblRange": "lblRange",
      "lblSeparator": "lblSeparator",
    };
    var defaultSelectedRowIndices = [];
    for(var i=0;i<services.length;i++){
      defaultSelectedRowIndices.push(i);
      var dataElement = {
        "imgCheckbox": {
          "src": "radiobtn.png"
        },
        "lblRange":services[i],
        "lblSeparator": ".",
        "flxCheckbox": {
          onClick: function () {
            //self.toggleCheckbox(self.view.segServicesFilter.id);
          }
        },
        "template": "flxRange"
      };
      data.push(dataElement);
    }
    this.view.segServicesFilter.widgetDataMap = dataMap;
    this.view.segServicesFilter.setData(data);
    this.view.segServicesFilter.selectedRowIndices = [[0,defaultSelectedRowIndices]];
    this.view.forceLayout();
  },
  setSelectedDataToServices : function(){
    var selectedServices = this.selectedServices;
    this.view.segServicesFilter.selectedRowIndices = selectedServices;
    this.view.forceLayout();
  },
  /**
  *this function preserves the range selection segment in filter
  */
  setSelectedDataToRange : function(){
    var selectedRange = this.selectedRange;
    this.view.segSelectSearchRange.selectedRowIndices = selectedRange;
    this.view.forceLayout();
  },
  /**
  * it send the master data for range selection segment
  */
  getServicesMasterData : function(){
    var services = [
      "All",
      "Make an Appointment",
      "On-site Relationship Manager",
      "Home Loan Specialists",
      "Financial Advisors",
      "Investment Services",
      "Foreign Currency Exchange",
      "Retail Branch",
      "Wealth Branch",
      "Business Banking",
      "International Banking Center",
      "Commercial Deposits",
      "Night Deposits",
      "Safe Deposit Box",
      "Handicap Access",
      "ATM - Full Service",
      "ATM - Cash withdrawal Only",
      "ATM - Check Deposits",
      "ATM - Cash Deposits",
      "ATM - Cardless Cash Withdrawal",
      "ATM - Drive Up"
    ];
    return services;
  },
  setDataToShow : function(){
    var locateUsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" :"AboutUsMA","moduleName":"LocateUsUIModule"});
    var mapState = locateUsModule.presentationController.getMapState();
    if(mapState === locateUsModule.presentationController.CURRENTLOCATION_FILTER || mapState === locateUsModule.presentationController.SEARCH_FILTER){
      this.view.segShow.selectedRowIndices = this.selectedType;
      return;
    }
    else{
      this.view.segShow.selectedRowIndices = [[0,[2]]];
    }
  },
  /**
  * it will assign the master data of range to segment
  */
  setDataToRange : function(){
    var locateUsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" :"AboutUsMA","moduleName":"LocateUsUIModule"});
    var mapState = locateUsModule.presentationController.getMapState();
    if(mapState === locateUsModule.presentationController.CURRENTLOCATION_FILTER || mapState === locateUsModule.presentationController.SEARCH_FILTER){
      this.setSelectedDataToRange();
      return;
    }
    var rangeData = this.getRangeMasterData();
    var self = this;
    var dataMap = {
      "flxCheckbox": "flxCheckbox",
      "flxRange": "flxRange",
      "imgCheckbox": "imgCheckbox",
      "lblRange": "lblRange",
      "lblSeparator": "lblSeparator",
    };
    var data = [];
    for(var i=0;i<rangeData.length;i++){
      var dataElt = {
        "imgCheckbox": {
          "src": "radiobtn.png"
        },
        "lblRange": rangeData[i],
        "lblSeparator": ".",
        "flxCheckbox": {
          onClick: function () {
            //self.toggleCheckbox(self.view.segSelectSearchRange.id);
          }
        },
        "template": "flxRange"
      };
      data.push(dataElt);
    }
    this.view.segSelectSearchRange.onRowClick = function(){
      // self.toggleCheckbox(self.view.segSelectSearchRange.id);
    };
    this.view.segSelectSearchRange.widgetDataMap = dataMap;
    this.view.segSelectSearchRange.setData(data);
    this.view.segSelectSearchRange.selectedRowIndices = [[0,[0]]];
    this.view.forceLayout();
  },
  /**
  * it send the master data for range selection segment
  */
  getRangeMasterData : function(){
    var data = ["5 Miles","10 Miles","25 Miles","50 Miles","100 Miles"];
    return data;
  },
  /**
  * it send the mapper for services
  */
  getServicesMasterDataMapper : function(){
    var mapper = {
      "All" : "All",
      "Make an Appointment" : "",
      "On-site Relationship Manager" : "",
      "Home Loan Specialists" : "finance",
      "Financial Advisors" : "finance",
      "Investment Services" : "",
      "Foreign Currency Exchange" : "finance",
      "Retail Branch" : "bank",
      "Wealth Branch" : "",
      "Business Banking" : "bank",
      "International Banking Center" : "bank",
      "Commercial Deposits" : "bank",
      "Night Deposits" : "bank",
      "Safe Deposit Box" : "bank",
      "Handicap Access" : "",
      "ATM - Full Service" : "atm",
      "ATM - Cash withdrawal Only" : "atm",
      "ATM - Check Deposits" : "atm",
      "ATM - Cash Deposits" : "atm",
      "ATM - Cardless Cash Withdrawal" : "atm",
      "ATM - Drive Up" : "atm"
    };
    return mapper;
  },
  /**
  *it calls the presentation controller method to filter the locations with selected services
  */
  applyFilterToData : function(data){
    var selectedType = this.view.segShow.selectedRowIndices[0][1];
    var locateUsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" :"AboutUsMA","moduleName":"LocateUsUIModule"});
    var selectedServices = this.view.segServicesFilter.selectedRowIndices[0][1];
    var mappedSelectedServices = this.getMappedSelectedServices(selectedServices);
    var i18n_noResults = applicationManager.getPresentationUtility().getStringFromi18n("i18n.maps.NoResultsFound","No Results Found");
    if(mappedSelectedServices === null || mappedSelectedServices.length === 0){
      this.bindGenericError(i18n_noResults);
      return;
    }
    var type = this.getSegShowMapper(selectedType[0]);
    var filteredData = locateUsModule.presentationController.filterLocationsWithServices(data,mappedSelectedServices,type);
    if(filteredData.length > 0){
      this.setFilteredDataToView(filteredData);
    }else{
      this.bindGenericError(i18n_noResults);
    }
  },
  /**
  *it maps the view segment selected services to backed services with mapper
  */
  getMappedSelectedServices : function(serviceIndexes){
    var mapper = this.getServicesMasterDataMapper();
    var services = this.getServicesMasterData();
    var result = [];
    for(var i=0;i<serviceIndexes.length;i++){
      var mapedElt = mapper[services[serviceIndexes[i]]];
      if(mapedElt !== null && mapedElt !== undefined)
        result.push(mapedElt);
    }
    return result;
  },
  /**
  *it will set the filtered data to view
  */
  setFilteredDataToView : function(data){
    var locateUsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" :"AboutUsMA","moduleName":"LocateUsUIModule"});
    var processedData = locateUsModule.presentationController.ProcessDataForView(data);
    var state = locateUsModule.presentationController.getMapState();
    this.setPreshowData();
    this.setDataToMapView(processedData);
    this.setDataToListSegView(processedData);
    if(state === locateUsModule.presentationController.SEARCH || state === locateUsModule.presentationController.SEARCH_FILTER){
      this.view.customSearch.tbxSearch.text = this.searchString;
    }
  },
  getSegShowMapper : function(number){
    if(number === 0){
      return "branch";
    }
    if(number === 1){
      return "atm";
    }
    if(number === 2){
      return "both";
    }
  },
  /**
  *on click of filter it call presentation method to make a service call with range
  */
  onApplyFilter : function(){
    this.selectedType = this.view.segShow.selectedRowIndices;
    this.selectedServices = this.view.segServicesFilter.selectedRowIndices;
    this.selectedRange = this.view.segSelectSearchRange.selectedRowIndices;
    if(this.selectedServices === null || this.selectedRange === null){
      var i18nErrmsg = applicationManager.getPresentationUtility().getStringFromi18n("i18n.maps.selectService","Please select a service.");
      this.bindError(i18nErrmsg);
      return;
    }
    var range = this.getSelectedRangeData();
    applicationManager.getPresentationUtility().showLoadingScreen();
    var locateUsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" :"AboutUsMA","moduleName":"LocateUsUIModule"});
    var polylineData = locateUsModule.presentationController.getLocationsNearFirstLocationWithRange(range);
  },
  /**
  *it returns the selected range in filter Ex: 5
  */
  getSelectedRangeData : function(){
    var filterRange = this.view.segSelectSearchRange.selectedRowIndices;
    var index = filterRange[0][1][0];
    var data = this.getRangeMasterData()[index].split(" ");
    return data[0];
  },
  bindGenericError : function(err){
    applicationManager.getDataProcessorUtility().showToastMessageError(this,err);
  },
  onRowClickOfSegServicesFilter : function(indices,rowNumber){
    if(indices === null){
      return;
    }
    if(rowNumber === 0){
      var keys = indices;
      var indexes = keys[0][1];
      if(indexes[0] === 0){
        var length = this.getServicesMasterData().length;
        var res = [];
        for(var i=0;i<length;i++){
          res.push(i);
        }
        this.view.segServicesFilter.selectedRowIndices = [[0,res]];
      }
      else{
        this.view.segServicesFilter.selectedRowIndices = null;
      }
      return;
    }
    if(rowNumber > 0){
      var selectedIndices = indices;
      var values = selectedIndices[0][1];
      if(values.indexOf(rowNumber) === -1){
        var resultVal = [];
        var j = 0;
        if(values[0] === 0 ){
          j = 1;
        }
        for(;j<values.length;j++){
          resultVal.push(values[j]);
        }
        this.view.segServicesFilter.selectedRowIndices = [[0,resultVal]];
      }else{
        var len = values.length;
        var length = this.getServicesMasterData().length;
        if(len == (length -1))
        {
          var res = [];
          for(var i=0;i<length;i++){
            res.push(i);
          }
          this.view.segServicesFilter.selectedRowIndices = [[0,res]];
        }
      }
    }
  },
  onClickOfCurrentLocation : function(){
    var scope = this;
    var locateUsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" :"AboutUsMA","moduleName":"LocateUsUIModule"});
    var status = locateUsModule.presentationController.getMapState();
    if(status === locateUsModule.presentationController.CURRENTLOCATION || status == locateUsModule.presentationController.CURRENTLOCATION_FILTER){
      var latLongObj = {};
      latLongObj.latitude = locateUsModule.presentationController.currentLatitude;
      latLongObj.longitude = locateUsModule.presentationController.currentLongitude;
      scope.navigateToGivenLocation(latLongObj);
    }
    if(status === locateUsModule.presentationController.SEARCH || status === locateUsModule.presentationController.SEARCH_FILTER){
      scope.getLocationsNearBy();
    }
  },
  navigateToGivenLocation : function(latLongObj){
    var showDropPin = true;
    //#ifdef android
    showDropPin = false;
    //#endif
    this.view.mapLocation.navigateToLocation({ lat: latLongObj.latitude,
                                              lon: latLongObj.longitude,
                                              image:"current_location.png",
                                              showcallout: false
                                             }, false, showDropPin);
  },
  getLocationsNearBy : function(){
    var scopeObj = this;
    var positionoptions = {
      timeout: 64000,
      fastestInterval: 0,
      minimumTime: 0
    };
    this.searchString = null;
    applicationManager.getPresentationUtility().showLoadingScreen();
    kony.location.getCurrentPosition(scopeObj.geoLocationSuccessCallBack.bind(scopeObj), scopeObj.geoLocationErrorCallBack.bind(scopeObj), positionoptions);
  },
  geoLocationSuccessCallBack: function(response) {
    try {
      var latitude, longitude;
      var latLongObj = {};
      if (response && response.coords && response.coords.latitude && response.coords.longitude) {
        latitude = response.coords.latitude;
        longitude = response.coords.longitude;
        latLongObj.latitude = latitude;
        latLongObj.longitude = longitude;
        var  locateUsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" :"AboutUsMA","moduleName":"LocateUsUIModule"});
        locateUsModule.presentationController.getNearByLocations(latLongObj);
      }
    } catch (err) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
  },
  geoLocationErrorCallBack: function(err) {
    var scopeObj = this;
    var deviceUtilManager = applicationManager.getDeviceUtilManager();
    var isIphone = deviceUtilManager.isIPhone();
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (err.code == 1) {
      var i18nKey = applicationManager.getPresentationUtility().getStringFromi18n("i18n.maps.locationPermissionDenied");
      scopeObj.bindGenericError(i18nKey);
    }
    if (err.code == 3 && !isIphone) {
      var i18n_timeOut = applicationManager.getPresentationUtility().getStringFromi18n("i18n.maps.locationTimeOut");
      scopeObj.bindGenericError(i18n_timeOut);
    }
    if (err.code == 2 && !isIphone) {
      var i18n_turnOnLocationAlert = applicationManager.getPresentationUtility().getStringFromi18n("i18n.maps.turnOnLocationAlert");
      kony.ui.Alert(i18n_turnOnLocationAlert, scopeObj.onClickSettingsOrCancelHandler.bind(scopeObj), constants.ALERT_TYPE_CONFIRMATION, "Cancel", "Settings", "");
    }
  },
  onClickSettingsOrCancelHandler: function(response) {
    if (response === false) {
      var  locateUsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" :"AboutUsMA","moduleName":"LocateUsUIModule"});
      locateUsModule.presentationController.openLocationSettings();
    }
  },
  /**
  * Handling the on pin click of map
  */
  onPinClickHandler : function(mapId,locationDetails){
    if(locationDetails.image !== "current_location.png"){
      this.fromSegRowClick = false;
      //this.showSelectedLocation();
      this.selectedData = locationDetails;
      this.setDataToCalloutFlex(locationDetails);
      var selectedLocation = {};
       selectedLocation.lat = locationDetails.lat;
       selectedLocation.lon = locationDetails.lon;
      var navigationManager = applicationManager.getNavigationManager();
      navigationManager.setCustomInfo("getDirection",selectedLocation);
      //this.getLocationDetails(locationDetails);
	  this.onPinClickUI();
    }
    else
      {
        this.onMapClickUI();
      }
  },
  setDataToCalloutFlex : function(locationDetails){
    this.view.lblBranchName.text = locationDetails.name;
    this.view.lblStatus.text = locationDetails.calloutStatus.text;
    this.view.lblStatus.skin = locationDetails.calloutStatus.skin;
    this.view.lblAddress1.text = locationDetails.desc;
    this.view.lblAddress2.text = "";
    this.view.lblDistance.text = "";
    this.selectedLocation = locationDetails;
    var scope = this;
    this.view.flxDetailsMain.onClick = function(){
      scope.onListViewRowClickHandler(locationDetails);
    };
  },
  onMapClickUI : function(){
    if(this.view.flxDetailsMain.isVisible)
      {
     this.view.flxDetailsMain.setVisibility(false);
    // this.view.flxMapButtons.bottom="100dp";
    this.view.flxMapButtons.animate(
      kony.ui.createAnimation({
        0: { bottom: "100dp", "stepConfig": {} },
        100: { bottom: "20dp", "stepConfig": {} }
      }),
      { fillMode: kony.anim.FILL_MODE_FORWARDS, duration: 0.2 },
      { animationEnd: function () {} });
    this.view.flxDetailsMain.animate(
      kony.ui.createAnimation({
        0: { bottom: "0dp", "stepConfig": {} },
        100: { bottom: "-80dp", "stepConfig": {} }
      }),
      { fillMode: kony.anim.FILL_MODE_FORWARDS, duration: 0.2 },
      { animationEnd: function () {} });
      }
  },
  onPinClickUI : function(){
    if(!this.view.flxDetailsMain.isVisible)
   {
     this.view.flxDetailsMain.setVisibility(true);
    // this.view.flxMapButtons.bottom="100dp";
    this.view.flxMapButtons.animate(
      kony.ui.createAnimation({
        0: { bottom: "20dp", "stepConfig": {} },
        100: { bottom: "100dp", "stepConfig": {} }
      }),
      { fillMode: kony.anim.FILL_MODE_FORWARDS, duration: 0.2 },
      { animationEnd: function () {} });
    this.view.flxDetailsMain.animate(
      kony.ui.createAnimation({
        0: { bottom: "-80dp", "stepConfig": {} },
        100: { bottom: "0dp", "stepConfig": {} }
      }),
      { fillMode: kony.anim.FILL_MODE_FORWARDS, duration: 0.2 },
      { animationEnd: function () {} });
   }
  },
  getDirections : function(selectedLocationData){
    var scopeObj = this;
    applicationManager.getPresentationUtility().showLoadingScreen();
    var source = {};
    var destination = {};
    //var selectedLocationData = scopeObj.selectedData;
    destination.latitude = selectedLocationData.lat;
    destination.longitude = selectedLocationData.lon;
    var positionoptions = {timeout:64000,fastestInterval:0,minimumTime : 0};
    var customInfo = {};
    customInfo.selectedLocation = selectedLocationData;
    customInfo.locationDetails = null;
    var navigationManager = applicationManager.getNavigationManager();
    navigationManager.setCustomInfo("frmLocationDetails",customInfo);
    kony.location.getCurrentPosition(success,failure,positionoptions);
    function success(response){
      if(response && response.coords && response.coords.latitude && response.coords.longitude){
        source.latitude = response.coords.latitude;
        source.longitude = response.coords.longitude;
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo('LocationsCurrentForm','frmLocationMap');
        scopeObj.view.getdirection.originPlace = response.coords.latitude+","+response.coords.longitude;
        scopeObj.view.getdirection.destinationPlace = selectedLocationData.lat+","+selectedLocationData.lon;
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
    }
    function failure(error){
      scopeObj.geoLocationErrorCallBack(error);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
  }
  };
});