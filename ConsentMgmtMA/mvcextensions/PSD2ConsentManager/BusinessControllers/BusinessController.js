/**
*@module PSD2ConsentManager
 */

define([], function () { 
    
   /**
   *PSD2ConsentManager is the class used to handle alerts and other settings
   *@alias module:PSD2ConsentManager
   *@class
   */
  function PSD2ConsentManager() {
  }
  inheritsFrom(PSD2ConsentManager, kony.mvc.Business.Delegator);
  PSD2ConsentManager.prototype.initializeBusinessController = function(){};
  /**
 * Gets list wise accounts and the respective account alerts for the user signed-in.
 * @param {function} presentation @successCallback - will be called when call is successfull.
 * @param {function} presentation @failureCallback - will be called when call is not successfull.
 * @returns {Array} -Array of records of accounts list with account alerts to the presentation @successCallback.
 */

  
   PSD2ConsentManager.prototype.getPSD2ConsentData = function(presentationSuccessCallback,presentationErrorCallback){
    var getConsentData = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("PSD2Consent");
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

  PSD2ConsentManager.prototype.updatePSD2ConsentData = function(inputParams, presentationSuccessCallback,presentationErrorCallback){
    var createConsentRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("PSD2Consent");
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
  
  
    return PSD2ConsentManager;

});