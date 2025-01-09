define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_AppEvents_dccaf4b20d4948bebf8d75b3377d07a4: function AS_AppEvents_dccaf4b20d4948bebf8d75b3377d07a4(eventobject) {
        var self = this;
        kony.lang.setUncaughtExceptionHandler(GlobalExceptionHandler.exceptionHandler);
        try {
            var ApplicationManager = require('ApplicationManager');
            applicationManager = ApplicationManager.getApplicationManager();
            //applicationManager.init();
        } catch (err) {
            throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.App_Initialisation_Failed", GlobalExceptionHandler.ActionConstants.BLOCK, arguments.callee.name);
        }
    },
    AS_AppEvents_h6b78ea37f674a4ab4e6348bc34680e2: function AS_AppEvents_h6b78ea37f674a4ab4e6348bc34680e2(eventobject) {
        var self = this;
        // try {
        //   var MenuHandler =  applicationManager.getMenuHandler();
        //   return MenuHandler.appForceTouchCallBack(eventobject);
        // }
        // catch(err) {
        //   throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.App_Initialisation_Failed", GlobalExceptionHandler.ActionConstants.BLOCK, arguments.callee.name);
        // }
    }
});