define([], function() {
    function Survey_BusinessController() {
        kony.mvc.Business.Controller.call(this);
    }
    inheritsFrom(Survey_BusinessController, kony.mvc.Business.Controller);
    Survey_BusinessController.prototype.initializeBusinessController = function() {};
    Survey_BusinessController.prototype.execute = function(command) {
        kony.mvc.Business.Controller.prototype.execute.call(this, command);
    };
    return Survey_BusinessController;
});