function AS_BarButtonItem_b38c8ac6ea2b4aee96a21fc7c4af916e(eventobject) {
    var self = this;
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    settingsMod.presentationController.commonFunctionForNavigation("frmTransfers");
}