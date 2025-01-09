define({
  keypadString: '0',
  currencyValue:'EUR',
  isPeriodUsed : false,
  selectedTab: null,
  init: function () {
    var scope=this;
    var currentFormObject = kony.application.getCurrentForm();
    var currentForm=currentFormObject.id;
    applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.navigateCustomBack);
  },
  navigateCustomBack: function() {
    var transferModule = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    transferModule.commonFunctionForgoBack();
  },
  preShow: function () {
    this.isPeriodUsed = false;
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
    }
    var userPrefManager = applicationManager.getUserPreferencesManager();
    var transactionManager = applicationManager.getTransactionManager();
    this.singleCustomerID=userPrefManager.isSingleCustomerProfile;
    this.accessibleCustomerIds =userPrefManager.accessibleCustomerIds;
    this.primaryCustomerId =userPrefManager.primaryCustomerId;
    this.isIconVisible = false;
    this.setIconVisibility();

    //var configManager = applicationManager.getConfigurationManager();
    var formatUtil=applicationManager.getFormatUtilManager();
    var transferPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    var transObj= transferPresentationController.getTransObject();
    if (transferPresentationController.getEuropeFlowType() === "INTERNAL" || transferPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts") || transferPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers")){
      if(!kony.sdk.isNullOrUndefined(this.singleCustomerID) && this.singleCustomerID){
        this.view.imgPersonal.setVisibility(false);
        this.view.imgIcon.setVisibility(false);
      }
      else{
        if(!kony.sdk.isNullOrUndefined(this.isIconVisible) && this.isIconVisible){
          this.view.imgPersonal.setVisibility(true);
          var arr = this.getFromAndToAccountIcons(transObj);
          this.view.imgPersonal.src = arr[0];
         if(transObj.transactionType.toLowerCase().includes("internaltransfer")){
            this.view.imgIcon.src = arr[1];
            this.view.imgIcon.setVisibility(true);
          }
          else{
            this.view.imgIcon.setVisibility(false);
          }
        }
        else{
          this.view.imgPersonal.setVisibility(false);
          this.view.imgIcon.setVisibility(false);
        }
      }
      if (transferPresentationController.isLoansAccountType) {
        this.view.flxAmount.setVisibility(false);
        this.view.flxAmountWithFlag.setVisibility(false);
        this.view.flxExchangeRateMain.setVisibility(false);
        this.view.flxLoanAmount.setVisibility(true);
        if (transObj.amount) {
          this.selectedTab = "other";
          this.setupLoanUI(2);
          this.setAmount(transObj.amount);
        }
        else {
          var sendAmount;
          if (transObj.nextPaymentAmount === null || transObj.nextPaymentAmount === undefined)
               transObj.nextPaymentAmount = "0";

          if (transObj.paymentDue === undefined || transObj.paymentDue === null)
               transObj.paymentDue = "0";

          var totalPayment = "" + ((Number(transObj.nextPaymentAmount) + Number(transObj.paymentDue)).toFixed(2));
          
          if (totalPayment === "0" || totalPayment === "0.00")
            sendAmount = null;
          else
             sendAmount = totalPayment;
          this.setAmount(sendAmount);
          this.selectedTab = "due";
          this.setupLoanUI(1);
          if (totalPayment === "0" || totalPayment === "0.00") {
             this.triggerErrorScenario(kony.i18n.getLocalizedString("i18n.payments.noCurrentDues"));
          }      
        } 
        this.view.lblLoanDollar.text = formatUtil.getCurrencySymbol(transObj.transactionCurrency);
      } else if (transferPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts") || transferPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers") ) {
                 this.view.flxAmount.setVisibility(false);
                 this.view.flxLoanAmount.setVisibility(false);
                 this.view.flxAmountWithFlag.setVisibility(true);
                 this.view.flxExchangeRateMain.setVisibility(false);
                 this.view.flxKeypad.isVisible = true;
                 this.view.flxMainContainer.bottom = "32%";
                 this.setAmount(transObj.amount);
	}
       if (transferPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts") ) {
        this.view.flxAmount.setVisibility(true);
        this.view.flxLoanAmount.setVisibility(false);
        this.view.flxAmountWithFlag.setVisibility(false);
        this.view.flxExchangeRateMain.setVisibility(false);
        this.view.flxKeypad.isVisible = true;
        this.view.flxMainContainer.bottom = "32%";
        this.setAmount(transObj.amount);
      }  
    }else{
      this.view.flxAmount.setVisibility(false);
      this.view.flxLoanAmount.setVisibility(false);
      this.view.flxAmountWithFlag.setVisibility(true);
      this.view.flxExchangeRateMain.setVisibility(true);
      this.view.flxKeypad.isVisible = true;
      this.view.flxMainContainer.bottom = "32%";
      this.setAmount(transObj.amount);
    }
    //var navManager = applicationManager.getNavigationManager();
    //navManager.setEntryPoint("selectedcurrency", "frmEuropeTransferAmountController");
    this.setCurrency(transObj.transactionCurrency);
    this.setFromAccountData();
    this.setToAccountData();
    //this.validateToAccount();
    this.view.lblDollar.text = formatUtil.getCurrencySymbol(transObj.transactionCurrency);
    // if (transObj.fromAccountCurrency) {
    //     this.view.lblDollar.text = formatUtil.getCurrencySymbol(transObj.fromAccountCurrency);
   if (transferPresentationController.getEuropeFlowType() === "EXTERNAL" && transferPresentationController.transactionMode !== applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer") && transferPresentationController.transactionMode !== applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers")) {
           if(transObj.fromAccountCurrency !== 'EUR') {
		    var currencyVal = 'EUR';
            this.view.lblDollar.text = formatUtil.getCurrencySymbol(currencyVal);
            transactionManager.setTransactionAttribute("transactionCurrency", currencyVal);
        } else {
		    this.view.lblDollar.text = formatUtil.getCurrencySymbol(transObj.fromAccountCurrency);
            transactionManager.setTransactionAttribute("transactionCurrency", transObj.fromAccountCurrency);
			}
		}
      
    this.initActions();
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  
  setIconVisibility: function(){
    this.accessibleCustomerIds.forEach((item,index)=>{
        if(index!==0){
         if(this.accessibleCustomerIds[0].type!==item.type){
           this.isIconVisible=true;
         }
       }
      });
    },
  
  getFromAndToAccountIcons:function(transObj){
    var fromIcon = "businessaccount.png", toIcon = "businessaccount.png";
    for(var i =0;i<this.accessibleCustomerIds.length;i++){
      if(transObj.fromAccountMembershipId === this.accessibleCustomerIds[i].id){
        if(this.accessibleCustomerIds[i].type === "personal"){
          fromIcon = "personalaccount.png";
        }
      }
      if(transObj.toAccountMembershipId === this.accessibleCustomerIds[i].id){
        if(this.accessibleCustomerIds[i].type === "personal"){
          toIcon = "personalaccount.png";
        }
      }
    }
    return [fromIcon,toIcon];
  },

  initActions: function () {
    var scope=this;
    var formatUtil=applicationManager.getFormatUtilManager();
    var transferPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    var transObj= transferPresentationController.getTransObject();
    if (transObj.nextPaymentAmount === undefined || transObj.nextPaymentAmount === null)
        transObj.nextPaymentAmount = "0";
    if (transObj.paymentDue === undefined || transObj.paymentDue === null)
        transObj.paymentDue = "0";
    //var navMan = applicationManager.getNavigationManager();
    //var transferPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    this.view.btnDueAmount.onClick = function() {
      scope.selectedTab = "due";
      var sendAmount;
      var totalPayment = ""+((Number(transObj.nextPaymentAmount) + Number(transObj.paymentDue)).toFixed(2));
      if (totalPayment === "0" || totalPayment === "0.00")
        sendAmount = null;
      else
        sendAmount = totalPayment;
      scope.setAmount(sendAmount);
      scope.setupLoanUI(1);
      if (totalPayment === "0" || totalPayment === "0.00") {
        scope.triggerErrorScenario(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Loans.NoPendingDues"));
      }
     scope.view.lblLoanDollar.text = formatUtil.getCurrencySymbol(transObj.transactionCurrency);
    };
    this.view.btnOtherAmount.onClick = function() {
      scope.selectedTab = "other";
      scope.setAmount(transObj.amount);
      scope.setupLoanUI(2);
      scope.view.lblLoanDollar.text = formatUtil.getCurrencySymbol(transObj.transactionCurrency);
    };
    this.view.customHeader.flxBack.onTouchEnd = this.navigateCustomBack;
    this.view.customHeader.btnRight.onClick = scope.cancelOnClick;
    this.view.flxClearAmount.onTouchEnd = this.clearKeypad;
    this.view.flxLoanClearAmount.onTouchEnd = function() {
      scope.clearKeypad();
      scope.triggerPositiveScenario();
    };
    this.view.flxCurrency.onTouchEnd = this.selectCurrency;
    this.view.imgFlag.onTouchEnd = this.selectCurrency;
    this.view.flxFromAccount.onTouchEnd = function(){
      //transferPresentationController.haveLimitsBeenFetched = false;
      var navMan = applicationManager.getNavigationManager();
      navMan.setEntryPoint("europeTransferFlow", "frmEuropeTransferAmount");
      transferPresentationController.initializeStateData(true,"frmEuropeTransferAmount");
      transferPresentationController.commonFunctionForNavigation("frmEuropeTransferFromAccount");
    };
    this.view.flxToAccount.onTouchEnd = function(){
      //transferPresentationController.haveLimitsBeenFetched = false;
      transferPresentationController.initializeStateData(true,"frmEuropeTransferAmount");
      transferPresentationController.filterToAccountsByExludingFromAccount();
      if (transferPresentationController.getEuropeFlowType() === "INTERNAL"){
        transferPresentationController.commonFunctionForNavigation("frmEuropeTransferToAccount");
      }else{
        transferPresentationController.commonFunctionForNavigation("frmEuropeTransferToAccountSM");
      }
    };
    this.view.btnContinue.onClick = this.continueOnClick;
  },
  postShow:function(){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(this.keypadString === "0.00" || this.keypadString === "0,00" || this.keypadString === "0" || this.keypadString === ""){
    this.view.keypad.btnDecimalSeperator.setEnabled(false);
    this.view.btnContinue.setEnabled(false);
      }else{
        this.view.btnContinue.setEnabled(true);
      }
  },
  setCurrency : function(currency){
    var transferPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    var transObj = transferPresentationController.getTransObject();
    var navMan = applicationManager.getNavigationManager();
    var entryPoint = navMan.getEntryPoint("selectedcurrency");
    if (transferPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts") || transferPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers")) {
      if (entryPoint !== "frmEuropeSelectCurrency") {
        this.currencyValue = transObj.fromAccountCurrency;
      } else {
        this.currencyValue = transObj.selectedCurrency;   
      }
    } else {
      if (currency) {
        this.currencyValue = currency;
      } else {
        this.currencyValue = 'EUR';
      }
    }
    this.view.lblCurrency.text = this.currencyValue;
    this.view.imgFlag.src = transferPresentationController.getCurrencyFlag(this.currencyValue);
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
    else {
      this.keypadString ='';
    }  
    this.updateAmountValue();
  },
  setKeypadChar: function (char) {
    if (char === ',') {
      if (this.isPeriodUsed === false) {
        this.isPeriodUsed = true;
        char = '.';
      } else {
        return;
      }
    }
    if (this.keypadString.indexOf(".") !== -1 && this.keypadString.split('.')[1].length === 2) {
      return;
    }
    this.keypadString = this.keypadString + char;
    // var firstChar = this.keypadString[0];
    // this.keypadString = this.keypadString.split("");
    // for (var i = 1; i < this.keypadString.length; i++) {
    //   if (this.keypadString[i] === '.') {
    //     this.keypadString[i - 1] = this.keypadString[i + 1];
    //     i++;
    //   } else {
    //     this.keypadString[i - 1] = this.keypadString[i];
    //   }
    // }
    // this.keypadString = this.keypadString.join("");
    // this.keypadString = this.keypadString.substr(0, this.keypadString.length - 1);
    // if (firstChar !== '0') {
    //   this.keypadString = firstChar + this.keypadString;
    // }
    this.updateAmountValue();
  },
  clearKeypadChar: function () {
    if (this.keypadString === '' || this.keypadString === null) return;
	// this.keypadString = this.keypadString.split("");
  //   for (var i = this.keypadString.length - 2; i >= 0; i--) {
  //     if (this.keypadString[i] === '.') {
  //       this.keypadString[i + 1] = this.keypadString[i - 1];
  //       i--;
  //     } else {
  //       this.keypadString[i + 1] = this.keypadString[i];
  //     }
  //   }
  //   this.keypadString = this.keypadString.join("");
  //   this.keypadString = this.keypadString.substr(1);
  //   if (this.keypadString[0] === '.') {
  //     this.keypadString = '0' + this.keypadString;
  //   }
    if (this.keypadString.charAt(this.keypadString.length - 1) === '.') {
      this.isPeriodUsed = false;
    }
    this.keypadString = this.keypadString.substring(0, this.keypadString.length - 1);
    this.updateAmountValue();
  },
  clearKeypad: function(){
    this.keypadString ='';
    this.isPeriodUsed = false;
    this.updateAmountValue();
  },
  updateAmountValue: function () {
    var transferPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    if(this.keypadString === '' || this.keypadString === null) {
      this.view.keypad.btnDecimalSeperator.setEnabled(false);
      this.view.flxClearAmount.setVisibility(false);
      if (transferPresentationController.getEuropeFlowType() === "INTERNAL" || transferPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts") || transferPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers")){
        if (transferPresentationController.isLoansAccountType === true) {
          this.view.lblLoanAmount.skin = "sknLblA0A0A0SSP42px";
          this.view.lblLoanDollar.skin = "sknLbl4a4a4aSSP42px";
          this.view.lblLoanAmount.text = "0,00";
          this.view.lblLoanExtension.text = "";
        } else if (transferPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts"))
          {
          this.view.lblAmount.skin = "sknLblA0A0A0SSP42px";
          this.view.lblDollar.skin = "sknLbl4a4a4aSSP42px";
          this.view.lblAmount.text = "0,00";
          this.view.lblExtension.text = "";
          } else {
          this.view.lblAmountWithFlag.skin = "sknLblA0A0A0ssp66px";
          this.view.lblAmountWithFlag.text = "0,00";
          this.view.lblExtensionWithFlag.text = "";
        }  
      }else{
        this.view.lblAmountWithFlag.skin = "sknLblA0A0A0ssp66px";
        this.view.lblAmountWithFlag.text = "0,00";
        this.view.lblExtensionWithFlag.text = "";
      }
      this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
      this.view.lblYouSent.text = "";
      this.view.flxYouSent.setVisibility(false);
    } else {
       var keypadStringCommas = '';
       if (this.keypadString.indexOf(".") !== -1) {
       	var beforeDecimal = this.keypadString.split('.')[0];
       	var afterDecimal = this.keypadString.split('.')[1];
       }
      else {
        var beforeDecimal = this.keypadString;
        var afterDecimal = null;
      }
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
      if (afterDecimal !== null) {
      	keypadStringCommas = beforeDecimal + '.' + afterDecimal;
      }
      else {
        keypadStringCommas = beforeDecimal;
      }
      this.view.keypad.btnDecimalSeperator.setEnabled(true);
      if (transferPresentationController.getEuropeFlowType() === "INTERNAL" || transferPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts") || transferPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers")){
        if (transferPresentationController.isLoansAccountType === true) {
          this.view.lblLoanAmount.skin = "sknLbl4a4a4aSSP42px";
          this.view.lblLoanDollar.skin = "sknLbl4a4a4aSSP42px";
          this.view.lblLoanAmount.text = this.formatAmount(keypadStringCommas);
          this.view.lblLoanExtension.text = this.getDecimalExtension(keypadStringCommas);
        } else if (transferPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts")) {
          this.view.lblAmount.skin = "sknLbl4a4a4aSSP42px";
          this.view.lblDollar.skin = "sknLbl4a4a4aSSP42px";
          this.view.flxClearAmount.setVisibility(true);
          this.view.lblAmount.text = this.formatAmount(keypadStringCommas);
          this.view.lblExtension.text = this.getDecimalExtension(keypadStringCommas);
       } else {
        this.view.lblAmountWithFlag.skin = "sknLbl000000ssp66px";
        this.view.lblAmountWithFlag.text = this.formatAmount(keypadStringCommas);
        this.view.lblExtensionWithFlag.text = this.getDecimalExtension(keypadStringCommas);
        }  
      } else {
        this.view.lblAmountWithFlag.skin = "sknLbl000000ssp66px";
        this.view.lblAmountWithFlag.text = this.formatAmount(keypadStringCommas);
        this.view.lblExtensionWithFlag.text = this.getDecimalExtension(keypadStringCommas);
      }
      if (Number(this.keypadString) !== 0) {
      	this.view.btnContinue.skin = "sknBtn0095e4RoundedffffffSSP26px";
      	this.view.btnContinue.setEnabled(true);
        if (this.view.flxExchangeRate.isVisible === true) {
          this.view.lblYouSent.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.YouSent") + this.view.lblAmountWithFlag.text;
          this.view.flxYouSent.setVisibility(true); 
        }
      }
      else {
        this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
        this.view.lblYouSent.text = "";
        this.view.flxYouSent.setVisibility(false);
      }
    }
  },
  setFromAccountData:function()
  {
    var transferPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    var fromaccountdata= transferPresentationController.getTransferObjectById("from");
    if(fromaccountdata === null || fromaccountdata === undefined || fromaccountdata === ""){
    var navManager = applicationManager.getNavigationManager();
    var entryPoint = navManager.getEntryPoint("makeatransferfromacc");
    if (entryPoint === "frmEuropeTransferAmount")
    fromaccountdata = navMan.getCustomInfo("frmEuropeTransferAmount");
    }
    var name="";
    //if (fromaccountdata[0].nickName === null || fromaccountdata[0].nickName === undefined) {
      name = fromaccountdata[0].accountName;
    /*} else {
      name =fromaccountdata[0].nickName;
    }*/
    this.view.lblFromAccountValue.text=applicationManager.getPresentationUtility().formatText(name,10,fromaccountdata[0].accountID,4);
    this.view.lblFromBalanceValue.text=fromaccountdata[0].availableBalance;
    this.view.lblFromavailableBal.text=fromaccountdata[0].accountBalanceType + ":";
  },
  setToAccountData:function(){
    var transferPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    var toAccountData = transferPresentationController.getToAccountData();
    if (Object.keys(toAccountData).length === 0 && Object.keys(transferPresentationController.selectedToAccountData).length !== 0){
      toAccountData = transferPresentationController.selectedToAccountData;
    }
    var navMan=applicationManager.getNavigationManager();
    var entryPoint=navMan.getEntryPoint("europeTransferFlow");
    if(entryPoint==="frmAccountDetails" && toAccountData.toAccountType === "Loan") {
      this.setDisabledToAccount(toAccountData);
      this.view.flxToAccount.setVisibility(false);
      this.view.flxToAccountDisabled.setVisibility(true);
    }
    else {
      this.setEditableToAccount(toAccountData);
      this.view.flxToAccount.setVisibility(true);
      this.view.flxToAccountDisabled.setVisibility(false);
    }  
  },
  setEditableToAccount:function(toAccountData){
    if(toAccountData.transactionType === "P2P"){
      this.view.lblToAccountValue.text = toAccountData.payPersonName;
      this.view.lblToBalanceValue.text = toAccountData.p2pContact;
      this.view.lblToAvailableBalance.setVisibility(false);
    }
    else if(toAccountData.transactionType === "InternalTransfer"){
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
    if(toAccountData.transactionType === "P2P"){
      this.view.lblToAccountValueDisabled.text = toAccountData.payPersonName;
      this.view.lblToBalanceValueDisabled.text = toAccountData.p2pContact;
      this.view.lblToAvailableBalanceDisabled.setVisibility(false);
    }
    else if(toAccountData.transactionType === "InternalTransfer"){
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
    var transferPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    var fromaccountdata= transferPresentationController.getTransferObjectById("from");
    var toAccountData = transferPresentationController.getToAccountData();
    if(fromaccountdata[0].accountID === toAccountData.toAccountNumber){
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
    var transferPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    var transObj= transferPresentationController.getTransObject();
    var amount= this.keypadString;
    if (amount.charAt(amount.length - 1) === ".") {
      amount = amount.substring(0, amount.length - 1);
    }
    if (transferPresentationController.isLoansAccountType) {
      if (Number(amount) > ((Number(transObj.nextPaymentAmount) + Number(transObj.paymentDue)).toFixed(2))){
        this.triggerErrorScenario(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Loans.CannotPayMore"));
      }
      else if (Number(amount) > Number(transObj.fromAccountBalance)) {
        this.triggerErrorScenario(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.loans.balanceNotSufficient"));
      }
      else {
        transferPresentationController.setAmount(amount);
      }   
    }
    else {
      applicationManager.getPresentationUtility().showLoadingScreen();	
      //transferPresentationController.fetchLimits(amount);
      transferPresentationController.setAmount(amount);
    }  
  },

  executeAfterFetchingLimits : function(amount) {
    var transferPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    var transObj= transferPresentationController.getTransObject();
    var formatUtil = applicationManager.getFormatUtilManager();
    var evalAmountLimits = transferPresentationController.evaluateMinMaxAmountLimits(amount);
    if(evalAmountLimits === "valid"){
      transferPresentationController.setAmount(amount);
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
    var transferModule = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    transferModule.cancelCommon();
  },
  selectCurrency: function(){
    var transMod = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    var navMan = applicationManager.getNavigationManager();
    if(transMod.stateNavigation){
      transMod.initializeStateData(false, "");
      var formname = "frmEuropeTransferAmount";
      var index = navMan.getFormIndex(formname);
      var stackLength = navMan.stack.length;
      if(index === null)
        navMan.setFormIndex(formname,stackLength-1);
      else{
        for(var i = stackLength - 1; i > index; i--){
          navMan.removeFormIndex(navMan.stack[i]);
          navMan.stack.pop();
        }
      }
    }
    //transMod.commonFunctionForNavigation("frmEuropeSelectCurrency");
  new kony.mvc.Navigation({"appName" : "TransfersMA", "friendlyName" : "frmEuropeSelectCurrency"}).navigate();
  },

  formatAmount: function(keypadStringCommas) {
    if (keypadStringCommas.indexOf(".") === -1) {
      return keypadStringCommas.replace(/,/g, '.');
    }
    var seperator, decimalPoint, amount;
    var tillPoint = keypadStringCommas.split('.')[0];
    var afterPoint = keypadStringCommas.split('.')[1];
    seperator = ',';
    decimalPoint = '.';
    amount = tillPoint.replace(/,/g, decimalPoint) + seperator + afterPoint;
    return amount;
  },
  
  getDecimalExtension: function(keypadStringCommas) {
    if (keypadStringCommas.indexOf('.') !== -1){
      if (keypadStringCommas.charAt(keypadStringCommas.length - 1) === '.') {
        return "00";
      }
      else if (keypadStringCommas.charAt(keypadStringCommas.length - 2) === '.') {
        return "0";
      }
      else {
        return "";
      }
    } else {
      return ",00"; 
    }
  },

  setupLoanUI: function(option) {
    var transferPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    var transObj= transferPresentationController.getTransObject();
    switch (option) {
      case 1:
        this.view.lblLoanAmountTitle.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.dueAmt");
        this.view.btnDueAmount.skin = "sknBtn0095e4RoundedffffffSSP26px";
        this.view.btnOtherAmount.skin = "sknBtnBorderAlternate";
        this.view.flxLoanClearAmount.isVisible = false;
        this.view.flxKeypad.isVisible = false;
        this.view.flxMainContainer.bottom = "15dp";
        this.view.lblError.isVisible = false;
        break;
      case 2:
        if (transObj.paymentDue == null || transObj.paymentDue == undefined)
            transObj.paymentDue = "0";
        this.view.lblLoanAmountTitle.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.Amount") + "(" + applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Loans.Due")+":" + transferPresentationController.formatAmountAndAppendCurrencyEurope(transObj.nextPaymentAmount, transObj.transactionCurrency) + ", " + applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Loans.TotalOverdue")+" "+ transferPresentationController.formatAmountAndAppendCurrencyEurope(transObj.paymentDue, transObj.transactionCurrency) + ")";
        this.view.btnDueAmount.skin = "sknBtnBorderAlternate";
        this.view.btnOtherAmount.skin = "sknBtn0095e4RoundedffffffSSP26px";
        this.view.flxLoanClearAmount.isVisible = true;
        this.view.flxKeypad.isVisible = true;
        this.view.flxMainContainer.bottom = "32%";
        this.view.lblError.isVisible = false;
        break;
    }
  },

  triggerErrorScenario: function(error) {
    this.view.lblError.isVisible = true;
    this.view.lblError.text = error;
    this.view.flxKeypad.isVisible = false;
    this.view.flxMainContainer.bottom = "15dp";
    this.view.btnContinue.setEnabled(false);
    this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
    if (this.selectedTab === "due") {
      this.view.flxLoanClearAmount.isVisible = false;
    }
    else {
      this.view.flxLoanClearAmount.isVisible = true;
    }
  },

  triggerPositiveScenario: function() {
    this.view.lblError.isVisible = false;
    this.view.flxKeypad.isVisible = true;
    this.view.flxMainContainer.bottom = "32%";
  }
});
