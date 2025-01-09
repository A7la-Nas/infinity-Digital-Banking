define({
    keypadString: '',
    timerCounter: 0,
	init : function(){
		var navManager = applicationManager.getNavigationManager();
		var currentForm=navManager.getCurrentForm();
		applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
	},
    showPinCode: function () {
      this.view.flxPopup.setVisibility(false);
      this.updateInputBullets();
      this.initActions();
      if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
        this.view.flxHeader.isVisible = false;
      }else{
          this.view.flxHeader.isVisible = true;
      }
      this.view.btnNext.skin="sknBtna0a0a0SSPReg26px";
      this.view.btnNext.setEnabled(false);
      this.clearKeyPadString();
      var navManager = applicationManager.getNavigationManager();
	  var currentForm = navManager.getCurrentForm();
	  applicationManager.getPresentationFormUtility().logFormName(currentForm);
	  applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
    initActions: function(){
      this.view.btnNext.onClick=this.btnNextOnClick;
      this.view.customHeader.flxBack.onClick=function(){
        var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"});
        settingsMod.presentationController.commonFunctionForNavigation("frmPreferencesResetStep2");
      };
      this.view.customHeader.btnRight.onClick=function(){
        var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"});
        settingsMod.presentationController.commonFunctionForNavigation("frmPreferencesPin");
      };
    },
    //KEYPAD OPS:
    updateInputBullets: function () {
      var scope = this;
      var widgets = this.view["flxInputSecurityCode"].widgets();
      for (var i = 0; i < this.keypadString.length; i++) {
        widgets[i].skin = "sknLbl979797SSP60px";
      }
      for (var i = this.keypadString.length; i < widgets.length - 1; i++) {
        widgets[i].skin = "sknLble3e3e3SSP60px";
      }
      this.view.forceLayout();
    },
    setKeypadChar: function (char) {
      if (this.keypadString.length === 6) return;
      this.keypadString = this.keypadString + char;
      this.updateInputBullets();
      if (this.keypadString.length === 6){
        this.view.btnNext.skin="sknBtn0095e426pxEnabled";
        this.view.btnNext.setEnabled(true);
      }
      else{
        this.view.btnNext.skin="sknBtna0a0a0SSPReg26px";
        this.view.btnNext.setEnabled(false);
      }
    },
    clearKeypadChar: function () {
      if (this.keypadString.length === 1) {
        this.keypadString = '';
        this.updateInputBullets();
      }
      if (this.keypadString.length !== 0) {
        this.keypadString = this.keypadString.substr(0, this.keypadString.length - 1);
        this.updateInputBullets();
      }
      this.view.btnNext.skin="sknBtna0a0a0SSPReg26px";
      this.view.btnNext.setEnabled(false);
    },
    bindGenericError  : function(errorMsg){
      var scopeObj=this;
      applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj,errorMsg);
    },
    btnNextOnClick : function(){
      applicationManager.getPresentationUtility().showLoadingScreen();
      var navManager = applicationManager.getNavigationManager();
      var updatedPin = navManager.getCustomInfo("frmPreferencesResetStep3");
      if(this.keypadString === updatedPin){
        var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"});
      	settingsMode.presentationController.updatePin(this.keypadString);
      }
	  else{
         applicationManager.getPresentationUtility().dismissLoadingScreen();
		 applicationManager.getDataProcessorUtility().showToastMessageError(this,kony.i18n.getLocalizedString("kony.mb.Please.enter.a.valild.pin"),this.clearKeyPadString);
	  }
    },
    clearKeyPadString:function(){
  		 for(var i=0;i<6;i++){
      		this.clearKeypadChar();
     	}
   }
  });