function AS_AppEvents_a5a4ff4f0098417d9ed93bdffd452d6b(eventobject) {
    var self = this;
    _kony.mvc.initCompositeApp(true);
    var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
    var ApplicationManager = require('ApplicationManager');
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
    })
    document.body.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        alert(kony.i18n.getLocalizedString("i18n.general.rightclickdisabled"));
    });
}