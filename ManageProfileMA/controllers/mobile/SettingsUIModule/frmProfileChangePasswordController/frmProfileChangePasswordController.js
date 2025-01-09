define({
  onNavigate : function(param){
    var self = this;
    if(param === "password"){
      this.view.customHeader.lblLocateUs.text = "CHANGE PASSWORD";
      this.view.title = "CHANGE PASSWORD";
    }
    else if(param === "username"){
      this.view.customHeader.lblLocateUs.text = "CHANGE USERNAME";
      this.view.title = "CHANGE USERNAME";
    }
  },
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  frmProfileChangePassword : function(){
    this.setFlowActions();
    this.setPreshowData();
    this.updateUserName();
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  setFlowActions : function(){
    var scopeObj = this;
    this.view.customHeader.flxBack.onClick = function(){
      scopeObj.navToSettings();
    };
    this.view.flxSecurityCode.onClick = function(){
      scopeObj.navToSecurityCode();
    };
     this.view.customHeader.btnRight.onClick = function(){
	  var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
	  settingsMod.presentationController.commonFunctionForNavigation("frmSettings");
    };
  },
  setPreshowData : function(){
    this.view.customHeader.flxBack.isVisible = true;
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
      this.view.flxChangePasswordMain.top = "56dp";
    }
    else{
      this.view.flxHeader.isVisible = false;
      this.view.flxChangePasswordMain.top = "0dp";
    }
  },
  navToSettings : function(){
    var navManager = applicationManager.getNavigationManager();
    navManager.goBack();
  },
  navToSecurityCode : function(){
    var navManager = applicationManager.getNavigationManager();
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    if(this.view.customHeader.lblLocateUs.text === "CHANGE PASSWORD" || this.view.customHeader.lblLocateUs.text === "Change Password"){
      navManager.setCustomInfo('frmProfileSecurityCode','password');
      settingsMod.presentationController.commonFunctionForNavigation("frmProfileSecurityCode");
    }
    else
      {
         navManager.setCustomInfo('frmProfileSecurityCode','username');
         settingsMod.presentationController.commonFunctionForNavigation("frmProfileSecurityCode");
      }
  },
  updateUserName : function(){
    var navManager = applicationManager.getNavigationManager();
    var userName = navManager.getCustomInfo('frmProfileChangePassword');
    this.view.lblSecurityCheck.text = "Hi! "+userName;
  }
});