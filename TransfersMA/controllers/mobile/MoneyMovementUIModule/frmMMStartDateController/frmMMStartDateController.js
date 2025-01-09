define({
  freq: '',
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
    this.initActions();
    this.view.customCalendar.selectedDate = '';
    this.view.customCalendar.firstEnabledDate = "";
    this.view.customCalendar.triggerContinueAction = true;
    this.view.customCalendar.updateDateBullets();
    this.view.customCalendar.setFirstEnabledDate();
    var MoneyMovementModule = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    var startdate = MoneyMovementModule.getTransObject();
    this.view.customCalendar.lastEnabledDate = "";
    this.view.customCalendar.setLastEnabledDate();
    var navMan = applicationManager.getNavigationManager();
    var data = navMan.getCustomInfo("frmMMStartDate");
    this.freq = (!kony.sdk.isNullOrUndefined(data)) ? data.freq : null;
    if (startdate.scheduledCalendarDate !== null && startdate.scheduledCalendarDate !== undefined && startdate.scheduledCalendarDate !== "") {
      this.setDateToCalendar(startdate.scheduledCalendarDate);
    } else if (startdate.scheduledDate !== null && startdate.scheduledDate !== undefined && startdate.scheduledDate !== "") {
      this.setDateToCalendar(startdate.scheduledDate);
    } else {
      var startDate = new Date();
      var startDateFeed1 = (startDate.getMonth() + 1) + "/" + startDate.getDate() + "/" + startDate.getFullYear();
      this.view.customCalendar.setFirstEnabledDate(startDateFeed1);
    }
    if (this.freq === "Once" || startdate.frequencyType === "Once") {
      this.view.customHeader.lblLocateUs.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.sendDate");
      this.view.btnContinue.isVisible = true;
      this.view.customCalendar.triggerContinueAction = false;
    } else {
      this.view.customHeader.lblLocateUs.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.StartDate");
      this.view.btnContinue.isVisible = false;
      this.view.customCalendar.triggerContinueAction = true;
    }
    this.view.customCalendar.setLastEnabledDate();
    this.view.customCalendar.resetCal();
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
  },
  initActions: function() {
    var scope = this;
    this.view.customHeader.flxBack.onClick = this.navigateCustomBack;
    this.view.btnContinue.onClick = this.continueAction;
    this.view.customHeader.btnRight.onClick = function() {
      scope.cancelOnClick();
    }
  },
  setDateToCalendar: function(dateString) {
    var forUtility = applicationManager.getFormatUtilManager();
    var configManager = applicationManager.getConfigurationManager();
    var scheduledDate = forUtility.getDateObjectFromCalendarString(dateString, configManager.getCalendarDateFormat());
    scheduledDate = forUtility.getFormattedSelectedDate(scheduledDate);
    this.view.customCalendar.setSelectedDate(scheduledDate);
  },
  cancelOnClick: function() {
    var moneyMovementModule = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    moneyMovementModule.cancelCommon();
  },
  continueAction: function() {
    var MoneyMovementModule = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    var transObj = scope_MoneyMovementPresentationController.getTransObject();
    if (this.freq === "Once" || transObj.frequencyType === "Once")  {
      if (MoneyMovementModule.isLoansAccountType && this.isSelectedDateGreaterThanDueDate()) {
       this.showCustomAlertMessage(); 
      }
      else {
      	MoneyMovementModule.processStartDate(this.view.customCalendar.getSelectedDate());
      }
    }
    else if(this.freq === "NofRR") {
      MoneyMovementModule.navigateToRecurrence(this.view.customCalendar.getSelectedDate());
    }
    else {
      MoneyMovementModule.navigateToEndDate(this.view.customCalendar.getSelectedDate());
    }
  },
  
  showCustomAlertMessage: function() {
    var scope = this;
    var MoneyMovementModule = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    var basicProperties =
        {
          "message": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Loans.WishToContinue"),
          "alertType": constants.ALERT_TYPE_CONFIRMATION,
          "alertTitle": "",
          "yesLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.continue"),
          "noLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.Cancel"),
          "alertIcon": "",
          "alertHandler": function(response) {
            if(response){
              MoneyMovementModule.processStartDate(scope.view.customCalendar.getSelectedDate());
            }
          }
        };
    applicationManager.getPresentationUtility().showAlertMessage(basicProperties, {});
  },
  
  isSelectedDateGreaterThanDueDate: function() {
    var MoneyMovementModule = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    var transObj = MoneyMovementModule.getTransObject();
    var forUtility = applicationManager.getFormatUtilManager();
    var dueDateObject = forUtility.getDateObjectfromString(transObj.nextPaymentDate);
    var selectedDateObject = forUtility.getDateObjectFromCalendarString(this.view.customCalendar.getSelectedDate(), "MM/DD/YYYY");
    return selectedDateObject > dueDateObject;
  }
});