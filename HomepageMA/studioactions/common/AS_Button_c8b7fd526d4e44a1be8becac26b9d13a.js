function AS_Button_c8b7fd526d4e44a1be8becac26b9d13a(eventobject) {
    var accountModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountsModule");
    accountModule.presentationController.showAccountsDashboard();
}