function AS_AppEvents_ef31490498364214b39daa87848fe550(eventobject) {
    var self = this;
    var ApplicationManager = require('ApplicationManager');
    applicationManager = ApplicationManager.getApplicationManager();
    applicationManager.fetchAppProperties();
    var config = applicationManager.getConfigurationManager();
    config.setStartupLocaleAndDateFormat();
    applicationManager.getDataforLogin();
}