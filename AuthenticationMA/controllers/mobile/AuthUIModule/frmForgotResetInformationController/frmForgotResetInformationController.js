define(['CommonUtilities','OLBConstants'],function(CommonUtilities,OLBConstants){ 
  return{

    preShowResetInformation: function(){
      this.fetchAndSetUsername();
      this.resetUI();
      this.renderTitleBar();
      this.setFlowActions();
    },
     
    fetchAndSetUsername: function(){
      const navManager = applicationManager.getNavigationManager();
      let user = navManager.getCustomInfo("selectedUser");
      this.view.lblUsername.text = user.UserName;
      this.view.resetPassword.setVisibility(false);
    },

    resetUI: function(){
      const navManager = applicationManager.getNavigationManager();
      this.view.lblErrorMessageScreen1.setVisibility(false);
      this.view.lblErrorMessage.setVisibility(false);
      let user = navManager.getCustomInfo("selectedUser");
      this.view.lblUsername.text = user;
      var selectedUser = navManager.getCustomInfo("userMap");
      let status = selectedUser.get(user).Status_id;
      if(CommonUtilities.getSCAType() == 2){
      this.view.flxRegenerateActivationCode.setVisibility(true);
      }
      else{
      if (status === 'SID_CUS_ACTIVE') {
      this.view.flxResetPasswordORSignIn.setVisibility(true);
    	} else {
      this.view.flxRegenerateActivationCode.setVisibility(true);
    	}
        }
     },
	 
    setFlowActions: function(){
      const scopeObj =this;
      const navManager = applicationManager.getNavigationManager();
      this.view.customHeader.flxBack.onTouchEnd = function(){
      navManager.navigateTo("frmForgotSelectUsername");
      };
      this.view.customHeader.btnRight.onClick = function () {
        scopeObj.removeSavedData();
        if (CommonUtilities.getSCAType() == 2) {
          new kony.mvc.Navigation({
            "appName": "AuthenticationMA",
            "friendlyName": "AuthUnikenUIModule/frmLoginUniken"
          }).navigate();
        }
        else
        navManager.navigateTo("frmLogin");
      };
      scopeObj.view.flxResetMyPassword.onTouchEnd = function(){
      scopeObj.view.resetPassword.setVisibility(true);
      let user = navManager.getCustomInfo("selectedUser");
      let serviceKey = navManager.getCustomInfo("serviceKey");
      scopeObj.view.resetPassword.navigateToMFA(user, serviceKey);
      };
      this.view.flxSignInNow.onTouchEnd = function(){
      scopeObj.signInNow();
      };
      this.view.flxRegenerateActivationOption.onTouchEnd = function(){
      scopeObj.regenerateActivationCode();
      };
    },

    removeSavedData: function(){
      // Removing stored data incase user clicks on cancel
      const navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("frmForgot", undefined);
    },

    cancelResetPassword: function(){
      this.view.resetPassword.setVisibility(false);
      this.view.resetPassword.resetUI();
    },

    resetPasswordSuccessCallback: function(response){
      const navManager = applicationManager.getNavigationManager();
      navManager.navigateTo("frmLogin");
    },

    resetPasswordFailureCallback: function(response){
      // TODO : add failure funtionality
    },

    signInNow: function(){
      const navManager = applicationManager.getNavigationManager();
      var data=navManager.getCustomInfo("frmLogin");
      data["usernameFromForgotUsername"]=this.view.lblUsername.text;
      navManager.setCustomInfo("frmLogin",data);
      navManager.navigateTo("frmLogin");
    },
    signInNowSuccess: function(){
      this.removeSavedData();
      // TODO
    },
    signInNowFailure: function(){
      // TODO
      this.view.lblErrorMessageScreen1.text = "Sign In Failed!";
      this.view.lblErrorMessageScreen1.setVisibility(true);
    },

    regenerateActivationCode: function(){
      // TODO: Call to Regenerate Activation Code
      applicationManager.getPresentationUtility().showLoadingScreen();
      const navManager = applicationManager.getNavigationManager();
      let user = navManager.getCustomInfo("selectedUser");
      var selectedUser = navManager.getCustomInfo("userMap");
      const serviceKey = navManager.getCustomInfo("serviceKey");
      let id = selectedUser.get(user).id;
      var params = {
        "serviceKey": serviceKey,
      };
      if(CommonUtilities.getSCAType() == 2 )
      params.id = user;
      else 
      params.id = id;
      const authMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"AuthUIModule","appName":"AuthenticationMA"});
      authMode.presentationController.regenerateActivationCode(params);
    },    
    regenerateActivationSuccess: function(){
      applicationManager.getPresentationUtility().dismissLoadingScreen();  
      this.removeSavedData();
      this.view.ActivationCodeSuccess.setVisibility(true); // Enable Component
      // TODO
    },
    regenerateActivationFailure: function(){
      this.view.lblErrorMessage.setVisibility(true);
      // TODO
    },

    closeComponentAndActivateAccount: function(){
      // Method linked to closeComponent() Event of ActivationCodeSuccess Component
      if(CommonUtilities.getSCAType() == 2){
        let scopeObj = this;
        var authMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
        authMode.presentationController.navigateToMicroApp({
        "appName": "SelfServiceEnrolmentMA",
        "friendlyName": "EnrollUnikenUIModule/frmEnrollActivateProfileUniken"
      });
      }
      else{
      this.view.ActivationCodeSuccess.setVisibility(false);
      const navManager = applicationManager.getNavigationManager();
      navManager.navigateTo("frmLogin");
      }
    },
    renderTitleBar :function(){
      var deviceUtilManager = applicationManager.getDeviceUtilManager();
      var isIphone = deviceUtilManager.isIPhone();
      if(!isIphone){
      this.view.flxHeader.isVisible = true;
      }
      else{
      this.view.flxHeader.isVisible = false;
      }
    },
  };
});