/**
*@module CDPConsentManager
 */

define([], function () { 
    
  /**
   *CDPConsentManager is the class used to handle alerts and other settings
   *@alias module:CDPConsentManager
   *@class
   */
  function CDPConsentManager() {
  }
  inheritsFrom(CDPConsentManager, kony.mvc.Business.Delegator);
  CDPConsentManager.prototype.initializeBusinessController = function(){};
  /**
 * Gets list wise accounts and the respective account alerts for the user signed-in.
 * @param {function} presentation @successCallback - will be called when call is successfull.
 * @param {function} presentation @failureCallback - will be called when call is not successfull.
 * @returns {Array} -Array of records of accounts list with account alerts to the presentation @successCallback.
 */

  
  
   CDPConsentManager.prototype.getConsentData = function(presentationSuccessCallback,presentationErrorCallback){
    var getConsentData = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("CDPConsent");
    getConsentData.customVerb('getConsent', {}, completionCallBack);
    function completionCallBack(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true) {
        presentationSuccessCallback(obj.data);
      }
      else {
        presentationErrorCallback(obj.errmsg);
      }
    }
  };

  CDPConsentManager.prototype.updateConsentData = function(inputParams, presentationSuccessCallback,presentationErrorCallback){
    var createConsentRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("CDPConsent");
    createConsentRepo.customVerb("updateConsent", inputParams, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      }
      else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }

  };

  
  
    return CDPConsentManager;

});