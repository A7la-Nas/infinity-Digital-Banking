define([], function () {

  /**
     * User defined business controller
     * @constructor
     * @extends kony.mvc.Business.Controller
     */
  function ApprovalsReqManager() { 

    //kony.mvc.Business.Controller.call(this); 

  }

  inheritsFrom(ApprovalsReqManager, kony.mvc.Business.Delegator);

  /**
     * Overridden Method of kony.mvc.Business.Controller
     * This method gets called when business controller gets initialized
     * @method
     */
  ApprovalsReqManager.prototype.initializeBusinessController = function() { 

  };

  /**
  	Method which invokes the command to fetch all the transaction requests with respect to user details
    @deprecated
    **/
  ApprovalsReqManager.prototype.fetchAllTransactionRequests = function(params, transactionRequestsSucessCallback, transactionRequestsFailureCallback){
    var requestsObject = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("MyRequests");
    requestsObject.customVerb("getGeneralTransactionsRequestedByMe", params, transactionRequestsCompletionCallback);
    function transactionRequestsCompletionCallback(status,data,error){
      var serviceResponseHandler = applicationManager.getServiceResponseHandler();
      var responseObject = serviceResponseHandler.manageResponse(status,data,error);
      if(responseObject.status === true){
        transactionRequestsSucessCallback(responseObject.data);
      }
      else{
        transactionRequestsFailureCallback(responseObject.errmsg);
      }
    }
  };

  /**
      Method which invokes the command to fetch all the ACH transaction requests with respect to user details
      @deprecated
    **/
  ApprovalsReqManager.prototype.fetchAllACHTransactionRequests = function(params, ACHTransactionRequetsSucessCallback, ACHTransactionRequestsFailureCallback){
    var scopeObj = this;
    var requestsObject = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("MyRequests");
    requestsObject.customVerb("getACHTransactionsRequestedByMe", params, ACHTransactionRequestsCompletionCallback);
    function ACHTransactionRequestsCompletionCallback(status,data,error){
      var serviceResponseHandler = applicationManager.getServiceResponseHandler();
      var responseObject = serviceResponseHandler.manageResponse(status,data,error);
      if(responseObject.status === true){
        ACHTransactionRequetsSucessCallback(responseObject.data);
      }
      else{
        ACHTransactionRequestsFailureCallback(responseObject.errmsg);
      }
    }
  };
  
  ApprovalsReqManager.prototype.approveACHFilesACHdashboard = function (requestId, presentationSuccessCallback, presentationFailureCallback) {
    var scopeObj = this;
    var ACHFilesApprovalsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("MyApprovals"); 
    ACHFilesApprovalsModel.customVerb("approveACHFile",requestId,getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
      }
      else
        presentationFailureCallback(obj.errmsg);
    }
  };

  ApprovalsReqManager.prototype.rejectACHFilesACH = function (requestId, presentationSuccessCallback, presentationFailureCallback) {
    var scopeObj = this;
    var ACHFilesApprovalsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("MyApprovals"); 
    ACHFilesApprovalsModel.customVerb("rejectACHFile",requestId,getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
      }
      else
        presentationFailureCallback(obj.errmsg);
    }
  };

  ApprovalsReqManager.prototype.approveACHTransactionsACH = function (requestId, presentationSuccessCallback, presentationFailureCallback) {
    var scopeObj = this;
    var ACHFilesApprovalsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("MyApprovals"); 
    ACHFilesApprovalsModel.customVerb("approveACHTransaction",requestId,getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
      }
      else
        presentationFailureCallback(obj.errmsg);
    }
  };

  ApprovalsReqManager.prototype.rejectACHTransactionsACH = function (requestId, presentationSuccessCallback, presentationFailureCallback) {
    var scopeObj = this;
    var ACHFilesApprovalsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("MyApprovals"); 
    ACHFilesApprovalsModel.customVerb("rejectACHTransaction",requestId,getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
      }
      else
        presentationFailureCallback(obj.errmsg);
    }
  };

  /**
      Method which invokes the command to fetch all the ACH File requests with respect to user details
      @deprecated
    **/
  ApprovalsReqManager.prototype.fetchAllACHFileRequests = function(params, ACHFileSucessCallback, ACHFileFailureCallback){
    var scopeObj = this;
    var requestsObject = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("MyRequests");
    requestsObject.customVerb("getACHFilesRequestedByMe", params, ACHFileRequestsCompletionCallback);

    function ACHFileRequestsCompletionCallback(status,data,error){
      var serviceResponseHandler = applicationManager.getServiceResponseHandler();
      var responseObject = serviceResponseHandler.manageResponse(status,data,error);
      if(responseObject.status === true){
        ACHFileSucessCallback(responseObject.data);
      }
      else{
        ACHFileFailureCallback(responseObject.errmsg);
      }
    }
  };

  ApprovalsReqManager.prototype.withdrawTransactionRequest = function(params,successCallback,failureCallback){
    var withdrawObject = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("MyRequests");
    withdrawObject.customVerb("withdrawGeneralTransaction",params,onCompletionCallback);
    function onCompletionCallback(status,data,error){
      var serviceResponseHandler = applicationManager.getServiceResponseHandler();
      var responseObject = serviceResponseHandler.manageResponse(status,data,error);
      if(responseObject.status === true)
        successCallback(responseObject.data);
      else
        failureCallback(responseObject.errmsg);
    }
  };

  /**
   * @deprecated
   */
  ApprovalsReqManager.prototype.fetchBulkCancellationReason = function (params, presentationSuccessCallback, presentationFailureCallback) {
    var approvalsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("BulkPaymentRecord"); 
    approvalsModel.customVerb("fetchCancellationReasons", params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
      }
      else{
        presentationFailureCallback(obj.errmsg);
      }
    }
  };

  ApprovalsReqManager.prototype.withdrawACHTransactionRequest = function(params,successCallback,failureCallback){
    var withdrawObject = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("MyRequests");
    withdrawObject.customVerb("withdrawACHTransaction",params,onCompletionCallback);
    function onCompletionCallback(status,data,error){
      var serviceResponseHandler = applicationManager.getServiceResponseHandler();
      var responseObject = serviceResponseHandler.manageResponse(status,data,error);
      if(responseObject.status === true)
        successCallback(responseObject.data);
      else
        failureCallback(responseObject.errmsg);
    }
  };

  ApprovalsReqManager.prototype.withdrawACHFileRequest = function(params,successCallback,failureCallback){
    var withdrawObject = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("MyRequests");
    withdrawObject.customVerb("withdrawACHFile",params,onCompletionCallback);
    function onCompletionCallback(status,data,error){
      var serviceResponseHandler = applicationManager.getServiceResponseHandler();
      var responseObject = serviceResponseHandler.manageResponse(status,data,error);
      if(responseObject.status === true)
        successCallback(responseObject.data);
      else
        failureCallback(responseObject.errmsg);
    }
  };
  
  /**
   * @deprecated
   */
  ApprovalsReqManager.prototype.fetchGeneralTransactionsPendingForMyApprovals = function (params, presentationSuccessCallback, presentationFailureCallback) {
    var GenTrApprovalsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("MyApprovals"); 
    GenTrApprovalsModel.customVerb("getGeneralTransactions",params,getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true ) {
        presentationSuccessCallback(obj.data);
      }
      else{
        presentationFailureCallback(obj.errmsg);
      }
    }
  };

  ApprovalsReqManager.prototype.fetchACHTransactionsPendingForMyApprovals = function (params, presentationSuccessCallback, presentationFailureCallback) {
    var ACHTrApprovalsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("MyApprovals"); 
    ACHTrApprovalsModel.customVerb("getACHTransactionsPendingForApproval",params,getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
      }
      else{
        presentationFailureCallback(obj.errmsg);
      }
    }
  };
  
  /**
   * @deprecated
   */
  ApprovalsReqManager.prototype.fetchACHFilesPendingForMyApprovals = function (params, presentationSuccessCallback, presentationFailureCallback) {
    var ACHFilesApprovalsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("MyApprovals"); 
    ACHFilesApprovalsModel.customVerb("getACHFiles",params,getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
      }
      else{
        presentationFailureCallback(obj.errmsg);
      }
    }
  };

  ApprovalsReqManager.prototype.approveBBGeneralTransactions = function (requestId, presentationSuccessCallback, presentationFailureCallback) {
    var scopeObj = this;
    var ACHFilesApprovalsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("MyApprovals"); 
    ACHFilesApprovalsModel.customVerb("approveBBGeneralTransaction",requestId,getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
      }
      else
        presentationFailureCallback(obj.errmsg);
    }
  };

  ApprovalsReqManager.prototype.approveACHTransactions = function (requestId, presentationSuccessCallback, presentationFailureCallback) {
    var scopeObj = this;
    var ACHFilesApprovalsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("MyApprovals"); 
    ACHFilesApprovalsModel.customVerb("Approve",requestId,getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
      }
      else
        presentationFailureCallback(obj.errmsg);
    }
  };

  ApprovalsReqManager.prototype.approveACHFiles = function (requestId, presentationSuccessCallback, presentationFailureCallback) {
    var scopeObj = this;
    var ACHFilesApprovalsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("MyApprovals"); 
    ACHFilesApprovalsModel.customVerb("Approve",requestId,getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
      }
      else
        presentationFailureCallback(obj.errmsg);
    }
  };

  ApprovalsReqManager.prototype.rejectBBGeneralTransactions = function (requestId, presentationSuccessCallback, presentationFailureCallback) {
    var scopeObj = this;
    var ACHFilesApprovalsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("MyApprovals"); 
    ACHFilesApprovalsModel.customVerb("rejectBBGeneralTransaction",requestId,getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
      }
      else
        presentationFailureCallback(obj.errmsg);
    }
  };

  ApprovalsReqManager.prototype.rejectACHTransactions = function (requestId, presentationSuccessCallback, presentationFailureCallback) {
    var scopeObj = this;
    var ACHFilesApprovalsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("MyApprovals"); 
    ACHFilesApprovalsModel.customVerb("Reject",requestId,getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
      }
      else
        presentationFailureCallback(obj.errmsg);
    }
  };

  ApprovalsReqManager.prototype.rejectACHFiles = function (requestId, presentationSuccessCallback, presentationFailureCallback) {
    var scopeObj = this;
    var ACHFilesApprovalsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("MyApprovals"); 
    ACHFilesApprovalsModel.customVerb("Reject",requestId,getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
      }
      else
        presentationFailureCallback(obj.errmsg);
    }
  };

  ApprovalsReqManager.prototype.fetchRejectedACHTransactions = function (params, presentationSuccessCallback, presentationFailureCallback) {
    var approvalsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("MyApprovals");
    approvalsModel.customVerb("getRejectedACHTransactions", params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
      }
      else{
        presentationFailureCallback(obj.error);
      }
    }
  };
  
  /**
   * @deprecated
   */
  ApprovalsReqManager.prototype.fetchRejectedACHFiles = function (params, presentationSuccessCallback, presentationFailureCallback) {
    var approvalsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("MyApprovals"); 
    approvalsModel.customVerb("RejectedFiles", params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
      }
      else{
        presentationFailureCallback(obj.error);
      }
    }
  };

  ApprovalsReqManager.prototype.getRequestsHistory = function (params, presentationSuccessCallback, presentationFailureCallback) {
    var approvalsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("MyRequests");
    approvalsModel.customVerb("getRequestsHistory", params, (status, data, error) => {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
      } else {
        presentationFailureCallback(obj.errmsg);
      }
    });
  };

  ApprovalsReqManager.prototype.FetchAllMyApprovalHistory = function (params, presentationSuccessCallback, presentationFailureCallback) {
    var approvalsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("MyApprovals"); 
    approvalsModel.customVerb("fetchAllMyApprovalHistory", params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
      }
      else{
        presentationFailureCallback(obj.errmsg);
      }
    }
  };

  ApprovalsReqManager.prototype.Reject = function (params, presentationSuccessCallback, presentationFailureCallback) {
    var approvalsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("MyApprovals"); 
    approvalsModel.customVerb("Reject", params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
      }
      else{
        presentationFailureCallback(obj.errmsg);
      }
    }
  };

  ApprovalsReqManager.prototype.Approve = function (params, presentationSuccessCallback, presentationFailureCallback) {
    var approvalsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("MyApprovals"); 
    approvalsModel.customVerb("Approve", params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
      }
      else{
        presentationFailureCallback(obj.errmsg);
      }
    }
  };

  ApprovalsReqManager.prototype.withdraw = function (params, presentationSuccessCallback, presentationFailureCallback) {
    var approvalsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("MyRequests"); 
    approvalsModel.customVerb("Withdraw", params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
      }
      else{
        presentationFailureCallback(obj.errmsg);
      }
    }
  };

  ApprovalsReqManager.prototype.fetchAllMyPendingRequests = function (params, presentationSuccessCallback, presentationFailureCallback) {
    var approvalsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("MyRequests");
    approvalsModel.customVerb("fetchAllMyPendingRequests", params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
      }
      else{
        presentationFailureCallback(obj.errmsg);
      }
    }
  };

  ApprovalsReqManager.prototype.fetchAllMyRequestHistory = function (params, presentationSuccessCallback, presentationFailureCallback) {
    var approvalsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("MyRequests"); 
    approvalsModel.customVerb("fetchAllMyRequestHistory", params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
      }
      else{
        presentationFailureCallback(obj.errmsg);
      }
    }
  };

  ApprovalsReqManager.prototype.fetchAllMyPendingApprovals = function (params, presentationSuccessCallback, presentationFailureCallback) {
    var approvalsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("MyApprovals"); 
    approvalsModel.customVerb("fetchAllMyPendingApprovals", params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
      }
      else{
        presentationFailureCallback(obj.errmsg);
      }
    }
  };

  /**
   * @deprecated
   */
  ApprovalsReqManager.prototype.fetchPendingBulkPaymentApprovals = function (params, presentationSuccessCallback, presentationFailureCallback) {
    var approvalsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("BulkPaymentRecord"); 
    approvalsModel.customVerb("fetchRecordsWaitingForMyApproval", params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
      }
      else{
        presentationFailureCallback(obj.errmsg);
      }
    }
  };

  /**
   * @deprecated
   */
  ApprovalsReqManager.prototype.fetchPendingBulkPaymentRequests = function (params, presentationSuccessCallback, presentationFailureCallback) {
    var approvalsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("BulkPaymentRecord"); 
    approvalsModel.customVerb("fetchRecordsReviewedByMeAndInApprovalQueue", params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
      }
      else{
        presentationFailureCallback(obj.errmsg);
      }
    }
  };

  /**
   * @deprecated
   */
  ApprovalsReqManager.prototype.fetchRecordsHistoryActedByMe = function (params, presentationSuccessCallback, presentationFailureCallback) {
    var approvalsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("BulkPaymentRecord"); 
    approvalsModel.customVerb("fetchRecordHistoryActedByMe", params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
      }
      else{
        presentationFailureCallback(obj.errmsg);
      }
    }
  };

  /**
   * @deprecated
   */
  ApprovalsReqManager.prototype.fetchRecordsHistoryReviewedByMe = function (params, presentationSuccessCallback, presentationFailureCallback) {
    var approvalsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("BulkPaymentRecord"); 
    approvalsModel.customVerb("fetchRecordHistoryReviewedByMe", params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
      }
      else{
        presentationFailureCallback(obj.errmsg);
      }
    }
  };
  
  /**
   * @deprecated
   */
  ApprovalsReqManager.prototype.approveBulkPaymentRecord = function (params, presentationSuccessCallback, presentationFailureCallback) {
    var approvalsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("BulkPaymentRecord"); 
    approvalsModel.customVerb("approveBulkPaymentRecord", params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
      }
      else{
        presentationFailureCallback(obj.errmsg);
      }
    }
  };
  
  /**
   * @deprecated
   */
  ApprovalsReqManager.prototype.rejectBulkPaymentRecord = function (params, presentationSuccessCallback, presentationFailureCallback) {
    var approvalsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("BulkPaymentRecord"); 
    approvalsModel.customVerb("rejectBulkPaymentRecord", params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
      }
      else{
        presentationFailureCallback(obj.errmsg);
      }
    }
  };

  ApprovalsReqManager.prototype.getApprovalHistory = function(inputPayLoad,presentationSuccess,presentationError) {
    var businessUser = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("MyApprovals");
    var scope = this;

    businessUser.customVerb("fetchAllMyApprovalHistory",inputPayLoad,getUserRoleActionsCompletionCallback);
    function getUserRoleActionsCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error, presentationSuccess, presentationError);
      if (obj["status"] === true) {
        presentationSuccess(obj["data"]);
      } 
      else {
        presentationError(obj["error"]);
      }
    }
  };

  ApprovalsReqManager.prototype.getApprovalPending = function(inputPayLoad,presentationSuccess,presentationError) {
    var businessUser = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("MyApprovals");

    businessUser.customVerb("fetchAllMyPendingApprovals",inputPayLoad, (status, data, error) => {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error, presentationSuccess, presentationError);
      if (obj["status"] === true) {
        presentationSuccess(obj["data"]);
      } else {
        presentationError(obj["error"] || obj["errmsg"]);
      }
    });
  };

  ApprovalsReqManager.prototype.getRequestHistory = function(inputPayLoad,presentationSuccess,presentationError) {
    var businessUser = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("MyRequests");
    var scope = this;

    businessUser.customVerb("fetchAllMyRequestHistory",inputPayLoad,getUserRoleActionsCompletionCallback);
    function getUserRoleActionsCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error, presentationSuccess, presentationError);
      if (obj["status"] === true) {
        presentationSuccess(obj["data"]);
      } 
      else {
        presentationError(obj["error"]);
      }
    }
  };

  ApprovalsReqManager.prototype.getRequestPending = function(inputPayLoad,presentationSuccess,presentationError) {
    var businessUser = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("MyRequests");
    var scope = this;

    businessUser.customVerb("fetchAllMyPendingRequests",inputPayLoad,getUserRoleActionsCompletionCallback);
    function getUserRoleActionsCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error, presentationSuccess, presentationError);
      if (obj["status"] === true) {
        presentationSuccess(obj["data"]);
      } 
      else {
        presentationError(obj["error"]);
      }
    }
  };

  ApprovalsReqManager.prototype.fetchRejectTransactions = function (params, presentationSuccessCallback, presentationFailureCallback) {
    var approvalsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("MyApprovals"); 
    approvalsModel.customVerb("Reject", params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      //obj.status = true;
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
      }
      else{
        presentationFailureCallback(obj.errmsg);
      }
    }
  };

  ApprovalsReqManager.prototype.fetchApproveTransactions = function (params, presentationSuccessCallback, presentationFailureCallback) {
    var approvalsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("MyApprovals"); 
    approvalsModel.customVerb("Approve", params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
      }
      else{
        presentationFailureCallback(obj.errmsg);
      }
    }
  };

  ApprovalsReqManager.prototype.renotifyPendingApprovalRequest = function (params, presentationSuccessCallback, presentationFailureCallback) {
    var approvalsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("MyRequests"); 
    approvalsModel.customVerb("RenotifyPendingApprovalRequest", params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
      }
      else{
        presentationFailureCallback(obj.errmsg);
      }
    }
  };
  
  /**
   * @deprecated
   */
  ApprovalsReqManager.prototype.getACHTransactionDataByID = function(params,successCallback,errorCallback) {
    var self = this;
    var ACHTrModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("ACHTransactions");
    ACHTrModel.customVerb("getACHTransactionDetailsById",params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true) {
        successCallback(obj.data);
      }
      else  errorCallback(obj.errmsg);
    }
  };
  
  /**
   * @deprecated
   */
  ApprovalsReqManager.prototype.getGenTransactionDataByID = function(params,successCallback,errorCallback) {
    var self = this;
    var GenTrModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("BBGeneralTransactions");
    GenTrModel.customVerb("getBBGeneralTransactionDetailsByID",params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true) {
        successCallback(obj.data);
      }
      else  errorCallback(obj.errmsg);
    }
  };

  ApprovalsReqManager.prototype.getFilesDataByID = function(params,successCallback,errorCallback) {
    var self = this;
    var ACHFilesModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("ACHFile");
    ACHFilesModel.customVerb("getFileDetailsByID",params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true) {
        successCallback(obj.data);
      }
      else { 
        errorCallback(obj.errmsg);
      }
    }
  };

  ApprovalsReqManager.prototype.fetchCounts = function (params,presentationSuccessCallback, presentationFailureCallback) {
    var ApprovalsReqModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("Counts");
    //ACHFilesApprovalsModel.getAll(getAllCompletionCallback);
    ApprovalsReqModel.customVerb("getCounts",params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
      } else {
        presentationFailureCallback(obj.errmsg);
      }
    }
  };
  ApprovalsReqManager.prototype.fetchPendingCounts = function (params,presentationSuccessCallback, presentationFailureCallback) {
    var ApprovalsReqModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("Counts");
    //ACHFilesApprovalsModel.getAll(getAllCompletionCallback);
    ApprovalsReqModel.customVerb("getPendingCounts",params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
      } else {
        presentationFailureCallback(obj.errmsg);
      }
    }
  };

  ApprovalsReqManager.prototype.fetchACHTransactionRecords = function (params, successCallback, errorCallback) {
    var self = this;
    var ACHTransactionModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("TransactionRecords");
    ACHTransactionModel.customVerb("fetchTransactionRecordsById",params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true) {
        successCallback(obj.data);
      }
      else  errorCallback(obj.errmsg);
    }
  };

  ApprovalsReqManager.prototype.fetchACHFileRecords = function (params, successCallback, errorCallback) {
    var self = this;
    var ACHFileModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("ACHFileRecord");
    ACHFileModel.customVerb("fetchACHFileRecords",params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true) {
        successCallback(obj.data);
      }
      else  errorCallback(obj.errmsg);
    }
  };

  ApprovalsReqManager.prototype.fetchACHFileSubRecords = function (params, successCallback, errorCallback) {
    var self = this;
    var ACHFileSubRecModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("ACHFileSubRecord");
    ACHFileSubRecModel.customVerb("fetchACHFileSubRecords",params, getCompletionCallback);
    function getCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true) {
        successCallback(obj.data);
      }
      else  errorCallback(obj.errmsg);
    }
  }; 
  
  ApprovalsReqManager.prototype.getMaxApprovals = function () {
    var maxMultipleApprovalsAllowed = 10;
    return maxMultipleApprovalsAllowed;
  };
  
  return ApprovalsReqManager;

});