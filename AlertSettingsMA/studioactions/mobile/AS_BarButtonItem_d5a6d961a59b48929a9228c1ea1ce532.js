function AS_BarButtonItem_d5a6d961a59b48929a9228c1ea1ce532(eventobject) {
    var self = this;
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    settingsMod.presentationController.commonFunctionForNavigation("frmProfilePersonalDetails");
}