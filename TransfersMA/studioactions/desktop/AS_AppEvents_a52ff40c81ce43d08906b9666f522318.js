function AS_AppEvents_a52ff40c81ce43d08906b9666f522318(eventobject) {
    var self = this;
    _kony.mvc.initCompositeApp(true);
    kony.print("Testing JS Load");
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
        applicationManager.getConfigurationManager().fetchApplicationProperties(function(res) {
            applicationManager.getNavigationManager().updateForm({
                isLanguageSelectionEnabled: res.isLanguageSelectionEnabled
            }, "frmLogin");
            if (config.isAppPropertiesLoaded === "false") {
                config.setAppProperties("true");
                kony.application.dismissLoadingScreen();
            }
            //config.fetchClientSideConfigurations();
        }, function() {
            kony.application.dismissLoadingScreen();
        });
        document.body.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            alert(kony.i18n.getLocalizedString("i18n.general.rightclickdisabled")); // do something with fooModule
        })
    });
}