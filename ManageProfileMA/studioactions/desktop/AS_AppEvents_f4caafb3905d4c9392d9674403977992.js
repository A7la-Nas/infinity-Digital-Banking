function AS_AppEvents_f4caafb3905d4c9392d9674403977992(eventobject) {
    var self = this;
    _kony.mvc.initCompositeApp(true);
    alert("Testing JS Load");
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
    require(["ManageProfilesMA/SettingsNew/frmProfile", "ManageProfilesMA/SettingsNew/frmProfileController"], function() {});
    require(["ManageProfilesMA/SettingsNew/frmAddNewAddress", "ManageProfilesMA/SettingsNew/frmAddNewAddressController"], function() {});
    require(["ManageProfilesMA/SettingsNew/frmAddressSettings", "ManageProfilesMA/SettingsNew/frmAddressSettingsController"], function() {});
    require(["ManageProfilesMA/SettingsNew/frmeBankingAccess", "ManageProfilesMA/SettingsNew/frmeBankingAccessController"], function() {});
    require(["ManageProfilesMA/SettingsNew/frmEditAddress", "ManageProfilesMA/SettingsNew/frmEditAddressController"], function() {});
    require(["ManageProfilesMA/SettingsNew/frmEditPassword", "ManageProfilesMA/SettingsNew/frmEditPasswordController"], function() {});
    require(["ManageProfilesMA/SettingsNew/frmEditSecuritySettings", "ManageProfilesMA/SettingsNew/frmEditSecuritySettingsController"], function() {});
    require(["ManageProfilesMA/SettingsNew/frmProfileAddEmail", "ManageProfilesMA/SettingsNew/frmProfileAddEmailController"], function() {});
    require(["ManageProfilesMA/SettingsNew/frmProfileEditEmail", "ManageProfilesMA/SettingsNew/frmProfileEditEmailController"], function() {});
    require(["ManageProfilesMA/SettingsNew/frmProfileEmail", "ManageProfilesMA/SettingsNew/frmProfileEmailController"], function() {});
    require(["ManageProfilesMA/SettingsNew/frmProfileLanguage", "ManageProfilesMA/SettingsNew/frmProfileLanguageController"], function() {});
    require(["ManageProfilesMA/SettingsNew/frmSecuritySettings", "ManageProfilesMA/SettingsNew/frmSecuritySettingsController"], function() {});
    require(["ManageProfilesMA/SettingsNew/frmSettingsAddPhoneNumber", "ManageProfilesMA/SettingsNew/frmSettingsAddPhoneNumberController"], function() {});
    require(["ManageProfilesMA/SettingsNew/frmSettingsEditPhoneNumber", "ManageProfilesMA/SettingsNew/frmSettingsEditPhoneNumberController"], function() {});
    require(["ManageProfilesMA/SettingsNew/frmSettingsPhoneNumbers", "ManageProfilesMA/SettingsNew/frmSettingsPhoneNumbersController"], function() {});
    require(["ManageProfilesMA/SettingsNew/frmUsernameAndPassword", "ManageProfilesMA/SettingsNew/frmUsernameAndPasswordController"], function() {});
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