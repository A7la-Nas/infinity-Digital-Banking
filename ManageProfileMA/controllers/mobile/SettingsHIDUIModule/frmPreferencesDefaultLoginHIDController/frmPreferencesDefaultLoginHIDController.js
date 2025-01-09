define(['CommonUtilities'], function(CommonUtilities){
return{
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
        this.initActions();
        this.setAuthModeOptions();
        var navManager = applicationManager.getNavigationManager();
	  	var currentForm = navManager.getCurrentForm();
	    applicationManager.getPresentationFormUtility().logFormName(currentForm);
	  	applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
    initActions: function () {
        var scope = this;
        this.view.customHeader.flxBack.onClick = this.actionForBtnBack;
        this.view.flxOption1.onClick=this.imgOnPasswordSelected;
        this.view.flxOption2.onClick=this.navigateToTouchIdFlow;
        this.view.flxOption3.onClick=this.navigateToPinFlow;
        this.view.flxOption4.onClick=this.flxFaceIdNavigation;
    },
  setTouchId : function(flags)
  {
    var deviceUtilManager = applicationManager.getDeviceUtilManager();
    var isIphone = deviceUtilManager.isIPhone();
    if (flags.isTouchIdSupported){
       if(isIphone)
          this.view.lblOption2.text = kony.i18n.getLocalizedString("kony.mb.devReg.TouchId");
        else
          this.view.lblOption2.text = kony.i18n.getLocalizedString("kony.mb.devReg.Biometric");
       this.view.flxOption2.isVisible = true;
    }
    else
      this.view.flxOption2.isVisible = false;
      var loginData = applicationManager.getNavigationManager().getCustomInfo("frmSettings");
      var tempLoginMode = loginData.defLoginMode;
      if(tempLoginMode == "touchid")
        this.view.lblStatus2.text = kony.i18n.getLocalizedString("kony.mb.common.enabled");
      else
        this.view.lblStatus2.text = kony.i18n.getLocalizedString("kony.mb.common.enable");
  },
  setFaceId:function(flags)
  {
      var loginData = applicationManager.getNavigationManager().getCustomInfo("frmSettings");
      var tempLoginMode = loginData.defLoginMode;
      if (flags.isFaceIdSupported){
         if(flags.isFaceIdAvailable){
           this.view.flxOption4.isVisible = true;
           if(tempLoginMode == "faceid")
              this.view.lblStatus4.text =  kony.i18n.getLocalizedString("kony.mb.common.enabled");
           else
              this.view.lblStatus4.text =  kony.i18n.getLocalizedString("kony.mb.common.enable");
         } else {
           this.view.flxOption4.isVisible = false;
         }
      } else {
        this.view.flxOption4.isVisible = false;
      }
  },
  setPinLogin : function(flags)
  {
    let userMan = applicationManager.getUserPreferencesManager();    
    if(userMan.isAppLoginPinSet())
      this.view.lblStatus3.text = kony.i18n.getLocalizedString("kony.mb.Generated");
    else
      this.view.lblStatus3.text = kony.i18n.getLocalizedString("kony.mb.devReg.generate");
  },
  setAuthModeOptions:function()
  {
    if(CommonUtilities.isSCAEnabled()){
      this.setUIonSCAEnabled();
     } else {
     var navManager = applicationManager.getNavigationManager();
     var flagData = navManager.getCustomInfo("frmPreferencesDefaultLogin");
     if(flagData.isRememberMeOn === false){
      this.view.lblNote.text=kony.i18n.getLocalizedString("kony.mb.preferences.DefaultLoginErrorMessage");
      this.view.flxOptions.setVisibility(false);
    }
    else{
      this.view.lblNote.text=kony.i18n.getLocalizedString("kony.mb.preferences.PleaseSelectWhichOneYouWantAsDefaultLoginOption.");
      this.view.flxOptions.setVisibility(true);
     this.setTouchId(flagData);
     this.setFaceId(flagData);
     this.setPinLogin(flagData);
     this.setSelectionAuthMode(flagData.defaultAuthMode);
     if((flagData.popUpMsg!==null)&&(flagData.popUpMsg!==""))
      {
         var scopeObj=this;
         applicationManager.getDataProcessorUtility().showToastMessageSuccess(scopeObj,flagData.popUpMsg);
      }
    }
      flagData.popUpMsg = null;
	 navManager.setCustomInfo("frmPreferencesDefaultLogin",flagData);
  }
  },
  setSelectionAuthMode : function(loginMode)
  {
    switch(loginMode){
      case "password":
        this.imgOnPasswordSelected();
        break;
      case "touchid":
         this.imgOnTouchIdSelected();
         break;
      case "pin":
         this.imgOnPinSelected();
         break;
      case "faceid":
          this.imgOnFaceSelected();
          break;
      default:
         this.imgOnPasswordSelected();
        break;
    }
  },
  navigateToTouchIdFlow : function()
  {
    if(CommonUtilities.isSCAEnabled()){
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"});
    settingsMod.presentationController.commonFunctionForNavigation({"appName": "ManageProfileMA","friendlyName": "SettingsHIDUIModule/frmPreferencesTouchIdHID"});
    }
    else{
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"});
    settingsMod.presentationController.commonFunctionForNavigation({"appName": "ManageProfileMA","friendlyName": "SettingsHIDUIModule/frmPreferencesTouchIdHID"});
    } 
  },
  navigateToPinFlow : function()
  {
    try{
    var navManager = applicationManager.getNavigationManager();
    var flags = navManager.getCustomInfo("frmPreferencesDefaultLogin");
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"});
    let userMan = applicationManager.getUserPreferencesManager();
    if(CommonUtilities.isSCAEnabled()) {
      let msgData = {popUpMsg:""};
      navManager.setCustomInfo("frmPreferencesPin", msgData);
      settingsMod.presentationController.commonFunctionForNavigation({"appName": "ManageProfileMA","friendlyName": "SettingsHIDUIModule/frmPreferencesPinHID"});
    } else {
    if(!(userMan.isAppLoginPinSet())){
       var authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"AuthUIModule","appName":"AuthenticationMA"});
	   var settingMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"});
        authMod.presentationController.flowType="settings";
		settingMod.presentationController.flowType="settings";
        //settingsMod.presentationController.commonFunctionForNavigation({"friendlyName ":"frmDevRegPin","appName":"AuthenticationMA"});
        new kony.mvc.Navigation({"appName" : "AuthenticationMA", "friendlyName" : "frmDevRegPin"}).navigate();
    }
    else{
        var msgData = {popUpMsg:""};
       navManager.setCustomInfo("frmPreferencesPin",msgData) ;
       settingsMod.presentationController.commonFunctionForNavigation({"appName": "ManageProfileMA","friendlyName": "SettingsHIDUIModule/frmPreferencesPinHID"});
    }
   }
    }catch(er){
      kony.print(er);
    }
  },
  imgOnPasswordSelected:function()
  {
    this.view.lblOption1.skin="sknLbl424242SSP26px";
    this.view.lblOption2.skin="sknLbl424242SSP26px";
    this.view.lblOption3.skin="sknLbl424242SSP26px";
    this.view.lblOption4.skin="sknLbl424242SSP26px";
    this.view.imgStatusAndNav1.src="tickmark_green.png";
    this.view.imgStatusAndNav2.src="chevron.png";
    this.view.imgStatusAndNav3.src="chevron.png";
    this.view.imgStatusAndNav4.src="chevron.png";
    this.view.lblStatus2.text = kony.i18n.getLocalizedString("kony.mb.common.enable");
    this.view.lblStatus4.text =  kony.i18n.getLocalizedString("kony.mb.common.enable");
    var navManager = applicationManager.getNavigationManager();
    var authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"AuthUIModule","appName":"AuthenticationMA"});
    authMod.presentationController.setDefaultMode("password");
    var settingsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"});
    settingsModule.presentationController.getDevDetails();
  },
   imgOnTouchIdSelected:function()
  {
    this.view.lblOption2.skin="sknLbl424242SSP26px";
    this.view.lblOption1.skin="sknLbl424242SSP26px";
    this.view.lblOption3.skin="sknLbl424242SSP26px";
    this.view.lblOption4.skin="sknLbl424242SSP26px";
    this.view.imgStatusAndNav1.src="chevron.png";
    this.view.imgStatusAndNav2.src="tickmark_green.png";
    this.view.imgStatusAndNav3.src="chevron.png";
    this.view.imgStatusAndNav4.src="chevron.png";
  },
   imgOnPinSelected:function()
  {
    this.view.lblOption3.skin="sknLbl424242SSP26px";
    this.view.lblOption1.skin="sknLbl424242SSP26px";
    this.view.lblOption2.skin="sknLbl424242SSP26px";
    this.view.lblOption4.skin="sknLbl424242SSP26px";
    this.view.imgStatusAndNav1.src="chevron.png";
    this.view.imgStatusAndNav2.src="chevron.png";
    this.view.imgStatusAndNav3.src="tickmark_green.png";
    this.view.imgStatusAndNav4.src="chevron.png";
  },
  imgOnFaceSelected:function()
  {
    this.view.lblOption4.skin="sknLbl424242SSP26px";
    this.view.lblOption1.skin="sknLbl424242SSP26px";
    this.view.lblOption2.skin="sknLbl424242SSP26px";
    this.view.lblOption3.skin="sknLbl424242SSP26px";
    this.view.imgStatusAndNav1.src="chevron.png";
    this.view.imgStatusAndNav2.src="chevron.png";
    this.view.imgStatusAndNav3.src="chevron.png";
    this.view.imgStatusAndNav4.src="tickmark_green.png";
  },
  flxFaceIdNavigation:function(){
      	var navManager = applicationManager.getNavigationManager();
        applicationManager.getPresentationUtility().showLoadingScreen();
        var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"});
        settingsMod.presentationController.commonFunctionForNavigation("frmPreferencesFaceIdSetAsDefault");
  },
  navigationForFaceIdDefault : function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"});
    settingsMod.presentationController.commonFunctionForNavigation("frmPreferencesFaceIdSetAsDefault");
  },
   actionForBtnBack : function(){
        var navManager = applicationManager.getNavigationManager();
        navManager.goBack();
    },
    setBioMetricUI :function(){
      var isDeviceBiometricAvailable= this.view.sdk.isDeviceBiometricAvailable();
      if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
        var isDeviceFaceIDAvailable= this.view.sdk.isFaceIDSupport();
        if(isDeviceFaceIDAvailable){
          this.view.imgOption2.src="face.png";
        }
        else if(isDeviceBiometricAvailable){
          this.view.imgOption2.src="touchidbig.png"
        }
      }
      else{
        this.view.imgOption2.src="touchidbig.png"
      }
    },
     setUIonSCAEnabled: function(){
      this.view.lblNote.text=kony.i18n.getLocalizedString("kony.mb.preferences.PleaseSelectWhichOneYouWantAsDefaultLoginOption.");
      var isDeviceFaceIDAvailable=""
       if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
         var isDeviceFaceIDAvailable= this.view.sdk.isFaceIDSupport();
       }
      this.view.flxOptions.setVisibility(true);
      this.view.flxSeperator1.setVisibility(false);
      this.view.flxOption1.setVisibility(false);
      var isDeviceBiometricAvailable= this.view.sdk.isDeviceBiometricAvailable();
      var loginData = applicationManager.getNavigationManager().getCustomInfo("frmSettings");
      var tempLoginMode = loginData.defLoginMode;
      const userManager = applicationManager.getUserPreferencesManager();
      const userName = userManager.getUserObj().userName;
      if(isDeviceBiometricAvailable||isDeviceFaceIDAvailable){
        this.setBioMetricUI();
        this.view.flxSeperator2.setVisibility(true);
        this.view.flxOption2.setVisibility(true);
      }
      else{
        this.view.flxSeperator2.setVisibility(false);
        this.view.flxOption2.setVisibility(false);
      }
      var deviceUtilManager = applicationManager.getDeviceUtilManager();
      var isIphone = deviceUtilManager.isIPhone();
      this.view.lblOption2.text = kony.i18n.getLocalizedString("kony.mb.devReg.Biometric");        
      if(this.view.sdk.isBiometricEnabled(userName))
      {
        this.imgOnTouchIdSelected();
      }
      else{
        this.imgOnPinSelected();
      }
      this.view.lblStatus3.text = kony.i18n.getLocalizedString("kony.mb.Generated");
      this.view.flxSeperator3.setVisibility(true);
      this.view.flxOption3.setVisibility(true);
      this.view.flxSeperator4.setVisibility(true);
      this.view.flxOption4.setVisibility(false);
      this.view.flxSeperator5.setVisibility(false);
      var navManager = applicationManager.getNavigationManager();
      var flagData = navManager.getCustomInfo("frmPreferencesDefaultLogin");
      if((flagData.popUpMsg!==null)&&(flagData.popUpMsg!==""))
      {
        var scopeObj=this;
        applicationManager.getDataProcessorUtility().showToastMessageSuccess(scopeObj,flagData.popUpMsg);
      }
      flagData.popUpMsg = null;
      navManager.setCustomInfo("frmPreferencesDefaultLogin",flagData)
    },
  }
});