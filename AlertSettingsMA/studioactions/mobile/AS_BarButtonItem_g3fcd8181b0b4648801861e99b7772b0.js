function AS_BarButtonItem_g3fcd8181b0b4648801861e99b7772b0(eventobject) {
    var self = this;
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    settingsMod.presentationController.commonFunctionForNavigation("frmSettings");
}