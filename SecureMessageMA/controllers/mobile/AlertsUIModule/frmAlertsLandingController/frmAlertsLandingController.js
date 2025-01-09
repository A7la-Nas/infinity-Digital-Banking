define(['CommonUtilities'],function(CommonUtilities){ 
 return {
 //Type your controller code here
  segData : [],
  filteredData : [],
  filterOptions : [],
  contentOffset : "0dp",
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    this.storeFilterOptions();
  },
  storeFilterOptions : function(){
    this.filterOptions.push(this.view.flxOptions);
    this.filterOptions.push(this.view.flxOptions2);
    this.filterOptions.push(this.view.flxOptions3);
  },
  preshow : function()
  {
    this.setFlowActions();
    this.setPreshowData();
    var alertsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AlertsUIModule");
    var filterCategories = alertsModule.presentationController.getFilterCategories();
    this.setAppliedFilters(filterCategories);
    this.setFilterData(filterCategories);
    this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.Alerts.Notifications");
    this.view.customSearchbox.tbxSearch.placeholder= kony.i18n.getLocalizedString("kony.mb.common.search");
    this.view.lblNoAlertsText.text = kony.i18n.getLocalizedString("kony.mb.alertsandmessages.noalert");
  },
  setFlowActions: function()
  {
    this.view.customHeader.flxBack.onClick = this.flxBackOnclick;
    this.view.customSearchbox.tbxSearch.onTextChange = this.searchNotification;
    this.view.btnCancel.onClick = this.hideDeletePopUp;
    this.view.btnRemove.onClick = this.deleteNotificationConfirm;
    this.view.customSearchbox.flxSearch.onClick = this.showFilterOptions;
    this.view.onDeviceBack = this.flxBackOnclick;
    if(!kony.sdk.isNullOrUndefined(this.view.imgClose))
    this.view.imgClose.onTouchStart = this.removeFilter.bind(this,"ALERT_CAT_ACCOUNTS");
    if(!kony.sdk.isNullOrUndefined(this.view.imgClose2))
    this.view.imgClose2.onTouchStart = this.removeFilter.bind(this,"ALERT_CAT_SECURITY");
    if(!kony.sdk.isNullOrUndefined(this.view.imgClose3))
    this.view.imgClose3.onTouchStart = this.removeFilter.bind(this,"ALERT_CAT_TRANSACTIONAL");
  },
  setFilterData: function(filterCategories)
  {
    var navManager = applicationManager.getNavigationManager();
    var alertsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AlertsUIModule");
    var data = alertsModule.presentationController.getNotificationData();
    var areAllFiltersChoosen = alertsModule.presentationController.allAlertsChoosen;
    if(areAllFiltersChoosen){
      navManager.setCustomInfo("frmAlertsLanding",data);
      this.filteredData = data;
      this.setDataToSegment();
    }
    else{
      var filteredData = alertsModule.presentationController.filterNotifications("notificationCategory",filterCategories,data);
      navManager.setCustomInfo("frmAlertsLanding",filteredData);
      this.filteredData = filteredData;
      this.setDataToSegment();
    }
  },
  removeFilter: function(filterToDelete)
  {
    var alertsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AlertsUIModule");
    var appliedFilters = alertsModule.presentationController.getFilterCategories();
    var data = [];
    appliedFilters.forEach(function(filter){
      if(filter !== filterToDelete)
      data.push(filter);
    });
    if(data.length == 0)
    {
      alertsModule.presentationController.allAlertsChoosen = true;
      var defaultFilters = alertsModule.presentationController.getDefaultFilterCategories();
      alertsModule.presentationController.setFilterCategories(defaultFilters);
      this.setAppliedFilters(defaultFilters);
      this.setFilterData(defaultFilters);
    }
    else{
    alertsModule.presentationController.setFilterCategories(data);
    this.setAppliedFilters(data);
    this.setFilterData(data);
    }
  },
  setAppliedFilters: function(filters)
  {
    var applyFilter = false;
    this.view.flxFilterdOptions.removeAll();
    for(var i = 0; i < filters.length; i++)
    {
      if(filters[i] === "ALERT_CAT_ACCOUNTS"){
        this.view.flxFilterdOptions.add(this.filterOptions[0]);
        applyFilter = true;
      }
      else if(filters[i] === "ALERT_CAT_SECURITY"){
        this.view.flxFilterdOptions.add(this.filterOptions[1]);
        applyFilter = true;
      }
      else if(filters[i] === "ALERT_CAT_TRANSACTIONAL"){
        this.view.flxFilterdOptions.add(this.filterOptions[2]);
        applyFilter = true;
      }
    }
    var alertsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AlertsUIModule");
    if(!alertsModule.presentationController.allAlertsChoosen && applyFilter){
      this.view.flxFilterdOptions.setVisibility(true);
      this.view.flxSeparator.setVisibility(true);
    }
    else{
      this.view.flxFilterdOptions.setVisibility(false);
      this.view.flxSeparator.setVisibility(false);
    }
    this.view.forceLayout();
  },
  showFilterOptions : function()
  {
      this.contentOffset = this.view.flxMainContainer.contentOffsetMeasured.y + "dp";
     var alertsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AlertsUIModule");
     alertsModule.presentationController.retainSegmentoffset = true;
     alertsModule.presentationController.commonFunctionForNavigation("frmAlertFilter");
  },
  deleteNotificationConfirm : function()
  {
    this.hideDeletePopUp();
    this.deleteNotification();
  },
  setPreshowData : function()
  {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    this.resetFormUI();
    this.view.customSearchbox.tbxSearch.text = "";
    var alertsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AlertsUIModule");
    if(alertsModule.presentationController.retainSegmentoffset)
        this.view.flxMainContainer.setContentOffset({"y" : this.contentOffset});
    else
        this.view.flxMainContainer.setContentOffset({"y" : "0dp"});
    this.hideDeletePopUp();
  },
  resetFormUI : function()
  {
    var scopeObj = this;
    var deviceUtilManager = applicationManager.getDeviceUtilManager();
    var isIphone = deviceUtilManager.isIPhone();
    if(!isIphone){
      scopeObj.view.flxHeader.isVisible = true;
      scopeObj.view.flxHeaderSearchbox.top = "56dp";
      scopeObj.view.flxFilterdOptions.top = "101dp";
      scopeObj.view.flxSeparator.top = "161dp";
      scopeObj.view.flxMainContainer.top = "162dp";
    }
    else{
      scopeObj.view.flxHeader.isVisible = false;
      scopeObj.view.flxHeaderSearchbox.top = "0dp";
      scopeObj.view.flxFilterdOptions.top = "45dp";
      scopeObj.view.flxSeparator.top = "105dp";
      scopeObj.view.flxMainContainer.top = "106dp";
    }
  },
  onSegmentRowClick : function(rowIndex)
  {
    this.contentOffset = this.view.flxMainContainer.contentOffsetMeasured.y + "dp";
    var data = this.view.segAlertsScreen.data[rowIndex];
    var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("frmAlertsDetails",data);
    var alertsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AlertsUIModule");
    if(data.isRead == "0")
    {
       alertsModule.presentationController.updateNotificationAsRead(data.userNotificationId);
    }
    else
      alertsModule.presentationController.commonFunctionForNavigation("frmAlertsDetails");
      alertsModule.presentationController.retainSegmentoffset = true;
  },
  getDataMap : function()
  {
    var dataMap = {
        "flxMain" : "flxMain",
    	"lblTitle" : "lblTitle",
        "lblAlertDesc" : "alertText",
        "imgCategory" : "imgCategory",
        "lblTime" : "dateReceived",
        "flxDelete" : "flxDelete"
    };
    return dataMap;
  },
  searchNotification : function()
  {
    var searchText = this.view.customSearchbox.tbxSearch.text;
    var alertsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AlertsUIModule");
    alertsModule.presentationController.searchAlerts(this.filteredData,searchText);
  },
  deleteNotification : function()
  {
    var rowId = applicationManager.getPresentationUtility().rowIndexforSwipe;
    var data = this.segData[rowId];
    var alertsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AlertsUIModule");
    alertsModule.presentationController.deleteNotification(data.userNotificationId);
  },
  deleteSpecifiedNotification : function(notificationId)
  {
    var navManager = applicationManager.getNavigationManager();
    var data = navManager.getCustomInfo("frmAlertsLanding");
    var rowId = applicationManager.getPresentationUtility().rowIndexforSwipe;
    data.splice(rowId,1);
    var newData = [];
    for(var i = 0; i < this.filteredData.length; i++){
      if(this.filteredData[i].userNotificationId !== notificationId)
        newData.push(this.filteredData[i]);
    }
    this.filteredData = newData;
    this.setDataToSegment();
  },
  getCategoryImage : function(category)
  {
    var data = {
      "ALERT_CAT_ACCOUNTS" : "account.png",
      "ALERT_CAT_SECURITY" : "security.png",
      "ALERT_CAT_TRANSACTIONAL" : "alerttransactional.png"
    };
    if(!kony.sdk.isNullOrUndefined(data[category]))
    return data[category];
    else
    return "alertgeneral.png";
  },
  setDataToSegment : function()
  {
    var navManager = applicationManager.getNavigationManager();
    var alertsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AlertsUIModule");
    var data = navManager.getCustomInfo("frmAlertsLanding");
    if(data.length === 0){
      applicationManager.getPresentationUtility().tapgestureEnabled = false;
      this.view.flxNoAlerts.setVisibility(true);
      this.view.segAlertsScreen.setVisibility(false);
    }
    else{
      this.view.segAlertsScreen.setVisibility(true);
      this.view.flxNoAlerts.setVisibility(false);
      var todaysdate = new Date();
      for(var i = 0; i<data.length;i++)
      {
         data[i].imgCategory = {"src" : this.getCategoryImage(data[i].notificationCategory)};
         if(data[i].isRead === "0"){
          data[i].lblTitle = {"skin" : "sknLbl424242SSPSemiBold26px", "text": data[i].notificationSubject};
          data[i].flxMain={"skin" : "sknFlxBgF3F3F3", "focusSkin" : "sknFlxBgFFFFFFChart"};
         }
         else{
          data[i].lblTitle = {"skin" :"sknlbl000000SSP26px", "text": data[i].notificationSubject};
          data[i].flxMain={"skin" : "sknFlxBgFFFFFFChart", "focusSkin" : "sknFlxBgFFFFFFChart"};
         }
         var notificationText = data[i].notificationText;
         var formattedText = notificationText.replace(/<(.|\n)*?>/g, '');
         data[i].alertText = formattedText;
         var date = new Date(data[i].receivedDate);
         var convertedDate = CommonUtilities.getDateAndTime(data[i].receivedDate);
         data[i].dateReceived = convertedDate ? convertedDate.split(", ")[1] : "";
         /*if(todaysdate.toDateString() === date.toDateString())
         {
            var option = {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true
            };
            var time = new Intl.DateTimeFormat('en-US', option).format(date);
            data[i].dateReceived = time;
         }
         else
         {
            var forUtility = applicationManager.getFormatUtilManager();
            data[i].dateReceived = forUtility.getFormattedCalendarDate(date);
         }*/
         
         data[i].flxDelete = {"onClick" : this.showDeletePopUp};
      }
      this.segData = data;
      this.view.segAlertsScreen.widgetDataMap = this.getDataMap();
      var deviceUtilManager = applicationManager.getDeviceUtilManager();
      var isIphone = deviceUtilManager.isIPhone();
      if(!alertsModule.presentationController.allAlertsChoosen){
        if(!this.view.flxFilterdOptions.isVisible)
        {
          this.view.flxFilterdOptions.setVisibility(true);
          this.view.flxSeparator.setVisibility(true);
        }
        if(isIphone)
            this.view.flxMainContainer.top = "106dp";
        else
            this.view.flxMainContainer.top = "162dp";
      }
      else{
        if(this.view.flxFilterdOptions.isVisible)
        {
          this.view.flxFilterdOptions.setVisibility(false);
          this.view.flxSeparator.setVisibility(false);
        }
        if(isIphone)
        this.view.flxMainContainer.top = "45dp";
        else
        this.view.flxMainContainer.top = "101dp";
      }
      this.view.segAlertsScreen.setData(data);
      applicationManager.getPresentationUtility().tapgestureEnabled = true;
    }
  },
  showDeletePopUp : function()
  {
    applicationManager.getPresentationUtility().tapgestureEnabled = false;
    this.view.customSearchbox.tbxSearch.setEnabled(false);
    this.view.flxFilterdOptions.setEnabled(false);
    this.view.flxPopup1.setVisibility(true);
    this.view.flxMainContainer.setEnabled(false);
    this.view.flxMainContainer.enableScrolling = false;
    this.view.customSearchbox.flxSearch.setEnabled(false);
  },
  hideDeletePopUp : function()
  {
    applicationManager.getPresentationUtility().tapgestureEnabled = true;
    this.view.customSearchbox.tbxSearch.setEnabled(true);
    this.view.flxFilterdOptions.setEnabled(true);
    this.view.flxPopup1.setVisibility(false);
    this.view.flxMainContainer.setEnabled(true);
    this.view.flxMainContainer.enableScrolling = true;
    this.view.customSearchbox.flxSearch.setEnabled(true);
  },
  flxBackOnclick:function(){
    //var navManager = applicationManager.getNavigationManager();
    //navManager.goBack();
	var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "appName": "HomepageMA",
                    "moduleName": "AccountsUIModule"
                });
	accountMod.presentationController.showDashboard();
  },
  bindGenericSuccess : function(msg)
  {
    applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,msg.result);
  },
  showErrorPopUp : function(msg)
  {
    applicationManager.getDataProcessorUtility().showToastMessageError(this,msg);
  }
 }
 });