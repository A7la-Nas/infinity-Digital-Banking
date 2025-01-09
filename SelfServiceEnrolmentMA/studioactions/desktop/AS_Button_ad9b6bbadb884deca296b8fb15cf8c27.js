function AS_Button_ad9b6bbadb884deca296b8fb15cf8c27(eventobject) {
    var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "EnrollUIModule", "appName"
: "SelfServiceEnrolmentMA"})
    authModule.presentationController.showLoginScreen();
}