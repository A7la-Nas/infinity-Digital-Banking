function AS_AppEvents_j3e79bb8eafa4f7eaf90641b9385215f(eventobject) {
    var self = this;
    _kony.mvc.initCompositeApp(true);
    var ApplicationManager = require('ApplicationManager');
    applicationManager = ApplicationManager.getApplicationManager();
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
    applicationManager.getConfigurationManager().fetchApplicationProperties(function(res) {
        if (config.isAppPropertiesLoaded === "false") {
            config.setAppProperties("true");
            kony.application.dismissLoadingScreen();
        }
    }, function() {
        kony.application.dismissLoadingScreen();
    })
}