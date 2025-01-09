define([], function() {
    /**
     * User defined presentation controller
     * @constructor
     * @extends kony.mvc.Presentation.BasePresenter
     */
    function PresentationController_Mobile() {
        kony.mvc.Presentation.BasePresenter.call(this);
    }

    inheritsFrom(PresentationController_Mobile, kony.mvc.Presentation.BasePresenter);

    /**
     * Overridden Method of kony.mvc.Presentation.BasePresenter
     * This method gets called when presentation controller gets initialized
     * @method
     */
    PresentationController_Mobile.prototype.initializePresentationController = function() {
        
    };

    return PresentationController_Mobile;
});