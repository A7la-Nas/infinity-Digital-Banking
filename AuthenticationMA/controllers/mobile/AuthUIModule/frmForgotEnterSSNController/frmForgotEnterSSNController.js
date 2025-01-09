define({
    keypadString: '',
    timerCounter: 0,
    init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
 },
    initActions: function() {
        this.view.btnVerify.onClick = this.validateSSNForgotPwd;
        this.view.customHeader.flxBack.onClick = this.goBack;
        this.view.customHeader.btnRight.onClick = this.onCancel;
		this.setKeyPadActions();
        this.setBtnVerify(false);
    },
    preShow: function() {
	  this.keypadString = "";
      this.view.lblSSN.text = "";
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
    var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
    var forgotObj = authModule.presentationController.getForgotObjectForView();
    var ssn = forgotObj.ssn;
    if (!kony.sdk.isNullOrUndefined(ssn)) {
        this.keypadString = ssn;
        this.view.lblSSN.text = ssn;
        this.setBtnVerify(true);
    }
    else {
        this.setBtnVerify(false);
    }
   // this.updateInputBullets();
  },
    getKeypadString : function(){
      var ssn = this.keypadString;
      ssn = ssn.replace(/-/g,"");
      return ssn;
    },
    //KEYPAD OPS:
    updateInputBullets: function() {
        var dummyString = '___-__-____';
        if (this.keypadString.length === 3 || this.keypadString.length === 6) {
            this.keypadString = this.keypadString + '-';
        }
        var widgets = this.view["flxInputSSN"].widgets();
        for (var i = 0; i < this.keypadString.length; i++) {
            // widgets[i].skin = "sknLbl979797SSP60px";
            if(this.keypadString[i]==='-'){
                widgets[i].text = this.keypadString[i];
            }else{
                widgets[i].text = "•";
            }
        }
        for (var i = this.keypadString.length; i < widgets.length; i++) {
            //widgets[i].skin = "sknLble3e3e3SSP60px";
            widgets[i].text = dummyString[i];
        }
        if(this.keypadString.length === 0 ){
            this.setBtnVerify(false);
      	  }
    	else{
           this.setBtnVerify(true);
         }
        this.view.forceLayout();
    },
    setKeypadChar: function(char) {
        //if (this.keypadString.length === 11) return;
        this.keypadString = this.keypadString + char;
        this.view.lblSSN.text = this.keypadString;
      	if(this.keypadString.length === 0 ){
            this.setBtnVerify(false);
      	}
    	else{
            this.setBtnVerify(true);
      	 }
       // this.updateInputBullets();
    },
    clearKeypadChar: function() {
        if (this.keypadString.length === 1) {
            this.keypadString = '';
            this.view.btnVerify.skin = "sknBtna0a0a0SSPReg26px";
    		this.view.btnVerify.setEnabled(false);
        }
        if (this.keypadString.length !== 0) {
            if (this.keypadString[this.keypadString.length - 1] === '-') {
                this.keypadString = this.keypadString.substr(0, this.keypadString.length - 1);
            }
            this.keypadString = this.keypadString.substr(0, this.keypadString.length - 1);
        }
     //   this.updateInputBullets();
      this.view.lblSSN.text = this.keypadString;
    },
    validateSSNForgotPwd: function() {
        var SSN = this.getKeypadString();
        var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
        authModule.presentationController.validateSSN(SSN);
    },
    bindViewError: function(msg) {
        applicationManager.getDataProcessorUtility().showToastMessageError(this, msg);
    },
    goBack: function() {
        var navManager = applicationManager.getNavigationManager();
        navManager.goBack();
    },
    onCancel: function() {
        var navManager = applicationManager.getNavigationManager();
        navManager.clearStack();
        var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
        authModule.presentationController.navigateToLogin();
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
 },
  setBtnVerify : function(enable){
    if(enable === true){
     	this.view.btnVerify.skin = "sknBtn055BAF26px";
       	this.view.btnVerify.setEnabled(true);
    }
    else{
     	this.view.btnVerify.skin = "sknBtna0a0a0SSPReg26px";
    	this.view.btnVerify.setEnabled(false);
    }
  }
});