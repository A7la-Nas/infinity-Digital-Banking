define({
  toAccountNumber : '',
  keypadString:'0.00',
  depositAmountCDInit : function(){
    var FormValidator = require("FormValidatorManager")
	this.fv = new FormValidator(1);
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  preShow: function(){
    this.fv.submissionView(this.view.btnContinue);
    this.renderTitleBar();
    this.setKeyPadActions();
    this.initActions();
    this.setInitialUI();
    this.setFlxData();
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
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
  setInitialUI : function(){
    var configManager = applicationManager.getConfigurationManager();
    debugger;
    this.view.lblDollar.text=configManager.getCurrencyCode();
    var navManager = applicationManager.getNavigationManager();
   // var formData	= navManager.getCustomInfo("frmDepositAmountCD");
    
    var formData	= navManager.getCustomInfo({"appName" : "ArrangementsMA", "friendlyName" : "CheckDepositUIModule/frmDepositAmountCD"});
    if(formData.isNewCheckDeposit) {
      this.keypadString = '0.00';
      formData.isNewCheckDeposit = false;
      navManager.setCustomInfo({"appName" : "ArrangementsMA", "friendlyName" : "CheckDepositUIModule/frmDepositAmountCD"},formData);
    }
    else
    {
      var checkDepositModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName": "CheckDepositUIModule", "appName": "ArrangementsMA"});
      var depObj = checkDepositModule.presentationController.getDepositObjInView();
      if(depObj.amount && this.keypadString === '0.00') {
        this.keypadString = depObj.amount;
      }
    }
    this.updateAmountValue();
  },
  renderTitleBar: function() {
    var deviceUtilManager = applicationManager.getDeviceUtilManager();
    var isIphone = deviceUtilManager.isIPhone();
    if (isIphone) {
      this.view.flxHeader.setVisibility(false);
    }
  },
  initActions: function(){
    var scopeObj=this;
    this.view.btnContinue.onClick = this.onBtnContinueClick;
    this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
    this.view.customHeader.btnRight.onClick = this.onCancelClick;
    this.view.btnChange.onClick = this.onBtnChangeClick;
  },
  onBtnChangeClick: function() {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var checkDepositModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName": "CheckDepositUIModule", "appName": "ArrangementsMA"});
    checkDepositModule.presentationController.getToAccounts(true);
  },
  onBtnContinueClick: function(){
    var checkDepositModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName": "CheckDepositUIModule", "appName": "ArrangementsMA"});
    var data = {};
    data.toAccountNumber = this.toAccountNumber;
    data.toAccountName = this.view.lblFromAccountValue.text;
    data.bankName = this.view.lblBank.text;
    data.amount = this.keypadString;
    var navManager = applicationManager.getNavigationManager();
     var formData	= navManager.getCustomInfo({"appName" : "ArrangementsMA", "friendlyName" : "CheckDepositUIModule/frmDepositAmountCD"});
    data.currency = formData.accountInfo.currencyCode;
   	var configManager = applicationManager.getConfigurationManager();
    debugger;
    // temporary disable this due to missing limits
    /*
    if(Number(data.amount) < Number(configManager.getConfigurationValue("minRDCLimit"))) {
    	var i18nKeyMin = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.entitlements.minTransactionLimitUnreached");
        this.bindGenericError(i18nKeyMin+configManager.getCurrencyCode()+Number(configManager.getConfigurationValue("minRDCLimit")).toFixed(2));
    }
    else if(Number(data.amount) > Number(configManager.getConfigurationValue("maxRDCLimit"))) {
    	var i18nKeyMax = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.entitlements.maxTransactionLimitExceeded");
        this.bindGenericError(i18nKeyMax+configManager.getCurrencyCode()+Number(configManager.getConfigurationValue("maxRDCLimit")).toFixed(2));
    }
   	else {
    	applicationManager.getPresentationUtility().showLoadingScreen();
  	    checkDepositModule.presentationController.setDepositDetails(data);
      	this.keypadString = '0.00';
    } */
    applicationManager.getPresentationUtility().showLoadingScreen();
  	    checkDepositModule.presentationController.setDepositDetails(data);
      	this.keypadString = '0.00';
    
  },
  flxBackOnClick: function() {
    var navManager = applicationManager.getNavigationManager();
    navManager.goBack();
  },
  onCancelClick: function() {
    this.keypadString = '0.00';
    var checkDepositModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName": "CheckDepositUIModule", "appName": "ArrangementsMA"});
    checkDepositModule.presentationController.cancelDeposit();
  },
  setKeypadChar: function (char) {
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
  clearKeypadChar: function () {
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
  updateAmountValue: function(){
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
  setFlxData: function() {
    var navManager = applicationManager.getNavigationManager();
    var flxData	= navManager.getCustomInfo({"appName" : "ArrangementsMA", "friendlyName" : "CheckDepositUIModule/frmDepositAmountCD"});
    var formatUtility = applicationManager.getFormatUtilManager();
    var configurationManager = applicationManager.getConfigurationManager();
    var currencySymbol = formatUtility.getCurrencySymbol(flxData.accountInfo.currencyCode);
    this.view.lblDollar.text = configurationManager.getCurrencyCode();
    var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
    var profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
    if(isSingleCustomerProfile === true || isSingleCustomerProfile === "true"){
      this.view.imgBankType.isVisible = false;
      this.view.lblFromAccountValue.left ="20dp";
      if (kony.i18n.getCurrentLocale() === "ar_AE"){
        this.view.lblFromAccountValue.left ="186dp";
      }
    }else{
      if(profileAccess === "both") {
        this.view.imgBankType.isVisible = true;
        this.view.lblFromAccountValue.left ="45dp";
        if (kony.i18n.getCurrentLocale() === "ar_AE"){
          this.view.lblFromAccountValue.left ="160dp";
        }
        if(flxData.accountInfo.isBusinessAccount === "true"){
          this.view.imgBankType.src = "businessaccount.png";
        }else{
          this.view.imgBankType.src = "personalaccount.png";
        }
      }else{
        this.view.imgBankType.isVisible = false;
        this.view.lblFromAccountValue.left ="20dp";
        if (kony.i18n.getCurrentLocale() === "ar_AE"){
          this.view.lblFromAccountValue.left ="186dp";
        }
      }}
//     if( configurationManager.isCombinedUser === "true"){
//         this.view.imgBankType.isVisible = true;
//         this.view.lblFromAccountValue.left ="45dp";
//         if(flxData.accountInfo.isBusinessAccount === "true"){
//           this.view.imgBankType.src = "businessaccount.png";
//         }else{
//           this.view.imgBankType.src = "personalaccount.png";
//         }
//       }else {
//         this.view.imgBankType.isVisible = false;
//         this.view.lblFromAccountValue.left ="20dp";
//       }
    this.view.lblFromAccountValue.text = flxData.accountInfo.nickName;
    this.view.lblBalanceValue.text = flxData.accountInfo.lblAccountBalValue;
    this.view.lblBank.text = flxData.accountInfo.lblBankName;
    this.toAccountNumber = flxData.accountInfo.accountID;
  },
   bindGenericError: function (errorMsg) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scopeObj = this;
    applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
  }
});