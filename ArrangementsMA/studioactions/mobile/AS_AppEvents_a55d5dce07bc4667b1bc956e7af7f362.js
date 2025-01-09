function AS_AppEvents_a55d5dce07bc4667b1bc956e7af7f362(eventobject) {
    var self = this;
    var ApplicationManager = require('ApplicationManager');
    applicationManager = ApplicationManager.getApplicationManager();
    applicationManager.fetchAppProperties();
    var config = applicationManager.getConfigurationManager();
    config.setStartupLocaleAndDateFormat();
    applicationManager.getDataforLogin();
}