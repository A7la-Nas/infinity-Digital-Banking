define({
  timerCounter:0,
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },

  preShow : function(){
    this.setFlowActions();
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    applicationManager.getDeviceUtilManager().detectDynamicInstrumentation();
    this.setFormUI();
  },

  setFormUI: function(){
    let scopeObj = this;
    var obj = applicationManager.getNavigationManager().getCustomInfo("frmProfileChangeAndUpdatePassword");
    if(obj.errorMessage) {
      scopeObj.view.updatePassword.showErrorMessage(obj.errorMessage);
    }
  },
  
  setFlowActions : function(){
    
    var scopeObj = this;
    scopeObj.view.updatePassword.onCancel = function(){
	  let settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
	  settingsMod.presentationController.commonFunctionForNavigation("frmSettings");
    };

    scopeObj.view.updatePassword.onSuccessCallback = function(response){
      scopeObj.setErrorMessageAndLogout(kony.i18n.getLocalizedString('kony.mb.profile.changePassword'));
    };

    scopeObj.view.updatePassword.onFailureCallback = function(response){
      scopeObj.setErrorMessageAndLogout(response.errorMessage);
    };
  },

  setErrorMessageAndLogout: function (msg) {
    if (msg) {
      let loginData = applicationManager.getNavigationManager().getCustomInfo("frmLoginToast");
      loginData = loginData ? loginData : {};
      loginData.postupdateusernameandpassword = msg;
      applicationManager.getNavigationManager().setCustomInfo("frmLoginToast", loginData);
    }
    const authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "AuthUIModule", "appName" : "AuthenticationMA"});
    authMod.presentationController.passwordUpdateLogout();
  },
});