define({
  init: function () {
    var scope=this;
    var currentFormObject = kony.application.getCurrentForm();
    var currentForm=currentFormObject.id;
    applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.navigateCustomBack);
  },
  navigateCustomBack: function() {
    var transMod = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    transMod.commonFunctionForgoBack();
  },
  preShow: function() {
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
    }
    this.view.customCalendar.preShow();
    this.view.customCalendar.selectedDate = '';
    this.view.customCalendar.firstEnabledDate = "";
    var forUtility = applicationManager.getFormatUtilManager();
    // this.view.customCalendar.isCalendarEndDateFrm = true;
    this.view.customCalendar.triggerContinueAction = false;
    //this.view.customCalendar.isOnceTransaction = false;
    this.view.customCalendar.updateDateBullets();
    this.view.btnContinue.setEnabled(true);
    this.view.btnContinue.skin = "sknBtn055BAF26px";
    //  this.view.customCalendar.unHighlightAllDays();
    var transMod = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    var startdate = transMod.getTransObject();
    var formattedDate = this.getTomorrowsDate(startdate.scheduledDate);
    this.view.customCalendar.setFirstEnabledDate(formattedDate);
    if (startdate.endCalendarDate !== null && startdate.endCalendarDate !== undefined && startdate.endCalendarDate !== "") {
        this.setDateToCalendar(startdate.endCalendarDate);
    } else if (startdate.frequencyEndDate !== null && startdate.frequencyEndDate !== undefined && startdate.frequencyEndDate !== "") {
        this.setDateToCalendar(startdate.frequencyEndDate);
    } else {
      this.view.customCalendar.setSelectedDate(startdate.frequencyEndDate);
    }
    this.view.customCalendar.resetCal();
    this.initActions();
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
  },
  initActions: function() {
    var scope = this;
    this.view.btnContinue.onClick = this.continueAction;
    this.view.customHeader.flxBack.onClick = this.navigateCustomBack;
    this.view.customHeader.btnRight.onClick = function() {
      scope.cancelOnClick();
    }
  },
  setDateToCalendar: function(dateString) {
    var forUtility = applicationManager.getFormatUtilManager();
    var configManager = applicationManager.getConfigurationManager();
    var frequencyEndDate = forUtility.getDateObjectFromCalendarString(dateString, configManager.getCalendarDateFormat());
    frequencyEndDate = forUtility.getFormattedSelectedDate(frequencyEndDate);
    this.view.customCalendar.setSelectedDate(frequencyEndDate);
  },
  cancelOnClick: function() {
    var transMod = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    transMod.cancelCommon();
  },
  continueAction: function() {
    var transMod = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    var endDate = this.view.customCalendar.getSelectedDate();
    if (endDate !==null && endDate !== undefined){
    transMod.processEndDate(endDate);
    } else {
    endDate = "";
    transMod.processEndDate(endDate); 
    }
  },
  getTomorrowsDate: function(scheduledDate) {
    var dateObject = new Date(scheduledDate);
    dateObject.setDate(dateObject.getDate() + 1);
    var month = dateObject.getMonth() + 1;
    var date = dateObject.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if (date < 10) {
      date = "0" + date;
    }
    return month + "/" + date  + "/" + dateObject.getFullYear();
  }
});