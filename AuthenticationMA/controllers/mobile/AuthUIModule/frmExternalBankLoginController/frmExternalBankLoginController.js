define({
    init : function() {
         var navManager = applicationManager.getNavigationManager();
         var currentForm=navManager.getCurrentForm();
         applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    },
    preShowUiSettings: function() {
        var loggerManager = applicationManager.getLoggerManager();
        loggerManager.log("----Start preShowUiSettings in frmExternalBankLoginController----");
        try {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            this.view.tbxUsername.setFocus(true);
            this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.externalBanks.BankLogin");
            if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
                this.view.flxHeader.isVisible = false;
            } else {
                this.view.flxHeader.isVisible = true;
                this.view.customHeader.btnRight.isVisible = false;
            }
            this.view.flxPwdVisiblityToggle.onClick = this.flxPwdVisiblityToggleOnClick;
            this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
            this.view.btnLogIn.onClick = this.onClickOfLogin;
            this.view.tbxUsername.onTextChange = this.enableLoginButton;
            this.view.tbxPassword.onTextChange = this.enableLoginButton;
            this.view.tbxPassword.onDone = this.onClickOfLogin;
            var navigationManager = applicationManager.getNavigationManager();
            var frmExternalBankLoginData = navigationManager.getCustomInfo("frmExternalBankLogin");
            this.view.imgBankLogo.src = frmExternalBankLoginData.logo.src;
            this.view.lblUseOnlineBankCred.text = kony.i18n.getLocalizedString("kony.mb.externalAccounts.use")+" "+ frmExternalBankLoginData.bankName + " "+kony.i18n.getLocalizedString("kony.mb.externalAccounts.onlineBankingCredentials");
            this.view.tbxUsername.text = "";
            this.view.tbxPassword.text = "";
            this.enableLoginButton();
            navigationManager.setCustomInfo("frmExternalBankLogin_IsSecureTextEntryEnabled", false);
            this.flxPwdVisiblityToggleOnClick();
        } catch (err) {
            loggerManager.log("Error in preShowUiSettings:" + JSON.stringify(err));
        }
        loggerManager.log("----Start preShowUiSettings in frmExternalBankLoginController----");
    },
    navigateToSelectExternalAccountsForm: function() {
        var loggerManager = applicationManager.getLoggerManager();
        try {
            loggerManager.log("#### start frmExternalBankLoginController : navigateToSelectExternalAccountsForm ####");
            const configManager = applicationManager.getConfigurationManager();
            const isHomepageMAPresent = configManager.isMicroAppPresent('HomepageMA');
            if(isHomepageMAPresent){
                var accountModule = kony.mvc.MDAApplication.getSharedInstance().moduleManager.getModule({ appName: "HomepageMA", moduleName: "AccountsUIModule" });
			    accountModule.presentationController.commonFunctionForNavigation("frmSelectExternalAccounts");
            }
        } catch (err) {
            loggerManager.log("#### in catch " + JSON.stringify(err) + " ####");
        }
    },
    onClickOfLogin: function() {
        var self = this;
        applicationManager.getPresentationUtility().showLoadingScreen();
        var username = this.view.tbxUsername.text;
        var password = this.view.tbxPassword.text;
        var navigationManager = applicationManager.getNavigationManager();
        var frmExternalBankLoginData = navigationManager.getCustomInfo("frmExternalBankLogin");
		if(String(frmExternalBankLoginData.isOauth2).trim().toLowerCase() === "true") {
            self.authenticateUserThroughOAuth2AndSaveSessionToken(username, password, frmExternalBankLoginData.identityProvider, frmExternalBankLoginData.bankId);
        } else {
            self.authenticateUserThroughIdentityServiceAndSaveCredToDB(username, password, frmExternalBankLoginData.identityProvider, frmExternalBankLoginData.bankId);
        }
    },
    extractErrorMessageFromExternalLoginResponse: function(message, key) {
        message = String(message).trim();
        key = String(key).trim();
        var index = message.indexOf(key);
        if(index < 0) {
            return message;
        }
        message = message.substring(index);
        index = message.indexOf("[");
        var endIndex = message.indexOf("]");
        if(index < 0 || endIndex < 0) {
            return message;
        }
        index += 1;
        message = message.substring(index, endIndex);
        return message;
    },
    authenticateUserThroughOAuth2AndSaveSessionToken: function(username, password, identityProvider, bankId) {
        function saveCredSuccessCallback(res) {
            const configManager = applicationManager.getConfigurationManager();
            const isHomepageMAPresent = configManager.isMicroAppPresent('HomepageMA');
            if(isHomepageMAPresent){
                var accountModule = kony.mvc.MDAApplication.getSharedInstance().moduleManager.getModule({ appName: "HomepageMA", moduleName: "AccountsUIModule" });
                accountModule.presentationController.fetchOtherBankAccounts({
                    "userName": username,
                    "mainUser": applicationManager.getUserPreferencesManager().getUserName(),
                    "bankId": bankId
                });
            }
        }
        function loginSuccessCallback(userCredentials, res) {
            var mainUser = applicationManager.getUserPreferencesManager().getUserName();
            var accountModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
            accountModule.presentationController.saveUserCredentialsOfExternalBank(userCredentials.username, userCredentials.password, res.params.SessionToken, mainUser, userCredentials.bankId, saveCredSuccessCallback, errorCallback);
        }
        function errorCallback(err) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            self.clearUsernameAndPassword();
            if(err && err.details && err.details.message) {
                applicationManager.getDataProcessorUtility().showToastMessageError(self, self.extractErrorMessageFromExternalLoginResponse(err.details.message, "Error Message"));
            } else {
                applicationManager.getDataProcessorUtility().showToastMessageError(self, err);
            }
        }
        try {
			var self = this;
            username = String(username).trim();
            password = String(password).trim();
            var userCredentials = {
                'username': username,
                'password': password,
                'identityProvider': identityProvider,
                'bankId': bankId
            };
            var loggerManager = applicationManager.getLoggerManager();
            loggerManager.log("#### start frmExternalBankLoginController : navigateToSelectExternalAccountsForm ####");
            var accountModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
            accountModule.presentationController.authenticateUserInExternalBank(userCredentials, loginSuccessCallback.bind(this, userCredentials), errorCallback);
        } catch (err) {
            loggerManager.log("#### in catch " + JSON.stringify(err) + " ####");
        }
    },
    authenticateUserThroughIdentityServiceAndSaveCredToDB: function(username, password, identityProvider, bankId) {
        function saveCredSuccessCallback(res) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            const configManager = applicationManager.getConfigurationManager();
            const isHomepageMAPresent = configManager.isMicroAppPresent('HomepageMA');
            if(isHomepageMAPresent){
                var accountModule = kony.mvc.MDAApplication.getSharedInstance().moduleManager.getModule({ appName: "HomepageMA", moduleName: "AccountsUIModule" });
                accountModule.presentationController.fetchOtherBankAccounts({
                    "userName": username,
                    "mainUser": applicationManager.getUserPreferencesManager().getUserName(),
                    "bankId": bankId
                });
            }
        }
        function loginSuccessCallback(userCredentials, res) {
            var mainUser = applicationManager.getUserPreferencesManager().getUserName();
            var accountModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
//          passing session token as single space, because this PATCH call to service is failing, when we send it as undefined/null/""(empty string)
            accountModule.presentationController.saveUserCredentialsOfExternalBank(userCredentials.username, userCredentials.password, " ", mainUser, userCredentials.bankId, saveCredSuccessCallback, errorCallback);
        }
        function errorCallback(err) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            self.clearUsernameAndPassword();
            if(err && err.details && err.details.message) {
                applicationManager.getDataProcessorUtility().showToastMessageError(self, self.extractErrorMessageFromExternalLoginResponse(err.details.message, "Error Message"));
            } else {
                applicationManager.getDataProcessorUtility().showToastMessageError(self, err);
            }
        }
        try {
			var self = this;
            username = String(username).trim();
            password = String(password).trim();
			var userCredentials = {
				'username': username,
				'password': password,
				'identityProvider': identityProvider,
				'bankId': bankId
			};
			var loggerManager = applicationManager.getLoggerManager();
			loggerManager.log("#### start frmExternalBankLoginController : authenticateUserThroughIdentityServiceAndSaveCredToDB ####");
			var accountModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
			accountModule.presentationController.authenticateUserInExternalBank(userCredentials, loginSuccessCallback.bind(this, userCredentials), errorCallback);
        } catch (err) {
            loggerManager.log("#### in catch " + JSON.stringify(err) + " ####");
        }
    },
    enableLoginButton: function() {
        try {
            var loggerManager = applicationManager.getLoggerManager();
            loggerManager.log("#### start frmExternalBankLoginController : enableLoginButton ####");
          	var username = this.view.tbxUsername.text;
            var password = this.view.tbxPassword.text;
          	if( username !== '' && username !== null && username !== undefined && password !== '' && password !== null && password !== undefined ){
              	this.view.btnLogIn.setEnabled(true);
                this.view.btnLogIn.skin = "sknBtn0095e4RoundedffffffSSP26px";
            } else {
                this.view.btnLogIn.setEnabled(false);
                this.view.btnLogIn.skin = "sknBtne9e9e9a0a0a0SSReg30px";
            }
        } catch (error) {
            loggerManager.log("#### in catch " + JSON.stringify(err) + " ####");
        }
    },
    flxPwdVisiblityToggleOnClick: function() {
        try {
            var loggerManager = applicationManager.getLoggerManager();
            loggerManager.log("#### start frmExternalBankLoginController : flxPwdVisiblityToggleOnClick ####");
            var navigationManager = applicationManager.getNavigationManager();
            var isSecureTextEntryEnabled = navigationManager.getCustomInfo("frmExternalBankLogin_IsSecureTextEntryEnabled");
            if (isSecureTextEntryEnabled === true) {
                this.view.imgPwdVisiblityToggle.src = "viewactive.png";
                this.view.tbxPassword.secureTextEntry = false;
                navigationManager.setCustomInfo("frmExternalBankLogin_IsSecureTextEntryEnabled", false);
                this.view.flxMainContainer.forceLayout();
            } else {
                this.view.imgPwdVisiblityToggle.src = "view.png";
                this.view.tbxPassword.secureTextEntry = true;
                navigationManager.setCustomInfo("frmExternalBankLogin_IsSecureTextEntryEnabled", true);
                this.view.flxMainContainer.forceLayout();
            }
        } catch (error) {
            loggerManager.log("#### in catch " + JSON.stringify(err) + " ####");
        }
    },
    flxBackOnClick: function() {
        var loggerManager = applicationManager.getLoggerManager();
        try {
            loggerManager.log("#### start frmExternalBankLoginController : flxBackOnClick ####");
            var navMan = applicationManager.getNavigationManager();
            navMan.goBack();
        } catch (err) {
            loggerManager.log("#### in catch " + JSON.stringify(err) + " ####");
        }
    },
  	clearUsernameAndPassword:function()
	{
        scopeObj=this;
        scopeObj.view.tbxPassword.text = "";
        scopeObj.enableLoginButton();
        scopeObj.view.flxMainContainer.forceLayout();
	}
});