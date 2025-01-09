define([], function () {

  /**
   * User defined business controller
   * @constructor
   * @extends kony.mvc.Business.Delegator
   */
  function LDBusinessController() {
    try {
      this.serviceResponseHandler = applicationManager.getServiceResponseHandler();
      this.rolloverRequestModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("RolloverRequests");
    } catch (e) { }
    kony.mvc.Business.Delegator.call(this);
  }

  inheritsFrom(LDBusinessController, kony.mvc.Business.Delegator);
  /**
   * Submits the rollover request.
   * @param {Object} params - Specifies request parameters.
   * @param {function} successCallback - Invokes the call back with success response.
   * @param {function} errorCallback - Invokes the call back with error response.
   */
  LDBusinessController.prototype.submitRolloverRequest = function (params, successCallback, errorCallback) {
    this.rolloverRequestModel.customVerb('submit', params, getCompletionCallback.bind(this));
    function getCompletionCallback(status, data, error) {
      const obj = this.serviceResponseHandler.manageResponse(status, data, error);
      obj.status ? successCallback(obj.data) : errorCallback(obj.errmsg);
    }
  };
  return LDBusinessController;
});