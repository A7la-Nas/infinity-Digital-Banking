function AS_AppEvents_h75216c7ed0846a290c700a6c09aa524(eventobject) {
    var self = this;
    kony.print("Testing JS Load");
    document.body.removeAttribute("aria-live");
    document.body.removeAttribute("aria-relevant");
    document.body.removeAttribute("aria-atomic");
    _kony.mvc.initCompositeApp(true);
    var isIOS13 = (/(iPad|iPhone);.*CPU.*OS 13_\d/i).test(navigator.userAgent);
    if (isIOS13) {
        kony.application.setApplicationBehaviors({
            disableForceRepaint: true
        });
    }
    kony.application.setApplicationBehaviors({
        'rtlMirroringInWidgetPropertySetter': true,
        'fullWidgetHierarchy': true
    });
    var moduleName = 'ApplicationManager';
    require([moduleName, ], function(ApplicationManager) { applicationManager = ApplicationManager.getApplicationManager();
        applicationManager.defineSCAConfig(); 
        var config = applicationManager.getConfigurationManager(); 
        if (performance.navigation.type === 1) {   config.setBrowserRefreshProperty("true"); 
        } 
        var sm = applicationManager.getStorageManager(); 
        var langObjFromStorage = sm.getStoredItem("langObj"); 
        if (!kony.sdk.isNullOrUndefined(langObjFromStorage)) {   config.configurations.setItem("LOCALE", config.locale[langObjFromStorage.language]);   config.configurations.setItem('DATEFORMAT', config.frontendDateFormat[config.getLocale()]); 
        } else {   config.configurations.setItem("LOCALE", "ar_AE");   config.configurations.setItem('DATEFORMAT', config.frontendDateFormat["ar_AE"]);
        }
        kony.i18n.setCurrentLocaleAsync(config.configurations.getItem("LOCALE"), function() {}, function() {});
        applicationManager.getConfigurationManager().fetchApplicationProperties(function(res) {
            if (config.isAppPropertiesLoaded === "false") {
                config.setAppProperties("true");
                kony.application.dismissLoadingScreen();
            }
            // config.fetchClientSideConfigurations();
        }, function() {
            kony.application.dismissLoadingScreen();
        });
        document.body.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            alert(kony.i18n.getLocalizedString("i18n.general.rightclickdisabled"));
        });
    });
}