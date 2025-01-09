define({
 init : function(){
		var navManager = applicationManager.getNavigationManager();
		var currentForm=navManager.getCurrentForm();
		applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  preShow: function () {
      if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
          this.view.flxHeader.isVisible = false;
      }else{
          this.view.flxHeader.isVisible = true;
      }
      var navManager = applicationManager.getNavigationManager();
      var status = navManager.getCustomInfo("frmPreferencesDeviceRegistration");
       if (status.isRememberMeOn === false)
        {
          this.view.lblRegisterDevice2.text=kony.i18n.getLocalizedString("kony.mb.preferences.DeviceRegistrationError");
          this.view.flxBtn.setVisibility(false);
          this.view.lblRegisterDevice3.setVisibility(false);
        }
      else{
        this.view.lblRegisterDevice2.text=kony.i18n.getLocalizedString("kony.mb.preferences.ThisDeviceIsNotYetRegisteredForMobileBankingPeriod");
         this.view.flxBtn.setVisibility(true);
        this.view.lblRegisterDevice3.setVisibility(true);
      }
      this.initActions();
      var navManager = applicationManager.getNavigationManager();
	  var currentForm = navManager.getCurrentForm();
	  applicationManager.getPresentationFormUtility().logFormName(currentForm);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var deviceManager = applicationManager.getDeviceUtilManager();
    deviceManager.detectDynamicInstrumentation();
  },
  initActions: function () {
      var scope = this;
      this.view.customHeader.btnRight.onClick = function(){
          var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
          settingsMod.presentationController.commonFunctionForNavigation("frmTransfers");
      };
      this.view.customHeader.flxBack.onClick=function(){
          var navManager = applicationManager.getNavigationManager();
            navManager.goBack();
      };
     this.view.btnRegisterDevice.onClick=function(){
        applicationManager.getPresentationUtility().showLoadingScreen();
       var settings = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
       settings.presentationController.updateDeviceRegistration();
      };
  }
});