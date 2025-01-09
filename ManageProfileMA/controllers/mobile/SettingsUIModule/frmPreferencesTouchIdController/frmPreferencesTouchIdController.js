define(['CommonUtilities'], function( CommonUtilities){
    return{
    init : function(){
		var navManager = applicationManager.getNavigationManager();
		var currentForm=navManager.getCurrentForm();
		applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
	},
    preShow: function () {
        if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
            this.view.flxHeader.isVisible = false;
            this.view.lblNote.text = kony.i18n.getLocalizedString("kony.mb.preferences.WouldYouLikeToUseTouchIdToLoginUsingYourBiometricsInsteadOfEnteringYourUsernameAndPassword?");
        }
        else{
            this.view.flxHeader.isVisible = true;
            this.view.lblNote.text = kony.i18n.getLocalizedString("kony.mb.preferences.UseDeviceBiometrics");
        }
        this.initActions();
        if(CommonUtilities.isSCAEnabled()){
        this.setUIToForm();
        }
        var navManager = applicationManager.getNavigationManager();
	  	var currentForm = navManager.getCurrentForm();
	    applicationManager.getPresentationFormUtility().logFormName(currentForm);
	  	applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
    initActions: function () {
        var scope = this;
        this.view.customHeader.flxBack.onClick=function(){
          var navManager = applicationManager.getNavigationManager();
            navManager.goBack();
        };
        this.view.btnSetAsDefault.onClick = this.setTouchIdDefaultMode;
    },
    setUIToForm:function(){
      var settingsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"});
      var isDeviceBiometricAvailable= this.view.sdk.isDeviceBiometricAvailable();
      if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
        var isDeviceFaceIDAvailable= this.view.sdk.isFaceIDSupport();
        if(isDeviceFaceIDAvailable){
          this.view.imgTouchId.src="face_big.png";
          settingsModule.presentationController.setSCAEnterPinFlowType("EnableFaceID");
        }
        else if(isDeviceBiometricAvailable){
          this.view.imgTouchId.src="touchidbig.png"
          settingsModule.presentationController.setSCAEnterPinFlowType("EnableBioMetric");
        }
      }
      else{
        this.view.imgTouchId.src="touchidbig.png"
        settingsModule.presentationController.setSCAEnterPinFlowType("EnableBioMetric");
      }

    },
  setTouchIdDefaultMode : function ()
  {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"AuthUIModule","appName":"AuthenticationMA"});
    var settingsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"});
     if(CommonUtilities.isSCAEnabled()){
      navManager.setEntryPoint("CapturePinForSCA","frmPreferencesTouchId");
      //settingsModule.presentationController.setSCAEnterPinFlowType("EnableBioMetric");
      settingsModule.presentationController.commonFunctionForNavigation("frmSCAEnterPin");
    }
    else{
    authMod.presentationController.setBiometricCredentials();
    authMod.presentationController.setTouchIdflag(true);
    authMod.presentationController.setDefaultMode("touchid");
    var settingsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"});
	settingsModule.presentationController.getDevDetails();
    var tempData = settingsModule.presentationController.getAuthModeData();
    var deviceUtilManager = applicationManager.getDeviceUtilManager();
    var isIphone = deviceUtilManager.isIPhone();
    if(isIphone)
      tempData.popUpMsg = kony.i18n.getLocalizedString("kony.mb.Touch.Id.is.set.a.Default.Login");
    else
      tempData.popUpMsg = kony.i18n.getLocalizedString("kony.mb.devReg.defaultSignInChanged");
    navManager.setCustomInfo("frmPreferencesDefaultLogin",tempData);
    if (CommonUtilities.getSCAType() == 1) {
        settingsModule.presentationController.commonFunctionForNavigation({"appName": "ManageProfileMA","friendlyName": "SettingsHIDUIModule/frmPreferencesDefaultLoginHID"});
            }else{
         settingsModule.presentationController.commonFunctionForNavigation("frmPreferencesDefaultLogin");
       }
   }
},
}
});