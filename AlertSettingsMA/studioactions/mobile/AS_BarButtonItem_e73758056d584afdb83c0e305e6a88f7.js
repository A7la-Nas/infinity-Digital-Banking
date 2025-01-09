function AS_BarButtonItem_e73758056d584afdb83c0e305e6a88f7(eventobject) {
    var self = this;
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    settingsMod.presentationController.commonFunctionForNavigation("frmTransfers");
}