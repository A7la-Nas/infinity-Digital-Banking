function AS_Form_ib2c7270983345e9bd9ee39a89b71007(eventobject) {
    var config = applicationManager.getConfigurationManager();
    kony.i18n.setCurrentLocaleAsync(config.configurations.getItem("LOCALE"), function() {
        var previousForm = kony.application.getPreviousForm();
        var currentForm = kony.application.getCurrentForm();
        var OLBLogoutStatus = kony.store.getItem('OLBLogoutStatus');
        //var isUserLoggedin = kony.store.getItem('UserLoginStatus');
        if (previousForm && previousForm.id == "frmProfileManagement") applicationManager.getNavigationManager().navigateTo("frmProfileManagement");
        else if (OLBLogoutStatus && OLBLogoutStatus.isUserLoggedoutSuccessfully || (currentForm && currentForm.id == "frmLogout")) {
            if (OLBLogoutStatus) {
                // kony.store.setItem('UserLoginStatus',false);
                OLBLogoutStatus.isUserLoggedoutSuccessfully = false;
                applicationManager.getStorageManager().setStoredItem('OLBLogoutStatus', OLBLogoutStatus);
            }
            applicationManager.getNavigationManager().navigateTo("frmLogout");
        } else {
            applicationManager.getNavigationManager().navigateTo("frmLogin");
        }
    }, function() {});
}