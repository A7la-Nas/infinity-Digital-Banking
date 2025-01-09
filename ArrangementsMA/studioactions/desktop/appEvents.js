define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_AppEvents_c7742e30e47545e19cbe54a669621d16: function AS_AppEvents_c7742e30e47545e19cbe54a669621d16(eventobject) {
        var self = this;
        _kony.mvc.initCompositeApp(true);
        var ApplicationManager = require('ApplicationManager');
        applicationManager = ApplicationManager.getApplicationManager();
        var config = applicationManager.getConfigurationManager();
        config.setStartupLocaleAndDateFormat();
        //config.setLocaleAndDateFormat();
    }
});