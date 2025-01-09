define(["CommonsMA/AsyncManager/BusinessControllers/BusinessController"], function(AsyncManager) {
  /**
     * User defined presentation controller
     * @constructor
     * @extends kony.mvc.Presentation.BasePresenter
     */
  function MoneyMovement_PresentationController() {
    scope_MoneyMovementPresentationController = this;
    scope_MoneyMovementPresentationController.asyncResponseData = {};
    scope_MoneyMovementPresentationController.toSupportedOwnAccounts = [];
    scope_MoneyMovementPresentationController.filteredToAccounts = [];
    scope_MoneyMovementPresentationController.toAccountList = {};
    scope_MoneyMovementPresentationController.transactionMode = "";
    //stateNavigation - holds the value as true if it is on state management form like amount or review screen and for rest of screens hold false value
    scope_MoneyMovementPresentationController.stateNavigation = "";
    //stateTriggeredForm - holds the value as mame of form where state management has triggered.
    scope_MoneyMovementPresentationController.stateTriggeredForm = "";
    scope_MoneyMovementPresentationController.mfaFlowType="";
    scope_MoneyMovementPresentationController.haveLimitsBeenFetched = false;
    scope_MoneyMovementPresentationController.previousAccountType = "";
    scope_MoneyMovementPresentationController.currentAccountType = "";
    scope_MoneyMovementPresentationController.isLoansAccountType = false;
    kony.mvc.Presentation.BasePresenter.call(this);
    this.asyncManager = new AsyncManager();
  }
  inheritsFrom(MoneyMovement_PresentationController, kony.mvc.Presentation.BasePresenter);
  /**
     * Overridden Method of kony.mvc.Presentation.BasePresenter
     * This method gets called when presentation controller gets initialized
     * @method
     */
  MoneyMovement_PresentationController.prototype.initializePresentationController = function() {};
  /**
     * This method is a getter method to access transfer to supported accounts excluding from account selection.
     */
  MoneyMovement_PresentationController.prototype.getFilteredToAccounts = function() {
    return this.filteredToAccounts;
  };
    /**
   * This method is for initiating from and to accounts fetch calls
   * getFromAccountsCallback {callBack Function} - used for from accounts call when initiating same getFromAndToAccounts method from different entry points
   */
  MoneyMovement_PresentationController.prototype.getFromAndToAccounts = function(getFromAccountsCallback) {
	applicationManager.getPresentationUtility().showLoadingScreen();
    //holds the information about the status of the service call that has been initiated
    scope_MoneyMovementPresentationController.asyncResponseData.serviceCallsStatus={};
    var recMan = applicationManager.getRecipientsManager();
    var payeeManager = applicationManager.getRecipientsManager();
    if(getFromAccountsCallback){
      scope_MoneyMovementPresentationController.getFromAccounts(getFromAccountsCallback);
    }
    else{
      scope_MoneyMovementPresentationController.getFromAccounts(scope_MoneyMovementPresentationController.fromAccountsPresentationSuccessCallBack);
    }
    if (scope_MoneyMovementPresentationController.getEntitlementValue("isOtherKonyAccountsTransfer") == "true") {
      //Setting status to 0 initially and after receiving completion callback we are changing it to 1 and hence areAllServicesDone method recognises service call is completed
      scope_MoneyMovementPresentationController.asyncResponseData.serviceCallsStatus.SameBankTransferStatus = 0;
      recMan.fetchAllInternalBenificiaries(scope_MoneyMovementPresentationController.fetchAllInternalBenificiariesPresentationSuccessCallBack, scope_MoneyMovementPresentationController.fetchAllInternalBenificiariesPresentationErrorCallBack);
    }
    if (scope_MoneyMovementPresentationController.getEntitlementValue("isOtherBankAccountsTransfer") == "true") {
      //Setting status to 0 initially and after receiving completion callback we are changing it to 1 and hence areAllServicesDone method recognises service call is completed
      scope_MoneyMovementPresentationController.asyncResponseData.serviceCallsStatus.OtherBankTransferStatus = 0;
      recMan.fetchAllExternalBenificiaries(scope_MoneyMovementPresentationController.fetchAllExternalBenificiariesPresentationSuccessCallBack, scope_MoneyMovementPresentationController.fetchAllExternalBenificiariesPresentationErrorCallBack);
    }
    if (scope_MoneyMovementPresentationController.getEntitlementValue("isInternationalAccountsTransfer") == "true") {
      //Setting status to 0 initially and after receiving completion callback we are changing it to 1 and hence areAllServicesDone method recognises service call is completed
      scope_MoneyMovementPresentationController.asyncResponseData.serviceCallsStatus.InternationalTransferStatus = 0;
      recMan.fetchInternationalRecepients(scope_MoneyMovementPresentationController.fetchInternationalRecepientsPresentationSuccessCallBack, scope_MoneyMovementPresentationController.fetchInternationalRecepientsPresentationErrorCallBack);
    }
    if (scope_MoneyMovementPresentationController.getEntitlementValue("ispayAPersonEnabled") == "true") {
      //Setting status to 0 initially and after receiving completion callback we are changing it to 1 and hence areAllServicesDone method recognises service call is completed
      scope_MoneyMovementPresentationController.asyncResponseData.serviceCallsStatus.P2PStatus = 0;
      payeeManager.getP2PRecipientList({}, scope_MoneyMovementPresentationController.allPayeeSuccess, scope_MoneyMovementPresentationController.allPayeeError);
    }
  };
  /** This method checks for completion status of all to accounts calls that have been initiated
   */
  MoneyMovement_PresentationController.prototype.areAllServicesDone = function() {
    for(var key in scope_MoneyMovementPresentationController.asyncResponseData["serviceCallsStatus"]){
      if(scope_MoneyMovementPresentationController.asyncResponseData["serviceCallsStatus"][key]===0){
        return false;
      }
    }
    return true;
  };
   /** This method is invoked after successful retrieval of payees
    *  response - {object} payees response from the backend
   */
  MoneyMovement_PresentationController.prototype.allPayeeSuccess = function(response) {
    scope_MoneyMovementPresentationController.asyncResponseData.serviceCallsStatus.P2PStatus = 1;
    scope_MoneyMovementPresentationController.asyncResponseData.P2PData = response;
    if (scope_MoneyMovementPresentationController.areAllServicesDone()) {
      scope_MoneyMovementPresentationController.navigateToShowToList();
    }
  };
  /** This method is invoked if any error is triggered while retrieving list of payees
    *  errorResponse - {object} error response from the backend
   */
  MoneyMovement_PresentationController.prototype.allPayeeError = function(errorResponse) {
     applicationManager.getPresentationUtility().dismissLoadingScreen();
     scope_MoneyMovementPresentationController.asyncResponseData.serviceCallsStatus.P2PStatus = 1;
     scope_MoneyMovementPresentationController.asyncResponseData.P2PData = 0;
     if (scope_MoneyMovementPresentationController.areAllServicesDone()) {
        scope_MoneyMovementPresentationController.navigateToShowToList();
     }
  };
  /** This method is invoked after successful retrieval of internal benificiaries
    *  response - {object} internal benificiaries response from the backend
   */
  MoneyMovement_PresentationController.prototype.fetchAllInternalBenificiariesPresentationSuccessCallBack = function(response) {
    scope_MoneyMovementPresentationController.asyncResponseData.serviceCallsStatus.SameBankTransferStatus = 1;
    scope_MoneyMovementPresentationController.asyncResponseData.InternalBenificiariesData = response;
    if (scope_MoneyMovementPresentationController.areAllServicesDone()) {
      scope_MoneyMovementPresentationController.navigateToShowToList();
    }
  };
  /** This method is invoked if any error is triggered while retrieving list of internal benificiaries
    *  errorResponse - {object} error response from the backend
   */
  MoneyMovement_PresentationController.prototype.fetchAllInternalBenificiariesPresentationErrorCallBack = function(errorResponse) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (errorResponse["isServerUnreachable"]) applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errorResponse);
    else {
      scope_MoneyMovementPresentationController.asyncResponseData.serviceCallsStatus.SameBankTransferStatus = 1;
      scope_MoneyMovementPresentationController.asyncResponseData.InternalBenificiariesData = 0;
      if (scope_MoneyMovementPresentationController.areAllServicesDone()) {
        scope_MoneyMovementPresentationController.navigateToShowToList();
      }
    }
  };
  /** This method is invoked after successful retrieval of external benificiaries
   *  response - {object} external benificiaries response from the backend
   */
  MoneyMovement_PresentationController.prototype.fetchAllExternalBenificiariesPresentationSuccessCallBack = function(response) {
    scope_MoneyMovementPresentationController.asyncResponseData.serviceCallsStatus.OtherBankTransferStatus = 1;
    scope_MoneyMovementPresentationController.asyncResponseData.OtherBankBenificiariesData = response;
    if (scope_MoneyMovementPresentationController.areAllServicesDone()) {
      scope_MoneyMovementPresentationController.navigateToShowToList();
    }
  };
  /** This method is invoked if any error is triggered while retrieving list of external benificiaries
    *  errorResponse - {object} error response from the backend
   */
  MoneyMovement_PresentationController.prototype.fetchAllExternalBenificiariesPresentationErrorCallBack = function(errorResponse) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (errorResponse["isServerUnreachable"]) applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errorResponse);
    else {
      scope_MoneyMovementPresentationController.asyncResponseData.serviceCallsStatus.OtherBankTransferStatus = 1;
      scope_MoneyMovementPresentationController.asyncResponseData.OtherBankBenificiariesData = 0;
      if (scope_MoneyMovementPresentationController.areAllServicesDone()) {
        scope_MoneyMovementPresentationController.navigateToShowToList();
      }
    }
  };
  /** This method is invoked after successful retrieval of international benificiaries
   *  response - {object} international benificiaries response from the backend
   */
  MoneyMovement_PresentationController.prototype.fetchInternationalRecepientsPresentationSuccessCallBack = function(response) {
    scope_MoneyMovementPresentationController.asyncResponseData.serviceCallsStatus.InternationalTransferStatus = 1;
    scope_MoneyMovementPresentationController.asyncResponseData.InternationalBenificiariesData = response;
    if (scope_MoneyMovementPresentationController.areAllServicesDone()) {
      scope_MoneyMovementPresentationController.navigateToShowToList();
    }
  };
  /** This method is invoked if any error is triggered while retrieving list of international benificiaries
   *  errorResponse - {object} error response from the backend
   */
  MoneyMovement_PresentationController.prototype.fetchInternationalRecepientsPresentationErrorCallBack = function(errorResponse) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (errorResponse["isServerUnreachable"]) applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errorResponse);
    else {
      scope_MoneyMovementPresentationController.asyncResponseData.serviceCallsStatus.InternationalTransferStatus = 1;
      scope_MoneyMovementPresentationController.asyncResponseData.InternationalBenificiariesData = 0;
      if (scope_MoneyMovementPresentationController.areAllServicesDone()) {
        scope_MoneyMovementPresentationController.navigateToShowToList();
      }
    }
  };
  /**
   * This method is invoked when all the services that have been initiated have returned the response
   */
  MoneyMovement_PresentationController.prototype.navigateToShowToList = function() {
    scope_MoneyMovementPresentationController.toAccountList.internalBenificiaries = scope_MoneyMovementPresentationController.asyncResponseData.InternalBenificiariesData.ExternalAccounts;
    scope_MoneyMovementPresentationController.toAccountList.externalBenificiaries = scope_MoneyMovementPresentationController.asyncResponseData.OtherBankBenificiariesData.ExternalAccounts;
    scope_MoneyMovementPresentationController.toAccountList.internationalBenificiaries = scope_MoneyMovementPresentationController.asyncResponseData.InternationalBenificiariesData.ExternalAccounts;
    scope_MoneyMovementPresentationController.toAccountList.payeesList = scope_MoneyMovementPresentationController.asyncResponseData.P2PData;
    /*var controller = applicationManager.getPresentationUtility().getController({"appName":"TransfersMA","friendlyName":"MoneyMovementUIModule/frmMMTransferToAccount"}, true);
    if(scope_MoneyMovementPresentationController.toAccountList.internalBenificiaries.length === 0 && scope_MoneyMovementPresentationController.toAccountList.externalBenificiaries.length === 0 && scope_MoneyMovementPresentationController.toAccountList.internationalBenificiaries.length === 0 && (scope_MoneyMovementPresentationController.toAccountList.payeesList?scope_MoneyMovementPresentationController.toAccountList.payeesList.length === 0 :""))
     controller.bindDataAfterTransition(1);
    else
     controller.bindDataAfterTransition(0); */
  };
  /**
   * This method is used to fetch the from accounts.
   * successCallBack {callBack Function} - This method can be used by multiple entry points into money movement flow wherein few scenarios need from accounts fetch instead of navigating to from screen
   */
  MoneyMovement_PresentationController.prototype.getFromAccounts = function(successCallBack) {
    var accountManager = applicationManager.getAccountManager();
    accountManager.fetchInternalAccounts(successCallBack, scope_MoneyMovementPresentationController.fromAccountsPresentationErrorCallBack);
  };
  /**
   * This method is used to return the to supported transfer accounts
   */
  MoneyMovement_PresentationController.prototype.getToAccounts = function() {
    return scope_MoneyMovementPresentationController.toAccountList;
  };
  /**
   * This method is used to set the to accounts list from manage flow
   * parm {accList} - array of accounts with newly added account
   */
  MoneyMovement_PresentationController.prototype.setToAccountsList=function(accList){
    scope_MoneyMovementPresentationController.toAccountList=accList;
  };
  /**
   * This method is used to store the from and to transfer supported accounts and navigate to from screen
   * res - {object} backend accounts response
   */
  MoneyMovement_PresentationController.prototype.fromAccountsPresentationSuccessCallBack = function(res) {
    scope_MoneyMovementPresentationController.setFromAndToAccounts(res);
    scope_MoneyMovementPresentationController.commonFunctionForNavigation({"appName":"TransfersMA","friendlyName":"MoneyMovementUIModule/frmMMTransferFromAccount"});
  };
 MoneyMovement_PresentationController.prototype.navigateToToAccount = function(res)
       {
         var accountManager = applicationManager.getAccountManager();
       var toSupportedAccounts = accountManager.getToTransferSupportedAccounts();
       scope_MoneyMovementPresentationController.toSupportedOwnAccounts = toSupportedAccounts;
       scope_MoneyMovementPresentationController.filterToAccountsByExludingFromAccount();
       scope_MoneyMovementPresentationController.commonFunctionForNavigation({"appName":"TransfersMA","friendlyName":"MoneyMovementUIModule/frmMMTransferToAccount"});
       };
  /**
   * This method is used to store the from and to transfer supported accounts retrieved from backend
   * res - {object} backend accounts response
   */
  MoneyMovement_PresentationController.prototype.setFromAndToAccounts = function(res) {
   // var accountManager = applicationManager.getAccountManager();
    let filteredAccountsData =res.filter(filteredAccountData => filteredAccountData.accountStatus === "ACTIVE" || filteredAccountData.accountStatus === "CLOSURE_PENDING");
    //var fromSupportedAccounts = accountManager.getFromTransferSupportedAccounts();
    //var toSupportedAccounts = accountManager.getToTransferSupportedAccounts();
    scope_MoneyMovementPresentationController.toSupportedOwnAccounts = filteredAccountsData;
    var navMan = applicationManager.getNavigationManager();
    navMan.setCustomInfo("frmMMTransferFromAccount", {
      "fromaccounts": filteredAccountsData
    });
  };
  /**
   * This method is used to handle the error scenario when from accounts fetch call is failing.
   */
  MoneyMovement_PresentationController.prototype.fromAccountsPresentationErrorCallBack = function(error) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (error["isServerUnreachable"]){
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
    }
    else{
      kony.print("error in showFromAccountsPresentationErrorCallBack");
    }
  };
  /**
    * This method is used to filter the from selection from the transfer to supported accounts.
    */
  MoneyMovement_PresentationController.prototype.filterToAccountsByExludingFromAccount = function() {
    var transactionManager = applicationManager.getTransactionManager();
    this.filteredToAccounts = [];
    var toSupportedAccounts = scope_MoneyMovementPresentationController.toSupportedOwnAccounts;
    if (toSupportedAccounts) {
      for (var i = 0; i < toSupportedAccounts.length; i++) {
        if (toSupportedAccounts[i]["accountID"] !== transactionManager.getTransactionObject().fromAccountNumber) {
          toSupportedAccounts[i]["transactionMode"] = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts");
          this.filteredToAccounts.push(toSupportedAccounts[i]);
        }
      }
    }
    scope_MoneyMovementPresentationController.processAccountsData(this.filteredToAccounts);
  };
  /**
   * This method is used to set the from account selection in the model definition object
   * selectedFromAccount - {Object} holds the from account selection
   */
  MoneyMovement_PresentationController.prototype.setFromAccountsForTransactions = function(selectedFromAccount) {
    var trasMan = applicationManager.getTransactionManager();
    trasMan.setTransactionAttribute("fromAccountNumber", selectedFromAccount.accountID);
    trasMan.setTransactionAttribute("fromAccountName", selectedFromAccount.accountName);
    trasMan.setTransactionAttribute("fromAccountType", selectedFromAccount.accountType);
    trasMan.setTransactionAttribute("fromBankName", selectedFromAccount.bankName);
    trasMan.setTransactionAttribute("fromProcessedName", selectedFromAccount.processedName);
    trasMan.setTransactionAttribute("fromAccountBalance", selectedFromAccount.fromAccountBalance);
    if(selectedFromAccount.fromAccountCurrency)
    {
      trasMan.setTransactionAttribute("fromAccountCurrency",selectedFromAccount.fromAccountCurrency);
    }
    else
    {
      trasMan.setTransactionAttribute("fromAccountCurrency",selectedFromAccount.currencyCode);
    }
    var transObj = scope_MoneyMovementPresentationController.getTransObject();
    if (!transObj.transactionCurrency) {
      trasMan.setTransactionAttribute("transactionCurrency", selectedFromAccount.fromAccountCurrency);
    }
  };
    /**
    * This method is used to process the payee data in the format that service accepts
    * payeeData {Array} acts as a collection for individual payee records.
    */
  MoneyMovement_PresentationController.prototype.processPayeeData = function(payeeData) {
    for (var i = 0; i < payeeData.length; i++) {
      if (payeeData[i].nickName === "" || payeeData[i].nickName === null || payeeData[i].nickName === undefined) {
        payeeData[i].nickName = payeeData[i].name;
      }
      if (payeeData[i].phone === "" || payeeData[i].phone === null || payeeData[i].phone === undefined) {
        payeeData[i].phone = payeeData[i].email;
      }
      payeeData[i].processedName = payeeData[i].nickName;
      payeeData[i].bankName = payeeData[i].phone;
      if( applicationManager.getConfigurationManager().isCombinedUser === "true" ) {
        payeeData[i].accountType = payeeData[i].phone;
      }
      payeeData[i].transactionMode = "PayAPerson";
    }
    return payeeData;
  };
  /**
   * This method is used to process the internal accounts in the format required for initiating service call
   * data - {Array} holds the transfer supported accounts collection
   * screenType - {String} specifies the screen whether from or to based on which account balance type is assigned (ex: Credit card account in from screen should display available balance and in to should show outstanding balance).
   */
  MoneyMovement_PresentationController.prototype.processAccountsData = function(data,screenType) {
    var accProcessedData = [];
    var profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
    for (var i = 0; i < data.length; i++) {
      accProcessedData[i] = {};
      var name = "";
      if (data[i].nickName === null || data[i].nickName === undefined) {
        name = data[i].accountName;
      } else {
        name = data[i].nickName;
      }
      accProcessedData[i].accountName = data[i].accountName;
      accProcessedData[i].nickName = data[i].nickName;
      accProcessedData[i].availableBalance = this.getAvailableBalanceCurrencyString(data[i],screenType);
      accProcessedData[i].accountID = data[i].accountID;
      accProcessedData[i].bankName = (data[i].bankName) ? data[i].bankName.trim() : data[i].bankName;
      accProcessedData[i].accountBalanceType = this.getAvailableBalanceType(data[i],screenType);
      accProcessedData[i].accountType = data[i].accountType;
      accProcessedData[i].fromAccountCurrency = data[i].currencyCode;
      accProcessedData[i].toAccountCurrency = data[i].currencyCode;
      accProcessedData[i].fromAccountBalance = data[i].availableBalance;
      accProcessedData[i].accountPreference = data[i].accountPreference;
      accProcessedData[i].transactionMode = data[i].transactionMode;
      accProcessedData[i].processedName = applicationManager.getPresentationUtility().formatText(name, 10, data[i].accountID, 4);
      accProcessedData[i].paymentDue = data[i].paymentDue;
      accProcessedData[i].nextPaymentDate = data[i].nextPaymentDate;
      accProcessedData[i].nextPaymentAmount = data[i].nextPaymentAmount;
      accProcessedData[i].membershipID=data[i].Membership_id;
      accProcessedData[i].membershipName=data[i].MembershipName;
      accProcessedData[i].isBusinessAccountforMultipleIds=data[i].isBusinessAccount;
      try {
        if(profileAccess==="both"){
          if(kony.sdk.isNullOrUndefined(data[i].isBusinessAccount)) {
            accProcessedData[i].accountTypeIcon = {
              src : "loadersmall.gif",
              isVisible : false
            };
            accProcessedData[i].accountTypeFlx = {
              isVisible : false
            };
            accProcessedData[i].isBusiness = -1;
          }
          else if(data[i].isBusinessAccount === "true") {
            var configurationManager = applicationManager.getConfigurationManager();
            accProcessedData[i].accountTypeIcon = {
              src : "businessaccount.png",
              isVisible : configurationManager.isCombinedUser === "true"?(screenType === "to"?true:true):(screenType === "from"?true:false)
            };
            accProcessedData[i].accountTypeFlx = {
              isVisible : configurationManager.isCombinedUser === "true"?(screenType === "to"?true:true):(screenType === "from"?true:false)
            };
            accProcessedData[i].isBusiness = 1;
          }else {
            var configurationManager = applicationManager.getConfigurationManager();
            accProcessedData[i].accountTypeIcon = {
              src : "personalaccount.png",
              isVisible : configurationManager.isCombinedUser === "true"?(screenType === "to"?true:true):(screenType === "from"?true:false)
            };
            accProcessedData[i].accountTypeFlx = {
              isVisible : configurationManager.isCombinedUser === "true"?(screenType === "to"?true:true):(screenType === "from"?true:false)
            };
            accProcessedData[i].isBusiness = 0;
          }
        }
        else{
          accProcessedData[i].accountTypeIcon = {
            src : "loadersmall.gif",
            isVisible : false
          };
          accProcessedData[i].accountTypeFlx = {
            isVisible : false
          };
          accProcessedData[i].isBusiness = -1;
        }
        
//         if(kony.sdk.isNullOrUndefined(data[i].isBusinessAccount)) {
//           accProcessedData[i].accountTypeIcon = {
//             src : "loadersmall.gif",
//             isVisible : false
//           };
//           accProcessedData[i].accountTypeFlx = {
//             isVisible : false
//           };
//           accProcessedData[i].isBusiness = -1;
//         }
//         else if(data[i].isBusinessAccount === "true") {
//           var configurationManager = applicationManager.getConfigurationManager();
//           accProcessedData[i].accountTypeIcon = {
//             src : "businessaccount.png",
//            isVisible : configurationManager.isCombinedUser === "true"?(screenType === "to"?true:true):(screenType === "from"?true:false)
//           };
//           accProcessedData[i].accountTypeFlx = {
//              isVisible : configurationManager.isCombinedUser === "true"?(screenType === "to"?true:true):(screenType === "from"?true:false)

//           };
//           accProcessedData[i].isBusiness = 1;
//         }
//         else {
//           var configurationManager = applicationManager.getConfigurationManager();
//           accProcessedData[i].accountTypeIcon = {
//             src : "personalaccount.png",
//             isVisible : configurationManager.isCombinedUser === "true"?(screenType === "to"?true:true):(screenType === "from"?true:false)

//           };
//           accProcessedData[i].accountTypeFlx = {
//              isVisible : configurationManager.isCombinedUser === "true"?(screenType === "to"?true:true):(screenType === "from"?true:false)
//           };
//           accProcessedData[i].isBusiness = 0;
//         }
      }
      catch(e) {
        kony.print("Exception in MoneyMovement_PresentationController.prototype.processAccountsData : " + JSON.stringify(e, null, 4));
      }
    }
    return accProcessedData;
  };
  /**
   * This method is used to process the internal accounts by excluding the to account
   * accounts - {Array} holds the transfer supported accounts collection
   */
  MoneyMovement_PresentationController.prototype.filterFromAccount = function(accounts){
    var transObj = scope_MoneyMovementPresentationController.getTransObject();
    var filteredFromAccounts = [];
    if (transObj.transactionType && transObj.transactionType == "InternalTransfer" && transObj.toAccountNumber) {
      for(i=0;i<accounts.length;i++){
        if(transObj.toAccountNumber != accounts[i].accountID){
          filteredFromAccounts.push(accounts[i]);
        }
      }
      return filteredFromAccounts;
    }
    return accounts;
  };
  /**
   * This method is used process the external accounts data in the format required for service definition
   * data - {Array} holds the collection of external accounts
   */
  MoneyMovement_PresentationController.prototype.processExternalAccountsData = function(data) {
    var accProcessedData = [];
    for (var i = 0; i < data.length; i++) {
      accProcessedData[i] = {};
      var name = "";
      if (data[i].nickName === null || data[i].nickName === undefined) {
        name = data[i].beneficiaryName;
      } else {
        name = data[i].nickName;
      }
      accProcessedData[i].accountName = data[i].beneficiaryName;
      accProcessedData[i].nickName = data[i].nickName;
      accProcessedData[i].accountID = data[i].accountNumber;
      accProcessedData[i].bankName = data[i].bankName;
      if (data[i].accountType) { 
        if (data[i].accountType.indexOf("Account") > -1)
        	accProcessedData[i].accountBalanceType = data[i].accountType;
        else 
        	accProcessedData[i].accountBalanceType = data[i].accountType + " Account";
      }
      else {
        accProcessedData[i].accountBalanceType = "";
      }
      accProcessedData[i].accountType = data[i].accountType;
      accProcessedData[i].processedName = applicationManager.getPresentationUtility().formatText(name, 10, data[i].accountNumber, 4);
      accProcessedData[i].transactionMode = data[i].transactionMode;     
      if(!kony.sdk.isNullOrUndefined(data[i].beneficiaryId)){
         accProcessedData[i].beneficiaryId = (data[i].beneficiaryId);
      }else{
        if(!kony.sdk.isNullOrUndefined(data[i].Id)){
          accProcessedData[i].beneficiaryId = (data[i].Id);
        }else{
           accProcessedData[i].beneficiaryId = "";
        }
      }
     // accProcessedData[i].beneficiaryId = (data[i].beneficiaryId != "" ? data[i].beneficiaryId :(data[i].Id != "" ? data[i].Id:""));
      accProcessedData[i].routingNumber = data[i].routingNumber;
      accProcessedData[i].isBusinessPayee = data[i].isBusinessPayee;
      accProcessedData[i].swiftCode = data[i].swiftCode;
      if( applicationManager.getConfigurationManager().isCombinedUser === "true" ) {
        try {
          if(kony.sdk.isNullOrUndefined(data[i].isBusinessPayee)) {
            accProcessedData[i].accountTypeIcon = {
              src : "loadersmall.gif",
              isVisible : false
            };
            accProcessedData[i].accountTypeFlx = {
              isVisible : false
            };
            accProcessedData[i].isBusiness = -1;
          }
          else if(data[i].isBusinessPayee === "1") {
            accProcessedData[i].accountTypeIcon = {
              src : "businessaccount.png",
              isVisible : true
            };
            accProcessedData[i].accountTypeFlx = {
              isVisible : true
            };
            accProcessedData[i].isBusiness = 1;
          }
          else {
            accProcessedData[i].accountTypeIcon = {
              src : "personalaccount.png",
              isVisible : true
            };
            accProcessedData[i].accountTypeFlx = {
              isVisible : true
            };
            accProcessedData[i].isBusiness = 0;
          }
        }
        catch(e) {
          kony.print("Exception in MoneyMovement_PresentationController.prototype.processExternalAccountsData : " + JSON.stringify(e, null, 4));
        }              
      }
    }
    return accProcessedData;
  };
   /**
   * This method is used process the internal accounts data for grouping purpose based on the account type
   * data - {Array} holds the collection of internal accounts
   */
  MoneyMovement_PresentationController.prototype.processViewFormattedData = function(data) {
    var processedData = {}
    for (var i = 0; i < data.length; i++) {
      if (!processedData.hasOwnProperty(data[i].accountType)) {
        processedData[data[i].accountType] = [];
      }
      if (processedData.hasOwnProperty(data[i].accountType)) {
        processedData[data[i].accountType].push(data[i]);
      }
    }
    return processedData;
  };
  /**
   * This method is used return the formatted amount along with the currency code
   * data - {Object} holds the account object
   * screenType - {string} specifies whether data required in to or from screen based on which type of balance needs to be included in formatting.
   */
  MoneyMovement_PresentationController.prototype.getAvailableBalanceCurrencyString = function(data,screenType) {
    var forUtility = applicationManager.getFormatUtilManager();
    var configManager = applicationManager.getConfigurationManager();
    var currencyCode = data["currencyCode"];
    switch (data.accountType) {
      case configManager.constants.SAVINGS:
        return forUtility.formatAmountandAppendCurrencySymbol(data["availableBalance"], currencyCode);
      case configManager.constants.CHECKING:
        return forUtility.formatAmountandAppendCurrencySymbol(data["availableBalance"], currencyCode);
      case configManager.constants.CREDITCARD:
        if(screenType=="from")
        return forUtility.formatAmountandAppendCurrencySymbol(data["availableCredit"], currencyCode);
        else
        return forUtility.formatAmountandAppendCurrencySymbol(data["outstandingBalance"], currencyCode);
      case configManager.constants.LOAN:
        return forUtility.formatAmountandAppendCurrencySymbol(data["outstandingBalance"], currencyCode);
      default:
        return forUtility.formatAmountandAppendCurrencySymbol(data["availableBalance"], currencyCode);
    }
  };
  /**
   * This method is used return the account balance type
   * data - {Object} holds the account object
   * screenType - {string} specifies whether data required in to or from screen based on which type of account balance is returned.
   */
  MoneyMovement_PresentationController.prototype.getAvailableBalanceType = function(data,screenType) {
    var configManager = applicationManager.getConfigurationManager();
    switch (data.accountType) {
      case configManager.constants.SAVINGS:
        return kony.i18n.getLocalizedString("kony.mb.accdetails.availBal");
      case configManager.constants.CHECKING:
        return kony.i18n.getLocalizedString("kony.mb.accdetails.availBal");
      case configManager.constants.CREDITCARD:
        if(screenType=="from")
        return kony.i18n.getLocalizedString("kony.mb.accdetails.availCred");
        else
        return kony.i18n.getLocalizedString("kony.mb.accdetails.outstandingBal");
      case configManager.constants.LOAN:
        return kony.i18n.getLocalizedString("kony.mb.accdetails.outstandingBal");
      default:
        return kony.i18n.getLocalizedString("kony.mb.accdetails.availBal");
    }
  };
  /** This method is used to check the transfer module level entitlements based on the individual entitlement
   */
  MoneyMovement_PresentationController.prototype.checkForTransfersModuleEntitlements = function() {
    var cm = applicationManager.getConfigurationManager();
    var entitlementsResponse = {};
    if (cm.getConfigurationValue("isKonyBankAccountsTransfer") !== "true" && cm.getConfigurationValue("isOtherKonyAccountsTransfer") !== "true" && cm.getConfigurationValue("isOtherBankAccountsTransfer") !== "true" && cm.getConfigurationValue("isInternationalAccountsTransfer") !== "true") {
      entitlementsResponse.isTransfersAvailable = 0;
    }
    else{
      entitlementsResponse.isTransfersAvailable = 1;
    }
    return entitlementsResponse;
  };
  /** This method is used as a pass through to return entitlement value from configuration manager
   *  key- {string} - value for which entitlement needs to be checked
   */
  MoneyMovement_PresentationController.prototype.getEntitlementValue = function(key) {
    var cm = applicationManager.getConfigurationManager();
    return cm.getConfigurationValue(key);
  };
  /**
   * This method is used to handle the cancel navigation across the flow at a central place based on the entry points.
   */
  MoneyMovement_PresentationController.prototype.cancelCommon = function() {
    this.clearMMFlowAtributes();
    var navManager = applicationManager.getNavigationManager();
    var navigateToForm = navManager.getEntryPoint("centralmoneymovement");
    //specific check as we need to make a service call to refresh the account balances.
    if(navigateToForm=="frmDashboardAggregated" || navigateToForm == "frmDashboard"){
    	var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"HomepageMA","moduleName":"AccountsUIModule"});
        accountMod.presentationController.showDashboard();
    }
    else{
        if(navigateToForm === "frmAccountDetails")
        navigateToForm = {"appName":"ArrangementsMA","friendlyName":"AccountUIModule/frmAccountDetails"}
    	navManager.navigateTo(navigateToForm);
    }
  };
  /**
   * This method is a pass-through to return the transaction object
   */
  MoneyMovement_PresentationController.prototype.getTransObject = function() {
    var transMan = applicationManager.getTransactionManager();
    var obj = transMan.getTransactionObject();
    return obj;
  };
  MoneyMovement_PresentationController.prototype.getTransferObjectById = function(screenType) {
    var accdata = [];
    var processAccountsData = null;
    var trasMan = applicationManager.getTransactionManager();
    var accMan = applicationManager.getAccountManager();
    if (trasMan.getTransactionObject().fromAccountNumber) {
      var accData = accMan.getInternalAccountByID(trasMan.getTransactionObject().fromAccountNumber);
      accdata.push(accData);
      processAccountsData = scope_MoneyMovementPresentationController.processAccountsData(accdata,screenType);
    }
    return processAccountsData;
  };
  MoneyMovement_PresentationController.prototype.getFromAccountData = function(){
    var fromaccountdata= scope_MoneyMovementPresentationController.getTransferObjectById()[0];
    fromaccountdata.processedName = scope_MoneyMovementPresentationController.getTransObject().fromProcessedName;
    fromaccountdata.balanceType = scope_MoneyMovementPresentationController.getAvailableBalanceType(fromaccountdata,"from");
    return fromaccountdata;
  };
  /**
   * This method is used to handle the forward navigation including state management
   * formName - {String} specifies the form name of the next screen that needs to be displayed.
   */
  MoneyMovement_PresentationController.prototype.commonFunctionForNavigation = function(formName) {
    var navManager = applicationManager.getNavigationManager();
    var currentForm = kony.application.getCurrentForm();
    // If state management is triggered and if it is not on the state triggered form then we will navigate to state triggered form and ignoring it's entry(passing additional parameter boolean along with the form name to navigateTo method) into the navigation stack as the form is being re-visited
    if(scope_MoneyMovementPresentationController.stateNavigation && scope_MoneyMovementPresentationController.stateTriggeredForm!==currentForm.id){
      navManager.navigateTo(scope_MoneyMovementPresentationController.stateTriggeredForm,true);
      scope_MoneyMovementPresentationController.stateNavigation=false;
      scope_MoneyMovementPresentationController.stateTriggeredForm="";
    }
    // If state management is triggered and if it is on the state triggered form then we will navigate to specified form and ignoring it's entry into the navigation stack as the form is being re-visited
    else if(scope_MoneyMovementPresentationController.stateNavigation){
      navManager.navigateTo(formName,true);
    }
    // This is triggered when the forms are being visited for the first time.
    else{
      navManager.navigateTo(formName);
    }
  };
  /**
   * This method is used to handle the backward navigation including state management
   */
  MoneyMovement_PresentationController.prototype.commonFunctionForgoBack = function() {
    var navManager = applicationManager.getNavigationManager();
    var currentForm = kony.application.getCurrentForm();
    // If state management is triggered and if it is not on the state triggered form then we will navigate to state triggered form and ignoring it's entry(passing additional parameter boolean along with the form name to navigateTo method) into the navigation stack as the form is being re-visited
    if(scope_MoneyMovementPresentationController.stateNavigation && scope_MoneyMovementPresentationController.stateTriggeredForm!==currentForm.id){
      navManager.navigateTo(scope_MoneyMovementPresentationController.stateTriggeredForm,true);
      scope_MoneyMovementPresentationController.stateNavigation=false;
      scope_MoneyMovementPresentationController.stateTriggeredForm="";
    }
    // This is triggered when the forms entry into navigation manager's stack is equal to one .
    else{
      navManager.goBack();
    }
  };
  /**
   * This method is used to sort the accounts within the group based on their preference value
   *  accountsCollection - {Array} holds the collection of accounts within in a single group that needs to be sorted
   */
  MoneyMovement_PresentationController.prototype.sortByPrefrence = function(accountsCollection) {
    if (accountsCollection.length > 1) accountsCollection.sort(function(record1, record2) {
      return record1.accountPreference - record2.accountPreference;
    });
    return accountsCollection;
  };
  /**
   * This method is used to sort the groups based on their priority defined in configuration manager
   *  data - {Object} holds the group names as key and respective accounts collection as value
   */
  MoneyMovement_PresentationController.prototype.orderByPriority = function(data) {
    var cm = applicationManager.getConfigurationManager();
    var prioritizedData = {};
    var metaData = cm.getAccountTypesMetaData();
    for (var key1 in metaData) {
      if (data[metaData[key1].backendValue]) {
        prioritizedData[metaData[key1].backendValue] = data[metaData[key1].backendValue];
      }
    }
    return prioritizedData;
  };
  /**
   * This method is used to enter into manage recipients flow
   */
  MoneyMovement_PresentationController.prototype.enterManageRecipientsFlow = function() {
    var entitlements = this.checkForTransfersModuleEntitlements();
    var navMan = applicationManager.getNavigationManager();
    navMan.setCustomInfo("frmManageRecipientType", entitlements);
    navMan.navigateTo({"appName":"TransfersMA","friendlyName":"RecipientUIModule/frmManageRecipientType"});
  };
  
  /**
   * This method is used to fetch Limits from backend
   * data - {string} holds the amount user has entered in the transfer amount screen
   */
  MoneyMovement_PresentationController.prototype.fetchLimits = function(amount){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var featureAction;
    var configManager =  applicationManager.getConfigurationManager();
    switch(scope_MoneyMovementPresentationController.transactionMode){
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts") :
        featureAction = "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE";
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers") :  
        featureAction = "INTRA_BANK_FUND_TRANSFER_CREATE";
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts") :
        featureAction = "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE";
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer") :
        featureAction = "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE";
        break;
      case "PayAPerson":
        featureAction = "P2P_CREATE";
        break;       
    }
    configManager.fetchLimitsForAnAction(featureAction,this.fetchLimitsSuccess.bind(this, amount) , this.fetchLimitsError.bind(this, amount));
  };

  MoneyMovement_PresentationController.prototype.fetchLimitsSuccess = function(amount, res) {
    var fromAccountNumber = applicationManager.getTransactionManager().getTransactionObject().fromAccountNumber;
    var configManager = applicationManager.getConfigurationManager();
    scope_MoneyMovementPresentationController.haveLimitsBeenFetched = true;
    if (fromAccountNumber && res.accounts) {
      var limit = res.accounts.filter(function(obj) {
        return obj.accountId === fromAccountNumber;
      });
      if (limit && limit.length > 0) {
        limit = limit[0].limits;
        switch(scope_MoneyMovementPresentationController.transactionMode){
          case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts") :
            configManager.setConfigurationValue("maxKonyBankAccountsTransferLimit", limit.MAX_TRANSACTION_LIMIT);
            configManager.setConfigurationValue("minKonyBankAccountsTransferLimit", limit.MIN_TRANSACTION_LIMIT);
            configManager.setConfigurationValue("KonyBankAccountsAutoDeniedTransferLimit", limit.AUTO_DENIED_TRANSACTION_LIMIT);
            break;
          case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers") :  
            configManager.setConfigurationValue("maxOtherKonyAccountsTransferLimit", limit.MAX_TRANSACTION_LIMIT);
            configManager.setConfigurationValue("minOtherKonyAccountsTransferLimit", limit.MIN_TRANSACTION_LIMIT);
            configManager.setConfigurationValue("OtherKonyAccountsAutoDeniedTransferLimit", limit.AUTO_DENIED_TRANSACTION_LIMIT);
            break;
          case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts") :
            configManager.setConfigurationValue("maxOtherBankAccountsTransferLimit", limit.MAX_TRANSACTION_LIMIT);
            configManager.setConfigurationValue("minOtherBankAccountsTransferLimit", limit.MIN_TRANSACTION_LIMIT);
            configManager.setConfigurationValue("OtherBankAccountsAutoDeniedTransferLimit", limit.AUTO_DENIED_TRANSACTION_LIMIT);
            break;
          case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer") :
            configManager.setConfigurationValue("maxInternationalAccountsTransferLimit", limit.MAX_TRANSACTION_LIMIT);
            configManager.setConfigurationValue("minInternationalAccountsTransferLimit", limit.MIN_TRANSACTION_LIMIT);
            configManager.setConfigurationValue("InternationalAccountsAutoDeniedTransferLimit", limit.AUTO_DENIED_TRANSACTION_LIMIT);
            break;
          case "PayAPerson":
            configManager.setConfigurationValue("maxP2PLimit", limit.MAX_TRANSACTION_LIMIT);
            configManager.setConfigurationValue("minP2PLimit", limit.MIN_TRANSACTION_LIMIT);
            configManager.setConfigurationValue("P2PAutoDeniedTransferLimit", limit.AUTO_DENIED_TRANSACTION_LIMIT);
            break;       
        }
      }
    }
    var controller = applicationManager.getPresentationUtility().getController('frmMMTransferAmount', true);
    controller.executeAfterFetchingLimits(amount); 
  };

  
  MoneyMovement_PresentationController.prototype.fetchLimitsError = function(amount, res) {
        scope_MoneyMovementPresentationController.haveLimitsBeenFetched = true;
        var controller = applicationManager.getPresentationUtility().getController('frmMMTransferAmount', true);
        controller.executeAfterFetchingLimits(amount); 
  };

    /**
   * This method is used to evaluate the amount with the limits of respective transaction type
   * amount {string} - amount that is entered in the amount screen
   */
  MoneyMovement_PresentationController.prototype.evaluateMinMaxAmountLimits = function(amount){
    var configManager =  applicationManager.getConfigurationManager();
    var maxlimit,minlimit,autoDeniedLimit;
    switch(scope_MoneyMovementPresentationController.transactionMode){
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts") :
        maxlimit = configManager.getConfigurationValue("maxKonyBankAccountsTransferLimit");
        minlimit = configManager.getConfigurationValue("minKonyBankAccountsTransferLimit");
        autoDeniedLimit = configManager.getConfigurationValue("KonyBankAccountsAutoDeniedTransferLimit");
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers") :
        maxlimit = configManager.getConfigurationValue("maxOtherKonyAccountsTransferLimit");
        minlimit = configManager.getConfigurationValue("minOtherKonyAccountsTransferLimit");
        autoDeniedLimit = configManager.getConfigurationValue("OtherKonyAccountsAutoDeniedTransferLimit");
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts") :
        maxlimit = configManager.getConfigurationValue("maxOtherBankAccountsTransferLimit");
        minlimit = configManager.getConfigurationValue("minOtherBankAccountsTransferLimit");
        autoDeniedLimit = configManager.getConfigurationValue("OtherBankAccountsAutoDeniedTransferLimit");
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer") :
        maxlimit = configManager.getConfigurationValue("maxInternationalAccountsTransferLimit");
        minlimit = configManager.getConfigurationValue("minInternationalAccountsTransferLimit");
        autoDeniedLimit = configManager.getConfigurationValue("InternationalAccountsAutoDeniedTransferLimit");
        break;
      case "PayAPerson":
        maxlimit = configManager.getConfigurationValue("maxP2PLimit");
        minlimit = configManager.getConfigurationValue("minP2PLimit");
        autoDeniedLimit = configManager.getConfigurationValue("P2PAutoDeniedTransferLimit");
        break;
    }
    if(Number(amount)>Number(maxlimit)){
      return {"max":maxlimit};
    }
    if(Number(amount)<Number(minlimit)){
      return {"min":minlimit};
    }
    if (autoDeniedLimit) {
      var minValue = Math.min(Number(autoDeniedLimit), Number(maxlimit));
      if (Number(amount) > minValue) {
        return {"max":minValue}
      }
    }
    return "valid";
  };
  /**
   * This method is used to set amount in transaction object
   * amount {string} - amount that is entered in the amount screen
   */
  MoneyMovement_PresentationController.prototype.setAmount = function(amount){
    var transactionManager = applicationManager.getTransactionManager();
    var transObj = transactionManager.getTransactionObject();
    transactionManager.setTransactionAttribute("amount",amount);
    if(transObj.isScheduled==undefined || transObj.isScheduled==null ||transObj.isScheduled==""){
      transactionManager.setTransactionAttribute("isScheduled","0");
    }
    scope_MoneyMovementPresentationController.commonFunctionForNavigation("frmMMReview");
  };
  /**
   * This method is used to set setTransaction mode to each transfer
   * beneficiaries {array} - list of accounts/beneficiaries
   * transactionMode {string} - transaction mode of the beneficiaries/accounts
   */
  MoneyMovement_PresentationController.prototype.addTransactionMode = function(beneficiaries,transactionMode){
    for(var i=0;i<beneficiaries.length;i++){
      beneficiaries[i]["transactionMode"]=transactionMode;
    }
    return beneficiaries;
  };
  /**
   * This method is used to set to account data in transaction object
   * toAccountData - {Object} holds the selected to account data
   */
  MoneyMovement_PresentationController.prototype.setToAccountData = function(toAccountData){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var transactionManager = applicationManager.getTransactionManager();
    var transactionObject = transactionManager.getTransactionObject();
    scope_MoneyMovementPresentationController.previousAccountType = transactionObject.toAccountType;
    switch(toAccountData.transactionMode){
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts"):
        transactionManager.setTransactionAttribute("toAccountNumber",toAccountData["accountID"]);
        transactionManager.setTransactionAttribute("toAccountType",toAccountData["accountType"]);
        scope_MoneyMovementPresentationController.currentAccountType = toAccountData["accountType"];
        transactionManager.setTransactionAttribute("toAccountName",toAccountData["accountName"]);
        transactionManager.setTransactionAttribute("transactionType","InternalTransfer");
        transactionManager.setTransactionAttribute("toProcessedName",toAccountData["processedName"]);
        transactionManager.setTransactionAttribute("bankName",toAccountData["bankName"]);
        transactionManager.setTransactionAttribute("toAccountCurrency",toAccountData["toAccountCurrency"]);
        transactionManager.setTransactionAttribute("transactionCurrency", toAccountData["toAccountCurrency"]);
         scope_MoneyMovementPresentationController.transactionMode = toAccountData.transactionMode;
        if (toAccountData["accountType"] === "Loan") {
          scope_MoneyMovementPresentationController.isLoansAccountType = true;
          var accountManager = applicationManager.getAccountManager();
          var params = {
            "accountID": toAccountData["accountID"]
          };
          accountManager.fetchAccountDetails(params,scope_MoneyMovementPresentationController.fetchAccountDetailPresentationSuccessCallback,scope_MoneyMovementPresentationController.fetchAccountDetailPresentationErrorCallback);
        }
        else {
          scope_MoneyMovementPresentationController.isLoansAccountType = false;
          scope_MoneyMovementPresentationController.setAmountBasedOnTransactionType();
          scope_MoneyMovementPresentationController.commonFunctionForNavigation("frmMMTransferAmount");
        }
        break;
      case "PayAPerson":
        transactionManager.setTransactionAttribute("p2pContact",toAccountData.primaryContactForSending);
        transactionManager.setTransactionAttribute("personId",toAccountData.PayPersonId);
        transactionManager.setTransactionAttribute("payPersonName",toAccountData.name);
        transactionManager.setTransactionAttribute("transactionType","P2P");
        scope_MoneyMovementPresentationController.currentAccountType = "P2P";
        transactionManager.setTransactionAttribute("toProcessedName",toAccountData["processedName"]);
        scope_MoneyMovementPresentationController.transactionMode = toAccountData.transactionMode;
        scope_MoneyMovementPresentationController.setAmountBasedOnTransactionType();
        scope_MoneyMovementPresentationController.commonFunctionForNavigation("frmMMTransferAmount");
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers"):
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts"):
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer"):
        transactionManager.setTransactionAttribute("toAccountNumber",toAccountData["accountID"]);
        transactionManager.setTransactionAttribute("bankName",toAccountData["bankName"].text);
        transactionManager.setTransactionAttribute("toAccountName",toAccountData["nickName"]);
        transactionManager.setTransactionAttribute("toAccountType",toAccountData["accountType"]);
        scope_MoneyMovementPresentationController.currentAccountType = toAccountData["accountType"];
        transactionManager.setTransactionAttribute("toProcessedName",toAccountData["processedName"]);
        transactionManager.setTransactionAttribute("transactionType","ExternalTransfer");
        transactionManager.setTransactionAttribute("beneficiaryId", toAccountData["beneficiaryId"] || null);
        transactionManager.setTransactionAttribute("routingNumber", toAccountData["routingNumber"] || null);
        transactionManager.setTransactionAttribute("swiftCode", toAccountData["swiftCode"] || null);
        transactionManager.setTransactionAttribute("isBusiness", toAccountData["isBusiness"]);
         transactionManager.setTransactionAttribute("ExternalAccountNumber", toAccountData["accountID"]);
        scope_MoneyMovementPresentationController.transactionMode = toAccountData.transactionMode;
        scope_MoneyMovementPresentationController.setAmountBasedOnTransactionType();
        scope_MoneyMovementPresentationController.commonFunctionForNavigation("frmMMTransferAmount");
        break;
    }
  };
  
  MoneyMovement_PresentationController.prototype.fetchAccountDetailPresentationSuccessCallback = function(response) {
    var transactionManager = applicationManager.getTransactionManager();
    transactionManager.setTransactionAttribute("nextPaymentDate", response[0]["nextPaymentDate"]);
    transactionManager.setTransactionAttribute("nextPaymentAmount", response[0]["nextPaymentAmount"]);
    transactionManager.setTransactionAttribute("paymentDue", response[0]["paymentDue"]);
    scope_MoneyMovementPresentationController.setAmountBasedOnTransactionType();
    scope_MoneyMovementPresentationController.commonFunctionForNavigation("frmMMTransferAmount");
  };

  MoneyMovement_PresentationController.prototype.fetchAccountDetailPresentationErrorCallback = function(error) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(error["isServerUnreachable"])
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
  };
  /**
   * This method is used to get to account data from transaction object
   */
  MoneyMovement_PresentationController.prototype.getToAccountData = function(){
    var transactionManager = applicationManager.getTransactionManager();
    var transObj = transactionManager.getTransactionObject();
    var toAccountData= {};
    if(transObj.transactionType == "P2P"){
      toAccountData["payPersonName"] = transObj.toProcessedName;
      toAccountData["p2pContact"] = transObj.p2pContact;
      toAccountData["personId"] = transObj.personId;
    }
    else{
      if(transObj.transactionType == "InternalTransfer"){
        var accDataArr = [];
        var accMan = applicationManager.getAccountManager();
        var accData = accMan.getInternalAccountByID(transObj.toAccountNumber);
        accDataArr.push(accData);
        accData = scope_MoneyMovementPresentationController.processAccountsData(accDataArr)[0];
        toAccountData["toAccountNumber"] = accData.accountID;
        toAccountData["toAccountName"] = accData.processedName;
        toAccountData["toAccountType"] = accData.accountType;
        toAccountData["availableBalance"] = accData.availableBalance;
        if (accData.accountType === "Loan") {
        toAccountData["paymentDue"] = transObj.paymentDue;
        toAccountData["nextPaymentDate"] = transObj.nextPaymentDate;
        toAccountData["nextPaymentAmount"] = transObj.nextPaymentAmount;
        }
        toAccountData["isBusiness"] = accData.isBusiness;
        toAccountData["accountBalanceType"] = scope_MoneyMovementPresentationController.getAvailableBalanceType(accData);
      }
      else{
        toAccountData["toAccountNumber"] = transObj.toAccountNumber;
        toAccountData["toAccountName"] = transObj.toProcessedName;
        toAccountData["toAccountType"] = transObj.toAccountType;
        toAccountData["bankName"] = transObj.bankName;
        toAccountData["isBusiness"] = transObj.isBusiness;
      }
    }
    toAccountData["disableToAccount"] = transObj.disableToAccount;
    toAccountData["transactionType"] = transObj.transactionType;
    return toAccountData;
  };
   /**
   * This method is used to return the index of the type of frequency selected in the select frequency screen.
   */
  MoneyMovement_PresentationController.prototype.getSelectedFrequencyIndex = function() {
    var transactionObj = applicationManager.getTransactionManager();
    var frequency = transactionObj.getTransactionObject().frequencyType;
    switch (frequency) {
      case "Once":
        return 0;
        break;
      case "Daily":
        return 1;
        break;
      case "Weekly":
        return 2;
        break;
      case "Every Two Weeks":
        return 3;
        break;
      case "Monthly":
        return 4;
        break;
      case "Quarterly":
        return 5;
        break;
      case "Half Yearly":
        return 6;
        break;
      case "Yearly":
        return 7;
        break;
      default:
        return "";
    }
  };
   /**
   * This method is used to populate the transaction object with the frequency selected in the frequency screen.
   * Index - {String} Type of frequency selected.
   */
  MoneyMovement_PresentationController.prototype.switchFrequencyType = function(Index) {
    var transactionObj = applicationManager.getTransactionManager();
    var frequencyTypes = transactionObj.getAvailableFrequencyType();
    var navMan = applicationManager.getNavigationManager();
    var data = {};
    if(!(transactionObj.transferObject && transactionObj.transferObject.duration)){
      scope_MoneyMovementPresentationController.initializeStateData(false, "");
    }
    switch (Index) {
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.Once"):
        transactionObj.setTransactionAttribute("frequencyType", frequencyTypes.ONCE);
        transactionObj.setTransactionAttribute("isScheduled", "0");
        transactionObj.getTransactionObject().scheduledDate;
        data = {
          "freq": "Once"
        };
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.frequency.Daily"):
        transactionObj.setTransactionAttribute("frequencyType", frequencyTypes.DAILY);
        transactionObj.setTransactionAttribute("isScheduled", "1");
        data = {
          "freq": "NotOnce"
        };
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.frequency.Weekly"):
        transactionObj.setTransactionAttribute("frequencyType", frequencyTypes.WEEKLY);
        transactionObj.setTransactionAttribute("isScheduled", "1");
        data = {
          "freq": "NotOnce"
        };
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.frequency.BiWeekly"):
        transactionObj.setTransactionAttribute("frequencyType", frequencyTypes.EVERYTWOWEEKS);
        transactionObj.setTransactionAttribute("isScheduled", "1");
        data = {
          "freq": "NotOnce"
        };
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.frequency.Monthly"):
        transactionObj.setTransactionAttribute("frequencyType", frequencyTypes.MONTHLY);
        transactionObj.setTransactionAttribute("isScheduled", "1");
        data = {
          "freq": "NotOnce"
        };
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.frequency.Quaterly"):
        transactionObj.setTransactionAttribute("frequencyType", frequencyTypes.QUARTERLY);
        transactionObj.setTransactionAttribute("isScheduled", "1");
        data = {
          "freq": "NotOnce"
        };
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.HalfYearly"):
        transactionObj.setTransactionAttribute("frequencyType", frequencyTypes.HALFYEARLY);
        transactionObj.setTransactionAttribute("isScheduled", "1");
        data = {
          "freq": "NotOnce"
        };
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.frequency.Yearly"):
        transactionObj.setTransactionAttribute("frequencyType", frequencyTypes.YEARLY);
        transactionObj.setTransactionAttribute("isScheduled", "1");
        data = {
          "freq": "NotOnce"
        };
        break;
      default:
        break;
    }
    navMan.setCustomInfo("frmMMStartDate", data);
    if (data["freq"] === "Once") {
      scope_MoneyMovementPresentationController.commonFunctionForNavigation("frmMMStartDate");
    }
    else {
      scope_MoneyMovementPresentationController.commonFunctionForNavigation("frmMMDuration");
    }
  };
  /**
   * This method is used to return the index of the type of duration selected in the select set duration screen.
   */
  MoneyMovement_PresentationController.prototype.getIndexForDuration = function() {
    var index;
    var transactionManager = applicationManager.getTransactionManager();
    var durationOption = transactionManager.getTransactionObject().duration;
    if (durationOption === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.frequency.DateRange")) index = 0;
    else if (durationOption === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.NumberOfTransfers")) index = 1;
    return index;
  };
  /**
   * This method is used to populate the transaction object with the duration selected in the set duration screen.
   * Index - {String} Type of duration selected.
   */
  MoneyMovement_PresentationController.prototype.switchDurationType = function(index) {
    var transactionObj = applicationManager.getTransactionManager();
    transactionObj.getAvailableFrequencyType();
    var navMan = applicationManager.getNavigationManager();
    switch (index) {
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.frequency.DateRange"):
        transactionObj.setTransactionAttribute("numberOfRecurrences", null);
        transactionObj.setTransactionAttribute("duration", applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.frequency.DateRange"));
        var data = {
          "freq": "ReccDate"
        };
        navMan.setCustomInfo("frmMMStartDate", data);
        scope_MoneyMovementPresentationController.commonFunctionForNavigation("frmMMStartDate");
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.NumberOfTransfers"):
        transactionObj.setTransactionAttribute("frequencyEndDate", null);
        transactionObj.setTransactionAttribute("duration", applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.NumberOfTransfers"));
        var data = {
          "freq": "NofRR"
        };
        navMan.setCustomInfo("frmMMStartDate", data);
        scope_MoneyMovementPresentationController.commonFunctionForNavigation("frmMMStartDate");
        break;
    }
  };
  /**
   * This method is used to populate the transaction object with the start date selected in the start date calendar.
   * startData - {String} Date in format mm/dd/yyyy
   */
  MoneyMovement_PresentationController.prototype.processStartDate = function(startDate) {
    var formattedDate = startDate;
    var transactionManager = applicationManager.getTransactionManager();
    var date1 = new Date();
    date1.setHours(0,0,0,0);
    var date2 = new Date(formattedDate);
    date2.setHours(0,0,0,0); // Setting the hours, minutes, seconds and milliseconds of selected send date and today's date so that they can be compared for equality.
    if (date1.getTime() !== date2.getTime()) // If transfer frequency is Once and the send date is equal to today's date, then the type of transaction is posted otherwise scheduled.
        transactionManager.setTransactionAttribute("isScheduled", "1");
    else
        transactionManager.setTransactionAttribute("isScheduled", "0");
    transactionManager.setTransactionAttribute("scheduledDate", formattedDate);
    transactionManager.setTransactionAttribute("scheduledCalendarDate", scope_MoneyMovementPresentationController.convertCalendarDateToLocaleDate(formattedDate));
    scope_MoneyMovementPresentationController.commonFunctionForNavigation("frmMMReview");
  };
  /*additional date field to use in  the calendar page in the back flow*/
  MoneyMovement_PresentationController.prototype.convertCalendarDateToLocaleDate = function(formattedDate) {
    var forUtility = applicationManager.getFormatUtilManager();
    var configManager = applicationManager.getConfigurationManager()
    var convertedDate = forUtility.getFormatedDateString(forUtility.getDateObjectFromCalendarString(formattedDate, "MM/DD/YYYY"), configManager.frontendDateFormat[configManager.getLocale()]);
    return convertedDate;
  };
  /**
   * This method is used to populate the transaction object with the start date selected in the start date calendar and navigate to the Recurrence screen if Number of Transfers is selected as duration type previously.
   * startData - {String} Date in format mm/dd/yyyy
   */
  MoneyMovement_PresentationController.prototype.navigateToRecurrence = function(startDate) {
    var formattedDate = startDate;
    var transactionManager = applicationManager.getTransactionManager();
    transactionManager.setTransactionAttribute("frequencyStartDate", formattedDate);
    transactionManager.setTransactionAttribute("scheduledDate", formattedDate);
    transactionManager.setTransactionAttribute("scheduledCalendarDate", scope_MoneyMovementPresentationController.convertCalendarDateToLocaleDate(formattedDate));
    scope_MoneyMovementPresentationController.commonFunctionForNavigation("frmMMNumberOfTransfers");
  };
  /**
   * This method is used to populate the transaction object with the start date selected in the start date calendar and navigate to the End Date calendar screen if Date Range is selected as duration type previously.
   * startData - {String} Date in format mm/dd/yyyy
   */
  MoneyMovement_PresentationController.prototype.navigateToEndDate = function(startDate) {
    var formattedDate = startDate;
    var transactionManager = applicationManager.getTransactionManager();
    transactionManager.setTransactionAttribute("frequencyStartDate", formattedDate);
    transactionManager.setTransactionAttribute("scheduledDate", formattedDate);
    transactionManager.setTransactionAttribute("scheduledCalendarDate", scope_MoneyMovementPresentationController.convertCalendarDateToLocaleDate(formattedDate));
    scope_MoneyMovementPresentationController.commonFunctionForNavigation("frmMMEndDate");
  };
  /**
   * This method is used to populate the transaction object with the end date selected.
   * endDate - {String} Date in format mm/dd/yyyy
   */
  MoneyMovement_PresentationController.prototype.processEndDate = function(endDate) {
    var formattedDate = endDate;
    var transactionManager = applicationManager.getTransactionManager();
    transactionManager.setTransactionAttribute("frequencyEndDate", formattedDate);
    transactionManager.setTransactionAttribute("endCalendarDate", scope_MoneyMovementPresentationController.convertCalendarDateToLocaleDate(formattedDate));
    scope_MoneyMovementPresentationController.commonFunctionForNavigation("frmMMReview");
  };
  /**
   * This method is used to populate the transaction object with the Recurrnece number selected.
   * recurrence - {Number} Value of recurrence number.
   */
  MoneyMovement_PresentationController.prototype.setRecurrence = function(reccurrence) {
    var transactionManager = applicationManager.getTransactionManager();
    transactionManager.setTransactionAttribute("numberOfRecurrences", reccurrence);
    scope_MoneyMovementPresentationController.commonFunctionForNavigation("frmMMReview");
  };
  /**
   * This method is used to set to account data in transaction object
   */
  MoneyMovement_PresentationController.prototype.getReviewScreenData = function(){
    var segData = [];
    var transObj = scope_MoneyMovementPresentationController.getTransObject();
    if(transObj.isScheduled=="1"){
      var calendarDate=""
      if(transObj.scheduledDate){
      	calendarDate = applicationManager.getFormatUtilManager().getFormattedCalendarDate(transObj.scheduledDate);
      }
      if(transObj.frequencyType=="Once"){
        segData.push({
          "property":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transaction.frequency"),
          "value":transObj.frequencyType,
          "chevronImg":"chevron.png"
        },
        {
          "property":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.TransferDate"),
          "value":calendarDate,
          "chevronImg":"chevron.png"
        });
      }
      else{
        var calendarDate=""
        if(transObj.frequencyStartDate){
        	calendarDate = applicationManager.getFormatUtilManager().getFormattedCalendarDate(transObj.frequencyStartDate);
        }
        else if (transObj.scheduledDate){
          calendarDate = applicationManager.getFormatUtilManager().getFormattedCalendarDate(transObj.scheduledDate);
        }
        segData.push({
          "property":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.FrequencyDetails"),
		  "value" : "",
		  "chevronImg" : ""
        },
                     {
          "property":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transaction.frequency"),
          "value":transObj.frequencyType,
          "chevronImg":"chevron.png"
        },
                     {
          "property":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.Duration"),
          "value":transObj.duration,
          "chevronImg":"chevron.png"
        },
                     {
          "property":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.StartDate"),
          "value":calendarDate,
          "chevronImg":"chevron.png"
        });
        if((transObj.numberOfRecurrences && transObj.numberOfRecurrences>0) || transObj.duration === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.NumberOfTransfers")){
          segData.push({
            "property":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.NumberOfTransfers"),
            "value":(transObj.numberOfRecurrences) ? transObj.numberOfRecurrences : "",
            "chevronImg":"chevron.png"
          });
        }
        else{
          var calendarDate=""
          if(transObj.frequencyEndDate){
          	calendarDate = applicationManager.getFormatUtilManager().getFormattedCalendarDate(transObj.frequencyEndDate);
          }
          segData.push({
            "property":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.EndDate"),
            "value": calendarDate,
            "chevronImg":"chevron.png"
          });
        }
        segData.push({
          "property":"",
          "value": {"text" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.RemoveRepeatingTransfer"), "right" : "20dp"},
		      "chevronImg":""
        });
      }
    }
    else{
      var dateobj = new Date();
      var month=(dateobj.getMonth() + 1);
      var date = dateobj.getDate();
      if(month<10)
      {
        month="0"+month;
      }
      if(date<10)
      {
        date="0"+date;
      }
      var formatedDate = month + "/" + date + "/" + dateobj.getFullYear();
      var calendarDate = "";
      if(formatedDate){
        calendarDate=applicationManager.getFormatUtilManager().getFormattedCalendarDate(formatedDate);
      }
      segData.push({
        "property":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transaction.frequency"),
        "value":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.Once"),
        "chevronImg":"chevron.png"
      },
                   {
        "property":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.TransferDate"),
        "value":calendarDate,
        "chevronImg":"chevron.png"
      });
      var transactionManager = applicationManager.getTransactionManager();
      transactionManager.setTransactionAttribute("frequencyType", "Once");
      transactionManager.setTransactionAttribute("numberOfRecurrences", "");
      transactionManager.setTransactionAttribute("frequencyEndDate", "");
      transactionManager.setTransactionAttribute("frequencyStartDate", "");
      transactionManager.setTransactionAttribute("duration", "");
      transactionManager.setTransactionAttribute("endCalendarDate", "");
      transactionManager.setTransactionAttribute("scheduledDate", formatedDate);
      transactionManager.setTransactionAttribute("scheduledCalendarDate", scope_MoneyMovementPresentationController.convertCalendarDateToLocaleDate(formatedDate));
    }
    var amountValue;
    if (transObj.amount) {
      amountValue = applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(transObj.amount,transObj.transactionCurrency);
    }
    segData.push({
      "property":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.Amount"),
      "value": amountValue || "",
      "chevronImg":"chevron.png"
    });
    return segData;
  };
  /**
   * This method is used to perform action based on the row clicked in review screen
   * rowData - {object} data of the selected row in the review screen
   */
  MoneyMovement_PresentationController.prototype.reviewRowClick = function(rowData){
    switch(rowData.property){
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transaction.frequency"):
		var moneyMovementPresentationController = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
   		var toAccountData = moneyMovementPresentationController.getToAccountData();
		if(toAccountData.toAccountType !== "Loan")
        	scope_MoneyMovementPresentationController.commonFunctionForNavigation("frmMMFrequency");
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.StartDate"):
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.TransferDate"):
        scope_MoneyMovementPresentationController.commonFunctionForNavigation("frmMMStartDate");
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.Amount"):
        scope_MoneyMovementPresentationController.commonFunctionForNavigation("frmMMTransferAmount");
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.EndDate"):
        scope_MoneyMovementPresentationController.commonFunctionForNavigation("frmMMEndDate");
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.NumberOfTransfers"):
        scope_MoneyMovementPresentationController.commonFunctionForNavigation("frmMMNumberOfTransfers");
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.Duration"):
        scope_MoneyMovementPresentationController.commonFunctionForNavigation("frmMMDuration");
        break;
      default:
        if(rowData.value.text==applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.RemoveRepeatingTransfer")){
          var transactionManager = applicationManager.getTransactionManager();
          transactionManager.setTransactionAttribute("isScheduled", "0");
          scope_MoneyMovementPresentationController.initializeStateData(false, "");
          var controller = applicationManager.getPresentationUtility().getController('frmMMReview', true);
          controller.setSegmentData();
          controller.changeButtonText();
        }
    }
  };
  /**
   * This method is used to make a new transfer or update an existing transfer
   * description - {string} description notes entered in the review screen
   * presentationMakeATransferSuccess  {callBack Function} - This method is the success callback on creating a transfer
   * presentationMakeATransferError {callBack Function} - This method is the error callback on creating a transfer
   */
  MoneyMovement_PresentationController.prototype.makeATransfer = function(description) {
    var transactionManager = applicationManager.getTransactionManager();
    transactionManager.setTransactionAttribute("transactionsNotes",description);
    var transactionObj = transactionManager.getTransactionObject();
    var mfaManager = applicationManager.getMFAManager();
    var serviceName = transactionObj.serviceName;
    transactionManager.setTransactionAttribute("transactionAmount",transactionObj.amount);
    if(kony.sdk.isNullOrUndefined(serviceName)){
      var displayName = applicationManager.getPresentationUtility().MFA.getDisplayNameBasedOnTransactionMode("MoneyMovementUIModule");
      applicationManager.getPresentationUtility().MFA.getServiceIdBasedOnDisplayName(displayName);
      serviceName = mfaManager.getServiceId();
    }
    else
      mfaManager.setServiceId(serviceName);
    if(serviceName){
      var mfaParams = {
        serviceName: serviceName,
      };
      transactionManager.setTransactionAttribute("MFAAttributes", mfaParams);
    }
    transactionObj.scheduledDate = applicationManager.getFormatUtilManager().getFormattedCalendarDate(transactionObj.scheduledDate);
    if (transactionManager.getTransactionObject().transactionId !== "" && transactionManager.getTransactionObject().transactionId != null && transactionManager.getTransactionObject().transactionId != null) {
      var requestData = scope_MoneyMovementPresentationController.filterTransactionObject();
      if (requestData.toAccountNumber) {
        requestData.toAccountNumber = requestData.toAccountNumber.replace(/\s/g, "");
        if (requestData.transactionType === "ExternalTransfer") {
          requestData.ExternalAccountNumber = requestData.toAccountNumber;
        } else {
          requestData.ExternalAccountNumber = "";
        }
      }
      var editTransactionBasedOnTransactionMode = scope_MoneyMovementPresentationController.getEditFunctionReference();
      if (editTransactionBasedOnTransactionMode)
        editTransactionBasedOnTransactionMode(requestData, this.presentationMakeATransferSuccess, this.presentationMakeATransferError);
    } else {
      transactionManager.setTransactionAttribute("serviceName",serviceName);
      var requestData = scope_MoneyMovementPresentationController.filterTransactionObject();
      if (requestData.toAccountNumber) {
        requestData.toAccountNumber = requestData.toAccountNumber.replace(/\s/g, "");
        if (requestData.transactionType === "ExternalTransfer") {
          requestData.ExternalAccountNumber = requestData.toAccountNumber;
          requestData.beneficiaryName = requestData.toAccountName;
        } else {
          requestData.ExternalAccountNumber = "";
        }
      }
	  if (requestData.transactionType === "InternalTransfer") {
      requestData.transactionCurrency = requestData.toAccountCurrency;
      }
   
      var createTransactionBasedOnTransactionMode = scope_MoneyMovementPresentationController.getCreateFunctionReference();
       requestData = scope_MoneyMovementPresentationController.filterRequestData(requestData);
      if (createTransactionBasedOnTransactionMode)
        createTransactionBasedOnTransactionMode(requestData, this.presentationMakeATransferSuccess, this.presentationMakeATransferError);
    }
  };
  MoneyMovement_PresentationController.prototype.filterRequestData = function(transObj) {
    for(var key in transObj) {
      if (transObj.hasOwnProperty(key)) {
        if (typeof transObj[key] !== "string" || transObj[key] === "") {
          delete transObj[key];
        }
      }
    }
    return transObj;
  };
  MoneyMovement_PresentationController.prototype.downloadTransactionReport = function(requestParam) {
    var userManager = applicationManager.getUserPreferencesManager();
    requestParam.generatedBy = userManager.getUserName();
    applicationManager.getTransactionManager().DownloadTransactionPDF(requestParam, this.downloadTransactionReportSuccess.bind(this), this.downloadTransactionReportError.bind(this));
  };

  MoneyMovement_PresentationController.prototype.downloadTransactionReportSuccess = function(response) {
    var mfURL = KNYMobileFabric.mainRef.config.services_meta.DocumentManagement.url;
    var pdfurl = mfURL + "/objects/DownloadTransactionPDF?fileId=" + response.fileId;
    kony.application.openURL(pdfurl);
  };

  MoneyMovement_PresentationController.prototype.downloadTransactionReportError = function(error) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    kony.print("error downloading report");
  };
  /**
   * This method is a callback on success of creating or editing transfer
   * resp - {object} response
   */
  MoneyMovement_PresentationController.prototype.presentationMakeATransferSuccess = function(resp) {
      if(resp.MFAAttributes && resp.MFAAttributes.isMFARequired == "true"){
        let mfaManager = applicationManager.getMFAManager();
        var mfaJSON = {
          "flowType" : scope_MoneyMovementPresentationController.mfaFlowType,
          "response" : resp
        };
        var transactionManager = applicationManager.getTransactionManager();
        switch (mfaManager.getMFAFlowType()) {
          case "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE":
            mfaJSON.objectServiceDetails = {
              "serviceName": "TransactionObjects",
              "dataModel": "Transaction",
              "operationName": "TransferToOwnAccounts"
            };
            break;
          case "TRANSFER_BETWEEN_OWN_ACCOUNT_UPDATE":
            mfaJSON.objectServiceDetails = {
              "serviceName": "TransactionObjects",
              "dataModel": "Transaction",
              "operationName": "TransferToOwnAccountsEdit"
            };
            break;
          case "INTRA_BANK_FUND_TRANSFER_CREATE":
            mfaJSON.objectServiceDetails = {
              "serviceName": "TransactionObjects",
              "dataModel": "Transaction",
              "operationName": "IntraBankAccFundTransfer"
            };
            break;
          case "INTRA_BANK_FUND_TRANSFER_UPDATE":
            mfaJSON.objectServiceDetails = {
              "serviceName" : "TransactionObjects",
              "dataModel" : "Transaction",
              "operationName" : "IntraBankAccFundTransferEdit"
            };
            break;
          case "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE" :
            mfaJSON.objectServiceDetails = {
              "serviceName" : "TransactionObjects",
              "dataModel" : "Transaction",
              "operationName" : "InterBankAccFundTransfer"
            };
            break;
          case "INTER_BANK_ACCOUNT_FUND_TRANSFER_UPDATE" :
            mfaJSON.objectServiceDetails = {
              "serviceName" : "TransactionObjects",
              "dataModel" : "Transaction",
              "operationName" : "InterBankFundTransferEdit"
            };
            break;
          case "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE" :
            mfaJSON.objectServiceDetails = {
              "serviceName" : "TransactionObjects",
              "dataModel" : "Transaction",
              "operationName" : "InternationalAccFundTransfer"
            };
            break;
          case "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_UPDATE" :
            mfaJSON.objectServiceDetails = {
              "serviceName" : "TransactionObjects",
              "dataModel" : "Transaction",
              "operationName" : "InternationalFundTransferEdit"
            };
            break;
          case "P2P_CREATE" :
            mfaJSON.objectServiceDetails = {
              "serviceName" : "TransactionObjects",
              "dataModel" : "Transaction",
              "operationName" : "P2PTransfer"
            };
            break;
          case "P2P_EDIT" :
            mfaJSON.objectServiceDetails = {
              "serviceName" : "TransactionObjects",
              "dataModel" : "Transaction",
              "operationName" : "P2PTransferEdit"
            };
            break;
        }
        mfaManager.setMFAOperationType("MONEYMOVEMENT");
        mfaManager.initMFAFlow(mfaJSON);
      }
      else{
        var transactionManager = applicationManager.getTransactionManager();
        if(resp.backendReferenceId)
          transactionManager.setTransactionAttribute("referenceId",resp.backendReferenceId);
        else if(resp.referenceId)
          transactionManager.setTransactionAttribute("transactionId",resp.referenceId);
        var navigationManager = applicationManager.getNavigationManager();
        navigationManager.setCustomInfo("frmMMConfirmation", resp.status);  
        scope_MoneyMovementPresentationController.commonFunctionForNavigation("frmMMConfirmation");
      }
    };
  /**
   * This method is a callback on eroor of creating or editing transfer
   * err - {object} error response
   */
    MoneyMovement_PresentationController.prototype.presentationMakeATransferError = function(err) {
        if (err["isServerUnreachable"]) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
        } else {
          	var transactionManager = applicationManager.getTransactionManager();
          	transactionManager.setTransactionAttribute("errmsg",err.errorMessage);
            scope_MoneyMovementPresentationController.commonFunctionForNavigation("frmMMConfirmation");
        }
    };
  
  MoneyMovement_PresentationController.prototype.filterTransactionObject = function() { 
    var transactionManager = applicationManager.getTransactionManager();
    var request = transactionManager.getTransactionObject();
    var requestdata = {};
    for (var prop in request) { 
      if (request[prop] !== null) { 
        requestdata[prop]=request[prop];
      } 
    }
    return requestdata;
  };
  
  MoneyMovement_PresentationController.prototype.getCreateFunctionReference = function() {
    var managerFunction;
    var mfaManager = applicationManager.getMFAManager();
    var transactionManager = applicationManager.getTransactionManager();
    switch(scope_MoneyMovementPresentationController.transactionMode) {
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts") :
        scope_MoneyMovementPresentationController.mfaFlowType="TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE";
        mfaManager.setMFAFlowType("TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE");
        managerFunction = transactionManager.createTransferToOwnAccounts;
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers") :
        mfaManager.setMFAFlowType("INTRA_BANK_FUND_TRANSFER_CREATE");  
         scope_MoneyMovementPresentationController.mfaFlowType="INTRA_BANK_FUND_TRANSFER_CREATE";
        managerFunction = transactionManager.createIntraBankAccFundTransfer;
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts") :
        mfaManager.setMFAFlowType("INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE");
         scope_MoneyMovementPresentationController.mfaFlowType="INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE";
        managerFunction = transactionManager.createInterBankAccFundTransfer;
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer") :
        mfaManager.setMFAFlowType("INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE");
         scope_MoneyMovementPresentationController.mfaFlowType="INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE";
        managerFunction = transactionManager.createInternationalAccFundTransfer;
        break;
      case "PayAPerson":
        mfaManager.setMFAFlowType("P2P_CREATE");
         scope_MoneyMovementPresentationController.mfaFlowType="P2P_CREATE";
        managerFunction = transactionManager.createP2PTransaction;
        break;
    }
    if (managerFunction)
      return managerFunction.bind(transactionManager);
    return;  
  };
  
  MoneyMovement_PresentationController.prototype.getEditFunctionReference = function() {
    var managerFunction;
    var mfaManager = applicationManager.getMFAManager();
    var transactionManager = applicationManager.getTransactionManager();
    switch(scope_MoneyMovementPresentationController.transactionMode) {
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts") :
        mfaManager.setMFAFlowType("TRANSFER_BETWEEN_OWN_ACCOUNT_UPDATE");
        scope_MoneyMovementPresentationController.mfaFlowType="TRANSFER_BETWEEN_OWN_ACCOUNT_UPDATE";
        managerFunction = transactionManager.editTransferToOwnAccounts;
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers") :
        mfaManager.setMFAFlowType("INTRA_BANK_FUND_TRANSFER_UPDATE");  
         scope_MoneyMovementPresentationController.mfaFlowType="INTRA_BANK_FUND_TRANSFER_UPDATE";
        managerFunction = transactionManager.editIntraBankAccFundTransfer;
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts") :
        mfaManager.setMFAFlowType("INTER_BANK_ACCOUNT_FUND_TRANSFER_UPDATE");
         scope_MoneyMovementPresentationController.mfaFlowType="INTER_BANK_ACCOUNT_FUND_TRANSFER_UPDATE";
        managerFunction = transactionManager.editInterBankAccFundTransfer;
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer") :
        mfaManager.setMFAFlowType("INTERNATIONAL_ACCOUNT_FUND_TRANSFER_UPDATE");
         scope_MoneyMovementPresentationController.mfaFlowType="INTERNATIONAL_ACCOUNT_FUND_TRANSFER_UPDATE";
        managerFunction = transactionManager.editInternationalAccFundTransfer;
        break;
      case "PayAPerson":
        mfaManager.setMFAFlowType("P2P_EDIT");
        scope_MoneyMovementPresentationController.mfaFlowType="P2P_EDIT";
        managerFunction = transactionManager.updateP2PTransaction;
        break;
    }
    if (managerFunction)
      return managerFunction.bind(transactionManager);
    return;  
  };
  
  /**
   * This method is used to populate the Acknowledgement screen after the completion of a transfer.
   */
 MoneyMovement_PresentationController.prototype.getConfirmationScreenData = function() {
    var segData = [];
   var transObj = scope_MoneyMovementPresentationController.getTransObject();
    var moneyMovementPresentationController = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    var fromaccountdata= MoneyMovement_PresentationController.prototype.getTransferObjectById("from");
    var toAccountData = MoneyMovement_PresentationController.prototype.getToAccountData();
    var configurationManager = applicationManager.getConfigurationManager();
   var profileAccess = applicationManager.getUserPreferencesManager().profileAccess;

    var toAccountType;
    var fromAccountType;
    var flxBoolenToAccount;
    var flxBoolenFromAccount;
   //configurationManager.isCombinedUser === "true"
   if(profileAccess==="both") { 
     flxBoolenFromAccount = true;
     if(fromaccountdata[0]["isBusiness"] === 0) {
       fromAccountType = "personalaccount.png";
     }else if(fromaccountdata[0]["isBusiness"] === 1) {
       fromAccountType = "businessaccount.png";
     }


     if(toAccountData.transactionType == "InternalTransfer"){
       flxBoolenToAccount=true;
       if(toAccountData.isBusiness=== 0) {
         toAccountType = "personalaccount.png";
       } else if(toAccountData.isBusiness === 1) {
         toAccountType = "businessaccount.png";
       }
     }
     else if(toAccountData.transactionType == "P2P"){
       flxBoolenToAccount=true;
       toAccountType = "personalaccount.png";
     }else if(toAccountData.transactionType == "ExternalTransfer"){ //sasi
       flxBoolenToAccount=false;
       if(toAccountData.isBusiness=== 0) {
         toAccountType = "personalaccount.png";
       } else if(toAccountData.isBusiness === 1) {
         toAccountType = "businessaccount.png";
       }
     }
     else{
       flxBoolenToAccount=true;
       if(toAccountData.isBusiness=== 0) {
         toAccountType = "personalaccount.png";
       }else if(toAccountData.isBusiness === 1) {
         toAccountType = "businessaccount.png";
       }
     }
   } else{
     flxBoolenToAccount = false;
     flxBoolenFromAccount = false;
   }
    
    if (!kony.sdk.isNullOrUndefined(transObj.referenceId)) {
      segData.push({
        "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.ReferenceID"),
        "value" : transObj.referenceId,
        "flxAccountType":{isVisible:false}
      });
    }
    else if (!kony.sdk.isNullOrUndefined(transObj.transactionId)) {
      segData.push({
        "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.TransactionID"),
        "value" : transObj.transactionId,
        "flxAccountType":{isVisible:false}
      });
    }
    segData.push({
      "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.from"),
      "value" : transObj.fromProcessedName,
      "flxAccountType":{isVisible:flxBoolenFromAccount},
      "imgAccountType":{src:fromAccountType}
    },{
      "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.To"),
      "value" : transObj.toProcessedName,
      "flxAccountType":{isVisible:flxBoolenToAccount},
      "imgAccountType":{src:toAccountType}
    });
    if (transObj.frequencyType === "Once"){
      segData.push({
        "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.TransferDate"),
        "value" : applicationManager.getFormatUtilManager().getFormattedCalendarDate(transObj.scheduledDate),
         "flxAccountType":{isVisible:false}
      });
    }
    else {
        var calendarDate=""
        if(transObj.frequencyStartDate){
        	calendarDate = applicationManager.getFormatUtilManager().getFormattedCalendarDate(transObj.frequencyStartDate);
        }
        else if (transObj.scheduledDate){
          calendarDate = applicationManager.getFormatUtilManager().getFormattedCalendarDate(transObj.scheduledDate);
        }
      segData.push({
        "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transaction.frequency"),
        "value" : transObj.frequencyType,
         "flxAccountType":{isVisible:false}
      },
      {
        "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.StartDate"),
        "value" : calendarDate,
         "flxAccountType":{isVisible:false}
      });
      if (!kony.sdk.isNullOrUndefined(transObj.numberOfRecurrences)) {
        segData.push({
          "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.NumberOfTransfers"),
          "value" : transObj.numberOfRecurrences,
           "flxAccountType":{isVisible:false}
        });
      }
      else{
        segData.push({
          "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.EndDate"),
          "value" : applicationManager.getFormatUtilManager().getFormattedCalendarDate(transObj.frequencyEndDate),
           "flxAccountType":{isVisible:false}
        });
      }
    }
    segData.push({
      "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.Amount"),
      "value" : applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(transObj.amount,transObj.transactionCurrency),
       "flxAccountType":{isVisible:false}
    });
    segData.push({
      "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.note"),
      "value" : transObj.transactionsNotes,
       "flxAccountType":{isVisible:false}
    });
    return segData;
  };
  /**
    * This method is used to initialise the state management flow
    * initialized- {boolean} hold the initialisation state value
    * triggeredForm - {String} holds the form name from where state management has been triggered.
    */
  MoneyMovement_PresentationController.prototype.initializeStateData=function(initialized,triggeredForm){
    scope_MoneyMovementPresentationController.stateNavigation = initialized;
    scope_MoneyMovementPresentationController.stateTriggeredForm = triggeredForm;
  };
  /**
    * This method is used to build the values for to account data in the model definition
    * Invokes from accounts service call and navigates to from screen or Amount Screen depending on whether from account is selected or not.
    */
  MoneyMovement_PresentationController.prototype.setTransferToAccountFromManageFlow = function() {
    var navMan = applicationManager.getNavigationManager();
    var transactionManager = applicationManager.getTransactionManager();
    scope_MoneyMovementPresentationController.populateToAccountsDataFromManageFlow();
    var fromAccountNumber = transactionManager.getTransactionObject().fromAccountNumber;
    if (fromAccountNumber) {
      scope_MoneyMovementPresentationController.commonFunctionForNavigation("frmMMTransferAmount");
    }
    else {
      scope_MoneyMovementPresentationController.getFromAndToAccounts();
    }
  };
    /**
    * This method is used to build the values for to account data in the model definition as we enter from manage flow
    */
  MoneyMovement_PresentationController.prototype.populateToAccountsDataFromManageFlow = function() {
    var transMan = applicationManager.getTransactionManager();
    var transferModPresentationController = applicationManager.getModulesPresentationController("TransferEuropeUIModule");
    var benificiaryDetails = transferModPresentationController.getBenificiaryData();
    var name = "";
    if (!benificiaryDetails.nickName){
      name = benificiaryDetails.beneficiaryName;
    } else {
      name = benificiaryDetails.nickName;
    }
    transMan.setTransactionAttribute("toProcessedName",applicationManager.getPresentationUtility().formatText(name, 10,benificiaryDetails.accountNumber, 4));
    transMan.setTransactionAttribute("toAccountNumber",benificiaryDetails["accountNumber"]);
    transMan.setTransactionAttribute("bankName",benificiaryDetails["bankName"]);
    transMan.setTransactionAttribute("toAccountName",benificiaryDetails["nickName"]);
    transMan.setTransactionAttribute("toAccountType",benificiaryDetails["accountType"]);
    transMan.setTransactionAttribute("transactionType","ExternalTransfer");
    transMan.setTransactionAttribute("disableToAccount",true);
    transMan.setTransactionAttribute("isBusiness",benificiaryDetails["isBusinessPayee"]);
    transMan.setTransactionAttribute("routingNumber",benificiaryDetails["routingNumber"] || null);
    transMan.setTransactionAttribute("beneficiaryId",benificiaryDetails["beneficiaryId"] || benificiaryDetails["Id"] || null);
    var transferModulePresentationController = applicationManager.getModulesPresentationController("TransferEuropeUIModule");
    var flowType=transferModulePresentationController.getFlowType();
    if(flowType=="SameBankRecipients"){
		scope_MoneyMovementPresentationController.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers");
    }
    else if(flowType=="OtherBankRecipients"){
		scope_MoneyMovementPresentationController.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts");
    }
    else{
		scope_MoneyMovementPresentationController.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer");
    }
  };
  /**
   * This method is used to cancel a transaction
   * data - {string} transactionId of the transaction
   * deleteSuccess  {callBack Function} - This method is the success callback on cancelling a transfer
   * deleteError {callBack Function} - This method is the error callback on cancelling a transfer
   */
  MoneyMovement_PresentationController.prototype.deleteTransaction = function(data) {
    var transactionObj = applicationManager.getTransactionManager().getTransactionObject();
    var transactionType = transactionObj.transactionType;
    var criteria = {
      "transactionId": data,
      "transactionType" : transactionType
    };
    var transactionObj = applicationManager.getTransactionManager();
    var deleteTransactionBasedOnTransactionMode = scope_MoneyMovementPresentationController.getDeleteFunctionReference();
    if (deleteTransactionBasedOnTransactionMode)
      deleteTransactionBasedOnTransactionMode(criteria, scope_MoneyMovementPresentationController.deleteSuccess, scope_MoneyMovementPresentationController.deleteError);
  };
  /**
   * This method is used to cancel a recurring transaction
   * data - {string} transactionId of the transaction
   * deleteSuccess  {callBack Function} - This method is the success callback on cancelling a transfer
   * deleteError {callBack Function} - This method is the error callback on cancelling a transfer
   */
  MoneyMovement_PresentationController.prototype.deleteRecurrenceTransaction = function(data) {
    var criteria = {
      "transactionId": data
    };
    var transactionObj = applicationManager.getTransactionManager();
    var cancelRecurrenceBasedOnTransactionMode = scope_MoneyMovementPresentationController.getCanceRecFunctionReference();
    if (cancelRecurrenceBasedOnTransactionMode)
      cancelRecurrenceBasedOnTransactionMode(criteria, scope_MoneyMovementPresentationController.deleteSuccess, scope_MoneyMovementPresentationController.deleteError);
  };
  /**
   * This method is the success callback on cancelling a transaction
   * res - {object} response
   */
  MoneyMovement_PresentationController.prototype.deleteSuccess = function(res) {
   // var transModPresentationController = applicationManager.getModulesPresentationController("TransactionUIModule");
    //transModPresentationController.getTransactions("frmMMTransfers");
    var navMan = applicationManager.getNavigationManager();
    var data = {};
    data.type = "success";
    data.typeOfTransaction = "delete";
    data.res = res;
    navMan.setCustomInfo("frmMMTransfers", data);
  };
  /**
   * This method is the error callback on cancelling a transaction
   * err - {object} error response
   */
  MoneyMovement_PresentationController.prototype.deleteError = function(err) {
    if (err["isServerUnreachable"]) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    } else {
      var navMan = applicationManager.getNavigationManager();
     // var transModPresentationController = applicationManager.getModulesPresentationController("TransactionUIModule");
      //transModPresentationController.getTransactions("frmMMTransfers");
      var data = {};
      data.type = "error";
      data.res = err["errorMessage"];
      navMan.setCustomInfo("frmMMTransfers", data);
    }
  };
  
  MoneyMovement_PresentationController.prototype.getDeleteFunctionReference = function() {
    var managerFunction;
    var transactionManager = applicationManager.getTransactionManager();
    switch(scope_MoneyMovementPresentationController.transactionMode) {
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts") :
        managerFunction = transactionManager.cancelTransferToOwnAccounts;
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers") :  
        managerFunction = transactionManager.cancelIntraBankAccFundTransfer;
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts") :
        managerFunction = transactionManager.cancelInterBankAccFundTransfer;
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer") :
        managerFunction = transactionManager.cancelInternationalAccFundTransfer;
        break;
      case "PayAPerson":
        managerFunction = transactionManager.deleteP2PTransaction;
        break;
    }
    if (managerFunction)
      return managerFunction.bind(transactionManager);
    return;  
  };
  
  MoneyMovement_PresentationController.prototype.getCanceRecFunctionReference = function() {
    var managerFunction;
    var transactionManager = applicationManager.getTransactionManager();
    switch(scope_MoneyMovementPresentationController.transactionMode) {
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts") :
        managerFunction = transactionManager.cancelOccurrenceTransferToOwnAccounts;
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers") :  
        managerFunction = transactionManager.cancelOccurrenceIntraBankAccFundTransfer;
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts") :
        managerFunction = transactionManager.cancelOccurrenceInterBankAccFundTransfer;
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer") :
        managerFunction = transactionManager.cancelOccurrenceInternationalAccFundTransfer;
        break;
      case "PayAPerson":
        managerFunction = transactionManager.deleteP2PRecurrenceTransaction;
        break;
    }
    if (managerFunction)
      return managerFunction.bind(transactionManager);
    return;  
  };
  /**
   * This method is used to set the transaction to be repeated into the transaction object
   * transactionData - {object} data of transaction to be repeated.
   */
  MoneyMovement_PresentationController.prototype.repeatTransfer = function(transactionData) {
    var formatUtil = applicationManager.getFormatUtilManager();
    var transactionObj = applicationManager.getTransactionManager();
    var currencyArray = scope_MoneyMovementPresentationController.getCurrencyArray();
	transactionObj.clearTransferObject();
    if (transactionData.amount !== undefined && transactionData.amount !== null) {
      var amount = formatUtil.deFormatAmount(transactionData.amount, currencyArray);
      if(Number(amount)<0)
        amount = amount.substring(1);
      transactionObj.setTransactionAttribute("amount",amount);
    }
    if (transactionData.frequencyType !== undefined && transactionData.frequencyType !== null) {
      transactionObj.setTransactionAttribute("frequencyType",transactionData.frequencyType);
    }
    if (transactionData.isScheduled !== undefined && transactionData.isScheduled !== null) {
      if (transactionData.isScheduled === "true")
        transactionObj.setTransactionAttribute("isScheduled","1");
      else
        transactionObj.setTransactionAttribute("isScheduled","0");
    }
    if (transactionData.fromAccountNumber !== undefined && transactionData.fromAccountNumber !== null) {
      var accMan = applicationManager.getAccountManager();
      transactionObj.setTransactionAttribute("fromAccountNumber",transactionData.fromAccountNumber);
      transactionObj.setTransactionAttribute("fromAccountCurrency", accMan.getInternalAccountByID(transactionData.fromAccountNumber).currencyCode);
    }
    if (transactionData.toAccountType !== undefined && transactionData.toAccountType !== null) {
      transactionObj.setTransactionAttribute("toAccountType",transactionData.toAccountType);
    }
    if (transactionData.toAccountNumber !== undefined && transactionData.toAccountNumber !== null) {
      transactionObj.setTransactionAttribute("toAccountNumber",transactionData.toAccountNumber);
    }
    if (transactionData.ExternalAccountNumber !== undefined && transactionData.ExternalAccountNumber !== null) {
      transactionObj.setTransactionAttribute("toAccountNumber",transactionData.ExternalAccountNumber);
    }
    if (transactionData.toAccountName !== undefined && transactionData.toAccountName !== null) {
      transactionObj.setTransactionAttribute("toAccountName",transactionData.toAccountName);
      if(transactionData.toAccountNumber)
        transactionObj.setTransactionAttribute("toProcessedName",applicationManager.getPresentationUtility().formatText(transactionData.toAccountName, 10, transactionData.toAccountNumber, 4));
      else if(transactionData.ExternalAccountNumber)
        transactionObj.setTransactionAttribute("toProcessedName",applicationManager.getPresentationUtility().formatText(transactionData.toAccountName, 10, transactionData.ExternalAccountNumber, 4));
    }
    if (transactionData.frequencyStartDate !== undefined && transactionData.frequencyStartDate !== null) {
      var startdate = formatUtil.getDateObjectfromString(transactionData.frequencyStartDate, "YYYY-MM-DD");
      var startDate = formatUtil.getFormatedDateString(startdate, formatUtil.getApplicationDateFormat());
      transactionObj.setTransactionAttribute("frequencyStartDate",startDate);
    }
    if (transactionData.numberOfRecurrences !== undefined && transactionData.numberOfRecurrences !== null && transactionData.numberOfRecurrences !== "0") {
      transactionObj.setTransactionAttribute("numberOfRecurrences",transactionData.numberOfRecurrences);
      transactionObj.setTransactionAttribute("duration", applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.NumberOfTransfers"));
    }
    if (transactionData.frequencyEndDate !== undefined && transactionData.frequencyEndDate !== null) {
      var enddate = formatUtil.getDateObjectfromString(transactionData.frequencyEndDate, "YYYY-MM-DD");
      var endDate = formatUtil.getFormatedDateString(enddate, formatUtil.getApplicationDateFormat());
      transactionObj.setTransactionAttribute("frequencyEndDate",endDate);
      transactionObj.setTransactionAttribute("duration", applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.frequency.DateRange"));
    }
    if (transactionData.scheduledDate !== undefined && transactionData.scheduledDate !== null) {
      transactionObj.setTransactionAttribute("scheduledDate",transactionData.scheduledDate);
    }
    if (transactionData.fromAccountName !== undefined && transactionData.fromAccountName !== null) {
      transactionObj.setTransactionAttribute("fromAccountName",transactionData.fromAccountName);
    }
    if (transactionData.transactionType !== undefined && transactionData.transactionType !== null) {
      transactionObj.setTransactionAttribute("transactionType",transactionData.transactionType);
    }
    if (transactionData.fromAccountType !== undefined && transactionData.fromAccountType !== null) {
      transactionObj.setTransactionAttribute("fromAccountType",transactionData.fromAccountType);
    }
    if (transactionData.serviceName !== undefined && transactionData.serviceName !== null) {
      transactionObj.setTransactionAttribute("serviceName",transactionData.serviceName);
    }
    if (transactionData.payPersonName !== undefined && transactionData.payPersonName !== null) {
      transactionObj.setTransactionAttribute("payPersonName",transactionData.payPersonName);
      if (transactionData.nickName !== undefined && transactionData.nickName !== null) {
        transactionObj.setTransactionAttribute("toProcessedName",transactionData.nickName);
      }
      else
        transactionObj.setTransactionAttribute("toProcessedName",transactionData.payPersonName);
    }
    if(transactionData.payPersonPhone!==undefined && transactionData.payPersonPhone!==null)
    {
      transactionObj.setTransactionAttribute("p2pContact",transactionData.payPersonPhone);
    }
    if(transactionData.personId!==undefined && transactionData.personId!==null)
    {
      transactionObj.setTransactionAttribute("personId",transactionData.personId);
    }
     if(transactionData.fromAccountCurrency!==undefined && transactionData.fromAccountCurrency!==null)
    {
      transactionObj.setTransactionAttribute("fromAccountCurrency",transactionData.fromAccountCurrency);
    }
    if(transactionData.toAccountCurrency!==undefined && transactionData.toAccountCurrency!==null)
    {
      transactionObj.setTransactionAttribute("toAccountCurrency",transactionData.toAccountCurrency);
    }
    if (transactionData.transactionCurrency !== undefined && transactionData.transactionCurrency !== null) {
      transactionObj.setTransactionAttribute("transactionCurrency", transactionData.transactionCurrency);
      if (!transactionData.toAccountCurrency)
      	transactionObj.setTransactionAttribute("toAccountCurrency",transactionData.transactionCurrency);
    }
	var name="";
	if (transactionData.fromNickName === null || transactionData.fromNickName === undefined) {
      name = transactionData.fromAccountName;
    }
	else {
      name =transactionData.fromNickName;
        }
    transactionObj.setTransactionAttribute("fromProcessedName",applicationManager.getPresentationUtility().formatText(name, 10, transactionData.fromAccountNumber, 4));
    transactionObj.setTransactionAttribute("disableToAccount",true);
    scope_MoneyMovementPresentationController.commonFunctionForNavigation("frmMMReview");
  };
  /**
   * This method is used to set the transaction to be edited into the transaction object
   * transactionData - {object} data of transaction to be edited.
   */
  MoneyMovement_PresentationController.prototype.setTransactionObject = function(transactionData) {
    var formatUtil = applicationManager.getFormatUtilManager();
    var transactionObj = applicationManager.getTransactionManager();
    var currencyArray = scope_MoneyMovementPresentationController.getCurrencyArray();
	transactionObj.clearTransferObject();
    if (transactionData.transactionId !== undefined && transactionData.transactionId !== null) {
      transactionObj.setTransactionprimaryAttribute({"transactionId":transactionData.transactionId});
    }
    if (transactionData.amount !== undefined && transactionData.amount !== null) {
      var amount = formatUtil.deFormatAmount(transactionData.amount, currencyArray);
      if(Number(amount)<0)
        amount = amount.substring(1);
      transactionObj.setTransactionAttribute("amount",amount);
    }
    if (transactionData.frequencyType !== undefined && transactionData.frequencyType !== null) {
      transactionObj.setTransactionAttribute("frequencyType",transactionData.frequencyType);
    }
    if (transactionData.isScheduled !== undefined && transactionData.isScheduled !== null) {
      if (transactionData.isScheduled === "true")
        transactionObj.setTransactionAttribute("isScheduled","1");
      else
        transactionObj.setTransactionAttribute("isScheduled","0");
    }
    if (transactionData.fromAccountNumber !== undefined && transactionData.fromAccountNumber !== null) {
      var accMan = applicationManager.getAccountManager();
      transactionObj.setTransactionAttribute("fromAccountNumber",transactionData.fromAccountNumber);
      transactionObj.setTransactionAttribute("fromAccountCurrency", accMan.getInternalAccountByID(transactionData.fromAccountNumber).currencyCode);
    }
    if (transactionData.ExternalAccountNumber !== undefined && transactionData.ExternalAccountNumber !== null) {
      transactionObj.setTransactionAttribute("toAccountNumber",transactionData.ExternalAccountNumber);
    }
    if (transactionData.toAccountNumber !== undefined && transactionData.toAccountNumber !== null) {
      transactionObj.setTransactionAttribute("toAccountNumber",transactionData.toAccountNumber);
    }
    if (transactionData.toAccountName !== undefined && transactionData.toAccountName !== null) {
      transactionObj.setTransactionAttribute("toAccountName",transactionData.toAccountName);
       if(transactionData.toAccountNumber)
        transactionObj.setTransactionAttribute("toProcessedName",applicationManager.getPresentationUtility().formatText(transactionData.toAccountName, 10, transactionData.toAccountNumber, 4));
      else if(transactionData.ExternalAccountNumber)
        transactionObj.setTransactionAttribute("toProcessedName",applicationManager.getPresentationUtility().formatText(transactionData.toAccountName, 10, transactionData.ExternalAccountNumber, 4));
    }
    if (transactionData.payPersonName !== undefined && transactionData.payPersonName !== null) {
      transactionObj.setTransactionAttribute("payPersonName",transactionData.payPersonName);
      if (transactionData.nickName !== undefined && transactionData.nickName !== null) {
        transactionObj.setTransactionAttribute("toProcessedName",transactionData.nickName);
      }
      else
        transactionObj.setTransactionAttribute("toProcessedName",transactionData.payPersonName);
    }
    if(transactionData.payPersonPhone!==undefined && transactionData.payPersonPhone!==null)
    {
      transactionObj.setTransactionAttribute("p2pContact",transactionData.payPersonPhone);
    }
    if(transactionData.personId!==undefined && transactionData.personId!==null)
    {
      transactionObj.setTransactionAttribute("personId",transactionData.personId);
    }
    if (transactionData.frequencyStartDate !== undefined && transactionData.frequencyStartDate !== null) {
     // transactionObj.setTransactionAttribute("frequencyStartDate",formatUtil.getFormatedDateString(formatUtil.getDateObjectFromCalendarString(transactionData.frequencyStartDate,formatUtil.getDateFormat()), 'm/d/Y'));
      var startdate = formatUtil.getDateObjectfromString(transactionData.frequencyStartDate, "YYYY-MM-DD");
      var startDate = formatUtil.getFormatedDateString(startdate, formatUtil.getApplicationDateFormat());
      transactionObj.setTransactionAttribute("frequencyStartDate", startDate);
    }
    if (transactionData.numberOfRecurrences !== undefined && transactionData.numberOfRecurrences !== null && transactionData.numberOfRecurrences !== "0") {
      transactionObj.setTransactionAttribute("numberOfRecurrences",transactionData.numberOfRecurrences);
      transactionObj.setTransactionAttribute("duration", applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.NumberOfTransfers"));
    }
    if (transactionData.frequencyEndDate !== undefined && transactionData.frequencyEndDate !== null) {
     // transactionObj.setTransactionAttribute("frequencyEndDate",formatUtil.getFormatedDateString(formatUtil.getDateObjectFromCalendarString(transactionData.frequencyEndDate,formatUtil.getDateFormat()), 'm/d/Y'));
      var enddate = formatUtil.getDateObjectfromString(transactionData.frequencyEndDate, "YYYY-MM-DD");
      var endDate = formatUtil.getFormatedDateString(enddate, formatUtil.getApplicationDateFormat());
      transactionObj.setTransactionAttribute("frequencyEndDate", endDate);
      transactionObj.setTransactionAttribute("duration", applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.frequency.DateRange"));
    }
    if (transactionData.scheduledDate !== undefined && transactionData.scheduledDate !== null) {
      transactionObj.setTransactionAttribute("scheduledDate",transactionData.scheduledDate);
    }
    if (transactionData.scheduledCalendarDate !== undefined && transactionData.scheduledCalendarDate !== null) {
            transactionObj.setTransactionAttribute("scheduledCalendarDate", transactionData.scheduledCalendarDate);
    }
    if (transactionData.fromAccountName !== undefined && transactionData.fromAccountName !== null) {
      transactionObj.setTransactionAttribute("fromAccountName",transactionData.fromAccountName);
    }
    if (transactionData.transactionType !== undefined && transactionData.transactionType !== null) {
      transactionObj.setTransactionAttribute("transactionType",transactionData.transactionType);
    }
    if (transactionData.fromAccountType !== undefined && transactionData.fromAccountType !== null) {
      transactionObj.setTransactionAttribute("fromAccountType",transactionData.fromAccountType);
    }
    if (transactionData.toAccountType !== undefined && transactionData.toAccountType !== null) {
      transactionObj.setTransactionAttribute("toAccountType",transactionData.toAccountType);
    }
    if (transactionData.transactionsNotes !== undefined && transactionData.transactionsNotes !== null) {
      transactionObj.setTransactionAttribute("transactionsNotes",transactionData.transactionsNotes);
    }
    if (transactionData.serviceName !== undefined && transactionData.serviceName !== null) {
      transactionObj.setTransactionAttribute("serviceName",transactionData.serviceName);
    }
    if(transactionData.fromAccountCurrency!==undefined && transactionData.fromAccountCurrency!==null)
    {
      transactionObj.setTransactionAttribute("fromAccountCurrency",transactionData.fromAccountCurrency);
    }
    if(transactionData.toAccountCurrency!==undefined && transactionData.toAccountCurrency!==null)
    {
      transactionObj.setTransactionAttribute("toAccountCurrency",transactionData.toAccountCurrency);
    }
    if (transactionData.transactionCurrency !== undefined && transactionData.transactionCurrency !== null) {
      transactionObj.setTransactionAttribute("transactionCurrency", transactionData.transactionCurrency);
      if (!transactionData.toAccountCurrency)
      	transactionObj.setTransactionAttribute("toAccountCurrency",transactionData.transactionCurrency);
    }
	var name="";
	if (transactionData.fromNickName === null || transactionData.fromNickName === undefined) {
	  name = transactionData.fromAccountName;
    }
	else {
      name =transactionData.fromNickName;
    }
    transactionObj.setTransactionAttribute("fromProcessedName",applicationManager.getPresentationUtility().formatText(name, 10, transactionData.fromAccountNumber, 4));
    transactionObj.setTransactionAttribute("disableToAccount",true);
    scope_MoneyMovementPresentationController.commonFunctionForNavigation("frmMMReview");
  };
  /**
    * This method is used to clear the values in the model definition, reset state management and limit fetch status
    */
  MoneyMovement_PresentationController.prototype.clearMMFlowAtributes=function(){
    this.initializeStateData(false, "");
    scope_MoneyMovementPresentationController.previousAccountType = null;
    scope_MoneyMovementPresentationController.currentAccountType = null;
    scope_MoneyMovementPresentationController.haveLimitsBeenFetched = false;
    scope_MoneyMovementPresentationController.isLoansAccountType = false;
    var transactionManager = applicationManager.getTransactionManager();
    transactionManager.clearTransferObject();
  };
    /**
    * This method is used to build the values for to payee data in the model definition
    * Invokes from accounts service call and navigates to from screen or amount screen depending on whether from account is selected or not
    */
  MoneyMovement_PresentationController.prototype.setP2PToAccountFromManageFlow = function() {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var recipientsManager = applicationManager.getRecipientsManager();
    var data=recipientsManager.getP2PPayeeDetails();
    var transactionObj = applicationManager.getTransactionManager();
    transactionObj.setTransactionAttribute("toProcessedName",data.name);
    if(!data.phone){
      data.primaryContactForSending=data.email;
    }
    else{
      data.primaryContactForSending=data.phone;
    }
    transactionObj.setTransactionAttribute("p2pContact",data.primaryContactForSending);
    transactionObj.setTransactionAttribute("personId",data.PayPersonId);
    transactionObj.setTransactionAttribute("payPersonName",data.name);
    transactionObj.setTransactionAttribute("disableToAccount",true);
    transactionObj.setTransactionAttribute("transactionType","P2P");
    scope_MoneyMovementPresentationController.transactionMode = "PayAPerson";
    var navMan = applicationManager.getNavigationManager();
    var transactionManager = applicationManager.getTransactionManager();
    var fromAccountNumber = transactionManager.getTransactionObject().fromAccountNumber;
    if (fromAccountNumber) {
      scope_MoneyMovementPresentationController.commonFunctionForNavigation("frmMMTransferAmount");
    }
    else {
      scope_MoneyMovementPresentationController.getFromAndToAccounts();
    }
  };
  /**
    * This method is used to build the values for to internal account in the model definition
    * Invokes from account details screen
    * @param {data} selected to internal account
    */
  MoneyMovement_PresentationController.prototype.setTransferToAccountFromAccDetailsFlow=function(data){
    scope_MoneyMovementPresentationController.clearMMFlowAtributes();
    var selectedToAccount=[];
    selectedToAccount.push(data);
    var processedDataValue = scope_MoneyMovementPresentationController.processAccountsData(selectedToAccount, "to");
    var processedData=processedDataValue[0];
    var transactionManager = applicationManager.getTransactionManager();
    transactionManager.setTransactionAttribute("toAccountNumber", processedData["accountID"]);
    transactionManager.setTransactionAttribute("toAccountType", processedData["accountType"]);
    scope_MoneyMovementPresentationController.isLoansAccountType = (processedData["accountType"] === "Loan") ? true : false; 
    transactionManager.setTransactionAttribute("toAccountName", processedData["accountName"]);
    transactionManager.setTransactionAttribute("transactionType", "InternalTransfer");
    transactionManager.setTransactionAttribute("toProcessedName", processedData["processedName"]);
    transactionManager.setTransactionAttribute("bankName", processedData["bankName"]);
    transactionManager.setTransactionAttribute("toAccountCurrency", processedData["toAccountCurrency"]);
    transactionManager.setTransactionAttribute("transactionCurrency", processedData["toAccountCurrency"]);
    transactionManager.setTransactionAttribute("nextPaymentDate", processedData["nextPaymentDate"]);
    transactionManager.setTransactionAttribute("nextPaymentAmount", processedData["nextPaymentAmount"]);
    transactionManager.setTransactionAttribute("paymentDue", processedData["paymentDue"]);
    scope_MoneyMovementPresentationController.getFromAndToAccounts();
  };
  /**
    * This method is used to build the values for to internal account in the model definition
    * Invokes from account details screen
    * @param {data} selected from internal account
    */
   MoneyMovement_PresentationController.prototype.setTransferFromAccountFromAccDetailsFlow = function(data) {
        scope_MoneyMovementPresentationController.clearMMFlowAtributes();		    
        var selectedFromAccount = [];
        selectedFromAccount.push(data);	  
        var processedDataValue = scope_MoneyMovementPresentationController.processAccountsData(selectedFromAccount, "from");
        var processedData = processedDataValue[0];		    
        var transactionManager = applicationManager.getTransactionManager();
        transactionManager.setTransactionAttribute("fromAccountNumber", processedData["accountID"]);		      
        transactionManager.setTransactionAttribute("fromAccountType", processedData["accountType"]);
        transactionManager.setTransactionAttribute("fromAccountName", processedData["accountName"]);		       
        transactionManager.setTransactionAttribute("transactionType", "InternalTransfer");
        transactionManager.setTransactionAttribute("fromProcessedName", processedData["processedName"]);		    
        transactionManager.setTransactionAttribute("bankName", processedData["bankName"]);
     //   scope_MoneyMovementPresentationController.getFromAndToAccounts();		
		if (selectedFromAccount[0].fromAccountCurrency) {
                  transactionManager.setTransactionAttribute("transactionCurrency", selectedFromAccount[0].fromAccountCurrency);
                  transactionManager.setTransactionAttribute("fromAccountCurrency", selectedFromAccount[0].fromAccountCurrency);
              } else {
                  transactionManager.setTransactionAttribute("transactionCurrency", selectedFromAccount[0].currencyCode);
                  transactionManager.setTransactionAttribute("fromAccountCurrency", selectedFromAccount[0].currencyCode);
              }
        scope_MoneyMovementPresentationController.getFromAndToAccounts(scope_MoneyMovementPresentationController.navigateToToAccount);
    };	
  
  MoneyMovement_PresentationController.prototype.setTransactionMode = function(serviceName) {
    switch (serviceName) {
      case "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE":
        scope_MoneyMovementPresentationController.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts");
        break;
      case "INTRA_BANK_FUND_TRANSFER_CREATE":
        scope_MoneyMovementPresentationController.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers");
        break;
      case "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE":
        scope_MoneyMovementPresentationController.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts");
        break;
      case "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE":
        scope_MoneyMovementPresentationController.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer");
        break;
      case "P2P_CREATE":
        scope_MoneyMovementPresentationController.transactionMode = "PayAPerson";
        break;
      default :
        break;
    }
  };
  
  MoneyMovement_PresentationController.prototype.removeLoanAccounts = function(accounts) {
    return accounts.filter(function(account) {
      return account.accountType !== "Loan";
    });
  };
  
  MoneyMovement_PresentationController.prototype.setAmountBasedOnTransactionType = function() {
    var transactionManager = applicationManager.getTransactionManager();
    if (scope_MoneyMovementPresentationController.previousAccountType && (scope_MoneyMovementPresentationController.previousAccountType === "Loan" && scope_MoneyMovementPresentationController.currentAccountType !== "Loan")) {
      transactionManager.setTransactionAttribute("amount", null);
    }
    else if (scope_MoneyMovementPresentationController.previousAccountType && (scope_MoneyMovementPresentationController.previousAccountType !== "Loan" && scope_MoneyMovementPresentationController.currentAccountType === "Loan")) {
      transactionManager.setTransactionAttribute("amount", null);
      transactionManager.setTransactionAttribute("isScheduled", "0");
    }
    else if (scope_MoneyMovementPresentationController.previousAccountType && (scope_MoneyMovementPresentationController.previousAccountType === "Loan" && scope_MoneyMovementPresentationController.currentAccountType === "Loan")) {
      transactionManager.setTransactionAttribute("amount", null);
      transactionManager.setTransactionAttribute("isScheduled", "0");
    }
  };

  MoneyMovement_PresentationController.prototype.getCurrencyFlag = function (currency) {
    var currencyPairFlag = {
      'AUD': 'australiandollar.png',
      'CAD': 'canadiandollar.png',
      'EUR': 'euro.png',
      'GBP': 'britishpound.png',
      'JPY': 'japaneseyen.png',
      'CHF': 'swissfranc.png',
      'USD': 'usdollar.png'
    }
    return currencyPairFlag[currency];
  };

  MoneyMovement_PresentationController.prototype.getCurrencyData = function(){
    var configManager =  applicationManager.getConfigurationManager();
    var segData = [];
    segData.push(
      {
        imgSrc: scope_MoneyMovementPresentationController.getCurrencyFlag('AUD'),
        currencyName: kony.i18n.getLocalizedString('kony.mb.TransfersEurope.AustralianDollar'),
        currencyCode: 'AUD',
        currencySymbol: "(" + configManager.getCurrency('AUD') + ")"
      },
      {
        imgSrc: scope_MoneyMovementPresentationController.getCurrencyFlag('CAD'),
        currencyName: kony.i18n.getLocalizedString('kony.mb.TransfersEurope.CanadianDollar'),
        currencyCode: 'CAD',
        currencySymbol: "(" + configManager.getCurrency('CAD') + ")"
      },
      {
        imgSrc: scope_MoneyMovementPresentationController.getCurrencyFlag('EUR'),
        currencyName: kony.i18n.getLocalizedString('kony.mb.TransfersEurope.Euro'),
        currencyCode: 'EUR',
        currencySymbol: "(" + configManager.getCurrency('EUR') + ")"
      },
      {
        imgSrc: scope_MoneyMovementPresentationController.getCurrencyFlag('GBP'),
        currencyName: kony.i18n.getLocalizedString('kony.mb.TransfersEurope.BritishPound'),
        currencyCode: 'GBP',
        currencySymbol: "(" + configManager.getCurrency('GBP') + ")"
      },
      {
        imgSrc: scope_MoneyMovementPresentationController.getCurrencyFlag('JPY'),
        currencyName: kony.i18n.getLocalizedString('kony.mb.TransfersEurope.JapaneseYen'),
        currencyCode: 'JPY',
        currencySymbol: "(" + configManager.getCurrency('JPY') + ")"
      },
      {
        imgSrc: scope_MoneyMovementPresentationController.getCurrencyFlag('CHF'),
        currencyName: kony.i18n.getLocalizedString('kony.mb.TransfersEurope.SwissFranc'),
        currencyCode: 'CHF',
        currencySymbol: "(" + configManager.getCurrency('CHF') + ")"
      },
      {
        imgSrc: scope_MoneyMovementPresentationController.getCurrencyFlag('USD'),
        currencyName: kony.i18n.getLocalizedString('kony.mb.TransfersEurope.USDollar'),
        currencyCode: 'USD',
        currencySymbol: "(" + configManager.getCurrency('USD') + ")"
      },
      {
        imgSrc: scope_TransfersPresentationController.getCurrencyFlag('USD'),//'australiandollar.png',
        currencyName: 'YER',
        currencyCode: 'YER',
        currencySymbol: "(" + configManager.getCurrency('YER') + ")"
      },
      {
        imgSrc: scope_TransfersPresentationController.getCurrencyFlag('USD'),//'australiandollar.png',
        currencyName: 'SAR',
        currencyCode: 'SAR',
        currencySymbol: "(" + configManager.getCurrency('SAR') + ")"
      }
    );
    return segData;
  };
  
  MoneyMovement_PresentationController.prototype.getCurrencyArray = function() {
    var configManager = applicationManager.getConfigurationManager();
    var currencyArray = [];
    var currencyObject = configManager.currencyCode;
    for (var key in currencyObject) {
      currencyArray.push(currencyObject[key]);
    }
    return currencyArray;
  };
  
  MoneyMovement_PresentationController.prototype.filterToAccountsByMembershipId = function(membershipId, toAccounts) {
    var recipientsManager = applicationManager.getRecipientsManager();
    var filteredToAccount = recipientsManager.filterToAccountsByMembershipId(membershipId, toAccounts);
    return filteredToAccount;
  },
    
    MoneyMovement_PresentationController.prototype.filterFromAccountBasedOnCIF = function(fromAccounts) {
      var navMan = applicationManager.getNavigationManager();
      var entryPoint = navMan.getEntryPoint("makeatransferMoneyModule");
      var benificiaryDetails;
      if(entryPoint === "frmManageP2pRecipient"){
        var PayAPersonPresentationController = applicationManager.getModulesPresentationController("PayAPersonModule");
        benificiaryDetails = PayAPersonPresentationController.getP2PPayeeDetails();
      } else{ 
        var transferModPresentationController = applicationManager.getModulesPresentationController("TransferEuropeUIModule");
        benificiaryDetails = transferModPresentationController.getBenificiaryData();     
      }
      if(benificiaryDetails.cif !== undefined  && benificiaryDetails.cif !== null){
        var toMemId = JSON.parse(benificiaryDetails.cif)[0].coreCustomerId.split(',');
        fromAccounts.filter(x => {
          return toMemId.includes(x.membershipID)
        });
      }

      return fromAccounts;
    }

  return MoneyMovement_PresentationController;
});