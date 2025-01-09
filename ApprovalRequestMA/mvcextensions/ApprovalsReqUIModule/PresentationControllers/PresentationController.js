define(["CommonUtilities", "OLBConstants"], function(CommonUtilities, OLBConstants) {
  /**
     * User defined presentation controller
     * @constructor
     * @extends kony.mvc.Presentation.BasePresenter
     */
  function ApprovalsReqModule_PresentationController() {
    kony.mvc.Presentation.BasePresenter.call(this);
    this.initializePresentationController();
    this.ApprovalsData = {
      "pendingApprovals": [{
        "requestId": "1",
        "featureActionId": "Approve",
        "transactionId": "",
        "contractId": "",
        "companyId": "",
        "accountId": "",
        "status": "",
        "createdby": "Chuwudi Udo",
        "amIApprover": "",
        "amICreator": "",
        "requiredApprovals": "",
        "receivedApprovals": "",
        "actedByMeAlready": "",
        "requestType": "New Request",
        "processingDate": "12/10/2020",
        "createdts": "",
        "approveType": "Bulk Payment",
      }, {
        "requestId": "2",
        "featureActionId": "Approve",
        "transactionId": "",
        "contractId": "",
        "companyId": "",
        "accountId": "",
        "status": "",
        "createdby": "Hubert Franck",
        "amIApprover": "",
        "amICreator": "",
        "requiredApprovals": "",
        "receivedApprovals": "",
        "actedByMeAlready": "",
        "requestType": "Edit Request",
        "processingDate": "11/10/2020",
        "createdts": "",
        "approveType": "Bulk Payment",
      }, {
        "requestId": "3",
        "featureActionId": "Approve",
        "transactionId": "",
        "contractId": "",
        "companyId": "",
        "accountId": "",
        "status": "",
        "createdby": "Quinten Kortum",
        "amIApprover": "",
        "amICreator": "",
        "requiredApprovals": "",
        "receivedApprovals": "",
        "actedByMeAlready": "",
        "requestType": "Delete Request",
        "processingDate": "10/10/2020",
        "createdts": "",
        "approveType": "ACH Transfer",
      }, {
        "requestId": "4",
        "featureActionId": "Approve",
        "transactionId": "",
        "contractId": "",
        "companyId": "",
        "accountId": "",
        "status": "",
        "createdby": "Shrinline Dungey",
        "amIApprover": "",
        "amICreator": "",
        "requiredApprovals": "",
        "receivedApprovals": "",
        "actedByMeAlready": "",
        "requestType": "New Reuest",
        "processingDate": "10/02/2020",
        "createdts": "",
        "approveType": "Bulk Payment",
      }, ],
      "approvalHistory": [{
        "requestId": "1",
        "featureActionId": "View Payment",
        "transactionId": "",
        "contractId": "",
        "companyId": "",
        "accountId": "",
        "status": "Approved",
        "createdby": "Chukwudi Udo",
        "amIApprover": "",
        "amICreator": "",
        "requiredApprovals": "",
        "receivedApprovals": "",
        "actedByMeAlready": "",
        "requestType": "",
        "processingDate": "11/10/2020",
        "createdts": "",
        "approveType": "Bulk Payment",
        "approveDate": "01/01/2020"
      },
                          {
                            "requestId": "2",
                            "featureActionId": "View Payment",
                            "transactionId": "",
                            "contractId": "",
                            "companyId": "",
                            "accountId": "",
                            "status": "Rejected",
                            "createdby": "Hubert Franck",
                            "amIApprover": "",
                            "amICreator": "",
                            "requiredApprovals": "",
                            "receivedApprovals": "",
                            "actedByMeAlready": "",
                            "requestType": "",
                            "processingDate": "10/10/2020",
                            "createdts": "",
                            "approveType": "Bulk Payment",
                            "approveDate": "01/01/2020"
                          },
                          {
                            "requestId": "3",
                            "featureActionId": "View Payment",
                            "transactionId": "",
                            "contractId": "",
                            "companyId": "",
                            "accountId": "",
                            "status": "Approved",
                            "createdby": "Quinten Kortum",
                            "amIApprover": "",
                            "amICreator": "",
                            "requiredApprovals": "",
                            "receivedApprovals": "",
                            "actedByMeAlready": "",
                            "requestType": "",
                            "processingDate": "09/10/2020",
                            "createdts": "",
                            "approveType": "Bulk Payment",
                            "approveDate": "01/01/2020"
                          },
                         ],
    };
    this.MultiApprovalAckData=[];
    this.count=0;
    this.selectedData=[];
  }

  inheritsFrom(ApprovalsReqModule_PresentationController, kony.mvc.Presentation.BasePresenter);

  /**
     * Overridden Method of kony.mvc.Presentation.BasePresenter
     * This method gets called when presentation controller gets initialized
     * @method
     */
  ApprovalsReqModule_PresentationController.prototype.getMultiApprovalAckData = function() {
    return this.MultiApprovalAckData;
  };
  ApprovalsReqModule_PresentationController.prototype.setMultiApprovalAckData = function(AckData) {
    this.MultiApprovalAckData.push(AckData);
  };

  ApprovalsReqModule_PresentationController.prototype.clearMultiApprovalData = function() {
    this.MultiApprovalAckData = [];
    this.count = 0;
    this.selectedData = [];
  };

  ApprovalsReqModule_PresentationController.prototype.setCount = function(count) {
    this.count=count;
  };
  ApprovalsReqModule_PresentationController.prototype.getCount = function() {
    return this.count;
  };
  ApprovalsReqModule_PresentationController.prototype.setSelectedData = function(selectedData) {
    this.selectedData=selectedData;
  };
  ApprovalsReqModule_PresentationController.prototype.getSelectedData = function() {
    return this.selectedData;
  };

  ApprovalsReqModule_PresentationController.prototype.getApprovalsData = function() {
    return JSON.parse(JSON.stringify(this.ApprovalsData));
  };

  ApprovalsReqModule_PresentationController.prototype.initializePresentationController = function() {
    this.ACHManager = applicationManager.getApprovalsReqManager();
    this.ApprovalsReqManager = applicationManager.getApprovalsReqManager();
    this.navManager = applicationManager.getNavigationManager();															
  };



  /*
     * Method to check permissions
     */
  ApprovalsReqModule_PresentationController.prototype.checkUserPermission = function(permission) {
    return applicationManager.getConfigurationManager().checkUserPermission(permission);
  };

  ApprovalsReqModule_PresentationController.prototype.checkAtLeastOnePermission = function(permissions) {
    return permissions.some(this.checkUserPermission);
  };

  /**
     * noServiceNavigate :  This method navigates to the froms screen without any service call
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} navObj - Navigation with SUccess and Failure flows
     * @return {} 
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.noServiceNavigate = function(navObj) {
    applicationManager.getNavigationManager().navigateTo(navObj.onSuccess.form);
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObj.onSuccess.form);
    applicationManager.getNavigationManager().updateForm({
      "key": navObj.onSuccess.context.key,
      "responseData": navObj.requestData
    }, navObj.onSuccess.form);
  };

  ApprovalsReqModule_PresentationController.prototype.noServiceNavigation = function(navObj) {
    applicationManager.getNavigationManager().navigateTo(
      {"appName" : navObj.onSuccess.appName, 
       "friendlyName" : navObj.onSuccess.module+"/"+navObj.onSuccess.form}
    );
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObj.onSuccess.form);
    applicationManager.getNavigationManager().updateForm({
      "key": navObj.onSuccess.context.key,
      "responseData": navObj.requestData
    }, navObj.onSuccess.form);
  };

  /**
     * dataProcessorForGenTransaction :  General Transaction Data Processing
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} response - Raw response form the Service call
     * @return {JSON Object} response -  Massaged/formatted JSON data of the Transactions 
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.dataProcessorForGenTransaction = function(response) {
    response = response.BBGeneralTransaction;
    response.forEach(function(transaction) {
      transaction.Payee = {
        text: kony.sdk.isNullOrUndefined(transaction.payeeName) ? kony.sdk.isNullOrUndefined(transaction.Payee) ? "N/A" : CommonUtilities.truncateStringWithGivenLength(transaction.Payee, 15) : CommonUtilities.truncateStringWithGivenLength(transaction.payeeName, 15),
        toolTip: kony.sdk.isNullOrUndefined(transaction.payeeName) ? kony.sdk.isNullOrUndefined(transaction.Payee) ? "N/A" : transaction.Payee : transaction.payeeName
      };
      transaction.TransactionType = {
        text: kony.sdk.isNullOrUndefined(transaction.featureName) ? "N/A" : CommonUtilities.truncateStringWithGivenLength(transaction.featureName, 18),
        toolTip: kony.sdk.isNullOrUndefined(transaction.featureName) ? "N/A" : transaction.featureName
      };
      transaction.userName = {
        text: kony.sdk.isNullOrUndefined(transaction.userName) ? "N/A" : transaction.userName, //CommonUtilities.truncateStringWithGivenLength(transaction.userName, 15),
        toolTip: kony.sdk.isNullOrUndefined(transaction.userName) ? "N/A" : transaction.userName
      };
      transaction.Action = "Withdraw";
      transaction.flxBtnReject = {
        "isVisible": false,
        "width": transaction.btnViewDetails
      };
      transaction.flxTrActions1 = {
        "width": transaction.btnViewDetails
      };
      if (transaction.Status.toLowerCase() === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase()) {
        transaction.flxBtnReject.isVisible = true;
      }
      transaction.Frequency = kony.sdk.isNullOrUndefined(transaction.Frequency) ? "N/A" : transaction.Frequency;
      transaction.Reccurence = kony.sdk.isNullOrUndefined(transaction.Reccurence) ? "N/A" : transaction.Reccurence;
      transaction.Amount = CommonUtilities.formatCurrencyWithCommas(transaction.Amount, true);
      transaction.Date = CommonUtilities.getFrontendDateStringInUTC(transaction.TransactionDate, "mm/dd/yyyy");
      if (transaction.Status === BBConstants.TRANSACTION_STATUS.REJECTED) {
        transaction.Approval = 1 + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Rejection");
      } else if (transaction.Status === BBConstants.TRANSACTION_STATUS.WITHDRAWN) {
        transaction.Approval = 1 + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Withdrawn");
      } else if (transaction.Status.toLowerCase() === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase()) {
        transaction.Approval = transaction.receivedApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + " " + transaction.requiredApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Approved");
      } else if (!kony.sdk.isNullOrUndefined(transaction.requiredApprovals)) {
        transaction.Approval = transaction.requiredApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Approvals");
      } else {
        transaction.Approval = "N/A";
      }
      transaction.isBusinessAccount = {
        text: transaction.DebitOrCreditAccount
      };
      transaction.DebitAccount = {
        text: kony.sdk.isNullOrUndefined(CommonUtilities.getMaskedAccName(transaction.DebitOrCreditAccount)[0]) ? "-" : CommonUtilities.getMaskedAccName(transaction.DebitOrCreditAccount)[0],
        toolTip: kony.sdk.isNullOrUndefined(CommonUtilities.getMaskedAccName(transaction.DebitOrCreditAccount)[1]) ? "-" : CommonUtilities.getMaskedAccName(transaction.DebitOrCreditAccount)[1]
      };
      transaction.DebitOrCreditAccount = {
        text: kony.sdk.isNullOrUndefined(CommonUtilities.getMaskedAccName(transaction.DebitOrCreditAccount)[0]) ? "-" : CommonUtilities.getMaskedAccName(transaction.DebitOrCreditAccount)[0],
        toolTip: kony.sdk.isNullOrUndefined(CommonUtilities.getMaskedAccName(transaction.DebitOrCreditAccount)[1]) ? "-" : CommonUtilities.getMaskedAccName(transaction.DebitOrCreditAccount)[1]
      };
    });
    return (response);
  };

  /**
     * fetchTransactionRequests :  This method fetches the requests made by the user that are related to transactions
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} navObj - Navigation with SUccess and Failure flows
     * @return {} 
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.fetchTransactionRequests = function(navObj) {
    var scopeObj = this;
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObj.onSuccess.form);
    scopeObj.ApprovalsReqManager.fetchAllTransactionRequests(
      navObj.requestData,
      scopeObj.completeSuccessCall.bind(scopeObj, navObj, "transactionRequestsSuccess"),
      scopeObj.completeFailedCall.bind(scopeObj, navObj, "showTransactionRequestsFailure")
    );
  };


  /**
     * transactionRequestsSuccess :  Success callback - which is invoked after fetching transaction requests successfully
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} response - Raw response form the Service call
     * @return {JSON Object} response -  Massaged/formatted JSON data of the Transactions 
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.transactionRequestsSuccess = function(response) {
    response.BBGeneralTransaction.forEach(function(responseObj) {
      var widgets = 1;
      if (responseObj.Status.toLowerCase() === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase()) {
        if (!kony.sdk.isNullOrUndefined(responseObj.amIApprover) && (responseObj.amIApprover === "true")) {
          widgets = widgets + 1;
        }

      }
      var orientationHandler = new OrientationHandler();
      orientationHandler.onOrientationChange(this.onBreakpointChange);
      var break_point = kony.application.getCurrentBreakpoint();
      if (break_point === 640 || orientationHandler.isMobile) {
        var width = (100 - widgets) / widgets;
        var widthValue = width + "%";
        responseObj.flxBtnReject = widthValue;
        responseObj.btnViewDetails = widthValue;
        responseObj.flxTrActions1 = widthValue;

      }
    });
    return this.dataProcessorForGenTransaction(response);
  };


  /**
     * showTransactionRequestsFailure :  Failure callback - which is invoked when fetching of transaction requests is failed
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} responseError - Respose Error from the Service call 
     * @return {JSON Object} responseError - Respose Error from the Service call  
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.showTransactionRequestsFailure = function(responseError) {
    return (responseError);
  };


  /**
     * fetchACHTransactionRequests :  This method fetches the requests made by the user that are related to ACH transactions
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} navObj - Navigation with SUccess and Failure flows
     * @return {} 
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.fetchACHTransactionRequests = function(navObj) {
    var scopeObj = this;
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObj.onSuccess.form);

    scopeObj.ApprovalsReqManager.fetchAllACHTransactionRequests(
      navObj.requestData,
      scopeObj.completeSuccessCall.bind(scopeObj, navObj, "ACHTransactionRequestsSuccess"),
      scopeObj.completeFailedCall.bind(scopeObj, navObj, "ACHTransactionRequestsFailure")
    );
  };


  /**
     * transactionRequestsSuccess :  Success callback - which is invoked after fetching ACH transaction requests successfully
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} response - Raw response form the Service call
     * @return {JSON Object} response -  Massaged/formatted JSON data of the Transactions 
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.ACHTransactionRequestsSuccess = function(response) {
    response = response.ACHTransactions;
    response.forEach(function(achTransactionObj) {
      if (achTransactionObj.RequestType.includes("PPD") || achTransactionObj.RequestType.includes("CCD") || achTransactionObj.RequestType.includes("CTX")) {
        achTransactionObj.RequestType = (achTransactionObj.RequestType).substring(0, 3) + " " + achTransactionObj.TransactionTypeValue;
      }

      var break_point = kony.application.getCurrentBreakpoint();
      if (break_point === 640) {
        achTransactionObj.TemplateName = {
          text: achTransactionObj.TemplateName, // CommonUtilities.truncateStringWithGivenLength(achTransactionObj.TemplateName, 27),
          toolTip: achTransactionObj.TemplateName
        };
        achTransactionObj.DebitOrCreditAccount = {
          text: CommonUtilities.truncateStringWithGivenLength(achTransactionObj.AccountName + "....", 27) + CommonUtilities.getLastFourDigit(achTransactionObj.DebitAccount),
          toolTip: achTransactionObj.AccountName + "...." + CommonUtilities.getLastFourDigit(achTransactionObj.DebitAccount)
        };
      } else {
        achTransactionObj.TemplateName = {
          text: achTransactionObj.TemplateName, //CommonUtilities.truncateStringWithGivenLength(achTransactionObj.TemplateName, 15),
          toolTip: achTransactionObj.TemplateName
        };
        achTransactionObj.DebitOrCreditAccount = {
          text: CommonUtilities.truncateStringWithGivenLength(achTransactionObj.AccountName + "....", 16) + CommonUtilities.getLastFourDigit(achTransactionObj.DebitAccount),
          toolTip: achTransactionObj.AccountName + "...." + CommonUtilities.getLastFourDigit(achTransactionObj.DebitAccount)
        };
      }
      achTransactionObj.userName = {
        text: achTransactionObj.userName, // CommonUtilities.truncateStringWithGivenLength(achTransactionObj.userName, 15),
        toolTip: achTransactionObj.userName
      };
      achTransactionObj.Amount = CommonUtilities.formatCurrencyWithCommas(achTransactionObj.TotalAmount, true);
      achTransactionObj.Action = "Withdraw";
      achTransactionObj.flxBtnReject = {
        "isVisible": false
      };
      achTransactionObj.flxTrActions1 = {
        "isVisible": true
      };
      if (achTransactionObj.Status.toLowerCase() === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase()) {
        achTransactionObj.flxBtnReject.isVisible = true;
        var break_point = kony.application.getCurrentBreakpoint();
        if (break_point === 640) {
          achTransactionObj.flxBtnReject.width = "49%";
          achTransactionObj.flxTrActions1.width = "49%";
        }
      } else
        achTransactionObj.flxTrActions1.width = "100%";
      achTransactionObj.CreatedOn = CommonUtilities.getFrontendDateStringInUTC(achTransactionObj.CreatedOn, "mm/dd/yyyy");
      achTransactionObj.TransmittedDate = achTransactionObj.CreatedOn;
      if (achTransactionObj.Status.toLowerCase() === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase()) {
        achTransactionObj.Approval = achTransactionObj.receivedApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + " " + achTransactionObj.requiredApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Approved");
      } else if (achTransactionObj.Status === BBConstants.TRANSACTION_STATUS.REJECTED) {
        achTransactionObj.Approval = 1 + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Rejection");
      } else if (!kony.sdk.isNullOrUndefined(achTransactionObj.requiredApprovals)) {
        achTransactionObj.Approval = achTransactionObj.requiredApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Approvals");
      } else {
        achTransactionObj.Approval = "N/A";
      }
      achTransactionObj.AccountName = {
        text: CommonUtilities.truncateStringWithGivenLength(achTransactionObj.AccountName + "....", 16) + CommonUtilities.getLastFourDigit(achTransactionObj.DebitAccount),
        toolTip: achTransactionObj.AccountName + "...." + CommonUtilities.getLastFourDigit(achTransactionObj.DebitAccount)
      };
    });
    return (response);
  };


  /**
     * showTransactionRequestsFailure :  Failure callback - which is invoked when fetching of ACH transaction requests is failed
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} responseError - Respose Error from the Service call 
     * @return {JSON Object} responseError - Respose Error from the Service call  
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.ACHTransactionRequestsFailure = function(responseError) {
    return (responseError);
  };


  /**
     * fetchACHFileRequests :  This method fetches the requests made by the user that are related to ACH Files
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} navObj - Navigation with SUccess and Failure flows
     * @return {} 
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.fetchACHFileRequests = function(navObj) {
    var scopeObj = this;
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObj.onSuccess.form);

    scopeObj.ApprovalsReqManager.fetchAllACHFileRequests(
      navObj.requestData,
      scopeObj.completeSuccessCall.bind(scopeObj, navObj, "ACHFileRequestsSuccess"),
      scopeObj.completeFailedCall.bind(scopeObj, navObj, "ACHFileRequestsFailure")
    );
  };


  /**
     * ACHFileRequestsSuccess :  Success callback - which is invoked after fetching ACH File requests successfully
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} response - Raw response form the Service call
     * @return {JSON Object} response -  Massaged/formatted JSON data of the Transactions 
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.ACHFileRequestsSuccess = function(response) {
    response = response.ACHFile;
    response.forEach(function(achFileReq) {
      achFileReq.Action = "Withdraw";
      achFileReq.flxBtnReject = {
        "isVisible": false
      };
      if (achFileReq.FileStatus.toLowerCase() === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase()) {
        achFileReq.flxBtnReject.isVisible = true;
      }
      achFileReq.FileName = {
        text: CommonUtilities.truncateStringWithGivenLength(achFileReq.FileName, 15),
        toolTip: achFileReq.FileName
      };
      achFileReq.userName = {
        text: achFileReq.userName, //CommonUtilities.truncateStringWithGivenLength(achFileReq.userName, 15),
        toolTip: achFileReq.userName
      };
      if ((achFileReq.FileStatus.toLowerCase() === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase()) && (!kony.sdk.isNullOrUndefined(achFileReq.requiredApprovals)) && (!kony.sdk.isNullOrUndefined(achFileReq.receivedApprovals))) {
        achFileReq.Approver = achFileReq.receivedApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + " " + achFileReq.requiredApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Approved");
      } else if (achFileReq.FileStatus === BBConstants.TRANSACTION_STATUS.REJECTED) {
        achFileReq.Approver = 1 + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Rejection");
      } else if (achFileReq.FileStatus === BBConstants.TRANSACTION_STATUS.WITHDRAWN) {
        achFileReq.Approver = kony.i18n.getLocalizedString("i18n.konybb.Common.Withdrawn");
      } else if (!kony.sdk.isNullOrUndefined(achFileReq.requiredApprovals)) {
        achFileReq.Approver = achFileReq.requiredApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Approvals");
      } else {
        achFileReq.Approver = kony.i18n.getLocalizedString("i18n.common.NA");
      }
      achFileReq.TotalCreditAmount = CommonUtilities.formatCurrencyWithCommas(achFileReq.TotalCreditAmount, true);
      achFileReq.TotalDebitAmount = CommonUtilities.formatCurrencyWithCommas(achFileReq.TotalDebitAmount, true);
      achFileReq.UpdatedDateAndTime = CommonUtilities.getDateAndTimeInUTC(achFileReq.UpdatedDateAndTime, "mm/dd/yyyy");
    });
    return (response);
  };


  /**
     * ACHFileRequestsFailure : Failure callback - which is invoked when fetching of ACH File requests is failed
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} responseError - Respose Error from the Service call 
     * @return {JSON Object} responseError - Respose Error from the Service call  
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.ACHFileRequestsFailure = function(responseError) {
    return (responseError);
  };


  /**
     * withdrawTransactionRequest :  This method is used to withdraw a transaction request made by the user 
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} navObj - navigation object with success and failure flows
     * @return {}
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.withdrawTransactionRequest = function(navObj) {
    var scopeObj = this;
    applicationManager.getNavigationManager().navigateTo(navObj.onSuccess.form);
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObj.onSuccess.form);

    scopeObj.ApprovalsReqManager.withdrawTransactionRequest(
      navObj.requestData,
      scopeObj.transactionWithdrawlSuccess.bind(scopeObj, navObj),
      scopeObj.completeFailedCall.bind(scopeObj, navObj, "transactionWithdrawlFailure")
    );
  };


  /**
     * transactionWithdrawlSuccess :  Success callback invoked after the successful withdrawl of a transaction
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} navObj - navigation object with success and failure flows
     * @param {JSON Object} response - response object from the service call 
     * @return {}  
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.transactionWithdrawlSuccess = function(navObject, response) {
    var scopeObj = this;
    scopeObj.ACHManager.getGenTransactionDataByID({
      "Transaction_id": response.Transaction_id,
      "featureActionId": response.FeatureAction_id
    },
                                                  scopeObj.completeSuccessCall.bind(scopeObj, navObject, "ongetGenTransactionDataByIDSuccess"),
                                                  scopeObj.completeFailedCall.bind(scopeObj, navObject, "ongetGenTransactionDataByIDFailure")
                                                 );
  };


  /**
     * transactionWithdrawlFailure :  Failure callback invoked after the failure of a transaction withdrawl 
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} error - error object form failure callback of service
     * @return {}  
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.transactionWithdrawlFailure = function(error) {
    return (error);
  };


  /**
     * withdrawACHTransactionRequest :  This method is used to withdraw an ACH transaction request made by the user
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} navObj - navigation object with success and failure flows
     * @return {}
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.withdrawACHTransactionRequest = function(navObj) {
    var scopeObj = this;
    applicationManager.getNavigationManager().navigateTo(navObj.onSuccess.form);
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObj.onSuccess.form);

    scopeObj.ApprovalsReqManager.withdraw(
      navObj.requestData,
      scopeObj.ACHTransactionWithdrawlSuccess.bind(scopeObj, navObj),
      scopeObj.completeFailedCall.bind(scopeObj, navObj, "ACHTransactionWithdrawlFailure")
    );
  };


  /**
     * ACHTransactionWithdrawlSuccess :  Success callback invoked after the successful withdrawl of a ACH Transaction
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} navObj - navigation object with success and failure flows
     * @param {JSON Object} response - response object from the service call 
     * @return {}  
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.ACHTransactionWithdrawlSuccess = function(navObject, response) {
    var scopeObj = this;
    var transactionId = !kony.sdk.isNullOrUndefined(response.Transaction_id) ? response.Transaction_id : response.transactionId;
    scopeObj.ACHManager.getACHTransactionDataByID({
      "Transaction_id": transactionId
    },
                                                  scopeObj.completeSuccessCall.bind(scopeObj, navObject, "ongetACHTransactionDataByIDSuccess"),
                                                  scopeObj.completeFailedCall.bind(scopeObj, navObject, "ongetACHTransactionDataByIDFailure")
                                                 );
  };


  /**
     * ACHTransactionWithdrawlFailure :  Failure callback invoked after the failure of an ACH Transaction withdrawl 
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} error - error object form failure callback of service
     * @return {}  
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.ACHTransactionWithdrawlFailure = function(responseError) {
    return (responseError);
  };


  /**
     * withdrawACHFileRequest :  This method is used to withdraw an ACH File request made by the user
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} navObj - navigation object with success and failure flows
     * @return {}
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.withdrawACHFileRequest = function(navObj) {
    var scopeObj = this;
    applicationManager.getNavigationManager().navigateTo(navObj.onSuccess.form);
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObj.onSuccess.form);

    scopeObj.ApprovalsReqManager.withdraw(
      navObj.requestData,
      scopeObj.ACHFileWithdrawlSuccess.bind(scopeObj, navObj),
      scopeObj.completeFailedCall.bind(scopeObj, navObj, "ACHFileWithdrawlFailure")
    );
  };


  /**
     * ACHFileWithdrawlSuccess :  Success callback invoked after the successful withdrawl of an ACH File
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} navObj - navigation object with success and failure flows
     * @param {JSON Object} response - response object from the service call 
     * @return {}  
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.ACHFileWithdrawlSuccess = function(navObject, response) {
    var scopeObj = this;
    var transactionId = !kony.sdk.isNullOrUndefined(response.ACHFile_id) ? response.ACHFile_id : response.transactionId;
    scopeObj.ACHManager.getFilesDataByID({
      "ACHFileID": transactionId
    },
                                         scopeObj.completeSuccessCall.bind(scopeObj, navObject, "ongetFilesDataByIDSuccess"),
                                         scopeObj.completeFailedCall.bind(scopeObj, navObject, "ongetFilesDataByIDFailure")
                                        );
  };


  /**
     * ACHFileWithdrawlFailure :  Failure callback invoked after the failure of an ACH File withdrawl 
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} error - error object form failure callback of service
     * @return {}  
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.ACHFileWithdrawlFailure = function(responseError) {
    return (responseError);
  };


  /**
     * getGeneralTransactionsPendingForMyApprovals :  This is the function which is used to fetch Transactions Pending for Approvals 
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} navObj - navigation object with success and failure flows
     * @return {}
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.getGeneralTransactionsPendingForMyApprovals = function(navObj) {
    var scopeObj = this;
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObj.onSuccess.form);
    //TransactionPendingApprovalData = 
    scopeObj.ApprovalsReqManager.fetchGeneralTransactionsPendingForMyApprovals(
      navObj.requestData,
      scopeObj.completeSuccessCall.bind(scopeObj, navObj, "onFetchGeneralTransactionsPendingForMyApprovalsSuccess"),
      scopeObj.completeFailedCall.bind(scopeObj, navObj, "onFetchGeneralTransactionsPendingForMyApprovalsFailure")
    );
  };


  /**
     * onFetchGeneralTransactionsPendingForMyApprovalsSuccess :  Method to handle success response of fetching Transactions Pending for My Approvals
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} response - response object from the service call 
     * @return {}  
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.onFetchGeneralTransactionsPendingForMyApprovalsSuccess = function(response) {
    return this.dataProcessorForGenTransaction(response);
  };


  /**
     * ACHFileWithdrawlFailure :  Method to handle failure response of fetching General Transactions Pending for My Approvals
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} responseError - error object form failure callback of service
     * @return {}  
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.onFetchGeneralTransactionsPendingForMyApprovalsFailure = function(responseError) {
    return responseError;
  };


  /**
     * getACHTransactionsPendingForMyApprovals :  This is the function which is used to fetch ACH Transactions Pending for Approvals 
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} navObj - navigation object with success and failure flows
     * @return {}
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.getACHTransactionsPendingForMyApprovals = function(navObj) {
    var scopeObj = this;
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObj.onSuccess.form);
    ACHTransactionPendingApprovalData = scopeObj.ApprovalsReqManager.fetchACHTransactionsPendingForMyApprovals(
      navObj.requestData,
      scopeObj.completeSuccessCall.bind(scopeObj, navObj, "onFetchACHTransactionsSuccess"),
      scopeObj.completeFailedCall.bind(scopeObj, navObj, "onFetchACHTransactionsFailure")
    );
  };

  /**
     * getRejectedACHTransactions :  This is the function which is used to fetch rejcted ACH Transactions
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} navObj - navigation object with success and failure flows
     * @return {}
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.getRejectedACHTransactions = function(navObj) {
    var scopeObj = this;
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObj.onSuccess.form);
    scopeObj.ApprovalsReqManager.fetchRejectedACHTransactions(
      navObj.requestData,
      scopeObj.completeSuccessCall.bind(scopeObj, navObj, "onFetchACHTransactionsSuccess"),
      scopeObj.completeFailedCall.bind(scopeObj, navObj, "onFetchACHTransactionsFailure")
    );
  };

  /**
     * getRejectedACHFiles :  This is the function which is used to fetch rejcted ACH Transactions
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} navObj - navigation object with success and failure flows
     * @return {}
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.getRejectedACHFiles = function(navObj) {
    var scopeObj = this;
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObj.onSuccess.form);
    scopeObj.ApprovalsReqManager.fetchRejectedACHFiles(
      navObj.requestData,
      scopeObj.completeSuccessCall.bind(scopeObj, navObj, "onFetchACHFilesSuccess"),
      scopeObj.completeFailedCall.bind(scopeObj, navObj, "onFetchACHFilesFailure")
    );
  };

  /**
     * onFetchACHTransactionsSuccess :  Method to handle success response of fetching ACH Transactions Pending for My Approvals
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} response - response object from the service call 
     * @return {}  
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.onFetchACHTransactionsSuccess = function(response) {
    response = response.ACHTransactions;
    response.forEach(function(responseObj) {
      responseObj.userName = {
        text: responseObj.userName, //CommonUtilities.truncateStringWithGivenLength(responseObj.userName, 15),
        toolTip: responseObj.userName
      };
      responseObj.CreatedBy = {
        text: responseObj.createdby, // CommonUtilities.truncateStringWithGivenLength(responseObj.createdby, 15),
        toolTip: responseObj.createdby
      };
      var break_point = kony.application.getCurrentBreakpoint();
      if (break_point === 640) {
        responseObj.TemplateName = {
          text: responseObj.TemplateName, // CommonUtilities.truncateStringWithGivenLength(responseObj.TemplateName, 27),
          toolTip: responseObj.TemplateName
        };
        responseObj.DebitOrCreditAccount = {
          text: responseObj.AccountName + "...." + CommonUtilities.getLastFourDigit(responseObj.DebitAccount), //CommonUtilities.truncateStringWithGivenLength(responseObj.AccountName + "....", 27) + CommonUtilities.getLastFourDigit(responseObj.DebitAccount),
          toolTip: responseObj.AccountName + "...." + CommonUtilities.getLastFourDigit(responseObj.DebitAccount)
        };
      } else {
        responseObj.TemplateName = {
          text: responseObj.TemplateName, // CommonUtilities.truncateStringWithGivenLength(responseObj.TemplateName, 15),
          toolTip: responseObj.TemplateName
        };
        responseObj.DebitOrCreditAccount = {
          text: responseObj.AccountName + "...." + CommonUtilities.getLastFourDigit(responseObj.DebitAccount), // CommonUtilities.truncateStringWithGivenLength(responseObj.AccountName + "....", 16) + CommonUtilities.getLastFourDigit(responseObj.DebitAccount),
          toolTip: responseObj.AccountName + "...." + CommonUtilities.getLastFourDigit(responseObj.DebitAccount)
        };
      }
      responseObj.Amount = CommonUtilities.formatCurrencyWithCommas(responseObj.TotalAmount, true);
      if (responseObj.RequestType.includes("PPD") || responseObj.RequestType.includes("CCD") || responseObj.RequestType.includes("CTX")) {
        responseObj.RequestType = (responseObj.RequestType).substring(0, 3) + " " + responseObj.TransactionTypeValue;
      }
      responseObj.CreatedOn = CommonUtilities.getFrontendDateStringInUTC(responseObj.CreatedOn, "mm/dd/yyyy");
      responseObj.TransmittedDate = responseObj.CreatedOn;
      responseObj.Approval = responseObj.receivedApprovals + " of " + responseObj.requiredApprovals + " Approved";
      responseObj.AccountName = {
        text: responseObj.AccountName + "...." + CommonUtilities.getLastFourDigit(responseObj.DebitAccount), // CommonUtilities.truncateStringWithGivenLength(responseObj.AccountName + "....", 16) + CommonUtilities.getLastFourDigit(responseObj.DebitAccount),
        toolTip: responseObj.AccountName + "...." + CommonUtilities.getLastFourDigit(responseObj.DebitAccount)
      };
    });
    return (response);
  };


  /**
     * onFetchACHTransactionsFailure :  Method to handle failure response of fetching ACH Transactions Pending for My Approvals
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} responseError - error object form failure callback of service
     * @return {}  
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.onFetchACHTransactionsFailure = function(responseError) {
    return (responseError);
  };


  /**
     * getACHFilesPendingForMyApprovals :  This is the function which is used to fetch ACH Files Pending for Approvals 
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} navObj - navigation object with success and failure flows
     * @return {}
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.getACHFilesPendingForMyApprovals = function(navObj) {
    var scopeObj = this;
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObj.onSuccess.form);

    scopeObj.ApprovalsReqManager.fetchACHFilesPendingForMyApprovals(
      navObj.requestData,
      scopeObj.completeSuccessCall.bind(scopeObj, navObj, "onFetchACHFilesSuccess"),
      scopeObj.completeFailedCall.bind(scopeObj, navObj, "onFetchACHFilesFailure")
    );
  };


  /**
     * onFetchACHFilesSuccess :  Method to handle success response of fetching ACH Files Pending for My Approvals
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} response - response object from the service call 
     * @return {}  
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.onFetchACHFilesSuccess = function(response) {
    response = response.ACHFile;
    response.forEach(function(responseObj) {
      responseObj.FileName = {
        text: CommonUtilities.truncateStringWithGivenLength(responseObj.FileName, 15),
        toolTip: responseObj.FileName
      };
      responseObj.userName = {
        text: responseObj.userName, // CommonUtilities.truncateStringWithGivenLength(responseObj.userName, 15),
        toolTip: responseObj.userName
      };
      if ((responseObj.FileStatus.toLowerCase() === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase()) && (!kony.sdk.isNullOrUndefined(responseObj.requiredApprovals)) && (!kony.sdk.isNullOrUndefined(responseObj.receivedApprovals))) {
        responseObj.Approver = responseObj.receivedApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + " " + responseObj.requiredApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Approved");
      } else if (responseObj.FileStatus === BBConstants.TRANSACTION_STATUS.REJECTED) {
        responseObj.Approver = 1 + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Rejection");
      } else if (responseObj.FileStatus === BBConstants.TRANSACTION_STATUS.WITHDRAWN) {
        responseObj.Approver = kony.i18n.getLocalizedString("i18n.konybb.Common.Withdrawn");
      } else if (!kony.sdk.isNullOrUndefined(responseObj.requiredApprovals)) {
        responseObj.Approver = responseObj.requiredApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Approvals");
      } else {
        responseObj.Approver = kony.i18n.getLocalizedString("i18n.common.NA");
      }
      responseObj.TotalCreditAmount = CommonUtilities.formatCurrencyWithCommas(responseObj.TotalCreditAmount, true);
      responseObj.TotalDebitAmount = CommonUtilities.formatCurrencyWithCommas(responseObj.TotalDebitAmount, true);
      responseObj.UpdatedDateAndTime = CommonUtilities.getDateAndTimeInUTC(responseObj.UpdatedDateAndTime, "mm/dd/yyyy");
    });
    return (response);
  };


  /**
     * onFetchACHTransactionsFailure :  Method to handle failure response of fetching ACH Files Pending for My Approvals
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} responseError - error object form failure callback of service
     * @return {}  
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.onFetchACHFilesFailure = function(responseError) {
    return (responseError);
  };


  /**
     * approveBBGeneralTransactions :  This is the function to Approve an General Transactions
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} navObj - Navigation with SUccess and Failure flows
     * @return {} 
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.approveBBGeneralTransactions = function(navObj) {
    var scopeObj = this;
    applicationManager.getNavigationManager().navigateTo(navObj.onSuccess.form);
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObj.onSuccess.form);
    scopeObj.ApprovalsReqManager.approveBBGeneralTransactions(
      navObj.requestData,
      scopeObj.onApproveBBGeneralTransactionsSuccess.bind(scopeObj, navObj),
      scopeObj.completeFailedCall.bind(scopeObj, navObj, "onApproveBBGeneralTransactionsFailure")
    );
  };

  ApprovalsReqModule_PresentationController.prototype.approveTransactions = function(navObj) {
    var scopeObj = this;
    applicationManager.getNavigationManager().navigateTo(navObj.onSuccess.form);
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObj.onSuccess.form);
    scopeObj.ApprovalsReqManager.fetchApproveTransactions(
      navObj.requestData,
      scopeObj.onApproveChequeBookRequest.bind(scopeObj, navObj),
      scopeObj.completeFailedCall.bind(scopeObj, navObj, "onApproveBBGeneralTransactionsFailure")
    );
  };

  ApprovalsReqModule_PresentationController.prototype.approveChequeBookRequest = function(navObj) {
    var scopeObj = this;
    applicationManager.getNavigationManager().navigateTo(navObj.onSuccess.form);
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObj.onSuccess.form);
    scopeObj.ApprovalsReqManager.fetchApproveTransactions(
      navObj.requestData,
      scopeObj.onApproveChequeBookRequest.bind(this, navObj) ,
      scopeObj.completeFailedCall.bind(scopeObj, navObj, "onApproveBBGeneralTransactionsFailure")
    );
  };

  ApprovalsReqModule_PresentationController.prototype.onApproveChequeBookRequest = function(navObj, response) {
    if (kony.application.getCurrentForm().id !== navObj.onSuccess.form) {
      applicationManager.getNavigationManager().navigateTo(navObj.onSuccess.form);
    }
    var data = navObj.onSuccess.context.responseData;
    data.requestId = response.requestId;
    data.status = response.status
    if(!kony.sdk.isNullOrUndefined(response.transactionId))
      data.transactionId = response.transactionId;

    //kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('AccountsUIModule').presentationController.etchCountsOfApprovalAndRequest();    
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "AccountsUIModule", "appName" : "HomepageMA"}).presentationController.fetchCountsOfApprovalAndRequest();    
    applicationManager.getNavigationManager().updateForm({
      "key": navObj.onSuccess.context.key,
      "responseData": data
    }, navObj.onSuccess.form);
  };
  ApprovalsReqModule_PresentationController.prototype.approveTransactionBeneficiary = function(navObj) {
    var scopeObj = this;
    applicationManager.getNavigationManager().navigateTo(navObj.onSuccess.form);
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObj.onSuccess.form);
    scopeObj.ApprovalsReqManager.fetchApproveTransactions(
      navObj.requestData,
      completionCallbackForBen.bind(scopeObj, navObj),
      scopeObj.completeFailedCall.bind(scopeObj, navObj, "onApproveBBGeneralTransactionsFailure")
    );
    function completionCallbackForBen(navObj){
      scopeObj.onApproveChequeBookRequest.bind(scopeObj, navObj);
      var benNavObj = Object.assign(navObj);
      benNavObj.onSuccess.context.key =  BBConstants.GEN_TRANSACTION_VIEW_DETAILS;
      benNavObj.requestData = navObj.benData;
      benNavObj.benData.selectedRowData.Status = "Approved";
      benNavObj.benData.selectedRowData.status = "Approved";
      scopeObj.fetchInfinityUserContractCustomers(benNavObj);
    }
   
  };

  ApprovalsReqModule_PresentationController.prototype.rejectTransactions = function(navObj) {
    var scopeObj = this;
    applicationManager.getNavigationManager().navigateTo(navObj.onSuccess.form);
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObj.onSuccess.form);
    scopeObj.ApprovalsReqManager.fetchRejectTransactions(
      navObj.requestData,
      scopeObj.onApproveChequeBookRequest.bind(scopeObj, navObj),
      scopeObj.completeFailedCall.bind(scopeObj, navObj, "onApproveBBGeneralTransactionsFailure")
    );
  };

  ApprovalsReqModule_PresentationController.prototype.rejectChequeBookRequest = function(navObj) {
    var scopeObj = this;
    if (kony.application.getCurrentForm().id !== navObj.onSuccess.form) {
      applicationManager.getNavigationManager().navigateTo(navObj.onSuccess.form);
    }
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObj.onSuccess.form);
    scopeObj.ApprovalsReqManager.fetchRejectTransactions(
      navObj.requestData,
      scopeObj.onApproveChequeBookRequest.bind(this, navObj) ,
      scopeObj.onServerError.bind(this)
    );
  };

  /**
     * onApproveBBGeneralTransactionsSuccess : Upon Success of an Approval, function to fetch the an General Transaction Details
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} navObject - Navigation with SUccess and Failure flows
     * @param {JSON Object} response - success response data of the previous call
     * @return {} 
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.onApproveBBGeneralTransactionsSuccess = function(navObject, response) {
    var scopeObj = this;
    scopeObj.ACHManager.getGenTransactionDataByID({
      "Transaction_id": response.transactionId,
      "featureActionId": navObject.requestData.featureActionId,
    },
                                                  scopeObj.completeSuccessCall.bind(scopeObj, navObject, "ongetGenTransactionDataByIDSuccess"),
                                                  scopeObj.completeFailedCall.bind(scopeObj, navObject, "ongetGenTransactionDataByIDFailure")
                                                 );
  };


  /**
     * ongetGenTransactionDataByIDSuccess : Successfully fetched the an General Transaction Details based on ID
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} response - success response data with ID
     * @return {} 
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.ongetGenTransactionDataByIDSuccess = function(response) {
    var scopeObj = this;
    response = scopeObj.dataProcessorForGenTransaction(response);
    return (response[0]);
  };


  /**
     * ongetGenTransactionDataByIDFailure :  Failed to Fetch the an General Transaction Details based on ID
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} responseError - Service returned error object
     * @return {} 
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.ongetGenTransactionDataByIDFailure = function(responseError) {
    var scopeObj = this;
    return (responseError);
  };


  /**
     * onApproveBBGeneralTransactionsFailure : Failed to Approve General Transaction 
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} responseError - Service returned error object
     * @return {} 
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.onApproveBBGeneralTransactionsFailure = function(responseError) {
    return (responseError);
  };


  /**
     * approveACHTransactions :  This is the function to Approve an ACH Transactions
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} navObj - Navigation with SUccess and Failure flows
     * @return {} 
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.approveACHTransactions = function(navObj) {
    var scopeObj = this;
    applicationManager.getNavigationManager().navigateTo(navObj.onSuccess.form);
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObj.onSuccess.form);
    scopeObj.ApprovalsReqManager.approveACHTransactions(
      navObj.requestData,
      scopeObj.onApproveACHTransactionsSuccess.bind(scopeObj, navObj),
      scopeObj.completeFailedCall.bind(scopeObj, navObj, "onApproveACHTransactionsFailure")
    );
  };


  /**
     * onApproveACHTransactionsSuccess : Upon Success of an Approval, function to fetch the an ACH Transaction Details
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} navObject - Navigation with SUccess and Failure flows
     * @param {JSON Object} response - success response data of the previous call
     * @return {} 
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.onApproveACHTransactionsSuccess = function(navObject, response) {
    var scopeObj = this;
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" :'AccountsUIModule', "appName" : 'HomepageMA'}).presentationController.fetchCountsOfApprovalAndRequest();
    scopeObj.ACHManager.getACHTransactionDataByID({
      "Transaction_id": response.transactionId
    },
                                                  scopeObj.completeSuccessCall.bind(scopeObj, navObject, "ongetACHTransactionDataByIDSuccess"),
                                                  scopeObj.completeFailedCall.bind(scopeObj, navObject, "ongetACHTransactionDataByIDFailure")
                                                 );
  };


  /**
     * ongetACHTransactionDataByIDSuccess : Successfully fetched the an ACH Transaction Details based on ID
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} response - success response data with ID
     * @return {} 
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.ongetACHTransactionDataByIDSuccess = function(response) {
    var scopeObj = this;
    response.forEach(function(responseObj) {
      responseObj.Amount = CommonUtilities.formatCurrencyWithCommas(responseObj.Amount, true);
      if (responseObj.Status === BBConstants.TRANSACTION_STATUS.REJECTED) {
        responseObj.Approver = 1 + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Rejection");
      } else if (responseObj.Status === BBConstants.TRANSACTION_STATUS.WITHDRAWN) {
        responseObj.Approver = 1 + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Withdrawn");
      } else if (responseObj.Status.toLowerCase() === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase()) {
        responseObj.Approver = responseObj.receivedApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + " " + responseObj.requiredApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Approved");
      } else if (!kony.sdk.isNullOrUndefined(responseObj.requiredApprovals)) {
        responseObj.Approver = responseObj.requiredApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Approvals");
      } else {
        responseObj.Approver = "N/A";
      }
    });
    return (response[0]);
  };


  /**
     * ongetACHTransactionDataByIDFailure : Failed to Approve ACH Transaction 
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} responseError - Service returned error object
     * @return {} 
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.ongetACHTransactionDataByIDFailure = function(responseError) {
    var scopeObj = this;
    return (responseError);
  };

  /**
     * Method to handle failure response of Approve ACH Transactions
     * @param {object} responseError - failure response object
     */
  ApprovalsReqModule_PresentationController.prototype.onApproveACHTransactionsFailure = function(responseError) {
    return (responseError);
  };


  /**
     * approveACHFiles : call the service to Approve ACH File
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} navObj - Navigation with SUccess and Failure flows
     * @return {} 
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.approveACHFiles = function(navObj) {
    var scopeObj = this;
    applicationManager.getNavigationManager().navigateTo(navObj.onSuccess.form);
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObj.onSuccess.form);
    scopeObj.ApprovalsReqManager.approveACHFiles(
      navObj.requestData,
      scopeObj.onApproveACHFilesSuccess.bind(scopeObj, navObj),
      scopeObj.completeFailedCall.bind(scopeObj, navObj, "onApproveACHFilesFailure")
    );
  };


  /**
     * onApproveACHFilesSuccess : On success of Approve, Fetch Details of ACHFile by ID
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} navObject - Navigation with SUccess and Failure flows
     * @param {JSON Object} response - Success Data which is reponse to previous call
     * @return {} 
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.onApproveACHFilesSuccess = function(navObject, response) {
    var scopeObj = this;
    //kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('AccountsUIModule').presentationController.fetchCountsOfApprovalAndRequest();
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "AccountsUIModule", "appName" : "HomepageMA"}).presentationController.fetchCountsOfApprovalAndRequest();
    scopeObj.ACHManager.getFilesDataByID({
      "ACHFileID": response.transactionId
    },
                                         scopeObj.completeSuccessCall.bind(scopeObj, navObject, "ongetFilesDataByIDSuccess"),
                                         scopeObj.completeFailedCall.bind(scopeObj, navObject, "ongetFilesDataByIDFailure")
                                        );
  };


  /**
     * ongetFilesDataByIDSuccess : Success to fetch ACHFile data by ID
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} response - Success Data which is reponse to previous call
     * @return {} 
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.ongetFilesDataByIDSuccess = function(response) {
    response = this.onFetchACHFilesSuccess({
      ACHFile: response
    });
    return (response[0]);
  };

  /**
     * ongetFilesDataByIDFailure : Failed to fetch ACHFile data by ID
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} responseError - Service error data
     * @return {} 
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.ongetFilesDataByIDFailure = function(responseError) {
    var scopeObj = this;
    return (responseError);
  };


  /**
     * onApproveACHFilesFailure : Failed to Approve ACHFile 
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} responseError - Service error data
     * @return {} 
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.onApproveACHFilesFailure = function(responseError) {
    return (responseError);
  };


  /**
     * rejectBBGeneralTransactions : This is the function for Reject BB General Transactions
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} navObj - Navigation with SUccess and Failure flows
     * @return {} 
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.rejectBBGeneralTransactions = function(navObj) {
    var scopeObj = this;
    applicationManager.getNavigationManager().navigateTo(navObj.onSuccess.form);
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObj.onSuccess.form);
    scopeObj.ApprovalsReqManager.rejectBBGeneralTransactions(
      navObj.requestData,
      scopeObj.onRejectBBGeneralTransactionsSuccess.bind(scopeObj, navObj),
      scopeObj.completeFailedCall.bind(scopeObj, navObj, "onRejectBBGeneralTransactionsFailure")
    );
  };


  /**
     * onRejectBBGeneralTransactionsSuccess : Method to handle success response of Reject BB General Transactions
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} navObj - Navigation with SUccess and Failure flows
     * @param {JSON Object} response - Success Data which is reponse to previous call
     * @return {} 
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.onRejectBBGeneralTransactionsSuccess = function(navObject, response) {
    var scopeObj = this;
    scopeObj.ACHManager.getGenTransactionDataByID({
      "Transaction_id": response.Transaction_id,
      "featureActionId": response.FeatureAction_id
    },
                                                  scopeObj.completeSuccessCall.bind(scopeObj, navObject, "ongetGenTransactionDataByIDSuccess"),
                                                  scopeObj.completeFailedCall.bind(scopeObj, navObject, "ongetGenTransactionDataByIDFailure")
                                                 );
  };


  /**
     * onRejectBBGeneralTransactionsSuccess : Method to handle failure response of Reject BB General Transactions
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} responseError - failure response object
     * @return {} 
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.onRejectBBGeneralTransactionsFailure = function(responseError) {
    return (responseError);
  };


  /**
     * rejectBBGeneralTransactions : This is the function for Reject ACH Transactions
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} navObj - Navigation with SUccess and Failure flows
     * @return {} 
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.rejectACHTransactions = function(navObj) {
    var scopeObj = this;
    applicationManager.getNavigationManager().navigateTo(navObj.onSuccess.form);
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObj.onSuccess.form);
    scopeObj.ApprovalsReqManager.rejectACHTransactions(
      navObj.requestData,
      scopeObj.onRejectACHTransactionsSuccess.bind(scopeObj, navObj),
      scopeObj.completeFailedCall.bind(scopeObj, navObj, "onRejectACHTransactionsFailure")
    );
  };


  /**
     * onRejectACHTransactionsSuccess : Method to handle success response of Reject ACH Transactions
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} navObj - Navigation with SUccess and Failure flows
     * @param {JSON Object} response - Success Data which is reponse to previous call
     * @return {} 
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.onRejectACHTransactionsSuccess = function(navObject, response) {
    var scopeObj = this;
    //kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('AccountsUIModule').presentationController.fetchCountsOfApprovalAndRequest();
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "AccountsUIModule", "appName" : "HomepageMA"}).presentationController.fetchCountsOfApprovalAndRequest();
    scopeObj.ACHManager.getACHTransactionDataByID({
      "Transaction_id": response.transactionId
    },
                                                  scopeObj.completeSuccessCall.bind(scopeObj, navObject, "ongetACHTransactionDataByIDSuccess"),
                                                  scopeObj.completeFailedCall.bind(scopeObj, navObject, "ongetACHTransactionDataByIDFailure")
                                                 );
  };


  /**
     * onRejectACHTransactionsFailure : Method to handle failure response of Reject ACH Transactions
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} responseError - Service error object from backend
     * @return {JSON Object} response Error 
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.onRejectACHTransactionsFailure = function(responseError) {
    var scopeObj = this;
    return (responseError);
  };


  /**
     * rejectACHFiles : Method to handle success response of Reject ACHFile
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} navObj - Navigation with SUccess and Failure flows
     * @return {} 
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.rejectACHFiles = function(navObj) {
    var scopeObj = this;
    applicationManager.getNavigationManager().navigateTo(navObj.onSuccess.form);
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObj.onSuccess.form);
    scopeObj.ApprovalsReqManager.rejectACHFiles(
      navObj.requestData,
      scopeObj.onRejectACHFilesSuccess.bind(scopeObj, navObj),
      scopeObj.completeFailedCall.bind(scopeObj, navObj, "onRejectACHFilesFailure")
    );
  };

  ApprovalsReqModule_PresentationController.prototype.approveACHFilesACHDashboard = function (navObj) {
    var scopeObj = this;
    applicationManager.getNavigationManager().navigateTo(navObj.onSuccess.form);
    applicationManager.getNavigationManager().updateForm(
      {
        "key"          : BBConstants.LOADING_INDICATOR,
        "responseData" : null
      },navObj.onSuccess.form);
    scopeObj.ApprovalsReqManager.approveACHFilesACHdashboard(
      navObj.requestData,
      scopeObj.onApproveACHFilesSuccessACHDashboard.bind(scopeObj,navObj),
      scopeObj.completeFailedCall.bind(scopeObj,navObj,"onApproveACHFilesFailure")
    );
  };
  ApprovalsReqModule_PresentationController.prototype.onApproveACHFilesSuccessACHDashboard = function (navObject, response) {
    var scopeObj = this;
    scopeObj.ACHManager.getFilesDataByID(
      {"ACHFileID":response.ACHFile_id},
      scopeObj.completeSuccessCall.bind(scopeObj,navObject,"ongetFilesDataByIDSuccess"),
      scopeObj.completeFailedCall.bind(scopeObj,navObject,"ongetFilesDataByIDFailure")
    );
  };
  ApprovalsReqModule_PresentationController.prototype.rejectACHFilesACH = function (navObj) { 
    var scopeObj = this;
    applicationManager.getNavigationManager().navigateTo(navObj.onSuccess.form);
    applicationManager.getNavigationManager().updateForm(
      {
        "key"          : BBConstants.LOADING_INDICATOR,
        "responseData" : null
      },navObj.onSuccess.form);
    scopeObj.ApprovalsReqManager.rejectACHFilesACH(
      navObj.requestData,
      scopeObj.onRejectACHFilesACHSuccess.bind(scopeObj,navObj),
      scopeObj.completeFailedCall.bind(scopeObj,navObj,"onRejectACHFilesACHFailure")
    );
  };

  ApprovalsReqModule_PresentationController.prototype.approveACHTransactionsACH = function (navObj) { 
    var scopeObj = this;     
    applicationManager.getNavigationManager().navigateTo(navObj.onSuccess.form);
    applicationManager.getNavigationManager().updateForm(
      {
        "key"          : BBConstants.LOADING_INDICATOR,
        "responseData" : null
      },navObj.onSuccess.form);	
    scopeObj.ApprovalsReqManager.approveACHTransactionsACH(
      navObj.requestData,
      scopeObj.onApproveACHTransactionsSuccessACH.bind(scopeObj,navObj),
      scopeObj.completeFailedCall.bind(scopeObj,navObj,"onApproveACHTransactionsFailure")
    );
  };
  ApprovalsReqModule_PresentationController.prototype.rejectACHTransactionsACH = function (navObj) { 
    var scopeObj = this;
    applicationManager.getNavigationManager().navigateTo(navObj.onSuccess.form);
    applicationManager.getNavigationManager().updateForm(
      {
        "key"          : BBConstants.LOADING_INDICATOR,
        "responseData" : null
      },navObj.onSuccess.form);
    scopeObj.ApprovalsReqManager.rejectACHTransactionsACH(
      navObj.requestData,
      scopeObj.onRejectACHTransactionsSuccessACH.bind(scopeObj,navObj),
      scopeObj.completeFailedCall.bind(scopeObj,navObj,"onRejectACHTransactionsFailure")
    );
  };


  /**
  * onRejectACHTransactionsSuccessACH : Method to handle success response of Reject ACH Transactions
  * @member of {ApprovalsReqModule_PresentationController}
  * @param {JSON Object} navObj - Navigation with SUccess and Failure flows
  * @param {JSON Object} response - Success Data which is reponse to previous call
  * @return {} 
  * @throws {}
  */
  ApprovalsReqModule_PresentationController.prototype.onRejectACHTransactionsSuccessACH = function (navObject, response) { 
    var scopeObj = this;

    scopeObj.ACHManager.getACHTransactionDataByID(
      {"Transaction_id":response.Transaction_id},
      scopeObj.completeSuccessCall.bind(scopeObj,navObject,"ongetACHTransactionDataByIDSuccess"),
      scopeObj.completeFailedCall.bind(scopeObj,navObject,"ongetACHTransactionDataByIDFailure")
    );
  };


  /**
  * onApproveACHTransactionsSuccess : Upon Success of an Approval, function to fetch the an ACH Transaction Details
  * @member of {ApprovalsReqModule_PresentationController}
  * @param {JSON Object} navObject - Navigation with SUccess and Failure flows
  * @param {JSON Object} response - success response data of the previous call
  * @return {} 
  * @throws {}
  */
  ApprovalsReqModule_PresentationController.prototype.onApproveACHTransactionsSuccessACH = function (navObject, response) { 
    var scopeObj = this;
    scopeObj.ACHManager.getACHTransactionDataByID(
      {"Transaction_id":response.Transaction_id},
      scopeObj.completeSuccessCall.bind(scopeObj,navObject,"ongetACHTransactionDataByIDSuccess"),
      scopeObj.completeFailedCall.bind(scopeObj,navObject,"ongetACHTransactionDataByIDFailure")
    );
  };
  /**
  * onRejectACHFilesSuccess : Method to handle success response of Reject ACH Files
  * @member of {ApprovalsReqModule_PresentationController}
  * @param {JSON Object} navObject - Navigation with SUccess and Failure flows
  * @param {JSON Object} response - success reponse from pervious call
  * @return {} 
  * @throws {}
  */
  ApprovalsReqModule_PresentationController.prototype.onRejectACHFilesACHSuccess = function (navObject, response) {
    var scopeObj = this;
    scopeObj.ACHManager.getFilesDataByID(
      {"ACHFileID":response.ACHFile_id},
      scopeObj.completeSuccessCall.bind(scopeObj,navObject,"ongetFilesDataByIDSuccess"),
      scopeObj.completeFailedCall.bind(scopeObj,navObject,"ongetFilesDataByIDFailure")
    );
  };


  /**
  * onRejectACHFilesSuccess : Method to handle failure response of Reject ACH Files
  * @member of {ApprovalsReqModule_PresentationController}
  * @param {object} responseError - failure response object
  * @return {} 
  * @throws {}
  */
  ApprovalsReqModule_PresentationController.prototype.onRejectACHFilesACHFailure= function (responseError) {
    var scopeObj = this;
    return(responseError);
  };


  /**
     * onRejectACHFilesSuccess : Method to handle success response of Reject ACH Files
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Object} navObject - Navigation with SUccess and Failure flows
     * @param {JSON Object} response - success reponse from pervious call
     * @return {} 
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.onRejectACHFilesSuccess = function(navObject, response) {
    var scopeObj = this;
    //kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('AccountsUIModule').presentationController.fetchCountsOfApprovalAndRequest();
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "AccountsUIModule", "appName" : "HomepageMA"}).presentationController.fetchCountsOfApprovalAndRequest();
    scopeObj.ACHManager.getFilesDataByID({
      "ACHFileID": response.transactionId
    },
                                         scopeObj.completeSuccessCall.bind(scopeObj, navObject, "ongetFilesDataByIDSuccess"),
                                         scopeObj.completeFailedCall.bind(scopeObj, navObject, "ongetFilesDataByIDFailure")
                                        );
  };


  /**
     * onRejectACHFilesSuccess : Method to handle failure response of Reject ACH Files
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {object} responseError - failure response object
     * @return {} 
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.onRejectACHFilesFailure = function(responseError) {
    var scopeObj = this;
    return (responseError);
  };


  /**
     * getACHPendingApprovals : Method to Fetch all appropriate Pending ACH related Approvals
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {object} navigationObject - JSON object with info about Successforms, Context and Module
     * @return {} 
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.getACHPendingApprovals = function(navigationObject) {
    var scopeObj = this;
    var params = navigationObject.requestData;
    var asynCalls = [];

    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navigationObject.onSuccess.form);
    var asyncManager = applicationManager.getAsyncManager();

    if (this.checkAtLeastOnePermission(['ACH_COLLECTION_APPROVE', 'ACH_COLLECTION_SELF_APPROVAL', 'ACH_PAYMENT_APPROVE', 'ACH_PAYMENT_SELF_APPROVAL'])) {
      asynCalls.push(asyncManager.asyncItem(scopeObj.ApprovalsReqManager, "fetchACHTransactionsPendingForMyApprovals", [params]));
    }
    if (this.checkAtLeastOnePermission(['ACH_FILES'])) {
      asynCalls.push(asyncManager.asyncItem(scopeObj.ApprovalsReqManager, "fetchACHFilesPendingForMyApprovals", [params]));
    }

    asyncManager.callAsync(
      asynCalls, this.processACHApprovals.bind(this, navigationObject)
    );
  };


  /**
     * processACHApprovals : Method to callCompleteSucces if all needed are fetched 
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {object} navigationObject - JSON object with info about Successforms, Context and Module
     * @param {JSON Array} asyncResponse - Array of responses called in asyncManager.
     * @return {} 
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.processACHApprovals = function(navigationObject, asyncResponse) {
    if (asyncResponse.isAllSuccess()) {
      this.completeSuccessCall(navigationObject, "prepareFinalACHApprovals", asyncResponse.responses);
    }
  };

  /**
     * getACHRejectedApprovals : Method to Fetch all appropriate ACH related Approvals
     * @member of {ACHModule_PresentationController}
     * @param {object} navigationObject - JSON object with info about Successforms, Context and Module
     * @return {} 
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.getACHRejectedApprovals = function(navigationObject) {
    var scopeObj = this;
    var params = navigationObject.requestData;

    var asynCalls = [];

    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navigationObject.onSuccess.form);
    var asyncManager = applicationManager.getAsyncManager();

    if (this.checkAtLeastOnePermission(['ACH_COLLECTION_APPROVE', 'ACH_COLLECTION_SELF_APPROVAL', 'ACH_PAYMENT_APPROVE', 'ACH_PAYMENT_SELF_APPROVAL'])) {
      asynCalls.push(asyncManager.asyncItem(scopeObj.ApprovalsReqManager, "fetchRejectedACHTransactions", [params]));
    }
    if (this.checkAtLeastOnePermission(['ACH_FILES'])) {
      asynCalls.push(asyncManager.asyncItem(scopeObj.ApprovalsReqManager, "fetchRejectedACHFiles", [params]));
    }

    asyncManager.callAsync(
      asynCalls, this.processACHRejected.bind(this, navigationObject)
    );
  };

  /**
     * prepareFinalACHRejected : Method to format the data if all needed are fetched 
     * @member of {ApprovalsReqModule_PresentationController}
     * @param {JSON Array} ACHRejected - Array of responses where ACHRejected[0] is for ACH Files and ACHRejected[1] for Transactions.
     * @return {} 
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.prepareFinalACHApprovals = function(ACHApprovals) {

    var i = 0;
    var achApprovalData = {};

    if (this.checkAtLeastOnePermission(['ACH_COLLECTION_APPROVE', 'ACH_COLLECTION_SELF_APPROVAL', 'ACH_PAYMENT_APPROVE', 'ACH_PAYMENT_SELF_APPROVAL'])) {
      var ACHTransactions = this.onFetchACHTransactionsSuccess(ACHApprovals[i].data);
      achApprovalData.ACHTransactions = ACHTransactions;
      i++;
    }

    if (this.checkAtLeastOnePermission(['ACH_FILES'])) {
      var ACHFiles = this.onFetchACHFilesSuccess(ACHApprovals[i].data);
      achApprovalData.ACHFiles = ACHFiles;
    }

    return (achApprovalData);
  };


  /**
     * processACHRejected : Method to callCompleteSucces if all needed are fetched 
     * @member of {ACHModule_PresentationController}
     * @param {object} navigationObject - JSON object with info about Successforms, Context and Module
     * @param {JSON Array} asyncResponse - Array of responses called in asyncManager.
     * @return {} 
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.processACHRejected = function(navigationObject, asyncResponse) {
    if (asyncResponse.isAllSuccess()) {
      this.completeSuccessCall(navigationObject, "prepareFinalACHRejected", asyncResponse.responses);
    }
  };

  /**
     * prepareFinalACHRejected : Method to format the data if all needed are fetched 
     * @member of {ACHModule_PresentationController}
     * @param {JSON Array} ACHRejected - Array of responses where ACHRejected[0] is for ACH Files and ACHRejected[1] for Transactions.
     * @return {} 
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.prepareFinalACHRejected = function(ACHRejected) {

    var i = 0;
    var achRejectedData = {};

    if (this.checkAtLeastOnePermission(['ACH_COLLECTION_APPROVE', 'ACH_COLLECTION_SELF_APPROVAL', 'ACH_PAYMENT_APPROVE', 'ACH_PAYMENT_SELF_APPROVAL'])) {
      var ACHTransactions = this.onFetchACHTransactionsSuccess(ACHRejected[i].data);
      achRejectedData.ACHTransactions = ACHTransactions;
      i++;
    }

    if (this.checkAtLeastOnePermission(['ACH_FILES'])) {
      var ACHFiles = this.onFetchACHFilesSuccess(ACHRejected[i].data);
      achRejectedData.ACHFiles = ACHFiles;
    }

    return (achRejectedData);

  };

  ApprovalsReqModule_PresentationController.prototype.formPresenter = function(frmName, data) {
    this.presentUserInterface(frmName, data);
  };

  ApprovalsReqModule_PresentationController.prototype.getRequestsHistory = function(navObj) {
    var params = navObj.requestData;
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObj.onSuccess.form);
    this.ApprovalsReqManager.getRequestsHistory(
      params,
      this.completeSuccessCall.bind(this, navObj, "ongetRequestsHistorySuccess"),
      this.completeFailedCall.bind(this, navObj, "ongetRequestsHistoryFailure")
    );
  };

  ApprovalsReqModule_PresentationController.prototype.ongetRequestsHistorySuccess = function(response) {
    return response.RequestHistory;
  };

  ApprovalsReqModule_PresentationController.prototype.ongetRequestsHistoryFailure = function(error) {
    return (error);
  };

  /**
     * Wrapper method to be passed as successcallback,updates desired form with help navigationObject,dataProcessor,and response
     *@param {object} navigaton object
     *@param {function} dataProcessor - this function is used to process and return formatted response.
     *@param response from service call
     */
  ApprovalsReqModule_PresentationController.prototype.completeSuccessCall = function(navigationObject, dataProcessor, response) {
    if (!kony.sdk.isNullOrUndefined(navigationObject)) {
      if (!kony.sdk.isNullOrUndefined(navigationObject.onSuccess)) {
        var processedData;
        if (!kony.sdk.isNullOrUndefined(dataProcessor) && dataProcessor !== "" && this[dataProcessor] instanceof Function) {
          processedData = this[dataProcessor](response);
        } else {
          processedData = response;
        }

        if (!kony.sdk.isNullOrUndefined(processedData)) {
          processedData.CreatedOn = CommonUtilities.getFrontendDateStringInUTC(processedData.CreatedOn, "mm/dd/yyyy");
          processedData.EffectiveDate = CommonUtilities.getFrontendDateStringInUTC(processedData.EffectiveDate, "mm/dd/yyyy");
          var navigationContext = {};
          navigationContext.context = {
            key: navigationObject.onSuccess.context.key,
            responseData: processedData
          };
          navigationContext.form = navigationObject.onSuccess.form;
          if (kony.application.getCurrentForm().id !== navigationObject.onSuccess.form) {
            applicationManager.getNavigationManager().navigateTo(navigationObject.onSuccess.form);
          }
          applicationManager.getNavigationManager().updateForm(navigationContext.context, navigationContext.form);
        } else {
          kony.print("Response is null or undefined");
        }
      }
    }
  };

  ApprovalsReqModule_PresentationController.prototype.getApprovalsReqCampaigns = function() {
    var scope = this;
    if (OLBConstants.CLIENT_PROPERTIES && OLBConstants.CLIENT_PROPERTIES.OLB_ENABLE_INAPP_CAMPAIGNS && OLBConstants.CLIENT_PROPERTIES.OLB_ENABLE_INAPP_CAMPAIGNS.toUpperCase() === "TRUE") {
      var asyncManager = applicationManager.getAsyncManager();
      var directMktManager = applicationManager.getDirectMarketingManager();
      asyncManager.callAsync(
        [
          asyncManager.asyncItem(directMktManager, 'getAds', ["accountDashboardCampaignsWeb"])
        ],
        function(asyncResponses) {
          scope.getCampaigns(asyncResponses.responses[0].data);
        }
      )
    } else {
      scope.getCampaignsSuccess([]);
    }
  };
  /**
     *Method is used for fetching of campaigns
     * @param {Object}- list of campaigns
     */
  ApprovalsReqModule_PresentationController.prototype.getCampaigns = function(response) {
    if (response.campaignSpecifications)
      this.getCampaignsSuccess(response);
    else
      this.getCampaignsFailure(response);
  };
  /**
     * Method that gets called when fetching unread messages is successful
     * @param {Object} messagesObj List of messages Object
     */
  ApprovalsReqModule_PresentationController.prototype.getCampaignsSuccess = function(res) {
    applicationManager.getNavigationManager().updateForm({
      "campaignRes": res["campaignSpecifications"]
    });
  };
  /**
     * Method that gets called when there is an error in fetching unread messages for account dashboard
     * @param {Object} error Error Object
     */
  ApprovalsReqModule_PresentationController.prototype.getCampaignsFailure = function(error) {
    applicationManager.getNavigationManager().updateForm({
      "campaignError": error
    });
  };


  /**
     * Wrapper method to be passed as failurecallback,updates desired form with help navigationObject,dataProcessor,and response
     *@param {object} navigaton object
     *@param {function} dataProcessor - this function is used to process and return formatted response.
     *@param response from service call
     */
  ApprovalsReqModule_PresentationController.prototype.completeFailedCall = function(navigationObject, dataProcessor, response) {
    if (!kony.sdk.isNullOrUndefined(navigationObject)) {
      if (!kony.sdk.isNullOrUndefined(navigationObject.onFailure)) {
        var processedData;
        if (!kony.sdk.isNullOrUndefined(dataProcessor) && dataProcessor !== "" && this[dataProcessor] instanceof Function) {
          processedData = this[dataProcessor](response);
        } else {
          processedData = response;
        }

        if (!kony.sdk.isNullOrUndefined(processedData)) {
          var navigationContext = {};
          navigationContext.context = {
            key: navigationObject.onFailure.context.key,
            responseData: processedData
          };
          navigationContext.form = navigationObject.onFailure.form;
          if (kony.application.getCurrentForm().id !== navigationObject.onFailure.form) {
            applicationManager.getNavigationManager().navigateTo(navigationObject.onFailure.form);
          }
          applicationManager.getNavigationManager().updateForm(navigationContext.context, navigationContext.form);
        } else {
          kony.print("Response is null or undefined");
        }
      }
    }
  };

  /**
     * no service call navigation to forms
     */
  ApprovalsReqModule_PresentationController.prototype.noServiceNavigateToForm = function(formName, contextKey, resData) {
    // Null check for empty parameter
    if (!kony.sdk.isNullOrUndefined(formName)) {
      if (kony.application.getCurrentForm().id !== formName) {
        applicationManager.getNavigationManager().navigateTo(formName);
        applicationManager.getNavigationManager().updateForm({
          "key": contextKey,
          "responseData": resData
        }, formName);
      }
    }
  };

  ApprovalsReqModule_PresentationController.prototype.noServiceNavigateToFormBBUsers = function(formName, contextKey, resData,boolVal) {
    // Null check for empty parameter
    if (!kony.sdk.isNullOrUndefined(formName)) {
      if (kony.application.getCurrentForm().id !== formName) {

        applicationManager.getNavigationManager().updateForm({
          "key": contextKey,
          "responseData": resData,
          "boolVal" : boolVal
        }, formName);
        applicationManager.getNavigationManager().navigateTo(formName);
      }
    }
  };

  /**
     * Fetch Pending Approvals for Bulk Payments
     */
  ApprovalsReqModule_PresentationController.prototype.fetchPendingBulkPaymentApprovals = function(params) {
    applicationManager.getNavigationManager().updateForm({
      "progressBar": true,
    });
    this.ApprovalsReqManager.fetchPendingBulkPaymentApprovals(params, this.fetchPendingBulkPaymentApprovalsSuccess.bind(this), this.fetchPendingBulkPaymentApprovalsFailure.bind(this));
  };

  ApprovalsReqModule_PresentationController.prototype.fetchPendingBulkPaymentApprovalsSuccess = function(response) {

    var formattedResponse = this.formatBulkpaymentAppReqData(response, 0);
    applicationManager.getNavigationManager().updateForm({
      "fetchApprovalsForBulkPay": formattedResponse,
    }, "frmBBMyApprovals");
  };

  ApprovalsReqModule_PresentationController.prototype.fetchPendingBulkPaymentApprovalsFailure = function(responseError) {
    applicationManager.getNavigationManager().updateForm({
      "serverError": true,
      "SERVICE_ERROR": responseError.errorMessage,
    }, "frmBBMyApprovals");
  };

  /**
     * Fetch Pending Requests for Bulk Payments
     */
  ApprovalsReqModule_PresentationController.prototype.fetchPendingBulkPaymentRequests = function(params) {
    applicationManager.getNavigationManager().updateForm({
      "progressBar": true,
    });
    this.ApprovalsReqManager.fetchPendingBulkPaymentRequests(params, this.fetchPendingBulkPaymentRequestsSuccess.bind(this), this.fetchPendingBulkPaymentRequestsFailure.bind(this));
  };

  ApprovalsReqModule_PresentationController.prototype.fetchPendingBulkPaymentRequestsSuccess = function(response) {

    var formattedResponse = this.formatBulkpaymentAppReqData(response, 0);
    applicationManager.getNavigationManager().updateForm({
      "fetchRequestsForBulkPay": formattedResponse,
    }, "frmBBMyRequests");
  };

  ApprovalsReqModule_PresentationController.prototype.fetchPendingBulkPaymentRequestsFailure = function(responseError) {
    applicationManager.getNavigationManager().updateForm({
      "serverError": true,
      "SERVICE_ERROR": responseError.errorMessage,
    }, "frmBBMyRequests");
  };

  /**
     * Fetch Approval History for Bulk Payments
     */
  ApprovalsReqModule_PresentationController.prototype.fetchBulkPaymentApprovalHistory = function(params) {
    applicationManager.getNavigationManager().updateForm({
      "progressBar": true,
    });
    this.ApprovalsReqManager.fetchRecordsHistoryActedByMe(params, this.fetchBulkPaymentApprovalHistorySuccess.bind(this), this.fetchBulkPaymentApprovalHistoryFailure.bind(this));
  };

  ApprovalsReqModule_PresentationController.prototype.fetchBulkPaymentApprovalHistorySuccess = function(response) {

    var formattedResponse = this.formatBulkpaymentAppReqData(response, 1);
    applicationManager.getNavigationManager().updateForm({
      "fetchApprovalHistoryForBulkPay": formattedResponse,
    }, "frmBBApprovalHistory");
  };

  ApprovalsReqModule_PresentationController.prototype.fetchBulkPaymentApprovalHistoryFailure = function(responseError) {
    applicationManager.getNavigationManager().updateForm({
      "serverError": true,
      "SERVICE_ERROR": responseError.errorMessage,
    }, "frmBBApprovalHistory");
  };

  /**
     * Fetch Request History for Bulk Payments
     */
  ApprovalsReqModule_PresentationController.prototype.fetchBulkPaymentRequestHistory = function(params) {
    applicationManager.getNavigationManager().updateForm({
      "progressBar": true,
    });
    this.ApprovalsReqManager.fetchRecordsHistoryReviewedByMe(params, this.fetchBulkPaymentRequestHistorySuccess.bind(this), this.fetchBulkPaymentRequestHistoryFailure.bind(this));
  };

  ApprovalsReqModule_PresentationController.prototype.fetchBulkPaymentRequestHistorySuccess = function(response) {

    var formattedResponse = this.formatBulkpaymentAppReqData(response, 1);
    applicationManager.getNavigationManager().updateForm({
      "fetchRequestHistoryForBulkPay": formattedResponse,
    }, "frmBBRequestHistory");
  };

  ApprovalsReqModule_PresentationController.prototype.fetchBulkPaymentRequestHistoryFailure = function(responseError) {
    applicationManager.getNavigationManager().updateForm({
      "serverError": true,
      "SERVICE_ERROR": responseError.errorMessage,
    }, "frmBBRequestHistory");
  };

  ApprovalsReqModule_PresentationController.prototype.fetchApprovalHistory = function(params) {
    applicationManager.getNavigationManager().updateForm({
      progressBar: true
    });
    this.ApprovalsReqManager.getApprovalHistory(params, this.fetchApprovalHistorySuccess.bind(this), this.onServerError.bind(this));
  };

  ApprovalsReqModule_PresentationController.prototype.fetchApprovalPending = function(params) {
    applicationManager.getNavigationManager().updateForm({
      progressBar: true
    },"frmBBApprovalsDashboard");
    this.ApprovalsReqManager.getApprovalPending(params, this.fetchApprovalPendingSuccess.bind(this), this.onServerError.bind(this));
  };

  ApprovalsReqModule_PresentationController.prototype.fetchApprovalHistorySuccess = function(response) {

    /* segregate the data on monetary and non monetary basis and prepare two separate payloads */
    var scopeObj = this;
    response.records.forEach(function(responseObj) {
      responseObj.currencyCode = CommonUtilities.getCurrencyCode(responseObj.accountId);
      responseObj.accountId = {
        text: kony.sdk.isNullOrUndefined(CommonUtilities.getMaskedAccName(responseObj.accountId)[0]) ? "-" : CommonUtilities.getMaskedAccName(responseObj.accountId)[0],
        toolTip: kony.sdk.isNullOrUndefined(CommonUtilities.getMaskedAccName(responseObj.accountId)[1]) ? "-" : CommonUtilities.getMaskedAccName(responseObj.accountId)[1]
      };
      if (responseObj.status === BBConstants.TRANSACTION_STATUS.REJECTED) {
        responseObj.Approval = 1 + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Rejection");
      } else if (responseObj.status === BBConstants.TRANSACTION_STATUS.WITHDRAWN) {
        responseObj.Approval = 1 + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Withdrawn");
      } else if (responseObj.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase() && !kony.sdk.isNullOrUndefined(responseObj.requiredApprovals)) {
        responseObj.Approval = responseObj.receivedApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + " " + responseObj.requiredApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Approved");
      } else if (kony.sdk.isNullOrUndefined(responseObj.requiredApprovals) && !kony.sdk.isNullOrUndefined(responseObj.receivedApprovals)) {
        responseObj.Approval = responseObj.receivedApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Approved");
      } else {
        responseObj.Approval = "N/A";
      }
      if (responseObj.status === BBConstants.TRANSACTION_STATUS.REJECTED) {
        responseObj.approvals = 1 + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Rejection");
      } else if (responseObj.status === BBConstants.TRANSACTION_STATUS.WITHDRAWN) {
        responseObj.approvals = 1 + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Withdrawn");
      } else if (responseObj.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase() && !kony.sdk.isNullOrUndefined(responseObj.requiredApprovals)) {
        responseObj.approvals = responseObj.receivedApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + " " + responseObj.requiredApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Approved");
      } else if (kony.sdk.isNullOrUndefined(responseObj.requiredApprovals) && !kony.sdk.isNullOrUndefined(responseObj.receivedApprovals)) {
        responseObj.approvals = responseObj.receivedApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Approved");
      } else {
        responseObj.approvals = "N/A";
      }

      responseObj.TotalDebitAmount = CommonUtilities.formatCurrencyWithCommas(responseObj.totalDebitAmount, true);
      responseObj.Amount = CommonUtilities.formatCurrencyWithCommas(responseObj.amount, true);

      responseObj.userName = responseObj.CustomerName;
      responseObj.Reccurence = responseObj.recurrence
      responseObj.Frequency = responseObj.frequency;
      responseObj.Request_id = responseObj.requestId;
      responseObj.Status = responseObj.status;
      (responseObj.featureActionId === "BULK_PAYMENT_SINGLE_SUBMIT"||responseObj.featureActionId === "BULK_PAYMENT_MULTIPLE_SUBMIT")? responseObj.amount = applicationManager.getFormatUtilManager().formatAmount(responseObj.transactionAmount): responseObj.amount = CommonUtilities.formatCurrencyWithCommas(responseObj.transactionAmount , false,responseObj.transactionCurrency);
      if (!kony.sdk.isNullOrUndefined(responseObj.charges) && responseObj.charges.length !== 0) {
        responseObj.lblServiceCharge = {
          text: kony.i18n.getLocalizedString("i18n.TransfersEur.ServiceCharge"),
          toolTip: kony.i18n.getLocalizedString("i18n.TransfersEur.ServiceCharge"),
          isVisible: true
        }
        var parsedChargesVal = scopeObj.safelyParseResponseToJSON(responseObj.charges);
        var chargeBreakdown = "";
        var formatManager = applicationManager.getFormatUtilManager();
        if(parsedChargesVal.length !== 0 && typeof(parsedChargesVal) === 'object'){
          parsedChargesVal.forEach(function(obj) {
            var currencySymbol = formatManager.getCurrencySymbol(obj.chargeCurrencyId);
            var str = `${obj.chargeName} : ${currencySymbol} ${obj.chargeAmount}`;
            if (chargeBreakdown === "") {
              chargeBreakdown = `${str}`;
            } else {
              chargeBreakdown = `${chargeBreakdown}
                                           ${str}`;
            };
          })
          responseObj.lblServiceChargeVal = {
            text: chargeBreakdown,
            toolTip: chargeBreakdown,
            isVisible: true
          }
        }
        else{
          responseObj.lblServiceCharge = {
            isVisible: false
          }
          responseObj.lblServiceChargeVal = {
            isVisible: false
          }
        }
      }
      else {
        responseObj.lblServiceCharge = {
          isVisible: false
        }
        responseObj.lblServiceChargeVal = {
          isVisible: false
        }
      }
      if(!kony.sdk.isNullOrUndefined(responseObj.creditValueDate)){
        responseObj.lblCreditValueDate = {
          text: kony.i18n.getLocalizedString("i18n.Transfers.CreditValueDate"),
          toolTip: kony.i18n.getLocalizedString("i18n.Transfers.CreditValueDate"),
          isVisible: true
        }
        responseObj.lblCreditValueDateVal = {
          text: CommonUtilities.getFrontendDateStringInUTC(responseObj.creditValueDate, "mm/dd/yyyy"),
          toolTip: CommonUtilities.getFrontendDateStringInUTC(responseObj.creditValueDate, "mm/dd/yyyy"),
          isVisible: true
        }
      }
      else{
        responseObj.lblCreditValueDate = {
          isVisible: false
        }
        responseObj.lblCreditValueDateVal = {
          isVisible: false
        }
      }
      responseObj.Payee = {
        text: kony.sdk.isNullOrUndefined(responseObj.payee) ? "-" : CommonUtilities.truncateStringWithGivenLength(responseObj.payee, 15),
        toolTip: kony.sdk.isNullOrUndefined(responseObj.payee) ? "-" : responseObj.payee
      };
      if (!kony.sdk.isNullOrUndefined(responseObj.sentDate) && responseObj.sentDate!=="NA") {
        responseObj.sentDate = CommonUtilities.getFrontendDateStringInUTC(responseObj.sentDate, "mm/dd/yyyy");
      }
      else if(!kony.sdk.isNullOrUndefined(responseObj.createdts) && responseObj.createdts!=="NA") {
        responseObj.sentDate = CommonUtilities.getFrontendDateStringInUTC(responseObj.createdts, "mm/dd/yyyy");
      } 
      else {
        responseObj.sentDate = "NA";
      }
      if (!kony.sdk.isNullOrUndefined(responseObj.processingDate) && responseObj.processingDate!=="NA")
        responseObj.processingDate = CommonUtilities.getFrontendDateStringInUTC(responseObj.processingDate, "mm/dd/yyyy");
      else
        responseObj.processingDate = "NA";

      //responseObj.TransactionDate = !kony.sdk.isNullOrUndefined(responseObj.sentDate) ? CommonUtilities.getFrontendDateString(responseObj.sentDate, "mm/dd/yyyy") : responseObj.processingDate;
		if (!kony.sdk.isNullOrUndefined(responseObj.sentDate) && responseObj.sentDate!=="NA") {
        responseObj.TransactionDate = CommonUtilities.getFrontendDateStringInUTC(responseObj.sentDate, "mm/dd/yyyy");
      }
      else if(!kony.sdk.isNullOrUndefined(responseObj.processingDate)) {
        responseObj.TransactionDate = responseObj.processingDate;
      }
      else if(!kony.sdk.isNullOrUndefined(responseObj.createdts) && responseObj.createdts!=="NA") {
        responseObj.TransactionDate = CommonUtilities.getFrontendDateStringInUTC(responseObj.createdts, "mm/dd/yyyy");
      }
      else {
        responseObj.TransactionDate = "NA";
      }

      if (!kony.sdk.isNullOrUndefined(responseObj.approvalDate) && responseObj.approvalDate!=="NA")
        responseObj.approvalDate = CommonUtilities.getFrontendDateStringInUTC(responseObj.approvalDate, "mm/dd/yyyy");
      else
        responseObj.approvalDate = "NA";

      if (!kony.sdk.isNullOrUndefined(responseObj.customerName)){
        responseObj.customerName = {
          text : CommonUtilities.truncateStringWithGivenLength(responseObj.customerName, 15)+"-"+CommonUtilities.getLastFourDigit(responseObj.customerId),
          toolTip : responseObj.customerName+"-"+responseObj.customerId
        }
      }
      else
        responseObj.customerName = "NA";
     // responseObj.amount = CommonUtilities.formatCurrencyWithCommas(responseObj.amount, false,responseObj.currencyCode);
     (responseObj.featureActionId === "BULK_PAYMENT_MULTIPLE_SUBMIT" ||  responseObj.featureActionId === "BULK_PAYMENT_SINGLE_SUBMIT") ? responseObj.amount = applicationManager.getFormatUtilManager().formatAmount(responseObj.amount): responseObj.amount = CommonUtilities.formatCurrencyWithCommas(responseObj.amount , false,responseObj.currencyCode);

      if(kony.sdk.isNullOrUndefined(responseObj.TotalCreditAmount))
        responseObj.TotalCreditAmount = "--";
      else
        responseObj.TotalCreditAmount = CommonUtilities.formatCurrencyWithCommas(responseObj.TotalCreditAmount, false,responseObj.currencyCode);
      //   responseObj.approvals = responseObj.receivedApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + " " + responseObj.requiredApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Approved");

      if (kony.sdk.isNullOrUndefined(responseObj.description))
        responseObj.description = "--";

      if (kony.sdk.isNullOrUndefined(responseObj.paymentId))
        responseObj.paymentId = "--";

      if (kony.sdk.isNullOrUndefined(responseObj.recurrence))
        responseObj.recurrence = "--";

      if (kony.sdk.isNullOrUndefined(responseObj.frequency))
        responseObj.frequency = "--";  

      if (kony.sdk.isNullOrUndefined(responseObj.totalTransactions))
        responseObj.totalTransactions = "--";  

      if (kony.sdk.isNullOrUndefined(responseObj.processingMode))
        responseObj.processingMode = "--";  

      if(kony.sdk.isNullOrUndefined(responseObj.reference))
        responseObj.reference = "--";

      if(kony.sdk.isNullOrUndefined(responseObj.requestType)){
        if(!kony.sdk.isNullOrUndefined(responseObj.featureActionName))
          responseObj.requestType = responseObj.featureActionName;
        else
          responseObj.requestType = "--";
      }

      if(!kony.sdk.isNullOrUndefined(responseObj.FileName)){
        responseObj.FileName = CommonUtilities.truncateStringWithGivenLength(responseObj.FileName, 15) ;
      }else {
        responseObj.FileName = "--";
      }

      responseObj.lblTrStatus ={
        text : responseObj.status ,
        skin : "bbSknLbl424242SSP15Px"
      }; 

      responseObj.featureName = (kony.os.deviceInfo().deviceWidth <= 400 )?CommonUtilities.truncateStringWithGivenLength(responseObj.featureName, 32) : responseObj.featureName  ;

      if(!kony.sdk.isNullOrUndefined(responseObj.confirmationNumber)){
        responseObj.confirmationNumberVal = responseObj.confirmationNumber.replace("_PSD2","");
      }
      else{
        responseObj.confirmationNumberVal = "--";
      }

      if(!kony.sdk.isNullOrUndefined(responseObj.transactionId)){
        responseObj.transactionIdVal = responseObj.transactionId.replace("_PSD2","");
      }
      else{
        responseObj.transactionIdVal = "--";
      }

      if (!kony.sdk.isNullOrUndefined(responseObj.indicativeRate) && !kony.sdk.isNullOrUndefined(responseObj.transactionCurrency)
          && !kony.sdk.isNullOrUndefined(responseObj.totalDebitAmount) && !kony.sdk.isNullOrUndefined(responseObj.transactionAmount)
          && !kony.sdk.isNullOrUndefined(responseObj.fromAccountCurrency)
          && (responseObj.transactionCurrency !== responseObj.fromAccountCurrency)) {
        responseObj.lblExchangeRate = {
          text: kony.i18n.getLocalizedString("i18n.TransfersEur.ExchangeRate"),
          toolTip: kony.i18n.getLocalizedString("i18n.TransfersEur.ExchangeRate"),
          isVisible: true
        }
        if(responseObj.totalDebitAmount <= responseObj.transactionAmount){
          responseObj.lblExchangeRateVal = {
            text: "1,00" + responseObj.fromAccountCurrency + "=" + responseObj.indicativeRate + responseObj.transactionCurrency,
            toolTip: "1,00" + responseObj.fromAccountCurrency + "=" + responseObj.indicativeRate + responseObj.transactionCurrency,
            isVisible: true
          }
        } 
        else if(responseObj.totalDebitAmount > responseObj.transactionAmount){
          responseObj.lblExchangeRateVal = {
            text: "1,00" + responseObj.transactionCurrency + "=" + responseObj.indicativeRate + responseObj.fromAccountCurrency,
            toolTip: "1,00" + responseObj.transactionCurrency + "=" + responseObj.indicativeRate + responseObj.fromAccountCurrency,
            isVisible: true
          }
        }
      }
      else{
        responseObj.lblExchangeRate = {
          isVisible : false
        }
        responseObj.lblExchangeRateVal = {
          isVisible : false
        }
      }
      responseObj.toAccountName = !kony.sdk.isNullOrUndefined(responseObj.toAccountName) ? responseObj.toAccountName : "-";
      responseObj.beneficiaryBankAddress = !kony.sdk.isNullOrUndefined(responseObj.beneficiaryBankAddress) ? responseObj.beneficiaryBankAddress : "-";

      if(!kony.sdk.isNullOrUndefined(responseObj.description)){
        responseObj.paymentDetails = {
          text : CommonUtilities.truncateStringWithGivenLength(responseObj.description, 140),
          toolTip : responseObj.description
        }
      }else {
        responseObj.paymentDetails = "-";
      }
      responseObj.beneficiaryNickName = "-";
      responseObj.beneficiaryAddress = "-";
      if(kony.sdk.isNullOrUndefined(responseObj.sentBy)){
        if(!kony.sdk.isNullOrUndefined(responseObj.sentByName)) {
          responseObj.sentBy = responseObj.sentByName;
        } else {
          responseObj.sentBy = "--";
        }
      }
      responseObj.frequencyEndDate = !kony.sdk.isNullOrUndefined(responseObj.frequencyEndDate) ? CommonUtilities.getFrontendDateString(responseObj.frequencyEndDate, "mm/dd/yyyy") : "-";
      responseObj.paymentType = !kony.sdk.isNullOrUndefined(responseObj.paymentType) && responseObj.paymentType.length > 0  ? responseObj.paymentType : "-";
      if(['INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL','INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL','INTRA_BANK_FUND_TRANSFER_CREATE_RECEPIENT','INTRA_BANK_FUND_TRANSFER_DELETE_RECEPIENT','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL'].includes(responseObj.featureActionId)){
        responseObj.swiftCode = responseObj.swiftCode || "-";
        responseObj.nickName = responseObj.nickName || "-";
        responseObj.accountNumber = responseObj.accountNumber ? responseObj.accountNumber : (responseObj.iban ? responseObj.iban : "-");
        responseObj.benAddressLine = responseObj.addressLine1 ? responseObj.addressLine1 + (responseObj.addressLine2 ? ", "+responseObj.addressLine2 : "") : (responseObj.addressLine2 ? responseObj.addressLine2 : "");
        responseObj.benAddressLine = responseObj.benAddressLine ?  responseObj.benAddressLine : "-";
        responseObj.paymentMethod = responseObj.isInternationalAccount === "true" ? kony.i18n.getLocalizedString("i18n.ProfileManagement.International"): "Same Bank";
        responseObj.customersLinked = responseObj.cif ? JSON.parse(responseObj.cif).length + " "+kony.i18n.getLocalizedString("i18n.approvals.customer"): "0 "+ kony.i18n.getLocalizedString("i18n.approvals.customer");
         //in case of edit check for only linked cif id's count
        if(['INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL'].includes(responseObj.featureActionId)){
          var cifArr = responseObj.cif ? JSON.parse(responseObj.cif) : [];
          var linkedCust = cifArr.reduce(function(count,rec){
            var linkedCif = [];
            linkedCif = rec.cifs.filter(function(cifRec){
              if(cifRec.id && cifRec.isLinked === true){
                return cifRec;
              }
            });
            count = count + linkedCif.length;
            return count;
          },0);
          responseObj.customersLinked = linkedCust ? linkedCust + " "+kony.i18n.getLocalizedString("i18n.approvals.customer"): "0 "+ kony.i18n.getLocalizedString("i18n.approvals.customer");
        }
      }

    });
    applicationManager.getNavigationManager().updateForm({
      approvalHistory: response,
      progressBar: false
    }, "frmBBApprovalsDashboard");
  };

  ApprovalsReqModule_PresentationController.prototype.fetchApprovalPendingSuccess = function(response) {

    /* segregate the data on monetary and non monetary basis and prepare two separate payloads */

    var scopeObj = this;
    var businessAccounts = [];
    var personalAccounts = [];
    var profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
    var accounts = applicationManager.getConfigurationManager().userAccounts;
    accounts.forEach(function(account) {
      if(!kony.sdk.isNullOrUndefined(account.isBusinessAccount))
        if(account.isBusinessAccount === "true")
          businessAccounts.push(account.accountID);
        else
          personalAccounts.push(account.accountID);
    });
    response.records.forEach(function(responseObj) {
      if(responseObj.accountId){
      responseObj.currencyCode = CommonUtilities.getCurrencyCode(responseObj.accountId);
    }
      if(kony.sdk.isNullOrUndefined(responseObj.sentBy)){
        if(!kony.sdk.isNullOrUndefined(responseObj.sentByName)) {
          responseObj.sentBy = responseObj.sentByName;
        } else {
          responseObj.sentBy = "--";
        }
      }
      if (!kony.sdk.isNullOrUndefined(responseObj.featureActionName) && responseObj.featureActionId === BBConstants.CHEQUE_BOOK_REQUEST_CREATE) {
        if(profileAccess === "both") {
          responseObj.flxCheckRequestIcon = {
            "isVisible": true,
            "left" : "3%"
          };
          if(businessAccounts.includes(responseObj.accountId))
            responseObj.lblRoleIcon = {
              "text": 'r',
              "isVisible": true

            };
          else if(personalAccounts.includes(responseObj.accountId))
            responseObj.lblRoleIcon = {
              "text": 's',
              "isVisible": true
            };
        }
        else{
          responseObj.flxCheckRequestIcon = {
            "isVisible": false
          };
        }

      }
      if(responseObj.accountId){
     let tempAccountId = JSON.parse(JSON.stringify(responseObj.accountId));
            responseObj.accountId = {
                text: kony.sdk.isNullOrUndefined(CommonUtilities.getMaskedAccName(responseObj.accountId)[0]) ? "-" : CommonUtilities.getMaskedAccName(responseObj.accountId)[0],
                toolTip: kony.sdk.isNullOrUndefined(CommonUtilities.getMaskedAccName(responseObj.accountId)[1]) ? "-" : CommonUtilities.getMaskedAccName(responseObj.accountId)[1]
            };
            if (responseObj.accountId.text == "-") {
                responseObj.accountId = {
                    text: "XXXX-" + tempAccountId.substring(responseObj.accountId.length - 4, responseObj.accountId.length),
                    tool: tempAccountId
                };
            }
      }
      if (!kony.sdk.isNullOrUndefined(responseObj.sentDate)) {
        responseObj.sentDate = CommonUtilities.getFrontendDateStringInUTC(responseObj.sentDate, "mm/dd/yyyy");
      }
      else if(!kony.sdk.isNullOrUndefined(responseObj.createdts)) {
        responseObj.sentDate = CommonUtilities.getFrontendDateStringInUTC(responseObj.createdts, "mm/dd/yyyy");
      } 
      else {
        responseObj.sentDate = "NA";
      }
      try{
        if (!kony.sdk.isNullOrUndefined(responseObj.processingDate))
          responseObj.processingDate = CommonUtilities.getFrontendDateStringInUTC(responseObj.processingDate, "mm/dd/yyyy");
        else if (!kony.sdk.isNullOrUndefined(responseObj.sentDate))
          responseObj.processingDate = CommonUtilities.getFrontendDateStringInUTC(responseObj.sentDate, "mm/dd/yyyy");
      else if(!kony.sdk.isNullOrUndefined(responseObj.createdts)) 
        responseObj.processingDate = CommonUtilities.getFrontendDateStringInUTC(responseObj.createdts, "mm/dd/yyyy");
        else
          responseObj.processingDate = "NA";	
      }catch(err){

      }

      if (!kony.sdk.isNullOrUndefined(responseObj.customerName)){
        responseObj.customerName = {
          text : CommonUtilities.truncateStringWithGivenLength(responseObj.customerName, 15)+"-"+CommonUtilities.getLastFourDigit(responseObj.customerId),
          toolTip : responseObj.customerName+"-"+responseObj.customerId
        }
      }
      else
        responseObj.customerName = "NA";
      if (!kony.sdk.isNullOrUndefined(responseObj.featureActionName)) {
        responseObj.featureActionNameToolTip = responseObj.featureActionName;
        responseObj.featureActionName = CommonUtilities.truncateStringWithGivenLength(responseObj.featureActionName, 30);
        if(responseObj.featureActionId === BBConstants.CHEQUE_BOOK_REQUEST_CREATE){
          responseObj.txtVal = {
            text: responseObj.requestType,
            toolTip: responseObj.requestType
          };
        }
        else{
          responseObj.txtVal = {
            text: responseObj.featureActionName,
            toolTip: responseObj.featureActionNameToolTip
          };
        }
      } else
        responseObj.featureActionName = "NA";

      if(kony.sdk.isNullOrUndefined(responseObj.TotalCreditAmount))
        responseObj.TotalCreditAmount = "--";
      else
        responseObj.TotalCreditAmount = CommonUtilities.formatCurrencyWithCommas(responseObj.TotalCreditAmount, false,responseObj.currencyCode);
      //responseObj.Approval = responseObj.receivedApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + " " + responseObj.requiredApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Approved");
      //             responseObj.DebitOrCreditAccount = {
      //                 text: "...." + CommonUtilities.getLastFourDigit(responseObj.accountId), // CommonUtilities.truncateStringWithGivenLength(responseObj.AccountName + "....", 16) + CommonUtilities.getLastFourDigit(responseObj.DebitAccount),
      //                 toolTip: "...." + CommonUtilities.getLastFourDigit(responseObj.accountId)
      //             };
      if(responseObj.totalDebitAmount){
      responseObj.TotalDebitAmount = CommonUtilities.formatCurrencyWithCommas(responseObj.totalDebitAmount, true);
    }
    if(responseObj.amount){
      responseObj.Amount = CommonUtilities.formatCurrencyWithCommas(responseObj.amount, true);
    }
    if(responseObj.sentDate){
      responseObj.TransactionDate = !kony.sdk.isNullOrUndefined(responseObj.sentDate) ? CommonUtilities.getFrontendDateString(responseObj.sentDate, "mm/dd/yyyy") : responseObj.processingDate;
    } else if(!kony.sdk.isNullOrUndefined(responseObj.createdts)) {
        responseObj.TransactionDate = CommonUtilities.getFrontendDateStringInUTC(responseObj.createdts, "mm/dd/yyyy");
      } 
    if(responseObj.CustomerName){
      responseObj.userName = responseObj.CustomerName;
    }
    if(responseObj.recurrence){
      responseObj.Reccurence = responseObj.recurrence
    }
    if(responseObj.frequency){
      responseObj.Frequency = responseObj.frequency;
  }
      responseObj.Request_id = responseObj.requestId;
      responseObj.Status = responseObj.status;
      if(responseObj.transactionAmount){
      (responseObj.featureActionId === "BULK_PAYMENT_MULTIPLE_SUBMIT" ||responseObj.featureActionId === "BULK_PAYMENT_SINGLE_SUBMIT")? responseObj.amount = applicationManager.getFormatUtilManager().formatAmount(responseObj.transactionAmount): responseObj.amount = CommonUtilities.formatCurrencyWithCommas(responseObj.transactionAmount , false,responseObj.transactionCurrency);
    }
      if (!kony.sdk.isNullOrUndefined(responseObj.charges) && responseObj.charges.length !== 0) {
        responseObj.lblServiceCharge = {
          text: kony.i18n.getLocalizedString("i18n.TransfersEur.ServiceCharge"),
          toolTip: kony.i18n.getLocalizedString("i18n.TransfersEur.ServiceCharge"),
          isVisible: true
        }
        if(responseObj.charges){
        var parsedChargesVal = scopeObj.safelyParseResponseToJSON(responseObj.charges);
      }
        var chargeBreakdown = "";
        var formatManager = applicationManager.getFormatUtilManager();
        if(parsedChargesVal && parsedChargesVal.length !== 0 && typeof(parsedChargesVal) === 'object'){
          parsedChargesVal.forEach(function(obj) {
            var currencySymbol = formatManager.getCurrencySymbol(obj.chargeCurrencyId);
            var str = `${obj.chargeName} : ${currencySymbol} ${obj.chargeAmount}`;
            if (chargeBreakdown === "") {
              chargeBreakdown = `${str}`;
            } else {
              chargeBreakdown = `${chargeBreakdown}
                                           ${str}`;
            };
          })
          responseObj.lblServiceChargeVal = {
            text: chargeBreakdown,
            toolTip: chargeBreakdown,
            isVisible: true
          }
        }
        else{
          responseObj.lblServiceCharge = {
            isVisible: false
          }
          responseObj.lblServiceChargeVal = {
            isVisible: false
          }
        }}
      else {
        responseObj.lblServiceCharge = {
          isVisible: false
        }
        responseObj.lblServiceChargeVal = {
          isVisible: false
        }
      }
      if(!kony.sdk.isNullOrUndefined(responseObj.creditValueDate)){
        responseObj.lblCreditValueDate = {
          text: kony.i18n.getLocalizedString("i18n.Transfers.CreditValueDate"),
          toolTip: kony.i18n.getLocalizedString("i18n.Transfers.CreditValueDate"),
          isVisible: true
        }
        responseObj.lblCreditValueDateVal = {
          text: CommonUtilities.getFrontendDateStringInUTC(responseObj.creditValueDate, "mm/dd/yyyy"),
          toolTip: CommonUtilities.getFrontendDateStringInUTC(responseObj.creditValueDate, "mm/dd/yyyy"),
          isVisible: true
        }
      }
      else{
        responseObj.lblCreditValueDate = {
          isVisible: false
        }
        responseObj.lblCreditValueDateVal = {
          isVisible: false
        }
      }
      responseObj.Payee = {
        text: kony.sdk.isNullOrUndefined(responseObj.payee) ? "-" : CommonUtilities.truncateStringWithGivenLength(responseObj.payee, 15),
        toolTip: kony.sdk.isNullOrUndefined(responseObj.payee) ? "-" : responseObj.payee
      };

      //responseObj.approvals = responseObj.receivedApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + " " + responseObj.requiredApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Approved");
      if (responseObj.status === BBConstants.TRANSACTION_STATUS.REJECTED) {
        responseObj.Approval = 1 + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Rejection");
      } else if (responseObj.status === BBConstants.TRANSACTION_STATUS.WITHDRAWN) {
        responseObj.Approval = 1 + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Withdrawn");
      } else if (responseObj.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase() && !kony.sdk.isNullOrUndefined(responseObj.requiredApprovals)) {
        responseObj.Approval = responseObj.receivedApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + " " + responseObj.requiredApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Approved");
      } else if (kony.sdk.isNullOrUndefined(responseObj.requiredApprovals) && !kony.sdk.isNullOrUndefined(responseObj.receivedApprovals)) {
        responseObj.Approval = responseObj.receivedApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Approved");
      } else {
        responseObj.Approval = "N/A";
      }
      if (responseObj.status === BBConstants.TRANSACTION_STATUS.REJECTED) {
        responseObj.approvals = 1 + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Rejection");
      } else if (responseObj.status === BBConstants.TRANSACTION_STATUS.WITHDRAWN) {
        responseObj.approvals = 1 + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Withdrawn");
      } else if (responseObj.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase() && !kony.sdk.isNullOrUndefined(responseObj.requiredApprovals)) {
        responseObj.approvals = responseObj.receivedApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + " " + responseObj.requiredApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Approved");
      } else if (kony.sdk.isNullOrUndefined(responseObj.requiredApprovals) && !kony.sdk.isNullOrUndefined(responseObj.receivedApprovals)) {
        responseObj.approvals = responseObj.receivedApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Approved");
      } else {
        responseObj.approvals = "N/A";
      }
      if (kony.sdk.isNullOrUndefined(responseObj.description))
        responseObj.description = "--";

      if (kony.sdk.isNullOrUndefined(responseObj.paymentId))
        responseObj.paymentId = "--";

      if (kony.sdk.isNullOrUndefined(responseObj.recurrence))
        responseObj.recurrence = "--";

      if (kony.sdk.isNullOrUndefined(responseObj.frequency))
        responseObj.frequency = "--";  

      if (kony.sdk.isNullOrUndefined(responseObj.totalTransactions))
        responseObj.totalTransactions = "--";  

      if (kony.sdk.isNullOrUndefined(responseObj.processingMode))
        responseObj.processingMode = "--";  

      if(kony.sdk.isNullOrUndefined(responseObj.reference))
        responseObj.reference = "--";

      if(kony.sdk.isNullOrUndefined(responseObj.requestType))
        responseObj.requestType = "--";

      if(!kony.sdk.isNullOrUndefined(responseObj.FileName)){
        responseObj.FileName = {
          text : CommonUtilities.truncateStringWithGivenLength(responseObj.FileName, 15),
          toolTip : responseObj.FileName
        }
      }else {
        responseObj.FileName = "--";
      }


      responseObj.featureName = (kony.os.deviceInfo().deviceWidth <= 400 )?CommonUtilities.truncateStringWithGivenLength(responseObj.featureName, 32) : responseObj.featureName  ;

      if(!kony.sdk.isNullOrUndefined(responseObj.confirmationNumber)){
        responseObj.confirmationNumberVal = responseObj.confirmationNumber.replace("_PSD2","");
      }
      else{
        responseObj.confirmationNumberVal = "--";
      }

      if(!kony.sdk.isNullOrUndefined(responseObj.transactionId)){
        responseObj.transactionIdVal = responseObj.transactionId.replace("_PSD2","");
      }
      else{
        responseObj.transactionIdVal = "--";
      }

      if (!kony.sdk.isNullOrUndefined(responseObj.indicativeRate) && !kony.sdk.isNullOrUndefined(responseObj.transactionCurrency)
          && !kony.sdk.isNullOrUndefined(responseObj.totalDebitAmount) && !kony.sdk.isNullOrUndefined(responseObj.transactionAmount)
          && !kony.sdk.isNullOrUndefined(responseObj.fromAccountCurrency)
          && (responseObj.transactionCurrency !== responseObj.fromAccountCurrency)) {
        responseObj.lblExchangeRate = {
          text: kony.i18n.getLocalizedString("i18n.TransfersEur.ExchangeRate"),
          toolTip: kony.i18n.getLocalizedString("i18n.TransfersEur.ExchangeRate"),
          isVisible: true
        }
        if(responseObj.totalDebitAmount && responseObj.transactionAmount && responseObj.totalDebitAmount <= responseObj.transactionAmount){
          responseObj.lblExchangeRateVal = {
            text: "1,00" + responseObj.fromAccountCurrency + "=" + responseObj.indicativeRate + responseObj.transactionCurrency,
            toolTip: "1,00" + responseObj.fromAccountCurrency + "=" + responseObj.indicativeRate + responseObj.transactionCurrency,
            isVisible: true
          }
        } 
        else if(responseObj.totalDebitAmount && responseObj.transactionAmount && responseObj.totalDebitAmount > responseObj.transactionAmount){
          responseObj.lblExchangeRateVal = {
            text: "1,00" + responseObj.transactionCurrency + "=" + responseObj.indicativeRate + responseObj.fromAccountCurrency,
            toolTip: "1,00" + responseObj.transactionCurrency + "=" + responseObj.indicativeRate + responseObj.fromAccountCurrency,
            isVisible: true
          }
        }
      }
      else{
        responseObj.lblExchangeRate = {
          isVisible : false
        }
        responseObj.lblExchangeRateVal = {
          isVisible : false
        }
      }
      responseObj.toAccountName = !kony.sdk.isNullOrUndefined(responseObj.toAccountName) ? responseObj.toAccountName : "-";
      responseObj.beneficiaryBankAddress = !kony.sdk.isNullOrUndefined(responseObj.beneficiaryBankAddress) ? responseObj.beneficiaryBankAddress : "-";

      if(!kony.sdk.isNullOrUndefined(responseObj.description)){
        responseObj.paymentDetails = {
          text : CommonUtilities.truncateStringWithGivenLength(responseObj.description, 140),
          toolTip : responseObj.description
        }
      }else {
        responseObj.paymentDetails = "-";
      }
      responseObj.beneficiaryNickName = "-";
      responseObj.beneficiaryAddress = "-";
      responseObj.frequencyEndDate = !kony.sdk.isNullOrUndefined(responseObj.frequencyEndDate) ? CommonUtilities.getFrontendDateString(responseObj.frequencyEndDate, "mm/dd/yyyy") : "-";
      responseObj.paymentType = !kony.sdk.isNullOrUndefined(responseObj.paymentType) && responseObj.paymentType.length > 0  ? responseObj.paymentType : "-";
      if(['INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL','INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL','INTRA_BANK_FUND_TRANSFER_CREATE_RECEPIENT','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT','INTRA_BANK_FUND_TRANSFER_DELETE_RECEPIENT'].includes(responseObj.featureActionId)){
        if(['INTERNATIONAL_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT','INTRA_BANK_FUND_TRANSFER_DELETE_RECEPIENT'].includes(responseObj.featureActionId)){
          var oldResponseObject = scopeObj.getOldInfoDataObject(responseObj);
          responseObj.swiftCode = oldResponseObject.swiftCode || "-";
        responseObj.nickName = oldResponseObject.nickName || "-";
        responseObj.accountNumber = oldResponseObject.accountNumber ? oldResponseObject.accountNumber : (oldResponseObject.iban ? oldResponseObject.iban : "-");
        responseObj.benAddressLine = oldResponseObject.addressLine1 ? oldResponseObject.addressLine1 + (oldResponseObject.addressLine2 ? ", "+oldResponseObject.addressLine2 : "") : (oldResponseObject.addressLine2 ? oldResponseObject.addressLine2 : "");
        responseObj.benAddressLine = oldResponseObject.benAddressLine ?  oldResponseObject.benAddressLine : "-";
        }else{
        responseObj.swiftCode = responseObj.swiftCode || "-";
        responseObj.nickName = responseObj.nickName || "-";
        responseObj.accountNumber = responseObj.accountNumber ? responseObj.accountNumber : (responseObj.iban ? responseObj.iban : "-");
        responseObj.benAddressLine = responseObj.addressLine1 ? responseObj.addressLine1 + (responseObj.addressLine2 ? ", "+responseObj.addressLine2 : "") : (responseObj.addressLine2 ? responseObj.addressLine2 : "");
        responseObj.benAddressLine = responseObj.benAddressLine ?  responseObj.benAddressLine : "-";
      }
        responseObj.paymentMethod = responseObj.isInternationalAccount === "true" ? kony.i18n.getLocalizedString("i18n.ProfileManagement.International"): "Same Bank";
        responseObj.customersLinked = responseObj.cif ? JSON.parse(responseObj.cif).length + " "+kony.i18n.getLocalizedString("i18n.approvals.customer"): "0 "+ kony.i18n.getLocalizedString("i18n.approvals.customer");
        //in case of edit check for only linked cif id's count
        if(['INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL'].includes(responseObj.featureActionId)){
          var cifArr = responseObj.cif ? JSON.parse(responseObj.cif) : [];
          var linkedCust = cifArr.reduce(function(count,rec){
            var linkedCif = [];
            linkedCif = rec.cifs.filter(function(cifRec){
              if(cifRec.id && cifRec.isLinked === true){
                return cifRec;
              }
            });
            count = count + linkedCif.length;
            return count;
          },0);
          responseObj.customersLinked = linkedCust ? linkedCust + " "+kony.i18n.getLocalizedString("i18n.approvals.customer"): "0 "+ kony.i18n.getLocalizedString("i18n.approvals.customer");
        }
      }
    });
    applicationManager.getNavigationManager().updateForm({
      approvalPending: response,
      progressBar: false
    }, "frmBBApprovalsDashboard");
  };
  ApprovalsReqModule_PresentationController.prototype.fetchRequestPending = function(params) {
    applicationManager.getNavigationManager().updateForm({
      progressBar: true
    });
    this.ApprovalsReqManager.getRequestPending(params, this.fetchRequestPendingSuccess.bind(this), this.onServerError.bind(this));

  };
  ApprovalsReqModule_PresentationController.prototype.getOldInfoDataObject = function(totalRecepientDetails) {
    var recepientOldInfoDetails = {};
            if (totalRecepientDetails) {
                if (totalRecepientDetails.oldInfo && typeof totalRecepientDetails.oldInfo === "string") {
                    recepientOldInfoDetails = JSON.parse(totalRecepientDetails.oldInfo);
                    //incase if reponse still needs to be parsed
                    while (recepientOldInfoDetails !== "" && typeof recepientOldInfoDetails === "string") {
                        recepientOldInfoDetails = JSON.parse(recepientOldInfoDetails);
                    }
                } else {
                    recepientOldInfoDetails = totalRecepientDetails.oldInfo || {};
                }
            }
            return recepientOldInfoDetails;

  };

  ApprovalsReqModule_PresentationController.prototype.fetchRequestPendingSuccess = function(response) {

    /* segregate the data on monetary and non monetary basis and prepare two separate payloads */
    var scopeObj = this;
    response.records.forEach(function(responseObj) {

      responseObj.currencyCode = CommonUtilities.getCurrencyCode(responseObj.accountId);
      CommonUtilities.truncateStringWithGivenLength(responseObj.featureName + '...', 20);

      responseObj.accountId = {
        text: kony.sdk.isNullOrUndefined(CommonUtilities.getMaskedAccName(responseObj.accountId)[0]) ? "-" : CommonUtilities.getMaskedAccName(responseObj.accountId)[0],
        toolTip: kony.sdk.isNullOrUndefined(CommonUtilities.getMaskedAccName(responseObj.accountId)[1]) ? "-" : CommonUtilities.getMaskedAccName(responseObj.accountId)[1]
      };


      if (!kony.sdk.isNullOrUndefined(responseObj.sentDate))
        responseObj.sentDate = CommonUtilities.getFrontendDateStringInUTC(responseObj.sentDate, "mm/dd/yyyy");
      else if(!kony.sdk.isNullOrUndefined(responseObj.createdts)) 
        responseObj.sentDate = CommonUtilities.getFrontendDateStringInUTC(responseObj.createdts, "mm/dd/yyyy");
      else
        responseObj.sentDate = "--";
      if (!kony.sdk.isNullOrUndefined(responseObj.processingDate))
        responseObj.processingDate = CommonUtilities.getFrontendDateStringInUTC(responseObj.processingDate, "mm/dd/yyyy");
      else
        responseObj.processingDate = "--";
      if (!kony.sdk.isNullOrUndefined(responseObj.featureActionName)) {
        responseObj.featureActionNameToolTip = responseObj.featureActionName;
        responseObj.featureActionName = CommonUtilities.truncateStringWithGivenLength(responseObj.featureActionName, 30);
        if(responseObj.featureActionId === BBConstants.CHEQUE_BOOK_REQUEST_CREATE){
          responseObj.txtVal = {
            text: responseObj.requestType,
            toolTip: responseObj.requestType
          };
        }
        else{
          responseObj.txtVal = {
            text: responseObj.featureActionName,
            toolTip: responseObj.featureActionNameToolTip
          };
        }
      } else
        responseObj.requestType = "NA";

      if (!kony.sdk.isNullOrUndefined(responseObj.customerName)){
        responseObj.customerName = {
          text : CommonUtilities.truncateStringWithGivenLength(responseObj.customerName, 15)+"-"+CommonUtilities.getLastFourDigit(responseObj.customerId),
          toolTip : responseObj.customerName+"-"+responseObj.customerId
        }
      }
      else
        responseObj.customerName = "NA";
      //  responseObj.Approval = responseObj.receivedApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + " " + responseObj.requiredApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Approved");
      //             responseObj.DebitOrCreditAccount = {
      //                 text: "...." + CommonUtilities.getLastFourDigit(responseObj.accountId), // CommonUtilities.truncateStringWithGivenLength(responseObj.AccountName + "....", 16) + CommonUtilities.getLastFourDigit(responseObj.DebitAccount),
      //                 toolTip: "...." + CommonUtilities.getLastFourDigit(responseObj.accountId)
      //             };
      if(kony.sdk.isNullOrUndefined(responseObj.TotalCreditAmount))
        responseObj.TotalCreditAmount = "--";
      else
        responseObj.TotalCreditAmount = CommonUtilities.formatCurrencyWithCommas(responseObj.TotalCreditAmount, false,responseObj.currencyCode);
      responseObj.Amount = CommonUtilities.formatCurrencyWithCommas(responseObj.amount, true);
      responseObj.TotalDebitAmount = CommonUtilities.formatCurrencyWithCommas(responseObj.totalDebitAmount, true);
      responseObj.TransactionDate = !kony.sdk.isNullOrUndefined(responseObj.sentDate) ? CommonUtilities.getFrontendDateString(responseObj.sentDate, "mm/dd/yyyy") : responseObj.processingDate;
      responseObj.userName = responseObj.CustomerName;
      responseObj.Reccurence = responseObj.recurrence
      responseObj.Frequency = responseObj.frequency;
      responseObj.Request_id = responseObj.requestId;
      responseObj.Status = responseObj.status;
      (responseObj.featureActionId === "BULK_PAYMENT_SINGLE_SUBMIT"||responseObj.featureActionId === "BULK_PAYMENT_MULTIPLE_SUBMIT")? responseObj.amount = applicationManager.getFormatUtilManager().formatAmount(responseObj.transactionAmount): responseObj.amount = CommonUtilities.formatCurrencyWithCommas(responseObj.transactionAmount , false,responseObj.transactionCurrency);
      if (!kony.sdk.isNullOrUndefined(responseObj.charges) && responseObj.charges.length !== 0) {
        responseObj.lblServiceCharge = {
          text: kony.i18n.getLocalizedString("i18n.TransfersEur.ServiceCharge"),
          toolTip: kony.i18n.getLocalizedString("i18n.TransfersEur.ServiceCharge"),
          isVisible: true
        }
        var parsedChargesVal = scopeObj.safelyParseResponseToJSON(responseObj.charges);
        var chargeBreakdown = "";
        var formatManager = applicationManager.getFormatUtilManager();
        if(parsedChargesVal.length !== 0 && typeof(parsedChargesVal) === 'object'){
          parsedChargesVal.forEach(function(obj) {
            var currencySymbol = formatManager.getCurrencySymbol(obj.chargeCurrencyId);
            var str = `${obj.chargeName} : ${currencySymbol} ${obj.chargeAmount}`;
            if (chargeBreakdown === "") {
              chargeBreakdown = `${str}`;
            } else {
              chargeBreakdown = `${chargeBreakdown}
                                           ${str}`;
            };
          })
          responseObj.lblServiceChargeVal = {
            text: chargeBreakdown,
            toolTip: chargeBreakdown,
            isVisible: true
          }
        }
        else{
          responseObj.lblServiceCharge = {
            isVisible: false
          }
          responseObj.lblServiceChargeVal = {
            isVisible: false
          }
        }
      }
      else {
        responseObj.lblServiceCharge = {
          isVisible: false
        }
        responseObj.lblServiceChargeVal = {
          isVisible: false
        }
      }
      if(!kony.sdk.isNullOrUndefined(responseObj.creditValueDate)){
        responseObj.lblCreditValueDate = {
          text: kony.i18n.getLocalizedString("i18n.Transfers.CreditValueDate"),
          toolTip: kony.i18n.getLocalizedString("i18n.Transfers.CreditValueDate"),
          isVisible: true
        }
        responseObj.lblCreditValueDateVal = {
          text: CommonUtilities.getFrontendDateStringInUTC(responseObj.creditValueDate, "mm/dd/yyyy"),
          toolTip: CommonUtilities.getFrontendDateStringInUTC(responseObj.creditValueDate, "mm/dd/yyyy"),
          isVisible: true
        }
      }
      else{
        responseObj.lblCreditValueDate = {
          isVisible: false
        }
        responseObj.lblCreditValueDateVal = {
          isVisible: false
        }
      }
      responseObj.Payee = {
        text: kony.sdk.isNullOrUndefined(responseObj.payee) ? "-" : CommonUtilities.truncateStringWithGivenLength(responseObj.payee, 15),
        toolTip: kony.sdk.isNullOrUndefined(responseObj.payee) ? "-" : responseObj.payee
      };
      //   responseObj.amount = CommonUtilities.formatCurrencyWithCommas(responseObj.amount, false);

      if (kony.sdk.isNullOrUndefined(responseObj.description))
        responseObj.description = "--";

      if (kony.sdk.isNullOrUndefined(responseObj.paymentId))
        responseObj.paymentId = "--";

      if (kony.sdk.isNullOrUndefined(responseObj.recurrence))
        responseObj.recurrence = "--";

      if (kony.sdk.isNullOrUndefined(responseObj.frequency))
        responseObj.frequency = "--";  

      if (kony.sdk.isNullOrUndefined(responseObj.totalTransactions))
        responseObj.totalTransactions = "--";  

      if (kony.sdk.isNullOrUndefined(responseObj.processingMode))
        responseObj.processingMode = "--";  

      if(kony.sdk.isNullOrUndefined(responseObj.reference))
        responseObj.reference = "--";

      if(kony.sdk.isNullOrUndefined(responseObj.requestType))
        responseObj.requestType = "--";

      if(!kony.sdk.isNullOrUndefined(responseObj.FileName)){
        responseObj.FileName ={ 
          text : CommonUtilities.truncateStringWithGivenLength(responseObj.FileName, 15),
          toolTip : responseObj.FileName}
      }else {
        responseObj.FileName = "--";
      }
      if (responseObj.status === BBConstants.TRANSACTION_STATUS.REJECTED) {
        responseObj.Approval = 1 + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Rejection");
      } else if (responseObj.status === BBConstants.TRANSACTION_STATUS.WITHDRAWN) {
        responseObj.Approval = 1 + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Withdrawn");
      } else if (responseObj.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase() && !kony.sdk.isNullOrUndefined(responseObj.requiredApprovals)) {
        responseObj.Approval = responseObj.receivedApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + " " + responseObj.requiredApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Approved");
      } else if (kony.sdk.isNullOrUndefined(responseObj.requiredApprovals) && !kony.sdk.isNullOrUndefined(responseObj.receivedApprovals)) {
        responseObj.Approval = responseObj.receivedApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Approved");
      } else {
        responseObj.Approval = "N/A";
      }
      if (responseObj.status === BBConstants.TRANSACTION_STATUS.REJECTED) {
        responseObj.approvals = 1 + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Rejection");
      } else if (responseObj.status === BBConstants.TRANSACTION_STATUS.WITHDRAWN) {
        responseObj.approvals = 1 + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Withdrawn");
      } else if (responseObj.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase() && !kony.sdk.isNullOrUndefined(responseObj.requiredApprovals)) {
        responseObj.approvals = responseObj.receivedApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + " " + responseObj.requiredApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Approved");
      } else if (kony.sdk.isNullOrUndefined(responseObj.requiredApprovals) && !kony.sdk.isNullOrUndefined(responseObj.receivedApprovals)) {
        responseObj.approvals = responseObj.receivedApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Approved");
      } else {
        responseObj.approvals = "N/A";
      }
      responseObj.lblTrStatus ={
        text : responseObj.status ,
        skin : "bbSknLbl424242SSP15Px"
      };
      responseObj.featureName = (kony.os.deviceInfo().deviceWidth <= 400 )?CommonUtilities.truncateStringWithGivenLength(responseObj.featureName, 32) : responseObj.featureName  ;

      if(!kony.sdk.isNullOrUndefined(responseObj.confirmationNumber)){
        responseObj.confirmationNumberVal = responseObj.confirmationNumber.replace("_PSD2","");
      }
      else{
        responseObj.confirmationNumberVal = "--";
      }

      if(!kony.sdk.isNullOrUndefined(responseObj.transactionId)){
        responseObj.transactionIdVal = responseObj.transactionId.replace("_PSD2","");
      }
      else{
        responseObj.transactionIdVal = "--";
      }

      if (!kony.sdk.isNullOrUndefined(responseObj.indicativeRate) && !kony.sdk.isNullOrUndefined(responseObj.transactionCurrency)
          && !kony.sdk.isNullOrUndefined(responseObj.totalDebitAmount) && !kony.sdk.isNullOrUndefined(responseObj.transactionAmount)
          && !kony.sdk.isNullOrUndefined(responseObj.fromAccountCurrency)
          && (responseObj.transactionCurrency !== responseObj.fromAccountCurrency)) {
        responseObj.lblExchangeRate = {
          text: kony.i18n.getLocalizedString("i18n.TransfersEur.ExchangeRate"),
          toolTip: kony.i18n.getLocalizedString("i18n.TransfersEur.ExchangeRate"),
          isVisible: true
        }
        if(responseObj.totalDebitAmount <= responseObj.transactionAmount){
          responseObj.lblExchangeRateVal = {
            text: "1,00" + responseObj.fromAccountCurrency + "=" + responseObj.indicativeRate + responseObj.transactionCurrency,
            toolTip: "1,00" + responseObj.fromAccountCurrency + "=" + responseObj.indicativeRate + responseObj.transactionCurrency,
            isVisible: true
          }
        } 
        else if(responseObj.totalDebitAmount > responseObj.transactionAmount){
          responseObj.lblExchangeRateVal = {
            text: "1,00" + responseObj.transactionCurrency + "=" + responseObj.indicativeRate + responseObj.fromAccountCurrency,
            toolTip: "1,00" + responseObj.transactionCurrency + "=" + responseObj.indicativeRate + responseObj.fromAccountCurrency,
            isVisible: true
          }
        }
      }
      else{
        responseObj.lblExchangeRate = {
          isVisible : false
        }
        responseObj.lblExchangeRateVal = {
          isVisible : false
        }
      }
      responseObj.toAccountName = !kony.sdk.isNullOrUndefined(responseObj.toAccountName) ? responseObj.toAccountName : "-";
      responseObj.beneficiaryBankAddress = !kony.sdk.isNullOrUndefined(responseObj.beneficiaryBankAddress) ? responseObj.beneficiaryBankAddress : "-";

      if(!kony.sdk.isNullOrUndefined(responseObj.description)){
        responseObj.paymentDetails = {
          text : CommonUtilities.truncateStringWithGivenLength(responseObj.description, 140),
          toolTip : responseObj.description
        }
      }else {
        responseObj.paymentDetails = "-";
      }
      responseObj.beneficiaryNickName = "-";
      responseObj.beneficiaryAddress = "-";
      responseObj.frequencyEndDate = !kony.sdk.isNullOrUndefined(responseObj.frequencyEndDate) ? CommonUtilities.getFrontendDateString(responseObj.frequencyEndDate, "mm/dd/yyyy") : "-";
      responseObj.paymentType = !kony.sdk.isNullOrUndefined(responseObj.paymentType) && responseObj.paymentType.length > 0  ? responseObj.paymentType : "-";
      // responseObj.approvals = responseObj.receivedApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + " " + responseObj.requiredApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Approved");
      if(['INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL','INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL','INTRA_BANK_FUND_TRANSFER_CREATE_RECEPIENT','INTRA_BANK_FUND_TRANSFER_DELETE_RECEPIENT','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL'].includes(responseObj.featureActionId)){
        responseObj.swiftCode = responseObj.swiftCode || "-";
        responseObj.nickName = responseObj.nickName || "-";
        responseObj.accountNumber = responseObj.accountNumber ? responseObj.accountNumber : (responseObj.iban ? responseObj.iban : "-");
        responseObj.benAddressLine = responseObj.addressLine1 ? responseObj.addressLine1 + (responseObj.addressLine2 ? ", "+responseObj.addressLine2 : "") : (responseObj.addressLine2 ? responseObj.addressLine2 : "");
        responseObj.benAddressLine = responseObj.benAddressLine ?  responseObj.benAddressLine : "-";
        responseObj.paymentMethod = responseObj.isInternationalAccount === "true" ? kony.i18n.getLocalizedString("i18n.ProfileManagement.International"): "Same Bank";
        responseObj.customersLinked = responseObj.cif ? JSON.parse(responseObj.cif).length + " "+kony.i18n.getLocalizedString("i18n.approvals.customer"): "0 "+ kony.i18n.getLocalizedString("i18n.approvals.customer");
         //in case of edit check for only linked cif id's count
        if(['INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL'].includes(responseObj.featureActionId)){
          var cifArr = responseObj.cif ? JSON.parse(responseObj.cif) : [];
          var linkedCust = cifArr.reduce(function(count,rec){
            var linkedCif = [];
            linkedCif = rec.cifs.filter(function(cifRec){
              if(cifRec.id && cifRec.isLinked === true){
                return cifRec;
              }
            });
            count = count + linkedCif.length;
            return count;
          },0);
          responseObj.customersLinked = linkedCust ? linkedCust + " "+kony.i18n.getLocalizedString("i18n.approvals.customer"): "0 "+ kony.i18n.getLocalizedString("i18n.approvals.customer");
        }
      }
    });
    applicationManager.getNavigationManager().updateForm({
      requestPending: response,
      progressBar: false
    }, "frmBBRequestsDashboard");
  };
  ApprovalsReqModule_PresentationController.prototype.fetchRequestHistory = function(params) {
    applicationManager.getNavigationManager().updateForm({
      progressBar: true
    });
    this.ApprovalsReqManager.getRequestHistory(params, this.fetchRequestHistorySuccess.bind(this), this.onServerError.bind(this));

  };
  ApprovalsReqModule_PresentationController.prototype.fetchRequestHistorySuccess = function(response) {

    /* segregate the data on monetary and non monetary basis and prepare two separate payloads */
    var scopeObj = this;
    response.records.forEach(function(responseObj) {
      responseObj.currencyCode = CommonUtilities.getCurrencyCode(responseObj.accountId);
      responseObj.accountId = {
        text: kony.sdk.isNullOrUndefined(CommonUtilities.getMaskedAccName(responseObj.accountId)[0]) ? "-" : CommonUtilities.getMaskedAccName(responseObj.accountId)[0],
        toolTip: kony.sdk.isNullOrUndefined(CommonUtilities.getMaskedAccName(responseObj.accountId)[1]) ? "-" : CommonUtilities.getMaskedAccName(responseObj.accountId)[1]
      };
      if(kony.sdk.isNullOrUndefined(responseObj.TotalCreditAmount))
        responseObj.TotalCreditAmount = "--";
      else
        responseObj.TotalCreditAmount = CommonUtilities.formatCurrencyWithCommas(responseObj.TotalCreditAmount, false,responseObj.currencyCode);
      responseObj.TotalDebitAmount = CommonUtilities.formatCurrencyWithCommas(responseObj.totalDebitAmount, true);
      responseObj.Amount = CommonUtilities.formatCurrencyWithCommas(responseObj.amount, true);
      responseObj.TransactionDate = !kony.sdk.isNullOrUndefined(responseObj.sentDate) ? CommonUtilities.getFrontendDateString(responseObj.sentDate, "mm/dd/yyyy") : responseObj.processingDate;
      responseObj.userName = responseObj.CustomerName;
      responseObj.Reccurence = responseObj.recurrence
      responseObj.Frequency = responseObj.frequency;
      responseObj.Request_id = responseObj.requestId;
      responseObj.Status = responseObj.status;
      (responseObj.featureActionId === "BULK_PAYMENT_SINGLE_SUBMIT"||responseObj.featureActionId === "BULK_PAYMENT_MULTIPLE_SUBMIT")? responseObj.amount = applicationManager.getFormatUtilManager().formatAmount(responseObj.transactionAmount): responseObj.amount = CommonUtilities.formatCurrencyWithCommas(responseObj.transactionAmount , false,responseObj.transactionCurrency);
      if (!kony.sdk.isNullOrUndefined(responseObj.charges) && responseObj.charges.length !== 0) {
        responseObj.lblServiceCharge = {
          text: kony.i18n.getLocalizedString("i18n.TransfersEur.ServiceCharge"),
          toolTip: kony.i18n.getLocalizedString("i18n.TransfersEur.ServiceCharge"),
          isVisible: true
        }
        var parsedChargesVal = scopeObj.safelyParseResponseToJSON(responseObj.charges);
        var chargeBreakdown = "";
        var formatManager = applicationManager.getFormatUtilManager();
        if(parsedChargesVal.length !== 0 && typeof(parsedChargesVal) === 'object'){
          parsedChargesVal.forEach(function(obj) {
            var currencySymbol = formatManager.getCurrencySymbol(obj.chargeCurrencyId);
            var str = `${obj.chargeName} : ${currencySymbol} ${obj.chargeAmount}`;
            if (chargeBreakdown === "") {
              chargeBreakdown = `${str}`;
            } else {
              chargeBreakdown = `${chargeBreakdown}
                                           ${str}`;
            };
          })
          responseObj.lblServiceChargeVal = {
            text: chargeBreakdown,
            toolTip: chargeBreakdown,
            isVisible: true
          }
        }
        else{
          responseObj.lblServiceCharge = {
            isVisible: false
          }
          responseObj.lblServiceChargeVal = {
            isVisible: false
          }
        }
      }
      else {
        responseObj.lblServiceCharge = {
          isVisible: false
        }
        responseObj.lblServiceChargeVal = {
          isVisible: false
        }
      }
      if(!kony.sdk.isNullOrUndefined(responseObj.creditValueDate)){
        responseObj.lblCreditValueDate = {
          text: kony.i18n.getLocalizedString("i18n.Transfers.CreditValueDate"),
          toolTip: kony.i18n.getLocalizedString("i18n.Transfers.CreditValueDate"),
          isVisible: true
        }
        responseObj.lblCreditValueDateVal = {
          text: CommonUtilities.getFrontendDateStringInUTC(responseObj.creditValueDate, "mm/dd/yyyy"),
          toolTip: CommonUtilities.getFrontendDateStringInUTC(responseObj.creditValueDate, "mm/dd/yyyy"),
          isVisible: true
        }
      }
      else{
        responseObj.lblCreditValueDate = {
          isVisible: false
        }
        responseObj.lblCreditValueDateVal = {
          isVisible: false
        }
      }
      responseObj.Payee = {
        text: kony.sdk.isNullOrUndefined(responseObj.payee) ? "-" : CommonUtilities.truncateStringWithGivenLength(responseObj.payee, 15),
        toolTip: kony.sdk.isNullOrUndefined(responseObj.payee) ? "-" : responseObj.payee
      };
      if (!kony.sdk.isNullOrUndefined(responseObj.sentDate))
        responseObj.sentDate = CommonUtilities.getFrontendDateStringInUTC(responseObj.sentDate, "mm/dd/yyyy");
       else if(!kony.sdk.isNullOrUndefined(responseObj.createdts)) 
        responseObj.sentDate = CommonUtilities.getFrontendDateStringInUTC(responseObj.createdts, "mm/dd/yyyy");
      else
        responseObj.sentDate = "NA";
      if (!kony.sdk.isNullOrUndefined(responseObj.processingDate))
        responseObj.processingDate = CommonUtilities.getFrontendDateStringInUTC(responseObj.processingDate, "mm/dd/yyyy");
      else
        responseObj.processingDate = "NA";
      if (!kony.sdk.isNullOrUndefined(responseObj.approvalDate))
        responseObj.approvalDate = CommonUtilities.getFrontendDateStringInUTC(responseObj.approvalDate, "mm/dd/yyyy");
      else
        responseObj.approvalDate = "NA";
      if (!kony.sdk.isNullOrUndefined(responseObj.customerName)){
        responseObj.customerName = {
          text : CommonUtilities.truncateStringWithGivenLength(responseObj.customerName, 15)+"-"+CommonUtilities.getLastFourDigit(responseObj.customerId),
          toolTip : responseObj.customerName+"-"+responseObj.customerId
        }
      }
      else
        responseObj.customerName = "NA";
      // responseObj.amount = CommonUtilities.formatCurrencyWithCommas(responseObj.amount, false);
      //responseObj.approvals = responseObj.receivedApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + " " + responseObj.requiredApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Approved");
      if (responseObj.status === BBConstants.TRANSACTION_STATUS.REJECTED) {
        responseObj.Approval = 1 + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Rejection");
      } else if (responseObj.status === BBConstants.TRANSACTION_STATUS.WITHDRAWN) {
        responseObj.Approval = 1 + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Withdrawn");
      } else if (responseObj.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase() && !kony.sdk.isNullOrUndefined(responseObj.requiredApprovals)) {
        responseObj.Approval = responseObj.receivedApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + " " + responseObj.requiredApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Approved");
      } else if (kony.sdk.isNullOrUndefined(responseObj.requiredApprovals) && !kony.sdk.isNullOrUndefined(responseObj.receivedApprovals)) {
        responseObj.Approval = responseObj.receivedApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Approved");
      } else {
        responseObj.Approval = "N/A";
      }
      if (responseObj.status === BBConstants.TRANSACTION_STATUS.REJECTED) {
        responseObj.approvals = 1 + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Rejection");
      } else if (responseObj.status === BBConstants.TRANSACTION_STATUS.WITHDRAWN) {
        responseObj.approvals = 1 + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Withdrawn");
      } else if (responseObj.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase() && !kony.sdk.isNullOrUndefined(responseObj.requiredApprovals)) {
        responseObj.approvals = responseObj.receivedApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + " " + responseObj.requiredApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Approved");
      } else if (kony.sdk.isNullOrUndefined(responseObj.requiredApprovals) && !kony.sdk.isNullOrUndefined(responseObj.receivedApprovals)) {
        responseObj.approvals = responseObj.receivedApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Approved");
      } else {
        responseObj.approvals = "N/A";
      }
      if (kony.sdk.isNullOrUndefined(responseObj.description))
        responseObj.description = "--";

      if (kony.sdk.isNullOrUndefined(responseObj.paymentId))
        responseObj.paymentId = "--";

      if (kony.sdk.isNullOrUndefined(responseObj.recurrence))
        responseObj.recurrence = "--";

      if (kony.sdk.isNullOrUndefined(responseObj.frequency))
        responseObj.frequency = "--";  

      if (kony.sdk.isNullOrUndefined(responseObj.totalTransactions))
        responseObj.totalTransactions = "--";  

      if (kony.sdk.isNullOrUndefined(responseObj.processingMode))
        responseObj.processingMode = "--";  

      if(kony.sdk.isNullOrUndefined(responseObj.reference))
        responseObj.reference = "--";

      if(kony.sdk.isNullOrUndefined(responseObj.requestType))
        responseObj.requestType = "--";

      if(!kony.sdk.isNullOrUndefined(responseObj.FileName)){
        responseObj.FileName = CommonUtilities.truncateStringWithGivenLength(responseObj.FileName, 15) ;
      }else {
        responseObj.FileName = "--";
      }
      responseObj.lblTrStatus ={
        text : responseObj.status ,
        skin : "bbSknLbl424242SSP15Px"
      };
      responseObj.featureName = (kony.os.deviceInfo().deviceWidth <= 400 )?CommonUtilities.truncateStringWithGivenLength(responseObj.featureName, 32) : responseObj.featureName  ;

      if(!kony.sdk.isNullOrUndefined(responseObj.confirmationNumber)){
        responseObj.confirmationNumberVal = responseObj.confirmationNumber.replace("_PSD2","");
      }
      else{
        responseObj.confirmationNumberVal = "--";
      }

      if(!kony.sdk.isNullOrUndefined(responseObj.transactionId)){
        responseObj.transactionIdVal = responseObj.transactionId.replace("_PSD2","");
      }
      else{
        responseObj.transactionIdVal = "--";
      }

      if (!kony.sdk.isNullOrUndefined(responseObj.indicativeRate) && !kony.sdk.isNullOrUndefined(responseObj.transactionCurrency)
          && !kony.sdk.isNullOrUndefined(responseObj.totalDebitAmount) && !kony.sdk.isNullOrUndefined(responseObj.transactionAmount)
          && !kony.sdk.isNullOrUndefined(responseObj.fromAccountCurrency)
          && (responseObj.transactionCurrency !== responseObj.fromAccountCurrency)) {
        responseObj.lblExchangeRate = {
          text: kony.i18n.getLocalizedString("i18n.TransfersEur.ExchangeRate"),
          toolTip: kony.i18n.getLocalizedString("i18n.TransfersEur.ExchangeRate"),
          isVisible: true
        }
        if(responseObj.totalDebitAmount <= responseObj.transactionAmount){
          responseObj.lblExchangeRateVal = {
            text: "1,00" + responseObj.fromAccountCurrency + "=" + responseObj.indicativeRate + responseObj.transactionCurrency,
            toolTip: "1,00" + responseObj.fromAccountCurrency + "=" + responseObj.indicativeRate + responseObj.transactionCurrency,
            isVisible: true
          }
        } 
        else if(responseObj.totalDebitAmount > responseObj.transactionAmount){
          responseObj.lblExchangeRateVal = {
            text: "1,00" + responseObj.transactionCurrency + "=" + responseObj.indicativeRate + responseObj.fromAccountCurrency,
            toolTip: "1,00" + responseObj.transactionCurrency + "=" + responseObj.indicativeRate + responseObj.fromAccountCurrency,
            isVisible: true
          }
        }
      }
      else{
        responseObj.lblExchangeRate = {
          isVisible : false
        }
        responseObj.lblExchangeRateVal = {
          isVisible : false
        }
      }
      responseObj.toAccountName = !kony.sdk.isNullOrUndefined(responseObj.toAccountName) ? responseObj.toAccountName : "-";
      responseObj.beneficiaryBankAddress = !kony.sdk.isNullOrUndefined(responseObj.beneficiaryBankAddress) ? responseObj.beneficiaryBankAddress : "-";

      if(!kony.sdk.isNullOrUndefined(responseObj.description)){
        responseObj.paymentDetails = {
          text : CommonUtilities.truncateStringWithGivenLength(responseObj.description, 140),
          toolTip : responseObj.description
        }
      }else {
        responseObj.paymentDetails = "-";
      }
      responseObj.beneficiaryNickName = "-";
      responseObj.beneficiaryAddress = "-";
      responseObj.frequencyEndDate = !kony.sdk.isNullOrUndefined(responseObj.frequencyEndDate) ? CommonUtilities.getFrontendDateString(responseObj.frequencyEndDate, "mm/dd/yyyy") : "-";
      responseObj.paymentType = !kony.sdk.isNullOrUndefined(responseObj.paymentType) && responseObj.paymentType.length > 0  ? responseObj.paymentType : "-";
      if(['INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL','INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL','INTRA_BANK_FUND_TRANSFER_CREATE_RECEPIENT','INTRA_BANK_FUND_TRANSFER_DELETE_RECEPIENT','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL'].includes(responseObj.featureActionId)){
        responseObj.swiftCode = responseObj.swiftCode || "-";
        responseObj.nickName = responseObj.nickName || "-";
        responseObj.accountNumber = responseObj.accountNumber ? responseObj.accountNumber : (responseObj.iban ? responseObj.iban : "-");
        responseObj.benAddressLine = responseObj.addressLine1 ? responseObj.addressLine1 + (responseObj.addressLine2 ? ", "+responseObj.addressLine2 : "") : (responseObj.addressLine2 ? responseObj.addressLine2 : "");
        responseObj.benAddressLine = responseObj.benAddressLine ?  responseObj.benAddressLine : "-";
        responseObj.paymentMethod = responseObj.isInternationalAccount === "true" ? kony.i18n.getLocalizedString("i18n.ProfileManagement.International"): "Same Bank";
        responseObj.customersLinked = responseObj.cif ? JSON.parse(responseObj.cif).length + " "+kony.i18n.getLocalizedString("i18n.approvals.customer"): "0 "+ kony.i18n.getLocalizedString("i18n.approvals.customer");
         //in case of edit check for only linked cif id's count
        if(['INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL'].includes(responseObj.featureActionId)){
          var cifArr = responseObj.cif ? JSON.parse(responseObj.cif) : [];
          var linkedCust = cifArr.reduce(function(count,rec){
            var linkedCif = [];
            linkedCif = rec.cifs.filter(function(cifRec){
              if(cifRec.id && cifRec.isLinked === true){
                return cifRec;
              }
            });
            count = count + linkedCif.length;
            return count;
          },0);
          responseObj.customersLinked = linkedCust ? linkedCust + " "+kony.i18n.getLocalizedString("i18n.approvals.customer"): "0 "+ kony.i18n.getLocalizedString("i18n.approvals.customer");
        }
      }

    });
    applicationManager.getNavigationManager().updateForm({
      requestHistory: response,
      progressBar: false
    }, "frmBBRequestsDashboard");
  };

  ApprovalsReqModule_PresentationController.prototype.withdraw = function(navObj) {
    var scopeObj = this;
    if (kony.application.getCurrentForm().id !== navObj.onSuccess.form) {
      applicationManager.getNavigationManager().navigateTo(navObj.onSuccess.form);
    }
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObj.onSuccess.form);
    scopeObj.ApprovalsReqManager.withdraw(
      navObj.requestData,
      scopeObj.withdrawSuccess.bind(scopeObj,navObj),
      scopeObj.onServerError.bind(scopeObj)
    );
  };
  ApprovalsReqModule_PresentationController.prototype.withdrawSuccess = function(navObj,response) {
    var scopeObj = this;
    applicationManager.getNavigationManager().updateForm({
      //"key": BBConstants.WITHDRAWN_TRANSACTION_ACK,
      "responseDataTrans": response.transactionId
    });
    //kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('AccountsUIModule').presentationController.fetchCountsOfApprovalAndRequest();	
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "AccountsUIModule", "appName" : "HomepageMA"}).presentationController.fetchCountsOfApprovalAndRequest();	
    scopeObj.fetchRequestPending({});
  };
  ApprovalsReqModule_PresentationController.prototype.onServerError = function(errorResponse) {
    var errorMessage = "";
    if (!kony.sdk.isNullOrUndefined(errorResponse)) {											   
      if (!kony.sdk.isNullOrUndefined(errorResponse.errorMessage)) {
        errorMessage = errorResponse.errorMessage;
      }
      if (!kony.sdk.isNullOrUndefined(errorResponse.dbpErrMsg)) {
        errorMessage = errorResponse.dbpErrMsg;
      }
    }
    if (kony.sdk.isNullOrUndefined(errorResponse)) 
      errorMessage = kony.i18n.getLocalizedString("i18n.common.errorCodes.12000");
    this.navManager.updateForm({
      serverError: true,
      errorMessage: errorMessage,
      progressBar: false
    });
  };

  /**
     *   formatBulkpaymentAppReqData : formatting the data as required for the form controller.
     * @throws {}
     */
  ApprovalsReqModule_PresentationController.prototype.formatBulkpaymentAppReqData = function(response, historyFlag) {
    var res = [];
    response = response.records;
    response.forEach(function(transaction) {
      var OpStatus = "";
      if (historyFlag === 0) {
        OpStatus = transaction.initiatedBy;
      } else {
        OpStatus = transaction.status;
      }

      if ((transaction.status === BBConstants.TRANSACTION_STATUS.PENDING) && (!kony.sdk.isNullOrUndefined(transaction.receivedApprovals)) && (!kony.sdk.isNullOrUndefined(transaction.requiredApprovals))) {
        transaction.Approver = transaction.receivedApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + " " + transaction.requiredApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Approved");
      } else if (transaction.status === BBConstants.TRANSACTION_STATUS.REJECTED) {
        transaction.Approver = 1 + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Rejection");
      } else if (!kony.sdk.isNullOrUndefined(transaction.requiredApprovals)) {
        transaction.Approver = transaction.requiredApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Approvals");
      } else {
        transaction.Approver = kony.i18n.getLocalizedString("i18n.common.NA");
      }
      transaction.fromAccountMasked = CommonUtilities.getMaskedAccName(transaction.fromAccount)[0];

      res.push({
        "lblOpDescription": {
          "text": kony.sdk.isNullOrUndefined(transaction.description) ? "N/A" : transaction.description,
          "toolTip": kony.sdk.isNullOrUndefined(transaction.description) ? "N/A" : transaction.description
        },
        "lblDate": {
          "text": kony.sdk.isNullOrUndefined(transaction.paymentDate) ? "N/A" : CommonUtilities.getFrontendDateStringInUTC(transaction.paymentDate, "mm/dd/yyyy")
        },
        "lblOpStatus": {
          "text": kony.sdk.isNullOrUndefined(OpStatus) ? "N/A" : OpStatus,
          "toolTip": kony.sdk.isNullOrUndefined(OpStatus) ? "N/A" : OpStatus
        },
        "lblOPFromAccountValue": {
          "text": kony.sdk.isNullOrUndefined(transaction.fromAccountMasked) ? "N/A" : transaction.fromAccountMasked,
          "toolTip": CommonUtilities.getMaskedAccName(transaction.fromAccount)[1]
        },
        "lblOPTotalTransactionsValue": {
          "text": kony.sdk.isNullOrUndefined(transaction.totalTransactions) ? "N/A" : transaction.totalTransactions,
          "toolTip": kony.sdk.isNullOrUndefined(transaction.totalTransactions) ? "N/A" : transaction.totalTransactions
        },
        "lblOPTotalAmountValue": {
          "text": kony.sdk.isNullOrUndefined(transaction.totalAmount) ? "N/A" : CommonUtilities.formatCurrencyWithCommas(transaction.totalAmount, false, transaction.currency),
          "toolTip": kony.sdk.isNullOrUndefined(transaction.totalAmount) ? "N/A" : CommonUtilities.formatCurrencyWithCommas(transaction.totalAmount, false, transaction.currency)
        },
        "lblOPPaymentIDValue": {
          "text": kony.sdk.isNullOrUndefined(transaction.paymentId) ? "N/A" : transaction.paymentId,
          "toolTip": kony.sdk.isNullOrUndefined(transaction.paymentId) ? "N/A" : transaction.paymentId
        },
        "lblOPnitiatedByValue": {
          "text": kony.sdk.isNullOrUndefined(transaction.status) ? "N/A" : transaction.status,
          "toolTip": kony.sdk.isNullOrUndefined(transaction.status) ? "N/A" : transaction.status
        },
        "requestId": kony.sdk.isNullOrUndefined(transaction.requestId) ? "N/A" : transaction.requestId,
        "recordId": kony.sdk.isNullOrUndefined(transaction.recordId) ? "N/A" : transaction.recordId,
        "paymentId": kony.sdk.isNullOrUndefined(transaction.paymentId) ? "N/A" : transaction.paymentId,
        "description": kony.sdk.isNullOrUndefined(transaction.description) ? "N/A" : transaction.description,
        "paymentDate": kony.sdk.isNullOrUndefined(transaction.paymentDate) ? "N/A" : CommonUtilities.getFrontendDateStringInUTC(transaction.paymentDate, "mm/dd/yyyy"),
        "scheduledDate": kony.sdk.isNullOrUndefined(transaction.scheduledDate) ? "N/A" : CommonUtilities.getFrontendDateStringInUTC(transaction.scheduledDate, "mm/dd/yyyy"),
        "status": kony.sdk.isNullOrUndefined(transaction.status) ? "N/A" : transaction.status,
        "fromAccount": kony.sdk.isNullOrUndefined(transaction.fromAccountMasked) ? "N/A" : transaction.fromAccountMasked,
        "totalAmount": kony.sdk.isNullOrUndefined(transaction.totalAmount) ? "N/A" : CommonUtilities.formatCurrencyWithCommas(transaction.totalAmount, false, transaction.currency),
        "initiatedBy": kony.sdk.isNullOrUndefined(transaction.initiatedBy) ? "N/A" : transaction.initiatedBy,
        "totalTransactions": kony.sdk.isNullOrUndefined(transaction.totalTransactions) ? "N/A" : transaction.totalTransactions,
        "companyId": kony.sdk.isNullOrUndefined(transaction.companyId) ? "N/A" : transaction.companyId,
        "amIAprover": kony.sdk.isNullOrUndefined(transaction.amIAprover) ? "N/A" : transaction.amIAprover,
        "amICreator": kony.sdk.isNullOrUndefined(transaction.amICreator) ? "N/A" : transaction.amICreator,
        "receivedApprovals": kony.sdk.isNullOrUndefined(transaction.receivedApprovals) ? "N/A" : transaction.receivedApprovals,
        "requiredApprovals": kony.sdk.isNullOrUndefined(transaction.requiredApprovals) ? "N/A" : transaction.requiredApprovals,
        "approvers": kony.sdk.isNullOrUndefined(transaction.approvers) ? "N/A" : transaction.approvers,
        "Approver": transaction.Approver,
        "currency": transaction.currency
      });
    });
    return (res);
  };

  ApprovalsReqModule_PresentationController.prototype.downloadAttachments = function(isSingleFile, fileNames, i, formName) {
    var requestParam = {};
    if (isSingleFile) { //forsinglefile
      requestParam.fileID = fileNames.fileId;
      requestParam.fileName = fileNames.fileNameValue;
    } else { //formultiplefiles
      requestParam.fileID = fileNames[i].fileId;
      requestParam.fileName = fileNames[i].fileNameValue;
    }
    requestParam.customerId = applicationManager.getUserPreferencesManager().getUserObj().userId;
    applicationManager.getNavigationManager().updateForm({
      transactionDownloadFile: applicationManager.getTransactionManager().getDownloadAttachmentUrl(requestParam)
    }, formName);
  };

  ApprovalsReqModule_PresentationController.prototype.safelyParseResponseToJSON = function(strResponse){
    try{
      return JSON.parse(strResponse);
    }
    catch(e){
      kony.print(e);
      return []; //return empty array if response is invalid
    }
  };
  ApprovalsReqModule_PresentationController.prototype.getRequestsHistorySignatoryGroup = function(navObj) {
    var params = navObj.requestData;
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObj.onSuccess.form);
    this.ApprovalsReqManager.getRequestsHistory(
      params,
      this.completeSuccessCall.bind(this, navObj, "ongetSignatoryGroupRequestsHistorySuccess"),
      this.completeFailedCall.bind(this, navObj, "ongetSignatoryGroupRequestsHistoryFailure")
    );
  };

  ApprovalsReqModule_PresentationController.prototype.ongetSignatoryGroupRequestsHistorySuccess = function(response) {
    return response;
  };

  ApprovalsReqModule_PresentationController.prototype.ongetSignatoryGroupRequestsHistoryFailure = function(error) {
    return (error);
  };
  ApprovalsReqModule_PresentationController.prototype.getRenotifyPendingApprovalRequest = function(navObj) {
    var params = navObj.requestData;
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObj.onSuccess.form);
    this.ApprovalsReqManager.renotifyPendingApprovalRequest(
      params,
      this.completeSuccessCall.bind(this, navObj, "onRenotifyPendingApprovalRequestSuccess"),
      this.completeFailedCall.bind(this, navObj, "onRenotifyPendingApprovalRequestFailure")
    );
  };

  ApprovalsReqModule_PresentationController.prototype.onRenotifyPendingApprovalRequestSuccess = function(response) {
    return response;
  };

  ApprovalsReqModule_PresentationController.prototype.onRenotifyPendingApprovalRequestFailure = function(error) {
    return (error);
  };
  ApprovalsReqModule_PresentationController.prototype.getAchCampaigns = function() {
    var scope = this;
    if (OLBConstants.CLIENT_PROPERTIES && OLBConstants.CLIENT_PROPERTIES.OLB_ENABLE_INAPP_CAMPAIGNS && OLBConstants.CLIENT_PROPERTIES.OLB_ENABLE_INAPP_CAMPAIGNS.toUpperCase() === "TRUE") {
      var asyncManager = applicationManager.getAsyncManager();
      var directMktManager = applicationManager.getDirectMarketingManager();
      asyncManager.callAsync(
        [
          asyncManager.asyncItem(directMktManager, 'getAds', ["accountDashboardCampaignsWeb"])
        ],
        function(asyncResponses) {
          scope.getCampaigns(asyncResponses.responses[0].data);
        }
      )
    } else {
      scope.getCampaignsSuccess([]);
    }
  };
  ApprovalsReqModule_PresentationController.prototype.completeFailedCall = function(navigationObject, dataProcessor, response) {
    if (!kony.sdk.isNullOrUndefined(navigationObject)) {
      if (!kony.sdk.isNullOrUndefined(navigationObject.onFailure)) {
        var processedData;
        if (!kony.sdk.isNullOrUndefined(dataProcessor) && dataProcessor !== "" && this[dataProcessor] instanceof Function) {
          processedData = this[dataProcessor](response);
        } else {
          processedData = response;
        }

        if (!kony.sdk.isNullOrUndefined(processedData)) {
          var navigationContext = {};
          navigationContext.context = {
            key: navigationObject.onFailure.context.key,
            responseData: processedData
          };
          navigationContext.form = navigationObject.onFailure.form;
          applicationManager.getNavigationManager().updateForm(navigationContext.context, navigationContext.form);
        } else {
          kony.print("Response is null or undefined");
        }
      }
    }
  };
  ApprovalsReqModule_PresentationController.prototype.getACHTransactionRecordsSuccess = function(navObject, response) {
    var scopeObj = this;
    var subRecordsMap = {};
    var isDone = false;
    var isValid = false;
    var navigationContext = {
      "form": navObject.onSuccess.form,
      "context": {
        "key": navObject.onSuccess.context.key,
        "responseData": response
      }
    };

    var successCallSubrecord = function(TransactionRecord_id, subrecords) {
      if (subrecords === null || subrecords === [] || subrecords === undefined)
        subRecordsMap[TransactionRecord_id] = [];
      else
        subRecordsMap[TransactionRecord_id] = subrecords;

      for (var subrecord in subRecordsMap) {
        if (subRecordsMap[subrecord] === null) {
          isDone = false;
          break;
        }
        isDone = true;
      }

      if (isDone === true) {
        for (var subrecord in subRecordsMap) {
          if (subRecordsMap[subrecord] === "error") {
            isValid = false;
            break;
          }
          isValid = true;
        }
        if (isValid === true) {
          response.forEach(function(obj) {
            if (obj.TransactionRecord_id) {
              obj.taxSubType = subRecordsMap[obj.TransactionRecord_id][0].taxSubType;
              obj.TaxSubCategory_id = subRecordsMap[obj.TransactionRecord_id][0].TaxSubCategory_id;
              obj.TranscationSubRecord_id = subRecordsMap[obj.TransactionRecord_id][0].TranscationSubRecord_id;
              obj.Amount = CommonUtilities.formatCurrencyWithCommas(subRecordsMap[obj.TransactionRecord_id][0].Amount, true);
            }
          });
          navigationContext.context.responseData = response;
        } else {
          navigationContext.context.responseData = null;
          navigationContext.context.key = navObject.onFailure.context.key;
          navigationContext.form = navObject.onFailure.form;
        }
        applicationManager.getNavigationManager().updateForm(navigationContext.context, navigationContext.form);
      }
    };

    var failureCallSubrecord = function(TransactionRecord_id) {
      subRecordsMap[TransactionRecord_id] = "error";
    };


    response.forEach(function(obj) {
      if (obj.TransactionRecord_id && /Tax/.test(obj.TemplateRequestTypeValue)) {
        subRecordsMap[obj.TransactionRecord_id] = null;
      }
    });

    if (Object.keys(subRecordsMap).length !== 0) {
      response.forEach(function(obj) {
        if (obj.TransactionRecord_id && /Tax/.test(obj.TemplateRequestTypeValue)) {
          scopeObj.getACHTransactionSubRecords(obj.TransactionRecord_id, successCallSubrecord.bind(scopeObj, obj.TransactionRecord_id), failureCallSubrecord.bind(scopeObj, obj.TransactionRecord_id));
        }
      });
    } else {
      response.forEach(function(obj) {
        obj.Amount = {
          "text": CommonUtilities.formatCurrencyWithCommas(obj.Amount, true),
          "left": (kony.application.getCurrentBreakpoint() === 1024) ? "7%" : "10.3%"
        };
        obj.AdditionalInfo = kony.sdk.isNullOrUndefined(obj.AdditionalInfo) ? "N/A" : obj.AdditionalInfo;
        obj.Detail_id = kony.sdk.isNullOrUndefined(obj.Detail_id) ? "N/A" : obj.Detail_id;
        obj.Record_Name = kony.sdk.isNullOrUndefined(obj.Record_Name) ? "N/A" : obj.Record_Name;
        obj.ABATRCNumber = kony.sdk.isNullOrUndefined(obj.ABATRCNumber) ? "N/A" : obj.ABATRCNumber;
      });
      navigationContext.context.response = response;
      applicationManager.getNavigationManager().updateForm(navigationContext.context, navigationContext.form);
    }
  };
  ApprovalsReqModule_PresentationController.prototype.getACHTransactionRecords = function(navObject) {
    var scopeObj = this;
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObject.onSuccess.form);
    scopeObj.ACHManager.fetchACHTransactionRecords(
      navObject.requestData,
      scopeObj.getACHTransactionRecordsSuccess.bind(scopeObj, navObject),
      scopeObj.completeFailedCall.bind(scopeObj, navObject, "getACHTemplateRecordsFailure")
    );
  };

  ApprovalsReqModule_PresentationController.prototype.getACHFileByID = function(navObject) {
    var scopeObj = this;
    var params = {
      "ACHFileID": navObject.requestData
    };
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObject.onSuccess.form);
    scopeObj.ACHManager.getFilesDataByID(
      params,
      scopeObj.completeSuccessCallACH.bind(scopeObj, navObject, "getAllACHFilesSuccess"),
      scopeObj.completeFailedCall.bind(scopeObj, navObject, "getACHFileDataFailure")
    );
  };

  ApprovalsReqModule_PresentationController.prototype.completeSuccessCallACH = function(navigationObject, dataProcessor, response) {
    if (!kony.sdk.isNullOrUndefined(navigationObject)) {
      if (!kony.sdk.isNullOrUndefined(navigationObject.onSuccess)) {
        var processedData;
        if (!kony.sdk.isNullOrUndefined(dataProcessor) && dataProcessor !== "" && this[dataProcessor] instanceof Function) {
          processedData = this[dataProcessor](response);
        } else {
          processedData = response;
        }

        if (!kony.sdk.isNullOrUndefined(processedData)) {
          var navigationContext = {};
          navigationContext.context = {
            key: navigationObject.onSuccess.context.key,
            responseData: processedData
          };
          navigationContext.form = navigationObject.onSuccess.form;
          if (kony.application.getCurrentForm().id !== navigationContext.form) {
            applicationManager.getNavigationManager().navigateTo(navigationContext.form);
          }
          applicationManager.getNavigationManager().updateForm(navigationContext.context, navigationContext.form);
        } else {
          kony.print("Response is null or undefined");
        }
      }
    }
  };

  ApprovalsReqModule_PresentationController.prototype.getACHFileRecordsSuccess = function(navObject, response) {

    var scopeObj = this;
    var subFileRecordsMap = {};
    var isDone = false;
    var isValid = false;
    var navigationContext = {
      "form": navObject.onSuccess.form,
      "context": {
        "key": navObject.onSuccess.context.key,
        "responseData": response
      }
    };
    var successCallSubrecord = function(achFileRecordId, subrecords) {
      if (subrecords === null || subrecords === [] || subrecords === undefined)
        subFileRecordsMap[achFileRecordId] = [];
      else
        subFileRecordsMap[achFileRecordId] = subrecords;

      for (var subrecord in subFileRecordsMap) {
        if (subFileRecordsMap[subrecord] === null) {
          isDone = false;
          break;
        }
        isDone = true;
      }

      if (isDone === true) {
        for (var subrecord in subFileRecordsMap) {
          if (subFileRecordsMap[subrecord] === "error") {
            isValid = false;
            break;
          }
          isValid = true;
        }
        if (isValid === true) {
          response.AchFileRecords.forEach(function(obj) {
            if (obj.achFileRecordId) {
              obj.AchFileSubrecords = subFileRecordsMap[obj.achFileRecordId].AchFileSubrecords;
            }
          });

          var responseRecords = {};
          responseRecords["transactionRecords"] = [];
          var k = 0;

          for (var i = 0; i < response.AchFileRecords.length; i++) {
            for (var j = 0; j < response.AchFileRecords[i].AchFileSubrecords.length; j++) {
              responseRecords.transactionRecords[k] = {};
              responseRecords.transactionRecords[k].receiverName = response.AchFileRecords[i].AchFileSubrecords[j].receiverName;
              responseRecords.transactionRecords[k].receiverAccountNumber = response.AchFileRecords[i].AchFileSubrecords[j].receiverAccountNumber;
              responseRecords.transactionRecords[k].receiverAccountType = response.AchFileRecords[i].AchFileSubrecords[j].receiverAccountType;
              responseRecords.transactionRecords[k].receiverTransactionType = response.AchFileRecords[i].AchFileSubrecords[j].receiverTransactionType;
              responseRecords.transactionRecords[k].amount = response.AchFileRecords[i].AchFileSubrecords[j].amount.toString();
              responseRecords.transactionRecords[k].achFileId = response.AchFileRecords[i].achFileId;
              responseRecords.transactionRecords[k].achFileRecordId = response.AchFileRecords[i].achFileRecordId;
              responseRecords.transactionRecords[k].offsetAccountNumber = response.AchFileRecords[i].offsetAccountNumber;
              responseRecords.transactionRecords[k].achFileSubRecordId = response.AchFileRecords[i].AchFileSubrecords[j].achFileSubRecordId;
              responseRecords.transactionRecords[k].offsetAmount = response.AchFileRecords[i].offsetAmount;
              responseRecords.transactionRecords[k].offsetTransactionType = response.AchFileRecords[i].offsetTransactionType;
              responseRecords.transactionRecords[k].requestType = response.AchFileRecords[i].requestType;
              responseRecords.transactionRecords[k].totalCreditAmount = response.AchFileRecords[i].totalCreditAmount;
              responseRecords.transactionRecords[k].totalDebitAmount = response.AchFileRecords[i].totalDebitAmount;
              k = k + 1;
            }
          }
          navigationContext.context.responseData = responseRecords;
        } else {
          navigationContext.context.responseData = null;
          navigationContext.context.key = navObject.onFailure.context.key;
          navigationContext.form = navObject.onFailure.form;
        }
        applicationManager.getNavigationManager().updateForm(navigationContext.context, navigationContext.form);
      }
    };

    var failureCallSubrecord = function(achFileRecordId) {
      subFileRecordsMap[achFileRecordId] = "error";
    };

    if ((!kony.sdk.isNullOrUndefined(response.AchFileRecords)) && Array.isArray(response.AchFileRecords)) {
      if (response.AchFileRecords.length > 0) {
        response.AchFileRecords.forEach(function(obj) {
          if (obj.achFileRecordId) {
            subFileRecordsMap[obj.achFileRecordId] = null;
            scopeObj.getACHFileSubRecords(obj.achFileRecordId, successCallSubrecord.bind(scopeObj, obj.achFileRecordId), failureCallSubrecord.bind(scopeObj, obj.achFileRecordId));
          }
        });
      } else {
        navigationContext.context.response = response;
        applicationManager.getNavigationManager().updateForm(navigationContext.context, navigationContext.form);
      }
    } else {
      navigationContext.context.response = response;
      applicationManager.getNavigationManager().updateForm(navigationContext.context, navigationContext.form);
    }

  };
  ApprovalsReqModule_PresentationController.prototype.getACHFileSubRecordsSuccess = function(successcallback, response) {
    successcallback(response);
  };
  ApprovalsReqModule_PresentationController.prototype.getACHFileSubRecordsFailure = function(failurecallback) {
    failurecallback();
  };

  ApprovalsReqModule_PresentationController.prototype.getACHFileSubRecords = function(achFileRecordId, successcallback, failurecallback) {
    var scopeObj = this;
    var requestInputs = {
      "achFileRecordId": achFileRecordId
    };
    scopeObj.ACHManager.fetchACHFileSubRecords(
      requestInputs,
      scopeObj.getACHFileSubRecordsSuccess.bind(scopeObj, successcallback),
      scopeObj.getACHFileSubRecordsFailure.bind(scopeObj, failurecallback)
    );
  };
  ApprovalsReqModule_PresentationController.prototype.getACHFileRecords = function(navObject) {
    var scopeObj = this;
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObject.onSuccess.form);
    scopeObj.ACHManager.fetchACHFileRecords(
      navObject.requestData,
      scopeObj.getACHFileRecordsSuccess.bind(scopeObj, navObject),
      scopeObj.completeFailedCall.bind(scopeObj, navObject, "getACHTemplateRecordsFailure")
    );
  };

  ApprovalsReqModule_PresentationController.prototype.getACHFileRecordsSuccess = function(navObject, response) {

    var scopeObj = this;
    var subFileRecordsMap = {};
    var isDone = false;
    var isValid = false;
    var navigationContext = {
      "form": navObject.onSuccess.form,
      "context": {
        "key": navObject.onSuccess.context.key,
        "responseData": response
      }
    };
    var successCallSubrecord = function(achFileRecordId, subrecords) {
      if (subrecords === null || subrecords === [] || subrecords === undefined)
        subFileRecordsMap[achFileRecordId] = [];
      else
        subFileRecordsMap[achFileRecordId] = subrecords;

      for (var subrecord in subFileRecordsMap) {
        if (subFileRecordsMap[subrecord] === null) {
          isDone = false;
          break;
        }
        isDone = true;
      }

      if (isDone === true) {
        for (var subrecord in subFileRecordsMap) {
          if (subFileRecordsMap[subrecord] === "error") {
            isValid = false;
            break;
          }
          isValid = true;
        }
        if (isValid === true) {
          response.AchFileRecords.forEach(function(obj) {
            if (obj.achFileRecordId) {
              obj.AchFileSubrecords = subFileRecordsMap[obj.achFileRecordId].AchFileSubrecords;
            }
          });

          var responseRecords = {};
          responseRecords["transactionRecords"] = [];
          var k = 0;

          for (var i = 0; i < response.AchFileRecords.length; i++) {
            for (var j = 0; j < response.AchFileRecords[i].AchFileSubrecords.length; j++) {
              responseRecords.transactionRecords[k] = {};
              responseRecords.transactionRecords[k].receiverName = response.AchFileRecords[i].AchFileSubrecords[j].receiverName;
              responseRecords.transactionRecords[k].receiverAccountNumber = response.AchFileRecords[i].AchFileSubrecords[j].receiverAccountNumber;
              responseRecords.transactionRecords[k].receiverAccountType = response.AchFileRecords[i].AchFileSubrecords[j].receiverAccountType;
              responseRecords.transactionRecords[k].receiverTransactionType = response.AchFileRecords[i].AchFileSubrecords[j].receiverTransactionType;
              responseRecords.transactionRecords[k].amount = response.AchFileRecords[i].AchFileSubrecords[j].amount.toString();
              responseRecords.transactionRecords[k].achFileId = response.AchFileRecords[i].achFileId;
              responseRecords.transactionRecords[k].achFileRecordId = response.AchFileRecords[i].achFileRecordId;
              responseRecords.transactionRecords[k].offsetAccountNumber = response.AchFileRecords[i].offsetAccountNumber;
              responseRecords.transactionRecords[k].achFileSubRecordId = response.AchFileRecords[i].AchFileSubrecords[j].achFileSubRecordId;
              responseRecords.transactionRecords[k].offsetAmount = response.AchFileRecords[i].offsetAmount;
              responseRecords.transactionRecords[k].offsetTransactionType = response.AchFileRecords[i].offsetTransactionType;
              responseRecords.transactionRecords[k].requestType = response.AchFileRecords[i].requestType;
              responseRecords.transactionRecords[k].totalCreditAmount = response.AchFileRecords[i].totalCreditAmount;
              responseRecords.transactionRecords[k].totalDebitAmount = response.AchFileRecords[i].totalDebitAmount;
              k = k + 1;
            }
          }
          navigationContext.context.responseData = responseRecords;
        } else {
          navigationContext.context.responseData = null;
          navigationContext.context.key = navObject.onFailure.context.key;
          navigationContext.form = navObject.onFailure.form;
        }
        applicationManager.getNavigationManager().updateForm(navigationContext.context, navigationContext.form);
      }
    };

    var failureCallSubrecord = function(achFileRecordId) {
      subFileRecordsMap[achFileRecordId] = "error";
    };

    if ((!kony.sdk.isNullOrUndefined(response.AchFileRecords)) && Array.isArray(response.AchFileRecords)) {
      if (response.AchFileRecords.length > 0) {
        response.AchFileRecords.forEach(function(obj) {
          if (obj.achFileRecordId) {
            subFileRecordsMap[obj.achFileRecordId] = null;
            scopeObj.getACHFileSubRecords(obj.achFileRecordId, successCallSubrecord.bind(scopeObj, obj.achFileRecordId), failureCallSubrecord.bind(scopeObj, obj.achFileRecordId));
          }
        });
      } else {
        navigationContext.context.response = response;
        applicationManager.getNavigationManager().updateForm(navigationContext.context, navigationContext.form);
      }
    } else {
      navigationContext.context.response = response;
      applicationManager.getNavigationManager().updateForm(navigationContext.context, navigationContext.form);
    }

  };

  ApprovalsReqModule_PresentationController.prototype.getACHFileSubRecordsSuccess = function(successcallback, response) {
    successcallback(response);
  };

  ApprovalsReqModule_PresentationController.prototype.getACHFileSubRecordsFailure = function(failurecallback) {
    failurecallback();
  };

  ApprovalsReqModule_PresentationController.prototype.getACHFileSubRecords = function(achFileRecordId, successcallback, failurecallback) {
    var scopeObj = this;
    var requestInputs = {
      "achFileRecordId": achFileRecordId
    };
    scopeObj.ACHManager.fetchACHFileSubRecords(
      requestInputs,
      scopeObj.getACHFileSubRecordsSuccess.bind(scopeObj, successcallback),
      scopeObj.getACHFileSubRecordsFailure.bind(scopeObj, failurecallback)
    );
  };

  ApprovalsReqModule_PresentationController.prototype.writeDataStore = function(name, data) {
    try{
      if(kony.sdk.isNullOrUndefined(this.dataStore)) this.dataStore = {};
      this.dataStore[name] = CommonUtilities.cloneJSON(data);
    }catch(err){}
  };

  ApprovalsReqModule_PresentationController.prototype.readDataStore = function(name) {
    try{
      if(kony.sdk.isNullOrUndefined(this.dataStore)) this.dataStore = {};
      if(kony.sdk.isNullOrUndefined(this.dataStore[name])) this.dataStore[name] = null;
      return CommonUtilities.cloneJSON(this.dataStore[name]);
    }
    catch(err) {}
  };

  ApprovalsReqModule_PresentationController.prototype.resetDataStore = function(name) {
    try{
      this.dataStore = {};
    }
    catch(err) {}
  };
  
  ApprovalsReqModule_PresentationController.prototype.getMaxApprovals = function() {
    var scopeObj = this;
    return scopeObj.ApprovalsReqManager.getMaxApprovals();
  };

  ApprovalsReqModule_PresentationController.prototype.fetchInfinityUserContractCustomers = function(navObj) {
    var scopeObj = this;
    if(navObj.onSuccess.form === "frmApprovalViewDetails"){
      applicationManager.getNavigationManager().navigateTo(navObj.onSuccess.form);
    } else{
    applicationManager.getNavigationManager().navigateTo(
      {"appName" : navObj.onSuccess.appName, 
       "friendlyName" : navObj.onSuccess.module+"/"+navObj.onSuccess.form}
    );
    }
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObj.onSuccess.form);
	applicationManager.getRecipientsManager().getInfinityUserContractCustomers('', scopeObj.fetchInfinityUserContractCustomersSuccess.bind(this, navObj), scopeObj.completeFailedCall.bind(scopeObj, navObj, "onApproveBBGeneralTransactionsFailure"))
  };

  ApprovalsReqModule_PresentationController.prototype.fetchInfinityUserContractCustomersSuccess = function(navObj, response) {
    if (kony.application.getCurrentForm().id !== navObj.onSuccess.form) {
      applicationManager.getNavigationManager().navigateTo(navObj.onSuccess.form);
    }
    navObj.requestData.InfinityUserContractData = response.contracts;
    applicationManager.getNavigationManager().updateForm({
      "key": navObj.onSuccess.context.key,
      "responseData": navObj.requestData
    }, navObj.onSuccess.form)
  };

  return ApprovalsReqModule_PresentationController;
});
