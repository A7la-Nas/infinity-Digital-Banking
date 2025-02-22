define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_AppEvents_ge5863ed4fc84e688af2305d3dea1b12: function AS_AppEvents_ge5863ed4fc84e688af2305d3dea1b12(eventobject) {
        var self = this;
        _kony.mvc.initCompositeApp(true);
        kony.print("Testing JS Load");
        var isIOS13 = (/(iPad|iPhone);.*CPU.*OS 13_\d/i).test(navigator.userAgent);
        if (isIOS13) {
            kony.application.setApplicationBehaviors({
                disableForceRepaint: true
            });
        }
        const moduleName = 'ApplicationManager';
        require([moduleName], function(ApplicationManager) {
            applicationManager = ApplicationManager.getApplicationManager();
            var config = applicationManager.getConfigurationManager();
            if (performance.navigation.type === 1) {
                config.setBrowserRefreshProperty("true");
            }
            var langObjFromStorage = applicationManager.getStorageManager().getStoredItem("langObj");
            if (!kony.sdk.isNullOrUndefined(langObjFromStorage)) {
                config.configurations.setItem("LOCALE", config.locale[langObjFromStorage.language]);
                config.configurations.setItem('DATEFORMAT', config.frontendDateFormat[config.getLocale()]);
            } else {
                config.configurations.setItem("LOCALE", "en_US");
                config.configurations.setItem('DATEFORMAT', config.frontendDateFormat["en_US"]);
            }
            kony.i18n.setCurrentLocaleAsync(config.configurations.getItem("LOCALE"), function() {}, function() {});
            config.fetchApplicationProperties(function() {}, function() {});
            document.body.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                alert(kony.i18n.getLocalizedString("i18n.general.rightclickdisabled"));
            });
        });
    }
});