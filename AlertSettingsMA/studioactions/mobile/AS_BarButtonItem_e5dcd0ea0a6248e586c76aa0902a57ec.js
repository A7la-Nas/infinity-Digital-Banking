function AS_BarButtonItem_e5dcd0ea0a6248e586c76aa0902a57ec(eventobject) {
    var self = this;
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    settingsMod.presentationController.commonFunctionForNavigation("frmTransfers");
}