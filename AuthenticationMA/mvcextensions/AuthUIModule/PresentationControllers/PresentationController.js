/**
 * Auth presenation contoller to handle all Auth related functionalities like communicate between bussiness layer and view layer
 * @module AuthPresentationController
 */
define(['CommonUtilities', 'OLBConstants', 'ApplicationManager'], function (CommonUtilities, OLBConstants, ApplicationManager) {
    /**
     * Auth Presenation to handle all auth related functionalities. intialize members.
     * @class
     * @alias module:Auth_PresentationController
     */
    function AuthPresentationController() {
		scope_AuthPresenter = this;
        kony.mvc.Presentation.BasePresenter.call(this);
        this.initializePresentationController();
    }
    inheritsFrom(AuthPresentationController, kony.mvc.Presentation.BasePresenter);
    /**
     * Method to intialize Auth presentation scope data.
     */
    AuthPresentationController.prototype.initializePresentationController = function () {
      this.loginFormName = "frmLogin";
      this.isDefaultEntityCheckBoxEnabed = false;
    };

    AuthPresentationController.prototype.onLaunchModule = function(context) {
      var appModule = require("AppModule");
      context.isOriginationFlow = true;
      appModule.launchForm("AuthenticationMA", "frmLogin", context, this);
    };

    AuthPresentationController.prototype.onSubmoduleExit = function (subModuleOutContext) {
      var BaseModule = require("DBXBaseModule"); 
      BaseModule.prototype.exit( subModuleOutContext, this);
    };

    AuthPresentationController.prototype.onError= function(context) {
      this.throwError("Error reaching API");
    };
    /**
     * Entry Method - to navigate form login page and update login view w.r.t context if any.
     * @param {Object} [context] - object key data map to update view
     */
    AuthPresentationController.prototype.showLoginScreen = function (context) {
        var navManager = applicationManager.getNavigationManager();
        if (CommonUtilities.getSCAType() == 2) {
            navManager.navigateTo({ "appName": "AuthenticationMA", "friendlyName": "AuthUnikenUIModule/frmLoginUniken" });
        }
        else {
            navManager.navigateTo({ "appName": "AuthenticationMA", "friendlyName": "AuthUIModule/" + this.loginFormName });
        }
        if (context) {
            navManager.updateForm(context);
        }
    };
    AuthPresentationController.prototype.onLoginMFA = function (serviceKey) {
        applicationManager.getAuthManager().loginMFA(serviceKey, this.onLoginSuccessMFA.bind(this), this.onLoginFailureMFA.bind(this));
    };
    AuthPresentationController.prototype.onLoginSuccessMFA = function () {
        var scopeObj = this;
        var configManager = applicationManager.getConfigurationManager();
        var userName = kony.sdk.getCurrentInstance().tokens[configManager.constants.IDENTITYSERVICENAME].provider_token.params.user_attributes.UserName;
        if (!scopeObj.authParams) {
            scopeObj.authParams = {};
            scopeObj.authParams.username = kony.sdk.getCurrentInstance().tokens[OLBConstants.IDENTITYSERVICENAME].provider_token.params.user_attributes.UserName;
            scopeObj.authParams.rememberMe = kony.mvc.MDAApplication.getSharedInstance().appContext.rememberMeStatus;
        }
        kony.setUserID(userName);
        userName = scopeObj.authParams.username;
        scopeObj.saveUserName(scopeObj.authParams);
        var params = {
            "deviceId": kony.os.deviceInfo().deviceid,
        };
        if (kony.mvc.MDAApplication.getSharedInstance().appContext.registerStatus) {
            applicationManager.getRegistrationManager().updateDeviceRegistrationStatus(params, this.onDeviceRegistrationSuccess.bind(this), this.onDeviceRegistrationFailure.bind(this));
        } else {
            applicationManager.getRegistrationManager().trackRegisteredDevice(function () { }, function () { });
        }
        this.initializePermissions();
        this.loginPostCalls(userName);
    };
    AuthPresentationController.prototype.onLoginFailureMFA = function (response) {
        this.onLoginMFAFailure(response);
    };
    AuthPresentationController.prototype.onDeviceRegistrationSuccess = function () {
        kony.mvc.MDAApplication.getSharedInstance().appContext.DeviceregisterStatusFailed = false;
    };
    AuthPresentationController.prototype.onDeviceRegistrationFailure = function () {
        kony.mvc.MDAApplication.getSharedInstance().appContext.DeviceregisterStatusFailed = true;
    };
    /**
     * Method to call login service in Auth Manager and call resecpted success or failure callback methods in Presenation controller.
     * Executed when the user clicks on Login button after entering the details. If the user logs in from a new browser, an MFA flow starts.
     * @param {Object} authParams - login required parameters which contains userName,Password,rememberMe Status
     * @param {string} [authParams.username] User name, is optonal if sessiontoken present
     * @param {string} [authParams.password] password, is optonal if sessiontoken present
     * @param {boolean} [authParams.rememberMe] remember me flag whether to store username in local , is optonal if sessiontoken present
     * @param {boolean} [authParams.sessiontoken] Session token in CSR Mode , it is optonal if login with credentials
     * @param {function} [onLoginFail] Optional Login failure callback method
     */
    AuthPresentationController.prototype.onLogin = function (authParams, onLoginFail) {
        var scopeObj = this;
        var authInputs;
        kony.mvc.MDAApplication.getSharedInstance().appContext.rememberMeStatus = authParams.rememberMe;
        applicationManager.getNavigationManager().updateForm({
            "showProgressBar": true
        });
        if (CommonUtilities.isCSRMode() && !CommonUtilities.isSSOEnabled()) {
            authInputs = {
                "session_token": authParams.sessiontoken
            };
            applicationManager.getAuthManager().CSRLogin(authInputs, scopeObj.onLoginSuccess.bind(scopeObj, authParams), scopeObj.onLoginFailure.bind(scopeObj));
        } 
        else if(CommonUtilities.isCSRMode() && CommonUtilities.isSSOEnabled()){
           authInputs = {
                "loginOptions": authParams.loginOptions
            };
           applicationManager.getAuthManager().CSRLogin(authInputs, scopeObj.onLoginSuccess.bind(scopeObj, authParams), scopeObj.onLoginFailure.bind(scopeObj));  
        }
         else {
            scopeObj.authParams = authParams; //cache for saving user names
            authInputs = {
                "username": authParams.username,
                "password": authParams.password
            };
            applicationManager.getAuthManager().login(authInputs, scopeObj.onLoginSuccess.bind(scopeObj, authParams), onLoginFail || scopeObj.onLoginFailure.bind(scopeObj));
        }
    };
    AuthPresentationController.prototype.saveExternalBankCredentials = function (username, password, SessionToken, mainUser, bankId) {
        applicationManager.getAuthManager().addExternalBankCredentials(username, password, SessionToken, mainUser, bankId, this.saveExternalBankCredentialsSuccess.bind(this), this.saveExternalBankCredentialsFailure.bind(this));
    };
    AuthPresentationController.prototype.saveExternalBankCredentialsSuccess = function (response) {
        var frmName;
        var configurationManager = applicationManager.getConfigurationManager();
        if (configurationManager.isSMEUser === "true")
            frmName = "frmDashboard";
        else if (configurationManager.isCombinedUser === "true")
            frmName = "frmDashboard";
        else
            frmName = "frmDashboard";
        applicationManager.getNavigationManager().updateForm({
            "saveExternalBankCredentialsSuccess": response
        }, frmName);
    };
    AuthPresentationController.prototype.saveExternalBankCredentialsFailure = function (response) {
        var frmName;
        var configurationManager = applicationManager.getConfigurationManager();
        if (configurationManager.isSMEUser === "true")
            frmName = "frmBBAccountsLanding";
        else if (configurationManager.isCombinedUser === "true")
            frmName = "frmDashboard";
        else
            frmName = "frmAccountsLanding";
        applicationManager.getNavigationManager().updateForm({
            "saveExternalBankCredentialsFailure": response
        }, frmName);
    };
    /**
     * Method will handle once user login successfull.
     * Here we will save username in local storage and will call post login services like user profile, entitlement etc.
     * @param {Object}  authParams  - login required parameters which contains userName,Password,rememberMe Status
     * @param {string} [authParams.username] User name, is optonal if sessiontoken present
     * @param {string} [authParams.password] password, is optonal if sessiontoken present
     * @param {boolean} [authParams.rememberMe] remember me flag whether to store username in local , is optonal if sessiontoken present
     * @param {Object} response login success response object
     */
    AuthPresentationController.prototype.onLoginSuccess = function (authParams, response) {
        var scopeObj = this;
        scopeObj.userId = kony.sdk.getCurrentInstance().tokens[OLBConstants.IDENTITYSERVICENAME].profile.userid;
        scopeObj.authParams = scopeObj.authParams ? scopeObj.authParams : authParams; //cache for saving user names
        var mfaManager = applicationManager.getMFAManager();
        var userName;
        var configurationManager = applicationManager.getConfigurationManager();
        if (kony.sdk.getCurrentInstance().tokens[OLBConstants.IDENTITYSERVICENAME].provider_token.params.user_attributes) {
            var user_attributes = kony.sdk.getCurrentInstance().tokens[OLBConstants.IDENTITYSERVICENAME].provider_token.params.user_attributes;
            configurationManager.customerTypeId = user_attributes.customerTypeId;
            configurationManager.sbaEnrolmentStatus = user_attributes.sbaEnrolmentStatus || "";
            var backendIdentifiers = user_attributes.backendIdentifiers ? user_attributes.backendIdentifiers : "";
            if (backendIdentifiers.length > 0) {
                var jsonRes = JSON.parse(backendIdentifiers);
                if (jsonRes.T24 && jsonRes.T24[0]) {
                    var backendId = jsonRes.T24[0].BackendId;
                    applicationManager.getUserPreferencesManager().setBackendIdentifier(backendId);
                }
                else if (jsonRes.CORE && jsonRes.CORE[0]) {
                    var backendId = jsonRes.CORE[0].BackendId;
                    applicationManager.getUserPreferencesManager().setBackendIdentifier(backendId);
                }
            }
        }


        // if(kony.sdk.getCurrentInstance().tokens[OLBConstants.IDENTITYSERVICENAME].provider_token.params && kony.sdk.getCurrentInstance().tokens[OLBConstants.IDENTITYSERVICENAME].provider_token.params.is_mfa_enabled)  {
        //       mfaManager.setServiceId("SERVICE_ID_67");
        //   var mfaJSON={
        //     "response":kony.sdk.getCurrentInstance().tokens[OLBConstants.IDENTITYSERVICENAME].provider_token.params.mfa_meta,
        //     "flowType" :  "LoginMFA"
        //   };
        //   mfaManager.initMFAFlow(mfaJSON);
        // } else {
        this.initializePermissions();
        var navManager = applicationManager.getNavigationManager();
        var clientIp = navManager.getCustomInfo('CLIENT_IP');
        let instance = kony.sdk.getCurrentInstance();
        if (CommonUtilities.isCSRMode()) {
            function onGetUserAttributesSuccess(response) {
                instance.setGlobalRequestParam("CLIENT_IP", clientIp, instance.globalRequestParamType.headers);
                scopeObj.callPostLoginServices(response.UserName, authParams, response);
            }
            function onGetUserAttributesFailure(response) {
                scopeObj.onLoginFailure(response);
            }
            var configManager = applicationManager.getConfigurationManager();
            kony.sdk.getCurrentInstance().getIdentityService(configManager.constants.IDENTITYSERVICENAME).getUserAttributes(onGetUserAttributesSuccess, onGetUserAttributesFailure);
        } else {
            instance.setGlobalRequestParam("CLIENT_IP", clientIp, instance.globalRequestParamType.headers);
            userName = scopeObj.authParams.username;
            scopeObj.saveUserName(scopeObj.authParams);
            applicationManager.getRegistrationManager().trackRegisteredDevice(function () { }, function () { });
            this.callPostLoginServices(userName, authParams, response);
        }
        // }
        //kony.store.setItem('UserLoginStatus',true);
          
        //Setting idleTimeout and alertIdleTimeout  based on client properties configuration;
        //If client properies does not have it, we take the values from ConfigurationManager.

        if (!isNaN(OLBConstants.CLIENT_PROPERTIES.IDLE_TIMEOUT)){
            configurationManager.constants.IDLE_TIMEOUT = Number(OLBConstants.CLIENT_PROPERTIES.IDLE_TIMEOUT);
        } else {
            if (!configurationManager.constants.IDLE_TIMEOUT ) {
                configurationManager.constants.IDLE_TIMEOUT = 5;
            }
        } 


        if (!isNaN(OLBConstants.CLIENT_PROPERTIES.ALERT_IDLE_TIMEOUT)) {
            configurationManager.constants.ALERT_IDLE_TIMEOUT = Number(OLBConstants.CLIENT_PROPERTIES.ALERT_IDLE_TIMEOUT);
        } else {
            if (!configurationManager.constants.ALERT_IDLE_TIMEOUT ) {
                configurationManager.constants.ALERT_IDLE_TIMEOUT = 4;
            } 
        }

        if (configurationManager.constants.ALERT_IDLE_TIMEOUT >= configurationManager.constants.IDLE_TIMEOUT) {
            configurationManager.constants.ALERT_IDLE_TIMEOUT = 0;
        }

    };




    AuthPresentationController.prototype.initializePermissions = function () {
      this.getUserandSecurityAttributes(function(params) {
        if(params !==undefined && params !== null){
          var userAttributes = params.userAttributes;
          var  securityAttributes = params.securityAttributes;
          var configurationManager = applicationManager.getConfigurationManager();
          configurationManager.isSMEUser = "false";
          configurationManager.isRBUser = "false";
          configurationManager.isMBBUser = "false";
          configurationManager.isCombinedUser = "false";

          if (!kony.sdk.isNullOrUndefined(userAttributes.isCombinedUser)) {
            configurationManager.isCombinedUser = userAttributes.isCombinedUser;
          }

          if (!kony.sdk.isNullOrUndefined(configurationManager.customerTypeId) && configurationManager.isCombinedUser !== "true") {
            switch (userAttributes.CustomerType_id) {
              case "TYPE_ID_BUSINESS": configurationManager.isSMEUser = "true";
                break;
              case "TYPE_ID_RETAIL": configurationManager.isRBUser = "true";
                break;
            }
          }
          applicationManager.getConfigurationManager().setUserRole(userAttributes.customerTypeId);
          //Converted account permissions to a optimized map.
        }
      });
    };
    
    AuthPresentationController.prototype.getUserandSecurityAttributes = function(Callback) {
        // Getting the user and security attributes from identity response.
        var userAttributes, securityAttributes;
        var param = {};
        var authClient = KNYMobileFabric.getIdentityService(applicationManager.getConfigurationManager().constants.IDENTITYSERVICENAME);

      authClient.getSecurityAttributes(function(data) {
        securityAttributes = data;
        param.securityAttributes = securityAttributes;
      }, function(err) {
        kony.print("Error getting User attributes");
      });

      this.getUserAttributes(Callback,param);
    };

  AuthPresentationController.prototype.getUserAttributes = function(callback, param) {
   const authManger = applicationManager.getAuthManager();
   let userattributes = authManger.getUserAttributes(this.userAttributesSuccessCallback.bind(this,callback,param), this.userAttributesErrorCallback);
  };
AuthPresentationController.prototype.userAttributesSuccessCallback = function(callback,param,res) {
    param.userAttributes=res;
    callback(param);
  }; 

  AuthPresentationController.prototype.userAttributesErrorCallback = function(error) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    kony.print("userAttributesErrorCallback");
  };

    AuthPresentationController.prototype.callPostLoginServices = function (userName, authParams, response) {
        var userPrefManager = applicationManager.getUserPreferencesManager();
        kony.setUserID(userName);
        userPrefManager.isLoggedIn = true;
        this.loginPostCalls(userName, authParams, response);
    };

    AuthPresentationController.prototype.callPostLoginServices = function(userName, authParams, response) {
        var userPrefManager = applicationManager.getUserPreferencesManager();
        kony.setUserID(userName);
        userPrefManager.isLoggedIn = true;
        this.loginPostCalls(userName, authParams, response);
    };
   AuthPresentationController.prototype.callPostLoginServices = function(userName, authParams, response) {
        var userPrefManager = applicationManager.getUserPreferencesManager();
        kony.setUserID(userName);
        userPrefManager.isLoggedIn = true;
        this.loginPostCalls(userName, authParams, response);
    };
    AuthPresentationController.prototype.callPostLoginServices = function(userName, authParams, response) {
        var userPrefManager = applicationManager.getUserPreferencesManager();
        kony.setUserID(userName);
        userPrefManager.isLoggedIn = true;
        this.loginPostCalls(userName, authParams, response);
    };
    AuthPresentationController.prototype.loginPostCalls = function(userName, authParams, response) {
        var scopeObj = this;
        if (!CommonUtilities.isCSRMode()) {
            userName = scopeObj.authParams.username;
            scopeObj.saveUserName(scopeObj.authParams);
        }
        kony.setUserID(userName);
        if (applicationManager.getConfigurationManager().configurations.getItem("isSingleEntity") === 'false') {
            var defaultLegalEntity = "";
            var userAttributes = kony.sdk.getCurrentInstance().tokens[applicationManager.getConfigurationManager().constants.IDENTITYSERVICENAME].provider_token.params.user_attributes
            if (userAttributes != "" && !kony.sdk.isNullOrUndefined(userAttributes)) {
                defaultLegalEntity = kony.sdk.getCurrentInstance().tokens[applicationManager.getConfigurationManager().constants.IDENTITYSERVICENAME].provider_token.params.user_attributes.defaultLegalEntity;
            }
            if (defaultLegalEntity!= "" && !kony.sdk.isNullOrUndefined(defaultLegalEntity)) { 
                this.callGetPostLoginWithEntity(defaultLegalEntity);
                var multiEntityManager = applicationManager.getMultiEntityManager(); 
                multiEntityManager.getUserLegalEntities(function() {}, function() {});
            } else {
                this.getEntity();
            }
        } else {
            this.postLoginServices();
        }
    };
    AuthPresentationController.prototype.getEntity = function() {
        var scopeObj = this;
        var authManager = applicationManager.getMultiEntityManager(); //applicationManager.getAuthManager();
        authManager.getUserLegalEntities(scopeObj.getEntitySC.bind(this), scopeObj.getEntityEC.bind(this));
    };
    AuthPresentationController.prototype.getEntitySC = function(response) {
        response["customerlegalentity"] = response["customerlegalentity"] ? response["customerlegalentity"] : applicationManager.getMultiEntityManager().getUserLegalEntitiesListArr();
        if (response["customerlegalentity"].length > 1) {
            applicationManager.getNavigationManager().updateForm({
                "entities": response
            });
        } else {
            if(response["customerlegalentity"].length == 1){
                this.isDefaultEntityCheckBoxEnabed = true;
                this.callGetPostLoginWithEntity(response["customerlegalentity"][0]["id"]);
                this.entityId = response["customerlegalentity"][0]["id"];
            }else{ 
                var defaultLegalEntity = kony.sdk.getCurrentInstance().tokens[applicationManager.getConfigurationManager().constants.IDENTITYSERVICENAME].provider_token.params.user_attributes.defaultLegalEntity;
                var homeLegalEntity = kony.sdk.getCurrentInstance().tokens[applicationManager.getConfigurationManager().constants.IDENTITYSERVICENAME].provider_token.params.user_attributes.homeLegalEntity;
                let entity = defaultLegalEntity ? defaultLegalEntity : homeLegalEntity;
                this.callGetPostLoginWithEntity(entity);
                this.entityId = entity;
            }
            
        }
    };
    AuthPresentationController.prototype.getEntityEC = function(error) {};
    AuthPresentationController.prototype.callGetPostLoginWithEntity = function(entityId) {
        var scopeObj = this;
        this.entityId = entityId;
        var config = applicationManager.getConfigurationManager();
        config.getDisputeConfigurationsCB({},()=>{
      	var lastLoginTime = "";
        var tncRefreshPeriod = applicationManager.getConfigurationManager().getConfigurationValue('tncRefreshPeriod');
        var lastModifiedTSforTNC = applicationManager.getConfigurationManager().getConfigurationValue('lastModifiedTSforTNC');
      	if(kony.sdk.getCurrentInstance().tokens[OLBConstants.IDENTITYSERVICENAME].provider_token.params.user_attributes){
          var user_attributes = kony.sdk.getCurrentInstance().tokens[OLBConstants.IDENTITYSERVICENAME].provider_token.params.user_attributes;
          lastLoginTime = user_attributes.hasOwnProperty("Lastlogintime") ?user_attributes.Lastlogintime : "";
        }
        applicationManager.getTermsAndConditionManager().fetchTermsAndConditionsPostLogin({
            "languageCode": "en-US",
            "termsAndConditionsCode": "Login_TnC",
            "legalEntityId": entityId,
          	"lastLoginTime": lastLoginTime.slice(0,10),
          	"tNCRefreshPeriod": tncRefreshPeriod,
          	"lastModifiedTSforTNCRefresh": lastModifiedTSforTNC.slice(0,10)
        }, scopeObj.callGetPostLoginWithEntitySC.bind(this), scopeObj.callGetPostLoginWithEntitySC.bind(this));
        // this.callGetPostLoginWithEntitySC(response)({
        //     "tnc": true
        // });
        },null);
    };
    AuthPresentationController.prototype.callGetPostLoginWithEntitySC = function(response) {
        if (response.hasOwnProperty("alreadySigned") && response["alreadySigned"] == "true") {
            this.callDefaultAndCurrentEntityService();
        } else {
            applicationManager.getNavigationManager().updateForm({
                "entityTNC": response
            });
        }
    };
    AuthPresentationController.prototype.callGetPostLoginWithEntityEC = function(error) {};
    AuthPresentationController.prototype.acceptEntityTNC = function(request) {
        let scope = this;
        applicationManager.getPresentationUtility().showLoadingScreen();
        applicationManager.getTermsAndConditionManager().createTermsAndConditionsLogin({
                "legalEntityId": request,
                "termsAndConditionsCode": OLBConstants.TNC_FLOW_TYPES.Login_TnC,
                "languageCode": kony.i18n.getCurrentLocale().replace("_", "-")
            },
            scope.acceptEntityTNCSC.bind(this),scope.acceptEntityTNCEC.bind(this));
    };
    AuthPresentationController.prototype.acceptEntityTNCSC = function(consent) {
        this.callDefaultAndCurrentEntityService();
    };
    AuthPresentationController.prototype.acceptEntityTNCEC = function(consent) {
        this.doLogout("");
    };
    AuthPresentationController.prototype.callDefaultAndCurrentEntityService = function() {
        if (this.isDefaultEntityCheckBoxEnabed) {
            this.updateDefaultEntity(this.entityId);
        }
        this.updateCurrentEntityInCache({
            "id": this.entityId
        });
    };
    AuthPresentationController.prototype.updateDefaultEntity = function(selectedLegalEntityId) {
        var scopeObj = this;
        var userId = scopeObj.userId;
        var defaultLegalEntity = selectedLegalEntityId;
        var params = {
            "defaultLegalEntity": defaultLegalEntity,
            "userId": userId
        };
        applicationManager.getMultiEntityManager().updateDefaultEntity(params, this.updateDefaultEntitySuccess.bind(this, selectedLegalEntityId), this.updateDefaultEntityFailure.bind(this));
    };
    AuthPresentationController.prototype.updateDefaultEntitySuccess = function(selectedLegalEntityId, response) {
        applicationManager.getUserPreferencesManager().saveDefaultLegalEntity(selectedLegalEntityId);
    };
    AuthPresentationController.prototype.updateDefaultEntityFailure = function(response) {
        this.doLogout("");
    };
    AuthPresentationController.prototype.updateCurrentEntityInCache = function(request, callback) {
        let scope = this;
        applicationManager.getPresentationUtility().showLoadingScreen();
        let asyncManager = applicationManager.getAsyncManager();
        asyncManager.callAsync([
            asyncManager.asyncItem(applicationManager.getMultiEntityManager(), 'updateCurrentEntityInCache', [{
                "currentLegalEntityId": request.id
            }])
        ], scope.onCompletionOfupdateCurrentEntityInCache.bind(this, request, callback));
    };
    AuthPresentationController.prototype.onCompletionOfupdateCurrentEntityInCache = function(request, callback, syncResponseObject) {
        let scope = this;
        if (syncResponseObject.responses[0].isSuccess) {
            applicationManager.getUserPreferencesManager().saveCurrentLegalEntity(request.id);
            applicationManager.getStorageManager().setStoredItem('updateInternalAccounts', false);
            if (callback && typeof(callback) === 'function') {
                callback();
            }
            scope.renderDashBoardScreen();
        } else {
            if (callback && typeof(callback) === 'function') {
                callback();
            }
            applicationManager.getPresentationUtility().dismissLoadingScreen();
        }
    };
    AuthPresentationController.prototype.renderDashBoardScreen = function() {
        let scope = this;
        applicationManager.getPresentationUtility().showLoadingScreen();
        let userPrefManager = applicationManager.getUserPreferencesManager();
        let asyncManager = applicationManager.getAsyncManager();
        asyncManager.callAsync([
            asyncManager.asyncItem(userPrefManager, 'fetchUser'),
            asyncManager.asyncItem(userPrefManager, 'fetchUserImage'),
            asyncManager.asyncItem(userPrefManager, 'getUserFeaturesAndPermissions')
        ], scope.doPostLoginWork.bind(this));
        const authManager = applicationManager.getAuthManager();
        authManager.getServerTimezoneOffset({});
    };
    AuthPresentationController.prototype.postLoginServices = function() {
        var self = this;
        var asyncManager = applicationManager.getAsyncManager();
        var scopeObj = self;
        var userPrefManager = applicationManager.getUserPreferencesManager();
        userPrefManager.isLoggedIn = true;
        const configManager = applicationManager.getConfigurationManager();
        const authManager = applicationManager.getAuthManager();
        const isHomepageMAPresent = configManager.isMicroAppPresent('HomepageMA');
        if (isHomepageMAPresent) {
            //let accounts = kony.mvc.MDAApplication.getSharedInstance().moduleManager.getModule({ appName: "HomepageMA", moduleName: "AccountsUIModule" });
            //accounts.presentationController.fetchAccounts(userName);
        }
        if (applicationManager.getConfigurationManager().getProfileImageAvailabilityFlag() === true) {
            asyncManager.callAsync(
                [
                    asyncManager.asyncItem(userPrefManager, 'fetchUser'),
                    asyncManager.asyncItem(applicationManager.getTermsAndConditionManager(), 'fetchTermsAndConditionsPostLogin', [{
                        "languageCode": kony.i18n.getCurrentLocale().replace("_", "-"),
                        "termsAndConditionsCode": OLBConstants.TNC_FLOW_TYPES.Login_TnC
                    }]),
                    asyncManager.asyncItem(userPrefManager, 'fetchUserImage'),
                    asyncManager.asyncItem(userPrefManager, 'getUserFeaturesAndPermissions')
                ],
                scopeObj.onPostLoginServicesComplete.bind(scopeObj)
            );
        } else {
            asyncManager.callAsync(
                [
                    asyncManager.asyncItem(userPrefManager, 'fetchUser'),
                    asyncManager.asyncItem(userPrefManager, 'getUserFeaturesAndPermissions'),
                    asyncManager.asyncItem(applicationManager.getTermsAndConditionManager(), 'fetchTermsAndConditionsPostLogin', [{
                        "languageCode": kony.i18n.getCurrentLocale().replace("_", "-"),
                        "termsAndConditionsCode": OLBConstants.TNC_FLOW_TYPES.Login_TnC
                    }])
                ],
                scopeObj.onPostLoginServicesComplete.bind(scopeObj)
            );
        }
      authManager.getServerTimezoneOffset({});
    };
    /**
     * Method will handle things before navigating to Dashbaord.
     * Example set idle time out , fetch outage messages ,navigate landing page etc.
     */
    AuthPresentationController.prototype.doPostLoginWork = function () {
        var scopeObj = this;
		var config = applicationManager.getConfigurationManager();
        scopeObj.setIdleTimeout();      
        // Navigation to Dashboard screen post login
        if(config.isMicroAppPresent('HomepageMA')){
        	scopeObj.navigateToAccounts();
        } else {
          	config.getDisputeConfigurations();
        }
    };
    /**
     * Method to handle Post login services response before going to landing page
     * Example set idle time out , navigate landing page etc - using doPostLoginWork.
     * @memberof Auth_PresentationController
     * @param {object}  syncResponseObject success responses object
     */
    AuthPresentationController.prototype.onPostLoginServicesComplete = function (syncResponseObject) {
        var scopeObj = this;
        if (syncResponseObject.responses[0].isSuccess && syncResponseObject.responses[1].isSuccess) {
            scopeObj.getTnCOnSuccess(syncResponseObject.responses[1].data);
        } else {
            applicationManager.getNavigationManager().updateForm({
                "hideProgressBar": true
            });
            scopeObj.navigateToServerDownScreen();
        }
    };
    /**
     * Method to handle login failure.
     * @param {object}  response failure response object
     */
    AuthPresentationController.prototype.onLoginFailure = function (response) {
        if (CommonUtilities.isCSRMode()) {
            applicationManager.getNavigationManager().updateForm({
                "action": "ServerDown"
            });
        } else {
            applicationManager.getNavigationManager().navigateTo("frmLogin");
            applicationManager.getNavigationManager().updateForm({
                "hideProgressBar": true,
                "loginFailure": true,
                "errorMessage": (response.details && response.details.errmsg) ? response.details.errmsg : ((response.errmsg && response.errmsg.errorMessage) ? response.errmsg.errorMessage : "User does not exist.")
            });
        }
    };
    AuthPresentationController.prototype.onLoginMFAFailure = function (response) {
        applicationManager.getNavigationManager().navigateTo("frmLogin");
        if (CommonUtilities.isCSRMode()) {
            applicationManager.getNavigationManager().updateForm({
                "action": "ServerDown"
            });
        } else {
            applicationManager.getNavigationManager().updateForm({
                "hideProgressBar": true,
                "loginFailure": true,
                "errorMessage": (response && response.errmsg.serverErrorRes) ? response.errmsg.serverErrorRes.errmsg : ""
            });
        }
    };
    /**
     * Method to save the username when the user clicks on rememberMe option
     * @param {object} authParams and UserNamePasswordJSON which contains username,Password,rememberMe Status
     * @param {string} [authParams.username] User name
     * @param {string} [authParams.password] password
     * @param {boolean} [authParams.rememberMe] remember me flag whether to store username in local
     */
    AuthPresentationController.prototype.saveUserName = function (authParams) {
        var names = null;
        var username = authParams.username;
        var storageManager = applicationManager.getStorageManager();
        if (authParams.rememberMe === true) { //saveUsername
            names = JSON.parse(storageManager.getStoredItem("olbNames")) || [];
            var matchingUserNames = names.filter(function (obj) {
                return obj[username];
            });
            if (matchingUserNames.length === 0) {
                var tmpIndex = names.length;
                names[tmpIndex] = {};
                names[tmpIndex][username] = applicationManager.getDataProcessorUtility().maskUserName(authParams.username);
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
   /**
     * Method to register Idle Timeout for the app and calls onSessionExpire
     */
    AuthPresentationController.prototype.setIdleTimeout = function () {
    var configConstants = applicationManager.getConfigurationManager().constants;
   kony.application.registerForIdleTimeout(configConstants.IDLE_TIMEOUT - configConstants.ALERT_IDLE_TIMEOUT, this.doBeforeLogout.bind(this));
  //kony.application.registerForIdleTimeout(1, this.doBeforeLogout.bind(this));
 

    };
  AuthPresentationController.prototype.doBeforeLogout = function(){
    if(kony.application.getCurrentForm().id==="frmDashboard"){
    kony.application.getCurrentForm().customheader.flxHamburger.isVisible=false;
    kony.application.getCurrentForm().customheader.flxHamburgerBack.isVisible=false;
    }
    if (kony.application.getCurrentForm()){
        
      var flxAlertIdle = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "100%",
        "id": "flxAlertIdle",
        "isVisible": false,
        "layoutType": kony.flex.FREE_FORM,
        "left": "0dp",
        "isModalContainer": true,
        "skin": "sknBackground000000Op35",
        "top": "0dp",
        "width": "100%",
        "zIndex": 1555,
        "appName": "AuthenticationMA"
      }, {}, {});
      flxAlertIdle.setDefaultUnit(kony.flex.DP);        
      kony.application.getCurrentForm().add( flxAlertIdle);
      kony.application.getCurrentForm().flxAlertIdle.isModalContainer = true;

      var componentTimeOut = new com.InfinityOLB.AuthenticationMA.idlePopup({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "id": "timeOutPopup",
        "layoutType": kony.flex.FREE_FORM,
        "masterType": constants.MASTER_TYPE_DEFAULT,
        "isModalContainer": true,
        "appName": "AuthenticationMA"
      });
      flxAlertIdle.add(componentTimeOut);
      componentTimeOut.onKeyPress = function(eventObj,eventPayload){
        if(eventPayload.keyCode===27){
            if(kony.application.getCurrentForm().flxAlertIdle){
                scope_AuthPresenter.resetIdle();
            }
        }
    }
    componentTimeOut.flxIdlePopup.doLayout = CommonUtilities.centerPopupFlex;
    }
    
    var configConstants = applicationManager.getConfigurationManager().constants;
    scope_AuthPresenter.showAlertIdlePopUp(configConstants.ALERT_IDLE_TIMEOUT * 60);
    kony.application.registerForIdleTimeout(configConstants.ALERT_IDLE_TIMEOUT, scope_AuthPresenter.doLogout.bind(this, "SessionExpired"));  
  };


  AuthPresentationController.prototype.showAlertIdlePopUp = function(sec) {
    var scopeObj = this;
    var currForm = kony.application.getCurrentForm();
    if(currForm.id==="frmLocateUs"){
        if(currForm.flxFormContent.height!=="100%")
        currForm.flxFormContent.height="100%";
        currForm.flxFormContent.clipBounds = true;
    }
	//currForm.timeOutPopup.btnSessionClose.setFocus(true);

    currForm.timeOutPopup.flxPBar.flxProgress.width = "0%";
    currForm.flxAlertIdle.setVisibility(true);

    var nowTime = Math.floor(Date.now() / 1000);
    var timeOut = sec + nowTime;

    currForm.timeOutPopup.lblTimeOut.text = ("0" + parseInt(((timeOut - (Math.floor(Date.now() / 1000))) / 60)).toString().slice(-2) + ":" + ("0" + ((timeOut - (Math.floor(Date.now() / 1000))) % 60).toString()).slice(-2));

    kony.timer.schedule("timerIdle", function() {
      var timePassed = timeOut - Math.floor(Date.now() / 1000);
      if (timePassed < 0) {
        scope_AuthPresenter.cancelAlertIdlePopUp();
        kony.timer.cancel("timerIdle");
      }else{
        currForm.timeOutPopup.lblTimeOut.text = ("0" + parseInt(timePassed / 60).toString().slice(-2) + ":" + ("0" + (timePassed % 60).toString()).slice(-2));

        currForm.timeOutPopup.flxPBar.flxProgress.width = (sec - timePassed) * 100 / sec  + "%";
        currForm.timeOutPopup.flxPBar.flxProgress.forceLayout();
      }
    }, 1, true);

      currForm.timeOutPopup.accessibilityConfig = {
          "a11yARIA": {
              "role": "dialog",
              "tabindex": -1
          }
      }
      currForm.timeOutPopup.lblHeading.accessibilityConfig = {
          "a11yARIA": {
              "tabindex": -1
          },
          "tagName": "h2"
      }
    currForm.timeOutPopup.btnNo.onClick = this.cancelAlertIdlePopUp.bind(this);
    currForm.timeOutPopup.btnNo.accessibilityConfig={
      "a11yARIA":{
        "role":"button",
      }
    }
    currForm.timeOutPopup.btnYes.onClick = this.resetIdle.bind(this);
    currForm.timeOutPopup.btnYes.accessibilityConfig={
      "a11yARIA":{
        "role":"button",
      }
    }
    currForm.timeOutPopup.flxCross.onClick = this.resetIdle.bind(this);
    currForm.timeOutPopup.flxCross.accessibilityConfig={
      "a11yLabel":"Close this popup",
      "a11yARIA":{
        "role":"button",
        "tabindex":0
      }
    }
	//currForm.timeOutPopup.btnSessionClose.setFocus(true);
    currForm.forceLayout();
    currForm.timeOutPopup.lblHeading.setActive(true);
	//currForm.timeOutPopup.btnSessionClose.setFocus(true);
  };
  
  AuthPresentationController.prototype.resetIdle = function() {
    var configConstants = applicationManager.getConfigurationManager().constants;
    kony.application.registerForIdleTimeout(configConstants.IDLE_TIMEOUT - configConstants.ALERT_IDLE_TIMEOUT, this.doBeforeLogout.bind());    
     //kony.application.registerForIdleTimeout(1, this.doBeforeLogout.bind());    
    
    this.cancelTimer();
    var currForm = kony.application.getCurrentForm();
    currForm.flxAlertIdle.setVisibility(false);
    if(kony.application.getCurrentForm().id==="frmLocateUs"){
        if(kony.application.getCurrentForm().flxFormContent.height!=="100%")
        kony.application.getCurrentForm().flxFormContent.height=kony.os.deviceInfo().screenHeight + 300;;
        kony.application.getCurrentForm().flxFormContent.clipBounds = false;
    }
    kony.application.getCurrentForm().remove(kony.application.getCurrentForm().flxAlertIdle);
  };

  
  AuthPresentationController.prototype.cancelAlertIdlePopUp= function() {
    kony.application.showLoadingScreen("loadingskin","Data is still Loading");
    var currForm = kony.application.getCurrentForm();
    currForm.flxAlertIdle.setVisibility(false);
    this.cancelTimer();
    kony.application.getCurrentForm().remove(kony.application.getCurrentForm().flxAlertIdle);
    this.doLogout({
            "action": "Logout"
        });
    
  };



    AuthPresentationController.prototype.cancelTimer = function(){
      kony.timer.cancel("timerIdle");
    };
    /**
     * Method to navigate Accounts DashBoard when the login is Success
     */
    AuthPresentationController.prototype.navigateToAccounts = function() {
     var accountID="";
        if (CommonUtilities.isCSRMode()) 
        {
          var providerTokenParams = kony.sdk.getCurrentInstance()
          .tokens[applicationManager.getConfigurationManager().constants.IDENTITYSERVICENAME]
          .provider_token.params;
          var userAttributes = providerTokenParams.user_attributes;
           accountID= (userAttributes && userAttributes.accountId)?userAttributes.accountId:"";
        }
        const configManager = applicationManager.getConfigurationManager();
        const isHomepageMAPresent = configManager.isMicroAppPresent('HomepageMA');
        if(isHomepageMAPresent){
            const accountModule = kony.mvc.MDAApplication.getSharedInstance().moduleManager.getModule({ appName: "HomepageMA", moduleName: "AccountsUIModule" });
            accountModule.presentationController.showAccountsDashboard({
                accountID:accountID?accountID:"",
                noRefresh: false
            });
        }        
    };
    /**
     * Method to handle session expire condition.
     */
    AuthPresentationController.prototype.onSessionExpire = function () {
        this.doLogout({
            "action": "SessionExpired"
        });
    };
    /**
     * Method to handle username change condition.
     */
    AuthPresentationController.prototype.onUsernameChange = function () {
        this.doLogout({
            "text": "username",
            "action": "userNamePasswordSuccessfullyChanged"
        });
    };
  AuthPresentationController.prototype.disableEBankingLogout = function(flowType) {
       this.doLogout({
            "action": "disabledEBankingAccess",
			"flowType": flowType
        });
 };
    /**
     * Method to handle password change condition.
     */
    AuthPresentationController.prototype.onPasswordChange = function () {
        this.doLogout({
            "text": "password",
            "action": "userNamePasswordSuccessfullyChanged"
        });
    };
    /**
     * Method to select Terms and Conditions to proceed.
     */
    AuthPresentationController.prototype.onTnCNotSelect = function() {
        this.doLogout({
            "text": "tnc",
            "action": "selectTermsAndConditonsProceed"
        });
    };
    /**
     * Method will call logout service and call success or failure callbacks
     * @param {Object} context - context object which specify reason for logout ex: session expire, server down, user logout action etc.
     */
    AuthPresentationController.prototype.doLogout = function (context) {
        applicationManager.getAuthManager().logout(this.logoutSuccessCallback.bind(this, context), this.logoutSuccessCallback.bind(this));
    };
    /**
     * Method will handle post logout actions like unregister time out etc.
     * @param {Object} context - context object which specify reason for logout ex: session expire, server down, user logout action etc.
     */
    AuthPresentationController.prototype.logoutSuccessCallback = function (context) {
        kony.application.unregisterForIdleTimeout();
        var configurationManager = applicationManager.getConfigurationManager();
        context.userName = applicationManager.getUserPreferencesManager().getCurrentUserName();
        context.isUserLoggedoutSuccessfully = true;
        context.userType = {
            isSMEUser: configurationManager.isSMEUser,
            isRBUser: configurationManager.isRBUser,
            isMBBUser: configurationManager.isMBBUser
        }
        applicationManager.getStorageManager().setStoredItem('OLBLogoutStatus', context);
        window.location.reload(); //Refersh page to clear all data.
    };
    /**
     * Mathod to show the error downtime screen when the logout failss
     */
    AuthPresentationController.prototype.logoutErrorCallback = function () {
        kony.application.unregisterForIdleTimeout();
        applicationManager.getNavigationManager().updateForm({
            "action": "ServerDown"
        }, this.loginFormName);
    };
    /**
     * Method to handle Server Down situation when any server Error Occurs - logout and navigate to server down screen.
     */
    AuthPresentationController.prototype.navigateToServerDownScreen = function () {
        this.doLogout({
            "action": "ServerDown"
        });
    };
    /**
     * Method to fecth user name from given user details and call appropriate success / failure methods
     * @param {object} userDetails - required user details to find user name
     * @param {string} userDetails.ssn SSN number of the user
     * @param {string} userDetails.lastname last name of the user
     * @param {string} userDetails.dob date of birth of the user - YYYY-MM-DD
     */
    AuthPresentationController.prototype.fetchUserName = function (userDetails) {
        var authManager = applicationManager.getAuthManager();
        var formatUtil = applicationManager.getFormatUtilManager();
        authManager.setForgotAttribute("LastName", userDetails.lastname);
        authManager.setForgotAttribute("Ssn", userDetails.ssn);
        authManager.setForgotAttribute("DateOfBirth", userDetails.dob);
        applicationManager.getNavigationManager().updateForm({
            "showProgressBar": true
        });
        authManager.fetchUserName(authManager.getForgotObject(), this.onUserDetailsSuccess.bind(this), this.onUserDetailsFailure.bind(this));
    };
    /**
 * This function shows the welcomeUser flex if the username fetch is success
 * @param {object} response fetch username success response object contains the user details
 */
    AuthPresentationController.prototype.onUserDetailsSuccess = function (response) {
        applicationManager.getNavigationManager().updateForm({
            "hideProgressBar": true
        });
        var userDetails = response.user_attributes;
        applicationManager.getAuthManager().setServicekey(response.serviceKey);
        if (userDetails && userDetails.length > 0) {
            applicationManager.getAuthManager().setPrimarykeyAttribute(userDetails);
            applicationManager.getNavigationManager().updateForm({
                "welcomeUser": userDetails
            });
        } else {
            applicationManager.getNavigationManager().updateForm({
                "userEnroll": {}
            });
        }
    };
    /**
     * This function calls the function which shows the error message if the username is not fetched -  - clear forgot object and navigate to user not found page.
     * @param {object} response fetch username failure response object
     */
    AuthPresentationController.prototype.onUserDetailsFailure = function (response) {
        this.clearForgotObject();
        applicationManager.getNavigationManager().updateForm({
            "hideProgressBar": true,
            "fetchUserFail": response.errmsg
        });
    };
    /**
     * Method to fecth user name from given user details and call appropriate success / failure methods
     * @param {object} userDetails - required user details to find user name
     * @param {string} userDetails.Phone Phone number of the user
    * @param {string} userDetails.DateOfBirth DateOfBirth of the user - YYYY-MM-DD
    * @param {string} userDetails.Email Email of the user 
    */
    AuthPresentationController.prototype.verifyUserName = function (userDetails) {
        var authManager = applicationManager.getAuthManager();
        applicationManager.getNavigationManager().updateForm({
            "showProgressBar": true
        });
        authManager.verifyUserName(userDetails, this.onVerifyUserNameSuccessCallBack.bind(this), this.onVerifyUserNameFailureCallBack.bind(this));
    };
    AuthPresentationController.prototype.onVerifyUserNameSuccessCallBack = function (response) {
        var userDetails = response.user_attributes;
        if (userDetails && userDetails.length > 0) {
            applicationManager.getAuthManager().setServicekey(response.serviceKey);
            applicationManager.getAuthManager().setPrimarykeyAttribute(userDetails);
            applicationManager.getNavigationManager().updateForm({
                "verifyUserList": userDetails,
                "hideProgressBar": true
            });
        } else {
            applicationManager.getNavigationManager().updateForm({
                "verifyUserDetailsError": {"response" : response} 
            });
        }
    };
    AuthPresentationController.prototype.onVerifyUserNameFailureCallBack = function (response) {
        applicationManager.getNavigationManager().updateForm({
            "hideProgressBar": true,
            "verifyUserDetailsError": {"response" : response}
        });
    };
    /**
     * Method to fetch user card details using user name form forgot object and navigate to reset password optionsm UI in verify user
     * @param {String} userName - contains username
     */
    AuthPresentationController.prototype.fetchCardsByUserName = function (userName) {
        applicationManager.getNavigationManager().updateForm({
            "showProgressBar": true
        });
        applicationManager.getUserPreferencesManager().getAllCardsWithUsername(userName, this.onfetchCardsSuccess.bind(this), this.onfetchCardsFails.bind(this));
    };
    /**
     * Method to handle when fetch user card details using user name is success for reset password in verify user
     * Navigate to cards pages verification page
     * @param {Cards[]} response -  fetch cards success response - contians cards data
     * @param {string} response.cardHolderName -  card holder name
     * @param {string} response.cardNumber -  card number
     * @param {string} response.cardType -  card type
     */
    AuthPresentationController.prototype.onfetchCardsSuccess = function (response) {
        applicationManager.getNavigationManager().updateForm({
            "hideProgressBar": true,
            "cardsDataForResetPassword": response
        });
    };
    /**
     * Method to handle when fetch user card details using user name is failured for Reset password -  - clear forgot object and navigate to server down page.
     * @param {object} response - fetch cards failure response object
     */
    AuthPresentationController.prototype.onfetchCardsFails = function (response) {
        this.clearForgotObject();
        applicationManager.getNavigationManager().updateForm({
            "hideProgressBar": true,
            "action": "ServerDown",
            "unUsedResponse": response
        });
    };
    /**
     * Method to validate CVV and navigate to corresponding UI Of reset password in verify user.
     * @param {object} cvvDetails - required details to verify CVV
     * @param {string} cvvDetails.cvv - cvv entered by user
     * @param {string} cvvDetails.cardNumber - card number
     */
    AuthPresentationController.prototype.validateCVV = function (cvvDetails) {
        if (cvvDetails) {
            var authManager = applicationManager.getAuthManager();
            authManager.setForgotAttribute("cvv", cvvDetails.cvv);
            authManager.setForgotAttribute("cardNumber", cvvDetails.cardNumber);
            applicationManager.getNavigationManager().updateForm({
                "showProgressBar": true
            });
            authManager.verifyCVV(authManager.getForgotObject(), this.onVerifyCVVSuccess.bind(this), this.onVerifyCVVFails.bind(this));
        } else {
            applicationManager.getLoggerManager().log("Invalid deatails to verify CVV : " + cvvDetails);
        }
    };
    /**
     * Method to handle when cvv validation using is success for reset password in verify user
     * Fetch passoword policies for resetting password.
     */
    AuthPresentationController.prototype.onVerifyCVVSuccess = function () {
        applicationManager.getUserPreferencesManager().fetchPasswordRulesAndPolicy(this.onSuccessPasswordPolicies.bind(this), this.onPasswordPoliciesFailes.bind(this));
    };
    /**
     * Method to handle when cvv validation using is failured for reset password in verify user
     * @param {object} response - verify CVV failure response object
     */
    AuthPresentationController.prototype.onVerifyCVVFails = function (response) {
        applicationManager.getNavigationManager().updateForm({
            "hideProgressBar": true,
            "cvvFailure": response
        });
    };
    /**
     * Method to handle when passwoed policies are successfully fetched for reset password in verify user
     * @param {object} response -  verify CVV success response object
     */
    AuthPresentationController.prototype.onSuccessPasswordPolicies = function (response) {
        var validationUtility = applicationManager.getValidationUtilManager();
        validationUtility.createRegexForPasswordValidation(response.passwordrules);
        applicationManager.getNavigationManager().updateForm({
            "hideProgressBar": true,
            "passwordPolicies": response.passwordpolicy
        });
    };
    /**
     * Method to handle when password policies service fails - clear forgot object and navigate to server down page.
     * @param {object} response - verify CVV failure response object
     */
    AuthPresentationController.prototype.onPasswordPoliciesFailes = function (response) {
        this.clearForgotObject();
        applicationManager.getNavigationManager().updateForm({
            "hideProgressBar": true,
            "action": "ServerDown",
            "unUsedResponse": response
        });
    };
    /**
     * Reset the password of user and navigate to corresponding view based success/ failure of service
     * @param {Object} userDetails - contains user and password
     */
    AuthPresentationController.prototype.resetPassword = function (userDetails) {
        var authManager = applicationManager.getAuthManager();
        authManager.setForgotAttribute("UserName", userDetails.userName);
        authManager.setForgotAttribute("Password", userDetails.password);
        authManager.setForgotAttribute("serviceKey", authManager.getServicekey());
        applicationManager.getNavigationManager().updateForm({
            "showProgressBar": true
        });
        authManager.resetPassword(authManager.getForgotObject(), this.onResetPasswordSuccees.bind(this), this.onResetPasswordFails.bind(this));
    };
    /**
     * Method to handle reset password success in verify user -  - clear forgot object and navigate to reset passoword success page.
     * @param {object} response -  reset password success response object
     */
    AuthPresentationController.prototype.onResetPasswordSuccees = function (response) {
        this.clearForgotObject();
        applicationManager.getNavigationManager().updateForm({
            "hideProgressBar": true,
            "resetPasswordSuccss": response
        });
    };
    /**
     Method to handle reset password failure in verify user - clear forgot object and navigate to server down page.
     * @param {object} response - reset password success response object
     */
    AuthPresentationController.prototype.onResetPasswordFails = function (response) {
        this.clearForgotObject();
        if (response.isServerUnreachable) {
            applicationManager.getNavigationManager().updateForm({
                "hideProgressBar": true,
                "action": "ServerDown",
                "unUsedResponse": response
            });
        } else {
            applicationManager.getNavigationManager().updateForm({
                "hideProgressBar": true,
                "resetPasswordFailed": response.serverErrorRes
            });
        }
    };
    /**
     * Method to fetch and navigate to corresponding UI Of reset password in verify user.
     */
    AuthPresentationController.prototype.requestOTP = function () {
        applicationManager.getNavigationManager().updateForm({
            "showProgressBar": true
        });
        var authManager = applicationManager.getAuthManager();
        authManager.fetchOTP(authManager.getForgotObject(), this.onFetchOTPSuccess.bind(this), this.onFetchOTPFails.bind(this));
    };
    /**
     * Method to handle when fetch OTP is success for reset password in verify user
     * @param {object} response -  fetch OTP success response object
     */
    AuthPresentationController.prototype.onFetchOTPSuccess = function (response) {
        applicationManager.getNavigationManager().updateForm({
            "hideProgressBar": true,
            "fetchOTPSuccess": response
        });
    };
    /**
     * Method to handle when fetch OTP using is failured for reset password in verify user
     * @param {object} response - fetch OTP failure response object
     */
    AuthPresentationController.prototype.onFetchOTPFails = function (response) {
        applicationManager.getNavigationManager().updateForm({
            "hideProgressBar": true,
            "unUsedResponse": response
        });
    };
    /**
     * Method to validate OTP and corresponding UI Of reset password in verify user.
     * @param {string} otp - otp entered by user
     */
    AuthPresentationController.prototype.verifyOTP = function (otp) {
        applicationManager.getNavigationManager().updateForm({
            "showProgressBar": true
        });
        var authManager = applicationManager.getAuthManager();
        authManager.setForgotAttribute("Otp", otp);
        authManager.verifyOTP(authManager.getForgotObject(), this.onVerifyOTPSuccess.bind(this), this.onVerifyOTPFails.bind(this));
    };
    /**
     * Method to handle when verify OTP is success for reset password in verify user
     */
    AuthPresentationController.prototype.onVerifyOTPSuccess = function () {
        var params = {
            "ruleForCustomer": true,
            "policyForCustomer": true
        };
        applicationManager.getUserPreferencesManager().fetchPasswordRulesAndPolicy(this.onSuccessPasswordPolicies.bind(this), this.onPasswordPoliciesFailes.bind(this));
    };
    /**
     * Method to handle when verify OTP is failured for reset password in verify user
     * @param {object} response - verify OTP failure response object
     */
    AuthPresentationController.prototype.onVerifyOTPFails = function (response) {
        applicationManager.getNavigationManager().updateForm({
            "hideProgressBar": true,
            "OTPFailed": response
        });
    };
    /**
     * Method to clear forgot object data.
     */
    AuthPresentationController.prototype.clearForgotObject = function () {
        applicationManager.getAuthManager().clearForgotObject();
    };
    /**
     * Method for navigate to New User Onboarding page
     */
    AuthPresentationController.prototype.navigateToNewUserOnBoarding = function () {
        var configurationManager = applicationManager.getConfigurationManager();
        var reDirectionURL = configurationManager.getOnBoardingAppDirectionURL();
        if (reDirectionURL) {
            // location.assign(reDirectionURL);
            kony.application.openURL(reDirectionURL);
        }
        else {
            // Parsing the service url present in appConfig
            var protocol = appConfig.isturlbase.split("//")[0];
            var origin = appConfig.isturlbase.split("//")[1].split("/")[0];
            // Getting the current app name from appDetails
            var appName = appDetails.appID;
            // Redirecting to
            // location.assign(protocol + "//" + origin + "/apps/" + configurationManager.getOnboardingAppID() + "/?launchFrom=" + btoa(appName));
            kony.application.openURL(protocol + "//" + origin + "/apps/" + configurationManager.getOnboardingAppID() + "/?launchFrom=" + btoa(appName));
        }
    };
    /**
     * Method for navigate to Enroll page
     * @param {object} userDetails - user details if required to pass to enroll module
     */
    AuthPresentationController.prototype.navigateToEnroll = function (userDetails) {
        var enrollModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("EnrollModule");
        enrollModule.presentationController.showEnrollPage(userDetails);
    };
    /**
     * Method for navigate to FAQ page
     */
    AuthPresentationController.prototype.navigateToFAQ = function () {
      const configManager = applicationManager.getConfigurationManager();
      const isAboutUsMAPresent = configManager.isMicroAppPresent('AboutUsMA');
      if(isAboutUsMAPresent){
        let informationContentModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ appName: "AboutUsMA", moduleName: "InformationContentUIModule"});
        informationContentModule.presentationController.showFAQs();
      }
    };
    /**
     * Method for navigate to Contacts Us page
     */
    AuthPresentationController.prototype.navigateToContactUs = function () {
      const configManager = applicationManager.getConfigurationManager();
      const isAboutUsMAPresent = configManager.isMicroAppPresent('AboutUsMA');
      if(isAboutUsMAPresent){
        let informationContentModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ appName: "AboutUsMA", moduleName: "InformationContentUIModule"});
        informationContentModule.presentationController.showContactUsPage();
      }
    };
    /**
     * Method for navigate to Privacy Policy page
     */
    AuthPresentationController.prototype.navigateToPrivacyPrivacy = function () {
      const configManager = applicationManager.getConfigurationManager();
      const isAboutUsMAPresent = configManager.isMicroAppPresent('AboutUsMA');
      if(isAboutUsMAPresent){
        let informationContentModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ appName: "AboutUsMA", moduleName: "InformationContentUIModule"});
        informationContentModule.presentationController.showPrivacyPolicyPage();
      }
    };
    /**
     * Method for navigate to Terms And Conditions page
     */
    AuthPresentationController.prototype.navigateToTermsAndConditions = function () {
      const configManager = applicationManager.getConfigurationManager();
      const isAboutUsMAPresent = configManager.isMicroAppPresent('AboutUsMA');
      if(isAboutUsMAPresent){
         let informationContentModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ appName: "AboutUsMA", moduleName: "InformationContentUIModule"});
        informationContentModule.presentationController.showTermsAndConditions(OLBConstants.TNC_FLOW_TYPES.Footer_TnC);
      }
    };
    /**
     * Method for navigate to Locate us page
     */
    AuthPresentationController.prototype.navigateToLocateUs = function () {
      const configManager = applicationManager.getConfigurationManager();
      const isAboutUsMAPresent = configManager.isMicroAppPresent('AboutUsMA');
      if(isAboutUsMAPresent){
        let locateUsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ appName: "AboutUsMA", moduleName: "LocateUsUIModule" });
        locateUsModule.presentationController.showLocateUsPage();
      }
    };
    /**
     * Method for navigate to Feeback page
     */
    AuthPresentationController.prototype.navigateToFeedbackPage = function () {
        const configManager = applicationManager.getConfigurationManager();
        const isAboutUsMAPresent = configManager.isMicroAppPresent('AboutUsMA');
        if(isAboutUsMAPresent){
            const feedbackModule = kony.mvc.MDAApplication.getSharedInstance().moduleManager.getModule({ appName: "AboutUsMA", moduleName: "FeedbackUIModule" });
            feedbackModule.presentationController.showFeedback();
        }        
    };
    /**
    * Method to fetch and navigate to corresponding UI Of Business Banking reset password.
    */
    AuthPresentationController.prototype.requestOTPBB = function () {
        applicationManager.getNavigationManager().updateForm({
            "showProgressBar": true
        });
        var authManager = applicationManager.getAuthManager();
        authManager.fetchOTP(authManager.getForgotObject(), this.onFetchOTPBBSuccess.bind(this), this.onFetchOTPBBFails.bind(this));
    };
    /**
     * Method to handle when fetch OTP for a business banking user is success
     * @param {object} response -  fetch OTP success response object
     */
    AuthPresentationController.prototype.onFetchOTPBBSuccess = function (response) {
        applicationManager.getNavigationManager().updateForm({
            "hideProgressBar": true,
            "fetchOTPBBSuccess": response
        });
    };
    /**
     * Method to handle when fetch OTP for a business banking user is failed
     * @param {object} response - fetch OTP failure response object
     */
    AuthPresentationController.prototype.onFetchOTPBBFails = function (response) {
        applicationManager.getNavigationManager().updateForm({
            "hideProgressBar": true
        });
    };
    /**
     * Method to validate OTP and corresponding UI Of reset password in verify user.
     * @param {object} otpDetails - required details to fetch OTP
     */
    AuthPresentationController.prototype.verifyOTPBB = function (otpDetails) {
        applicationManager.getNavigationManager().updateForm({
            "showProgressBar": true
        });
        var authManager = applicationManager.getAuthManager();
        authManager.setForgotAttribute("Otp", otpDetails);
        authManager.verifyOTP(authManager.getForgotObject(), this.onVerifyOTPBBSuccess.bind(this), this.onVerifyOTPBBFails.bind(this));
    };
    /**
     * Method to handle when verify OTP for a business banking user is success
     */
    AuthPresentationController.prototype.onVerifyOTPBBSuccess = function () {
        applicationManager.getUserPreferencesManager().fetchPasswordRulesAndPolicy(this.onSuccessPasswordPoliciesBB.bind(this), this.onPasswordPoliciesFailes.bind(this));
    };
    /**
     * Method to handle when verify OTP for a business banking user is failed
     * @param {object} response - verify OTP failure response object
     */
    AuthPresentationController.prototype.onVerifyOTPBBFails = function (response) {
        applicationManager.getNavigationManager().updateForm({
            "hideProgressBar": true,
            "OTPFailed": response
        });
    };
    /**
     * Method to handle when passwoed policies are successfully fetched for reset password in verify user
     * @param {object} response -  verify CVV success response object
     */
    AuthPresentationController.prototype.onSuccessPasswordPoliciesBB = function (response) {
        var validationUtility = applicationManager.getValidationUtilManager();
        validationUtility.createRegexForPasswordValidation(response.passwordrules);
        applicationManager.getNavigationManager().updateForm({
            "hideProgressBar": true,
            "passwordPoliciesBB": response.passwordpolicy
        });
    };
    AuthPresentationController.prototype.requestResetPasswordOTP = function (params) {
        applicationManager.getAuthManager().requestResetPasswordOTP(params, this.requestResetPasswordOTPSuccess.bind(this), this.requestResetPasswordOTPFailure.bind(this));
    };
    AuthPresentationController.prototype.resendOTPForResetPassword = function (params) {
        applicationManager.getAuthManager().requestResetPasswordOTP(params, this.verifyOTPPreLoginSuccess.bind(this), this.verifyOTPPreLoginFailure.bind(this));
    };
    AuthPresentationController.prototype.requestResetPasswordOTPSuccess = function (response) {
        var authManager = applicationManager.getAuthManager();
        if (response && response.MFAAttributes) {
            authManager.setMFAResponse(response);
            authManager.setCommunicationType(response.MFAAttributes.communicationType);
            authManager.setServicekey(response.MFAAttributes.serviceKey);
            applicationManager.getNavigationManager().updateForm({
                "hideProgressBar": true,
                "showScreenToEnterSecureCode": response
            });
        }
    };
    AuthPresentationController.prototype.requestResetPasswordOTPFailure = function (response) {
        applicationManager.getNavigationManager().updateForm({
            "hideProgressBar": true,
        });
    };
    AuthPresentationController.prototype.requestOTPUsingPhoneEmail = function (params) {
        applicationManager.getAuthManager().requestResetPasswordOTP(params, this.requestOTPUsingPhoneEmailSuccess.bind(this), this.requestOTPUsingPhoneEmailFailure.bind(this));
    };
    AuthPresentationController.prototype.requestOTPUsingPhoneEmailSuccess = function (response) {
        var authManager = applicationManager.getAuthManager();
        authManager.setMFAResponse(response);
        var MFAResponse = authManager.getMFAResponse();
        MFAResponse.MFAAttributes.remainingResendAttempts = response.MFAAttributes.remainingResendAttempts;
        MFAResponse.MFAAttributes.securityKey = response.MFAAttributes.securityKey;
        applicationManager.getNavigationManager().updateForm({
            "hideProgressBar": true,
            "isOTPReceived": authManager.getMFAResponse()
        });
    };
    AuthPresentationController.prototype.requestOTPUsingPhoneEmailFailure = function (response) {
        applicationManager.getNavigationManager().updateForm({
            "hideProgressBar": true,
            "isOTPRequestFailed": response.serverErrorRes
        });
    };
    AuthPresentationController.prototype.verifyOTPPreLogin = function (params) {
        applicationManager.getAuthManager().verifyOTPPreLogin(params, this.verifyOTPPreLoginSuccess.bind(this), this.verifyOTPPreLoginFailure.bind(this));
    };
    AuthPresentationController.prototype.verifyOTPPreLoginSuccess = function (response) {
        var authManager = applicationManager.getAuthManager();
        var MFAResponse = authManager.getMFAResponse();
        if (response.MFAAttributes) {
            if (response.MFAAttributes.securityKey) {
                MFAResponse.MFAAttributes.remainingResendAttempts = response.MFAAttributes.remainingResendAttempts;
                MFAResponse.MFAAttributes.securityKey = response.MFAAttributes.securityKey;
                MFAResponse.MFAAttributes.communicationType = authManager.getCommunicationType();
                MFAResponse.MFAAttributes.isOTPExpired = false;
            } else if (response.MFAAttributes.isOTPExpired) {
                MFAResponse.MFAAttributes.remainingResendAttempts = response.MFAAttributes.remainingResendAttempts;
                MFAResponse.MFAAttributes.isOTPExpired = response.MFAAttributes.isOTPExpired;
                MFAResponse.MFAAttributes.communicationType = authManager.getCommunicationType();
            }
            authManager.setMFAResponse(MFAResponse);
            applicationManager.getNavigationManager().updateForm({
                "hideProgressBar": true,
                "showSecureAccessCodeScreenAfterResend": authManager.getMFAResponse()
            });
        } else {
            this.onVerifyOTPSuccess();
        }
    };
    AuthPresentationController.prototype.verifyOTPPreLoginFailure = function (response) {
        applicationManager.getNavigationManager().updateForm({
            "hideProgressBar": true,
            "isEnteredOTPIncorrect": response.serverErrorRes
        });
    };
    /*AuthPresentationController.prototype.showResetPasswordPageThroughLink = function (context) {
        applicationManager.getNavigationManager().navigateTo("frmResetPassword");
        applicationManager.getNavigationManager().updateForm({
            "showProgressBar": true
        });
        applicationManager.getUserPreferencesManager().fetchPasswordRulesAndPolicy(this.resetThroughLinkPasswordPoliciesOnSuccess.bind(this, context), this.resetThroughLinkPasswordPoliciesOnFailure.bind(this));
    };*/
    AuthPresentationController.prototype.resetThroughLinkPasswordPoliciesOnSuccess = function (context, response) {
        applicationManager.getValidationUtilManager().createRegexForPasswordValidation(response.passwordrules);
        applicationManager.getNavigationManager().updateForm({
            "hideProgressBar": true,
            "showResetPasswordScreen": {
                "policyData": response.passwordrules,
                "identifier": context.identifier
            }
        });
    };
    AuthPresentationController.prototype.resetThroughLinkPasswordPoliciesOnFailure = function (response) {
        applicationManager.getNavigationManager().navigateTo("frmLogin");
        applicationManager.getNavigationManager().updateForm({
            "hideProgressBar": true,
            "action": "ServerDown",
            "unUsedResponse": response
        });
    };
    AuthPresentationController.prototype.resetPasswordFromEmail = function (params) {
        applicationManager.getNavigationManager().updateForm({
            "showProgressBar": true
        });
        applicationManager.getAuthManager().resetPasswordFromEmail(params, this.resetPasswordFromEmailOnSuccess.bind(this), this.resetPasswordFromEmailOnFailure.bind(this));
    };
    AuthPresentationController.prototype.resetPasswordFromEmailOnSuccess = function (response) {
        applicationManager.getNavigationManager().updateForm({
            "hideProgressBar": true,
            "showResetPasswordAcknowledgementScreen": {}
        });
    };
    AuthPresentationController.prototype.resetPasswordFromEmailOnFailure = function (response) {
        applicationManager.getNavigationManager().updateForm({
            "hideProgressBar": true,
            "showResetPasswordErrorScreen": response
        });
    };
    AuthPresentationController.prototype.getTnC = function () {
        var termsAndConditionModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TermsAndConditionsUIModule");
        termsAndConditionModule.presentationController.showTermsAndConditions(OLBConstants.TNC_FLOW_TYPES.Login_TnC, this.getTnCOnSuccess.bind(this), this.getTnCOnFailure.bind(this));
    };
    AuthPresentationController.prototype.getTnCOnSuccess = function (response) {
         if (response.alreadySigned) {
             this.doPostLoginWork();
        }
        else {
            applicationManager.getNavigationManager().navigateTo("frmPreTermsandCondition");
            applicationManager.getNavigationManager().updateForm({
                "TnCcontent": response
            });
        }
    };
    AuthPresentationController.prototype.getTnCOnFailure = function (response) {
        applicationManager.getNavigationManager().updateForm({
            "hideProgressBar": true,
            "loginFailure": true,
            "errorMessage": (response) ? response : ""
        });
    };
    AuthPresentationController.prototype.getPreLoginCampaignsOnBreakpointChange = function () {
        var self = this;
        var configurationManager = applicationManager.getConfigurationManager();
        let clientProperties = OLBConstants.CLIENT_PROPERTIES;
        if(Object.keys(clientProperties).length === 0) {
            let configurationSvc = kony.sdk.getCurrentInstance().getConfigurationService();
            configurationSvc.getAllClientAppProperties(function(response) {
            OLBConstants.CLIENT_PROPERTIES = response;
            configurationManager.setOnBoardingAppDirectionURL(response["DBP_ONBOARDING_URL"]);
            configurationManager.setSSOConfig(response["SSO_CONFIG"]);
            configurationManager.setDateFormatCP(response["DATE_FORMAT"]);
			configurationManager.setEarlyPayOffMsg(response["EARLY_PAYOFF_MSG"]);
			configurationManager.setEarlyPayOffTel1(response["EARLY_PAYOFF_TEL1"]);
			configurationManager.setEarlyPayOffTel2(response["EARLY_PAYOFF_TEL2"]);
			configurationManager.setEarlyPayOffEmail(response["EARLY_PAYOFF_EMAIL"]);
			configurationManager.setEarlyPayOffAddress(response["EARLY_PAYOFF_ADDRESS"]);
            if(response.OLB_ENABLE_INAPP_CAMPAIGNS && response.OLB_ENABLE_INAPP_CAMPAIGNS.toUpperCase() === "TRUE"){
                var directMktManager = applicationManager.getDirectMarketingManager();
                directMktManager.getAds("preLoginDesktopAds", self.getCampaignsSuccess.bind(self), self.getCampaignsFailure.bind(self));
            } else {
                self.getCampaignsSuccess([]);
            }
            }, function(){});
        } else if(clientProperties && clientProperties.OLB_ENABLE_INAPP_CAMPAIGNS && clientProperties.OLB_ENABLE_INAPP_CAMPAIGNS.toUpperCase() === "TRUE"){
                var directMktManager = applicationManager.getDirectMarketingManager();
                directMktManager.getAds("preLoginDesktopAds", self.getCampaignsSuccess.bind(self), self.getCampaignsFailure.bind(self));
        } else {
            self.getCampaignsSuccess([]);
        }
    };
  
    AuthPresentationController.prototype.getAllClientAppProperties = function () {
      var self = this;
      var configurationManager = applicationManager.getConfigurationManager();
      let clientProperties = OLBConstants.CLIENT_PROPERTIES;
      if(Object.keys(clientProperties).length === 0) {
        let configurationSvc = kony.sdk.getCurrentInstance().getConfigurationService();
        configurationSvc.getAllClientAppProperties(function(response) {
          OLBConstants.CLIENT_PROPERTIES = response;
          configurationManager.setOnBoardingAppDirectionURL(response["DBP_ONBOARDING_URL"]);
          configurationManager.setSSOConfig(response["SSO_CONFIG"]);
          configurationManager.setDateFormatCP(response["DATE_FORMAT"]);
          configurationManager.setEarlyPayOffMsg(response["EARLY_PAYOFF_MSG"]);
          configurationManager.setEarlyPayOffTel1(response["EARLY_PAYOFF_TEL1"]);
          configurationManager.setEarlyPayOffTel2(response["EARLY_PAYOFF_TEL2"]);
          configurationManager.setEarlyPayOffEmail(response["EARLY_PAYOFF_EMAIL"]);
          configurationManager.setEarlyPayOffAddress(response["EARLY_PAYOFF_ADDRESS"]);
        }, function(){});
      }
    };
    /**
     *Method is used for fetching of campaigns
     * @param {Object}- list of campaigns
     */
    AuthPresentationController.prototype.getCampaigns = function (response) {
        if (response.campaignSpecifications)
            this.getCampaignsSuccess(response);
        else
            this.getCampaignsFailure(response);
    };
    /**
     * Method that gets called when fetching unread messages is successful
     * @param {Object} messagesObj List of messages Object
     */
    AuthPresentationController.prototype.getCampaignsSuccess = function (res) {
        applicationManager.getNavigationManager().updateForm({
            "campaignRes": res
        },"frmLogin");
    };
    /**
     * Method that gets called when there is an error in fetching unread messages for account dashboard
     * @param {Object} error Error Object
     */
    AuthPresentationController.prototype.getCampaignsFailure = function (error) {
        applicationManager.getNavigationManager().updateForm({
            "campaignError": error
        },"frmLogin");
    };
    /**
     * 
     * @param {JSONObject} request 
     * request contains serviceKey , id 
     * @param serviceKey
     * @param userName
     */
    AuthPresentationController.prototype.regenerateActivationCode = function (request) {
        var authManager = applicationManager.getAuthManager();
        applicationManager.getNavigationManager().updateForm({
            "showProgressBar": true
        });
        authManager.regenerateActivationCode(request, this.onRegenerateActivationCodeSuccess.bind(this), this.onRegenerateActivationCodeFailure.bind(this));
    };
    AuthPresentationController.prototype.onRegenerateActivationCodeSuccess = function (successResponse) {
        applicationManager.getNavigationManager().updateForm({
            "hideProgressBar": true,
            "dispalyRegenerateScreen": {}
        });
    };
    AuthPresentationController.prototype.onRegenerateActivationCodeFailure = function (errorResponse) {
        applicationManager.getNavigationManager().updateForm({
            "hideProgressBar": true
        });
    };
    /**
     * To generate the captcha
     */
    AuthPresentationController.prototype.generateCaptcha = function() {
        var authManager = applicationManager.getAuthManager();
        applicationManager.getNavigationManager().updateForm({
            "showProgressBar": true
        });
        authManager.generateCaptcha({}, this.onGenerateCaptchaSuccess.bind(this), this.onGenerateCaptchaFailure.bind(this));
    };
    AuthPresentationController.prototype.onGenerateCaptchaSuccess = function(successResponse) {
        if (successResponse.encodedImage && successResponse.serviceKey) {
			let encodedimage = applicationManager.getAuthManager().getEncodedimage();
			let isLabelRefresh = (encodedimage=== null || encodedimage==="") ? false : true ;
            applicationManager.getNavigationManager().updateForm({
                "hideProgressBar": true,
                "captchaSuccess": {
                    "response": successResponse,
					"isLabelRefresh" : isLabelRefresh
                }
            });
        }
    };
    AuthPresentationController.prototype.onGenerateCaptchaFailure = function(errorResponse) {
        applicationManager.getNavigationManager().updateForm({
            "hideProgressBar": true,
            "captchaFailure": {}
        });
    };

    AuthPresentationController.prototype.getLegalEntities = function() {
        var authManager = applicationManager.getAuthManager();
        applicationManager.getNavigationManager().updateForm({
            "showProgressBar": true
        });
        authManager.getLegalEntities({}, this.getLegalEntitiesSuccess.bind(this), this.getLegalEntitiesFailure.bind(this));
    };
    AuthPresentationController.prototype.getLegalEntitiesSuccess = function(successResponse) {
            applicationManager.getNavigationManager().updateForm({
                "entitiesPreLogin": successResponse,
                "hideProgressBar": true
            });
    };
    AuthPresentationController.prototype.getLegalEntitiesFailure = function(errorResponse) {
        applicationManager.getNavigationManager().updateForm({
            "legalEntityFailure": {},
            "hideProgressBar": true
        });
    };

    return AuthPresentationController;
});
