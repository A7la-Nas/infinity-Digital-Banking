define({
   keypadString: '',
    timerCounter:0,
   showSecurityCode:function()
   {
      var scope = this;
      this.keypadString = '';
      this.incompleteSecurityCodeView();
      this.updateInputBullets('flxInputSecurityCode');
      if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
        this.view.flxHeader.isVisible = true;
      }
      else{
        this.view.flxHeader.isVisible = false;
      }
     this.setKeyPadActions();
      var navManager = applicationManager.getNavigationManager();
	var currentForm = navManager.getCurrentForm();
	applicationManager.getPresentationFormUtility().logFormName(currentForm);
	applicationManager.getPresentationUtility().dismissLoadingScreen();
   },
    init : function(){
		var navManager = applicationManager.getNavigationManager();
		var currentForm=navManager.getCurrentForm();
		applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
},
    onHide : function(){
      this.view.btnResend.setEnabled(true);
      this.cancelTimer();
    },
     incompleteSecurityCodeView: function() {
          this.view.btnVerifySecCode.skin = "sknBtna0a0a0SSPReg26px";
          this.view.btnVerifySecCode.setEnabled(false);
          this.view.flxMainContainer.forceLayout();
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
        this.updateInputBullets('flxInputSecurityCode');
    },
    enterSecurityCodePostAction:function()
  {
        this.view.btnVerifySecCode.setEnabled(true);
        this.view.btnVerifySecCode.skin = "sknBtn0095e4RoundedffffffSSP26px";
        this.view.flxMainContainer.forceLayout();
  },
  updateInputBullets: function(inputFlx) {
        var widgets = this.view[inputFlx].widgets();
        for (var i = 0; i < this.keypadString.length; i++) {
            widgets[i].skin = "sknLbl979797SSP60px";
            widgets[i].text = "•"; //this.keypadString[i];
        }
        for (var i = this.keypadString.length; i < widgets.length; i++) {
            widgets[i].skin = "lblBlueFocus";
            widgets[i].text = '_';
        }
        this.view.forceLayout();
    },
   clearKeypadChar: function() {
        if (this.keypadString.length === 1) {
            this.keypadString = '';
            this.updateInputBullets('flxInputSecurityCode');
        }
        if (this.keypadString.length !== 0) {
            this.keypadString = this.keypadString.substr(0, this.keypadString.length - 1);
              if (this.keypadString.length <6)
                {
                  this.incompleteSecurityCodeView();
                }
            this.updateInputBullets('flxInputSecurityCode');
        }
    },
   btnVerifyOnClick:function(){
      this.view.btnResend.setEnabled(true);
      this.cancelTimer();
		var authMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
		authMode.presentationController.updateDeviceRegistration();
   },
    btnResendOnClick : function(){
      this.view.btnResend.setEnabled(false);
      kony.timer.schedule("resendTimer", this.atTimerEnd, 30 , false);
    },
    atTimerEnd : function(){
      this.view.btnResend.setEnabled(true);
      this.cancelTimer();
    },
  cancelTimer : function(){
    try{
      kony.timer.cancel("resendTimer");
    }
    catch(err){
      kony.print(err);
    }
  },
  flxCheckBoxOnClick: function() {
    if (this.view.imgCheckBox.src === "remembermetick.png") {
      this.view.imgCheckBox.src = "remeberme.png";
    } else {
      this.view.imgCheckBox.src = "remembermetick.png";
    }
    this.view.flxCheckBox.forceLayout();
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
  },
  onCancelClick : function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var authMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
    authMode.presentationController.defaultLoginToAccounts();
    authMode.presentationController.setDeviceRegisterflag(false);
  }
 });