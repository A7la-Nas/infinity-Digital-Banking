define({

  PFMstartup: function () {

    var self = this;
    kony.application.showLoadingScreen("", "Authenticating the user");
    var authParams = {
      "UserName": "",
      "Password": "",
      "loginOptions": {
        "isOfflineEnabled": false
      }
    };
    authClient = KNYMobileFabric.getIdentityService("DbxUserLogin");
    authClient.login(authParams, successCallback, errorCallback);
    function successCallback(resSuccess) {
      kony.application.dismissLoadingScreen();
      kony.print(resSuccess);
      var pfmModule = kony.mvc.MDAApplication.getSharedInstance().moduleManager.getModule(
        { "moduleName": "PersonalFinanceManagementUIModule", "appName": "FinanceManagementMA", });
      pfmModule.presentationController.fetchPFMDetails();
    }
    function errorCallback(resError) {
      kony.application.dismissLoadingScreen();
      kony.print(resError);
      alert("login is not working...");
    }
  }

});