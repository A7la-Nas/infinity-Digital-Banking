define(['CommonUtilities', 'OLBConstants'], function(CommonUtilities, OLBConstants) {
    
    /**
     * User defined presentation controller
     * @constructor
     * @extends kony.mvc.Presentation.BasePresenter
     */
    function P2PActivationDeactivation_PresentationController() {
        var configurationManager = applicationManager.getConfigurationManager();
        kony.mvc.Presentation.BasePresenter.call(this);
        this.sentOrRequestSortConfig = {
            'sortBy': 'nickName',
            'defaultSortBy': 'nickName',
            'order': configurationManager.OLBConstants.ASCENDING_KEY,
            'defaultOrder': configurationManager.OLBConstants.ASCENDING_KEY,
        };
        this.manageRecipientSortConfig = {
            'sortBy': 'nickName',
            'defaultSortBy': 'nickName',
            'order': configurationManager.OLBConstants.ASCENDING_KEY,
            'defaultOrder': configurationManager.OLBConstants.ASCENDING_KEY,
        };
        this.requestObj = "";
        this.addRecipientData = {};
    }

    inheritsFrom(P2PActivationDeactivation_PresentationController, kony.mvc.Presentation.BasePresenter);

    /**
     * Overridden Method of kony.mvc.Presentation.BasePresenter
     * This method gets called when presentation controller gets initialized
     * @method
     */
    P2PActivationDeactivation_PresentationController.prototype.initializePresentationController = function() {};
 
    /**
     * This method acts as the success call back for the update pay a person preferences service.
     * @param {object} preferencesObject - contains default to account for p2p , default from account for p2p.
     * @param {Object} response - contins the status for the update pay a person preferences service call. with success or failure.
     */
     
   P2PActivationDeactivation_PresentationController.prototype.fetchUser = function(preferencesObject,response) {
         applicationManager.getPresentationUtility().showLoadingScreen();
     applicationManager.getUserPreferencesManager().fetchUser(this.fetchUserSuccess.bind(this, preferencesObject, response), this.fetchUserFailure.bind(this));
    };
  
    P2PActivationDeactivation_PresentationController.prototype.fetchUserSuccess = function(requiredView, alertsError,response) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();     
     };
  
    /**
     * Method used as failure call back for fetch entitlements service call.
     */
    P2PActivationDeactivation_PresentationController.prototype.fetchUserFailure = function(errorMessage) {
       applicationManager.getPresentationUtility().dismissLoadingScreen();
        var viewProperties = {};
      viewProperties.inFormError = errmsg;
        applicationManager.getNavigationManager().updateForm(viewProperties);
        this.hideProgressBar();
    };

    /**
     * This method is used to hide ProgressBar.
     */
    P2PActivationDeactivation_PresentationController.prototype.hideProgressBar = function() {
        applicationManager.getNavigationManager().updateForm({
            "showProgressBar": false
        });
    };
    return P2PActivationDeactivation_PresentationController;
});