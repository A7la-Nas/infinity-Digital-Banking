function AS_AppEvents_be556ae95fa44a5c929bc715a0b03f7c(eventobject) {
    var self = this;
    try {
        var self = this;
        kony.print("Testing JS Load");
        _kony.mvc.initCompositeApp(true);
        kony.lang.setUncaughtExceptionHandler(GlobalExceptionHandler.exceptionHandler);
        var ApplicationManager = require('ApplicationManager');
        applicationManager = ApplicationManager.getApplicationManager();
        var config = applicationManager.getConfigurationManager();
        applicationManager.preappInitCalls();
        registerWatchCallback();
        //     if (performance.navigation.type === 1) {
        //         config.setBrowserRefreshProperty("true");
        //     }
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
        applicationManager.getConfigurationManager().fetchApplicationProperties(function(res) {
            if (config.isAppPropertiesLoaded === "false") {
                config.setAppProperties("true");
                kony.application.dismissLoadingScreen();
            }
            //config.fetchClientSideConfigurations();
        }, function() {
            kony.application.dismissLoadingScreen();
        });
        //     document.body.addEventListener('contextmenu', function (e) {
        //         e.preventDefault();
        //         alert(kony.i18n.getLocalizedString("i18n.general.rightclickdisabled"));
        //     });
    } catch (err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.App_Initialisation_Failed", GlobalExceptionHandler.ActionConstants.BLOCK, arguments.callee.name);
    }
}