define({
 
 
   init : function(){
     var scope = this;
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
       this.initActions();
      applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.navigateCustomBack);
    },
  
  navigateCustomBack: function() {
    var transactionManager = applicationManager.getTransactionManager();
    var navigationManager = applicationManager.getNavigationManager();
    var loansMod = applicationManager.getModulesPresentationController("LoanPayUIModule");
    transactionManager.clearTransferObject();
    loansMod.fetchPayOffAmountCounter = 0;
    navigationManager.goBack();
  },

  cancelOnClick: function() {
    var loansMod = applicationManager.getModulesPresentationController("LoanPayUIModule");
    loansMod.cancelCommon();
  },

   initActions:function(){
      var scope=this;
      var loansMod = applicationManager.getModulesPresentationController("LoanPayUIModule");
       this.view.customHeader.flxBack.onClick = this.navigateCustomBack;
       this.view.btnLoanContinue.onClick = function() {
        applicationManager.getPresentationUtility().showLoadingScreen();
        loansMod.getFromAccounts();
       };
     this.view.flxAccDetailContainerHL.onClick = function() {
       loansMod.commonFunctionForNavigation("frmLoansDate");
     }
     this.view.customHeader.btnRight.onClick = this.cancelOnClick;
   },
  

    preShow: function() {
        var self = this;
       var navManager=applicationManager.getNavigationManager();
      	if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      	  this.view.flxHeader.isVisible = true;
       //  this.view.flxFooter.isVisible = false;
    	}
    	else{
      	  this.view.flxHeader.isVisible = false;
      //   this.view.flxFooter.isVisible = true;
    	}
        var configManager = applicationManager.getConfigurationManager();
        var navManager = applicationManager.getNavigationManager();
        var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
     	this.setBalanceData();
        this.setupUIBasedOnServiceStatus();
        
       
       //if ( kony.sdk.isNullOrUndefined(accountsDetails.selectedAccountData.externalIndicator) === false && accountsDetails.selectedAccountData.externalIndicator==="true")
         //         this.view.flxOptions.isVisible = false;
       
      
        //this.view.customSearchbox.btnCancel.onClick = this.btnCancelOnClick;

      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().logFormName(currentForm);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
  
  postShow: function() {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
 
  setBalanceData: function () {
    var loansMod = applicationManager.getModulesPresentationController("LoanPayUIModule");
    var navMan = applicationManager.getNavigationManager();
    var forUtility = applicationManager.getFormatUtilManager();
    var accountsDetails = navMan.getCustomInfo("frmAccountDetails");
    var transactionManager = applicationManager.getTransactionManager();
    var accountsData = accountsDetails.selectedAccountData;
    this.view.title = kony.i18n.getLocalizedString("i18n.Accounts.ContextualActions.payoffLoan");

    if (accountsData.nickName == undefined || accountsData.nickName == null | accountsData.nickName == "")
      this.view.lblFromAccountValue.text = accountsData.accountName;
    else
      this.view.lblFromAccountValue.text = accountsData.nickName;

    var configManager = applicationManager.getConfigurationManager();

    if (accountsData.accountType === configManager.constants.LOAN || accountsData.accountType === configManager.constants.MORTGAGE) {
      //  this.view.lblAvailableBalance.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.outstandingBal");
      // this.view.lblCurrentBalance.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accounts.CurrentDue")+":";
      this.view.lblOrgnlLoanAmt.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.currBal")+":";
      this.view.lblPrincipalBal.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.loans.TotalPrincipal")+":";
      this.view.lblPrincipalAmt.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.loans.TotalInterest")+":";
      this.view.lblDue.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accounts.CurrentDue")+":";
      this.view.lblOutstandingBalVal.text = forUtility.formatAmountandAppendCurrencySymbol(accountsData.currentBalance, accountsData.currencyCode);
      transactionManager.setTransactionAttribute("currentBalance", accountsData.currentBalance);
      this.view.lblPrincipalBalVal.text = forUtility.formatAmountandAppendCurrencySymbol(accountsData.principalValue, accountsData.currencyCode);
      transactionManager.setTransactionAttribute("totalPrincipal", accountsData.principalValue);
      var dateobj = forUtility.getDateObjectfromString(accountsData.maturityDate, "YYYY-MM-DD");
      var loanEndDate = forUtility.getFormatedDateString(dateobj, forUtility.getApplicationDateFormat());
      this.view.lblLoanEndDate.text = loanEndDate;
      transactionManager.setTransactionAttribute("closingDate", loanEndDate);
      this.view.lblCurrentDue.text = forUtility.formatAmountandAppendCurrencySymbol(accountsData.currentAmountDue, accountsData.currencyCode);
      transactionManager.setTransactionAttribute("transactionCurrency", accountsData.currencyCode);
      transactionManager.setTransactionAttribute("frequencyType", "Once");
      transactionManager.setTransactionAttribute("interestRate", accountsData.interestRate);
    }
    var processedToAccountData = loansMod.processAccountsData([accountsData],"to");
    processedToAccountData = processedToAccountData.pop();
    loansMod.setToAccountsDataForLoans(processedToAccountData);
  }, 
    
  
    
    gotoAccountInfo: function(){
        var navManager = applicationManager.getNavigationManager();
        var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
        var accountModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
        if(String(accountsDetails.selectedAccountData.type).toLowerCase().trim() === "external") {
            accountModule.presentationController.fetchInfoForExternalBankAccount();
        } else {
            navManager.setCustomInfo("frmAccountInfo", accountsDetails);
            accountModule.presentationController.commonFunctionForNavigation("frmAccountInfo");
        }
    },


  showErrorPopup: function(err){
    applicationManager.getDataProcessorUtility().showToastMessageError(this,JSON.stringify(err));
  },
  
  setupUIBasedOnServiceStatus: function() {
    var transactionManager = applicationManager.getTransactionManager();
    var navigationManager = applicationManager.getNavigationManager();
    var forUtility = applicationManager.getFormatUtilManager();
    var transactionObject = transactionManager.getTransactionObject();
    if (!kony.sdk.isNullOrUndefined(transactionObject.payoffErrMsg)) {
      this.showErrorPopup(transactionObject.payoffErrMsg);
      transactionObject.payoffErrMsg = null;
      this.view.lblInterestRateValue.text = "N/A";
      this.view.lblInterestPaidValue.text = "N/A";
      this.view.lblInterest.text = "N/A";
      this.view.lblValue.text = transactionObject.scheduledDate;
      this.view.btnLoanContinue.skin = "sknBtnOnBoardingInactive";
      this.view.btnLoanContinue.setEnabled(false);
    }
    else {
      if (navigationManager.getCustomInfo("frmLoansFromAccount") === "failed") {
        var error = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.loans.balanceNotSufficient");
        this.showErrorPopup(error);
      }
      this.view.lblInterestRateValue.text = (!kony.sdk.isNullOrUndefined(transactionObject.payoffAmount)) ? forUtility.formatAmountandAppendCurrencySymbol(transactionObject.payoffAmount, transactionObject.transactionCurrency) : "N/A";
      this.view.lblInterestPaidValue.text = (!kony.sdk.isNullOrUndefined(transactionObject.payoffFee)) ? forUtility.formatAmountandAppendCurrencySymbol(transactionObject.payoffFee, transactionObject.transactionCurrency) : "N/A";
      this.view.lblInterest.text = (!kony.sdk.isNullOrUndefined(transactionObject.totalInterest)) ? forUtility.formatAmountandAppendCurrencySymbol(transactionObject.totalInterest, transactionObject.transactionCurrency) : "N/A";
      this.view.lblValue.text = transactionObject.scheduledDate;
      if (transactionObject.payoffAmount == 0 || transactionObject.payoffAmount == null || transactionObject.payoffAmount == undefined) {
        this.view.btnLoanContinue.skin = "sknBtnOnBoardingInactive";
        this.view.btnLoanContinue.setEnabled(false);
      }
      else {
        this.view.btnLoanContinue.skin = "sknBtn0095e4RoundedffffffSSP26px";
        this.view.btnLoanContinue.setEnabled(true);
      }
    }
  }
});