define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_AppEvents_c5cfe164db6f41ecb006a63295f8950a: function AS_AppEvents_c5cfe164db6f41ecb006a63295f8950a(eventobject) {
        var self = this;
        try {
            applicationManager.postAppInitiate();
            applicationManager.applicationMode = "Mobile";
            kony.application.setApplicationProperties({
                // "statusBarForegroundColor": "000000"
            });
            var registrationManager = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "RegistrationManager",
                "appName": "AuthenticationMA"
            }).businessController;
            registrationManager.setEventTracking();
        } catch (err) {
            throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.App_Initialisation_Failed", GlobalExceptionHandler.ActionConstants.BLOCK, arguments.callee.name);
        }
    },
    AS_AppEvents_hba89cc08eae4a7c9eafbfdd56edf7b9: function AS_AppEvents_hba89cc08eae4a7c9eafbfdd56edf7b9(eventobject) {
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
            kony.i18n.setCurrentLocaleAsync(config.configurations.getItem("LOCALE"), function() {}, function() {});
        } catch (err) {
            throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.App_Initialisation_Failed", GlobalExceptionHandler.ActionConstants.BLOCK, arguments.callee.name);
        }
    }
});