define({

  init: function() {
    var scope=this;
    var currentFormObject = kony.application.getCurrentForm();
    var currentForm=currentFormObject.id;
    applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.navigateCustomBack);
  },

  navigateCustomBack: function() {
    var loansMod = applicationManager.getModulesPresentationController("LoanPayUIModule");
    loansMod.clearFlowAttributes();
    var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
    accountMod.presentationController.showDashboard();
  },

  preShow: function() {
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
    }
    this.initActions();
    this.setupUI();
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
  },

  initActions: function() {
    var scope = this;
    var loansMod = applicationManager.getModulesPresentationController("LoanPayUIModule");
    scope.view.btnDashboard.onClick = function (){
      loansMod.clearFlowAttributes();
      //var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
      var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "HomepageMA", "moduleName" : "AccountsUIModule"});
      accountMod.presentationController.showDashboard();
    };
    scope.view.btnTryAgain.onClick = function() {
      loansMod.clearFlowAttributes();
      //var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
      var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "HomepageMA", "moduleName" : "AccountsUIModule"});
      accountMod.presentationController.showDashboard();
    };
  },

  setupUI: function() {
    var transactionManager = applicationManager.getTransactionManager();
    var transferObject = transactionManager.getTransactionObject();
    var loansMod = applicationManager.getModulesPresentationController("LoanPayUIModule");
    if (!kony.sdk.isNullOrUndefined(transferObject.errmsg)){
      this.view.flxConfirmationMain.isVisible = false;
      this.view.flxError.isVisible = true;
      this.view.flxButtons.isVisible = false;
      this.view.lblTitle.text = transferObject.errmsg;
    }
    else {
      if (transferObject.isScheduled === "0")
        this.view.lblSuccessMessage.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.loans.PostedTransferMessage");
      else
        this.view.lblSuccessMessage.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.TransferScheduled");
      this.view.flxConfirmationMain.isVisible = true;
      this.view.flxError.isVisible = false;
      this.view.flxButtons.isVisible = true;  
      this.setSegmentData();
    }
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },

  setSegmentData: function() {
    var loansMod = applicationManager.getModulesPresentationController("LoanPayUIModule");
    var segData = loansMod.getAcknowledgementScreenData();
    this.view.segDetails.widgetDataMap = this.getWidgetDataMap();
    this.view.segDetails.setData(segData);
  },

  getWidgetDataMap: function() {
    var map = {
      lblTitle:"property",
      lblDetails:"value1",
      lblExtras:"value2"
    };
    return map;
  }

});
