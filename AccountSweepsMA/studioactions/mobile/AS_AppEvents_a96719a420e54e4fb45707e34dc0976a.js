function AS_AppEvents_a96719a420e54e4fb45707e34dc0976a(eventobject) {
    var self = this;
    _kony.mvc.initCompositeApp(true);
    var ApplicationManager = require('ApplicationManager');
    applicationManager = ApplicationManager.getApplicationManager();
    try {
        kony.lang.setUncaughtExceptionHandler(GlobalExceptionHandler.exceptionHandler);
        applicationManager.preappInitCalls();
        registerWatchCallback();
        var config = applicationManager.getConfigurationManager();
        var sm = applicationManager.getStorageManager();
        var langObjFromStorage = sm.getStoredItem("langObj");
        if (!kony.sdk.isNullOrUndefined(langObjFromStorage)) {
            config.configurations.setItem("LOCALE", config.locale[langObjFromStorage.language]);
            config.configurations.setItem('DATEFORMAT', config.frontendDateFormat[config.getLocale()]);
        } else {
            config.configurations.setItem("LOCALE", "en_US");
            config.configurations.setItem('DATEFORMAT', config.frontendDateFormat["en_US"]);
        }
        kony.application.setApplicationBehaviors({
            'rtlMirroringInWidgetPropertySetter': true
        });
        kony.i18n.setCurrentLocaleAsync(config.configurations.getItem("LOCALE"), function() {}, function() {});
    } catch (err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.App_Initialisation_Failed", GlobalExceptionHandler.ActionConstants.BLOCK, arguments.callee.name);
    }
}