define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_AppEvents_h8e926f5fbaf4f8187f9cb7f44120a69: function AS_AppEvents_h8e926f5fbaf4f8187f9cb7f44120a69(eventobject) {
        var self = this;
        kony.mvc.MDAApplication.getSharedInstance().appContext.deeplinkUrl = {
            deeplinkpath: eventobject.deeplinkpath,
            formID: eventobject.formID,
        }
    },
    AS_AppEvents_ie1013a300d34c739f73aaa6b1aaecae: function AS_AppEvents_ie1013a300d34c739f73aaa6b1aaecae(eventobject) {
        var self = this;
        _kony.mvc.initCompositeApp(true);
        kony.print("Testing JS Load");
        var isIOS13 = (/(iPad|iPhone);.*CPU.*OS 13_\d/i).test(navigator.userAgent);
        if (isIOS13) {
            kony.application.setApplicationBehaviors({
                disableForceRepaint: true
            });
        }
        //require(["ConsentMgmtMA/DummyLogin/frmDummyLogin", "ConsentMgmtMA/DummyLogin/frmDummyLoginController"], function (){});
        //require(["BBAccountsModule/frmBBAccountsLanding", "BBAccountsModule/frmBBAccountsLandingController"], function (){});
        //var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
        //var ApplicationManager = require('ApplicationManager');
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
                alert(kony.i18n.getLocalizedString("i18n.general.rightclickdisabled")); // do something with fooModule
            });
        });
    }
});