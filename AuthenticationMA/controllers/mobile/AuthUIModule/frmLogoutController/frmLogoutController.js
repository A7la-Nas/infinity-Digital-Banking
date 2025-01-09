define({ 

  init:function(){
    const scope = this;
    const navManager = applicationManager.getNavigationManager();
    const currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(scope, "YES", currentForm);
    this.view.onDeviceBack = this.signOutOnClick;
    this.view.btnLogIn.onClick = this.signInOnClick;
  },
  
  preshow:function(){
    if(scope_AuthPresenter.isLogoutScreen && !scope_AuthPresenter.isPasswordUpdated){
      this.view.flxSuccess.setVisibility(true);
      this.view.flxeBanking.setVisibility(false);
      this.view.flxUpdatePassword.setVisibility(false);
      this.view.flxSessionExpired.setVisibility(false);
    } else if (!scope_AuthPresenter.isLogoutScreen && !scope_AuthPresenter.isPasswordUpdated && !scope_AuthPresenter.isSessionExpired){
      this.view.flxSuccess.setVisibility(false);
      this.view.flxeBanking.setVisibility(true);
      this.view.flxUpdatePassword.setVisibility(false);
      this.view.flxSessionExpired.setVisibility(false);
    } else if(scope_AuthPresenter.isSessionExpired){
      
      this.view.flxSuccess.setVisibility(false);
      this.view.flxeBanking.setVisibility(false);
      this.view.flxUpdatePassword.setVisibility(false);
      this.view.flxSessionExpired.setVisibility(true);
    
    }else {
      this.view.flxSuccess.setVisibility(false);
      this.view.flxeBanking.setVisibility(false);
      this.view.flxUpdatePassword.setVisibility(true);
      this.view.flxSessionExpired.setVisibility(false);
    }
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },

  signInOnClick:function(){
    const authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
    authMod.presentationController.signInFromLogoutScreen();
  },
// start osama
  signOutOnClick:function(){
    var basicConfig = {
                        "alertType": constants.ALERT_TYPE_CONFIRMATION,
                        "alertTitle": "",
                        "yesLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertYes"),
                        "noLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertNo"),
                        "message": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AppExit", "Are you sure you want to exit the application?"),
                        "alertHandler": this.exitApplication
                    };
                    //applicationManager.getPresentationUtility().showAlertMessage(basicConfig, {});
                    kony.ui.Alert(basicConfig, {});
  },
  exitApplication : function(response) {
        if (response === true) {
            kony.application.exit();
        } else {
            kony.print("on click No in EXIT confirmation");
        }
    }

    //end osama
  

});