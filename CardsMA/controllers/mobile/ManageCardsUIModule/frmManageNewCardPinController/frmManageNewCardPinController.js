define({
  keypadString: '',
  timerCounter: 0,
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  showPinCode: function () {
    this.view.imgPin.src="pin_icon.png"
    this.view.flxPopup.setVisibility(false);
    this.updateInputBullets();
    this.initActions();
    if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
      this.view.flxHeader.isVisible = false;
    }else{
      this.view.flxHeader.isVisible = true;
    }
    this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
    this.view.customHeader.btnRight.onClick = this.flxBackOnClick;
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
  /**
         * Method used to check if the entered pin is valid or not.
         * @param {String} pin - contains the entered pin.
         */
  isValidPin: function(pin) {
    var regex = new RegExp('^[0-9]{4,4}$');
    if (regex.test(pin)) {
        for (var i = 1; i < pin.length; i++) {
            if (Number(pin[i]) - 1 !== Number(pin[i - 1])) {
                return true;
            }
        }
    }
    return false;
},
  setKeypadChar: function (char) {
    if (this.keypadString.length === 4) return;
    this.keypadString = this.keypadString + char;
    this.updateInputBullets();
    if (this.keypadString.length === 4 && this.isValidPin(this.keypadString)){
      this.view.btnNext.skin="sknBtn055BAF26px";
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
    var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
    manageCardsModule.presentationController.navigateToConfirmPin(this.keypadString);

  },
  clearKeyPadString:function(){
    for(var i=0;i<4;i++){
      this.clearKeypadChar();
    }
  },
  flxBackOnClick: function() {
    var navMan = applicationManager.getNavigationManager();
    navMan.goBack();
  },
  cancelCommon:function()
  {
    var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
    manageCardsModule.presentationController.cancelCommon();
  }
});