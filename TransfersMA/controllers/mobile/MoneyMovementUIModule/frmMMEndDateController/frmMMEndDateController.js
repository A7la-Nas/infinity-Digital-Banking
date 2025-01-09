define({
  init: function () {
    var scope=this;
    var currentFormObject = kony.application.getCurrentForm();
    var currentForm=currentFormObject.id;
    applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.navigateCustomBack);
  },
  navigateCustomBack: function() {
    var moneyMovementModule = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    moneyMovementModule.commonFunctionForgoBack();
  },
  preShow: function() {
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
    }
    this.view.customCalendar.preShow();
    if (this.view.customCalendar.selectedDate === '') {
      this.view.btnContinue.setEnabled(false);
    } else {
      this.view.btnContinue.setEnabled(true);
    }
    this.view.customCalendar.selectedDate = '';
    this.view.customCalendar.firstEnabledDate = "";
    var forUtility = applicationManager.getFormatUtilManager();
    // this.view.customCalendar.isCalendarEndDateFrm = true;
    this.view.customCalendar.triggerContinueAction = false;
    //this.view.customCalendar.isOnceTransaction = false;
    this.view.customCalendar.updateDateBullets();
    //  this.view.customCalendar.unHighlightAllDays();
    var moneyMovementModule = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    var startdate = moneyMovementModule.getTransObject();
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
    var moneyMovementModule = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    moneyMovementModule.cancelCommon();
  },
  continueAction: function() {
    var moneyMovementModule = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    moneyMovementModule.processEndDate(this.view.customCalendar.getSelectedDate());
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