function AS_AppEvents_dccaf4b20d4948bebf8d75b3377d07a4(eventobject) {
    var self = this;
    kony.lang.setUncaughtExceptionHandler(GlobalExceptionHandler.exceptionHandler);
    try {
        var ApplicationManager = require('ApplicationManager');
        applicationManager = ApplicationManager.getApplicationManager();
        //applicationManager.init();
    } catch (err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.App_Initialisation_Failed", GlobalExceptionHandler.ActionConstants.BLOCK, arguments.callee.name);
    }
}