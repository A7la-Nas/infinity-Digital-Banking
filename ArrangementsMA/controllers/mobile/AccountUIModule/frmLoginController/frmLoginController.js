define({ 

  //Type your controller code here 
  /*  onNavigate: function() {
    this.view.imgLogo.src = "infinity_digi_bank.png";
  }*/

  loadAuthModule: function() {
    return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountUIModule");
  },

  postShow: function() {
    this.setFlowActions();
      this.view.login.setUIAtFormLevelEvent = function(loginType) {
                scopeObj.changeUIBasedOnLoginType(loginType);
            };
  },

  setFlowActions: function() {
    var scope = this;
    this.view.login.onLoginSuccess = function(response) {
      scope.postLoginSuccess(response);
    };
    this.view.login.onLoginFailure = function(response) {
        scope.showLoginError(response);
      };
  },

  postLoginSuccess: function(response) {
            
            var contextData = {
                "accountID": "104752",
                "accountType": "Savings",
                "currencyCode": "USD",
                "isBusinessAccount": "false"
            }
        //    var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountUIModule");
            //       if(applicationManager.getConfigurationManager().isAccountDetailsServiceConfigured)
            //       {
            //         accountMod.presentationController.fetchAccountDetailsAndTransactions(selectedAccountId);
            //       }
            //       else 
            //       {
            //         var processedAccountsData = accountMod.presentationController.fetchAccountTransactions(selectedAccountId);
            //       }
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("frmAccountDetails", contextData);
            navManager.setCustomInfo("accountMembershipId", "100600");
            this.loadAuthModule().presentationController.commonFunctionForNavigation("AccountUIModule/frmAccountDetails");

  },

  showLoginError: function(response) {
  	let errorMessage = response.errorMessage ? response.errorMessage : response;
      this.view.login.showLoginError(errorMessage);
  }

});