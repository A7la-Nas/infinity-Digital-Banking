function AS_AppEvents_j58ba9e21dad43ca9d4b99f2104e25bf(eventobject) {
    var self = this;
    try {
        applicationManager.postAppInitiate();
        applicationManager.applicationMode = "Mobile";
        kony.application.setApplicationProperties({
            // "statusBarForegroundColor": "000000"
        });
        //   var registrationManager = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
        //     "moduleName": "RegistrationManager",
        //     "appName": "AuthenticationMA"
        //   }).businessController;
        //   registrationManager.setEventTracking();
    } catch (err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.App_Initialisation_Failed", GlobalExceptionHandler.ActionConstants.BLOCK, arguments.callee.name);
    }
}