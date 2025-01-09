define(["CommonUtilities"], function(CommonUtilities){
  return{
  freq: '',
  init: function () {
    var scope=this;
   	var currentFormObject = kony.application.getCurrentForm();
    var currentForm=currentFormObject.id;
     if (kony.os.deviceInfo().name === "iPhone")
    scope.view.titleBarAttributes.rightBarButtonItems[0].action= this.cancelOnClick;
    applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.navigateCustomBack);
    var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
      "appName": "ArrangementsMA",
      "moduleName": "AccountUIModule"
    });
    accountsModule.presentationController.getBankDate();
  },
  navigateCustomBack: function() {
    var navMan=applicationManager.getNavigationManager();
    navMan.goBack();
  },
  preShow: function() {
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
    } else{
      this.view.flxHeader.isVisible = true;
    }
    this.view.customCalendar.preShow();
    if (this.view.customCalendar.selectedDate === '') {
      this.view.btnContinue.setEnabled(false);
    } else {
      this.view.btnContinue.setEnabled(true);
    }
    this.initActions();
    this.view.customCalendar.selectedDate = '';
    this.view.customCalendar.updateDateBullets();
    var allowedPreviousMonths=parseInt(applicationManager.getConfigurationManager().getCombinedStatementsAllowedPeriod());
    var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
      "appName": "ArrangementsMA",
      "moduleName": "AccountUIModule"
    });
    var transactCurrentDate = accountsModule.presentationController.getTransactDate();
    var startDate= transactCurrentDate.currentWorkingDate.split('-');
    startDate[1] = startDate[1]-allowedPreviousMonths;
    var startDateFeed = startDate[1] + "/" + startDate[2]+ "/" + startDate[0];
    this.view.customCalendar.setFirstEnabledDate(startDateFeed);
    var endDate= transactCurrentDate.currentWorkingDate.split('-');
    var endDateFeed = endDate[1] + "/" + (parseInt(endDate[2])+1)+ "/" + endDate[0];
    var selectedDateFeed = endDate[1] + "/" + endDate[2]+ "/" + endDate[0];
    this.view.customCalendar.setLastEnabledDate(endDateFeed);
    this.view.customCalendar.setSelectedDate(selectedDateFeed);
    this.view.customHeader.lblLocateUs.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.StartDate");
    this.view.btnContinue.isVisible = true;
    this.view.customCalendar.triggerContinueAction = false;
    this.view.customCalendar.currYear = endDate[0];
    this.view.customCalendar.currMonth = endDate[1];
    this.view.customCalendar.resetCal();
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  initActions: function() {
    var scope = this;
    this.view.customHeader.flxBack.onClick = this.navigateCustomBack;
    this.view.btnContinue.onClick = this.continueAction;
    this.view.customHeader.btnRight.onClick = function() {
      scope.cancelOnClick();
    }
  },
  cancelOnClick: function() {
    var navMan=applicationManager.getNavigationManager();
    navMan.goBack();
  },
  continueAction: function() {
    var formattedDate = this.view.customCalendar.getSelectedDate();
    var selectedDateFormat = formattedDate;
    var navMan = applicationManager.getNavigationManager();
    navMan.setCustomInfo("CombinedStatementStartDate" , selectedDateFormat);
    navMan.navigateTo("frmCombinedStatement");
  },
 }
});