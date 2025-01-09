function AS_AppEvents_c7742e30e47545e19cbe54a669621d16(eventobject) {
    var self = this;
    _kony.mvc.initCompositeApp(true);
    var ApplicationManager = require('ApplicationManager');
    applicationManager = ApplicationManager.getApplicationManager();
    var config = applicationManager.getConfigurationManager();
    config.setStartupLocaleAndDateFormat();
    //config.setLocaleAndDateFormat();
}