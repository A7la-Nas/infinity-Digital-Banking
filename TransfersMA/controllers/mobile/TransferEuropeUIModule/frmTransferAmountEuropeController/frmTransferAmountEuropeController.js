define({
  keypadString:'0.00',
  isPeriodUsed : false,
  timerCounter: 0,
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  preShow: function(){
    if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
      this.view.flxHeader.setVisibility(false);
    }    
    var transModPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    var transObj= transModPresentationController.getTransObject();
    var formatUtil=applicationManager.getFormatUtilManager();
    this.view.lblDollar.text=formatUtil.getCurrencySymbol(transObj.transactionCurrency);
    var amount= transObj.amount;
    if(amount&&amount!==undefined&&amount!==""&&amount!==null)
    {
      this.keypadString = amount;
      if(amount.indexOf(".")==-1)
      {
        this.isPeriodUsed = false;
      }
      else
      {
        this.isPeriodUsed = true;
      }
    }
    else
    {
      this.keypadString ='0.00';
    }
    // this.view.lblAmount.text = "0.00";
    this.initActions();
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    var accntType = navManager.getCustomInfo("frmTransfersToAccount");
    if(accntType.newBeneficiaryAdded){
      if(accntType.newBeneficiaryAdded == "true")
        this.bindGenericSuccess(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.addBenificiaryDuringPayment","Successfully recipient was added"));
      else
        this.bindGenericError(JSON.stringify(accntType.errmsg));
    }
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    this.setFromAccountData();
    this.setCurrencies();
    this.updateAmountValue();
    var accountId = applicationManager.getTransactionManager().getTransactionObject().fromAccountNumber;
    transModPresentationController.setLimitsForTransaction(accountId);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  initActions: function(){
    this.view.btnContinue.onClick =this.continueOnClick;
    this.view.btnChange.onClick = function(){
      applicationManager.getPresentationUtility().showLoadingScreen();
      var transMod = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
      transMod.commonFunctionForNavigation("frmTransfersFromAccountEurope");
    }
    this.view.lstboxCurrency.onSelection = this.selectCurrency;
    this.view.customHeader.flxBack.onClick = function(){
      var navMan=applicationManager.getNavigationManager();
      navMan.goBack();
    }
    this.view.customHeader.btnRight.onClick =this.cancelOnClick;
  },
  setCurrencies : function(){
    var configManager = applicationManager.getConfigurationManager();
    var transMod = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    var transferType = transMod.getTransObject().transferType;
    if(!kony.sdk.isNullOrUndefined(transferType) && transferType == "international"){
        var supportedCurrency = configManager.getSupportedCurrencies();
        this.view.lstboxCurrency.masterData = supportedCurrency;
      var transactionCurrency = transMod.getTransObject().transactionCurrency;
      var transactionCurrencyIndex = this.getCurrencyIndex(transactionCurrency,supportedCurrency);
      if(transactionCurrencyIndex!=-1){
        this.view.lstboxCurrency.selectedKey = supportedCurrency[transactionCurrencyIndex][0];
      }
      else if(supportedCurrency)
      {
        this.view.lstboxCurrency.selectedKey = supportedCurrency[0][0];
      }
      this.view.flxCurrency.setVisibility(true);
      this.view.flxAmountMain.left = "105Dp";
      this.view.lblDollar.setVisibility(false);
    }
    else{
      this.view.flxCurrency.setVisibility(false);
      this.view.flxAmountMain.left = "0Dp";
      this.view.lblDollar.setVisibility(true);
    }
  },
  getCurrencyIndex : function(transactionCurrency,supportedCurrency){
    if(transactionCurrency && supportedCurrency){
      for(var i=0;i<supportedCurrency.length;i++){
        if(transactionCurrency == supportedCurrency[i][0])
          return i;
      }
    }
    return -1;
  },
  selectCurrency : function(){
  },
  cancelOnClick:function()
  {
    var transferModule =applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    transferModule.cancelCommon();
  },
  setFromAccountData:function()
  {
    var transMod = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    var fromaccountdata= transMod.getTransferObjectById();
    this.view.lblFromAccountValue.text=fromaccountdata[0].processedName;
    this.view.lblBalanceValue.text=fromaccountdata[0].availableBalance;
    this.view.lblBank.text=fromaccountdata[0].bankName;
    this.view.lblavailableBalance.text=fromaccountdata[0].accountBalanceType;
  },
  setKeypadChar: function (char) {
    if(char=='.'){
      if(this.isPeriodUsed==false){
        this.isPeriodUsed = true;
      }else{
        return;
      }
    }
    this.keypadString = this.keypadString + char;
    var firstChar = this.keypadString[0];
    this.keypadString = this.keypadString.split("");
    for(var i=1; i<this.keypadString.length; i++){
      if(this.keypadString[i]=='.'){
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
      if(this.keypadString[i]=='.'){
        this.keypadString[i+1] = this.keypadString[i-1];
        i--;
      }else{
        this.keypadString[i+1] = this.keypadString[i];
      }
    }
    this.keypadString = this.keypadString.join("");
    this.keypadString = this.keypadString.substr(1);
    if(this.keypadString[0]=='.'){
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
  continueOnClick :function()
  {
    //     var amount= this.view.lblAmount.text;
    var selectedCurrency="";
    var configManager = applicationManager.getConfigurationManager();
    var amount= this.keypadString;
    var transferModule = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    var fromaccountdata= transferModule.getTransferObjectById();
    transferModule.setFromAccountsForTransactions(fromaccountdata[0]);
    var fromAvlBal = fromaccountdata[0].fromAccountBalance;
    var fromAccCurr = fromaccountdata[0].fromAccountCurrency;
    if(kony.sdk.isNullOrUndefined(fromAccCurr))
      fromAccCurr = configManager.getBaseCurrency();
    if(this.view.flxCurrency.isVisible){
      if(kony.sdk.isNullOrUndefined(this.view.lstboxCurrency.selectedKey)){
        this.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.selectCurrencyMessage"));
      }
      else
        selectedCurrency = this.view.lstboxCurrency.selectedKey;
    }
    else
      selectedCurrency = configManager.getBaseCurrency();
    if(selectedCurrency != ""){
      var evalAmountLimits = transferModule.evaluateMinMaxAmountLimits(amount,selectedCurrency);
      if(evalAmountLimits == "valid")
        transferModule.evaluateAmount(amount,fromAvlBal,selectedCurrency,fromAccCurr);
      else if(evalAmountLimits["max"]){
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        this.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.entitlements.maxTransactionLimitExceeded")+" "+configManager.getCurrencyCode()+evalAmountLimits["max"]);
      }
      else if(evalAmountLimits["min"]){
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        this.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.entitlements.minTransactionLimitUnreached")+" "+configManager.getCurrencyCode()+evalAmountLimits["min"]);
      }
    }
  },
  bindGenericSuccess:function(msg){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scopeObj = this;
    applicationManager.getDataProcessorUtility().showToastMessageSuccess(scopeObj,msg);
  },
  bindGenericError: function (errorMsg) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scopeObj = this;
    applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
  }
});