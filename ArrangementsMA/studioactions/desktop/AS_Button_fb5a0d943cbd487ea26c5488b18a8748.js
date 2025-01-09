function AS_Button_fb5a0d943cbd487ea26c5488b18a8748(eventobject) {
    var accountModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountsModule");
    accountModule.presentationController.showAccountsDashboard();
}