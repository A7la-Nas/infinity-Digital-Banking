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
    this.initActions();
    this.renderTitleBar();
    this.handleData();
    this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.ForgotLoginCredentials");
    if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
      this.view.title=kony.i18n.getLocalizedString("kony.mb.ForgotLoginCredentials");
    }
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
  },
  renderTitleBar :function(){
    var deviceUtilManager = applicationManager.getDeviceUtilManager();
    var isIphone = deviceUtilManager.isIPhone();
    if(!isIphone){
      this.view.flxHeader.isVisible = true;
    }
    else{
      this.view.flxHeader.isVisible = false;
    }
  },
  handleData : function(){
    this.keypadString = "";
    this.updateInputBullets();
    },
  initActions: function(){
    this.view.btnReSend.onClick=this.requestResendOTP;
    this.view.customHeader.flxBack.onClick=this.goBack;
    this.view.customHeader.btnRight.onClick=this.onCancel;
	this.setKeyPadActions();
  },
  goBack:function() {
    var navManager = applicationManager.getNavigationManager();
    navManager.goBack();
  },
  onCancel : function() {
    var navManager = applicationManager.getNavigationManager();
    navManager.clearStack();
    var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
    authModule.presentationController.navigateToLogin();
  },
  showCreatePassword: function () {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var otp = this.keypadString;
    var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
	//authModule.presentationController.getPasswordRulesAndPolicy();
    authModule.presentationController.validateOTP(otp);
  },
  //KEYPAD OPS:
  updateInputBullets: function () {
    var scope = this;
    var widgets = this.view["flxInputSecurityCode"].widgets();
    for (var i = 0; i < this.keypadString.length; i++) {
      widgets[i].skin = "sknLbl979797SSP60px";
    }
    for (var i = this.keypadString.length; i < widgets.length - 1; i++) {
      widgets[i].skin = "lblWhiteDot";
    }
    if(this.keypadString.length !== 6){
    	this.view.btnVerify.skin = "sknBtna0a0a0SSPReg26px";
        this.view.btnVerify.setEnabled(false);
      }
    else
      {
       this.view.btnVerify.skin = "sknBtn055BAF26px";
       this.view.btnVerify.setEnabled(true);
      }
    this.view.forceLayout();
  },
  setKeypadChar: function (char) {
    if (this.keypadString.length === 6) return;
    this.keypadString = this.keypadString + char;
    this.updateInputBullets();
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
  },
  requestResendOTP : function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
    authModule.presentationController.resendOTP();
  },
  onResendOTP : function(){
     applicationManager.getPresentationUtility().dismissLoadingScreen();
     this.keypadString = "";
     this.updateInputBullets();
  },
  bindGenericError  : function(errorMsg){
    var scopeObj=this;
    applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj,errorMsg);
  },
   setKeyPadActions: function() {
     var scopeObj = this;
     this.view.keypad.btnOne.onClick = function() {
         scopeObj.setKeypadChar(1);
     };
     this.view.keypad.btnTwo.onClick = function() {
         scopeObj.setKeypadChar(2);
     };
     this.view.keypad.btnThree.onClick = function() {
         scopeObj.setKeypadChar(3);
     };
     this.view.keypad.btnFour.onClick = function() {
         scopeObj.setKeypadChar(4);
     };
     this.view.keypad.btnFive.onClick = function() {
         scopeObj.setKeypadChar(5);
     };
     this.view.keypad.btnSix.onClick = function() {
         scopeObj.setKeypadChar(6);
     };
     this.view.keypad.btnSeven.onClick = function() {
         scopeObj.setKeypadChar(7);
     };
     this.view.keypad.btnEight.onClick = function() {
         scopeObj.setKeypadChar(8);
     };
     this.view.keypad.btnNine.onClick = function() {
         scopeObj.setKeypadChar(9);
     };
     this.view.keypad.btnZero.onClick = function() {
         scopeObj.setKeypadChar(0);
     };
     this.view.keypad.imgClearKeypad.onTouchEnd = function() {
         scopeObj.clearKeypadChar();
     };
    // this.view.btnDot.onClick = function() {
    //    scopeObj.setKeypadChar('.');
    // };
 }
});