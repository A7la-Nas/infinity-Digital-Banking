define({
  keypadString: '0.00',
  isPeriodUsed: false,
  navigateTo: '',
  previousForm:'',
  onNavigate: function(obj) {
    if (obj === undefined) {
      var newObj = {
        "navigateTo": "confirmWithdraw"
      };
      obj = newObj;
    }
    if (obj.navigateTo === "confirmWithdraw") {
      this.navigateTo = "confirmWithdraw";
      this.previousForm="cashRec";
    }
  },
  init : function(){
    var FormValidator = require("FormValidatorManager")
	this.fv = new FormValidator(1);
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
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
    this.view.btnDot.onClick = function() {
      scopeObj.setKeypadChar('.');
    };
  },
  preShow: function() {
    if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
      this.view.flxHeader.isVisible = false;
    }
    this.setKeyPadActions();
    this.fv.submissionView(this.view.btnContinue);
    this.keypadString = '0.00';
    this.fv.checkAmountLength(this.keypadString);
    this.view.lblAmount.text = "0.00";
    var configManager = applicationManager.getConfigurationManager();
    this.view.lblDollar.text=configManager.getCurrencyCode();
    this.updateAmountValue();
    this.populateDetails();
    this.initActions();
    if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
      this.view.flxHeader.isVisible = false;
    }else{
      this.view.flxHeader.isVisible = true;
    }
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
  },
  initActions: function() {
    var scopeObj = this;
    this.view.btnContinue.onClick = function() {
      var cardlessModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
      cardlessModule.presentationController.setQRTransactionAmount(scopeObj.keypadString);
    };
    this.view.btnChange.onClick = function(){
      applicationManager.getPresentationUtility().showLoadingScreen();
      var cardlessModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
      cardlessModule.presentationController.showFromQRScannedAccounts();
    };
    this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
    this.view.customHeader.btnRight.onClick = this.btnRightOnClick;
  },
  flxBackOnClick: function() {
    var navMan=applicationManager.getNavigationManager();
    navMan.goBack();
  },
  btnRightOnClick: function() {
    var cardlessModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
    cardlessModule.presentationController.cancelCommonQR();
  },
  setKeypadChar: function(char) {
    if(char==='.'){
      if(this.isPeriodUsed===false){
        this.isPeriodUsed = true;
      }else{
        return;
      }
    }
    this.keypadString = this.keypadString + char;
    var firstChar = this.keypadString[0];
    this.keypadString = this.keypadString.split("");
    for(var i=1; i<this.keypadString.length; i++){
      if(this.keypadString[i]==='.'){
        this.keypadString[i-1] = this.keypadString[i+1];
        i++;
      }else{
        this.keypadString[i-1]=this.keypadString[i];
      }
    }
    this.keypadString = this.keypadString.join("");
    this.keypadString = this.keypadString.substr(0, this.keypadString.length-1);
    if(firstChar!=='0'){
      this.keypadString = firstChar + this.keypadString;
    }
    this.updateAmountValue();
  },
  clearKeypadChar: function() {
    if(this.keypadString ==='0.00') return;
    this.keypadString = this.keypadString.split("");
    for(var i=this.keypadString.length-2; i>=0; i--){
      if(this.keypadString[i]==='.'){
        this.keypadString[i+1] = this.keypadString[i-1];
        i--;
      }else{
        this.keypadString[i+1] = this.keypadString[i];
      }
    }
    this.keypadString = this.keypadString.join("");
    this.keypadString = this.keypadString.substr(1);
    if(this.keypadString[0]==='.'){
      this.keypadString = '0'+ this.keypadString;
    }
    this.updateAmountValue();
  },
  updateAmountValue: function() {
    if(this.keypadString==='0.00'){
      this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
      this.view.btnContinue.setEnabled(false);
      this.view.lblAmount.text = this.view.keypad.formatAmount(this.keypadString);
    }else{
      var keypadStringCommas = '';
      var beforeDecimal = this.keypadString.split('.')[0];
      var afterDecimal = this.keypadString.split('.')[1];
      if(beforeDecimal.length>3){
        var withCommas = (beforeDecimal.length)/3;
        var withoutCommas = (beforeDecimal.length)%3;
        var temp = '';
        if(withoutCommas!=0){
          temp = beforeDecimal.substr(0, withoutCommas)+',';
        }
        for(var i = withoutCommas; i<beforeDecimal.length; i+=3){
          temp+=beforeDecimal.substr(i, 3)+',';
        }
        beforeDecimal = temp.substr(0, temp.length-1);
      }
      keypadStringCommas = beforeDecimal + '.'+afterDecimal;
      this.view.btnContinue.skin = "sknBtn0095e4RoundedffffffSSP26px";
      this.view.btnContinue.setEnabled(true);
      this.view.lblAmount.text = this.view.keypad.formatAmount(keypadStringCommas);
    }
  },
  populateDetails:function() {
    var navMan=applicationManager.getNavigationManager();
    var cardlessModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
    var accountData=navMan.getCustomInfo("frmCardLessWithdrawQR");
    if(accountData&&accountData!==null)
    {
      this.view.lblBank.text = cardlessModule.presentationController.getFromBankName();
      this.view.lblFromAccountValue.text = accountData.fromAccountName;
      this.view.lblBalanceValue.text = accountData.fromAccountBalance;
      if(accountData.amount){
        this.view.lblAmount.text=accountData.amount;
        this.keypadString=accountData.amount;
        this.fv.checkAmountLength(this.keypadString);
      }
    }
  },
  bindGenericError: function (errorMsg) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scopeObj = this;
    applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
  }
});