define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_AppEvents_c1888b8224f140438a9cb59fb07a7b90: function AS_AppEvents_c1888b8224f140438a9cb59fb07a7b90(eventobject) {
        var self = this;
        kony.mvc.MDAApplication.getSharedInstance().appContext.deeplinkUrl = {
            deeplinkpath: eventobject.deeplinkpath,
            formID: eventobject.formID,
        };
    },
    AS_AppEvents_i4426b7935b749b49022ae289968a42e: function AS_AppEvents_i4426b7935b749b49022ae289968a42e(eventobject) {
        var self = this;
        _kony.mvc.initCompositeApp(true);
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
        }, function() {
            kony.application.dismissLoadingScreen();
        })
    }
});