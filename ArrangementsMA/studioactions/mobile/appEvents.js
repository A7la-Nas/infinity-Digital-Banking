define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_AppEvents_a55d5dce07bc4667b1bc956e7af7f362: function AS_AppEvents_a55d5dce07bc4667b1bc956e7af7f362(eventobject) {
        var self = this;
        var ApplicationManager = require('ApplicationManager');
        applicationManager = ApplicationManager.getApplicationManager();
        applicationManager.fetchAppProperties();
        var config = applicationManager.getConfigurationManager();
        config.setStartupLocaleAndDateFormat();
        applicationManager.getDataforLogin();
    },
    AS_AppEvents_ae054b242d2f4108af5da7aef6dd59a0: function AS_AppEvents_ae054b242d2f4108af5da7aef6dd59a0(eventobject) {
        var self = this;
    }
});