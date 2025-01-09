define("ArrangementsMA/AccountServicesUIModule/userfrmPrintAccountClosureAcknowledgeController", ['CommonUtilities', 'OLBConstants'], function(CommonUtilities, OLBConstants) {
  return {
    accountList: {},
    payLoad: {},
    account: {},
    preShow: function() {
      var navMan = applicationManager.getNavigationManager();
      var scopeObj = this;
      this.accountList = navMan.getCustomInfo("frmPrintAccountClosureAcknowledge");
      this.payLoad = navMan.getCustomInfo("frmPrintAccountClosureAcknowledge");
      this.account = navMan.getCustomInfo("frmPrintAccountClosureAcknowledge");
      this.setUpFormData();
    },
    setUpFormData: function() {
      var navMan = applicationManager.getNavigationManager();
      account =navMan.getCustomInfo("frmConfirmClosure");
      this.view.lblMyCheckingAccount.text = account.accountName + " ... " + account.account_id.slice(-4);
      this.view.lblKonyBank.text = account.accountName + " ... " + account.account_id.slice(-4);
      this.view.lblReferenceValue.text = account.arrangementId;
      this.view.lblValAccountName.text  = account.accountName;
      this.view.lblValAccountNumber.text = "**" + account.account_id.slice(-4);
      this.view.lblValAccountType.text = account.accountType;
//       this.view.lblValSwiftCode.text = scopeObj.payLoad.requestDetails[2].newValue;
      this.view.lblValCurrentBalance.text = account.currentBalance;
      this.view.lblValIBAN.text = account.IBAN;
    },
    postShow: function() {
      //this.printCall();
      scope = this;
      setTimeout(function() {
        scope.printCall();
      }, "17ms");
      applicationManager.getNavigationManager().applyUpdates(this);
    },
    printCall: function() {
      var scope = this;
      //kony.os.print();
      kony.os.print();
      //timeout is required to allow print popup to be visible.
      setTimeout(function() {
        scope.loadAccountsDetails();
      }, "17ms");
    },
    /**
         * loadAccountsDetails : Method to accounts details
         * @member of {frmPrintTransactionController}
         * @param {}
         * @return {}
         * @throws {}
         */
    loadAccountsDetails: function() {
      var navMan = applicationManager.getNavigationManager();
      navMan.navigateTo({
        "appName": "ArrangementsMA",
        "friendlyName": "AccountServicesUIModule/frmAcClosureAcknowledge"
    });
    kony.application.dismissLoadingScreen();
    }
  }
});