define({
  keypadString: '',
  init: function () {
    var scope=this;
    var currentFormObject = kony.application.getCurrentForm();
    var currentForm=currentFormObject.id;
    applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.navigateCustomBack);
  },
  navigateCustomBack: function() {
    var transMod = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    transMod.commonFunctionForgoBack();
  },
  preShow: function () {
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
    }
    this.keypadString = '';
    var transMod = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    var recur = transMod.getTransObject();
    if (recur.numberOfRecurrences !== null && recur.numberOfRecurrences !== "" && recur.numberOfRecurrences !== undefined) {
      this.keypadString = recur.numberOfRecurrences;
    }
    this.updateInputBullets();
    this.initActions();
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
  },
  initActions: function() {
    var scope = this;
    this.view.btnContinue.onClick = this.clickOnContinue;
    this.view.customHeader.flxBack.onClick = this.navigateCustomBack;
    this.view.customHeader.btnRight.onClick = function() {
      scope.cancelOnClick();
    }
    this.view.flxClearAmount.onTouchEnd = this.clearKeypad;
  },
  updateInputBullets: function() {
    if (this.keypadString === "") {
      this.view.lblNumber.text = "0";
      this.view.lblNumber.skin = "sknLblA0A0A0SSP42px";
      this.view.flxClearAmount.isVisible = false;
      this.view.btnContinue.setEnabled(false);
      this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
      this.view.btnContinue.focusSkin = "sknBtnOnBoardingInactive";
    }
    else {
      this.view.lblNumber.text = this.keypadString;
      this.view.lblNumber.skin = "sknLbl4a4a4aSSP42px";
      if (parseInt(this.keypadString) !== 0) {
        this.view.btnContinue.setEnabled(true);
        this.view.flxClearAmount.isVisible = true;
        this.view.btnContinue.skin = "sknBtn0095e4RoundedffffffSSP26px";
        this.view.btnContinue.focusSkin = "sknBtn0095e4RoundedffffffSSP26px";
      } else {
        this.view.btnContinue.setEnabled(false);
        this.view.flxClearAmount.isVisible = true;
        this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
        this.view.btnContinue.focusSkin = "sknBtnOnBoardingInactive";
      }
    }
    this.view.forceLayout();
  },
  setKeypadChar: function(char) {
    if (this.keypadString.length < 3) {
    	this.keypadString = this.keypadString + char;
    	this.updateInputBullets();
    }
  },
  clearKeypadChar: function() {
    if (this.keypadString.length === 1) {
      this.keypadString = '';
      this.updateInputBullets();
    }
    if (this.keypadString.length !== 0) {
      this.keypadString = this.keypadString.substr(0, this.keypadString.length - 1);
      this.updateInputBullets();
    }
  },
  clickOnContinue: function() {
    var rec = Number(this.keypadString);
    var transMod = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    transMod.setRecurrence(this.keypadString);
  },
  cancelOnClick: function() {
    var transMod = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    transMod.cancelCommon();
  },
  clearKeypad: function(){
    this.keypadString ='';
    this.updateInputBullets();
  },
});