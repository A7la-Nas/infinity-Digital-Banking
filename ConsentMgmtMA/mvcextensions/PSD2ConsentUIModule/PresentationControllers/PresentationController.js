define(['CommonUtilities','OLBConstants'], function(CommonUtilities,OLBConstants) {

  function PSD2ConsentUIModule_PresentationController() {
    kony.mvc.Presentation.BasePresenter.call(this);
    this.AlertCategories = "";
  }
  inheritsFrom(PSD2ConsentUIModule_PresentationController, kony.mvc.Presentation.BasePresenter);


  /**
    * Method used to fetch the manage account access
  */
  PSD2ConsentUIModule_PresentationController.prototype.showManageAccountAccess = function() {
    
    new kony.mvc.Navigation({"appName" : "ConsentMgmtMA", "friendlyName" : "PSD2ConsentUIModule/frmManageAccountAccess"}).navigate();
    applicationManager.getNavigationManager().updateForm({
      "isLoading": true
    }, 'frmManageAccountAccess');
    applicationManager.getPSD2ConsentManager().getPSD2ConsentData(this.showManageAccountAccessSuccess.bind(this), this.showManageAccountAccessFailure.bind(this));
  };

  PSD2ConsentUIModule_PresentationController.prototype.showManageAccountAccessSuccess = function(response) {

   
    if (response.consentTypes){
      applicationManager.getNavigationManager().updateForm({
        "manageAccountAccessResponse": response.consentTypes,
        "isLoading": false
      }, 'frmManageAccountAccess');
    }else{
      applicationManager.getNavigationManager().updateForm({
        "managePSD2Error": kony.i18n.getLocalizedString("i18n.ProfileManagement.consent.psd2.noConsents"),
        "action": "get",
        "isLoading": false
      }, 'frmManageAccountAccess');
    }

  };

  PSD2ConsentUIModule_PresentationController.prototype.showManageAccountAccessFailure = function(response) {

   
    applicationManager.getNavigationManager().updateForm({
      "managePSD2Error": response.errorMessage,
      "action": "get",
      "isLoading": false
    }, 'frmManageAccountAccess');
  };

  /**
 * Method used to edit the revoke account access.
*/
  PSD2ConsentUIModule_PresentationController.prototype.updateRevokeAccountAccess = function(accountData) {
    var mfaManager = applicationManager.getMFAManager();
    mfaManager.setMFAFlowType("PSD2_TPP_CONSENT_REVOKE");


    var accountAccessData = {
      "arrangementId": accountData,
      "consent": JSON.stringify({
        'consentStatuses': [{
          'consentStatus': 'revokedByPsu'
        }]
      }).replaceAll('"', "'")
    };
    applicationManager.getPSD2ConsentManager().updatePSD2ConsentData(accountAccessData, this.updateRevokeAccountAccessSuccess.bind(this), this.updateRevokeAccountAccessFailure.bind(this));
  };

  /**
* Method used as the success call back for the edit the revoke account access service call.
*/
  PSD2ConsentUIModule_PresentationController.prototype.updateRevokeAccountAccessSuccess = function(response) {
    var mfaManager = applicationManager.getMFAManager();
    if (response && response.MFAAttributes) {
      if (response.MFAAttributes.isMFARequired === "true") {
        var mfaJSON = {
          "flowType": "PSD2_TPP_CONSENT_REVOKED",
          "response": response
        };
        applicationManager.getMFAManager().initMFAFlow(mfaJSON);
      }
    } else {
      this.showManageAccountAccess();
    }
  };
  /**
* Method used as the failure call back for the edit the revoke account access service call.
* @param {String} errorMessage - contains the error message for edit service.
*/
  PSD2ConsentUIModule_PresentationController.prototype.updateRevokeAccountAccessFailure = function(response) {

    applicationManager.getNavigationManager().updateForm({
      "managePSD2Error": response.serverErrorRes.dbpErrMsg,
      "action": "update"
    }, 'frmManageAccountAccess');
  };


  return PSD2ConsentUIModule_PresentationController;
});