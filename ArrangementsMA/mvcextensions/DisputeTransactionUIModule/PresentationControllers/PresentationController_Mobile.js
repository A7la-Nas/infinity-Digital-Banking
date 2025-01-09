define([], function() {
  /**
     * User defined presentation controller
     * @constructor
     * @extends kony.mvc.Presentation.BasePresenter
     */
  function DisputeTransactions_PresentationController() {
    scope_DisputeTransactionsPresentationController = this;
    scope_DisputeTransactionsPresentationController.disputeTransactionList=[];
    scope_DisputeTransactionsPresentationController.isRequestCancelled = false;
    scope_DisputeTransactionsPresentationController.disputeData={};
    kony.mvc.Presentation.BasePresenter.call(this);
  }

  inheritsFrom(DisputeTransactions_PresentationController, kony.mvc.Presentation.BasePresenter);

  /**
     * Overridden Method of kony.mvc.Presentation.BasePresenter
     * This method gets called when presentation controller gets initialized
     * @method
     */
  DisputeTransactions_PresentationController.prototype.initializePresentationController = function() {

  };
  DisputeTransactions_PresentationController.prototype.commonFunctionForNavigation = function(formName) {
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo(formName);
//    new kony.mvc.Navigation(formName).navigate();
  };
  DisputeTransactions_PresentationController.prototype.navigateToDisputeReason = function(formName) {
    scope_DisputeTransactionsPresentationController.disputeData={};
    scope_DisputeTransactionsPresentationController.commonFunctionForNavigation(formName);
  };

  /**
       * This method is used to handle the backward navigation including state management
       */
  DisputeTransactions_PresentationController.prototype.commonFunctionForgoBack = function() {
    var navManager = applicationManager.getNavigationManager();
    //       var currentForm = kony.application.getCurrentForm();
    // If state management is triggered and if it is not on the state triggered form then we will navigate to state triggered form and ignoring it's entry(passing additional parameter boolean along with the form name to navigateTo method) into the navigation stack as the form is being re-visited
    //         if(scope_TransfersPresentationController.stateNavigation && scope_TransfersPresentationController.stateTriggeredForm!==currentForm.id){
    //           navManager.navigateTo(scope_TransfersPresentationController.stateTriggeredForm,true);
    //           scope_TransfersPresentationController.stateNavigation=false;
    //           scope_TransfersPresentationController.stateTriggeredForm="";
    //         }
    //         // This is triggered when the forms entry into navigation manager's stack is equal to one .
    //         else{
    navManager.goBack();
    //         }
  };
  DisputeTransactions_PresentationController.prototype.getDisputeTransactionDetails = function() {
    var transactionObj = applicationManager.getAccountManager();
    var jsondata={"offset":0,"limit":10,"sortBy":"disputeDate","order":"desc","transactionType":"DisputedTransactionRequest"}
    transactionObj.getDisputedTransactions({},scope_DisputeTransactionsPresentationController.getDisputeTransactionDetailsPresSucCallback,scope_DisputeTransactionsPresentationController.getDisputeTransactionDetailsPreErrCallback);
  };
  DisputeTransactions_PresentationController.prototype.getDisputeTransactionDetailsPresSucCallback = function(resSucc) {
    scope_DisputeTransactionsPresentationController.disputeTransactionList=resSucc;
    scope_DisputeTransactionsPresentationController.commonFunctionForNavigation({"appName" : "ArrangementsMA", "friendlyName" : "frmDisputedTransactionsList" });
  };

  DisputeTransactions_PresentationController.prototype.getDisputeTransactionDetailsPreErrCallback = function(errres) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (errres["isServerUnreachable"]) {
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errres.errorMessage);
    }    
  };
  DisputeTransactions_PresentationController.prototype.getAlldisputeTransactions = function() {
    return  scope_DisputeTransactionsPresentationController.disputeTransactionList;
  };
  /**
   * This method is used to cancel a transaction
   * data - {string} transactionId of the transaction
   * deleteSuccess  {callBack Function} - This method is the success callback on cancelling a transfer
   * deleteError {callBack Function} - This method is the error callback on cancelling a transfer
   */
  DisputeTransactions_PresentationController.prototype.deleteTransaction = function(transactionData) {
    var criteria = {
      "transactionId": transactionData.transactionId,
      "transactionType" : transactionData.transactionType
    };
    var transactionManager = applicationManager.getTransactionManager();
    transactionManager.deleteDisputeTransaction(criteria, scope_DisputeTransactionsPresentationController.deleteSuccess, scope_DisputeTransactionsPresentationController.deleteError);
  };

  DisputeTransactions_PresentationController.prototype.deleteSuccess = function(res) {
    var navManager = applicationManager.getNavigationManager();
    var selectedTransaction = navManager.getCustomInfo("frmDisputedTransactionsList");
    scope_DisputeTransactionsPresentationController.isRequestCancelled = true;
    scope_DisputeTransactionsPresentationController.updateDetailsInPostedTransaction(selectedTransaction,"cancelDispute");
    scope_DisputeTransactionsPresentationController.getDisputeTransactionDetails();
  };
  /**
   * This method is the error callback on cancelling a transaction
   * err - {object} error response
   */
  DisputeTransactions_PresentationController.prototype.deleteError = function(err) {
    if (err["isServerUnreachable"]) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    } else {

    }
  };
  DisputeTransactions_PresentationController.prototype.updateDisputeReason = function(data) {
    scope_DisputeTransactionsPresentationController.disputeData.disputeReason=data;
  };
  DisputeTransactions_PresentationController.prototype.updateDisputeDescription = function(data) {
    scope_DisputeTransactionsPresentationController.disputeData.disputeDescription=data;
  };
  DisputeTransactions_PresentationController.prototype.getDisputeData = function() {
    return scope_DisputeTransactionsPresentationController.disputeData;
  };
  DisputeTransactions_PresentationController.prototype.createDisputeTransaction = function(transactionData) {
    var criteria ={
      "transactionId":transactionData.transactionId || transactionData.transactionReferenceNumber,
      "disputeReason":(transactionData.disputeReason),
      "disputeDescription":(transactionData.disputeDescription),
      "transactionType": transactionData.transactionType !== "T" ? transactionData.transactionType : "CardPayment",
      'transactionsNotes': transactionData.transactionsNotes || "",
      'amount': transactionData.amount || transactionData.transactionAmount,
      'description': transactionData.description || "",
      'fromAccountName': transactionData.fromAccountName || "",
      'fromAccountNumber': transactionData.fromAccountNumber || "",
      'fromAccountType': transactionData.fromAccountType || "",
      'toAccountType': transactionData.toAccountType || "",
      'toAccountName': transactionData.toAccountName || transactionData.payeeName || transactionData.payeeNickName || "", 
      'toAccountNumber': transactionData.toAccountNumber || transactionData.ExternalAccountNumber || transactionData.payeeId || "",
      'transactionDate': transactionData.transactionDate,
      'secureMessageId': '',
      'merchantCity': transactionData.transactionMerchantCity || "",
      'merchantAddressName': transactionData.transactionMerchantAddressName || ""
    }

    var transactionObj = applicationManager.getTransactionsListManager();
    transactionObj.createDisputedTransaction(criteria, scope_DisputeTransactionsPresentationController.createDisputeTransactionSuccess.bind(this, transactionData), scope_DisputeTransactionsPresentationController.createDisputeTransactionError.bind(this));
  };

  DisputeTransactions_PresentationController.prototype.createDisputeTransactionSuccess = function(input, res) {
    if(applicationManager.getConfigurationManager().isMicroAppPresent("SecureMessageMA")){
    scope_DisputeTransactionsPresentationController.sendDisputeMessage(input, res);
    }
    else{
      scope_DisputeTransactionsPresentationController.sendDisputeMessageSuccess(input, res, {})
    }

  };

  DisputeTransactions_PresentationController.prototype.sendDisputeMessage = function (input, res) {
    var scopeObj = this;
    // "requestid": requestParams.requestid,
    var messagedescription = 'A new Dispute Request has been raised with the following details.<br><br>'+
        '... DO NOT EDIT BELOW THIS LINE ...<br>' + 
        'Reason for Dispute: ' + (input.reason || input.disputeReason || '-') + '<br>' +
        'Description: ' + (input.description || input.disputeDescription || '-') + '<br>' + 
        'From: ' + (input.fromAccountNumber || '-') + '<br>' + 
        'To: ' + (input.toAccount || input.toAccountName || input.payeeName || input.payeeNickName || '-') + '<br>' + 
        'TransactionDate: ' + (input.date  || input.transactionDate || '-') + '<br>' +
        'Transaction Type: ' + (input.types || input.transactionType || '-') + '<br>' +
        'Amount: ' + (input.amount || input.transactionAmount || '-') + '<br>' +
        'Reference Number: ' + (input.referenceNumber || input.transactionId || input.transactionReferenceNumber || '-') + '<br>' +
        'Notes: ' + (input.transactionsNotes || '-');
    var messagesManager = applicationManager.getMessagesManager();
    messagedescription = Base64.encode(messagedescription);
    var requestMessageInputs = {      
      //osama //"requestsubject": "Dispute Transaction Request #" + res.referenceId,
      "requestsubject": "Dispute Transaction Request with Id" + res.referenceId,
      "messagedescription": messagedescription,
      "requestcategory_id": "RCID_DISPUTETRANSACTION"
    }
    messagesManager.createNewRequest(
      requestMessageInputs,
      scopeObj.sendDisputeMessageSuccess.bind(scopeObj, input, res),
      scopeObj.sendDisputeMessageError.bind(scopeObj, input, res.referenceId)
    );
  };

  DisputeTransactions_PresentationController.prototype.sendDisputeMessageSuccess = function (input, res, response) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var transactionData = navManager.getCustomInfo("frmDisputeTransactionDetails");
    transactionData.disputeReference = res.referenceId;
    navManager.setCustomInfo("frmDisputeTransactionDetails",transactionData);
    //As Service call is happening everytime, No need of making isDisputed to true condition
    /*if (navManager.getEntryPoint("DisputeEntry") !== "frmCardTransactionDetails") {
      scope_DisputeTransactionsPresentationController.updateDetailsInPostedTransaction(transactionData,"createDispute");
    }*/
    scope_DisputeTransactionsPresentationController.commonFunctionForNavigation({"appName" : "ArrangementsMA", "friendlyName" : "frmDTAcknowledgement"});
  };

  DisputeTransactions_PresentationController.prototype.sendDisputeMessageError = function (input, referenceId, err) {
    if (err["isServerUnreachable"]) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    } else {
      var navManager = applicationManager.getNavigationManager();
      var transactionData = navManager.getCustomInfo("frmDisputeTransactionDetails");
      transactionData.errmsg = err.errorMessage;
      transactionData.disputeReference = referenceId;
      transactionData.isMesssageError = true;
      navManager.setCustomInfo("frmDisputeTransactionDetails",transactionData);
      scope_DisputeTransactionsPresentationController.commonFunctionForNavigation({"appName" : "ArrangementsMA", "friendlyName" : "frmDTAcknowledgement"});
    }
  };
  DisputeTransactions_PresentationController.prototype.updateDetailsInPostedTransaction = function(transactionData,type) {
    var navManager = applicationManager.getNavigationManager();
    var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
    if( accountsDetails.selectedAccountData["type"].toLowerCase().trim() === "internal"){
      var postedTransactions = accountsDetails.postedTransaction;
      for(var i=0;i<postedTransactions.length;i++){
        if(postedTransactions[i].transactionId &&(postedTransactions[i].transactionId===transactionData.transactionId)){
          if(type=="createDispute"){
            postedTransactions[i].isDisputed = "true";
          }
          else{
            postedTransactions[i].isDisputed = "false";
            if(navManager.getEntryPoint("ViewRequest")=="TransactionDetails"){
              scope_DisputeTransactionsPresentationController.updateDetailsInTransactionDetails(transactionData);
            }
          }
        }
      }
      accountsDetails.postedTransaction=postedTransactions;
      navManager.setCustomInfo("frmAccountDetails",accountsDetails);
    }
    else{
      var externalPostedTransactions = accountsDetails.externalPostedTransactions;
      for(var i=0;i<externalPostedTransactions.length;i++){
        if(externalPostedTransactions[i].transactionId &&(externalPostedTransactions[i].transactionId===transactionData.transactionId)){
          if(type=="createDispute"){
            externalPostedTransactions[i].isDisputed = "true";
          }
          else{
            externalPostedTransactions[i].isDisputed = "false";
          }
        }
      }
      accountsDetails.externalPostedTransactions=externalPostedTransactions;
      navManager.setCustomInfo("frmAccountDetails",accountsDetails);
    }

  }
  DisputeTransactions_PresentationController.prototype.updateDetailsInTransactionDetails = function(transactionData){
    var navManager = applicationManager.getNavigationManager();
    var MMtransactionData =navManager.getCustomInfo("frmMMTransactionDetails");
    var europeTransactionData = navManager.getCustomInfo("frmEuropeTransactionDetails");
    var OthertransactionData =navManager.getCustomInfo("frmAccountsTransactionDetails");
    if(MMtransactionData && MMtransactionData.transactionId===transactionData.transactionId){
      MMtransactionData.isDisputed=false;
      navManager.setCustomInfo("frmMMTransactionDetails",MMtransactionData);
    }
    else if(OthertransactionData && OthertransactionData.transactionId===transactionData.transactionId){
      OthertransactionData.isDisputed=false;
      navManager.setCustomInfo("frmAccountsTransactionDetails",OthertransactionData);
    }
    else if (europeTransactionData && europeTransactionData.transactionId === transactionData.transactionId) {
      europeTransactionData.isDisputed = false;
      navManager.setCustomInfo("frmEuropeTransactionDetails",europeTransactionData);
    }
    navManager.setEntryPoint("ViewRequest","");
  }
  /**
   * This method is the error callback on cancelling a transaction
   * err - {object} error response
   */
  DisputeTransactions_PresentationController.prototype.createDisputeTransactionError = function(err) {
    if (err["isServerUnreachable"]) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    } else {
      var navManager = applicationManager.getNavigationManager();
      var transactionData = navManager.getCustomInfo("frmDisputeTransactionDetails");
      transactionData.errmsg = err.errorMessage;
      navManager.setCustomInfo("frmDisputeTransactionDetails",transactionData);
      scope_DisputeTransactionsPresentationController.commonFunctionForNavigation({"appName" : "ArrangementsMA", "friendlyName" : "frmDTAcknowledgement"});
    }
  };

  DisputeTransactions_PresentationController.prototype.fetchDisputeConfiguration = function(callback) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var config = applicationManager.getConfigurationManager();
    var param = {
      "bundle_name": "DBP"
    };
    config.fetchDisputeConfigurations(param, scope_DisputeTransactionsPresentationController.fetchDisputeConfigurationSuccessCallback.bind(this, callback), scope_DisputeTransactionsPresentationController.fetchDisputeConfigurationErrorCallback);
  };

  DisputeTransactions_PresentationController.prototype.fetchDisputeConfigurationSuccessCallback = function(callback, res) {
    var configManager = applicationManager.getConfigurationManager();
    var configurationArray = res;
    configurationArray.forEach(function(arrayItem) {
      if (arrayItem["key"] && arrayItem["key"] === "DISPUTE_DURATION") {
        configManager.setDisputeDuration(Number(arrayItem["value"]));
      }
      if (arrayItem["key"] && arrayItem["key"] === "DISPUTE_REASON_CONFIG") {
        var disputeReasonsObject = JSON.parse(arrayItem["value"]);
        configManager.setDisputeReasons(disputeReasonsObject.disputeTransactionErrors);
      }
      if (arrayItem["key"] && arrayItem["key"] === "DISPUTE_TRANSACTION_TYPE_CONFIG") {
        var disputeScenariosObject = JSON.parse(arrayItem["value"]);
        configManager.setDisputeConfigMap(disputeScenariosObject.disputeScenariosConfig);
      }
      if (arrayItem["key"] && arrayItem["key"] === "DISPUTE_TRANSACTION_CONFIG") {
        var disputeScenariosObjectCD = JSON.parse(arrayItem["value"]);
        configManager.setDisputeCDConfigMap(disputeScenariosObjectCD.disputeTransferConfig);
      }
    });
    configManager.isDisputeConfigurationAdded = true;
    var navManager = applicationManager.getNavigationManager();
    if(callback) 
      callback();
    else 
      navManager.navigateTo({
            "appName": "CardsMA",
            "friendlyName": "frmCardTransactionDetails"
        });
  };

  DisputeTransactions_PresentationController.prototype.fetchDisputeConfigurationErrorCallback = function(err) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (err["isServerUnreachable"]) {
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    }
  };

  return DisputeTransactions_PresentationController;
});
