define({
  timerCounter: 0,
  onNavigate: function (obj) {
  },
 init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
 },
  preShow: function () {
    this.view.flxPopup.setVisibility(false);
    this.setUserName();
    this.initActions();
    this.renderTitleBar();
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
  },
  renderTitleBar :function(){
    var deviceUtilManager = applicationManager.getDeviceUtilManager();
    var isIphone = deviceUtilManager.isIPhone();
    if(!isIphone){
      this.view.flxHeader.isVisible = true;
    }
    else{
      this.view.flxHeader.isVisible = false;
    }
  },
  initActions: function(){
    this.view.flxSelectCVV.onClick = this.onSelectCVV;
    this.view.flxSelectSecurityCode.onClick = this.onSelectSecurityCode;
    this.view.customHeader.flxBack.onClick = this.goBack;
    this.view.customHeader.btnRight.onClick = this.onCancel;
  },
  onSelectCVV : function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
    authModule.presentationController.navigateToCVV();
  },
  onSelectSecurityCode : function() {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
    authModule.presentationController.requestOTP();
  },
  goBack:function()
  {
    var navManager = applicationManager.getNavigationManager();
    navManager.goBack();
  },
  onCancel : function()
  {
    var navManager = applicationManager.getNavigationManager();
    navManager.clearStack();
    var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
    authModule.presentationController.navigateToLogin();
  },
  setUserName:function()
  {
    var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
    var forgotObj = authModule.presentationController.getForgotObjectForView();
    var userName = forgotObj.UserName;
    this.view.lblUserName.text="Hi! "+userName;
  },
   bindGenericError: function (errorMsg) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        var scopeObj = this;
        applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
  }
});