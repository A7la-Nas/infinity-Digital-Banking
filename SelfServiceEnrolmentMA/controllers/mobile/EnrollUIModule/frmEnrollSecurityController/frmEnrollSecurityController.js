define({
  keypadString: '',
  timerCounter:0,
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  //PreShow
  showSecurityCode:function()
  {
    var scope = this;
	this.view.btnVerifySecCode.onClick = function(){
      scope.submitOTP();
    };
	 this.view.btnResend.onClick = function(){
      scope.requestResendOTP();
    } ;
    this.view.customHeader.lblLocateUs.text = "Security Code";
    this.keypadString = '';
    this.incompleteSecurityCodeView();
    this.updateInputBullets("flxInputSecurityCode");
    this.view.customHeader.flxBack.onClick = function(){
      var navManager = applicationManager.getNavigationManager();
      navManager.goBack();
    };
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
    }
    else{
      this.view.flxHeader.isVisible = false;
    }
    scope.clearSecurityCode();
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
  },
  onClickCancel : function(){
    var enrollMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "EnrollUIModule", "appName": "SelfServiceEnrolmentMA"});
    enrollMod.presentationController.resetEnrollObj();
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
       widgets[i].skin = "sknLbl979797SSP60px";
      // widgets[i].text = this.keypadString[i];
        widgets[i].text = "•";
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
  /*
* Code to resend OTP
*/
  requestResendOTP : function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var enrollModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "EnrollUIModule", "appName": "SelfServiceEnrolmentMA"});
    enrollModule.presentationController.resendOTP();
  },
  /*
* code to submit OTP
*/
  submitOTP: function () {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var otp = this.keypadString;
    if(applicationManager.getPresentationValidationUtility().isValidTextBox(otp))
    {
      var enrollModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "EnrollUIModule", "appName": "SelfServiceEnrolmentMA"});
	  enrollModule.presentationController.validateOTP(otp);
    }
    else
    {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var errorMsg = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.enterSecurityCode");
      this.bindGenericError(errorMsg);
    }
  },
  /*
  * Code to show error
  */
  bindGenericError  : function(errorMsg){
    var scopeObj=this;
    applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj,errorMsg);
	scopeObj.clearSecurityCode();
  },
   clearSecurityCode: function() {
    var widgets = this.view["flxInputSecurityCode"].widgets();
    for (var i = 0; i < 6; i++) {
      widgets[i].text = '_';
    }
    this.view.forceLayout();
  }
});