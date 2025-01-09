function AS_BarButtonItem_c190f3ecf6be4cfd8301956db38dc03a(eventobject) {
    var self = this;
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    settingsMod.presentationController.commonFunctionForNavigation("frmTransfers");
}