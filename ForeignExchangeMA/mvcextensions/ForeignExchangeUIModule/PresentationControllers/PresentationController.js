define([], function() {
    /**
     * User defined presentation controller
     * @constructor
     * @extends kony.mvc.Presentation.BasePresenter
     */
    function ForeignExchangePresentationController() {
        kony.mvc.Presentation.BasePresenter.call(this);
        this.initializePresentationController();
    }

    inheritsFrom(ForeignExchangePresentationController, kony.mvc.Presentation.BasePresenter);

    /**
     * Overridden Method of kony.mvc.Presentation.BasePresenter
     * This method gets called when presentation controller gets initialized
     * @method
     */
    ForeignExchangePresentationController.prototype.initializePresentationController = function() {
           this.foreignExchangeFormName = {"friendlyName":"frmForexDashboard","appName":"ForeignExchangeMA"};
        },

        /**
         * no service call navigation to frmForexDashboard
         */
        ForeignExchangePresentationController.prototype.noServiceNavigate = function() {
           applicationManager.getNavigationManager().navigateTo(this.foreignExchangeFormName);
       
      };


    return ForeignExchangePresentationController;
});