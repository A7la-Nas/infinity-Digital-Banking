function AS_BarButtonItem_c7e550fbc19c44f79d5a3738a80d569a(eventobject) {
    var self = this;
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    settingsMod.presentationController.commonFunctionForNavigation("frmTransfers");
}