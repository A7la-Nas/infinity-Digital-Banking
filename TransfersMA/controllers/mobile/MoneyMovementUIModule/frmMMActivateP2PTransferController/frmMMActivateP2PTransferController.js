define({
  init: function () {
    var scope=this;
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.navigateCustomBack);
  },
  navigateCustomBack: function() {
    var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"HomepageMA","moduleName":"AccountsUIModule"});
    accountMod.presentationController.showDashboard();
  },
  preShow: function () {
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
    }
    this.initActions();
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
  },
  initActions: function () {
    var scope = this;
    var navMan = applicationManager.getNavigationManager();
    this.view.customHeader.flxBack.onClick = this.navigateCustomBack;
    this.view.customHeader.btnRight.onClick = this.cancelOnClick;
  },
  cancelOnClick : function () {
    var moneyMovementModule = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    moneyMovementModule.cancelCommon();
  },
});