define(["CommonUtilities"], function(CommonUtilities){
  return{
  init: function () {
    var scope=this;
    var currentFormObject = kony.application.getCurrentForm();
    var currentForm=currentFormObject.id;
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
    this.view.customCalendar.selectedDate = '';
    this.view.customCalendar.triggerContinueAction = false;

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
    var endDate = transactCurrentDate.currentWorkingDate.split('-');
    var endDateFeed = endDate[1] + "/" + (parseInt(endDate[2])+1)+ "/" + endDate[0];
    var selectedDateFeed = endDate[1] + "/" + endDate[2] + "/" + endDate[0];
    this.view.customCalendar.setLastEnabledDate(endDateFeed);
    this.view.customCalendar.setSelectedDate(selectedDateFeed);
    this.view.customCalendar.updateDateBullets();
    this.view.customCalendar.resetCal();
    this.initActions();
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  initActions: function() {
    var scope = this;
    this.view.btnContinue.onClick = this.continueAction;
    this.view.customHeader.flxBack.onClick = this.navigateCustomBack;
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
    navMan.setCustomInfo("CombinedStatementEndDate" , selectedDateFormat);
    navMan.navigateTo("frmCombinedStatement");
  }
 }
});