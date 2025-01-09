
define({ 
//Type your controller code here 
preShow: function(){
this.setFlowActions();
},
setFlowActions: function() {
let scopeObj = this; 
  this.view.cantSignIn.navigateToLogin = scopeObj.navigateToLogin; 
  this.view.cantSignIn.activateProfile = scopeObj.activateProfile;
}, 
navigateToLogin: function(){
let scopeObj = this;
var navManager = applicationManager.getNavigationManager();
navManager.clearStack();
var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"AuthHIDUIModule","appName":"AuthenticationMA"});
//authModule.presentationController.navigateToLogin();
navManager.navigateTo({"appName":"AuthenticationMA","friendlyName" : "AuthHIDUIModule/frmLoginHID"});
}, 
activateProfile: function(){
let scopeObj = this;
var authMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
authMode.presentationController.navigateToMicroApp({"appName":"SelfServiceEnrolmentMA","friendlyName" : "EnrollHIDUIModule/frmEnrollActivateProfileHID"});
}});

