define([], function() {
    function PresentationController() {
        kony.mvc.Presentation.BasePresenter.call(this);
    }
    inheritsFrom(PresentationController, kony.mvc.Presentation.BasePresenter);
    PresentationController.prototype.initializePresentationController = function() {
    };
    return PresentationController;
});