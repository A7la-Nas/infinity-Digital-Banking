define({
	init:function(){
	     var navManager = applicationManager.getNavigationManager();
		var currentForm=navManager.getCurrentForm();
		applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    },
    preShow : function()
  {
     if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
      this.view.flxHeader.isVisible = false;
     } else {
      this.view.flxHeader.isVisible = true;
     }
     this.view.btnSetAsDefault.onClick = this.goToDefaultLogin;
     this.view.customHeader.flxBack.onClick = function () {
            var navMan=applicationManager.getNavigationManager();
           navMan.goBack();
      };
  },
  showPopUpMsg : function()
   {
      var navManager = applicationManager.getNavigationManager();
      var msgData = navManager.getCustomInfo("frmDevRegPinConfirmation");
      if((msgData.popUpMsg!==null)&&(msgData.popUpMsg!==""))
      {
         var scopeObj=this;
         applicationManager.getDataProcessorUtility().showToastMessageSuccess(scopeObj,msgData.popUpMsg);
      }
     msgData.popUpMsg="";
	 navManager.setCustomInfo("frmDevRegPinConfirmation",msgData);
    },
   goToDefaultLogin : function()
  {
     var authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
     var navManager = applicationManager.getNavigationManager();
     authMod.presentationController.setPinflag(true);
     authMod.presentationController.setDefaultMode("pin");
     var data = {loginMode:"pin"};
     navManager.setCustomInfo("frmDefaultLogin",data);
     authMod.presentationController.commonFunctionForNavigation("frmDefaultLogin");
  },
  skipAction : function(){
  	applicationManager.getPresentationUtility().showLoadingScreen();
    var authMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
	authMode.presentationController.defaultLoginToAccounts();
  }
});