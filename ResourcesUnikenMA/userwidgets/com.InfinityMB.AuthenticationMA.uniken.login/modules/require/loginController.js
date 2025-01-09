define(['./LoginUtility', './LoginDAO','OLBConstants'], function (LoginUtility, LoginDAO,OLBConstants) {
 
  
    var userName_REL_ID = null;
    var REL_ID_challenge_mode = null;
    var userList = null;
    var REL_ID_Logintext_verified = null;
    return {
        constructor: function(baseConfig, layoutConfig, pspConfig) {
            this._identityServiceName = "";
            this._textBoxNormalSkin = "";
            this._rememberMeLabelSkin = "";
            this._rememberMeSwitchSkin = "";
            this._btnLoginDisabledSkin = "";
            this._btnLoginSkin = "";
            this._textVisiblityOffIcon = "";
            this._textVisiblityOnIcon = "";
            this._tbx1PlaceholderText = "";
            this._tbx2PlaceholderText = "";
            this._lblRememberMeText = "";
            this._lblForgotPasswordText = "";
            this._submitButtonText = "";
            this.LoginUtility = new LoginUtility();
            this.LoginDAO = new LoginDAO();
            this.currentAuthMode = "";
            this.JSONUsernamePassword = "";
            this.isTbxUsernameInFocus = false;
            this.isTbxPasswordInFocus = false;
        },
        //Logic for getters/setters of custom properties
        initGettersSetters: function() {
            defineSetter(this, "identityServiceName", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._identityServiceName = val;
                }
            });
            defineGetter(this, "identityServiceName", function() {
                return this._identityServiceName;
            });
            defineSetter(this, "textBoxNormalSkin", function(val) {
                if ((typeof val == "string") && (val != "")) {
                    this._textBoxNormalSkin = val;
                }
            });
            defineGetter(this, "textBoxNormalSkin", function() {
                return this._textBoxNormalSkin;
            });
            defineSetter(this, "rememberMeLabelSkin", function(val) {
                if ((typeof val == "string") && (val != "")) {
                    this._rememberMeLabelSkin = val;
                }
            });
            defineGetter(this, "rememberMeLabelSkin", function() {
                return this._rememberMeLabelSkin;
            });
            defineSetter(this, "rememberMeSwitchSkin", function(val) {
                if ((typeof val == "string") && (val != "")) {
                    this._rememberMeSwitchSkin = val;
                }
            });
            defineGetter(this, "rememberMeSwitchSkin", function() {
                return this._rememberMeSwitchSkin;
            });
            defineSetter(this, "btnLoginSkin", function(val) {
                if ((typeof val == "string") && (val != "")) {
                    this._btnLoginSkin = val;
                }
            });
            defineGetter(this, "btnLoginSkin", function() {
                return this._btnLoginSkin;
            });
            defineSetter(this, "btnLoginDisabledSkin", function(val) {
                if ((typeof val == "string") && (val != "")) {
                    this._btnLoginDisabledSkin = val;
                }
            });
            defineGetter(this, "btnLoginDisabledSkin", function() {
                return this._btnLoginDisabledSkin;
            });
            defineSetter(this, "textVisiblityOffIcon", function(val) {
                if ((typeof val == "string") && (val != "")) {
                    this._textVisiblityOffIcon = val;
                }
            });
            defineGetter(this, "textVisiblityOffIcon", function() {
                return this._textVisiblityOffIcon;
            });
            defineSetter(this, "textVisiblityOnIcon", function(val) {
                if ((typeof val == "string") && (val != "")) {
                    this._textVisiblityOnIcon = val;
                }
            });
            defineGetter(this, "textVisiblityOnIcon", function() {
                return this._textVisiblityOnIcon;
            });
            defineSetter(this, "tbx1PlaceholderText", function(val) {
                if ((typeof val == "string") && (val != "")) {
                    this._tbx1PlaceholderText = val;
                }
            });
            defineGetter(this, "tbx1PlaceholderText", function() {
                return this._tbx1PlaceholderText;
            });
            defineSetter(this, "tbx2PlaceholderText", function(val) {
                if ((typeof val == "string") && (val != "")) {
                    this._tbx2PlaceholderText = val;
                }
            });
            defineGetter(this, "tbx2PlaceholderText", function() {
                return this._tbx2PlaceholderText;
            });
            defineSetter(this, "lblRememberMeText", function(val) {
                if ((typeof val == "string") && (val != "")) {
                    this._lblRememberMeText = val;
                }
            });
            defineGetter(this, "lblRememberMeText", function() {
                return this._lblRememberMeText;
            });
            defineSetter(this, "lblForgotPasswordText", function(val) {
                if ((typeof val == "string") && (val != "")) {
                    this._lblForgotPasswordText = val;
                }
            });
            defineGetter(this, "lblForgotPasswordText", function() {
                return this._lblForgotPasswordText;
            });
            defineSetter(this, "submitButtonText", function(val) {
                if ((typeof val == "string") && (val != "")) {
                    this._submitButtonText = val;
                }
            });
            defineGetter(this, "submitButtonText", function() {
                return this._submitButtonText;
            });
        },
        raiseComponentEvent: function(methodName, argument = null) {
            // This method invokes the appropriate event exposed  by the COMPONENT
            const scopeObj = this;
            switch (methodName) {
                case 'onLoginSuccess':
                    if (scopeObj.onLoginSuccess) scopeObj.onLoginSuccess(argument);
                    break;
                case 'onLoginFailure':
                    if (scopeObj.onLoginFailure) scopeObj.onLoginFailure(argument);
                    break;
                case 'onFocusStart': // Event for performing animation at the form level.
                    if (scopeObj.onFocusStart) scopeObj.onFocusStart();
                    break;
                case 'onFocusEnd': // Event for performing animation at the form level.
                    if (scopeObj.onFocusEnd) scopeObj.onFocusEnd();
                    break;
                case 'hideDashboardIcon':
                    if (scopeObj.hideDashboardIcon) scopeObj.hideDashboardIcon();
                    break;
                case 'setErrorStatus':
                    if (scopeObj.setErrorStatus) scopeObj.setErrorStatus(argument);
                    break;
                case 'forgotNavigation':
                    if (scopeObj.forgotNavigation) scopeObj.forgotNavigation(argument);
                    break;
                case 'setUIAtFormLevelEvent': // Change UI at form Level based on whether login type is username-password OR (pin/faceid/touchid)
                    if (scopeObj.setUIAtFormLevelEvent) scopeObj.setUIAtFormLevelEvent(argument);
                    break;
                case 'initiateLoginFlow':
                    if (scopeObj.initiateLoginFlow) scopeObj.initiateLoginFlow(argument);
                    break;
            }
        },
        textboxFocus: function() {
            if (this.isTbxUsernameInFocus) {
                this.view.tbxUsername.setFocus();
            } else if (this.isTbxPasswordInFocus) {
                this.view.tbxPassword.setFocus();
            }
        },
        preShow: function() {
            this.setTextFromi18n();
            this.resetUI();
            this.setFlowActions();
            let navData = applicationManager.getNavigationManager().getCustomInfo("frmLogin");
            this.manageUname(navData);
            this.showDefaultLoginScreen(navData);
            Controllers.set("loginControllerComponent", this);
            this.view.tbxPassword.isVisible = false;
            this.view.flxPwdVisiblityToggle.isVisible = false;
            this.view.lblForgotPwd.isVisible = true;
            this.view.tbxUsername.setEnabled(false);

            kony.print("preshow is calling..");
            const navManager = applicationManager.getNavigationManager();
            if (RDNAUtility.getSession().isUserLoggedIn) {
              RDNAAPI.logOff(RDNAUtility.getSession().userId);
             } else {
             //RDNAAPI.resetAuthState();
             }
        },
        onPostShow: function() {
           const navManager = applicationManager.getNavigationManager();
           const userListObj = navManager.getCustomInfo("frmSelectUserIdUniken");
           if (userListObj && userListObj.selectedUser !== "") {
               kony.print("preshow is calling..");
               userList = userListObj;
               this.displaySelectedUser(userList);
               //userListObj.selectedUser = "";
           }
           else{
               RDNAAPI.resetAuthState();
           }
         },
        setTextFromi18n: function() {
            this._tbx1PlaceholderText = this.getStringFromi18n(this._tbx1PlaceholderText);
            this._tbx2PlaceholderText = this.getStringFromi18n(this._tbx2PlaceholderText);
            this._lblRememberMeText = this.getStringFromi18n(this._lblRememberMeText);
            this._lblForgotPasswordText = this.getStringFromi18n(this._lblForgotPasswordText);
            this._submitButtonText = this.getStringFromi18n(this._submitButtonText);
        },
        getStringFromi18n: function(stringValue) {
            return kony.i18n.getLocalizedString(stringValue) ? kony.i18n.getLocalizedString(stringValue) : stringValue;
        },
        setFlowActions: function() {
            const scopeObj = this;
            this.view.postShow = this.onPostShow();
            this.view.btnLogIn.onClick = function() {
                scopeObj.btnLoginOnClick();
            };
            this.view.tbxUsername.onTextChange = function() {
                scopeObj.enableLoginButton();
            };
            this.view.tbxUsername.onTouchStart = function() {
                scopeObj.isTbxUsernameInFocus = true;
                scopeObj.raiseComponentEvent('onFocusStart', null);
            };
            this.view.tbxUsername.onDone = function() {
                scopeObj.isTbxUsernameInFocus = false;
                scopeObj.raiseComponentEvent('onFocusEnd', null);
            };
            this.view.tbxPassword.onTextChange = function() {
                scopeObj.enableLoginButton();
            };
            this.view.tbxPassword.onTouchStart = function() {
                scopeObj.isTbxPasswordInFocus = true;
                scopeObj.raiseComponentEvent('onFocusStart', null);
            };
            this.view.tbxPassword.onDone = function() {
                scopeObj.isTbxPasswordInFocus = false;
                scopeObj.raiseComponentEvent('onFocusEnd', null);
            };
            this.view.flxPwdVisiblityToggle.onClick = function() {
                scopeObj.flxPwdVisiblityToggleOnClick();
            };
            this.view.switchRememberMe.onSlide = function() {
                scopeObj.rememberMeOption();
            };
            this.view.flxForgot.onTouchEnd = function() {
                let enteredUsername = scopeObj.view.tbxUsername.text;
                scopeObj.raiseComponentEvent('forgotNavigation', enteredUsername);
            };
            this.view.flxMultipleUserIDs.onClick = function() {
                const navManager = applicationManager.getNavigationManager();
                navManager.setCustomInfo("frmSelectUserIdUniken", userList);
                new kony.mvc.Navigation({
                    "appName": "AuthenticationMA",
                    "friendlyName": "frmSelectUserIdUniken"
                }).navigate();
            };
        },
        /*
        // AAC-7691: Removing Device Registration Checks
        setDeviceRegisterflag: function(value) {
          let userManager = applicationManager.getUserPreferencesManager();
          userManager.updateDeviceRegisterFlag(value);
        },
        */
        setDefaultMode: function(authMode) {
            let userManager = applicationManager.getUserPreferencesManager();
            userManager.setDefaultAuthMode(authMode);
        },
        setRememberMeFlag: function(value) {
            let userManager = applicationManager.getUserPreferencesManager();
            userManager.updateRememberMeFlag(value);
        },
        setLoginFeaturesOff: function() {
            let userManager = applicationManager.getUserPreferencesManager();
            userManager.updateRememberMeFlag(false);
            userManager.setDefaultAuthMode("password");
            userManager.updateAccountPreviewFlag(false);
            userManager.upadateTouchIdFlag(false);
            userManager.updateFaceIdFlag(false);
            userManager.updatePinFlag(false);
            userManager.clearUserCredentials();
            applicationManager.getDataforLogin();
        },
        showDefaultLoginScreen: function(loginData) {
            const scopeObj = this;
            if (loginData && loginData.isFirstTimeLogin) {
                scopeObj.raiseComponentEvent("setUIAtFormLevelEvent", "password");
            }
            if (loginData && loginData.usernameFromForgotUsername && (loginData.usernameFromForgotUsername !== undefined || loginData.usernameFromForgotUsername !== "")) {
                scopeObj.raiseComponentEvent("setUIAtFormLevelEvent", "password");
                scopeObj.populateUserName(loginData.usernameFromForgotUsername);
            } else if (loginData && loginData.NUOUsername && (loginData.NUOUsername !== undefined || loginData.NUOUsername !== "")) {
                scopeObj.raiseComponentEvent("setUIAtFormLevelEvent", "password");
                scopeObj.populateUserName(loginData.NUOUsername);
            } else {
                scopeObj.LoginUtility.showLoadingScreen();
                let loginData = applicationManager.getNavigationManager().getCustomInfo("frmLogin");
                let defaultLoginMode = (loginData && loginData.defaultAuthMode) ? loginData.defaultAuthMode : "password";
                scopeObj.selectLoginMode(defaultLoginMode);
                scopeObj.LoginUtility.dismissLoadingScreen();
                /*
                // AAC-7691: Removing Device Registration Checks
                var userObj = applicationManager.getUserPreferencesManager();
                var checkDeviceReg = userObj.isDeviceRegistered();
                if(checkDeviceReg == true && (!loginData.isFirstTimeLogin)){
                  scopeObj.checkDeviceRegistrationStatus();
                }*/
            }
        },
        /*
        // AAC-7691: Removing Device Registration Checks
        checkDeviceRegistrationStatus: function() {
          const scopeObj = this;
          this.LoginUtility.showLoadingScreen();
          let registrationManager = applicationManager.getRegistrationManager();
          let userMan = applicationManager.getUserPreferencesManager();
          let userName = userMan.getUserName();
          let criteria = kony.mvc.Expression.eq("UserName", userName);
          registrationManager.fetchDeviceRegistrationStatus(criteria, scopeObj.checkDeviceRegistrationSuccess, scopeObj.checkDeviceRegistrationError);
        },
 
        checkDeviceRegistrationSuccess: function(resDeviceSuc) {
          const scopeObj = this;
          var configManager = applicationManager.getConfigurationManager();
          if (resDeviceSuc[0].status !== "false"){
            scopeObj.setDeviceRegisterflag(true);
            scopeObj.checkLoginType(true);
          }  else{
            scopeObj.setDeviceRegisterflag(false);
            scopeObj.checkLoginType(false);
          }
          this.LoginUtility.dismissLoadingScreen();
        },
 
        checkDeviceRegistrationError: function(resDeviceErr){
          this.raiseComponentEvent('setErrorStatus', {"serviceNumber":1, "serviceResponse":resDeviceErr});
          this.LoginUtility.dismissLoadingScreen();
          if (resDeviceErr["isServerUnreachable"])
            applicationManager.getPresentationInterruptHandler().showErrorMessage("preLogin", resDeviceErr);
        },
 
        checkLoginType : function(checkDeviceReg){
          const scopeObj = this;
          applicationManager.getPresentationUtility().showLoadingScreen();
          if(checkDeviceReg == true){
            var loginData=applicationManager.getNavigationManager().getCustomInfo("frmLogin");
            this.selectLoginMode(loginData.defaultAuthMode);
          } else {
            scopeObj.raiseComponentEvent("setUIAtFormLevelEvent","password");
            scopeObj.setDefaultMode("password");
          }
        },
        */
       selectLoginMode: function(loginMode) {
            this.raiseComponentEvent("setUIAtFormLevelEvent", loginMode);
            let deviceName = kony.os.deviceInfo().name;
            if (deviceName === "iPhone" || deviceName === "iPhone Simulator" || deviceName === "iPad" || deviceName === "iPad Simulator") {
                // For login via "pin", "touchid", "faceid"
                this.raiseComponentEvent('initiateLoginFlow', loginMode);
            } else {
                this.setDefaultMode(loginMode);
            }
        },
      
        resetUI: function() {
            this.assignDefaultSkins();
            this.assignDefaultText();
            this.view.imgPwdVisiblityToggle.src = this._textVisiblityOffIcon;
            this.view.btnLogIn.setEnabled(false);
            this.view.tbxPassword.secureTextEntry = true;
            this.view.flxLoginPassword.top = "0%";
            this.view.flxContent.forceLayout();
            this.view.forceLayout();
        },
        assignDefaultSkins: function() {
            // Assigns skin to widgets from PROPERTY Variables
            this.view.tbxUsername.skin = this._textBoxNormalSkin;
            this.view.tbxPassword.skin = this._textBoxNormalSkin;
            this.view.lblRememberMe.skin = this._rememberMeLabelSkin;
            if (this.LoginUtility.getDeviceName() === "iPhone") {
                this.view.switchRememberMe.skin = this._rememberMeSwitchSkin;
            } else {
                this.view.switchRememberMe.skin = this._rememberMeSwitchSkin;
            }
            this.view.btnLogIn.skin = this._btnLoginDisabledSkin;
        },
        assignDefaultText: function() {
            // Assigns text to widgets from PROPERTY Variables
            this.view.tbxUsername.placeholder = this._tbx1PlaceholderText;
            this.view.tbxPassword.placeholder = this._tbx2PlaceholderText;
            this.view.lblRememberMe.text = this._lblRememberMeText;
            this.view.lblForgotPwd.text = this._lblForgotPasswordText;
            this.view.btnLogIn.text = this._submitButtonText;
        },
        btnLoginOnClick: function() {
            const scopeObj = this;
            this.LoginUtility.detectDynamicInstrumentation();
            this.LoginUtility.showLoadingScreen();
            kony.print("Redd : userId list of user : "+userList);
            kony.print("Redd : userId list of user : user length : "+userList.usersList.length);
            let enteredUserName = null;
            if(userList != null && userList != undefined && userList.usersList.length>1){
             enteredUserName = this.view.lblSelectedUserId.text.trim();
            }else{
             enteredUserName = this.view.tbxUsername.text.trim();
            }
            let navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("frmLoginusername", enteredUserName);
            navManager.setCustomInfo("prevFlowFilterAccounts", undefined);
            var userNameDetails = applicationManager.getStorageManager().getStoredItem("maskUserName");
            if (scopeObj.LoginUtility.isUserNameMasked(enteredUserName) && userNameDetails["maskedUserName"] === enteredUserName) {
                enteredUserName = userNameDetails["backendUserName"];
                navManager.setCustomInfo("frmLoginusername", enteredUserName);
            }
            let enteredPassword = this.view.tbxPassword.text.trim();
            let UsernamePasswordJSON = {
                "username": enteredUserName,
                "password": enteredPassword
            };
            kony.print("Username password JSON : " + UsernamePasswordJSON);
            this.currentAuthMode = "password";
            this.JSONUsernamePassword = UsernamePasswordJSON;
            let UserIdJSON = {
                "userId": enteredUserName
            };
            if (UsernamePasswordJSON.username.length > 0 && UsernamePasswordJSON.password.length > 0) {
                this.actionVerifyPassword(UsernamePasswordJSON.password);
            } else if (UsernamePasswordJSON.username.length > 0) {
                this.actionCheckUser(UsernamePasswordJSON.username);
                //this.login(UsernamePasswordJSON);
                //if (logOffScenario === true) {
                // scopeObj.view.sdk.setUnikenLogOff(UserIdJSON, scopeObj.logOffSDKCallBack);
                // } else {
                //scopeObj.view.sdk.setUserLogin(UserIdJSON, scopeObj.setUserCallback.bind(this));
                // }
            } else {
                this.LoginUtility.dismissLoadingScreen();
                alert("Failed to login");
                //         this.view.lblErrorMessage.isVisible = true;
                //         this.view.lblErrorMessage.text = "Failed to login.";
                // this.raiseComponentEvent('onLoginFailure', applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Invalid.Username.or.Password"));
            }
        },
        //     intializeSDKCallBack: function(status, callbackString) {
        //             const scopeObj = this;
        //             kony.print("callbackString : " + callbackString);
        //             let unikenLoginUserId = kony.store.getItem("userId");
        //             let enteredUserName = this.JSONUsernamePassword.username;
        //             let UserNameActivationCodeJSON = {
        //                 "userId": enteredUserName
        //             };
        //             if (status === 2) {
        //                 //kony.application.dismissLoadingScreen();
        //                 scopeObj.view.sdk.setUserLogin(UserNameActivationCodeJSON, scopeObj.setUserCallback.bind(this));
        //             } else {
        //                 kony.application.dismissLoadingScreen();
        //                 this.view.lblErrorMessage.isVisible = true;
        //                 this.view.lblErrorMessage.text = "Invalid username or password.";
        //                 //this.view.lblErrorMessage.text = "Initialization of SDK Failed.";
        //             }
        //         },
        logOffSDKCallBack: function(status, callbackString) {
            const scopeObj = this;
            kony.print("callbackString : " + callbackString);
            let unikenLoginUserId = kony.store.getItem("userId");
            let enteredUserName = this.JSONUsernamePassword.username;
            let UserNameActivationCodeJSON = {
                "userId": enteredUserName
            };
            if (status === 2) {
                //kony.application.dismissLoadingScreen();
                scopeObj.view.sdk.setUserLogin(UserNameActivationCodeJSON, scopeObj.setUserCallback.bind(this));
            } else {
                kony.application.dismissLoadingScreen();
                alert("Failed to login");
                //                 this.view.lblErrorMessage.isVisible = true;
                //                 this.view.lblErrorMessage.text = "Invalid Username or password.";
                //this.view.lblErrorMessage.text = "Log Off SDK Failed.";
            }
        },
        setUserCallback: function(status, setUsercallbackString) {
            var currentForm = kony.application.getCurrentForm();
            const scopeObj = this;
            kony.print("setUsercallbackString : " + setUsercallbackString);
            let enteredPassword = this.JSONUsernamePassword.password;
            if (status === 2) {
                let passwordServiceKeyJSON = {
                    "password": enteredPassword,
                    "optMode": 0
                };
                scopeObj.view.sdk.unikenSDKPwdLoginCallback(passwordServiceKeyJSON, scopeObj.unikenPwdLoginCallBack.bind(this));
                // alert("Login Success");
            } else {
                applicationManager.getPresentationUtility().dismissLoadingScreen();
                alert("set user Login Failed");
                //                 this.view.lblErrorMessage.isVisible = true;
                //                 this.view.lblErrorMessage.text = "Invalid Username or Password.";
                kony.print("set user Login Failed");
            }
        },
        unikenPwdLoginCallBack: function(status, userId) {
            //applicationManager.getPresentationUtility().dismissLoadingScreen();
            const scopeObj = this;
            kony.print("uniken Pwd login callback : " + userId);
            if (status === 2) {
                kony.store.setItem("userId", userId)
                unikenuserId = userId;
                let VUsernamePasswordJSON = {
                    "username": this.JSONUsernamePassword.username,
                    "password": this.JSONUsernamePassword.password
                };
                //  		this.login(VUsernamePasswordJSON);
                //         let loginSuccessObj = {
                //           "resSuccess": loginJson,
                //           "currentAuthMode": "password",
                //           "rememberdeviceregflag": 0,
                //           "UsernamePasswordJSON": {"userId":"0157735920","password":"temenos234"}
                //         };
                //scopeObj.view.sdk.unikenBiometricIsPromptCallback(scopeObj.unikenBiometricIsPromptCallback);
                //this.raiseComponentEvent('onLoginSuccess', loginSuccessObj);
                kony.print("Login Password Successful login success");
                applicationManager.getPresentationUtility().dismissLoadingScreen();
                this.clearUsernamePwd();
                alert("Login Success");
                //var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
                //accountMod.presentationController.showDashboard();
                //                 var navManager = applicationManager.getNavigationManager();
                //                 navManager.navigateTo("frmDashboardLanding");
                //navManager.navigateTo("frmDashboard");
                //navManager.navigateTo("frmCreatePassword");
            } else {
                applicationManager.getPresentationUtility().dismissLoadingScreen();
                alert("Login Password Creation Failed");
                //                 this.view.lblErrorMessage.isVisible = true;
                //                 this.view.lblErrorMessage.text = "Invalid Username or Password.";
                kony.print("Login Password Creation Failed");
            }
        },
        login: function(UsernamePasswordJSON) {
            const scopeObj = this;
            scopeObj.currentAuthMode = "password";
            let authParams = {
                "UserName": UsernamePasswordJSON.username,
                "Password": UsernamePasswordJSON.password,
                "loginOptions": {
                    "isOfflineEnabled": false
                }
            };
            let identityServiceName = this._identityServiceName;
            this.LoginDAO.login(authParams, scopeObj.onLoginSuccessCallback, scopeObj.onLoginFailureCallback, identityServiceName);
        },
        onLoginSuccessCallback: function(resSuccess) {
            const scopeObj = this;
            let rememberMeSwitchValue = this.view.switchRememberMe.selectedIndex;
            let rememberdeviceregflag = rememberMeSwitchValue === 0;
            let loginSuccessObj = {
                "resSuccess": resSuccess,
                "currentAuthMode": scopeObj.currentAuthMode,
                "rememberdeviceregflag": rememberdeviceregflag,
                "UsernamePasswordJSON": scopeObj.JSONUsernamePassword
            };
            this.raiseComponentEvent('onLoginSuccess', loginSuccessObj);
        },
        onLoginFailureCallback: function(resError) {
            this.LoginUtility.dismissLoadingScreen();
            let errMsg = resError.errmsg.errorMessage;
            this.clearUsernamePwd();
            this.raiseComponentEvent('onLoginFailure', errMsg);
        },
        rememberMeOption: function() {
            const scopeObj = this;
            var rememberMeSwitchValue = this.view.switchRememberMe.selectedIndex;
            var loginData = applicationManager.getNavigationManager().getCustomInfo("frmLogin");
            if (rememberMeSwitchValue === 0) {
                scopeObj.setRememberMeFlag(true);
                applicationManager.getDataforLogin();
            } else {
                if (loginData && loginData.istouchIdEnabled || loginData.isPinModeEnabled || loginData.isFacialAuthEnabled) this.showTouchIdOffAlert(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.rememberMe.Msg"), applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.rememberMeTittle"));
                else this.OffLoginFeatures_RememberOff();
            }
        },
        sdkTouchOffAlert: function(msg) {
            var config = applicationManager.getConfigurationManager();
            var scope = this;
            var basicProperties = {
                "message": msg,
                "alertType": constants.ALERT_TYPE_INFO,
                "alertIcon": ""
            };
            applicationManager.getPresentationUtility().showAlertMessage(basicProperties, {});
        },
        showTouchIdOffAlert: function(msg, title) {
            kony.ui.Alert({
                "message": msg,
                "alertHandler": this.alertrememberCallback,
                "alertType": constants.ALERT_TYPE_CONFIRMATION,
                "yesLabel": "Disable",
                "noLabel": "Cancel",
                "alertTitle": title
            }, {});
        },
        alertrememberCallback: function(response) {
            const scopeObj = this;
            if (response === true) {
                this.OffLoginFeatures_RememberOff();
            } else {
                this.view.imgCheckBox.src = "remembermetick.png";
                scopeObj.setRememberMeFlag(true);
            }
        },
        OffLoginFeatures_RememberOff: function() {
            this.raiseComponentEvent("setUIAtFormLevelEvent", "password");
            this.raiseComponentEvent('hideDashboardIcon', null);
            this.setLoginFeaturesOff();
        },
        flxPwdVisiblityToggleOnClick: function() {
            if (this.view.imgPwdVisiblityToggle.src === this._textVisiblityOffIcon) {
                this.view.imgPwdVisiblityToggle.src = this._textVisiblityOnIcon;
                this.view.tbxPassword.secureTextEntry = false;
                this.view.flxContent.forceLayout();
            } else {
                this.view.imgPwdVisiblityToggle.src = this._textVisiblityOffIcon;
                this.view.tbxPassword.secureTextEntry = true;
                this.view.flxContent.forceLayout();
            }
        },
        enableLoginButton: function() {
            const scopeObj = this;
            //            if (scopeObj.view.tbxUsername.text !== '' && scopeObj.view.tbxUsername.text !== null && scopeObj.view.tbxUsername.text !== undefined && scopeObj.view.tbxPassword.text !== '' && scopeObj.view.tbxPassword.text !== null && scopeObj.view.tbxPassword.text !== undefined) {
            //                scopeObj.view.btnLogIn.setEnabled(true);
            //                scopeObj.view.btnLogIn.skin = "sknBtn0095e426pxEnabled";
            //            } else {
            //                scopeObj.view.btnLogIn.setEnabled(false);
            //                scopeObj.view.btnLogIn.skin = "sknBtna0a0a0SSPReg26px";
            //            }
            if (scopeObj.view.tbxUsername.text !== '' && scopeObj.view.tbxUsername.text !== null && scopeObj.view.tbxUsername.text !== undefined) {
            kony.print("Avenger12345 : login1");
                scopeObj.view.btnLogIn.setEnabled(true);
                scopeObj.view.btnLogIn.skin = "sknBtn0095e426pxEnabled";
                if (REL_ID_Logintext_verified == "Verified") {
                    if (scopeObj.view.tbxPassword.text !== '' && scopeObj.view.tbxPassword.text !== null && scopeObj.view.tbxPassword.text !== undefined) {
                        kony.print("Password is not empty");
                        kony.print("Avenger12345 : login2");
                        scopeObj.view.btnLogIn.setEnabled(true);
                        scopeObj.view.btnLogIn.skin = "sknBtn0095e426pxEnabled";
                    } else {
                        kony.print("Password is empty");
                        scopeObj.view.btnLogIn.setEnabled(false);
                        scopeObj.view.btnLogIn.skin = "sknBtna0a0a0SSPReg26px";
                    }
                }
            }else{
                if(scopeObj.view.lblSelectedUserId.text !== '' && scopeObj.view.lblSelectedUserId.text !== null && scopeObj.view.lblSelectedUserId.text !== undefined) {
                    kony.print("Multiuser : login123");
                    scopeObj.view.btnLogIn.setEnabled(true);
                    scopeObj.view.btnLogIn.skin = "sknBtn0095e426pxEnabled";
                } else {
                kony.print("Username is empty");
                scopeObj.view.btnLogIn.setEnabled(false);
                scopeObj.view.btnLogIn.skin = "sknBtna0a0a0SSPReg26px";
                this.view.btnLogIn.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.Verify");
            }
            }
        },
        clearUsernamePwd: function() {
            const scopeObj = this;
            var userNameDetails = applicationManager.getStorageManager().getStoredItem("maskUserName");
            if (userNameDetails && userNameDetails["maskedUserName"]) {
                scopeObj.view.tbxUsername.text = userNameDetails["maskedUserName"];
            } else {
                scopeObj.view.tbxUsername.text = "";
            }
            scopeObj.view.tbxPassword.text = "";
            scopeObj.view.btnLogIn.skin = "sknBtna0a0a0SSPReg26px";
            scopeObj.view.btnLogIn.setEnabled(false);
            scopeObj.view.flxContent.forceLayout();
        },
        manageUname: function(loginData) {
            if (loginData && loginData.isRememberMeOn !== true) {
                this.view.tbxUsername.text = "";
                this.view.tbxPassword.text = "";
                this.view.switchRememberMe.selectedIndex = 1;
            } else {
                if (loginData && loginData.isFirstTimeLogin !== true) {
                    this.view.tbxUsername.text = this.LoginUtility.maskUserName(loginData.userName);
                    var maskedUserName = this.view.tbxUsername.text;
                    var userNameDetails = {};
                    userNameDetails["maskedUserName"] = maskedUserName;
                    userNameDetails["backendUserName"] = loginData.userName;
                    applicationManager.getStorageManager().setStoredItem("maskUserName", userNameDetails);
                } else {
                    this.view.tbxUsername.text = "";
                }
                this.view.tbxPassword.text = "";
                this.view.switchRememberMe.selectedIndex = 0;
            }
        },
        populateUserName: function(userName) {
            this.view.tbxUsername.text = this.LoginUtility.maskUserName(userName);
            var maskedUserName = this.view.tbxUsername.text;
            var userNameDetails = {};
            userNameDetails["maskedUserName"] = maskedUserName;
            userNameDetails["backendUserName"] = userName;
            applicationManager.getStorageManager().setStoredItem("maskUserName", userNameDetails);
        },
        resetSkinsOfUsernameAndPwd: function() {
            this.view.tbxUsername.skin = "sknTbx424242SSPRegular28px";
            this.view.tbxPassword.skin = "sknTbx424242SSPRegular28px";
            if (this.view.tbxPassword.text !== '' && this.view.tbxPassword.text !== null && this.view.tbxUsername.text !== undefined) {
                this.view.btnLogIn.skin = "sknBtn0095e4RoundedffffffSSP26px";
                kony.print("Avenger12345 : login3");
                this.view.btnLogIn.setEnabled(true);
            }
            this.view.flxContent.forceLayout();
        },
        // Uniken SDK implementation callbacks..
        handleGetUser: function(response) {
            var scopeObj = this;
            kony.print("Uniken : getUser : DisplayResponse : " + JSON.stringify(response));
            scopeObj.view.btnLogIn.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.Verify");
            scopeObj.view.tbxUsername.text = "";
            scopeObj.view.tbxPassword.isVisible = false;
            scopeObj.view.flxPwdVisiblityToggle.isVisible = false;
            scopeObj.view.lblForgotPwd.isVisible = true;
            scopeObj.view.flxSingleUserID.setVisibility(false);
            scopeObj.view.flxMultipleUserIDs.setVisibility(false);
            //scopeObj.view.tbxUsername.setEnabled(true);
            if(scopeObj.view.tbxUsername.text.length>0){
            scopeObj.view.btnLogIn.setEnabled(true);
            scopeObj.view.btnLogIn.skin = "sknBtn0095e426pxEnabled";
            }else{
            scopeObj.view.btnLogIn.setEnabled(false);
            scopeObj.view.btnLogIn.skin = "sknBtna0a0a0SSPReg26px";
            }
            userList = scopeObj.createRememberUserList(response.rememberedUsers);
            kony.print("Uniken : userList : Display : " + JSON.stringify(userList));
            if (userList.usersList.length > 0) {
                this.displaySelectedUser(userList);
            }
            /*function SHOW_ALERT_RESET_BLOCKED_USER_CALLBACK(isResetUser) {
                if (isResetUser) {
                    RDNAUtility.showLoadingScreen();
                    scopeObj.handleSynErrorResponse(RDNAAPI.resetBlockedUserAccount());
                } else {
                    scopeObj.handleSynErrorResponse(RDNAAPI.resetAuthState());
                }
            }*/
            function SHOW_ALERT_Callback() {
                //form.rdnaObj.resetAuthState();
                //scopeObj.view.tbxUsername.text = "";
                //scopeObj.view.btnLogIn.setEnabled(false);
                //scopeObj.view.btnLogIn.skin = "sknBtna0a0a0SSPReg26px";
                RDNAUtility.hideLoadingScreen();

            }
            if (response.error.shortErrorCode === 0) {
                if (response.challengeResponse.status.statusCode === 0 || response.challengeResponse.status.statusCode === 100) {
                    //scopeObj.view.tbxUsername.text = response.recentLoggedInUser;
                } else {
                    kony.print("RDNA Issue : " + response.challengeResponse.status.statusMessage);
                    kony.ui.Alert({
                        "alertType": constants.ALERT_TYPE_INFO,
                        "alertTitle": null,
                        "yesLabel": null,
                        "noLabel": null,
                        "alertIcon": null,
                        "message": "Invalid Credentials",
                        "alertHandler": SHOW_ALERT_Callback
                    }, {
                        "iconPosition": constants.ALERT_ICON_POSITION_LEFT
                    });
                }
            } else {
                kony.print("RDNA Issue : " + RDNAUtility.getErrorMessage(response.error));
                kony.ui.Alert({
                    "alertType": constants.ALERT_TYPE_ERROR,
                    "alertTitle": null,
                    "yesLabel": null,
                    "noLabel": null,
                    "alertIcon": null,
                    "message": "Invalid Credentials",
                    "alertHandler": SHOW_ALERT_Callback
                }, {
                    "iconPosition": constants.ALERT_ICON_POSITION_LEFT
                });
            }
        },
        handleSynErrorResponse: function(response) {
            const scopeObj = this;
            RDNAUtility.hideLoadingScreen();

            function SHOW_ALERT_Callback(form) {
                // scopeObj.view.tbxUsername.text = "";
                // form.rdnaObj.resetAuthState();
            }
            if (response[0].shortErrorCode !== 0) {
                RDNAUtility.hideLoadingScreen();
                kony.print("RDNA Issue : " + RDNAUtility.getErrorMessage(response[0]));
                kony.ui.Alert({
                    "alertType": constants.ALERT_TYPE_ERROR,
                    "alertTitle": null,
                    "yesLabel": null,
                    "noLabel": null,
                    "alertIcon": null,
                    "message": "Something went wrong.Please try again later.",
                    "alertHandler": SHOW_ALERT_Callback
                }, {
                    "iconPosition": constants.ALERT_ICON_POSITION_LEFT
                });
            }
        },
        actionCheckUser: function(userName) {
            kony.print("Uniken : Username = " + userName);
            RDNAUtility.showLoadingScreen();
            this.handleSynErrorResponse(RDNAAPI.setUser(userName.trim()));
        },
        handleGetPassword: function(response) {
            var scopeObj = this;
            REL_ID_Logintext_verified = "Verified";;
            scopeObj.view.btnLogIn.text = kony.i18n.getLocalizedString("kony.mb.login.logIn");
            scopeObj.view.tbxUsername.setEnabled(false);
            scopeObj.view.flxMultipleUserIDs.setEnabled(false);
            scopeObj.view.tbxPassword.text = "";
            scopeObj.view.tbxPassword.isVisible = true;
            if(scopeObj.view.tbxPassword.text.length>0){
            scopeObj.view.btnLogIn.setEnabled(true);
            scopeObj.view.btnLogIn.skin = "sknBtn0095e426pxEnabled";
            }else{
            scopeObj.view.btnLogIn.setEnabled(false);
            scopeObj.view.btnLogIn.skin = "sknBtna0a0a0SSPReg26px";
            }
            var REL_ID_FRGT_PWD_Challenge_info_key = RDNAUtility.getChallengeInfo(response, "ENABLE_FORGOT_PASSWORD");
            if (response.challengeMode == 0 && REL_ID_FRGT_PWD_Challenge_info_key === "true") {
                scopeObj.view.lblForgotPwd.isVisible = true;
            }
            userName_REL_ID = response.userID;
            REL_ID_challenge_mode = response.challengeMode;
            scopeObj.view.flxPwdVisiblityToggle.isVisible = true;

            function SHOW_ALERT_Callback() {
                //form.rdnaObj.resetAuthState();
                RDNAUtility.hideLoadingScreen();
            }
            if (response.error.shortErrorCode === 0) {
                if (response.challengeResponse.status.statusCode === 0 || response.challengeResponse.status.statusCode === 100) {} else {
                    kony.print("RDNA Issue : " + response.challengeResponse.status.statusMessage);
                    kony.ui.Alert({
                        "alertType": constants.ALERT_TYPE_INFO,
                        "alertTitle": null,
                        "yesLabel": null,
                        "noLabel": null,
                        "alertIcon": null,
                        "message": "Invalid Credentials",
                        "alertHandler": SHOW_ALERT_Callback
                    }, {
                        "iconPosition": constants.ALERT_ICON_POSITION_LEFT
                    });
                }
            } else {
                kony.print("RDNA Issue : " + RDNAUtility.getErrorMessage(this.response.error));
                kony.ui.Alert({
                    "alertType": constants.ALERT_TYPE_ERROR,
                    "alertTitle": null,
                    "yesLabel": null,
                    "noLabel": null,
                    "alertIcon": null,
                    "message": "Invalid Credentials",
                    "alertHandler": SHOW_ALERT_Callback
                }, {
                    "iconPosition": constants.ALERT_ICON_POSITION_LEFT
                });
            }
        },
        handleOnUserLoggedIn: function(response) {
            RDNAUtility.showLoadingScreen();
            var scopeObj = this;
            //TODO: Navigation function for Dashboard
            //alert("User LogIn Successfull");
            kony.print("Uniken : OnUserLoggedIn for Login Success response : " + JSON.stringify(response));
            kony.print("Uniken : OnUserLoggedIn token : " + JSON.stringify(response.challengeResponse.additionalInfo.jwtJsonTokenInfo));
            if (response.challengeResponse.additionalInfo.jwtJsonTokenInfo != null && response.challengeResponse.additionalInfo.jwtJsonTokenInfo != undefined) {
                var jwtTokenInfo = JSON.stringify(response.challengeResponse.additionalInfo.jwtJsonTokenInfo);
                var jwtToken = JSON.parse(jwtTokenInfo);
                var finalToken = JSON.parse(jwtToken);
                var introspect_token = finalToken["access_token"];
                kony.print("Uniken : OnUserLoggedIn final endpoint token : " + finalToken["access_token"]);
                let identityServiceName = scopeObj._identityServiceName;
                var authParams = {
                    "access_token": introspect_token,
                    "token_type": "bearer",
                    "isMobile": "true",
                    "loginOptions": {
                        "isOfflineEnabled": false,
                        "isSSOEnabled": true
                    }
                };
                kony.print("Uniken : OnUserLoggedIn Identity JSON object : " + JSON.stringify(authParams));
                kony.print("Uniken : OnUserLoggedIn Identity JSON object : " + identityServiceName);
                //kony.application.showLoadingScreen();
                scopeObj.LoginDAO.login(authParams, scopeObj.onLoginSuccessCallback, scopeObj.onLoginFailureCallback, identityServiceName);
            } else {
                alert(kony.i18n.getLocalizedString("kony.mb.sca.ErrMsgSmthgWentWrg"))
            }
            //            new kony.mvc.Navigation({
            //                "appName": "SelfServiceEnrolmentMA",
            //                "friendlyName": "unikennotification"
            //            }).navigate(response);
            //Security Notification Page call...
            //            new kony.mvc.Navigation({
            //                "appName": "ApprovalRequestMA",
            //                "friendlyName": "ApprovalsReqUIModule/frmSecurityNotification"
            //            }).navigate(response);
        },
        actionVerifyPassword: function(password) {
            var scopeObj = this;
            RDNAUtility.showLoadingScreen();
            scopeObj.handleSynErrorResponse(RDNAAPI.verifyPassword(password.trim(), REL_ID_challenge_mode));
            RDNAUtility.showLoadingScreen();
        },
        //Uniken UserID list..
        createRememberUserList: function(relidRememberList) {
            var usersList = [];
            for (let relidUserName in relidRememberList) {
                var user = {
                    userId: relidRememberList[relidUserName],
                    id: parseInt(relidUserName) + 1,
                    name: relidRememberList[relidUserName],
                    creationDate: 0,
                    expiryDate: 0,
                    renewalDate: 0,
                };
                usersList.push(JSON.stringify(user));
            }
            return {
                usersList: usersList,
                selectedUser: ""
            };
        },
        displaySelectedUser: function(userIdList) {
            kony.print("Uniken : userList = " + JSON.stringify(userIdList));
            if (userIdList.selectedUser === "") {
                kony.print("Uniken : selectedUser = " + userIdList.selectedUser);
                this.view.tbxUsername.text = JSON.parse(userIdList.usersList[0]).userId;
                this.view.lblSelectedUserId.text = JSON.parse(userIdList.usersList[0]).userId;
            }
            if (userIdList.usersList.length <= 1) { //TSR-151084
                this.view.flxSingleUserID.setVisibility(false);
                this.view.flxMultipleUserIDs.setVisibility(false);
                this.view.tbxUsername.setVisibility(true);
            } else {
                this.view.flxSingleUserID.setVisibility(false);
                this.view.tbxUsername.setVisibility(false);
                this.view.flxMultipleUserIDs.setVisibility(true);
                this.view.flxMultipleUserIDs.setEnabled(true);
                if (userIdList.selectedUser === "") {
                    kony.print("Uniken : selectedUser = " + userIdList.selectedUser);
                    this.view.tbxUsername.text = JSON.parse(userIdList.usersList[0]).userId;
                    this.view.lblSelectedUserId.text = JSON.parse(userIdList.usersList[0]).userId;
                } else {
                    kony.print("Uniken : selectedUser1 = " + userIdList.selectedUser);
                    this.view.tbxUsername.text = userIdList.selectedUser;
                    this.view.lblSelectedUserId.text = userIdList.selectedUser;
                }
            }
            if (userIdList.usersList.length > 0) {
                kony.print("Avenger12345 : login4");
                this.view.btnLogIn.setEnabled(true);
                this.view.btnLogIn.skin = "sknBtn0095e426pxEnabled";
                this.view.btnLogIn.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.Verify");
            }
        },
    };
  
  
});