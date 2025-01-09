define([], function() {
    function Enroll_BusinessController() {
        kony.mvc.Business.Controller.call(this);
    }
    inheritsFrom(Enroll_BusinessController, kony.mvc.Business.Controller);
    Enroll_BusinessController.prototype.initializeBusinessController = function() {};
    getSecurityQuestionsCommand = function(params, completionCallback) {
        return new Command("com.kony.enroll.getSecurityQuestions", params, completionCallback);
    };
    saveSecurityQuestionsCommand = function(params, completionCallback) {
        return new Command("com.kony.enroll.saveUserSecurityAnswers", params, completionCallback);
    };
    Enroll_BusinessController.prototype.execute = function(command) {
        kony.mvc.Business.Controller.prototype.execute.call(this, command);
    };
    return Enroll_BusinessController;
});