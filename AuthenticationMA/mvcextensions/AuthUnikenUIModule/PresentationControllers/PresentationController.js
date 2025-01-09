define(['CommonUtilities', 'OLBConstants', 'ApplicationManager'], function(CommonUtilities, OLBConstants, ApplicationManager) {
    /**
     * User defined presentation controller
     * @constructor
     * @extends kony.mvc.Presentation.BasePresenter
     */
    function PresentationController() {
        kony.mvc.Presentation.BasePresenter.call(this);
    }

    inheritsFrom(PresentationController, kony.mvc.Presentation.BasePresenter);

    /**
     * Overridden Method of kony.mvc.Presentation.BasePresenter
     * This method gets called when presentation controller gets initialized
     * @method
     */
    PresentationController.prototype.initializePresentationController = function() {
    };
    /**
     * Entry Method - to navigate form login page and update login view w.r.t context if any.
     * @param {Object} [context] - object key data map to update view
     */
    PresentationController.prototype.showLoginScreen = function (context) {
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo({"appName": "AuthenticationMA", "friendlyName" : "AuthUnikenUIModule/frmLoginUniken"});
        if (context) {
            navManager.updateForm(context);
        }
    };

    return PresentationController;
});