/**
  * @module ACHManager
 */

define([], function () { 

  /**
	*This is class named ACHManager which handles all functions related to Messages in the application
	*@alias module:ACHManager
	*@class
	*/
  /**
     * User defined business controller
     * @constructor
     * @extends kony.mvc.Business.Controller
     */
  function ACHManager() { 
    this.ACHfiles = null;
  }

  inheritsFrom(ACHManager, kony.mvc.Business.Delegator);

  ACHManager.prototype.initializeBusinessController = function() { }; 

  ACHManager.prototype.uploadNewACHFile = function (params, successCallback, errorCallback) {
    var self = this;
    var ACHFileModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("ACHFile");
    ACHFileModel.customVerb("UploadACHFile",params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true)
        successCallback(obj.data);
      else  {
        if(!kony.sdk.isNullOrUndefined(obj.errmsg.serverErrorRes) && !kony.sdk.isNullOrUndefined(obj.errmsg.serverErrorRes.MFAAttributes)) {
          errorCallback(obj.errmsg.serverErrorRes);
        }
        else{
          errorCallback(obj.errmsg);
        }
      }
    }
  };   


  ACHManager.prototype.fetchApprovalRequestCounts = function (presentationSuccessCallback, presentationFailureCallback) {
    var ACHFilesApprovalsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("Counts"); 
    ACHFilesApprovalsModel.getAll(getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        var counts = obj.data[0];
        if(! kony.sdk.isNullOrUndefined(counts)){
          applicationManager.getConfigurationManager().transactionsPendingForMyApprovalCount = parseInt(counts.GeneralTransactionsForMyApproval);
          applicationManager.getConfigurationManager().achTransactionsPendingForMyApprovalCount = parseInt(counts.ACHTransactionsForMyApproval);
          applicationManager.getConfigurationManager().achFilesPendingForMyApprovalCount = parseInt(counts.ACHFilesForMyApproval);
          applicationManager.getConfigurationManager().AwaitingCount = parseInt(counts.myRequestsWaiting);
          applicationManager.getConfigurationManager().RejectedCount = parseInt(counts.myRequestsRejected);
          applicationManager.getConfigurationManager().ApprovedCount = parseInt(counts.myRequestsApproved);
        }
        else{
          applicationManager.getConfigurationManager().transactionsPendingForMyApprovalCount = 0;
          applicationManager.getConfigurationManager().achTransactionsPendingForMyApprovalCount = 0;
          applicationManager.getConfigurationManager().achFilesPendingForMyApprovalCount = 0;
          applicationManager.getConfigurationManager().AwaitingCount = 0;
          applicationManager.getConfigurationManager().RejectedCount = 0;
          applicationManager.getConfigurationManager().ApprovedCount = 0;
        }
        presentationSuccessCallback(obj.data);

      }
      else {
        applicationManager.getConfigurationManager().transactionsPendingForMyApprovalCount = 0;
        applicationManager.getConfigurationManager().achTransactionsPendingForMyApprovalCount = 0;
        applicationManager.getConfigurationManager().achFilesPendingForMyApprovalCount = 0;
        applicationManager.getConfigurationManager().AwaitingCount = 0;
        applicationManager.getConfigurationManager().RejectedCount = 0;
        applicationManager.getConfigurationManager().ApprovedCount = 0;
        presentationFailureCallback(obj.errmsg);
      }
    }
  };

  ACHManager.prototype.fetchRejectedGeneralTransactions = function (presentationSuccessCallback, presentationFailureCallback) {
    var GenTrRejected = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("BBGeneralTransactions"); 
    GenTrRejected.customVerb("RejectedGenTransactions",{},getAllCompletionCallback);
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

  ACHManager.prototype.getACHTransactionDataByID = function(params,successCallback,errorCallback) {
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

  ACHManager.prototype.getGenTransactionDataByID = function(params,successCallback,errorCallback) {
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



  ACHManager.prototype.fetchTemplateTypes=function(presentationSuccessCallback,presentationFailureCallback){
    var self = this;
    var TransactionTypesModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("TransactionTypes"); 
    TransactionTypesModel.getAll(getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
      }  
      else {
        presentationFailureCallback(obj.error);
      }
    }
  };

  ACHManager.prototype.fetchtACHAccountTypes=function(presentationSuccessCallback,presentationFailureCallback){
    var self = this;
    var TransactionTypesModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("ACHAccountTypes"); 
    TransactionTypesModel.getAll(getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
      }  
      else {
        presentationFailureCallback(obj.error);
      }
    }
  };


  ACHManager.prototype.fetchtTaxTypes=function(presentationSuccessCallback,presentationFailureCallback){
    var self = this;
    var TransactionTypesModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("TaxType"); 
    TransactionTypesModel.getAll(getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
      }  
      else {
        presentationFailureCallback(obj.error);
      }
    }
  };

  ACHManager.prototype.fetchtTaxSubTypes=function(params, presentationSuccessCallback,presentationFailureCallback){
    var self = this;
    var TransactionTypesModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("TaxSubType"); 
    TransactionTypesModel.customVerb("FetchTaxSubTypes", params, getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
      }  
      else {
        presentationFailureCallback(obj.error);
      }
    }
  };

  ACHManager.prototype.fetchRequestTypes=function(params, presentationSuccessCallback,presentationFailureCallback){
    var self = this;
    var TransactionTypesModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("TemplateRequestTypes"); 
    TransactionTypesModel.customVerb("FetchTemplateRequestTypes", params, getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data.TemplateRequestType);
      }  
      else {
        presentationFailureCallback(obj.error);
      }
    }
  };

  ACHManager.prototype.getFileFormatTypes = function(successCallback,errorCallback,fileType) {
    var self = this;
    var ACHFileFormatsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("ACHFileFormats");
    ACHFileFormatsModel.getAll(getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true) {
        if(fileType === null || fileType === undefined)
          successCallback(obj.data);
        else
          successCallback(fileType,obj.data);
      }
      else
        errorCallback(obj.errmsg);
    }
  };

  ACHManager.prototype.getFilesData = function(params, successCallback, errorCallback) {
    var self = this;
    var ACHFilesModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("ACHFile");
    ACHFilesModel.customVerb("getAllACHFiles", params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true) {
        successCallback(obj.data);
      }
      else  
        errorCallback(obj.errmsg);
    }
  };

  ACHManager.prototype.getFilesDataByID = function(params,successCallback,errorCallback) {
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

  ACHManager.prototype.getACHTransactionsData = function (params, presentationSuccessCallback, presentationFailureCallback) {
    var self = this;
    var ACHTransactionsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("ACHTransactions"); 
    ACHTransactionsModel.customVerb("getAllACHTransactions", params, getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true)
        presentationSuccessCallback(obj.data);
      else
        presentationFailureCallback(obj.errmsg);
    }
  };

  ACHManager.prototype.getACHTemplatesData = function (params, presentationMsgSuccess, presentationMsgError) {
    var self = this;
    var ACHTemplatesModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("ACHTemplates"); 
    ACHTemplatesModel.customVerb("getAllACHTemplates", params, getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true)
        presentationMsgSuccess(obj.data);
      else
        presentationMsgError(obj.error);
    }
  };

  ACHManager.prototype.fetchACHTemplateRecords = function (params, successCallback, errorCallback) {
    var self = this;
    var ACHTemplateModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("TemplateRecords");
    ACHTemplateModel.customVerb("fetchTemplateRecordById",params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true) {
        successCallback(obj.data);
      }
      else  errorCallback(obj.errmsg);
    }
  };

  ACHManager.prototype.fetchACHTransactionRecords = function (params, successCallback, errorCallback) {
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

  ACHManager.prototype.createACHTranscation = function (params, successCallback, errorCallback) {
    var self = this;
    var ACHTransactionModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("ACHTransactions");
    ACHTransactionModel.customVerb("createACHTransaction",params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true ) {
        if(!kony.sdk.isNullOrUndefined(obj.data.bbtransaction) && Array.isArray(obj.data.bbtransaction) && obj.data.bbtransaction.length>0) {
          successCallback(obj.data.bbtransaction[0]);
        }
        else{
          successCallback(obj.data);
        }    
      }
      else{
        if(!kony.sdk.isNullOrUndefined(obj.errmsg.serverErrorRes) && !kony.sdk.isNullOrUndefined(obj.errmsg.serverErrorRes.MFAAttributes)) {
          errorCallback(obj.errmsg.serverErrorRes);
        }
        else{
          errorCallback(obj.errmsg);
        } 
      }  
    }
  };

  ACHManager.prototype.createACHTemplate = function (params, successCallback, errorCallback) {
    var self = this;
    var ACHTemplateModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("ACHTemplates");
    ACHTemplateModel.customVerb("createACHTemplate",params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true ) {
        successCallback(obj.data);
      }
      else  errorCallback(obj.errmsg);
    }
  };

  ACHManager.prototype.deleteACHTemplate = function (params, successCallback, errorCallback) {
    var self = this;
    var ACHTemplateModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("ACHTemplates");
    ACHTemplateModel.customVerb("deleteACHTemplate",params, getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true) {
        successCallback(obj.data);
      }
      else  errorCallback(obj.errmsg);
    }
  };

  ACHManager.prototype.editACHTemplate = function (params, successCallback, errorCallback) {
    var ACHTemplateModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("ACHTemplates");
    ACHTemplateModel.customVerb("editACHTemplate", params, getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true) {
        successCallback(obj.data);
      }
      else  errorCallback(obj.errmsg);
    }
  };

  ACHManager.prototype.getTemplateDetailsById = function (params, successCallback, errorCallback) {
    var ACHTemplateModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("ACHTemplates");
    ACHTemplateModel.customVerb("getTemplateDetailsById", params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true) {
        successCallback(obj.data);
      }
      else  errorCallback(obj.errmsg);
    }
  };

  ACHManager.prototype.executeTemplate = function (params, successCallback, errorCallback) {
    var self = this;
    var ACHTemplateModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("ACHTemplates");
    ACHTemplateModel.customVerb("Execute",params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true ) {
        if(!kony.sdk.isNullOrUndefined(obj.data.bbtransaction) && Array.isArray(obj.data.bbtransaction) && obj.data.bbtransaction.length>0) {
          successCallback(obj.data.bbtransaction[0]);
        }
        else{
          successCallback(obj.data);
        }  
      }
      else{
        if(!kony.sdk.isNullOrUndefined(obj.errmsg.serverErrorRes) && !kony.sdk.isNullOrUndefined(obj.errmsg.serverErrorRes.MFAAttributes)) {
          errorCallback(obj.errmsg.serverErrorRes);
        }
        else{
          errorCallback(obj.errmsg);
        } 
      }
    }
  };

  ACHManager.prototype.saveTransaction = function (params, successCallback, errorCallback) {
    var self = this;
    var ACHTemplateModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("ACHTransactions");
    ACHTemplateModel.customVerb("SaveAsTemplate",params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true ) {
        successCallback(obj.data.bbtemplate[0]);
      }
      else  errorCallback(obj.errmsg);
    }
  };
  /** createBBGeneral Transactions, is called if General Transaction amount is greater than max limit for that Transaction Type **/
  ACHManager.prototype.createBBGeneralTransactions = function (params,successCallback,failureCallback) {
    var BBGeneralTransModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("BBGeneralTransactions");
    BBGeneralTransModel.customVerb("createBBTransaction",params, createCompletionCallback);
    function createCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true) {
        successCallback(obj.data);
      }
      else
        failureCallback(obj.error);
    }
  };

  // Cash Positions Data Model
  ACHManager.prototype.getCashPositionData = function (inputParam, presentationMsgSuccess, presentationMsgError) {

    var CashPositionModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("CashPositions");
    CashPositionModel.customVerb('getDetails',inputParam,getCompletionCallback);
    function getCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true) {

        presentationMsgSuccess(data);

      }
      else  presentationMsgError(obj.errmsg);
    }

  };


  ACHManager.prototype.fetchACHTemplateSubRecords = function (params, successCallback, errorCallback) {
    var self = this;
    var TempSubRecordModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("TemplateSubRecord");
    TempSubRecordModel.customVerb("fetchTemplateSubRecords",params, getCompletionCallback);
    function getCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true) {
        successCallback(obj.data);
      }
      else  errorCallback(obj.errmsg);
    }
  };

  ACHManager.prototype.fetchACHTransactionSubRecords = function (params, successCallback, errorCallback) {
    var self = this;
    var TransSubRecordModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("TransactionSubRecord");
    TransSubRecordModel.customVerb("fetchTransactionSubRecords",params, getCompletionCallback);
    function getCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true) {
        successCallback(obj.data);
      }
      else  errorCallback(obj.errmsg);
    }
  }; 

  ACHManager.prototype.fetchTermsAndConditionsPostLogin = function (params, successCallback, errorCallback) {
    var self = this;
    var infoTerms = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("TermsAndConditions");
    infoTerms.customVerb('getPostLogin', params, getCompletionCallback);
    function  getCompletionCallback(status,  data,  error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true) {
        successCallback(obj.data);
      }
      else  errorCallback(obj.errmsg);
    }
  };

  ACHManager.prototype.fetchACHFileRecords = function (params, successCallback, errorCallback) {
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

  ACHManager.prototype.fetchACHFileSubRecords = function (params, successCallback, errorCallback) {
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

  ACHManager.prototype.fetchCounts = function (params,presentationSuccessCallback, presentationFailureCallback) {
    var ACHFilesApprovalsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("Counts");
    //ACHFilesApprovalsModel.getAll(getAllCompletionCallback);
    ACHFilesApprovalsModel.customVerb("getCounts",params, getAllCompletionCallback);
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

  return ACHManager;
});