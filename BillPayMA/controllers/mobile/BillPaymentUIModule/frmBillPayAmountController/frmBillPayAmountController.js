define({
  keypadString:'0.00',
  isPeriodUsed : false,
  timerCounter: 0,
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"CALLBACK",currentForm,this.customBack);
  },
  preShow: function(){
    if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
      this.view.flxHeader.setVisibility(false);
    }
    var transMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
    var amtDet = transMod.presentationController.getTransObject();
    var formatUtil=applicationManager.getFormatUtilManager();
    this.view.lblDollar.text=formatUtil.getCurrencySymbol(amtDet.transactionCurrency);
    if(amtDet.amount&&amtDet.amount!==undefined&&amtDet.amount!==""&&amtDet.amount!==null)
    {
      this.keypadString = amtDet.amount;
      if(amtDet.amount.indexOf(".")==-1)
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
    var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
    var configManager = applicationManager.getConfigurationManager();
    if(configManager.isCombinedUser === "true"){
      var isBusinessAccount = accountMod.presentationController.fetchIsBusinessAccount(amtDet.fromAccountNumber);
      this.view.flxAccountType.isVisible = true;
      this.view.imgAccountType.src = (isBusinessAccount === "false") ? "personalaccount.png" : "businessaccount.png";
    }
    //   this.view.lblDollar.text=configManager.getCurrencyCode();
    var navManager = applicationManager.getNavigationManager();
    var toast=navManager.getCustomInfo("frmBillPayAmount");
    if(toast){
      if(toast.status=="success"&&toast.acountUpdated){
        this.showSuccessPopup(toast.res, toast.status);
      }
      else if(toast.status=="error")
        this.showErrorPopup(JSON.stringify(toast.err));
      navManager.setCustomInfo("frmBillPayAmount","");
    }
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(transMod.presentationController.isPayeeAdded){
      applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Manage.addedBillPayPayeeDuringBillPay","Successfully added payee account. Please proceed with your transaction."));
      transMod.presentationController.isPayeeAdded=false;
    }
       this.view.postShow = this.postshow;
    },

  customBack: function() {
    var navMan = applicationManager.getNavigationManager();
    if (navMan.getPreviousForm() === "frmAcknowledgement") {
      navMan.navigateTo("frmBillPay");
    }
    else {
      navMan.goBack();
    }   
  },
  
  postshow:function() {
    this.initActions();
    this.updateAmountValue();
    var formatUtility = applicationManager.getFormatUtilManager();
    var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('BillPaymentUIModule');
    if(!kony.sdk.isNullOrUndefined(presenter.presentationController.selectedAccountBankDone = false))
      if(presenter.presentationController.selectedAccountBankDone) {
        this.view.lblBank.text = presenter.presentationController.selectedAccountBank;
        this.view.lblFromAccountValue.text = presenter.presentationController.selectedAccount;
        this.view.lblBalanceValue.text = formatUtility.getCurrencySymbol() + presenter.presentationController.selectedAccountBalance;        
      }
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  initActions: function(){
    this.setFromAccountData();
    this.view.btnContinue.onClick =this.continueOnClick;
    this.view.btnChange.onClick = function(){
      applicationManager.getPresentationUtility().showLoadingScreen();
      var transMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
      transMod.presentationController.navFromAccountsPage();
    }
    this.view.customHeader.flxBack.onClick = this.customBack;
    this.view.customHeader.btnRight.onClick = function(){
      var transferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
      transferModule.presentationController.cancelCommon();
    }
  },
  isNotEmpty: function(str) {
    return !(!str || 0 === str.length);
  },
    setFromAccountData: function() {
    var transMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
    var frmdata= transMod.presentationController.getTransferObjectById();
    this.view.lblFromAccountValue.text=frmdata[0].processedAccountName;
    this.view.lblBalanceValue.text=frmdata[0].availableBalance;
    this.view.lblBank.text=frmdata[0].bankName;
    this.view.lblavailableBalance.text=frmdata[0].accountBalanceType;
    var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
    var profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
      if(isSingleCustomerProfile === true || isSingleCustomerProfile === "true"){
        this.view.flxAccountType.isVisible = false;
      }else{
        if(profileAccess === "both") {
          this.view.flxAccountType.isVisible = true;
          this.view.imgAccountType.src="businessaccount.png";
          if(frmdata[0].isBusinessAccount === false ||frmdata[0].isBusinessAccount === "false"){
            this.view.imgAccountType.src = "personalaccount.png" ;
          }
        }else{
          this.view.flxAccountType.isVisible = false;
        }}
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
    // if (this.keypadString.length === 1) {
    //   this.keypadString = '';
    //   this.updateAmountValue();
    // }else if (this.keypadString.length !== 0) {
    //   if(this.keypadString[this.keypadString.length-1]==='.'){
    //     this.isPeriodUsed = false;
    //   }
    //   this.keypadString = this.keypadString.substr(0, this.keypadString.length - 1);
    //   this.updateAmountValue();
    // }
  },
  updateAmountValue: function(){
    if(this.keypadString==='0.00'){
      this.view.btnContinue.skin = "sknBtna0a0a0SSPReg26px";
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
      this.view.btnContinue.skin = "sknBtn055BAF26px";
      this.view.btnContinue.setEnabled(true);
      this.view.lblAmount.text = this.view.keypad.formatAmount(keypadStringCommas);
    }
  },
  continueOnClick :function()
  {
    var amount= this.keypadString;
    var configManager = applicationManager.getConfigurationManager();
    if(Number(amount)>=Number(configManager.getConfigurationValue("minBillPayLimit")) && Number(amount)<=Number(configManager.getConfigurationValue("maxBillPayLimit")) ){
      var transferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
      var fromaccountdata = transferModule.presentationController.getTransferObjectById();
      transferModule.presentationController.setFromAccountsForTransactions(fromaccountdata[0]);
      var fromAvlBal = fromaccountdata[0].fromAccountBalance;
      transferModule.presentationController.evaluateAmount(amount,fromAvlBal);
    }
    else if(Number(amount)<Number(configManager.getConfigurationValue("minBillPayLimit"))){
      this.showErrorPopup(kony.i18n.getLocalizedString("kony.mb.entitlements.minTransactionLimitUnreached") + " "+configManager.getCurrencyCode()+Number(configManager.getConfigurationValue("minBillPayLimit")).toFixed(2));
    }
    else if(Number(amount)>Number(configManager.getConfigurationValue("maxBillPayLimit")) ){
      this.showErrorPopup(kony.i18n.getLocalizedString("kony.mb.entitlements.maxTransactionLimitExceeded") + " "+configManager.getCurrencyCode()+Number(configManager.getConfigurationValue("maxBillPayLimit")).toFixed(2));
    }
  },
  bindGenericError: function (errorMsg) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scopeObj = this;
    applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
  },
  showSuccessPopup : function(refID,type){
    var msg = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.BillPay.DefaultFromAccToastMessage");
    applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,msg);
  },
  showErrorPopup:function(errorMsg){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scopeObj = this;
    applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
  }
});