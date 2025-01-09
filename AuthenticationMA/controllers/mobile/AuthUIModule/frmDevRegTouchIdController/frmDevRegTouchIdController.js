define({
	init:function(){
	     var navManager = applicationManager.getNavigationManager();
		var currentForm=navManager.getCurrentForm();
		applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    },
    touchIdpreShow : function()
  {
     if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
      this.view.lblTouchIdSubTitle.text = kony.i18n.getLocalizedString("kony.mb.preferences.UseDeviceBiometrics");
      this.view.lblTouchId.text = kony.i18n.getLocalizedString("kony.mb.devReg.Biometric");
    }
    else{
      this.view.flxHeader.isVisible = false;
      this.view.lblTouchIdSubTitle.text = kony.i18n.getLocalizedString("kony.mb.devReg.touchIdMsg");
      this.view.lblTouchId.text = kony.i18n.getLocalizedString("kony.mb.devReg.touchidTitle");
    }
     this.view.btnEnable.onClick = this.goToDefaultLogin;
     this.view.customHeader.flxBack.onClick = function () {
            var navMan=applicationManager.getNavigationManager();
           navMan.goBack();
      };
  },
   goToDefaultLogin : function()
  {
     
     var authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
     authMod.presentationController.setBiometricCredentials();
      var navManager = applicationManager.getNavigationManager();
      authMod.presentationController.setTouchIdflag(true);
      authMod.presentationController.setDefaultMode("touchid");
     var data = {loginMode:"touchid"};
     navManager.setCustomInfo("frmDefaultLogin",data);
      authMod.presentationController.commonFunctionForNavigation("frmDefaultLogin");
    
  },
  skipAction : function(){
  	applicationManager.getPresentationUtility().showLoadingScreen();
    var authMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
	authMode.presentationController.defaultLoginToAccounts();
  }
});