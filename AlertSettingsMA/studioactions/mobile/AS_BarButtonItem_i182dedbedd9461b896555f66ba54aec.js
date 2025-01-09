function AS_BarButtonItem_i182dedbedd9461b896555f66ba54aec(eventobject) {
    var self = this;
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    settingsMod.presentationController.commonFunctionForNavigation("frmPreferencesPin");
}