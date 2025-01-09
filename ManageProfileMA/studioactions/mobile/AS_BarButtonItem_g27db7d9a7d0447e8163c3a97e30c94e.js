function AS_BarButtonItem_g27db7d9a7d0447e8163c3a97e30c94e(eventobject) {
    var self = this;
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsModule");
    settingsMod.presentationController.commonFunctionForNavigation("frmTransfers");
}