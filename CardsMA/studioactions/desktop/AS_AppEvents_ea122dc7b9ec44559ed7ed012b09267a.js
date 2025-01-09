function AS_AppEvents_ea122dc7b9ec44559ed7ed012b09267a(eventobject) {
    var self = this;
    kony.print("Testing JS Load");
    _kony.mvc.initCompositeApp(true)
    var isIOS13 = (/(iPad|iPhone);.*CPU.*OS 13_\d/i).test(navigator.userAgent);
    if (isIOS13) {
        kony.application.setApplicationBehaviors({
            disableForceRepaint: true
        });
    }
    var moduleName = 'ApplicationManager';
    require([moduleName], function(ApplicationManager) {
        applicationManager = ApplicationManager.getApplicationManager();
        var config = applicationManager.getConfigurationManager();
        if (performance.navigation.type === 1) {
            config.setBrowserRefreshProperty("true");
        }
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
        document.body.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            alert(kony.i18n.getLocalizedString("i18n.general.rightclickdisabled"));
        });
    });
}