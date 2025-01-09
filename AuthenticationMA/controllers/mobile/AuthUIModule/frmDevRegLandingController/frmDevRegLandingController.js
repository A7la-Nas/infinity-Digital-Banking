define({
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  preShow : function(){
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
    }
    else
      this.view.flxHeader.isVisible = false;
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    this.view.btnNoThanks.onClick = this.onNoThanksClick.bind(this);
    this.setDetails();
  },
  onNoThanksClick : function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var authMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
    authMode.presentationController.defaultLoginToAccounts();
    authMode.presentationController.setDeviceRegisterflag(false);
  },
  setDetails : function(){
    var authMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
    var Phoneno = authMode.presentationController.getMobileNo();
    this.view.lblMobNoValue.text = applicationManager.getDataProcessorUtility().maskAccountNumber(Phoneno);
    var userEmail = authMode.presentationController.getEmail();
    this.view.lblEmailIdValue.text = applicationManager.getDataProcessorUtility().maskAccountEmail(userEmail);
  }
});