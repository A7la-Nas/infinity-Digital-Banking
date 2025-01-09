function AS_AppEvents_adac6893b04a41f2ade141fc8c50bfc8(eventobject) {
    var self = this;
    _kony.mvc.initCompositeApp(true);
    if (SCAType === "UNIKEN") {
        RDNAAPI = require("RDNAAPI.js");
        RDNACallback = require("RDNACallback.js");
        RDNAUtility = require("RDNAUtility.js");
        Utility = require("Utility.js");
    }
    var ApplicationManager = require('ApplicationManager');
    applicationManager = ApplicationManager.getApplicationManager();
    kony.application.setApplicationBehaviors({
        'rtlMirroringInWidgetPropertySetter': true
    });
    try {
        // require('objectSvcMeta.js');
        applicationManager.preappInitCalls();
        var sm = applicationManager.getStorageManager();
        var config = applicationManager.getConfigurationManager();
        config.configurations.setItem('CURRENCYCODE', 'USD');
        var langObjFromStorage = sm.getStoredItem("langObj");
        if (!kony.sdk.isNullOrUndefined(langObjFromStorage)) {
            config.configurations.setItem("LOCALE", config.locale[langObjFromStorage.language]);
            config.configurations.setItem('DATEFORMAT', config.frontendDateFormat[config.getLocale()]);
        } else {
            config.configurations.setItem("LOCALE", "ar_AE");
            config.configurations.setItem('DATEFORMAT', config.frontendDateFormat["ar_AE"]);
        }
        var theme = sm.getStoredItem("themeDetails")
        if (kony.sdk.isNullOrUndefined(theme)) theme = "default";
        kony.theme.setCurrentTheme(theme, function() {
            kony.print("Theme Change: Success")
        }, function() {
            kony.print("Theme Change: Failed")
        });
        kony.i18n.setCurrentLocaleAsync(config.configurations.getItem("LOCALE"), function() {}, function() {});
        config.setStartupLocaleAndDateFormat();
    } catch (err) {
        alert(err);
    }
}