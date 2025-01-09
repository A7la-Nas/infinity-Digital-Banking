define([], function () {

  /**
   * User defined business controller
   * @constructor
   * @extends kony.mvc.Business.Delegator
   */
  function PaymentAllocationManager() {
    try {
      this.serviceResponseHandler = applicationManager.getServiceResponseHandler();
      this.tradeDocumentsModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("TradeDocuments");
      this.paymentAllocationsModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("PaymentAllocations");
    } catch (e) { }
    kony.mvc.Business.Delegator.call(this);
  }

  inheritsFrom(PaymentAllocationManager, kony.mvc.Business.Delegator);
  /**
   * Uploads the document.
   * @param {Object} params - Specifies request parameters.
   * @param {function} successCallback - Invokes the call back with success response.
   * @param {function} errorCallback - Invokes the call back with error response.
   */
  PaymentAllocationManager.prototype.uploadDocument = function (params, successCallback, errorCallback) {
    this.tradeDocumentsModel.customVerb('uploadDocument', params, getAllCompletionCallback.bind(this));
    function getAllCompletionCallback(status, data, error) {
      const obj = this.serviceResponseHandler.manageResponse(status, data, error);
      if (obj.status === true) {
        successCallback(obj.data);
      } else {
        errorCallback(obj.errmsg);
      }
    }
  };
  /**
   * Deletes the uploaded document.
   * @param {Object} params - Specifies request parameters.
   * @param {function} successCallback - Invokes the call back with success response.
   * @param {function} errorCallback - Invokes the call back with error response.
   */
  PaymentAllocationManager.prototype.deleteDocument = function (params, successCallback, errorCallback) {
    this.tradeDocumentsModel.customVerb('deleteDocument', params, getAllCompletionCallback.bind(this));
    function getAllCompletionCallback(status, data, error) {
      const obj = this.serviceResponseHandler.manageResponse(status, data, error);
      if (obj.status === true) {
        successCallback(obj.data);
      } else {
        errorCallback(obj.errmsg);
      }
    }
  };
  /**
   * Fetches the payment allocations.
   * @param {function} successCallback - Invokes the call back with success response.
   * @param {function} errorCallback - Invokes the call back with error response.
   */
  PaymentAllocationManager.prototype.fetchPaymentAllocations = function (successCallback, errorCallback) {
    this.paymentAllocationsModel.customVerb('getPaymentAllocations', {}, getAllCompletionCallback.bind(this));
    function getAllCompletionCallback(status, data, error) {
      const obj = this.serviceResponseHandler.manageResponse(status, data, error);
      if (obj.status === true) {
        successCallback(obj.data);
      } else {
        errorCallback(obj.errmsg);
      }
    }
  };
  /**
   * Requests the payment allocation documents.
   * @param {Object} params - Specifies request parameters.
   * @param {function} successCallback - Invokes the call back with success response.
   * @param {function} errorCallback - Invokes the call back with error response.
   */
  PaymentAllocationManager.prototype.requestDocumentation = function (params, successCallback, errorCallback) {
    this.paymentAllocationsModel.customVerb('requestDocumentation', params, getAllCompletionCallback.bind(this));
    function getAllCompletionCallback(status, data, error) {
      const obj = this.serviceResponseHandler.manageResponse(status, data, error);
      if (obj.status === true) {
        successCallback(obj.data);
      } else {
        errorCallback(obj.errmsg);
      }
    }
  };
  /**
   * Submits the payment allocation documents.
   * @param {Object} params - Specifies request parameters.
   * @param {function} successCallback - Invokes the call back with success response.
   * @param {function} errorCallback - Invokes the call back with error response.
   */
  PaymentAllocationManager.prototype.submitDocumentation = function (params, successCallback, errorCallback) {
    this.paymentAllocationsModel.customVerb('submitDocumentation', params, getAllCompletionCallback.bind(this));
    function getAllCompletionCallback(status, data, error) {
      const obj = this.serviceResponseHandler.manageResponse(status, data, error);
      if (obj.status === true) {
        successCallback(obj.data);
      } else {
        errorCallback(obj.errmsg);
      }
    }
  };

  return PaymentAllocationManager;
});