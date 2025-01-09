define(['CommonUtilities','OLBConstants'], function(CommonUtilities,OLBConstants) {

  function CDPConsentUIModule_PresentationController() {
    kony.mvc.Presentation.BasePresenter.call(this);
  }
  inheritsFrom(CDPConsentUIModule_PresentationController, kony.mvc.Presentation.BasePresenter);


  /**
     * Method used to fetch the consent management
     */
  CDPConsentUIModule_PresentationController.prototype.showConsentManagement = function() {

    new kony.mvc.Navigation({"appName" : "ConsentMgmtMA", "friendlyName" : "CDPConsentUIModule/frmConsentManagement"}).navigate();
    applicationManager.getNavigationManager().updateForm({
      isLoading: true
    }, "frmConsentManagement");
    applicationManager.getCDPConsentManager().getConsentData(this.showConsentManagementSuccess.bind(this), this.showConsentManagementFailure.bind(this));
  };
  /**
     * Method used to fetch the profile
     */
  CDPConsentUIModule_PresentationController.prototype.showConsentManagementSuccess = function(response) {

   
    applicationManager.getNavigationManager().updateForm({
      "consentResponse": response,
      "isLoading": false
    },"frmConsentManagement");
  };
  /**
     * Method used to fetch the profile
     */
  CDPConsentUIModule_PresentationController.prototype.showConsentManagementFailure = function(response) {

   
    applicationManager.getNavigationManager().updateForm({
      "consentError": response.errorMessage,
      "action": "get"
    }, "frmConsentManagement");
  };


  /**
     * Method used to edit consent management.
     * @param {Object} context - contains the consentBlock, consentType, consentGiven, blockNotes, consentTypeName.
     */
  CDPConsentUIModule_PresentationController.prototype.editConsentManagement = function(consentDetails) {
    var consentData = {
      "arrangementId": consentDetails.arrangementId,
      "consent": JSON.stringify({
        'consentTypes': consentDetails.consents
      }, ['consentTypes', 'consentType', 'consentGiven', 'subTypes', 'consentSubType', 'consentSubTypeGiven']).replaceAll('"', "'").replaceAll("consentSubTypeGiven", "subTypeConsentGiven")
    };
    applicationManager.getCDPConsentManager().updateConsentData(consentData, this.editConsentManagementSuccess.bind(this), this.editConsentManagementFailure.bind(this));
  };

  /**
     * Method used to fetch the 
     */
  CDPConsentUIModule_PresentationController.prototype.editConsentManagementSuccess = function(response) {
      this.showConsentManagement();
  };
  /**
     * Method used as the failure call back for the edit consent management service call.
     * @param {String} errorMessage - contains the error message for edit service.
     */
  CDPConsentUIModule_PresentationController.prototype.editConsentManagementFailure = function(response) {
    
    applicationManager.getNavigationManager().updateForm({
      "consentError": response.errorMessage,
      "action": "update"
    }, "frmConsentManagement");
  };


  return CDPConsentUIModule_PresentationController;
});