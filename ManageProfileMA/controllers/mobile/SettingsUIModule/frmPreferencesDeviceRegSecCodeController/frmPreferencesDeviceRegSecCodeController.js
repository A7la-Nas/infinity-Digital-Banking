define({
    keypadString: '',
    timerCounter: 0,
	init : function(){
		var navManager = applicationManager.getNavigationManager();
		var currentForm=navManager.getCurrentForm();
		applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
	},
    preShow: function () {
      this.view.flxPopup.setVisibility(false);
      if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
        this.view.flxHeader.isVisible = false;
      }else{
          this.view.flxHeader.isVisible = true;
      }
      this.updateInputBullets();
      this.initActions();
      this.view.btnVerify.skin="sknBtna0a0a0SSPReg26px";
      this.view.btnVerify.setEnabled(false);
	  this.clearKeyPadString();
      var navManager = applicationManager.getNavigationManager();
	  var currentForm = navManager.getCurrentForm();
	  applicationManager.getPresentationFormUtility().logFormName(currentForm);
	  applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
    initActions: function(){
      this.view.customHeader.flxBack.onClick=function(){
         var navManager = applicationManager.getNavigationManager();
            navManager.goBack();
      };
      this.view.customHeader.btnRight.onClick=function(){
      var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsModule");
      settingsMod.presentationController.commonFunctionForNavigation("frmSettings");
      };
      this.view.btnVerify.onClick=this.btnVerifyOnClick;
      this.view.btnReSend.onClick=function(){
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
        this.view.btnVerify.skin="sknBtn0095e426pxEnabled";
        this.view.btnVerify.setEnabled(true);
      }
      else{
        this.view.btnVerify.skin="sknBtna0a0a0SSPReg26px";
        this.view.btnVerify.setEnabled(false);
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
      this.view.btnVerify.skin="sknBtna0a0a0SSPReg26px";
      this.view.btnVerify.setEnabled(false);
    },
    btnVerifyOnClick: function(){
       applicationManager.getPresentationUtility().showLoadingScreen();
       var settings = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
       settings.presentationController.updateDeviceRegistration();
    },
    bindGenericError  : function(errorMsg){
      var scopeObj=this;
      applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj,errorMsg);
    },
    clearKeyPadString:function(){
  		 for(var i=0;i<6;i++){
      		this.clearKeypadChar();
     	}
     }
  });