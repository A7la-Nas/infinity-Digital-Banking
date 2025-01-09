function AS_AppEvents_i99cea44e1a740249562fec38f91e3a7(eventobject) {
    var self = this;
    _kony.mvc.initCompositeApp(true);
    var ApplicationManager = require('ApplicationManager');
    applicationManager = ApplicationManager.getApplicationManager();
    //require(["UserManagementMA/BusinessBanking/frmUserMgmtList", "UserManagementMA/BusinessBanking/frmUserMgmtListController"], function() {});
    var config = applicationManager.getConfigurationManager();
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
}