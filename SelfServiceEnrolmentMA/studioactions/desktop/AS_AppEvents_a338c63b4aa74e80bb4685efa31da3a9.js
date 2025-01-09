function AS_AppEvents_a338c63b4aa74e80bb4685efa31da3a9(eventobject) {
    var self = this;
    _kony.mvc.initCompositeApp(true);
    kony.print("Testing JS Load");
    var isIOS13 = (/(iPad|iPhone);.*CPU.*OS 13_\d/i).test(navigator.userAgent);
    if (isIOS13) {
        kony.application.setApplicationBehaviors({
            disableForceRepaint: true
        });
    }
    _kony.mvc.initCompositeApp(true);
    kony.print("Testing JS Load");
    var isIOS13 = (/(iPad|iPhone);.*CPU.*OS 13_\d/i).test(navigator.userAgent);
    if (isIOS13) {
        kony.application.setApplicationBehaviors({
            disableForceRepaint: true
        });
    }
    require(["SelfServiceEnrolmentMA/EnrollUImodule/frmEnrollNow", "SelfServiceEnrolmentMA/EnrollUImodule/frmEnrollNowController"], function() {});
    //require(["AboutUsMA/FeedbackModule/frmCustomerFeedback", "AboutUsMA/FeedbackModule/frmCustomerFeedbackController"], function() {});
    //require(["AboutUsMA/InformationContentModule/frmContactUsPrivacyTandC", "AboutUsMA/InformationContentModule/frmContactUsPrivacyTandCController"], function() {});
    //require(["AboutUsMA/InformationContentModule/frmOnlineHelp", "AboutUsMA/InformationContentModule/frmOnlineHelpController"], function() {});
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
        })
    });
}