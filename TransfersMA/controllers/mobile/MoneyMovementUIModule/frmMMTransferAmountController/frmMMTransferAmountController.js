define({
  keypadString: '0.00',
  isPeriodUsed : false,
  isToLoanAccount : false,
  isDueAmountClicked : false,
  dueAmount: '0.00',
  totalOverdue: '0.00',
  fromAccountBalance: '',
  nextPaymentAmount: '0.00',
  currencyValue:'USD',
  init: function () {
    var scope=this;
    var currentFormObject = kony.application.getCurrentForm();
    var currentForm=currentFormObject.id;
    applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.navigateCustomBack);
  },
  navigateCustomBack: function() {
    var moneyMovementModule = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    moneyMovementModule.commonFunctionForgoBack();
  },
  preShow: function () {
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
    }
    var configManager = applicationManager.getConfigurationManager();
    var formatUtil=applicationManager.getFormatUtilManager();
    var moneyMovementPresentationController = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    var transObj= moneyMovementPresentationController.getTransObject();
    this.fromAccountBalance = transObj.fromAccountBalance;
    if (moneyMovementPresentationController.transactionMode !== applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer")){
      this.setLoanPayDue();
      if(this.isToLoanAccount === false)
      this.setAmount(transObj.amount);
    }
    else {
      this.view.flxAmount.setVisibility(false);
      this.view.flxOtrAmount.setVisibility(false);
      this.view.flxDueAmount.setVisibility(false);
      this.view.flxAmountBtns.setVisibility(false);
      this.view.flxAmountWithFlag.setVisibility(true);
      this.view.flxKeypad.isVisible = true;
      this.view.flxMainContainer.bottom = "32%";
      this.setAmount(transObj.amount);
      this.setInternationalCurrency(transObj.transactionCurrency);
    }
    this.setFromAccountData();
    this.setToAccountData();
    this.validateToAccount();
    this.view.lblDollar.text=formatUtil.getCurrencySymbol(transObj.transactionCurrency);
    if (moneyMovementPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers") || moneyMovementPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts") || moneyMovementPresentationController.transactionMode === "PayAPerson"){
      var transactionManager = applicationManager.getTransactionManager();
      this.view.lblDollar.text = formatUtil.getCurrencySymbol(transObj.fromAccountCurrency);
      transactionManager.setTransactionAttribute("transactionCurrency", transObj.fromAccountCurrency);
    }
    this.initActions();
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  initActions: function () {
	var scope=this;
    var navMan = applicationManager.getNavigationManager();
    var moneyMovementPresentationController = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    this.view.customHeader.flxBack.onTouchEnd = this.navigateCustomBack;
    this.view.customHeader.btnRight.onClick = scope.cancelOnClick;
    this.view.flxClearAmount.onTouchEnd = this.clearKeypad;
    this.view.flxClearOtherAmount.onTouchEnd = this.clearOtherAmountOnTouchEnd;
    this.view.flxFromAccount.onTouchEnd = function(){
      moneyMovementPresentationController.haveLimitsBeenFetched = false;
      moneyMovementPresentationController.initializeStateData(true,"frmMMTransferAmount");
      moneyMovementPresentationController.commonFunctionForNavigation("frmMMTransferFromAccount");
    }
    this.view.flxToAccount.onTouchEnd = function(){
      moneyMovementPresentationController.haveLimitsBeenFetched = false;
      moneyMovementPresentationController.initializeStateData(true,"frmMMTransferAmount");
      moneyMovementPresentationController.filterToAccountsByExludingFromAccount();
      moneyMovementPresentationController.commonFunctionForNavigation("frmMMTransferToAccount");
    }
    this.view.btnContinue.onClick = this.continueOnClick;
    this.view.btnDueAmount.onClick = this.DueAmountOnClick;
    this.view.btnOtherAmount.onClick = this.OtherAmountOnClick;   
    this.view.flxCurrency.onTouchEnd = this.selectCurrency;
    this.view.imgFlag.onTouchEnd = this.selectCurrency; 
  },
  postShow:function(){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  setLoanPayDue : function(){
    var moneyMovementPresentationController = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    var toAccountData = moneyMovementPresentationController.getToAccountData();
	var moneyMovementPresentationController = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    var transObj= moneyMovementPresentationController.getTransObject();
    if(toAccountData.toAccountType === "Loan"){
      this.view.flxAmount.isVisible = false;
      this.view.flxKeypad.isVisible = false;
      this.view.flxAmountWithFlag.isVisible = false;
      this.view.flxDueAmount.isVisible = true;
      this.view.flxOtrAmount.isVisible = false;
      this.view.flxAmountBtns.isVisible = true;
      this.isToLoanAccount = true;
      this.isDueAmountClicked = true;
      this.view.btnDueAmount.skin = "sknBtn0095e4RoundedffffffSSP26px";
      this.view.btnOtherAmount.skin = "sknBtnBorderAlternate";
	   if(toAccountData.paymentDue == null || toAccountData.paymentDue == undefined)
                toAccountData.paymentDue = "0";
      this.totalOverdue = toAccountData.paymentDue;
      this.view.flxMainContainer.bottom = "0%";
	  if (toAccountData.nextPaymentAmount == null || toAccountData.nextPaymentAmount == undefined)
               toAccountData.nextPaymentAmount="0";
      this.nextPaymentAmount = toAccountData.nextPaymentAmount;
      if(Number(toAccountData.nextPaymentAmount) + Number(toAccountData.paymentDue) > 0){
        this.dueAmount = ""+(Number(toAccountData.nextPaymentAmount) + Number(toAccountData.paymentDue));
        this.view.lblDueAmount.text = this.dueAmount;
        this.view.tbxDueErr.isVisible = false;
        this.view.btnContinue.setEnabled(true);
        this.view.btnContinue.skin = "sknBtn0095e4RoundedffffffSSP26px";
      }
      else{
        //when next payment = $0.00
        this.view.lblDueAmount.text = "0.00";
        this.view.tbxDueErr.isVisible = true;
        this.view.btnContinue.setEnabled(false);
        this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
      }      
    }
	else{
      //reset pay loan due amount screen when To Account != Loan 
      this.view.flxAmount.isVisible = true;
      this.view.flxKeypad.isVisible = true;
      this.view.flxDueAmount.isVisible = false;
      this.view.flxOtrAmount.isVisible = false;
      this.view.flxAmountBtns.isVisible = false;
      this.view.flxAmountWithFlag.isVisible = false;
      this.isToLoanAccount = false;
      this.isDueAmountClicked = false;
      this.view.flxMainContainer.bottom = "32%";
    }
  },
  setAmount : function(amount){
    if(amount)
    {
      this.keypadString = amount;
      if(amount.indexOf(".")===-1)
      {
        this.isPeriodUsed = false;
      }
      else
      {
        this.isPeriodUsed = true;
      }
    }
    else
      this.keypadString ='0.00';
    this.updateAmountValue();
  },
  setKeypadChar: function (char) {
    if (char === '.') {
      if (this.isPeriodUsed === false) {
        this.isPeriodUsed = true;
      } else {
        return;
      }
    }
    this.keypadString = this.keypadString + char;
    var firstChar = this.keypadString[0];
    this.keypadString = this.keypadString.split("");
    for (var i = 1; i < this.keypadString.length; i++) {
      if (this.keypadString[i] === '.') {
        this.keypadString[i - 1] = this.keypadString[i + 1];
        i++;
      } else {
        this.keypadString[i - 1] = this.keypadString[i];
      }
    }
    this.keypadString = this.keypadString.join("");
    this.keypadString = this.keypadString.substr(0, this.keypadString.length - 1);
    if (firstChar !== '0') {
      this.keypadString = firstChar + this.keypadString;
    }
    this.updateAmountValue();
  },
  clearKeypadChar: function () {
    if (this.keypadString === '0.00') return;
	this.keypadString = this.keypadString.split("");
    for (var i = this.keypadString.length - 2; i >= 0; i--) {
      if (this.keypadString[i] === '.') {
        this.keypadString[i + 1] = this.keypadString[i - 1];
        i--;
      } else {
        this.keypadString[i + 1] = this.keypadString[i];
      }
    }
    this.keypadString = this.keypadString.join("");
    this.keypadString = this.keypadString.substr(1);
    if (this.keypadString[0] === '.') {
      this.keypadString = '0' + this.keypadString;
    }
    this.updateAmountValue();
  },
  clearKeypad: function(){
    this.keypadString ='0.00';
    this.updateAmountValue();
  },
  updateAmountValue: function () {
    var moneyMovementPresentationController = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    if (this.keypadString === '0.00' || this.keypadString === '0') {
      if (moneyMovementPresentationController.transactionMode !== applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer")) {
        if (this.isToLoanAccount === true) {
          this.view.lblOtherAmount.skin = "sknLblA0A0A0SSP42px";
          this.view.lblDollarOtherAmount.skin = "sknLblA0A0A0SSP42px";
          this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
          this.view.btnContinue.setEnabled(false);
          this.view.flxClearOtherAmount.setVisibility(false);
          this.view.lblOtherAmount.text = this.view.keypad.formatAmount(this.keypadString);
        }
        else {
          this.view.lblAmount.skin = "sknLblA0A0A0SSP42px";
          this.view.lblDollar.skin = "sknLblA0A0A0SSP42px";
          this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
          this.view.btnContinue.setEnabled(false);
          this.view.flxClearAmount.setVisibility(false);
          this.view.lblAmount.text = this.view.keypad.formatAmount(this.keypadString);
        }
      }
      else {
        this.view.lblAmountWithFlag.skin = "sknLblA0A0A0ssp66px";
        this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
        this.view.btnContinue.setEnabled(false);
        this.view.lblAmountWithFlag.text = this.view.keypad.formatAmount(this.keypadString);
      }
    } else {
      var keypadStringCommas = '';
      var beforeDecimal = this.keypadString.split('.')[0];
      var afterDecimal = this.keypadString.split('.')[1];
      if (beforeDecimal.length > 3) {
        var withoutCommas = (beforeDecimal.length) % 3;
        var temp = '';
        if (withoutCommas !== 0) {
          temp = beforeDecimal.substr(0, withoutCommas) + ',';
        }
        for (var i = withoutCommas; i < beforeDecimal.length; i += 3) {
          temp += beforeDecimal.substr(i, 3) + ',';
        }
        beforeDecimal = temp.substr(0, temp.length - 1);
      }
      keypadStringCommas = beforeDecimal + '.' + afterDecimal;
      if (moneyMovementPresentationController.transactionMode !== applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer")) {
        if (this.isToLoanAccount === true) {
          if (Number(this.keypadString) > (Number(this.totalOverdue) + Number(this.nextPaymentAmount))) {
            //raise error if amount entered is more that totalOverDue amount 
            this.view.tbxOtrErr.isVisible = true;
            this.view.tbxOtrErr.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Loans.CannotPayMore");
            this.view.btnContinue.setEnabled(false);
            this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
            this.view.flxMainContainer.bottom = "0%";
            this.view.flxKeypad.isVisible = false;
          }
          else if (Number(this.keypadString) > (Number(this.fromAccountBalance))) {
            //raise error if amount entered is more that from account balance 
            this.view.tbxOtrErr.isVisible = true;
            this.view.tbxOtrErr.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.loans.balanceNotSufficient")
            this.view.btnContinue.setEnabled(false);
            this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
            this.view.flxMainContainer.bottom = "0%";
            this.view.flxKeypad.isVisible = false;
          }
          else {
            this.view.tbxOtrErr.isVisible = false;
            this.view.lblDollarOtherAmount.skin = "sknLbl4a4a4aSSP42px";
            this.view.lblOtherAmount.skin = "sknLbl4a4a4aSSP42px";
            this.view.flxClearOtherAmount.setVisibility(true);
            this.view.btnContinue.skin = "sknBtn0095e4RoundedffffffSSP26px";
            this.view.btnContinue.setEnabled(true);
            this.view.lblOtherAmount.text = this.view.keypad.formatAmount(keypadStringCommas);
          }
        } else {
          this.view.lblAmount.skin = "sknLbl4a4a4aSSP42px";
          this.view.lblDollar.skin = "sknLbl4a4a4aSSP42px";
          this.view.btnContinue.skin = "sknBtn0095e4RoundedffffffSSP26px";
          this.view.btnContinue.setEnabled(true);
          this.view.flxClearAmount.setVisibility(true);
          this.view.lblAmount.text = this.view.keypad.formatAmount(keypadStringCommas);
        }
      }
      else {
        this.view.lblAmountWithFlag.skin = "sknLbl000000ssp66px";
        this.view.lblAmountWithFlag.text = this.view.keypad.formatAmount(keypadStringCommas);
        this.view.btnContinue.skin = "sknBtn0095e4RoundedffffffSSP26px";
        this.view.btnContinue.setEnabled(true);
      }
    }
  },
  setFromAccountData:function()
  {
    var moneyMovementPresentationController = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    var fromaccountdata= moneyMovementPresentationController.getTransferObjectById("from");
    var configurationManager = applicationManager.getConfigurationManager();
    var name="";
    if (fromaccountdata[0].nickName === null || fromaccountdata[0].nickName === undefined) {
      name = fromaccountdata[0].accountName;
    } else {
      name =fromaccountdata[0].nickName;
    }
    this.view.lblFromAccountValue.text=applicationManager.getPresentationUtility().formatText(name,10,fromaccountdata[0].accountID,4);
    this.view.lblFromBalanceValue.text=fromaccountdata[0].availableBalance;
    this.view.lblFromavailableBal.text=fromaccountdata[0].accountBalanceType + ":";
    this.view.flximgFromAccount.isVisible = false;
    this.view.imgFromAccountValue.isVisible = false;

    if(configurationManager.isCombinedUser === "true") {
      try {
        if(fromaccountdata[0]["isBusiness"] === 0) {
          this.view.flximgFromAccount.isVisible = true;
          this.view.imgFromAccountValue.isVisible = true;
          this.view.imgFromAccountValue.src = "personalaccount.png";
        } 
        else if(fromaccountdata[0]["isBusiness"] === 1) {
          this.view.flximgFromAccount.isVisible = true;
          this.view.imgFromAccountValue.isVisible = true;
          this.view.imgFromAccountValue.src = "businessaccount.png";
        }
      }
      catch(e) {
        kony.print("Exception in preshow" + JSON.stringify(e, null, 4));
      }
    }
  },
  setToAccountData:function(){
    var moneyMovementPresentationController = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    var toAccountData = moneyMovementPresentationController.getToAccountData();
    var navMan=applicationManager.getNavigationManager();
    var entryPoint=navMan.getEntryPoint("centralmoneymovement");
    this.view.flximgToAccount.isVisible = false;
    this.view.imgToAccountValue.isVisible = false;
    //if entry point = frmAccountDetails and is to loan acc, then disable edit for To Accounts    
    if(entryPoint==="frmAccountDetails" && toAccountData.toAccountType === "Loan"){
      this.setDisabledToAccount(toAccountData);
      this.view.flxToAccount.setVisibility(false);
      this.view.flxToAccountDisabled.setVisibility(true);
    }else{
      this.setEditableToAccount(toAccountData);
      this.view.flxToAccount.setVisibility(true);
      this.view.flxToAccountDisabled.setVisibility(false);
    }
    if(applicationManager.getConfigurationManager().isCombinedUser === "true") {
      try {
        if(toAccountData.isBusiness === 0 || toAccountData.isBusiness === "0" || toAccountData.isBusinessPayee === "0" || toAccountData.transactionType === "P2P") {
         this.view.flximgToAccount.isVisible = true;
    	 this.view.imgToAccountValue.isVisible = true;
         this.view.imgToAccountValue.src = "personalaccount.png";
        } 
        else if(toAccountData.isBusiness === 1 || toAccountData.isBusiness === "1" || toAccountData.isBusinessPayee === "1") {
          this.view.flximgToAccount.isVisible = true;
   		 this.view.imgToAccountValue.isVisible = true;
          this.view.imgToAccountValue.src = "businessaccount.png";
        }
      }
      catch(e) {
        kony.print("Exception in preshow" + JSON.stringify(e, null, 4));
      }
    }
    
  },
  setEditableToAccount:function(toAccountData){
    if(toAccountData.transactionType == "P2P"){
      this.view.lblToAccountValue.text = toAccountData.payPersonName;
      this.view.lblToBalanceValue.text = toAccountData.p2pContact;
      this.view.lblToAvailableBalance.setVisibility(false);
    }
    else if(toAccountData.transactionType == "InternalTransfer"){
      this.view.lblToAccountValue.text = toAccountData.toAccountName;
      this.view.lblToBalanceValue.text = toAccountData.availableBalance;
	  this.view.lblToAvailableBalance.text = toAccountData.accountBalanceType + ":";
      this.view.lblToAvailableBalance.setVisibility(true);
    }
    else{
      this.view.lblToAccountValue.text = toAccountData.toAccountName;
      this.view.lblToBalanceValue.text = toAccountData.bankName;
      this.view.lblToAvailableBalance.setVisibility(false);
    }
  },
  setDisabledToAccount:function(toAccountData){
    if(toAccountData.transactionType == "P2P"){
      this.view.lblToAccountValueDisabled.text = toAccountData.payPersonName;
      this.view.lblToBalanceValueDisabled.text = toAccountData.p2pContact;
      this.view.lblToAvailableBalanceDisabled.setVisibility(false);
    }
    else if(toAccountData.transactionType == "InternalTransfer"){
      this.view.lblToAccountValueDisabled.text = toAccountData.toAccountName;
      this.view.lblToBalanceValueDisabled.text = toAccountData.availableBalance;
	  this.view.lblToAvailableBalanceDisabled.text = toAccountData.accountBalanceType;
      this.view.lblToAvailableBalanceDisabled.setVisibility(true);
    }
    else{
      this.view.lblToAccountValueDisabled.text = toAccountData.toAccountName;
      this.view.lblToBalanceValueDisabled.text = toAccountData.bankName;
      this.view.lblToAvailableBalanceDisabled.setVisibility(false);
    }
  },
  validateToAccount:function(){
    var moneyMovementPresentationController = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    var fromaccountdata= moneyMovementPresentationController.getTransferObjectById("from");
    var toAccountData = moneyMovementPresentationController.getToAccountData();
    if(fromaccountdata[0].accountID == toAccountData.toAccountNumber){
      this.clearToAccountData();
    }
  },
  clearToAccountData:function(){
    this.view.lblToAccountValue.text = "";
    this.view.lblToBalanceValue.text = "";
    this.view.lblToAvailableBalance.text = "";
    this.view.lblToAvailableBalance.setVisibility(true);
  },
  continueOnClick : function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var moneyMovementPresentationController = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    var amount= this.keypadString;
    if(this.isToLoanAccount === true){
      if(this.isDueAmountClicked === true){
		//set due amount when DueAmount button is clicked 
        moneyMovementPresentationController.setAmount(this.dueAmount);
      }
      else{        
          //set user entered data for transfer to Loan Account
          moneyMovementPresentationController.setAmount(amount);          
      }    
    }
    else{
     // if (!moneyMovementPresentationController.haveLimitsBeenFetched)
      //  moneyMovementPresentationController.fetchLimits(amount);
    //  else
       // this.executeAfterFetchingLimits(amount)
        moneyMovementPresentationController.setAmount(amount);
     }
  },
  DueAmountOnClick : function(){
    this.view.flxDueAmount.isVisible = true;
    this.view.flxOtrAmount.isVisible = false;
    this.view.flxKeypad.isVisible = false;
    this.isDueAmountClicked = true;
    this.view.tbxOtrErr.isVisible = false;
    if(this.dueAmount === "0.00" || this.dueAmount === "0"){
		this.view.lblDueAmount.text = "0.00";
        this.view.tbxDueErr.isVisible = true;
        this.view.btnContinue.setEnabled(false);
        this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
    }  
    else{
      this.view.btnContinue.setEnabled(true);
      this.view.btnContinue.skin = "sknBtn0095e4RoundedffffffSSP26px";
    }
    this.view.btnDueAmount.skin = "sknBtn0095e4RoundedffffffSSP26px";
    this.view.btnOtherAmount.skin = "sknBtnBorderAlternate";
    this.view.flxMainContainer.bottom = "0%";
  },
  OtherAmountOnClick : function(){
    this.clearKeypad();
    this.view.flxDueAmount.isVisible = false;
    this.view.flxOtrAmount.isVisible = true;
    this.view.flxKeypad.isVisible = true;
    this.isDueAmountClicked = false;
    var otherAmount = this.keypadString;
    this.view.lblOtherAmount.text = otherAmount;
    this.view.btnDueAmount.skin = "sknBtnBorderAlternate";
    this.view.btnOtherAmount.skin = "sknBtn0095e4RoundedffffffSSP26px";
    this.view.lblOtrAmtTitle.text = kony.i18n.getLocalizedString("i18n.payments.amountDueDollar") + this.nextPaymentAmount + kony.i18n.getLocalizedString("i18n.payments.totalOverDueDollar") + this.totalOverdue + ")";
    this.view.flxMainContainer.bottom = "32%";
    this.view.tbxOtrErr.isVisible = false;
  
  },	
  executeAfterFetchingLimits : function(amount) {
    var moneyMovementPresentationController = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    var transObj= moneyMovementPresentationController.getTransObject();
    var formatUtil = applicationManager.getFormatUtilManager();
    var evalAmountLimits = moneyMovementPresentationController.evaluateMinMaxAmountLimits(amount);
    if(evalAmountLimits === "valid"){
      moneyMovementPresentationController.setAmount(amount)
    }
    else if(evalAmountLimits["max"]){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      this.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.entitlements.maxTransactionLimitExceeded")+" "+formatUtil.getCurrencySymbol(transObj.transactionCurrency)+Number(evalAmountLimits["max"]).toFixed(2));
    }
    else if(evalAmountLimits["min"]){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      this.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.entitlements.minTransactionLimitUnreached")+" "+formatUtil.getCurrencySymbol(transObj.transactionCurrency)+Number(evalAmountLimits["min"]).toFixed(2));
    }
  },
  bindGenericError: function (errorMsg) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scopeObj = this;
    applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
  },
  cancelOnClick:function(){
    var moneyMovementModule = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    moneyMovementModule.cancelCommon();
  },
  clearOtherAmountOnTouchEnd:function(){
    this.view.flxMainContainer.bottom = "32%";
	this.view.flxKeypad.isVisible = true;
    this.view.tbxOtrErr.isVisible = false;
    this.clearKeypad();
  },
  setInternationalCurrency: function(currency) {
    var moneyMovementPresentationController = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    if(currency){
      this.currencyValue = currency;
    }else{
      this.currencyValue = 'USD';
    }
    this.view.lblCurrency.text = this.currencyValue;
    this.view.imgFlag.src = moneyMovementPresentationController.getCurrencyFlag(this.currencyValue);  
  },

  selectCurrency: function () {
    var moneyMovementPresentationController = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    var navMan = applicationManager.getNavigationManager();
    if (moneyMovementPresentationController.stateNavigation) {
      moneyMovementPresentationController.initializeStateData(false, "");
      var formname = "frmMMTransferAmount";
      var index = navMan.getFormIndex(formname);
      var stackLength = navMan.stack.length;
      if (index === null)
        navMan.setFormIndex(formname, stackLength - 1);
      else {
        for (var i = stackLength - 1; i > index; i--) {
          navMan.removeFormIndex(navMan.stack[i]);
          navMan.stack.pop();
        }
      }
    }
    moneyMovementPresentationController.commonFunctionForNavigation("frmMMSelectCurrency");
  }
});
