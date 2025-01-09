define({
  onNavigate : function(param){
    var self = this;
    if(param === "password"){
      this.view.customHeader.lblLocateUs.text = "Change Password";
      this.view.title = "Change Password";
    }
    else if(param === "username"){
      this.view.customHeader.lblLocateUs.text = "Change Username";
      this.view.title = "Change Username";
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
    this.onNavigate("username");
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  setFlowActions : function(){
    var scopeObj = this;
    this.view.customHeader.flxBack.onClick = function(){
      var navManager = applicationManager.getNavigationManager();
      navManager.goBack();
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
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    settingsMod.presentationController.commonFunctionForNavigation("frmSettings");
  },
  navToSecurityCode : function(){
    if(this.view.customHeader.lblLocateUs.text === "Change Password"){
    }
    else{
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo('frmProfileSecurityCode','username');
        var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
	    settingsMod.presentationController.commonFunctionForNavigation("frmProfileSecurityCode");
    }
  },
  updateUserName : function(){
    var navManager = applicationManager.getNavigationManager();
    var userName = navManager.getCustomInfo('frmProfileChangeUsername');
    this.view.lblSecurityCheck.text = "Hi "+userName;
  }
});