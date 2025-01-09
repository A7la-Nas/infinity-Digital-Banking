define([], function () {

  function loginBusinessController(){
    this.identityServiceName = "";
  }

  loginBusinessController.prototype.login = function(identityServiceName,authParams, onLoginSuccess, onLoginFailure){
    this.identityServiceName = identityServiceName;
    let authClient = KNYMobileFabric.getIdentityService(identityServiceName);
    kony.mvc.MDAApplication.getSharedInstance().appContext.rememberMeStatus = authParams.rememberMe;
    authClient.login(authParams, onLoginSuccess, onLoginFailure);
  };

  loginBusinessController.prototype.isCSRMode = function(){
    return kony.mvc.MDAApplication.getSharedInstance().appContext.isCSR_Assist_Mode;
  };

  loginBusinessController.prototype.rememberMeStatus = function(){
    return kony.mvc.MDAApplication.getSharedInstance().appContext.rememberMeStatus;
  };

  loginBusinessController.prototype.onLoginSuccess = function(onLoginFailure){
    let self = this;
    let configurationManager = applicationManager.getConfigurationManager();
    let params = kony.sdk.getCurrentInstance().tokens[this.identityServiceName].provider_token.params;
    if(params.user_attributes){
      configurationManager.customerTypeId = params.user_attributes.customerTypeId;
      let backendIdentifiers = params.user_attributes.backendIdentifiers ? params.user_attributes.backendIdentifiers : "";
      if(backendIdentifiers.length>0){
        let jsonRes = JSON.parse(backendIdentifiers);
        if (jsonRes.T24 && jsonRes.T24[0]){
          let backendId = jsonRes.T24[0].BackendId;
          applicationManager.getUserPreferencesManager().setBackendIdentifier(backendId);
        }
      }
    }
    if(params && params.is_mfa_enabled)  {
      let mfaManager = applicationManager.getMFAManager();
      mfaManager.setServiceId("SERVICE_ID_67");
      var mfaJSON = {
        "response" : params.mfa_meta,
        "flowType" :  "LoginMFA"
      };
      mfaManager.initMFAFlow(mfaJSON);
    } else {
      if (self.isCSRMode()) {
        function onGetUserAttributesSuccess(response){
          self.callPostLoginServices(response.UserName);
        }
        function onGetUserAttributesFailure(response){
          onLoginFailure();
        }
        kony.sdk.getCurrentInstance().getIdentityService(configurationManager.constants.IDENTITYSERVICENAME).getUserAttributes(onGetUserAttributesSuccess,onGetUserAttributesFailure);
      } else {
        let userName = params.user_attributes.UserName;
        self.saveUserName(userName);
        applicationManager.getRegistrationManager().trackRegisteredDevice(function() {}, function() {}); 
        self.initializePermissions();               
        self.callPostLoginServices(userName);     
      }
    }
  };

  loginBusinessController.prototype.initializePermissions = function () {
    // Getting the security attributes from identity response.
    var providerTokenParams =  kony.sdk.getCurrentInstance()
    .tokens[applicationManager.getConfigurationManager().constants.IDENTITYSERVICENAME]
    .provider_token.params;

    var securityAttributes = providerTokenParams.security_attributes;
    var userAttributes = providerTokenParams.user_attributes;

    var configurationManager = applicationManager.getConfigurationManager();
    configurationManager.isSMEUser = "false";
    configurationManager.isRBUser = "false";
    configurationManager.isMBBUser = "false";
    configurationManager.isCombinedUser = "false";

    if(!kony.sdk.isNullOrUndefined(userAttributes.isCombinedUser)){
      configurationManager.isCombinedUser = userAttributes.isCombinedUser;
    }

    if(!kony.sdk.isNullOrUndefined(configurationManager.customerTypeId) && configurationManager.isCombinedUser !== "true"){
      switch(userAttributes.CustomerType_id){
        case "TYPE_ID_BUSINESS" : configurationManager.isSMEUser = "true";
          break;
        case "TYPE_ID_RETAIL" : configurationManager.isRBUser = "true";
          break;
      }
    }

    //Converted string to permission array
    var permissions = JSON.parse(securityAttributes.permissions);  
    var features = JSON.parse(securityAttributes.features);
    var accounts = securityAttributes.accounts;  
    applicationManager.getConfigurationManager().setUserPermissions(permissions);
    applicationManager.getConfigurationManager().setFeatures(features);
    applicationManager.getConfigurationManager().setUserRole(userAttributes.customerTypeId);
    //Converted account permissions to a optimized map.
  };

  loginBusinessController.prototype.callPostLoginServices = function(userName){
    kony.setUserID(userName);
    applicationManager.getUserPreferencesManager().isLoggedIn = true;
    this.loginPostCalls(userName);
  };

  loginBusinessController.prototype.loginPostCalls = function(userName) {
    let scopeObj = this;
    let asyncManager = applicationManager.getAsyncManager();
    let userPrefManager = applicationManager.getUserPreferencesManager();
    if (!scopeObj.isCSRMode()) {
      scopeObj.saveUserName(userName);
    }
    kony.setUserID(userName);
    userPrefManager.isLoggedIn = true;
    const configManager = applicationManager.getConfigurationManager();
    const isHomepageMAPresent = configManager.isMicroAppPresent('HomepageMA');
    if(isHomepageMAPresent){
      let accounts = kony.mvc.MDAApplication.getSharedInstance().moduleManager.getModule({ appName: "HomepageMA", moduleName: "AccountsUIModule" });
      accounts.presentationController.fetchAccounts(userName);
    }    
    if(applicationManager.getConfigurationManager().getProfileImageAvailabilityFlag()===true){
      asyncManager.callAsync(
        [
          asyncManager.asyncItem(userPrefManager, 'fetchUser'),
          asyncManager.asyncItem(applicationManager.getTermsAndConditionManager(), 'fetchTermsAndConditionsPostLogin',[{
            "languageCode": kony.i18n.getCurrentLocale().replace("_","-"),
            "termsAndConditionsCode": "Login_TnC"
          }]),
          asyncManager.asyncItem(userPrefManager, 'fetchUserImage'),
        ],
        scopeObj.onPostLoginServicesComplete.bind(scopeObj)
      );
    }else{
      asyncManager.callAsync(
        [
          asyncManager.asyncItem(userPrefManager, 'fetchUser'),
          asyncManager.asyncItem(applicationManager.getTermsAndConditionManager(), 'fetchTermsAndConditionsPostLogin',[{
            "languageCode": kony.i18n.getCurrentLocale().replace("_","-"),
            "termsAndConditionsCode": "Login_TnC"
          }]),
        ],
        scopeObj.onPostLoginServicesComplete.bind(scopeObj)
      );
    }
  };

  loginBusinessController.prototype.saveUserName = function(username) {
    var names = null;
    var storageManager = applicationManager.getStorageManager();
    if (this.rememberMeStatus()) { 
      names = JSON.parse(storageManager.getStoredItem("olbNames")) || [];
      var matchingUserNames = names.filter(function (obj) {
        return obj[username];
      });
      if (matchingUserNames.length === 0) {
        var tmpIndex = names.length;
        names[tmpIndex] = {};
        names[tmpIndex][username] = applicationManager.getDataProcessorUtility().maskUserName(username);
        storageManager.setStoredItem("olbNames", JSON.stringify(names));
      }
    } else {
      if ((names = storageManager.getStoredItem('olbNames')) !== null) { //deleteUsername
        names = JSON.parse(names);
        for (var index in names) {
          if (names[index][username] !== undefined) {
            names.splice(index, 1);
            break;
          }
        }
        storageManager.setStoredItem("olbNames", JSON.stringify(names));
      }
    }
  };

  loginBusinessController.prototype.onPostLoginServicesComplete = function (syncResponseObject) {
    var scopeObj = this;
    if (syncResponseObject.responses[0].isSuccess && syncResponseObject.responses[1].isSuccess) {
      scopeObj.getTnCOnSuccess(syncResponseObject.responses[1].data);
    } else {
      kony.application.dismissLoadingScreen();
      scopeObj.navigateToServerDownScreen();
    }
  };

  loginBusinessController.prototype.getTnCOnSuccess = function(response) {
    if(response.alreadySigned){
      this.doPostLoginWork();
    }
    else{
      applicationManager.getNavigationManager().navigateTo("frmPreTermsandCondition");
      applicationManager.getNavigationManager().updateForm({
        "TnCcontent": response
      });
    }
  };

  loginBusinessController.prototype.doPostLoginWork = function () {
    var scopeObj = this;
    scopeObj.setIdleTimeout();
    scopeObj.navigateToAccounts();
  };

  loginBusinessController.prototype.setIdleTimeout = function () {
    kony.application.registerForIdleTimeout(applicationManager.getConfigurationManager().constants.IDLE_TIMEOUT, this.onSessionExpire.bind(this));
  };

  /**
     * Method to handle session expire condition.
     */
  loginBusinessController.prototype.onSessionExpire = function () {
    this.doLogout({
      "action": "SessionExpired"
    });
  };
  /**
     * Method to navigate Accounts DashBoard when the login is Success
     */
  loginBusinessController.prototype.navigateToAccounts = function () {
    const configManager = applicationManager.getConfigurationManager();
    const isHomepageMAPresent = configManager.isMicroAppPresent('HomepageMA');
    if(isHomepageMAPresent){
      const accountModule = kony.mvc.MDAApplication.getSharedInstance().moduleManager.getModule({ appName: "HomepageMA", moduleName: "AccountsUIModule" });
      accountModule.presentationController.showAccountsDashboard({
        noRefresh: true
      });
    }
  };

  /**
     * Method to handle Server Down situation when any server Error Occurs - logout and navigate to server down screen.
     */
  loginBusinessController.prototype.navigateToServerDownScreen = function () {
    this.doLogout({
      "action": "ServerDown"
    });
  };

  /**
     * Method will call logout service and call success or failure callbacks
     * @param {Object} context - context object which specify reason for logout ex: session expire, server down, user logout action etc.
     */
  loginBusinessController.prototype.doLogout = function (context) {
    applicationManager.getAuthManager().logout(this.logoutSuccessCallback.bind(this, context), this.logoutSuccessCallback.bind(this));
  };

  /**
     * Method will handle post logout actions like unregister time out etc.
     * @param {Object} context - context object which specify reason for logout ex: session expire, server down, user logout action etc.
     */
  loginBusinessController.prototype.logoutSuccessCallback = function (context) {
    kony.application.unregisterForIdleTimeout();
    var configurationManager = applicationManager.getConfigurationManager();
    context.userName = applicationManager.getUserPreferencesManager().getCurrentUserName();
    context.isUserLoggedoutSuccessfully=true;
    context.userType = {
      isSMEUser:configurationManager.isSMEUser,
      isRBUser:configurationManager.isRBUser ,
      isMBBUser:configurationManager.isMBBUser
    };
    applicationManager.getStorageManager().setStoredItem('OLBLogoutStatus', context);
    window.location.reload(); //Refersh page to clear all data.
  };

  return loginBusinessController;

});