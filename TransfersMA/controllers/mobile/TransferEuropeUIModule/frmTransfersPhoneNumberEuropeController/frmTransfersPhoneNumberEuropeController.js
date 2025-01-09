define({
    keypadString: '',
    timerCounter: 0,
    init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    this.view.lblPhoneNumber.text = kony.i18n.getLocalizedString("kony.mb.p2p.enterPhoneNo");
 },
    initActions: function() {
        this.view.customHeader.flxBack.onClick = this.goBack;
        this.view.customHeader.btnRight.onClick = this.onCancel;
       
		this.setKeyPadActions();
       
        this.view.btnVerify.onClick = this.onSavePhonenumber;
        //this.validateSSNForgotPwd();
    },
    preShow: function() {
      //this.keypadString = "";
      this.view.flxPopup.setVisibility(false);
      this.initActions();
      this.renderTitleBar();
      //this.handleData();
      applicationManager.getPresentationUtility().dismissLoadingScreen();
       var transferModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
       var benificiaryData=transferModulePresentationController.getBenificiaryData();
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      this.assignDataToForm(benificiaryData);
      this.updateInputBullets();
      this.setKeyPadActions();
      this.view.btnVerify.onClick = this.onSavePhonenumber;
      applicationManager.getPresentationFormUtility().logFormName(currentForm);
    },
    renderTitleBar : function(){
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
   // this.updateInputBullets();
  },
    getKeypadString : function(){
      var ssn = this.keypadString;
      ssn = ssn.replace(/-/g,"");
      return ssn;
    },
    //KEYPAD OPS:
    updateInputBullets: function() {
        /*var dummyString = '___-__-____';
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
        }*/
        if(this.keypadString.length !== 11)
          {
            this.view.btnVerify.skin = "sknBtnE2E9F0Rounded";
            this.view.btnVerify.setEnabled(false);
          }
          else
          {
            this.view.btnVerify.skin = "sknBtn0095e4RoundedffffffSSP26px";
            this.view.btnVerify.setEnabled(true);
          }
        this.view.forceLayout();
    },
    setKeypadChar: function(char) {
        if (this.keypadString.length === 11) return;
        this.keypadString = this.keypadString + char;
        this.view.lblPhoneNumber.text = this.keypadString;
        this.updateInputBullets();
    },
    clearKeypadChar: function() {
        if (this.keypadString.length === 1) {
            this.keypadString = '';
        }
        if (this.keypadString.length !== 0) {
            if (this.keypadString[this.keypadString.length - 1] === '-') {
                this.keypadString = this.keypadString.substr(0, this.keypadString.length - 1);
            }
            this.keypadString = this.keypadString.substr(0, this.keypadString.length - 1);
        }
      this.view.lblPhoneNumber.text = this.keypadString;
      this.updateInputBullets();
    },
  //validateSSNForgotPwd: function() {
        //var SSN = this.getKeypadString();
        //var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferModule");
        //authModule.presentationController.validateSSN(SSN);
    //},
  onSavePhonenumber:function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var data ={};
	var transferModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    if(this.view.lblPhoneNumber.text !== ""){
     data ={
      "phoneNumber" : this.view.lblPhoneNumber.text
     };
      transferModulePresentationController.navigateToVerifyDetailsFromPhoneNumber(data);
    }
  },
  assignDataToForm : function(benficiaryData){
    if(benficiaryData.phoneNumber && benficiaryData.phoneNumber !== "" && benficiaryData.phoneNumber !== null){
      this.view.lblPhoneNumber.text =benficiaryData.phoneNumber ;
      this.keypadString= benficiaryData.phoneNumber;
    }else{
      this.view.lblPhoneNumber.text = kony.i18n.getLocalizedString("kony.mb.p2p.enterPhoneNo");
      this.keypadString ="";
    }
    //this.view.lblPhoneNumber.text = (benficiaryData.phoneNumber && benficiaryData.phoneNumber !== "" && benficiaryData.phoneNumber !== null)?benficiaryData.phoneNumber:"";
  },
    bindViewError: function(msg) {
        applicationManager.getDataProcessorUtility().showToastMessageError(this, msg);
    },
    goBack: function() {
        var navManager = applicationManager.getNavigationManager();
        navManager.goBack();
    },
    onCancel: function() {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var transferModPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    transferModPresentationController.commonFunctionForNavigation("frmBenVerifyDetailsEurope");
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