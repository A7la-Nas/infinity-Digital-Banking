function AS_BarButtonItem_d09117e839c04ef68c0c254f7ad88e8c(eventobject) {
    var self = this;
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    settingsMod.presentationController.commonFunctionForNavigation("frmProfilePersonalDetails");
}