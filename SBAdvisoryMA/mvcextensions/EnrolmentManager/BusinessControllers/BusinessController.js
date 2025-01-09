define([], function() {

  /**
   * User defined business controller
   * @constructor
   * @extends kony.mvc.Business.Delegator
   */
  function EnrolmentManager() {

    kony.mvc.Business.Delegator.call(this);

  }

  inheritsFrom(EnrolmentManager, kony.mvc.Business.Delegator);
  EnrolmentManager.prototype.initializeBusinessController = function() {};

  /**
   * Method to fetch Accounting Providers
   * @param {object} params - consist of payload to fetch Accounting Providers
   * @param {function} presentationSuccessCallback - invoke the call back with success response
   * @param {function} presentationErrorCallback - invoke the call back with error response
   */
  EnrolmentManager.prototype.fetchAccountingProvider = function(params, presentationSuccessCallback, presentationErrorCallback) {
    const EnrolmentModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Enrollment");
    EnrolmentModel.customVerb('getAccountingData', params, getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
      const srh = applicationManager.getServiceResponseHandler();
      const obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      } else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };
  
    /**
   * Method to get Enrolled to SBA
   * @param {object} params - consist of payload to get Enrolled to SBA
   * @param {function} presentationSuccessCallback - invoke the call back with success response
   * @param {function} presentationErrorCallback - invoke the call back with error response
   */
  EnrolmentManager.prototype.EnrollSBA = function(params, presentationSuccessCallback, presentationErrorCallback) {
    const EnrolmentModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Enrollment");
    EnrolmentModel.customVerb('startProcess', params, getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
      const srh = applicationManager.getServiceResponseHandler();
      const obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      } else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };
  
  /**
   * Method to update sbaEnrolmentStatus
   * @param {object} params - consist of payload to update sbaEnrolmentStatus
   * @param {function} presentationSuccessCallback - invoke the call back with success response
   * @param {function} presentationErrorCallback - invoke the call back with error response
   */
  EnrolmentManager.prototype.updateSBAStatus = function (params, presentationSuccessCallback, presentationErrorCallback) {
    var infinityUserModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("SBAEnrollmentStatus");
    infinityUserModel.customVerb("updateSBAStatus", params, getAllCompletionCallback);
    function  getAllCompletionCallback(status,  data,  error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj =  srh.manageResponse(status,  data,  error);
      if(obj["status"] === true){
        presentationSuccessCallback(obj["data"]);
      }
      else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };

  /**
   * Method to fetch Cash Flow Prediction
   * @param {object} params - consist of payload 
   * @param {function} presentationSuccessCallback - invoke the call back with success response
   * @param {function} presentationErrorCallback - invoke the call back with error response
   */
  EnrolmentManager.prototype.fetchCashFlow = function (params, presentationSuccessCallback, presentationErrorCallback) {
    var self = this;
    var cashFlowRepo = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("CashFlow");
    cashFlowRepo.customVerb('get12MonthCashFlow', params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error, presentationSuccessCallback, presentationErrorCallback);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      } else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };
  
  /**
   * Method to simulate Cash Flow Prediction
   * @param {object} params - consist of payload 
   * @param {function} presentationSuccessCallback - invoke the call back with success response
   * @param {function} presentationErrorCallback - invoke the call back with error response
   */
  EnrolmentManager.prototype.simulateCashFlow = function (params, presentationSuccessCallback, presentationErrorCallback) {
    var cashFlowRepo = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("Simulation");
    cashFlowRepo.customVerb('updateDetails', params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error, presentationSuccessCallback, presentationErrorCallback);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      } else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };
  
  /**
   * Method to download excel file
   * @param {object} params - consist of payload 
   * @param {function} presentationSuccessCallback - invoke the call back with success response
   * @param {function} presentationErrorCallback - invoke the call back with error response
   */
  EnrolmentManager.prototype.downloadExcel = function (params, presentationSuccessCallback, presentationErrorCallback) {
    var cashFlowRepo = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("CashFlow");
    cashFlowRepo.customVerb('getCashFlowExcel', params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error, presentationSuccessCallback, presentationErrorCallback);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      } else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };
  
  return EnrolmentManager;

});