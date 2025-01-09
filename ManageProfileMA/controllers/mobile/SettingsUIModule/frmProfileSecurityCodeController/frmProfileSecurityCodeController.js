define({
  timerCounter : 0,
  onNavigate : function(param){
    var scope = this;
     if(param === "password"){
      this.view.btnVerifySecCode.onClick=function(){
        var settings = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsModule");
        settings.presentationController.getPasswordRulesAndPolicy();
        settings.presentationController.verifyOTP(scope.keypadString,'frmProfileChangeAndUpdatePassword');
     };
    }
    else{
      this.view.btnVerifySecCode.onClick=function(){
        var settings = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsModule");
        settings.presentationController.getUsernameRulesAndPolicy();
        settings.presentationController.verifyOTP(scope.keypadString,'frmProfileUsername');
     };
    }
  },
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  keypadString: '',
  showSecurityCode:function()
  {
    var scope = this;
    this.view.customHeader.lblLocateUs.text =kony.i18n.getLocalizedString("kony.mb.enroll.securityCode");
    this.keypadString = '';
    this.incompleteSecurityCodeView();
    this.updateInputBullets("flxInputSecurityCode");
    var navManager = applicationManager.getNavigationManager();
    var type = navManager.getCustomInfo("frmProfileSecurityCode");
    this.onNavigate(type);
    this.view.customHeader.flxBack.onClick = function(){
      var navManager = applicationManager.getNavigationManager();
      navManager.goBack();
    };
    this.view.customHeader.btnRight.onClick = function(){
	 var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsModule");
	 settingsMod.presentationController.commonFunctionForNavigation("frmSettings");
  };
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
      this.view.flxMainContainer.top = "56dp";
    }
    else{
      this.view.flxHeader.isVisible = false;
      this.view.flxMainContainer.top = "0dp";
    }
  },
  setKeypadChar: function(char) {
    this.keypadString = this.keypadString + char;
    if (this.keypadString.length === 6) {
      this.enterSecurityCodePostAction();
    } else if (this.keypadString.length < 6) {
      this.incompleteSecurityCodeView();
    } else if (this.keypadString.length > 6) {
      this.keypadString= this.keypadString.slice(0, 6);
      return;
    }
    this.updateInputBullets("flxInputSecurityCode");
  },
  clearKeypadChar: function() {
    if (this.keypadString.length === 1) {
      this.keypadString = '';
      this.updateInputBullets("flxInputSecurityCode");
    }
    if (this.keypadString.length !== 0) {
      this.keypadString = this.keypadString.substr(0, this.keypadString.length - 1);
      if (this.keypadString.length <6)
      {
        this.incompleteSecurityCodeView();
      }
      this.updateInputBullets("flxInputSecurityCode");
    }
  },
  updateInputBullets: function(inputFlx) {
    var widgets = this.view[inputFlx].widgets();
    for (var i = 0; i < this.keypadString.length; i++) {
      widgets[i].skin = "sknLbl424242SSPReg60px";
      widgets[i].text = this.keypadString[i];
    }
    for (var i = this.keypadString.length; i < widgets.length; i++) {
      widgets[i].skin = "lblBlueFocus";
      widgets[i].text = '_';
    }
    this.view.forceLayout();
  },
  enterSecurityCodePostAction:function()
  {
    this.view.btnVerifySecCode.setEnabled(true);
    this.view.btnVerifySecCode.skin = "sknBtn0095e4RoundedffffffSSP26px";
    this.view.flxMainContainer.forceLayout();
  },
  incompleteSecurityCodeView: function() {
    this.view.btnVerifySecCode.skin = "sknBtna0a0a0SSPReg26px";
    this.view.btnVerifySecCode.setEnabled(false);
    this.view.flxMainContainer.forceLayout();
  },
  bindGenericError : function(msg){
    applicationManager.getDataProcessorUtility().showToastMessageError(this, msg);
  }
});