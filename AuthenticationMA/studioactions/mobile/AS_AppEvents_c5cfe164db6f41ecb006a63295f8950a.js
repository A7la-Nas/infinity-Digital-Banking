function AS_AppEvents_c5cfe164db6f41ecb006a63295f8950a(eventobject) {
    var self = this;
    try {
        applicationManager.postAppInitiate();
        applicationManager.applicationMode = "Mobile";
        kony.application.setApplicationProperties({
            // "statusBarForegroundColor": "000000"
        });
        var registrationManager = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
            "moduleName": "RegistrationManager",
            "appName": "AuthenticationMA"
        }).businessController;
        registrationManager.setEventTracking();
    } catch (err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.App_Initialisation_Failed", GlobalExceptionHandler.ActionConstants.BLOCK, arguments.callee.name);
    }
}