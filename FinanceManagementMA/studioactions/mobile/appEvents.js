define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_AppEvents_a0bd5d23186047cd9eade38d68296e73: function AS_AppEvents_a0bd5d23186047cd9eade38d68296e73(eventobject) {
        var self = this;
        //App Service
        // try {
        //   var MenuHandler =  applicationManager.getMenuHandler();
        //   return MenuHandler.appForceTouchCallBack(eventobject);
        // }
        // catch(err) {
        //   throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.App_Initialisation_Failed", GlobalExceptionHandler.ActionConstants.BLOCK, arguments.callee.name);
        // }
    },
    AS_AppEvents_cd98c159fe4c4bdc9a186e48c290b744: function AS_AppEvents_cd98c159fe4c4bdc9a186e48c290b744(eventobject) {
        var self = this;
        try {
            applicationManager.applicationMode = "Mobile";
        } catch (err) {
            alert(err);
        }
    },
    AS_AppEvents_i94079a9c9314f47927de0814fe1361e: function AS_AppEvents_i94079a9c9314f47927de0814fe1361e(eventobject) {
        var self = this;
        try {
            _kony.mvc.initCompositeApp(true);
            var ApplicationManager = require('ApplicationManager');
            applicationManager = ApplicationManager.getApplicationManager();
        } catch (err) {
            alert(err);
        }
    }
});